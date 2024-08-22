/**
 * Allows to set up a standard configuration information
 * @module
 */

import { IConfigRawJSONDataType } from "../../config";
import { configRequest } from "../read";
import { countries, currencies } from "../../imported-resources";

/**
 * Allows to set up a standard configuration information
 * @param currentConfig the current configuration
 * @param packageJSON the current package.json file content (parsed)
 */
export async function standardConfigSetup(
  currentConfig: IConfigRawJSONDataType,
  packageJSON: any,
): Promise<IConfigRawJSONDataType> {
  const newConfig = await configRequest(
    currentConfig,
    "Standard configuration",
    [
      {
        variableName: "entry",
        message: "Please choose your entry schema root, the entry root contains the data for your itemize app",
        defaultValue: "schema/root",
      },
      {
        variableName: "appName",
        message: "Please choose your app name, your app name is the unique identifier that is used for fallback title and manifests",
        defaultValue: packageJSON.name,
      },
      {
        variableName: "supportedLanguages",
        type: "strarray",
        message: "Please choose the languages you are supporting as a list of comma separated values eg. en, es; " +
        "use language ISO codes, and regions are allowed, eg. en-US, de-DE, etc...",
        defaultValue: ["en"],
      },
      {
        variableName: "rtlLanguages",
        type: "strarray",
        message: "Of the languages you had input, is any of those languages a right to left language, such as arabic; " +
        "use language ISO codes, and regions are allowed, eg. en-US, de-DE, etc...",
        defaultValue: [],
      },
      {
        variableName: "roles",
        type: "strarray",
        message: "Now you should specify the user roles that your app supports, make these uppercase, no spaces",
        defaultValue: ["ADMIN", "USER"],
        validate: (value: string[]) => {
          return value.every((v) => v.toUpperCase().replace(/\s/g, "") === v);
        }
      },
      {
        variableName: "fontUrl",
        message: "Specify an url to a font to be the default font for your app, local values are valid, as in /rest/resource/font.css",
        defaultValue: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,500&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese",
      },
      {
        variableName: "fontName",
        message: "The name of the font to be used from the stylesheet that was included",
        defaultValue: "Open Sans",
      },
      {
        variableName: "cacheableExtHostnames",
        type: "strarray",
        message: "External hostnames that will by default cache in the service worker",
        defaultValue: ["fonts.googleapis.com", "fonts.gstatic.com"],
      },
      {
        variableName: "cachedResources",
        type: "strarray",
        message: "A list of resources that will be cached by default by the service worker",
        defaultValue: [],
      },
      {
        variableName: "cachedExtUrls",
        type: "strarray",
        message: "A list of external urls that will be cached by default by the service worker",
        defaultValue: [],
      },
      {
        variableName: "manifest",
        type: "config",
        message: "Manifest configuration for the web manifest",
        defaultValue: null,
        extractData: [
          {
            variableName: "backgroundColor",
            message: "Please specify a proper css style hex value for the background color eg. #00FFAA",
            defaultValue: "#FFFFFF",
          },
          {
            variableName: "themeColor",
            message: "Please specify a proper css style hex value for the theme color eg. #00FFAA",
            defaultValue: "#000000",
          },
          {
            variableName: "macSafariMaskIconThemeColor",
            message: "Please specify a proper css style hex value for the safari mask icon theme color eg. #00FFAA",
            defaultValue: "#000000",
          },
          {
            variableName: "msTileColor",
            message: "Please specify a proper css style hex value for the metro icon in edge eg. #00FFAA",
            defaultValue: "#000000",
          },
          {
            variableName: "orientation",
            message: "The orientation of the app, landscape or portrait",
            defaultValue: "portrait",
            validate: (value) => ["portrait", "landscape"].includes(value),
          },
          {
            variableName: "display",
            message: "The display of the application, fullscreen, standalone, minimal-ui or browser",
            defaultValue: "standalone",
            validate: (value) => ["fullscreen", "standalone", "minimal-ui", "browser"].includes(value),
          },
        ]
      },
      {
        variableName: "fallbackLanguage",
        message: "Please specify the fallback language code when an user language cannot be determined (also used in development); " +
        "this should match one of the languages you had specified before, with region, eg. en-US",
        defaultValue: "en",
        validate: (value, config) => config.supportedLanguages.includes(value),
      },
      {
        variableName: "fallbackCountryCode",
        message: "Please set the two digit iso code for the fallback country",
        defaultValue: "FI",
        validate: (value) => !!countries[value],
      },
      {
        variableName: "fallbackCurrency",
        message: "Please set the three digit iso code for the fallback currency",
        defaultValue: "EUR",
        validate: (value) => !!currencies[value],
      },
      {
        variableName: "developmentHostname",
        message: "The development host name where you might intend to deploy",
        defaultValue: "dev." + packageJSON.name + ".com",
        validate: (v) => v.replace(/\s/g, "") === v,
      },
      {
        variableName: "productionHostname",
        message: "The production host name where you might intend to deploy",
        defaultValue: packageJSON.name + ".com",
        validate: (v) => v.replace(/\s/g, "") === v,
      },
      {
        variableName: "mailDomain",
        message: "This is the domain that the template generator uses as domain, so when the users receive an email they see user@mail.mysite.com " +
        "this has nothing to do with the configuration, it is simply what goes in the subject line when sending emails",
        defaultValue: packageJSON.name + ".com",
        validate: (v) => v.replace(/\s/g, "") === v,
        nullifyFalseValues: true,
      },
      {
        variableName: "mailStorage",
        message: "A path for an item definition in order to be used for storage of emails so that itemize acts as a mail client",
        defaultValue: "mail/mail",
        nullifyFalseValues: true,
      },
      {
        variableName: "defaultCluster",
        message: "The id for the default cluster when a cluster identification is not found, used to deal with data corruption cases, for development " +
        "you may want to use the UNIDENTIFIED value as that's the default cluster value",
        defaultValue: "UNIDENTIFIED",
      },
      {
        variableName: "clusterSubdomains",
        type: "strobject",
        message: "Now you need to specify the cluster subdomains as a comma separated list of values, each cluster has a name that is specified the name " +
        "of the default development cluster is \"UNIDENTIFIED\" which you may want to map to an empty subdomain to use locally, however in production " +
        "you want it to be equal to your cluster id",
        defaultValue: {
          "UNIDENTIFIED": "",
        },
      },
    ],
  );

  return newConfig;
}
