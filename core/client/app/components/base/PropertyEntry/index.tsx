import PropertyDefinition, {
  PropertyDefinitionSupportedTypeName,
  IPropertyDefinitionValue,
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
  value: IPropertyDefinitionValue;
  onChange: (newValue: PropertyDefinitionSupportedType, internalValue: any) => void;
  poked?: boolean;
  uncommon?: boolean;
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

/**
 * Provides the class name for a property entry
 * @param props the properties of the property entry
 * @param name the name that will be given
 * @param poked whether it is being poked
 */
export function getClassName(props: IPropertyEntryBaseProps, name: string, poked: boolean, uncommon: boolean) {
  return `property-entry property-entry--${name} ${
    poked ? "property-entry--poked" : ""
  } ${
    uncommon ? "property-entry--uncommon" : ""
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
  } ${props.property.isRare() ? "property-entry--rare" : ""}`;
}

export default function PropertyEntry(props: IPropertyEntryBaseProps) {
  // First get the element by the type
  const Element = typeRegistry[props.property.getType()];

  // Build the context and render sending the right props
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
