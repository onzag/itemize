import React from "react";
import { LocationStateContext } from "../../internal/providers/token-provider";
import { setHistoryQSState, setHistoryState } from ".";
import { Location } from "history";

interface ILocationStateReaderProps<S> {
  defaultState: S;
  stateIsInQueryString?: boolean;
  children: (
    state: S,
    setState: (state: Partial<S>, replace?: boolean) => void,
  ) => React.ReactNode;
}

export default function LocationStateReader<S>(props: ILocationStateReaderProps<S>) {
  return (
    <LocationStateContext.Consumer>
      {
        (location: Location<S>) => {
          if (props.stateIsInQueryString) {
            const searchParams = new URLSearchParams(location.search);
            const statefulValue = {};
            Object.keys(props.defaultState).forEach((key) => {
              statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
            });
            return props.children(statefulValue as S, setHistoryQSState.bind(null, location))
          } else {
            if (!location.state) {
              return props.children(props.defaultState, setHistoryState.bind(null, location));
            }
            const statefulValue = {};
            Object.keys(props.defaultState).forEach((key) => {
              statefulValue[key] = typeof location.state[key] !== "undefined" ? location.state[key] : props.defaultState[key];
            });
            return props.children(statefulValue as S, setHistoryState.bind(null, location));
          }
        }
      }
    </LocationStateContext.Consumer>
  );
}
