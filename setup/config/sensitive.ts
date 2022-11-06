/**
 * Allows to set up a sensitive configuration information
 * @module
 */

import { ISensitiveConfigRawJSONDataType } from "../../config";
import { configRequest } from "../read";

/**
 * A list of characters
 * @ignore
 */
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * generates a random alphanumeric token
 * @param length the size of the token
 */
function genToken(length: number) {
  var result = "";
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  };
  return result;
}

/**
 * Allows for setting up the senstive configuration
 * @param version development of production
 * @param currentConfig the currently stored config
 * @param referenceConfig the reference configuration to use values against
 */
export async function sensitiveConfigSetup(
  version: string,
  currentConfig: ISensitiveConfigRawJSONDataType,
  referenceConfig: ISensitiveConfigRawJSONDataType,
): Promise<ISensitiveConfigRawJSONDataType> {
  const newConfig = await configRequest(
    currentConfig || referenceConfig,
    "Sensitive configuration (" + version + ")",
    [
      {
        variableName: "userLocalization",
        message: "The configuration used by the user localizer, if given, this enables to find the user location in order " +
        "to accurately predict what language such user speaks, it uses the ip in order to do such prediction, itemize by default " +
        "uses the IPStack provider, so you might refer to https://ipstack.com/product to get a free API key",
        type: "config",
        defaultValue: null,
        extractData: [
          {
            variableName: "apiKey",
            message: "The api key given to the provider",
            defaultValue: "",
            hidden: true,
            nullifyFalseValues: true,
          },
          {
            variableName: "httpsEnabled",
            message: "Whether it is https enabled",
            defaultValue: false,
            type: "boolean",
          },
        ],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "currencyFactors",
        message: "The configuration used by the currency manager in the global manager, if given, this enables to be abel to " +
        "use the currency type, note that this is necessary in order to support currencies, by default itemize uses the currency " +
        "provider from https://currencylayer.com/ you can get a free API key from there",
        type: "config",
        defaultValue: null,
        extractData: [
          {
            variableName: "apiKey",
            message: "The api key given to the provider",
            defaultValue: "",
            hidden: true,
            nullifyFalseValues: true,
          },
          {
            variableName: "httpsEnabled",
            message: "Whether it is https enabled",
            defaultValue: false,
            type: "boolean",
          },
        ],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "locationSearch",
        message: "The API used in order to fetch search results for used for location search autocompletition " +
        "it is necessary in order to be able to use the location service as this enables the searchbox " +
        "while you can still use location, it is preferable to have this service enabled, it can be accessed by " +
        "rest endpoints and used by the renderers, by default itemize uses here maps autocomplete, get a key at https://developer.here.com/",
        type: "config",
        defaultValue: null,
        extractData: [
          {
            variableName: "apiKey",
            message: "The api key given to the provider",
            defaultValue: "",
            hidden: true,
            nullifyFalseValues: true,
          },
        ],
        preferUnfilled: true,
        cantRerun: true,
      },
      // TODOPAYMENT what do we need here
      {
        variableName: "payment",
        message: "The API configuration used to process payments",
        type: "config",
        defaultValue: null,
        extractData: [
          {
            variableName: "apiKey",
            message: "The api key given",
            defaultValue: "",
            hidden: true,
            nullifyFalseValues: true,
          },
        ],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "mail",
        message: "The configuration used by the email service provider by default itemize will use the " +
        "mailgun provider you might get a key at https://www.mailgun.com/ however you can also start the system " +
        "with FAKE_EMAILS=true in order to use an email delivery system that just logs the emails",
        type: "config",
        defaultValue: null,
        extractData: [
          {
            variableName: "apiKey",
            message: "Used in order to send emails",
            defaultValue: "",
            hidden: true,
            nullifyFalseValues: true,
          },
          {
            variableName: "domain",
            message: "Your own domain used in order to send emails",
            defaultValue: "mail.mysite.com",
            nullifyFalseValues: true,
          },
          {
            variableName: "host",
            message: "The mailgun api host, usually api.eu.mailgun.net or api.mailgun.net",
            defaultValue: "api.mailgun.net",
            nullifyFalseValues: true,
          },
        ],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "phone",
        message: "The configuration used by the phone service provider by default itemize will use twilio however you can also start the system " +
        "with FAKE_SMS=true in order to use an sms delivery system that just logs the sms",
        type: "config",
        defaultValue: null,
        extractData: [
          {
            variableName: "accountId",
            message: "The account id to be used when sending SMS",
            defaultValue: "",
            hidden: true,
            nullifyFalseValues: true,
          },
          {
            variableName: "accountToken",
            message: "Your own domain used in order to send emails",
            defaultValue: "mail.mysite.com",
            nullifyFalseValues: true,
          },
          {
            variableName: "phoneNumbers",
            type: "strarray",
            message: "The available phone numbers that your account can make use of, the first number will be considered the default",
            defaultValue: [],
          },
        ],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "logging",
        message: "The API configuration used for logging, leave it null to log into main database, but this is not recommended for production",
        type: "config",
        defaultValue: null,
        extractData: [],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "containers",
        type: "multiconfig",
        message: "Containers to use, the default provider is openstack",
        defaultValue: null,
        extractData: [
          {
            variableName: "type",
            defaultValue: "openstack",
            message: "The provider utilized",
            nullifyFalseValues: true,
          },
          {
            variableName: "config",
            type: "config",
            message: "the configuration utilized",
            defaultValue: null,
            extractData: [
              {
                variableName: "username",
                message: "An username provided by an openstack cloud provider",
                defaultValue: "",
              },
              {
                variableName: "password",
                message: "The user password provided by an openstack cloud provider",
                defaultValue: "",
                hidden: true,
              },
              {
                variableName: "region",
                message: "The region to connect from the openstack cloud provider",
                defaultValue: "",
                nullifyFalseValues: true,
              },
              {
                variableName: "domainId",
                message: "The domain id of the given openstack project",
                defaultValue: "default",
              },
              {
                variableName: "domainName",
                message: "The domain name of the given openstack project",
                defaultValue: "",
              },
              {
                variableName: "containerName",
                message: "The name of the container that contains the uploaded files",
                defaultValue: "",
              },
              {
                variableName: "authUrl",
                message: "The auth url of the service provider that you are utilizing",
                defaultValue: "",
              },
            ],
          },
        ],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "localContainer",
        message: "You can define a local container, a local container is only truly usable in a single cluster, and it's not recommended for production builds",
        defaultValue: "MAIN",
        hidden: false,
        nullifyFalseValues: true,
      },
      {
        variableName: "defaultContainerID",
        message: "of all the previous containers id which one is used by default for internal usage only when no country specified",
        defaultValue: "MAIN",
        hidden: false,
        nullifyFalseValues: true,
      },
      {
        variableName: "seoContainerID",
        message: "of all the previous containers id which one is used for storing SEO and sitemap information",
        defaultValue: "MAIN",
        hidden: false,
        nullifyFalseValues: true,
      },
      {
        variableName: "devKey",
        message: "a development key that is used to obtain development javascript files in production settings when set as a cookie",
        defaultValue: genToken(16),
      }
    ],
  );

  return newConfig;
}
