"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const ItemDefinition_1 = require("../../base/Root/Module/ItemDefinition");
const gql_querier_1 = require("../../gql-querier");
const gql_util_1 = require("../../gql-util");
const cache_1 = __importDefault(require("./workers/cache"));
const Include_1 = require("../../base/Root/Module/ItemDefinition/Include");
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
function getFieldsAndArgs(options) {
    // so the requested fields, at base
    // because a lot of these requests want to ensure the side
    // effects of the applied values we want to ensure that
    // the queried fields include the applied values
    let requestFields = {
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
    const argumentsForQuery = {};
    // now we go for the standard fields, and we add all of them
    constants_1.STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
        requestFields.DATA[p] = {};
    });
    // we add the external ones as well
    constants_1.EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
        requestFields[p] = {};
    });
    const moderationRoles = options.itemDefinitionInstance.getRolesWithModerationAccess();
    const canReadModerationFields = moderationRoles.includes(constants_1.ANYONE_METAROLE) ||
        (moderationRoles.includes(constants_1.ANYONE_LOGGED_METAROLE) && options.userRole !== constants_1.GUEST_METAROLE) ||
        moderationRoles.includes(options.userRole);
    // and if our role allows it, we add the moderation fields
    if (canReadModerationFields) {
        constants_1.MODERATION_FIELDS.forEach((mf) => {
            requestFields.DATA[mf] = {};
        });
    }
    // we get the applied owner of this item, basically what we have loaded
    // for this user created_by or id if the item is marked as if its id
    // is the owner, in the case of null, the applied owner is -1
    const appliedOwner = options.appliedOwner || options.itemDefinitionInstance.getAppliedValueOwnerIfAny(options.forId || null, options.forVersion || null);
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
                    if (!sp.isRetrievalDisabled() &&
                        sp.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, options.userRole, options.userId, appliedOwner, false)) {
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
                    const isEqual = pd.getPropertyDefinitionDescription().localEqual(appliedGQLValue, currentValue);
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
                        argumentsForQuery[qualifiedExlcusionStateId] = exclusionState;
                    }
                }
                else {
                    // we set the exclusion state we expect, it might be a ternary as well
                    // like in search mode
                    argumentsForQuery[qualifiedExlcusionStateId] = exclusionState;
                }
                if (exclusionState === Include_1.IncludeExclusionState.EXCLUDED) {
                    return;
                }
                // we add it to the data, and we add it to the arguments
                argumentsForQuery[qualifiedId] = {};
                // we need the sinking properties
                // as only the sinking properties manage
                include.getSinkingProperties().forEach((sp) => {
                    const hasRoleAccessToIncludeProperty = sp.checkRoleAccessFor(!options.forId ? ItemDefinition_1.ItemDefinitionIOActions.CREATE : ItemDefinition_1.ItemDefinitionIOActions.EDIT, options.userRole, options.userId, appliedOwner, false);
                    if (hasRoleAccessToIncludeProperty) {
                        const currentValue = sp.getCurrentValue(options.forId || null, options.forVersion || null);
                        if (options.differingIncludesOnlyForArgs) {
                            const appliedGQLValue = sp.getAppliedValue(options.forId || null, options.forVersion || null);
                            const isEqual = sp.getPropertyDefinitionDescription().localEqual(appliedGQLValue, currentValue);
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
    options.itemDefinitionInstance.getPropertiesForPolicy;
    return { requestFields, argumentsForQuery };
}
exports.getFieldsAndArgs = getFieldsAndArgs;
function getQueryArgsFor(args, token, language, id, version) {
    // basic args, the base args usually are for policies and whatnot
    const newArgs = {
        token: token,
        language: language.split("-")[0],
        ...args,
    };
    if (id) {
        newArgs.id = id;
        if (version) {
            newArgs.version = version;
        }
        else {
            newArgs.version = null;
        }
    }
    return newArgs;
}
function storeAndCombineStorageValuesFor(itemDefinition, id, version, value, fields, cacheStore) {
    let mergedValue = value;
    let mergedFields = fields;
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
        const appliedGQLValue = itemDefinition.getGQLAppliedValue(id || null, version || null);
        if (appliedGQLValue &&
            appliedGQLValue.rawValue &&
            appliedGQLValue.rawValue.last_modified === value.last_modified) {
            mergedValue = gql_util_1.deepMerge(mergedValue, appliedGQLValue.rawValue);
            mergedFields = gql_util_1.deepMerge(mergedFields, appliedGQLValue.requestFields);
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
            cache_1.default.instance.setCachedValueAsNullAndUpdateSearches(id, version, qualifiedName, constants_1.PREFIX_GET + qualifiedName, constants_1.PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName());
        }
        else {
            cache_1.default.instance.mergeCachedValue(constants_1.PREFIX_GET + qualifiedName, id, version, value, mergedFields);
        }
    }
    return {
        value: mergedValue,
        fields: mergedFields,
    };
}
async function runGetQueryFor(arg) {
    // now we get the currently applied value in memory
    const appliedGQLValue = arg.itemDefinition.getGQLAppliedValue(arg.id || null, arg.version || null);
    if (arg.returnMemoryCachedValues) {
        // let's check if the memory cached and the requested value match
        if (appliedGQLValue &&
            gql_util_1.requestFieldsAreContained(arg.fields, appliedGQLValue.requestFields)) {
            return {
                error: null,
                value: appliedGQLValue.rawValue,
                memoryCached: true,
                cached: false,
                getQueryFields: appliedGQLValue.requestFields,
            };
        }
    }
    const queryName = constants_1.PREFIX_GET + arg.itemDefinition.getQualifiedPathName();
    // otherwise now let's check for the worker
    if (cache_1.default.isSupported &&
        arg.returnWorkerCachedValues) {
        // we ask the worker for the value
        const workerCachedValue = await cache_1.default.instance.getCachedValue(queryName, arg.id, arg.version || null, arg.fields);
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
    const args = getQueryArgsFor(arg.args, arg.token, arg.language, arg.id, arg.version);
    const query = gql_querier_1.buildGqlQuery({
        name: queryName,
        args,
        fields: arg.fields,
    });
    // now we get the gql value using the gql query function
    // and this function will always run using the network
    const gqlValue = await gql_querier_1.gqlQuery(query);
    // now we got to check for errors
    let error = null;
    if (gqlValue.errors) {
        // if the server itself returned an error, we use that error
        error = gqlValue.errors[0].extensions;
    }
    const value = (gqlValue.data && gqlValue.data[queryName]) || null;
    if (!error) {
        const mergedResults = storeAndCombineStorageValuesFor(arg.itemDefinition, arg.id, arg.version || null, value, arg.fields, arg.cacheStore);
        return {
            error,
            value: mergedResults.value,
            memoryCached: false,
            cached: false,
            getQueryFields: mergedResults.fields,
        };
    }
    return {
        error,
        value: null,
        memoryCached: false,
        cached: false,
        getQueryFields: null,
    };
}
exports.runGetQueryFor = runGetQueryFor;
async function runDeleteQueryFor(arg) {
    const queryName = constants_1.PREFIX_DELETE + arg.itemDefinition.getQualifiedPathName();
    const args = getQueryArgsFor(arg.args, arg.token, arg.language, arg.id, arg.version);
    args.listener_uuid = arg.listenerUUID;
    const query = gql_querier_1.buildGqlMutation({
        name: queryName,
        args,
        fields: {
            id: {},
        },
    });
    // now we get the gql value using the gql query function
    // and this function will always run using the network
    const gqlValue = await gql_querier_1.gqlQuery(query);
    // now we got to check for errors
    let error = null;
    if (gqlValue.errors) {
        // if the server itself returned an error, we use that error
        error = gqlValue.errors[0].extensions;
    }
    if (!error) {
        storeAndCombineStorageValuesFor(arg.itemDefinition, arg.id, arg.version || null, null, null, arg.cacheStore);
    }
    return {
        error,
    };
}
exports.runDeleteQueryFor = runDeleteQueryFor;
async function runAddQueryFor(arg) {
    const queryName = constants_1.PREFIX_ADD + arg.itemDefinition.getQualifiedPathName();
    const args = getQueryArgsFor(arg.args, arg.token, arg.language);
    args.listener_uuid = arg.listenerUUID;
    if (arg.forId) {
        args.for_id = arg.forId;
    }
    if (arg.forVersion) {
        args.version = arg.forVersion;
    }
    args.container_id = arg.containerId;
    const query = gql_querier_1.buildGqlMutation({
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
    const gqlValue = await gql_querier_1.gqlQuery(query);
    // now we got to check for errors
    let error = null;
    if (gqlValue.errors) {
        // if the server itself returned an error, we use that error
        error = gqlValue.errors[0].extensions;
    }
    const value = (gqlValue.data && gqlValue.data[queryName]) || null;
    if (!error) {
        const mergedResults = storeAndCombineStorageValuesFor(arg.itemDefinition, value.id, value.version || null, value, arg.fields, arg.cacheStore);
        return {
            error,
            value: mergedResults.value,
            getQueryFields: mergedResults.fields,
        };
    }
    return {
        error,
        value: null,
        getQueryFields: null,
    };
}
exports.runAddQueryFor = runAddQueryFor;
async function runEditQueryFor(arg) {
    const queryName = constants_1.PREFIX_EDIT + arg.itemDefinition.getQualifiedPathName();
    const args = getQueryArgsFor(arg.args, arg.token, arg.language, arg.id, arg.version);
    args.listener_uuid = arg.listenerUUID;
    const query = gql_querier_1.buildGqlMutation({
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
    const gqlValue = await gql_querier_1.gqlQuery(query);
    // now we got to check for errors
    let error = null;
    if (gqlValue.errors) {
        // if the server itself returned an error, we use that error
        error = gqlValue.errors[0].extensions;
    }
    const value = (gqlValue.data && gqlValue.data[queryName]) || null;
    if (!error) {
        const mergedResults = storeAndCombineStorageValuesFor(arg.itemDefinition, arg.id, arg.version || null, value, arg.fields, arg.cacheStore);
        return {
            error,
            value: mergedResults.value,
            getQueryFields: mergedResults.fields,
        };
    }
    return {
        error,
        value: null,
        getQueryFields: null,
    };
}
exports.runEditQueryFor = runEditQueryFor;
function convertOrderByRule(orderBy) {
    const result = {};
    Object.keys(orderBy).forEach((property) => {
        const rule = orderBy[property];
        result[property] = {
            priority: rule.priority,
            nulls: new gql_querier_1.GQLEnum(rule.nulls.toUpperCase()),
            direction: new gql_querier_1.GQLEnum(rule.direction.toUpperCase()),
        };
    });
    return result;
}
async function runSearchQueryFor(arg, remoteListener, remoteListenerCallback) {
    const qualifiedName = (arg.itemDefinition.isExtensionsInstance() ?
        arg.itemDefinition.getParentModule().getQualifiedPathName() :
        arg.itemDefinition.getQualifiedPathName());
    const queryName = (arg.traditional ? constants_1.PREFIX_TRADITIONAL_SEARCH : constants_1.PREFIX_SEARCH) + qualifiedName;
    const searchArgs = getQueryArgsFor(arg.args, arg.token, arg.language);
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
    let gqlValue;
    // if we are in a search with
    // a cache policy then we should be able
    // to run the search within the worker as
    // that is one of the jobs of he cache workers
    // when it needs to run searches on the client side
    // for that we would totally relegate the search functionality
    // and even requesting the server to the cache worker, it will take
    // as much time as it is necessary
    if (arg.cachePolicy !== "none" &&
        cache_1.default.isSupported) {
        if (arg.traditional) {
            throw new Error("Cache policy is set yet search mode is traditional");
        }
        if (arg.offset !== 0) {
            throw new Error("Cache policy is set yet the offset is not 0");
        }
        const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
        const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
            standardCounterpart.getParentModule().getQualifiedPathName() :
            standardCounterpart.getQualifiedPathName());
        const cacheWorkerGivenSearchValue = await cache_1.default.instance.runCachedSearch(queryName, searchArgs, constants_1.PREFIX_GET_LIST + standardCounterpartQualifiedName, arg.token, arg.language.split("-")[0], arg.fields, arg.cachePolicy);
        // note that this value doesn't contain the count, it contains
        // the limit and the offset but not the count that is because
        // the count is considered irrelevant for these cache values
        gqlValue = cacheWorkerGivenSearchValue.gqlValue;
        if (gqlValue && gqlValue.data) {
            if (arg.cachePolicy === "by-owner") {
                remoteListener.addOwnedSearchListenerFor(standardCounterpartQualifiedName, arg.createdBy, cacheWorkerGivenSearchValue.lastRecordDate, remoteListenerCallback);
            }
            else {
                remoteListener.addParentedSearchListenerFor(standardCounterpartQualifiedName, arg.parentedBy.itemDefinition.getQualifiedPathName(), arg.parentedBy.id, arg.parentedBy.version || null, cacheWorkerGivenSearchValue.lastRecordDate, remoteListenerCallback);
            }
            if (cacheWorkerGivenSearchValue.dataMightBeStale) {
                if (arg.cachePolicy === "by-owner") {
                    remoteListener.requestOwnedSearchFeedbackFor({
                        qualifiedPathName: standardCounterpartQualifiedName,
                        createdBy: arg.createdBy,
                        knownLastRecordDate: cacheWorkerGivenSearchValue.lastRecordDate,
                    });
                }
                else {
                    remoteListener.requestParentedSearchFeedbackFor({
                        qualifiedPathName: standardCounterpartQualifiedName,
                        parentType: arg.parentedBy.itemDefinition.getQualifiedPathName(),
                        parentId: arg.parentedBy.id,
                        parentVersion: arg.parentedBy.version || null,
                        knownLastRecordDate: cacheWorkerGivenSearchValue.lastRecordDate,
                    });
                }
            }
        }
    }
    else if (!arg.traditional) {
        const query = gql_querier_1.buildGqlQuery({
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
            },
        });
        // now we get the gql value using the gql query function
        // and this function will always run using the network
        gqlValue = await gql_querier_1.gqlQuery(query);
    }
    else {
        const query = gql_querier_1.buildGqlQuery({
            name: queryName,
            args: searchArgs,
            fields: {
                results: arg.fields,
                count: {},
                limit: {},
                offset: {},
            },
        });
        // now we get the gql value using the gql query function
        // and this function will always run using the network
        gqlValue = await gql_querier_1.gqlQuery(query);
    }
    // now we got to check for errors
    let error = null;
    if (gqlValue.errors) {
        // if the server itself returned an error, we use that error
        error = gqlValue.errors[0].extensions;
    }
    const data = gqlValue.data && gqlValue.data[queryName] && gqlValue.data[queryName];
    const limit = (data && data.limit) || null;
    const offset = (data && data.offset) || null;
    let count = (data && data.count) || null;
    if (!arg.traditional) {
        const records = (data && data.records) || null;
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
        };
    }
    else {
        const records = (data && data.results.map((v) => ({
            type: v.type,
            version: v.version || null,
            id: v.id || null,
            created_at: (v.DATA && v.DATA.created_at) || null
        }))) || null;
        return {
            error,
            results: data && data.results,
            records,
            limit,
            offset,
            count,
        };
    }
}
exports.runSearchQueryFor = runSearchQueryFor;
