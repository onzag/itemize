/**
 * Allows to set up a sensitive configuration information
 * @module
 */

import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../../config";
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
  config: IConfigRawJSONDataType,
): Promise<ISensitiveConfigRawJSONDataType> {
  const domain = (version === "development" ? config.developmentHostname : config.productionHostname);
  const isAlreadyASubdomain = domain.split(".").length >= 2;
  const defaultValueForClusters = {
    [config.defaultCluster]: {
      sshuser: "ssh-user-here",
      hostname: (config.allClusters.length >= 1 ? config.defaultCluster.toLowerCase() + (isAlreadyASubdomain ? "-" : ".") : "") + domain,
      services: "full",
    },
  };

  config.allClusters.forEach((clusterId) => {
    if (clusterId === config.defaultCluster) {
      return;
    }

    defaultValueForClusters[clusterId] = {
      sshuser: "ssh-user-here",
      hostname: (config.allClusters.length >= 1 ? clusterId.toLowerCase() + (isAlreadyASubdomain ? "-" : ".") : "") + domain,
      services: "cluster",
    };
  })

  const newConfig = await configRequest(
    currentConfig || referenceConfig,
    "Sensitive configuration (" + version + ")",
    [
      {
        variableName: "userLocalization",
        message: "The configuration used by the user localizer, if given, this enables to find the user location in order " +
          "to accurately predict what language such user speaks, it uses the ip in order to do such prediction, itemize by default " +
          "uses elasticsearch (so you may leave it null) however without elastic, you may specify data for the IPStack provider, " +
          "so you might refer to https://ipstack.com/product to get a free API key",
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
            type: "strobject",
            message: "The available phone numbers that your account can make use of, the number in '*' is considered the default," +
              " use (+??) country codes to match specific countries with specific phone numbers",
            defaultValue: {
              "*": "+358????????",
            },
          },
        ],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "logging",
        message: "The API configuration used for logging, leave it null to log into main database (not recommended) or elastic (recommended)",
        type: "config",
        defaultValue: null,
        extractData: [],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "devKey",
        message: "a development key that is used to obtain development javascript files in production settings when set as a cookie",
        defaultValue: genToken(16),
      },
      {
        variableName: "adminKey",
        message: "An administration key that is used to perform administrative actions on an admin user account",
        defaultValue: genToken(16),
      },
      {
        variableName: "ussd",
        message: "The API configuration used for USSD protocol for extremely old devices",
        type: "config",
        defaultValue: null,
        extractData: [],
        preferUnfilled: true,
        cantRerun: true,
      },
      {
        variableName: "clusters",
        type: "multiconfig",
        defaultValue: defaultValueForClusters,
        message: "The configuration for the clusters that have been created",
        extractData: [
          {
            variableName: "sshuser",
            type: "string",
            message: "The user that connects to the cluster via ssh to deploy",
          },
          {
            variableName: "hostname",
            type: "string",
            message: "The unique hostname that communicates only to this cluster",
          },
          {
            variableName: "services",
            type: "string&strarray",
            message: "The services to be used here, you may use a comma separated list here for the value or a simple " +
              "string, add a comma at the end to specify single array value",
          },
        ]
      }
    ],
  );

  return newConfig;
}
