import React from "react";

import SetVar from "./SetVar";

interface IReadVarProps {
  id: string;
  children: (value: any) => React.ReactNode;
}

export default class ReadVar extends React.PureComponent<IReadVarProps> {
  private isUnmounted: boolean = false;
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
    return this.props.children(SetVar.VAR_REGISTRY[this.props.id]);
  }
}