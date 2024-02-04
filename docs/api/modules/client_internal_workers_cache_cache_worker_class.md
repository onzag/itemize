[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/workers/cache/cache.worker.class

# Module: client/internal/workers/cache/cache.worker.class

This is the cache worker itself, the cache worker allows to store
queries to singular item definition values as well as it allows
to store searched in owner or parented search mode and perform
emulated searches within it

## Table of contents

### Classes

- [default](../classes/client_internal_workers_cache_cache_worker_class.default.md)

### Interfaces

- [ICacheDB](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheDB.md)
- [ICacheMatchType](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMatchType.md)
- [ICacheMetadataMatchType](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md)
- [ICacheStateMetadata](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md)
- [ICachedSearchResult](../interfaces/client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md)
- [ISearchMatchType](../interfaces/client_internal_workers_cache_cache_worker_class.ISearchMatchType.md)

### Variables

- [CACHE\_NAME](client_internal_workers_cache_cache_worker_class.md#cache_name)
- [METADATA\_TABLE\_NAME](client_internal_workers_cache_cache_worker_class.md#metadata_table_name)
- [POLYFILLED\_INDEXED\_DB](client_internal_workers_cache_cache_worker_class.md#polyfilled_indexed_db)
- [QUERIES\_TABLE\_NAME](client_internal_workers_cache_cache_worker_class.md#queries_table_name)
- [SEARCHES\_TABLE\_NAME](client_internal_workers_cache_cache_worker_class.md#searches_table_name)
- [STATES\_TABLE\_NAME](client_internal_workers_cache_cache_worker_class.md#states_table_name)

### Functions

- [fixFilesURLAt](client_internal_workers_cache_cache_worker_class.md#fixfilesurlat)
- [validateCustomIdVersion](client_internal_workers_cache_cache_worker_class.md#validatecustomidversion)

## Variables

### CACHE\_NAME

• `Const` **CACHE\_NAME**: ``"ITEMIZE_CACHE"``

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:264](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L264)

___

### METADATA\_TABLE\_NAME

• `Const` **METADATA\_TABLE\_NAME**: ``"metadata"``

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:51](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L51)

___

### POLYFILLED\_INDEXED\_DB

• `Const` **POLYFILLED\_INDEXED\_DB**: `Object` = `{}`

#### Index signature

▪ [storeName: `string`]: \{ `[key: string]`: `any`;  }

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:54](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L54)

___

### QUERIES\_TABLE\_NAME

• `Const` **QUERIES\_TABLE\_NAME**: ``"queries"``

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:48](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L48)

___

### SEARCHES\_TABLE\_NAME

• `Const` **SEARCHES\_TABLE\_NAME**: ``"searches"``

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:49](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L49)

___

### STATES\_TABLE\_NAME

• `Const` **STATES\_TABLE\_NAME**: ``"states"``

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:50](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L50)

## Functions

### fixFilesURLAt

▸ **fixFilesURLAt**(`partialValue`, `itemDef`, `include`, `property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `partialValue` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) |
| `itemDef` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |

#### Returns

`void`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:234](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L234)

___

### validateCustomIdVersion

▸ **validateCustomIdVersion**(`idOrVersion`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrVersion` | `string` |

#### Returns

`boolean`

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:28](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L28)
