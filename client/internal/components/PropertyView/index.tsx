import PropertyDefinition, {
  IPropertyDefinitionState,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import { LocaleContext, ILocaleContextType } from "../../app";
import { Ii18NType } from "../../../../base/Root";
import {
  PropertyDefinitionSupportedTypeName,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { currencies, countries, ICurrencyType, ICountryType } from "../../../../imported-resources";
import { ThemeProvider, withStyles, WithStyles } from "@material-ui/styles";
import { IPropertyViewThemeType, style, STANDARD_THEME } from "./styles";
// import PropertyViewField from "./PropertyViewField";
// import PropertyViewDateTime from "./PropertyViewDateTime";
// import PropertyViewBoolean from "./PropertyViewBoolean";
// import PropertyViewText from "./PropertyViewText";
// import PropertyViewLocation from "./PropertyViewLocation";

export interface IPropertyViewBaseProps {
  property: PropertyDefinition;
  state: IPropertyDefinitionState;
  theme?: Partial<IPropertyViewThemeType>;
}

interface IPropertyViewStylesApplierProps extends IPropertyViewBaseProps, WithStyles<typeof style> {
  locale: ILocaleContextType;
}

export interface IPropertyViewProps extends IPropertyViewStylesApplierProps {
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
  // string: PropertyViewField,
  // integer: PropertyViewField,
  // number: PropertyViewField,
  // boolean: PropertyViewBoolean,
  // text: PropertyViewText,
  // currency: PropertyViewField,
  // unit: PropertyViewField,
  // password: PropertyViewField,
  // year: PropertyViewField,
  // datetime: PropertyViewDateTime,
  // date: PropertyViewDateTime,
  // time: PropertyViewDateTime,
  // location: PropertyViewLocation,
  string: null,
  integer: null,
  number: null,
  boolean: null,
  text: null,
  currency: null,
  unit: null,
  password: null,
  year: null,
  datetime: null,
  date: null,
  time: null,
  location: null,

  // TODO
  file: null,
  files: null,
};

const PropertyViewStylesApplier = withStyles(style)((props: IPropertyViewStylesApplierProps) => {
  // First get the element by the type
  const Element = typeRegistry[props.property.getType()];

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

export default function PropertyView(props: IPropertyViewBaseProps) {
  let appliedTheme: IPropertyViewThemeType = STANDARD_THEME;
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
            <PropertyViewStylesApplier
              {...props}
              locale={locale}
            />
          </ThemeProvider>
      }
    </LocaleContext.Consumer>
  );
}

export function RawBasePropertyView(props: {
  value: string;
}) {
  return (
    <div>
      {props.value}
    </div>
  );
}
