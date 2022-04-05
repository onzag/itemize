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

▸ **search**(`rootProxy`, `db`, `searchRecords`, `searchArgs`, `returnSourceResults`): `Promise`<{ `filteredRecords`: [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] ; `sourceResults`: [`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMatchType.md)[]  }\>

Given a bunch of search records it will perform
the ordering and filtering of such records to return
them in place, as such it needs to read from the indexeddb
cache, this is a heavy process

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rootProxy` | [`default`](../classes/base_Root.default.md) | the root proxy we need to extract the functionality for ordering and checking equality |
| `db` | `IDBPDatabase`<[`ICacheDB`](../interfaces/client_internal_workers_cache_cache_worker.ICacheDB.md)\> | the database object |
| `searchRecords` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] | the search records we got |
| `searchArgs` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the search arguments (that would be sent to the server) an we need to emulate for |
| `returnSourceResults` | `boolean` | - |

#### Returns

`Promise`<{ `filteredRecords`: [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] ; `sourceResults`: [`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMatchType.md)[]  }\>

#### Defined in

[client/internal/workers/cache/cache.worker.search.ts:66](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.search.ts#L66)
