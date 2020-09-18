/**
 * Contains the property view text renderer, another large
 * thing used for text/plain or text/html text, but not unsubtyped
 * text
 *
 * @packageDocumentation
 */
import { IPropertyViewTextRendererProps } from "../../../internal/components/PropertyView/PropertyViewText";
import React from "react";
/**
 * The rich text viewer props
 */
interface IPropertyViewRichTextViewerProps {
    disableLinks: boolean;
    children?: string;
}
/**
 * The rich text viewer state
 */
interface IPropertyViewRichTextViewerState {
    /**
     * The html is viewing, the reason it's different is because
     * we will add all these fancy properties to it that differ from the main
     * as well as event listeners
     */
    html: string;
}
/**
 * The rich text viewer used to view only types of text/html
 */
export declare class PropertyViewRichTextViewer extends React.PureComponent<IPropertyViewRichTextViewerProps, IPropertyViewRichTextViewerState> {
    /**
     * The reference for our div
     */
    private divref;
    /**
     * A cheap div we use for transformations
     */
    private cheapdiv;
    /**
     * The builder for the rich text viewer in text/html
     * @param props the props
     */
    constructor(props: IPropertyViewRichTextViewerProps);
    /**
     * For a given html it will provide the brand new html
     * that is going to be rendered instead for the inner html
     * @param html
     */
    getHTML(html: string): string;
    /**
     * Prepares the lazy loader, runs on mounting or changing
     */
    prepareLazyLoader(): void;
    /**
     * updates the html
     * @param html the html to update for
     */
    updateHTML(html: string): void;
    /**
     * Attach the events that are required for lazyloading
     */
    attachEvents(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: IPropertyViewRichTextViewerProps, nextState: IPropertyViewRichTextViewerState): boolean;
    render(): JSX.Element;
}
/**
 * The property view text renderer
 *
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 *
 * @param props the props passed by the handler
 * @returns a react element
 */
export default function PropertyViewTextRenderer(props: IPropertyViewTextRendererProps): JSX.Element;
export {};
