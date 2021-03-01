[](../README.md) / [Exports](../modules.md) / [base/Root/Module](../modules/base_root_module.md) / IRawJsonI18NSpecificLocaleDataType

# Interface: IRawJsonI18NSpecificLocaleDataType

[base/Root/Module](../modules/base_root_module.md).IRawJsonI18NSpecificLocaleDataType

Specific locale information contained within modules and item
definitions, as this is how the i18n properties parsed from the
properties files comes to be

## Table of contents

### Properties

- [custom](base_root_module.irawjsoni18nspecificlocaledatatype.md#custom)
- [name](base_root_module.irawjsoni18nspecificlocaledatatype.md#name)
- [policies](base_root_module.irawjsoni18nspecificlocaledatatype.md#policies)
- [search\_field\_label](base_root_module.irawjsoni18nspecificlocaledatatype.md#search_field_label)
- [search\_field\_placeholder](base_root_module.irawjsoni18nspecificlocaledatatype.md#search_field_placeholder)
- [search\_keywords](base_root_module.irawjsoni18nspecificlocaledatatype.md#search_keywords)
- [search\_value\_too\_large](base_root_module.irawjsoni18nspecificlocaledatatype.md#search_value_too_large)

## Properties

### custom

• `Optional` **custom**: *object*

Custom translation fields

#### Type declaration:

Defined in: [base/Root/Module/index.ts:60](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/index.ts#L60)

___

### name

• **name**: *string*

The name of the module or the item definition

Defined in: [base/Root/Module/index.ts:40](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/index.ts#L40)

___

### policies

• `Optional` **policies**: *object*

Policies, which only really exists on item definitions
since modules do not hold policies

#### Type declaration:

Name | Type |
:------ | :------ |
`delete`? | *object* |
`edit`? | *object* |
`parent`? | *object* |
`read`? | *object* |

Defined in: [base/Root/Module/index.ts:67](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/index.ts#L67)

___

### search\_field\_label

• **search\_field\_label**: *string*

The full text search field label for full text search mode

Defined in: [base/Root/Module/index.ts:44](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/index.ts#L44)

___

### search\_field\_placeholder

• **search\_field\_placeholder**: *string*

The full text search placeholder for full text search mode

Defined in: [base/Root/Module/index.ts:48](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/index.ts#L48)

___

### search\_keywords

• **search\_keywords**: *string*

A comma separated list of strings for full text search mode

Defined in: [base/Root/Module/index.ts:56](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/index.ts#L56)

___

### search\_value\_too\_large

• **search\_value\_too\_large**: *string*

The error that comes from the full text search mode when you have input too much data

Defined in: [base/Root/Module/index.ts:52](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/index.ts#L52)
