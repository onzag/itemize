import { IAppDataType } from "..";
import express from "express";
import { ISSRRule, ISSRRuleDynamic, ISSRRuleSetCb } from ".";
import { GUEST_METAROLE } from "../../constants";
import { getCookie } from "../mode";
import { ISSRContextType } from "../../client/internal/providers/ssr-provider";

export async function ssrGenerator(
  req: express.Request,
  res: express.Response,
  html: string,
  appData: IAppDataType,
  rule: ISSRRuleDynamic | ISSRRuleSetCb,
): Promise<void> {
  res.setHeader("content-type", "text/html; charset=utf-8");
  const config = appData.config;
  const language = req.path.split("/")[1];
  let appliedRule: ISSRRule;
  if (!rule || !language || !config.supportedLanguages.includes(language)) {
    appliedRule = {
      title: config.appName,
      description: config.appName,
      ogTitle: config.appName,
      ogDescription: config.appName,
      ogImage: "/rest/resource/icons/android-chrome-512x512.png",
      collect: null,
      noData: true,
      language: null,
      rtl: false,
      languages: config.supportedLanguages,
      forUser: null,
    }
    // this is the root form without any language or any means, there's no SSR data to fill
  } else {
    const resultRule: ISSRRuleDynamic = typeof rule === "function" ? rule(req, language, appData.root) : rule;
    const cookies = req.headers["cookie"];
    const splittedCookies = cookies.split(";").map((c) => c.trim());

    let userAfterValidate: {
      id: number,
      role: string,
      token: string,
    } = {
      id: null,
      role: GUEST_METAROLE,
      token: null,
    };

    const currentToken = getCookie(splittedCookies, "token");
    if (currentToken) {
      try {
        const tokenData = await appData.customUserTokenQuery(null, {
          token: currentToken,
        })
        userAfterValidate.id = tokenData.id;
        userAfterValidate.token = tokenData.token;
        userAfterValidate.role = tokenData.role;
      } catch (err) {
  
      }
    }

    appliedRule = {
      ...resultRule,
      noData: false,
      language,
      rtl: config.rtlLanguages.includes(language),
      languages: config.supportedLanguages,
      forUser: userAfterValidate,
    }
  }

  if (appliedRule.ogImage.startsWith("/")) {
    appliedRule.ogImage = `${req.protocol}://${req.get("host")}` + appliedRule.ogImage;
  } else if (!appliedRule.ogImage.includes("://")) {
    appliedRule.ogImage = `${req.protocol}://` + appliedRule.ogImage;
  }

  let newHTML = html;
  newHTML = newHTML.replace(/\$SSRLANG/g, appliedRule.language || "");
  newHTML = newHTML.replace(/\$SSRMANIFESTSRC/g, appliedRule.language ? `/rest/resources/manifest.${appliedRule.language}.json` : "");
  newHTML = newHTML.replace(/\$SSRDIR/g, appliedRule.rtl ? "rtl" : "ltr");
  newHTML = newHTML.replace(/\$SSRTITLE/g, appliedRule.title);
  newHTML = newHTML.replace(/\$SSRDESCR/g, appliedRule.description);
  newHTML = newHTML.replace(/\$SSROGTITLE/g, appliedRule.ogTitle);
  newHTML = newHTML.replace(/\$SSROGDESCR/g, appliedRule.ogDescription);
  newHTML = newHTML.replace(/\$SSROGIMG/g, appliedRule.ogImage);

  const langHrefLangTags = appliedRule.languages.map((language: string) => {
    return `<link rel="alternate" href="${req.protocol}://${req.get("host")}/${language}" hreflang="${language}">`
  }).join("");

  if (appliedRule.noData) {
    newHTML = newHTML.replace(/\$SSRAPP/g, "");
    newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
    newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags);
  } else {
    // TODO collect
    const finalData: ISSRContextType = null;
  }

  res.end(newHTML);
}