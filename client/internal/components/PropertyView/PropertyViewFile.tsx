import React from "react";
import { IPropertyViewRendererProps, IPropertyViewHandlerProps } from ".";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import equals from "deep-equal";
import { imageSrcSetRetriever } from "../../../components/util";
import { FILE_SUPPORTED_IMAGE_TYPES } from "../../../../constants";
import prettyBytes from "pretty-bytes";
import { fileURLAbsoluter, mimeTypeToExtension } from "../../../../util";

export interface IPropertyViewFileRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedFileType> {
  isSupportedImage: boolean;
  imageSrcSet: string;
  prettySize: string;
  extension: string;
  openFile: (value: PropertyDefinitionSupportedFileType) => void;
}

export default class PropertyViewFile
  extends React.Component<
  IPropertyViewHandlerProps<IPropertyViewFileRendererProps>
> {
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewFileRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    // This is optimized to only update for the thing it uses
    return this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && !equals(this.props.state.value, nextProps.state.value)) ||
      (this.props.useAppliedValue && !equals(this.props.state.stateAppliedValue, nextProps.state.stateAppliedValue)) ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.property !== this.props.property ||
      nextProps.forId !== this.props.forId ||
      nextProps.forVersion !== this.props.forVersion ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public openFile(
    value: PropertyDefinitionSupportedFileType,
  ) {
    window.open(value.url, value.name);
  }
  public render() {
    let currentValue = (
      this.props.useAppliedValue ?
        this.props.state.stateAppliedValue :
        this.props.state.value
      ) as PropertyDefinitionSupportedFileType;

    const isSupportedImage = currentValue && FILE_SUPPORTED_IMAGE_TYPES.includes(currentValue.type);

    if (
      currentValue &&
      currentValue.url.indexOf("blob:") !== 0
    ) {
      currentValue = fileURLAbsoluter(
        this.props.config.containersHostnamePrefixes,
        currentValue,
        this.props.itemDefinition,
        this.props.forId,
        this.props.forVersion,
        this.props.containerId,
        this.props.include,
        this.props.property,
      );
    }

    const prettySize = currentValue && prettyBytes(currentValue.size);
    const extension = currentValue && mimeTypeToExtension(currentValue.type);
    const imageSrcSet = isSupportedImage ? imageSrcSetRetriever(currentValue, this.props.property) : null;

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewFileRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,

      currentValue,

      openFile: this.openFile,
      isSupportedImage,
      imageSrcSet,
      prettySize,
      extension,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
