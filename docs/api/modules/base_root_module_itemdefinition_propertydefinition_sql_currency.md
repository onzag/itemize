[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency

Contains the sql and server side specific functions for the currency type

## Table of contents

### Functions

- [currencySQL](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysql)
- [currencySQLBtreeIndexable](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlbtreeindexable)
- [currencySQLEqual](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlequal)
- [currencySQLIn](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlin)
- [currencySQLMantenience](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlmantenience)
- [currencySQLOrderBy](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlorderby)
- [currencySQLOut](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlout)
- [currencySQLSSCacheEqual](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlsscacheequal)
- [currencySQLSearch](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlsearch)
- [currencySQLSelect](base_root_module_itemdefinition_propertydefinition_sql_currency.md#currencysqlselect)

## Functions

### currencySQL

▸ **currencySQL**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *object*

the sql function that setups the fields for currency

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) | the sql argumnent   |

**Returns:** *object*

a partial row definition

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:18](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L18)

___

### currencySQLBtreeIndexable

▸ **currencySQLBtreeIndexable**(`arg`: [*ISQLBtreeIndexableInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md)): *string*[]

The btree indexable used in searches

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLBtreeIndexableInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md) | the arg for the btree indexable options   |

**Returns:** *string*[]

the columns to index

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:164](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L164)

___

### currencySQLEqual

▸ **currencySQLEqual**(`arg`: [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md)): *void*

How to consider equality with a value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md) | the argument to check equality against   |

**Returns:** *void*

a partial row match

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:213](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L213)

___

### currencySQLIn

▸ **currencySQLIn**(`arg`: [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)): *object*

The sql in function for the currency

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md) | the sql in info argument   |

**Returns:** *object*

a partial row

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:44](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L44)

___

### currencySQLMantenience

▸ **currencySQLMantenience**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): [*ISQLMantenienceType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlmanteniencetype.md)

The SQL mantenience for the currency fields that are currently active
to be searched

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) | the sql mantenience arg   |

**Returns:** [*ISQLMantenienceType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlmanteniencetype.md)

the sql mantenience rule

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:175](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L175)

___

### currencySQLOrderBy

▸ **currencySQLOrderBy**(`arg`: [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md)): [*string*, *string*, *string*]

The order by functionality for the currency type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md) | the order by arg   |

**Returns:** [*string*, *string*, *string*]

an array of string with the rule options

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:154](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L154)

___

### currencySQLOut

▸ **currencySQLOut**(`arg`: [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md)): [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md)

The sql out function

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md) | the argument out info   |

**Returns:** [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md)

a property definition supported currency type (or null)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:72](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L72)

___

### currencySQLSSCacheEqual

▸ **currencySQLSSCacheEqual**(`arg`: [*ISQLSSCacheEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md)): *boolean*

How to check equality with a value using the cache

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSSCacheEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md) | the argument to check against   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:223](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L223)

___

### currencySQLSearch

▸ **currencySQLSearch**(`arg`: [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)): *boolean*

Searching for currency values

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md) | the argument search info   |

**Returns:** *boolean*

a boolean on whether it's searched by it or not

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:93](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L93)

___

### currencySQLSelect

▸ **currencySQLSelect**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *string*[]

The selection for the currency in searches
does not need the normalized value

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) |

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts:32](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/currency.ts#L32)
