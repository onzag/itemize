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
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import Include from "../../../../base/Root/Module/ItemDefinition/Include";
import PropertyViewText from "./PropertyViewText";
import PropertyViewFile from "./PropertyViewFile";
import { IConfigRawJSONDataType } from "../../../../config";
import { ConfigContext } from "../../providers/config-provider";
import { PropertyViewBoolean } from "./PropertyViewBoolean";
import { PropertyViewDateTime } from "./PropertyViewDateTime";

/**
 * This is what every view renderer gets
 * 
 * Expect these to be extended
 */
export interface IPropertyViewRendererProps<ValueType> extends IRendererProps {
  currentValue: ValueType;
}

/**
 * This is what the general view handler is supposed to get
 */
export interface IPropertyViewMainHandlerProps<RendererPropsType> {
  config?: IConfigRawJSONDataType;
  containerId: string;
  include: Include;
  itemDefinition: ItemDefinition;
  forId: number;
  forVersion: string;
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
  handler: React.ComponentType<IPropertyViewHandlerProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>>,
  includeConfig?: boolean;
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
  boolean: {
    renderer: "PropertyViewBoolean",
    handler: PropertyViewBoolean,
  },
  text: {
    renderer: "PropertyViewText",
    handler: PropertyViewText,
    includeConfig: true,
  },
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
  datetime: {
    renderer: "PropertyViewDateTime",
    handler: PropertyViewDateTime,
  },
  date: {
    renderer: "PropertyViewDateTime",
    handler: PropertyViewDateTime,
  },
  time: {
    renderer: "PropertyViewDateTime",
    handler: PropertyViewDateTime,
  },
  location: null,
  file: {
    renderer: "PropertyViewFile",
    handler: PropertyViewFile,
    includeConfig: true,
  },
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
                    itemDefinition={null}
                    property={null}
                    include={null}
                    forId={null}
                    forVersion={null}
                    containerId={null}
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
  props: IPropertyViewMainHandlerProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>,
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
                const renderer: React.ComponentType<IPropertyViewRendererProps<PropertyDefinitionSupportedType>> =
                  props.renderer || renderers[registryEntry.renderer];
                if (registryEntry.includeConfig) {
                  return <ConfigContext.Consumer>
                    {(config) => (
                      <Element
                        {...props}
                        language={locale.language}
                        i18n={locale.i18n}
                        rtl={locale.rtl}
                        currency={currencies[locale.currency]}
                        country={countries[locale.country]}
                        renderer={renderer}
                        rendererArgs={props.rendererArgs || {}}
                        config={config}
                      />
                    )}
                  </ConfigContext.Consumer>
                }
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
