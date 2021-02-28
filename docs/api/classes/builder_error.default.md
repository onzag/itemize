[](../README.md) / [Exports](../modules.md) / [builder/Error](../modules/builder_error.md) / default

# Class: default

[builder/Error](../modules/builder_error.md).default

This class is able to display nicely a traceback object from
the traceback class in order to know where errors came from during
the building and checking process

## Hierarchy

* *Error*

  ↳ **default**

## Table of contents

### Constructors

- [constructor](builder_error.default.md#constructor)

### Properties

- [message](builder_error.default.md#message)
- [name](builder_error.default.md#name)
- [prepareStackTrace](builder_error.default.md#preparestacktrace)
- [stack](builder_error.default.md#stack)
- [stackTraceLimit](builder_error.default.md#stacktracelimit)
- [traceback](builder_error.default.md#traceback)

### Methods

- [captureStackTrace](builder_error.default.md#capturestacktrace)
- [display](builder_error.default.md#display)

## Constructors

### constructor

\+ **new default**(`message`: *string*, `traceback`: [*default*](builder_traceback.default.md)): [*default*](builder_error.default.md)

The constructor needs a message and the traceback object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *string* | the string message   |
`traceback` | [*default*](builder_traceback.default.md) | the traceback    |

**Returns:** [*default*](builder_error.default.md)

Defined in: [builder/Error.ts:18](https://github.com/onzag/itemize/blob/11a98dec/builder/Error.ts#L18)

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

___

### traceback

• `Private` **traceback**: [*default*](builder_traceback.default.md)

Defined in: [builder/Error.ts:18](https://github.com/onzag/itemize/blob/11a98dec/builder/Error.ts#L18)

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

___

### display

▸ **display**(): *void*

displays the error message to stdout

**Returns:** *void*

Defined in: [builder/Error.ts:39](https://github.com/onzag/itemize/blob/11a98dec/builder/Error.ts#L39)
