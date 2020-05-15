import React from "react";
import { IPropertyViewFileRendererProps } from "../../../internal/components/PropertyView/PropertyViewFile";

export default function PropertyViewFileRenderer(props: IPropertyViewFileRendererProps) {
  if (!props.currentValue) {
    return null;
  }
  if (props.isSupportedImage) {
    const imageClassName: string = props.args.imageClassName;
    const imageSizes: string = props.args.imageSizes || "70vw";
    return (
      <img srcSet={props.imageSrcSet} sizes={imageSizes} src={props.currentValue.url} className={imageClassName} />
    )
  }
  return (
    <span className="file" onClick={props.openFile.bind(null, props.currentValue)}>
      <span className="file-container">
        <span className="file-icon">
          <span className="file-extension">{props.extension}</span>
        </span>
        <span className="file-name">{props.currentValue.name}</span>
        <span className="file-size">{props.prettySize}</span>
      </span>
    </span>
  );
}