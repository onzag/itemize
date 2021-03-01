[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/text

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/text

Provides the sql functions for use with the text type

## Table of contents

### Functions

- [textSQL](base_root_module_itemdefinition_propertydefinition_sql_text.md#textsql)
- [textSQLBtreeIndexable](base_root_module_itemdefinition_propertydefinition_sql_text.md#textsqlbtreeindexable)
- [textSQLIn](base_root_module_itemdefinition_propertydefinition_sql_text.md#textsqlin)
- [textSQLOrderBy](base_root_module_itemdefinition_propertydefinition_sql_text.md#textsqlorderby)
- [textSQLSearch](base_root_module_itemdefinition_propertydefinition_sql_text.md#textsqlsearch)
- [textSQLStrSearch](base_root_module_itemdefinition_propertydefinition_sql_text.md#textsqlstrsearch)

## Functions

### textSQL

▸ **textSQL**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *object*

Provides the sql form for the text type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) | the sql arg info   |

**Returns:** *object*

a partial row definition

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:16](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L16)

___

### textSQLBtreeIndexable

▸ **textSQLBtreeIndexable**(): *string*[]

Provides the btree indexable function for text type

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:173](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L173)

___

### textSQLIn

▸ **textSQLIn**(`arg`: [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)): *object*

Provides the sql in functionality for the text type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md) | the sql in arg info   |

**Returns:** *object*

a partial row value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:40](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L40)

___

### textSQLOrderBy

▸ **textSQLOrderBy**(`arg`: [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md)): [*string*, *string*, *string*]

Provides the order by rule form

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md) | the sql order by arg info   |

**Returns:** [*string*, *string*, *string*]

the order by rule string array (or null) if not possible to order

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:159](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L159)

___

### textSQLSearch

▸ **textSQLSearch**(`arg`: [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)): *boolean* \| [*string*, *any*[]]

Provides the text sql search functionality

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md) | the sql search arg info   |

**Returns:** *boolean* \| [*string*, *any*[]]

a boolean on whether it was searched by it, and a complementary column order by in case it needs it

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:94](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L94)

___

### textSQLStrSearch

▸ **textSQLStrSearch**(`arg`: [*ISQLStrSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlstrsearchinfo.md)): *boolean* \| [*string*, *any*[]]

Provides the text FTS str sql search functionality

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLStrSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlstrsearchinfo.md) | the sql str search arg info   |

**Returns:** *boolean* \| [*string*, *any*[]]

a boolean on whether it was searched by it, and a complementary column order by in case it needs it

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:129](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L129)
