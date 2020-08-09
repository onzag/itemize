/**
 * Contains the handler for the boolean type
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
/**
 * The renderer props for the boolean type which also include
 */
export interface IPropertyViewBooleanRendererProps extends IPropertyViewRendererProps<boolean> {
    /**
     * Yes, in the user language
     */
    i18nYes: string;
    /**
     * No in the user language
     */
    i18nNo: string;
    /**
     * unspecified in the user language
     */
    i18nUnspecified: string;
}
/**
 * The property view boolean handler
 */
export declare class PropertyViewBoolean extends React.Component<IPropertyViewHandlerProps<IPropertyViewBooleanRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewBooleanRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewBooleanRendererProps>): boolean;
    render(): JSX.Element;
}
