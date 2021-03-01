[](../README.md) / [Exports](../modules.md) / [client/internal/workers/cache/cache.worker.search](../modules/client_internal_workers_cache_cache_worker_search.md) / DataCorruptionError

# Class: DataCorruptionError

[client/internal/workers/cache/cache.worker.search](../modules/client_internal_workers_cache_cache_worker_search.md).DataCorruptionError

An instance version of the error that contains
the raw object data of the error

## Hierarchy

* *Error*

  ↳ **DataCorruptionError**

## Table of contents

### Constructors

- [constructor](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md#constructor)

### Properties

- [message](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md#message)
- [name](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md#name)
- [prepareStackTrace](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md#preparestacktrace)
- [stack](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md#stack)
- [stackTraceLimit](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md#stacktracelimit)

### Methods

- [captureStackTrace](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md#capturestacktrace)

## Constructors

### constructor

\+ **new DataCorruptionError**(`message`: *string*): [*DataCorruptionError*](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |

**Returns:** [*DataCorruptionError*](client_internal_workers_cache_cache_worker_search.datacorruptionerror.md)

Defined in: [client/internal/workers/cache/cache.worker.search.ts:45](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/workers/cache/cache.worker.search.ts#L45)

## Properties

### message

• **message**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### prepareStackTrace

• `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`err` | Error |
`stackTraces` | CallSite[] |

**Returns:** *any*

Defined in: node_modules/@types/node/globals.d.ts:115

Defined in: node_modules/@types/node/globals.d.ts:115

___

### stack

• `Optional` **stack**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### stackTraceLimit

• **stackTraceLimit**: *number*

Defined in: node_modules/@types/node/globals.d.ts:117

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
:------ | :------ |
`targetObject` | *object* |
`constructorOpt?` | Function |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:108
