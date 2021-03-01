[](../README.md) / [Exports](../modules.md) / [base/errors](../modules/base_errors.md) / EndpointError

# Class: EndpointError

[base/errors](../modules/base_errors.md).EndpointError

An instance version of the error that contains
the raw object data of the error

## Hierarchy

* *Error*

  ↳ **EndpointError**

## Table of contents

### Constructors

- [constructor](base_errors.endpointerror.md#constructor)

### Properties

- [data](base_errors.endpointerror.md#data)
- [message](base_errors.endpointerror.md#message)
- [name](base_errors.endpointerror.md#name)
- [stack](base_errors.endpointerror.md#stack)
- [prepareStackTrace](base_errors.endpointerror.md#preparestacktrace)
- [stackTraceLimit](base_errors.endpointerror.md#stacktracelimit)

### Methods

- [captureStackTrace](base_errors.endpointerror.md#capturestacktrace)

## Constructors

### constructor

\+ **new EndpointError**(`data`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)): [*EndpointError*](base_errors.endpointerror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`data` | [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype) |

**Returns:** [*EndpointError*](base_errors.endpointerror.md)

Defined in: [base/errors.ts:82](https://github.com/onzag/itemize/blob/55e63f2c/base/errors.ts#L82)

## Properties

### data

• **data**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

Defined in: [base/errors.ts:82](https://github.com/onzag/itemize/blob/55e63f2c/base/errors.ts#L82)

___

### message

• **message**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Optional` `Static` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

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

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Defined in: node_modules/@types/node/globals.d.ts:117

## Methods

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
:------ | :------ |
`targetObject` | *object* |
`constructorOpt?` | Function |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:108
