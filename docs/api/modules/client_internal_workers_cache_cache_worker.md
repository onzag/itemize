[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/workers/cache/cache.worker

# Module: client/internal/workers/cache/cache.worker

This is the cache worker itself, the cache worker allows to store
queries to singular item definition values as well as it allows
to store searched in owner or parented search mode and perform
emulated searches within it

## Table of contents

### Classes

- [default](../classes/client_internal_workers_cache_cache_worker.default.md)

### Interfaces

- [ICacheDB](../interfaces/client_internal_workers_cache_cache_worker.ICacheDB.md)
- [ICacheMatchType](../interfaces/client_internal_workers_cache_cache_worker.ICacheMatchType.md)
- [ICacheMetadataMatchType](../interfaces/client_internal_workers_cache_cache_worker.ICacheMetadataMatchType.md)
- [ICachedSearchResult](../interfaces/client_internal_workers_cache_cache_worker.ICachedSearchResult.md)
- [ISearchMatchType](../interfaces/client_internal_workers_cache_cache_worker.ISearchMatchType.md)

### Variables

- [CACHE\_NAME](client_internal_workers_cache_cache_worker.md#cache_name)
- [METADATA\_TABLE\_NAME](client_internal_workers_cache_cache_worker.md#metadata_table_name)
- [QUERIES\_TABLE\_NAME](client_internal_workers_cache_cache_worker.md#queries_table_name)
- [SEARCHES\_TABLE\_NAME](client_internal_workers_cache_cache_worker.md#searches_table_name)
- [STATES\_TABLE\_NAME](client_internal_workers_cache_cache_worker.md#states_table_name)

## Variables

### CACHE\_NAME

• **CACHE\_NAME**: ``"ITEMIZE_CACHE"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:148](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L148)

___

### METADATA\_TABLE\_NAME

• **METADATA\_TABLE\_NAME**: ``"metadata"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:153](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L153)

___

### QUERIES\_TABLE\_NAME

• **QUERIES\_TABLE\_NAME**: ``"queries"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:150](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L150)

___

### SEARCHES\_TABLE\_NAME

• **SEARCHES\_TABLE\_NAME**: ``"searches"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:151](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L151)

___

### STATES\_TABLE\_NAME

• **STATES\_TABLE\_NAME**: ``"states"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:152](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/workers/cache/cache.worker.ts#L152)
