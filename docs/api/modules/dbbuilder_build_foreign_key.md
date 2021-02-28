[](../README.md) / [Exports](../modules.md) / dbbuilder/build-foreign-key

# Module: dbbuilder/build-foreign-key

This file is in charge of building the foreign keys of an stablished current database
so that references can be respected

## Table of contents

### Variables

- [MAX\_PG\_FK\_SIZE](dbbuilder_build_foreign_key.md#max_pg_fk_size)

### Functions

- [buildForeignKeys](dbbuilder_build_foreign_key.md#buildforeignkeys)
- [makeIdOutOf](dbbuilder_build_foreign_key.md#makeidoutof)

## Variables

### MAX\_PG\_FK\_SIZE

• `Const` **MAX\_PG\_FK\_SIZE**: *60*= 60

Defined in: [dbbuilder/build-foreign-key.ts:34](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-foreign-key.ts#L34)

## Functions

### buildForeignKeys

▸ **buildForeignKeys**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `currentDatabaseSchema`: [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md), `newDatabaseSchema`: [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)): *Promise*<[*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)\>

Builds all the foreign keys

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`currentDatabaseSchema` | [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md) | the current database schema   |
`newDatabaseSchema` | [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md) | the new database schema as requested   |

**Returns:** *Promise*<[*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)\>

the resulting database schema and the new current

Defined in: [dbbuilder/build-foreign-key.ts:43](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-foreign-key.ts#L43)

___

### makeIdOutOf

▸ **makeIdOutOf**(`str`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |

**Returns:** *string*

Defined in: [dbbuilder/build-foreign-key.ts:31](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/build-foreign-key.ts#L31)
