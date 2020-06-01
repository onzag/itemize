import { IPropertyViewTextRendererProps } from "../../../internal/components/PropertyView/PropertyViewText";
import React from "react";
interface IPropertyViewRichTextViewerProps {
    children?: string;
}
export declare class PropertyViewRichTextViewer extends React.Component<IPropertyViewRichTextViewerProps> {
    private divref;
    private cheapdiv;
    constructor(props: IPropertyViewRichTextViewerProps);
    updateHTML(html: string): void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IPropertyViewRichTextViewerProps): boolean;
    render(): JSX.Element;
}
export default function PropertyViewTextRenderer(props: IPropertyViewTextRendererProps): JSX.Element;
export {};
