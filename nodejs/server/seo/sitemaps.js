"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * Converts a json sitemap file to a proper sitemap
 * @param src the json source
 * @param targetDomain the target domain that we are making a SEO for
 * @param sourcePrefix the source prefix (aka openstack prefix) where we store our files
 * @param prefixURL an optional prefix url to add between the source prefix and the target domain
 * @param suffixURL an optional suffix to add to the end
 */
function toXML(src, targetDomain, sourcePrefix, prefixURL, suffixURL) {
    // first the standard xml info
    let result = "<?xml version='1.0' encoding='UTF-8'?>";
    // now we add sitemap index or urlset accordingly
    if (src.isIndex) {
        result += "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
    }
    else {
        result += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
    }
    // now we need to go between our entries
    src.entries.forEach((entry) => {
        // for indexes
        if (src.isIndex) {
            // we add a sitemap and its location
            result += "<sitemap><loc>";
            // add the source prefix that represents the openstack container prefix
            result += sourcePrefix;
            // now we might have a prefix url
            if (prefixURL) {
                // we add it
                result += prefixURL;
                // the next thing must be a / since the prefix must end in so
                if (!result.endsWith("/")) {
                    result += "/";
                }
            }
            // now we add the entry itself
            result += entry;
            // now the suffix
            if (suffixURL) {
                result += suffixURL;
            }
            // and close
            result += "</loc></sitemap>";
        }
        else {
            // this is for the url map
            result += "<url><loc>";
            // now the target domain
            result += "https://" + targetDomain;
            // equally the result prefix url, this one is different from the index
            // as we are building with a hostnamae itself
            if (prefixURL) {
                // so the slash is necessary
                result += "/" + prefixURL;
            }
            // and as so our entry itself since its mean tot be added
            // to the end of the hostname is expected to have a trailing slash
            if (entry[0] !== "/") {
                result += "/";
            }
            // now we add the entry
            result += entry;
            // and the suffix
            if (suffixURL) {
                result += suffixURL;
            }
            // close the result
            result += "</loc></url>";
        }
    });
    // and we clouse our index or urlset
    if (src.isIndex) {
        result += "</sitemapindex>";
    }
    else {
        result += "</urlset>";
    }
    return result;
}
exports.toXML = toXML;
