[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md) / ICacheMatchType

# Interface: ICacheMatchType

[client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md).ICacheMatchType

A cache match for a standard query, basically
contains the value it got with the fields it requested
the value can be null yet it requested many fields, the fields
can also be null to match any field, a null, null combo is common for
deleted or not found values; the fields can have a mismatch
since the value can be blocked

## Table of contents

### Properties

- [fields](client_internal_workers_cache_cache_worker_class.ICacheMatchType.md#fields)
- [value](client_internal_workers_cache_cache_worker_class.ICacheMatchType.md#value)

## Properties

### fields

• **fields**: [`IRQRequestFields`](rq_querier.IRQRequestFields.md)

The fields that can be requested for that value

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:102](https://github.com/onzag/itemize/blob/59702dd5/client/internal/workers/cache/cache.worker.class.ts#L102)

___

### value

• **value**: [`IRQValue`](rq_querier.IRQValue.md)

The value of the match

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:98](https://github.com/onzag/itemize/blob/59702dd5/client/internal/workers/cache/cache.worker.class.ts#L98)
