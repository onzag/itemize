import { IPropertyViewTextRendererProps } from "../../../internal/components/PropertyView/PropertyViewText";
import React from "react";
interface IPropertyViewRichTextViewerProps {
    children?: string;
}
interface IPropertyViewRichTextViewerState {
    html: string;
}
export declare class PropertyViewRichTextViewer extends React.Component<IPropertyViewRichTextViewerProps, IPropertyViewRichTextViewerState> {
    private divref;
    private cheapdiv;
    constructor(props: IPropertyViewRichTextViewerProps);
    getHTML(html: string): string;
    prepareLazyLoader(): void;
    updateHTML(html: string): void;
    attachEvents(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: IPropertyViewRichTextViewerProps, nextState: IPropertyViewRichTextViewerState): boolean;
    render(): JSX.Element;
}
export default function PropertyViewTextRenderer(props: IPropertyViewTextRendererProps): JSX.Element;
export {};
