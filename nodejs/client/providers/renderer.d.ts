import React from "react";
import { IIncludeCalloutWarningRendererProps } from "../internal/components/IncludeCalloutWarning";
import { IPropertyEntryFieldRendererProps } from "../internal/components/PropertyEntry/PropertyEntryField";
import { IPropertyEntryFileRendererProps } from "../internal/components/PropertyEntry/PropertyEntryFile";
import { IPropertyEntryBooleanRendererProps } from "../internal/components/PropertyEntry/PropertyEntryBoolean";
import { IPropertyEntryLocationRendererProps } from "../internal/components/PropertyEntry/PropertyEntryLocation";
import { IPropertyViewSimpleRendererProps } from "../internal/components/PropertyView/PropertyViewSimple";
import { IPropertyEntrySelectRendererProps } from "../internal/components/PropertyEntry/PropertyEntrySelect";
import { IPropertyEntryTextRendererProps } from "../internal/components/PropertyEntry/PropertyEntryText";
import { IPropertyViewTextRendererProps } from "../internal/components/PropertyView/PropertyViewText";
import { IPropertyViewFileRendererProps } from "../internal/components/PropertyView/PropertyViewFile";
import { IPropertyEntryDateTimeRendererProps } from "../internal/components/PropertyEntry/PropertyEntryDateTime";
import { IPropertyViewBooleanRendererProps } from "../internal/components/PropertyView/PropertyViewBoolean";
import { IPropertyViewDateTimeRendererProps } from "../internal/components/PropertyView/PropertyViewDateTime";
import { IPropertyViewLocationRendererProps } from "../internal/components/PropertyView/PropertyViewLocation";
import { IPropertyViewCurrencyRendererProps } from "../internal/components/PropertyView/PropertyViewCurrency";
import { IPropertyEntryReferenceRendererProps } from "../internal/components/PropertyEntry/PropertyEntryReference";
export interface IRendererContext {
    IncludeCalloutWarning?: React.ComponentType<IIncludeCalloutWarningRendererProps>;
    PropertyEntryField?: React.ComponentType<IPropertyEntryFieldRendererProps>;
    PropertyEntryReference?: React.ComponentType<IPropertyEntryReferenceRendererProps>;
    PropertyEntryFile?: React.ComponentType<IPropertyEntryFileRendererProps>;
    PropertyEntryBoolean?: React.ComponentType<IPropertyEntryBooleanRendererProps>;
    PropertyEntryLocation?: React.ComponentType<IPropertyEntryLocationRendererProps>;
    PropertyEntrySelect?: React.ComponentType<IPropertyEntrySelectRendererProps>;
    PropertyEntryText?: React.ComponentType<IPropertyEntryTextRendererProps>;
    PropertyEntryDateTime?: React.ComponentType<IPropertyEntryDateTimeRendererProps>;
    PropertyViewBoolean?: React.ComponentType<IPropertyViewBooleanRendererProps>;
    PropertyViewSimple?: React.ComponentType<IPropertyViewSimpleRendererProps>;
    PropertyViewText?: React.ComponentType<IPropertyViewTextRendererProps>;
    PropertyViewDateTime?: React.ComponentType<IPropertyViewDateTimeRendererProps>;
    PropertyViewFile?: React.ComponentType<IPropertyViewFileRendererProps>;
    PropertyViewLocation?: React.ComponentType<IPropertyViewLocationRendererProps>;
    PropertyViewCurrency?: React.ComponentType<IPropertyViewCurrencyRendererProps>;
}
export declare const RendererContext: React.Context<IRendererContext>;
interface IRendererProviderProps extends IRendererContext {
    children: React.ReactNode;
}
export default function RendererProvider(props: IRendererProviderProps): JSX.Element;
export {};
