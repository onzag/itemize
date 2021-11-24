import React from "react";
import equals from "deep-equal";

interface ISetVarProps {
  id: string;
  objKey?: string;
  value: any;
}

export default class SetVar extends React.Component<ISetVarProps> {
  public static VAR_REGISTRY: {[key: string]: any} = {};
  public static VAR_LISTENER_REGISTRY: {[key: string]: Array<() => void>} = {};
  public static addListener(id: string, listener: () => void) {
    if (!SetVar.VAR_LISTENER_REGISTRY[id]) {
      SetVar.VAR_LISTENER_REGISTRY[id] = [];
    }
    if (SetVar.VAR_LISTENER_REGISTRY[id].indexOf(listener) === -1) {
      SetVar.VAR_LISTENER_REGISTRY[id].push(listener);
    }
  }
  public static removeListener(id: string, listener: () => void) {
    if (!SetVar.VAR_LISTENER_REGISTRY[id]) {
      return;
    }
    const index = SetVar.VAR_LISTENER_REGISTRY[id].indexOf(listener)
    if (index !== -1) {
      SetVar.VAR_LISTENER_REGISTRY[id].splice(index, 1);
    }
  }
  public tickle(id: string) {
    const listeners = SetVar.VAR_LISTENER_REGISTRY[id];
    if (listeners && listeners.length) {
      listeners.forEach((l) => l());
    }
  }
  public componentDidMount() {
    if (typeof this.props.objKey !== "undefined") {
      if (typeof SetVar.VAR_REGISTRY[this.props.id] === "undefined") {
        SetVar.VAR_REGISTRY[this.props.id] = {};
      }

      SetVar.VAR_REGISTRY[this.props.id][this.props.objKey] = this.props.value;
    } else {
      SetVar.VAR_REGISTRY[this.props.id] = this.props.value;
    }
    this.tickle(this.props.id);
  }
  public shouldComponentUpdate(nextProps: ISetVarProps) {
    if (nextProps.id !== this.props.id || nextProps.objKey !== this.props.objKey) {
      if (typeof this.props.objKey !== "undefined") {
        delete SetVar.VAR_REGISTRY[this.props.id][this.props.objKey];
        if (Object.keys(SetVar.VAR_REGISTRY[this.props.id]).length === 0) {
          delete SetVar.VAR_REGISTRY[this.props.id];
        }
      } else {
        delete SetVar.VAR_REGISTRY[this.props.id];
      }

      if (typeof nextProps.objKey !== "undefined") {
        if (typeof SetVar.VAR_REGISTRY[nextProps.id] === "undefined") {
          SetVar.VAR_REGISTRY[nextProps.id] = {};
        }
  
        SetVar.VAR_REGISTRY[nextProps.id][nextProps.objKey] = nextProps.value;
      } else {
        SetVar.VAR_REGISTRY[nextProps.id] = nextProps.value;
      }
      
      this.tickle(this.props.id);
      this.tickle(nextProps.id);
    } else if (!equals(nextProps.value, this.props.value, { strict: true })) {
      if (typeof nextProps.objKey !== "undefined") {
        SetVar.VAR_REGISTRY[nextProps.id][nextProps.objKey] = nextProps.value;
      } else {
        SetVar.VAR_REGISTRY[nextProps.id] = nextProps.value;
      }
      this.tickle(nextProps.id);
    }
    return false;
  }
  public componentWillUnmount() {
    if (typeof this.props.objKey !== "undefined") {
      delete SetVar.VAR_REGISTRY[this.props.id][this.props.objKey];
      if (Object.keys(SetVar.VAR_REGISTRY[this.props.id]).length === 0) {
        delete SetVar.VAR_REGISTRY[this.props.id];
      }
    } else {
      delete SetVar.VAR_REGISTRY[this.props.id];
    }
    this.tickle(this.props.id);
  }
  public render() {
    return null as any;
  }
}