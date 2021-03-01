[](../README.md) / [Exports](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / default

# Class: default

[client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md).default

This class represents a worker that works under the hood
of the main app in order to cache queries coming from the
itemize main provider, this is the most complex cache of
them all, because it supports partial saving and it just
gathers data on top of itself, its not a service worker
it's a standard worker as it needs to access indexed db

## Table of contents

### Constructors

- [constructor](client_internal_workers_cache_cache_worker.default.md#constructor)

### Properties

- [blockedCallback](client_internal_workers_cache_cache_worker.default.md#blockedcallback)
- [db](client_internal_workers_cache_cache_worker.default.md#db)
- [isCurrentlyBlocked](client_internal_workers_cache_cache_worker.default.md#iscurrentlyblocked)
- [resolved](client_internal_workers_cache_cache_worker.default.md#resolved)
- [rootProxy](client_internal_workers_cache_cache_worker.default.md#rootproxy)
- [versionHasBeenSet](client_internal_workers_cache_cache_worker.default.md#versionhasbeenset)
- [waitForSetupPromise](client_internal_workers_cache_cache_worker.default.md#waitforsetuppromise)
- [waitForSetupPromiseResolve](client_internal_workers_cache_cache_worker.default.md#waitforsetuppromiseresolve)

### Methods

- [deleteCachedSearch](client_internal_workers_cache_cache_worker.default.md#deletecachedsearch)
- [deleteCachedValue](client_internal_workers_cache_cache_worker.default.md#deletecachedvalue)
- [getCachedValue](client_internal_workers_cache_cache_worker.default.md#getcachedvalue)
- [mergeCachedValue](client_internal_workers_cache_cache_worker.default.md#mergecachedvalue)
- [proxyRoot](client_internal_workers_cache_cache_worker.default.md#proxyroot)
- [runCachedSearch](client_internal_workers_cache_cache_worker.default.md#runcachedsearch)
- [setBlockedCallback](client_internal_workers_cache_cache_worker.default.md#setblockedcallback)
- [setCachedValue](client_internal_workers_cache_cache_worker.default.md#setcachedvalue)
- [setupVersion](client_internal_workers_cache_cache_worker.default.md#setupversion)
- [updateRecordsOnCachedSearch](client_internal_workers_cache_cache_worker.default.md#updaterecordsoncachedsearch)

## Constructors

### constructor

\+ **new default**(): [*default*](client_internal_workers_cache_cache_worker.default.md)

Constructs a new cache worker

**Returns:** [*default*](client_internal_workers_cache_cache_worker.default.md)

Defined in: [client/internal/workers/cache/cache.worker.ts:176](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L176)

## Properties

### blockedCallback

• `Private` **blockedCallback**: (`state`: *boolean*) => *void*

a function to call once the blocked changes state

#### Type declaration:

▸ (`state`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`state` | *boolean* |

**Returns:** *void*

Defined in: [client/internal/workers/cache/cache.worker.ts:160](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L160)

Defined in: [client/internal/workers/cache/cache.worker.ts:160](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L160)

___

### db

• `Private` **db**: *IDBPDatabase*<[*ICacheDB*](../interfaces/client_internal_workers_cache_cache_worker.icachedb.md)\>= null

Represents the indexed db database, as a promise
as the db might be loading even before it is requested
to perform any action

Defined in: [client/internal/workers/cache/cache.worker.ts:136](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L136)

___

### isCurrentlyBlocked

• `Private` **isCurrentlyBlocked**: *boolean*

Whether currently the cache is blocked from
releasing

Defined in: [client/internal/workers/cache/cache.worker.ts:155](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L155)

___

### resolved

• `Private` **resolved**: *boolean*= false

Whether the promise has been resolved as a boolean

Defined in: [client/internal/workers/cache/cache.worker.ts:176](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L176)

___

### rootProxy

• `Private` **rootProxy**: [*default*](base_root.default.md)

The comlink proxied root class

Defined in: [client/internal/workers/cache/cache.worker.ts:149](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L149)

___

### versionHasBeenSet

• `Private` **versionHasBeenSet**: *boolean*= false

Specifies whether a version has been set for this
database, setting up the version is necessary to setup
the database but it's only necessary to do it once
however many instances might call the same function
when they need the cache, so it simply ignores next calls

Defined in: [client/internal/workers/cache/cache.worker.ts:144](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L144)

___

### waitForSetupPromise

• `Private` **waitForSetupPromise**: *Promise*<void\>

A promise that is resolved once the indexed db
has been setup, this doesn't say whether it was succesful
or it failed

Defined in: [client/internal/workers/cache/cache.worker.ts:167](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L167)

___

### waitForSetupPromiseResolve

• `Private` **waitForSetupPromiseResolve**: () => *void*

The resolve function that calls once the resolve has
been set

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/workers/cache/cache.worker.ts:172](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L172)

Defined in: [client/internal/workers/cache/cache.worker.ts:172](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L172)

## Methods

### deleteCachedSearch

▸ **deleteCachedSearch**(`queryName`: *string*, `type`: *by-parent* \| *by-owner*, `arg`: *string* \| [*string*, *string*, *string*]): *Promise*<boolean\>

Deletes a cached search and all the referent values that are related to it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queryName` | *string* | the query name for that cached search   |
`type` | *by-parent* \| *by-owner* | the type of the search   |
`arg` | *string* \| [*string*, *string*, *string*] | either the owner or the parent    |

**Returns:** *Promise*<boolean\>

Defined in: [client/internal/workers/cache/cache.worker.ts:396](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L396)

___

### deleteCachedValue

▸ **deleteCachedValue**(`queryName`: *string*, `id`: *string*, `version`: *string*): *Promise*<boolean\>

Deletes a cached value for a GET request

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queryName` | *string* | the query name of the item definition   |
`id` | *string* | the id to use   |
`version` | *string* | the version (or null)   |

**Returns:** *Promise*<boolean\>

a boolean whether we succeed or not

Defined in: [client/internal/workers/cache/cache.worker.ts:360](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L360)

___

### getCachedValue

▸ **getCachedValue**(`queryName`: *string*, `id`: *string*, `version`: *string*, `requestedFields?`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md)): *Promise*<[*ICacheMatchType*](../interfaces/client_internal_workers_cache_cache_worker.icachematchtype.md)\>

Provides a cached value (all of it) if and only if this matches
the requested fields, it will not return anything (cache miss)
if it doesn't match all the requested fields

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queryName` | *string* | the query name that is necessary to match against   |
`id` | *string* | the id of the item definition instance   |
`version` | *string* | the version of the item definition instance   |
`requestedFields?` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the requested fields from graphql, optional the function will only return if it contains all those requested fields    |

**Returns:** *Promise*<[*ICacheMatchType*](../interfaces/client_internal_workers_cache_cache_worker.icachematchtype.md)\>

Defined in: [client/internal/workers/cache/cache.worker.ts:530](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L530)

___

### mergeCachedValue

▸ **mergeCachedValue**(`queryName`: *string*, `id`: *string*, `version`: *string*, `partialValue`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `partialFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md)): *Promise*<boolean\>

Merges a cached value of an item definition with another if possible
it will perform a total override if the last_modified value do not match
as it doesn't know what else has changed, it can only truly merge
if the signature of time is equal

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queryName` | *string* | the query we are merging for   |
`id` | *string* | the id   |
`version` | *string* | the version (or null)   |
`partialValue` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the partial value we are merging   |
`partialFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the partial fields    |

**Returns:** *Promise*<boolean\>

Defined in: [client/internal/workers/cache/cache.worker.ts:459](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L459)

___

### proxyRoot

▸ **proxyRoot**(`rootProxy`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`rootProxy` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) |

**Returns:** *Promise*<void\>

Defined in: [client/internal/workers/cache/cache.worker.ts:1120](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L1120)

___

### runCachedSearch

▸ **runCachedSearch**(`searchQueryName`: *string*, `searchArgs`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `getListQueryName`: *string*, `getListTokenArg`: *string*, `getListLangArg`: *string*, `getListRequestedFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md), `cachePolicy`: *by-parent* \| *by-owner*, `maxGetListResultsAtOnce`: *number*): *Promise*<[*ICachedSearchResult*](../interfaces/client_internal_workers_cache_cache_worker.icachedsearchresult.md)\>

Runs a search in the cache inside indexeddb rather than using
the server

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`searchQueryName` | *string* | the search query we are running   |
`searchArgs` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the search arguments that would be passed to the server that needs to be accounted for   |
`getListQueryName` | *string* | the get list query name (either for module or item definition)   |
`getListTokenArg` | *string* | the get list token   |
`getListLangArg` | *string* | the get list arg   |
`getListRequestedFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the requested fields for the get list process   |
`cachePolicy` | *by-parent* \| *by-owner* | the cache policy used   |
`maxGetListResultsAtOnce` | *number* | how many results at once you can get for the batching for when preloading every record in the list in the client side    |

**Returns:** *Promise*<[*ICachedSearchResult*](../interfaces/client_internal_workers_cache_cache_worker.icachedsearchresult.md)\>

Defined in: [client/internal/workers/cache/cache.worker.ts:712](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L712)

___

### setBlockedCallback

▸ **setBlockedCallback**(`callback`: (`state`: *boolean*) => *void*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | (`state`: *boolean*) => *void* |

**Returns:** *Promise*<void\>

Defined in: [client/internal/workers/cache/cache.worker.ts:1124](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L1124)

___

### setCachedValue

▸ **setCachedValue**(`queryName`: *string*, `id`: *string*, `version`: *string*, `partialValue`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `partialFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md), `merge?`: *boolean*): *Promise*<boolean\>

sets a cache value, all of it, using a query name, should
be a get query, the id of the item definition and the
value that was retrieved, this value can be a partial value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queryName` | *string* | the query name   |
`id` | *string* | the id of the item definition instance   |
`version` | *string* | the version of the item definition instance   |
`partialValue` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the partial value   |
`partialFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the fields that represent the partial value   |
`merge?` | *boolean* | optional, whether this is because of a merge request    |

**Returns:** *Promise*<boolean\>

Defined in: [client/internal/workers/cache/cache.worker.ts:314](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L314)

___

### setupVersion

▸ **setupVersion**(`version`: *number*): *Promise*<void\>

This actually setups the worker

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`version` | *number* | pass the build number here    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/workers/cache/cache.worker.ts:205](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L205)

___

### updateRecordsOnCachedSearch

▸ **updateRecordsOnCachedSearch**(`searchQueryName`: *string*, `createdByIfKnown`: *string*, `parentTypeIfKnown`: *string*, `parentIdIfKnown`: *string*, `parentVersionIfKnown`: *string*, `newRecords`: [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[], `modifiedRecords`: [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[], `lostRecords`: [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[], `newLastModified`: *string*, `cachePolicy`: *by-parent* \| *by-owner*): *Promise*<boolean\>

Updates a cached search records list by pushing a new record
to the list in front

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`searchQueryName` | *string* | the search query to update   |
`createdByIfKnown` | *string* | the created by (used for by-owner)   |
`parentTypeIfKnown` | *string* | the parent type (user for by-parent)   |
`parentIdIfKnown` | *string* | the parent id (user for by-parent)   |
`parentVersionIfKnown` | *string* | the parent version, or null (user for by-parent)   |
`newRecords` | [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[] | the new records to be added   |
`modifiedRecords` | [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[] | - |
`lostRecords` | [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[] | - |
`newLastModified` | *string* | - |
`cachePolicy` | *by-parent* \| *by-owner* | the cache policy that we are working with    |

**Returns:** *Promise*<boolean\>

Defined in: [client/internal/workers/cache/cache.worker.ts:591](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/workers/cache/cache.worker.ts#L591)
