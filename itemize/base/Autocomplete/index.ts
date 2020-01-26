/**
 * This file represents the autocomplete file that is used in autocomplete properties
 * for autocompleting values in string property types, either with language or not
 *
 * schema.ts and checkers.ts are correlated
 */

import diacritics from "diacritics";

// represents a single filter in a raw json form
// these are the filters that the client sends in order
// to perform value filtering
export interface ISingleFilterRawJSONDataType {
  [key: string]: any;
}

// The autocomplete value that is contained as a single value
// and might have or not locales included in it
export interface IAutocompleteValueRawJSONDataType {
  type: "value";
  value: string;
  filter?: ISingleFilterRawJSONDataType;
  i18n?: {
    [locale: string]: string,
  };
}

// the filter raw json type that contains filter groups
// these contain a bunch of values that are passed into a single filter
export interface IFilterRawJSONDataType {
  type: "filter";
  filter: ISingleFilterRawJSONDataType;
  filters: IFilterRawJSONDataType[];
  values: IAutocompleteValueRawJSONDataType[];
}

// the parent autocomplete object
export interface IAutocompleteRawJSONDataType {
  type: "autocomplete";
  name: string;
  filters: IFilterRawJSONDataType[];
  values: IAutocompleteValueRawJSONDataType[];
}

// the main autocomplete as obtained by the file
export interface IFileAutocompleteRawJSONDataType {
  type: "autocomplete";
  filters: IFilterRawJSONDataType[];
  values: IAutocompleteValueRawJSONDataType[];
}

// this is the output that an autocomplete gives once
// it has processed a value
export interface IAutocompleteOutputType {
  value: string;
  valueNorm: string;
  i18n?: string;
  i18nNorm?: string;
}

// This is processed for speeding up searches to avoid doing the same over and over
// the structure isn't the best but it's the fastest
// not intended for use anywhere but here, it's just faster
// for once we cache the diacritics and for another we merge
// filters and values together, at the function filterFrom it's
// easier to deal with them that way (memory wise)
// type=value
interface IProcessedAutocompleteValueRawJSONDataType {
  // this is the value
  value: string;
  // the normalized value, without extra spaces and diacritics
  valueNorm: string;
  // an applied filter for the value
  filter?: ISingleFilterRawJSONDataType;
  // and the same for the i18n values
  i18n?: {
    [locale: string]: string,
  };
  i18nNorm?: {
    [locale: string]: string,
  };
}

// also the same as before, a processed value to speed up searches, filters
// always have a filter property
// type=filter
interface IProcessedFilterRawJSONDataType {
  filter: ISingleFilterRawJSONDataType;
  values: Array<IProcessedAutocompleteValueRawJSONDataType | IProcessedFilterRawJSONDataType>;
}

// same as before, we keep everything together, filters and values
// type=autocomplete
interface IProcessedAutocompleteRawJSONDataType {
  values: Array<IProcessedAutocompleteValueRawJSONDataType | IProcessedFilterRawJSONDataType>;
}

/**
 * Takes a processed value or a processed filter array, or combined and
 * returns values and only values that do match as the output type
 * @param values the array of values and filters
 * @param specifiedFilter the specified filter provided by the client
 * @param matchStr the string that the client specified should be matched (make sure to normalize it)
 * @param locale (optional) the locale that is required for a i18n search
 */
function filterFrom(
  values: Array<IProcessedAutocompleteValueRawJSONDataType | IProcessedFilterRawJSONDataType>,
  specifiedFilter: ISingleFilterRawJSONDataType,
  matchStr: string,
  locale?: string,
) {
  // so we build the array for our matched results
  let filteredValues: IAutocompleteOutputType[] = [];
  // and we start looping for each of our values
  values.forEach((value: IProcessedFilterRawJSONDataType | IProcessedAutocompleteValueRawJSONDataType) => {
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
    const valueAsFilter = value as IProcessedFilterRawJSONDataType;
    const valueAsValue = value as IProcessedAutocompleteValueRawJSONDataType;
    // if we have values, we are dealing with a IProcessedFilterRawJSONDataType
    if (valueAsFilter.values) {
      // so we basically call the filter function again, into it
      filteredValues = filteredValues.concat(
        filterFrom(valueAsFilter.values, specifiedFilter, matchStr, locale),
      );
    } else {
      // otherwise we refer to a specific value that has no filter
      let compareValue = valueAsValue.value;
      // if we have a locale specified and if we have a i18nNorm value for the
      // output type that we are dependant on to make a comparison
      if (locale && valueAsValue.i18nNorm && valueAsValue.i18nNorm[locale]) {
        // then that's the compare value instead
        compareValue = valueAsValue.i18nNorm[locale];
      }
      // the compare value must be equal or must be included (or no match is provided, eg. an empty string)
      if (!matchStr || compareValue === matchStr || compareValue.includes(matchStr)) {
        // so if we have a locale again
        if (locale) {
          // we send the localized information to the output type return array
          filteredValues.push({
            value: valueAsValue.value,
            valueNorm: valueAsValue.valueNorm,
            i18n: valueAsValue.i18n && valueAsValue.i18n[locale] ? valueAsValue.i18n[locale] : null,
            i18nNorm: valueAsValue.i18nNorm && valueAsValue.i18nNorm[locale] ? valueAsValue.i18nNorm[locale] : null,
          });
        } else {
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
 */
function sortFrom(outputs: IAutocompleteOutputType[], matchStr: string, locale?: string) {
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
    } else if (valueToUseB.startsWith(matchStr)) {
      return 1;
    } else {
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
 */
function removeDiacriticsFromValue(value: IAutocompleteValueRawJSONDataType):
IProcessedAutocompleteValueRawJSONDataType {
  // this is where we are adding the new stuff
  const newValue: IProcessedAutocompleteValueRawJSONDataType = {
    value: value.value,
    valueNorm: value.value.toLocaleLowerCase(),
    filter: value.filter,
  };

  // so we check for a i18n value
  if (value.i18n) {
    // and add it
    newValue.i18n = value.i18n;
    newValue.i18nNorm = {};

    Object.keys(newValue.i18n).forEach((locale) => {
      // and we remove diacritics one by one
      newValue.i18nNorm[locale] = diacritics.remove(newValue.i18n[locale].toLocaleLowerCase());
    });
  }
  return newValue;
}

/**
 * Processes standard raw values that come from the autocomplete json and produces new
 * values that are processed
 * @param values the raw values
 */
function processValues(values: Array<IAutocompleteValueRawJSONDataType | IFilterRawJSONDataType>):
Array<IProcessedAutocompleteValueRawJSONDataType | IProcessedFilterRawJSONDataType> {
  // so we loop over the values
  return values.map((value) => {
    // if it is a filter
    if (value.type === "filter") {
      // we build a processed filter
      let concatted: Array<IAutocompleteValueRawJSONDataType | IFilterRawJSONDataType> = (
        value.values || []
      );
      concatted = concatted.concat(value.filters || []);
      const newProcessedFilter: IProcessedFilterRawJSONDataType = {
        filter: value.filter,
        // we get the values and concat it to the filters if we have any, and process that stuff
        values: processValues(concatted),
      };
      // return it
      return newProcessedFilter;
    } else {
      // if it's a value, we remove the diacritics
      return removeDiacriticsFromValue(value);
    }
  });
}

/**
 * processes the whole autocomplete object into a processed autocomplete
 * @param value the value of that autocomplete
 */
function processAutocomplete(value: IAutocompleteRawJSONDataType): IProcessedAutocompleteRawJSONDataType {
  // first we concat all the values and filters
  let concatted: Array<IAutocompleteValueRawJSONDataType | IFilterRawJSONDataType> = (
    value.values || []
  );
  concatted = concatted.concat(value.filters || []);
  // now we build the new autocomplete
  const newAutocomplete: IProcessedAutocompleteRawJSONDataType = {
    values: processValues(concatted),
  };
  return newAutocomplete;
}

/**
 * This is the class that actually does the search
 */
export default class Autocomplete {
  /**
   * The raw form of the autocomplete as defined by the json
   */
  private rawJSON: IAutocompleteRawJSONDataType;
  /**
   * The processed autocomplete from the raw form
   */
  private processedJSON: IProcessedAutocompleteRawJSONDataType;

  /**
   * Creates an autocomplete object from a given raw data value
   * @param value the value
   */
  constructor(value: IAutocompleteRawJSONDataType) {
    // set both raw and processed
    this.rawJSON = value;
    this.processedJSON = processAutocomplete(this.rawJSON);
  }

  /**
   * Finds recommendations from a match string and a specified
   * filter that is run against the autocomplete
   * @param matchStr the string to match (raw, not normalized, it is normalized)
   * @param specifiedFilter the specified filter object (or null)
   */
  public findRecommendations(
    matchStr: string,
    specifiedFilter: ISingleFilterRawJSONDataType,
  ): IAutocompleteOutputType[] {
    // we normalize the string
    const normalizedMatchStr = diacritics.remove(matchStr.toLocaleLowerCase());
    // and we call the sort from function
    return sortFrom(
      // from the filtered values
      filterFrom(this.processedJSON.values, specifiedFilter, normalizedMatchStr),
      normalizedMatchStr,
    ).slice(0, 10);
  }

  /**
   * Finds recommendations from a match string an a specified filter
   * that is run against the autocomplete i18n values for a given locale
   * @param matchStr the string to match (raw, not normalized, it is normalized)
   * @param locale the locale string
   * @param specifiedFilter the specified filter
   */
  public findI18nRecommendations(
    matchStr: string,
    locale: string,
    specifiedFilter: ISingleFilterRawJSONDataType,
  ): IAutocompleteOutputType[] {
    // we nornalize
    const normalizedMatchStr = diacritics.remove(matchStr.toLocaleLowerCase());
    // and sort from using the locale
    return sortFrom(
      // from the filtered values using the locale
      filterFrom(this.processedJSON.values, specifiedFilter, normalizedMatchStr, locale),
      normalizedMatchStr,
      locale,
    ).slice(0, 10);
  }

  /**
   * Searchs for an exact match for a value an a specified filter, returns null
   * if no such match is found, the value is not a match string, it is the value
   * and it is not normalized, it must be exact, case matters
   * @param value the value
   * @param specifiedFilter the specified filter
   */
  public findExactValueFor(
    value: string,
    specifiedFilter: ISingleFilterRawJSONDataType,
  ): IAutocompleteOutputType {
    // we call filter from using the specified filter and then we find
    // an exact match with value, no diacritics in use
    return filterFrom(this.processedJSON.values, specifiedFilter, null).find((v) => v.value === value);
  }

  /**
   * Provides the autocomplete name
   */
  public getName() {
    return this.rawJSON.name;
  }

  /**
   * Returns the raw json form
   */
  public toJSON() {
    return this.rawJSON;
  }
}
