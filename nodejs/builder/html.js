"use strict";
/**
 * Builds the HTML file that is used as the index entry for the itemize
 * application
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const safe_1 = __importDefault(require("colors/safe"));
const html_minifier_1 = __importDefault(require("html-minifier"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fsAsync = fs_1.default.promises;
/**
 * Replaces html keys that exist as some sort of template from the html
 * file in order to create the final output for the html
 * @param html the html in question
 * @param obj the object that is used to replace keys from (normally this is the config)
 * @param prefix the prefix to expect things prefixed as, this is for complex types eg. key.key...
 * @returns a string that represents the built html
 */
function replaceHTMLKeys(html, obj, prefix) {
    // so we make the new html
    let newHTML = html;
    // and loop per key
    Object.keys(obj).forEach((key) => {
        // if we have an array, not an object, or null
        if (Array.isArray(obj[key]) || typeof obj[key] !== "object" || obj[key] === null) {
            // then we replace that for the value using our prefix
            newHTML = newHTML.replace(new RegExp(util_1.escapeStringRegexp("%{" + prefix + key + "}"), "g"), 
            // for arrays we join the value as strings
            Array.isArray(obj[key]) ? obj[key].join(",") : obj[key]);
        }
        else {
            // otherwise we just prefix from the prefix and the key to recurse inside
            newHTML = replaceHTMLKeys(newHTML, obj[key], prefix + key + ".");
        }
    });
    // return it
    return newHTML;
}
/**
 * Builds and stores the html file in the dist directory from the source
 * for the itemize app, this file also makes for the buildnumber as the buildnumber
 * is synchronized within the html file
 * @param rawConfig the configuration that is being used
 */
async function buildHTML(rawConfig) {
    // the base html as we read it from either node_modules or an itemize folder
    let baseHTML = await fsAsync.readFile(path_1.default.join("node_modules", "itemize", "client", "internal", "index.html"), "utf8");
    // we need to make a build number
    baseHTML = replaceHTMLKeys(baseHTML, {
        ...rawConfig,
        BUILD_NUMBER: rawConfig.buildnumber.toString(),
    }, "");
    // and we minify the html
    baseHTML = html_minifier_1.default.minify(baseHTML, {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
    });
    // emit the html file
    const fileName = path_1.default.join("dist", "data", "index.html");
    console.log("emiting " + safe_1.default.green(fileName), "BUILD_NUMBER:", safe_1.default.yellow(rawConfig.buildnumber.toString()));
    await fsAsync.writeFile(fileName, baseHTML);
}
exports.buildHTML = buildHTML;
