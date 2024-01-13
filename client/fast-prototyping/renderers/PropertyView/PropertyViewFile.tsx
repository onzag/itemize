/**
 * Contains the property view file renderer
 * 
 * @module
 */

import React from "react";
import { IPropertyViewFileRendererProps } from "../../../internal/components/PropertyView/PropertyViewFile";
import Box from "@mui/material/Box";

/**
 * The property view file renderer will show a file, and if it's an image
 * it will show as an image with all lazyloading and all
 * 
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - nullNode: a react node to render instead of the default when the value is null
 * - imageClassName: the image class name for the img tag when an image is available
 * - imageSx: the image sx for the img tag
 * - imageSizes: the image sizes for the sizes attribute for the image, default 70vw
 * - lazyLoad: whether to use lazyloading for images alone
 */
export default class PropertyViewFileRenderer extends React.Component<IPropertyViewFileRendererProps> {
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

    if (this.props.isSupportedImage && this.props.args.useFullImage) {
      const imageClassName: string = this.props.args.imageClassName;
      const imageSizes: string = this.props.args.imageSizes || "70vw";

      // since the image is never loaded at start, the src will always be null
      // but data-src will be there, so SEO should be able to figure this one out
      // also including the a tag should find it out
      const img = (
        <Box
          component="img"
          srcSet={this.props.imageSrcSet}
          sizes={imageSizes}
          data-src={this.props.currentValue.url}
          src={this.props.currentValue.url}
          className={imageClassName}
          sx={this.props.args.imageSx}
          loading={this.props.args.lazyLoad ? "lazy" : null}
          alt={this.props.currentValue.name}
        />
      );

      // linking is disabled, might be used for purposes
      if (this.props.args.disableImageLinking) {
        return img;

        // in this case the link is there but invisible
        // this might be preferrable for SEO purposes
      } else if (this.props.args.hideImageLink) {
        return (
          <>
            {img}
            <a href={this.props.currentValue.url} style={{ display: "none" }} />
          </>
        );
      }

      return (
        <a href={this.props.currentValue.url} title={this.props.currentValue.name}>
          {img}
        </a>
      );
    }

    return (
      <span
        className="file"
        onClick={this.props.openFile}
        tabIndex={0}
        role="button"
        aria-labelledby={`${this.props.currentValue.id}_name ${this.props.currentValue.id}_ext ${this.props.currentValue.id}_size`}
        onKeyDown={openFileManually.bind(null, this.props.openFile)}
      >
        <span className="file-container">
          {
            this.props.isSupportedImage ? (
              <img
                srcSet={this.props.imageSrcSet}
                sizes="100px"
                src={this.props.currentValue.url}
                className="thumbnail"
                alt={this.props.currentValue.name}
                loading={this.props.args.lazyLoad ? "lazy" : null}
              />
            ) : (
              <span className="file-icon">
                <span className="file-extension" id={this.props.currentValue.id + "_ext"}>{
                  this.props.extension
                }</span>
              </span>
            )
          }
          <span className="file-name">{this.props.currentValue.name}</span>
          <span className="file-size">{this.props.prettySize}</span>
        </span>
      </span>
    );
  }
}

function openFileManually(openFile: any, e: React.KeyboardEvent) {
  if (e.code === "Enter" || e.code === "Space") {
    e.stopPropagation();
    e.preventDefault();
    openFile();
  }
};