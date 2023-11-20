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
interface IRobotsProps {
  content: string;
}

/**
 * keeps track of invalid two instances
 */
let RobotsSetterInstanceLoaded = false;

/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 * 
 * Do not have two title setters at once as this would cause an error
 */
export class ActualRobotsSetter extends React.Component<{children: string}> {
  constructor(props: {children: string}) {
    super(props);
  }
  public componentDidMount() {
    if (RobotsSetterInstanceLoaded) {
      throw new Error("Two instances of Robots have been loaded at once, this is not allowed");
    }

    // we mark it as loaded
    RobotsSetterInstanceLoaded = true;
    const metaTag = document.getElementsByTagName('meta').namedItem('robots');
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
      const metaTag = document.getElementsByTagName('meta').namedItem('robots');
      metaTag.setAttribute("content", this.props.children || "");
    }
  }
  public componentWillUnmount() {
    // no more loaded
    const metaTag = document.getElementsByTagName('meta').namedItem('robots');
    metaTag.setAttribute("content", "all");
    RobotsSetterInstanceLoaded = false;
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
export default class Robots extends React.Component<IRobotsProps, {}> {
  public render() {
    if (typeof document === "undefined") {
      return (
        <RootRetriever>{
          (arg) => {
            arg.root.setStateKey("robots", this.props.content);

            return null;
          }
        }</RootRetriever>
      );
    } else {
      return (
        <ActualRobotsSetter>{this.props.content}</ActualRobotsSetter>
      );
    }
  }
}