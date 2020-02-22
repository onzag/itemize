"use strict";
/**
 * This file represents the autocomplete file that is used in autocomplete properties
 * for autocompleting values in string property types, either with language or not
 *
 * schema.ts and checkers.ts are correlated
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diacritics_1 = __importDefault(require("diacritics"));
/**
 * Takes a processed value or a processed filter array, or combined and
 * returns values and only values that do match as the output type
 * @param values the array of values and filters
 * @param specifiedFilter the specified filter provided by the client
 * @param matchStr the string that the client specified should be matched (make sure to normalize it)
 * @param locale (optional) the locale that is required for a i18n search
 * @returns the filtered output
 */
function filterFrom(values, specifiedFilter, matchStr, locale) {
    // so we build the array for our matched results
    let filteredValues = [];
    // and we start looping for each of our values
    values.forEach((value) => {
        // if the value has a filter, we must check that every key
        // is matching
        if (value.filter && specifiedFilter !== null) {
            for (const key of Object.keys(value.filter)) {
                if (value.filter[key] !== specifiedFilter[key]) {
                    return;
                }
            }
        }
        // so if it passes that we get the value as filter and the value as value just for
        // casting purposes, this is where things are faster
        const valueAsFilter = value;
        const valueAsValue = value;
        // if we have values, we are dealing with a IProcessedFilterRawJSONDataType
        if (valueAsFilter.values) {
            // so we basically call the filter function again, into it
            filteredValues = filteredValues.concat(filterFrom(valueAsFilter.values, specifiedFilter, matchStr, locale));
        }
        else {
            // otherwise we refer to a specific value that has no filter
            let compareValue = valueAsValue.value;
            // if we have a locale specified and if we have a i18nNorm value for the
            // output type that we are dependant on to make a comparison
            if (locale && valueAsValue.i18nNorm && valueAsValue.i18nNorm[locale]) {
                // then that's the compare value instead
                compareValue = valueAsValue.i18nNorm[locale];
            }
            // the compare value must be equal or must be included (or no match is provided, eg. an empty string)
            if (!matchStr || compareValue === matchStr || compareValue.includes(matchStr)) {
                // so if we have a locale again
                if (locale) {
                    // we send the localized information to the output type return array
                    filteredValues.push({
                        value: valueAsValue.value,
                        valueNorm: valueAsValue.valueNorm,
                        i18n: valueAsValue.i18n && valueAsValue.i18n[locale] ? valueAsValue.i18n[locale] : null,
                        i18nNorm: valueAsValue.i18nNorm && valueAsValue.i18nNorm[locale] ? valueAsValue.i18nNorm[locale] : null,
                    });
                }
                else {
                    // otherwise we just give the standard output
                    filteredValues.push({
                        value: valueAsValue.value,
                        valueNorm: valueAsValue.valueNorm,
                    });
                }
            }
        }
    });
    // return it
    return filteredValues;
}
/**
 * Sorts the given outputs to return, by match accuracy then alphabetically
 * @param outputs the outputs that it got matched against
 * @param matchStr the string to match to
 * @param locale the locale that is to be used
 * @returns the sorted output values
 */
function sortFrom(outputs, matchStr, locale) {
    // if we only have 1, we don't need to
    if (outputs.length < 2) {
        return outputs;
    }
    // otherwise we use the sort
    return outputs.sort((outputA, outputB) => {
        // we sort by normalized value
        const valueToUseA = outputA.i18nNorm || outputA.valueNorm;
        const valueToUseB = outputB.i18nNorm || outputB.valueNorm;
        // first we put the values that start with our match first
        if (valueToUseA.startsWith(matchStr)) {
            return -1;
        }
        else if (valueToUseB.startsWith(matchStr)) {
            return 1;
        }
        else {
            // and then we use an alphabeitcally comparison
            return valueToUseA.localeCompare(valueToUseB, [locale || "en", "en"], {
                sensitivity: "base",
            });
        }
    });
}
/**
 * Remove diacritics from values in order to create normalized forms of the value
 * returns a new value with the diacritics removed in its normalized values
 * only affects i18n values
 * @param value the value to modify
 * @returns the value normalized without diacritics characters
 */
function removeDiacriticsFromValue(value) {
    // this is where we are adding the new stuff
    const newValue = {
        value: value.value,
        valueNorm: value.value.toLowerCase(),
        filter: value.filter,
    };
    // so we check for a i18n value
    if (value.i18n) {
        // and add it
        newValue.i18n = value.i18n;
        newValue.i18nNorm = {};
        Object.keys(newValue.i18n).forEach((locale) => {
            // and we remove diacritics one by one
            newValue.i18nNorm[locale] = diacritics_1.default.remove(newValue.i18n[locale].toLowerCase());
        });
    }
    return newValue;
}
/**
 * Processes standard raw values that come from the autocomplete json and produces new
 * values that are processed
 * @param values the raw values
 * @returns an array of values but processed
 */
function processValues(values) {
    // so we loop over the values
    return values.map((value) => {
        // if it is a filter
        if (value.type === "filter") {
            // we build a processed filter
            let concatted = (value.values || []);
            concatted = concatted.concat(value.filters || []);
            const newProcessedFilter = {
                filter: value.filter,
                // we get the values and concat it to the filters if we have any, and process that stuff
                values: processValues(concatted),
            };
            // return it
            return newProcessedFilter;
        }
        else {
            // if it's a value, we remove the diacritics
            return removeDiacriticsFromValue(value);
        }
    });
}
/**
 * processes the whole autocomplete object into a processed autocomplete
 * @param value the value of that autocomplete
 * @returns the processed autocomplete
 */
function processAutocomplete(value) {
    // first we concat all the values and filters
    let concatted = (value.values || []);
    concatted = concatted.concat(value.filters || []);
    // now we build the new autocomplete
    const newAutocomplete = {
        values: processValues(concatted),
    };
    return newAutocomplete;
}
/**
 * This is the class that actually does the search
 */
class Autocomplete {
    /**
     * Creates an autocomplete object from a given raw data value
     * @param value the value
     */
    constructor(value) {
        // set both raw and processed
        this.rawJSON = value;
        this.processedJSON = processAutocomplete(this.rawJSON);
    }
    /**
     * Finds recommendations from a match string and a specified
     * filter that is run against the autocomplete
     * @param matchStr the string to match (raw, not normalized, it is normalized)
     * @param specifiedFilter the specified filter object (or null)
     * @returns the recommendations filtered and sorted
     */
    findRecommendations(matchStr, specifiedFilter) {
        // we normalize the string
        const normalizedMatchStr = diacritics_1.default.remove(matchStr.toLowerCase());
        // and we call the sort from function
        return sortFrom(
        // from the filtered values
        filterFrom(this.processedJSON.values, specifiedFilter, normalizedMatchStr), normalizedMatchStr).slice(0, 10);
    }
    /**
     * Finds recommendations from a match string an a specified filter
     * that is run against the autocomplete i18n values for a given locale
     * @param matchStr the string to match (raw, not normalized, it is normalized)
     * @param locale the locale string
     * @param specifiedFilter the specified filter
     * @returns the i18n recommendation sorted and filtered
     */
    findI18nRecommendations(matchStr, locale, specifiedFilter) {
        // we nornalize
        const normalizedMatchStr = diacritics_1.default.remove(matchStr.toLowerCase());
        // and sort from using the locale
        return sortFrom(
        // from the filtered values using the locale
        filterFrom(this.processedJSON.values, specifiedFilter, normalizedMatchStr, locale), normalizedMatchStr, locale).slice(0, 10);
    }
    /**
     * Searchs for an exact match for a value an a specified filter, returns null
     * if no such match is found, the value is not a match string, it is the value
     * and it is not normalized, it must be exact, case matters
     * @param value the value
     * @param specifiedFilter the specified filter
     * @returns the exact value if found, otherwise null
     */
    findExactValueFor(value, specifiedFilter) {
        // we call filter from using the specified filter and then we find
        // an exact match with value, no diacritics in use
        return filterFrom(this.processedJSON.values, specifiedFilter, null).find((v) => v.value === value);
    }
    /**
     * Provides the autocomplete name
     * @returns the name
     */
    getName() {
        return this.rawJSON.name;
    }
    /**
     * Returns the raw json form
     * @returns the json form
     */
    toJSON() {
        return this.rawJSON;
    }
}
exports.default = Autocomplete;
