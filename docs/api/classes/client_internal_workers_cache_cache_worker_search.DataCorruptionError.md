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

- [message](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#message)
- [name](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#name)
- [stack](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#stack)
- [stackTraceLimit](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#stacktracelimit)

### Methods

- [captureStackTrace](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#capturestacktrace)
- [prepareStackTrace](client_internal_workers_cache_cache_worker_search.DataCorruptionError.md#preparestacktrace)

## Constructors

### constructor

• **new DataCorruptionError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[client/internal/workers/cache/cache.worker.search.ts:46](https://github.com/onzag/itemize/blob/a24376ed/client/internal/workers/cache/cache.worker.search.ts#L46)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:117

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

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

___

### prepareStackTrace

▸ `Static` `Optional` **prepareStackTrace**(`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:115
