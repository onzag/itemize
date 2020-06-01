import PropertyDefinition, { IPropertyDefinitionState } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import { Ii18NType } from "../../../../base/Root";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ICurrencyType, ICountryType } from "../../../../imported-resources";
import { IRendererProps } from "../../renderer";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import Include from "../../../../base/Root/Module/ItemDefinition/Include";
import { IConfigRawJSONDataType } from "../../../../config";
/**
 * This is what every renderer gets regardless of type as long as it's an entry
 * type, it will get this instance as its props, the ValueType represents the property definition
 * type it epects as its current value
 *
 * Expect these to be extended
 */
export interface IPropertyEntryRendererProps<ValueType> extends IRendererProps {
    label?: string;
    placeholder?: string;
    description?: string;
    icon?: React.ReactNode;
    currentAppliedValue: ValueType;
    canRestore: boolean;
    currentValue: ValueType;
    currentValid: boolean;
    currentInvalidReason?: string;
    currentInternalValue?: any;
    autoFocus: boolean;
    disabled: boolean;
    onChange: (value: ValueType, internalValue: any) => void;
    onRestore: () => void;
}
/**
 * This is what the whole entry react component expects as its properties
 * this is what should be fed to the generic PropertyEntry and it doesn't extend
 * anything, an optional renderer and rendererArgs can be passed to modify where
 * the values are distributed
 */
export interface IPropertyEntryMainHandlerProps<ValueType, RendererPropsType> {
    config?: IConfigRawJSONDataType;
    itemDefinition: ItemDefinition;
    injectSubmitBlockPromise: (arg: Promise<any>) => void;
    include: Include;
    property: PropertyDefinition;
    containerId: string;
    state: IPropertyDefinitionState;
    onChange: (newValue: ValueType, internalValue: any) => void;
    onRestore: () => void;
    forId: number;
    forVersion: string;
    forceInvalid?: boolean;
    hideDescription?: boolean;
    altDescription?: string;
    altLabel?: string;
    altPlaceholder?: string;
    poked?: boolean;
    autoFocus?: boolean;
    icon?: React.ReactNode;
    ignoreErrors?: boolean;
    renderer?: React.ComponentType<RendererPropsType>;
    rendererArgs?: object;
}
/**
 * This is what the handler gets, every handler is contained within this folder, it contains every property within
 * the base that is directly fed as well as these extra that are obtained from the context itself
 */
export interface IPropertyEntryHandlerProps<ValueType, RendererPropsType> extends IPropertyEntryMainHandlerProps<ValueType, RendererPropsType> {
    language: string;
    rtl: boolean;
    currency: ICurrencyType;
    i18n: Ii18NType;
    country: ICountryType;
}
export default function PropertyEntry(props: IPropertyEntryMainHandlerProps<PropertyDefinitionSupportedType, IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>): JSX.Element;
