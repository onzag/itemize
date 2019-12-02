import PropertyDefinition, {
  IPropertyDefinitionValue,
} from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyViewField from "./PropertyViewField";
// import PropertyViewBoolean from "./PropertyViewBoolean";
// import PropertyViewText from "./PropertyViewText";
// import PropertyViewDateTime from "./PropertyViewDateTime";
// import PropertyViewLocation from "./PropertyViewLocation";
// import PropertyViewFiles from "./PropertyViewFiles";
import { LocaleContext } from "../../..";
import { Ii18NType } from "../../../../../base/Root";
import {
  PropertyDefinitionSupportedTypeName,
} from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

import "../../../../theme/property-entries.scss";
import { currencies, countries, ICurrencyType, ICountryType } from "../../../../../resources";

export interface IPropertyViewBaseProps {
  property: PropertyDefinition;
  value: IPropertyDefinitionValue;
}

export interface IPropertyViewProps extends IPropertyViewBaseProps {
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
  string: PropertyViewField,
  integer: PropertyViewField,
  number: PropertyViewField,
  boolean: null,
  text: null,
  currency: PropertyViewField,
  unit: PropertyViewField,
  password: PropertyViewField,
  year: PropertyViewField,
  datetime: null,
  date: null,
  time: null,
  location: null,
  files: null,
};

/**
 * Provides the class name for a property entry
 * @param props the properties of the property entry
 * @param name the name that will be given
 */
export function getClassName(props: IPropertyViewBaseProps, name: string) {
  return `property-view property-view--${name} ${
    props.value.default ? "property-view--default" : ""
  } ${
    props.value.enforced ? "property-view--enforced" : ""
  } ${
    props.value.userSet ? "property-view--user-set" : ""
  } ${
    props.value.hidden ? "property-view--hidden" : ""
  } ${
    props.value.valid ?
      "property-view--valid" :
      "property-view--invalid"
  } "property-view--rarity-${props.property.getRarity()}`;
}

export default function PropertyView(props: IPropertyViewBaseProps) {
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
            currency={currencies[locale.currency]}
            country={countries[locale.country]}
          />
      }
    </LocaleContext.Consumer>
  );
}

export function RawBasePropertyView(props: {
  value: string;
}) {
  return (
    <div className="property-view property-view--base-property">
      {props.value}
    </div>
  );
}
