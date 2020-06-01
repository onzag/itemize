import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
export interface IPropertyViewSimpleRendererProps extends IPropertyViewRendererProps<string> {
    capitalize: boolean;
    language: string;
}
export declare class PropertyViewSimple extends React.Component<IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>): boolean;
    render(): JSX.Element;
}
