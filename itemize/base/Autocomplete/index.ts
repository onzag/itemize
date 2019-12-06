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
  values: IFilterRawJSONDataType[] | IAutocompleteValueRawJSONDataType[];
}

export interface IAutocompleteRawJSONDataType {
  type: "autocomplete";

  // Avaialble for the builder
  location?: string;
  pointers?: any;
  raw?: string;

  // Set after the build
  values: IFilterRawJSONDataType[] | IAutocompleteValueRawJSONDataType[];
}
