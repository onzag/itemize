/**
 * The standard handler for the property view simple
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
/**
 * The property view simple renderer props
 */
export interface IPropertyViewSimpleRendererProps extends IPropertyViewRendererProps<string> {
    /**
     * Whether it should capitalize
     */
    capitalize: boolean;
    /**
     * The language code it's currently using
     */
    language: string;
}
/**
 * The property view simple class
 */
export declare class PropertyViewSimple extends React.Component<IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>): boolean;
    render(): JSX.Element;
}
