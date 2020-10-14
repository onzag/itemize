/**
 * Contains general utility functions to be used within the itemize app
 *
 * @packageDocumentation
 */

import Moment from "moment";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { FILE_SUPPORTED_IMAGE_TYPES } from "./constants";
import { IGQLFile } from "./gql-querier";
import ItemDefinition from "./base/Root/Module/ItemDefinition";
import Include from "./base/Root/Module/ItemDefinition/Include";
import PropertyDefinition from "./base/Root/Module/ItemDefinition/PropertyDefinition";

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

export function getLocalizedTimeFormat() {
  const LT = (Moment.localeData() as any)._longDateFormat.LT;
  return LT;
}

export function getLocalizedDateFormat() {
  const L = (Moment.localeData() as any)._longDateFormat.L;
  return L;
}

export function getLocalizedDateTimeFormat() {
  return getLocalizedDateFormat() + " " + getLocalizedTimeFormat();
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
  id: number,
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
  id: number,
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

export const DOMWindow = JSDOM ? (new JSDOM("")).window : window;
export const DOMPurify = createDOMPurify(DOMWindow);

function processTemplateNodeInitialization(
  node: HTMLElement,
  disableHTMLTemplating: boolean,
  templateArgsContext: any,
  rootTemplateArgs: any,
  templateArgsPath: string[],
) {
  let leaveNodeChildrenUnhandled: boolean = false;
  // has a text handler
  const textKey = node.dataset.text;
  if (textKey) {
    const text: string = templateArgsContext[textKey];
    if (typeof text !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.textContent = text;
    }
  }

  // set the href key
  const hrefKey = node.dataset.href;
  if (hrefKey) {
    const href: string = templateArgsContext[hrefKey];
    if (typeof href !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.setAttribute("href", href);
    }
  }

  // has a HTML handler
  const htmlKey = node.dataset.html;
  if (!disableHTMLTemplating && htmlKey) {
    const html: string = node[htmlKey];

    if (typeof html !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.innerHTML = html;
    }
  }

  // ui handling
  const uiKey = node.dataset.uiHandler;
  if (uiKey) {
    leaveNodeChildrenUnhandled = true;
    const handler = templateArgsContext[uiKey];
    if (typeof handler === "undefined") {
      // we do not log because this will hit the server side, the client side will see it anyway
      // console.warn("Handler is not specified at data-ui-handler=" + JSON.stringify(handlerToUseKey));
    } else if (handler && handler.initialize && typeof handler.initialize === "function") {
      const resultNode = handler.initialize(node, DOMWindow, templateArgsContext, rootTemplateArgs);
      resultNode.setAttribute("data-ui-handler", uiKey);
      resultNode.setAttribute("data-ui-handler-context", JSON.stringify(templateArgsPath));
      node.parentElement.replaceChild(resultNode, node);
    }
  }

  return leaveNodeChildrenUnhandled;
}

/**
 * Processes the intialization of a template, by processing
 * the child nodes of a given node
 * @param node the node we are working with
 * @param disableHTMLTemplating whether to disable data-html
 * @param templateArgsContext the template args we are currently working with
 * @param rootTemplateArgs the template args of the root
 * @param templateArgsPath the template args of the path
 */
export function processTemplateInitialization(
  node: HTMLElement,
  disableHTMLTemplating: boolean,
  templateArgsContext: any,
  rootTemplateArgs: any,
  templateArgsPath: string[],
) {
  // first we check if we have child nodes to loop
  node.hasChildNodes() && node.childNodes.forEach((childNode) => {
    // we consider it an html element
    const childNodeASHTMLElement = childNode as HTMLElement;

    // so the args we are working with, this is going to be
    // the context we will be working with
    let templateArgsNewContext = templateArgsContext;
    let templateArgsNewPath = templateArgsPath;

    // and whether we should leave the children of this
    // node unhandled
    let leaveNodeChildrenUnhandled: boolean = false;

    // cheap cheesy way to check if we are working with a HTML Element
    // that has a dataset in it, no need for fancy checks since we are only interested
    // in such elements and we can be sure we have an html element
    if (typeof childNodeASHTMLElement.dataset !== "undefined" && childNodeASHTMLElement.dataset) {

      // update the context for children
      const contextKey = childNodeASHTMLElement.dataset.context;
      if (contextKey) {
        templateArgsPath = [...templateArgsPath, contextKey];
        templateArgsNewContext = templateArgsContext[contextKey];
      }

      // so now we got to see if we have a for loop
      const forEachKey = childNodeASHTMLElement.dataset.forEach;
      if (forEachKey) {
        // we will unhandle then
        leaveNodeChildrenUnhandled = true;
        // and this is what we are looping for
        const forArgument = templateArgsNewContext[forEachKey];
        // we grab the next sibling so that we can properly repeat
        const nextSibling = childNodeASHTMLElement.nextSibling;

        // so we loop
        forArgument.forEach((forEachContext: any, index: number) => {
          // now we make a clone of what we are looping for
          const clone = childNodeASHTMLElement.cloneNode(true) as HTMLElement;
          // if we have a next sibling
          if (nextSibling) {
            // we insert before it
            childNodeASHTMLElement.parentElement.insertBefore(clone, nextSibling);
          } else {
            childNodeASHTMLElement.parentElement.appendChild(clone);
          }

          // now we got to update our context path for this specific one
          const forEachContextPath = [...templateArgsNewPath, index.toString()];

          // and now we call for the initialization of this node itself
          const leaveChildrenNodeChildrenUnhandled = processTemplateNodeInitialization(
            clone,
            disableHTMLTemplating,
            forEachContext,
            rootTemplateArgs,
            forEachContextPath,
          );

          // if we don't expect children to be unhandled
          if (!leaveChildrenNodeChildrenUnhandled && clone.hasChildNodes()) {
            // we handle them per clone result
            processTemplateInitialization(
              clone,
              disableHTMLTemplating,
              forEachContext,
              rootTemplateArgs,
              forEachContextPath,
            );
          }
        });

        // now we can remove the original
        childNodeASHTMLElement.parentElement.removeChild(childNodeASHTMLElement);
      } else {
        // otherwise if we have no for loop, we just process the node itself
        leaveNodeChildrenUnhandled = processTemplateNodeInitialization(
          childNodeASHTMLElement,
          disableHTMLTemplating,
          templateArgsNewContext,
          rootTemplateArgs,
          templateArgsNewPath,
        );
      }
    }

    // and if we did not decide to leave the children of the node unhandled and
    // we have children
    if (!leaveNodeChildrenUnhandled && childNodeASHTMLElement.hasChildNodes()) {
      // lets recurse into them for their processing
      processTemplateInitialization(
        childNodeASHTMLElement,
        disableHTMLTemplating,
        templateArgsNewContext,
        rootTemplateArgs,
        templateArgsNewPath,
      );
    }
  });
}

/**
 * Performs a simple template rendering
 * from a string based HTML template based on the text specs
 * of itemize, there's no sanitization, no processing of files
 * simple and raw templating process
 * 
 * @param template the template in question
 * @param args the arguments
 */
export function renderTemplate(
  template: string,
  args: any,
): string {
  const cheapdiv = DOMWindow.document.createElement("div");
  cheapdiv.innerHTML = template;

  processTemplateInitialization(
    cheapdiv,
    false,
    args,
    args,
    [],
  );

  return cheapdiv.innerHTML;
}