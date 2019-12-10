import PropertyDefinition, {
  IPropertyDefinitionValue,
} from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyEntryBoolean from "./PropertyEntryBoolean";
import PropertyEntryText from "./PropertyEntryText";
// import PropertyEntryDateTime from "./PropertyEntryDateTime";
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

import "../../../../theme/property-entries.scss";
import { currencies, countries, ICurrencyType, ICountryType } from "../../../../../resources";
import { createStyles, ThemeProvider, withStyles } from "@material-ui/styles";
import { WithStyles } from "react-jss";

interface IPropertyEntryThemeType {
  invalidColor: string;
  iconColor: string;
  containerWidth: string | number;
  errorMessageFontSize: string | number;
  errorMessageContainerSize: string | number;
  fieldBorderInvalidColorFocused: string;
  fieldBorderInvalidColor: string;
  fieldBorderColor: string;
  fieldBorderColorFocused: string;
  labelColor: string;
  labelFocusedColor: string;
  labelInvalidColor: string;
  labelInvalidFocusedColor: string;
}
const STANDARD_THEME: IPropertyEntryThemeType = {
  invalidColor: "#f44336",
  iconColor: "#424242",
  containerWidth: "100%",
  errorMessageFontSize: "0.85rem",
  errorMessageContainerSize: "1.3rem",
  fieldBorderInvalidColorFocused: "#f44336",
  fieldBorderInvalidColor: "#e57373",
  fieldBorderColor: "rgba(0,0,0,0.42)",
  fieldBorderColorFocused: "#3f51b5",
  labelColor: "rgb(66, 66, 66)",
  labelFocusedColor: "#3f51b5",
  labelInvalidColor: "#f44336",
  labelInvalidFocusedColor: "#f44336",
};

function shouldShowInvalid(props: IPropertyEntryBaseProps) {
  if (props.forceInvalid) {
    return true;
  }
  return !props.value.valid && (props.poked || props.value.userSet);
}
export const generalStyles = (theme: IPropertyEntryThemeType) => createStyles({
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: theme.invalidColor,
    height: theme.errorMessageContainerSize,
    fontSize: theme.errorMessageFontSize,
  },
  icon: (props: IPropertyEntryBaseProps) => ({
    color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
  }),
  iconButton: {
    "backgroundColor": "#2196f3",
    "color": "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  textButton: {
    border: "solid 1px rgba(0,0,0,0.1)",
    display: "flex",
    minWidth: "50px",
    height: "50px",
    padding: "0 10px",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  label: (props: IPropertyEntryBaseProps) => ({
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
    },
  }),
  fieldInput: (props: IPropertyEntryBaseProps) => {
    if (shouldShowInvalid(props)) {
      return {
        "width": "100%",
        // this is the colur when the field is out of focus
        "&::before": {
          borderBottomColor: theme.fieldBorderInvalidColor,
        },
        // the color that pops up when the field is in focus
        "&::after": {
          borderBottomColor: theme.fieldBorderInvalidColorFocused,
        },
        // during the hover event
        "&:hover::before": {
          borderBottomColor: props.value.enforced ? theme.fieldBorderColor : theme.fieldBorderInvalidColorFocused,
        },
      };
    }
    return {
      "width": "100%",
      "&::before": {
        borderBottomColor: theme.fieldBorderColor,
      },
      "&::after": {
        borderBottomColor: theme.fieldBorderColorFocused,
      },
      "&:hover::before": {
        borderBottomColor: theme.fieldBorderColorFocused,
      },
    };
  },
  selectFieldIconWhenAddornmentIsActive: {
    right: "46px",
  },
  unitDialog: {
    minWidth: "400px",
  },
  unitDialogSubheader: {
    backgroundColor: "white",
    borderBottom: "solid 1px #eee",
  },
});

export interface IPropertyEntryBaseProps {
  property: PropertyDefinition;
  value: IPropertyDefinitionValue;
  onChange: (newValue: PropertyDefinitionSupportedType, internalValue: any) => void;
  theme?: Partial<IPropertyEntryThemeType>;
  forceInvalid?: boolean;
  poked?: boolean;
  autoFocus?: boolean;
  forId: number;
}

interface IPropertyEntryStylesApplierProps extends IPropertyEntryBaseProps, WithStyles<typeof generalStyles> {
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
  datetime: null,
  date: null,
  time: null,
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
const PropertyEntryStylesApplier = withStyles(generalStyles)((props: IPropertyEntryStylesApplierProps) => {
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
