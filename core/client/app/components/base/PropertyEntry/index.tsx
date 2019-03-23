import PropertyDefinition, {
  PropertyDefinitionSupportedTypeName,
  IPropertyValueGetterType,
  PropertyDefinitionSupportedType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyEntryField from "./PropertyEntryField";
import PropertyEntryBoolean from "./PropertyEntryBoolean";
import PropertyEntryText from "./PropertyEntryText";
import PropertyEntryCurrency from "./PropertyEntryCurrency";
import PropertyEntryPassword from "./PropertyEntryPassword";
import PropertyEntryYear from "./PropertyEntryYear";
import PropertyEntryDateTime from "./PropertyEntryDateTime";
import PropertyEntryDate from "./PropertyEntryDate";
import PropertyEntryLocation from "./PropertyEntryLocation";
import PropertyEntryImage from "./PropertyEntryImage";
import PropertyEntryFiles from "./PropertyEntryFiles";
import { LocaleContext } from "../../..";

import "../../../../theme/property-entries.scss";

export interface IPropertyEntryProps {
  property: PropertyDefinition;
  value: IPropertyValueGetterType;
  onChange: (newValue: PropertyDefinitionSupportedType) => void;
  locale?: string;
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
  currency: PropertyEntryCurrency,
  password: PropertyEntryPassword,
  year: PropertyEntryYear,
  datetime: PropertyEntryDateTime,
  date: PropertyEntryDate,
  location: PropertyEntryLocation,
  images: PropertyEntryImage,
  files: PropertyEntryFiles,
};

export function getClassName(props: IPropertyEntryProps, name: string) {
  return `property-entry property-entry--${name} ${
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

export default function PropertyEntry(props: IPropertyEntryProps) {
  const Element = typeRegistry[props.property.getType()];
  return (
    <LocaleContext.Consumer>
      {(locale) => <Element {...props} locale={props.locale || locale.state}/>}
    </LocaleContext.Consumer>
  );
}
