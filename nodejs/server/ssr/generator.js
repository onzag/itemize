"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssrGenerator = void 0;
const __1 = require("..");
const react_1 = __importDefault(require("react"));
const constants_1 = require("../../constants");
const mode_1 = require("../mode");
const client_1 = require("../../client");
const react_router_dom_1 = require("react-router-dom");
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const collect_1 = require("./collect");
const util_1 = require("../../util");
// This is a custom react dom build
const ReactDOMServer = require('@onzag/react-dom/server');
const developmentISSSRMode = process.env.NODE_ENV !== "production";
const NO_SSR = process.env.NO_SSR === "true";
const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";
async function ssrGenerator(req, res, html, appData, mode) {
    // do a security check first
    const hostname = req.headers["host"];
    if (hostname !== "localhost" &&
        hostname.indexOf("localhost") !== 0 &&
        hostname !== appData.config.developmentHostname &&
        hostname !== appData.config.productionHostname) {
        res.status(403).end("Invalid Hostname");
        return;
    }
    const ifNoneMatch = req.headers["if-none-match"];
    // now we need to see if we are going to use SSR, due to the fact the NODE_ENV must
    // match between the client and the server in order to produce valid SSR, we check the mode
    // that the client recieved, eg. the client is using development or production builds and we activate
    // only if it matches our NODE_ENV, this means that in development mode, with development builds there is SSR
    // but not with production builds, and vice-versa
    const SSRIsDisabledInThisMode = NO_SSR ||
        (mode === "development" && !developmentISSSRMode) ||
        (mode === "production" && developmentISSSRMode);
    // now we get the config, and the language, from the original path, rememebr this generator runs
    // on an express router
    const config = appData.config;
    const language = req.originalUrl.split("/")[1];
    // and we need to figure out the SSR rule for this path, for that we got to calculate it
    let appliedRule;
    // we need the cookies in order to extract our client data
    const cookies = req.headers["cookie"];
    const splittedCookies = cookies ? cookies.split(";").map((c) => c.trim()) : [];
    // now we need to wonder whether we will use the SSR itself
    let willUseSSR = (
    // language specified and property supported and SSR is not disabled
    (language && config.supportedLanguages.includes(language) && !SSRIsDisabledInThisMode) ||
        // No language specified, let's force a redirect
        (!language && !req.query.noredirect));
    // prepare to build etag
    // these etags are different per url on purpose
    let etag;
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
        appliedRule = {
            noData: true,
            language: null,
            rtl: false,
            languages: config.supportedLanguages,
            forUser: null,
        };
        etag = "*." + appData.buildnumber + "." + mode;
        // this is the root form without any language or any means, there's no SSR data to fill
        if (ifNoneMatch &&
            // this actually even would check the buildnumber
            ifNoneMatch === etag) {
            res.setHeader("Last-Modified", moment_1.default(lastModified).utc().locale("en").format(DATE_RFC2822));
            res.setHeader("Date", moment_1.default().utc().locale("en").format(DATE_RFC2822));
            res.setHeader("ETag", etag);
            res.setHeader("Cache-Control", "public, max-age=0");
            res.status(304).end();
            return;
        }
    }
    else {
        // So in this case we have an SSR rule, which is good for SEO, we need to extract our
        // user from the token we get
        let userAfterValidate = {
            id: null,
            role: constants_1.GUEST_METAROLE,
            token: null,
        };
        // and we get such from the cookie itself
        const currentToken = mode_1.getCookie(splittedCookies, "token");
        // if we have it we need to extract its data, we are going to use, we are actually
        // kind of cheating this graphql call, first is the request fields info and second are the
        // args, we only concerned about the args so we pass the token, in the client the TokenProvider
        // would do this call but we do this right here, right now in the server so the token provider
        // mounts immediately and something can be rendered
        if (currentToken) {
            try {
                const tokenData = await appData.customUserTokenQuery(null, {
                    token: currentToken,
                });
                userAfterValidate.id = tokenData.id;
                userAfterValidate.token = tokenData.token;
                userAfterValidate.role = tokenData.role;
            }
            catch (err) {
            }
        }
        // so now we can add these fileds, the user, the languages, the rtl
        // honestly most users won't even hit this, as they will use the non SSR response
        // which contains no such things and resolve from the service worker and rebuild the app
        // from scratch, however robots will end up triggering this (as well as bad browsers)
        // and incognito mode possibly; and first users, even when they'll most likely be guests
        appliedRule = {
            noData: false,
            language,
            rtl: config.rtlLanguages.includes(language),
            languages: config.supportedLanguages,
            forUser: userAfterValidate,
        };
        etag = req.originalUrl + "." + appData.buildnumber + "." + mode;
    }
    // now we need a root instance, because this will be used
    // like an UI thread we need a clean instance from the pool
    let root;
    try {
        root = await appData.rootPool.acquire().promise;
    }
    catch (err) {
        __1.logger.error("ssrGenerator [SERIOUS]: Could not adquire a root from the pool", {
            errStack: err.stack,
            errMessage: err.message,
        });
        res.status(500).end("Internal Server Error");
        return;
    }
    const i18nData = root.getI18nDataFor(language);
    const i18nAppName = i18nData && i18nData.app_name && util_1.capitalize(i18nData.app_name);
    const i18nAppDescription = i18nData && i18nData.app_description && util_1.capitalize(i18nData.app_description);
    const usedDir = appliedRule.rtl ? "rtl" : "ltr";
    // and we start replacing from the HTML itself, note how these things might have returned null for some
    let newHTML = html;
    newHTML = newHTML.replace(/\$SSRLANG/g, appliedRule.language || "");
    newHTML = newHTML.replace(/\$SSRMANIFESTSRC/g, appliedRule.language ? `/rest/resource/manifest.${appliedRule.language}.json` : "");
    newHTML = newHTML.replace(/\$SSRDIR/g, usedDir);
    // and now the href lang tags
    const langHrefLangTags = appliedRule.languages.map((language) => {
        return `<link rel="alternate" href="https://${req.get("host")}${req.originalUrl.replace(appliedRule.language, language)}" hreflang="${language}">`;
    }).join("");
    // this flags marks whether we can use etags
    // due to an error
    let errorOccured = false;
    // if there's no data let's not give SSR at all
    // since we cannot really keep it consistent
    if (appliedRule.noData) {
        // and we go here
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
        newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
        newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags);
    }
    else {
        // otherwise with the SSR
        const ssr = {
            queries: [],
            resources: {},
            user: appliedRule.forUser,
            title: "__SSR_TITLE__",
            currencyFactors: appData.cache.getServerData()[constants_1.CURRENCY_FACTORS_IDENTIFIER],
        };
        // we need to rid of the token for the client
        let clientSSR = { ...ssr };
        if (clientSSR.user && clientSSR.user.token) {
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
        let serverAppData = null;
        // setting the collector
        const collector = new collect_1.Collector(appData, appliedRule);
        // setting the request manager to handle incoming request
        // in order to build or signature
        root.setRequestManager(collector.collect);
        try {
            // for that we try to initialize, which can indeed, fail
            // mainly because calls to ipstack and whatnot which must
            // be consistent
            serverAppData = await client_1.initializeItemizeApp(appData.ssrConfig.rendererContext, appData.ssrConfig.mainComponent, {
                appWrapper: appData.ssrConfig.appWrapper,
                mainWrapper: appData.ssrConfig.mainWrapper,
                serverMode: {
                    collector: appData.ssrConfig.collector,
                    config: appData.config,
                    ssrContext: ssr,
                    clientDetails: {
                        lang: mode_1.getCookie(splittedCookies, "lang"),
                        currency: mode_1.getCookie(splittedCookies, "currency"),
                        country: mode_1.getCookie(splittedCookies, "country"),
                        guessedData: mode_1.getCookie(splittedCookies, "guessedData"),
                    },
                    langLocales: appData.langLocales,
                    root: root,
                    req: req,
                    res: res,
                    ipStack: appData.ipStack,
                }
            });
            // if there's no data then it means it was redirected
            if (!serverAppData) {
                // when there's no app data in server mode it means
                // that the answer was handled as a redirect, so we must exit and avoid
                // further processing
                return;
            }
            // now we build the app, but we need to put the static router on top
            // as in server mode no router is used so we need this static router to match
            // with SSR
            const app = (react_1.default.createElement(react_router_dom_1.StaticRouter, { location: req.originalUrl }, serverAppData.node));
            // we place such HTML
            // this one uses our special DOM renderer that is async
            const staticMarkup = await ReactDOMServer.renderToStaticMarkup(app);
            // update the last modified and the etag signature
            lastModified = collector.getLastModified();
            etag += "_" + collector.getSignature();
            // now here we just happen to be able to short circuit again if the client
            // says that the request can be cached as well
            if (ifNoneMatch &&
                // this actually even would check the buildnumber
                ifNoneMatch === etag) {
                res.setHeader("Last-Modified", moment_1.default(lastModified).utc().locale("en").format(DATE_RFC2822));
                res.setHeader("Date", moment_1.default().utc().locale("en").format(DATE_RFC2822));
                res.setHeader("ETag", etag);
                if (appliedRule.forUser && appliedRule.forUser.id) {
                    res.setHeader("Cache-Control", "private");
                }
                else {
                    res.setHeader("Cache-Control", "public, max-age=0");
                }
                res.status(304).end();
                return;
            }
            // now we calculate the og fields that are final, given they can be functions
            // if it's a string, use it as it is, otherwise call the function to get the actual value, they might use values from the queries
            const finalOgTitle = root.getStateKey("ogTitle");
            // the description as well, same thing
            const finalOgDescription = root.getStateKey("ogDescription");
            // same for the image but this is special
            let finalOgImage = root.getStateKey("ogImage");
            // because if it's a url and og image tags require absolute paths with entire urls
            // we check if it's an absolute path with no host
            if (finalOgImage && finalOgImage.startsWith("/")) {
                // and add the host
                finalOgImage = `https://${req.get("host")}` + finalOgImage;
            }
            else if (finalOgImage && !finalOgImage.includes("://")) {
                // otherwise we just add the protocol if it was not added
                finalOgImage = `https://` + finalOgImage;
            }
            // now we calculate the same way title and description
            const finalTitle = root.getStateKey("title");
            const finalDescription = root.getStateKey("description");
            const usedTitle = finalTitle || i18nAppName || config.appName || "";
            const usedDescription = finalDescription || i18nAppDescription || i18nAppName || config.appName || "";
            const usedOgTitle = finalOgTitle || usedTitle;
            const usedOgDescription = finalOgDescription || usedDescription;
            const usedOgImage = finalOgImage || "/rest/resource/icons/android-chrome-512x512.png";
            ssr.title = usedTitle;
            clientSSR.title = usedTitle;
            clientSSR.queries = collector.getQueries();
            // now we need to make the title match
            newHTML = newHTML.replace(/\$SSRAPP/g, staticMarkup.replace(/__SSR_TITLE__/g, usedTitle));
            // replace with this information
            newHTML = newHTML.replace(/\$SSRTITLE/g, usedTitle);
            newHTML = newHTML.replace(/\$SSRDESCR/g, usedDescription);
            newHTML = newHTML.replace(/\$SSROGTITLE/g, usedOgTitle);
            newHTML = newHTML.replace(/\$SSROGDESCR/g, usedOgDescription);
            newHTML = newHTML.replace(/\$SSROGIMG/g, usedOgImage);
            // we replace the HTML with the SSR information that we are using
            newHTML = newHTML.replace(/\"\$SSR\"/g, JSON.stringify(clientSSR));
            // but we need the SSR head which includes our hreflang tags
            let finalSSRHead = langHrefLangTags;
            if (serverAppData.id) {
                // and also our collected data
                finalSSRHead += appData.ssrConfig.collector.retrieve(serverAppData.id);
            }
            // we add that
            newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, finalSSRHead);
        }
        catch (e) {
            // if it fails then we can't do SSR and we just provide without SSR
            __1.logger.error("ssrGenerator [SERIOUS]: Failed to run SSR due to failed initialization", {
                errStack: e.stack,
                errMessage: e.message,
                appliedRule,
            });
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
            newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
            newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags);
            // cannot set etag or cache headers because the rendering failed
            // this is why we end abruptly here
            errorOccured = true;
        }
    }
    // and finally answer the client
    res.setHeader("content-type", "text/html; charset=utf-8");
    if (!errorOccured) {
        res.setHeader("Last-Modified", moment_1.default(lastModified).utc().locale("en").format(DATE_RFC2822));
        res.setHeader("Date", moment_1.default().utc().locale("en").format(DATE_RFC2822));
        res.setHeader("ETag", etag);
        // for individual users the cache control is then
        // set to private
        if (appliedRule.forUser && appliedRule.forUser.id) {
            res.setHeader("Cache-Control", "private");
        }
        else {
            res.setHeader("Cache-Control", "public, max-age=0");
        }
    }
    res.end(newHTML);
    // clean and release, it's done!!!
    root.cleanState();
    appData.rootPool.release(root);
}
exports.ssrGenerator = ssrGenerator;
