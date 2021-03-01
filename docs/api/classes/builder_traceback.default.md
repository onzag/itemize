[](../README.md) / [Exports](../modules.md) / [builder/Traceback](../modules/builder_traceback.md) / default

# Class: default

[builder/Traceback](../modules/builder_traceback.md).default

The traceback class

## Table of contents

### Constructors

- [constructor](builder_traceback.default.md#constructor)

### Properties

- [location](builder_traceback.default.md#location)
- [parentTraceback](builder_traceback.default.md#parenttraceback)
- [pointers](builder_traceback.default.md#pointers)
- [rawContent](builder_traceback.default.md#rawcontent)
- [stack](builder_traceback.default.md#stack)

### Methods

- [append](builder_traceback.default.md#append)
- [display](builder_traceback.default.md#display)
- [newTraceToBit](builder_traceback.default.md#newtracetobit)
- [newTraceToLocation](builder_traceback.default.md#newtracetolocation)
- [setupPointers](builder_traceback.default.md#setuppointers)

## Constructors

### constructor

\+ **new default**(`location`: *string*, `pointers?`: *any*, `rawContent?`: *string*, `parentTraceback?`: [*default*](builder_traceback.default.md), `source?`: ITracebackStackBitType[]): [*default*](builder_traceback.default.md)

In order to build a traceback we need

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`location` | *string* | the location of the file   |
`pointers?` | *any* | the pointers of the file, if any   |
`rawContent?` | *string* | the raw content of that file, if any   |
`parentTraceback?` | [*default*](builder_traceback.default.md) | the parent traceback if any   |
`source?` | ITracebackStackBitType[] | a story that the traceback can already tell    |

**Returns:** [*default*](builder_traceback.default.md)

Defined in: [builder/Traceback.ts:87](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L87)

## Properties

### location

• `Private` **location**: *string*

The location of this specific traceback

Defined in: [builder/Traceback.ts:79](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L79)

___

### parentTraceback

• `Private` **parentTraceback**: [*default*](builder_traceback.default.md)

A parent traceback, as traceback stacks are mostly meant to be static
they can be chained as a history

Defined in: [builder/Traceback.ts:75](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L75)

___

### pointers

• `Private` **pointers**: *any*

The json map pointers that were used, if any

Defined in: [builder/Traceback.ts:83](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L83)

___

### rawContent

• `Private` **rawContent**: *string*

The raw string content of the file

Defined in: [builder/Traceback.ts:87](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L87)

___

### stack

• **stack**: ITracebackStackBitType[]

The stack contains all the traceback bits that have been accumulating

Defined in: [builder/Traceback.ts:70](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L70)

## Methods

### append

▸ **append**(`bit`: ITracebackStackBitType): *void*

Adds a traceback bit to the traceback

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`bit` | ITracebackStackBitType | the bit to add    |

**Returns:** *void*

Defined in: [builder/Traceback.ts:119](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L119)

___

### display

▸ **display**(`requested?`: *boolean*): *void*

Displays the traceback via the console

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`requested?` | *boolean* | whether to say that the file was requested by and do not display details    |

**Returns:** *void*

Defined in: [builder/Traceback.ts:192](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L192)

___

### newTraceToBit

▸ **newTraceToBit**(`pathId`: *string* \| *number*): [*default*](builder_traceback.default.md)

Traces to a new bit into the pointers

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pathId` | *string* \| *number* | the path that it traces to   |

**Returns:** [*default*](builder_traceback.default.md)

a new traceback object that traces to that bit

Defined in: [builder/Traceback.ts:128](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L128)

___

### newTraceToLocation

▸ **newTraceToLocation**(`location`: *string*): [*default*](builder_traceback.default.md)

provides a new traceback that points to a new location parented
by this traceback

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`location` | *string* | the location that it is tracing   |

**Returns:** [*default*](builder_traceback.default.md)

a new traceback pointing to a new location, the traceback
has no pointers, nor file raw data

Defined in: [builder/Traceback.ts:167](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L167)

___

### setupPointers

▸ **setupPointers**(`pointers`: *any*, `rawContent`: *string*): *void*

Initializes the pointers for json tree tracking that
are necessary to provide tracebacks in json files

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pointers` | *any* | the pointers   |
`rawContent` | *string* | the raw content of the file    |

**Returns:** *void*

Defined in: [builder/Traceback.ts:177](https://github.com/onzag/itemize/blob/3efa2a4a/builder/Traceback.ts#L177)
