[](../README.md) / [Exports](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / ICacheDB

# Interface: ICacheDB

[client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md).ICacheDB

The cache indexed db database schema

## Hierarchy

* *DBSchema*

  ↳ **ICacheDB**

## Table of contents

### Properties

- [queries](client_internal_workers_cache_cache_worker.icachedb.md#queries)
- [searches](client_internal_workers_cache_cache_worker.icachedb.md#searches)

## Properties

### queries

• **queries**: *object*

Contains all the GET queries

#### Type declaration:

Name | Type |
:------ | :------ |
`key` | *string* |
`value` | [*ICacheMatchType*](client_internal_workers_cache_cache_worker.icachematchtype.md) |

Defined in: [client/internal/workers/cache/cache.worker.ts:103](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/workers/cache/cache.worker.ts#L103)

___

### searches

• **searches**: *object*

Contains all searches, either owned or parented

#### Type declaration:

Name | Type |
:------ | :------ |
`key` | *string* |
`value` | [*ISearchMatchType*](client_internal_workers_cache_cache_worker.isearchmatchtype.md) |

Defined in: [client/internal/workers/cache/cache.worker.ts:110](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/workers/cache/cache.worker.ts#L110)
