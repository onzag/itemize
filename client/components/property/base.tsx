/**
 * Contains the base function that handles read, view, and entry all of them
 * in a single function single the logic that handles this under the hood is remarkably similar
 *
 * @module
 */

import React, { useContext } from "react";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ItemContext } from "../../providers/item";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { RESERVED_BASE_PROPERTIES, SearchVariants } from "../../../constants";
import PropertyView, { RawBasePropertyView } from "../../internal/components/PropertyView";
import PropertyEntry from "../../internal/components/PropertyEntry";
import PropertySetter from "../../internal/components/PropertySetter";
import { IncludeContext } from "../../providers/include";
import { fileURLAbsoluter, fileArrayURLAbsoluter } from "../../../util";
import { IGQLFile } from "../../../gql-querier";
import { ConfigContext } from "../../internal/providers/config-provider";
import equals from "deep-equal";

export interface IPropertyCoreProps {
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
}

/**
 * The base interface, all entry, read, view, set contain these attributes
 */
export interface IPropertyBaseProps extends IPropertyCoreProps {
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
   * Hide the label
   */
  hideLabel?: boolean;
  /**
   * Hide the placeholder
   */
  hidePlaceholder?: boolean;
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
   * 
   * this uses the service worker mechanism, it will not affect
   * files that have been cached internally using long term
   * caching
   */
  cacheFiles?: boolean;
  /**
   * force to be disabled
   */
  disabled?: boolean;
  /**
   * Will display even if it's hidden
   */
  displayHidden?: boolean;

  /**
   * Used for the text type allows to override the language
   * of a property for a new value
   */
  languageOverride?: string;
}

/**
 * The setter props
 */
export interface IPropertySetterProps<T extends PropertyDefinitionSupportedType> extends IPropertyBaseProps {
  /**
   * The value to provide to such property
   */
  value: T;
}


/**
 * The reader props
 */
export interface IPropertyReadPropsWOChildren extends IPropertyBaseProps {
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
 * The reader props
 */
export interface IPropertyReadProps<T extends PropertyDefinitionSupportedType> extends IPropertyReadPropsWOChildren {
  /**
   * The reader callback
   */
  children?: (value: T, state: IPropertyDefinitionState<T>) => React.ReactNode;
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
  /**
   * Will display even if it's hidden
   */
  displayHidden?: boolean;
}

/**
 * The props it takes basically extends everything
 */
interface IPropertyEntryViewReadSetProps<T extends PropertyDefinitionSupportedType, RendererPropsType> extends
  IPropertyEntryProps<RendererPropsType>, IPropertyViewProps<RendererPropsType>, IPropertySetterProps<T>, IPropertyReadProps<T> { }

/**
 * This is a legit function that takes all the props in order to pipe them
 * to the proper handler
 * @param props the props that are passed
 * @param type the type, entry, view, read, or set
 * @returns a react component
 */
export function EntryViewReadSet(
  originalProps: IPropertyEntryViewReadSetProps<any, any> | string,
  type: "entry" | "view" | "read" | "set",
  use?: boolean,
): any {
  const config = useContext(ConfigContext);
  const itemContextualValue = useContext(ItemContext);
  const includeContextualValue = useContext(IncludeContext);

  let props = originalProps as IPropertyEntryViewReadSetProps<any, any>;
  if (typeof originalProps === "string") {
    props = {
      id: originalProps,
    } as any;
  }

  // so we need to be in an item definition contextual value
  // because otherwise we just can't get the property we need
  if (!itemContextualValue) {
    throw new Error("The Entry/View/Read/Set must be in a ItemProvider context");
  }

  // now we need the actual id, because search variants
  // cause another id
  let actualId = props.id;
  if (props.searchVariant) {
    // for that we just get the prefix and add it
    actualId =
      PropertyDefinitionSearchInterfacesPrefixes[props.searchVariant.toUpperCase().replace("-", "_")] + props.id;
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
          itemContextualValue.idef
            .getPropertyDefinitionForPolicy(props.policyType, props.policyName, actualId) :
          itemContextualValue.idef
            .getPropertyDefinitionFor(actualId, true)
      )
  ) : null;

  // now we need to get the property state
  let propertyState: IPropertyDefinitionState<any> = null;
  // if it's not a meta property we can access it
  if (!isMetaProperty) {
    // if we are into an include
    if (includeContextualValue) {
      // this might be null if the state is excluded, which makes the property state
      // be null and unknown
      if (includeContextualValue.state.itemState) {
        propertyState = includeContextualValue.state.itemState.properties
          .find((p) => p.propertyId === actualId);
      }
    } else if (props.policyType && props.policyName) {
      // otherwise if we refer to a policy
      propertyState = itemContextualValue.state &&
        itemContextualValue.state.policies &&
        itemContextualValue.state.policies[props.policyType] &&
        itemContextualValue.state.policies[props.policyType][props.policyName] &&
        itemContextualValue.state.policies[props.policyType][props.policyName].find((p: IPropertyDefinitionState<any>) => p.propertyId === actualId);
    } else {
      // otherwise
      propertyState =
        itemContextualValue.state.properties.find((p) => p.propertyId === actualId);
    }
  }

  // now we need to get the container id, the container id refers to where the data was stored
  // in the server side information container, we might have one already
  const containerId: string = (itemContextualValue.state.gqlOriginalFlattenedValue &&
    itemContextualValue.state.gqlOriginalFlattenedValue.container_id as string) || null;

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
          const value = fileURLAbsoluter(
            domain,
            config.containersHostnamePrefixes,
            props.useAppliedValue ? propertyState.stateAppliedValue as IGQLFile : propertyState.value as IGQLFile,
            itemContextualValue.idef,
            itemContextualValue.forId,
            itemContextualValue.forVersion,
            containerId,
            includeContextualValue && includeContextualValue.include,
            property,
            !!props.cacheFiles,
          );

          if (use) {
            return [value, propertyState];
          }

          return props.children(value, propertyState);
        } else {
          const value = fileArrayURLAbsoluter(
            domain,
            config.containersHostnamePrefixes,
            props.useAppliedValue ? propertyState.stateAppliedValue as IGQLFile[] : propertyState.value as IGQLFile[],
            itemContextualValue.idef,
            itemContextualValue.forId,
            itemContextualValue.forVersion,
            containerId,
            includeContextualValue && includeContextualValue.include,
            property,
            !!props.cacheFiles,
          );

          if (use) {
            return [value, propertyState];
          }

          return props.children(value, propertyState);
        }
      }

      if (use) {
        return [
          props.useAppliedValue ? propertyState.stateAppliedValue : propertyState.value,
          propertyState,
        ];
      }

      // otherwise we just call the function as it is
      return props.children(
        props.useAppliedValue ? propertyState.stateAppliedValue : propertyState.value,
        propertyState,
      );
    }

    // if we are talking a meta property
    if (isMetaProperty) {
      let gqlValue: any;
      if (actualId === "id") {
        gqlValue = itemContextualValue.forId;
      } else if (actualId === "version") {
        gqlValue = itemContextualValue.forVersion;
      } else {
        gqlValue = itemContextualValue.state.gqlOriginalFlattenedValue &&
          itemContextualValue.state.gqlOriginalFlattenedValue[actualId];
      }

      // if it's undefined we give null
      if (typeof gqlValue === "undefined") {
        gqlValue = null;
      }
      // and then call the children
      if (use) {
        return [gqlValue, null];
      }

      return props.children(gqlValue as any, null);
    }

    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Possibly unwanted behaviour, you used a Reader on property " +
        property.getId() +
        " but it has not been loaded on this context"
      );
    }

    if (use) {
      return [null, null];
    }

    // Property has no state, and no internal value, it must be somehow hidden
    return null;

    // we go now for views
  } else if (type === "view") {
    // now in the case of these, we have special considerations
    if (propertyState) {
      if (
        !props.displayHidden &&
        propertyState.hidden &&
        process.env.NODE_ENV === "development"
      ) {
        console.warn(
          "You used a View on property " +
          property.getId() +
          " but it is currently hidden, if you want it to display it anyway use displayHidden={true}"
        );
      }

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
          forId={itemContextualValue.forId}
          forVersion={itemContextualValue.forVersion}
          itemDefinition={itemContextualValue.idef}
          useAppliedValue={props.useAppliedValue}
          cacheFiles={props.cacheFiles}
          displayHidden={props.displayHidden}
          highlights={itemContextualValue.highlights && itemContextualValue.highlights[property.getId()]}
        />
      );
    }

    // if we have a meta property nevertheless
    if (isMetaProperty) {
      // we need to read its value
      let gqlValue = itemContextualValue.state.gqlOriginalFlattenedValue &&
        itemContextualValue.state.gqlOriginalFlattenedValue[actualId];
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

    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Possibly unwanted behaviour, you used a View on property " +
        property.getId() +
        " but it has not been loaded on this context"
      );
    }

    // otherwise there's nothing to display, the property
    // has no state, it must somehow be hidden or unavailable
    return null;

    // now for entries
  } else if (type === "entry") {
    // property has no state it must be hidden
    // or somehow not accessible eg. it has been optimized for
    if (!propertyState) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Possibly unwanted behaviour, you used a Entry on property " +
          property.getId() +
          " but it has not been loaded on this context"
        );
      }

      return null;
    }

    if (
      !props.displayHidden &&
      propertyState.hidden &&
      process.env.NODE_ENV === "development"
    ) {
      console.warn(
        "Possibly unwanted behaviour, you used a Entry on property " +
        property.getId() +
        " but it is currently hidden, if you want it to display it anyway use displayHidden={true}"
      );
    }

    // this is the proper onchange function
    const onChange = (newValue: PropertyDefinitionSupportedType, internalValue?: any) => {
      let valueBeforeUpdate: PropertyDefinitionSupportedType;
      if (props.onEntryDrivenChange) {
        valueBeforeUpdate =
          property.getCurrentValue(itemContextualValue.forId, itemContextualValue.forVersion);
      }
      itemContextualValue.onPropertyChange(property, newValue, internalValue);
      if (props.onEntryDrivenChange && !equals(valueBeforeUpdate, newValue, { strict: true })) {
        props.onEntryDrivenChange(newValue);
      }
    };

    // and the on restore function
    const onRestore = () => {
      let valueBeforeUpdate: PropertyDefinitionSupportedType;
      if (props.onEntryDrivenChange) {
        valueBeforeUpdate =
          property.getCurrentValue(itemContextualValue.forId, itemContextualValue.forVersion);
      }
      itemContextualValue.onPropertyRestore(property);
      if (props.onEntryDrivenChange) {
        const value =
          property.getCurrentValue(itemContextualValue.forId, itemContextualValue.forVersion);
        if (!equals(valueBeforeUpdate, value, { strict: true })) {
          props.onEntryDrivenChange(value);
        }
      }
    }

    // and now for whether it's poked, by default it's false
    let isPoked: boolean = false;

    // now we search for it, so for a policy we search in the pokedElements
    // to see if it's there
    if (props.policyType) {
      isPoked = !!itemContextualValue.pokedElements.policies.find(
        pElement =>
          pElement[0] === props.policyType &&
          pElement[1] === props.policyName &&
          pElement[2] === property.getId());
    } else if (includeContextualValue) {
      // for the includes we do something similar as well
      const pokeInclude = Object.keys(itemContextualValue.pokedElements.includes).find((iId) => {
        return iId === includeContextualValue.include.getId();
      });
      isPoked = pokeInclude && pokeInclude.includes(property.getId());
    } else {
      // and for a specific property
      isPoked = !!itemContextualValue.pokedElements.properties.find((pId) => {
        return pId === property.getId();
      });
    }

    // and then we can return the property entry in all its glory
    return (
      <PropertyEntry
        itemDefinition={itemContextualValue.idef}
        injectSubmitBlockPromise={itemContextualValue.injectSubmitBlockPromise}
        include={(includeContextualValue && includeContextualValue.include) || null}
        property={property}
        state={propertyState}
        onChange={onChange}
        onRestore={onRestore}
        forceInvalid={props.showAsInvalid}
        containerId={containerId}
        forId={itemContextualValue.forId}
        forVersion={itemContextualValue.forVersion}
        poked={isPoked}
        renderer={props.renderer}
        rendererArgs={props.rendererArgs}
        hideDescription={props.hideDescription}
        altDescription={props.altDescription}
        altLabel={props.altLabel}
        hideLabel={props.hideLabel}
        hidePlaceholder={props.hidePlaceholder}
        altPlaceholder={props.altPlaceholder}
        ignoreErrors={props.ignoreErrors}
        autoFocus={props.autoFocus}
        prefillWith={props.prefillWith}
        referenceFilteringSet={props.referenceFilteringSet}
        cacheFiles={props.cacheFiles}
        disabled={props.disabled}
        displayHidden={props.displayHidden}
        languageOverride={props.languageOverride}
      />
    );
  } else {
    // so we return the propery setter
    return (
      <PropertySetter
        property={property}
        onEnforce={itemContextualValue.onPropertyEnforce}
        onClearEnforcement={itemContextualValue.onPropertyClearEnforce}
        forId={itemContextualValue.forId}
        forVersion={itemContextualValue.forVersion}
        value={props.value}
      />
    );
  }
}