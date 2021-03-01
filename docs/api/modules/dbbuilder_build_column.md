[](../README.md) / [Exports](../modules.md) / dbbuilder/build-column

# Module: dbbuilder/build-column

This file contains the functions that are used in order to setup
columns in the database schema to be built

## Table of contents

### Functions

- [buildColumn](dbbuilder_build_column.md#buildcolumn)

## Functions

### buildColumn

▸ **buildColumn**(`columnName`: *string*, `columnData`: [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md), `tableBuilder`: [*CreateTableBuilder*](../classes/database_createtablebuilder.createtablebuilder.md) \| [*AlterTableBuilder*](../classes/database_altertablebuilder.altertablebuilder.md), `action?`: *ADD COLUMN* \| *DROP COLUMN* \| *ALTER COLUMN*): *void*

Builds a type for the table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`columnName` | *string* | the column name we want to create   |
`columnData` | [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md) | the column data from migrations   |
`tableBuilder` | [*CreateTableBuilder*](../classes/database_createtablebuilder.createtablebuilder.md) \| [*AlterTableBuilder*](../classes/database_altertablebuilder.altertablebuilder.md) | the table creator   |
`action?` | *ADD COLUMN* \| *DROP COLUMN* \| *ALTER COLUMN* | - |

**Returns:** *void*

Defined in: [dbbuilder/build-column.ts:19](https://github.com/onzag/itemize/blob/0e9b128c/dbbuilder/build-column.ts#L19)
