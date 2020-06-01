"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const mode_1 = require("../mode");
async function ssrGenerator(req, res, html, appData, rule) {
    res.setHeader("content-type", "text/html; charset=utf-8");
    const config = appData.config;
    const language = req.path.split("/")[1];
    let appliedRule;
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
        };
        // this is the root form without any language or any means, there's no SSR data to fill
    }
    else {
        const resultRule = typeof rule === "function" ? rule(req, language, appData.root) : rule;
        const cookies = req.headers["cookie"];
        const splittedCookies = cookies.split(";").map((c) => c.trim());
        let userAfterValidate = {
            id: null,
            role: constants_1.GUEST_METAROLE,
            token: null,
        };
        const currentToken = mode_1.getCookie(splittedCookies, "token");
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
        appliedRule = {
            ...resultRule,
            noData: false,
            language,
            rtl: config.rtlLanguages.includes(language),
            languages: config.supportedLanguages,
            forUser: userAfterValidate,
        };
    }
    if (appliedRule.ogImage.startsWith("/")) {
        appliedRule.ogImage = `${req.protocol}://${req.get("host")}` + appliedRule.ogImage;
    }
    else if (!appliedRule.ogImage.includes("://")) {
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
    const langHrefLangTags = appliedRule.languages.map((language) => {
        return `<link rel="alternate" href="${req.protocol}://${req.get("host")}/${language}" hreflang="${language}">`;
    }).join("");
    if (appliedRule.noData) {
        newHTML = newHTML.replace(/\$SSRAPP/g, "");
        newHTML = newHTML.replace(/\"\$SSR\"/g, "null");
        newHTML = newHTML.replace(/\<SSRHEAD\>\s*\<\/SSRHEAD\>|\<SSRHEAD\/\>|\<SSRHEAD\>/ig, langHrefLangTags);
    }
    else {
        // TODO collect
        const finalData = null;
    }
    res.end(newHTML);
}
exports.ssrGenerator = ssrGenerator;
