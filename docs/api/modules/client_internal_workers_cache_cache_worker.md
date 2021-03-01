[](../README.md) / [Exports](../modules.md) / client/internal/workers/cache/cache.worker

# Module: client/internal/workers/cache/cache.worker

This is the cache worker itself, the cache worker allows to store
queries to singular item definition values as well as it allows
to store searched in owner or parented search mode and perform
emulated searches within it

## Table of contents

### Classes

- [default](../classes/client_internal_workers_cache_cache_worker.default.md)

### Interfaces

- [ICacheDB](../interfaces/client_internal_workers_cache_cache_worker.icachedb.md)
- [ICacheMatchType](../interfaces/client_internal_workers_cache_cache_worker.icachematchtype.md)
- [ICachedSearchResult](../interfaces/client_internal_workers_cache_cache_worker.icachedsearchresult.md)
- [ISearchMatchType](../interfaces/client_internal_workers_cache_cache_worker.isearchmatchtype.md)

### Variables

- [CACHE\_NAME](client_internal_workers_cache_cache_worker.md#cache_name)
- [QUERIES\_TABLE\_NAME](client_internal_workers_cache_cache_worker.md#queries_table_name)
- [SEARCHES\_TABLE\_NAME](client_internal_workers_cache_cache_worker.md#searches_table_name)

## Variables

### CACHE\_NAME

• `Const` **CACHE\_NAME**: *ITEMIZE_CACHE*= "ITEMIZE\_CACHE"

Defined in: [client/internal/workers/cache/cache.worker.ts:117](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/workers/cache/cache.worker.ts#L117)

___

### QUERIES\_TABLE\_NAME

• `Const` **QUERIES\_TABLE\_NAME**: *queries*= "queries"

Defined in: [client/internal/workers/cache/cache.worker.ts:119](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/workers/cache/cache.worker.ts#L119)

___

### SEARCHES\_TABLE\_NAME

• `Const` **SEARCHES\_TABLE\_NAME**: *searches*= "searches"

Defined in: [client/internal/workers/cache/cache.worker.ts:120](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/workers/cache/cache.worker.ts#L120)
