import React from "react";
interface ILocationStateReaderProps<S> {
    defaultState: S;
    stateIsInQueryString?: boolean;
    children: (state: S, setState: (state: Partial<S>, replace?: boolean) => void) => React.ReactNode;
}
export default function LocationStateReader<S>(props: ILocationStateReaderProps<S>): JSX.Element;
export {};
