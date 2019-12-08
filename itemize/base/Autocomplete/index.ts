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

function filterFrom(
  values: IAutocompleteValueRawJSONDataType[],
  filters: IFilterRawJSONDataType[],
  specifiedFilter: ISingleFilterRawJSONDataType,
  matchStr: string,
  locale?: string,
) {
  let filteredValues: IAutocompleteValueRawJSONDataType[];
  (values || []).concat(filters as any || [])
    .forEach((value: IFilterRawJSONDataType | IAutocompleteValueRawJSONDataType) => {
    if (value.filter) {
      for (const key of Object.keys(value.filter)) {
        if (value.filter[key] !== specifiedFilter[key]) {
          return;
        }
      }
    }

    if (value.type === "filter") {
      filteredValues = filteredValues.concat(
        filterFrom(value.values, value.filters, specifiedFilter, matchStr, locale),
      );
    } else {
      let compareValue = value.value;
      if (locale && value.i18n[locale]) {
        compareValue = value.i18n[locale];
      }
      compareValue = compareValue.toLocaleLowerCase();
      if (compareValue === matchStr || compareValue.includes(matchStr)) {
        filteredValues.push(value);
      }
    }
  });
  return filteredValues;
}

export default class Autocomplete {
  private rawJSON: IAutocompleteRawJSONDataType;
  constructor(value: IAutocompleteRawJSONDataType) {
    this.rawJSON = value;
  }
  public findRecommendations(matchStr: string, specifiedFilter: ISingleFilterRawJSONDataType) {
    return filterFrom(this.rawJSON.values, this.rawJSON.filters, specifiedFilter, matchStr.toLocaleLowerCase());
  }
  public findI18nRecommendations(matchStr: string, locale: string, specifiedFilter: ISingleFilterRawJSONDataType) {
    return filterFrom(this.rawJSON.values, this.rawJSON.filters, specifiedFilter, matchStr.toLocaleLowerCase(), locale);
  }
  public toJSON() {
    return this.rawJSON;
  }
}
