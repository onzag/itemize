import PropertyDefinition, {
  IPropertyDefinitionState,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import { LocaleContext } from "../../app";
import { Ii18NType } from "../../../../base/Root";
import {
  PropertyDefinitionSupportedTypeName, PropertyDefinitionSupportedType,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { currencies, countries, ICurrencyType, ICountryType } from "../../../../imported-resources";
import { IRendererProps } from "../../renderer";
import { RendererContext } from "../../../providers/renderer";
import { PropertyViewSimple, IPropertyViewSimpleRendererProps } from "./PropertyViewSimple";

/**
 * This is what every view renderer gets
 * 
 * Expect these to be extended
 */
export interface IPropertyViewRendererProps extends IRendererProps {
  capitalize: boolean;
}

/**
 * This is what the general view handler is supposed to get
 */
export interface IPropertyViewMainHandlerProps<RendererPropsType> {
  property: PropertyDefinition;
  capitalize?: boolean;
  state: IPropertyDefinitionState;
  renderer?: React.ComponentType<RendererPropsType>;
  rendererArgs?: object;
}

export interface IPropertyViewHandlerProps<RendererPropsType> extends IPropertyViewMainHandlerProps<RendererPropsType> {
  language: string;
  rtl: boolean;
  currency: ICurrencyType;
  i18n: Ii18NType;
  country: ICountryType;
}

interface IRendererHandlerType {
  renderer: string,
  handler: React.ComponentType<IPropertyViewHandlerProps<IPropertyViewRendererProps>>,
};

const handlerRegistry:
  Record<
    PropertyDefinitionSupportedTypeName,
    IRendererHandlerType
  > = {
  string: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  integer: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  number: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  boolean: null,
  text: null,
  currency: null,
  unit: null,
  password: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  year: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  datetime: null,
  date: null,
  time: null,
  location: null,

  // TODO
  file: null,
  files: null,
};

export function RawBasePropertyView(props: {
  value: string;
  renderer?: React.ComponentType<IRendererProps>;
  rendererArgs?: object;
}) {
  // Build the context and render sending the right props
  return (
    <RendererContext.Consumer>
      {
        (renderers) =>
          <LocaleContext.Consumer>
            {
              (locale) => {
                const renderer: React.ComponentType<IPropertyViewSimpleRendererProps> =
                  props.renderer as React.ComponentType<IPropertyViewSimpleRendererProps> || renderers.PropertyViewSimple;
                return (
                  <PropertyViewSimple
                    property={null}
                    state={{
                      userSet: false,
                      default: null,
                      enforced: false,
                      hidden: false,
                      valid: true,        
                      value: props.value,
                      stateValue: props.value,
                      stateAppliedValue: props.value,
                      stateValueModified: false,
                      stateValueHasBeenManuallySet: false,
                      invalidReason: null,
                      internalValue: null,
                      propertyId: null,
                    }}
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


export default function PropertyView(
  props: IPropertyViewMainHandlerProps<IPropertyViewRendererProps>,
) {
  if (props.state.hidden) {
    return null;
  }

  // First get the handler by the type
  const registryEntry = handlerRegistry[props.property.getType()];
  const Element = registryEntry.handler;

  // Build the context and render sending the right props
  return (
    <RendererContext.Consumer>
      {
        (renderers) =>
          <LocaleContext.Consumer>
            {
              (locale) => {
                const renderer: React.ComponentType<IPropertyViewRendererProps> =
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
