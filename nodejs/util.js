"use strict";
/**
 * Contains general utility functions to be used within the itemize app
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const jsdom_1 = require("jsdom");
const dompurify_1 = __importDefault(require("dompurify"));
const constants_1 = require("./constants");
/**
 * capitalizes a string
 * @param str the string to capitalize
 */
function capitalize(str) {
    if (!str) {
        return str;
    }
    if ((str.charAt(0) === "¡" ||
        str.charAt(0) === "¿") && str.length > 1) {
        return str.charAt(0) + str.charAt(1).toUpperCase() + str.slice(2);
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
/**
 * @ignore
 */
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
/**
 * Escapes a string into a regex
 * @param str the string to escape
 * @returns a string that is regex ready
 */
function escapeStringRegexp(str) {
    return str.replace(matchOperatorsRe, "\\$&");
}
exports.escapeStringRegexp = escapeStringRegexp;
/**
 * @ignore
 */
const mimeExtensions = {
    "audio/aac": "aac",
    "application/x-abiword": "abw",
    "application/x-freearc": "arc",
    "video/x-msvideo": "avi",
    "application/vnd.amazon.ebook": "azw",
    "application/octet-stream": "bin",
    "image/bmp": "bmp",
    "application/x-bzip": "bz",
    "application/x-bzip2": "bz2",
    "application/x-csh": "csh",
    "text/css": "css",
    "text/csv": "csv",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-fontobject": "eot",
    "application/epub+zip": "epub",
    "image/gif": "gif",
    "text/html": "html",
    "image/vnd.microsoft.icon": "ico",
    "text/calendar": "ics",
    "application/java-archive": "jar",
    "image/jpeg": "jpg",
    "text/javascript": "js",
    "application/json": "json",
    "application/ld+json": "jsonld",
    "audio/midi audio/x-midi": "mid",
    "audio/mpeg": "mp3",
    "video/mpeg": "mpeg",
    "application/vnd.apple.installer+xml": "mpkg",
    "application/vnd.oasis.opendocument.presentation": "odp",
    "application/vnd.oasis.opendocument.spreadsheet": "ods",
    "application/vnd.oasis.opendocument.text": "odt",
    "audio/ogg": "oga",
    "video/ogg": "ogv",
    "application/ogg": "ogx",
    "font/otf": "otf",
    "image/png": "png",
    "application/pdf": "pdf",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "application/x-rar-compressed": "rar",
    "application/rtf": "rtf",
    "application/x-sh": "sh",
    "image/svg+xml": "svg",
    "application/x-shockwave-flash": "swf",
    "application/x-tar": "tar",
    "image/tiff": "tiff",
    "font/ttf": "ttf",
    "text/plain": "txt",
    "application/vnd.visio": "vsd",
    "audio/wav": "wav",
    "audio/webm": "weba",
    "video/webm": "webm",
    "image/webp": "webp",
    "font/woff": "woff",
    "font/woff2": "woff2",
    "application/xhtml+xml": "xhtml",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/xml if not readable from casual users (RFC 3023, section 3)": "xml",
    "application/vnd.mozilla.xul+xml": "xul",
    "application/zip": "zip",
    "video/3gpp": "3gp",
    "video/3gpp2": "3g2",
    "application/x-7z-compressed": "7z",
};
function processAccepts(accept, isExpectingImages) {
    return (accept ||
        (isExpectingImages ? constants_1.FILE_SUPPORTED_IMAGE_TYPES.join(",") : "*")).replace(/image(?!\/)/g, constants_1.FILE_SUPPORTED_IMAGE_TYPES.join(","));
}
exports.processAccepts = processAccepts;
/**
 * Checks whether the file type exists in the accept property
 * @param fileType the file.type
 * @param accept the accept property
 */
function checkFileInAccepts(fileType, accept) {
    const typeRegex = new RegExp(accept.replace(/\*/g, '.\*').replace(/\,/g, '|').replace(/\+/g, "\\+"));
    return typeRegex.test(fileType);
}
exports.checkFileInAccepts = checkFileInAccepts;
/**
 * Converts a mime type to an extension using a known extension list
 * @param str the string that represents the mime type
 * @returns an extension or txt if it doesn't know
 */
function mimeTypeToExtension(str) {
    return mimeExtensions[str] || str.split("/")[1] || "txt";
}
exports.mimeTypeToExtension = mimeTypeToExtension;
/**
 * Replaces a string to another for locale usage
 * eg. `"hello {0} world {1}"` with `["foo", "bar"]` become
 * `"hello foo world bar"`
 * @param str the string
 * @param args the args to pass
 * @returns a string
 */
function localeReplacer(str, ...args) {
    return str.replace(/\{(\d+)\}/g, (match, indexMatch) => {
        if (typeof args[indexMatch] === "undefined") {
            return "?";
        }
        else if (args[indexMatch] === null) {
            return "";
        }
        return args[indexMatch].toString();
    });
}
exports.localeReplacer = localeReplacer;
/**
 * Replaces a string to an array of whatever it was sent
 * for locale usage
 * eg. `"hello {0} world {1}"` with `[<span>foo</span>, <span>bar</span>]` become
 * `["hello ",<span>foo</span>," world ",<span>bar</span>]`
 * @param str the string
 * @param args the args to pass
 * @returns a an array
 */
function localeReplacerToArray(str, ...args) {
    const splitted = str.split(/\{(\d+)\}/g);
    const result = [];
    splitted.forEach((splitResult, index) => {
        if (!splitResult) {
            return;
        }
        if (index % 2 === 1) {
            if (typeof args[splitResult] !== "undefined") {
                result.push(args[splitResult]);
            }
            else {
                result.push("?");
            }
        }
        else {
            result.push(splitResult);
        }
    });
    return result;
}
exports.localeReplacerToArray = localeReplacerToArray;
/**
 * gets the actual format given a string format
 * this is basically only used to avoid inconsistencies
 * regarding input to create a mask, and it only happens with
 * time basically, but here we can override masks
 * @param value the format string
 * @returns the normalized form
 */
// export function getNormalizedDateTimeFormat(value: string) {
//   // Since we cannot have a mask that uses only one H
//   // we need to return it with two, same for the second
//   // we canot have a one or two digits situation
//   if (value === "H:mm") {
//     return "HH:mm";
//   } else if (value === "h:mm A") {
//     return "hh:mm A";
//   }
//   // any other value is tipically allowed
//   return value;
// }
function getLocalizedTimeFormat() {
    const LT = moment_1.default.localeData()._longDateFormat.LT;
    return LT;
}
exports.getLocalizedTimeFormat = getLocalizedTimeFormat;
function getLocalizedDateFormat() {
    const L = moment_1.default.localeData()._longDateFormat.L;
    return L;
}
exports.getLocalizedDateFormat = getLocalizedDateFormat;
function getLocalizedDateTimeFormat() {
    return getLocalizedDateFormat() + " " + getLocalizedTimeFormat();
}
exports.getLocalizedDateTimeFormat = getLocalizedDateTimeFormat;
/**
 * Converts a file to its absolute URL counterpart
 * @param domain the domain that is being used according to the env
 * @param containerHostnamePrefixes the containers hostnames prefixes that allow
 * to identify the url prefix to access a given container
 * @param file the file to convert
 * @param itemDefinition the item definition this file is in and stored as, it is required even
 * for prop extensions, because every stored value has an item definition attached to it
 * @param id the id
 * @param version the version
 * @param containerId the container id this file was found to be in
 * @param include the include (or null)
 * @param property the property it came from
 * @param cacheable whether the resulting url should be cached
 * @returns a new IGQLFile but absolute
 */
function fileURLAbsoluter(domain, containerHostnamePrefixes, file, itemDefinition, id, version, containerId, include, property, cacheable) {
    if (file === null) {
        return null;
    }
    if (file.url.indexOf("blob:") === 0) {
        return file;
    }
    if (!containerId) {
        console.warn("fileURLAbsoluter: no container id specified");
        return null;
    }
    let prefix = containerHostnamePrefixes[containerId];
    if (!prefix) {
        console.warn("fileURLAbsoluter: there's no container prefix for container id: " + containerId);
        return null;
    }
    if (prefix[prefix.length - 1] !== "/") {
        prefix += "/";
    }
    prefix += domain + "/";
    if (prefix.indexOf("/") !== 0) {
        prefix = "https://" + prefix;
    }
    return {
        ...file,
        url: prefix +
            (property.isExtension() ?
                itemDefinition.getParentModule().getQualifiedPathName() :
                itemDefinition.getQualifiedPathName()) + "/" +
            id + "." + (version || "") + "/" +
            (include ? include.getId() + "/" : "") +
            property.getId() + "/" +
            file.id + "/" + file.url +
            (cacheable ? "?sw-cacheable=true" : ""),
    };
}
exports.fileURLAbsoluter = fileURLAbsoluter;
/**
 * Converts an array of files to its absolute url counterpart
 * @param domain the domain that is being used according to the env
 * @param containerHostnamePrefixes the containers hostnames prefixes that allow
 * to identify the url prefix to access a given container
 * @param files the array of files to convert
 * @param itemDefinition the item definition this file is in and stored as, it is required even
 * for prop extensions, because every stored value has an item definition attached to it
 * @param id the id
 * @param version the version
 * @param containerId the container id this file was found to be in
 * @param include the include (or null)
 * @param property the property it came from
 * @param cacheable whether the resulting urls should be cacheable
 * @returns a new array of files
 */
function fileArrayURLAbsoluter(domain, containerHostnamePrefixes, files, itemDefinition, id, version, containerId, include, property, cacheable) {
    if (files === null) {
        return null;
    }
    return files.map((file) => fileURLAbsoluter(domain, containerHostnamePrefixes, file, itemDefinition, id, version, containerId, include, property, cacheable));
}
exports.fileArrayURLAbsoluter = fileArrayURLAbsoluter;
exports.DOMWindow = jsdom_1.JSDOM ? (new jsdom_1.JSDOM("")).window : window;
exports.DOMPurify = dompurify_1.default(exports.DOMWindow);
