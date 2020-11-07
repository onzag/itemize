import { IPropertyDefinitionSupportedSingleFilesType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { DOMPurify, fileURLAbsoluter, DOMWindow } from "../../../util";
import { imageSrcSetRetriever } from "../../components/util";
import { IConfigRawJSONDataType } from "../../../config";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import { IRootLevelDocument, serialize as oserialize, deserialize as odeserialize } from "./serializer";
import equals from "deep-equal";


/**
 * Sanitazation standard configuraton
 */
export const PROPERTY_VIEW_SANITIZE_CONFIG = {
  // iframes are allowed, no sources are expected from the server side anyway
  ADD_TAGS: ["iframe"],
  // but src are still allowed here for a simple reason, as they are defined by the post processing hook
  ADD_ATTR: ["frameborder", "allow", "allowfullscreen", "scrolling", "src", "spellcheck", "contenteditable"],
  // and these can be blob so we must allow them
  ALLOW_UNKNOWN_PROTOCOLS: true,
};

/**
 * The list of allowed classes for text as defined by the text-specs
 * this will prevent users from class injection
 */
export const ALLOWED_CLASSES = [
  "image", "image-container", "image-pad", "video", "video-container",
  "file", "file-container", "file-icon", "file-name", "file-extension", "file-size",
  "container",
]

export const RICH_TEXT_CLASS_PREFIX = "rich-text--";
export const CONTAINER_CLASS_PREFIX = "container-";
export const CUSTOM_CLASS_PREFIX = "custom-";

/**
 * The list of allowed prefixes
 */
export const ALLOWED_CLASSES_PREFIXES = [
  RICH_TEXT_CLASS_PREFIX, CONTAINER_CLASS_PREFIX, CUSTOM_CLASS_PREFIX,
];

/**
 * Template events that are supported these
 * exist as data-on-[event]="{{event}}"
 */
export const SUPPORTED_TEMPLATE_EVENTS = [
  "click",
  "blur",
  "focus",
  "input",
  "keydown",
  "keypress",
  "keyup",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseover",
  "mouseout",
  "mouseup",
  "mousewheel",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "wheel",
];

/**
 * Styles that might pop in when using templates
 * exist as data-[supportedTemplateStyle]-style="position:absolute;"
 */
export const SUPPORTED_TEMPLATE_STYLES = [
  "hover",
  "active",
];

/**
 * Modify the content of the children based on
 * the template args
 */
export const SUPPORTED_CONTENT_MODIFIERS = [
  "text",
  "html",
];

/**
 * Custom handlers to modify the information within the system
 * use args
 */
export const SUPPORTED_HANDLERS = [
  "ui",
];

interface IPostProcessingContext {
  mediaProperty: PropertyDefinition;
  currentFiles: IPropertyDefinitionSupportedSingleFilesType[];
  config: IConfigRawJSONDataType;
  itemDefinition: ItemDefinition;
  include: Include;
  forId: number;
  forVersion: string;
  containerId: string;
  cacheFiles: boolean;
}

interface ISanitizeOptions {
  supportsImages: boolean;
  supportsVideos: boolean;
  supportsFiles: boolean;
  supportsLinks: boolean;
  supportsExternalLinks: boolean;
  supportsContainers: boolean;
  supportsCustom: boolean;
  supportsQuote: boolean;
  supportsTitle: boolean;
  supportsRichClasses: boolean;
}

/**
 * sanitizes and postprocesses a given
 * value for an item definition property
 * in a way that it makes it directly usable and can
 * then be passed to the serializer or displayed as it is
 * @param context 
 * @param value 
 */
export function sanitize(
  context: IPostProcessingContext,
  options: ISanitizeOptions,
  value: string,
) {
  DOMPurify.addHook("afterSanitizeElements", postprocess.bind(this, context, options));
  const newValue = DOMPurify.sanitize(value, PROPERTY_VIEW_SANITIZE_CONFIG);
  DOMPurify.removeAllHooks();
  return newValue;
}

/**
 * clean all attributes in a html element
 * @param node the node to clean for
 */
function cleanAllAttribs(node: HTMLElement) {
  Array.prototype.slice.call(node.attributes).forEach((attr: any) => {
    node.removeAttribute(attr.name);
  });
}

/**
 * The postprocessing hook that cleans and sets the attributes
 * right for the rich text in order to follow the standards
 * given by the text-specs.md file
 *
 * @param mediaProperty the property we are used as media property
 * @param currentFiles the current files
 * @param supportsImages whether we are supporting images
 * @param supportsVideos whether we are supporting videos
 * @param supportsFiles whether we are supporting files
 * @param node the given node in question we are currently processing, this is a recursive
 * function after all
 * @returns a node
 */
export function postprocess(
  context: IPostProcessingContext,
  options: ISanitizeOptions,
  node: HTMLElement,
) {
  if (node.tagName === "IFRAME") {
    if (options.supportsVideos) {
      const videoSrc = node.dataset.videoSrc || "";
      const origin = node.dataset.videoOrigin || "";
      cleanAllAttribs(node);

      (node as HTMLIFrameElement).allowFullscreen = true;

      // src
      if (origin === "vimeo") {
        node.setAttribute("src", `https://player.vimeo.com/video/${videoSrc}?title=0&byline=0&portrait=0&badge=0`);
      } else if (origin === "youtube") {
        node.setAttribute("src", `https://youtube.com/embed/${videoSrc}?rel=0`);
      }

      // frameborder
      (node as HTMLIFrameElement).frameBorder = "0";

      // data-video-src
      node.dataset.videoSrc = videoSrc;

      // data-video-origin
      node.dataset.videoOrigin = origin;

      // allowfullscreen
      (node as HTMLIFrameElement).allowFullscreen = true;
    } else {
      node.parentElement && node.parentElement.removeChild(node);
    }
  } else if (node.tagName === "IMG") {
    if (options.supportsImages) {
      const srcId = node.dataset.srcId;
      const currentFile = context.currentFiles && context.currentFiles.find((f) => f.id === srcId);
      const alt = (node as HTMLImageElement).alt || "";
      const srcHeight = node.dataset.srcHeight;
      const srcWidth = node.dataset.srcWidth;
      cleanAllAttribs(node);

      if (!srcId || !currentFile) {
        node.parentElement && node.parentElement.removeChild(node);
      } else {
        const domain = process.env.NODE_ENV === "production" ? context.config.productionHostname : context.config.developmentHostname;
        const absolutedFile = fileURLAbsoluter(
          domain,
          context.config.containersHostnamePrefixes,
          currentFile,
          context.itemDefinition,
          context.forId,
          context.forVersion || null,
          context.containerId,
          context.include,
          context.mediaProperty,
          context.cacheFiles,
        );
        const srcset = imageSrcSetRetriever(absolutedFile, context.mediaProperty);

        // srcset
        node.setAttribute("srcset", srcset);
        // src
        node.setAttribute("src", absolutedFile ? absolutedFile.url : "/rest/resource/image-fail.svg");
        // sizes
        node.setAttribute("sizes", "70vw");
        // data-src-width
        node.dataset.srcWidth = srcWidth;
        // data-src-id
        node.dataset.srcId = srcId;
        // data-src-height
        node.dataset.srcHeight = srcHeight;
        // alt
        (node as HTMLImageElement).alt = alt;
      }
    } else {
      node.parentElement && node.parentElement.removeChild(node);
    }
  } else if (node.className === "file") {
    if (options.supportsFiles) {
      const srcId = node.dataset.srcId;
      const src = node.dataset.src;
      cleanAllAttribs(node);
      const currentFile = context.currentFiles && context.currentFiles.find((f) => f.id === srcId);
      
      if (currentFile) {
        // spellcheck
        node.spellcheck = false;

        const domain = process.env.NODE_ENV === "production" ? context.config.productionHostname : context.config.developmentHostname;
        const absolutedFile = fileURLAbsoluter(
          domain,
          context.config.containersHostnamePrefixes,
          currentFile,
          context.itemDefinition,
          context.forId,
          context.forVersion || null,
          context.containerId,
          context.include,
          context.mediaProperty,
          context.cacheFiles,
        );

        // data-src-id
        node.dataset.srcId = srcId;

        // data-src
        if (absolutedFile) {
          node.dataset.src = absolutedFile.url;
        } else {
          node.dataset.src = src;
        }

        // contenteditable
        node.contentEditable = "false";
        // class
        node.className = "file";
      } else {
        node.parentElement && node.parentElement.removeChild(node);
      }
    } else {
      node.parentElement && node.parentElement.removeChild(node);
    }
  }

  const style = node.getAttribute && node.getAttribute("style");
  if (style) {
    const removeStyle =
      style.indexOf("javascript") !== -1 ||
      style.indexOf("http") !== -1 ||
      style.indexOf("://") !== -1 ||
      node.style.position === "fixed";
    if (removeStyle) {
      node.removeAttribute("style");
    }
  }

  if (node.dataset) {
    SUPPORTED_TEMPLATE_STYLES.forEach((attr) => {
      const templateEventStyle = node.dataset[attr + "Style"];
      if (templateEventStyle) {
        const removeStyle =
          templateEventStyle.indexOf("javascript") !== -1 ||
          templateEventStyle.indexOf("http") !== -1 ||
          templateEventStyle.indexOf("://") !== -1 ||
          templateEventStyle.indexOf("fixed") !== -1;
        if (removeStyle) {
          delete node.dataset[attr + "Style"];
        }
      }
    });
  }

  const classList = node.classList;
  if (classList) {
    classList.forEach((className) => {
      if (!ALLOWED_CLASSES.includes(className)) {
        const isPrefixedByAValidPrefix = ALLOWED_CLASSES_PREFIXES.some((prefix) => className.indexOf(prefix) === 0);
        if (!isPrefixedByAValidPrefix) {
          node.classList.remove(className);
        }
      }
    });
  }

  const id = node.id;
  if (id) {
    node.removeAttribute("id");
  }

  return node;
}

/**
 * Serializes an internal itemize structure back into
 * HTML
 */
export function serialize(document: IRootLevelDocument) {
  return oserialize(document);
}

/**
 * Deserializes an HTML string or DOM element that should have been previously
 * sanitized into an internally used document itemize structure that can be used
 * for analysis or constructing rich text editors
 * 
 * Please ensure to have sanitized the content and
 * postprocessing it before deserializing it if you
 * don't trust it but also to setup urls for
 * the given content
 */
export function deserialize(html: string | Node[]) {
  return odeserialize(html);
}


/**
 * @ignore
 */
const NULL_DOCUMENT = deserialize(null);

/**
 * Compares a given html and the document that is used in order to determine
 * whether they are actually the same value
 * 
 * This is a method that tries to be as cheap as possible and it uses id
 * only in order to perform equality, this means that this method is not
 * 100% certain
 * 
 * The method is guaranteed to return true if they are equal, but it might
 * return false in cases where they are still equal
 * 
 * @param html 
 * @param document 
 */
export function compareLoselyEquals(html: string | Node[], document: IRootLevelDocument) {
  if (html === null) {
    return equals(NULL_DOCUMENT.children, document.children);
  }

  let id: string = null;
  if (typeof html === "string") {
    const cheapdiv = DOMWindow.document.createElement("div");
    cheapdiv.innerHTML = html;
    id = cheapdiv.childNodes[0] && (cheapdiv.childNodes[0] as HTMLElement).id;
  } else {
    id = html[0] && (html[0] as HTMLElement).id;
  }

  if (id === document.id) {
    return true;
  }

  return false;
}

/**
 * This is like a deserialization process where a deserialized and
 * santized data input is converted into react
 * 
 * this is mainly used to convert the raw text as it is into react
 * and not for usage for templating
 * 
 * The property should be a template for this to be usable
 */
export function reactify() {

}

/**
 * Converts a template into a react component it takes a serialized
 * value as an input and then makes this be usable and react components
 * can be stacked inside it
 * 
 * The property should be a template for this to be usable
 */
export function reactifyTemplate() {

}