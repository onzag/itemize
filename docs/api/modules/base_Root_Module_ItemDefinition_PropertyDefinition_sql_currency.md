[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency

Contains the sql and server side specific functions for the currency type

## Table of contents

### Functions

- [currencySQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysql)
- [currencySQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlbtreeindexable)
- [currencySQLEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlequal)
- [currencySQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlin)
- [currencySQLMantenience](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlmantenience)
- [currencySQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlorderby)
- [currencySQLOut](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlout)
- [currencySQLSSCacheEqual](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlsscacheequal)
- [currencySQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlsearch)
- [currencySQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_currency.md#currencysqlselect)

## Functions

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:18](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L18)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:174](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L174)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:223](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L223)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:44](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L44)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:185](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L185)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:164](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L164)

___

### currencySQLOut

▸ **currencySQLOut**(`arg`): [`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)

The sql out function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the argument out info |

#### Returns

[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)

a property definition supported currency type (or null)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:72](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L72)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:233](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L233)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:99](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L99)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:32](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L32)
