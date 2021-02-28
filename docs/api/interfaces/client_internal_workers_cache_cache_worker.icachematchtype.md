[](../README.md) / [Exports](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / ICacheMatchType

# Interface: ICacheMatchType

[client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md).ICacheMatchType

A cache match for a standard query, basically
contains the value it got with the fields it requested
the value can be null yet it requested many fields, the fields
can also be null to match any field, a null, null combo is common for
deleted or not found values; the fields can have a mismatch
since the value can be blocked

## Table of contents

### Properties

- [fields](client_internal_workers_cache_cache_worker.icachematchtype.md#fields)
- [value](client_internal_workers_cache_cache_worker.icachematchtype.md#value)

## Properties

### fields

• **fields**: [*IGQLRequestFields*](gql_querier.igqlrequestfields.md)

The fields that can be requested for that value

Defined in: [client/internal/workers/cache/cache.worker.ts:41](https://github.com/onzag/itemize/blob/11a98dec/client/internal/workers/cache/cache.worker.ts#L41)

___

### value

• **value**: [*IGQLValue*](gql_querier.igqlvalue.md)

The value of the match

Defined in: [client/internal/workers/cache/cache.worker.ts:37](https://github.com/onzag/itemize/blob/11a98dec/client/internal/workers/cache/cache.worker.ts#L37)
