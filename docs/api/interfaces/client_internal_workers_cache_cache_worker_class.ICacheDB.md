[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md) / ICacheDB

# Interface: ICacheDB

[client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md).ICacheDB

The cache indexed db database schema

## Hierarchy

- `DBSchema`

  ↳ **`ICacheDB`**

## Table of contents

### Properties

- [metadata](client_internal_workers_cache_cache_worker_class.ICacheDB.md#metadata)
- [queries](client_internal_workers_cache_cache_worker_class.ICacheDB.md#queries)
- [searches](client_internal_workers_cache_cache_worker_class.ICacheDB.md#searches)
- [states](client_internal_workers_cache_cache_worker_class.ICacheDB.md#states)

## Properties

### metadata

• **metadata**: `Object`

Metadata stuff

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:213](https://github.com/onzag/itemize/blob/59702dd5/client/internal/workers/cache/cache.worker.class.ts#L213)

___

### queries

• **queries**: `Object`

Contains all the GET queries

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | [`ICacheMatchType`](client_internal_workers_cache_cache_worker_class.ICacheMatchType.md) |

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:189](https://github.com/onzag/itemize/blob/59702dd5/client/internal/workers/cache/cache.worker.class.ts#L189)

___

### searches

• **searches**: `Object`

Contains all searches, either owned or parented

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | [`ISearchMatchType`](client_internal_workers_cache_cache_worker_class.ISearchMatchType.md) |

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:196](https://github.com/onzag/itemize/blob/59702dd5/client/internal/workers/cache/cache.worker.class.ts#L196)

___

### states

• **states**: `Object`

Contains stored states

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | \{ `metadata`: [`ICacheStateMetadata`](client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md) ; `state`: [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md)  } |
| `value.metadata` | [`ICacheStateMetadata`](client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md) |
| `value.state` | [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) |

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:203](https://github.com/onzag/itemize/blob/59702dd5/client/internal/workers/cache/cache.worker.class.ts#L203)
