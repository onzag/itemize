[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/location

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/location

This file contains the sql functionality to be used with the location type

## Table of contents

### Functions

- [locationSQL](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsql)
- [locationSQLBtreeIndexable](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsqlbtreeindexable)
- [locationSQLEqual](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsqlequal)
- [locationSQLIn](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsqlin)
- [locationSQLOrderBy](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsqlorderby)
- [locationSQLOut](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsqlout)
- [locationSQLSSCacheEqual](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsqlsscacheequal)
- [locationSQLSearch](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsqlsearch)
- [locationSQLSelect](base_root_module_itemdefinition_propertydefinition_sql_location.md#locationsqlselect)

## Functions

### locationSQL

▸ **locationSQL**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *object*

provides the SQL form for the location type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) | the arg info   |

**Returns:** *object*

a partial row definition

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:19](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L19)

___

### locationSQLBtreeIndexable

▸ **locationSQLBtreeIndexable**(): *string*[]

Provides the btree indexable functionality

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:207](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L207)

___

### locationSQLEqual

▸ **locationSQLEqual**(`arg`: [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md)): *void*

Checks for equality within the database

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md) | the equal arg info   |

**Returns:** *void*

a partial row match

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:184](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L184)

___

### locationSQLIn

▸ **locationSQLIn**(`arg`: [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)): *object*

Provides the functionality for sql in of data into
the row

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md) | the sql in arg info   |

**Returns:** *object*

a partial row

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:76](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L76)

___

### locationSQLOrderBy

▸ **locationSQLOrderBy**(`arg`: [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md)): [*string*, *string*, *string*]

Provides the functionality on how to order by

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md) | the order by rule info   |

**Returns:** [*string*, *string*, *string*]

the order by rule string array

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:172](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L172)

___

### locationSQLOut

▸ **locationSQLOut**(`arg`: [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md)): [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

Provides the functionality to analyze a row value and
output the location type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md) | the sql out info   |

**Returns:** [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

a property definition supported location type, or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:105](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L105)

___

### locationSQLSSCacheEqual

▸ **locationSQLSSCacheEqual**(`arg`: [*ISQLSSCacheEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md)): *boolean*

Checks for equality within the cache

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSSCacheEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md) | the ss cache equal info   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:197](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L197)

___

### locationSQLSearch

▸ **locationSQLSearch**(`arg`: [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)): *boolean* \| [*string*, *any*[]]

Provides the search functionality for the location type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md) | the sql search info arg   |

**Returns:** *boolean* \| [*string*, *any*[]]

a boolean on whether it was searched by it, or an order by rule (also when it was searched by it)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:124](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L124)

___

### locationSQLSelect

▸ **locationSQLSelect**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *string*[]

provides the SQL select form for the location type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) | the arg info    |

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts:60](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/location.ts#L60)
