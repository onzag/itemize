import React from "react";

import SetVar from "./SetVar";
import equals from "deep-equal";

interface IReadVarProps {
  id: string;
  children: (value: any) => React.ReactNode;
}

export default class ReadVar extends React.PureComponent<IReadVarProps> {
  private isUnmounted: boolean = false;
  private lastRenderRoundValue: any;
  constructor(props: IReadVarProps) {
    super(props);

    this.onTickled = this.onTickled.bind(this);
  }
  public onTickled() {
    if (!this.isUnmounted) {
      this.forceUpdate();
    }
  }
  public componentDidMount() {
    SetVar.addListener(this.props.id, this.onTickled);

    // it might occur that the value changed during the did mount
    // and it did not catch the events for this update
    // eg. SetVar mounts and calls the mount and tickles
    // then this ReadVar mounts and adds the listener for tickling
    // it will miss such tickle
    if (!equals(this.lastRenderRoundValue, SetVar.VAR_REGISTRY[this.props.id])) {
      // assume a tickle event occured and was missed
      this.onTickled();
    }
  }
  public componentDidUpdate(prevProps: IReadVarProps) {
    if (this.props.id !== prevProps.id) {
      SetVar.removeListener(prevProps.id, this.onTickled);
      SetVar.addListener(this.props.id, this.onTickled);
      this.forceUpdate();
    }
  }
  public componentWillUnmount() {
    this.isUnmounted = true;
  }
  public render() {
    this.lastRenderRoundValue = SetVar.VAR_REGISTRY[this.props.id];
    return this.props.children(this.lastRenderRoundValue);
  }
}