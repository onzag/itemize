[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/errors](../modules/base_errors.md) / EndpointError

# Class: EndpointError

[base/errors](../modules/base_errors.md).EndpointError

An instance version of the error that contains
the raw object data of the error

## Hierarchy

- `Error`

  ↳ **`EndpointError`**

## Table of contents

### Constructors

- [constructor](base_errors.EndpointError.md#constructor)

### Properties

- [data](base_errors.EndpointError.md#data)
- [message](base_errors.EndpointError.md#message)
- [name](base_errors.EndpointError.md#name)
- [stack](base_errors.EndpointError.md#stack)
- [stackTraceLimit](base_errors.EndpointError.md#stacktracelimit)

### Methods

- [captureStackTrace](base_errors.EndpointError.md#capturestacktrace)
- [prepareStackTrace](base_errors.EndpointError.md#preparestacktrace)

## Constructors

### constructor

• **new EndpointError**(`data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) |

#### Overrides

Error.constructor

#### Defined in

[base/errors.ts:84](https://github.com/onzag/itemize/blob/f2db74a5/base/errors.ts#L84)

## Properties

### data

• **data**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[base/errors.ts:82](https://github.com/onzag/itemize/blob/f2db74a5/base/errors.ts#L82)

___

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
