[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / ISearchMatchType

# Interface: ISearchMatchType

[client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md).ISearchMatchType

This is the cached search itself as a list of matches, but not the value
themselves, this is possibly a limited list, and it's always 0 offset
(or it should be) ordered by time of adding (the default)

## Table of contents

### Properties

- [allResultsPreloaded](client_internal_workers_cache_cache_worker.ISearchMatchType.md#allresultspreloaded)
- [count](client_internal_workers_cache_cache_worker.ISearchMatchType.md#count)
- [fields](client_internal_workers_cache_cache_worker.ISearchMatchType.md#fields)
- [lastModified](client_internal_workers_cache_cache_worker.ISearchMatchType.md#lastmodified)
- [value](client_internal_workers_cache_cache_worker.ISearchMatchType.md#value)

## Properties

### allResultsPreloaded

• **allResultsPreloaded**: `boolean`

Whether all the records in that list have been preloaded
as matched on the cache itself

#### Defined in

[client/internal/workers/cache/cache.worker.ts:106](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L106)

___

### count

• **count**: `number`

the count that is set by the server when it retrieved
it's tried to be kept in sync

#### Defined in

[client/internal/workers/cache/cache.worker.ts:115](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L115)

___

### fields

• **fields**: [`IGQLRequestFields`](gql_querier.IGQLRequestFields.md)

The fields that were requested and should be contained
in each one of these search matches

#### Defined in

[client/internal/workers/cache/cache.worker.ts:97](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L97)

___

### lastModified

• **lastModified**: `string`

The last record date of that records list

#### Defined in

[client/internal/workers/cache/cache.worker.ts:110](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L110)

___

### value

• **value**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

The value as a list of search records

#### Defined in

[client/internal/workers/cache/cache.worker.ts:101](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L101)
