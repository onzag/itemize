import React, { useCallback, useEffect, useRef } from "react";
import equals from "deep-equal";

interface ISetVarProps {
  id: string;
  objKey?: string;
  value: any;
}

function tickle(id: string) {
  const listeners = SetVar.VAR_LISTENER_REGISTRY[id];
  if (listeners && listeners.length) {
    listeners.forEach((l) => l());
  }
}

export default class SetVar extends React.Component<ISetVarProps> {
  public static VAR_REGISTRY: { [key: string]: any } = {};
  public static VAR_LISTENER_REGISTRY: { [key: string]: Array<() => void> } = {};
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
  public componentDidMount() {
    if (typeof this.props.objKey !== "undefined") {
      if (typeof SetVar.VAR_REGISTRY[this.props.id] === "undefined") {
        SetVar.VAR_REGISTRY[this.props.id] = {};
      }

      SetVar.VAR_REGISTRY[this.props.id][this.props.objKey] = this.props.value;
    } else {
      SetVar.VAR_REGISTRY[this.props.id] = this.props.value;
    }
    tickle(this.props.id);
  }
  public shouldComponentUpdate(nextProps: ISetVarProps) {
    if (nextProps.id !== this.props.id || nextProps.objKey !== this.props.objKey) {
      if (typeof this.props.objKey !== "undefined") {
        // we make a new one because this may cause memory pollution
        // when reading and comparing previous with new value
        // in some form of simplified way
        SetVar.VAR_REGISTRY[this.props.id] = {
          ...SetVar.VAR_REGISTRY[this.props.id],
        };
        delete SetVar.VAR_REGISTRY[this.props.id][this.props.objKey];
        if (Object.keys(SetVar.VAR_REGISTRY[this.props.id]).length === 0) {
          delete SetVar.VAR_REGISTRY[this.props.id];
        }
      } else {
        delete SetVar.VAR_REGISTRY[this.props.id];
      }

      if (typeof nextProps.objKey !== "undefined") {
        // we make a new one because this may cause memory pollution
        // when reading and comparing previous with new value
        // in some form of simplified way
        SetVar.VAR_REGISTRY[nextProps.id] = {
          ...SetVar.VAR_REGISTRY[nextProps.id],
          [nextProps.objKey]: nextProps.value,
        };
      } else {
        SetVar.VAR_REGISTRY[nextProps.id] = nextProps.value;
      }

      tickle(this.props.id);
      tickle(nextProps.id);
    } else if (!equals(nextProps.value, this.props.value, { strict: true })) {
      if (typeof nextProps.objKey !== "undefined") {
        // we make a new one because this may cause memory pollution
        // when reading and comparing previous with new value
        // in some form of simplified way
        SetVar.VAR_REGISTRY[nextProps.id] = {
          ...SetVar.VAR_REGISTRY[nextProps.id],
          [nextProps.objKey]: nextProps.value,
        }
      } else {
        SetVar.VAR_REGISTRY[nextProps.id] = nextProps.value;
      }
      tickle(nextProps.id);
    }
    return false;
  }
  public componentWillUnmount() {
    if (typeof this.props.objKey !== "undefined") {
      // we make a new one because this may cause memory pollution
      // when reading and comparing previous with new value
      // in some form of simplified way
      SetVar.VAR_REGISTRY[this.props.id] = {
        ...SetVar.VAR_REGISTRY[this.props.id],
      };
      delete SetVar.VAR_REGISTRY[this.props.id][this.props.objKey];
      if (Object.keys(SetVar.VAR_REGISTRY[this.props.id]).length === 0) {
        delete SetVar.VAR_REGISTRY[this.props.id];
      }
    } else {
      delete SetVar.VAR_REGISTRY[this.props.id];
    }
    tickle(this.props.id);
  }
  public render() {
    return null as any;
  }
}

/**
 * the SetVar functionality but as a hook
 * 
 * @param options 
 */
export function useSetVar(options: ISetVarProps) {
  const previouslyClearedElement = useRef(null as ISetVarProps);
  const currentOptionsIdRef = useRef(null as string);
  currentOptionsIdRef.current = options.id;

  useEffect(() => {
    // prevent double tickling during cleanup
    // however this means that we need to also call the function
    // right at the end since the next use effect may not call
    // and we may have an invalid state
    if (previouslyClearedElement.current && previouslyClearedElement.current?.id !== options.id) {
      tickle(previouslyClearedElement.current.id);
    }

    // do the same as componentDidiMount
    if (typeof options.objKey !== "undefined") {
      if (typeof SetVar.VAR_REGISTRY[options.id] === "undefined") {
        SetVar.VAR_REGISTRY[options.id] = {};
      }

      SetVar.VAR_REGISTRY[options.id][options.objKey] = options.value;
    } else {
      SetVar.VAR_REGISTRY[options.id] = options.value;
    }
    tickle(options.id);

    return () => {
      // here we clean up the value
      // and we may set it again in the next useEffect
      // call or otherwise if it unmounts, it will tickle anyway
      // right at the end

      if (typeof options.objKey !== "undefined") {
        // we make a new one because this may cause memory pollution
        // when reading and comparing previous with new value
        // in some form of simplified way
        SetVar.VAR_REGISTRY[options.id] = {
          ...SetVar.VAR_REGISTRY[options.id],
        };
        delete SetVar.VAR_REGISTRY[options.id][options.objKey];
        if (Object.keys(SetVar.VAR_REGISTRY[options.id]).length === 0) {
          delete SetVar.VAR_REGISTRY[options.id];
        }
      } else {
        delete SetVar.VAR_REGISTRY[options.id];
      }
      previouslyClearedElement.current = options;
    }
  }, [options.id, options.objKey, options.value]);

  useEffect(() => {
    return () => {
      // this ensures that the tickle is called when it fully unmounts
      tickle(currentOptionsIdRef.current);
    }
  }, []);

}

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  (window as any).SetVar = SetVar;
}