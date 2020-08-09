/**
 * The date time view handler
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import Moment from "moment";
/**
 * The property view date renderer
 */
export interface IPropertyViewDateTimeRendererProps extends IPropertyViewRendererProps<string> {
    /**
     * Current value as moment type
     */
    momentValue: Moment.Moment;
    /**
     * database format used for parsing
     */
    dbFormat: string;
    /**
     * default format used for displaying according to moment
     * in the user's language
     */
    defaultFormat: string;
    /**
     * The value already formatted in such form
     * using moment
     */
    defaultFormattedValue: string;
}
/**
 * The property view date time handler class
 */
export declare class PropertyViewDateTime extends React.Component<IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewDateTimeRendererProps>): boolean;
    render(): JSX.Element;
}
