"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function toXML(src, targetDomain, sourcePrefix, prefixURL, suffixURL) {
    let result = "<?xml version='1.0' encoding='UTF-8'?>";
    if (src.isIndex) {
        result += "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
    }
    else {
        result += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
    }
    src.entries.forEach((entry) => {
        if (src.isIndex) {
            result += "<sitemap><loc>";
            result += sourcePrefix;
            if (prefixURL) {
                result += prefixURL;
                if (!result.endsWith("/")) {
                    result += "/";
                }
            }
            result += entry;
            if (suffixURL) {
                result += suffixURL;
            }
            result += "</loc></sitemap>";
        }
        else {
            result += "<url><loc>";
            result += "https://" + targetDomain;
            if (prefixURL) {
                result += "/" + prefixURL;
            }
            if (entry[0] !== "/") {
                result += "/";
            }
            result += entry;
            if (suffixURL) {
                result += suffixURL;
            }
            result += "</loc></url>";
        }
    });
    if (src.isIndex) {
        result += "</sitemapindex>";
    }
    else {
        result += "</urlset>";
    }
    return result;
}
exports.toXML = toXML;
