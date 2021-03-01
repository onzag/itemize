[](../README.md) / [Exports](../modules.md) / client/internal/workers/cache/cache.worker.search

# Module: client/internal/workers/cache/cache.worker.search

Contains the filtering and ordering function to perform actual searches

## Table of contents

### Classes

- [DataCorruptionError](../classes/client_internal_workers_cache_cache_worker_search.datacorruptionerror.md)

### Functions

- [search](client_internal_workers_cache_cache_worker_search.md#search)

## Functions

### search

▸ **search**(`rootProxy`: [*default*](../classes/base_root.default.md), `db`: *IDBPDatabase*<[*ICacheDB*](../interfaces/client_internal_workers_cache_cache_worker.icachedb.md)\>, `searchRecords`: [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[], `searchArgs`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md)): *Promise*<[*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[]\>

Given a bunch of search records it will perform
the ordering and filtering of such records to return
them in place, as such it needs to read from the indexeddb
cache, this is a heavy process

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rootProxy` | [*default*](../classes/base_root.default.md) | the root proxy we need to extract the functionality for ordering and checking equality   |
`db` | *IDBPDatabase*<[*ICacheDB*](../interfaces/client_internal_workers_cache_cache_worker.icachedb.md)\> | the database object   |
`searchRecords` | [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[] | the search records we got   |
`searchArgs` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the search arguments (that would be sent to the server) an we need to emulate for    |

**Returns:** *Promise*<[*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[]\>

Defined in: [client/internal/workers/cache/cache.worker.search.ts:66](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/workers/cache/cache.worker.search.ts#L66)
