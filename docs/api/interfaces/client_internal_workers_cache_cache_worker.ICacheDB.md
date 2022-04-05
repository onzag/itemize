[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / ICacheDB

# Interface: ICacheDB

[client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md).ICacheDB

The cache indexed db database schema

## Hierarchy

- `DBSchema`

  ↳ **`ICacheDB`**

## Table of contents

### Properties

- [metadata](client_internal_workers_cache_cache_worker.ICacheDB.md#metadata)
- [queries](client_internal_workers_cache_cache_worker.ICacheDB.md#queries)
- [searches](client_internal_workers_cache_cache_worker.ICacheDB.md#searches)
- [states](client_internal_workers_cache_cache_worker.ICacheDB.md#states)

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

[client/internal/workers/cache/cache.worker.ts:141](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L141)

___

### queries

• **queries**: `Object`

Contains all the GET queries

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | [`ICacheMatchType`](client_internal_workers_cache_cache_worker.ICacheMatchType.md) |

#### Defined in

[client/internal/workers/cache/cache.worker.ts:120](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L120)

___

### searches

• **searches**: `Object`

Contains all searches, either owned or parented

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | [`ISearchMatchType`](client_internal_workers_cache_cache_worker.ISearchMatchType.md) |

#### Defined in

[client/internal/workers/cache/cache.worker.ts:127](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L127)

___

### states

• **states**: `Object`

Contains stored states

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Defined in

[client/internal/workers/cache/cache.worker.ts:134](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L134)
