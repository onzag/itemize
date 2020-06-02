import React from "react";
import TitleSetter from "./TitleSetter";
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
    TitleSetter.changedListeners.set(this, this.forceUpdate.bind(this));
  }
  public componentWillUnmount() {
    TitleSetter.changedListeners.delete(this);
  }
  public render() {
    if (!this.hasRenderedInitial && this.props.ssrTitle) {
      return this.props.ssrTitle;
    }
    this.hasRenderedInitial = true;
    return document.title;
  }
}

export default function TitleReader() {
  return (
    <SSRContext.Consumer>
      {(value) => (
        <ActualTitleReader ssrTitle={value && value.title}/>
      )}
    </SSRContext.Consumer>
  )
}