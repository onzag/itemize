/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 * 
 * @module
 */

import React from "react";
import { ActualTitleReader } from "./TitleReader";
import RootRetriever from "../root/RootRetriever";

/**
 * The title setter props, takes a string children
 */
interface ITitleSetterProps {
  children: string;
  type?: "document" | "og" | "both",
}

/**
 * keeps track of invalid two instances
 */
let TitleSetterInstanceIsLoaded = false;

/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 * 
 * Do not have two title setters at once as this would cause an error
 */
export class ActualTitleSetter extends React.Component<ITitleSetterProps, {}> {
  /**
   * Stores title readers to inform them of changes
   */
  static changedListeners = new Map<ActualTitleReader, () => void>();

  constructor(props: ITitleSetterProps) {
    super(props);
  }
  public componentDidMount() {
    if (TitleSetterInstanceIsLoaded) {
      throw new Error("Two instances of TitleSetter have been loaded at once, this is not allowed");
    }

    // we mark it as loaded
    TitleSetterInstanceIsLoaded = true;
    // store the original title of the app (which is more often than not the app title)
    const newTitle = this.props.children || "";
    if (newTitle !== document.title) {
      document.title = newTitle;
      ActualTitleSetter.changedListeners.forEach((listener) => listener());
    }
  }
  public componentDidUpdate(prevProps: ITitleSetterProps) {
    // change the title if we have different titles
    if ((prevProps.children || "") !== (this.props.children || "")) {
      document.title = this.props.children || "";
      ActualTitleSetter.changedListeners.forEach((listener) => listener());
    }
  }
  public componentWillUnmount() {
    // no more loaded
    TitleSetterInstanceIsLoaded = false;
  }
  public render() {
    // retuns nothing
    return null as React.ReactNode;
  }
}

/**
 * The title setter allows to set the title of the application dinamically
 * 
 * If set in the og mode it will not do anything and it does not update the og
 * dinamically, only the document or both mode does it; the og mode is for server
 * use only
 */
export default class TitleSetter extends React.Component<ITitleSetterProps, {}> {
  constructor(props: ITitleSetterProps) {
    super(props);
  }
  public render() {
    if (typeof document === "undefined") {
      return (
        <RootRetriever>{
          (arg) => {
            if (this.props.type === "og" || !this.props.type || this.props.type === "both") {
              arg.root.setStateKey("ogTitle", this.props.children);
            }

            if (this.props.type === "document" || !this.props.type || this.props.type === "both") {
              arg.root.setStateKey("title", this.props.children);
            }

            return null;
          }
        }</RootRetriever>
      )
    } else if (!this.props.type || this.props.type !== "og") {
      return (
        <ActualTitleSetter {...this.props} />
      );
    }

    return null;
  }
}