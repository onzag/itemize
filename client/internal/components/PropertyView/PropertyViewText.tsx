/**
 * Contains the property view text handler as well as some other
 * functionality that is used for handling text
 * @module
 */

import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { IPropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { sanitize } from "../../../internal/text";
import { deepRendererArgsComparer } from "../general-fn";
import { applyHighlights } from "./highlights";

/**
 * The property view renderer props as it requires the properties
 * note that this renderer is only used for html and plain, but not for the default
 * null subtype
 */
export interface IPropertyViewTextRendererProps extends IPropertyViewRendererProps<IPropertyDefinitionSupportedTextType> {
  /**
   * A safe sanitized and processed value to use
   * with the text type
   */
  currentValueText: string;

  /**
   * The language used, or null, if no language found
   */
  currentValueLang: string;

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
export default class PropertyViewText extends React.Component<IPropertyViewHandlerProps<IPropertyDefinitionSupportedTextType, IPropertyViewTextRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyDefinitionSupportedTextType, IPropertyViewTextRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyDefinitionSupportedTextType, IPropertyViewTextRendererProps>,
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
      nextProps.highlights !== this.props.highlights ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    const currentValue = (
      this.props.useAppliedValue ?
        this.props.state.stateAppliedValue :
        this.props.state.value
    ) as IPropertyDefinitionSupportedTextType;
    let currentValueText: string = (currentValue && currentValue.value) || null;
    let currentValueLang: string = (currentValue && currentValue.language) || null;

    const isRichText = this.props.property.isRichText();

    const mediaPropertyId = this.props.property.getConfigValue("mediaProperty") as string;
    const supportsMedia = !!mediaPropertyId && isRichText;
    const supportsVideos = isRichText && !!this.props.property.getConfigValue("supportsVideos");
    const supportsImages = supportsMedia && !!this.props.property.getConfigValue("supportsImages");
    const supportsFiles = supportsMedia && !!this.props.property.getConfigValue("supportsFiles");
    const supportsContainers = this.props.property.getConfigValue("supportsContainers");
    const supportedContainers = this.props.property.getConfigValue("supportedContainers");
    const supportsTables = this.props.property.getConfigValue("supportsTables");
    const supportedTables = this.props.property.getConfigValue("supportedTables");
    const supportsLists = this.props.property.getConfigValue("supportsLists");
    const supportsCustom = this.props.property.getConfigValue("supportsCustom");
    const supportedCustoms = this.props.property.getConfigValue("supportedCustoms");
    const supportsExternalLinks = this.props.property.getConfigValue("supportsExternalLinks");
    const supportsLinks = this.props.property.getConfigValue("supportsLinks");
    const supportsQuote = this.props.property.getConfigValue("supportsQuote");
    const supportsRichClasses = this.props.property.getConfigValue("supportsRichClasses");
    const supportedRichClasses = this.props.property.getConfigValue("supportedRichClasses");
    const supportsTitle = this.props.property.getConfigValue("supportsTitle");
    const supportsCustomStyles = this.props.property.getConfigValue("supportsCustomStyles");
    const supportsTemplating = this.props.property.getConfigValue("supportsTemplating");

    if (isRichText && currentValueText !== null) {
      const mediaProperty = mediaPropertyId && this.props.itemDefinition.getPropertyDefinitionFor(mediaPropertyId, true);
      const currentFiles = mediaProperty &&
        (
          this.props.useAppliedValue ?
            mediaProperty.getAppliedValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType :
            mediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType
        );

      currentValueText = sanitize(
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
          supportsTables,
          supportedTables,
        },
        currentValueText,
      );
    }

    const appliedHighlightsInfo = applyHighlights(
      currentValueText,
      this.props.highlights,
    );

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewTextRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue,
      currentValueText: appliedHighlightsInfo.applied ? appliedHighlightsInfo.value : currentValueText,
      currentValueLang: currentValueLang,
      isRichText: this.props.property.isRichText() || appliedHighlightsInfo.applied,
      subtype: this.props.property.getSubtype() as any,
    };

    return <RendererElement {...rendererArgs} />
  }
}
