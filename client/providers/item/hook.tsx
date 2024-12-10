import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IItemProviderProps, ItemProvider } from ".";
import { ModuleProvider } from "../module";
import { useRootRetriever } from "../../components/root/RootRetriever";
import type Module from "../../../base/Root/Module";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IPropertyBaseProps } from "../../components/property/base";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { RESERVED_BASE_PROPERTIES_RQ } from "../../../constants";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";

export interface IItemProviderOptions extends IItemProviderProps {
  module: string | Module;
}

export interface IPropertyBasePropsWInclude extends IPropertyBaseProps {
  include: string | Include;
}

export interface IItemProviderHookElement {
  component: React.ReactNode;
  getStateFor<T>(pId: string | IPropertyBasePropsWInclude): IPropertyDefinitionState<T>;
  getValueFor<T>(pId: string | IPropertyBasePropsWInclude): T;
}

export function useItemProvider(options: IItemProviderOptions): IItemProviderHookElement {
  const root = useRootRetriever();

  const [, updateNVar] = useState(0);

  const forceUpdate = () => {
    // Force a re-render by updating the state
    updateNVar(prev => prev + 1);
  };

  const component = (
    <ModuleProvider module={options.module}>
      <ItemProvider {...options} />
    </ModuleProvider>
  );

  const mod = typeof options.module === "string" ? root.root.registry[options.module] as Module : options.module;

  const idef: ItemDefinition = useMemo(() => {
    let idef: ItemDefinition = null;
    if (typeof options.itemDefinition === "string") {
      if (options.itemDefinition) {
        if (options.itemDefinition.startsWith("MOD_") && options.itemDefinition.includes("IDEF")) {
          idef = mod.getParentRoot().registry[options.itemDefinition] as ItemDefinition;
        } else {
          idef = mod.getItemDefinitionFor(options.itemDefinition.split("/"))
        }
      } else {
        idef = mod.getPropExtensionItemDefinition();
      }
    } else {
      idef = options.itemDefinition;
    }

    return idef;
  }, [options.itemDefinition, mod]);

  useEffect(() => {
    idef.addListener("change", options.forId, options.forVersion, forceUpdate);
    idef.addListener("load", options.forId, options.forVersion, forceUpdate);
    if (idef.isInSearchMode()) {
      idef.addListener("search-change", options.forId, options.forVersion, forceUpdate);
    }
    idef.addListener("reload", options.forId, options.forVersion, forceUpdate);

    return () => {
      idef.removeListener("change", options.forId, options.forVersion, forceUpdate);
      idef.removeListener("load", options.forId, options.forVersion, forceUpdate);
      if (idef.isInSearchMode()) {
        idef.removeListener("search-change", options.forId, options.forVersion, forceUpdate);
      }
      idef.removeListener("reload", options.forId, options.forVersion, forceUpdate);
    }
  }, [idef, options.forId, options.forVersion]);

  const getValueFor = useCallback((idOrBase: string | IPropertyBasePropsWInclude) => {
    if (idOrBase === null || typeof idOrBase === "undefined") {
      return null;
    } else if (typeof idOrBase === "string") {
      const pDef = idef.getPropertyDefinitionFor(idOrBase, true);
      return pDef.getCurrentValue(options.forId || null, options.forVersion || null);
    } else {
      let actualId = idOrBase.id;
      if (idOrBase.searchVariant) {
        // for that we just get the prefix and add it
        actualId =
          PropertyDefinitionSearchInterfacesPrefixes[idOrBase.searchVariant.toUpperCase().replace("-", "_")] + idOrBase.id;
      }

      // now we need to check if this is a meta property such a created_at, edited_at, etc...
      const isMetaProperty = !!RESERVED_BASE_PROPERTIES_RQ[actualId];

      if (isMetaProperty) {
        if (actualId === "id") {
          return options.forId;
        } else if (actualId === "version") {
          return options.forVersion;
        } else {
          const internalValue = idef.getStateNoExternalChecking(options.forId || null, options.forVersion || null, true, [], {}, true);
          return (internalValue.rqOriginalFlattenedValue && internalValue.rqOriginalFlattenedValue[actualId]);
        }
      }

      const include = typeof idOrBase.include === "string" ? idef.getIncludeFor(idOrBase.include) : idOrBase.include;
      // and once we know that we can get the value, basically we
      // don't have a property definition if is a meta property, and we need to extract
      // it from the include if it's available
      const property = (
        include ?
          include.getSinkingPropertyFor(actualId) :
          (
            (idOrBase.policyType && idOrBase.policyName) ?
              idef
                .getPropertyDefinitionForPolicy(idOrBase.policyType, idOrBase.policyName, actualId) :
              idef
                .getPropertyDefinitionFor(actualId, true)
          )
      );

      return property.getCurrentValue(options.forId || null, options.forVersion || null);
    }
  }, [idef, options.forId, options.forVersion]) as <T>(pId: string | IPropertyBasePropsWInclude) => T;

  const getStateFor = useCallback((idOrBase: string | IPropertyBasePropsWInclude) => {
    if (idOrBase === null || typeof idOrBase === "undefined") {
      return null;
    } else if (typeof idOrBase === "string") {
      const pDef = idef.getPropertyDefinitionFor(idOrBase, true);
      return pDef.getStateNoExternalChecking(options.forId || null, options.forVersion || null, true);
    } else {
      let actualId = idOrBase.id;
      if (idOrBase.searchVariant) {
        // for that we just get the prefix and add it
        actualId =
          PropertyDefinitionSearchInterfacesPrefixes[idOrBase.searchVariant.toUpperCase().replace("-", "_")] + idOrBase.id;
      }

      const include = typeof idOrBase.include === "string" ? idef.getIncludeFor(idOrBase.include) : idOrBase.include;

      const property = (
        include ?
          include.getSinkingPropertyFor(actualId) :
          (
            (idOrBase.policyType && idOrBase.policyName) ?
              idef
                .getPropertyDefinitionForPolicy(idOrBase.policyType, idOrBase.policyName, actualId) :
              idef
                .getPropertyDefinitionFor(actualId, true)
          )
      );

      return property.getStateNoExternalChecking(options.forId || null, options.forVersion || null, true);
    }
  }, [idef, options.forId, options.forVersion]) as <T>(pId: string | IPropertyBasePropsWInclude) => IPropertyDefinitionState<T>;

  return {
    component,
    getValueFor,
    getStateFor,
  }
}