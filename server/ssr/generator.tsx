import { IAppDataType } from "..";
import React from "react";
import express from "express";
import { ISSRRule, ISSRRuleDynamic, ISSRRuleSetCb } from ".";
import { GUEST_METAROLE, PREFIX_GET, UNSPECIFIED_OWNER } from "../../constants";
import { getCookie } from "../mode";
import { ISSRContextType, ISSRCollectedQueryType } from "../../client/internal/providers/ssr-provider";
import { initializeItemizeApp } from "../../client";
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import { IGQLRequestFields } from "../../gql-querier";
import { ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import { filterAndPrepareGQLValue } from "../resolvers/basic";

const MEMOIZED_ANSWERS: {
  [memId: string]: {
    html: string,
    collectionSignature: string,
  }
} = {}
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
  const splittedCookies = cookies ? cookies.split(";").map((c) => c.trim()) : [];

  let resultRule: ISSRRuleDynamic;
  if (rule && language && config.supportedLanguages.includes(language)) {
    resultRule = typeof rule === "function" ? rule(req, language, appData.root) : rule;
  }

  // This is the default, what happens to routes that have nothing setup for them
  if (!rule || !language || !config.supportedLanguages.includes(language) || !resultRule) {
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

  let collectionSignature: string = null;
  const queries: ISSRCollectedQueryType[] = [];
  if (appliedRule.collect) {
    const collectionSignatureArray: string[] = []
    await Promise.all(
      appliedRule.collect.map(async (collectionPoint, index) => {
        const splittedModule = collectionPoint[0].split("/");
        const splittedIdef = collectionPoint[1].split("/");
        if (splittedModule[0] === "") {
          splittedModule.shift();
        }
        if (splittedIdef[0] === "") {
          splittedIdef.shift();
        }

        const mod = appData.root.getModuleFor(splittedModule);
        const idef = mod.getItemDefinitionFor(splittedIdef);

        const rowValue = await appData.cache.requestValue(idef, collectionPoint[2], collectionPoint[3]);

        if (rowValue === null) {
          collectionSignatureArray[index] = "null";
        } else {
          collectionSignatureArray[index] = rowValue.last_modified;
        }

        const fields: IGQLRequestFields = idef.buildFieldsForRoleAccess(
          ItemDefinitionIOActions.READ,
          appliedRule.forUser.role,
          appliedRule.forUser.id,
          rowValue ? rowValue.created_by : UNSPECIFIED_OWNER,
        );
        if (fields) {
          const value = rowValue === null ? null : filterAndPrepareGQLValue(rowValue, fields, appliedRule.forUser.role, idef);

          queries[index] = {
            idef: idef.getQualifiedPathName(),
            id: collectionPoint[2],
            version: collectionPoint[3],
            value: value ? value.toReturnToUser : null,
            fields: value ? value.requestFields : null,
          };
        } else {
          queries[index] = null;
        }
      })
    );
    collectionSignature = collectionSignatureArray.join(".");
  }

  if (
    appliedRule.memId &&
    MEMOIZED_ANSWERS[appliedRule.memId] &&
    MEMOIZED_ANSWERS[appliedRule.memId].collectionSignature === collectionSignature
  ) {
    res.end(MEMOIZED_ANSWERS[appliedRule.memId].html);
    return;
  }

  const finalOgTitle = typeof appliedRule.ogTitle === "string" ? appliedRule.ogTitle : appliedRule.ogTitle(queries, config);
  const finalOgDescription = typeof appliedRule.ogDescription === "string" ? appliedRule.ogDescription : appliedRule.ogDescription(queries, config);
  let finalOgImage = typeof appliedRule.ogImage === "string" ? appliedRule.ogImage : appliedRule.ogImage(queries, config);
  if (finalOgImage && finalOgImage.startsWith("/")) {
    finalOgImage = `${req.protocol}://${req.get("host")}` + appliedRule.ogImage;
  } else if (finalOgImage && !finalOgImage.includes("://")) {
    finalOgImage = `${req.protocol}://` + appliedRule.ogImage;
  }

  const finalTitle = typeof appliedRule.title === "string" ? appliedRule.title : appliedRule.title(queries, config);
  const finalDescription = typeof appliedRule.description === "string" ? appliedRule.description : appliedRule.description(queries, config);

  let newHTML = html;
  newHTML = newHTML.replace(/\$SSRLANG/g, appliedRule.language || "");
  newHTML = newHTML.replace(/\$SSRMANIFESTSRC/g, appliedRule.language ? `/rest/resources/manifest.${appliedRule.language}.json` : "");
  newHTML = newHTML.replace(/\$SSRDIR/g, appliedRule.rtl ? "rtl" : "ltr");
  newHTML = newHTML.replace(/\$SSRTITLE/g, finalTitle || "");
  newHTML = newHTML.replace(/\$SSRDESCR/g, finalDescription || "");
  newHTML = newHTML.replace(/\$SSROGTITLE/g, finalOgTitle || finalTitle || "");
  newHTML = newHTML.replace(/\$SSROGDESCR/g, finalOgDescription || finalDescription || "");
  newHTML = newHTML.replace(/\$SSROGIMG/g, finalOgImage || "");

  const langHrefLangTags = appliedRule.languages.map((language: string) => {
    return `<link rel="alternate" href="${req.protocol}://${req.get("host")}/${language}" hreflang="${language}">`
  }).join("");

  if (appliedRule.noData) {
    newHTML = newHTML.replace(/\$SSRAPP/g, "");
    newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
    newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags);
  } else {
    const ssr: ISSRContextType = {
      queries,
      user: appliedRule.forUser,
      title: finalTitle,
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
    
    newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, finalSSRHead);
  }

  if (appliedRule.memId) {
    MEMOIZED_ANSWERS[appliedRule.memId] = {
      html: newHTML,
      collectionSignature,
    };
  }
  res.end(newHTML);
}