[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist

## Table of contents

### Functions

- [tagListElasticSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_taglist.md#taglistelasticsearch)
- [taglistSQLEqualFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_taglist.md#taglistsqlequalfn)
- [taglistSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_taglist.md#taglistsqlin)
- [taglistSQLSSCacheEqualFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_taglist.md#taglistsqlsscacheequalfn)
- [taglistSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_taglist.md#taglistsqlsearch)

## Functions

### tagListElasticSearch

▸ **tagListElasticSearch**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts:68](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts#L68)

___

### taglistSQLEqualFn

▸ **taglistSQLEqualFn**(`arg`): `void`

The standard function that perfoms equality checks within the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) | the equal info arg |

#### Returns

`void`

a valid args to use in the where expression or an object
for where many

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts:121](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts#L121)

___

### taglistSQLIn

▸ **taglistSQLIn**(`arg`): [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

The standard sql in function that specifies how a property inputs its value
into a table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the in arg |

#### Returns

[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

the partial row value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts:13](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts#L13)

___

### taglistSQLSSCacheEqualFn

▸ **taglistSQLSSCacheEqualFn**(`arg`): `boolean`

This function represents the standard way an equality check
is performed locally in the cache when equality between properties is requests
this local equal is ran against SQL cached properties, that is redis cache
it is used for check for policies

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) | the sql ss cache equal info |

#### Returns

`boolean`

a boolean on whether it equals

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts:147](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts#L147)

___

### taglistSQLSearch

▸ **taglistSQLSearch**(`arg`): `boolean`

The taglist sql search functionality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) | the sql search arg info |

#### Returns

`boolean`

a boolean on whether it was searched by it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts:43](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/taglist.ts#L43)
