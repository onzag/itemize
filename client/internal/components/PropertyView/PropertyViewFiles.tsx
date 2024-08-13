/**
 * Contains the property view file handler
 * @module
 */

import React from "react";
import { IPropertyViewRendererProps, IPropertyViewHandlerProps } from ".";
import { PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import equals from "deep-equal";
import { imageSrcSetRetriever } from "../../../components/util";
import { FILE_SUPPORTED_IMAGE_TYPES } from "../../../../constants";
import prettyBytes from "@onzag/itemize-text-engine/util/pretty-bytes";
import { fileURLAbsoluter, mimeTypeToExtension } from "../../../../util";
import { deepRendererArgsComparer } from "../general-fn";

interface IPropertyViewWithInfo {
  /**
   * file in question
   */
  file: PropertyDefinitionSupportedFileType,
  /**
   * whether the file is a supported image
   */
  isSupportedImage: boolean;
  /**
   * If it's a supported image, the source set
   * that is attached to that image
   */
  imageSrcSet: string;
  /**
   * The size of the file in a human readable form
   */
  prettySize: string;
  /**
   * The extension of that file
   */
  extension: string;
  /**
   * open the current file
   */
  openFile: () => void;
}

/**
 * The property view renderer props that every property renderer
 * for file contains
 */
export interface IPropertyViewFilesRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedFilesType> {
  currentValueWithInfo: IPropertyViewWithInfo[];
}

export default class PropertyViewFile
  extends React.Component<
    IPropertyViewHandlerProps<PropertyDefinitionSupportedFilesType, IPropertyViewFilesRendererProps>
  > {
  constructor(props: IPropertyViewHandlerProps<PropertyDefinitionSupportedFilesType, IPropertyViewFilesRendererProps>) {
    super(props);

    this.openFile = this.openFile.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<PropertyDefinitionSupportedFilesType, IPropertyViewFilesRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && !equals(this.props.state.value, nextProps.state.value, { strict: true })) ||
      (this.props.useAppliedValue && !equals(this.props.state.stateAppliedValue, nextProps.state.stateAppliedValue, { strict: true })) ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.property !== this.props.property ||
      nextProps.forId !== this.props.forId ||
      nextProps.forVersion !== this.props.forVersion ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public openFile(file: PropertyDefinitionSupportedFileType) {
    window.open(file.url, file.name);
  }
  public render() {
    let currentValue = (
      this.props.useAppliedValue ?
        this.props.state.stateAppliedValue :
        this.props.state.value
    ) as PropertyDefinitionSupportedFilesType;

    const filesWithInfo: IPropertyViewWithInfo[] = currentValue ? currentValue.map((v) => {
      const isSupportedImage = currentValue && FILE_SUPPORTED_IMAGE_TYPES.includes(v.type);

      let vToUse = v;
      if (
        v.url.indexOf("blob:") !== 0 &&
        v.metadata !== "FAKE_FILE"
      ) {
        const domain = process.env.NODE_ENV === "production" ? this.props.config.productionHostname : this.props.config.developmentHostname;
        vToUse = fileURLAbsoluter(
          domain,
          this.props.config.defaultCluster,
          this.props.config.clusterSubdomains,
          v,
          this.props.itemDefinition,
          this.props.forId,
          this.props.forVersion,
          this.props.include,
          this.props.property,
          this.props.cacheFiles,
        );
      }

      const prettySize = typeof v.size === "number" ? prettyBytes(v.size) : null;
      const extension = v.type ? mimeTypeToExtension(v.type) : v.type;
      const imageSrcSet = isSupportedImage ? imageSrcSetRetriever(vToUse, this.props.property) : null;

      return {
        file: vToUse,
        isSupportedImage,
        prettySize,
        extension,
        imageSrcSet,
        openFile: this.openFile.bind(this, vToUse),
      }
    }) : null;

    // to use the same value as in there with the resolved urls
    currentValue = filesWithInfo && filesWithInfo.map((v) => v.file);

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewFilesRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,

      currentValue,
      currentValueWithInfo: filesWithInfo,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
