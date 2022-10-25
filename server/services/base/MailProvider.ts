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
import { renderTemplate, sanitize } from "../../../client/internal/text";
import type { IGQLValue } from "../../../gql-querier";
import { jwtSign } from "../../token";
import { IUnsubscribeUserTokenDataType } from "../../user/rest";
import { ServiceProvider, ServiceProviderType } from "..";
import { NODE_ENV } from "../../environment";
import { PropertyDefinitionSupportedFilesType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { IOTriggerActions, ITriggerRegistry } from "../../resolvers/triggers";
import path from "path";
import { DOMWindow, getContainerIdFromMappers } from "../../../util";
import { UNSPECIFIED_OWNER } from "../../../constants";
import { languages } from "../../../imported-resources";
import uuid from "uuid";
import uuidv5 from "uuid/v5";
import type { Cache } from "../../cache";
import Include from "../../../base/Root/Module/ItemDefinition/Include";

/**
 * This is the mail namespace, and it's used to convert the mail
 * uuids into simple uuids
 */
const MAIL_NAMESPACE = "ee6ce529-24f8-155b-3dd0-9b5bd377820d";

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
   * the universal unique identifier for this email
   * 
   * allows for reply tracking
   */
  id?: string;
  /**
   * This is the from line in the shape of
   * username <name@domain.com> that wants to specify
   * as the user
   */
  from: string;
  /**
   * The sender, original sender's email, if the email was forwarded
   * 
   * you may use this field to set the reply-to header
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
   * 
   * These attachments must contain some form of read
   * stream in order for them to work properly
   */
  attachments?: PropertyDefinitionSupportedFilesType;
  /**
   * The content id map that maps the ids in the cid:xxxx form
   * to the id of the attachment id
   */
  contentIdMap?: { [key: string]: string };
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
  /**
   * The message that it was a reply for
   */
  replyOf?: ISQLTableRowValue;
}

/**
 * This interface represents how an email is
 * received
 */
export interface IReceiveEmailData {
  /**
   * A custom id for the email received that should be unique
   * for this email
   * 
   * if you don't provide one, a random one will be generated for you
   */
  id?: string;
  /**
   * Who sent the email
   */
  from: string;
  /**
   * The username of the person who sent the email
   */
  fromUsername?: string;
  /**
   * Who is expected to receive the email, these should be
   * abitrary emails, if the email is detected to be a local email
   * it will be resolved into that user given the user has external emails
   * enabled
   */
  to: string[];
  /**
   * The subject of the email
   */
  subject: string;
  /**
   * The html content
   */
  html: string;
  /**
   * The language the email is written in, please provide one if known
   * as the emails need to be indexed in a specific supported language
   */
  language?: string;
  /**
   * Arbitrary metadata
   * 
   * should be a parseble json object
   */
  metadata?: any;

  /**
   * These attachments "MUST" contain some form
   * of read stream in the source in order for it to work
   * properly
   */
  attachments: PropertyDefinitionSupportedFilesType;
  /**
   * The content id map that maps the ids in the cid:xxxx form
   * to the id of the attachment
   */
  contentIdMap?: { [key: string]: string };

  /**
   * Whether to consider the email spam
   */
  spam?: boolean;

  /**
   * The id of the message that is supposed to be parented to by each user
   * 
   * you should return the message id that it is supposed to be the parent of this
   * message which means that this message was replied to as a thread
   */
  replyOfResolver?: (
    user: ISQLTableRowValue,
    isSender: boolean,
  ) => Promise<ISQLTableRowValue>;
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
  private extraProperties: PropertyDefinition[];
  private extraIncludes: Include[];

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
  public setMessageStorageItemDefinition(idef: ItemDefinition) {
    const properties = idef.getAllPropertyDefinitionsAndExtensions();

    const expectedProperties = [
      {
        id: "uuid",
        type: "string",
      },
      {
        id: "target",
        type: "taglist",
        subtype: "arbitrary-tags",
      },
      {
        id: "source",
        type: "string",
      },
      {
        id: "source_username",
        type: "string",
      },
      {
        id: "is_sender",
        type: "boolean",
      },
      {
        id: "is_receiver",
        type: "boolean",
      },
      {
        id: "read",
        type: "boolean",
      },
      {
        id: "spam",
        type: "boolean",
      },
      {
        id: "subject",
        type: "text",
      },
      {
        id: "content",
        type: "text",
      },
      {
        id: "cid_attachments",
        type: "files",
      },
      {
        id: "attachments",
        type: "files",
      },
      {
        id: "tip",
        type: "boolean",
      },
      {
        id: "metadata",
        type: "string",
      },
    ];

    expectedProperties.forEach((p) => {
      const found = !!properties.find(
        (p2) => p.id === p2.getId() && p.type === p2.getType() && (p.subtype ? p2.getSubtype() === p.subtype : true)
      );

      if (!found) {
        throw new Error("Missing required property for mail provider " + p.id + " with type " + p.type);
      }
    });

    this.extraProperties = properties.filter((p2) => {
      const found = !!expectedProperties.find(
        (p) => p.id === p2.getId() && p.type === p2.getType() && (p.subtype ? p2.getSubtype() === p.subtype : true)
      );

      return !found;
    });


    this.extraIncludes = idef.getAllIncludes();

    this.storageIdef = idef;
  }

  public getExtraArgs() {
    const args: any = {};

    this.extraProperties.forEach((p) => {
      args[p.getId()] = p.getCurrentValue(null, null);
    });

    this.extraIncludes.forEach((i) => {
      args[i.getQualifiedExclusionStateIdentifier()] = i.getExclusionState(null, null);
      i.getSinkingProperties().forEach((sp) => {
        args[i.getPrefixedQualifiedIdentifier() + sp.getId()] = sp.getCurrentValue(null, null);
      });
    });

    return args;
  }

  public escapeUserName(name: string) {
    return Array.from(name).map((v) => symbols.includes(v) ? " " : v).join("");
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
   * 
   * NOTE this method can only be called in an extended instance and not
   * in the global context because it uses the cache, do not receive your emails
   * in the global context
   * 
   * @param data the email data received, make sure to fill this information
   * properly
   */
  public async onExternalEmailReceived(data: IReceiveEmailData) {
    const userIdef = this.localAppData.root.registry["users/user"] as ItemDefinition;

    // we need this to be able to receive external emails
    const hasEmail = userIdef.hasPropertyDefinitionFor("email", false);
    const hasEvalidated = userIdef.hasPropertyDefinitionFor("e_validated", false);
    const hasEExternal = userIdef.hasPropertyDefinitionFor("e_external", false);

    const uuidToUse = data.id ? data.id : (uuid.v4().replace(/-/g, "") + "@" + this.appConfig.mailDomain);
    const idBase = uuidv5(uuidToUse, MAIL_NAMESPACE);

    // if somehow user has no email or emails cannot be validated
    // we cannot allow external emails to be received
    if (!hasEmail || !hasEvalidated) {
      return;
    }

    // we may check for a potential sender that has used their email externally
    // in order to reply
    const potentialSender = (await this.localAppData.rawDB.performRawDBSelect(
      userIdef,
      (b) => {
        b.selectAll().whereBuilder.andWhereColumn("email", data.from).andWhereColumn("e_validated", true);
        b.limit(1);
      }
    ))[0] || null;

    const metadataStr = data.metadata ? JSON.stringify(data.metadata) : null;

    // now let's try to find all the users that we are trying to send to
    const allTargetUserHandles = data.to.map((h) => h.split("@"))
    const isAnUnsubscribeSoloEmail = allTargetUserHandles.every((e) => e[0] === "unsubscribe" && e[1] === this.appConfig.mailDomain);
    const allTargetUserHandlesFilteredForLocalDomain = allTargetUserHandles.filter((v) => v[1] === this.appConfig.mailDomain).map((v) => v[0]);
    const allTargets = hasEExternal && !isAnUnsubscribeSoloEmail ? await this.localAppData.rawDB.performRawDBSelect(
      userIdef,
      (b) => {
        b.selectAll().whereBuilder.andWhere(
          "\"username\" = ANY(ARRAY[" + allTargetUserHandlesFilteredForLocalDomain.map(() => "?").join(",") + "]::TEXT[])",
          allTargetUserHandlesFilteredForLocalDomain,
        ).andWhereColumn("e_external", true);
      }
    ) : null;

    // and let's convert it
    const to: string[] = allTargetUserHandles.map((h) => {
      if (h[1] !== this.appConfig.mailDomain) {
        return h[0] + "@" + h[1];
      }
      if (!allTargets) {
        return UNSPECIFIED_OWNER;
      }

      const userInQuestion = allTargets.find((u) => u.username === h[0]);
      if (!userInQuestion) {
        return UNSPECIFIED_OWNER;
      }

      return userInQuestion.id;
    });
    const from = potentialSender ? potentialSender.id : data.from;
    // the username will be dynamic from the property of the source
    const fromUsername = potentialSender ? null : data.fromUsername;

    // now we got the rendered email
    const renderedMail = this.renderMessageFromMail(data.html, data.contentIdMap, data.attachments);

    const storedMessages: ISQLTableRowValue[] = [];

    const specifiedLanguage = data.language ? languages[data.language.split("-")[0]] : null;
    const specifiedLanguageCode = specifiedLanguage && specifiedLanguage.code;
    const specifiedDictionary =
      specifiedLanguageCode ?
        (
          this.localAppData.databaseConfig.dictionaries[data.language] ||
          this.localAppData.databaseConfig.dictionaries[specifiedLanguageCode] ||
          this.localAppData.databaseConfig.dictionaries["*"]
        ) : null;

    if (potentialSender && potentialSender.e_validated && this.storageIdef && !isAnUnsubscribeSoloEmail) {
      // store email in senders outbox, the email may be invalid and not have been received by
      // anyone if no such user exists, but we are storing it anyway
      const senderContainerId = getContainerIdFromMappers(
        this.appConfig,
        potentialSender.app_country,
      );
      const replyOf = data.replyOfResolver && await data.replyOfResolver(
        potentialSender,
        true,
      );

      let parent: any = null;
      if (replyOf && replyOf.created_by === potentialSender.id) {
        // this message is not the tip of the given conversation anymore
        if (replyOf.tip) {
          await this.localAppData.cache.requestUpdateSimple(
            this.storageIdef,
            replyOf.id,
            replyOf.version || null,
            {
              tip: false,
            },
            "en",
            "simple",
            replyOf,
          );
        }
        parent = {
          id: replyOf.id,
          type: this.storageIdef.getQualifiedPathName(),
          version: replyOf.version || null,
        };
      }

      storedMessages.push(await this.localAppData.cache.requestCreation(
        this.storageIdef,
        idBase + "+" + potentialSender.id,
        null,
        {
          uuid: uuidToUse,
          target: to,
          source: from,
          source_username: fromUsername,
          is_sender: true,
          is_receiver: false,
          read: true,
          spam: false,
          subject: data.subject,
          content: renderedMail.html,
          cid_attachments: renderedMail.cidAttachments,
          attachments: renderedMail.attachments,
          metadata: metadataStr,
          ...this.getExtraArgs(),
        },
        potentialSender.id,
        specifiedLanguage || potentialSender.app_language,
        specifiedDictionary ||
        this.localAppData.databaseConfig.dictionaries[potentialSender.app_language] ||
        this.localAppData.databaseConfig.dictionaries["*"],
        senderContainerId,
        parent,
        null,
      ));
    }

    const bounces: string[] = [];
    for (const targetUserHandle of allTargetUserHandles) {
      // if this is an unsubscribe email action
      if (targetUserHandle[0] === "unsubscribe" && targetUserHandle[1] === this.appConfig.mailDomain) {
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

        if (!potentialSender || !potentialSender[unsubscribePropertyId]) {
          return;
        }

        // and unsubscribe from such property
        await this.localAppData.rawDB.performRawDBUpdate(
          userIdef,
          potentialSender.id,
          null,
          {
            itemTableUpdate: {
              [unsubscribePropertyId]: false,
            },
          },
        );
      } else if (targetUserHandle[1] === this.appConfig.mailDomain) {
        // here
        const user = allTargets && allTargets.find((u) => u.username === targetUserHandle[0]);
        // no user we are done and we disregard such email
        if (!user) {
          bounces.push(targetUserHandle[0] + "@" + targetUserHandle[1]);
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

        // attach a new message for it in the idef
        if (this.storageIdef) {
          const isSpam = shouldReceiveAllowed === "SPAM";
          const targetContainerId = getContainerIdFromMappers(
            this.appConfig,
            user.app_country,
          );

          const replyOf = data.replyOfResolver && await data.replyOfResolver(
            user,
            false,
          );

          let parent: any = null;
          if (replyOf) {
            // this message is not the tip of the given conversation anymore
            if (replyOf.tip) {
              await this.localAppData.cache.requestUpdateSimple(
                this.storageIdef,
                replyOf.id,
                replyOf.version || null,
                {
                  tip: false,
                },
                "en",
                "simple",
                replyOf,
              );
            }
            parent = {
              id: replyOf.id,
              type: this.storageIdef.getQualifiedPathName(),
              version: replyOf.version || null,
            };
          }

          // if the message has already been stored in another run
          // the reason is that the stream can likely only be consumed
          // once and we wanted to release it as soon as possible, copying
          // between storage, specially if it's the same storage is likely
          // to be more beneficial and rather quicker
          if (storedMessages.length) {
            // more efficiency to copy in the same container
            let bestMatchStoredMessage = storedMessages.find((m) => m.container_id === targetContainerId);
            if (!bestMatchStoredMessage) {
              // just pick the first one to copy
              bestMatchStoredMessage = storedMessages[0];
            }

            // this should be effective, very effective
            storedMessages.push(await this.localAppData.cache.requestCopy(
              this.storageIdef,
              bestMatchStoredMessage.id,
              bestMatchStoredMessage.version,
              idBase + "+" + user.id,
              null,
              targetContainerId,
              user.id,
              parent,
              {
                is_sender: false,
                is_receiver: true,
                read: false,
                spam: isSpam,
              },
              bestMatchStoredMessage,
            ));
          } else {
            // the first time creating the message and consuming the streams
            storedMessages.push(await this.localAppData.cache.requestCreation(
              this.storageIdef,
              idBase + "+" + user.id,
              null,
              {
                uuid: uuidToUse,
                target: to,
                source: from,
                source_username: fromUsername,
                is_sender: false,
                is_receiver: true,
                read: false,
                spam: isSpam,
                subject: data.subject,
                content: renderedMail.html,
                cid_attachments: renderedMail.cidAttachments,
                attachments: renderedMail.attachments,
                metadata: metadataStr,
                ...this.getExtraArgs(),
              },
              user.id,
              specifiedLanguageCode || user.app_language,
              specifiedDictionary ||
              this.localAppData.databaseConfig.dictionaries[user.app_language] ||
              this.localAppData.databaseConfig.dictionaries["*"],
              targetContainerId,
              parent,
              null,
            ));
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

      // inform of emails that bounced
      if (bounces.length) {
        await this.onExternalEmailBounced(bounces, potentialSender, data);
      }
    };
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

  public async allowUserToSendEmailToItemType(user: ISQLTableRowValue, target: ItemDefinition): Promise<boolean> {
    return false;
  }

  public async allowUserToSendEmailToItem(user: ISQLTableRowValue, target: ISQLTableRowValue, targetType: ItemDefinition): Promise<"SPAM" | "REJECT" | "ACCEPT"> {
    return "REJECT";
  }

  /**
   * @override
   * @param user 
   * @param target 
   * @param targetType 
   */
  public async resolveUsersForEmailToItem(user: ISQLTableRowValue, target: ISQLTableRowValue, targetType: ItemDefinition): Promise<ISQLTableRowValue[]> {
    return [];
  }

  /**
   * @override
   * An email was externally received but no proper receiver could be found for such users, the bounces
   * are very specific to the 
   * @param internalSender the user that sent the message (or null) if it couldn't find one
   * @param data the external email itself
   */
  public async onExternalEmailBounced(bounces: string[], internalSender: ISQLTableRowValue, data: IReceiveEmailData) {

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
    const userIdef = this.localAppData.root.registry["users/user"] as ItemDefinition;

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
        from: this.escapeUserName(this.getSenderUsername(internalSender)) +
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

  /**
   * Given the external email this will convert it into the expected sql row value to be created
   * @param html 
   * @param contentIdMap 
   * @param attachments 
   * @returns 
   */
  public renderMessageFromMail(html: string, contentIdMap: { [key: string]: string }, attachments: PropertyDefinitionSupportedFilesType) {
    let finalAttachments = attachments ? [...attachments] : [];
    const potentialCidAttachments: PropertyDefinitionSupportedFilesType = [];

    if (contentIdMap) {
      const contentIdValues = Object.keys(contentIdMap).map((v) => contentIdMap[v]);
      finalAttachments = finalAttachments.filter((a) => {
        const isContentId = contentIdValues.includes(a.id);
        if (isContentId) {
          potentialCidAttachments.push(a);
        }
        return !isContentId;
      })
    }

    const cidAttachments: PropertyDefinitionSupportedFilesType = [];

    if (!attachments || !contentIdMap || !html || Object.keys(contentIdMap).length === 0 || attachments.length === 0) {
      return {
        html,
        attachments: finalAttachments.length === 0 ? null : finalAttachments,
        cidAttachments: null,
      }
    }

    const cheapdiv = DOMWindow.document.createElement("div");
    cheapdiv.innerHTML = html;
    cheapdiv.querySelectorAll("img").forEach((img) => {
      if (img.src.startsWith("cid:")) {
        const cidSrc = img.src.replace("cid:", "").trim();
        img.removeAttribute("src");

        const fileSrcId = contentIdMap[cidSrc];
        img.dataset.srcId = fileSrcId;
        const fileInQuestion = potentialCidAttachments.find((f) => f.id === fileSrcId);
        cidAttachments.push(fileInQuestion);
      }
    });

    return {
      html: cheapdiv.innerHTML,
      attachments: finalAttachments.length === 0 ? null : finalAttachments,
      cidAttachments,
    }
  }

  /**
   * Given a message from the database it will provide the resulting
   * html with all links resolved to be sent by email as well as the attachment
   * list to be appended
   * @param message 
   * @returns 
   */
  public renderMessageForMail(message: ISQLTableRowValue) {
    const actualProperty = this.storageIdef.getPropertyDefinitionFor("content", false);
    const mediaPropertyId = actualProperty.getSpecialProperty("mediaProperty");
    const mediaProperty = mediaPropertyId ? this.storageIdef.getPropertyDefinitionFor(mediaPropertyId, true) : null;

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

    let cidAttachments: PropertyDefinitionSupportedFilesType = [];
    try {
      cidAttachments = mediaProperty ? (JSON.parse(message[mediaPropertyId]) || []) : [];
    } catch {
    }

    const cidMap: {[key: string]: string} = {};
    let attachments: PropertyDefinitionSupportedFilesType = [];
    try {
      attachments = JSON.parse(message["attachments"]) || [];
      attachments.forEach((v, index) => {
        const newId = "attachment_" + (index + 1);
        cidMap[newId] = v.id;
      });
    } catch {
    }

    // calling the sanitize function
    // it solves the urls too and because we are using
    // forceFullURLs they should work as cdn
    const html = sanitize(
      {
        cacheFiles: false,
        config: this.appConfig,
        containerId: message.container_id,
        currentFiles: cidAttachments,
        forId: message.id,
        forVersion: message.version || null,
        forceFullURLs: true,
        mediaProperty,
        itemDefinition: this.storageIdef,
        include: null,
        forMail: true,
        forMailCidCollected: (file, index) => {
          attachments.push(file);
          const newId = "cattachment_" + (index + 1);
          cidMap[newId] = file.id;
          return newId;
        },
        forMailFileCollected(file, index) {
          attachments.push(file);
          const newId = "cattachment_" + (index + 1);
          cidMap[newId] = file.id;
        },
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
    );

    if (attachments.length) {
      attachments = attachments.map((v) => {
        const location = path.join(
          NODE_ENV === "production" ? this.appConfig.productionHostname : this.appConfig.developmentHostname,
          this.storageIdef.getQualifiedPathName(),
          message.id + "." + (message.version || ""),
          "attachments",
          v.id,
          v.url,
        );

        return {
          ...v,
          src: new Promise((resolve) => {
            resolve({
              createReadStream: () => {
                return this.localAppData.storage[message.container_id].download(location);
              }
            })
          }),
        }
      });
    }

    return {
      html,
      attachments: attachments.length ? attachments : null,
      cidMap: attachments.length ? cidMap : null,
    };
  }

  /**
   * @override
   * An user received an email from one user to another user in the same domain, this is an internal
   * message, in this case email addresses may not be explicit
   * by default the message is assumed to have the right shape for the storage idef definition and will
   * be used to render a message clone and send it to the targets real email
   */
  public async onUserReceivedInternalEmail(user: ISQLTableRowValue, sender: ISQLTableRowValue, message: ISQLTableRowValue, proxyObject: ItemDefinition, spam: boolean) {
    const root = this.isInstanceGlobal() ? this.globalRoot : this.localAppData.root;
    const userIdef = root.registry["users/user"] as ItemDefinition;

    const hasEnotifications = userIdef.hasPropertyDefinitionFor("e_notifications", false);
    const hasEvalidated = userIdef.hasPropertyDefinitionFor("e_validated", false);
    const hasEExternal = userIdef.hasPropertyDefinitionFor("e_external", false);

    if (!hasEnotifications || !hasEvalidated || spam || !user.e_notifications || !user.e_validated || !user.email) {
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

    const renderedData = this.renderMessageForMail(message);

    this.sendEmail({
      from:
        this.escapeUserName(this.getSenderUsername(sender)) +
        (senderInternalEmail ? " <" + senderInternalEmail + ">" : " <notifications@" + this.appConfig.mailDomain + ">"),
      noReply: !senderInternalEmail,
      to: user.email,
      subject: message.subject,
      html: renderedData.html,
      attachments: renderedData.attachments,
      contentIdMap: renderedData.cidMap,
      unsubscribeMailto: "mailto:unsubscribe@" + hostname + "?subject=e_notifications&body=e_notifications",
      unsubscribeURLs: {
        [user.email]: {
          redirected: url,
          noRedirected: url + "&noredirect"
        },
      }
    });
  }

  private async forwardMessages(message: ISQLTableRowValue, user: ISQLTableRowValue, containerID: string, isSpam: boolean, cache: Cache) {
    let parent: any = null;
    if (message.parent_id) {
      const expectedParentIdForUser = message.parent_id.split("+")[0] + "+" + user.id;

      const replyOfForUser = await cache.requestValue(
        this.storageIdef,
        expectedParentIdForUser,
        null,
      );

      if (!replyOfForUser) {
        const replyOfSelf = await cache.requestValue(
          this.storageIdef,
          message.parent_id,
          message.parent_version || null,
          {
            useMemoryCache: true,
          }
        );
        // chain is broken for some reason
        if (!replyOfSelf) {
          // chain has broken
        } else {
          // forward that message too
          await this.forwardMessages(replyOfSelf, user, containerID, isSpam, cache);
        }
      } else {
        // matching reply found, this will be connected
        if (replyOfForUser.tip) {
          await cache.requestUpdateSimple(
            this.storageIdef,
            replyOfForUser.id,
            null,
            {
              tip: false,
            },
            "en",
            "simple",
            replyOfForUser,
          );
        }
        parent = {
          id: replyOfForUser.id,
          version: null,
          type: this.storageIdef.getQualifiedPathName(),
        }
      }
    }

    await cache.requestCopy(
      this.storageIdef,
      message.id,
      message.version || null,
      message.id.split("+")[0] + "+" + user.id,
      null,
      containerID,
      user.id,
      parent,
      {
        tip: false,
        spam: isSpam,
        read: false,
        is_sender: message.source === user.id,
        is_receiver: message.target.includes(user.id),
      },
    );
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
          [this.storageIdef.getAbsolutePath().join("/")]: async (arg) => {
            // before creating lets make sure the user can send external emails
            // if such is trying to send an external email, the user cannot send an email to
            // random.email@gmail.com if they don't have external email enabled

            // while theorethically possible to allow using notifications, we run the risk of it being marked
            // as spam as it cannot even be unsubscribed, so we simply won't allow it, want to send external emails
            // then you should have somewhere for them to reply to
            if (arg.action === IOTriggerActions.CREATE) {
              const sender = arg.requestedUpdateCreatedBy;

              if (arg.requestedUpdate.source !== arg.requestedUpdateCreatedBy) {
                arg.forbid(
                  "Cannot create a message with someone else as source",
                );
              }

              const targets = arg.requestedUpdate.target as Array<string>;

              const senderObj = await arg.appData.cache.requestValue("users/user", sender, null, { useMemoryCache: true });

              if (sender !== arg.requestedUpdate.source) {
                arg.forbid(
                  "Cannot create a message with the sender not being the creator",
                );
              }

              if (!arg.requestedUpdate.is_sender) {
                arg.forbid(
                  "Cannot create a message where the sender is not the sender, is_sender is false",
                );
              }

              const replyOf = (arg.requestedUpdateParent && arg.requestedUpdateParent.id && await arg.appData.cache.requestValue(
                this.storageIdef,
                arg.requestedUpdateParent.id,
                arg.requestedUpdateParent.version,
                {
                  useMemoryCache: true,
                }
              )) || null;

              if (replyOf && replyOf.created_by !== sender) {
                arg.forbid(
                  "You cannot parent to target a message you don't own, that is the reply to",
                );
              }

              targets.forEach((t) => {
                const tSplitted = t.split("@");
                const targetIsPotentiallyExternal = !!tSplitted[1];
                const targetPotentialExtenalDomain = targetIsPotentiallyExternal && tSplitted[1].trim();
                const targetIsUsingInternalDomain = targetIsPotentiallyExternal && tSplitted[1].trim() === this.appConfig.mailDomain;

                // aka is external
                if (targetPotentialExtenalDomain !== this.appConfig.mailDomain && !senderObj.e_external) {
                  arg.forbid(
                    "Cannot send external emails if user has no external email enabled",
                  );
                } else if (targetIsUsingInternalDomain) {
                  arg.forbid(
                    "Cannot send external emails using an external domain to an internal user, please use the user id instead",
                  );
                }

                if (tSplitted.length === 1) {
                  const tObjSplitted = t.split("$");
                  if (tObjSplitted.length === 2) {
                    const type = tObjSplitted[1];
                    const itemDef = arg.appData.root.registry[type];

                    if (!itemDef || !(itemDef instanceof ItemDefinition) || itemDef.getQualifiedPathName() !== type) {
                      arg.forbid(
                        "Cannot send email to an unknown object target type " + type
                      );
                    }

                    if (!this.allowUserToSendEmailToItemType(senderObj, itemDef as ItemDefinition)) {
                      arg.forbid(
                        "Cannot send email to target type " + type
                      );
                    }
                  }
                }
              });

              const baseIdToUse = uuid.v4().replace(/-/g, "");
              const uuidToUse = baseIdToUse + "@" + this.appConfig.mailDomain;
              const idToUse = uuidv5(uuidToUse, MAIL_NAMESPACE).replace(/-/g, "") + "+" + arg.requestedUpdateCreatedBy;

              arg.setForId(idToUse);

              return {
                ...arg.requestedUpdate,
                uuid: uuidToUse,
              };
            }

            // these triggers are all when an user manually created these
            // and not when it was manually attached, say by external
            if (arg.action === IOTriggerActions.CREATED) {
              // in this case an user has created a brand new message inside
              // the mail component that is used for storage, and we shall now
              // send them to external sources or copy them to the given targets
              const sender = arg.requestedUpdateCreatedBy;
              const targets = arg.requestedUpdate.target as Array<string>;
              const externalTargets: string[] = [];

              let replyOf = (arg.requestedUpdateParent && arg.requestedUpdateParent.id && await arg.appData.cache.requestValue(
                this.storageIdef,
                arg.requestedUpdateParent.id,
                arg.requestedUpdateParent.version,
                {
                  useMemoryCache: true,
                }
              )) || null;

              // the reply is not the tip anymore for this tree
              if (replyOf && replyOf.tip) {
                // this reply is
                replyOf = await arg.appData.cache.requestUpdateSimple(
                  this.storageIdef,
                  replyOf.id,
                  replyOf.version || null,
                  {
                    tip: false,
                  },
                  "en",
                  "simple",
                  replyOf,
                );
              }

              // now we got to loop in the targets if we got some
              if (targets && Array.isArray(targets) && targets.length) {
                // let's get the senders
                const senderObj = await arg.appData.cache.requestValue("users/user", sender, null, { useMemoryCache: true });

                // and let's begin the loop
                await Promise.all(targets.map(async (t, index) => {
                  // first split it via the @ in order to get it
                  const tSplitted = t.split("@");

                  // for internal elements
                  let internalTarget: ISQLTableRowValue = null;
                  const isInternal = tSplitted.length === 1;

                  const makesNoSense = tSplitted.length > 2;
                  const isRepeat = targets.indexOf(t) !== index;

                  // do not send duplicates or nonsense
                  if (makesNoSense || isRepeat) {
                    return;
                  }


                  // now let's get the internal information, for an internal
                  // target, these include target users and elements
                  let internalId: string;
                  let internalType: string;
                  let internalIdef: ItemDefinition;

                  // now if we got an internal
                  if (isInternal) {
                    // the type comes after the $ symbol, which is invalid for an id
                    // so we can use it as a separator
                    const typeSplitted = t.split("$");
                    internalId = typeSplitted[0];
                    internalType = typeSplitted[1] || "MOD_users__IDEF_user";

                    // if it's unspecified owner and it's user
                    // we stop
                    if (internalId === UNSPECIFIED_OWNER && internalType === "MOD_users__IDEF_user") {
                      return;
                    }

                    internalIdef = arg.appData.root.registry[internalType] as ItemDefinition;

                    // no clue what this is
                    if (!internalIdef || !(internalIdef instanceof ItemDefinition)) {
                      return;
                    }

                    // otherwise we get it
                    // the value that is expected for such target
                    // as requested from the cache
                    internalTarget = await arg.appData.cache.requestValue(internalType, internalId, null, { useMemoryCache: true });
                  }

                  // sending to a non-existant user or object, let's cancel right away
                  if (isInternal && !internalTarget) {
                    return;
                  }

                  // now let's check whether we can send this
                  // by calling the function
                  const allowsSend = !internalIdef || internalIdef.getQualifiedPathName() === "MOD_users__IDEF_user" ?
                    await this.allowUserToSendEmail(senderObj, isInternal ? internalTarget : t) :
                    await this.allowUserToSendEmailToItem(senderObj, internalTarget, internalIdef);

                  // this one is a reject
                  if (allowsSend === "REJECT") {
                    return;
                  }

                  // whether it is to be marked as SPAM
                  const isSpam = allowsSend === "SPAM";

                  // now for internal we got to do internal resolving
                  if (isInternal) {
                    const resolvedUsers = internalIdef.getQualifiedPathName() === "MOD_users__IDEF_user" ? (
                      [internalTarget]
                    ) : (
                      await this.resolveUsersForEmailToItem(senderObj, internalTarget, internalIdef)
                    );

                    // and now we loop our resolved users
                    await Promise.all(resolvedUsers.map(async (targetUser) => {
                      // sending a message to oneself, not allowed
                      // instead because the user will be marked as sender
                      // and receiver it will automatically be saved in the inbox
                      if (targetUser.id === senderObj.id) {
                        // in the case of objects, oneself will simply not resolve
                        // it could be possible here to mark the message as inbox too
                        return;
                      }

                      // let's make a copy of our current message and send it to the relevant
                      // user, this should pop up straight away
                      const userContainerId = getContainerIdFromMappers(
                        this.appConfig,
                        targetUser.app_country,
                      );

                      // so the user replied to some specific message
                      // that such user has in memory, but each user has their
                      // own ids for their own message that is a copy
                      let replyBasedParent: any = null;
                      // so if we set a reply of something we got to check that such message
                      // we are replying to was actually sent by that user we are targeting
                      if (replyOf) {
                        const idOfReplyForThatUser = replyOf.id.split("+")[0] + "+" + targetUser.id;
                        // we need to check for the existance of the message in the inbox
                        // of the user in question
                        const replyOfForThatUser = await arg.appData.cache.requestValue(
                          this.storageIdef,
                          idOfReplyForThatUser,
                          null,
                        );

                        if (!replyOfForThatUser) {
                          // user does not have that message that is being replied for
                          // they should all be forwarded
                          await this.forwardMessages(
                            replyOf,
                            targetUser,
                            userContainerId,
                            isSpam,
                            arg.appData.cache,
                          );
                        } else {
                          // the old reply is not the tip of the conversation anymore
                          await arg.appData.cache.requestUpdateSimple(
                            this.storageIdef,
                            idOfReplyForThatUser,
                            null,
                            {
                              tip: false,
                            },
                            "en",
                            "simple",
                            replyOfForThatUser,
                          );
                          replyBasedParent = {
                            id: replyOfForThatUser.id,
                            version: null,
                            type: this.storageIdef.getQualifiedPathName(),
                          };
                        }
                      }

                      // now we can copy it
                      const sentEmail = await arg.appData.cache.requestCopy(
                        this.storageIdef,
                        arg.id,
                        arg.version,
                        arg.id.split("+")[0] + "+" + targetUser.id,
                        null,
                        userContainerId,
                        targetUser.id,
                        replyBasedParent,
                        {
                          spam: isSpam,
                          read: false,
                          is_sender: false,
                          is_receiver: true,
                        },
                        arg.newValueSQL,
                      );

                      // and let's do the callback
                      await this.onUserReceivedInternalEmail(
                        targetUser,
                        senderObj,
                        sentEmail,
                        internalIdef.getQualifiedPathName() === "MOD_users__IDEF_user" ? null : internalIdef,
                        isSpam,
                      );
                    }));
                  } else {
                    externalTargets.push(t);
                  }
                }));

                if (externalTargets.length) {
                  // we need to render the message as if it was a template and send it to the external source
                  // let's avoid doing it twice
                  const renderedMessage = this.renderMessageForMail(arg.newValueSQL);
                  const senderInternalEmail = senderObj.username + "@" + this.appConfig.mailDomain;
                  await this.sendEmail({
                    from: this.escapeUserName(this.getSenderUsername(senderObj)) + " <" + senderInternalEmail + ">",
                    to: externalTargets,
                    subject: arg.newValueSQL.subject,
                    html: renderedMessage.html,
                    attachments: renderedMessage.attachments,
                    replyOf: replyOf,
                    id: arg.newValueSQL.uuid,
                    contentIdMap: renderedMessage.cidMap,
                  });
                }
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