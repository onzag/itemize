import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
export interface IPropertyViewBooleanRendererProps extends IPropertyViewRendererProps<boolean> {
    i18nYes: string;
    i18nNo: string;
    i18nUnspecified: string;
}
export declare class PropertyViewBoolean extends React.Component<IPropertyViewHandlerProps<IPropertyViewBooleanRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewBooleanRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewBooleanRendererProps>): boolean;
    render(): JSX.Element;
}
