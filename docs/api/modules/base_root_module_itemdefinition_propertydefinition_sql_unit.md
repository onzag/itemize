[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit

This file provides the sql functionality for the unit type

## Table of contents

### Functions

- [unitSQL](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsql)
- [unitSQLBtreeIndexable](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsqlbtreeindexable)
- [unitSQLEqual](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsqlequal)
- [unitSQLIn](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsqlin)
- [unitSQLOrderBy](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsqlorderby)
- [unitSQLOut](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsqlout)
- [unitSQLSSCacheEqual](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsqlsscacheequal)
- [unitSQLSearch](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsqlsearch)
- [unitSQLSelect](base_root_module_itemdefinition_propertydefinition_sql_unit.md#unitsqlselect)

## Functions

### unitSQL

▸ **unitSQL**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *object*

The unit sql function that specifies the schema

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) | the sql arg info   |

**Returns:** *object*

a patial row definition

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:17](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L17)

___

### unitSQLBtreeIndexable

▸ **unitSQLBtreeIndexable**(`arg`: [*ISQLBtreeIndexableInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md)): *string*[]

Specifies how units are to be btree indexed to accelerate searches

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLBtreeIndexableInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md) | the sql btree indexable info arg   |

**Returns:** *string*[]

the rows to be btree indexed

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:136](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L136)

___

### unitSQLEqual

▸ **unitSQLEqual**(`arg`: [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md)): *void*

Specifies how units are to be compared for equality in the database

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md) | the sql equal arg info   |

**Returns:** *void*

a partial row comparison

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:145](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L145)

___

### unitSQLIn

▸ **unitSQLIn**(`arg`: [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)): *object*

Specifies how units are to be sql in

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md) | the sql in arg info   |

**Returns:** *object*

a partial row value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:52](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L52)

___

### unitSQLOrderBy

▸ **unitSQLOrderBy**(`arg`: [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md)): [*string*, *string*, *string*]

Specifies how units are to be ordered by

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md) | the sql order by info arg   |

**Returns:** [*string*, *string*, *string*]

the three string order by rule

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:127](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L127)

___

### unitSQLOut

▸ **unitSQLOut**(`arg`: [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md)): [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md)

Specifies how units are to be outputted from a raw row

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md) | the sql out arg info   |

**Returns:** [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md)

a supported unit type (or null)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:75](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L75)

___

### unitSQLSSCacheEqual

▸ **unitSQLSSCacheEqual**(`arg`: [*ISQLSSCacheEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md)): *boolean*

Specifies how units are to be compared for equality in the cache

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSSCacheEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md) | the sql ss equal arg info   |

**Returns:** *boolean*

a boolean on whether the equality succeed or not

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:155](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L155)

___

### unitSQLSearch

▸ **unitSQLSearch**(`arg`: [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)): *boolean*

Specifies how units are to be searched by

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md) | the sql search arg info   |

**Returns:** *boolean*

a boolean on whether it was searched by it

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:93](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L93)

___

### unitSQLSelect

▸ **unitSQLSelect**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *string*[]

the selection function for unit based elements

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) | the arg    |

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts:38](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/unit.ts#L38)
