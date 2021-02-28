[](../README.md) / [Exports](../modules.md) / [client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md) / ICachedSearchResult

# Interface: ICachedSearchResult

[client/internal/workers/cache/cache.worker](../modules/client_internal_workers_cache_cache_worker.md).ICachedSearchResult

The cached search result is what comes from the cached search
once a search has been performed, it emulates a search done
in the server side; the cache worker creates this

## Table of contents

### Properties

- [dataMightBeStale](client_internal_workers_cache_cache_worker.icachedsearchresult.md#datamightbestale)
- [gqlValue](client_internal_workers_cache_cache_worker.icachedsearchresult.md#gqlvalue)
- [lastModified](client_internal_workers_cache_cache_worker.icachedsearchresult.md#lastmodified)

## Properties

### dataMightBeStale

• **dataMightBeStale**: *boolean*

Whether the data might be stale, as in old data that needs
to be rechecked an update

Defined in: [client/internal/workers/cache/cache.worker.ts:58](https://github.com/onzag/itemize/blob/11a98dec/client/internal/workers/cache/cache.worker.ts#L58)

___

### gqlValue

• **gqlValue**: [*IGQLEndpointValue*](gql_querier.igqlendpointvalue.md)

The graphql value that it emulates from the server side

Defined in: [client/internal/workers/cache/cache.worker.ts:53](https://github.com/onzag/itemize/blob/11a98dec/client/internal/workers/cache/cache.worker.ts#L53)

___

### lastModified

• **lastModified**: *string*

When was this last search modified

Defined in: [client/internal/workers/cache/cache.worker.ts:62](https://github.com/onzag/itemize/blob/11a98dec/client/internal/workers/cache/cache.worker.ts#L62)
