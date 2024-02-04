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

• **new default**(`polyfilled`, `worker?`): [`default`](client_internal_workers_cache_cache_worker_class.default.md)

Constructs a new cache worker

#### Parameters

| Name | Type |
| :------ | :------ |
| `polyfilled` | `boolean` |
| `worker?` | [`default`](client_internal_workers_cache_cache_worker_class.default.md) |

#### Returns

[`default`](client_internal_workers_cache_cache_worker_class.default.md)

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:350](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L350)

## Properties

### badReadsForced

• `Private` **badReadsForced**: `boolean` = `false`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:337](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L337)

___

### badWritesForced

• `Private` **badWritesForced**: `boolean` = `false`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:338](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L338)

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

[client/internal/workers/cache/cache.worker.class.ts:305](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L305)

___

### config

• `Private` **config**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:294](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L294)

___

### db

• `Private` **db**: `IDBPDatabase`\<[`ICacheDB`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheDB.md)\> = `null`

Represents the indexed db database, as a promise
as the db might be loading even before it is requested
to perform any action

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:280](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L280)

___

### isCurrentlyBlocked

• `Private` **isCurrentlyBlocked**: `boolean`

Whether currently the cache is blocked from
releasing

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:300](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L300)

___

### polyfilled

• `Private` **polyfilled**: `boolean` = `false`

whether to use a polyfilled cache worker

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:325](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L325)

___

### resolved

• `Private` **resolved**: `boolean` = `false`

Whether the promise has been resolved as a boolean

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:321](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L321)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

The comlink proxied root class

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:293](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L293)

___

### storageFullForced

• `Private` **storageFullForced**: `boolean` = `false`

force storage full functionality

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:336](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L336)

___

### versionHasBeenSet

• `Private` **versionHasBeenSet**: `boolean` = `false`

Specifies whether a version has been set for this
database, setting up the version is necessary to setup
the database but it's only necessary to do it once
however many instances might call the same function
when they need the cache, so it simply ignores next calls

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:288](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L288)

___

### waitForBlockPromise

• `Private` **waitForBlockPromise**: `Promise`\<`void`\> = `null`

used during initialization to block the execution
of code

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:344](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L344)

___

### waitForBlockPromiseResolve

• `Private` **waitForBlockPromiseResolve**: () => `void` = `null`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:345](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L345)

___

### waitForSetupPromise

• `Private` **waitForSetupPromise**: `Promise`\<`void`\>

A promise that is resolved once the indexed db
has been setup, this doesn't say whether it was succesful
or it failed

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:312](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L312)

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

[client/internal/workers/cache/cache.worker.class.ts:317](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L317)

___

### worker

• `Private` **worker**: [`default`](client_internal_workers_cache_cache_worker_class.default.md) = `null`

because we need to repair the cache worker to have some functions
called within the main thread, we need to have this remote one
wrapped inside our main

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:331](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L331)

## Methods

### \_fileURLAbsoluter

▸ **_fileURLAbsoluter**(`file`, `itemDef`, `include`, `property`, `containerId`, `id`, `version`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) |
| `itemDef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `containerId` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`string`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:808](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L808)

___

### addEventListenerToStateChange

▸ **addEventListenerToStateChange**(`qualifiedName`, `id`, `version`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |
| `callback` | (`id`: `string`, `version`: `string`, `state`: `any`, `metadata`: [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:512](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L512)

___

### addUnversionedEventListenerToStateChange

▸ **addUnversionedEventListenerToStateChange**(`qualifiedName`, `id`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `callback` | (`id`: `string`, `version`: `string`, `state`: `any`, `metadata`: [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:557](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L557)

___

### deleteCachedSearch

▸ **deleteCachedSearch**(`queryName`, `type`, `owner`, `parent`, `property`): `Promise`\<`boolean`\>

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

`Promise`\<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1382](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1382)

___

### deleteCachedValue

▸ **deleteCachedValue**(`queryName`, `id`, `version`): `Promise`\<`boolean`\>

Deletes a cached value for a GET request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query name of the item definition |
| `id` | `string` | the id to use |
| `version` | `string` | the version (or null) |

#### Returns

`Promise`\<`boolean`\>

a boolean whether we succeed or not

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1059](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1059)

___

### deleteState

▸ **deleteState**(`qualifiedName`, `id`, `version`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:755](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L755)

___

### endInitializationBlock

▸ **endInitializationBlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2624](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L2624)

___

### forceBadReads

▸ **forceBadReads**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:385](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L385)

___

### forceBadWrites

▸ **forceBadWrites**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:389](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L389)

___

### forceStorageFull

▸ **forceStorageFull**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:381](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L381)

___

### getCachedValue

▸ **getCachedValue**(`queryName`, `id`, `version`, `requestedFields?`): `Promise`\<[`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMatchType.md)\>

Provides a cached value (all of it) if and only if this matches
the requested fields, it will not return anything (cache miss)
if it doesn't match all the requested fields

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query name that is necessary to match against |
| `id` | `string` | the id of the item definition instance |
| `version` | `string` | the version of the item definition instance |
| `requestedFields?` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the requested fields from rq, optional the function will only return if it contains all those requested fields |

#### Returns

`Promise`\<[`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1575](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1575)

___

### mergeCachedValue

▸ **mergeCachedValue**(`queryName`, `id`, `version`, `partialValue`, `partialFields`, `options?`): `Promise`\<`boolean`\>

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
| `partialValue` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) | the partial value we are merging |
| `partialFields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the partial fields |
| `options?` | `Object` | - |
| `options.allowFallbackWritesToPolyfill?` | `boolean` | - |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1491](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1491)

___

### obtainOneFile

▸ **obtainOneFile**(`file`, `itemDef`, `include`, `property`, `containerId`, `id`, `version`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) |
| `itemDef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `containerId` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:862](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L862)

___

### processFilesAt

▸ **processFilesAt**(`partialValue`, `itemDef`, `include`, `property`, `containerId`, `id`, `version`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `partialValue` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) |
| `itemDef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `containerId` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:907](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L907)

___

### proxyRoot

▸ **proxyRoot**(`rootProxy`, `config`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootProxy` | [`IRootRawJSONDataType`](../interfaces/base_Root.IRootRawJSONDataType.md) |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2595](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L2595)

___

### readMetadata

▸ **readMetadata**(`queryName`, `id`, `version`): `Promise`\<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`\<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1331](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1331)

___

### readSearchMetadata

▸ **readSearchMetadata**(`queryName`, `searchArgs`, `cachePolicy`, `trackedProperty`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`): `Promise`\<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `searchArgs` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` |
| `trackedProperty` | `string` |
| `createdByIfKnown` | `string` |
| `parentTypeIfKnown` | `string` |
| `parentIdIfKnown` | `string` |
| `parentVersionIfKnown` | `string` |

#### Returns

`Promise`\<[`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1260](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1260)

___

### removeEventListenerToStateChange

▸ **removeEventListenerToStateChange**(`qualifiedName`, `id`, `version`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |
| `callback` | (`id`: `string`, `version`: `string`, `state`: `any`, `metadata`: [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:534](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L534)

___

### removeUnversionedEventListenerToStateChange

▸ **removeUnversionedEventListenerToStateChange**(`qualifiedName`, `id`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `callback` | (`id`: `string`, `version`: `string`, `state`: `any`, `metadata`: [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:577](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L577)

___

### retrieveState

▸ **retrieveState**(`qualifiedName`, `id`, `version`): `Promise`\<[[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md), [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |
| `version` | `string` |

#### Returns

`Promise`\<[[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md), [`ICacheStateMetadata`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)]\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:704](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L704)

___

### retrieveUnversionedStateList

▸ **retrieveUnversionedStateList**(`qualifiedName`, `id`): `Promise`\<\{ `id`: `string` ; `version`: `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `id` | `string` |

#### Returns

`Promise`\<\{ `id`: `string` ; `version`: `string`  }[]\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:667](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L667)

___

### runCachedSearch

▸ **runCachedSearch**(`searchQueryName`, `searchArgs`, `getListQueryName`, `getListTokenArg`, `getListLangArg`, `getListRequestedFields`, `cachePolicy`, `cacheNoLimitOffset`, `trackedProperty`, `maxLimit`, `maxGetListResultsAtOnce`, `returnSources`, `redoSearch`, `redoRecords`, `options?`): `Promise`\<[`ICachedSearchResult`](../interfaces/client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md)\>

Runs a search in the cache inside indexeddb rather than using
the server

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchQueryName` | `string` | the search query we are running |
| `searchArgs` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the search arguments that would be passed to the server that needs to be accounted for |
| `getListQueryName` | `string` | the get list query name (either for module or item definition) |
| `getListTokenArg` | `string` | the get list token |
| `getListLangArg` | `string` | the get list arg |
| `getListRequestedFields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the requested fields for the get list process |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` | the cache policy used |
| `cacheNoLimitOffset` | `boolean` | - |
| `trackedProperty` | `string` | - |
| `maxLimit` | `number` | - |
| `maxGetListResultsAtOnce` | `number` | how many results at once you can get for the batching for when preloading every record in the list in the client side |
| `returnSources` | `boolean` | - |
| `redoSearch` | `boolean` | - |
| `redoRecords` | `boolean` \| [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] | - |
| `options?` | `Object` | - |
| `options.allowFallbackWritesToPolyfill?` | `boolean` | - |

#### Returns

`Promise`\<[`ICachedSearchResult`](../interfaces/client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md)\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1866](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1866)

___

### setBlockedCallback

▸ **setBlockedCallback**(`callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`state`: `boolean`) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2604](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L2604)

___

### setCachedValue

▸ **setCachedValue**(`queryName`, `id`, `version`, `partialValue`, `partialFields`, `options?`): `Promise`\<`boolean`\>

sets a cache value, all of it, using a query name, should
be a get query, the id of the item definition and the
value that was retrieved, this value can be a partial value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryName` | `string` | the query name |
| `id` | `string` | the id of the item definition instance |
| `version` | `string` | the version of the item definition instance |
| `partialValue` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) | the partial value |
| `partialFields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the fields that represent the partial value |
| `options?` | `Object` | - |
| `options.allowFallbackWritesToPolyfill?` | `boolean` | - |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:956](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L956)

___

### setupVersion

▸ **setupVersion**(`version`): `Promise`\<`void`\>

This actually setups the worker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | pass the build number here |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:397](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L397)

___

### startInitializationBlock

▸ **startInitializationBlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2615](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L2615)

___

### storeState

▸ **storeState**(`qualifiedName`, `id`, `version`, `state`, `metadata`, `options?`): `Promise`\<`boolean`\>

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

`Promise`\<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:598](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L598)

___

### updateRecordsOnCachedSearch

▸ **updateRecordsOnCachedSearch**(`searchQueryName`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`, `trackedProperty`, `cachePropertyValue`, `newRecords`, `createdRecords`, `modifiedRecords`, `lostRecords`, `deletedRecords`, `newLastModified`, `cachePolicy`): `Promise`\<`boolean`\>

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
| `newRecords` | [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] | the new records to be added |
| `createdRecords` | [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] | - |
| `modifiedRecords` | [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] | - |
| `lostRecords` | [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] | - |
| `deletedRecords` | [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] | - |
| `newLastModified` | `string` | - |
| `cachePolicy` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` | the cache policy that we are working with |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1671](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1671)

___

### waitForInitializationBlock

▸ **waitForInitializationBlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:2631](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L2631)

___

### writeMetadata

▸ **writeMetadata**(`queryName`, `id`, `version`, `metadata`, `options?`): `Promise`\<`boolean`\>

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

`Promise`\<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1199](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1199)

___

### writeSearchMetadata

▸ **writeSearchMetadata**(`queryName`, `searchArgs`, `cachePolicy`, `trackedProperty`, `createdByIfKnown`, `parentTypeIfKnown`, `parentIdIfKnown`, `parentVersionIfKnown`, `metadata`, `options?`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryName` | `string` |
| `searchArgs` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) |
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

`Promise`\<`boolean`\>

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:1109](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L1109)
