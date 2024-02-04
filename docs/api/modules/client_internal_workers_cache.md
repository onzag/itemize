[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/workers/cache

# Module: client/internal/workers/cache

This is the cache worker injection file that will inject the cache worker
if it's possible, it also allows for importing it from anywhere in the app
the cache worker can be accessed easily as such

## Table of contents

### Variables

- [default](client_internal_workers_cache.md#default)

## Variables

### default

• `Const` **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getProxy` | (`obj`: `unknown`) => `ProxyMarked` |
| `instance` | `Remote`\<[`default`](../classes/client_internal_workers_cache_cache_worker_class.default.md)\> |
| `isPolyfilled` | `boolean` |
| `isSupportedAsWorker` | `boolean` |

#### Defined in

[client/internal/workers/cache/index.ts:77](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/workers/cache/index.ts#L77)
