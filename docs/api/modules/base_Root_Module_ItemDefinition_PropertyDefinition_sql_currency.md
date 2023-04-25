[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency

Contains the sql and server side specific functions for the currency type

## Table of contents

### Functions

- [currencyElastic](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencyelastic)
- [currencyElasticOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencyelasticorderby)
- [currencyElasticSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencyelasticsearch)
- [currencySQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysql)
- [currencySQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlbtreeindexable)
- [currencySQLElasticIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlelasticin)
- [currencySQLEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlequal)
- [currencySQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlin)
- [currencySQLMantenience](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlmantenience)
- [currencySQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlorderby)
- [currencySQLOut](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlout)
- [currencySQLSSCacheEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlsscacheequal)
- [currencySQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlsearch)
- [currencySQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlselect)

## Functions

### currencyElastic

▸ **currencyElastic**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `runtime` | `Object` |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:28](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L28)

___

### currencyElasticOrderBy

▸ **currencyElasticOrderBy**(`arg`): `Object`

The order by functionality for the currency type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) | the order by arg |

#### Returns

`Object`

the elastic rule

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:367](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L367)

___

### currencyElasticSearch

▸ **currencyElasticSearch**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:251](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L251)

___

### currencySQL

▸ **currencySQL**(`arg`): `Object`

the sql function that setups the fields for currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the sql argumnent |

#### Returns

`Object`

a partial row definition

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:19](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L19)

___

### currencySQLBtreeIndexable

▸ **currencySQLBtreeIndexable**(`arg`): `string`[]

The btree indexable used in searches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLBtreeIndexableInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLBtreeIndexableInfo.md) | the arg for the btree indexable options |

#### Returns

`string`[]

the columns to index

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:380](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L380)

___

### currencySQLElasticIn

▸ **currencySQLElasticIn**(`arg`): `Object`

The sql out function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the argument out info |

#### Returns

`Object`

a property definition supported currency type (or null)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:133](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L133)

___

### currencySQLEqual

▸ **currencySQLEqual**(`arg`): `void`

How to consider equality with a value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) | the argument to check equality against |

#### Returns

`void`

a partial row match

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:429](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L429)

___

### currencySQLIn

▸ **currencySQLIn**(`arg`): `Object`

The sql in function for the currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the sql in info argument |

#### Returns

`Object`

a partial row

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:72](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L72)

___

### currencySQLMantenience

▸ **currencySQLMantenience**(`arg`): [`ISQLMantenienceType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLMantenienceType.md)

The SQL mantenience for the currency fields that are currently active
to be searched

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the sql mantenience arg |

#### Returns

[`ISQLMantenienceType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLMantenienceType.md)

the sql mantenience rule

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:391](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L391)

___

### currencySQLOrderBy

▸ **currencySQLOrderBy**(`arg`): [`string`, `string`, `string`]

The order by functionality for the currency type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) | the order by arg |

#### Returns

[`string`, `string`, `string`]

an array of string with the rule options

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:357](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L357)

___

### currencySQLOut

▸ **currencySQLOut**(`arg`): `any`

The sql out function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the argument out info |

#### Returns

`any`

a property definition supported currency type (or null)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:146](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L146)

___

### currencySQLSSCacheEqual

▸ **currencySQLSSCacheEqual**(`arg`): `boolean`

How to check equality with a value using the cache

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) | the argument to check against |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:439](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L439)

___

### currencySQLSearch

▸ **currencySQLSearch**(`arg`): `boolean`

Searching for currency values

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) | the argument search info |

#### Returns

`boolean`

a boolean on whether it's searched by it or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:191](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L191)

___

### currencySQLSelect

▸ **currencySQLSelect**(`arg`): `string`[]

The selection for the currency in searches
does not need the normalized value

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:60](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L60)
