import React from "react";
import TitleSetter from "./TitleSetter";

export default class TitleReader extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }
  public componentDidMount() {
    TitleSetter.changedListeners.set(this, this.forceUpdate.bind(this));
  }
  public componentWillUnmount() {
    TitleSetter.changedListeners.delete(this);
  }
  public render() {
    return document.title;
  }
}