[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/workers/cache/cache.worker.search](../modules/client_internal_workers_cache_cache_worker_search.md) / DataCorruptionError

# Class: DataCorruptionError

[client/internal/workers/cache/cache.worker.search](../modules/client_internal_workers_cache_cache_worker_search.md).DataCorruptionError

An instance version of the error that contains
the raw object data of the error

## Hierarchy

- `Error`

  ↳ **`DataCorruptionError`**

## Table of contents

### Constructors

- [constructor](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#constructor)

### Properties

- [cause](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#cause)
- [message](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#message)
- [name](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#name)
- [stack](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#stack)
- [prepareStackTrace](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#preparestacktrace)
- [stackTraceLimit](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#stacktracelimit)

### Methods

- [captureStackTrace](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#capturestacktrace)

## Constructors

### constructor

• **new DataCorruptionError**(`message`): [`DataCorruptionError`](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`DataCorruptionError`](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md)

#### Overrides

Error.constructor

#### Defined in

[client/internal/workers/cache/cache.worker.search.ts:19](https://github.com/onzag/itemize/blob/59702dd5/client/internal/workers/cache/cache.worker.search.ts#L19)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:115

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:117

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:108
