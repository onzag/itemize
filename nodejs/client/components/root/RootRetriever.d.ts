/**
 * Does the very simple job of retrieving the root
 *
 * @packageDocumentation
 */
import React from "react";
import Root from "../../../base/Root";
/**
 * Simply provides the root
 */
interface IRootRetrieverProps {
    children: (arg: {
        root: Root;
    }) => React.ReactNode;
}
/**
 * Provides the root of the itemize app, for advanced usage
 *
 * @param props the root retriver props
 * @returns a react element
 */
export default function RootRetriever(props: IRootRetrieverProps): JSX.Element;
export {};
