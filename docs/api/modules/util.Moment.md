[@onzag/itemize](../README.md) / [Modules](../modules.md) / [util](util.md) / Moment

# Namespace: Moment

[util](util.md).Moment

## Table of contents

### Variables

- [HTML5\_FMT](util.Moment.md#html5_fmt)
- [ISO\_8601](util.Moment.md#iso_8601)
- [RFC\_2822](util.Moment.md#rfc_2822)
- [defaultFormat](util.Moment.md#defaultformat)
- [defaultFormatUtc](util.Moment.md#defaultformatutc)
- [fn](util.Moment.md#fn)
- [suppressDeprecationWarnings](util.Moment.md#suppressdeprecationwarnings)
- [version](util.Moment.md#version)

### Functions

- [calendarFormat](util.Moment.md#calendarformat)
- [defineLocale](util.Moment.md#definelocale)
- [deprecationHandler](util.Moment.md#deprecationhandler)
- [duration](util.Moment.md#duration)
- [invalid](util.Moment.md#invalid)
- [isDate](util.Moment.md#isdate)
- [isDuration](util.Moment.md#isduration)
- [isMoment](util.Moment.md#ismoment)
- [lang](util.Moment.md#lang)
- [locale](util.Moment.md#locale)
- [localeData](util.Moment.md#localedata)
- [locales](util.Moment.md#locales)
- [max](util.Moment.md#max)
- [min](util.Moment.md#min)
- [months](util.Moment.md#months)
- [monthsShort](util.Moment.md#monthsshort)
- [normalizeUnits](util.Moment.md#normalizeunits)
- [now](util.Moment.md#now)
- [parseTwoDigitYear](util.Moment.md#parsetwodigityear)
- [parseZone](util.Moment.md#parsezone)
- [relativeTimeRounding](util.Moment.md#relativetimerounding)
- [relativeTimeThreshold](util.Moment.md#relativetimethreshold)
- [unix](util.Moment.md#unix)
- [updateLocale](util.Moment.md#updatelocale)
- [utc](util.Moment.md#utc)
- [weekdays](util.Moment.md#weekdays)
- [weekdaysMin](util.Moment.md#weekdaysmin)
- [weekdaysShort](util.Moment.md#weekdaysshort)

## Variables

### HTML5\_FMT

• **HTML5\_FMT**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DATE` | `string` |
| `DATETIME_LOCAL` | `string` |
| `DATETIME_LOCAL_MS` | `string` |
| `DATETIME_LOCAL_SECONDS` | `string` |
| `MONTH` | `string` |
| `TIME` | `string` |
| `TIME_MS` | `string` |
| `TIME_SECONDS` | `string` |
| `WEEK` | `string` |

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:770

___

### ISO\_8601

• **ISO\_8601**: `MomentBuiltinFormat`

Constant used to enable explicit ISO_8601 format parsing.

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:761

___

### RFC\_2822

• **RFC\_2822**: `MomentBuiltinFormat`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:762

___

### defaultFormat

• **defaultFormat**: `string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:764

___

### defaultFormatUtc

• **defaultFormatUtc**: `string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:765

___

### fn

• **fn**: `Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:652

___

### suppressDeprecationWarnings

• **suppressDeprecationWarnings**: `boolean`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:767

___

### version

• **version**: `string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:651

## Functions

### calendarFormat

▸ **calendarFormat**(`m`, `now`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `Moment` |
| `now` | `Moment` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:755

___

### defineLocale

▸ **defineLocale**(`language`, `localeSpec`): `Locale`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |
| `localeSpec` | `LocaleSpecification` |

#### Returns

`Locale`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:745

___

### deprecationHandler

▸ **deprecationHandler**(`name`, `msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:768

___

### duration

▸ **duration**(`inp?`, `unit?`): `Duration`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inp?` | `DurationInputArg1` |
| `unit?` | `DurationConstructor` |

#### Returns

`Duration`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:695

___

### invalid

▸ **invalid**(`flags?`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `flags?` | `MomentParsingFlagsOpt` |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:675

___

### isDate

▸ **isDate**(`m`): m is Date

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `any` |

#### Returns

m is Date

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:677

___

### isDuration

▸ **isDuration**(`d`): d is Duration

#### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `any` |

#### Returns

d is Duration

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:678

___

### isMoment

▸ **isMoment**(`m`): m is Moment

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `any` |

#### Returns

m is Moment

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:676

___

### lang

▸ **lang**(`language?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |

#### Returns

`string`

**`Deprecated`**

in 2.8.0

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:683

▸ **lang**(`language?`, `definition?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |
| `definition?` | `Locale` |

#### Returns

`string`

**`Deprecated`**

in 2.8.0

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:687

___

### locale

▸ **locale**(`language?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:689

▸ **locale**(`language?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string`[] |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:690

▸ **locale**(`language?`, `definition?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |
| `definition?` | `LocaleSpecification` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:691

___

### localeData

▸ **localeData**(`key?`): `Locale`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` \| `string`[] |

#### Returns

`Locale`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:693

___

### locales

▸ **locales**(): `string`[]

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:748

___

### max

▸ **max**(`moments`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moments` | `Moment`[] |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:737

▸ **max**(`...moments`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...moments` | `Moment`[] |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:738

___

### min

▸ **min**(`moments`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moments` | `Moment`[] |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:735

▸ **min**(`...moments`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...moments` | `Moment`[] |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:736

___

### months

▸ **months**(): `string`[]

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:701

▸ **months**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:702

▸ **months**(`format`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:703

▸ **months**(`format`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:704

___

### monthsShort

▸ **monthsShort**(): `string`[]

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:705

▸ **monthsShort**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:706

▸ **monthsShort**(`format`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:707

▸ **monthsShort**(`format`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:708

___

### normalizeUnits

▸ **normalizeUnits**(`unit`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `unit` | `All` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:750

___

### now

▸ **now**(): `number`

Returns unix time in milliseconds. Overwrite for profit.

#### Returns

`number`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:743

___

### parseTwoDigitYear

▸ **parseTwoDigitYear**(`input`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`number`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:757

___

### parseZone

▸ **parseZone**(`inp?`, `format?`, `strict?`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inp?` | `MomentInput` |
| `format?` | `MomentFormatSpecification` |
| `strict?` | `boolean` |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:698

▸ **parseZone**(`inp?`, `format?`, `language?`, `strict?`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inp?` | `MomentInput` |
| `format?` | `MomentFormatSpecification` |
| `language?` | `string` |
| `strict?` | `boolean` |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:699

___

### relativeTimeRounding

▸ **relativeTimeRounding**(`fn`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`num`: `number`) => `number` |

#### Returns

`boolean`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:753

▸ **relativeTimeRounding**(): (`num`: `number`) => `number`

#### Returns

`fn`

▸ (`num`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `number` |

##### Returns

`number`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:754

___

### relativeTimeThreshold

▸ **relativeTimeThreshold**(`threshold`): `number` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `threshold` | `string` |

#### Returns

`number` \| `boolean`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:751

▸ **relativeTimeThreshold**(`threshold`, `limit`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `threshold` | `string` |
| `limit` | `number` |

#### Returns

`boolean`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:752

___

### unix

▸ **unix**(`timestamp`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:673

___

### updateLocale

▸ **updateLocale**(`language`, `localeSpec`): `Locale`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |
| `localeSpec` | `LocaleSpecification` |

#### Returns

`Locale`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:746

___

### utc

▸ **utc**(`inp?`, `strict?`): `Moment`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inp?` | `MomentInput` | - |
| `strict?` | `boolean` | Strict parsing disables the deprecated fallback to the native Date constructor when parsing a string. |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:659

▸ **utc**(`inp?`, `format?`, `strict?`): `Moment`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inp?` | `MomentInput` | - |
| `format?` | `MomentFormatSpecification` | - |
| `strict?` | `boolean` | Strict parsing requires that the format and input match exactly, including delimiters. Strict parsing is frequently the best parsing option. For more information about choosing strict vs forgiving parsing, see the [parsing guide](https://momentjs.com/guides/#/parsing/). |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:665

▸ **utc**(`inp?`, `format?`, `language?`, `strict?`): `Moment`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inp?` | `MomentInput` | - |
| `format?` | `MomentFormatSpecification` | - |
| `language?` | `string` | - |
| `strict?` | `boolean` | Strict parsing requires that the format and input match exactly, including delimiters. Strict parsing is frequently the best parsing option. For more information about choosing strict vs forgiving parsing, see the [parsing guide](https://momentjs.com/guides/#/parsing/). |

#### Returns

`Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:671

___

### weekdays

▸ **weekdays**(): `string`[]

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:710

▸ **weekdays**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:711

▸ **weekdays**(`format`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:712

▸ **weekdays**(`format`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:713

▸ **weekdays**(`localeSorted`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:714

▸ **weekdays**(`localeSorted`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:715

▸ **weekdays**(`localeSorted`, `format`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `format` | `string` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:716

▸ **weekdays**(`localeSorted`, `format`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `format` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:717

___

### weekdaysMin

▸ **weekdaysMin**(): `string`[]

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:726

▸ **weekdaysMin**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:727

▸ **weekdaysMin**(`format`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:728

▸ **weekdaysMin**(`format`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:729

▸ **weekdaysMin**(`localeSorted`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:730

▸ **weekdaysMin**(`localeSorted`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:731

▸ **weekdaysMin**(`localeSorted`, `format`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `format` | `string` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:732

▸ **weekdaysMin**(`localeSorted`, `format`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `format` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:733

___

### weekdaysShort

▸ **weekdaysShort**(): `string`[]

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:718

▸ **weekdaysShort**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:719

▸ **weekdaysShort**(`format`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:720

▸ **weekdaysShort**(`format`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:721

▸ **weekdaysShort**(`localeSorted`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:722

▸ **weekdaysShort**(`localeSorted`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:723

▸ **weekdaysShort**(`localeSorted`, `format`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `format` | `string` |

#### Returns

`string`[]

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:724

▸ **weekdaysShort**(`localeSorted`, `format`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `localeSorted` | `boolean` |
| `format` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:725
