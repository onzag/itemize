"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const react_1 = __importDefault(require("react"));
const constants_1 = require("../../constants");
const mode_1 = require("../mode");
const client_1 = require("../../client");
const react_router_dom_1 = require("react-router-dom");
const server_1 = __importDefault(require("react-dom/server"));
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const path_1 = __importDefault(require("path"));
const collect_1 = require("./collect");
const developmentISSSRMode = process.env.NODE_ENV !== "production";
const NO_SSR = process.env.NO_SSR === "true";
const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";
;
function collectionFailedCheck(results) {
    return results.some((collectionResult) => collectionResult.status === false ||
        (collectionResult.subcollection && collectionFailedCheck(collectionResult.subcollection)));
}
function lastModifiedFind(results, current) {
    let final = current;
    results.forEach((r) => {
        if (r.lastModified.getTime() > final.getTime()) {
            final = r.lastModified;
        }
        if (r.subcollection) {
            final = lastModifiedFind(r.subcollection, final);
        }
    });
    return final;
}
function collectionSignatureBuild(results) {
    return results.map((collectionResult) => collectionResult.signature +
        (collectionResult.subcollection ? "[" + collectionSignatureBuild(collectionResult.subcollection) + "]" : "")).join(";");
}
function collectionQueryBuild(results) {
    let inOrder = results.map((r) => r.query);
    results.forEach((r) => {
        if (r.subcollection) {
            const subCollectionResult = collectionQueryBuild(r.subcollection);
            inOrder = inOrder.concat(subCollectionResult);
        }
    });
    return inOrder;
}
async function ssrGenerator(req, res, html, appData, mode, rule) {
    // do a security check first
    const hostname = req.headers["host"];
    if (hostname !== "localhost" &&
        hostname.indexOf("localhost") !== 0 &&
        hostname !== appData.config.developmentHostname &&
        hostname !== appData.config.productionHostname) {
        res.status(403).end("Invalid Hostname");
        return;
    }
    // first we need a root instance, because this will be used
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
    // now the result rule, first, did we get a rule?... all paths that do not match a resource
    // or anything whatsoever go through here, and they might not have anything specified for it
    // another thing is that we have a language set, we don't want / matching, and that the language
    // is a valid language... not some made up language also that SSR is not disabled
    // othewise it's meaningless
    let resultRule;
    if (rule && language && config.supportedLanguages.includes(language) && !SSRIsDisabledInThisMode) {
        // if it all passes, we get the rule, there are two types, dynamic and already done
        // if it's dynamic we pass the args, otherwse it is what it is
        resultRule = typeof rule === "function" ? rule(req, language, root) : rule;
    }
    else if (!language && !req.query.noredirect) {
        // fake rule to force a redirect
        resultRule = {
            title: null,
            ogTitle: null,
            description: null,
            ogDescription: null,
            ogImage: null,
            collect: [],
            collectResources: [],
            // collectSearch: [],
            memId: "*.root.redirect",
        };
    }
    let etag;
    // This is the default, what happens to routes that have nothing setup for them
    // so if no result rule could be calculated, but we also need to ensure that 
    if (!resultRule) {
        // this is the default, this is what we build from the applied rule, what everything
        // gets when there's no SSR enabled, language doesn't matter, only mode, as if, because
        // modes don't mix, so it can be memoized as the standard response, because there's no data
        // it doesn't hydrate in the client side, it renders from scratch; this is the settings that
        // the service worker in the client utilize in order to build the app from scratch, for most users
        // they'll never hit SSR they'll recieve only this fast memoized option meant for the same buildnumber
        // and they'll get it mainly from the service worker, they won't even bother with the server
        appliedRule = {
            title: config.appName,
            description: config.appName,
            ogTitle: config.appName,
            ogDescription: config.appName,
            ogImage: "/rest/resource/icons/android-chrome-512x512.png",
            collect: null,
            collectResources: null,
            // collectSearch: null,
            noData: true,
            language: null,
            rtl: false,
            languages: config.supportedLanguages,
            forUser: null,
            memId: "*." + appData.buildnumber + "." + mode,
        };
        etag = appliedRule.memId;
        // this is the root form without any language or any means, there's no SSR data to fill
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
            ...resultRule,
            noData: false,
            language,
            rtl: config.rtlLanguages.includes(language),
            languages: config.supportedLanguages,
            forUser: userAfterValidate,
        };
        // language makes the memory specific for it, in this case language
        // matters so we need to add it to the memory id
        if (appliedRule.memId) {
            appliedRule.memId += "." + appData.buildnumber + "." + mode + "." + appliedRule.language;
        }
        etag = appliedRule.memId;
        // however like previously specified, we don't want to cache answers for specific
        // users, because they are different, only guests really matter, so we want
        // to drop the memId in such a case completely, no caching of speciifc user id answers
        // we don't want to memoize specific user answers
        if (appliedRule.forUser.id) {
            appliedRule.memId = null;
            if (appliedRule.collect) {
                const isFindingCurrentUser = appliedRule.collect.some((collectionPoint) => collectionPoint[0] === "users" &&
                    collectionPoint[1] === "user" &&
                    collectionPoint[2] === appliedRule.forUser.id &&
                    collectionPoint[3] === null);
                if (!isFindingCurrentUser) {
                    appliedRule.collect = [...appliedRule.collect, ["users", "user", appliedRule.forUser.id, null]];
                }
            }
        }
    }
    // now we start collecting the information
    let collectionSignature = null;
    let collectionFailed = false;
    // and gathering the queries
    let queries = [];
    let lastModified = new Date(parseInt(appData.buildnumber));
    // now we try to collect if we are asked to collect data
    if (appliedRule.collect) {
        // so we start collecting
        const collectionResults = await Promise.all(appliedRule.collect.map(collect_1.collect.bind(null, root, appData, appliedRule)));
        collectionFailed = collectionFailedCheck(collectionResults);
        // now we build the signature as a string
        collectionSignature = collectionSignatureBuild(collectionResults);
        queries = collectionQueryBuild(collectionResults);
        lastModified = lastModifiedFind(collectionResults, lastModified);
    }
    // now we need to collect the resources
    const resources = {};
    if (appliedRule.collectResources) {
        try {
            await Promise.all(appliedRule.collectResources.map(async (src) => {
                resources[src] = await fsAsync.readFile(path_1.default.resolve(path_1.default.join("dist", "data", src)), "utf-8");
            }));
        }
        catch (err) {
            collectionFailed = true;
        }
        // and we need to build this signature of collection of data
        if (collectionSignature) {
            collectionSignature += appliedRule.collectResources.join(";");
        }
        else {
            collectionSignature = appliedRule.collectResources.join(";");
        }
    }
    if (collectionSignature) {
        etag += "-" + collectionSignature.replace(/\s/g, "_");
    }
    etag = JSON.stringify(etag);
    if (!collectionFailed &&
        ifNoneMatch &&
        // this actually even would check the buildnumber
        ifNoneMatch === etag) {
        res.setHeader("Last-Modified", moment_1.default(lastModified).utc().locale("en").format(DATE_RFC2822));
        res.setHeader("Date", moment_1.default().utc().locale("en").format(DATE_RFC2822));
        res.setHeader("ETag", etag);
        res.setHeader("Cache-Control", "public, max-age=0");
        res.status(304).end();
        root.cleanState();
        appData.rootPool.release(root);
        return;
    }
    // so if nothing failed during collection, and we have a memory id
    // and we have a memoized answer for that memory id which matches
    // the collection signature
    if (!collectionFailed &&
        appliedRule.memId) {
        const memoizedAnswer = await appData.cache.getRaw("MEM." + appliedRule.memId);
        if (memoizedAnswer && memoizedAnswer.value && memoizedAnswer.value.collectionSignature === collectionSignature) {
            res.setHeader("Last-Modified", moment_1.default(lastModified).utc().locale("en").format(DATE_RFC2822));
            res.setHeader("Date", moment_1.default().utc().locale("en").format(DATE_RFC2822));
            res.setHeader("ETag", etag);
            // we are done just serve what is in memory and the chicken is done
            res.setHeader("content-type", "text/html; charset=utf-8");
            res.end(memoizedAnswer.value.html);
            // remember to clean before release, we don't want to pollute anything
            root.cleanState();
            appData.rootPool.release(root);
            return;
        }
    }
    // now we calculate the og fields that are final, given they can be functions
    // if it's a string, use it as it is, otherwise call the function to get the actual value, they might use values from the queries
    const finalOgTitle = (typeof appliedRule.ogTitle === "string" || !appliedRule.ogTitle) ?
        appliedRule.ogTitle : appliedRule.ogTitle(queries, config);
    // the description as well, same thing
    const finalOgDescription = (typeof appliedRule.ogDescription === "string" || !appliedRule.ogDescription) ?
        appliedRule.ogDescription : appliedRule.ogDescription(queries, config);
    // same for the image but this is special
    let finalOgImage = (typeof appliedRule.ogImage === "string" || !appliedRule.ogImage) ?
        appliedRule.ogImage : appliedRule.ogImage(queries, config);
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
    const finalTitle = (typeof appliedRule.title === "string" || !appliedRule.title) ?
        appliedRule.title : appliedRule.title(queries, config);
    const finalDescription = (typeof appliedRule.description === "string" || !appliedRule.title) ?
        appliedRule.description : appliedRule.description(queries, config);
    // and we start replacing from the HTML itself, note how these things might have returned null for some
    let newHTML = html;
    newHTML = newHTML.replace(/\$SSRLANG/g, appliedRule.language || "");
    newHTML = newHTML.replace(/\$SSRMANIFESTSRC/g, appliedRule.language ? `/rest/resource/manifest.${appliedRule.language}.json` : "");
    newHTML = newHTML.replace(/\$SSRDIR/g, appliedRule.rtl ? "rtl" : "ltr");
    newHTML = newHTML.replace(/\$SSRTITLE/g, finalTitle || "");
    newHTML = newHTML.replace(/\$SSRDESCR/g, finalDescription || "");
    newHTML = newHTML.replace(/\$SSROGTITLE/g, finalOgTitle || finalTitle || "");
    newHTML = newHTML.replace(/\$SSROGDESCR/g, finalOgDescription || finalDescription || "");
    newHTML = newHTML.replace(/\$SSROGIMG/g, finalOgImage || "");
    // and now the href lang tags
    const langHrefLangTags = appliedRule.languages.map((language) => {
        return `<link rel="alternate" href="https://${req.get("host")}/${language}" hreflang="${language}">`;
    }).join("");
    // if there's no data or the collection has failed, let's not give SSR at all
    // since we cannot really keep it consistent
    if (appliedRule.noData || collectionFailed) {
        // and we go here
        newHTML = newHTML.replace(/\$SSRAPP/g, "");
        newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
        newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags);
    }
    else {
        // otherwise with the SSR
        const ssr = {
            queries,
            resources,
            user: appliedRule.forUser,
            title: finalTitle,
            currencyFactors: appData.cache.getServerData()[constants_1.CURRENCY_FACTORS_IDENTIFIER],
        };
        let clientSSR = ssr;
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
        // we replace the HTML with the SSR information that we are using
        newHTML = newHTML.replace(/\"\$SSR\"/g, JSON.stringify(ssr));
        // and now we need the server app data
        let serverAppData = null;
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
        }
        catch (e) {
            // if it fails then we can't do SSR and we just provide without SSR
            __1.logger.error("ssrGenerator [SERIOUS]: Failed to run SSR due to failed initialization", {
                errStack: e.stack,
                errMessage: e.message,
                appliedRule,
            });
            newHTML = newHTML.replace(/\$SSRAPP/g, "");
            newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
            newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags);
            res.setHeader("content-type", "text/html; charset=utf-8");
            // cannot set etag or cache headers because the rendering failed
            res.end(newHTML);
            root.cleanState();
            appData.rootPool.release(root);
            return;
        }
        // now we build the app, but we need to put the static router on top
        // as in server mode no router is used so we need this static router to match
        // with SSR
        const app = (react_1.default.createElement(react_router_dom_1.StaticRouter, { location: req.originalUrl }, serverAppData.node));
        // we place such HTML
        newHTML = newHTML.replace(/\$SSRAPP/g, server_1.default.renderToStaticMarkup(app));
        // but we need the SSR head which includes our hreflang tags
        let finalSSRHead = langHrefLangTags;
        if (serverAppData.id) {
            // and also our collected data
            finalSSRHead += appData.ssrConfig.collector.retrieve(serverAppData.id);
        }
        // we add that
        newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, finalSSRHead);
    }
    // if we have a valid memory id after all
    if (appliedRule.memId) {
        // we memoize our answer
        (async () => {
            await appData.cache.setRaw("MEM." + appliedRule.memId, {
                html: newHTML,
                collectionSignature,
            });
        })();
    }
    // and finally answer the client
    res.setHeader("content-type", "text/html; charset=utf-8");
    if (!collectionFailed) {
        res.setHeader("Last-Modified", moment_1.default(lastModified).utc().locale("en").format(DATE_RFC2822));
        res.setHeader("Date", moment_1.default().utc().locale("en").format(DATE_RFC2822));
        res.setHeader("ETag", etag);
    }
    res.end(newHTML);
    // clean and release, it's done!!!
    root.cleanState();
    appData.rootPool.release(root);
}
exports.ssrGenerator = ssrGenerator;
