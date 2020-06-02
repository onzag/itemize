import { IAppDataType } from "..";
import React from "react";
import express from "express";
import { ISSRRule, ISSRRuleDynamic, ISSRRuleSetCb } from ".";
import { GUEST_METAROLE } from "../../constants";
import { getCookie } from "../mode";
import { ISSRContextType } from "../../client/internal/providers/ssr-provider";
import { initializeItemizeApp } from "../../client";
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';

const MEMOIZED_ANSWERS: {[memId: string]: string} = {}
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

  const cookies = req.headers["cookie"];
  const splittedCookies = cookies.split(";").map((c) => c.trim());

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
      memId: "*",
    }
    // this is the root form without any language or any means, there's no SSR data to fill
  } else {
    const resultRule: ISSRRuleDynamic = typeof rule === "function" ? rule(req, language, appData.root) : rule;

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

    // language makes the memory specific for it
    if (appliedRule.memId) {
      appliedRule.memId += "." + appliedRule.language;
    }
    // we don't want to memoize specific user answers
    // they should be using the service worker at that point
    if (appliedRule.forUser.id) {
      appliedRule.memId = null;
    }
  }

  if (MEMOIZED_ANSWERS[appliedRule.memId]) {
    res.end(MEMOIZED_ANSWERS[appliedRule.memId]);
    return;
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
    const ssr: ISSRContextType = {
      queries: {},
      user: appliedRule.forUser,
      title: appliedRule.title,
    };

    newHTML = newHTML.replace(/\"\$SSR\"/g, JSON.stringify(ssr));
    const serverAppData = await initializeItemizeApp(
      appData.ssrConfig.rendererContext,
      appData.ssrConfig.mainComponent,
      {
        appWrapper: appData.ssrConfig.appWrapper,
        mainWrapper: appData.ssrConfig.mainWrapper,
        serverMode: {
          collector: appData.ssrConfig.collector,
          config: appData.config,
          ssrContext: ssr,
          pathname: req.path,
          clientDetails: {
            lang: getCookie(splittedCookies, "lang"),
            currency: getCookie(splittedCookies, "currency"),
            country: getCookie(splittedCookies, "country"),
            guessedData: getCookie(splittedCookies, "guessedData"),
          },
          langLocales: appData.langLocales,
          root: appData.root,
          req: req,
          ipStack: appData.ipStack,
        }
      }
    );

    const app = (
      <StaticRouter location={req.url}>
        {serverAppData.node}
      </StaticRouter>
    );
    newHTML = newHTML.replace(/\$SSRAPP/g, ReactDOMServer.renderToStaticMarkup(app));

    let finalSSRHead: string = langHrefLangTags;
    if (serverAppData.id) {
      finalSSRHead += appData.ssrConfig.collector.retrieve(serverAppData.id);
    }
    
    // TODO extract css
    newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, finalSSRHead);
  }

  if (appliedRule.memId) {
    MEMOIZED_ANSWERS[appliedRule.memId] = newHTML;
  }
  res.end(newHTML);
}