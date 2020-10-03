/**
 * Contains utilities for building a grapqhl client to interact
 * with the server, this is meant only for the javascript context
 * itself as it performs a lot of storing, checking and so on
 * @packageDocumentation
 */

import {
  STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  MODERATION_FIELDS,
  ANYONE_LOGGED_METAROLE,
  GUEST_METAROLE,
  ANYONE_METAROLE,
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
} from "../../constants";
import ItemDefinition, { ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import { IGQLValue, IGQLRequestFields, IGQLArgs, buildGqlQuery, gqlQuery, buildGqlMutation, IGQLEndpointValue, IGQLSearchRecord, GQLEnum } from "../../gql-querier";
import { deepMerge, requestFieldsAreContained } from "../../gql-util";
import CacheWorkerInstance from "./workers/cache";
import { EndpointErrorType } from "../../base/errors";
import { RemoteListener } from "./app/remote-listener";
import { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

export interface IPropertyOverride {
  id: string;
  value: PropertyDefinitionSupportedType;
}

export interface IIncludeOverride {
  id: string;
  exclusionState?: "INCLUDED" | "EXCLUDED" | "ANY",
  overrides?: IPropertyOverride[];
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
    includes?: string[],
    propertiesForArgs?: string[],
    includesForArgs?: string[],
    policiesForArgs?: [string, string, string][],
    appliedOwner?: number,
    userRole: string;
    userId: number;
    itemDefinitionInstance: ItemDefinition;
    forId: number;
    forVersion: string;
    uniteFieldsWithAppliedValue?: boolean;
    propertyOverrides?: IPropertyOverride[];
    includeOverrides?: IIncludeOverride[];
  },
) {
  // so the requested fields, at base
  // because a lot of these requests want to ensure the side
  // effects of the applied values we want to ensure that
  // the queried fields include the applied values
  let requestFields: any = {
    DATA: {},
  };

  // the reason for this some of these values are meant to be applied, when a value is applied
  // in an item definition it will erase anything in it, as merging won't work when timestamps,
  // don't match because during an edit event there might be side effects, this will ensure
  // values remain updated with whatever is used even in the cache
  if (options.uniteFieldsWithAppliedValue) {
    const appliedValue = options.itemDefinitionInstance.getGQLAppliedValue(options.forId, options.forVersion);
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

  // now we go for the standard fields, and we add all of them
  STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
    requestFields.DATA[p] = {};
  });
  // we add the external ones as well
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
    requestFields[p] = {};
  });

  const moderationRoles = options.itemDefinitionInstance.getRolesWithModerationAccess();
  const canReadModerationFields =
    moderationRoles.includes(ANYONE_METAROLE) ||
    (moderationRoles.includes(ANYONE_LOGGED_METAROLE) && options.userRole !== GUEST_METAROLE) ||
    moderationRoles.includes(options.userRole);
  // and if our role allows it, we add the moderation fields
  if (canReadModerationFields) {
    MODERATION_FIELDS.forEach((mf) => {
      requestFields.DATA[mf] = {};
    });
  }

  // we get the applied owner of this item, basically what we have loaded
  // for this user created_by or id if the item is marked as if its id
  // is the owner, in the case of null, the applied owner is -1
  const appliedOwner = options.appliedOwner || options.itemDefinitionInstance.getAppliedValueOwnerIfAny(
    options.forId || null,
    options.forVersion || null,
  );

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
    if (options.includes && options.includes.length) {
      options.includes.forEach((iId) => {
        const include = options.itemDefinitionInstance.getIncludeFor(iId);
        // and now we get the qualified identifier that grapqhl expects
        const qualifiedId = include.getQualifiedIdentifier();
        requestFields.DATA[include.getQualifiedExclusionStateIdentifier()] = {};
        requestFields.DATA[qualifiedId] = {};

        // we need the sinking properties
        // as only the sinking properties manage
        include.getSinkingProperties().forEach((sp) => {
          // we always check for role access and whether we can retrieve it or not
          if (
            !sp.isRetrievalDisabled() &&
            sp.checkRoleAccessFor(
              ItemDefinitionIOActions.READ,
              options.userRole,
              options.userId,
              appliedOwner,
              false,
            )
          ) {
            requestFields.DATA[qualifiedId][include.getPrefixedQualifiedIdentifier() + sp.getId()] = sp.getRequestFields();
          }
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
        const currentOverride = options.propertyOverrides && options.propertyOverrides.find((o) => o.id === pId);
        const currentValue = currentOverride ? currentOverride.value : pd.getCurrentValue(options.forId || null, options.forVersion || null);
        if (options.differingPropertiesOnlyForArgs) {
          const appliedGQLValue = pd.getAppliedValue(options.forId || null, options.forVersion || null);
          const isEqual = pd.getPropertyDefinitionDescription().localEqual({
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
        argumentsForQuery[pd.getId()] = currentValue;
      });
    }
    if (options.includesForArgs && options.includesForArgs.length) {
      options.includesForArgs.forEach((iId) => {
        const include = options.itemDefinitionInstance.getIncludeFor(iId);
        const currentOverride = options.includeOverrides && options.includeOverrides.find((o) => o.id === iId);

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
        argumentsForQuery[qualifiedId] = {};

        // we need the sinking properties
        // as only the sinking properties manage
        include.getSinkingProperties().forEach((sp) => {
          const hasRoleAccessToIncludeProperty = sp.checkRoleAccessFor(
            !options.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
            options.userRole,
            options.userId,
            appliedOwner,
            false,
          );
    
          if (
            hasRoleAccessToIncludeProperty
          ) {
            const currentPropertyOverride = currentOverride && currentOverride.overrides && currentOverride.overrides.find((o) => o.id === sp.getId());
            const currentValue = currentPropertyOverride ? currentPropertyOverride.value : sp.getCurrentValue(
              options.forId || null, options.forVersion || null);
            if (options.differingIncludesOnlyForArgs) {
              const appliedGQLValue = sp.getAppliedValue(options.forId || null, options.forVersion || null);
              const isEqual = sp.getPropertyDefinitionDescription().localEqual({
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
        argumentsForQuery[options.itemDefinitionInstance.getQualifiedPolicyIdentifier(...policyPath)] =
          policy.getCurrentValue(options.forId || null, options.forVersion || null);
      });
    }
  }

  options.itemDefinitionInstance.getPropertiesForPolicy

  return {requestFields, argumentsForQuery};
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
  id?: number,
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
function storeAndCombineStorageValuesFor(
  itemDefinition: ItemDefinition,
  id: number,
  version: string,
  value: IGQLValue,
  fields: IGQLRequestFields,
  cacheStore: boolean,
) {
  let mergedValue: IGQLValue = value;
  let mergedFields: IGQLRequestFields = fields;

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

  if (cacheStore) {
    // in the case of delete, we just cache nulls also
    // the same applies in the case of get and a not found
    // was the output
    if (!value) {
      // we are here guaranteed that if we have retrieved something from
      // the server in an unique value way it is not a module and it's not
      // a search mode, since we are here, so we can infer the module search
      // and the item definition search in order to be efficient
      CacheWorkerInstance.instance.setCachedValueAsNullAndUpdateSearches(
        id,
        version,
        qualifiedName,
        PREFIX_GET + qualifiedName,
        PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(),
        PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
      );
    } else {
      CacheWorkerInstance.instance.mergeCachedValue(
        PREFIX_GET + qualifiedName, id, version, value, mergedFields);
    }
  }

  return {
    value: mergedValue,
    fields: mergedFields,
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
    id: number,
    version: string,
    language: string,
    token: string,
    cacheStore: boolean,
    waitAndMerge?: boolean,
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
    CacheWorkerInstance.isSupported &&
    arg.returnWorkerCachedValues
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
  });

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  const value = (gqlValue.data && gqlValue.data[queryName]) || null;

  if (!error) {
    const mergedResults = storeAndCombineStorageValuesFor(
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
      cached: false,
      getQueryFields: mergedResults.fields,
    }
  } else if (error.code === ENDPOINT_ERRORS.CANT_CONNECT) {
    // otherwise now let's check for the worker
    if (
      CacheWorkerInstance.isSupported &&
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
    id: number,
    version: string,
    token: string,
    language: string,
    listenerUUID: string,
    cacheStore: boolean,
    waitAndMerge?: boolean,
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
    forId: number,
    forVersion: string,
    containerId: string,
    waitAndMerge?: boolean,
  },
): Promise<{
  error: EndpointErrorType,
  value: IGQLValue,
  getQueryFields: IGQLRequestFields,
}> {
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
  })

  // now we get the gql value using the gql query function
  // and this function will always run using the network
  const gqlValue = await gqlQuery(query, {
    merge: arg.waitAndMerge,
  });

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  const value = (gqlValue.data && gqlValue.data[queryName]) || null;

  if (!error) {
    const mergedResults = storeAndCombineStorageValuesFor(
      arg.itemDefinition,
      value.id as number,
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
    id: number,
    version: string,
    listenerUUID: string,
    cacheStore: boolean,
    waitAndMerge?: boolean,
  },
): Promise<{
  error: EndpointErrorType,
  value: IGQLValue,
  getQueryFields: IGQLRequestFields,
}> {
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

  // now we get the gql value using the gql query function
  // and this function will always run using the network
  const gqlValue = await gqlQuery(query, {
    merge: arg.waitAndMerge,
  });

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  const value = (gqlValue.data && gqlValue.data[queryName]) || null;

  if (!error) {
    const mergedResults = storeAndCombineStorageValuesFor(
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

type resolveRejectPromiseHandle = (resolve: (arg: IRunSearchQueryResult) => void, reject: (err: Error) => void) => void;

const WAIT_AND_MERGE_CB_KEY_MAP: {
  [key: string]: IRunSearchQueryArg;
} = {};
const WAIT_AND_MERGE_CB_LIST: {
  [key: string]: Array<resolveRejectPromiseHandle>;
} = {};

interface IRunSearchQueryArg {
  args: IGQLArgs,
  fields: IGQLRequestFields,
  itemDefinition: ItemDefinition,
  orderBy: IOrderByRuleType;
  createdBy: number;
  parentedBy: {
    itemDefinition: ItemDefinition,
    id: number,
    version: string,
  };
  cachePolicy: "by-owner" | "by-parent" | "none",
  traditional: boolean,
  limit: number,
  offset: number,
  token: string,
  language: string,
  versionFilter?: string,
  waitAndMerge?: boolean,
}

interface IRunSearchQuerySearchOptions {
  remoteListener: RemoteListener,
  preventCacheStaleFeeback: boolean,
}

interface IRunSearchQueryResult {
  error: EndpointErrorType,
  results?: IGQLValue[],
  records: IGQLSearchRecord[],
  count: number,
  limit: number,
  offset: number,
  knownLastRecordDate: string,
}

/**
 * Runs the surprisingly complex search query
 * @param arg the arg for the search operation
 * @param arg.args the search args, contains our search options for the properties
 * such as EXACT_property_id and things like that
 * @param arg.fields the fields we want to request for the result, not the record,
 * these fields are used either for cache policied by-owner or by-parent searches,
 * as well as traditional mode, but they are not used in other circumstances
 * @param arg.itemDefinition the item definition we are running a search query for
 * it should be an extensions instance if we are doing it for a module
 * @param arg.orderBy an order by rule
 * @param arg.createdBy in order to filter by creator, should be present
 * if cachePolicy is by-owner otherwise null
 * @param arg.parentedBy in order to filter by parenting, should be present
 * if cachePolicy is by-parent otherwise null
 * @param arg.cachePolicy either "by-owner" (must specify createdBy) or "by-parent" (must specify parented-by) or
 * otherwise "none", this will make it so that searches are ran in the cache rather than querying the
 * endpoint, they will be ran inside the cache worker; this means the capabilities of search are limited
 * compared to running them right into the endpoint, but that means searches can be performed offline
 * as well as many results be cached, eg. a list of messages; cache policy is a very powerful
 * option. Remember that offset must be 0, as we need to cache the latest result.
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
  const qualifiedName = (arg.itemDefinition.isExtensionsInstance() ?
    arg.itemDefinition.getParentModule().getQualifiedPathName() :
    arg.itemDefinition.getQualifiedPathName());
  const queryName = (arg.traditional ? PREFIX_TRADITIONAL_SEARCH : PREFIX_SEARCH) + qualifiedName;

  const searchArgs = getQueryArgsFor(
    arg.args,
    arg.token,
    arg.language,
  );

  if (arg.versionFilter) {
    searchArgs.version_filter = arg.versionFilter;
  }

  if (arg.createdBy) {
    searchArgs.created_by = arg.createdBy;
  }

  if (arg.parentedBy) {
    searchArgs.parent_type = arg.parentedBy.itemDefinition.getQualifiedPathName();
    searchArgs.parent_id = arg.parentedBy.id;
    searchArgs.parent_version = arg.parentedBy.version || null;
  }

  searchArgs.order_by = convertOrderByRule(arg.orderBy);
  searchArgs.limit = arg.limit;
  searchArgs.offset = arg.offset;

  let knownLastRecordDate: string = null;

  let gqlValue: IGQLEndpointValue;
  // if we are in a search with
  // a cache policy then we should be able
  // to run the search within the worker as
  // that is one of the jobs of he cache workers
  // when it needs to run searches on the client side
  // for that we would totally relegate the search functionality
  // and even requesting the server to the cache worker, it will take
  // as much time as it is necessary
  if (
    arg.cachePolicy !== "none" &&
    CacheWorkerInstance.isSupported
  ) {
    if (arg.traditional) {
      throw new Error("Cache policy is set yet search mode is traditional");
    } else if (arg.offset !== 0) {
      throw new Error("Cache policy is set yet the offset is not 0");
    } else if (arg.cachePolicy === "by-owner" && !arg.createdBy || arg.createdBy === UNSPECIFIED_OWNER) {
      throw new Error("Cache policy is by-owner yet there's no creator specified");
    } else if (arg.cachePolicy === "by-parent" && !arg.parentedBy) {
      throw new Error("Cache policy is by-parent yet there's no parent specified");
    }

    const standardCounterpart = arg.itemDefinition.getStandardCounterpart();
    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());
    const standardCounterpartModule = standardCounterpart.getParentModule();
    const cacheWorkerGivenSearchValue = await CacheWorkerInstance.instance.runCachedSearch(
      queryName,
      searchArgs,
      PREFIX_GET_LIST + standardCounterpartQualifiedName,
      arg.token,
      arg.language.split("-")[0],
      arg.fields,
      arg.cachePolicy,
      standardCounterpartModule.getMaxSearchResults(),
    );

    // last record date of the given record
    // might be null, if no records
    knownLastRecordDate = cacheWorkerGivenSearchValue.lastRecordDate;

    // note that this value doesn't contain the count, it contains
    // the limit and the offset but not the count that is because
    // the count is considered irrelevant for these cache values
    gqlValue = cacheWorkerGivenSearchValue.gqlValue;
    if (gqlValue && gqlValue.data) {
      if (cacheWorkerGivenSearchValue.dataMightBeStale && !searchOptions.preventCacheStaleFeeback) {
        if (arg.cachePolicy === "by-owner") {
          searchOptions.remoteListener.requestOwnedSearchFeedbackFor({
            qualifiedPathName: standardCounterpartQualifiedName,
            createdBy: arg.createdBy,
            knownLastRecordDate: cacheWorkerGivenSearchValue.lastRecordDate,
          });
        } else {
          searchOptions.remoteListener.requestParentedSearchFeedbackFor({
            qualifiedPathName: standardCounterpartQualifiedName,
            parentType: arg.parentedBy.itemDefinition.getQualifiedPathName(),
            parentId: arg.parentedBy.id,
            parentVersion: arg.parentedBy.version || null,
            knownLastRecordDate: cacheWorkerGivenSearchValue.lastRecordDate,
          });
        }
      }
    }
  } else if (!arg.traditional) {
    const query = buildGqlQuery({
      name: queryName,
      args: searchArgs,
      fields: {
        records: {
          id: {},
          version: {},
          type: {},
          created_at: {},
        },
        count: {},
        limit: {},
        offset: {},
        last_record_date: {},
      },
    });

    // now we get the gql value using the gql query function
    // and this function will always run using the network
    gqlValue = await gqlQuery(query, {
      merge: arg.waitAndMerge,
    });

    const data = gqlValue && gqlValue.data && gqlValue.data[queryName];
    if (data) {
      knownLastRecordDate = data.last_record_date as string;
    }
  } else {
    const query = buildGqlQuery({
      name: queryName,
      args: searchArgs,
      fields: {
        results: arg.fields,
        count: {},
        limit: {},
        offset: {},
        last_record_date: {},
      },
    });

    // now we get the gql value using the gql query function
    // and this function will always run using the network
    gqlValue = await gqlQuery(query, {
      merge: arg.waitAndMerge,
    });

    const data = gqlValue && gqlValue.data && gqlValue.data[queryName];
    if (data) {
      knownLastRecordDate = data.last_record_date as string;
    }
  }

  const data = gqlValue.data && gqlValue.data[queryName];
  const limit: number = (data && data.limit as number) || null;
  const offset: number = (data && data.offset as number) || null;
  let count: number = (data && data.count as number) || null;

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  if (!arg.traditional) {
    const records: IGQLSearchRecord[] = (
      data && data.records
    ) as IGQLSearchRecord[] || null;

    // sometimes count is not there, this happens when using the cached search
    // as the cached search doesn't perform any counting so it doesn't return such data
    // check out the cache worker to see that it returns records, last_record_date,
    // limit and offset, but no count, so we collapse the count to all the given results that
    // were provided
    if (data && count === null) {
      count = records.length;
    }
  
    return {
      error,
      results: null,
      records,
      limit,
      offset,
      count,
      knownLastRecordDate,
    };
  } else {
    const records: IGQLSearchRecord[] = (
      data && (data.results as IGQLValue[]).map((v) => ({
        type: v.type,
        version: v.version || null,
        id: v.id || null,
        created_at: (v.DATA && (v.DATA as any).created_at) || null
      }))
    ) as IGQLSearchRecord[] || null;
  
    return {
      error,
      results: data && data.results as IGQLValue[],
      records,
      limit,
      offset,
      count,
      knownLastRecordDate,
    };
  }
}
