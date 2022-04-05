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

[client/internal/workers/cache/cache.worker.ts:58](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L58)

___

### gqlValue

• **gqlValue**: [`IGQLEndpointValue`](gql_querier.IGQLEndpointValue.md)

The graphql value that it emulates from the server side

#### Defined in

[client/internal/workers/cache/cache.worker.ts:53](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L53)

___

### lastModified

• **lastModified**: `string`

When was this last search modified

#### Defined in

[client/internal/workers/cache/cache.worker.ts:62](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L62)

___

### sourceRecords

• **sourceRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

The source records that were used in the search

#### Defined in

[client/internal/workers/cache/cache.worker.ts:66](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L66)

___

### sourceResults

• **sourceResults**: [`ICacheMatchType`](client_internal_workers_cache_cache_worker.ICacheMatchType.md)[]

#### Defined in

[client/internal/workers/cache/cache.worker.ts:67](https://github.com/onzag/itemize/blob/f2f29986/client/internal/workers/cache/cache.worker.ts#L67)
