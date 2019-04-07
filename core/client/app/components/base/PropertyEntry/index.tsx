import PropertyDefinition, {
  PropertyDefinitionSupportedTypeName,
  IPropertyValueGetterType,
  PropertyDefinitionSupportedType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyEntryField from "./PropertyEntryField";
import PropertyEntryBoolean from "./PropertyEntryBoolean";
import PropertyEntryText from "./PropertyEntryText";
import PropertyEntryDateTime from "./PropertyEntryDateTime";
import PropertyEntryLocation from "./PropertyEntryLocation";
import PropertyEntryFiles from "./PropertyEntryFiles";
import { LocaleContext, Ii18NType, ICurrencyType, ICountryType } from "../../..";

import "../../../../theme/property-entries.scss";

export interface IPropertyEntryBaseProps {
  property: PropertyDefinition;
  value: IPropertyValueGetterType;
  onChange: (newValue: PropertyDefinitionSupportedType, internalValue: any) => void;
  poked?: boolean;
}

export interface IPropertyEntryProps extends IPropertyEntryBaseProps {
  language: string;
  currency: ICurrencyType;
  i18n: Ii18NType;
  country: ICountryType;
}

const typeRegistry:
  Record<
    PropertyDefinitionSupportedTypeName,
    any
  > = {
  string: PropertyEntryField,
  integer: PropertyEntryField,
  number: PropertyEntryField,
  boolean: PropertyEntryBoolean,
  text: PropertyEntryText,
  currency: PropertyEntryField,
  password: PropertyEntryField,
  year: PropertyEntryField,
  datetime: PropertyEntryDateTime,
  date: PropertyEntryDateTime,
  time: PropertyEntryDateTime,
  location: PropertyEntryLocation,
  files: PropertyEntryFiles,
};

export function getClassName(props: IPropertyEntryBaseProps, name: string, poked?: boolean) {
  return `property-entry property-entry--${name} ${
    poked ? "property-entry--poked" : ""
  } ${
    props.value.default ? "property-entry--default" : ""
  } ${
    props.value.enforced ? "property-entry--enforced" : ""
  } ${
    props.value.userSet ? "property-entry--user-set" : ""
  } ${
    props.value.hidden ? "property-entry--hidden" : ""
  } ${
    props.value.valid ?
      "property-entry--valid" :
      "property-entry--invalid"
  }`;
}

export default function PropertyEntry(props: IPropertyEntryBaseProps) {
  const Element = typeRegistry[props.property.getType()];
  return (
    <LocaleContext.Consumer>
      {
        (locale) =>
          <Element
            {...props}
            language={locale.language}
            i18n={locale.i18n}
            currency={locale.currencyData[locale.currency]}
            country={locale.countryData[locale.country]}
          />
      }
    </LocaleContext.Consumer>
  );
}
