import PropertyDefinition, {
  PropertyDefinitionSupportedTypeName,
  IPropertyValueGetterType,
  PropertyDefinitionSupportedType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyEntryString from "./PropertyEntryString";
import PropertyEntryNumber from "./PropertyEntryNumber";
import PropertyEntryBoolean from "./PropertyEntryBoolean";
import PropertyEntryInteger from "./PropertyEntryInteger";
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
  string: PropertyEntryString,
  integer: PropertyEntryInteger,
  number: PropertyEntryNumber,
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

export default function PropertyEntry(props: IPropertyEntryProps) {
  const Element = typeRegistry[props.property.getType()];
  return (
    <LocaleContext.Consumer>
      {(locale) => <Element {...props} locale={props.locale || locale.state}/>}
    </LocaleContext.Consumer>
  );
}
