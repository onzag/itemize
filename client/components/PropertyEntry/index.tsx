import PropertyDefinition, {
  IPropertyDefinitionState,
} from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyEntryBoolean from "./PropertyEntryBoolean";
import PropertyEntryText from "./PropertyEntryText";
import PropertyEntryDateTime from "./PropertyEntryDateTime";
import PropertyEntryLocation from "./PropertyEntryLocation";
import PropertyEntryFiles from "./PropertyEntryFiles";
import PropertyEntryNumeric from "./PropertyEntryNumeric";
import PropertyEntrySelect from "./PropertyEntrySelect";
import PropertyEntryField from "./PropertyEntryField";
import { LocaleContext, ILocaleContextType } from "../../internal/app";
import { Ii18NType } from "../../../base/Root";
import {
  PropertyDefinitionSupportedType,
  PropertyDefinitionSupportedTypeName,
} from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { currencies, countries, ICurrencyType, ICountryType } from "../../../imported-resources";
import { ThemeProvider, withStyles, WithStyles } from "@material-ui/styles";
import { IPropertyEntryThemeType, style, STANDARD_THEME } from "./styles";

export interface IPropertyEntryBaseProps {
  property: PropertyDefinition;
  state: IPropertyDefinitionState;
  onChange: (newValue: PropertyDefinitionSupportedType, internalValue: any) => void;
  forId: number;
  forVersion: string;

  theme?: Partial<IPropertyEntryThemeType>;
  forceInvalid?: boolean;
  poked?: boolean;
  autoFocus?: boolean;
  icon?: string;
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
