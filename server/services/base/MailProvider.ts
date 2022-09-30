/**
 * This file specifies a base for creating a mail provider
 * and mail providers as, they contain functions that are
 * necessary and shouldn't be touched and others that should
 * be overriden into what is a standard service
 * 
 * @module
 */

import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { renderTemplate } from "../../../client/internal/text";
import type { IGQLValue } from "../../../gql-querier";
import { jwtSign } from "../../token";
import { IUnsubscribeUserTokenDataType } from "../../user/rest";
import { ServiceProvider, ServiceProviderType } from "..";
import { NODE_ENV } from "../../environment";
import { PropertyDefinitionSupportedFilesType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { IOTriggerActions, ITriggerRegistry } from "../../resolvers/triggers";

export interface IMailResolverInfo {
  target: string;
}

export interface IMailResolverResponse {
  email: string[];
  userId: string[];
}

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
 */
export interface ISendEmailData {
  /**
   * This is the from line in the shape of
   * username <name@domain.com> that wants to specify
   * as the user
   */
  from: string;
  /**
   * The sender, original sender, if the email was forwarded
   */
  fromForwarded?: string;
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
   * Array of attachments to be added
   */
  attachments?: File[];
  /**
   * no reply email
   */
  noReply?: boolean;
  /**
   * if provided this represents a mailto protocol
   * that can be used for the List-Unsubscribe header
   * and it is fairly generic
   */
  unsubscribeMailto?: string;
  /**
   * Unsubscribe urls are email specific and they can
   * also be used for the List-Unsubscribe header
   * however the mailto version should be preferred
   * over this one
   */
  unsubscribeURLs?: {
    [email: string]: IUnsubscribeURL;
  };
}

/**
 * This interface represents how an email is
 * received
 */
export interface IReceiveEmailData {
  from: string;
  fromUsername?: string;
  to: string;
  subject: string;
  html: string;
  attachments: File[];

  spam?: boolean;
}

const symbols = "+,|-?<>=!";

/**
 * The MailProvider class is a service that provides mailing
 * functionality to the itemize server side app
 * 
 * The MailProvider class is a special class, and does not support
 * global mode, even if specified
 */
export default class MailProvider<T> extends ServiceProvider<T> {
  public static getType() {
    return ServiceProviderType.HYBRID;
  }

  /**
   * the storage item definition
   */
  private storageIdef: ItemDefinition;

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

  public escapeUserName(name: string) {
    Array.from(name).map((v) => symbols.includes(v) ? " " : v).join("");
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
      id: string;
      version?: string;
      args: any;
      unsubscribeMailto?: string;
      unsubscribeURLs?: {
        [email: string]: IUnsubscribeURL;
      },
    }
  ) {
    const root = this.isInstanceLocal() ? this.localAppData.root : this.globalRoot;

    // retrieve the item definition
    const actualItemDefinition =
      typeof arg.itemDefinition === "string" ?
        root.registry[arg.itemDefinition] as ItemDefinition :
        arg.itemDefinition;

    // if for some reson we have none to send to
    if (arg.to === null || (Array.isArray(arg.to) && arg.to.length === 0)) {
      this.logError(
        {
          className: "MailProvider",
          methodName: "sendUnverifiedTemplateEmail",
          message: "Attempted to send an email without recepient",
          data: {
            fromUsername: arg.fromUsername,
            fromEmailHandle: arg.fromEmailHandle,
            itemDefinition: actualItemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
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
        templateValue = this.isInstanceLocal() ?
          await this.localAppData.cache.requestValue(actualItemDefinition, arg.id, arg.version || null) :
          (
            await this.globalRawDB.performRawDBSelect(actualItemDefinition, (builder) => {
              builder.selectAll().limit(1);
              builder.whereBuilder.andWhereMany({
                id: arg.id,
                version: arg.version || "",
              });
            })
          )[0] || null;

        // if not found and we have a version, what we assume is a language
        // we fallback to the unversioned
        if (!templateValue && arg.version) {
          templateValue = this.isInstanceLocal() ?
            await this.localAppData.cache.requestValue(actualItemDefinition, arg.id, null) :
            (
              await this.globalRawDB.performRawDBSelect(actualItemDefinition, (builder) => {
                builder.selectAll().limit(1);
                builder.whereBuilder.andWhereMany({
                  id: arg.id,
                  version: "",
                });
              })
            )[0] || null;
        }

        // now we need the property value
        const propertyId = actualProperty.getId();
        const mediaProperty = actualProperty.getSpecialProperty("mediaProperty");

        // and we extract it
        if (templateValue && templateValue[propertyId]) {
          let currentFiles: PropertyDefinitionSupportedFilesType;
          try {
            currentFiles = mediaProperty ? JSON.parse(templateValue[mediaProperty]) : null;
          } catch {
            currentFiles = null;
          }

          const isRichText = actualProperty.isRichText();
          const supportsVideos = isRichText && !!actualProperty.getSpecialProperty("supportsVideos");
          const supportsImages = mediaProperty && !!actualProperty.getSpecialProperty("supportsImages");
          const supportsFiles = mediaProperty && !!actualProperty.getSpecialProperty("supportsFiles");
          const supportsContainers = actualProperty.getSpecialProperty("supportsContainers");
          const supportedContainers = actualProperty.getSpecialProperty("supportedContainers");
          const supportsTables = actualProperty.getSpecialProperty("supportsTables");
          const supportedTables = actualProperty.getSpecialProperty("supportedTables");
          const supportsLists = actualProperty.getSpecialProperty("supportsLists");
          const supportsCustom = actualProperty.getSpecialProperty("supportsCustom");
          const supportedCustoms = actualProperty.getSpecialProperty("supportedCustoms");
          const supportsExternalLinks = actualProperty.getSpecialProperty("supportsExternalLinks");
          const supportsLinks = actualProperty.getSpecialProperty("supportsLinks");
          const supportsQuote = actualProperty.getSpecialProperty("supportsQuote");
          const supportsRichClasses = actualProperty.getSpecialProperty("supportsRichClasses");
          const supportedRichClasses = actualProperty.getSpecialProperty("supportedRichClasses");
          const supportsTitle = actualProperty.getSpecialProperty("supportsTitle");
          const supportsCustomStyles = actualProperty.getSpecialProperty("supportsCustomStyles");
          const supportsTemplating = actualProperty.getSpecialProperty("supportsTemplating");

          // calling the render template function
          parsedTemplateValue = renderTemplate(
            {
              cacheFiles: false,
              config: this.appConfig,
              containerId: templateValue.container_id,
              currentFiles,
              forId: arg.id,
              forVersion: arg.version,
              forceFullURLs: true,
              mediaProperty,
              itemDefinition: actualItemDefinition,
              include: null,
            },
            {
              supportsFiles,
              supportsImages,
              supportsFilesAccept: "*",
              supportsImagesAccept: "*",
              supportsVideos,
              supportsLists,
              supportsContainers,
              supportsCustom,
              supportsExternalLinks,
              supportsLinks,
              supportsQuote,
              supportsRichClasses,
              supportsTitle,
              supportsCustomStyles,
              supportsTemplating,
              supportedRichClasses,
              supportedCustoms,
              supportedContainers,
              supportsTables,
              supportedTables,
            },
            templateValue[propertyId],
            arg.args,
          );
        }
      } catch (err) {
        this.logError(
          {
            className: "MailProvider",
            methodName: "sendUnverifiedTemplateEmail",
            message: "Failed to retrieve item definition",
            serious: true,
            err,
            data: {
              itemDefinition: actualItemDefinition.getQualifiedPathName(),
              id: arg.id,
              version: arg.version,
            },
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
    const from = `${this.escapeUserName(arg.fromUsername)} <${arg.fromEmailHandle}@${this.appConfig.mailDomain}>`;

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
        {
          className: "MailProvider",
          methodName: "sendUnverifiedTemplateEmail",
          message: "API failed to deliver an email",
          serious: true,
          err,
          data: {
            args,
          },
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
      to: string | IGQLValue | ISQLTableRowValue | Array<string | IGQLValue | ISQLTableRowValue>;
      subject: string;
      itemDefinition: string | ItemDefinition;
      property: string | PropertyDefinition;
      id: string;
      version?: string;
      args: any;
      canUnsubscribe: boolean;
      ignoreUnsubscribe: boolean;
      subscribeProperty: string;
      confirmationProperties?: string[];
      emailProperty?: string;
      personalize?: string[];
    }
  ) {
    const root = this.isInstanceGlobal() ? this.globalRoot : this.localAppData.root;
    const userIdef = root.registry["users/user"] as ItemDefinition;

    // first we need the email property
    const emailPropertyUsed = arg.emailProperty || "email";
    // and we expect the user item definition to have it
    if (!userIdef.hasPropertyDefinitionFor(emailPropertyUsed, true)) {
      this.logError(
        {
          className: "MailProvider",
          methodName: "sendTemplateEmail",
          message: "There is no " + emailPropertyUsed + " property in the item definition for user",
          serious: true,
          data: {
            subject: arg.subject,
            itemDefinition: typeof arg.itemDefinition === "string" ? arg.itemDefinition : arg.itemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        },
      );
      throw new Error("There is no " + emailPropertyUsed + " property in the item definition for user");
    }

    // we need to check the subscribe property too
    if (arg.subscribeProperty && !userIdef.hasPropertyDefinitionFor(arg.subscribeProperty, true)) {
      this.logError(
        {
          className: "MailProvider",
          methodName: "sendTemplateEmail",
          message: "There is no " + arg.subscribeProperty + " property in the item definition for user",
          serious: true,
          data: {
            subject: arg.subject,
            itemDefinition: typeof arg.itemDefinition === "string" ? arg.itemDefinition : arg.itemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        },
      );
      throw new Error("There is no " + arg.subscribeProperty + " property in the item definition for user");
    }

    // now we need the hostname
    const hostname = NODE_ENV === "development" ?
      this.appConfig.developmentHostname :
      this.appConfig.productionHostname;

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
      if (typeof userData === "string") {
        userData = this.isInstanceLocal() ?
          await this.localAppData.cache.requestValue(
            userIdef,
            userData as string,
            null,
          ) :
          (
            await this.globalRawDB.performRawDBSelect(
              userIdef,
              (builder) => {
                builder.selectAll().limit(1);
                builder.whereBuilder.andWhereMany({
                  id: userData as any,
                  version: "",
                });
              }
            )
          )[0] || null;
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

      // other confirmation properties to use
      if (arg.confirmationProperties && shouldSend) {
        shouldSend = arg.confirmationProperties.every((confirmationPropertyId) => {
          // let's get the value from there whether we should send
          if (userData.DATA) {
            return !!userData.DATA[confirmationPropertyId];
          } else {
            return !!userData[confirmationPropertyId];
          }
        });
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
        const token = await jwtSign(tokenData, this.appSensitiveConfig.secondaryJwtKey);
        const url = "https://" + hostname + "/rest/user/unsubscribe?userid=" + encodeURIComponent(userData.id) + "&token=" + encodeURIComponent(token);
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
  public async onExternalEmailRecieved(data: IReceiveEmailData) {
    const targetUserHandle = data.to.split("@")[0];
    const rawDB = this.isInstanceGlobal() ? this.globalRawDB : this.localAppData.rawDB;

    const userIdef = (
      this.isInstanceGlobal() ?
        this.globalRoot.registry["users/user"] :
        this.localAppData.root.registry["users/user"]
    ) as ItemDefinition;

    // we need this to be able to receive external emails
    const hasEmail = userIdef.hasPropertyDefinitionFor("email", false);
    const hasEvalidated = userIdef.hasPropertyDefinitionFor("e_validated", false);
    const hasEExternal = userIdef.hasPropertyDefinitionFor("e_external", false);

    // if somehow user has no email or emails cannot be validated
    // we cannot allow external emails to be received
    if (!hasEmail || !hasEvalidated) {
      return;
    }

    // if this is an unsubscribe email action
    if (targetUserHandle === "unsubscribe") {
      // let's find what we are unsubscribing for
      const unsubscribePropertyId = data.subject || "";
      const hasUnsubscribeProperty = userIdef.hasPropertyDefinitionFor(unsubscribePropertyId, false);

      if (!hasUnsubscribeProperty) {
        return;
      }

      const unsubscribeProperty = userIdef.getPropertyDefinitionFor(unsubscribePropertyId, false);
      if (unsubscribeProperty.getPropertyDefinitionDescription().json !== "boolean") {
        return;
      }

      // get the user in question that suits the given email
      const users = await rawDB.performRawDBSelect(
        userIdef,
        (b) => {
          b.select("id", unsubscribePropertyId).whereBuilder.andWhereColumn("email", data.from).andWhereColumn("e_validated", true);
          b.limit(1);
        }
      );

      const user = users[0];

      if (!user || !user[unsubscribePropertyId]) {
        return;
      }

      // and unsubscribe from such property
      await rawDB.performRawDBUpdate(
        userIdef,
        user.id,
        null,
        {
          itemTableUpdate: {
            [unsubscribePropertyId]: false,
          },
        },
      );
    } else {
      // we may check for a potential sender that has used their email externally
      // in order to reply
      const potentialSender = (await rawDB.performRawDBSelect(
        userIdef,
        (b) => {
          b.selectAll().whereBuilder.andWhereColumn("email", data.from).andWhereColumn("e_validated", true);
          b.limit(1);
        }
      ))[0] || null;

      if (potentialSender && potentialSender.e_validated && this.storageIdef) {
        // TODO
        // store email in senders outbox, the email may be invalid and not have been received by
        // anyone if no such user exists, but we are storing it anyway
      }

      if (hasEExternal) {
        // now let's grab the user that received such email
        const users = await rawDB.performRawDBSelect(
          userIdef,
          (b) => {
            b.selectAll().whereBuilder.andWhereColumn("username", targetUserHandle);
            b.limit(1);
          }
        );

        // here
        const user = users[0];
        // no user we are done and we disregard such email
        if (!user) {
          return;
        }

        // otherwise let's see if we should receive such email
        const shouldReceive = user.e_external;

        // if the user is marked with e_external as false, then that means they don't
        // want to receive external email
        if (!shouldReceive) {
          return;
        }

        // we pass through the filter too
        const shouldReceiveAllowed = await this.allowUserToReceiveExternalEmail(
          user,
          potentialSender,
          data,
        );

        // the filter rejects it
        if (shouldReceiveAllowed === "REJECT") {
          return;
        }

        // TODO
        // attach a new message for it in the idef
        if (this.storageIdef) {
          const isSpam = shouldReceiveAllowed === "SPAM";

          // we have a known sender that was using their own
          // email to contact users inside but they have their own
          // email inside that is validated in that sense
          // we will store it as that sender and do not leak the sender's actual
          // email to the receiver
          if (potentialSender) {
            // TODO use the internal user's information
          } else {
            // use external information
          }
        }

        // same here if the sender exists the default function
        // will not leak the sender's email and use its own
        // external email or otherwise notifications
        await this.onUserReceivedExternalEmail(
          user,
          potentialSender,
          data,
          data.spam || shouldReceiveAllowed === "SPAM",
        );
      }
    }
  }

  /**
   * @override use to filter spam and unwanted emails
   * @param user the user that is receiving the email
   * @param source the source will always be an email
   * @param data the data that is being received
   * @returns SPAM for when to mark it as spam, REJECT for rejecting the message entirely, ACCEPT for accepting it
   */
  public async allowUserToReceiveExternalEmail(user: ISQLTableRowValue, internalSender: ISQLTableRowValue, data: IReceiveEmailData): Promise<"SPAM" | "REJECT" | "ACCEPT"> {
    return "ACCEPT";
  }

  /**
   * @override to filter spam and unwanted emails
   * triggers when an user is trying to send an email to another, when the target is a sql value
   * it means that its using internal solving, as in two users that are in the same system, if the value
   * is a plain string, it means it's trying to solve 
   * @returns SPAM only works for internal usage and the message will be marked as spam for the recepient
   * REJECT will not send the message on its entirety, and ACCEPT will send the message
   */
  public async allowUserToSendEmail(user: ISQLTableRowValue, target: string | ISQLTableRowValue): Promise<"SPAM" | "REJECT" | "ACCEPT"> {
    return "ACCEPT";
  }

  /**
   * @override
   * An user received an email from an external source to their internal email, eg. from dude@gmail.com to girl@mysite.com
   * by default this function will send an email notification based on the subscribe e_notifications property
   * unless marked as spam
   * @param user the user that got the external email
   * @param internalSender the user that sent the message (or null) if it couldn't find one
   * @param data the external email itself
   * @param spam whether it was marked as spam, note that data.spam is whether it was marked by spam by the provider
   * whereas this spam variable is affected by that as well as by allowUserToReceiveExternalEmail
   */
  public async onUserReceivedExternalEmail(user: ISQLTableRowValue, internalSender: ISQLTableRowValue, data: IReceiveEmailData, spam: boolean) {
    const root = this.isInstanceGlobal() ? this.globalRoot : this.localAppData.root;
    const userIdef = root.registry["users/user"] as ItemDefinition;

    const hasEnotifications = userIdef.hasPropertyDefinitionFor("e_notifications", false);
    const hasEvalidated = userIdef.hasPropertyDefinitionFor("e_validated", false);

    if (!hasEnotifications || !hasEvalidated || spam || !user.e_notifications || !user.e_validated) {
      return;
    }

    const hostname = NODE_ENV === "development" ?
      this.appConfig.developmentHostname :
      this.appConfig.productionHostname;

    // first let's build a token for it
    const tokenData: IUnsubscribeUserTokenDataType = {
      unsubscribeUserId: user.id,
      unsubscribeProperty: "e_notifications",
    };

    // and make up the url based on that
    const token = await jwtSign(tokenData, this.appSensitiveConfig.secondaryJwtKey);
    const url = (
      "https://" + hostname + "/rest/user/unsubscribe?userid=" + encodeURIComponent(user.id) + "&token=" + encodeURIComponent(token)
    );

    // random person that is not in the system
    if (!internalSender) {
      this.sendEmail({
        from: this.escapeUserName(data.fromUsername || data.from.split("@")[0].trim()) + " <notifications@" + this.appConfig.mailDomain + ">",
        fromForwarded: data.from,
        to: user.email,
        subject: data.subject,
        html: data.html,
        attachments: data.attachments,
        noReply: true,
        unsubscribeMailto: "mailto:unsubscribe@" + hostname + "?subject=e_notifications&body=e_notifications",
        unsubscribeURLs: {
          [user.email]: {
            redirected: url,
            noRedirected: url + "&noredirect"
          },
        }
      });
    } else {
      // treat it the same as an internal message
      const senderInternalEmail = internalSender.e_external ? internalSender.username + "@" + this.appConfig.mailDomain : null;
      this.sendEmail({
        from: this.escapeUserName(internalSender.real_name || internalSender.actual_name || internalSender.name || internalSender.username) +
          (senderInternalEmail ? " <" + senderInternalEmail + ">" : " <notifications@" + this.appConfig.mailDomain + ">"),
        noReply: !senderInternalEmail,
        to: user.email,
        subject: data.subject,
        html: data.html,
        attachments: data.attachments,
        unsubscribeMailto: "mailto:unsubscribe@" + hostname + "?subject=e_notifications&body=e_notifications",
        unsubscribeURLs: {
          [user.email]: {
            redirected: url,
            noRedirected: url + "&noredirect"
          },
        }
      });
    }
  }

  public renderMessageForMail(message: ISQLTableRowValue) {
    const actualProperty = this.storageIdef.getPropertyDefinitionFor("content", false);
    const mediaProperty = actualProperty.getSpecialProperty("mediaProperty");

    const isRichText = actualProperty.isRichText();
    const supportsVideos = isRichText && !!actualProperty.getSpecialProperty("supportsVideos");
    const supportsImages = mediaProperty && !!actualProperty.getSpecialProperty("supportsImages");
    const supportsFiles = mediaProperty && !!actualProperty.getSpecialProperty("supportsFiles");
    const supportsContainers = actualProperty.getSpecialProperty("supportsContainers");
    const supportedContainers = actualProperty.getSpecialProperty("supportedContainers");
    const supportsTables = actualProperty.getSpecialProperty("supportsTables");
    const supportedTables = actualProperty.getSpecialProperty("supportedTables");
    const supportsLists = actualProperty.getSpecialProperty("supportsLists");
    const supportsCustom = actualProperty.getSpecialProperty("supportsCustom");
    const supportedCustoms = actualProperty.getSpecialProperty("supportedCustoms");
    const supportsExternalLinks = actualProperty.getSpecialProperty("supportsExternalLinks");
    const supportsLinks = actualProperty.getSpecialProperty("supportsLinks");
    const supportsQuote = actualProperty.getSpecialProperty("supportsQuote");
    const supportsRichClasses = actualProperty.getSpecialProperty("supportsRichClasses");
    const supportedRichClasses = actualProperty.getSpecialProperty("supportedRichClasses");
    const supportsTitle = actualProperty.getSpecialProperty("supportsTitle");
    const supportsCustomStyles = actualProperty.getSpecialProperty("supportsCustomStyles");
    const supportsTemplating = actualProperty.getSpecialProperty("supportsTemplating");

    let currentFiles: PropertyDefinitionSupportedFilesType;
    try {
      currentFiles = mediaProperty ? JSON.parse(message[mediaProperty]) : null;
    } catch {
      currentFiles = null;
    }

    // calling the render template function
    const html = renderTemplate(
      {
        cacheFiles: false,
        config: this.appConfig,
        containerId: message.container_id,
        currentFiles,
        forId: message.id,
        forVersion: message.version || null,
        forceFullURLs: true,
        mediaProperty,
        itemDefinition: this.storageIdef,
        include: null,
      },
      {
        supportsFiles,
        supportsImages,
        supportsFilesAccept: "*",
        supportsImagesAccept: "*",
        supportsVideos,
        supportsLists,
        supportsContainers,
        supportsCustom,
        supportsExternalLinks,
        supportsLinks,
        supportsQuote,
        supportsRichClasses,
        supportsTitle,
        supportsCustomStyles,
        supportsTemplating,
        supportedRichClasses,
        supportedCustoms,
        supportedContainers,
        supportsTables,
        supportedTables,
      },
      message.content,
      {},
    );

    return html;
  }

  /**
   * @override
   * An user received an email from one user to another user in the same domain, this is an internal
   * message, in this case email addresses may not be explicit
   * by default the message is assumed to have the right shape for the storage idef definition and will
   * be used to render a message clone and send it to the targets real email
   */
  public async onUserReceivedInternalEmail(user: ISQLTableRowValue, sender: ISQLTableRowValue, message: ISQLTableRowValue, spam: boolean) {
    const root = this.isInstanceGlobal() ? this.globalRoot : this.localAppData.root;
    const userIdef = root.registry["users/user"] as ItemDefinition;

    const hasEnotifications = userIdef.hasPropertyDefinitionFor("e_notifications", false);
    const hasEvalidated = userIdef.hasPropertyDefinitionFor("e_validated", false);
    const hasEExternal = userIdef.hasPropertyDefinitionFor("e_external", false);

    if (!hasEnotifications || !hasEvalidated || spam || !user.e_notifications || !user.e_validated) {
      return;
    }

    const hostname = NODE_ENV === "development" ?
      this.appConfig.developmentHostname :
      this.appConfig.productionHostname;

    // first let's build a token for it
    const tokenData: IUnsubscribeUserTokenDataType = {
      unsubscribeUserId: user.id,
      unsubscribeProperty: "e_notifications",
    };

    // and make up the url based on that
    const token = await jwtSign(tokenData, this.appSensitiveConfig.secondaryJwtKey);
    const url = (
      "https://" + hostname + "/rest/user/unsubscribe?userid=" + encodeURIComponent(user.id) + "&token=" + encodeURIComponent(token)
    );

    const senderInternalEmail = hasEExternal && sender.e_external ? sender.username + "@" + this.appConfig.mailDomain : null;

    this.sendEmail({
      from:
        this.escapeUserName(this.getSenderUsername(sender)) +
        (senderInternalEmail ? " <" + senderInternalEmail + ">" : " <notifications@" + this.appConfig.mailDomain + ">"),
      noReply: !senderInternalEmail,
      to: user.email,
      subject: message.subject,
      html: this.renderMessageForMail(message),
      unsubscribeMailto: "mailto:unsubscribe@" + hostname + "?subject=e_notifications&body=e_notifications",
      unsubscribeURLs: {
        [user.email]: {
          redirected: url,
          noRedirected: url + "&noredirect"
        },
      }
    });
  }

  /**
   * provides the user name for a given sender
   * @param sender 
   * @returns 
   */
  public getSenderUsername(sender: ISQLTableRowValue) {
    return sender.real_name || sender.actual_name || sender.name || sender.username;
  }

  public getTriggerRegistry(): ITriggerRegistry {
    if (!this.storageIdef) {
      return null;
    }

    // if you need more control of how mail is delivered
    // you will need an own mail provider class and change
    // this method by overriding it
    return {
      item: {
        io: {
          [this.storageIdef.getPath().join("/")]: async (arg) => {
            // before creating lets make sure the user can send external emails
            // if such is trying to send an external email, the user cannot send an email to
            // random.email@gmail.com if they don't have external email enabled

            // while theorethically possible to allow using notifications, we run the risk of it being marked
            // as spam as it cannot even be unsubscribed, so we simply won't allow it, want to send external emails
            // then you should have somewhere for them to reply to
            if (arg.action === IOTriggerActions.CREATE) {
              const sender = arg.requestedUpdateCreatedBy;
              const targets = arg.requestedUpdate.target as Array<string>;

              const senderObj = await arg.appData.cache.requestValue("users/user", sender, null, { useMemoryCache: true });

              targets.forEach((t) => {
                const tSplitted = t.split("@");
                const targetIsPotentiallyExternal = !!tSplitted[1];
                const targetPotentialExtenalDomain = targetIsPotentiallyExternal && tSplitted[1].trim();

                // aka is external
                if (targetPotentialExtenalDomain !== this.appConfig.mailDomain && !senderObj.e_external) {
                  return arg.forbid(
                    "Cannot send external emails if user has no external email enabled",
                  );
                }
              });
            }

            // these triggers are all when an user manually created these
            // and not when it was manually attached, say by external
            let renderedMessage: string = null;
            if (arg.action === IOTriggerActions.CREATED) {
              // in this case an user has created a brand new message inside
              // the mail component that is used for storage, and we shall now
              // send them to external sources or copy them to the given targets
              const sender = arg.requestedUpdateCreatedBy;
              const targets = arg.requestedUpdate.target as Array<string>;

              if (targets && Array.isArray(targets) && targets.length) {
                const senderObj = await arg.appData.cache.requestValue("users/user", sender, null, { useMemoryCache: true });

                await Promise.all(targets.map(async (t, index) => {
                  const tSplitted = t.split("@");
                  const targetIsPotentiallyExternal = !!tSplitted[1];
                  const targetPotentialExtenalDomain = targetIsPotentiallyExternal && tSplitted[1].trim();

                  let internalTargetUser: ISQLTableRowValue = null;
                  const isInternalButUsesEmail = targetPotentialExtenalDomain === this.appConfig.mailDomain;
                  const isInternalWithId = tSplitted.length === 1;
                  const isInternal = isInternalButUsesEmail || isInternalWithId;

                  const makesNoSense = tSplitted.length > 2;
                  const isRepeat = targets.indexOf(t) !== index;

                  // do not send duplicates or nonsense
                  if (makesNoSense || isRepeat) {
                    return;
                  }

                  if (isInternalButUsesEmail) {
                    const users = await arg.appData.rawDB.performRawDBSelect(
                      "users/user",
                      (b) => {
                        b.selectAll().whereBuilder.andWhereColumn("username", tSplitted[0].trim());
                        b.limit(1);
                      }
                    );
                    internalTargetUser = users[0] || null;
                  } else if (isInternalWithId) {
                    internalTargetUser = await arg.appData.cache.requestValue("users/user", t, null, { useMemoryCache: true });
                  }

                  // sending to a non-existant user, let's cancel right away
                  if (isInternal && !internalTargetUser) {
                    return;
                  }

                  const allowsSend = await this.allowUserToSendEmail(senderObj, isInternal ? internalTargetUser : t);

                  if (allowsSend === "REJECT") {
                    return;
                  }

                  const isSpam = allowsSend === "SPAM";

                  if (isInternal) {
                    // let's make a copy of our current message and send it to the relevant
                    // user, this should pop up straight away
                    const sentEmail = await arg.appData.cache.requestCopy(
                      this.storageIdef,
                      arg.id,
                      arg.version,
                      arg.id + "_" + (arg.version || "") + "_" + index,
                      null,
                      null,
                      internalTargetUser.id,
                      null,
                      {
                        spam: isSpam,
                        read: false,
                        is_sender: false,
                        is_receiver: true,
                      },
                      arg.newValueSQL,
                    );

                    await this.onUserReceivedInternalEmail(
                      internalTargetUser,
                      senderObj,
                      sentEmail,
                      isSpam,
                    );
                  } else {
                    // we need to render the message as if it was a template and send it to the external source
                    // let's avoid doing it twice
                    renderedMessage = renderedMessage || this.renderMessageForMail(arg.newValueSQL);
                    const senderInternalEmail = senderObj.username + "@" + this.appConfig.mailDomain;
                    await this.sendEmail({
                      from: this.escapeUserName(this.getSenderUsername(senderObj)) + " <" + senderInternalEmail + ">",
                      to: t,
                      subject: arg.newValueSQL.subject,
                      html: renderedMessage,
                    });
                  }
                }));
              }
            }

            return null;
          }
        }
      }
    }
  }

  /**
   * This function is executed when the service
   * needs to send an email
   * @override
   */
  public async sendEmail(data: ISendEmailData): Promise<void> {
    this.logError(
      {
        className: "MailProvider",
        methodName: "sendEmail",
        message: "Attempted to send an email with a raw provider; there's no API available to complete this action",
        serious: true,
        data,
      },
    );
  }
}