[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / ICachedSearchResult

# Interface: ICachedSearchResult

[client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md).ICachedSearchResult

The cached search result is what comes from the cached search
once a search has been performed, it emulates a search done
in the server side; the cache worker creates this

## Table of contents

### Properties

- [dataMightBeStale](client_internal_workers_cache_cache_worker.ICachedSearchResult.md#datamightbestale)
- [gqlValue](client_internal_workers_cache_cache_worker.ICachedSearchResult.md#gqlvalue)
- [lastModified](client_internal_workers_cache_cache_worker.ICachedSearchResult.md#lastmodified)
- [sourceRecords](client_internal_workers_cache_cache_worker.ICachedSearchResult.md#sourcerecords)
- [sourceResults](client_internal_workers_cache_cache_worker.ICachedSearchResult.md#sourceresults)

## Properties

### dataMightBeStale

• **dataMightBeStale**: `boolean`

Whether the data might be stale, as in old data that needs
to be rechecked an update

#### Defined in

[client/internal/workers/cache/cache.worker.ts:68](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L68)

___

### gqlValue

• **gqlValue**: [`IGQLEndpointValue`](gql_querier.IGQLEndpointValue.md)

The graphql value that it emulates from the server side

#### Defined in

[client/internal/workers/cache/cache.worker.ts:63](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L63)

___

### lastModified

• **lastModified**: `string`

When was this last search modified

#### Defined in

[client/internal/workers/cache/cache.worker.ts:72](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L72)

___

### sourceRecords

• **sourceRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

The source records that were used in the search, aka all the records that
were searched for in the search, not just the matching ones that were
requested, this list may be very large

#### Defined in

[client/internal/workers/cache/cache.worker.ts:78](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L78)

___

### sourceResults

• **sourceResults**: [`ICacheMatchType`](client_internal_workers_cache_cache_worker.ICacheMatchType.md)[]

The source results that were used in the search, if requested, this
is basically the source records themselves but containing all the fields
and matching data that was available

#### Defined in

[client/internal/workers/cache/cache.worker.ts:84](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/workers/cache/cache.worker.ts#L84)
