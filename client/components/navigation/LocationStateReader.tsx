import React from "react";
import { setHistoryQSState, setHistoryState } from ".";
import { Location } from "history";
import { withRouter } from "react-router-dom";

interface ILocationStateReaderProps<S> {
  defaultState: S;
  stateIsInQueryString?: boolean;
  children: (
    state: S,
    setState: (state: Partial<S>, replace?: boolean) => void,
  ) => React.ReactNode;
}

interface ILocationStateReaderPropsWithLocation<S> extends ILocationStateReaderProps<S> {
  location: Location;
}

function LocationStateReader<S>(props: ILocationStateReaderPropsWithLocation<S>) {
  if (props.stateIsInQueryString) {
    const searchParams = new URLSearchParams(props.location.search);
    const statefulValue = {};
    Object.keys(props.defaultState).forEach((key) => {
      statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
    });
    return props.children(statefulValue as S, setHistoryQSState.bind(null, props.location))
  } else {
    if (!props.location.state) {
      return props.children(props.defaultState, setHistoryState.bind(null, props.location));
    }
    const statefulValue = {};
    Object.keys(props.defaultState).forEach((key) => {
      statefulValue[key] = typeof props.location.state[key] !== "undefined" ? props.location.state[key] : props.defaultState[key];
    });
    return props.children(statefulValue as S, setHistoryState.bind(null, props.location));
  }
}

// buggy typescript forces me to do it this way
function FakeLocationStateReader<S>(props: ILocationStateReaderProps<S>) {
  return null as any;
}
export default withRouter(LocationStateReader as any) as any as typeof FakeLocationStateReader;