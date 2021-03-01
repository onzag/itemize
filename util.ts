/**
 * Contains general utility functions to be used within the itemize app
 *
 * @module
 */

import MomentDef from "moment";
import { JSDOM as JSDOMDef } from "jsdom";
import createDOMPurify from "dompurify";
import { DATETIME_FORMAT, DATE_FORMAT, FILE_SUPPORTED_IMAGE_TYPES, TIME_FORMAT } from "./constants";
import { IGQLFile } from "./gql-querier";
import ItemDefinition from "./base/Root/Module/ItemDefinition";
import Include from "./base/Root/Module/ItemDefinition/Include";
import PropertyDefinition from "./base/Root/Module/ItemDefinition/PropertyDefinition";
import type { IPropertyDefinitionSupportedCurrencyType } from "./base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
import type { IPropertyDefinitionSupportedUnitType } from "./base/Root/Module/ItemDefinition/PropertyDefinition/types/unit";
import { IPropertyDefinitionSupportedLocationType } from "./base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { PropertyDefinitionSupportedFileType } from "./base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import convert from "convert-units";

export const Moment = MomentDef;
export const JSDOM = JSDOMDef;

/**
 * @ignore
 */
const TIMED_FN_WAIT_LIST: {
  [id: string]: NodeJS.Timeout;
} = {};

type TimedExecutedFn = () => void;

/**
 * Delays the execution of a function by given milliseconds
 * ensure these do not stack together
 * @param fn the function in question
 * @param id the id to use
 * @param ms the milliseconds delay before submitting
 * @returns a function without parameters
 */
export function delayedExecutionFn(fn: any, id: string, ms: number): TimedExecutedFn {
  return () => {
    if (TIMED_FN_WAIT_LIST[id]) {
      clearTimeout(TIMED_FN_WAIT_LIST[id]);
    }

    TIMED_FN_WAIT_LIST[id] = setTimeout(() => {
      delete TIMED_FN_WAIT_LIST[id];
      fn();
    }, ms);
  }
}

/**
 * capitalizes a string
 * @param str the string to capitalize
 */
export function capitalize(str: string) {
  if (!str) {
    return str;
  }
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
 * Provides today
 */
export function getToday() {
  return Moment(new Date()).format(DATE_FORMAT);
}

/**
 * Provides now
 */
export function getNow() {
  return Moment(new Date()).format(DATETIME_FORMAT);
}

/**
 * Provides time
 */
export function getTime() {
  return Moment(new Date()).format(TIME_FORMAT);
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

export function processAccepts(accept: string, isExpectingImages?: boolean) {
  return (
    accept ||
    (isExpectingImages ? FILE_SUPPORTED_IMAGE_TYPES.join(",") : "*")
  ).replace(/image(?!\/)/g, FILE_SUPPORTED_IMAGE_TYPES.join(","));
}

/**
 * Checks whether the file type exists in the accept property
 * @param fileType the file.type
 * @param accept the accept property
 */
export function checkFileInAccepts(fileType: string, accept: string) {
  const typeRegex = new RegExp(accept.replace(/\*/g, '.\*').replace(/\,/g, '|').replace(/\+/g, "\\+"));
  return typeRegex.test(fileType);
}

/**
 * Converts a mime type to an extension using a known extension list
 * @param str the string that represents the mime type
 * @returns an extension or txt if it doesn't know
 */
export function mimeTypeToExtension(str: string) {
  const expectedExt = mimeExtensions[str];
  if (expectedExt) {
    return expectedExt;
  }
  return (str.split("/")[1] || "txt").substr(0, 3);
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
  return str.replace(/\{(\d+)\}/g, (match, indexMatch) => {
    if (typeof args[indexMatch] === "undefined") {
      return "?";
    } else if (args[indexMatch] === null) {
      return "";
    }
    return args[indexMatch].toString();
  });
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

export function getLocalizedTimeFormat(locale: string) {
  Moment.locale(locale);
  const LT = (Moment.localeData() as any)._longDateFormat.LT;
  return LT;
}

export function getLocalizedDateFormat(locale: string) {
  Moment.locale(locale);
  const L = (Moment.localeData() as any)._longDateFormat.L;
  return L;
}

export function getLocalizedDateTimeFormat(locale: string) {
  return getLocalizedDateFormat(locale) + " " + getLocalizedTimeFormat(locale);
}

export function formatDate(locale: string, date: string) {
  const format = getLocalizedDateFormat(locale);
  return parseDate(date).format(format);
}

export function formatTime(locale: string, time: string) {
  const format = getLocalizedTimeFormat(locale);
  return parseTime(time).format(format);
}

export function formatDateTime(locale: string, datetime: string) {
  const format = getLocalizedDateTimeFormat(locale);
  return parseDateTime(datetime).format(format);
}

export function parseDate(date: string) {
  return Moment(date, DATE_FORMAT);
}

export function parseTime(time: string) {
  return Moment(time, TIME_FORMAT);
}

export function parseDateTime(datetime: string) {
  return Moment(datetime, DATETIME_FORMAT);
}

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
export function fileURLAbsoluter(
  domain: string,
  containerHostnamePrefixes: {
    [key: string]: string,
  },
  file: IGQLFile,
  itemDefinition: ItemDefinition,
  id: string,
  version: string,
  containerId: string,
  include: Include,
  property: PropertyDefinition,
  cacheable: boolean,
): IGQLFile {
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

  let prefix: string = containerHostnamePrefixes[containerId];
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
    url:
      prefix +
      (
        property.isExtension() ?
          itemDefinition.getParentModule().getQualifiedPathName() :
          itemDefinition.getQualifiedPathName()
      ) + "/" +
      id + "." + (version || "") + "/" +
      (include ? include.getId() + "/" : "") +
      property.getId() + "/" +
      file.id + "/" + file.url +
      (cacheable ? "?sw-cacheable=true" : ""),
  }
}

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
export function fileArrayURLAbsoluter(
  domain: string,
  containerHostnamePrefixes: {
    [key: string]: string,
  },
  files: IGQLFile[],
  itemDefinition: ItemDefinition,
  id: string,
  version: string,
  containerId: string,
  include: Include,
  property: PropertyDefinition,
  cacheable: boolean,
) {
  if (files === null) {
    return null;
  }
  return files.map(
    (file) =>
      fileURLAbsoluter(domain, containerHostnamePrefixes, file, itemDefinition, id, version, containerId, include, property, cacheable)
  );
}

/**
 * Creates a currency value to use with prefills and setters
 * @param value the currency numeric value
 * @param currency the currency itself
 */
export function createCurrencyValue(value: number, currency: string): IPropertyDefinitionSupportedCurrencyType {
  return {
    value,
    currency,
  };
}

/**
 * Creates a date value to be used with prefills and setters
 * @param value 
 */
export function createDateValue(value: Date | string) {
  return Moment(value).format(DATE_FORMAT);
}

/**
 * Creates a datetime value to be used with prefills and setters
 * @param value 
 */
export function createDateTimeValue(value: Date | string) {
  return Moment(value).format(DATETIME_FORMAT);
}

/**
 * Creates a time value to be used with prefills and setters
 * @param value 
 */
export function createTimeValue(value: Date | string) {
  return Moment(value).format(TIME_FORMAT);
}

/**
 * Creates an unit value to be used with prefills and setters
 * @param value 
 * @param unit 
 * @param normalizedUnit 
 */
export function createUnitValue(value: number, unit: string, normalizedUnit: string): IPropertyDefinitionSupportedUnitType {
  return {
    value,
    unit,
    normalizedValue: convert(value)
      .from(unit as any).to(normalizedUnit as any),
    normalizedUnit,
  };
}

/**
 * Creates an location value to be used with prefills and setters
 * @param txt 
 * @param atxt 
 * @param lat 
 * @param lng 
 * @param id non necessary if not planning to submit
 */
export function createLocationValue(txt: string, atxt: string, lat?: number, lng?: number, id?: string): IPropertyDefinitionSupportedLocationType {
  return {
    atxt,
    txt,
    lat: lat || 0,
    lng: lng || 0,
    id: id || "CUSTOM-" + (lat || 0) + "." + (lng || 0),
  };
}

/**
 * A fake file value that you should not submit as it's an invalid value
 * you can use this to setup a placeholder of sorts
 * @param id 
 * @param name 
 * @param url 
 * @param size
 * @param type
 */
export function createFakeFileValue(id: string, name: string, url: string, type?: string, size?: number): PropertyDefinitionSupportedFileType {
  return {
    id,
    metadata: "FAKE_FILE",
    name,
    size: typeof size === "number" ? size : null,
    type: type || null,
    url,
  }
}

/**
 * Creates a real image value to prefill with that can be used to generate
 * values that can be submitted
 * @param id 
 * @param file 
 * @param objectURL 
 * @param imageMetadataGeneratorInfo 
 */
export function createRealFileValue(
  id: string,
  file: File,
  objectURL: string,
  imageMetadataGeneratorInfo?: {
    property: PropertyDefinition;
    width: number;
    height: number;
  }
): PropertyDefinitionSupportedFileType {
  const value: PropertyDefinitionSupportedFileType = {
    name: file.name,
    type: file.type,
    id,
    url: objectURL,
    size: file.size,
    src: file,
    metadata: null,
  };

  if (imageMetadataGeneratorInfo) {
    const dimensions: string = imageMetadataGeneratorInfo.property.getSpecialProperty("dimensions") || "";
    const dimensionNames = dimensions.split(";").map((d) => d.trim().split(" ")[0]);
    value.metadata = imageMetadataGeneratorInfo.width + "x" + imageMetadataGeneratorInfo.height + ";" + dimensionNames.join(",");
  }

  return value;
}

export const DOMWindow = JSDOM ? (new JSDOM("")).window : window;
export const DOMPurify = createDOMPurify(DOMWindow);
