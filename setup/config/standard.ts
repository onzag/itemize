import { IConfigRawJSONDataType } from "../../config";
import { request } from "../read";
import { countries, currencies } from "../../imported-resources";
import colors from "colors";

export async function standardConfigSetup(currentConfig: IConfigRawJSONDataType): Promise<IConfigRawJSONDataType> {
  const newConfig = {
    ...currentConfig,
  }

  console.log("\nPlease choose your entry folder, the entry folder contains the data for your itemize app");
  newConfig.entry = (await request({
    prompt: colors.green("entry: "),
    default: newConfig.entry || "data",
    edit: !!newConfig.entry,
  })).result;

  console.log("\nPlease choose your app name, your app name is the unique identifier that is used for fallback title and manifests");
  newConfig.appName = (await request({
    prompt: colors.green("appName: "),
    default: newConfig.appName || "itemize",
    edit: !!newConfig.appName,
  })).result;

  do {
    console.log("\nPlease enter the port number that the app will be used to be served and exposed");
    newConfig.port = parseInt((await request({
      prompt: colors.green("port: "),
      default: (newConfig.port || "8000").toString(),
      edit: !!newConfig.port,
    })).result);
  } while (isNaN(newConfig.port));

  console.log("\nPlease choose the languages you are supporting as a list of comma separated values eg. en, es");
  console.log("use language ISO codes, and regions are allowed, eg. en-US, de-DE, etc...");
  newConfig.supportedLanguages = (await request({
    prompt: colors.green("supportedLanguages: "),
    default: (newConfig.supportedLanguages || ["en"]).join(", "),
    edit: !!newConfig.supportedLanguages,
  })).result.split(",").map((l) => l.trim()).filter((l) => !!l);

  console.log("\nOf the languages you had input, is any of those languages a right to left language, such as arabic");
  console.log("Please insert the same way as before a list a comma separated values, keep the same codes as before");
  newConfig.rtlLanguages = (await request({
    prompt: colors.green("rtlLanguages: "),
    default: (newConfig.rtlLanguages || []).join(", "),
    edit: !!newConfig.rtlLanguages,
  })).result.split(",").map((l) => l.trim()).filter((l) => !!l);

  console.log("\nNow you need to specify the dictionaries, the dictionaries use simple ISO codes without regions");
  console.log("these are used for full text search, and you should have all languages you aim to support FTS");
  console.log("do not use the region codes for these, only the language itself is relevant");
  console.log("first insert the list of comma separated values languages for these dictionaries");
  newConfig.dictionaries = {
    ...newConfig.dictionaries,
  };
  const dictionaries = (await request({
    prompt: colors.green("dictionaries[$keys] "),
    default: (Object.keys(newConfig.dictionaries) || []).join(", "),
    edit: true,
  })).result.split(",").map((l) => l.trim()).filter((l) => !!l);
  for (const dictionary of dictionaries) {
    newConfig.dictionaries[dictionary] = (await request({
      prompt: "dictionaries[" + JSON.stringify(dictionary) + "]: ",
      default: newConfig.dictionaries[dictionary] || "",
    })).result;
  }

  console.log("\nNow you should specify the user roles that your app supports, make these uppercase, no spaces")
  console.log("examples are ADMIN, MODERATOR, USER");
  newConfig.roles = (await request({
    prompt: colors.green("roles: "),
    default: (newConfig.roles || ["ADMIN", "USER"]).join(", "),
    edit: true,
  })).result.split(",").map((l) => l.trim().toUpperCase().replace(/\s/g, "")).filter((l) => !!l);

  newConfig.manifest = {
    ...newConfig.manifest,
  };

  console.log("\nNow we need to fill in the manifest data");
  console.log("Please specify a proper css style hex value for the background color eg. #00FFAA");
  newConfig.manifest.backgroundColor = (await request({
    prompt: colors.green("manifest.backgroundColor: "),
    default: newConfig.manifest.backgroundColor || "#FFFFFF",
    edit: !!newConfig.manifest.backgroundColor,
  })).result;

  console.log("\nPlease specify a proper css style hex value for the theme color eg. #00FFAA");
  newConfig.manifest.themeColor = (await request({
    prompt: colors.green("manifest.themeColor: "),
    default: newConfig.manifest.themeColor || "#000000",
    edit: !!newConfig.manifest.themeColor,
  })).result;

  console.log("\nPlease specify a proper css style hex value for the safari mask icon theme color eg. #00FFAA");
  newConfig.manifest.macSafariMaskIconThemeColor = (await request({
    prompt: colors.green("manifest.macSafariMaskIconThemeColor: "),
    default: newConfig.manifest.macSafariMaskIconThemeColor || "#000000",
    edit: !!newConfig.manifest.macSafariMaskIconThemeColor,
  })).result;

  console.log("\nPlease specify a proper css style hex value for the metro icon in edge eg. #00FFAA");
  newConfig.manifest.msTileColor = (await request({
    prompt: colors.green("manifest.msTileColor: "),
    default: newConfig.manifest.msTileColor || "#0000CC",
    edit: !!newConfig.manifest.msTileColor,
  })).result;

  console.log("\nPlease specify the fallback language code when an user language cannot be determined (also used in development)");
  console.log("this should match one of the languages you had specified before, with region, eg. en-US");
  newConfig.fallbackLanguage = (await request({
    prompt: colors.green("fallbackLanguage: "),
    default: newConfig.fallbackLanguage || newConfig.supportedLanguages[0] || "en",
    edit: !!newConfig.fallbackLanguage,
  })).result;

  do {
    console.log("\nPlease specify the fallback country as well, same logic (also used in development)");
    console.log("check the two digit ISO code for the country, eg FI");
    newConfig.fallbackCountryCode = (await request({
      prompt: colors.green("fallbackCountryCode: "),
      default: newConfig.fallbackCountryCode || "FI",
      edit: !!newConfig.fallbackCountryCode,
    })).result;
  } while (!countries[newConfig.fallbackCountryCode]);

  do {
    console.log("\nPlease specify the fallback currency code as well, same logic (also used in development)");
    console.log("check the three digit ISO code for the currency, eg EUR");
    newConfig.fallbackCurrency = (await request({
      prompt: colors.green("fallbackCurrency: "),
      default: newConfig.fallbackCurrency || "EUR",
      edit: !!newConfig.fallbackCurrency,
    })).result;
  } while (!currencies[newConfig.fallbackCurrency]);

  console.log(colors.green(JSON.stringify(newConfig, null, 2)));

  return newConfig;
}