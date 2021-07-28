/**
 * Contains the property view text handler as well as some other
 * functionality that is used for handling text
 * @module
 */

import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import equals from "deep-equal";
import { PropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { sanitize } from "../../../internal/text";
import { shallowDeepRendererArgsComparer } from "../general-fn";

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
      !shallowDeepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
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
    const supportsContainers = this.props.property.getSpecialProperty("supportsContainers");
    const supportedContainers = this.props.property.getSpecialProperty("supportedContainers");
    const supportsLists = this.props.property.getSpecialProperty("supportsLists");
    const supportsCustom = this.props.property.getSpecialProperty("supportsCustom");
    const supportedCustoms = this.props.property.getSpecialProperty("supportedCustoms");
    const supportsExternalLinks = this.props.property.getSpecialProperty("supportsExternalLinks");
    const supportsLinks = this.props.property.getSpecialProperty("supportsLinks");
    const supportsQuote = this.props.property.getSpecialProperty("supportsQuote");
    const supportsRichClasses = this.props.property.getSpecialProperty("supportsRichClasses");
    const supportedRichClasses = this.props.property.getSpecialProperty("supportedRichClasses");
    const supportsTitle = this.props.property.getSpecialProperty("supportsTitle");
    const supportsCustomStyles = this.props.property.getSpecialProperty("supportsCustomStyles");
    const supportsTemplating = this.props.property.getSpecialProperty("supportsTemplating");

    if (isRichText && currentValue !== null) {
      const mediaProperty = mediaPropertyId && this.props.itemDefinition.getPropertyDefinitionFor(mediaPropertyId, true);
      const currentFiles = mediaProperty &&
        mediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

      currentValue = sanitize(
        {
          cacheFiles: this.props.cacheFiles,
          config: this.props.config,
          containerId: this.props.containerId,
          currentFiles,
          forId: this.props.forId,
          forVersion: this.props.forVersion,
          include: this.props.include,
          itemDefinition: this.props.itemDefinition,
          mediaProperty,
        },
        {
          supportsFiles,
          supportsImages,
          supportsImagesAccept: null,
          supportsFilesAccept: null,
          supportsVideos,
          supportsLists,
          supportsContainers,
          supportsCustom,
          supportsExternalLinks,
          supportsLinks,
          supportsQuote,
          supportsRichClasses,
          supportsTitle,
          supportsCustomStyles,
          supportsTemplating,
          supportedContainers,
          supportedCustoms,
          supportedRichClasses,
        },
        currentValue,
      );
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewTextRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue,
      isRichText: this.props.property.isRichText(),
      subtype: this.props.property.getSubtype() as any,
    };

    return <RendererElement {...rendererArgs} />
  }
}
