import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { EndpointErrorType } from "../../../../base/errors";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import PropertyDefinition, { PropertyDefinitionValueType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
export interface IPropertyEntryReferenceOption {
    id: number;
    text: string;
}
export interface IReferrencedPropertySet {
    [propertyId: string]: PropertyDefinitionValueType;
}
export interface IPropertyEntryReferenceRendererProps extends IPropertyEntryRendererProps<number> {
    isNullable: boolean;
    i18nUnspecified: string;
    currentTextualValue: string;
    currentValueIsFullfilled: boolean;
    currentOptions: IPropertyEntryReferenceOption[];
    currentFindError: EndpointErrorType;
    currentSearchError: EndpointErrorType;
    onChangeSearch: (str: string, preventIds?: number[], preventEqualityWithProperties?: string[]) => void;
    loadAllPossibleValues: (limit: number, preventIds?: number[], preventEqualityWithProperties?: string[]) => void;
    refilterPossibleValues: (preventIds?: number[], preventEqualityWithProperties?: string[]) => void;
    onSelect: (option: IPropertyEntryReferenceOption) => void;
    onCancel: () => void;
    dismissSearchError: () => void;
    dismissFindError: () => void;
}
interface IPropertyEntryReferenceState {
    currentOptions: IPropertyEntryReferenceOption[];
    currentOptionsVersion: string;
    currentSearchError: EndpointErrorType;
    currentFindError: EndpointErrorType;
}
export default class PropertyEntryReference extends React.Component<IPropertyEntryHandlerProps<number, IPropertyEntryReferenceRendererProps>, IPropertyEntryReferenceState> {
    private searchTimeout;
    private currentlyFindingValueFor;
    private lastSearchId;
    private lastSearchArgumentLoadAll;
    private lastSearchArgumentLimit;
    private lastSearchArgumentPreventIds;
    private lastSearchArgumentPreventEqualityWithProperties;
    private lastCachedSearch;
    private lastCachedSearchPreventedProperties;
    private lastCachedSearchPreventedPropertiesIds;
    private lastCachedSearchPreventedIds;
    private ssrServerOnlyValue;
    private isUnmounted;
    constructor(props: IPropertyEntryHandlerProps<number, IPropertyEntryReferenceRendererProps>);
    changeListener(id: number, version: string): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    toggleListener(props: IPropertyEntryHandlerProps<number, IPropertyEntryReferenceRendererProps>, fn: string): void;
    addPreventEqualityWithPropertiesListener(properties: PropertyDefinition[]): void;
    removePreventEqualityWithPropertiesListener(properties: PropertyDefinition[]): void;
    addListeners(props?: IPropertyEntryHandlerProps<number, IPropertyEntryReferenceRendererProps>): void;
    removeListeners(props?: IPropertyEntryHandlerProps<number, IPropertyEntryReferenceRendererProps>): void;
    search(loadAll?: boolean, limit?: number, preventIds?: number[], preventEqualityWithProperties?: string[]): Promise<void>;
    getSpecialData(): [ItemDefinition, PropertyDefinition, PropertyDefinition];
    beforeSSRRender(): Promise<void>;
    getSSRFoundValue(forId: number, forVersion: string): string;
    findCurrentStrValue(forId: number, forVersion: string): Promise<void>;
    loadAllPossibleValues(limit: number, preventIds?: number[], preventEqualityWithProperties?: string[]): void;
    refilter(id: number, version: string): void;
    refilterPossibleValues(preventIds?: number[], preventEqualityWithProperties?: string[]): void;
    onChangeSearch(str: string, preventIds?: number[], preventEqualityWithProperties?: string[]): void;
    onSelect(option: IPropertyEntryReferenceOption): void;
    onCancel(): void;
    dismissSearchError(): void;
    dismissFindError(): void;
    componentDidUpdate(prevProps: IPropertyEntryHandlerProps<number, IPropertyEntryReferenceRendererProps>): void;
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<number, IPropertyEntryReferenceRendererProps>, nextState: IPropertyEntryReferenceState): boolean;
    render(): JSX.Element;
}
export {};
