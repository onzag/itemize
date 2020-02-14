/**
 * This file represents the autocomplete file that is used in autocomplete properties
 * for autocompleting values in string property types, either with language or not
 *
 * schema.ts and checkers.ts are correlated
 *
 * @packageDocumentation
 */
/**
 * represents a single filter in a raw json form
 * these are the filters that the client sends in order
 * to perform value filtering
 */
export interface ISingleFilterRawJSONDataType {
    [key: string]: any;
}
/**
 * The autocomplete value that is contained as a single value
 * and might have or not locales included in it
 */
export interface IAutocompleteValueRawJSONDataType {
    type: "value";
    value: string;
    filter?: ISingleFilterRawJSONDataType;
    i18n?: {
        [locale: string]: string;
    };
}
/**
 * the filter raw json type that contains filter groups
 * these contain a bunch of values that are passed into a single filter
 */
export interface IFilterRawJSONDataType {
    type: "filter";
    filter: ISingleFilterRawJSONDataType;
    filters: IFilterRawJSONDataType[];
    values: IAutocompleteValueRawJSONDataType[];
}
/**
 * the parent autocomplete object
 */
export interface IAutocompleteRawJSONDataType {
    type: "autocomplete";
    name: string;
    filters: IFilterRawJSONDataType[];
    values: IAutocompleteValueRawJSONDataType[];
}
/**
 * the main autocomplete as obtained by the file
 */
export interface IFileAutocompleteRawJSONDataType {
    type: "autocomplete";
    filters: IFilterRawJSONDataType[];
    values: IAutocompleteValueRawJSONDataType[];
}
/**
 * this is the output that an autocomplete gives once
 * it has processed a value
 */
export interface IAutocompleteOutputType {
    value: string;
    valueNorm: string;
    i18n?: string;
    i18nNorm?: string;
}
/**
 * This is the class that actually does the search
 */
export default class Autocomplete {
    /**
     * The raw form of the autocomplete as defined by the json
     */
    private rawJSON;
    /**
     * The processed autocomplete from the raw form
     */
    private processedJSON;
    /**
     * Creates an autocomplete object from a given raw data value
     * @param value the value
     */
    constructor(value: IAutocompleteRawJSONDataType);
    /**
     * Finds recommendations from a match string and a specified
     * filter that is run against the autocomplete
     * @param matchStr the string to match (raw, not normalized, it is normalized)
     * @param specifiedFilter the specified filter object (or null)
     * @returns the recommendations filtered and sorted
     */
    findRecommendations(matchStr: string, specifiedFilter: ISingleFilterRawJSONDataType): IAutocompleteOutputType[];
    /**
     * Finds recommendations from a match string an a specified filter
     * that is run against the autocomplete i18n values for a given locale
     * @param matchStr the string to match (raw, not normalized, it is normalized)
     * @param locale the locale string
     * @param specifiedFilter the specified filter
     * @returns the i18n recommendation sorted and filtered
     */
    findI18nRecommendations(matchStr: string, locale: string, specifiedFilter: ISingleFilterRawJSONDataType): IAutocompleteOutputType[];
    /**
     * Searchs for an exact match for a value an a specified filter, returns null
     * if no such match is found, the value is not a match string, it is the value
     * and it is not normalized, it must be exact, case matters
     * @param value the value
     * @param specifiedFilter the specified filter
     * @returns the exact value if found, otherwise null
     */
    findExactValueFor(value: string, specifiedFilter: ISingleFilterRawJSONDataType): IAutocompleteOutputType;
    /**
     * Provides the autocomplete name
     * @returns the name
     */
    getName(): string;
    /**
     * Returns the raw json form
     * @returns the json form
     */
    toJSON(): IAutocompleteRawJSONDataType;
}
