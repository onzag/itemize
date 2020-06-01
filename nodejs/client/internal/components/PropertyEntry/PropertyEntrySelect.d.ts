import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
export interface IPropertyEntrySelectRendererProps extends IPropertyEntryRendererProps<string> {
    values: Array<{
        i18nValue: string;
        value: string;
    }>;
    nullValue: {
        i18nValue: string;
        value: string;
    };
    isNullable: boolean;
    currentI18nValue: string;
}
export default class PropertyEntrySelect extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>> {
    constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<string, IPropertyEntrySelectRendererProps>): boolean;
    render(): JSX.Element;
}
