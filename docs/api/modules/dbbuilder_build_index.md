[](../README.md) / [Exports](../modules.md) / dbbuilder/build-index

# Module: dbbuilder/build-index

This file is in charge of building the postgresql indexes on the database
for speeding up things and setting up unique constraints

## Table of contents

### Variables

- [MAX\_PG\_INDEX\_SIZE](dbbuilder_build_index.md#max_pg_index_size)

### Functions

- [buildIndexes](dbbuilder_build_index.md#buildindexes)
- [makeIdOutOf](dbbuilder_build_index.md#makeidoutof)

## Variables

### MAX\_PG\_INDEX\_SIZE

• `Const` **MAX\_PG\_INDEX\_SIZE**: *60*= 60

Defined in: [dbbuilder/build-index.ts:19](https://github.com/onzag/itemize/blob/0e9b128c/dbbuilder/build-index.ts#L19)

## Functions

### buildIndexes

▸ **buildIndexes**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `currentDatabaseSchema`: [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md), `newDatabaseSchema`: [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)): *Promise*<[*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)\>

Builds all the indexes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`currentDatabaseSchema` | [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md) | the current database schema   |
`newDatabaseSchema` | [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md) | the new database schema as requested   |

**Returns:** *Promise*<[*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)\>

the resulting database schema and the new current

Defined in: [dbbuilder/build-index.ts:40](https://github.com/onzag/itemize/blob/0e9b128c/dbbuilder/build-index.ts#L40)

___

### makeIdOutOf

▸ **makeIdOutOf**(`str`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |

**Returns:** *string*

Defined in: [dbbuilder/build-index.ts:16](https://github.com/onzag/itemize/blob/0e9b128c/dbbuilder/build-index.ts#L16)
