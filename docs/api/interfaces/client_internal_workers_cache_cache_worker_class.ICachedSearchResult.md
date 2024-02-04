[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md) / ICachedSearchResult

# Interface: ICachedSearchResult

[client/internal/workers/cache/cache.worker.class](../modules/client_internal_workers_cache_cache_worker_class.md).ICachedSearchResult

The cached search result is what comes from the cached search
once a search has been performed, it emulates a search done
in the server side; the cache worker creates this

## Table of contents

### Properties

- [dataMightBeStale](client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md#datamightbestale)
- [lastModified](client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md#lastmodified)
- [polyfilled](client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md#polyfilled)
- [rqValue](client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md#rqvalue)
- [sourceRecords](client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md#sourcerecords)
- [sourceResults](client_internal_workers_cache_cache_worker_class.ICachedSearchResult.md#sourceresults)

## Properties

### dataMightBeStale

• **dataMightBeStale**: `boolean`

Whether the data might be stale, as in old data that needs
to be rechecked an update

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:119](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L119)

___

### lastModified

• **lastModified**: `string`

When was this last search modified

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:123](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L123)

___

### polyfilled

• **polyfilled**: `boolean`

Whether the polyfill had to be used in the process say due to errors
while storing with indexedb and if the option to enable writes
to polyfill was allowed

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:141](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L141)

___

### rqValue

• **rqValue**: [`IRQEndpointValue`](rq_querier.IRQEndpointValue.md)

The rq value that it emulates from the server side

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:114](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L114)

___

### sourceRecords

• **sourceRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

The source records that were used in the search, aka all the records that
were searched for in the search, not just the matching ones that were
requested, this list may be very large

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:129](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L129)

___

### sourceResults

• **sourceResults**: [`ICacheMatchType`](client_internal_workers_cache_cache_worker_class.ICacheMatchType.md)[]

The source results that were used in the search, if requested, this
is basically the source records themselves but containing all the fields
and matching data that was available

#### Defined in

[client/internal/workers/cache/cache.worker.class.ts:135](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/cache.worker.class.ts#L135)
