/**
 * Contains utilities for building a grapqhl client to interact
 * with the server, this is meant only for the javascript context
 * itself as it performs a lot of storing, checking and so on
 * @module
 */

import {
  STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  PREFIX_GET,
  PREFIX_SEARCH,
  PREFIX_DELETE,
  PREFIX_ADD,
  PREFIX_EDIT,
  PREFIX_GET_LIST,
  PREFIX_TRADITIONAL_SEARCH,
  IOrderByRuleType,
  ENDPOINT_ERRORS,
  UNSPECIFIED_OWNER,
  INCLUDE_PREFIX,
} from "../../constants";
import ItemDefinition, { IItemStateType } from "../../base/Root/Module/ItemDefinition";
import { IGQLValue, IGQLRequestFields, IGQLArgs, buildGqlQuery, gqlQuery, buildGqlMutation, IGQLEndpointValue, IGQLSearchRecord, GQLEnum, IGQLFile, ProgresserFn, GQLQuery } from "../../gql-querier";
import { deepMerge, requestFieldsAreContained } from "../../gql-util";
import CacheWorkerInstance from "./workers/cache";
import { EndpointErrorType } from "../../base/errors";
import { RemoteListener } from "./app/remote-listener";
import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { IElasticHighlightRecordInfo, PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { fileURLAbsoluter } from "../../util";
import { IConfigRawJSONDataType } from "../../config";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import equals from "deep-equal";
import type { ICacheMatchType, ICacheMetadataMatchType } from "./workers/cache/cache.worker.class";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { getConversionIds } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode";
import type { IPropertyCoreProps } from "../../client/components/property/base";

type cacheMetadataCheckFn = (value: PropertyDefinitionSupportedType | { [property: string]: PropertyDefinitionSupportedType }) => boolean;
type cacheMetadataComparisonFn = (oldValue: any, newValue: any) => boolean;

/**
 * Used to compare singular properties in the item
 */
export interface ICacheMetadataMismatchConditionRule {
  [propertyOrInclude: string]: cacheMetadataCheckFn;
}

/**
 * Represents a condition to use with item data
 * that is used to invalidate them
 */
export interface ICacheMetadataMismatchCondition {
  /**
   * This is only relevant for non-blocked and found items
   * that have been cached into the database, in this case
   * we can specify a per property rule for fetching new records
   */
  custom?: ICacheMetadataMismatchConditionRule;
  /**
   * The item is blocked, items that are blocked will match
   * this condition
   */
  isBlocked?: boolean;
  /**
   * The item is not found, it has either been deleted or
   * something has happened to it that the record was missing
   */
  isNotFound?: boolean;
  /**
   * Matches the condition by a simple metadata comparison
   * from the old metadata and the new metadata
   */
  metadataComparison?: cacheMetadataComparisonFn;
}

export interface ICacheMetadataMismatchAction {
  /**
   * The action to perform for this singular item
   * REFETCH will retrieve the record again from the server
   */
  action: "REFETCH" | "NONE";
  /**
   * Specifies whether the metadata itself should be rewritten
   * into the cache, ALWAYS is preferrable
   * 
   * IF_CONDITION_SUCCEEDS is only useful when it is set to REFETCH_RECORDS
   */
  rewrite: "IF_CONDITION_SUCCEEDS" | "ALWAYS" | "NEVER";
  /**
   * The condition to use when REFETCH is used
   */
  condition?: ICacheMetadataMismatchCondition;
}

/**
 * The search action to perform if a mismatch is detected
 */
export interface ISearchCacheMetadataMismatchAction {
  /**
   * The action to perform for this mismatch
   * REDO_SEARCH will simply redo all the search
   * REFETCH_RECORDS will refetch specific records based on the recordsRefetchCondition which should be provided
   */
  action: "REDO_SEARCH" | "REFETCH_RECORDS" | "NONE",
  /**
   * Specifies whether the metadata itself should be rewritten
   * into the cache, ALWAYS is preferrable
   * 
   * IF_CONDITION_SUCCEEDS is only useful when it is set to REFETCH_RECORDS
   */
  rewrite: "IF_CONDITION_SUCCEEDS" | "ALWAYS" | "NEVER",
  /**
   * The condition to use when REFETCH_RECORDS is used
   */
  recordsRefetchCondition?: ICacheMetadataMismatchCondition,
}

/**
 * A function to use for the mismatch action
 */
export type CacheMetadataMismatchActionFn = (oldMetadata: any, newMetadata: any) => ICacheMetadataMismatchAction;

/**
 * A function to use for the mismatch action
 */
export type SearchCacheMetadataMismatchActionFn = (oldMetadata: any, newMetadata: any) => ISearchCacheMetadataMismatchAction;

export function checkMismatchCondition(
  condition: ICacheMetadataMismatchCondition,
  dbValue: ICacheMatchType,
  oldMetadata: any,
  newMetadata: any,
) {
  if (Object.keys(condition).length === 0) {
    return true;
  }

  const isNotFound = !dbValue.value;
  const isBlocked = !isNotFound && !dbValue.value.DATA;

  if (isNotFound && condition.isNotFound) {
    return true;
  }

  if (isBlocked && condition.isBlocked) {
    return true;
  }

  if (condition.metadataComparison && condition.metadataComparison(oldMetadata, newMetadata)) {
    return true;
  }

  if (!isNotFound && !isBlocked && condition.custom) {
    return Object.keys(condition.custom).some((propertyOrInclude: string) => {
      let baseValue: any;
      if (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.includes(propertyOrInclude)) {
        baseValue = dbValue.value[propertyOrInclude];
      } else if (!isBlocked) {
        baseValue = dbValue.value.DATA[propertyOrInclude];
      }

      return condition.custom[propertyOrInclude](baseValue);
    });
  } else {
    return false;
  }
}

export interface IPropertyOverride {
  id: string;
  value: PropertyDefinitionSupportedType;
}

export interface IIncludeOverride {
  id: string;
  exclusionState?: "INCLUDED" | "EXCLUDED" | "ANY",
  overrides?: IPropertyOverride[];
}

export function getPropertyListForSearchMode(properties: Array<string | IPropertyCoreProps>, standardCounterpart: ItemDefinition) {
  if (!properties) {
    return [];
  }
  
  let result: string[] = [];
  properties.forEach((property) => {

    const propertyId = typeof property === "string" ? property : property.id;
    const searchVariantSpecified = typeof property !== "string" ? property.searchVariant : null;

    if (
      propertyId === "search" ||
      propertyId === "created_by" ||
      propertyId === "since" ||
      propertyId === "until" ||
      (!searchVariantSpecified && standardCounterpart.isPropertyInSearchModeOnly(propertyId))
    ) {
      result.push(propertyId);
      return;
    }

    const standardProperty = standardCounterpart.getPropertyDefinitionFor(propertyId, true);

    if (!searchVariantSpecified) {
      result = result.concat(getConversionIds(standardProperty.rawData, true));
    } else {
      const id = PropertyDefinitionSearchInterfacesPrefixes[searchVariantSpecified.toUpperCase()] + propertyId;
      result.push(id);
    }
  });
  return result;
}

export function getPropertyListDefault(properties: Array<string | IPropertyCoreProps>) {
  if (!properties) {
    return [];
  }

  let result: string[] = [];
  properties.forEach((property) => {

    const propertyId = typeof property === "string" ? property : property.id;
    const searchVariantSpecified = typeof property !== "string" ? property.searchVariant : null;

    if (!searchVariantSpecified) {
      result.push(propertyId);
    } else {
      const id = PropertyDefinitionSearchInterfacesPrefixes[searchVariantSpecified.toUpperCase()] + propertyId;
      result.push(id);
    }
  });
  return result;
}

/**
 * Provides the fields and args for an item definition in order
 * to create a query
 * @param options.includeArgs whether to include the args at all
 * @param options.includeFields whether to include fields at all
 * @param options.properties what properties to include in fields
 * @param options.includes what includes to include in the fields
 * @param options.onlyIncludePropertiesForArgs what properties to include in args
 * @param options.onlyIncludeIncludesForArgs what includes to include in args
 * @param appliedOwner the owner that owns this item
 * @param userRole the role of the user
 * @param userId the id of the user
 * @param itemDefinitionInstance the item definition
 * @param forId the slot id if any
 * @param forVersion the version if any
 */
export function getFieldsAndArgs(
  options: {
    includeArgs: boolean,
    includeFields: boolean,
    properties?: string[],
    differingPropertiesOnlyForArgs?: boolean;
    differingIncludesOnlyForArgs?: boolean;
    includes?: {
      [include: string]: string[],
    },
    propertiesForArgs?: string[],
    includesForArgs?: {
      [include: string]: string[],
    },
    policiesForArgs?: [string, string, string][],
    itemDefinitionInstance: ItemDefinition;
    forId: string;
    forVersion: string;

    /**
     * When using unite fields with applied value where
     * you are expected to be submitting for another target
     * that is not this self, for example when copying id1 into id2
     * the forId will be id1 and the submitForId will be id2
     * 
     * otherwise it will use the same
     */
    submitForId?: string;
    submitForVersion?: string;
    uniteFieldsWithAppliedValue?: boolean;
    propertyOverrides?: IPropertyOverride[];
    includeOverrides?: IIncludeOverride[];
    stateOverride?: IItemStateType;
    block?: {
      status: boolean;
      reason: string;
      until: string;
    }
  },
) {
  // so the requested fields, at base
  // because a lot of these requests want to ensure the side
  // effects of the applied values we want to ensure that
  // the queried fields include the applied values
  let requestFields: any = {
    DATA: {},
  };

  // paths for the found file fileds during the action in the arguments
  // that are to be passed
  let argumentsFoundFilePaths: any = [];

  // the reason for this some of these values are meant to be applied, when a value is applied
  // in an item definition it will erase anything in it, as merging won't work when timestamps,
  // don't match because during an edit event there might be side effects, this will ensure
  // values remain updated with whatever is used even in the cache
  if (options.uniteFieldsWithAppliedValue) {
    const appliedValue = options.itemDefinitionInstance.getGQLAppliedValue(
      typeof options.submitForId !== "undefined" ? options.submitForId : options.forId,
      typeof options.submitForVersion !== "undefined" ? options.submitForVersion : options.forVersion
    );
    if (appliedValue && appliedValue.requestFields) {
      // Horrible hardest bug ever here, fixed by this, we need to make a clone
      // because we modify this variable in place, where appliedValue is never supposed
      // to be modified
      requestFields = {
        ...appliedValue.requestFields,
        DATA: {
          ...appliedValue.requestFields.DATA,
        }
      };
    }
  }
  // and these would be the arguments for the graphql query
  const argumentsForQuery: any = {};

  if (options.block && typeof options.block.status === "boolean") {
    argumentsForQuery.blocked = options.block.status;
    if (options.block.status === true && options.block.reason) {
      argumentsForQuery.blocked_reason = options.block.reason;
    }
    if (options.block.status === true && options.block.until) {
      argumentsForQuery.blocked_until = options.block.until;
    }
  }

  // now we go for the standard fields, and we add all of them
  STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
    requestFields.DATA[p] = {};
  });
  // we add the external ones as well
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
    requestFields[p] = {};
  });

  let nothingToUpdate = true;

  if (options.includeFields) {
    if (options.properties && options.properties.length) {
      options.properties.forEach((pId) => {
        const pd = options.itemDefinitionInstance.getPropertyDefinitionFor(pId, true);
        if (!pd.isRetrievalDisabled()) {
          // we add it to the fields we want to add
          // because it's a property it goes in data
          requestFields.DATA[pd.getId()] = pd.getRequestFields();
        }
      });
    }
    if (options.includes) {
      Object.keys(options.includes).forEach((iId) => {
        const include = options.itemDefinitionInstance.getIncludeFor(iId);
        // and now we get the qualified identifier that grapqhl expects
        const qualifiedId = include.getQualifiedIdentifier();
        requestFields.DATA[include.getQualifiedExclusionStateIdentifier()] = {};
        requestFields.DATA[qualifiedId] = {};

        const requestedSinkingProperties = options.includes[iId];

        // we need the sinking properties
        // as only the sinking properties manage
        requestedSinkingProperties.forEach((spId) => {
          const sp = include.getSinkingPropertyFor(spId);
          requestFields.DATA[qualifiedId][include.getPrefixedQualifiedIdentifier() + sp.getId()] = sp.getRequestFields();
        });

        if (Object.keys(requestFields.DATA[qualifiedId]).length === 0) {
          delete requestFields.DATA[qualifiedId];
        }
      });
    }
  }
  if (options.includeArgs) {
    if (options.propertiesForArgs && options.propertiesForArgs.length) {
      options.propertiesForArgs.forEach((pId) => {
        const pd = options.itemDefinitionInstance.getPropertyDefinitionFor(pId, true);

        let currentOverride = options.propertyOverrides && options.propertyOverrides.find((o) => o.id === pId);
        if (!currentOverride && options.stateOverride && options.stateOverride.properties) {
          const value = options.stateOverride.properties.find((p) => p.propertyId === pId);
          if (value) {
            currentOverride = {
              id: pId,
              value: typeof value.value === "undefined" ? value.stateValue : value.value,
            }
          }
        }

        // javascript being a mess loving to not fail when it should fail
        // so we have to make it fail by force
        if (currentOverride && typeof currentOverride.value === "undefined") {
          throw new Error("Invalid override value at " + currentOverride.id + " set to undefined");
        }

        const currentValue = currentOverride ? currentOverride.value : pd.getCurrentValue(options.forId || null, options.forVersion || null);
        const pdDescr = pd.getPropertyDefinitionDescription();
        if (options.differingPropertiesOnlyForArgs) {
          const appliedGQLValue = pd.getAppliedValue(options.forId || null, options.forVersion || null);
          const isEqual = pdDescr.localEqual({
            itemDefinition: options.itemDefinitionInstance,
            property: pd,
            include: null,
            a: appliedGQLValue,
            b: currentValue,
            id: pd.getId(),
            prefix: "",
          });
          if (isEqual) {
            return;
          }
        }

        nothingToUpdate = false;
        argumentsForQuery[pd.getId()] = currentValue;

        if (pdDescr.gqlAddFileToFields) {
          argumentsFoundFilePaths.push([pd.getId()]);
        }
      });
    }
    if (options.includesForArgs) {
      Object.keys(options.includesForArgs).forEach((iId) => {
        const include = options.itemDefinitionInstance.getIncludeFor(iId);

        let currentOverride = options.includeOverrides && options.includeOverrides.find((o) => o.id === iId);
        if (!currentOverride && options.stateOverride && options.stateOverride.includes) {
          const value = options.stateOverride.includes.find((p) => p.includeId === iId);
          if (value) {
            currentOverride = {
              id: iId,
              exclusionState: value.exclusionState,
              overrides: value.itemState.properties.map((p) => (
                {
                  id: p.propertyId,
                  value: typeof p.value === "undefined" ? p.stateValue : p.value,
                }
              ))
            }
          }
        }

        // and now we get the qualified identifier that grapqhl expects
        const qualifiedId = include.getQualifiedIdentifier();
        const qualifiedExlcusionStateId = include.getQualifiedExclusionStateIdentifier();
        const exclusionState = currentOverride && currentOverride.exclusionState ? currentOverride.exclusionState : include.getExclusionState(options.forId || null, options.forVersion || null);

        if (options.differingIncludesOnlyForArgs) {
          const appliedExclusion = include.getAppliedExclusionState(options.forId || null, options.forVersion || null);
          if (appliedExclusion !== exclusionState) {
            // we set the exclusion state we expect, it might be a ternary as well
            // like in search mode
            argumentsForQuery[
              qualifiedExlcusionStateId
            ] = exclusionState;
          }
        } else {
          // we set the exclusion state we expect, it might be a ternary as well
          // like in search mode
          argumentsForQuery[
            qualifiedExlcusionStateId
          ] = exclusionState;
        }

        if (exclusionState === IncludeExclusionState.EXCLUDED) {
          return;
        }

        // we add it to the data, and we add it to the arguments
        nothingToUpdate = false;
        argumentsForQuery[qualifiedId] = {};

        const requiredSinkingProperties = options.includesForArgs[iId];

        // we need the sinking properties
        // as only the sinking properties manage
        requiredSinkingProperties.forEach((spId) => {
          const sp = include.getSinkingPropertyFor(spId);

          const currentPropertyOverride = currentOverride && currentOverride.overrides && currentOverride.overrides.find((o) => o.id === sp.getId());

          // javascript being a mess loving to not fail when it should fail
          // so we have to make it fail by force
          if (currentPropertyOverride && typeof currentPropertyOverride.value === "undefined") {
            throw new Error("Invalid override value at " + currentPropertyOverride.id + " set to undefined");
          }

          const currentValue = currentPropertyOverride ? currentPropertyOverride.value : sp.getCurrentValue(
            options.forId || null, options.forVersion || null);
          const spDescr = sp.getPropertyDefinitionDescription();
          if (options.differingIncludesOnlyForArgs) {
            const appliedGQLValue = sp.getAppliedValue(options.forId || null, options.forVersion || null);
            const isEqual = spDescr.localEqual({
              itemDefinition: options.itemDefinitionInstance,
              property: sp,
              include,
              a: appliedGQLValue,
              b: currentValue,
              id: sp.getId(),
              prefix: include.getPrefixedQualifiedIdentifier(),
            });
            if (isEqual) {
              return;
            }
          }

          argumentsForQuery[qualifiedId][sp.getId()] = currentValue;

          if (spDescr.gqlAddFileToFields) {
            argumentsFoundFilePaths.push([qualifiedId, sp.getId()]);
          }
        });

        if (Object.keys(argumentsForQuery[qualifiedId]).length === 0) {
          delete argumentsForQuery[qualifiedId];
        }
      });
    }
    if (options.policiesForArgs && options.propertiesForArgs.length) {
      options.policiesForArgs.forEach((policyPath) => {
        const policy = options.itemDefinitionInstance.getPropertyDefinitionForPolicy(...policyPath);
        nothingToUpdate = false;
        argumentsForQuery[options.itemDefinitionInstance.getQualifiedPolicyIdentifier(...policyPath)] =
          policy.getCurrentValue(options.forId || null, options.forVersion || null);
      });
    }
  }

  return { requestFields, argumentsForQuery, argumentsFoundFilePaths, nothingToUpdate };
}

/**
 * Given arguments that need their files reprocessed and fetched in order
 * to specify a blob this function will do such job
 * @param argumentsForQuery 
 * @param argumentsFoundFilePaths 
 * @param originalContainerIdOfContent 
 * @param itemDefinitionInstance 
 * @param config 
 * @param forId 
 * @param forVersion 
 */
export async function reprocessQueryArgumentsForFiles(
  argumentsForQuery: any,
  argumentsFoundFilePaths: Array<[string, string] | [string]>,
  originalContainerIdOfContent: string,
  itemDefinitionInstance: ItemDefinition,
  config: IConfigRawJSONDataType,
  forId: string,
  forVersion: string,
) {
  // now we can start refetching all those values to get them
  // back as files
  await Promise.all(
    // so we map in those file paths we found
    argumentsFoundFilePaths.map(async (path: [string, string] | [string]) => {
      // these are for the ones with includes
      if (path.length === 2) {
        // we get the include
        const include = itemDefinitionInstance.getIncludeFor(path[0].replace(INCLUDE_PREFIX, ""));
        // and reprocess the value
        argumentsForQuery[path[0]][path[1]] = await reprocessFileArgument(argumentsForQuery[path[0]][path[1]], {
          config: config,
          containerId: originalContainerIdOfContent,
          forId: forId || null,
          forVersion: forVersion || null,
          include,
          itemDefinition: itemDefinitionInstance,
          property: include.getSinkingPropertyFor(path[1]),
        });
      } else {
        // and for standard raw properties
        argumentsForQuery[path[0]] = await reprocessFileArgument(argumentsForQuery[path[0]], {
          config: config,
          containerId: originalContainerIdOfContent,
          forId: forId || null,
          forVersion: forVersion || null,
          include: null,
          itemDefinition: itemDefinitionInstance,
          property: itemDefinitionInstance.getPropertyDefinitionFor(path[0], true),
        });
      }
    })
  );
}

/**
 * When creating a brand new item using the add action but somehow
 * we are using files and values from another item and submitting that
 * into the new ones, the new files will not have a source because they belong
 * to the old file, this will allow us to ensure that everything has a source
 * regarding these files
 * 
 * @param files the file in question either an array or a file itself
 * @param options options for restoring the source
 */
export async function reprocessFileArgument(
  files: IGQLFile | IGQLFile[],
  options: {
    config: IConfigRawJSONDataType;
    itemDefinition: ItemDefinition;
    include: Include;
    property: PropertyDefinition;
    forId: string;
    forVersion: string;
    containerId: string;
  }
): Promise<IGQLFile | IGQLFile[]> {
  // for array we recurse as an array
  if (Array.isArray(files)) {
    return await Promise.all((files as any).map((f: any) => reprocessFileArgument(f, options)));
  }

  // if the value is null or undefined
  if (!files) {
    return files;
  }

  // if we have a source, it's good as it is
  if (files.src) {
    return files;
  }

  // otherwise we have to recover such a source
  const domain = process.env.NODE_ENV === "production" ? options.config.productionHostname : options.config.developmentHostname;
  const absolutedFile = fileURLAbsoluter(
    domain,
    options.config.containersHostnamePrefixes,
    files,
    options.itemDefinition,
    options.forId,
    options.forVersion,
    options.containerId,
    options.include,
    options.property,
    false,
  );

  // and for that we get the absolute url of the file
  const url = absolutedFile.url;

  // and fetch it
  const fileData = await fetch(url);
  const blob = await fileData.blob();

  // we are going to use a trick, we could use the File constructor
  // but there were a lot of complains regarding the constructor on stackoverflow
  // while as a matter of fact the src allows for blobs so
  (blob as any).name = files.name;

  // now we have returned the source of the file
  // so it is ready to be added
  return {
    ...files,
    src: blob,
  };
}

function deleteNulls<T>(
  args: T
): T {
  const newArgs: any = {};
  Object.keys(args).forEach((argKey) => {
    const value = args[argKey];
    if (value !== null) {
      if (typeof value === "object" && !Array.isArray(value)) {
        newArgs[argKey] = deleteNulls(value);
      } else {
        newArgs[argKey] = value;
      }

    }
  });

  return newArgs;
}

/**
 * Provies the querying args for a given list of args
 * @param args the list of args
 * @param token the token we are using
 * @param language the language
 * @param id the id we are requesting for
 * @param version the version we are requesting for (optional)
 */
function getQueryArgsFor(
  args: IGQLArgs,
  token: string,
  language: string,
  id?: string,
  version?: string,
) {
  // basic args, the base args usually are for policies and whatnot
  const newArgs: IGQLArgs = {
    token: token,
    language: language.split("-")[0],
    ...args,
  };

  if (id) {
    newArgs.id = id;
    if (version) {
      newArgs.version = version;
    } else {
      newArgs.version = null;
    }
  }

  return newArgs;
}

/**
 * Stores and combines a value
 * @param itemDefinition the item definition we are working in
 * @param id the id
 * @param version the version or null
 * @param value the value, unflattened we are working with
 * @param fields the fields, unflattened we are working with
 * @param cacheStore whether we should cache store the output
 */
async function storeAndCombineStorageValuesFor(
  itemDefinition: ItemDefinition,
  id: string,
  version: string,
  value: IGQLValue,
  fields: IGQLRequestFields,
  cacheStore: boolean,
) {
  let mergedValue: IGQLValue = value;
  let mergedFields: IGQLRequestFields = fields;
  let cached: boolean = false;

  // The combining only happens if the value is found
  if (value) {
    // first we check if we have a value in memory
    // cache and we merge it with what we got
    // note how the first argument takes priority
    // and the second will be the one overriden
    // if there's a collision the last_modified attribute
    // always gets downloaded, and with this we ensure that
    // the data is cacheable of the same modification date we
    // don't want data of different versions to be colliding
    const appliedGQLValue = itemDefinition.getGQLAppliedValue(
      id || null, version || null,
    );
    if (
      appliedGQLValue &&
      appliedGQLValue.rawValue &&
      appliedGQLValue.rawValue.last_modified === value.last_modified
    ) {
      mergedValue = deepMerge(
        mergedValue,
        appliedGQLValue.rawValue,
      );
      mergedFields = deepMerge(
        mergedFields,
        appliedGQLValue.requestFields,
      );
    }
  }

  const qualifiedName = itemDefinition.getQualifiedPathName();

  if (cacheStore && CacheWorkerInstance.isSupportedAsWorker) {
    // in the case of delete, we just cache nulls also
    // the same applies in the case of get and a not found
    // was the output
    if (!value) {
      // we are here guaranteed that if we have retrieved something from
      // the server in an unique value way it is not a module and it's not
      // a search mode
      cached = await CacheWorkerInstance.instance.setCachedValue(
        PREFIX_GET + qualifiedName,
        id,
        version || null,
        null,
        null,
      );
    } else {
      cached = await CacheWorkerInstance.instance.mergeCachedValue(
        PREFIX_GET + qualifiedName, id, version, value, mergedFields);
    }
  }

  return {
    value: mergedValue,
    fields: mergedFields,
    cached,
  }
}

/**
 * Runs a get query for a given item definition and its args
 * @param arg the arg to use
 * @param arg.args the args to request the server with, normaly just {}
 * @param arg.fields the fields we are requesting
 * @param arg.returnMemoryCachedValues whether to return values that are cached
 * in memory
 * @param arg.returnWorkerCachedValues whether to return values that are in the cache worker
 * @param arg.returnWorkerCachedValuesIfNoInternet optimally it will request the internet but if it
 * can't connect it will request the worker instead
 * @param arg.itemDefinition the item definition we are requesting for
 * @param arg.id the id we are requesting for
 * @param arg.version the version we are requesting for
 * @param arg.language the language we are using for it, used for dictionary purposes
 * @param arg.token the token we are using
 * @param arg.cacheStore whether to store the results in the cache
 * @returns a promise with a bunch of information
 */
export async function runGetQueryFor(
  arg: {
    args: IGQLArgs,
    fields: IGQLRequestFields,
    returnMemoryCachedValues: boolean,
    returnWorkerCachedValues: boolean,
    returnWorkerCachedValuesIfNoInternet?: boolean;
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
    language: string,
    token: string,
    cacheStore: boolean,
    cacheStoreMetadata?: any,
    cacheStoreMetadataMismatchAction?: CacheMetadataMismatchActionFn | ICacheMetadataMismatchAction,
    waitAndMerge?: boolean,
    progresser?: ProgresserFn,
    currentKnownMetadata?: ICacheMetadataMatchType,
  },
): Promise<{
  error: EndpointErrorType,
  value: IGQLValue,
  memoryCached: boolean,
  cached: boolean,
  getQueryFields: IGQLRequestFields,
}> {
  // now we get the currently applied value in memory
  const appliedGQLValue = arg.itemDefinition.getGQLAppliedValue(
    arg.id || null, arg.version || null,
  );
  if (arg.returnMemoryCachedValues) {
    // let's check if the memory cached and the requested value match
    if (
      appliedGQLValue &&
      requestFieldsAreContained(arg.fields, appliedGQLValue.requestFields)
    ) {
      return {
        error: null,
        value: appliedGQLValue.rawValue,
        memoryCached: true,
        cached: false,
        getQueryFields: appliedGQLValue.requestFields,
      };
    }
  }

  const queryName = PREFIX_GET + arg.itemDefinition.getQualifiedPathName();

  // otherwise now let's check for the worker
  if (
    CacheWorkerInstance.isSupportedAsWorker &&
    arg.returnWorkerCachedValues
  ) {

    let currentCacheMetadata: any = null;
    let shouldProcceedWithCache: boolean = true;
    let shouldDestroyValue: boolean = false;
    let metadataWasMismatch: boolean = false;
    let shouldRewriteMetadata: boolean = false;
    let ruleApplies: boolean = false;

    const workerCachedValue: ICacheMatchType = await CacheWorkerInstance.instance.getCachedValue(
      queryName,
      arg.id,
      arg.version || null,
      arg.fields,
    );
    const expectedCacheMetadata = arg.cacheStoreMetadata || null;

    if (arg.cacheStoreMetadataMismatchAction && workerCachedValue) {
      const value = arg.currentKnownMetadata || await CacheWorkerInstance.instance.readMetadata(
        queryName,
        arg.id,
        arg.version || null,
      );
      if (value && value.value) {
        currentCacheMetadata = value.value;
      }

      metadataWasMismatch = !equals(expectedCacheMetadata, currentCacheMetadata, { strict: true });

      if (metadataWasMismatch) {
        const actionToPerform: ICacheMetadataMismatchAction = typeof arg.cacheStoreMetadataMismatchAction === "function" ?
          arg.cacheStoreMetadataMismatchAction(currentCacheMetadata, expectedCacheMetadata) :
          arg.cacheStoreMetadataMismatchAction;

        ruleApplies = !actionToPerform.condition;
        if (!ruleApplies) {
          if (workerCachedValue) {
            ruleApplies = checkMismatchCondition(
              actionToPerform.condition,
              workerCachedValue,
              currentCacheMetadata,
              expectedCacheMetadata,
            );
          }
        }

        if (actionToPerform.rewrite === "ALWAYS") {
          shouldRewriteMetadata = true;
        }

        if (ruleApplies) {
          if (actionToPerform.rewrite === "IF_CONDITION_SUCCEEDS") {
            shouldRewriteMetadata = true;
          }
          if (actionToPerform.action === "REFETCH") {
            // we will be refetching so we don't proceed with the cache
            // instead we destroy the current value
            shouldProcceedWithCache = false;
            shouldDestroyValue = true;
          }
        }
      }
    }

    if (shouldDestroyValue) {
      await CacheWorkerInstance.instance.deleteCachedValue(
        queryName,
        arg.id,
        arg.version || null,
      );
    }

    if (shouldRewriteMetadata) {
      await CacheWorkerInstance.instance.writeMetadata(
        queryName,
        arg.id,
        arg.version || null,
        expectedCacheMetadata,
      );
    }

    // if we have a GET request and we are allowed to return from the wroker cache and we actually
    // found something in our cache, return that
    if (workerCachedValue && shouldProcceedWithCache) {
      return {
        error: null,
        value: workerCachedValue.value,
        memoryCached: false,
        cached: true,
        getQueryFields: workerCachedValue.fields,
      };
    }
  }

  const args = getQueryArgsFor(
    arg.args,
    arg.token,
    arg.language,
    arg.id,
    arg.version,
  );

  const query = buildGqlQuery({
    name: queryName,
    args,
    fields: arg.fields,
  })

  // now we get the gql value using the gql query function
  // and this function will always run using the network
  const gqlValue = await gqlQuery(query, {
    merge: arg.waitAndMerge,
    progresser: arg.progresser,
  });

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  const value = (gqlValue.data && gqlValue.data[queryName]) || null;

  if (!error) {
    const mergedResults = await storeAndCombineStorageValuesFor(
      arg.itemDefinition,
      arg.id,
      arg.version || null,
      value,
      arg.fields,
      arg.cacheStore,
    );
    return {
      error,
      value: mergedResults.value,
      memoryCached: false,
      cached: mergedResults.cached,
      getQueryFields: mergedResults.fields,
    }
  } else if (error.code === ENDPOINT_ERRORS.CANT_CONNECT) {
    // otherwise now let's check for the worker
    if (
      CacheWorkerInstance.isSupportedAsWorker &&
      arg.returnWorkerCachedValuesIfNoInternet
    ) {
      // we ask the worker for the value
      const workerCachedValue =
        await CacheWorkerInstance.instance.getCachedValue(
          queryName, arg.id, arg.version || null, arg.fields,
        );
      // if we have a GET request and we are allowed to return from the wroker cache and we actually
      // found something in our cache, return that
      if (workerCachedValue) {
        return {
          error: null,
          value: workerCachedValue.value,
          memoryCached: false,
          cached: true,
          getQueryFields: workerCachedValue.fields,
        };
      }
    }
  }

  return {
    error,
    value: null,
    memoryCached: false,
    cached: false,
    getQueryFields: null,
  }
}

/**
 * 
 * @param arg the information for the delete query
 * @param arg.args the args for the delete query, might contain
 * policy information
 * @param arg.itemDefinition the item definition we want to run a delete query for
 * @param arg.id the id we want to delete for
 * @param arg.version the version that we are deleting for (or null)
 * @param arg.token the token to use
 * @param arg.language the language to use, for dictionary purposes
 * @param arg.listenerUUID the listener uuid to send with
 * @param arg.cacheStore whether to cache store the deleted information
 * @returns a promise with an error on whether it succeed or not
 */
export async function runDeleteQueryFor(
  arg: {
    args: IGQLArgs,
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
    token: string,
    language: string,
    listenerUUID: string,
    cacheStore: boolean,
    waitAndMerge?: boolean,
    progresser?: ProgresserFn,
  },
): Promise<{
  error: EndpointErrorType,
}> {
  // the query name for the delete
  const queryName = PREFIX_DELETE + arg.itemDefinition.getQualifiedPathName();
  const args = getQueryArgsFor(
    arg.args,
    arg.token,
    arg.language,
    arg.id,
    arg.version
  );
  args.listener_uuid = arg.listenerUUID;

  // build the mutation
  const query = buildGqlMutation({
    name: queryName,
    args,
    fields: {
      id: {},
    },
  })

  // now we get the gql value using the gql query function
  // and this function will always run using the network
  const gqlValue = await gqlQuery(query, {
    merge: arg.waitAndMerge,
    progresser: arg.progresser,
  });

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  if (!error) {
    storeAndCombineStorageValuesFor(
      arg.itemDefinition,
      arg.id,
      arg.version || null,
      null,
      null,
      arg.cacheStore,
    );
  }

  return {
    error,
  }
}

export function getAddQueryFor(
  arg: {
    args: IGQLArgs,
    fields: IGQLRequestFields,
    itemDefinition: ItemDefinition,
    token: string,
    language: string,
    listenerUUID: string,
    cacheStore: boolean,
    forId: string,
    forVersion: string,
    containerId: string,
    waitAndMerge?: boolean,
  },
): GQLQuery {
  const queryName = PREFIX_ADD + arg.itemDefinition.getQualifiedPathName();
  const args = getQueryArgsFor(
    arg.args,
    arg.token,
    arg.language,
  );
  args.listener_uuid = arg.listenerUUID;
  if (arg.forId) {
    args.for_id = arg.forId;
  }
  if (arg.forVersion) {
    args.version = arg.forVersion;
  }

  args.container_id = arg.containerId;

  const query = buildGqlMutation({
    name: queryName,
    args,
    // last modified is necessary for cache manipulation
    // so we add it here if it was not added, normally it gets
    // added automatically using functions, but that might not be the case
    fields: !arg.fields.last_modified ? {
      ...arg.fields,
      last_modified: {},
    } : arg.fields,
  });

  return query;
}

function preserveSingleBlobFileAt(
  unpreserved: IGQLFile,
  sources: IGQLFile[],
) {
  // somehow already has a source
  if (unpreserved.src) {
    return;
  }

  // a relative from the source
  const fromSource = sources.find((f) => f.id === unpreserved.id);

  // the source has a source
  // we are now preserving such value
  if (fromSource && fromSource.src) {
    unpreserved.src = fromSource.src;
  }
}

function preserveBlobFilesAt(
  include: Include,
  property: PropertyDefinition,
  args: IGQLArgs,
  unpreservedValue: IGQLValue,
) {
  const idLocation = include ? include.getId() : property.getId();
  const idLocationLevel2 = include ? property.getId() : null;
  if (
    property.getType() !== "file" &&
    property.getType() !== "files"
  ) {
    return;
  }

  if (!args || !args[idLocation] || !unpreservedValue || !unpreservedValue.DATA || !unpreservedValue.DATA[idLocation]) {
    return;
  }

  if (!idLocationLevel2 ? false : (!args[idLocation][idLocationLevel2] || !unpreservedValue[idLocation][idLocationLevel2])) {
    return;
  }

  let propertyValue = args[idLocation];
  let unpreservedPropertyValue = unpreservedValue.DATA[idLocation];
  if (idLocationLevel2) {
    propertyValue = propertyValue[idLocationLevel2];
    unpreservedPropertyValue = unpreservedPropertyValue[idLocationLevel2];
  }

  if (Array.isArray(propertyValue)) {
    unpreservedPropertyValue.forEach((v: any) => preserveSingleBlobFileAt(v, propertyValue as any));
  } else {
    preserveSingleBlobFileAt(unpreservedPropertyValue, [propertyValue as any])
  }
}

/**
 * This function is used to restore blobs and files that were
 * pushed in arguments but then were replaced by a given url and location
 * by the server
 * 
 * @param idef 
 * @param args 
 * @param unpreservedValue 
 */
function preserveBlobFilesInValue(
  idef: ItemDefinition,
  args: IGQLArgs,
  unpreservedValue: IGQLValue,
) {
  idef.getAllPropertyDefinitionsAndExtensions().forEach(async (p) => {
    preserveBlobFilesAt(null, p, args, unpreservedValue);
  })

  idef.getAllIncludes().forEach(async (i) => {
    i.getSinkingProperties().forEach(async (sp) => {
      preserveBlobFilesAt(i, sp, args, unpreservedValue);
    });
  });
}

/**
 * Runs an add query for a given item definition
 * @param arg the arg information
 * @param arg.args the graphql args for the add query that contains the information
 * for the stuff we want to add, contains the values, as well as the policies
 * @param arg.fields the fields we want to retrieve as a result of our addition
 * @param arg.itemDefinition the item definition we are adding for
 * @param arg.token the token we are using for the addition process
 * @param arg.language the langauge to use for dictionary purposes
 * @param arg.listenerUUID the listener uuid to inform for changes
 * @param arg.cacheStore whether to store the results of the addition process as a get query
 * @param arg.forId a for id is used along forVersion to create a new version for the given id
 * @param arg.forVersion a for version is used to start versioning the query element
 * @param arg.containerId the container id to use for storage, should be calculated by the client
 * as long as it's valid the server comply; the container id should depend on the location of
 * the user
 * @returns a promise with an error, the fields that can be used to retrieve the same value in a get
 * query, and the value that was retrieved
 */
export async function runAddQueryFor(
  arg: {
    args: IGQLArgs,
    fields: IGQLRequestFields,
    itemDefinition: ItemDefinition,
    token: string,
    language: string,
    listenerUUID: string,
    cacheStore: boolean,
    forId: string,
    forVersion: string,
    containerId: string,
    waitAndMerge?: boolean,
    progresser?: ProgresserFn,
  },
  options: IRunQueryOptions,
): Promise<{
  error: EndpointErrorType,
  value: IGQLValue,
  getQueryFields: IGQLRequestFields,
}> {
  const query = getAddQueryFor(arg);
  const queryName = query.getQueryByIndex(0).name;

  // now we get the gql value using the gql query function
  // and this function will always run using the network
  const gqlValue = await gqlQuery(query, {
    merge: arg.waitAndMerge,
    progresser: arg.progresser,
  });

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  const value = (gqlValue.data && gqlValue.data[queryName]) || null;
  preserveBlobFilesInValue(arg.itemDefinition, arg.args, value);

  if (!error) {
    const mergedResults = await storeAndCombineStorageValuesFor(
      arg.itemDefinition,
      value.id as string,
      (value.version as string) || null,
      value,
      arg.fields,
      arg.cacheStore,
    );

    return {
      error,
      value: mergedResults.value,
      getQueryFields: mergedResults.fields,
    }
  }

  return {
    error,
    value: null,
    getQueryFields: null,
  }
}

export function getEditQueryFor(
  arg: {
    args: IGQLArgs,
    fields: IGQLRequestFields,
    itemDefinition: ItemDefinition,
    token: string,
    language: string,
    id: string,
    version: string,
    listenerUUID: string,
  },
) {
  // so we do this
  const queryName = PREFIX_EDIT + arg.itemDefinition.getQualifiedPathName();
  const args = getQueryArgsFor(
    arg.args,
    arg.token,
    arg.language,
    arg.id,
    arg.version,
  );
  args.listener_uuid = arg.listenerUUID;

  const query = buildGqlMutation({
    name: queryName,
    args,
    // last modified is necessary for cache manipulation
    // so we add it here if it was not added, normally it gets
    // added automatically using functions, but that might not be the case
    fields: !arg.fields.last_modified ? {
      ...arg.fields,
      last_modified: {},
    } : arg.fields,
  });

  return query;
}

/**
 * Runs an edit query for a given item definition
 * @param arg the arg with the get query information
 * @param arg.args the arg to use the edition for, these contain the new property values
 * as well as any policies that are deemed necessary
 * @param arg.fields the fields to request from the edit query
 * @param arg.itemDefinition the item definition we are editing
 * @param arg.token the token for validation
 * @param arg.langauge the language used, for dictionary purposes
 * @param arg.id the id we are editing
 * @param arg.version the version we are editing, or null
 * @param arg.listenerUUID the listener uuid we are using
 * @param arg.cacheStore whether to store the result of this edition in our cache
 */
export async function runEditQueryFor(
  arg: {
    args: IGQLArgs,
    fields: IGQLRequestFields,
    itemDefinition: ItemDefinition,
    token: string,
    language: string,
    id: string,
    version: string,
    listenerUUID: string,
    cacheStore: boolean,
    waitAndMerge?: boolean,
    progresser?: ProgresserFn,
  },
): Promise<{
  error: EndpointErrorType,
  value: IGQLValue,
  getQueryFields: IGQLRequestFields,
}> {
  const query = getEditQueryFor(arg);
  const queryName = query.getQueryByIndex(0).name;

  // now we get the gql value using the gql query function
  // and this function will always run using the network
  const gqlValue = await gqlQuery(query, {
    merge: arg.waitAndMerge,
    progresser: arg.progresser,
  });

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  const value = (gqlValue.data && gqlValue.data[queryName]) || null;
  preserveBlobFilesInValue(arg.itemDefinition, arg.args, value);

  if (!error) {
    const mergedResults = await storeAndCombineStorageValuesFor(
      arg.itemDefinition,
      arg.id,
      arg.version || null,
      value,
      arg.fields,
      arg.cacheStore,
    );
    return {
      error,
      value: mergedResults.value,
      getQueryFields: mergedResults.fields,
    }
  }

  return {
    error,
    value: null,
    getQueryFields: null,
  }
}

/**
 * The orer by rule uses enums rather than the standard
 * form in the order by rule type, so it's transformed
 * to its proper enums
 * @param orderBy the order by rule
 */
function convertOrderByRule(orderBy: IOrderByRuleType) {
  const result = {};
  Object.keys(orderBy).forEach((property) => {
    const rule = orderBy[property];
    result[property] = {
      priority: rule.priority,
      nulls: new GQLEnum(rule.nulls.toUpperCase()),
      direction: new GQLEnum(rule.direction.toUpperCase()),
    }
  });
  return result;
}

interface ISearchQueryArg {
  args: IGQLArgs,
  fields: IGQLRequestFields,
  itemDefinition: ItemDefinition,
  orderBy: IOrderByRuleType;
  createdBy: string;
  since: string;
  until: string;
  parentedBy: {
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
  };
  types?: string[];
  enableNulls: boolean;
  traditional: boolean;
  limit: number;
  offset: number;
  token: string;
  language: string;
  versionFilter?: string;
  versionFilterOut?: string;
  idsFilter?: string[];
  idsFilterOut?: string[];
  createdByFilter?: string[];
  createdByFilterOut?: string[];
  useSearchEngine?: boolean | string;
}

interface IRunSearchQueryArg extends ISearchQueryArg {
  cachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent" | "by-property" | "none";
  cacheNoLimitOffset?: boolean;
  cacheDoNotFallbackToSimpleSearch?: boolean;
  cacheDoNotUsePolyfill?: boolean;
  cacheDoNotFallbackToPolyfill?: boolean;
  cacheStoreMetadata?: any;
  cacheStoreMetadataMismatchAction?: SearchCacheMetadataMismatchActionFn | ISearchCacheMetadataMismatchAction;
  trackedProperty?: string;
  waitAndMerge?: boolean;
  progresser?: ProgresserFn;
}

interface IRunQueryOptions {
  remoteListener: RemoteListener;
}

interface IRunSearchQuerySearchOptions {
  remoteListener: RemoteListener;
  preventCacheStaleFeeback: boolean;
}

interface IRunSearchQueryResult {
  error: EndpointErrorType;
  results?: IGQLValue[];
  records: IGQLSearchRecord[];
  count: number;
  limit: number;
  offset: number;
  lastModified: string;
  highlights: IElasticHighlightRecordInfo;
  metadata: string;
  cached: boolean;
  polyfilled: boolean;
}

export function getSearchArgsFor(
  arg: ISearchQueryArg
) {
  const searchArgs = getQueryArgsFor(
    arg.enableNulls ? arg.args : deleteNulls(arg.args),
    arg.token,
    arg.language,
  );

  if (typeof arg.versionFilter !== "undefined") {
    searchArgs.version_filter = arg.versionFilter || null;
  }

  if (typeof arg.versionFilterOut !== "undefined") {
    searchArgs.version_filter_out = arg.versionFilterOut || null;
  }

  if (arg.idsFilter) {
    searchArgs.ids_filter = arg.idsFilter;
  }

  if (arg.idsFilterOut && arg.idsFilterOut.length) {
    searchArgs.ids_filter_out = arg.idsFilterOut;
  }

  if (arg.createdByFilter) {
    searchArgs.created_by_filter = arg.createdByFilter;
  }

  if (arg.createdByFilterOut && arg.createdByFilterOut.length) {
    searchArgs.created_by_filter_out = arg.createdByFilterOut;
  }

  if (arg.createdBy) {
    searchArgs.created_by = arg.createdBy;
  }

  if (arg.since) {
    searchArgs.since = arg.since;
  }

  if (arg.until) {
    searchArgs.until = arg.until;
  }

  if (arg.types) {
    searchArgs.types = arg.types;
  }

  if (arg.useSearchEngine) {
    searchArgs.searchengine = true;
    if (typeof arg.useSearchEngine === "string") {
      searchArgs.searchengine_language = arg.useSearchEngine;
    }
  }

  if (arg.parentedBy) {
    searchArgs.parent_type = arg.parentedBy.itemDefinition.getQualifiedPathName();
    searchArgs.parent_id = arg.parentedBy.id || null;
    searchArgs.parent_version = arg.parentedBy.version || null;
  }

  searchArgs.order_by = convertOrderByRule(arg.orderBy);
  searchArgs.limit = arg.limit;
  searchArgs.offset = arg.offset;

  return searchArgs;
}

export function getSearchQueryFor(
  arg: ISearchQueryArg
) {
  const standardCounterpart = arg.itemDefinition.isInSearchMode() ? arg.itemDefinition.getStandardCounterpart() : arg.itemDefinition;
  const qualifiedName = (standardCounterpart.isExtensionsInstance() ?
    standardCounterpart.getParentModule().getQualifiedPathName() :
    standardCounterpart.getQualifiedPathName());
  const queryName = (arg.traditional ? PREFIX_TRADITIONAL_SEARCH : PREFIX_SEARCH) + qualifiedName;

  const searchArgs = getSearchArgsFor(arg);

  const query = buildGqlQuery({
    name: queryName,
    args: searchArgs,
    fields: arg.traditional ? {
      results: arg.fields,
      count: {},
      limit: {},
      offset: {},
      last_modified: {},
      highlights: {},
      metadata: {},
    } : {
      records: {
        id: {},
        version: {},
        type: {},
        last_modified: {},
      },
      count: {},
      limit: {},
      offset: {},
      last_modified: {},
      metadata: {},
    },
  });

  return query;
}

/**
 * Runs the surprisingly complex search query
 * @param arg the arg for the search operation
 * @param arg.args the search args, contains our search options for the properties
 * such as EXACT_property_id and things like that
 * @param arg.fields the fields we want to request for the result, not the record,
 * these fields are used either for cache policied by-owner, by-parent, by-parent-and-owner or by-property searches,
 * as well as traditional mode, but they are not used in other circumstances
 * @param arg.itemDefinition the item definition we are running a search query for
 * it should be an extensions instance if we are doing it for a module
 * @param arg.orderBy an order by rule
 * @param arg.createdBy in order to filter by creator, should be present
 * if cachePolicy is by-owner otherwise null
 * @param arg.parentedBy in order to filter by parenting, should be present
 * if cachePolicy is by-parent otherwise null
 * @param arg.cachePolicy either "by-owner" (must specify createdBy) or "by-parent" (must specify parented-by) or
 * "by-property" which means the trackedProperty should be defined and it should specify the property value in the args as
 * otherwise "none", this will make it so that searches are ran in the cache rather than querying the
 * endpoint, they will be ran inside the cache worker; this means the capabilities of search are limited
 * compared to running them right into the endpoint, but that means searches can be performed offline
 * as well as many results be cached, eg. a list of messages; cache policy is a very powerful
 * option. Remember that offset must be 0, as we need to cache the latest result.
 * @param arg.trackedProperty if it was defined as a property then the cache property is to be defined here
 * @param arg.traditional a traditional search, doesn't support any cache policy
 * @param arg.limit the limit to limit by, this should be less or equal to the limit
 * that you can get search results (for traditional) or search records (for standard)
 * @param arg.offset the offset to start with, if using a cache policy this must be 0 or otherwise
 * it will cause inconsistencies
 * @param arg.token the token to run the search query for
 * @param arg.language the language for dictionary purposes
 * @param arg.versionFilter an optional filter to filter by a given version so only
 * items matching a version appear
 * @param arg.waitAndMerge waits for other search requests that have the same signature and
 * merges the response from the server, this is invalid if cachePolicy is any other than none
 * @param searchOptions the search options used and required for cache based searches or
 * listen based searches
 * @param searchOptions.remoteListener the remote listener object
 * @param searchOptions.onSearchUpdated the function to trigger once the cache policy
 * has indicated records have been added
 * @param searchOptions.preventCacheStaleFeeback when a search query is re-ran data might
 * be considered stale, but we might not want to run a feedback request for this search, this
 * happens when the search upated gets called, an then it will re-run the search, since there was
 * a window of time, dataMightBeStale is true, and it might ask feedback, for something it just
 * modified, this variable can always be false for 100% consistency; this is only useful when
 * cache policy is either by-owner or by parent
 * @returns a promise with the error, results (for traditional), the records, the count
 * which might me larger than the number of records, however the record length should
 * be equal to the limit, and the offset given
 */
export async function runSearchQueryFor(
  arg: IRunSearchQueryArg,
  searchOptions: IRunSearchQuerySearchOptions,
): Promise<IRunSearchQueryResult> {
  const standardCounterpart = arg.itemDefinition.getStandardCounterpart();
  const standardCounterpartModule = standardCounterpart.getParentModule();
  const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
    standardCounterpart.getParentModule().getQualifiedPathName() :
    standardCounterpart.getQualifiedPathName());

  const queryName = (arg.traditional ? PREFIX_TRADITIONAL_SEARCH : PREFIX_SEARCH) + standardCounterpartQualifiedName;

  const searchArgs = getSearchArgsFor(arg);

  // when the search was last modified
  // in practice the last modified of the last record
  let lastModified: string = null;

  let gqlValue: IGQLEndpointValue;
  let cached: boolean = false;
  let polyfilled: boolean = false;
  let useCacheWorker: boolean = (
    // will use cache worker
    arg.cachePolicy !== "none" &&
    (
      CacheWorkerInstance.isSupportedAsWorker ||
      (arg.cacheDoNotFallbackToPolyfill ? false : CacheWorkerInstance.isPolyfilled)
    )
  );
  // if we are in a search with
  // a cache policy then we should be able
  // to run the search within the worker as
  // that is one of the jobs of he cache workers
  // when it needs to run searches on the client side
  // for that we would totally relegate the search functionality
  // and even requesting the server to the cache worker, it will take
  // as much time as it is necessary
  if (useCacheWorker) {
    if ((arg.cachePolicy === "by-owner" || arg.cachePolicy === "by-owner-and-parent") && !arg.createdBy || arg.createdBy === UNSPECIFIED_OWNER) {
      throw new Error("Cache policy is by-owner yet there's no creator specified");
    } else if ((arg.cachePolicy === "by-parent" || arg.cachePolicy === "by-owner-and-parent") && (!arg.parentedBy || !arg.parentedBy.id)) {
      throw new Error("Cache policy is by-parent yet there's no parent specified with a specific id");
    } else if (arg.trackedProperty && (typeof searchArgs["SEARCH_" + arg.trackedProperty] !== "string" || !searchArgs["SEARCH_" + arg.trackedProperty])) {
      throw new Error("A tracked property has been set for " + arg.trackedProperty + " but SEARCH_" + arg.trackedProperty + " does not exist");
    } else if (arg.cachePolicy === "by-property" && !arg.trackedProperty) {
      throw new Error("Cache policy is by-property yet there's no tracked property set");
    }

    // let's assume we succeed for now and flip the value
    // if we happen to fail down the line
    cached = true;
    const queryNameForCacheWorker = PREFIX_SEARCH + standardCounterpartQualifiedName;

    let cacheWorkerGivenSearchValue = await CacheWorkerInstance.instance.runCachedSearch(
      queryNameForCacheWorker,
      searchArgs,
      PREFIX_GET_LIST + standardCounterpartQualifiedName,
      arg.token,
      arg.language.split("-")[0],
      arg.fields,
      arg.cachePolicy as any,
      arg.cacheNoLimitOffset,
      arg.trackedProperty,
      standardCounterpartModule.getMaxSearchRecords(),
      standardCounterpartModule.getMaxSearchResults(),
      !!arg.cacheStoreMetadataMismatchAction,
      false,
      false,
      {
        allowFallbackWritesToPolyfill: !arg.cacheDoNotFallbackToPolyfill,
      }
    );

    // failed to retrieve indexed db, something happened
    if (!cacheWorkerGivenSearchValue) {
      cached = false;
      useCacheWorker = false;
    } else {
      // we are now going to check for metadata used in
      // the search, by default there's no mismatch
      // and metadata is not written
      let metadataWasMismatch: boolean = false;
      let shouldWriteMetadata: boolean = false;

      // now if we have a mismatch rule
      if (
        arg.cacheStoreMetadataMismatchAction &&
        !cacheWorkerGivenSearchValue.gqlValue.errors
      ) {
        // let's get our current metadata
        const currentMetadataRaw = await CacheWorkerInstance.instance.readSearchMetadata(
          queryNameForCacheWorker,
          searchArgs,
          arg.cachePolicy as any,
          arg.trackedProperty,
          arg.createdBy,
          arg.parentedBy ? arg.parentedBy.itemDefinition.getQualifiedPathName() : null,
          arg.parentedBy ? arg.parentedBy.id : null,
          arg.parentedBy ? arg.parentedBy.version || null : null,
        );

        let currentMetadata: any = null;
        if (currentMetadataRaw && currentMetadataRaw.value) {
          currentMetadata = currentMetadataRaw.value;
        }

        // we can specify these actions
        let redoSearch: boolean = false;
        let refetchAllRecords: boolean = false;
        let refetchSpecificRecords: IGQLSearchRecord[] = null;

        // if we have a value there and it differs
        if (
          !currentMetadata ||
          !equals(currentMetadata.value, arg.cacheStoreMetadata, { strict: true })
        ) {
          // it was mismatched
          metadataWasMismatch = true;

          const actionToPerform: ISearchCacheMetadataMismatchAction = typeof arg.cacheStoreMetadataMismatchAction === "function" ?
            arg.cacheStoreMetadataMismatchAction(currentMetadata.value, arg.cacheStoreMetadata) :
            arg.cacheStoreMetadataMismatchAction;

          // so what action we have here, redo search
          if (actionToPerform.action === "REDO_SEARCH") {
            // we will do that
            redoSearch = true;
            refetchAllRecords = true;
          } else if (actionToPerform.action === "REFETCH_RECORDS") {
            // otherwise it must be refetch records, and we need to know which records
            refetchAllRecords = false;
            refetchSpecificRecords = cacheWorkerGivenSearchValue.sourceResults.filter((r) => {
              // and for that we will filter from the source results
              return checkMismatchCondition(
                actionToPerform.recordsRefetchCondition,
                r,
                currentMetadata,
                arg.cacheStoreMetadata,
              );
            }).map((r, index) => {
              // and we get the records from that based on the index
              return cacheWorkerGivenSearchValue.sourceRecords[index];
            });
          }

          // and now whether to rewrite the metadata
          if (
            actionToPerform.rewrite === "IF_CONDITION_SUCCEEDS" &&
            (redoSearch || refetchAllRecords || refetchSpecificRecords.length)
          ) {
            shouldWriteMetadata = true;
          } else if (actionToPerform.rewrite === "ALWAYS") {
            // otherwise it must be ALWAYS
            shouldWriteMetadata = true;
          }
        }

        if (redoSearch || refetchAllRecords || (refetchSpecificRecords && refetchSpecificRecords.length)) {
          // and now we pass to the cache worker again
          cacheWorkerGivenSearchValue = await CacheWorkerInstance.instance.runCachedSearch(
            queryNameForCacheWorker,
            searchArgs,
            PREFIX_GET_LIST + standardCounterpartQualifiedName,
            arg.token,
            arg.language.split("-")[0],
            arg.fields,
            arg.cachePolicy as any,
            arg.cacheNoLimitOffset,
            arg.trackedProperty,
            standardCounterpartModule.getMaxSearchRecords(),
            standardCounterpartModule.getMaxSearchResults(),
            false,
            redoSearch,
            refetchSpecificRecords || refetchAllRecords,
            {
              allowFallbackWritesToPolyfill: !arg.cacheDoNotFallbackToPolyfill,
            }
          );
        }
      }

      if (
        arg.cacheStoreMetadata &&
        cacheWorkerGivenSearchValue &&
        !cacheWorkerGivenSearchValue.gqlValue.errors &&
        metadataWasMismatch &&
        shouldWriteMetadata
      ) {
        await CacheWorkerInstance.instance.writeSearchMetadata(
          queryNameForCacheWorker,
          searchArgs,
          arg.cachePolicy as any,
          arg.trackedProperty,
          arg.createdBy,
          arg.parentedBy ? arg.parentedBy.itemDefinition.getQualifiedPathName() : null,
          arg.parentedBy ? arg.parentedBy.id : null,
          arg.parentedBy ? arg.parentedBy.version || null : null,
          arg.cacheStoreMetadata,
          {
            allowFallbackWritesToPolyfill: !arg.cacheDoNotFallbackToPolyfill,
          }
        );
      }

      if (!cacheWorkerGivenSearchValue) {
        cached = false;
        useCacheWorker = false;
      } else {
        // cached depends on whether we got no errors
        // errors indicate it didn't cache
        cached = !cacheWorkerGivenSearchValue.gqlValue.errors;
        polyfilled = cacheWorkerGivenSearchValue.polyfilled;

        // last record date of the given record
        // might be null, if no records
        lastModified = cacheWorkerGivenSearchValue.lastModified;

        // note that this value doesn't contain the count, it contains
        // the limit and the offset but not the count that is because
        // the count is considered irrelevant for these cache values
        gqlValue = cacheWorkerGivenSearchValue.gqlValue;
        // example the original search was traditional but the worker
        // cannot use that we need to patch
        if (queryNameForCacheWorker !== queryName && gqlValue && gqlValue.data) {
          gqlValue.data[queryName] = gqlValue.data[queryNameForCacheWorker];
          delete gqlValue.data[queryNameForCacheWorker];
        }

        if (gqlValue && gqlValue.data) {
          if (cacheWorkerGivenSearchValue.dataMightBeStale && !searchOptions.preventCacheStaleFeeback) {
            if (arg.cachePolicy === "by-owner") {
              searchOptions.remoteListener.requestOwnedSearchFeedbackFor({
                qualifiedPathName: standardCounterpartQualifiedName,
                createdBy: arg.createdBy,
                lastModified: cacheWorkerGivenSearchValue.lastModified,
              });
            } else if (arg.cachePolicy === "by-owner-and-parent") {
              searchOptions.remoteListener.requestOwnedParentedSearchFeedbackFor({
                createdBy: arg.createdBy,
                qualifiedPathName: standardCounterpartQualifiedName,
                parentType: arg.parentedBy.itemDefinition.getQualifiedPathName(),
                parentId: arg.parentedBy.id,
                parentVersion: arg.parentedBy.version || null,
                lastModified: cacheWorkerGivenSearchValue.lastModified,
              });
            } else if (arg.cachePolicy === "by-property") {
              searchOptions.remoteListener.requestPropertySearchFeedbackFor({
                qualifiedPathName: standardCounterpartQualifiedName,
                propertyId: arg.trackedProperty,
                propertyValue: searchArgs["SEARCH_" + arg.trackedProperty] as string,
                lastModified: cacheWorkerGivenSearchValue.lastModified,
              });
            } else {
              searchOptions.remoteListener.requestParentedSearchFeedbackFor({
                qualifiedPathName: standardCounterpartQualifiedName,
                parentType: arg.parentedBy.itemDefinition.getQualifiedPathName(),
                parentId: arg.parentedBy.id,
                parentVersion: arg.parentedBy.version || null,
                lastModified: cacheWorkerGivenSearchValue.lastModified,
              });
            }
          }
        }
      }
    }
  }

  // not using cache worker despite cache policy not being none
  // and being asked not to fallback, must be unsupported
  if (!useCacheWorker && arg.cachePolicy !== "none" && arg.cacheDoNotFallbackToSimpleSearch) {
    gqlValue = null;
  } else if (!arg.traditional && !useCacheWorker) {
    const query = buildGqlQuery({
      name: queryName,
      args: searchArgs,
      fields: {
        records: {
          id: {},
          version: {},
          type: {},
          last_modified: {},
        },
        count: {},
        limit: {},
        offset: {},
        last_modified: {},
        metadata: {},
      },
    });

    // now we get the gql value using the gql query function
    // and this function will always run using the network
    gqlValue = await gqlQuery(query, {
      merge: arg.waitAndMerge,
      progresser: arg.progresser,
    });

    const data = gqlValue && gqlValue.data && gqlValue.data[queryName];
    if (data) {
      lastModified = data.last_modified as string;
    }
  } else if (!useCacheWorker) {
    const query = buildGqlQuery({
      name: queryName,
      args: searchArgs,
      fields: {
        results: arg.fields,
        count: {},
        limit: {},
        offset: {},
        last_modified: {},
        highlights: {},
        metadata: {},
      },
    });

    // now we get the gql value using the gql query function
    // and this function will always run using the network
    gqlValue = await gqlQuery(query, {
      merge: arg.waitAndMerge,
      progresser: arg.progresser,
    });

    const data = gqlValue && gqlValue.data && gqlValue.data[queryName];
    if (data) {
      lastModified = data.last_modified as string;
    }
  }

  const data = gqlValue && gqlValue.data && gqlValue.data[queryName];
  let limit: number = (data && data.limit as number);
  let offset: number = (data && data.offset as number);
  let count: number = (data && data.count as number);

  let highlights: IElasticHighlightRecordInfo = null;
  try {
    if (data && data.highlights) {
      highlights = JSON.parse(data.highlights as string) || {};
    } else {
      highlights = {};
    }
  } catch {
    highlights = {};
  }

  const metadata: string = (data && (data.metadata as string)) || null;

  if (typeof limit === "undefined") {
    limit = null;
  }

  if (typeof offset === "undefined") {
    offset = null;
  }

  if (typeof count === "undefined") {
    count = null;
  }

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  // the cache worker is actually always returning
  // search results regardless of what method was
  // used
  if (!arg.traditional && !useCacheWorker) {
    const records: IGQLSearchRecord[] = (
      data && data.records
    ) as IGQLSearchRecord[] || null;

    return {
      error,
      results: null,
      records,
      limit,
      offset,
      count,
      lastModified,
      highlights,
      metadata,
      cached,
      polyfilled,
    };
  } else {
    // we may get records anyway eg. when using cache worker
    // if not we need to rebuild them from the results
    const records: IGQLSearchRecord[] = data && data.records ? (data.records as IGQLSearchRecord[]) : ((
      data && (data.results as IGQLValue[]).map((v) => ({
        type: v.type,
        version: v.version || null,
        id: v.id || null,
        last_modified: v.last_modified || null
      }))
    ) as IGQLSearchRecord[] || null);

    return {
      error,
      results: data && data.results as IGQLValue[],
      records,
      limit,
      offset,
      count,
      lastModified,
      highlights,
      metadata,
      cached,
      polyfilled,
    };
  }
}
