/**
 * Contains the base function that handles read, view, and entry all of them
 * in a single function single the logic that handles this under the hood is remarkably similar
 *
 * @packageDocumentation
 */
import React from "react";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { SearchVariants } from "../../../constants";
/**
 * The base interface, all entry, read, view, set contain these attributes
 */
export interface IPropertyBaseProps {
    /**
    * the id of the property that must exist under the item definition
    * provider
    */
    id: string;
    /**
     * A search variant, exact, from, to, radius, etc...
     * only truly available in search mode
     */
    searchVariant?: SearchVariants;
    /**
     * the policy type, should be provided with a policy name
     */
    policyType?: string;
    /**
     * the policy name, should be provided with a policy type
     */
    policyName?: string;
}
/**
 * The base interface with renderers this time
 */
export interface IPropertyBaseWithRendererProps<RendererPropsType> extends IPropertyBaseProps {
    /**
     * the renderer in charge of rendering the output
     */
    renderer?: React.ComponentType<RendererPropsType>;
    /**
     * Extra renderer args
     */
    rendererArgs?: object;
}
/**
 * The entry props for all read, view, and entry
 */
export interface IPropertyEntryProps<RendererPropsType> extends IPropertyBaseWithRendererProps<RendererPropsType> {
    /**
     * an optional function to get the value as the property changes
     */
    onChange?: (value: PropertyDefinitionSupportedType) => void;
    /**
     * make it seem as invalid, allows displaying an entry property as invalid
     */
    showAsInvalid?: boolean;
    /**
     * An icon to display alognside
     */
    icon?: React.ReactNode;
    /**
     * Whether to hide the description that is hidden in language data
     */
    hideDescription?: boolean;
    /**
     * An alternative description
     */
    altDescription?: string;
    /**
     * An alternative label
     */
    altLabel?: string;
    /**
     * An alternative placeholder
     */
    altPlaceholder?: string;
    /**
     * Whether to ignore the errors
     * that are given
     */
    ignoreErrors?: boolean;
    /**
     * Focus on mount
     */
    autoFocus?: boolean;
    /**
     * The value to prefill with on mount
     */
    prefillWith?: PropertyDefinitionSupportedType;
    /**
     * Used only for the referenced type, to add to
     * the reference filtering set options
     */
    referenceFilteringSet?: {
        [key: string]: PropertyDefinitionSupportedType;
    };
}
/**
 * The setter props
 */
export interface IPropertySetterProps extends IPropertyBaseProps {
    /**
     * The value to provide to such property
     */
    value: PropertyDefinitionSupportedType;
}
/**
 * The reader props
 */
export interface IPropertyReadProps extends IPropertyBaseProps {
    /**
     * The reader callback
     */
    children?: (value: PropertyDefinitionSupportedType, state: IPropertyDefinitionState) => React.ReactNode;
    /**
     * whether to use the applied value rather than the
     * actual current value the applied value is synced
     * with the server
     */
    useAppliedValue?: boolean;
}
/**
 * The view props
 */
export interface IPropertyViewProps<RendererPropsType> extends IPropertyBaseWithRendererProps<RendererPropsType> {
    /**
     * Whether to capitalize
     */
    capitalize?: boolean;
    /**
     * whether to use the applied value rather than the
     * actual current value the applied value is synced
     * with the server
     */
    useAppliedValue?: boolean;
}
/**
 * The props it takes basically extends everything
 */
interface IPropertyEntryViewReadSetProps<RendererPropsType> extends IPropertyEntryProps<RendererPropsType>, IPropertyViewProps<RendererPropsType>, IPropertySetterProps, IPropertyReadProps {
}
/**
 * This is a legit function that takes all the props in order to pipe them
 * to the proper handler
 * @param props the props that are passed
 * @param type the type, entry, view, read, or set
 * @returns a react component
 */
export declare function EntryViewReadSet(props: IPropertyEntryViewReadSetProps<any>, type: "entry" | "view" | "read" | "set"): JSX.Element;
export {};
