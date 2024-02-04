[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit

This file provides the sql functionality for the unit type

## Table of contents

### Functions

- [unitElastic](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitelastic)
- [unitElasticOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitelasticorderby)
- [unitElasticSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitelasticsearch)
- [unitSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsql)
- [unitSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlbtreeindexable)
- [unitSQLElasticIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlelasticin)
- [unitSQLEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlequal)
- [unitSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlin)
- [unitSQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlorderby)
- [unitSQLOut](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlout)
- [unitSQLSSCacheEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlsscacheequal)
- [unitSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlsearch)
- [unitSQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlselect)

## Functions

### unitElastic

▸ **unitElastic**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `properties` | {} |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:37](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L37)

___

### unitElasticOrderBy

▸ **unitElasticOrderBy**(`arg`): `Object`

Specifies how units are to be ordered by

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) | the sql order by info arg |

#### Returns

`Object`

the three string order by rule

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:330](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L330)

___

### unitElasticSearch

▸ **unitElasticSearch**(`arg`): `Object`

The standard function that build queries for the property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`IElasticSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) | the search info arg |

#### Returns

`Object`

a boolean on whether it was searched by it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:239](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L239)

___

### unitSQL

▸ **unitSQL**(`arg`): `Object`

The unit sql function that specifies the schema

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the sql arg info |

#### Returns

`Object`

a patial row definition

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:20](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L20)

___

### unitSQLBtreeIndexable

▸ **unitSQLBtreeIndexable**(`arg`): `string`[]

Specifies how units are to be btree indexed to accelerate searches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLBtreeIndexableInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLBtreeIndexableInfo.md) | the sql btree indexable info arg |

#### Returns

`string`[]

the rows to be btree indexed

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:342](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L342)

___

### unitSQLElasticIn

▸ **unitSQLElasticIn**(`arg`): `Object`

Specifies how units are to be outputted from a raw row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the sql out arg info |

#### Returns

`Object`

a supported unit type (or null)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:187](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L187)

___

### unitSQLEqual

▸ **unitSQLEqual**(`arg`): `void`

Specifies how units are to be compared for equality in the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) | the sql equal arg info |

#### Returns

`void`

a partial row comparison

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:351](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L351)

___

### unitSQLIn

▸ **unitSQLIn**(`arg`): `Object`

Specifies how units are to be sql in

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the sql in arg info |

#### Returns

`Object`

a partial row value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:78](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L78)

___

### unitSQLOrderBy

▸ **unitSQLOrderBy**(`arg`): [`string`, `string`, `string`]

Specifies how units are to be ordered by

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) | the sql order by info arg |

#### Returns

[`string`, `string`, `string`]

the three string order by rule

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:321](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L321)

___

### unitSQLOut

▸ **unitSQLOut**(`arg`): [`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)

Specifies how units are to be outputted from a raw row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the sql out arg info |

#### Returns

[`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)

a supported unit type (or null)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:153](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L153)

___

### unitSQLSSCacheEqual

▸ **unitSQLSSCacheEqual**(`arg`): `boolean`

Specifies how units are to be compared for equality in the cache

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) | the sql ss equal arg info |

#### Returns

`boolean`

a boolean on whether the equality succeed or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:361](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L361)

___

### unitSQLSearch

▸ **unitSQLSearch**(`arg`): `boolean`

Specifies how units are to be searched by

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) | the sql search arg info |

#### Returns

`boolean`

a boolean on whether it was searched by it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:201](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L201)

___

### unitSQLSelect

▸ **unitSQLSelect**(`arg`): `string`[]

the selection function for unit based elements

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`IArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md) | the arg |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:64](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L64)
