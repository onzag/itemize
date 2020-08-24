/**
 * Contains the property view text handler as well as some other
 * functionality that is used for handling text
 * @packageDocumentation
 */

import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { DOMPurify, fileURLAbsoluter } from "../../../../util";
import equals from "deep-equal";
import { PropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { PropertyDefinitionSupportedFilesType, IPropertyDefinitionSupportedSingleFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { imageSrcSetRetriever } from "../../../components/util";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";

/**
 * The property view renderer props as it requires the properties
 * note that this renderer is only used for html and plain, but not for the default
 * null subtype
 */
export interface IPropertyViewTextRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedTextType> {
  /**
   * Whether it is rich text, as in its subtype is html
   */
  isRichText: boolean;
  /**
   * Whether it is type html or plain
   */
  subtype: "html" | "plain";
}

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
]

/**
 * The list of allowed prefixes
 */
export const ALLOWED_CLASSES_PREFIXES = [
  "rich-text--",
];

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
 * @param relatedProperty the property we are used as media property
 * @param currentFiles the current files
 * @param supportsImages whether we are supporting images
 * @param supportsVideos whether we are supporting videos
 * @param supportsFiles whether we are supporting files
 * @param node the given node in question we are currently processing, this is a recursive
 * function after all
 * @returns a node
 */
export function propertyViewPostProcessingHook(
  relatedProperty: PropertyDefinition,
  currentFiles: IPropertyDefinitionSupportedSingleFilesType[],
  supportsImages: boolean,
  supportsVideos: boolean,
  supportsFiles: boolean,
  node: HTMLElement,
) {
  if (node.tagName === "IFRAME") {
    if (supportsVideos) {
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
    if (supportsImages) {
      const srcId = node.dataset.srcId;
      const currentFile = currentFiles && currentFiles.find((f) => f.id === srcId);
      const alt = (node as HTMLImageElement).alt || "";
      const srcHeight = node.dataset.srcHeight;
      const srcWidth = node.dataset.srcWidth;
      cleanAllAttribs(node);

      if (!srcId || !currentFile) {
        node.parentElement && node.parentElement.removeChild(node);
      } else {
        const absolutedFile = fileURLAbsoluter(
          this.props.config.containersHostnamePrefixes,
          currentFile,
          this.props.itemDefinition,
          this.props.forId,
          this.props.forVersion || null,
          this.props.containerId,
          this.props.include,
          relatedProperty,
        );
        const srcset = imageSrcSetRetriever(absolutedFile, relatedProperty);

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
    if (supportsFiles) {
      const srcId = node.dataset.srcId;
      const src = node.dataset.src;
      cleanAllAttribs(node);
      const currentFile = currentFiles && currentFiles.find((f) => f.id === srcId);
      
      if (currentFile) {
        // spellcheck
        node.spellcheck = false;

        const absolutedFile = fileURLAbsoluter(
          this.props.config.containersHostnamePrefixes,
          currentFile,
          this.props.itemDefinition,
          this.props.forId,
          this.props.forVersion || null,
          this.props.containerId,
          this.props.include,
          relatedProperty,
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
 * The property view text class
 */
export default class PropertyViewText extends React.Component<IPropertyViewHandlerProps<IPropertyViewTextRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
      (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.property !== this.props.property ||
      nextProps.forId !== this.props.forId ||
      nextProps.forVersion !== this.props.forVersion ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    let currentValue = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    ) as string;

    const isRichText = this.props.property.isRichText();

    const mediaPropertyId = this.props.property.getSpecialProperty("mediaProperty") as string;
    const supportsMedia = !!mediaPropertyId && isRichText;
    const supportsVideos = isRichText && !!this.props.property.getSpecialProperty("supportsVideos");
    const supportsImages = supportsMedia && !!this.props.property.getSpecialProperty("supportsImages");
    const supportsFiles = supportsMedia && !!this.props.property.getSpecialProperty("supportsFiles");

    if (isRichText && currentValue !== null) {
      const mediaProperty = mediaPropertyId && this.props.itemDefinition.getPropertyDefinitionFor(mediaPropertyId, true);
      const currentFiles = mediaProperty &&
        mediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

      DOMPurify.addHook("afterSanitizeElements", propertyViewPostProcessingHook.bind(this, mediaProperty, currentFiles, supportsImages, supportsVideos, supportsFiles));
      currentValue = DOMPurify.sanitize(currentValue, PROPERTY_VIEW_SANITIZE_CONFIG);
      DOMPurify.removeAllHooks();
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewTextRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue,
      isRichText: this.props.property.isRichText(),
      subtype: this.props.property.getSubtype() as any,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
