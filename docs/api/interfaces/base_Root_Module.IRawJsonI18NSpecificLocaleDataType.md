[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module](../modules/base_Root_Module.md) / IRawJsonI18NSpecificLocaleDataType

# Interface: IRawJsonI18NSpecificLocaleDataType

[base/Root/Module](../modules/base_Root_Module.md).IRawJsonI18NSpecificLocaleDataType

Specific locale information contained within modules and item
definitions, as this is how the i18n properties parsed from the
properties files comes to be

## Table of contents

### Properties

- [custom](base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md#custom)
- [name](base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md#name)
- [policies](base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md#policies)
- [search\_field\_label](base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md#search_field_label)
- [search\_field\_placeholder](base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md#search_field_placeholder)
- [search\_keywords](base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md#search_keywords)
- [search\_value\_too\_large](base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md#search_value_too_large)

## Properties

### custom

• `Optional` **custom**: `Object`

Custom translation fields

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[base/Root/Module/index.ts:61](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/index.ts#L61)

___

### name

• **name**: `string`

The name of the module or the item definition

#### Defined in

[base/Root/Module/index.ts:41](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/index.ts#L41)

___

### policies

• `Optional` **policies**: `Object`

Policies, which only really exists on item definitions
since modules do not hold policies

#### Type declaration

| Name | Type |
| :------ | :------ |
| `delete?` | `Object` |
| `edit?` | `Object` |
| `parent?` | `Object` |
| `read?` | `Object` |

#### Defined in

[base/Root/Module/index.ts:68](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/index.ts#L68)

___

### search\_field\_label

• **search\_field\_label**: `string`

The full text search field label for full text search mode

#### Defined in

[base/Root/Module/index.ts:45](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/index.ts#L45)

___

### search\_field\_placeholder

• **search\_field\_placeholder**: `string`

The full text search placeholder for full text search mode

#### Defined in

[base/Root/Module/index.ts:49](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/index.ts#L49)

___

### search\_keywords

• **search\_keywords**: `string`

A comma separated list of strings for full text search mode

#### Defined in

[base/Root/Module/index.ts:57](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/index.ts#L57)

___

### search\_value\_too\_large

• **search\_value\_too\_large**: `string`

The error that comes from the full text search mode when you have input too much data

#### Defined in

[base/Root/Module/index.ts:53](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/index.ts#L53)
