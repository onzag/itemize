[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/string

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/string

This file contains the sql server side functions for the string type

## Table of contents

### Functions

- [stringSQLSearch](base_root_module_itemdefinition_propertydefinition_sql_string.md#stringsqlsearch)
- [stringSQLStrSearch](base_root_module_itemdefinition_propertydefinition_sql_string.md#stringsqlstrsearch)

## Functions

### stringSQLSearch

▸ **stringSQLSearch**(`arg`: [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)): *boolean*

The string sql search functionality

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md) | the sql search arg info   |

**Returns:** *boolean*

a boolean on whether it was searched by it

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:16](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L16)

___

### stringSQLStrSearch

▸ **stringSQLStrSearch**(`arg`: [*ISQLStrSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlstrsearchinfo.md)): *boolean*

The string FTS search functionality from the search field

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLStrSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlstrsearchinfo.md) | the sql str search argument   |

**Returns:** *boolean*

a boolean on whether it was searched by it

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts:49](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/sql/string.ts#L49)
