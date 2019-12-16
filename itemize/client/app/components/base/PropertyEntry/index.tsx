import PropertyDefinition, {
  IPropertyDefinitionState,
} from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyEntryBoolean from "./PropertyEntryBoolean";
import PropertyEntryText from "./PropertyEntryText";
import PropertyEntryDateTime from "./PropertyEntryDateTime";
import PropertyEntryLocation from "./PropertyEntryLocation";
import PropertyEntryFiles from "./PropertyEntryFiles";
import PropertyEntryNumeric from "./PropertyEntryNumeric";
import PropertyEntrySelect from "./PropertyEntrySelect";
import PropertyEntryField from "./PropertyEntryField";
import { LocaleContext, ILocaleContextType } from "../../..";
import { Ii18NType } from "../../../../../base/Root";
import {
  PropertyDefinitionSupportedType,
  PropertyDefinitionSupportedTypeName,
} from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

import { currencies, countries, ICurrencyType, ICountryType } from "../../../../../resources";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import { WithStyles } from "react-jss";
import { IPropertyEntryThemeType, style, STANDARD_THEME } from "./styles";

export interface IPropertyEntryBaseProps {
  property: PropertyDefinition;
  value: IPropertyDefinitionState;
  onChange: (newValue: PropertyDefinitionSupportedType, internalValue: any) => void;
  theme?: Partial<IPropertyEntryThemeType>;
  forceInvalid?: boolean;
  poked?: boolean;
  autoFocus?: boolean;
  forId: number;
}

interface IPropertyEntryStylesApplierProps extends IPropertyEntryBaseProps, WithStyles<typeof style> {
  locale: ILocaleContextType;
}

export interface IPropertyEntryProps extends IPropertyEntryStylesApplierProps {
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
  integer: PropertyEntryNumeric,
  number: PropertyEntryNumeric,
  boolean: PropertyEntryBoolean,
  text: PropertyEntryText,
  currency: PropertyEntryNumeric,
  unit: PropertyEntryNumeric,
  password: PropertyEntryField,
  year: PropertyEntryNumeric,
  datetime: PropertyEntryDateTime,
  date: PropertyEntryDateTime,
  time: PropertyEntryDateTime,
  location: PropertyEntryLocation,
  files: PropertyEntryFiles,
};

/**
 * Provides the class name for a property entry
 * TODO delete this
 * @param props the properties of the property entry
 * @param name the name that will be given
 * @param poked whether it is being poked
 */
export function getClassName(props: IPropertyEntryBaseProps, name: string, poked: boolean) {
  return `property-entry property-entry--${name} ${
    poked || props.forceInvalid ? "property-entry--poked" : ""
  } ${
    props.value.default ? "property-entry--default" : ""
  } ${
    props.value.enforced ? "property-entry--enforced" : ""
  } ${
    props.value.userSet ? "property-entry--user-set" : ""
  } ${
    props.value.hidden ? "property-entry--hidden" : ""
  } ${
    !props.value.valid || props.forceInvalid ?
      "property-entry--invalid" :
      "property-entry--valid"
  } property-entry--rarity-${props.property.getRarity()}`;
}

// I had to use any because the typescript debugger shows a non-sensical bug
// for no reason
const PropertyEntryStylesApplier = withStyles(style)((props: IPropertyEntryStylesApplierProps) => {
  // First get the element by the type
  const Element = props.property.hasSpecificValidValues() ?
    PropertyEntrySelect :
    typeRegistry[props.property.getType()];

  return (
    <Element
      {...props}
      language={props.locale.language}
      i18n={props.locale.i18n}
      currency={currencies[props.locale.currency]}
      country={countries[props.locale.country]}
      classes={props.classes}
    />
  );
});

export default function PropertyEntry(props: IPropertyEntryBaseProps) {

  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.theme) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.theme,
    };
  }

  // Build the context and render sending the right props
  return (
    <LocaleContext.Consumer>
      {
        (locale) =>
          <ThemeProvider theme={appliedTheme}>
            <PropertyEntryStylesApplier
              {...props}
              locale={locale}
            />
          </ThemeProvider>
      }
    </LocaleContext.Consumer>
  );
}
