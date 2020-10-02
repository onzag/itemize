/**
 * Contains the base function that handles read, view, and entry all of them
 * in a single function single the logic that handles this under the hood is remarkably similar
 *
 * @packageDocumentation
 */

import React from "react";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ItemDefinitionContext } from "../../providers/item-definition";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { RESERVED_BASE_PROPERTIES, SearchVariants } from "../../../constants";
import PropertyView, { RawBasePropertyView } from "../../internal/components/PropertyView";
import PropertyEntry from "../../internal/components/PropertyEntry";
import PropertySetter from "../../internal/components/PropertySetter";
import { IncludeContext } from "../../providers/include";
import { fileURLAbsoluter, fileArrayURLAbsoluter } from "../../../util";
import { IGQLFile } from "../../../gql-querier";
import { ConfigContext } from "../../internal/providers/config-provider";

/**
 * The base interface, all entry, read, view, set contain these attributes
 */
export interface IPropertyBaseProps {
  /**
  * the id of the property that must exist under the item definition
  * provider
  */
  id: string;
  /**
   * A search variant, exact, from, to, radius, etc...
   * only truly available in search mode
   */
  searchVariant?: SearchVariants;
  /**
   * the policy type, should be provided with a policy name
   */
  policyType?: string;
  /**
   * the policy name, should be provided with a policy type
   */
  policyName?: string;
}

/**
 * The base interface with renderers this time
 */
export interface IPropertyBaseWithRendererProps<RendererPropsType> extends IPropertyBaseProps {
  /**
   * the renderer in charge of rendering the output
   */
  renderer?: React.ComponentType<RendererPropsType>;
  /**
   * Extra renderer args
   */
  rendererArgs?: object;
}

/**
 * The entry props for all read, view, and entry
 */
export interface IPropertyEntryProps<RendererPropsType> extends IPropertyBaseWithRendererProps<RendererPropsType> {
  /**
   * an optional function to get the value as the property changes
   * these changes are given by the entry and do not come when
   * the property change due to an external force
   */
  onEntryDrivenChange?: (value: PropertyDefinitionSupportedType) => void;
  /**
   * make it seem as invalid, allows displaying an entry property as invalid
   */
  showAsInvalid?: boolean;
  /**
   * An icon to display alognside
   */
  icon?: React.ReactNode;
  /**
   * Whether to hide the description that is hidden in language data
   */
  hideDescription?: boolean;
  /**
   * An alternative description
   */
  altDescription?: string;
  /**
   * An alternative label
   */
  altLabel?: string;
  /**
   * An alternative placeholder
   */
  altPlaceholder?: string;
  /**
   * Whether to ignore the errors
   * that are given
   */
  ignoreErrors?: boolean;
  /**
   * Focus on mount
   */
  autoFocus?: boolean;
  /**
   * The value to prefill with on mount
   */
  prefillWith?: PropertyDefinitionSupportedType;
  /**
   * Used only for the referenced type, to add to
   * the reference filtering set options
   */
  referenceFilteringSet?: {
    [key: string]: PropertyDefinitionSupportedType;
  };
  /**
   * whether to cache files when running the url absoluter
   */
  cacheFiles?: boolean;
}

/**
 * The setter props
 */
export interface IPropertySetterProps extends IPropertyBaseProps {
  /**
   * The value to provide to such property
   */
  value: PropertyDefinitionSupportedType;
}

/**
 * The reader props
 */
export interface IPropertyReadProps extends IPropertyBaseProps {
  /**
   * The reader callback
   */
  children?: (value: PropertyDefinitionSupportedType, state: IPropertyDefinitionState) => React.ReactNode;
  /**
   * whether to use the applied value rather than the
   * actual current value the applied value is synced
   * with the server
   */
  useAppliedValue?: boolean;
  /**
   * whether to cache files when running the url absoluter
   */
  cacheFiles?: boolean;
}

/**
 * The view props
 */
export interface IPropertyViewProps<RendererPropsType> extends IPropertyBaseWithRendererProps<RendererPropsType> {
  /**
   * Whether to capitalize
   */
  capitalize?: boolean;
  /**
   * whether to use the applied value rather than the
   * actual current value the applied value is synced
   * with the server
   */
  useAppliedValue?: boolean;
  /**
   * whether to cache files when running the url absoluter
   */
  cacheFiles?: boolean;
}

/**
 * The props it takes basically extends everything
 */
interface IPropertyEntryViewReadSetProps<RendererPropsType> extends
  IPropertyEntryProps<RendererPropsType>, IPropertyViewProps<RendererPropsType>, IPropertySetterProps, IPropertyReadProps { }

/**
 * This is a legit function that takes all the props in order to pipe them
 * to the proper handler
 * @param props the props that are passed
 * @param type the type, entry, view, read, or set
 * @returns a react component
 */
export function EntryViewReadSet(
  props: IPropertyEntryViewReadSetProps<any>,
  type: "entry" | "view" | "read" | "set",
) {
  // so we return
  return (
    <ConfigContext.Consumer>
      {(config) => (
        <ItemDefinitionContext.Consumer>
          {
            (itemDefinitionContextualValue) => (
              <IncludeContext.Consumer>
                {
                  (includeContextualValue) => {
                    // so we need to be in an item definition contextual value
                    // because otherwise we just can't get the property we need
                    if (!itemDefinitionContextualValue) {
                      throw new Error("The Entry/View/Read/Set must be in a ItemDefinitionProvider context");
                    }

                    // now we need the actual id, because search variants
                    // cause another id
                    let actualId = props.id;
                    if (props.searchVariant) {
                      // for that we just get the prefix and add it
                      actualId =
                        PropertyDefinitionSearchInterfacesPrefixes[props.searchVariant.toUpperCase()] + props.id;
                    }

                    // now we need to check if this is a meta property such a created_at, edited_at, etc...
                    const isMetaProperty = !!RESERVED_BASE_PROPERTIES[actualId];
                    // and once we know that we can get the value, basically we
                    // don't have a property definition if is a meta property, and we need to extract
                    // it from the include if it's available
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
                    
                    // now we need to get the property state
                    let propertyState: IPropertyDefinitionState = null;
                    // if it's not a meta property we can access it
                    if (!isMetaProperty) {
                      // if we are into an include
                      if (includeContextualValue) {
                        // this might be null if the state is excluded, which makes the property state
                        // be null and unknown
                        if (includeContextualValue.state.itemDefinitionState) {
                          propertyState = includeContextualValue.state.itemDefinitionState.properties
                            .find((p) => p.propertyId === actualId);
                        }
                      } else if (props.policyType && props.policyName) {
                        // otherwise if we refer to a policy
                        propertyState = itemDefinitionContextualValue.state
                          .policies[props.policyType][props.policyName]
                          .find((p: IPropertyDefinitionState) => p.propertyId === actualId);
                      } else {
                        // otherwise
                        propertyState =
                          itemDefinitionContextualValue.state.properties.find((p) => p.propertyId === actualId);
                      }
                    }

                    // now we need to get the container id, the container id refers to where the data was stored
                    // in the server side information container, we might have one already
                    const containerId: string = (itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                      itemDefinitionContextualValue.state.gqlOriginalFlattenedValue.container_id as string) || null;

                    // so now we can start in conditional rendering
                    if (type === "read") {
                      // so if we have a property state (which will not exist in meta properties)
                      if (propertyState) {
                        // we get the property description
                        const propertyDescription = property.getPropertyDefinitionDescription();
                        // to check if we are talking about file, or files
                        if (propertyDescription.gqlAddFileToFields) {
                          // and if that is the case, now we need to check if it's a
                          // list or a single value

                          const domain = process.env.NODE_ENV === "production" ? config.productionHostname : config.developmentHostname;

                          // and as such we absolute the files so that their urls
                          // are indeed proper, being a read operation, there's no risk on it
                          if (!propertyDescription.gqlList) {
                            return props.children(fileURLAbsoluter(
                              domain,
                              config.containersHostnamePrefixes,
                              props.useAppliedValue ? propertyState.stateAppliedValue as IGQLFile : propertyState.value as IGQLFile,
                              itemDefinitionContextualValue.idef,
                              itemDefinitionContextualValue.forId,
                              itemDefinitionContextualValue.forVersion,
                              containerId,
                              includeContextualValue && includeContextualValue.include,
                              property,
                              !!props.cacheFiles,
                            ), propertyState);
                          } else {
                            return props.children(fileArrayURLAbsoluter(
                              domain,
                              config.containersHostnamePrefixes,
                              props.useAppliedValue ? propertyState.stateAppliedValue as IGQLFile[] : propertyState.value as IGQLFile[],
                              itemDefinitionContextualValue.idef,
                              itemDefinitionContextualValue.forId,
                              itemDefinitionContextualValue.forVersion,
                              containerId,
                              includeContextualValue && includeContextualValue.include,
                              property,
                              !!props.cacheFiles,
                            ), propertyState);
                          }
                        }

                        // otherwise we just call the function as it is
                        return props.children(
                          props.useAppliedValue ? propertyState.stateAppliedValue : propertyState.value,
                          propertyState,
                        );
                      }

                      // if we are talking a meta property
                      if (isMetaProperty) {
                        // the grapqhl value we get
                        let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                          itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
                        // if it's undefined we give null
                        if (typeof gqlValue === "undefined") {
                          gqlValue = null;
                        }
                        // and then call the children
                        return props.children(gqlValue as any, null);
                      }

                      // Property has no state, and no internal value, it must be somehow hidden
                      return null;

                    // we go now for views
                    } else if (type === "view") {
                      // now in the case of these, we have special considerations
                      if (propertyState) {
                        // if we have a state it's simple, and we pass these values into it
                        return (
                          <PropertyView
                            include={includeContextualValue && includeContextualValue.include}
                            property={property}
                            state={propertyState}
                            capitalize={props.capitalize}
                            renderer={props.renderer}
                            containerId={containerId}
                            rendererArgs={props.rendererArgs}
                            forId={itemDefinitionContextualValue.forId}
                            forVersion={itemDefinitionContextualValue.forVersion}
                            itemDefinition={itemDefinitionContextualValue.idef}
                            useAppliedValue={props.useAppliedValue}
                            cacheFiles={props.cacheFiles}
                          />
                        );
                      }

                      // if we have a meta property nevertheless
                      if (isMetaProperty) {
                        // we need to read its value
                        let gqlValue = itemDefinitionContextualValue.state.gqlOriginalFlattenedValue &&
                          itemDefinitionContextualValue.state.gqlOriginalFlattenedValue[actualId];
                        if (typeof gqlValue === "undefined") {
                          gqlValue = null;
                        }

                        // and then pass it to the raw base property view, which will
                        // use the appropiate rendered for this
                        if (typeof gqlValue === "number") {
                          return <RawBasePropertyView
                            value={gqlValue.toString()}
                            renderer={props.renderer}
                            rendererArgs={props.rendererArgs}
                          />;
                        } else {
                          return <RawBasePropertyView
                            value={gqlValue as any}
                            renderer={props.renderer}
                            rendererArgs={props.rendererArgs}
                          />;
                        }
                      }

                      // otherwise there's nothing to display, the property
                      // has no state, it must somehow be hidden or unavailable
                      return null;

                    // now for entries
                    } else if (type === "entry") {
                      // property has no state it must be hidden
                      // or somehow not accessible eg. it has been optimized for
                      if (!propertyState) {
                        return null;
                      }

                      // this is the proper onchange function
                      const onChange = (newValue: PropertyDefinitionSupportedType, internalValue?: any) => {
                        itemDefinitionContextualValue.onPropertyChange(property, newValue, internalValue);
                        if (props.onEntryDrivenChange) {
                          props.onEntryDrivenChange(newValue);
                        }
                      };

                      // and the on restore function
                      const onRestore = () => {
                        itemDefinitionContextualValue.onPropertyRestore(property);
                        if (props.onEntryDrivenChange) {
                          const value =
                            property.getCurrentValue(itemDefinitionContextualValue.forId, itemDefinitionContextualValue.forVersion);
                          props.onEntryDrivenChange(value);
                        }
                      }

                      // and now for whether it's poked, by default it's false
                      let isPoked: boolean = false;

                      // now we search for it, so for a policy we search in the pokedElements
                      // to see if it's there
                      if (props.policyType) {
                        isPoked = !!itemDefinitionContextualValue.pokedElements.policies.find(
                          pElement =>
                            pElement[0] === props.policyType &&
                            pElement[1] === props.policyName &&
                            pElement[2] === property.getId());
                      } else if (includeContextualValue) {
                        // for the includes we do something similar as well
                        isPoked = !!itemDefinitionContextualValue.pokedElements.includes.find((iId) => {
                          return iId === includeContextualValue.include.getId();
                        });
                      } else {
                        // and for a specific property
                        isPoked = !!itemDefinitionContextualValue.pokedElements.properties.find((pId) => {
                          return pId === property.getId();
                        });
                      }

                      // and then we can return the property entry in all its glory
                      return (
                        <PropertyEntry
                          itemDefinition={itemDefinitionContextualValue.idef}
                          injectSubmitBlockPromise={itemDefinitionContextualValue.injectSubmitBlockPromise}
                          include={(includeContextualValue && includeContextualValue.include) || null}
                          property={property}
                          state={propertyState}
                          onChange={onChange}
                          onRestore={onRestore}
                          forceInvalid={props.showAsInvalid}
                          containerId={containerId}
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
                          autoFocus={props.autoFocus}
                          prefillWith={props.prefillWith}
                          referenceFilteringSet={props.referenceFilteringSet}
                          cacheFiles={props.cacheFiles}
                        />
                      );
                    } else {
                      // property has no state it must be hidden
                      if (!propertyState) {
                        return null;
                      }

                      // so we return the propery setter
                      return (
                        <PropertySetter
                          property={property}
                          onEnforce={itemDefinitionContextualValue.onPropertyEnforce}
                          onClearEnforcement={itemDefinitionContextualValue.onPropertyClearEnforce}
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
      )}
    </ConfigContext.Consumer>
  );
}