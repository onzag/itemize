/**
 * Nice utility function that allows to read the title of the application
 * that is currently being used in the document title itself
 * 
 * @packageDocumentation
 */

import React from "react";
import { ActualTitleSetter } from "./TitleSetter";
import { SSRContext } from "../../internal/providers/ssr-provider";

interface ActualTitleReaderProps {
  ssrTitle: string;
}

export class ActualTitleReader extends React.Component<ActualTitleReaderProps, {}> {
  private hasRenderedInitial: boolean = false;
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
    // for ssr reasons we need to do this, basically on initial
    // we would use the SSR given title, document, might honestly not
    // be available on SSR so we do this logic to keep things
    // consistent as odd as hacky as this might be
    if (!this.hasRenderedInitial && this.props.ssrTitle) {
      // the server would hit here and not have any issues
      return this.props.ssrTitle;
    }

    // whereas the client after the initial render would do this
    // even if for the client it is always true and fine to do
    // this process
    this.hasRenderedInitial = true;
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