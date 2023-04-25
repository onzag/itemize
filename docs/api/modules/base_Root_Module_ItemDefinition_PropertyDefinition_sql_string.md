[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/string

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/string

This file contains the sql server side functions for the string type

## Table of contents

### Functions

- [stringElastic](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringelastic)
- [stringElasticSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringelasticsearch)
- [stringElasticStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringelasticstrsearch)
- [stringSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringsql)
- [stringSQLElasticIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringsqlelasticin)
- [stringSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringsqlsearch)
- [stringSQLStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_string.md#stringsqlstrsearch)

## Functions

### stringElastic

▸ **stringElastic**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:36](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L36)

___

### stringElasticSearch

▸ **stringElasticSearch**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:165](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L165)

___

### stringElasticStrSearch

▸ **stringElasticStrSearch**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticStrSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticStrSearchInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:258](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L258)

___

### stringSQL

▸ **stringSQL**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:12](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L12)

___

### stringSQLElasticIn

▸ **stringSQLElasticIn**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:63](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L63)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:83](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L83)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:234](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L234)
