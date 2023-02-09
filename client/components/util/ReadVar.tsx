import React, { useCallback, useEffect, useState } from "react";

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
    if (!equals(this.lastRenderRoundValue, SetVar.VAR_REGISTRY[this.props.id], { strict: true })) {
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

export function useReadVar(id: string) {
  const [value, setValue] = useState(null as any);

  const onTickled = useCallback(() => {
    setValue(SetVar.VAR_REGISTRY[id]);
  }, [id]);

  useEffect(() => {
    SetVar.addListener(id, onTickled);

    return () => {
      SetVar.removeListener(id, onTickled);
    }
  }, [id, onTickled]);

  // we don't use the value even when we use it, so it basically
  // forces an update from the setState
  return SetVar.VAR_REGISTRY[id];
}