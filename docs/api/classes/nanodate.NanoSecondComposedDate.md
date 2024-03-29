[@onzag/itemize](../README.md) / [Modules](../modules.md) / [nanodate](../modules/nanodate.md) / NanoSecondComposedDate

# Class: NanoSecondComposedDate

[nanodate](../modules/nanodate.md).NanoSecondComposedDate

The nanosecond composed date allows to parse nanosecond ISO dates and keep and mantain their precision
this class is useful for handling postgresql dates, in the case of itemize, created_at, edited_at are given
with nanodate level precision so if fine adjustment is needed please use this class instead of Date

## Table of contents

### Constructors

- [constructor](nanodate.NanoSecondComposedDate.md#constructor)

### Properties

- [date](nanodate.NanoSecondComposedDate.md#date)
- [original](nanodate.NanoSecondComposedDate.md#original)
- [remainder](nanodate.NanoSecondComposedDate.md#remainder)
- [time](nanodate.NanoSecondComposedDate.md#time)

### Methods

- [equal](nanodate.NanoSecondComposedDate.md#equal)
- [greaterThan](nanodate.NanoSecondComposedDate.md#greaterthan)
- [greaterThanEqual](nanodate.NanoSecondComposedDate.md#greaterthanequal)
- [isInvalid](nanodate.NanoSecondComposedDate.md#isinvalid)
- [lessThan](nanodate.NanoSecondComposedDate.md#lessthan)
- [lessThanEqual](nanodate.NanoSecondComposedDate.md#lessthanequal)
- [notEqual](nanodate.NanoSecondComposedDate.md#notequal)

## Constructors

### constructor

• **new NanoSecondComposedDate**(`str`): [`NanoSecondComposedDate`](nanodate.NanoSecondComposedDate.md)

Build a new nanodate

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | the ISO date |

#### Returns

[`NanoSecondComposedDate`](nanodate.NanoSecondComposedDate.md)

#### Defined in

[nanodate.ts:38](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L38)

## Properties

### date

• **date**: `Date`

The original date

#### Defined in

[nanodate.ts:19](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L19)

___

### original

• **original**: `string`

The original string

#### Defined in

[nanodate.ts:23](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L23)

___

### remainder

• **remainder**: `number`

The remainder numeric value, this is the number
left after the first 3 numbers after the decimal in seconds

#### Defined in

[nanodate.ts:28](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L28)

___

### time

• **time**: `number`

the millisecond time

#### Defined in

[nanodate.ts:32](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L32)

## Methods

### equal

▸ **equal**(`otherDate`): `boolean`

Checks whether a given nano date is equal to another

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDate` | [`NanoSecondComposedDate`](nanodate.NanoSecondComposedDate.md) | the other date to check |

#### Returns

`boolean`

a boolean

#### Defined in

[nanodate.ts:155](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L155)

___

### greaterThan

▸ **greaterThan**(`otherDate`): `boolean`

Checks whether a given nano date is greater than another

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDate` | [`NanoSecondComposedDate`](nanodate.NanoSecondComposedDate.md) | the other date |

#### Returns

`boolean`

a boolean

#### Defined in

[nanodate.ts:89](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L89)

___

### greaterThanEqual

▸ **greaterThanEqual**(`otherDate`): `boolean`

Checks whether a given nano date is greater than or equal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDate` | [`NanoSecondComposedDate`](nanodate.NanoSecondComposedDate.md) | the other date to check |

#### Returns

`boolean`

a boolean

#### Defined in

[nanodate.ts:107](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L107)

___

### isInvalid

▸ **isInvalid**(): `boolean`

Tells wether the date is invalid

#### Returns

`boolean`

#### Defined in

[nanodate.ts:80](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L80)

___

### lessThan

▸ **lessThan**(`otherDate`): `boolean`

Checks whether a given nano date is less than

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDate` | [`NanoSecondComposedDate`](nanodate.NanoSecondComposedDate.md) | the other date to check |

#### Returns

`boolean`

a boolean

#### Defined in

[nanodate.ts:123](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L123)

___

### lessThanEqual

▸ **lessThanEqual**(`otherDate`): `boolean`

Checks whether a given nano date is less than or equal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDate` | [`NanoSecondComposedDate`](nanodate.NanoSecondComposedDate.md) | the other date to check |

#### Returns

`boolean`

a boolean

#### Defined in

[nanodate.ts:139](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L139)

___

### notEqual

▸ **notEqual**(`otherDate`): `boolean`

Checks whether two given nano dates are not equal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `otherDate` | [`NanoSecondComposedDate`](nanodate.NanoSecondComposedDate.md) | the other date to check |

#### Returns

`boolean`

a boolean

#### Defined in

[nanodate.ts:164](https://github.com/onzag/itemize/blob/73e0c39e/nanodate.ts#L164)
