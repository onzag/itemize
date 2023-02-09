/**
 * Contains the property view file renderer
 * 
 * @module
 */

import Paper from "@mui/material/Paper";
import React from "react";
import { IPropertyViewFilesRendererProps } from "../../../internal/components/PropertyView/PropertyViewFiles";
import PropertyViewFileRenderer from "./PropertyViewFile";

const styles = {
  paper: {
    backgroundColor: "#fff",
    width: "100%",
    minHeight: "200px",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    position: "relative",
    padding: "20px 20px 20px 20px",
    flexWrap: "wrap",
    boxShadow: "none",
    border: "solid 1px #ccc",
    rowGap: "20px",
    columnGap: "20px",
  } as any,
}

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

    const files = (
      <>
        {this.props.currentValueWithInfo.map((v, index) => {
          const fileRendered = (
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
          );
          if (this.props.args.fileWrapper) {
            return (
              <React.Fragment key={v.file.id}>
                {this.props.args.fileWrapper(fileRendered, v.file, index)}
              </React.Fragment>
            );
          }

          return fileRendered;
        })}
      </>
    );

    if (this.props.args.doNotContain) {
      return files;
    }

    return (
      <Paper sx={styles.paper}>
        {files}
      </Paper>
    );
  }
}
