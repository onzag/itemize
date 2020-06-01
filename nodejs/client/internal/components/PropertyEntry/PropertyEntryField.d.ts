import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
export interface IPropertyEntryFieldRendererProps extends IPropertyEntryRendererProps<string> {
    type: "string" | "password";
    subtype?: "email";
    htmlAutocomplete?: string;
}
export default class PropertyEntryField extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryFieldRendererProps>> {
    constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntryFieldRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<string, IPropertyEntryFieldRendererProps>): boolean;
    render(): JSX.Element;
}
