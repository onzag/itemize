import { logger } from "../..";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../../../config";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { renderTemplate } from "../../../util";
import { Cache } from "../../cache";
import type { IGQLValue } from "../../../gql-querier";
import Root from "../../../base/Root";
import { jwtSign } from "../../token";
import { IUnsubscribeUserTokenDataType } from "../../user/rest";
import { IServiceProviderClassType, ServiceProvider } from "..";
import { RegistryService } from "../registry";

export interface IUnsubscribeURL {
  redirected: string;
  noRedirected: string;
}

export interface ISendEmailData {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  unsubscribeMailto: string;
  unsubscribeURLs: {
    [email: string]: IUnsubscribeURL;
  };
}

export interface IMailProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, registry: RegistryService, cache: Cache, root: Root, internalConfig: IConfigRawJSONDataType, sensitiveConfig: ISensitiveConfigRawJSONDataType): MailProvider<T>;
}

export interface IReceiveEmailData {
  from: string;
  to: string;
  subject: string;
  content: string;
}

export default class MailProvider<T> extends ServiceProvider<T> {
  public internalConfig: IConfigRawJSONDataType;
  public cache: Cache;
  public root: Root;
  private userIdef: ItemDefinition;
  private storageIdef: ItemDefinition;
  public sensitiveConfig: ISensitiveConfigRawJSONDataType;

  constructor(config: T, registry: RegistryService, cache: Cache, root: Root, internalConfig: IConfigRawJSONDataType, sensitiveConfig: ISensitiveConfigRawJSONDataType) {
    super(config, registry);

    this.internalConfig = internalConfig;
    this.root = root;
    this.cache = cache;
    this.sensitiveConfig = sensitiveConfig;
    this.userIdef = this.root.getModuleFor(["users"]).getItemDefinitionFor(["user"]);
    this.storageIdef = null;

    if (sensitiveConfig.mailStorage) {
      const idef = this.root.pathRegistry[sensitiveConfig.mailStorage] as ItemDefinition;
      this.setMessageStorageItemDefinition(idef);
    }
  }

  /**
   * Sets the item definition that is in charge of the storage of the
   * messages, the item definition should have this shape
   * - subject, type string
   * - sender, type TODO
   * the creator will be the target of the message who holds the current username
   * for the given email
   * @param idef the item definition to use for storage
   */
  private setMessageStorageItemDefinition(idef: ItemDefinition) {
    // TODO check that is valid for the shape necessary
    this.storageIdef = idef;
  }

  public async sendUnverifiedTemplateEmail(
    arg: {
      fromUsername: string,
      fromEmailHandle: string,
      to: string | string[];
      subject: string;
      itemDefinition: ItemDefinition;
      property: PropertyDefinition;
      id: number;
      version?: string;
      args: any;
      unsubscribeMailto?: string;
      unsubscribeURLs?: {
        [email: string]: IUnsubscribeURL;
      },
    }
  ) {
    let templateValue: ISQLTableRowValue = null;
    let parsedTemplateValue: string = null;
    let textValue: string = null;

    if (arg.id) {
      try {
        templateValue = await this.cache.requestValue(arg.itemDefinition, arg.id, arg.version || null);

        if (!templateValue && arg.version) {
          templateValue = await this.cache.requestValue(arg.itemDefinition, arg.id, null);
        }

        if (templateValue && templateValue.content) {
          parsedTemplateValue = renderTemplate(
            templateValue.content,
            arg.args,
          );
        }
      } catch (err) {
        this.logError(
          "MailProvider.sendUnverifiedTemplateEmail [SERIOUS]: failed to retrieve item definition",
          {
            errMessage: err.message,
            errStack: err.stack,
            itemDefinition: arg.itemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        );
        throw err;
      }
    }

    if (!parsedTemplateValue) {
      textValue = "You do not have a template fragment setup for " +
        arg.itemDefinition.getQualifiedPathName() + "." + arg.id + "." + (arg.version || "");
      textValue += "\n\n" + JSON.stringify(arg.args, null, 2) + "\n";
    }

    const from = `${arg.fromUsername} <${arg.fromEmailHandle}@${this.sensitiveConfig.mailDomain}>`;

    const args: ISendEmailData = {
      from,
      to: arg.to,
      subject: arg.subject,
      unsubscribeMailto: arg.unsubscribeMailto,
      unsubscribeURLs: arg.unsubscribeURLs || {},
    }

    if (textValue) {
      args.text = textValue;
    } else {
      args.html = parsedTemplateValue;
    }

    if (args.to === null || (Array.isArray(args.to) && args.to.length === 0)) {
      logger && logger.warn(
        "MailProvider.sendUnverifiedTemplateEmail: Attempted to send an email without recepient",
        {
          args,
        },
      );
      return;
    }

    try {
      await this.sendEmail(args);
    } catch (err) {
      this.logError(
        "MailProvider.sendUnverifiedTemplateEmail [SERIOUS]: API failed to deliver an email",
        {
          errMessage: err.message,
          errStack: err.stack,
          args,
        },
      );
      throw err;
    }
  }

  public async sendTemplateEmail(
    arg: {
      fromUsername: string,
      fromEmailHandle: string,
      to: number | IGQLValue | ISQLTableRowValue | Array<number | IGQLValue | ISQLTableRowValue>;
      subject: string;
      itemDefinition: ItemDefinition;
      property: PropertyDefinition;
      id: number;
      version?: string;
      args: any;
      canUnsubscribe: boolean;
      ignoreUnsubscribe: boolean;
      subscribeProperty: string;
      emailProperty?: string;
      personalize?: string[];
    }
  ) {
    const emailPropertyUsed = arg.emailProperty || "email";
    if (!this.userIdef.hasPropertyDefinitionFor(emailPropertyUsed, true)) {
      this.logError(
        "MailProvider.sendTemplateEmail [SERIOUS]: there is no " + emailPropertyUsed + " property in the item definition for user",
        {
          subject: arg.subject,
          itemDefinition: arg.itemDefinition.getQualifiedPathName(),
          id: arg.id,
          version: arg.version,
        },
      );
      throw new Error("There is no " + emailPropertyUsed + " property in the item definition for user");
    }

    const hostname = process.env.NODE_ENV === "development" ?
      this.internalConfig.developmentHostname :
      this.internalConfig.productionHostname;

    let actualUsersToSend: any[] = Array.isArray(arg.to) ? arg.to : [arg.to];
    let actualUsersEmailsToSend: string[] = null;
    const unsubscribeURLs: {
      [email: string]: IUnsubscribeURL;
    } = {};

    const encodedSubscribeProperty = encodeURIComponent(arg.subscribeProperty);
    const unsubscribeMailto =
      arg.canUnsubscribe && arg.subscribeProperty ?
      "mailto:unsubscribe@" + hostname + "?subject=" + encodedSubscribeProperty + "&body=" + encodedSubscribeProperty :
      null;
    let personalization: Array<any> = arg.personalize ? [] : null;
    actualUsersEmailsToSend = await Promise.all(actualUsersToSend.map(async (u, index) => {
      let userData: ISQLTableRowValue | IGQLValue = u;
      if (typeof userData === "number") {
        userData = await this.cache.requestValue(
          this.userIdef,
          userData as number,
          null,
        );
      }

      if (!userData) {
        return null;
      }

      const email = userData.DATA ? userData.DATA[emailPropertyUsed] : userData[emailPropertyUsed];
      // we are subscribed to this if we have an email
      // otherwise we cannot even send such email
      let isSubscribed = !!email;
      if (email && !arg.ignoreUnsubscribe && arg.subscribeProperty) {
        if (userData.DATA) {
          isSubscribed = !!userData.DATA[arg.subscribeProperty];
        } else {
          isSubscribed = !!userData[arg.subscribeProperty];
        }
      }

      if (!isSubscribed) {
        return null;
      }

      if (email && arg.personalize) {
        personalization[index] = {
          email,
          [emailPropertyUsed]: email,
        };
        arg.personalize.forEach((p) => {
          personalization[index][p] = userData.DATA ? userData.DATA[p] : userData[p];
        });
      }

      if (email && arg.canUnsubscribe && arg.subscribeProperty && isSubscribed) {
        const tokenData: IUnsubscribeUserTokenDataType = {
          unsubscribeUserId: userData.id,
          unsubscribeProperty: arg.subscribeProperty,
        }
        const token = await jwtSign(tokenData, this.sensitiveConfig.secondaryJwtKey);
        const url = "https://" + hostname + "/rest/user/unsubscribe?userid=" + userData.id + "&token=" + encodeURIComponent(token);
        unsubscribeURLs[email] = {
          redirected: url,
          noRedirected: url + "&noredirect"
        };

        if (arg.personalize) {
          personalization[index].unsubscribeURL = url;
        }
      }

      return email || null;
    }));

    if (arg.personalize) {
      await Promise.all(actualUsersEmailsToSend.map(async (email, index) => {
        if (email === null) {
          return;
        }

        await this.sendUnverifiedTemplateEmail({
          fromUsername: arg.fromUsername,
          fromEmailHandle: arg.fromEmailHandle,
          to: email,
          subject: arg.subject,
          itemDefinition: arg.itemDefinition,
          property: arg.property,
          id: arg.id,
          version: arg.version,
          args: {
            ...arg.args,
            ...personalization[index],
          },
          unsubscribeMailto,
          unsubscribeURLs,
        });
      }));
    } else {
      actualUsersEmailsToSend = actualUsersEmailsToSend.filter((u) => {
        return (u !== null);
      });

      if (!actualUsersEmailsToSend.length) {
        return;
      }

      await this.sendUnverifiedTemplateEmail({
        fromUsername: arg.fromUsername,
        fromEmailHandle: arg.fromEmailHandle,
        to: actualUsersEmailsToSend,
        subject: arg.subject,
        itemDefinition: arg.itemDefinition,
        property: arg.property,
        id: arg.id,
        version: arg.version,
        args: arg.args,
        unsubscribeMailto,
        unsubscribeURLs,
      });
    }
  }

  /**
   * This method should get called once an email has been received
   * the service provider that extended the raw mail provider should
   * be able to trigger this function when specified, this function will
   * handle the mail configuration then and perform unsubscription tasks
   * @param data the email data received, make sure to fill this information
   * properly
   */
  public onEmailRecieved(data: IReceiveEmailData) {
    const userHandle = data.from.split("@")[0];
    if (userHandle === "unsubscribe") {

    } else if (this.storageIdef) {
      // TODO find the user for that user handle
      // attach a new message for it
    }
  }

  /**
   * This function is executed when the service
   * needs to send an email
   * @override
   */
  public async sendEmail(data: ISendEmailData): Promise<void> {
    this.logError(
      "MailProvider.sendEmail [SERIOUS]: Attempted to send an email with a raw provider, there's no API available to complete this action",
      data,
    );
  }
}