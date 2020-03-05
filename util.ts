/**
 * Contains general utility functions to be used within the itemize app
 *
 * @packageDocumentation
 */

import Moment from "moment";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

/**
 * capitalizes a string
 * @param str the string to capitalize
 */
export function capitalize(str: string) {
  if (
    (
      str.charAt(0) === "¡" ||
      str.charAt(0) === "¿"
    ) && str.length > 1
  ) {
    return str.charAt(0) + str.charAt(1).toUpperCase() + str.slice(2);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @ignore
 */
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
/**
 * Escapes a string into a regex
 * @param str the string to escape
 * @returns a string that is regex ready
 */
export function escapeStringRegexp(str: string) {
  return str.replace(matchOperatorsRe, "\\$&");
}

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

/**
 * Converts a mime type to an extension using a known extension list
 * @param str the string that represents the mime type
 * @returns an extension or txt if it doesn't know
 */
export function mimeTypeToExtension(str: string) {
  return mimeExtensions[str] || str.split("/")[1] || "txt";
}

/**
 * Replaces a string to another for locale usage
 * eg. `"hello {0} world {1}"` with `["foo", "bar"]` become
 * `"hello foo world bar"`
 * @param str the string
 * @param args the args to pass
 * @returns a string
 */
export function localeReplacer(str: string, ...args: any[]): string {
  return str.replace(/\{(\d+)\}/g, (match, indexMatch) => (args[indexMatch] || "?"));
}

/**
 * Replaces a string to an array of whatever it was sent
 * for locale usage
 * eg. `"hello {0} world {1}"` with `[<span>foo</span>, <span>bar</span>]` become
 * `["hello ",<span>foo</span>," world ",<span>bar</span>]`
 * @param str the string
 * @param args the args to pass
 * @returns a an array
 */
export function localeReplacerToArray(str: string, ...args: any[]): any[] {
  const splitted: string[] = str.split(/\{(\d+)\}/g);
  const result: any[] = [];

  splitted.forEach((splitResult, index) => {
    if (!splitResult) {
      return;
    }

    if (index % 2 === 1) {
      if (typeof args[splitResult] !== "undefined") {
        result.push(args[splitResult]);
      } else {
        result.push("?");
      }
    } else {
      result.push(splitResult);
    }
  });

  return result;
}

/**
 * gets the actual format given a string format
 * this is basically only used to avoid inconsistencies
 * regarding input to create a mask, and it only happens with
 * time basically, but here we can override masks
 * @param value the format string
 * @returns the normalized form
 */
export function getNormalizedDateTimeFormat(value: string) {
  // Since we cannot have a mask that uses only one H
  // we need to return it with two, same for the second
  // we canot have a one or two digits situation

  if (value === "H:mm") {
    return "HH:mm";
  } else if (value === "h:mm A") {
    return "hh:mm A";
  }

  // any other value is tipically allowed
  return value;
}

/**
 * TODO looks wrong check what is wrong
 */
export function getLocalizedTimeFormat(normalize: boolean) {
  const LT = (Moment.localeData() as any)._longDateFormat.LT;
  if (!normalize) {
    return LT;
  }
  return LT;
}

/**
 * TODO looks wrong check what is wrong
 */
export function getLocalizedDateFormat(normalize: boolean) {
  const L = (Moment.localeData() as any)._longDateFormat.L;
  if (!normalize) {
    return L;
  }
  return getNormalizedDateTimeFormat(L);
}

/**
 * TODO looks wrong check what is wrong
 */
export function getLocalizedDateTimeFormat(normalize: boolean) {
  return getLocalizedDateFormat(normalize) + " " + getLocalizedTimeFormat(normalize);
}

export const DOMWindow = JSDOM ? (new JSDOM("")).window : window;
export const DOMPurify = createDOMPurify(DOMWindow);
