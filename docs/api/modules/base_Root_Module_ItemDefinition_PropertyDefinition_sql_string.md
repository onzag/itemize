[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/string

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/string

This file contains the sql server side functions for the string type

## Table of contents

### Functions

- [stringSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringsql)
- [stringSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringsqlsearch)
- [stringSQLStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringsqlstrsearch)

## Functions

### stringSQL

▸ **stringSQL**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:12](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L12)

___

### stringSQLSearch

▸ **stringSQLSearch**(`arg`): `boolean`

The string sql search functionality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) | the sql search arg info |

#### Returns

`boolean`

a boolean on whether it was searched by it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:41](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L41)

___

### stringSQLStrSearch

▸ **stringSQLStrSearch**(`arg`): `boolean`

The string FTS search functionality from the search field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLStrSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLStrSearchInfo.md) | the sql str search argument |

#### Returns

`boolean`

a boolean on whether it was searched by it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:95](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L95)
