import diacritics from "diacritics";

export interface ISingleFilterRawJSONDataType {
  [key: string]: any;
}

export interface IAutocompleteValueRawJSONDataType {
  type: "value";
  value: string;
  filter?: ISingleFilterRawJSONDataType;
  i18n?: {
    [locale: string]: string,
  };
}

export interface IFilterRawJSONDataType {
  type: "filter";
  filter: ISingleFilterRawJSONDataType;
  filters: IFilterRawJSONDataType[];
  values: IAutocompleteValueRawJSONDataType[];
}

export interface IAutocompleteRawJSONDataType {
  type: "autocomplete";
  name: string;
  filters: IFilterRawJSONDataType[];
  values: IAutocompleteValueRawJSONDataType[];
}

export interface IFileAutocompleteRawJSONDataType {
  type: "autocomplete";
  filters: IFilterRawJSONDataType[];
  values: IAutocompleteValueRawJSONDataType[];
}

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
interface IProcessedAutocompleteValueRawJSONDataType {
  value: string;
  valueNorm: string;
  filter?: ISingleFilterRawJSONDataType;
  i18n?: {
    [locale: string]: string,
  };
  i18nNorm?: {
    [locale: string]: string,
  };
}

interface IProcessedFilterRawJSONDataType {
  filter: ISingleFilterRawJSONDataType;
  values: Array<IProcessedAutocompleteValueRawJSONDataType | IProcessedFilterRawJSONDataType>;
}

interface IProcessedAutocompleteRawJSONDataType {
  values: Array<IProcessedAutocompleteValueRawJSONDataType | IProcessedFilterRawJSONDataType>;
}

function filterFrom(
  values: Array<IProcessedAutocompleteValueRawJSONDataType | IProcessedFilterRawJSONDataType>,
  specifiedFilter: ISingleFilterRawJSONDataType,
  matchStr: string,
  locale?: string,
) {
  let filteredValues: IAutocompleteOutputType[] = [];
  values.forEach((value: IProcessedFilterRawJSONDataType | IProcessedAutocompleteValueRawJSONDataType) => {
    if (value.filter) {
      for (const key of Object.keys(value.filter)) {
        if (value.filter[key] !== specifiedFilter[key]) {
          return;
        }
      }
    }

    const valueAsFilter = value as IProcessedFilterRawJSONDataType;
    const valueAsValue = value as IProcessedAutocompleteValueRawJSONDataType;
    if (valueAsFilter.values) {
      filteredValues = filteredValues.concat(
        filterFrom(valueAsFilter.values, specifiedFilter, matchStr, locale),
      );
    } else {
      let compareValue = valueAsValue.value;
      if (locale && valueAsValue.i18nNorm && valueAsValue.i18nNorm[locale]) {
        compareValue = valueAsValue.i18nNorm[locale];
      }
      if (compareValue === matchStr || compareValue.includes(matchStr) || !matchStr) {
        if (locale) {
          filteredValues.push({
            value: valueAsValue.value,
            valueNorm: valueAsValue.valueNorm,
            i18n: valueAsValue.i18n && valueAsValue.i18n[locale] ? valueAsValue.i18n[locale] : null,
            i18nNorm: valueAsValue.i18nNorm && valueAsValue.i18nNorm[locale] ? valueAsValue.i18nNorm[locale] : null,
          });
        } else {
          filteredValues.push({
            value: valueAsValue.value,
            valueNorm: valueAsValue.valueNorm,
          });
        }
      }
    }
  });
  return filteredValues;
}

function sortFrom(outputs: IAutocompleteOutputType[], matchStr: string, locale?: string) {
  if (outputs.length < 2) {
    return outputs;
  }
  return outputs.sort((outputA, outputB) => {
    const valueToUseA = outputA.i18nNorm || outputA.valueNorm;
    const valueToUseB = outputB.i18nNorm || outputB.valueNorm;
    if (valueToUseA.startsWith(matchStr)) {
      return -1;
    } else if (valueToUseB.startsWith(matchStr)) {
      return 1;
    } else {
      return valueToUseA.localeCompare(valueToUseB, [locale || "en", "en"], {
        sensitivity: "base",
      });
    }
  });
}

function removeDiacriticsFromValue(value: IAutocompleteValueRawJSONDataType):
IProcessedAutocompleteValueRawJSONDataType {
  const newValue: IProcessedAutocompleteValueRawJSONDataType = {
    value: value.value,
    valueNorm: value.value.toLocaleLowerCase(),
    filter: value.filter,
  };
  if (value.i18n) {
    newValue.i18n = value.i18n;
    newValue.i18nNorm = {};

    Object.keys(newValue.i18n).forEach((locale) => {
      newValue.i18nNorm[locale] = diacritics.remove(newValue.i18n[locale].toLocaleLowerCase());
    });
  }
  return newValue;
}

function processValues(values: Array<IAutocompleteValueRawJSONDataType | IFilterRawJSONDataType>):
Array<IProcessedAutocompleteValueRawJSONDataType | IProcessedFilterRawJSONDataType> {
  return values.map((value) => {
    if (value.type === "filter") {
      const newProcessedFilter: IProcessedFilterRawJSONDataType = {
        filter: value.filter,
        values: processValues((value.values || []).concat(value.filters || [] as any)),
      };
      return newProcessedFilter;
    } else {
      return removeDiacriticsFromValue(value);
    }
  }) as any;
}

function processAutocomplete(value: IAutocompleteRawJSONDataType): IProcessedAutocompleteRawJSONDataType {
  const newAutocomplete: IProcessedAutocompleteRawJSONDataType = {
    values: processValues((value.values || []).concat(value.filters || [] as any)),
  };
  return newAutocomplete;
}

export default class Autocomplete {
  private rawJSON: IAutocompleteRawJSONDataType;
  private processedJSON: IProcessedAutocompleteRawJSONDataType;
  constructor(value: IAutocompleteRawJSONDataType) {
    this.rawJSON = value;
    this.processedJSON = processAutocomplete(this.rawJSON);
  }
  // TODO we should memoize these functions for greater speeds
  // and even maybe cache on the client side
  // these functions always return the same as the process is ran
  // with the client side it is even possible to use the build number
  // and just cache it forever
  public findRecommendations(
    matchStr: string,
    specifiedFilter: ISingleFilterRawJSONDataType,
  ): IAutocompleteOutputType[] {
    const normalizedMatchStr = diacritics.remove(matchStr.toLocaleLowerCase());
    return sortFrom(
      filterFrom(this.processedJSON.values, specifiedFilter, normalizedMatchStr),
      normalizedMatchStr,
    ).slice(0, 10);
  }
  public findI18nRecommendations(
    matchStr: string,
    locale: string,
    specifiedFilter: ISingleFilterRawJSONDataType,
  ): IAutocompleteOutputType[] {
    const normalizedMatchStr = diacritics.remove(matchStr.toLocaleLowerCase());
    return sortFrom(
      filterFrom(this.processedJSON.values, specifiedFilter, normalizedMatchStr, locale),
      normalizedMatchStr,
      locale,
    ).slice(0, 10);
  }
  public findExactValueFor(
    value: string,
    specifiedFilter: ISingleFilterRawJSONDataType,
  ): IAutocompleteOutputType {
    return filterFrom(this.processedJSON.values, specifiedFilter, null).find((v) => v.value === value);
  }
  public getName() {
    return this.rawJSON.name;
  }
  public toJSON() {
    return this.rawJSON;
  }
}
