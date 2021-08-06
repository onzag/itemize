import React from "react";
import { IPropertyDefinitionSupportedSingleFilesType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { DOMPurify, fileURLAbsoluter } from "../../../util";
import { imageSrcSetRetriever } from "../../components/util";
import { IConfigRawJSONDataType } from "../../../config";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import { IRootLevelDocument, serialize as oserialize, deserialize as odeserialize, RichElement, SERIALIZATION_REGISTRY } from "./serializer";
import { IText } from "./serializer/types/text";
import { DOMWindow } from "../../../util";
import { TemplateArgs } from "./serializer/template-args";

/**
 * Sanitazation standard configuraton
 */
export const SANITIZE_CONFIG = {
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
export const CONTAINER_CLASS = "container";
export const CONTAINER_CLASS_PREFIX = CONTAINER_CLASS + "-";
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

/**
 * Represents the context that is used in order
 * to postprocess a santized entry so that it can
 * be constructed into html that can be
 * displayed to the user
 */
interface IPostProcessingContext {
  /**
   * A related media property that is assigned
   */
  mediaProperty: PropertyDefinition;
  /**
   * The current files that media property is containing
   * in the given slot
   */
  currentFiles: IPropertyDefinitionSupportedSingleFilesType[];
  /**
   * The configuration the system is running at
   */
  config: IConfigRawJSONDataType;
  /**
   * The item definition in question the media property
   * and the current property the value is given
   * was taken from, remember this is used to create the
   * URL
   */
  itemDefinition: ItemDefinition;
  /**
   * The include it came from, this is used to create the URL
   * as well
   */
  include: Include;
  /**
   * The id in question, used to create the url
   */
  forId: string;
  /**
   * The version in question, used to create the url
   */
  forVersion: string;
  /**
   * The container id, used to extract the external url
   * for the given files
   */
  containerId: string;
  /**
   * Whether files should be cached, basically appends the sw-cacheable
   * so that the service workers cache it
   */
  cacheFiles: boolean;
}

/**
 * The feature set that is supported in a given
 * sanitization or other context
 */
export interface IFeatureSupportOptions {
  /**
   * Whether it supports images
   */
  supportsImages: boolean;
  /**
   * The accept type that the input should accept
   * for filling the image type, it can be null, if
   * it doesn't support images, or when viewing
   */
  supportsImagesAccept: string;
  /**
   * Whether it supports videos
   */
  supportsVideos: boolean;
  /**
   * Whether files are supporeted
   */
  supportsFiles: boolean;
  /**
   * The accept type that the input should accept
   * for filling the file type, it can be null, if
   * it doesn't support files, or when viewing
   */
  supportsFilesAccept: string;
  /**
   * Whether links are acceptable
   */
  supportsLinks: boolean;
  /**
   * Whether external links specifying an external
   * protocol outside the current page are acceptable
   */
  supportsExternalLinks: boolean;
  /**
   * Whether lists are acceptable, ul, ol etc...
   */
  supportsLists: boolean;
  /**
   * Whether quotes are acceptable
   */
  supportsQuote: boolean;
  /**
   * Whether titles are acceptable
   */
  supportsTitle: boolean;
  /**
   * Whether custom styles using the style tag
   * are acceptable
   */
  supportsCustomStyles: boolean;
  /**
   * Whether templating is supported
   */
  supportsTemplating: boolean;

  /**
   * Whether we support customs
   */
  supportsCustom: boolean;
  /**
   * the supported custom elements
   */
  supportedCustoms: string[];
  /**
   * whether we support containers
   */
  supportsContainers: boolean;
  /**
   * The supported containers, might be null
   * if all supported, note that this will
   * not affect the base container
   */
  supportedContainers: string[];
  /**
   * whether rich classes are supported
   */
  supportsRichClasses: boolean;
  /**
   * The supported rich classes, might be null
   * if all supported
   */
  supportedRichClasses: string[];
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
  options: IFeatureSupportOptions,
  value: string,
) {
  DOMPurify.addHook("afterSanitizeElements", postprocess.bind(this, context, options));
  const newValue = DOMPurify.sanitize(value, SANITIZE_CONFIG);
  DOMPurify.removeAllHooks();
  return newValue;
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
  options: IFeatureSupportOptions,
  node: HTMLElement,
) {
  if (node.tagName === "IFRAME") {
    if (options.supportsVideos) {
      const videoSrc = node.dataset.videoSrc || "";
      const origin = node.dataset.videoOrigin || "";

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
      const sizes = (node as HTMLImageElement).sizes || "70vw";

      node.removeAttribute("loading");

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
        node.setAttribute("sizes", sizes);
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

  if (node.tagName === "A" && (node.hasAttribute("href") || node.hasAttribute("data-href"))) {
    if (!options.supportsLinks) {
      node.removeAttribute("href");
      node.removeAttribute("data-href");
    } else if (!options.supportsExternalLinks) {
      const href = node.getAttribute("href");
      if (href.indexOf("http") !== -1 || href.indexOf("://") !== -1) {
        node.removeAttribute("href");
      }
    }
  }

  if (node.classList) {
    const classList = Array.from(node.classList);

    classList.forEach((className) => {
      if (!ALLOWED_CLASSES.includes(className)) {
        const isPrefixedByAValidPrefix = ALLOWED_CLASSES_PREFIXES.some((prefix) => className.indexOf(prefix) === 0);
        if (!isPrefixedByAValidPrefix) {
          node.classList.remove(className);
          return;
        }
      }

      if (className.startsWith(CONTAINER_CLASS)) {
        if (!options.supportsContainers) {
          node.classList.remove(className);
        } else if (options.supportedContainers) {
          !options.supportedContainers.includes(className.substr(CONTAINER_CLASS_PREFIX.length)) && node.classList.remove(className);
        }
      } else if (className.startsWith(CUSTOM_CLASS_PREFIX)) {
        if (!options.supportsCustom) {
          node.classList.remove(className);
        } else if (options.supportedCustoms) {
          !options.supportedCustoms.includes(className.substr(CUSTOM_CLASS_PREFIX.length)) && node.classList.remove(className);
        }
      } else if (className.startsWith(RICH_TEXT_CLASS_PREFIX)) {
        if (!options.supportsRichClasses) {
          node.classList.remove(className);
        } else if (options.supportedRichClasses) {
          !options.supportedRichClasses.includes(className.substr(RICH_TEXT_CLASS_PREFIX.length)) && node.classList.remove(className);
        }
      }
    });
  }

  if (node.tagName === "QUOTE" && !options.supportsQuote) {
    node.parentElement && node.parentElement.removeChild(node);
  }

  if (["UL", "OL", "LI"].includes(node.tagName) && !options.supportsLists) {
    node.parentElement && node.parentElement.removeChild(node);
  }

  if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName) && !options.supportsTitle) {
    node.parentElement && node.parentElement.removeChild(node);
  }

  if (node.style && !options.supportsCustomStyles) {
    node.removeAttribute("style");
    SUPPORTED_TEMPLATE_STYLES.forEach((attr) => {
      delete node.dataset[attr + "Style"];
    });
  } else {
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
export function serialize(root: IRootLevelDocument) {
  return oserialize(root);
}

/**
 * Serializes but returns the string representation
 * rather than a bunch of nodes
 * @param root 
 */
export function serializeString(root: IRootLevelDocument): string {
  const serialized = oserialize(root);
  if (typeof serialized === "string" || serialized === null) {
    return serialized as string;
  }
  return serialized.map((s) => s.outerHTML).join("");
}

/**
 * Counts the size of the document
 * @param root 
 */
export function countSize(root: IRootLevelDocument | RichElement | IText): number {
  if (typeof (root as IText).text === "string") {
    return (root as IText).text.length;
  }
  const counts = (root as IRootLevelDocument).children.map(countSize);
  if (counts.length === 0) {
    return 0;
  } else if (counts.length === 1) {
    return counts[0];
  }

  return counts.reduce((a, b) => a + b);
}

/**
 * Counts the words of the document
 * @param root 
 */
 export function countWords(root: IRootLevelDocument | RichElement | IText): number {
  if (typeof (root as IText).text === "string") {
    return (root as IText).text.split(" ").filter((v) => v !== "").length;
  }
  const counts = (root as IRootLevelDocument).children.map(countWords);
  if (counts.length === 0) {
    return 0;
  } else if (counts.length === 1) {
    return counts[0];
  }

  return counts.reduce((a, b) => a + b);
}

/**
 * Counts the size and words of the document
 * @param root 
 */
 export function countSizeAndWords(root: IRootLevelDocument | RichElement | IText): [number, number] {
  if (typeof (root as IText).text === "string") {
    return [
      (root as IText).text.length,
      (root as IText).text.split(" ").filter((v) => v !== "").length,
    ];
  }
  const results = (root as IRootLevelDocument).children.map(countSizeAndWords);
  if (results.length === 0) {
    return [0, 0];
  } else if (results.length === 1) {
    return results[0];
  }

  return results.reduce((a, b) => {
    return [a[0] + b[0], a[1] + b[1]];
  });
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
export function deserialize(html: string | Node[]) {
  return odeserialize(html);
}


/**
 * @ignore
 */
export const NULL_DOCUMENT = deserialize(null);

/**
 * Processes the initialization of a single node
 * @param node the node in questions
 * @param templateArgsContext the arg context we are currently in
 */
function processTemplateNodeInitialization(
  node: HTMLElement,
  templateArgsContext: any,
  templateArgsRootcontext: any,
) {
  const ifKey = node.dataset.if;
  if (ifKey) {
    const ifValue = templateArgsContext[ifKey];
    if (!ifValue) {
      node.parentElement.removeChild(node);
      return;
    }
  }

  // has a text handler
  const textKey = node.dataset.text;
  if (textKey) {
    const text: string = templateArgsContext[textKey] || templateArgsRootcontext[textKey];
    if (typeof text !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.textContent = text;
    }
  }

  // set the thref key
  const threfKey = node.dataset.href;
  if (threfKey) {
    const thref: string = templateArgsContext[threfKey] || templateArgsRootcontext[threfKey];
    if (typeof thref !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.setAttribute("href", thref);
    }
  }

  // has a HTML handler
  const htmlKey = node.dataset.html;
  if (htmlKey) {
    const html: string = templateArgsContext[htmlKey] || templateArgsRootcontext[htmlKey];

    if (typeof html !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.innerHTML = html;
    }
  }
}


/**
 * Processes the intialization of a template, by processing
 * the child nodes of a given node
 * @param node the node we are working with
 * @param templateArgsContext the template args we are currently working with
 */
function processTemplateInitialization(
  node: HTMLElement,
  templateArgsContext: any,
  templateArgsRootContext: any,
) {
  // first we check if we have child nodes to loop
  node.hasChildNodes() && node.childNodes.forEach((childNode) => {
    // we consider it an html element
    const childNodeASHTMLElement = childNode as HTMLElement;

    // so the args we are working with, this is going to be
    // the context we will be working with
    let templateArgsNewContext = templateArgsContext;

    // cheap cheesy way to check if we are working with a HTML Element
    // that has a dataset in it, no need for fancy checks since we are only interested
    // in such elements and we can be sure we have an html element
    if (typeof childNodeASHTMLElement.dataset !== "undefined" && childNodeASHTMLElement.dataset) {

      // update the context for children
      const contextKey = childNodeASHTMLElement.dataset.context;
      if (contextKey) {
        templateArgsNewContext = templateArgsNewContext[contextKey];
      }

      // so now we got to see if we have a for loop
      const forEachKey = childNodeASHTMLElement.dataset.forEach;
      if (forEachKey) {
        const ifKey = childNodeASHTMLElement.dataset.if;
        const ifValue = ifKey && templateArgsNewContext[ifKey];

        if (ifKey && !ifValue) {
          node.parentElement.removeChild(node);
        } else {
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

            // and now we call for the initialization of this node itself
            processTemplateNodeInitialization(
              clone,
              forEachContext,
              templateArgsRootContext,
            );

            // if we don't expect children to be unhandled
            if (clone.hasChildNodes()) {
              // we handle them per clone result
              processTemplateInitialization(
                clone,
                forEachContext,
                templateArgsRootContext,
              );
            }
          });

          // now we can remove the original
          childNodeASHTMLElement.parentElement.removeChild(childNodeASHTMLElement);
        }
      } else {
        // otherwise if we have no for loop, we just process the node itself
        processTemplateNodeInitialization(
          childNodeASHTMLElement,
          templateArgsNewContext,
          templateArgsRootContext,
        );
      }
    }

    // and if we did not decide to leave the children of the node unhandled and
    // we have children
    if (childNodeASHTMLElement.hasChildNodes()) {
      // lets recurse into them for their processing
      processTemplateInitialization(
        childNodeASHTMLElement,
        templateArgsNewContext,
        templateArgsRootContext,
      );
    }
  });
}

/**
 * Performs a simple template rendering
 * from a string based HTML template based on the text specs
 * 
 * Note that this method does not support UI Handlers
 * it is used for producing a string by doing a simple pass
 * on a template
 * 
 * It also does not support dynamic styles
 * 
 * If you want the template to render nicely you might want
 * to run it before over the sanitize function
 * 
 * eg. renderTemplate(sanitize(...), {...args})
 * 
 * for proper templates with full blown functionality you should
 * use the renderTemplateDynamically method
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
    args,
    args,
  );

  return cheapdiv.innerHTML;
}

/**
 * Compiles the template but it does as a react element in which
 * way it supports the whole range of the componentry, including
 * dynamic styles and UI handling
 * 
 * The property should be a template for this to be usable
 * 
 * eg. renderTemplateDynamically(deserialize(sanitize(...)), {...args})
 * 
 * note how this method differs from the renderTemplate method as it
 * takes a document instead
 * 
 * @param document the root level document
 * @param args the arguments to render the template with
 */
export function renderTemplateDynamically(
  document: IRootLevelDocument,
  args: TemplateArgs,
) {
  if (document === NULL_DOCUMENT) {
    return null;
  }

  const toReturn = (
    <>
      {
        document.children.map((c, index) => {
          return SERIALIZATION_REGISTRY.REACTIFY[c.type]({
            asTemplate: true,
            active: true,
            element: c,
            key: index,
            templateArgs: args,
            selected: false,
          });
        })
      }
    </>
  );

  if (args && args.wrapper) {
    return args.wrapper(toReturn);
  }

  return toReturn;
}
