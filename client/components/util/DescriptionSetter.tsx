/**
 * The description setter allows to set the description of the application
 * this setter only has effect server side
 * 
 * @module
 */

import React from "react";
import Reader from "../property/Reader";
import RootRetriever from "../root/RootRetriever";

/**
 * The title setter props, takes a string children
 */
interface IDescriptionSetterProps {
  children: string;
  type?: "og" | "meta" | "both";
  isProperty?: boolean;
}

/**
 * keeps track of invalid two instances
 */
let DescriptionSetterInstanceLoaded = false;

/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 * 
 * Do not have two title setters at once as this would cause an error
 */
export class ActualDescriptionSetter extends React.Component<{children: string}> {
  constructor(props: {children: string}) {
    super(props);
  }
  public componentDidMount() {
    if (DescriptionSetterInstanceLoaded) {
      throw new Error("Two instances of DescriptionSetter have been loaded at once, this is not allowed");
    }

    // we mark it as loaded
    DescriptionSetterInstanceLoaded = true;
    const metaTag = document.getElementsByTagName('meta').namedItem('description');
    const currentValue =  metaTag.getAttribute("content");

    // store the original title of the app (which is more often than not the app title)
    const newDesc = this.props.children || "";
    if (newDesc !== currentValue) {
      metaTag.setAttribute("content", newDesc);
    }
  }
  public componentDidUpdate(prevProps: {children: string}) {
    // change the title if we have different titles
    if ((prevProps.children || "") !== (this.props.children || "")) {
      const metaTag = document.getElementsByTagName('meta').namedItem('description');
      metaTag.setAttribute("content", this.props.children || "");
    }
  }
  public componentWillUnmount() {
    // no more loaded
    const metaTag = document.getElementsByTagName('meta').namedItem('description');
    metaTag.setAttribute("content", "");
    DescriptionSetterInstanceLoaded = false;
  }
  public render() {
    // retuns nothing
    return null as React.ReactNode;
  }
}

/**
 * This setter only has an effect server side and client side it effectively returns null
 * and does nothing, this setter is useful for SSR
 */
export default class DescriptionSetter extends React.Component<IDescriptionSetterProps, {}> {
  public render() {
    if (typeof document === "undefined") {
      if (this.props.isProperty) {
        return (
          <Reader id={this.props.children}>
            {
              (value) => (
                <RootRetriever>{
                  (arg) => {
                    if (this.props.type === "og" || !this.props.type || this.props.type === "both") {
                      arg.root.setStateKey("ogDescription", value && value.toString());
                    }
        
                    if (this.props.type === "meta" || !this.props.type || this.props.type === "both") {
                      arg.root.setStateKey("description", value && value.toString());
                    }
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
              if (this.props.type === "og" || !this.props.type || this.props.type === "both") {
                arg.root.setStateKey("ogDescription", this.props.children);
              }
  
              if (this.props.type === "meta" || !this.props.type || this.props.type === "both") {
                arg.root.setStateKey("description", this.props.children);
              }
  
              return null;
            }
          }</RootRetriever>
        );
      }
    } else {
      if (this.props.isProperty) {
        return (
          <Reader id={this.props.children}>
            {(value) => (
              <ActualDescriptionSetter>{value && value.toString()}</ActualDescriptionSetter>
            )}
          </Reader>
        );
      }
      return (
        <ActualDescriptionSetter>{this.props.children}</ActualDescriptionSetter>
      );
    }
  }
}