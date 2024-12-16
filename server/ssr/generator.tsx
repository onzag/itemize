/**
 * This file contains the all mighty SSR generator
 * that does a lot of the heavy lifting
 * @module
 */

import { IAppDataType } from "..";
import { logger } from "../logger";
import React from "react";
import express from "express";
import { ISSRRule, ISSRServerModeInfo } from ".";
import { GUEST_METAROLE, CURRENCY_FACTORS_IDENTIFIER } from "../../constants";
import { getCookie } from "../mode";
import { ISSRContextType } from "../../client/internal/providers/ssr-provider";
import { initializeItemizeApp } from "../../client";
import { StaticRouter } from "react-router-dom";
import Root from "../../base/Root";
import Moment from "moment";
import { Collector } from "./collect";
import { capitalize, escapeHtml } from "../../util";
import { DOMWindow } from "@onzag/itemize-text-engine/serializer/dom";
import { jwtDecode } from "../token";
import { IServerSideTokenDataType } from "../resolvers/basic";
import { convertHTMLToUSSDTree, IUSSDChunk } from "../../ussd";
import { walkReactTree } from "./react-analyze";
import ReactDOMServer from "react-dom/server";
import { LOUD_SSR_ERRORS, NODE_ENV, NO_SSR, TRUST_ALL_INBOUND_CONNECTIONS } from "../environment";
import uuidv5 from "uuid/v5";

const ETAG_UUID_NAMESPACE = "4870ebbf-2ecf-40df-9f8b-10729e66f30c";

// This is a custom react dom build
const developmentISSSRMode = NODE_ENV !== "production";
const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";

interface ISSRGeneratorHTMLResponse {
  mode: "html";
  req: express.Request;
  res: express.Response;
  html: string;
}

interface ISSRGeneratorUSSDResponse {
  mode: "ussd";
  token: string;
  url: string;

  clientLanguage: string;
  clientCurrency: string;
  clientCountry: string;
}

export async function ssrGenerator(
  appData: IAppDataType,
  mode: "development" | "production",
  info: ISSRGeneratorHTMLResponse | ISSRGeneratorUSSDResponse
): Promise<void | IUSSDChunk> {
  // do a security check first
  if (info.mode === "html") {
    const hostname = info.req.headers["host"];
    if (
      !TRUST_ALL_INBOUND_CONNECTIONS &&
      hostname !== "localhost" &&
      hostname.indexOf("localhost") !== 0 &&
      hostname !== appData.config.developmentHostname &&
      hostname !== appData.config.productionHostname
    ) {
      info.res.setHeader("content-type", "text/html");
      info.res.status(403)
        .end(`<!DOCTYPE html><html><body><a href="https://${appData.config.productionHostname}">` +
          `Please visit the real website at ${appData.config.productionHostname}</a></body></html>`);
      return;
    }
  }

  // USSD mode, loads the application for usage in the USSD method
  const isUSSD = info.mode === "ussd";
  const ussdToken = isUSSD ? info.token : null;
  const submode = info.mode;

  if (isUSSD && !appData.ssrConfig.ussdConfig) {
    throw new Error("This server does not support USSD style responses");
  }

  const ifNoneMatch = info.mode === "html" ? info.req.headers["if-none-match"] : null;

  // now we need to see if we are going to use SSR, due to the fact the NODE_ENV must
  // match between the client and the server in order to produce valid SSR, we check the mode
  // that the client recieved, eg. the client is using development or production builds and we activate
  // only if it matches our NODE_ENV, this means that in development mode, with development builds there is SSR
  // but not with production builds, and vice-versa
  const SSRIsDisabledBecauseOfMismatchOfSignature =
    (mode === "development" && !developmentISSSRMode) ||
    (mode === "production" && developmentISSSRMode);
  const SSRIsDisabledInThisMode =
    isUSSD ? false : NO_SSR || SSRIsDisabledBecauseOfMismatchOfSignature

  // now we get the config, and the language, from the original path, rememebr this generator runs
  // on an express router
  const config = appData.config;
  let language = info.mode === "html" ?
    info.req.originalUrl.split("/")[1] :
    info.url.split("/")[1];

  if (language.includes("?")) {
    language = language.split("?")[0];
  }

  if (language.includes("#")) {
    language = language.split("#")[0];
  }

  // and we need to figure out the SSR rule for this path, for that we got to calculate it
  let appliedRule: ISSRRule;

  // we need the cookies in order to extract our client data
  const cookies = info.mode === "html" ? info.req.headers["cookie"] : null;
  const splittedCookies = cookies ? cookies.split(";").map((c) => c.trim()) : [];

  // now we need to wonder whether we will use the SSR itself
  const willUseSSR = (
    // language specified and property supported and SSR is not disabled
    (language && config.supportedLanguages.includes(language) && !SSRIsDisabledInThisMode) ||

    // No language specified, let's force a redirect when noredirect is not given
    // this will cause the server not to give a redirect to the proper language
    // as in a 302 status to the appropiate language but noredirect is used
    // by the service worker to fetch a no-ssr file that is totally clean
    (!language && (info.mode === "html" ? !info.req.query.noredirect : true))
  );

  // SSR must be enabled when
  if (!willUseSSR && isUSSD) {
    throw new Error("The language is unsupported or not provided, you should specify a language by the URL");
  }

  // prepare to build etag
  // these etags are different per url on purpose
  let rawEtagSrc: string;
  let quotedEtag: string;

  // for the nossr mode the last modified is when the app was built
  let lastModified = new Date(parseInt(appData.buildnumber));

  // This is when we don't use SSR
  if (!willUseSSR) {
    // this is the default, this is what we build from the applied rule, what everything
    // gets when there's no SSR enabled, language doesn't matter, only mode, as if, because
    // modes don't mix, so it can be memoized as the standard response, because there's no data
    // it doesn't hydrate in the client side, it renders from scratch; this is the settings that
    // the service worker in the client utilize in order to build the app from scratch, for most users
    // they'll never hit SSR they'll recieve only this fast memoized option meant for the same buildnumber
    // and they'll get it mainly from the service worker, they won't even bother with the server
    const languageToUse = language && config.supportedLanguages.includes(language) ? language : null;
    appliedRule = {
      noSSR: true,
      language: languageToUse,
      rtl: languageToUse && config.rtlLanguages.includes(languageToUse),
      languages: config.supportedLanguages,
      forUser: null,
      mode,
    }

    // standard etag with an asterisk which means this is the general version
    // NO SSR is used when this etag comes
    rawEtagSrc = "*." + appData.buildnumber + "." + mode + "." + submode;
    // this is the root form without any language or any means, there's no SSR data to fill

    // etag quoted
    quotedEtag = JSON.stringify(uuidv5(rawEtagSrc, ETAG_UUID_NAMESPACE));

    if (
      info.mode === "html" &&
      ifNoneMatch &&
      // this actually even would check the buildnumber
      ifNoneMatch === quotedEtag
    ) {
      info.res.setHeader("Last-Modified", Moment(lastModified).utc().locale("en").format(DATE_RFC2822));
      info.res.setHeader("Date", Moment().utc().locale("en").format(DATE_RFC2822));
      info.res.setHeader("ETag", quotedEtag);
      if (mode === "development") {
        info.res.setHeader("X-ETag-Raw", rawEtagSrc);
      }
      info.res.setHeader("Cache-Control", "public, max-age=0");
      if (language && config.supportedLanguages.includes(language)) {
        info.res.setHeader("Content-Language", language);
      }
      info.res.status(304).end();
      return;
    }

  } else {

    // So in this case we have an SSR rule, which is good for SEO, we need to extract our
    // user from the token we get
    let userAfterValidate: {
      id: string,
      role: string,
      token: string,
      customData: any,
    } = {
      id: null,
      role: GUEST_METAROLE,
      token: null,
      customData: null,
    };

    // and we get such from the cookie itself
    const currentToken = ussdToken || getCookie(splittedCookies, "token");
    // if we have it we need to extract its data, we are going to use, we are actually
    // kind of cheating this rq call, first is the request fields info and second are the
    // args, we only concerned about the args so we pass the token, in the client the TokenProvider
    // would do this call but we do this right here, right now in the server so the token provider
    // mounts immediately and something can be rendered
    if (currentToken) {
      try {
        const tokenData = await appData.userTokenQuery({
          token: currentToken,
        });
        userAfterValidate.id = tokenData.id;
        userAfterValidate.token = tokenData.token;
        userAfterValidate.role = tokenData.role;

        // need to extract the custom data out of the token itself
        // since the TOKEN_OBJECT does not return it but our triggers
        // do expect custom data
        const tokenDataWhole = jwtDecode<IServerSideTokenDataType>(tokenData.token);
        userAfterValidate.customData = tokenDataWhole.customData;
      } catch (err) {

      }
    }

    // so now we can add these fileds, the user, the languages, the rtl
    // honestly most users won't even hit this, as they will use the non SSR response
    // which contains no such things and resolve from the service worker and rebuild the app
    // from scratch, however robots will end up triggering this (as well as bad browsers)
    // and incognito mode possibly; and first users, even when they'll most likely be guests
    appliedRule = {
      noSSR: false,
      language,
      rtl: config.rtlLanguages.includes(language),
      languages: config.supportedLanguages,
      forUser: userAfterValidate,
      mode,
    }

    // creating etag for this url
    rawEtagSrc = appData.buildnumber + "." + mode + "." + submode;
  }

  // now we need a root instance, because this will be used
  // like an UI thread we need a clean instance from the pool
  let root: Root = null;
  try {
    root = await appData.rootPool.acquire().promise;
  } catch (err) {
    logger.error(
      {
        functionName: "ssrGenerator",
        message: "Could not adquire a root from the pool",
        serious: true,
        err,
      }
    )

    appliedRule.noSSR = true;

    if (info.mode !== "html") {
      throw new Error("Could not adquire a root from the pool");
    }
  }

  const i18nData = (root || appData.root).getI18nDataFor(language);
  const i18nAppName = i18nData && i18nData.app_name && capitalize(i18nData.app_name);
  const i18nAppDescription = i18nData && i18nData.app_description && capitalize(i18nData.app_description);

  const usedDir = appliedRule.rtl ? "rtl" : "ltr";

  // and we start replacing from the HTML itself, note how these things might have returned null for some
  let newHTML: string = null;
  let finalReturnTree: IUSSDChunk = null;
  let langHrefLangTags: string = null;

  // only need to go over these expenses if the result is HTML
  if (!isUSSD) {
    newHTML = info.html;
    newHTML = newHTML.replace(/\$SSRLANG/g, appliedRule.language || "");
    newHTML = newHTML.replace(/\$SSRMANIFESTSRC/g, appliedRule.language ? `/rest/resource/manifest.${appliedRule.language}.json` : "");
    newHTML = newHTML.replace(/\$SSRDIR/g, usedDir);

    // and now the href lang tags
    if (appliedRule.language) {
      langHrefLangTags = appliedRule.languages.map((language: string) => {
        return `<link rel="alternate" href="https://${info.req.get("host")}${info.req.originalUrl.replace(appliedRule.language, language)}" hreflang="${language}">`
      }).join("");
    }
  }

  // this flags marks whether we can use etags
  // due to an error
  let errorOccured = !root ? true : false;
  let shouldBe403 = false;
  let forbiddenSignature: string = null;

  // if there's no data let's not give SSR at all
  // since we cannot really keep it consistent
  if (appliedRule.noSSR) {
    // and we go here
    // it doesn't go here if it's ussd anyway because
    // it will throw an error
    const usedTitle = i18nAppName || config.appName || "";
    const usedDescription = i18nAppDescription || i18nAppName || config.appName || "";
    const usedOgTitle = usedTitle;
    const usedOgDescription = usedDescription;
    const usedOgImage = "/rest/resource/icons/android-chrome-512x512.png";
    newHTML = newHTML.replace(/\$SSRTITLE/g, usedTitle);
    newHTML = newHTML.replace(/\$SSRDESCR/g, usedDescription);
    newHTML = newHTML.replace(/\$SSROGTITLE/g, usedOgTitle);
    newHTML = newHTML.replace(/\$SSROGDESCR/g, usedOgDescription);
    newHTML = newHTML.replace(/\$SSROGIMG/g, usedOgImage);
    newHTML = newHTML.replace(/\$SSRROBOTS/g, "all");
    newHTML = newHTML.replace(/\$SSRAPP/g, "");
    newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
    newHTML = newHTML.replace(/\"\$CONFIG\"/g, JSON.stringify(config));
    newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags || "");
  } else {
    // otherwise with the SSR
    const ssr: ISSRContextType = {
      queries: [],
      resources: {},
      searches: [],
      user: appliedRule.forUser,
      title: "__SSR_TITLE__",
      currencyFactors: appData.cache.getServerData()[CURRENCY_FACTORS_IDENTIFIER],
    };

    // we need to rid of the token for the client
    let clientSSR: ISSRContextType = { ...ssr };
    if (!isUSSD && clientSSR.user && clientSSR.user.token) {
      // make a copy it is slightly different
      clientSSR = {
        ...ssr,
      };
      // security to avoid sending the token in
      // the response which might be cached by the client
      // the client handles this by reading from the cookie
      clientSSR.user = {
        ...clientSSR.user,
        token: "IN_COOKIE",
      };
    }

    // and now we need the server app data
    let prepassAppData: {
      node: React.ReactNode,
      id: string;
    } = null;
    let serverAppData: {
      node: React.ReactNode,
      id: string;
    } = null;

    // setting the collector
    const collector = new Collector(appData, appliedRule);

    // setting the request manager to handle incoming request
    // in order to build or signature
    root.setRequestManager(collector.collect, collector.needsCollect);
    root.setRequestManagerSearch(collector.collectSearch, collector.needsCollectSearch);
    root.setRequestManagerResource(collector.collectResource, collector.needsCollectResource, collector.getCollectedResource);

    try {
      let redirectedTo: string = null;
      const redirectTo = (n: string) => {
        redirectedTo = n;

        if (info.mode === "html") {
          info.res.redirect(n);
        }
      }

      const XFF = info.mode === "html" ? (info.req.headers["X-Forwarded-For"] || info.req.headers["x-forwarded-for"]) : null;
      let ip = info.mode === "html" ? info.req.connection.remoteAddress : null;
      if (typeof XFF === "string") {
        ip = XFF.split(",")[0].trim();
      } else if (Array.isArray(XFF)) {
        ip = XFF[0];
      }

      const serverModeOptions: ISSRServerModeInfo = {
        collector: appData.ssrConfig.collector,
        config: appData.config,
        ssrContext: ssr,
        clientDetails: {
          lang: isUSSD ? info.clientLanguage : getCookie(splittedCookies, "lang"),
          currency: isUSSD ? info.clientCurrency : getCookie(splittedCookies, "currency"),
          country: isUSSD ? info.clientCountry : getCookie(splittedCookies, "country"),
          guessedData: isUSSD ? null : getCookie(splittedCookies, "guessedData"),
        },
        langLocales: appData.langLocales,
        root: root,
        originalUrl: info.mode === "html" ? info.req.originalUrl : info.url,
        redirectTo: redirectTo,
        ip,
        userLocalizationService: appData.userLocalizationService,
        appliedRule,
      };
      const options = {
        appWrapper: isUSSD ? appData.ssrConfig.ussdConfig.appWrapper : appData.ssrConfig.appWrapper,
        mainWrapper: isUSSD ? appData.ssrConfig.ussdConfig.mainWrapper : appData.ssrConfig.mainWrapper,
        serverMode: serverModeOptions,
      };

      // for that we try to initialize, which can indeed, fail
      // mainly because calls to the localizations service and whatnot which must
      // be consistent
      serverAppData = await initializeItemizeApp(
        isUSSD ? appData.ssrConfig.ussdConfig.rendererContext : appData.ssrConfig.rendererContext,
        isUSSD ? appData.ssrConfig.ussdConfig.mainComponent : appData.ssrConfig.mainComponent,
        options,
      );

      // if there's no data then it means it was redirected
      if (!serverAppData) {
        // when there's no app data in server mode it means
        // that the answer was handled as a redirect, so we must exit and avoid
        // further processing
        root.cleanState();
        appData.rootPool.release(root);

        if (isUSSD && redirectedTo) {
          return ssrGenerator(
            appData,
            mode,
            {
              ...info,
              url: redirectedTo,
            }
          );
        }
        return;
      }

      // the collector may not work during the prepass and lead to unexpected outcomes
      // these collectors are meant for the react dom specific process and may interfere
      // each other during a second pass
      const prePassServerModeOptions = {
        ...serverModeOptions,
        collector: null as any,
      };

      const prepassOptions = {
        ...options,
        serverMode: prePassServerModeOptions,
      };

      prepassAppData = await initializeItemizeApp(
        isUSSD ? appData.ssrConfig.ussdConfig.rendererContext : appData.ssrConfig.rendererContext,
        isUSSD ? appData.ssrConfig.ussdConfig.mainComponent : appData.ssrConfig.mainComponent,
        prepassOptions,
      );

      // now we build the app, but we need to put the static router on top
      // as in server mode no router is used so we need this static router to match
      // with SSR
      const prepassApp = (
        <StaticRouter location={isUSSD ? info.url : info.req.originalUrl}>
          {prepassAppData.node}
        </StaticRouter>
      );

      // will walk the react tree and emulate a render on such tree
      await walkReactTree(prepassApp);

      // update the last modified and the etag signature
      lastModified = collector.getLastModified();
      rawEtagSrc += "_" + collector.getSignature();
      quotedEtag = JSON.stringify(uuidv5(rawEtagSrc, ETAG_UUID_NAMESPACE));
      shouldBe403 = collector.hasForbiddenResources();
      if (shouldBe403) {
        forbiddenSignature = collector.getForbiddenSignature();
      }

      // now here we just happen to be able to short circuit again if the client
      // says that the request can be cached as well
      if (
        !isUSSD &&
        ifNoneMatch &&
        // this actually even would check the buildnumber
        ifNoneMatch === quotedEtag
      ) {
        info.res.setHeader("Last-Modified", Moment(lastModified).utc().locale("en").format(DATE_RFC2822));
        info.res.setHeader("Date", Moment().utc().locale("en").format(DATE_RFC2822));
        info.res.setHeader("ETag", quotedEtag);
        if (mode === "development") {
          info.res.setHeader("X-ETag-Raw", rawEtagSrc);
        }
        if (appliedRule.forUser && appliedRule.forUser.id) {
          info.res.setHeader("Cache-Control", "private");
        } else {
          info.res.setHeader("Cache-Control", "public, max-age=0");
        }
        if (appliedRule.language) {
          info.res.setHeader("Content-Language", appliedRule.language);
        }
        info.res.status(304).end();

        // Release root
        root.cleanState();
        appData.rootPool.release(root);

        return;
      }

      const finalTitle = root.getStateKey("title");
      const usedTitle = finalTitle || i18nAppName || config.appName || "";

      ssr.title = usedTitle;
      ssr.queries = collector.getQueries();
      ssr.resources = collector.getResources();
      ssr.searches = collector.getSearches();

      clientSSR.title = ssr.title;
      clientSSR.queries = ssr.queries;
      clientSSR.searches = ssr.searches;
      clientSSR.resources = ssr.resources;

      const app = (
        <StaticRouter location={isUSSD ? info.url : info.req.originalUrl}>
          {serverAppData.node}
        </StaticRouter>
      );
      const staticMarkup = ReactDOMServer.renderToStaticMarkup(app);

      if (isUSSD) {
        const cheapdiv = DOMWindow.document.createElement("div");
        cheapdiv.innerHTML = staticMarkup;

        finalReturnTree = convertHTMLToUSSDTree(cheapdiv, root, appliedRule.language);
      } else {
        // now we calculate the og fields that are final, given they can be functions
        // if it's a string, use it as it is, otherwise call the function to get the actual value, they might use values from the queries
        const finalOgTitle: string = root.getStateKey("ogTitle");

        // the description as well, same thing
        const finalOgDescription: string = root.getStateKey("ogDescription");

        // same for the image but this is special
        let finalOgImage: string = root.getStateKey("ogImage");
        // because if it's a url and og image tags require absolute paths with entire urls
        // we check if it's an absolute path with no host
        if (finalOgImage && finalOgImage.startsWith("/")) {
          // and add the host
          finalOgImage = `https://${info.req.get("host")}` + finalOgImage;
        } else if (finalOgImage && !finalOgImage.includes("://")) {
          // otherwise we just add the protocol if it was not added
          finalOgImage = `https://` + finalOgImage;
        }

        // now we calculate the same way title and description
        const finalDescription = root.getStateKey("description");
        const finalRobots = root.getStateKey("robots");

        const usedDescription = finalDescription || i18nAppDescription || i18nAppName || config.appName || "";
        const usedOgTitle = finalOgTitle || usedTitle;
        const usedOgDescription = finalOgDescription || usedDescription;
        const usedOgImage = finalOgImage || "/rest/resource/icons/android-chrome-512x512.png";
        const usedRobots = finalRobots || "all";

        // now we need to make the title match
        newHTML = newHTML.replace(/\$SSRAPP/g, staticMarkup);

        // replace with this information
        newHTML = newHTML.replace(/\$SSRTITLE/g, usedTitle);
        newHTML = newHTML.replace(/\$SSRDESCR/g, usedDescription);
        newHTML = newHTML.replace(/\$SSROGTITLE/g, usedOgTitle);
        newHTML = newHTML.replace(/\$SSROGDESCR/g, usedOgDescription);
        newHTML = newHTML.replace(/\$SSROGIMG/g, usedOgImage);
        newHTML = newHTML.replace(/\$SSRROBOTS/g, usedRobots);

        // we replace the HTML with the SSR information that we are using
        newHTML = newHTML.replace(/\"\$SSR\"/g, JSON.stringify(clientSSR));
        newHTML = newHTML.replace(/\"\$CONFIG\"/g, JSON.stringify(config));

        // but we need the SSR head which includes our hreflang tags
        let finalSSRHead: string = langHrefLangTags || "";
        if (serverAppData.id) {
          // and also our collected data
          finalSSRHead += appData.ssrConfig.collector.retrieve(serverAppData.id, staticMarkup);
        }

        // we add that
        newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, finalSSRHead);
      }

    } catch (err) {
      // if it fails then we can't do SSR and we just provide without SSR
      logger.error(
        {
          functionName: "ssrGenerator",
          message: "Failed to run SSR due to failed initialization",
          serious: true,
          err,
          data: {
            appliedRule,
          },
        }
      );

      if (isUSSD) {
        root.cleanState();
        appData.rootPool.release(root);
        throw err;
      }

      if (LOUD_SSR_ERRORS) {
        newHTML = "<!DOCTYPE html><html><body><p>" +
          escapeHtml((err.message || "").toString()) + "</p><p>" +
          escapeHtml((err.stack || "").toString()) + "</p></body></html>";
      } else {
        const usedTitle = i18nAppName || config.appName || "";
        const usedDescription = i18nAppDescription || i18nAppName || config.appName || "";
        const usedOgTitle = usedTitle;
        const usedOgDescription = usedDescription;
        const usedOgImage = "/rest/resource/icons/android-chrome-512x512.png";
        newHTML = newHTML.replace(/\$SSRTITLE/g, usedTitle);
        newHTML = newHTML.replace(/\$SSRDESCR/g, usedDescription);
        newHTML = newHTML.replace(/\$SSROGTITLE/g, usedOgTitle);
        newHTML = newHTML.replace(/\$SSROGDESCR/g, usedOgDescription);
        newHTML = newHTML.replace(/\$SSROGIMG/g, usedOgImage);
        newHTML = newHTML.replace(/\$SSRAPP/g, "");
        newHTML = newHTML.replace(/\$SSRROBOTS/g, "all");
        newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
        newHTML = newHTML.replace(/\"\$CONFIG\"/g, JSON.stringify(config));
        newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags || "");
      }

      // cannot set etag or cache headers because the rendering failed
      // this is why we end abruptly here
      errorOccured = true;
    }
  }

  // and finally answer the client
  if (!isUSSD) {
    info.res.setHeader("content-type", "text/html; charset=utf-8");
  }
  if (!errorOccured && !isUSSD) {
    info.res.setHeader("Last-Modified", Moment(lastModified).utc().locale("en").format(DATE_RFC2822));
    info.res.setHeader("Date", Moment().utc().locale("en").format(DATE_RFC2822));
    info.res.setHeader("ETag", quotedEtag);
    if (mode === "development") {
      info.res.setHeader("X-ETag-Raw", rawEtagSrc);
    }
    // for individual users the cache control is then
    // set to private
    if (appliedRule.forUser && appliedRule.forUser.id) {
      info.res.setHeader("Cache-Control", "private");
    } else {
      info.res.setHeader("Cache-Control", "public, max-age=0");
    }

    if (!appliedRule.noSSR) {
      info.res.setHeader("x-ssr", "true");
    }

    if (appliedRule.language) {
      info.res.setHeader("Content-Language", appliedRule.language);
    }

    if (shouldBe403) {
      if (forbiddenSignature) {
        info.res.setHeader("x-forbidden-signature", forbiddenSignature);
      }
      info.res.status(403);
    }
  }

  if (!isUSSD) {
    info.res.end(newHTML);
  }

  // clean and release, it's done!!!
  if (root) {
    root.cleanState();
    appData.rootPool.release(root);
  }

  if (isUSSD) {
    return finalReturnTree;
  }
}