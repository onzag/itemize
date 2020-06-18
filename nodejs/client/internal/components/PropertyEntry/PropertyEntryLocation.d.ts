import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
export declare enum IViewportZoomEnumType {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}
export interface IViewport {
    center: [number, number];
    zoom: IViewportZoomEnumType | number;
}
export interface IPropertyEntryLocationRendererProps extends IPropertyEntryRendererProps<IPropertyDefinitionSupportedLocationType> {
    onViewportChange: (viewport: IViewport) => void;
    onSearchQueryChange: (searchQuery: string, dontAutoloadSuggestions?: boolean) => void;
    onSearch: (mantainViewport?: boolean) => Promise<IPropertyDefinitionSupportedLocationType[]>;
    onChangeBySearchResult: (searchResult: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean) => void;
    onChangeBySuggestion: (searchSuggestion: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean) => void;
    clearSuggestions: () => void;
    clearSearchResults: () => void;
    onManualPick: (value: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean) => void;
    noResultsLabel: string;
    resultOutOfLabel: string;
    viewport: IViewport;
    searchSuggestions: IPropertyDefinitionSupportedLocationType[];
    activeSearchResults: IPropertyDefinitionSupportedLocationType[];
    nextSearchResult: IPropertyDefinitionSupportedLocationType;
    nextSearchResultCircular: IPropertyDefinitionSupportedLocationType;
    prevSearchResult: IPropertyDefinitionSupportedLocationType;
    prevSearchResultCircular: IPropertyDefinitionSupportedLocationType;
    searchQuery: string;
}
interface IPropertyEntryLocationState {
    suggestions: IPropertyDefinitionSupportedLocationType[];
    viewport: IViewport;
    searchResults: IPropertyDefinitionSupportedLocationType[];
    searchCurrentlyMarkedValue: number;
}
export default class PropertyEntryLocation extends React.Component<IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>, IPropertyEntryLocationState> {
    private searchTakingPlace;
    private autocompleteTakingPlace;
    private geocodeTakingPlace;
    private delaySuggestionFetch;
    private lastSuggestionsValue;
    private lastSuggestionsValueQ;
    private lastSearchValue;
    private lastSearchValueQ;
    private preventViewportDidUpdateChange;
    constructor(props: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>, nextState: IPropertyEntryLocationState): boolean;
    componentDidUpdate(prevProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>): void;
    onRestoreHijacked(): void;
    onViewportChange(viewport: IViewport): void;
    onSearchQueryChangeActual(searchQuery: string, updateIdentifier: number): Promise<void>;
    onSearchQueryChange(searchQuery: string, dontAutoloadSuggestions?: boolean): void;
    onChangeBySuggestion(suggestion: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean): void;
    onSearch(mantainViewport?: boolean): Promise<IPropertyDefinitionSupportedLocationType[]>;
    onChangeBySearchResult(searchResult: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean): void;
    clearSearchResults(): void;
    clearSuggestions(): void;
    geocode(value: IPropertyDefinitionSupportedLocationType): Promise<void>;
    onManualPick(value: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean): void;
    render(): JSX.Element;
}
export {};
