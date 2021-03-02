/**
 * The description setter allows to set the description of the application
 * this setter only has effect server side
 * 
 * @module
 */

import { PropertyDefinitionSupportedFileType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import React from "react";
import Reader from "../property/Reader";
import RootRetriever from "../root/RootRetriever";

/**
 * The og image setter props, takes a string children
 */
interface IOgImageSetterProps {
  children: string;
  isFileProperty?: boolean;
  defaultURL?: string;
}

/**
 * This setter only has an effect server side and client side it effectively returns null
 * and does nothing, this setter is useful for SSR
 */
export default class OgImageSetter extends React.Component<IOgImageSetterProps, {}> {
  public render() {
    if (typeof document === "undefined") {
      const defaultURL = this.props.defaultURL || "/rest/resource/icons/android-chrome-512x512.png";
      if (this.props.isFileProperty) {
        return (
          <Reader id={this.props.children}>
            {
              (value: PropertyDefinitionSupportedFileType) => (
                <RootRetriever>{
                  (arg) => {
                    arg.root.setStateKey("ogImage", (value && value.url) || defaultURL);
                    return null;
                  }
                }</RootRetriever>
              )
            }
          </Reader>
        );
      } else {
        return (
          <RootRetriever>{
            (arg) => {
              arg.root.setStateKey("ogImage", this.props.children || defaultURL);
              return null;
            }
          }</RootRetriever>
        );
      }
    } else {
      return null;
    }
  }
}