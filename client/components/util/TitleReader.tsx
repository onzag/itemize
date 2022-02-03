/**
 * Nice utility function that allows to read the title of the application
 * that is currently being used in the document title itself
 * 
 * @module
 */

import React from "react";
import { ActualTitleSetter } from "./TitleSetter";
import { SSRContext } from "../../internal/providers/ssr-provider";

interface ActualTitleReaderProps {
  ssrTitle: string;
}

export class ActualTitleReader extends React.Component<ActualTitleReaderProps, {}> {
  constructor(props: ActualTitleReaderProps) {
    super(props);
  }
  public componentDidMount() {
    // we add these global listener to it that do a force update
    ActualTitleSetter.changedListeners.set(this, this.forceUpdate.bind(this));
  }
  public componentWillUnmount() {
    // then we delete this
    ActualTitleSetter.changedListeners.delete(this);
  }
  public render() {
    // for ssr reasons we need to do this
    if (typeof document === "undefined") {
      // the server would hit here and not have any issues
      // in SSR mode, in the server side there should always
      // be a ssr title set
      return this.props.ssrTitle;
    }

    // gives priority to the document title on the force update
    return document.title;
  }
}

/**
 * Will read the title from the document itself and keep itself
 * by listening to changes on this title (when they are set by the setter)
 * mantains sync with the title property
 */
export default function TitleReader() {
  return (
    <SSRContext.Consumer>
      {(value) => (
        <ActualTitleReader ssrTitle={value && value.title}/>
      )}
    </SSRContext.Consumer>
  )
}