[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/location

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/location

This file contains the sql functionality to be used with the location type

## Table of contents

### Functions

- [locationElastic](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationelastic)
- [locationElasticOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationelasticorderby)
- [locationElasticSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationelasticsearch)
- [locationSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsql)
- [locationSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlbtreeindexable)
- [locationSQLElasticIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlelasticin)
- [locationSQLEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlequal)
- [locationSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlin)
- [locationSQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlorderby)
- [locationSQLOut](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlout)
- [locationSQLSSCacheEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlsscacheequal)
- [locationSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlsearch)
- [locationSQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_location.md#locationsqlselect)

## Functions

### locationElastic

▸ **locationElastic**(`arg`): `Object`

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:58](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L58)

___

### locationElasticOrderBy

▸ **locationElasticOrderBy**(`arg`): `Object`

Provides the functionality on how to order by

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) | the order by rule info |

#### Returns

`Object`

the order by rule string array

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:327](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L327)

___

### locationElasticSearch

▸ **locationElasticSearch**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:267](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L267)

___

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:21](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L21)

___

### locationSQLBtreeIndexable

▸ **locationSQLBtreeIndexable**(): `string`[]

Provides the btree indexable functionality

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:376](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L376)

___

### locationSQLElasticIn

▸ **locationSQLElasticIn**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:198](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L198)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:353](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L353)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:106](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L106)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:315](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L315)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:175](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L175)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:366](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L366)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:221](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L221)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:90](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L90)
