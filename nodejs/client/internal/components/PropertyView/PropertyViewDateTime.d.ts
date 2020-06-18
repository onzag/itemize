import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
export interface IPropertyViewDateTimeRendererProps extends IPropertyViewRendererProps<string> {
    momentValue: any;
    dbFormat: string;
    defaultFormat: string;
    defaultFormattedValue: string;
}
export declare class PropertyViewDateTime extends React.Component<IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>): boolean;
    render(): JSX.Element;
}
