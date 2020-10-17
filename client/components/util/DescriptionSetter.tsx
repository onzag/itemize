/**
 * The description setter allows to set the description of the application
 * this setter only has effect server side
 * 
 * @packageDocumentation
 */

import React from "react";
import RootRetriever from "../root/RootRetriever";

/**
 * The title setter props, takes a string children
 */
interface IDescriptionSetterProps {
  children: string;
  type?: "og" | "meta" | "both",
}

/**
 * This setter only has an effect server side and client side it effectively returns null
 * and does nothing, this setter is useful for SSR
 */
export default class DescriptionSetter extends React.Component<IDescriptionSetterProps, {}> {
  public render() {
    if (typeof document === "undefined") {
      return (
        <RootRetriever>{
          (arg) => {
            if (this.props.type === "og" || !this.props.type || this.props.type === "both") {
              arg.root.setStateKey("ogDescription", this.props.children);
            }

            if (this.props.type === "meta" || !this.props.type || this.props.type === "both") {
              arg.root.setStateKey("description", this.props.children);
            }

            return null;
          }
        }</RootRetriever>
      )
    } else {
      return null;
    }
  }
}