import React from "react";
import PropertyDefinition, { IPropertyDefinitionState } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ItemDefinitionContext, ItemContext } from "../app/providers";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { RESERVED_BASE_PROPERTIES } from "../../constants";
import PropertyView, { RawBasePropertyView } from "./base/PropertyView";
import PropertyEntry from "./base/PropertyEntry";

type SearchVariants = "exact" | "from" | "to" | "location" | "radius" | "search";

interface IPropertyEntryProps {
  id: string;
  searchVariant?: SearchVariants;
  showAsInvalid?: boolean;
  icon?: string;
  onChange?: (property: PropertyDefinition, newValue: PropertyDefinitionSupportedType, inernalValue?: any) => void;
}

interface IPropertyReadProps {
  id: string;
  searchVariant?: SearchVariants;
  children?: (value: PropertyDefinitionSupportedType) => React.ReactNode;
}

interface IPropertyViewProps {
  id: string;
  searchVariant?: SearchVariants;
}

interface IPropertyEntryViewReadProps {
  id: string;
  searchVariant?: SearchVariants;
  children?: (value: PropertyDefinitionSupportedType) => React.ReactNode;
  showAsInvalid?: boolean;
  icon?: string;
  onChange?: (property: PropertyDefinition, newValue: PropertyDefinitionSupportedType, internalValue?: any) => void;
}

// TODO EntryViewRead in module context only for module level searches
function EntryViewRead(props: IPropertyEntryViewReadProps, view: boolean, read: boolean) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => (
          <ItemContext.Consumer>
            {
              (itemContextualValue) => {
                if (!itemDefinitionContextualValue) {
                  throw new Error("The Entry/View/Read must be in a ItemDefinitionProvider context");
                }

                let actualId = props.id;
                if (props.searchVariant) {
                  actualId =
                    PropertyDefinitionSearchInterfacesPrefixes[props.searchVariant.toUpperCase()] + props.id;
                }

                const isMetaProperty = !!RESERVED_BASE_PROPERTIES[actualId];
                const property = !isMetaProperty ? (
                    itemContextualValue ?
                    itemContextualValue.item.getSinkingPropertyFor(actualId) :
                    itemDefinitionContextualValue.idef.getPropertyDefinitionFor(actualId, true)
                  ) : null;
                let propertyState: IPropertyDefinitionState = null;
                if (!isMetaProperty) {
                  if (itemContextualValue) {
                    // this might be null if the state is excluded, which makes the property state
                    // be null and unknown
                    if (itemContextualValue.state.itemDefinitionState) {
                      propertyState = itemContextualValue.state.itemDefinitionState.properties
                        .find((p) => p.propertyId === actualId);
                    }
                  } else {
                    propertyState =
                      itemDefinitionContextualValue.state.properties.find((p) => p.propertyId === actualId);
                  }
                }

                if (read) {
                  if (propertyState) {
                    return props.children(propertyState.value);
                  }
                  if (isMetaProperty) {
                    let gqlValue = itemDefinitionContextualValue.state.gqlOriginalAppliedValue &&
                      itemDefinitionContextualValue.state.gqlOriginalAppliedValue.value[actualId];
                    if (typeof gqlValue === "undefined") {
                      gqlValue = null;
                    }
                    return props.children(gqlValue);
                  }
                  // Property has no state, and no internal value, it must be somehow hidden
                  return null;
                } else if (view) {
                  if (propertyState) {
                    return (
                      <PropertyView
                        property={property}
                        state={propertyState}
                      />
                    );
                  }
                  if (isMetaProperty) {
                    let gqlValue = itemDefinitionContextualValue.state.gqlOriginalAppliedValue &&
                      itemDefinitionContextualValue.state.gqlOriginalAppliedValue[actualId];
                    if (typeof gqlValue === "undefined") {
                      gqlValue = null;
                    }
                    if (typeof gqlValue === "number") {
                      return <RawBasePropertyView
                        value={gqlValue.toString()}
                      />;
                    } else {
                      return <RawBasePropertyView
                        value={gqlValue}
                      />;
                    }
                  }
                  return null;
                } else {
                  if (!propertyState) {
                    return null;
                  }
                  const onChange = (newValue: PropertyDefinitionSupportedType, internalValue?: any) => {
                    if (props.onChange) {
                      props.onChange(property, newValue, internalValue);
                    }
                    itemDefinitionContextualValue.onPropertyChange(property, newValue, internalValue);
                  };
                  return (
                    <PropertyEntry
                      property={property}
                      state={propertyState}
                      onChange={onChange}
                      forceInvalid={props.showAsInvalid}
                      icon={props.icon}
                      forId={itemDefinitionContextualValue.forId}
                    />
                  );
                }
              }
            }
          </ItemContext.Consumer>
        )
      }
    </ItemDefinitionContext.Consumer>
  );
}

export function Entry(props: IPropertyEntryProps) {
  return EntryViewRead(props, false, false);
}

export function View(props: IPropertyViewProps) {
  return EntryViewRead(props, true, false);
}

export function Reader(props: IPropertyReadProps) {
  return EntryViewRead(props, false, true);
}
