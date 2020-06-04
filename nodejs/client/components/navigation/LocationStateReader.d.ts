import React from "react";
interface ILocationStateReaderProps<S> {
    defaultState: S;
    stateIsInQueryString?: boolean;
    children: (state: S, setState: (state: Partial<S>, replace?: boolean) => void) => React.ReactNode;
}
declare function FakeLocationStateReader<S>(props: ILocationStateReaderProps<S>): any;
declare const _default: typeof FakeLocationStateReader;
export default _default;
