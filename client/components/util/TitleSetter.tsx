/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 * 
 * @packageDocumentation
 */

import React from "react";
import { ActualTitleReader } from "./TitleReader";

/**
 * The title setter props, takes a string children
 */
interface ITitleSetterProps {
  children: string;
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
export default class TitleSetter extends React.Component<ITitleSetterProps, {}> {
  /**
   * Stores title readers to inform them of changes
   */
  static changedListeners = new Map<ActualTitleReader, () => void>();
  /**
   * the original title before this was mounted
   */
  private originalTitle: string;

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
    this.originalTitle = document.title;
    document.title = this.props.children || "";
    if (this.originalTitle !== document.title) {
      TitleSetter.changedListeners.forEach((listener) => listener());
    }
  }
  public componentDidUpdate(prevProps: ITitleSetterProps) {
    // change the title if we have different titles
    if ((prevProps.children || "") !== (this.props.children || "")) {
      document.title = this.props.children || "";
      TitleSetter.changedListeners.forEach((listener) => listener());
    }
  }
  public componentWillUnmount() {
    // restore the title
    document.title = this.originalTitle;
    // no more loaded
    TitleSetterInstanceIsLoaded = false;
  }
  public render() {
    // retuns nothing
    return null as React.ReactNode;
  }
}