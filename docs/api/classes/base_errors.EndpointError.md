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

- [cause](base_errors.EndpointError.md#cause)
- [data](base_errors.EndpointError.md#data)
- [message](base_errors.EndpointError.md#message)
- [name](base_errors.EndpointError.md#name)
- [stack](base_errors.EndpointError.md#stack)
- [prepareStackTrace](base_errors.EndpointError.md#preparestacktrace)
- [stackTraceLimit](base_errors.EndpointError.md#stacktracelimit)

### Methods

- [captureStackTrace](base_errors.EndpointError.md#capturestacktrace)

## Constructors

### constructor

• **new EndpointError**(`data`): [`EndpointError`](base_errors.EndpointError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) |

#### Returns

[`EndpointError`](base_errors.EndpointError.md)

#### Overrides

Error.constructor

#### Defined in

[base/errors.ts:85](https://github.com/onzag/itemize/blob/59702dd5/base/errors.ts#L85)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### data

• **data**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[base/errors.ts:83](https://github.com/onzag/itemize/blob/59702dd5/base/errors.ts#L83)

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
