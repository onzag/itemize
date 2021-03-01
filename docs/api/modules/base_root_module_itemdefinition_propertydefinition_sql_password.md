[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/password

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/password

This file contains the password server side sql functionality

## Table of contents

### Functions

- [passwordSQLEqual](base_root_module_itemdefinition_propertydefinition_sql_password.md#passwordsqlequal)
- [passwordSQLIn](base_root_module_itemdefinition_propertydefinition_sql_password.md#passwordsqlin)
- [passwordSQLSSEqual](base_root_module_itemdefinition_propertydefinition_sql_password.md#passwordsqlssequal)
- [passwordSQLSearch](base_root_module_itemdefinition_propertydefinition_sql_password.md#passwordsqlsearch)

## Functions

### passwordSQLEqual

▸ **passwordSQLEqual**(`arg`: [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md)): *void*

Provides the equality function as run in the database

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md) | the sql equal arg info   |

**Returns:** *void*

a raw value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts:31](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts#L31)

___

### passwordSQLIn

▸ **passwordSQLIn**(`arg`: [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)): *object*

Specifies how to SQL in the password

**`eturns`** a partial row

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md) | the sql in info arg   |

**Returns:** *object*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts:15](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts#L15)

___

### passwordSQLSSEqual

▸ **passwordSQLSSEqual**(`arg`: [*ISQLSSCacheEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md)): *boolean*

Provides the equality function as run in a cached row

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSSCacheEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md) | the sql ss cache equal arg info   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts:45](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts#L45)

___

### passwordSQLSearch

▸ **passwordSQLSearch**(): *any*

Provides the password sql search functionality

**Returns:** *any*

nothing, it just throws an error

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts:69](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/password.ts#L69)
