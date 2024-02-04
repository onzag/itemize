[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md) / ISearchMatchType

# Interface: ISearchMatchType

[client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md).ISearchMatchType

This is the cached search itself as a list of matches, but not the value
themselves, this is possibly a limited list, and it's always 0 offset
(or it should be) ordered by time of adding (the default)

## Table of contents

### Properties

- [allResultsPreloaded](client_internal_workers_cache_cache_worker_class.ISearchMatchType.md#allresultspreloaded)
- [count](client_internal_workers_cache_cache_worker_class.ISearchMatchType.md#count)
- [fields](client_internal_workers_cache_cache_worker_class.ISearchMatchType.md#fields)
- [lastModified](client_internal_workers_cache_cache_worker_class.ISearchMatchType.md#lastmodified)
- [value](client_internal_workers_cache_cache_worker_class.ISearchMatchType.md#value)

## Properties

### allResultsPreloaded

• **allResultsPreloaded**: `boolean`

Whether all the records in that list have been preloaded
as matched on the cache itself

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:163](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L163)

___

### count

• **count**: `number`

the count that is set by the server when it retrieved
it's tried to be kept in sync

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:172](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L172)

___

### fields

• **fields**: [`IRQRequestFields`](rq_querier.IRQRequestFields.md)

The fields that were requested and should be contained
in each one of these search matches

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:154](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L154)

___

### lastModified

• **lastModified**: `string`

The last record date of that records list

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:167](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L167)

___

### value

• **value**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

The value as a list of search records

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:158](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L158)
