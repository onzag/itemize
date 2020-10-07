import React from "react";

import SetVar from "./SetVar";

interface IReadManyVarProps {
  ids: string[];
  children: (value: any[]) => React.ReactNode;
}

export default class ReadManyVar extends React.PureComponent<IReadManyVarProps> {
  private isUnmounted: boolean = false;
  constructor(props: IReadManyVarProps) {
    super(props);

    this.onTickled = this.onTickled.bind(this);
  }
  public onTickled() {
    if (!this.isUnmounted) {
      this.forceUpdate();
    }
  }
  public componentDidMount() {
    this.props.ids.forEach((id) => {
      SetVar.addListener(id, this.onTickled);
    });
  }
  public componentDidUpdate(prevProps: IReadManyVarProps) {
    const idsAdded = this.props.ids.filter((id) => !prevProps.ids.includes(id));
    const idsRemoved = prevProps.ids.filter((id) => !this.props.ids.includes(id));
    idsAdded.forEach((id) => {
      SetVar.addListener(id, this.onTickled);
    });
    idsRemoved.forEach((id) => {
      SetVar.removeListener(id, this.onTickled);
    });
    if (idsAdded.length || idsRemoved.length) {
      this.forceUpdate();
    }
  }
  public componentWillUnmount() {
    this.isUnmounted = true;
  }
  public render() {
    return this.props.children(
      this.props.ids.map((id) => SetVar.VAR_REGISTRY[id])
    );
  }
}