[](../README.md) / [Exports](../modules.md) / [nanodate](../modules/nanodate.md) / NanoSecondComposedDate

# Class: NanoSecondComposedDate

[nanodate](../modules/nanodate.md).NanoSecondComposedDate

The nanosecond composed date allows to parse nanosecond ISO dates and keep and mantain their precision
this class is useful for handling postgresql dates, in the case of itemize, created_at, edited_at are given
with nanodate level precision so if fine adjustment is needed please use this class instead of Date

## Table of contents

### Constructors

- [constructor](nanodate.nanosecondcomposeddate.md#constructor)

### Properties

- [date](nanodate.nanosecondcomposeddate.md#date)
- [original](nanodate.nanosecondcomposeddate.md#original)
- [remainder](nanodate.nanosecondcomposeddate.md#remainder)
- [time](nanodate.nanosecondcomposeddate.md#time)

### Methods

- [equal](nanodate.nanosecondcomposeddate.md#equal)
- [greaterThan](nanodate.nanosecondcomposeddate.md#greaterthan)
- [greaterThanEqual](nanodate.nanosecondcomposeddate.md#greaterthanequal)
- [lessThan](nanodate.nanosecondcomposeddate.md#lessthan)
- [lessThanEqual](nanodate.nanosecondcomposeddate.md#lessthanequal)
- [notEqual](nanodate.nanosecondcomposeddate.md#notequal)

## Constructors

### constructor

\+ **new NanoSecondComposedDate**(`str`: *string*): [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md)

Build a new nanodate

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | the ISO date    |

**Returns:** [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md)

Defined in: [nanodate.ts:32](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L32)

## Properties

### date

• **date**: Date

The original date

Defined in: [nanodate.ts:19](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L19)

___

### original

• **original**: *string*

The original string

Defined in: [nanodate.ts:23](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L23)

___

### remainder

• **remainder**: *number*

The remainder numeric value, this is the number
left after the first 3 numbers after the decimal in seconds

Defined in: [nanodate.ts:28](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L28)

___

### time

• **time**: *number*

the millisecond time

Defined in: [nanodate.ts:32](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L32)

## Methods

### equal

▸ **equal**(`otherDate`: [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md)): *boolean*

Checks whether a given nano date is equal to another

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`otherDate` | [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md) | the other date to check   |

**Returns:** *boolean*

a boolean

Defined in: [nanodate.ts:131](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L131)

___

### greaterThan

▸ **greaterThan**(`otherDate`: [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md)): *boolean*

Checks whether a given nano date is greater than another

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`otherDate` | [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md) | the other date   |

**Returns:** *boolean*

a boolean

Defined in: [nanodate.ts:65](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L65)

___

### greaterThanEqual

▸ **greaterThanEqual**(`otherDate`: [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md)): *boolean*

Checks whether a given nano date is greater than or equal

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`otherDate` | [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md) | the other date to check   |

**Returns:** *boolean*

a boolean

Defined in: [nanodate.ts:83](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L83)

___

### lessThan

▸ **lessThan**(`otherDate`: [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md)): *boolean*

Checks whether a given nano date is less than

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`otherDate` | [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md) | the other date to check   |

**Returns:** *boolean*

a boolean

Defined in: [nanodate.ts:99](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L99)

___

### lessThanEqual

▸ **lessThanEqual**(`otherDate`: [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md)): *boolean*

Checks whether a given nano date is less than or equal

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`otherDate` | [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md) | the other date to check   |

**Returns:** *boolean*

a boolean

Defined in: [nanodate.ts:115](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L115)

___

### notEqual

▸ **notEqual**(`otherDate`: [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md)): *boolean*

Checks whether two given nano dates are not equal

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`otherDate` | [*NanoSecondComposedDate*](nanodate.nanosecondcomposeddate.md) | the other date to check   |

**Returns:** *boolean*

a boolean

Defined in: [nanodate.ts:140](https://github.com/onzag/itemize/blob/5fcde7cf/nanodate.ts#L140)
