[](../README.md) / [Exports](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / ISearchMatchType

# Interface: ISearchMatchType

[client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md).ISearchMatchType

This is the cached search itself as a list of matches, but not the value
themselves, this is possibly a limited list, and it's always 0 offset
(or it should be) ordered by time of adding (the default)

## Table of contents

### Properties

- [allResultsPreloaded](client_internal_workers_cache_cache_worker.isearchmatchtype.md#allresultspreloaded)
- [fields](client_internal_workers_cache_cache_worker.isearchmatchtype.md#fields)
- [lastModified](client_internal_workers_cache_cache_worker.isearchmatchtype.md#lastmodified)
- [limit](client_internal_workers_cache_cache_worker.isearchmatchtype.md#limit)
- [value](client_internal_workers_cache_cache_worker.isearchmatchtype.md#value)

## Properties

### allResultsPreloaded

• **allResultsPreloaded**: *boolean*

Whether all the records in that list have been preloaded
as matched on the cache itself

Defined in: [client/internal/workers/cache/cache.worker.ts:84](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/workers/cache/cache.worker.ts#L84)

___

### fields

• **fields**: [*IGQLRequestFields*](gql_querier.igqlrequestfields.md)

The fields that were requested and should be contained
in each one of these search matches

Defined in: [client/internal/workers/cache/cache.worker.ts:75](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/workers/cache/cache.worker.ts#L75)

___

### lastModified

• **lastModified**: *string*

The last record date of that records list

Defined in: [client/internal/workers/cache/cache.worker.ts:88](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/workers/cache/cache.worker.ts#L88)

___

### limit

• **limit**: *number*

The limit we limited ourselves to, the list can however
be larger than the limit as it might grow by events

Defined in: [client/internal/workers/cache/cache.worker.ts:93](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/workers/cache/cache.worker.ts#L93)

___

### value

• **value**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

The value as a list of search records

Defined in: [client/internal/workers/cache/cache.worker.ts:79](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/workers/cache/cache.worker.ts#L79)
