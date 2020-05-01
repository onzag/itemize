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
} from "../../constants";
import ItemDefinition, { ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import { IGQLValue, IGQLRequestFields, IGQLArgs, buildGqlQuery, gqlQuery, buildGqlMutation, IGQLEndpointValue, IGQLSearchResult } from "../../gql-querier";
import { deepMerge, requestFieldsAreContained } from "../../gql-util";
import CacheWorkerInstance from "./workers/cache";
import { EndpointErrorType } from "../../base/errors";
import { RemoteListener } from "./app/remote-listener";
import { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";

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
        const currentValue = pd.getCurrentValue(options.forId || null, options.forVersion || null);
        if (options.differingPropertiesOnlyForArgs) {
          const appliedGQLValue = pd.getAppliedValue(options.forId || null, options.forVersion || null);
          const isEqual = pd.getPropertyDefinitionDescription().localEqual(
            appliedGQLValue,
            currentValue,
          );
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
        // and now we get the qualified identifier that grapqhl expects
        const qualifiedId = include.getQualifiedIdentifier();
        const qualifiedExlcusionStateId = include.getQualifiedExclusionStateIdentifier();
        const exclusionState = include.getExclusionState(options.forId || null, options.forVersion || null);
        
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
            const currentValue = sp.getCurrentValue(
              options.forId || null, options.forVersion || null);
            if (options.differingIncludesOnlyForArgs) {
              const appliedGQLValue = sp.getAppliedValue(options.forId || null, options.forVersion || null);
              const isEqual = sp.getPropertyDefinitionDescription().localEqual(
                appliedGQLValue,
                currentValue,
              );
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

export async function runGetQueryFor(
  arg: {
    args: IGQLArgs,
    fields: IGQLRequestFields,
    returnMemoryCachedValues: boolean,
    returnWorkerCachedValues: boolean,
    itemDefinition: ItemDefinition,
    id: number,
    version: string,
    language: string,
    token: string,
    cacheStore: boolean,
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
  const gqlValue = await gqlQuery(query);

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
  }

  return {
    error,
    value: null,
    memoryCached: false,
    cached: false,
    getQueryFields: null,
  }
}

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
  },
): Promise<{
  error: EndpointErrorType,
}> {
  const queryName = PREFIX_DELETE + arg.itemDefinition.getQualifiedPathName();
  const args = getQueryArgsFor(
    arg.args,
    arg.token,
    arg.language,
    arg.id,
    arg.version
  );
  args.listener_uuid = arg.listenerUUID;

  const query = buildGqlMutation({
    name: queryName,
    args,
    fields: {
      id: {},
    },
  })

  // now we get the gql value using the gql query function
  // and this function will always run using the network
  const gqlValue = await gqlQuery(query);

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

export async function runAddQueryFor(
  arg: {
    args: IGQLArgs,
    fields: IGQLRequestFields,
    itemDefinition: ItemDefinition,
    token: string,
    language: string,
    listenerUUID: string,
    cacheStore: boolean,
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
  const gqlValue = await gqlQuery(query);

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
  },
): Promise<{
  error: EndpointErrorType,
  value: IGQLValue,
  getQueryFields: IGQLRequestFields,
}> {
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
  const gqlValue = await gqlQuery(query);

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

export async function runSearchQueryFor(
  arg: {
    args: IGQLArgs,
    fields: IGQLRequestFields,
    itemDefinition: ItemDefinition,
    orderBy: "DEFAULT";
    createdBy: number;
    parentedBy: {
      itemDefinition: ItemDefinition,
      id: number,
      version: string,
    };
    cachePolicy: "by-owner" | "by-parent" | "none",
    token: string,
    language: string,
  },
  remoteListener: RemoteListener,
  remoteListenerCallback: () => void,
): Promise<{
  error: EndpointErrorType,
  searchResults: IGQLSearchResult[],
}> {
  const qualifiedName = (this.props.itemDefinitionInstance.isExtensionsInstance() ?
    this.props.itemDefinitionInstance.getParentModule().getQualifiedPathName() :
    this.props.itemDefinitionInstance.getQualifiedPathName());
  const queryName = PREFIX_SEARCH + qualifiedName;

  const args = getQueryArgsFor(
    arg.args,
    arg.token,
    arg.language,
  );

  if (arg.createdBy) {
    args.created_by = arg.createdBy;
  }

  if (arg.parentedBy) {
    args.parent_type = arg.parentedBy.itemDefinition.getQualifiedPathName();
    args.parent_id = arg.parentedBy.id;
    args.parent_version = arg.parentedBy.version || null;
  }

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
    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());
    const cacheWorkerGivenSearchValue = await CacheWorkerInstance.instance.runCachedSearch(
      queryName,
      args,
      PREFIX_GET_LIST + standardCounterpartQualifiedName,
      arg.token,
      arg.language.split("-")[0],
      arg.fields,
      arg.cachePolicy,
    );
    gqlValue = cacheWorkerGivenSearchValue.gqlValue;
    if (gqlValue && gqlValue.data) {
      if (arg.cachePolicy === "by-owner") {
        remoteListener.addOwnedSearchListenerFor(
          standardCounterpartQualifiedName,
          arg.createdBy,
          cacheWorkerGivenSearchValue.lastRecord,
          remoteListenerCallback,
        );
      } else {
        remoteListener.addParentedSearchListenerFor(
          standardCounterpartQualifiedName,
          arg.parentedBy.itemDefinition.getQualifiedPathName(),
          arg.parentedBy.id,
          arg.parentedBy.version || null,
          cacheWorkerGivenSearchValue.lastRecord,
          remoteListenerCallback,
        );
      }

      if (cacheWorkerGivenSearchValue.dataMightBeStale) {
        if (arg.cachePolicy === "by-owner") {
          remoteListener.requestOwnedSearchFeedbackFor({
            qualifiedPathName: standardCounterpartQualifiedName,
            createdBy: arg.createdBy,
            knownLastRecord: cacheWorkerGivenSearchValue.lastRecord,
          });
        } else {
          remoteListener.requestParentedSearchFeedbackFor({
            qualifiedPathName: standardCounterpartQualifiedName,
            parentType: arg.parentedBy.itemDefinition.getQualifiedPathName(),
            parentId: arg.parentedBy.id,
            parentVersion: arg.parentedBy.version || null,
            knownLastRecord: cacheWorkerGivenSearchValue.lastRecord,
          });
        }
      }
    }
  } else {
    const query = buildGqlQuery({
      name: queryName,
      args,
      fields: {
        ids: {
          id: {},
          version: {},
          type: {},
          created_at: {},
        },
      },
    });

    // now we get the gql value using the gql query function
    // and this function will always run using the network
    gqlValue = await gqlQuery(query);
  }

  // now we got to check for errors
  let error: EndpointErrorType = null;

  if (gqlValue.errors) {
    // if the server itself returned an error, we use that error
    error = gqlValue.errors[0].extensions;
  }

  const searchResults: IGQLSearchResult[] = (
    gqlValue.data && gqlValue.data[queryName] && gqlValue.data[queryName].ids
  ) as IGQLSearchResult[] || null;

  return {
    error,
    searchResults,
  };
}