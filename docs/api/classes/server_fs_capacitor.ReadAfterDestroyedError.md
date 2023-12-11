[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/fs-capacitor](../modules/server_fs_capacitor.md) / ReadAfterDestroyedError

# Class: ReadAfterDestroyedError

[server/fs-capacitor](../modules/server_fs_capacitor.md).ReadAfterDestroyedError

## Hierarchy

- `Error`

  ↳ **`ReadAfterDestroyedError`**

## Table of contents

### Constructors

- [constructor](server_fs_capacitor.ReadAfterDestroyedError.md#constructor)

### Properties

- [cause](server_fs_capacitor.ReadAfterDestroyedError.md#cause)
- [message](server_fs_capacitor.ReadAfterDestroyedError.md#message)
- [name](server_fs_capacitor.ReadAfterDestroyedError.md#name)
- [stack](server_fs_capacitor.ReadAfterDestroyedError.md#stack)
- [prepareStackTrace](server_fs_capacitor.ReadAfterDestroyedError.md#preparestacktrace)
- [stackTraceLimit](server_fs_capacitor.ReadAfterDestroyedError.md#stacktracelimit)

### Methods

- [captureStackTrace](server_fs_capacitor.ReadAfterDestroyedError.md#capturestacktrace)

## Constructors

### constructor

• **new ReadAfterDestroyedError**(`message?`): [`ReadAfterDestroyedError`](server_fs_capacitor.ReadAfterDestroyedError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Returns

[`ReadAfterDestroyedError`](server_fs_capacitor.ReadAfterDestroyedError.md)

#### Inherited from

Error.constructor

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1059

• **new ReadAfterDestroyedError**(`message?`, `options?`): [`ReadAfterDestroyedError`](server_fs_capacitor.ReadAfterDestroyedError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |
| `options?` | `ErrorOptions` |

#### Returns

[`ReadAfterDestroyedError`](server_fs_capacitor.ReadAfterDestroyedError.md)

#### Inherited from

Error.constructor

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:30

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
