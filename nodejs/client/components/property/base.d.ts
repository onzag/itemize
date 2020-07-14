import React from "react";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { SearchVariants } from "../../../constants";
export interface IPropertyEntryProps<RendererPropsType> {
    id: string;
    onChange?: (value: PropertyDefinitionSupportedType) => void;
    searchVariant?: SearchVariants;
    policyType?: string;
    policyName?: string;
    showAsInvalid?: boolean;
    icon?: React.ReactNode;
    renderer?: React.ComponentType<RendererPropsType>;
    rendererArgs?: object;
    hideDescription?: boolean;
    altDescription?: string;
    altLabel?: string;
    altPlaceholder?: string;
    ignoreErrors?: boolean;
    autoFocus?: boolean;
    useAppliedValue?: boolean;
}
export interface IPropertySetterProps {
    id: string;
    searchVariant?: SearchVariants;
    policyType?: string;
    policyName?: string;
    value: PropertyDefinitionSupportedType;
}
export interface IPropertyReadProps {
    id: string;
    searchVariant?: SearchVariants;
    policyType?: string;
    policyName?: string;
    children?: (value: PropertyDefinitionSupportedType, state: IPropertyDefinitionState) => React.ReactNode;
}
export interface IPropertyViewProps<RendererPropsType> {
    id: string;
    capitalize?: boolean;
    searchVariant?: SearchVariants;
    renderer?: React.ComponentType<RendererPropsType>;
    rendererArgs?: object;
    useAppliedValue?: boolean;
}
interface IPropertyEntryViewReadSetProps<RendererPropsType> extends IPropertyEntryProps<RendererPropsType>, IPropertyViewProps<RendererPropsType>, IPropertySetterProps, IPropertyReadProps {
}
export declare function EntryViewReadSet(props: IPropertyEntryViewReadSetProps<any>, type: "entry" | "view" | "read" | "set"): JSX.Element;
export {};
