import React from "react";
import { PropertyDefinitionSupportedDateType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/date";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
interface IPropertyEntryDateTimeState {
    /**
     * TODO this is done along with onChangeByMoment in order to avoid
     * having invalid dates as they are being set by the renderer here, that's a problem
     * of the renderer not of the handler, this logic should be moved to the renderer
     * and not be here, DO THIS only when necessary
     */
    value: any;
}
export interface IPropertyEntryDateTimeRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedDateType> {
    type: "datetime" | "date" | "time";
    momentValue: any;
    i18nCancel: string;
    i18nOk: string;
    onChangeByMoment: (value: any) => void;
}
export default class PropertyEntryDateTime extends React.Component<IPropertyEntryHandlerProps<PropertyDefinitionSupportedDateType, IPropertyEntryDateTimeRendererProps>, IPropertyEntryDateTimeState> {
    constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedDateType, IPropertyEntryDateTimeRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedDateType, IPropertyEntryDateTimeRendererProps>, nextState: IPropertyEntryDateTimeState): boolean;
    componentDidUpdate(prevProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedDateType, IPropertyEntryDateTimeRendererProps>): void;
    handleOnChange(date: any): void;
    render(): JSX.Element;
}
export {};
