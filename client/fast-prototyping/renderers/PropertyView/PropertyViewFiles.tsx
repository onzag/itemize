/**
 * Contains the property view file renderer
 * 
 * @module
 */

import React from "react";
import { IPropertyViewFilesRendererProps } from "../../../internal/components/PropertyView/PropertyViewFiles";
import PropertyViewFileRenderer from "./PropertyViewFile";

/**
 * The property view file renderer will show a file, and if it's an image
 * it will show as an image with all lazyloading and all
 * 
 * supported args same as PropertyViewFileRenderer
 */
export default class PropertyViewFilesRenderer extends React.Component<IPropertyViewFilesRendererProps> {
  public render() {
    if (!this.props.currentValue) {
      if (this.props.args.nullNode) {
        return this.props.args.nullNode;
      } else if (this.props.args.NullComponent) {
        const NullComponent = this.props.args.NullComponent;
        const nullArgs = this.props.args.nullComponentArgs;
        return <NullComponent {...nullArgs} />;
      }
      return null;
    }

    return (
      <>
        {this.props.currentValueWithInfo.map((v) => {
          return (
            <PropertyViewFileRenderer
              key={v.file.id}
              args={this.props.args}
              currentValue={v.file}
              extension={v.extension}
              imageSrcSet={v.imageSrcSet}
              isSupportedImage={v.isSupportedImage}
              openFile={v.openFile}
              prettySize={v.prettySize}
              rtl={this.props.rtl}
            />
          )
        })}
      </>
    );
  }
}
