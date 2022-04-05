[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / default

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
- [deleteState](client_internal_workers_cache_cache_worker.default.md#deletestate)
- [getCachedValue](client_internal_workers_cache_cache_worker.default.md#getcachedvalue)
- [mergeCachedValue](client_internal_workers_cache_cache_worker.default.md#mergecachedvalue)
- [proxyRoot](client_internal_workers_cache_cache_worker.default.md#proxyroot)
- [readMetadata](client_internal_workers_cache_cache_worker.default.md#readmetadata)
- [readSearchMetadata](client_internal_workers_cache_cache_worker.default.md#readsearchmetadata)
- [retrieveState](client_internal_workers_cache_cache_worker.default.md#retrievestate)
- [runCachedSearch](client_internal_workers_cache_cache_worker.default.md#runcachedsearch)
- [setBlockedCallback](client_internal_workers_cache_cache_worker.default.md#setblockedcallback)
- [setCachedValue](client_internal_workers_cache_cache_worker.default.md#setcachedvalue)
- [setupVersion](client_internal_workers_cache_cache_worker.default.md#setupversion)
- [storeState](client_internal_workers_cache_cache_worker.default.md#storestate)
- [updateRecordsOnCachedSearch](client_internal_workers_cache_cache_worker.default.md#updaterecordsoncachedsearch)
- [writeMetadata](client_internal_workers_cache_cache_worker.default.md#writemetadata)
- [writeSearchMetadata](client_internal_workers_cache_cache_worker.default.md#writesearchmetadata)

## Constructors

### constructor

• **new default**()

Constructs a new cache worker

#### Defined in

[client/internal/workers/cache/cache.worker.ts:214](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L214)

## Properties

### blockedCallback

• `Private` **blockedCallback**: (`state`: `boolean`) => `void`

#### Type declaration

▸ (`state`): `void`

a function to call once the blocked changes state

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

##### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.ts:193](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L193)

___

### db

• `Private` **db**: `IDBPDatabase`<[`ICacheDB`](../interfaces/client_internal_workers_cache_cache_worker.ICacheDB.md)\> = `null`

Represents the indexed db database, as a promise
as the db might be loading even before it is requested
to perform any action

#### Defined in

[client/internal/workers/cache/cache.worker.ts:169](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L169)

___

### isCurrentlyBlocked

• `Private` **isCurrentlyBlocked**: `boolean`

Whether currently the cache is blocked from
releasing

#### Defined in

[client/internal/workers/cache/cache.worker.ts:188](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L188)

___

### resolved

• `Private` **resolved**: `boolean` = `false`

Whether the promise has been resolved as a boolean

#### Defined in

[client/internal/workers/cache/cache.worker.ts:209](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L209)

___

### rootProxy

• `Private` **rootProxy**: [`default`](base_Root.default.md)

The comlink proxied root class

#### Defined in

[client/internal/workers/cache/cache.worker.ts:182](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L182)

___

### versionHasBeenSet

• `Private` **versionHasBeenSet**: `boolean` = `false`

Specifies whether a version has been set for this
database, setting up the version is necessary to setup
the database but it's only necessary to do it once
however many instances might call the same function
when they need the cache, so it simply ignores next calls

#### Defined in

[client/internal/workers/cache/cache.worker.ts:177](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L177)

___

### waitForSetupPromise

• `Private` **waitForSetupPromise**: `Promise`<`void`\>

A promise that is resolved once the indexed db
has been setup, this doesn't say whether it was succesful
or it failed

#### Defined in

[client/internal/workers/cache/cache.worker.ts:200](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L200)

___

### waitForSetupPromiseResolve

• `Private` **waitForSetupPromiseResolve**: () => `void`

#### Type declaration

▸ (): `void`

The resolve function that calls once the resolve has
been set

##### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.ts:205](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L205)

## Methods

### deleteCachedSearch

▸ **deleteCachedSearch**(`queryName`, `type`, `owner`, `parent`): `Promise`<`boolean`\>

Deletes a cached search and all the referent values that are related to it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query name for that cached search |
| `type` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` | the type of the search |
| `owner` | `string` | - |
| `parent` | [`string`, `string`, `string`] | - |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:666](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L666)

___

### deleteCachedValue

▸ **deleteCachedValue**(`queryName`, `id`, `version`): `Promise`<`boolean`\>

Deletes a cached value for a GET request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query name of the item definition |
| `id` | `string` | the id to use |
| `version` | `string` | the version (or null) |

#### Returns

`Promise`<`boolean`\>

a boolean whether we succeed or not

#### Defined in

[client/internal/workers/cache/cache.worker.ts:487](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L487)

___

### deleteState

▸ **deleteState**(`qualifiedName`, `id`, `version`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:400](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L400)

___

### getCachedValue

▸ **getCachedValue**(`queryName`, `id`, `version`, `requestedFields?`): `Promise`<[`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMatchType.md)\>

Provides a cached value (all of it) if and only if this matches
the requested fields, it will not return anything (cache miss)
if it doesn't match all the requested fields

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query name that is necessary to match against |
| `id` | `string` | the id of the item definition instance |
| `version` | `string` | the version of the item definition instance |
| `requestedFields?` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the requested fields from graphql, optional the function will only return if it contains all those requested fields |

#### Returns

`Promise`<[`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:803](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L803)

___

### mergeCachedValue

▸ **mergeCachedValue**(`queryName`, `id`, `version`, `partialValue`, `partialFields`): `Promise`<`boolean`\>

Merges a cached value of an item definition with another if possible
it will perform a total override if the last_modified value do not match
as it doesn't know what else has changed, it can only truly merge
if the signature of time is equal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query we are merging for |
| `id` | `string` | the id |
| `version` | `string` | the version (or null) |
| `partialValue` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the partial value we are merging |
| `partialFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the partial fields |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:732](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L732)

___

### proxyRoot

▸ **proxyRoot**(`rootProxy`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootProxy` | [`IRootRawJSONDataType`](../interfaces/base_Root.IRootRawJSONDataType.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:1479](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L1479)

___

### readMetadata

▸ **readMetadata**(`queryName`, `id`, `version`): `Promise`<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMetadataMatchType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMetadataMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:634](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L634)

___

### readSearchMetadata

▸ **readSearchMetadata**(`queryName`, `cachePolicy`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`): `Promise`<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMetadataMatchType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` |
| `createdByIfKnown` | `string` |
| `parentTypeIfKnown` | `string` |
| `parentIdIfKnown` | `string` |
| `parentVersionIfKnown` | `string` |

#### Returns

`Promise`<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMetadataMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:597](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L597)

___

### retrieveState

▸ **retrieveState**(`qualifiedName`, `id`, `version`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:372](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L372)

___

### runCachedSearch

▸ **runCachedSearch**(`searchQueryName`, `searchArgs`, `getListQueryName`, `getListTokenArg`, `getListLangArg`, `getListRequestedFields`, `cachePolicy`, `maxGetListResultsAtOnce`, `returnSources`, `redoSearch`, `redoRecords`): `Promise`<[`ICachedSearchResult`](../interfaces/client_internal_workers_cache_cache_worker.ICachedSearchResult.md)\>

Runs a search in the cache inside indexeddb rather than using
the server

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchQueryName` | `string` | the search query we are running |
| `searchArgs` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the search arguments that would be passed to the server that needs to be accounted for |
| `getListQueryName` | `string` | the get list query name (either for module or item definition) |
| `getListTokenArg` | `string` | the get list token |
| `getListLangArg` | `string` | the get list arg |
| `getListRequestedFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the requested fields for the get list process |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` | the cache policy used |
| `maxGetListResultsAtOnce` | `number` | how many results at once you can get for the batching for when preloading every record in the list in the client side |
| `returnSources` | `boolean` | - |
| `redoSearch` | `boolean` | - |
| `redoRecords` | `boolean` \| [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | - |

#### Returns

`Promise`<[`ICachedSearchResult`](../interfaces/client_internal_workers_cache_cache_worker.ICachedSearchResult.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:1004](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L1004)

___

### setBlockedCallback

▸ **setBlockedCallback**(`callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`state`: `boolean`) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:1483](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L1483)

___

### setCachedValue

▸ **setCachedValue**(`queryName`, `id`, `version`, `partialValue`, `partialFields`, `merge?`): `Promise`<`boolean`\>

sets a cache value, all of it, using a query name, should
be a get query, the id of the item definition and the
value that was retrieved, this value can be a partial value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query name |
| `id` | `string` | the id of the item definition instance |
| `version` | `string` | the version of the item definition instance |
| `partialValue` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the partial value |
| `partialFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the fields that represent the partial value |
| `merge?` | `boolean` | optional, whether this is because of a merge request |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:441](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L441)

___

### setupVersion

▸ **setupVersion**(`version`): `Promise`<`void`\>

This actually setups the worker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | pass the build number here |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:238](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L238)

___

### storeState

▸ **storeState**(`qualifiedName`, `id`, `version`, `value`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |
| `value` | `any` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:341](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L341)

___

### updateRecordsOnCachedSearch

▸ **updateRecordsOnCachedSearch**(`searchQueryName`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`, `newRecords`, `modifiedRecords`, `lostRecords`, `newLastModified`, `cachePolicy`): `Promise`<`boolean`\>

Updates a cached search records list by pushing a new record
to the list in front

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchQueryName` | `string` | the search query to update |
| `createdByIfKnown` | `string` | the created by (used for by-owner) |
| `parentTypeIfKnown` | `string` | the parent type (user for by-parent) |
| `parentIdIfKnown` | `string` | the parent id (user for by-parent) |
| `parentVersionIfKnown` | `string` | the parent version, or null (user for by-parent) |
| `newRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | the new records to be added |
| `modifiedRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | - |
| `lostRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | - |
| `newLastModified` | `string` | - |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` | the cache policy that we are working with |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:864](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L864)

___

### writeMetadata

▸ **writeMetadata**(`queryName`, `id`, `version`, `metadata`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `id` | `string` |
| `version` | `string` |
| `metadata` | `any` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:563](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L563)

___

### writeSearchMetadata

▸ **writeSearchMetadata**(`queryName`, `cachePolicy`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`, `metadata`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` |
| `createdByIfKnown` | `string` |
| `parentTypeIfKnown` | `string` |
| `parentIdIfKnown` | `string` |
| `parentVersionIfKnown` | `string` |
| `metadata` | `any` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.ts:518](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L518)
