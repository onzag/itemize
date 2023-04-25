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

### Functions

- [fixFilesURLAt](client_internal_workers_cache_cache_worker.md#fixfilesurlat)

## Variables

### CACHE\_NAME

• **CACHE\_NAME**: ``"ITEMIZE_CACHE"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:200](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L200)

___

### METADATA\_TABLE\_NAME

• **METADATA\_TABLE\_NAME**: ``"metadata"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:205](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L205)

___

### QUERIES\_TABLE\_NAME

• **QUERIES\_TABLE\_NAME**: ``"queries"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:202](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L202)

___

### SEARCHES\_TABLE\_NAME

• **SEARCHES\_TABLE\_NAME**: ``"searches"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:203](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L203)

___

### STATES\_TABLE\_NAME

• **STATES\_TABLE\_NAME**: ``"states"``

#### Defined in

[client/internal/workers/cache/cache.worker.ts:204](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L204)

## Functions

### fixFilesURLAt

▸ **fixFilesURLAt**(`partialValue`, `itemDef`, `include`, `property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `partialValue` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) |
| `itemDef` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |

#### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.ts:170](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L170)
