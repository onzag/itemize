/**
 * This file specifies a base for creating a phone provider
 * and phone providers as, they contain functions that are
 * necessary and shouldn't be touched and others that should
 * be overriden into what is a standard service
 * 
 * @module
 */

import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ISQLTableRowValue } from "../../../base/Root/sql";
import { renderTemplateAsNode, convertNodeToText } from "../../../client/internal/text";
import type { IGQLValue } from "../../../gql-querier";
import { ServiceProvider, ServiceProviderType } from "..";
import { FORCE_ALL_OUTBOUND_SMS_TO, NODE_ENV } from "../../environment";
import type { RegistryService } from "../registry";

/**
 * The shape of an sms that is being wanted to be sent
 */
export interface ISendSMSData {
  /**
   * A single phone or a list of phones that are supposed
   * to be sent to
   */
  to: string | string[];
  /**
   * The plain text content
   */
  text: string;
}

/**
 * The PhoneProvider class is a service that provides SMS
 * functionality to the itemize server side app
 * 
 * The PhoneProvider class is a special class, and does not support
 * global mode, even if specified
 */
export default class PhoneProvider<T> extends ServiceProvider<T> {
  public static getType() {
    return ServiceProviderType.HYBRID;
  }

  constructor(c: T, registry: RegistryService, configs: any) {
    super(c, registry, configs);

    if (FORCE_ALL_OUTBOUND_SMS_TO) {
      const originalSendSMS = this.sendSMS.bind(this);
      this.sendSMS = (data: ISendSMSData) => {
        const newData = {...data};
        newData.to = FORCE_ALL_OUTBOUND_SMS_TO;

        return originalSendSMS(newData);
      }
    }
  }

  /**
   * Sends a template based email to a given user and it
   * will not filter any of these users
   * @param arg the unverified args
   * @param arg.to the list of numbers to send to
   * @param arg.itemDefinition either a string that represents an item definition that can be pulled from the registry
   * or an item definition itself that represents the item definition to be used for templating
   * @param arg.property the property that the value is extracted for and should be a text type
   * @param arg.id the id for the given item we need to pull
   * @param arg.version an optional version value to use, this version is expected to be a locale version, as such
   * unversioned values will be used as fallback if the version is not found
   * @param arg.args the template args
   */
  public async sendUnverifiedTemplateSMS(
    arg: {
      to: string | string[];
      itemDefinition: string | ItemDefinition;
      property: string | PropertyDefinition;
      id: string;
      version?: string;
      args: any;
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
          methodName: "sendUnverifiedTemplateSMS",
          message: "Attempted to send a SMS without recepient",
          data: {
            itemDefinition: actualItemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        }
      );
      return;
    }

    // retrieve the property
    const actualProperty = typeof arg.property === "string" ?
      actualItemDefinition.getPropertyDefinitionFor(arg.property, true) :
      arg.property;

    // now we need to build the template
    let templateValue: ISQLTableRowValue = null;
    let parsedTemplateValue: HTMLDivElement = null;
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

        // and we extract it
        if (templateValue && templateValue[propertyId]) {
          // calling the render template function
          parsedTemplateValue = renderTemplateAsNode(
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
      // textValue += "\n\n" + JSON.stringify(arg.args, null, 2) + "\n";
    } else {
      textValue = convertNodeToText(parsedTemplateValue);
    }

    // setup the args
    const args: ISendSMSData = {
      to: arg.to,
      text: textValue,
    }

    // now we can send the email
    try {
      await this.sendSMS(args);
    } catch (err) {
      this.logError(
        {
          className: "MailProvider",
          methodName: "sendUnverifiedTemplateSMS",
          message: "API failed to deliver a SMS",
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
   * Sends a template based SMS to a given user
   * @param arg the args
   * @param arg.to this is a special list of values to send to the users that we want to send to, they can be
   * specified as the list of ids, aka user identifiers of the given users, but grapqhl values or sql values
   * are allowed as well and they improve speed up, remember to pass whole results with all the properties
   * you are using or otherwise it might misbehave
   * @param arg.itemDefinition either a string that represents an item definition that can be pulled from the registry
   * or an item definition itself that represents the item definition to be used for templating
   * @param arg.property the property that the value is extracted for and should be a text type
   * @param arg.id the id for the given item we need to pull
   * @param arg.version an optional version value to use, this version is expected to be a locale version, as such
   * unversioned values will be used as fallback if the version is not found
   * @param arg.args the template args
   * @param arg.ignoreUnsubscribe whether we should ignore the subscription values for
   * the given user so they will receive the email anyway regardless of their subscription status
   * this should never really be true
   * @param arg.phoneProperty the email property to use to send emails, normally users only have a single
   * email property so this isn't necessary but they might have some alternative email property to use
   * as target email
   * @param arg.personalize if specified it will make each template personalized, it will add the phone
   * to the template args, and any other property that is specified on this list to the args, using personalization
   * when sending to multiple users can hurt your mail speed as every user will receive a different email that
   * needs to be built
   */
  public async sendTemplateSMS(
    arg: {
      to: string | IGQLValue | ISQLTableRowValue | Array<string | IGQLValue | ISQLTableRowValue>;
      itemDefinition: string | ItemDefinition;
      property: string | PropertyDefinition;
      id: string;
      version?: string;
      args: any;
      ignoreUnsubscribe: boolean;
      subscribeProperty: string;
      confirmationProperties?: string[];
      phoneProperty?: string;
      personalize?: string[];
    }
  ) {
    const root = this.isInstanceGlobal() ? this.globalRoot : this.localAppData.root;
    const userIdef = root.registry["users/user"] as ItemDefinition;

    // first we need the phone property
    const phonePropertyUsed = arg.phoneProperty || "phone";
    // and we expect the user item definition to have it
    if (!userIdef.hasPropertyDefinitionFor(phonePropertyUsed, true)) {
      this.logError(
        {
          className: "MailProvider",
          methodName: "sendTemplateEmail",
          message: "There is no " + phonePropertyUsed + " property in the item definition for user",
          serious: true,
          data: {
            itemDefinition: typeof arg.itemDefinition === "string" ? arg.itemDefinition : arg.itemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        },
      );
      throw new Error("There is no " + phonePropertyUsed + " property in the item definition for user");
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
            itemDefinition: typeof arg.itemDefinition === "string" ? arg.itemDefinition : arg.itemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        },
      );
      throw new Error("There is no " + arg.subscribeProperty + " property in the item definition for user");
    }

    // and we are going to make this an array
    let actualUsersToSend: any[] = Array.isArray(arg.to) ? arg.to : [arg.to];
    // and let's figure out the phones and unsubscribe urls for each
    let actualUsersPhonesToSend: string[] = null;

    // now we need to setup the personalization, if we have any
    // these are going to be the personalization args per user
    // so an array of args, null if we are not personalizing
    let personalization: Array<any> = arg.personalize ? [] : null;

    // now we need to setup the actual users we are sending to, as in their phones
    actualUsersPhonesToSend = await Promise.all(actualUsersToSend.map(async (u, index) => {

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
      const phone = userData.DATA ? userData.DATA[phonePropertyUsed] : userData[phonePropertyUsed];

      // if we don't have an email at all then we return null as we cannot
      // send to that user
      if (!phone) {
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
          phone,
          [phonePropertyUsed]: phone,
        };
        // per personalize property we copy it in the new array
        arg.personalize.forEach((p) => {
          personalization[index][p] = userData.DATA ? userData.DATA[p] : userData[p];
        });
      }

      // return the phone
      return phone;
    }));

    // now we need to send the templates
    // we have the phones we want to send to
    // the send process is different depending on whether
    // it personalized phones or not
    if (arg.personalize) {
      // now we get all these phones
      await Promise.all(actualUsersPhonesToSend.map(async (phone, index) => {
        // the ones that are not null of course
        if (phone === null) {
          return;
        }

        // and we will send one by one, and add the personalization
        // attributes of the given index to the args for the template
        await this.sendUnverifiedTemplateSMS({
          to: phone,
          itemDefinition: arg.itemDefinition,
          property: arg.property,
          id: arg.id,
          version: arg.version,
          args: {
            ...arg.args,
            ...personalization[index],
          },
        });
      }));
    } else {
      // otherwise we just filter this list
      actualUsersPhonesToSend = actualUsersPhonesToSend.filter((u) => {
        return (u !== null);
      });

      // if there's none left we return
      if (!actualUsersPhonesToSend.length) {
        return;
      }

      // otherwise we send these for all the given users
      // it's the same email after all same HTML content
      await this.sendUnverifiedTemplateSMS({
        to: actualUsersPhonesToSend,
        itemDefinition: arg.itemDefinition,
        property: arg.property,
        id: arg.id,
        version: arg.version,
        args: arg.args,
      });
    }
  }

  /**
   * This function is executed when the service
   * needs to send an email
   * @override
   */
  public async sendSMS(data: ISendSMSData): Promise<void> {
    this.logError(
      {
        className: "MailProvider",
        methodName: "sendEmail",
        message: "Attempted to send an sms with a raw provider; there's no API available to complete this action",
        serious: true,
        data,
      },
    );
  }
}