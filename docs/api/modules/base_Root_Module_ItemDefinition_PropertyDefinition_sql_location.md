[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/location

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/location

This file contains the sql functionality to be used with the location type

## Table of contents

### Functions

- [locationSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsql)
- [locationSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlbtreeindexable)
- [locationSQLEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlequal)
- [locationSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlin)
- [locationSQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlorderby)
- [locationSQLOut](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlout)
- [locationSQLSSCacheEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlsscacheequal)
- [locationSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlsearch)
- [locationSQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlselect)

## Functions

### locationSQL

▸ **locationSQL**(`arg`): `Object`

provides the SQL form for the location type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the arg info |

#### Returns

`Object`

a partial row definition

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:19](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L19)

___

### locationSQLBtreeIndexable

▸ **locationSQLBtreeIndexable**(): `string`[]

Provides the btree indexable functionality

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:210](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L210)

___

### locationSQLEqual

▸ **locationSQLEqual**(`arg`): `void`

Checks for equality within the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) | the equal arg info |

#### Returns

`void`

a partial row match

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:187](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L187)

___

### locationSQLIn

▸ **locationSQLIn**(`arg`): `Object`

Provides the functionality for sql in of data into
the row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the sql in arg info |

#### Returns

`Object`

a partial row

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:76](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L76)

___

### locationSQLOrderBy

▸ **locationSQLOrderBy**(`arg`): [`string`, `string`, `string`]

Provides the functionality on how to order by

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) | the order by rule info |

#### Returns

[`string`, `string`, `string`]

the order by rule string array

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:175](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L175)

___

### locationSQLOut

▸ **locationSQLOut**(`arg`): [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

Provides the functionality to analyze a row value and
output the location type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the sql out info |

#### Returns

[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

a property definition supported location type, or null

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:105](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L105)

___

### locationSQLSSCacheEqual

▸ **locationSQLSSCacheEqual**(`arg`): `boolean`

Checks for equality within the cache

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) | the ss cache equal info |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:200](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L200)

___

### locationSQLSearch

▸ **locationSQLSearch**(`arg`): `boolean` \| [`string`, `any`[]]

Provides the search functionality for the location type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) | the sql search info arg |

#### Returns

`boolean` \| [`string`, `any`[]]

a boolean on whether it was searched by it, or an order by rule (also when it was searched by it)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:124](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L124)

___

### locationSQLSelect

▸ **locationSQLSelect**(`arg`): `string`[]

provides the SQL select form for the location type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the arg info |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:60](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L60)
