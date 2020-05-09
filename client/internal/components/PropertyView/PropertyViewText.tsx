import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { DOMPurify } from "../../../../util";
import equals from "deep-equal";
import { PropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { PropertyDefinitionSupportedFilesType, IPropertyDefinitionSupportedSingleFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { fileURLAbsoluter, imageSrcSetRetriever } from "../../../components/util";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";

export interface IPropertyViewTextRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedTextType> {
  isRichText: boolean;
}

export const PROPERTY_VIEW_SANITIZE_CONFIG = {
  ADD_TAGS: ["iframe"],
  ADD_ATTR: ["frameborder", "allow", "allowfullscreen", "scrolling", "src", "spellcheck", "contenteditable"],
  ALLOW_UNKNOWN_PROTOCOLS: true,
};

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
      if (origin === "vimeo") {
        node.setAttribute("src", `https://player.vimeo.com/video/${videoSrc}?title=0&byline=0&portrait=0&badge=0`);
      } else if (origin === "youtube") {
        node.setAttribute("src", `https://youtube.com/embed/${videoSrc}?rel=0`);
      }
    } else {
      node.parentElement && node.parentElement.removeChild(node);
    }
  } else if (node.tagName === "IMG" && currentFiles && currentFiles.length) {
    if (supportsImages) {
      const srcId = node.dataset.srcId;
      const currentFile = currentFiles.find((f) => f.id === srcId);
      if (currentFile) {
        const absolutedFile = fileURLAbsoluter(
          currentFile,
          this.props.itemDefinition,
          this.props.forId,
          this.props.forVersion || null,
          this.props.include,
          relatedProperty,
        );
        const srcset = imageSrcSetRetriever(absolutedFile, relatedProperty);
        node.setAttribute("sizes", "70vw");
        node.setAttribute("srcset", srcset);
        node.setAttribute("src", absolutedFile ? absolutedFile.url : "/rest/resource/image-fail.svg")
      }
    } else {
      node.parentElement && node.parentElement.removeChild(node);
    }
  } else if (node.className === "file" && currentFiles && currentFiles.length) {
    if (supportsFiles) {
      const srcId = node.dataset.srcId;
      const currentFile = currentFiles.find((f) => f.id === srcId);
      if (currentFile) {
        const absolutedFile = fileURLAbsoluter(
          currentFile,
          this.props.itemDefinition,
          this.props.forId,
          this.props.forVersion || null,
          this.props.include,
          relatedProperty,
        );
        if (absolutedFile) {
          node.dataset.src = absolutedFile.url;
        }
      }
    } else {
      node.parentElement && node.parentElement.removeChild(node);
    }
  }

  return node;
}

export class PropertyViewText extends React.Component<IPropertyViewHandlerProps<IPropertyViewTextRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.state.value !== nextProps.state.value ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.property !== this.props.property ||
      nextProps.forId !== this.props.forId ||
      nextProps.forVersion !== this.props.forVersion ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    let currentValue: string = this.props.state.value as string;

    const isRichText = this.props.property.isRichText();

    const mediaPropertyId = this.props.property.getSpecialProperty("mediaProperty") as string;
    const supportsMedia = !!mediaPropertyId && isRichText;
    const supportsVideos = isRichText && !!this.props.property.getSpecialProperty("supportsVideos");
    const supportsImages = supportsMedia && !!this.props.property.getSpecialProperty("supportsImages");
    const supportsFiles = supportsMedia && !!this.props.property.getSpecialProperty("supportsFiles");

    if (isRichText) {
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
    };

    return <RendererElement {...rendererArgs}/>
  }
}
