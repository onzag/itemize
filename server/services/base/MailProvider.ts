/**
 * This file specifies a base for creating a mail provider
 * and mail providers as, they contain functions that are
 * necessary and shouldn't be touched and others that should
 * be overriden into what is a standard service
 * 
 * @packageDocumentation
 */

import { logger } from "../..";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../../../config";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { renderTemplate } from "../../../client/internal/text";
import { Cache } from "../../cache";
import type { IGQLValue } from "../../../gql-querier";
import Root from "../../../base/Root";
import { jwtSign } from "../../token";
import { IUnsubscribeUserTokenDataType } from "../../user/rest";
import { IServiceProviderClassType, ServiceProvider } from "..";
import { RegistryService } from "../registry";

/**
 * The unsubscribe url form
 */
export interface IUnsubscribeURL {
  /**
   * A redirected url that redirects to the APP to show
   * a human readable message
   */
  redirected: string;
  /**
   * A non-redirected url, that simply will give a status
   * of 200 if succeeded
   */
  noRedirected: string;
}

/**
 * The shape of an email that is being wanted to be sent
 * TODO attachments
 */
export interface ISendEmailData {
  /**
   * This is the from line in the shape of
   * username <name@domain.com> that wants to specify
   * as the user
   */
  from: string;
  /**
   * A single email or a list of emails that are supposed
   * to be sent to
   */
  to: string | string[];
  /**
   * The subject attribute
   */
  subject: string;
  /**
   * The plain text content
   */
  text?: string;
  /**
   * The html content
   */
  html?: string;
  /**
   * if provided this represents a mailto protocol
   * that can be used for the List-Unsubscribe header
   * and it is fairly generic
   */
  unsubscribeMailto: string;
  /**
   * Unsubscribe urls are email specific and they can
   * also be used for the List-Unsubscribe header
   * however the mailto version should be preferred
   * over this one
   */
  unsubscribeURLs: {
    [email: string]: IUnsubscribeURL;
  };
}

/**
 * An interface that represents a class for the mail provider
 */
export interface IMailProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, registry: RegistryService, cache: Cache, root: Root, internalConfig: IConfigRawJSONDataType, sensitiveConfig: ISensitiveConfigRawJSONDataType): MailProvider<T>;
}

/**
 * This interface represents how an email is
 * received
 */
export interface IReceiveEmailData {
  from: string;
  to: string;
  subject: string;
  content: string;
}

/**
 * The MailProvider class is a service that provides mailing
 * functionality to the itemize server side app
 * 
 * The MailProvider class is a special class, and does not support
 * global mode, even if specified
 */
export default class MailProvider<T> extends ServiceProvider<T> {
  /**
   * This is the basic config of the app given by the json file
   * it's named internalConfig because config is already taken
   */
  public internalConfig: IConfigRawJSONDataType;
  /**
   * The sensitive config
   */
  public sensitiveConfig: ISensitiveConfigRawJSONDataType;
  /**
   * The cache
   */
  public cache: Cache;
  /**
   * The root instance
   */
  public root: Root;
  /**
   * the user item definition
   */
  private userIdef: ItemDefinition;
  /**
   * the storage item definition
   */
  private storageIdef: ItemDefinition;

  /**
   * Constructs a new mail provider
   * @param config the configuration used
   * @param registry the registry service
   * @param cache the cache instance
   * @param root the root instance
   * @param internalConfig the configuration from the json files
   * @param sensitiveConfig the sensitive configuration from the json files
   */
  constructor(config: T, registry: RegistryService, cache: Cache, root: Root, internalConfig: IConfigRawJSONDataType, sensitiveConfig: ISensitiveConfigRawJSONDataType) {
    super(config, registry);

    this.internalConfig = internalConfig;
    this.root = root;
    this.cache = cache;
    this.sensitiveConfig = sensitiveConfig;
    this.userIdef = this.root.getModuleFor(["users"]).getItemDefinitionFor(["user"]);
    this.storageIdef = null;

    // if we have supported mail storage
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
   * 
   * TODO
   * 
   * @param idef the item definition to use for storage
   */
  private setMessageStorageItemDefinition(idef: ItemDefinition) {
    // TODO check that is valid for the shape necessary
    this.storageIdef = idef;
  }

  /**
   * Sends a template based email to a given user and it
   * will not filter any of these users
   * @param arg the unverified args
   * @param arg.fromUserName the username that is sending this email (this is not the email, just the username)
   * @param arg.fromEmailHandle this is the email handle side before the @domain.com
   * @param arg.to the list of emails to send to
   * @param arg.subject the subject of the message
   * @param arg.itemDefinition either a string that represents an item definition that can be pulled from the registry
   * or an item definition itself that represents the item definition to be used for templating
   * @param arg.property the property that the value is extracted for and should be a text type
   * @param arg.id the id for the given item we need to pull
   * @param arg.version an optional version value to use, this version is expected to be a locale version, as such
   * unversioned values will be used as fallback if the version is not found
   * @param arg.args the template args
   * @param arg.unsubscribeMailto an optional mailto: protocol unsubscription mechanism to be added to the headers
   * @param arg.unsubscribeURLs urls per email to perform unsubscription
   */
  public async sendUnverifiedTemplateEmail(
    arg: {
      fromUsername: string,
      fromEmailHandle: string,
      to: string | string[];
      subject: string;
      itemDefinition: string | ItemDefinition;
      property: string | PropertyDefinition;
      id: number;
      version?: string;
      args: any;
      unsubscribeMailto?: string;
      unsubscribeURLs?: {
        [email: string]: IUnsubscribeURL;
      },
    }
  ) {
    // retrieve the item definition
    const actualItemDefinition =
      typeof arg.itemDefinition === "string" ?
        this.root.registry[arg.itemDefinition] as ItemDefinition :
        arg.itemDefinition;

    // if for some reson we have none to send to
    if (arg.to === null || (Array.isArray(arg.to) && arg.to.length === 0)) {
      logger && logger.warn(
        "MailProvider.sendUnverifiedTemplateEmail: Attempted to send an email without recepient",
        {
          fromUsername: arg.fromUsername,
          fromEmailHandle: arg.fromEmailHandle,
          itemDefinition: actualItemDefinition.getQualifiedPathName(),
          id: arg.id,
          version: arg.version,
        },
      );
      return;
    }

    // retrieve the property
    const actualProperty = typeof arg.property === "string" ?
      actualItemDefinition.getPropertyDefinitionFor(arg.property, true) :
      arg.property;

    // now we need to build the template
    let templateValue: ISQLTableRowValue = null;
    let parsedTemplateValue: string = null;
    let textValue: string = null;

    // if we have an id
    if (arg.id) {
      // let's try to fetcth that value
      try {
        templateValue = await this.cache.requestValue(actualItemDefinition, arg.id, arg.version || null);

        // if not found and we have a version, what we assume is a language
        // we fallback to the unversioned
        if (!templateValue && arg.version) {
          templateValue = await this.cache.requestValue(actualItemDefinition, arg.id, null);
        }

        // now we need the property value
        const propertyId = actualProperty.getId();

        // and we extract it
        if (templateValue && templateValue[propertyId]) {
          // calling the render template function
          parsedTemplateValue = renderTemplate(
            templateValue[propertyId],
            arg.args,
          );
        }
      } catch (err) {
        this.logError(
          "MailProvider.sendUnverifiedTemplateEmail [SERIOUS]: failed to retrieve item definition",
          {
            errMessage: err.message,
            errStack: err.stack,
            itemDefinition: actualItemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        );
        throw err;
      }
    }

    // if we don't have a parsed template value
    if (!parsedTemplateValue) {
      // we just inform we couldn't get such a thing, in the text value
      // which is not HTML
      textValue = "You do not have a template fragment setup for " +
        actualItemDefinition.getQualifiedPathName() + "." + arg.id + "." + (arg.version || "");
      textValue += "\n\n" + JSON.stringify(arg.args, null, 2) + "\n";
    }

    // build the from handle
    const from = `${arg.fromUsername} <${arg.fromEmailHandle}@${this.sensitiveConfig.mailDomain}>`;

    // setup the args
    const args: ISendEmailData = {
      from,
      to: arg.to,
      subject: arg.subject,
      unsubscribeMailto: arg.unsubscribeMailto,
      unsubscribeURLs: arg.unsubscribeURLs || {},
    }

    // if we have a text value
    // we just make it a text type
    if (textValue) {
      args.text = textValue;
    } else {
      // otherwise good old html
      args.html = parsedTemplateValue;
    }

    // now we can send the email
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

  /**
   * Sends a template based email to a given user
   * this way to send things will create unsubscribe urls
   * and ensure users that have opted out do not receive
   * such messages, so this is the best way to send emails
   * @param arg the unverified args
   * @param arg.fromUserName the username that is sending this email (this is not the email, just the username)
   * @param arg.fromEmailHandle this is the email handle side before the @domain.com
   * @param arg.to this is a special list of values to send to the users that we want to send to, they can be
   * specified as the list of ids, aka user identifiers of the given users, but grapqhl values or sql values
   * are allowed as well and they improve speed up, remember to pass whole results with all the properties
   * you are using or otherwise it might misbehave
   * @param arg.subject the subject of the message
   * @param arg.itemDefinition either a string that represents an item definition that can be pulled from the registry
   * or an item definition itself that represents the item definition to be used for templating
   * @param arg.property the property that the value is extracted for and should be a text type
   * @param arg.id the id for the given item we need to pull
   * @param arg.version an optional version value to use, this version is expected to be a locale version, as such
   * unversioned values will be used as fallback if the version is not found
   * @param arg.args the template args
   * @param arg.canUnsubscribe whether the user is able to unsubscribe from this email
   * requires the subscribeProperty value to be defined in order to work
   * @param arg.ignoreUnsubscribe whether we should ignore the subscription values for
   * the given user so they will receive the email anyway regardless of their subscription status
   * this should never really be true
   * @param arg.emailProperty the email property to use to send emails, normally users only have a single
   * email property so this isn't necessary but they might have some alternative email property to use
   * as target email
   * @param arg.personalize if specified it will make each template personalized, it will add the email
   * to the template args, and any other property that is specified on this list to the args, using personalization
   * when sending to multiple users can hurt your mail speed as every user will receive a different email that
   * needs to be built, personalize will also add a unsubscribe_url to the args, you might pass an empty array
   * if you just want that
   */
  public async sendTemplateEmail(
    arg: {
      fromUsername: string,
      fromEmailHandle: string,
      to: number | IGQLValue | ISQLTableRowValue | Array<number | IGQLValue | ISQLTableRowValue>;
      subject: string;
      itemDefinition: string | ItemDefinition;
      property: string | PropertyDefinition;
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
    // first we need the email property
    const emailPropertyUsed = arg.emailProperty || "email";
    // and we expect the user item definition to have it
    if (!this.userIdef.hasPropertyDefinitionFor(emailPropertyUsed, true)) {
      this.logError(
        "MailProvider.sendTemplateEmail [SERIOUS]: there is no " + emailPropertyUsed + " property in the item definition for user",
        {
          subject: arg.subject,
          itemDefinition: typeof arg.itemDefinition === "string" ? arg.itemDefinition : arg.itemDefinition.getQualifiedPathName(),
          id: arg.id,
          version: arg.version,
        },
      );
      throw new Error("There is no " + emailPropertyUsed + " property in the item definition for user");
    }

    // we need to check the subscribe property too
    if (arg.subscribeProperty && !this.userIdef.hasPropertyDefinitionFor(arg.subscribeProperty, true)) {
      this.logError(
        "MailProvider.sendTemplateEmail [SERIOUS]: there is no " + arg.subscribeProperty + " property in the item definition for user",
        {
          subject: arg.subject,
          itemDefinition: typeof arg.itemDefinition === "string" ? arg.itemDefinition : arg.itemDefinition.getQualifiedPathName(),
          id: arg.id,
          version: arg.version,
        },
      );
      throw new Error("There is no " + arg.subscribeProperty + " property in the item definition for user");
    }

    // now we need the hostname
    const hostname = process.env.NODE_ENV === "development" ?
      this.internalConfig.developmentHostname :
      this.internalConfig.productionHostname;

    // and we are going to make this an array
    let actualUsersToSend: any[] = Array.isArray(arg.to) ? arg.to : [arg.to];
    // and let's figure out the emails and unsubscribe urls for each
    let actualUsersEmailsToSend: string[] = null;
    const unsubscribeURLs: {
      [email: string]: IUnsubscribeURL;
    } = {};

    // let's build the unsubscribe mail to protocol of course only if we
    // are able to unsubscribe from this and have a subscribe property
    // and we make up the email
    // note that unsubscribe is a protected user in itemize
    const encodedSubscribeProperty = encodeURIComponent(arg.subscribeProperty);
    const unsubscribeMailto =
      arg.canUnsubscribe && arg.subscribeProperty ?
      "mailto:unsubscribe@" + hostname + "?subject=" + encodedSubscribeProperty + "&body=" + encodedSubscribeProperty :
      null;

    // now we need to setup the personalization, if we have any
    // these are going to be the personalization args per user
    // so an array of args, null if we are not personalizing
    let personalization: Array<any> = arg.personalize ? [] : null;

    // now we need to setup the actual users we are sending to, as in their emails
    actualUsersEmailsToSend = await Promise.all(actualUsersToSend.map(async (u, index) => {

      // we need the user value, if we have a number
      // we will have to request it from the cache
      let userData: ISQLTableRowValue | IGQLValue = u;
      if (typeof userData === "number") {
        userData = await this.cache.requestValue(
          this.userIdef,
          userData as number,
          null,
        );
      }

      // if there's no value, there's no user,
      // return null
      if (!userData) {
        return null;
      }

      // now we need the email of that user based on the given email
      const email = userData.DATA ? userData.DATA[emailPropertyUsed] : userData[emailPropertyUsed];

      // if we don't have an email at all then we return null as we cannot
      // send to that user
      if (!email) {
        return null;
      }

      // now we need to check the subscription status
      // by default we are indeed sending
      let shouldSend = true;
      // if we are not ignoring the unsubscribe and we have a subscribe property
      if (!arg.ignoreUnsubscribe && arg.subscribeProperty) {
        // let's get the value from there whether we should send
        if (userData.DATA) {
          shouldSend = !!userData.DATA[arg.subscribeProperty];
        } else {
          shouldSend = !!userData[arg.subscribeProperty];
        }
      }

      // if we shouldn't send, then return null
      if (!shouldSend) {
        return null;
      }

      // if we are personalizing let's make these
      // args for personalization in the array
      if (arg.personalize) {
        personalization[index] = {
          email,
          [emailPropertyUsed]: email,
        };
        // per personalize property we copy it in the new array
        arg.personalize.forEach((p) => {
          personalization[index][p] = userData.DATA ? userData.DATA[p] : userData[p];
        });
      }

      // now let's build the unsubscription urls
      if (arg.canUnsubscribe && arg.subscribeProperty && shouldSend) {
        // first let's build a token for it
        const tokenData: IUnsubscribeUserTokenDataType = {
          unsubscribeUserId: userData.id,
          unsubscribeProperty: arg.subscribeProperty,
        }
        // and make up the url based on that
        const token = await jwtSign(tokenData, this.sensitiveConfig.secondaryJwtKey);
        const url = "https://" + hostname + "/rest/user/unsubscribe?userid=" + userData.id + "&token=" + encodeURIComponent(token);
        // create the url
        unsubscribeURLs[email] = {
          redirected: url,
          noRedirected: url + "&noredirect"
        };

        // if we are also personalizing we add the given url
        if (arg.personalize) {
          personalization[index].unsubscribe_url = url;
        }
      }

      // return the email
      return email;
    }));

    // now we need to send the templates
    // we have the emails we want to send to
    // the send process is different depending on whether
    // it personalized emails or not
    if (arg.personalize) {
      // now we get all these emails
      await Promise.all(actualUsersEmailsToSend.map(async (email, index) => {
        // the ones that are not null of course
        if (email === null) {
          return;
        }

        // and we will send one by one, and add the personalization
        // attributes of the given index to the args for the template
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
      // otherwise we just filter this list
      actualUsersEmailsToSend = actualUsersEmailsToSend.filter((u) => {
        return (u !== null);
      });

      // if there's none left we return
      if (!actualUsersEmailsToSend.length) {
        return;
      }

      // otherwise we send these for all the given users
      // it's the same email after all same HTML content
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
      // TODO do the unsubscribe via the cache
      // we have the email, we will need knex in order
      // to find the user it belongs to and then
      // we can request an update
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