import PropertyDefinition, {
  IPropertyDefinitionState,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyEntryBoolean from "./PropertyEntryBoolean";
// import PropertyEntryText from "./PropertyEntryText";
// import PropertyEntryDateTime from "./PropertyEntryDateTime";
import PropertyEntryLocation from "./PropertyEntryLocation";
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
import PropertyEntrySelect from "./PropertyEntrySelect";

/**
 * This is what every renderer gets regardless of type as long as it's an entry
 * type, it will get this instance as its props, the ValueType represents the property definition
 * type it epects as its current value
 * 
 * Expect these to be extended
 */
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

/**
 * This is what the whole entry react component expects as its properties
 * this is what should be fed to the generic PropertyEntry and it doesn't extend
 * anything, an optional renderer and rendererArgs can be passed to modify where
 * the values are distributed
 */
export interface IPropertyEntryMainHandlerProps<ValueType, RendererPropsType> {
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
  ignoreErrors?: boolean;
  renderer?: React.ComponentType<RendererPropsType>;
  rendererArgs?: object;
}

/**
 * This is what the handler gets, every handler is contained within this folder, it contains every property within
 * the base that is directly fed as well as these extra that are obtained from the context itself
 */
export interface IPropertyEntryHandlerProps<ValueType, RendererPropsType> extends IPropertyEntryMainHandlerProps<ValueType, RendererPropsType> {
  language: string;
  rtl: boolean;
  currency: ICurrencyType;
  i18n: Ii18NType;
  country: ICountryType;
}

interface IRendererHandlerType {
  renderer: string,
  handler: React.ComponentType<IPropertyEntryHandlerProps<PropertyDefinitionSupportedType, IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>>,
};

const selectHandler: IRendererHandlerType = {
  renderer: "PropertyEntrySelect",
  handler: PropertyEntrySelect,
}

/**
 * The type registry contains a list of handlers for a given type
 */
const handlerRegistry:
  Record<
    PropertyDefinitionSupportedTypeName,
    IRendererHandlerType
  > = {
  string: {
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
  },
  integer: null,
  number: null,
  boolean: {
    renderer: "PropertyEntryBoolean",
    handler: PropertyEntryBoolean,
  },
  text: null,
  currency: null,
  unit: null,
  password: {
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
  },
  year: null,
  datetime: null,
  date: null,
  time: null,
  location: {
    renderer: "PropertyEntryLocation",
    handler: PropertyEntryLocation,
  },
  file: {
    renderer: "PropertyEntryFile",
    handler: PropertyEntryFile,
  },
  files: null,
};

export default function PropertyEntry(
  props: IPropertyEntryMainHandlerProps<PropertyDefinitionSupportedType, IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>,
) {
  if (props.state.hidden) {
    return null;
  }

  // First get the handler by the type
  const registryEntry = props.property.hasSpecificValidValues() ?
    // TODO PropertyEntrySelect :
    selectHandler :
    handlerRegistry[props.property.getType()];

  const Element = registryEntry.handler;

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
