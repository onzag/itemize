/**
 * The location handler
 * @packageDocumentation
 */
import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
/**
 * The viewpoer zoom sizes, implement as you wish, but these zooms
 * are considered and should be handled by your implementation
 */
export declare enum IViewportZoomEnumType {
    /**
     * Should mean the most zoomed out, show an country
     */
    SMALL = "SMALL",
    /**
     * A default zoom status
     */
    MEDIUM = "MEDIUM",
    /**
     * Zoomed in the most, show an address
     */
    LARGE = "LARGE"
}
/**
 * This is your viewport object, it contains a center
 * and a zoom; this viewport object is meant to work
 * nicely with leaflet but it's not limited to it, however
 * it won't work out of the box as you still need the conversions
 * for the zooms
 */
export interface IViewport {
    /**
     * The center in the lat, lng form
     */
    center: [number, number];
    /**
     * The zoom, either one of our default types or as you manually
     * change an user defined custom number
     */
    zoom: IViewportZoomEnumType | number;
}
/**
 * The location renderer props, just like other special renderers do not use the onChange raw function, as the functionality
 * is too complex for it and this handler will handle internal states for you
 */
export interface IPropertyEntryLocationRendererProps extends IPropertyEntryRendererProps<IPropertyDefinitionSupportedLocationType> {
    /**
     * Trigger when the viewport changes, so a new viewport is provided
     */
    onViewportChange: (viewport: IViewport) => void;
    /**
     * Trigger when the search query changes
     * @param searchQuery the search query that is specified
     * @param dontAutoloadSuggestions avoid automatically loading suggestions
     * for this change, if your implementation has an specific time when to load
     * suggestions, call this function again with false for this value then
     */
    onSearchQueryChange: (searchQuery: string, dontAutoloadSuggestions?: boolean) => void;
    /**
     * Trigger when the search button or the sorts is pressed
     * search will use the search query but will perform a deep search instead
     * suggestions are not the same as search results
     * @param mantainViewport by default the search will move the viewport
     * to the first search result, with mantainViewport the viewport won't move
     * @returns a promise with the results
     */
    onSearch: (mantainViewport?: boolean) => Promise<IPropertyDefinitionSupportedLocationType[]>;
    /**
     * Picks a search result and assigns it as the current value
     * @param searchResult the search result to use
     * @param mantainViewport by default choosing a search result will move
     * the viewport to that search location, by passing this as true
     * you will prevent that
     */
    onChangeBySearchResult: (searchResult: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean) => void;
    /**
     * Picks a suggestion and assigns it as the current value, choosing
     * a suggestion is similar from a search result, so do not mix them
     * up; if a search result is beng used, use the search change function
     * as that will update the list of search results and marked locations
     * @param searchSuggestion the search suggestion
     * @param mantainViewport by default choosing a suggestion will move
     * the viewport to that search location, by passing this as true
     * you will prevent that
     */
    onChangeBySuggestion: (searchSuggestion: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean) => void;
    /**
     * Clear all the suggestions
     */
    clearSuggestions: () => void;
    /**
     * Clear all the suggestions
     */
    clearSearchResults: () => void;
    /**
     * Manually choose a value, this function is rather special
     * on the mechanism that it uses, given that it will try to autocomplete
     * incomplete picks
     * @param value the value of that we want to manually pick
     * @param value.id an id that we are manually picking for, this is an uuid
     * if you don't pass an id, it will request a geocode in order to get an id
     * pass null to request a geocode
     * @param value.txt the standard text form we are picking for, you should
     * always pass a value for it
     * @param value.atxt an alternative (not specified by the user) value, if you
     * don't specify one, pass null to it to request a geocode
     * @param value.lng the longitude, required
     * @param value.lat the latitude, required
     * @param mantainViewport by default doing a manual pick will fly to that
     * location, pass true to this to prevent that
     */
    onManualPick: (value: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean) => void;
    /**
     * A label to show when the search yielded no results
     */
    noResultsLabel: string;
    /**
     * The current localized lable of the current result, will
     * say something like, "result 1 out of 29"; in the user's language
     */
    resultOutOfLabel: string;
    /**
     * The current viewport
     */
    viewport: IViewport;
    /**
     * The current search suggestions, an array and always an array
     */
    searchSuggestions: IPropertyDefinitionSupportedLocationType[];
    /**
     * The current active search results, an array, but if a search
     * is not taking place, the value is null
     */
    activeSearchResults: IPropertyDefinitionSupportedLocationType[];
    /**
     * The next search result from the active search result list,
     * null if no next
     */
    nextSearchResult: IPropertyDefinitionSupportedLocationType;
    /**
     * The next search result, but circular, aka, it will
     * loop back to the first one; null if search results is empty
     */
    nextSearchResultCircular: IPropertyDefinitionSupportedLocationType;
    /**
     * The next search result from the active search result list,
     * null if no prev
     */
    prevSearchResult: IPropertyDefinitionSupportedLocationType;
    /**
     * The prev search result, but circular, aka, it will
     * loop back to the first one; null if search results is empty
     */
    prevSearchResultCircular: IPropertyDefinitionSupportedLocationType;
    /**
     * The search query we are searching or suggesting for, and/or
     * what is currently visible, use this as the value for your
     * field, ignore currentValue
     */
    searchQuery: string;
}
/**
 * The location state
 */
interface IPropertyEntryLocationState {
    /**
     * Represent the current suggestions we have
     */
    suggestions: IPropertyDefinitionSupportedLocationType[];
    /**
     * The current viewport for the map
     */
    viewport: IViewport;
    /**
     * Current search results, or null, if no current search
     */
    searchResults: IPropertyDefinitionSupportedLocationType[];
    /**
     * And the index of the current search result if we have chosen one from it
     */
    searchCurrentlyMarkedValue: number;
}
/**
 * The property entry location class
 */
export default class PropertyEntryLocation extends React.Component<IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>, IPropertyEntryLocationState> {
    private searchTakingPlace;
    private autocompleteTakingPlace;
    private geocodeTakingPlace;
    private delaySuggestionFetch;
    private lastSuggestionsValue;
    private lastSuggestionsValueQ;
    private lastSearchValue;
    private lastSearchValueQ;
    constructor(props: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>, nextState: IPropertyEntryLocationState): boolean;
    componentDidUpdate(prevProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>): void;
    /**
     * Hijacking the on restore function
     */
    onRestoreHijacked(): void;
    onViewportChange(viewport: IViewport): void;
    /**
     * Actuall what triggers
     * @param searchQuery the search query we are using
     * @param updateIdentifier the identifier of this, to ensure
     * that if two changes happened at once, only the last one wil trigger
     */
    onSearchQueryChangeActual(searchQuery: string, updateIdentifier: number): Promise<void>;
    /**
     * Triggers when the search query changes, this is the literal
     * function that is fed to the renderer
     * @param searchQuery the search query the renderer gives
     * @param dontAutoloadSuggestions and whether we should not autoload suggestions
     */
    onSearchQueryChange(searchQuery: string, dontAutoloadSuggestions?: boolean): void;
    /**
     * Fed to the renderer to change by suggestion
     * @param suggestion the suggestion we are using
     * @param mantainViewport whether to mantain the viewport
     */
    onChangeBySuggestion(suggestion: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean): void;
    /**
     * Fed to the renderer in order to run a search
     * @param mantainViewport whether to mantain the viewport
     */
    onSearch(mantainViewport?: boolean): Promise<IPropertyDefinitionSupportedLocationType[]>;
    /**
     * Fed to the renderer to change by search result
     * @param searchResult the search result in question
     * @param mantainViewport whether to mantain the viewport
     */
    onChangeBySearchResult(searchResult: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean): void;
    clearSearchResults(): void;
    clearSuggestions(): void;
    /**
     * run the geocode for incomplete values
     * @param value
     */
    geocode(value: IPropertyDefinitionSupportedLocationType): Promise<void>;
    onManualPick(value: IPropertyDefinitionSupportedLocationType, mantainViewport?: boolean): void;
    render(): JSX.Element;
}
export {};
