import Moment from "moment";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
export function escapeStringRegexp(str: string) {
  return str.replace(matchOperatorsRe, "\\$&");
}

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

export function mimeTypeToExtension(str: string) {
  return mimeExtensions[str] || str.split("/")[1] || "txt";
}

export function localeReplacer(str: string, ...args: any[]) {
  return str.replace(/\{(\d+)\}/g, (match, indexMatch) => (args[indexMatch] || "?"));
}

/**
 * gets the actual format given a string format
 * this is basically only used to avoid inconsistencies
 * regarding input to create a mask, and it only happens with
 * time basically, but here we can override masks
 * @param value the format string
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

export function getLocalizedTimeFormat(normalize: boolean) {
  const LT = (Moment.localeData() as any)._longDateFormat.LT;
  if (!normalize) {
    return LT;
  }
  return LT;
}

export function getLocalizedDateFormat(normalize: boolean) {
  const L = (Moment.localeData() as any)._longDateFormat.L;
  if (!normalize) {
    return L;
  }
  return getNormalizedDateTimeFormat(L);
}

export function getLocalizedDateTimeFormat(normalize: boolean) {
  return getLocalizedDateFormat(normalize) + " " + getLocalizedTimeFormat(normalize);
}

export const DOMWindow = JSDOM ? (new JSDOM("")).window : window;
export const DOMPurify = createDOMPurify(DOMWindow);
