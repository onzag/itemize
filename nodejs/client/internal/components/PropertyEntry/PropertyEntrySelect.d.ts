import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
export interface IPropertyEntrySelectRendererProps extends IPropertyEntryRendererProps<string | number> {
    values: Array<{
        i18nValue: string;
        value: string | number;
    }>;
    nullValue: {
        i18nValue: string;
        value: string | number;
    };
    isNullable: boolean;
    isNumeric: boolean;
    currentI18nValue: string;
}
export default class PropertyEntrySelect extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>> {
    constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>): boolean;
    render(): JSX.Element;
}
