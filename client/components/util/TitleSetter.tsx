/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 * 
 * @module
 */

import React from "react";
import { ActualTitleReader } from "./TitleReader";
import RootRetriever from "../root/RootRetriever";
import ReactDOM from "react-dom";

/**
 * The title setter props, takes a string children
 */
interface ITitleSetterProps {
  children: string;
  type?: "document" | "og" | "both";
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
export class ActualTitleSetter extends React.Component<ITitleSetterProps, {changedTitle: boolean}> {
  /**
   * Stores title readers to inform them of changes
   */
  static changedListeners = new Map<ActualTitleReader, () => void>();

  constructor(props: ITitleSetterProps) {
    super(props);

    this.state = {
      changedTitle: false,
    };
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
      this.setState({changedTitle: true});
      ActualTitleSetter.changedListeners.forEach((listener) => listener());
    } else {
      // force a title change in case of buggy browser behaviours
      // found a bug in chrome where it tries to outsmart the title
      document.title = newTitle;
    }
  }
  public componentDidUpdate(prevProps: ITitleSetterProps) {
    // change the title if we have different titles
    if ((prevProps.children || "") !== (this.props.children || "")) {
      document.title = this.props.children || "";
      this.setState({changedTitle: true});
      ActualTitleSetter.changedListeners.forEach((listener) => listener());
    }
  }
  public componentWillUnmount() {
    // no more loaded
    TitleSetterInstanceIsLoaded = false;
  }
  public render() {
    if (this.state.changedTitle && this.props.children) {
      // Accessibility support as the change in title is often
      // not announced
      return ReactDOM.createPortal(
        <span aria-live="polite" style={{
          border: 0,
          clip: "rect(0 0 0 0)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          width: "1px",
        }}>
          {this.props.children}
        </span>,
        document.body,
      );
    }

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
 * 
 * The title is set and then left to what it was last set, it does not revert it other than
 * unless another instance overrides it
 * 
 * NOTE: Due to a bug in google chrome, you should always have a title setter, the title settter
 * sets the title and doesn't turn it back once you unload it
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
            if (this.props.type === "og" || !this.props.type || this.props.type === "both") {
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