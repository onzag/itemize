[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/workers/cache/cache.worker.search

# Module: client/internal/workers/cache/cache.worker.search

Contains the filtering and ordering function to perform actual searches

## Table of contents

### Classes

- [DataCorruptionError](../classes/client_internal_workers_cache_cache_worker_search.DataCorruptionError.md)

### Functions

- [search](client_internal_workers_cache_cache_worker_search.md#search)

## Functions

### search

▸ **search**(`rootProxy`, `db`, `searchRecords`, `searchArgs`, `returnSourceResults`, `cacheNoLimitOffset`): `Promise`\<\{ `count`: `number` ; `filteredRecords`: [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] ; `filteredResults`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md)[] ; `sourceResults`: [`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMatchType.md)[]  }\>

Given a bunch of search records it will perform
the ordering and filtering of such records to return
them in place, as such it needs to read from the indexeddb
cache, this is a heavy process

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rootProxy` | [`default`](../classes/base_Root.default.md) | the root proxy we need to extract the functionality for ordering and checking equality |
| `db` | `IDBPDatabase`\<[`ICacheDB`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheDB.md)\> | the database object |
| `searchRecords` | [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] | the search records we got |
| `searchArgs` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the search arguments (that would be sent to the server) an we need to emulate for |
| `returnSourceResults` | `boolean` | - |
| `cacheNoLimitOffset` | `boolean` | - |

#### Returns

`Promise`\<\{ `count`: `number` ; `filteredRecords`: [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] ; `filteredResults`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md)[] ; `sourceResults`: [`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMatchType.md)[]  }\>

#### Defined in

[client/internal/workers/cache/cache.worker.search.ts:39](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.search.ts#L39)
