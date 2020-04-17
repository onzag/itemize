import React from "react";
import PropertyDefinition, { IPropertyDefinitionState } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ItemDefinitionContext } from "../providers/item-definition";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { RESERVED_BASE_PROPERTIES } from "../../constants";
import PropertyView, { RawBasePropertyView } from "../internal/components/PropertyView";
import PropertyEntry from "../internal/components/PropertyEntry";
import PropertySetter from "../internal/components/PropertySetter";
import { IncludeContext } from "../providers/include";
import { fileURLAbsoluter, fileArrayURLAbsoluter } from "./util";
import { IGQLFile } from "../../gql-querier";

type SearchVariants = "exact" | "from" | "to" | "location" | "radius" | "search";

interface IPropertyEntryProps<RendererPropsType> {
  id: string;
  searchVariant?: SearchVariants;
  policyType?: string;
  policyName?: string;
  showAsInvalid?: boolean;
  icon?: string;
  onChange?: (property: PropertyDefinition, newValue: PropertyDefinitionSupportedType, inernalValue?: any) => void;
  renderer?: React.ComponentType<RendererPropsType>;
  rendererArgs?: object;
  hideDescription?: boolean;
  altDescription?: string;
  altLabel?: string;
  altPlaceholder?: string;
  ignoreErrors?: boolean;
}

interface IPropertySetterProps {
  id: string;
  searchVariant?: SearchVariants;
  policyType?: string;
  policyName?: string;
  value: PropertyDefinitionSupportedType;
}

interface IPropertyReadProps {
  id: string;
  searchVariant?: SearchVariants;
  policyType?: string;
  policyName?: string;
  children?: (value: PropertyDefinitionSupportedType, state: IPropertyDefinitionState) => React.ReactNode;
}

interface IPropertyViewProps {
  id: string;
  searchVariant?: SearchVariants;
}

interface IPropertyEntryViewReadSetProps<RendererPropsType> {
  id: string;
  searchVariant?: SearchVariants;
  policyType?: string;
  policyName?: string;
  children?: (value: PropertyDefinitionSupportedType, state: IPropertyDefinitionState) => React.ReactNode;
  showAsInvalid?: boolean;
  icon?: string;
  onChange?: (property: PropertyDefinition, newValue: PropertyDefinitionSupportedType, internalValue?: any) => void;
  value?: PropertyDefinitionSupportedType;
  renderer?: React.ComponentType<RendererPropsType>;
  rendererArgs?: object;
  hideDescription?: boolean;
  altDescription?: string;
  altLabel?: string;
  altPlaceholder?: string;
  ignoreErrors?: boolean;
}
// TODO optimize
function EntryViewReadSet(props: IPropertyEntryViewReadSetProps<any>, type: "entry" | "view" | "read" | "set") {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => (
          <IncludeContext.Consumer>
            {
              (includeContextualValue) => {
                if (!itemDefinitionContextualValue) {
                  throw new Error("The Entry/View/Read/Set must be in a ItemDefinitionProvider context");
                }

                let actualId = props.id;
                if (props.searchVariant) {
                  actualId =
                    PropertyDefinitionSearchInterfacesPrefixes[props.searchVariant.toUpperCase()] + props.id;
                }

                const isMetaProperty = !!RESERVED_BASE_PROPERTIES[actualId];
                const property = !isMetaProperty ? (
                    includeContextualValue ?
                    includeContextualValue.include.getSinkingPropertyFor(actualId) :
                    (
                      (props.policyType && props.policyName) ?
                        itemDefinitionContextualValue.idef
                          .getPropertyDefinitionForPolicy(props.policyType, props.policyName, actualId) :
                        itemDefinitionContextualValue.idef
                          .getPropertyDefinitionFor(actualId, true)
                    )
                  ) : null;
                let propertyState: IPropertyDefinitionState = null;
                if (!isMetaProperty) {
                  if (includeContextualValue) {
                    // this might be null if the state is excluded, which makes the property state
                    // be null and unknown
                    if (includeContextualValue.state.itemDefinitionState) {
                      propertyState = includeContextualValue.state.itemDefinitionState.properties
                        .find((p) => p.propertyId === actualId);
                    }
                  } else if (props.policyType && props.policyName) {
                    propertyState = itemDefinitionContextualValue.state
                      .policies[props.policyType][props.policyName]
                      .find((p) => p.propertyId === actualId);
                  } else {
                    propertyState =
                      itemDefinitionContextualValue.state.properties.find((p) => p.propertyId === actualId);
                  }
                }

                if (type === "read") {
                  if (propertyState) {
                    const propertyDescription = property.getPropertyDefinitionDescription();
                    if (propertyDescription.gqlAddFileToFields) {
                      if (!propertyDescription.gqlList) {
                        return props.children(fileURLAbsoluter(
                          propertyState.value as IGQLFile,
                          itemDefinitionContextualValue.idef,
                          itemDefinitionContextualValue.forId,
                          itemDefinitionContextualValue.forVersion,
                          includeContextualValue && includeContextualValue.include,
                          property,
                        ), propertyState);
                      } else {
                        return props.children(fileArrayURLAbsoluter(
                          propertyState.value as IGQLFile[],
                          itemDefinitionContextualValue.idef,
                          itemDefinitionContextualValue.forId,
                          itemDefinitionContextualValue.forVersion,
                          includeContextualValue && includeContextualValue.include,
                          property,
                        ), propertyState);
                      }
                    }
                    return props.children(propertyState.value, propertyState);
                  }
                  if (isMetaProperty) {
                    let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                      itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
                    if (typeof gqlValue === "undefined") {
                      gqlValue = null;
                    }
                    return props.children(gqlValue as any, null);
                  }
                  // Property has no state, and no internal value, it must be somehow hidden
                  return null;
                } else if (type === "view") {
                  if (propertyState) {
                    return (
                      <PropertyView
                        property={property}
                        state={propertyState}
                      />
                    );
                  }
                  if (isMetaProperty) {
                    let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                      itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
                    if (typeof gqlValue === "undefined") {
                      gqlValue = null;
                    }
                    if (typeof gqlValue === "number") {
                      return <RawBasePropertyView
                        value={gqlValue.toString()}
                      />;
                    } else {
                      return <RawBasePropertyView
                        value={gqlValue as any}
                      />;
                    }
                  }
                  return null;
                } else if (type === "entry") {
                  // property has no state it must be hidden
                  // or somehow not accessible eg. it has been optimized for
                  if (!propertyState) {
                    return null;
                  }
                  const onChange = (newValue: PropertyDefinitionSupportedType, internalValue?: any) => {
                    if (props.onChange) {
                      props.onChange(property, newValue, internalValue);
                    }
                    itemDefinitionContextualValue.onPropertyChange(property, newValue, internalValue);
                  };
                  let isPoked: boolean = false;
                  if (props.policyType) {
                    isPoked = !!itemDefinitionContextualValue.pokedElements.policies.find(
                      pElement =>
                        pElement[0] === props.policyType &&
                        pElement[1] === props.policyName &&
                        pElement[2] === property.getId());
                  } else if (includeContextualValue) {
                    isPoked = !!itemDefinitionContextualValue.pokedElements.includes.find((iId) => {
                      return iId === includeContextualValue.include.getId();
                    });
                  } else {
                    isPoked = !!itemDefinitionContextualValue.pokedElements.properties.find((pId) => {
                      return pId === property.getId();
                    });
                  }
                  return (
                    <PropertyEntry
                      itemDefinition={itemDefinitionContextualValue.idef}
                      include={(includeContextualValue && includeContextualValue.include) || null}
                      property={property}
                      state={propertyState}
                      onChange={onChange}
                      forceInvalid={props.showAsInvalid}
                      icon={props.icon}
                      forId={itemDefinitionContextualValue.forId}
                      forVersion={itemDefinitionContextualValue.forVersion}
                      poked={isPoked}
                      renderer={props.renderer}
                      rendererArgs={props.rendererArgs}
                      hideDescription={props.hideDescription}
                      altDescription={props.altDescription}
                      altLabel={props.altLabel}
                      altPlaceholder={props.altPlaceholder}
                      ignoreErrors={props.ignoreErrors}
                    />
                  );
                } else {
                  // property has no state it must be hidden
                  if (!propertyState) {
                    return null;
                  }

                  return (
                    <PropertySetter
                      property={property}
                      onEnforce={itemDefinitionContextualValue.onPropertyEnforce.bind(null, property)}
                      onClearEnforcement={itemDefinitionContextualValue.onPropertyClearEnforce.bind(null, property)}
                      forId={itemDefinitionContextualValue.forId}
                      forVersion={itemDefinitionContextualValue.forVersion}
                      value={props.value}
                    />
                  );
                }
              }
            }
          </IncludeContext.Consumer>
        )
      }
    </ItemDefinitionContext.Consumer>
  );
}

export function Entry(props: IPropertyEntryProps<any>) {
  return EntryViewReadSet(props, "entry");
}

export function View(props: IPropertyViewProps) {
  return EntryViewReadSet(props, "view");
}

export function Reader(props: IPropertyReadProps) {
  return EntryViewReadSet(props, "read");
}

export function Setter(props: IPropertySetterProps) {
  return EntryViewReadSet(props, "set");
}
