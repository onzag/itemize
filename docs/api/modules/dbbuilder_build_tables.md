[](../README.md) / [Exports](../modules.md) / dbbuilder/build-tables

# Module: dbbuilder/build-tables

Contains the functionality that is used in order to generate
the base structure of the tables and the database itself, by
morphing SQL schemas into one another

## Table of contents

### Functions

- [addMissingColumnToTable](dbbuilder_build_tables.md#addmissingcolumntotable)
- [buildTables](dbbuilder_build_tables.md#buildtables)
- [createTable](dbbuilder_build_tables.md#createtable)
- [dropExtraColumnInTable](dbbuilder_build_tables.md#dropextracolumnintable)
- [dropTable](dbbuilder_build_tables.md#droptable)
- [updateColumnInTable](dbbuilder_build_tables.md#updatecolumnintable)
- [updateTable](dbbuilder_build_tables.md#updatetable)

## Functions

### addMissingColumnToTable

▸ **addMissingColumnToTable**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `tableName`: *string*, `newColumnName`: *string*, `newColumnSchema`: [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md)): *Promise*<[*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md)\>

Adds a missing column to a table that already exists

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`tableName` | *string* | the table name in question   |
`newColumnName` | *string* | the name of the column   |
`newColumnSchema` | [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md) | the schema of the column   |

**Returns:** *Promise*<[*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md)\>

the new generated column or null if failed to generate

Defined in: [dbbuilder/build-tables.ts:46](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-tables.ts#L46)

___

### buildTables

▸ **buildTables**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `currentDatabaseSchema`: [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md), `newDatabaseSchema`: [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)): *Promise*<[*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)\>

This function actually does the database calls

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`currentDatabaseSchema` | [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md) | the previous latest migration config that shows the current state of the database   |
`newDatabaseSchema` | [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md) | the new migration config we expect to apply (and we would modify if it changes)   |

**Returns:** *Promise*<[*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)\>

a promise with the definition that was actually built

Defined in: [dbbuilder/build-tables.ts:382](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-tables.ts#L382)

___

### createTable

▸ **createTable**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `tableName`: *string*, `newTableSchema`: [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)): *Promise*<[*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)\>

Creates a table in the database

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`tableName` | *string* | the table name that needs to be created   |
`newTableSchema` | [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md) | the new table schema   |

**Returns:** *Promise*<[*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)\>

a promise for the actual table that was built or null if not added

Defined in: [dbbuilder/build-tables.ts:233](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-tables.ts#L233)

___

### dropExtraColumnInTable

▸ **dropExtraColumnInTable**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `tableName`: *string*, `currentColumnName`: *string*, `currentColumnSchema`: [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md)): *Promise*<{ `defaultTo?`: *any* ; `ext?`: *string* ; `foreignKey?`: { `column`: *string* ; `deleteAction`: *string* ; `id`: *string* ; `level`: *number* ; `table`: *string* ; `updateAction`: *string*  } ; `index?`: [*ISQLTableIndexType*](../interfaces/base_root_sql.isqltableindextype.md) ; `notNull?`: *boolean* ; `type`: *string*  }\>

Drops a column in a table that does not exist in the new schema
but existed in the previous schema

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`tableName` | *string* | the table in question   |
`currentColumnName` | *string* | the column name in question   |
`currentColumnSchema` | [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md) | the column schema to drop   |

**Returns:** *Promise*<{ `defaultTo?`: *any* ; `ext?`: *string* ; `foreignKey?`: { `column`: *string* ; `deleteAction`: *string* ; `id`: *string* ; `level`: *number* ; `table`: *string* ; `updateAction`: *string*  } ; `index?`: [*ISQLTableIndexType*](../interfaces/base_root_sql.isqltableindextype.md) ; `notNull?`: *boolean* ; `type`: *string*  }\>

the result of dropping the column, usually null, but the column schema itself if cancelled

Defined in: [dbbuilder/build-tables.ts:111](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-tables.ts#L111)

___

### dropTable

▸ **dropTable**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `tableName`: *string*, `currentTableSchema`: [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)): *Promise*<[*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)\>

Drops a table in the database that should not exist anymore
but according to the previous schema exists

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`tableName` | *string* | the table to drop   |
`currentTableSchema` | [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md) | the schema of the table to drop   |

**Returns:** *Promise*<[*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)\>

the result of dropping the table, usually null, unless cancelled

Defined in: [dbbuilder/build-tables.ts:346](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-tables.ts#L346)

___

### updateColumnInTable

▸ **updateColumnInTable**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `tableName`: *string*, `columnName`: *string*, `newColumnSchema`: [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md), `currentColumnSchema`: [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md)): *Promise*<[*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md)\>

Updates a column in a table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`tableName` | *string* | the table name in question   |
`columnName` | *string* | the column name   |
`newColumnSchema` | [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md) | the new column schema   |
`currentColumnSchema` | [*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md) | the current column schema   |

**Returns:** *Promise*<[*ISQLColumnDefinitionType*](../interfaces/base_root_sql.isqlcolumndefinitiontype.md)\>

the updated result if managed

Defined in: [dbbuilder/build-tables.ts:168](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-tables.ts#L168)

___

### updateTable

▸ **updateTable**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `tableName`: *string*, `newTableSchema`: [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md), `currentTableSchema`: [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)): *Promise*<[*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)\>

Updates a table that has changed from one form
to another

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`tableName` | *string* | the table name to update   |
`newTableSchema` | [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md) | the new schema   |
`currentTableSchema` | [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md) | the current schema   |

**Returns:** *Promise*<[*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)\>

the actual schema it managed to generate

Defined in: [dbbuilder/build-tables.ts:282](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-tables.ts#L282)
