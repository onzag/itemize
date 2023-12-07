[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md) / default

# Class: default

[client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md).default

This class represents a worker that works under the hood
of the main app in order to cache queries coming from the
itemize main provider, this is the most complex cache of
them all, because it supports partial saving and it just
gathers data on top of itself, its not a service worker
it's a standard worker as it needs to access indexed db

## Table of contents

### Constructors

- [constructor](client_internal_workers_cache_cache_worker_class.default.md#constructor)

### Properties

- [badReadsForced](client_internal_workers_cache_cache_worker_class.default.md#badreadsforced)
- [badWritesForced](client_internal_workers_cache_cache_worker_class.default.md#badwritesforced)
- [blockedCallback](client_internal_workers_cache_cache_worker_class.default.md#blockedcallback)
- [config](client_internal_workers_cache_cache_worker_class.default.md#config)
- [db](client_internal_workers_cache_cache_worker_class.default.md#db)
- [isCurrentlyBlocked](client_internal_workers_cache_cache_worker_class.default.md#iscurrentlyblocked)
- [polyfilled](client_internal_workers_cache_cache_worker_class.default.md#polyfilled)
- [resolved](client_internal_workers_cache_cache_worker_class.default.md#resolved)
- [root](client_internal_workers_cache_cache_worker_class.default.md#root)
- [storageFullForced](client_internal_workers_cache_cache_worker_class.default.md#storagefullforced)
- [versionHasBeenSet](client_internal_workers_cache_cache_worker_class.default.md#versionhasbeenset)
- [waitForBlockPromise](client_internal_workers_cache_cache_worker_class.default.md#waitforblockpromise)
- [waitForBlockPromiseResolve](client_internal_workers_cache_cache_worker_class.default.md#waitforblockpromiseresolve)
- [waitForSetupPromise](client_internal_workers_cache_cache_worker_class.default.md#waitforsetuppromise)
- [waitForSetupPromiseResolve](client_internal_workers_cache_cache_worker_class.default.md#waitforsetuppromiseresolve)
- [worker](client_internal_workers_cache_cache_worker_class.default.md#worker)

### Methods

- [\_fileURLAbsoluter](client_internal_workers_cache_cache_worker_class.default.md#_fileurlabsoluter)
- [addEventListenerToStateChange](client_internal_workers_cache_cache_worker_class.default.md#addeventlistenertostatechange)
- [addUnversionedEventListenerToStateChange](client_internal_workers_cache_cache_worker_class.default.md#addunversionedeventlistenertostatechange)
- [deleteCachedSearch](client_internal_workers_cache_cache_worker_class.default.md#deletecachedsearch)
- [deleteCachedValue](client_internal_workers_cache_cache_worker_class.default.md#deletecachedvalue)
- [deleteState](client_internal_workers_cache_cache_worker_class.default.md#deletestate)
- [endInitializationBlock](client_internal_workers_cache_cache_worker_class.default.md#endinitializationblock)
- [forceBadReads](client_internal_workers_cache_cache_worker_class.default.md#forcebadreads)
- [forceBadWrites](client_internal_workers_cache_cache_worker_class.default.md#forcebadwrites)
- [forceStorageFull](client_internal_workers_cache_cache_worker_class.default.md#forcestoragefull)
- [getCachedValue](client_internal_workers_cache_cache_worker_class.default.md#getcachedvalue)
- [mergeCachedValue](client_internal_workers_cache_cache_worker_class.default.md#mergecachedvalue)
- [obtainOneFile](client_internal_workers_cache_cache_worker_class.default.md#obtainonefile)
- [processFilesAt](client_internal_workers_cache_cache_worker_class.default.md#processfilesat)
- [proxyRoot](client_internal_workers_cache_cache_worker_class.default.md#proxyroot)
- [readMetadata](client_internal_workers_cache_cache_worker_class.default.md#readmetadata)
- [readSearchMetadata](client_internal_workers_cache_cache_worker_class.default.md#readsearchmetadata)
- [removeEventListenerToStateChange](client_internal_workers_cache_cache_worker_class.default.md#removeeventlistenertostatechange)
- [removeUnversionedEventListenerToStateChange](client_internal_workers_cache_cache_worker_class.default.md#removeunversionedeventlistenertostatechange)
- [retrieveState](client_internal_workers_cache_cache_worker_class.default.md#retrievestate)
- [retrieveUnversionedStateList](client_internal_workers_cache_cache_worker_class.default.md#retrieveunversionedstatelist)
- [runCachedSearch](client_internal_workers_cache_cache_worker_class.default.md#runcachedsearch)
- [setBlockedCallback](client_internal_workers_cache_cache_worker_class.default.md#setblockedcallback)
- [setCachedValue](client_internal_workers_cache_cache_worker_class.default.md#setcachedvalue)
- [setupVersion](client_internal_workers_cache_cache_worker_class.default.md#setupversion)
- [startInitializationBlock](client_internal_workers_cache_cache_worker_class.default.md#startinitializationblock)
- [storeState](client_internal_workers_cache_cache_worker_class.default.md#storestate)
- [updateRecordsOnCachedSearch](client_internal_workers_cache_cache_worker_class.default.md#updaterecordsoncachedsearch)
- [waitForInitializationBlock](client_internal_workers_cache_cache_worker_class.default.md#waitforinitializationblock)
- [writeMetadata](client_internal_workers_cache_cache_worker_class.default.md#writemetadata)
- [writeSearchMetadata](client_internal_workers_cache_cache_worker_class.default.md#writesearchmetadata)

## Constructors

### constructor

• **new default**(`polyfilled`, `worker?`)

Constructs a new cache worker

#### Parameters

| Name | Type |
| :------ | :------ |
| `polyfilled` | `boolean` |
| `worker?` | [`default`](client_internal_workers_cache_cache_worker_class.default.md) |

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:346](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L346)

## Properties

### badReadsForced

• `Private` **badReadsForced**: `boolean` = `false`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:333](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L333)

___

### badWritesForced

• `Private` **badWritesForced**: `boolean` = `false`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:334](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L334)

___

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

[client/internal/workers/cache/cache.worker.class.ts:301](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L301)

___

### config

• `Private` **config**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:290](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L290)

___

### db

• `Private` **db**: `IDBPDatabase`<[`ICacheDB`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheDB.md)\> = `null`

Represents the indexed db database, as a promise
as the db might be loading even before it is requested
to perform any action

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:276](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L276)

___

### isCurrentlyBlocked

• `Private` **isCurrentlyBlocked**: `boolean`

Whether currently the cache is blocked from
releasing

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:296](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L296)

___

### polyfilled

• `Private` **polyfilled**: `boolean` = `false`

whether to use a polyfilled cache worker

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:321](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L321)

___

### resolved

• `Private` **resolved**: `boolean` = `false`

Whether the promise has been resolved as a boolean

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:317](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L317)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

The comlink proxied root class

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:289](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L289)

___

### storageFullForced

• `Private` **storageFullForced**: `boolean` = `false`

force storage full functionality

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:332](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L332)

___

### versionHasBeenSet

• `Private` **versionHasBeenSet**: `boolean` = `false`

Specifies whether a version has been set for this
database, setting up the version is necessary to setup
the database but it's only necessary to do it once
however many instances might call the same function
when they need the cache, so it simply ignores next calls

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:284](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L284)

___

### waitForBlockPromise

• `Private` **waitForBlockPromise**: `Promise`<`void`\> = `null`

used during initialization to block the execution
of code

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:340](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L340)

___

### waitForBlockPromiseResolve

• `Private` **waitForBlockPromiseResolve**: () => `void` = `null`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:341](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L341)

___

### waitForSetupPromise

• `Private` **waitForSetupPromise**: `Promise`<`void`\>

A promise that is resolved once the indexed db
has been setup, this doesn't say whether it was succesful
or it failed

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:308](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L308)

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

[client/internal/workers/cache/cache.worker.class.ts:313](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L313)

___

### worker

• `Private` **worker**: [`default`](client_internal_workers_cache_cache_worker_class.default.md) = `null`

because we need to repair the cache worker to have some functions
called within the main thread, we need to have this remote one
wrapped inside our main

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:327](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L327)

## Methods

### \_fileURLAbsoluter

▸ `Private` **_fileURLAbsoluter**(`file`, `itemDef`, `include`, `property`, `containerId`, `id`, `version`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md) |
| `itemDef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `containerId` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`string`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:804](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L804)

___

### addEventListenerToStateChange

▸ **addEventListenerToStateChange**(`qualifiedName`, `id`, `version`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |
| `callback` | (`id`: `string`, `version`: `string`, `state`: `any`, `metadata`: [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:508](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L508)

___

### addUnversionedEventListenerToStateChange

▸ **addUnversionedEventListenerToStateChange**(`qualifiedName`, `id`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `callback` | (`id`: `string`, `version`: `string`, `state`: `any`, `metadata`: [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:553](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L553)

___

### deleteCachedSearch

▸ **deleteCachedSearch**(`queryName`, `type`, `owner`, `parent`, `property`): `Promise`<`boolean`\>

Deletes a cached search and all the referent values that are related to it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query name for that cached search |
| `type` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` | the type of the search |
| `owner` | `string` | - |
| `parent` | [`string`, `string`, `string`] | - |
| `property` | [`string`, `string`] | - |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1378](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1378)

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

[client/internal/workers/cache/cache.worker.class.ts:1055](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1055)

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

[client/internal/workers/cache/cache.worker.class.ts:751](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L751)

___

### endInitializationBlock

▸ **endInitializationBlock**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2620](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L2620)

___

### forceBadReads

▸ **forceBadReads**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:381](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L381)

___

### forceBadWrites

▸ **forceBadWrites**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:385](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L385)

___

### forceStorageFull

▸ **forceStorageFull**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:377](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L377)

___

### getCachedValue

▸ **getCachedValue**(`queryName`, `id`, `version`, `requestedFields?`): `Promise`<[`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMatchType.md)\>

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

`Promise`<[`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1571](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1571)

___

### mergeCachedValue

▸ **mergeCachedValue**(`queryName`, `id`, `version`, `partialValue`, `partialFields`, `options?`): `Promise`<`boolean`\>

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
| `options?` | `Object` | - |
| `options.allowFallbackWritesToPolyfill?` | `boolean` | - |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1487](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1487)

___

### obtainOneFile

▸ `Private` **obtainOneFile**(`file`, `itemDef`, `include`, `property`, `containerId`, `id`, `version`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md) |
| `itemDef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `containerId` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:858](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L858)

___

### processFilesAt

▸ `Private` **processFilesAt**(`partialValue`, `itemDef`, `include`, `property`, `containerId`, `id`, `version`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `partialValue` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) |
| `itemDef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `containerId` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:903](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L903)

___

### proxyRoot

▸ **proxyRoot**(`rootProxy`, `config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootProxy` | [`IRootRawJSONDataType`](../interfaces/base_Root.IRootRawJSONDataType.md) |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2591](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L2591)

___

### readMetadata

▸ **readMetadata**(`queryName`, `id`, `version`): `Promise`<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1327](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1327)

___

### readSearchMetadata

▸ **readSearchMetadata**(`queryName`, `searchArgs`, `cachePolicy`, `trackedProperty`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`): `Promise`<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `searchArgs` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` |
| `trackedProperty` | `string` |
| `createdByIfKnown` | `string` |
| `parentTypeIfKnown` | `string` |
| `parentIdIfKnown` | `string` |
| `parentVersionIfKnown` | `string` |

#### Returns

`Promise`<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1256](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1256)

___

### removeEventListenerToStateChange

▸ **removeEventListenerToStateChange**(`qualifiedName`, `id`, `version`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |
| `callback` | (`id`: `string`, `version`: `string`, `state`: `any`, `metadata`: [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:530](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L530)

___

### removeUnversionedEventListenerToStateChange

▸ **removeUnversionedEventListenerToStateChange**(`qualifiedName`, `id`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `callback` | (`id`: `string`, `version`: `string`, `state`: `any`, `metadata`: [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:573](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L573)

___

### retrieveState

▸ **retrieveState**(`qualifiedName`, `id`, `version`): `Promise`<[[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md), [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`<[[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md), [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)]\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:700](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L700)

___

### retrieveUnversionedStateList

▸ **retrieveUnversionedStateList**(`qualifiedName`, `id`): `Promise`<{ `id`: `string` ; `version`: `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |

#### Returns

`Promise`<{ `id`: `string` ; `version`: `string`  }[]\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:663](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L663)

___

### runCachedSearch

▸ **runCachedSearch**(`searchQueryName`, `searchArgs`, `getListQueryName`, `getListTokenArg`, `getListLangArg`, `getListRequestedFields`, `cachePolicy`, `cacheNoLimitOffset`, `trackedProperty`, `maxLimit`, `maxGetListResultsAtOnce`, `returnSources`, `redoSearch`, `redoRecords`, `options?`): `Promise`<[`ICachedSearchResult`](../interfaces/client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md)\>

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
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` | the cache policy used |
| `cacheNoLimitOffset` | `boolean` | - |
| `trackedProperty` | `string` | - |
| `maxLimit` | `number` | - |
| `maxGetListResultsAtOnce` | `number` | how many results at once you can get for the batching for when preloading every record in the list in the client side |
| `returnSources` | `boolean` | - |
| `redoSearch` | `boolean` | - |
| `redoRecords` | `boolean` \| [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | - |
| `options?` | `Object` | - |
| `options.allowFallbackWritesToPolyfill?` | `boolean` | - |

#### Returns

`Promise`<[`ICachedSearchResult`](../interfaces/client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1862](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1862)

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

[client/internal/workers/cache/cache.worker.class.ts:2600](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L2600)

___

### setCachedValue

▸ **setCachedValue**(`queryName`, `id`, `version`, `partialValue`, `partialFields`, `options?`): `Promise`<`boolean`\>

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
| `options?` | `Object` | - |
| `options.allowFallbackWritesToPolyfill?` | `boolean` | - |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:952](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L952)

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

[client/internal/workers/cache/cache.worker.class.ts:393](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L393)

___

### startInitializationBlock

▸ **startInitializationBlock**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2611](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L2611)

___

### storeState

▸ **storeState**(`qualifiedName`, `id`, `version`, `state`, `metadata`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |
| `state` | [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md) |
| `metadata` | [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md) |
| `options?` | `Object` |
| `options.allowFallbackWritesToPolyfill?` | `boolean` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:594](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L594)

___

### updateRecordsOnCachedSearch

▸ **updateRecordsOnCachedSearch**(`searchQueryName`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`, `trackedProperty`, `cachePropertyValue`, `newRecords`, `createdRecords`, `modifiedRecords`, `lostRecords`, `deletedRecords`, `newLastModified`, `cachePolicy`): `Promise`<`boolean`\>

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
| `trackedProperty` | `string` | - |
| `cachePropertyValue` | `string` | - |
| `newRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | the new records to be added |
| `createdRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | - |
| `modifiedRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | - |
| `lostRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | - |
| `deletedRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | - |
| `newLastModified` | `string` | - |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` | the cache policy that we are working with |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1667](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1667)

___

### waitForInitializationBlock

▸ **waitForInitializationBlock**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2627](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L2627)

___

### writeMetadata

▸ **writeMetadata**(`queryName`, `id`, `version`, `metadata`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `id` | `string` |
| `version` | `string` |
| `metadata` | `any` |
| `options?` | `Object` |
| `options.allowFallbackWritesToPolyfill?` | `boolean` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1195](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1195)

___

### writeSearchMetadata

▸ **writeSearchMetadata**(`queryName`, `searchArgs`, `cachePolicy`, `trackedProperty`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`, `metadata`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `searchArgs` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` |
| `trackedProperty` | `string` |
| `createdByIfKnown` | `string` |
| `parentTypeIfKnown` | `string` |
| `parentIdIfKnown` | `string` |
| `parentVersionIfKnown` | `string` |
| `metadata` | `any` |
| `options?` | `Object` |
| `options.allowFallbackWritesToPolyfill?` | `boolean` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1105](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.class.ts#L1105)
