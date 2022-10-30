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
import type { IPropertyDefinitionSupportedSingleFilesType, PropertyDefinitionSupportedFilesType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { IOTriggerActions, ITriggerRegistry } from "../../resolvers/triggers";
import path from "path";
import { DOMWindow, escapeHtml, formatDateTime, getContainerIdFromMappers } from "../../../util";
import { UNSPECIFIED_OWNER } from "../../../constants";
import { isRTL, languages } from "../../../imported-resources";
import uuid from "uuid";
import uuidv5 from "uuid/v5";
import type { Cache } from "../../cache";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import type { PropertyDefinitionSupportedFileType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import addressRFC2822, { IRFC2822Data } from "address-rfc2822";
import { httpRequest } from "../../request";
import fs, { ReadStream } from "fs";
import os from "os";
const fsAsync = fs.promises;

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
   * 
   * Please ensure that it is in the following format
   * somevaliduuid@yoursite.com
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
   * also comes in the form of username <name@domain.com>
   * 
   * you may use this field to set the reply-to header
   */
  fromForwarded?: string;
  /**
   * A single email or a list of emails that are supposed
   * to be sent to
   * 
   * also allows the form username <name@domain.com>
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
   * 
   * Please ensure that it is in the following format
   * somevaliduuid@externalsite.com
   */
  id?: string;

  /**
   * The mail references header
   */
  references?: string[];

  /**
   * A timestamp to specify when it was
   * sent by the email client, note that this will not
   * affect ordering nor the created_at attribute as this
   * is considered a non-trusted attribute, it's there simply
   * for informative purposes
   */
  timestamp?: string;

  /**
   * Who sent the email
   */
  from: string;
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
}

const symbols = "+,|-?<>=!";

export interface IEmailRenderedMessage {
  html: string;
  attachments: IPropertyDefinitionSupportedSingleFilesType[];
  cidMap: { [key: string]: string };
  predictedSize: number;
}

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

  public async onEmailReceivedReplyResolver(
    calculatedId: string,
    data: IReceiveEmailData,
    user: ISQLTableRowValue,
    isSender: boolean,
  ): Promise<ISQLTableRowValue> {
    const value = await this.localAppData.cache.requestValue("mail/mail", calculatedId, null);
    return value;
  }

  public createFileFromURL(
    url: string,
    name: string,
    size: number,
    type: string,
    extraArgs?: {
      widthXHeight?: [number, number],
      httpHeaders?: any,
    },
  ): IPropertyDefinitionSupportedSingleFilesType {
    return {
      id: "FILE" + uuidv5(url, MAIL_NAMESPACE).replace(/-/g, ""),
      name: name || "untitled",
      url: (name || "untitled").replace(/\s/g, "_").replace(/\-/g, "_").replace(/[^A-Za-z0-9_\.]/g, "x"),
      size,
      type,
      metadata: extraArgs && extraArgs.widthXHeight ? extraArgs.widthXHeight.join("x") : "",
      src: new Promise(async (resolve, reject) => {
        try {
          const urlInfo = new URL(url);
          const httpValue = await httpRequest({
            isHttps: urlInfo.protocol === "https:",
            path: urlInfo.pathname,
            host: urlInfo.host,
            method: "GET",
            dontProcessResponse: true,
            headers: extraArgs && extraArgs.httpHeaders,
          });
          resolve({
            createReadStream: () => {
              return httpValue.response as any as ReadStream;
            }
          })
        } catch (err) {
          reject(err);
        }
      }),
    }
  }

  public async createFileFromReadStream(
    id: string,
    stream: ReadStream,
    name: string,
    size: number,
    type: string,
    extraArgs?: {
      widthXHeight?: [number, number],
      storeInFileThenReadAgain: boolean,
    },
  ): Promise<IPropertyDefinitionSupportedSingleFilesType> {
    const basicFile: IPropertyDefinitionSupportedSingleFilesType = {
      id: "FILE" + uuidv5(id, MAIL_NAMESPACE).replace(/-/g, ""),
      name: name || "untitled",
      url: (name || "untitled").replace(/\s/g, "_").replace(/\-/g, "_").replace(/[^A-Za-z0-9_\.]/g, "x"),
      size,
      type,
      metadata: extraArgs && extraArgs.widthXHeight ? extraArgs.widthXHeight.join("x") : "",
    }

    if (!extraArgs || !extraArgs.storeInFileThenReadAgain) {
      return basicFile;
    } else {
      const tmpPath = path.join(os.tmpdir(), basicFile.id);
      const writeStream = fs.createWriteStream(tmpPath);

      await (
        new Promise((resolve, reject) => {
          stream.pipe(writeStream);
          stream.on("close", resolve);
          stream.on("error", reject);
        })
      );

      basicFile.src = fs.createReadStream(tmpPath);
      return basicFile;
    }
  }

  public parseRFC2822(header: string | string[]): IRFC2822Data[] {
    try {
      if (Array.isArray(header)) {
        const rs = header.map(this.parseRFC2822).flat();
        return rs;
      }
      return addressRFC2822.parse(header);
    } catch (err) {
      this.logError({
        message: "Could not parse RFC2822 header",
        className: "MailProvider",
        data: {
          header,
        },
        err,
        methodName: "parseRFC2822",
      });
      return [];
    }
  }

  /**
   * Sets the item definition that is in charge of the storage of the
   * messages
   * the creator will be the target of the message who holds the current username
   * for the given email
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
        id: "timestamp",
        type: "datetime",
      },
      {
        id: "references",
        type: "taglist",
        subtype: "arbitrary-tags",
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
    // we shall not receive message from ourselves
    // this should be handled internally
    const fromRfc = this.parseRFC2822(data.from)[0];
    if (!fromRfc) {
      this.logInfo({
        message: "Received external message from an invalid rfc2822 source",
        data: {
          from: data.from,
        },
        className: "MailProvider",
      });
      return;
    };
    if (fromRfc.host().toLowerCase() === this.appConfig.mailDomain) {
      this.logInfo({
        message: "Received external message from internal email, this is not allowed",
        data,
        className: "MailProvider",
      });
      return;
    }

    // and let's convert it
    const allTargetRfcs = data.to.map((h) => ({ rfc: this.parseRFC2822(h)[0], original: h })).filter((v) => !!v.rfc);
    if (!allTargetRfcs.length) {
      this.logInfo({
        message: "Received external message where all receivers were of invalid rfc2822 targets",
        data: {
          to: data.to,
        },
        className: "MailProvider",
      });
      return;
    }

    const userIdef = this.localAppData.root.registry["users/user"] as ItemDefinition;

    // we need this to be able to receive external emails
    const hasEmail = userIdef.hasPropertyDefinitionFor("email", false);
    const hasEvalidated = userIdef.hasPropertyDefinitionFor("e_validated", false);
    const hasEExternal = userIdef.hasPropertyDefinitionFor("e_external", false);

    const uuidToUse = data.id ? data.id : (uuid.v4().replace(/-/g, "") + "@" + this.appConfig.mailDomain);

    const optionalArgs: any = {};

    if (data.references && data.references.length) {
      optionalArgs.references = data.references;
    }

    if (data.timestamp) {
      const date = new Date(data.timestamp);
      if (date.toISOString() !== "Invalid Date") {
        optionalArgs.timestamp = date;
      }
    }

    const idBase = uuidv5(uuidToUse, MAIL_NAMESPACE).replace(/-/g, "");

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
        b.selectAll().whereBuilder.andWhere("LOWER(\"email\") = ?", [fromRfc.address.toLowerCase()]).andWhereColumn("e_validated", true);
        b.limit(1);
      }
    ))[0] || null;

    const metadataStr = data.metadata ? JSON.stringify(data.metadata) : null;

    // now let's try to find all the users that we are trying to send to
    const isAnUnsubscribeSoloEmail = allTargetRfcs.every((e) => e.rfc.user().toLowerCase() === "unsubscribe" && e.rfc.host().toLowerCase() === this.appConfig.mailDomain);
    const allTargetUserHandlesFilteredForLocalDomain = allTargetRfcs.filter((v) => v.rfc.host().toLowerCase() === this.appConfig.mailDomain);
    const allTargets = hasEExternal && !isAnUnsubscribeSoloEmail ? await this.localAppData.rawDB.performRawDBSelect(
      userIdef,
      (b) => {
        b.selectAll().whereBuilder.andWhere(
          "LOWER(\"username\") = ANY(ARRAY[" + allTargetUserHandlesFilteredForLocalDomain.map(() => "?").join(",") + "]::TEXT[])",
          allTargetUserHandlesFilteredForLocalDomain.map((v) => v.rfc.user().toLowerCase()),
        ).andWhereColumn("e_external", true);
      }
    ) : null;

    const from = potentialSender ? potentialSender.id : data.from;
    // and let's convert it
    const to: string[] = allTargetRfcs.map((h) => {
      if (h.rfc.host().toLowerCase() !== this.appConfig.mailDomain) {
        return h.original;
      }
      if (!allTargets) {
        return UNSPECIFIED_OWNER;
      }

      const userInQuestion = allTargets.find((u) => u.username === h.rfc.user().toLowerCase());
      if (!userInQuestion) {
        return UNSPECIFIED_OWNER;
      }

      return userInQuestion.id;
    });

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
      const replyOf = await this.onEmailReceivedReplyResolver(
        idBase + "+" + potentialSender.id,
        data,
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
          is_sender: true,
          is_receiver: false,
          read: true,
          spam: false,
          subject: data.subject,
          content: renderedMail.html,
          cid_attachments: renderedMail.cidAttachments,
          attachments: renderedMail.attachments,
          metadata: metadataStr,
          ...optionalArgs,
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

    const externalReceives: ISQLTableRowValue[] = [];
    const externalReceivesSpam: ISQLTableRowValue[] = [];
    const bounces: string[] = [];
    for (const targetRfc of allTargetRfcs) {
      // if this is an unsubscribe email action
      const isThisHost = targetRfc.rfc.host().toLowerCase() === this.appConfig.mailDomain;
      const username = targetRfc.rfc.user().toLowerCase();
      if (username === "unsubscribe" && isThisHost) {
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
      } else if (isThisHost) {
        // here
        const user = allTargets && allTargets.find((u) => u.username === username);
        // no user we are done and we disregard such email
        if (!user) {
          bounces.push(targetRfc.original);
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
          const isSpam = data.spam || shouldReceiveAllowed === "SPAM";
          const targetContainerId = getContainerIdFromMappers(
            this.appConfig,
            user.app_country,
          );

          const replyOf = await this.onEmailReceivedReplyResolver(
            idBase + "+" + user.id,
            data,
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

          let messageForUser: ISQLTableRowValue;
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
            messageForUser = await this.localAppData.cache.requestCopy(
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
            )
          } else {
            // the first time creating the message and consuming the streams
            messageForUser = await this.localAppData.cache.requestCreation(
              this.storageIdef,
              idBase + "+" + user.id,
              null,
              {
                uuid: uuidToUse,
                target: to,
                source: from,
                is_sender: false,
                is_receiver: true,
                read: false,
                spam: isSpam,
                subject: data.subject,
                content: renderedMail.html,
                cid_attachments: renderedMail.cidAttachments,
                attachments: renderedMail.attachments,
                metadata: metadataStr,
                ...optionalArgs,
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
            );
          }

          storedMessages.push(messageForUser);

          if (isSpam) {
            externalReceivesSpam.push(user);
          } else {
            externalReceives.push(user);
          }
        }
      }

      if (externalReceives.length) {
        // same here if the sender exists the default function
        // will not leak the sender's email and use its own
        // external email or otherwise notifications
        await this.onUsersReceivedExternalEmail(
          externalReceives,
          potentialSender,
          // pick one
          storedMessages[0],
          data,
          false,
        );
      }

      if (externalReceivesSpam.length) {
        // same here if the sender exists the default function
        // will not leak the sender's email and use its own
        // external email or otherwise notifications
        await this.onUsersReceivedExternalEmail(
          externalReceives,
          potentialSender,
          // pick one
          storedMessages[0],
          data,
          true,
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
  public async onUsersReceivedExternalEmail(
    users: ISQLTableRowValue[],
    internalSender: ISQLTableRowValue,
    message: ISQLTableRowValue,
    data: IReceiveEmailData,
    spam: boolean,
  ) {
    const userIdef = this.localAppData.root.registry["users/user"] as ItemDefinition;

    const hasEnotifications = userIdef.hasPropertyDefinitionFor("e_notifications", false);
    const hasEvalidated = userIdef.hasPropertyDefinitionFor("e_validated", false);

    if (!hasEnotifications || !hasEvalidated || spam) {
      return;
    }

    const finalUsers = users.filter((user) => {
      return user.e_notifications && user.e_validated && user.email;
    });

    if (!finalUsers.length) {
      return;
    }

    const hostname = NODE_ENV === "development" ?
      this.appConfig.developmentHostname :
      this.appConfig.productionHostname;

    const sortedUsers: { [lng: string]: ISQLTableRowValue[] } = {};
    finalUsers.forEach((user) => {
      const language = user.app_language || message["subject_LANGUAGE"] || message["content_LANGUAGE"];
      if (!sortedUsers[language]) {
        sortedUsers[language] = [user];
      } else {
        sortedUsers[language].push(user);
      }
    });

    await Promise.all(Object.keys(sortedUsers).map((language) => {
      // random person that is not in the system has sent a message
      if (!internalSender) {
        let forwardInfo = (
          `<div>` +
          `<div>${escapeHtml(this.getForwardFromIndicator(language) + data.from)}</div>` +
          `<div>${escapeHtml(this.getForwardSubjectIndicator(language) + data.subject)}</div>`
        );

        const urlForEmail = this.getForwardViewAtURL(language, message);
        forwardInfo += `<div>${this.getForwardViewAtIndicator(language)}<a href="${escapeHtml(urlForEmail)}">${escapeHtml(urlForEmail)}</a></div>`;

        return this.sendEmail({
          from: this.escapeUserName(this.getNotificationsUsername(language)) + " <notifications@" + this.appConfig.mailDomain + ">",
          to: users.map((user) => this.escapeUserName(this.getUserName(user)) + " <" + user.email + ">"),
          subject: this.getNoReplySubjectPrefix(language) + this.getForwardSubjectReplace(language, data.from, null, null),
          html: forwardInfo + data.html + "</div>",
          attachments: data.attachments,
          contentIdMap: data.contentIdMap,
          unsubscribeMailto: "mailto:unsubscribe@" + hostname + "?subject=e_notifications&body=e_notifications"
        });
      } else {
        let forwardInfo = (
          `<div>` +
          `<div>${escapeHtml(this.getForwardFromIndicator(language) + this.getUserName(internalSender))}</div>` +
          `<div>${escapeHtml(this.getForwardSubjectIndicator(language) + data.subject)}</div>`
        );

        const urlForEmail = this.getForwardViewAtURL(language, message);
        forwardInfo += `<div>${this.getForwardViewAtIndicator(language)}<a href="${escapeHtml(urlForEmail)}">${escapeHtml(urlForEmail)}</a></div>`;

        return this.sendEmail({
          from: this.escapeUserName(this.getNotificationsUsername(language)) + " <notifications@" + this.appConfig.mailDomain + ">",
          to: users.map((user) => this.escapeUserName(this.getUserName(user)) + " <" + user.email + ">"),
          subject: this.getNoReplySubjectPrefix(language) + this.getForwardSubjectReplace(language, data.from, null, null),
          html: forwardInfo + data.html + "</div>",
          attachments: data.attachments,
          contentIdMap: data.contentIdMap,
          unsubscribeMailto: "mailto:unsubscribe@" + hostname + "?subject=e_notifications&body=e_notifications"
        });
      }
    }));
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
      cidAttachments: cidAttachments.length === 0 ? null : cidAttachments,
    }
  }

  /**
   * when the renderMessageForMail is running this function gets called with the given message
   * the size that is currently working at, and the replyId aka a parent for this element that is the reply
   * so that it can produce forward html inside the html of the email, by default it will call the format forward function
   * which can be modified for a different format
   * 
   * @override for a different effect, for example, return nothing {attachments: null, cidMap: null, html: "", predictedSize: 0}
   * so that forwarding doesn't cause any modification, override formatForward if what you want to do is to change the format
   * @returns a modified message
   */
  public async renderMessageFormatForward(
    parentMessage: ISQLTableRowValue,
    size: number,
  ): Promise<IEmailRenderedMessage> {
    if (size >= (this.getSizeLimit() - 1000)) {
      const htmlValue = await this.formatForward("", parentMessage, true);
      return {
        attachments: null,
        cidMap: null,
        html: htmlValue,
        predictedSize: Buffer.byteLength(htmlValue, "utf-8"),
      };
    }

    // grab the forwarded reply
    const forwardValue = await this.localAppData.cache.requestValue("mail/mail", parentMessage.parent_id, null, { useMemoryCache: true });

    // strange missing value
    if (!forwardValue) {
      const htmlValue = await this.formatForward("ERROR", parentMessage, true);
      return {
        attachments: null,
        cidMap: null,
        html: htmlValue,
        predictedSize: Buffer.byteLength(htmlValue, "utf-8"),
      };
    }

    const renderedMessage = await this.renderMessageForMail(forwardValue);

    if (renderedMessage.predictedSize + size > this.getSizeLimit()) {
      const htmlValue = await this.formatForward("", forwardValue, true);
      return {
        attachments: null,
        cidMap: null,
        html: htmlValue,
        predictedSize: Buffer.byteLength(htmlValue, "utf-8"),
      };
    }

    const htmlValue = await this.formatForward(renderedMessage.html, forwardValue, false);
    return {
      attachments: renderedMessage.attachments,
      cidMap: renderedMessage.cidMap,
      html: htmlValue,
      predictedSize: Buffer.byteLength(htmlValue, "utf-8"),
    };
  }

  /**
   * Given a message from the database it will provide the resulting
   * html with all links resolved to be sent by email as well as the attachment
   * list to be appended
   * 
   * it will also resolve forwarded messages based on a reply unless internal forward options
   * are specified that will deny such event
   * 
   * @param message
   * @param internal
   * @returns 
   */
  public async renderMessageForMail(
    message: ISQLTableRowValue,
    internalForwardOptions?: {
      subjectReplace: string,
      from: string,
      fromProxy?: string,
    },
  ): Promise<IEmailRenderedMessage> {
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

    const language = message["subject_LANGUAGE"] || message["content_LANGUAGE"];
    const dir = isRTL(language) ? "rtl" : "ltr";

    let cidAttachments: PropertyDefinitionSupportedFilesType = [];
    try {
      cidAttachments = mediaProperty ? (JSON.parse(message[mediaPropertyId]) || []) : [];
    } catch {
    }

    const cidMap: { [key: string]: string } = {};
    let attachments: PropertyDefinitionSupportedFilesType = [];
    const cidAttachmentsToAttach: PropertyDefinitionSupportedFilesType = [];
    try {
      attachments = JSON.parse(message["attachments"]) || [];
    } catch {
    }

    const subject = (internalForwardOptions && internalForwardOptions.subjectReplace) || message.subject;

    let htmlStart = `<div dir="${dir}">`;

    // when we are forwarding message as form of notification to users
    if (internalForwardOptions) {
      htmlStart += (
        `<div>${escapeHtml(this.getForwardFromIndicator(language) + internalForwardOptions.from)}</div>` +
        `<div>${escapeHtml(this.getForwardSubjectIndicator(language) + message.subject)}</div>`
      );

      if (internalForwardOptions.fromProxy) {
        htmlStart += `<div>${escapeHtml(this.getForwardProxyIndicator(language) + internalForwardOptions.fromProxy)}</div>`
      }

      const urlForEmail = this.getForwardViewAtURL(language, message);
      htmlStart += `<div>${escapeHtml(this.getForwardViewAtIndicator(language))}<a href="${escapeHtml(urlForEmail)}">${escapeHtml(urlForEmail)}</a></div>`;

      htmlStart += "<div>";
    }

    // calling the sanitize function
    // it solves the urls too and because we are using
    // forceFullURLs they should work as cdn
    let htmlBase = sanitize(
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
        forMailCidCollected(file, index) {
          cidAttachmentsToAttach.push(file);
          const newId = "attachment_" + (index + 1);
          cidMap[newId] = file.id;
          return newId;
        },
        forMailFileCollected(file) {
          cidAttachmentsToAttach.push(file);
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

    const htmlEnd = internalForwardOptions ? "</div></div>" : "</div>";

    const predictedSizeStart = Buffer.byteLength(htmlStart, "utf-8");
    const predictedSizeEnd = Buffer.byteLength(htmlEnd, "utf-8");

    const predictedSizeBase = htmlBase ? Buffer.byteLength(htmlBase, "utf-8") : 0;
    const predictedSizeSubject = subject ? Buffer.byteLength(subject, "utf-8") : 0;
    let predictedSizeFiles: number = 0;

    if (attachments.length || cidAttachmentsToAttach.length) {
      const processAttachment = (property: string, v: PropertyDefinitionSupportedFileType) => {
        const location = path.join(
          NODE_ENV === "production" ? this.appConfig.productionHostname : this.appConfig.developmentHostname,
          this.storageIdef.getQualifiedPathName(),
          message.id + "." + (message.version || ""),
          property,
          v.id,
          v.url,
        );

        predictedSizeFiles += v.size;

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
      };
      attachments = attachments
        .map(processAttachment.bind(null, "attachments"))
        .concat(cidAttachmentsToAttach.map(processAttachment.bind(null, "cid_attachments"))) as PropertyDefinitionSupportedFilesType;
    }

    let predictedExtraSize = 0;
    if (message.parent_id && !internalForwardOptions) {
      const forwardMessageAdded = await
        this.renderMessageFormatForward(
          message,
          predictedSizeBase + predictedSizeStart + predictedSizeEnd + predictedSizeSubject + predictedSizeFiles,
        );
      htmlBase += forwardMessageAdded.html;
      if (forwardMessageAdded.attachments) {
        forwardMessageAdded.attachments.forEach((a) => attachments.push(a));
      }
      if (forwardMessageAdded.cidMap) {
        Object.assign(cidMap, forwardMessageAdded.cidMap);
      }
      predictedExtraSize = forwardMessageAdded.predictedSize;
    }

    return {
      html: htmlStart + htmlBase + htmlEnd,
      attachments: attachments.length ? attachments : null,
      cidMap: attachments.length ? cidMap : null,
      predictedSize: predictedSizeBase + predictedSizeStart + predictedSizeEnd + predictedSizeSubject + predictedSizeFiles + predictedExtraSize,
    };
  }

  /**
   * @override
   * An user received an email from one user to another user in the same domain, this is an internal
   * message, in this case email addresses may not be explicit
   * by default the message is assumed to have the right shape for the storage idef definition and will
   * be used to render a message clone and send it to the targets real email
   */
  public async onUsersReceivedInternalEmail(
    users: ISQLTableRowValue[],
    sender: ISQLTableRowValue,
    message: ISQLTableRowValue,
    proxyObject: ISQLTableRowValue,
    spam: boolean,
  ) {
    const root = this.isInstanceGlobal() ? this.globalRoot : this.localAppData.root;
    const userIdef = root.registry["users/user"] as ItemDefinition;

    const hasEnotifications = userIdef.hasPropertyDefinitionFor("e_notifications", false);
    const hasEvalidated = userIdef.hasPropertyDefinitionFor("e_validated", false);

    if (!hasEnotifications || !hasEvalidated || spam) {
      return;
    }

    const finalUsers = users.filter((user) => {
      return user.e_notifications && user.e_validated && user.email;
    });

    if (!finalUsers.length) {
      return;
    }

    const hostname = NODE_ENV === "development" ?
      this.appConfig.developmentHostname :
      this.appConfig.productionHostname;

    const sortedUsers: { [lng: string]: ISQLTableRowValue[] } = {};
    finalUsers.forEach((user) => {
      const language = user.app_language || message["subject_LANGUAGE"] || message["content_LANGUAGE"];
      if (!sortedUsers[language]) {
        sortedUsers[language] = [user];
      } else {
        sortedUsers[language].push(user);
      }
    });

    const username = this.getUserName(sender);
    const proxyname = proxyObject ? this.getObjectName(proxyObject) : null;

    await Promise.all(Object.keys(sortedUsers).map(async (language) => {
      const users = sortedUsers[language];

      const renderedData = await this.renderMessageForMail(message, {
        from: username,
        fromProxy: proxyname,
        subjectReplace: this.getForwardSubjectReplace(
          language,
          username,
          proxyname,
          proxyObject.type,
        ),
      });

      return this.sendEmail({
        from: this.escapeUserName(this.getNotificationsUsername(language)) + " <notifications@" + this.appConfig.mailDomain + ">",
        to: users.map((user) => this.escapeUserName(this.getUserName(user)) + " <" + user.email + ">"),
        subject: this.getNoReplySubjectPrefix(language) + message.subject,
        html: renderedData.html,
        attachments: renderedData.attachments,
        contentIdMap: renderedData.cidMap,
        unsubscribeMailto: "mailto:unsubscribe@" + hostname + "?subject=e_notifications&body=e_notifications",
      });
    }));
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
   * provides the user name for a given user
   * @overide
   * @param user 
   * @returns 
   */
  public getUserName(user: ISQLTableRowValue) {
    return user.real_name || user.actual_name || user.name || user.username;
  }

  /**
   * Provides the name of an object for the user
   * @override
   * @param object
   */
  public getObjectName(object: ISQLTableRowValue) {
    return object.real_name || object.actual_name || object.name || object.username || object.title || object.subject || "[Object]";
  }

  private async resolveTarget(str: string): Promise<{ idef: ItemDefinition, email: string, value: ISQLTableRowValue, name: string, isUser: boolean }> {
    if (str.includes("@")) {
      try {
        const parsed = this.parseRFC2822(str);
        return ({
          idef: null as ItemDefinition,
          email: (parsed && parsed[0] && parsed[0].address) || null,
          value: null,
          name: (parsed && parsed[0] && parsed[0].name()) || null,
          isUser: false,
        })
      } catch {
        return ({
          idef: null as ItemDefinition,
          email: str,
          value: null,
          name: null,
          isUser: false,
        });
      }
    }

    const tObjSplitted = str.split("$");
    const id = tObjSplitted[0];
    let type: string = "users/user";
    if (tObjSplitted.length === 2) {
      type = tObjSplitted[1];
    }

    const idef = this.localAppData.root.registry[type] as ItemDefinition;
    if (!idef || !(idef instanceof ItemDefinition)) {
      return null;
    }

    const value = await this.localAppData.cache.requestValue(idef, id, null, { useMemoryCache: true });
    if (!value) {
      return null;
    }

    let email: string = null;
    let name: string = null;
    let isUser: boolean = true;
    if (idef.getQualifiedPathName() === "MOD_users__IDEF_user") {
      const hasEExternal = idef.hasPropertyDefinitionFor("e_external", false);
      name = this.getUserName(value);

      if (hasEExternal && value["e_external"]) {
        email = value.username + "@" + this.appConfig.mailDomain;
      }
    } else {
      name = this.getObjectName(value);
      isUser = false;
    }

    return {
      email,
      idef,
      name,
      value,
      isUser,
    };
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

              let targets = arg.requestedUpdate.target as Array<string>;

              if (!targets.length) {
                arg.forbid(
                  "Cannot send an email to none",
                );
              }

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

              const subjectS = (arg.requestedUpdate.subject && Buffer.byteLength(arg.requestedUpdate.subject as string, "utf-8")) || 0;
              const contentS = (arg.requestedUpdate.content && Buffer.byteLength(arg.requestedUpdate.content as string, "utf-8")) || 0;

              // 1000 characters extra
              let totalS = subjectS + contentS + 1000;
              if (arg.requestedUpdate.attachments || arg.requestedUpdate.cid_attachments) {
                const parsedA: any = arg.requestedUpdate.attachments || [];
                const parsedB: any = arg.requestedUpdate.cid_attachments || [];
                parsedA.forEach((a: IPropertyDefinitionSupportedSingleFilesType) => {
                  if (typeof a.size === "number" && a.size) {
                    totalS += a.size;
                  }
                });
                parsedB.forEach((a: IPropertyDefinitionSupportedSingleFilesType) => {
                  if (typeof a.size === "number" && a.size) {
                    totalS += a.size;
                  }
                });
              }

              if (totalS > this.getSizeLimit()) {
                arg.forbid(
                  "The email size is too large " + totalS,
                  "EMAIL_TOO_LARGE",
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

              const references = replyOf ? (
                (replyOf.references || []).concat([replyOf.uuid])
              ) : null;

              const fakeExternalTargets: Array<[string, number]> = [];
              targets.forEach((t, index) => {
                const tIsRfc = t.includes("@");
                const tRfc = tIsRfc ? this.parseRFC2822(t) : null;

                if (tIsRfc && !tRfc[0]) {
                  arg.forbid(
                    "Invalid RFC2822 email " + t,
                  );
                }
                const targetPotentialExtenalDomain = tIsRfc && tRfc[0].host().toLowerCase();

                // aka is external
                if (targetPotentialExtenalDomain !== this.appConfig.mailDomain && !senderObj.e_external) {
                  arg.forbid(
                    "Cannot send external emails if user has no external email enabled",
                  );
                } else if (targetPotentialExtenalDomain === this.appConfig.mailDomain) {
                  fakeExternalTargets.push([tRfc[0].user(), index]);
                }

                if (!tIsRfc) {
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

              // fix fake external targets and set them to internal ids
              if (fakeExternalTargets.length) {
                const results = await this.localAppData.rawDB.performRawDBSelect(
                  "users/user",
                  (b) => {
                    b.select("id", "username").whereBuilder.andWhere(
                      "LOWER(\"username\") = ANY(ARRAY[" + fakeExternalTargets.map(() => "?").join(",") + "]::TEXT[])",
                      fakeExternalTargets.map((v) => v[0].toLowerCase()),
                    )
                  }
                );

                // copy not to modify the original
                targets = [...targets];

                results.forEach((v) => {
                  const fakeTargetSrc = fakeExternalTargets.find((v2) => v2[0] === v.username);
                  if (fakeTargetSrc) {
                    const indexInTargets = fakeTargetSrc[1];
                    // updating to id based
                    targets[indexInTargets] = v.id;
                  }
                });
              }

              // now let's remove potential duplicate
              targets = targets.filter((v, index, arr) => arr.indexOf(v) === index);

              const baseIdToUse = uuid.v4().replace(/-/g, "");
              const uuidToUse = baseIdToUse + "@" + this.appConfig.mailDomain;
              const idToUse = uuidv5(uuidToUse, MAIL_NAMESPACE).replace(/-/g, "") + "+" + arg.requestedUpdateCreatedBy;

              arg.setForId(idToUse);

              return {
                ...arg.requestedUpdate,
                uuid: uuidToUse,
                references,
                target: targets,
              };
            }

            // these triggers are all when an user manually created these
            // and not when it was manually attached, say by external
            if (arg.action === IOTriggerActions.CREATED) {
              // in this case an user has created a brand new message inside
              // the mail component that is used for storage, and we shall now
              // send them to external sources or copy them to the given targets
              const sender = arg.requestedUpdateCreatedBy;
              const targets = arg.newValue.target as Array<string>;

              // the external targets are for rfc emails that are external targets only
              // and do not belong to the system
              const externalTargets: string[] = [];
              // all the potential external targets will include the emails
              // that are sent for internal users that have an external email active
              const allPotentialExternalTargets: string[] = [];
              // the internal targets that were resolved here, these are by proxy
              // that is the group or whatever object caused them to be resolved
              // and whether it was considered spam for those users
              const allInternalTargetsByProxy = new Map<ISQLTableRowValue, { isSpam: boolean, users: ISQLTableRowValue[] }>();
              // and this is per each individually targeted user and whether it was considered spam for that specific user
              const allInternalTargetsByUser: Array<{ isSpam: boolean, user: ISQLTableRowValue }> = [];

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
                  const tIsRfc = t.includes("@");

                  // for internal elements
                  let internalTarget: ISQLTableRowValue = null;
                  const isInternal = !tIsRfc;
                  const isRepeat = targets.indexOf(t) !== index;

                  // do not send duplicates or nonsense
                  if (isRepeat) {
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
                    if (
                      internalIdef.getQualifiedPathName() === "MOD_users__IDEF_user" &&
                      internalTarget.e_external
                    ) {
                      const rfcHandle = this.escapeUserName(this.getUserName(internalTarget)) +
                        " <" + internalTarget.username + "@" + arg.appData.config.mailDomain + ">";
                      allPotentialExternalTargets.push(rfcHandle);
                    }
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
                      await arg.appData.cache.requestCopy(
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

                      // and let's do this, we are adding by target
                      // for individually targeted users
                      if (internalIdef.getQualifiedPathName() === "MOD_users__IDEF_user") {
                        allInternalTargetsByUser.push({ isSpam, user: targetUser });

                        // if it was not resolved by user then it must have been resolved
                        // by a proxy object
                      } else if (!allInternalTargetsByProxy.has(internalTarget)) {
                        allInternalTargetsByProxy.set(internalTarget, { isSpam, users: [targetUser] });
                      } else {
                        allInternalTargetsByProxy.get(internalTarget).users.push(targetUser);
                      }
                    }));
                  } else {
                    // we save it to an external target
                    externalTargets.push(t);
                    // and also to all the potential external targets
                    // that include everything, externals and internals
                    allPotentialExternalTargets.push(t);
                  }
                }));

                const allSpamUsers = allInternalTargetsByUser.filter((d) => d.isSpam);
                const allNonSpamUsers = allInternalTargetsByUser.filter((d) => !d.isSpam);

                // send to all users that marked as spam
                if (allSpamUsers.length) {
                  await this.onUsersReceivedInternalEmail(
                    allSpamUsers.map((v) => v.user),
                    senderObj,
                    arg.newValueSQL,
                    null,
                    true,
                  );
                }

                // send to all users that did not mark as spam
                if (allNonSpamUsers.length) {
                  await this.onUsersReceivedInternalEmail(
                    allNonSpamUsers.map((v) => v.user),
                    senderObj,
                    arg.newValueSQL,
                    null,
                    false,
                  );
                }

                // send to all proxies
                for (let targetProxy of allInternalTargetsByProxy.keys()) {
                  const data = allInternalTargetsByProxy.get(targetProxy);
                  await this.onUsersReceivedInternalEmail(
                    data.users,
                    senderObj,
                    arg.newValueSQL,
                    targetProxy,
                    data.isSpam,
                  );
                }

                // send to external targets
                if (externalTargets.length) {
                  // we need to render the message as if it was a template and send it to the external source
                  // let's avoid doing it twice
                  const renderedMessage = await this.renderMessageForMail(arg.newValueSQL);
                  const senderInternalEmail = senderObj.username + "@" + this.appConfig.mailDomain;
                  await this.sendEmail({
                    from: this.escapeUserName(this.getUserName(senderObj)) + " <" + senderInternalEmail + ">",
                    // we send to all the potential, including possible local targets
                    // but we only send if we have external ones
                    to: allPotentialExternalTargets,
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
   * This formats a forwarded message for when it's sent to an external target
   * @param html the html of the forwarded message itself
   * @param message the message object itself
   * @param isBreak whether this message actually can't fit due to size limitations (do not try to render much the thread is broken)
   * @returns 
   */
  public async formatForward(html: string, message: ISQLTableRowValue, isBreak: boolean) {
    const lang = message["subject_LANGUAGE"] || message["content_LANGUAGE"];

    // if it's a break we set the break header and shall be done
    if (isBreak) {
      return (
        `<div class="quote"><div class="attr">${escapeHtml(this.getBreakHeader(lang))}</div></div>`
      );
    }

    // from indicator
    // from: User <user@email.com>
    // from: User
    // from: <user@email.com>
    let from: string = escapeHtml(this.getForwardFromIndicator(lang));
    if (message.source) {
      const source = await this.resolveTarget(message.source);
      if (source) {
        if (source.name) {
          from += " <strong>" + escapeHtml(source.name) + "</strong>";
        }
        if (source.email) {
          from += ` <a href="mailto:${escapeHtml(source.email)}">&lt;${escapeHtml(source.email)}&gt;</a>`
        }
      } else {
        from += escapeHtml(this.getForwardDeletedIndicator(lang));
      }
    }

    // to indicator
    // to: User, Object, User2 <user2@email.com>, <user2@email.com>
    let toText: string = "";
    if (message.target) {
      for (let target of message.target) {
        const targetV = await this.resolveTarget(target);
        if (targetV) {
          if (toText) {
            toText += ",";
          }
          if (targetV.name) {
            toText += " <strong>" + escapeHtml(targetV.name) + "</strong>";
          }
          if (targetV.email) {
            toText += ` <a href="mailto:${escapeHtml(targetV.email)}">&lt;${escapeHtml(targetV.email)}&gt;</a>`
          }
        } else {
          from += escapeHtml(this.getForwardDeletedIndicator(lang));
        }
      }
    }

    // completed the to indicator
    const to = escapeHtml(this.getForwardToIndicator(lang)) + toText;

    // Date: 28, Jan, 2022
    // in the language of the message
    const date = escapeHtml(this.getForwardDateIndicator(lang) + formatDateTime(lang, message.timestamp || message.created_at));
    // Subject: the subject
    const subject = escapeHtml(this.getForwardSubjectIndicator(lang) + message.subject);

    // return in a format similar to google email
    return (
      `<div class="quote">` +
      `<div class="attr">` +
      this.getForwardMessageHeader(lang) +
      "<br>" +
      from + "<br>" +
      date + "<br>" +
      subject + "<br>" +
      to + "<br>" +
      `</div>` +
      `<br><br><div>${html}</div>` +
      `</div>`
    );
  }

  public getNoReplySubjectPrefix(lang: string) {
    return this.getLangHeader(lang, "no_reply", "[No Reply] ");
  }

  public getForwardSubjectReplace(lang: string, username: string, proxyname: string, proxyType: string) {
    return this.getLangHeader(lang, "notification_forward", "You have received a new message from: ") + username;
  }

  public getNotificationsUsername(lang: string) {
    return this.getLangHeader(lang, "notifications_user", "Notifications");
  }

  public getForwardViewAtURL(lang: string, message: ISQLTableRowValue) {
    const hostname = NODE_ENV === "development" ? this.appConfig.developmentHostname : this.appConfig.productionHostname;
    return "https://" + hostname + "/" + lang + "/" + message.id.split("+")[0];
  }

  public getForwardViewAtIndicator(lang: string) {
    return this.getLangHeader(lang, "view_at_indicator", "View Original: ");
  }

  public getForwardDeletedIndicator(lang: string) {
    return this.getLangHeader(lang, "deleted_indicator", "[Deleted]");
  }

  public getForwardFromIndicator(lang: string) {
    return this.getLangHeader(lang, "from_indicator", "From: ");
  }

  public getForwardProxyIndicator(lang: string) {
    return this.getLangHeader(lang, "proxy_indicator", "You have received this message because you are part of: ");
  }

  public getForwardToIndicator(lang: string) {
    return this.getLangHeader(lang, "to_indicator", "To: ");
  }

  public getForwardDateIndicator(lang: string) {
    return this.getLangHeader(lang, "date_indicator", "Date: ");
  }

  public getForwardSubjectIndicator(lang: string) {
    return this.getLangHeader(lang, "subject_indicator", "Subject: ");
  }

  public getForwardMessageHeader(lang: string) {
    return this.getLangHeader(lang, "forward_header", "---------- Forwarded message ---------");
  }

  public getBreakHeader(lang: string) {
    return this.getLangHeader(lang, "break_header", "---------- Forwarded limit ---------");
  }

  private getLangHeaderBase(lang: string, id: string) {
    const v = this.storageIdef.getI18nDataFor(lang);
    return v && v.custom && v.custom[id];
  }

  public getLangHeader(lang: string, id: string, def: string) {
    const actualLanguage = lang || this.appConfig.fallbackLanguage;
    return this.getLangHeaderBase(actualLanguage, id) ||
      this.getLangHeaderBase(actualLanguage.split("-")[0], id) ||
      this.getLangHeaderBase(this.appConfig.fallbackLanguage, id) ||
      def;
  }

  /**
   * The maximum message size in bytes that you are capable of sending
   * @override
   */
  public getSizeLimit() {
    return 20000000; // equivalent to 20MB
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