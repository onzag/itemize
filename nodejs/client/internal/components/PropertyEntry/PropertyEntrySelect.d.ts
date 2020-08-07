/**
 * The entry select renderer for specific valid values
 * @packageDocumentation
 */
import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
/**
 * The renderer props for implementing the select renderer that pops in
 * when a property has specific valid values
 *
 * The select handler and renderer is one of the simplest of its kind
 */
export interface IPropertyEntrySelectRendererProps extends IPropertyEntryRendererProps<string | number> {
    /**
     * The values we are working with, an array that contains
     * how they are going to be displayed in the user's language and the actual value
     */
    values: Array<{
        i18nValue: string;
        value: string | number;
    }>;
    /**
     * The null value
     */
    nullValue: {
        i18nValue: string;
        value: null;
    };
    /**
     * Whether it is nullable, so null should be an option
     */
    isNullable: boolean;
    /**
     * Whether it represents a numeric value
     */
    isNumeric: boolean;
    /**
     * The current value in its localized form
     */
    currentI18nValue: string;
}
/**
 * The select handler
 */
export default class PropertyEntrySelect extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>> {
    constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>): boolean;
    render(): JSX.Element;
}
