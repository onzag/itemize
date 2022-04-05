[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit

This file provides the sql functionality for the unit type

## Table of contents

### Functions

- [unitSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsql)
- [unitSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlbtreeindexable)
- [unitSQLEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlequal)
- [unitSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlin)
- [unitSQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlorderby)
- [unitSQLOut](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlout)
- [unitSQLSSCacheEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlsscacheequal)
- [unitSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlsearch)
- [unitSQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_unit.md#unitsqlselect)

## Functions

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:17](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L17)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:140](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L140)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:149](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L149)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:52](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L52)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:131](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L131)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:75](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L75)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:159](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L159)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:93](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L93)

___

### unitSQLSelect

▸ **unitSQLSelect**(`arg`): `string`[]

the selection function for unit based elements

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the arg |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:38](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L38)
