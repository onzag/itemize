/**
 * Nice utility function that allows to read the title of the application
 * that is currently being used in the document title itself
 *
 * @packageDocumentation
 */
import React from "react";
interface ActualTitleReaderProps {
    ssrTitle: string;
}
export declare class ActualTitleReader extends React.Component<ActualTitleReaderProps, {}> {
    private hasRenderedInitial;
    constructor(props: ActualTitleReaderProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): string;
}
/**
 * Will read the title from the document itself and keep itself
 * by listening to changes on this title (when they are set by the setter)
 * mantains sync with the title property
 */
export default function TitleReader(): JSX.Element;
export {};
