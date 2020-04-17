import PropertyDefinition, {
  IPropertyDefinitionState,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
// import PropertyEntryBoolean from "./PropertyEntryBoolean";
// import PropertyEntryText from "./PropertyEntryText";
// import PropertyEntryDateTime from "./PropertyEntryDateTime";
// import PropertyEntryLocation from "./PropertyEntryLocation";
// import PropertyEntryFiles from "./PropertyEntryFiles";
// import PropertyEntryNumeric from "./PropertyEntryNumeric";
// import PropertyEntrySelect from "./PropertyEntrySelect";
import PropertyEntryField from "./PropertyEntryField";
import PropertyEntryFile from "./PropertyEntryFile";
import { LocaleContext } from "../../app";
import { Ii18NType } from "../../../../base/Root";
import {
  PropertyDefinitionSupportedTypeName, PropertyDefinitionSupportedType,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { currencies, countries, ICurrencyType, ICountryType } from "../../../../imported-resources";
import { RendererContext } from "../../../providers/renderer";
import { IRendererProps } from "../../renderer";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import Include from "../../../../base/Root/Module/ItemDefinition/Include";

export interface IPropertyEntryRendererProps<ValueType> extends IRendererProps {
  label?: string;
  placeholder?: string;
  description?: string;
  icon?: React.ReactNode;

  currentValue: ValueType;
  currentValid: boolean;
  currentInvalidReason?: string;
  currentInternalValue?: any;

  autoFocus: boolean;
  disabled: boolean;

  onChange: (value: ValueType, internalValue: any) => void;
}

export interface IPropertyEntryBaseProps<ValueType, RendererPropsType> {
  itemDefinition: ItemDefinition;
  include: Include;
  property: PropertyDefinition;
  state: IPropertyDefinitionState;
  onChange: (newValue: ValueType, internalValue: any) => void;
  forId: number;
  forVersion: string;
  forceInvalid?: boolean;
  hideDescription?: boolean;
  altDescription?: string;
  altLabel?: string;
  altPlaceholder?: string;
  poked?: boolean;
  autoFocus?: boolean;
  icon?: React.ReactNode;
  renderer?: React.ComponentType<RendererPropsType>;
  rendererArgs?: object;
  ignoreErrors?: boolean;
}

export interface IPropertyEntryProps<ValueType, RendererPropsType> extends IPropertyEntryBaseProps<ValueType, RendererPropsType> {
  language: string;
  rtl: boolean;
  currency: ICurrencyType;
  i18n: Ii18NType;
  country: ICountryType;
}

const typeRegistry:
  Record<
    PropertyDefinitionSupportedTypeName,
    {
      renderer: string,
      element: React.ComponentType<IPropertyEntryProps<PropertyDefinitionSupportedType, IRendererProps>>,
    }
  > = {
  string: {
    renderer: "PropertyEntryField",
    element: PropertyEntryField,
  },
  integer: null,
  number: null,
  boolean: null,
  text: null,
  currency: null,
  unit: null,
  password: {
    renderer: "PropertyEntryField",
    element: PropertyEntryField,
  },
  year: null,
  datetime: null,
  date: null,
  time: null,
  location: null,
  file: {
    renderer: "PropertyEntryFile",
    element: PropertyEntryFile,
  },
  files: null,
};

export default function PropertyEntry(
  props: IPropertyEntryBaseProps<PropertyDefinitionSupportedType, IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>,
) {
  // First get the element by the type
  const registryEntry = props.property.hasSpecificValidValues() ?
    // TODO PropertyEntrySelect :
    null :
    typeRegistry[props.property.getType()];

  const Element = registryEntry.element;

  // Build the context and render sending the right props
  return (
    <RendererContext.Consumer>
      {
        (renderers) =>
          <LocaleContext.Consumer>
            {
              (locale) => {
                const renderer: React.ComponentType<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>> =
                  props.renderer || renderers[registryEntry.renderer];
                return (
                  <Element
                    {...props}
                    language={locale.language}
                    i18n={locale.i18n}
                    rtl={locale.rtl}
                    currency={currencies[locale.currency]}
                    country={countries[locale.country]}
                    renderer={renderer}
                    rendererArgs={props.rendererArgs || {}}
                  />
                );
              }
            }
          </LocaleContext.Consumer>
      }
    </RendererContext.Consumer>
  );
}
