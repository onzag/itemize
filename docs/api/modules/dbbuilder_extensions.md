[](../README.md) / [Exports](../modules.md) / dbbuilder/extensions

# Module: dbbuilder/extensions

Adds the pgcrypto and the postgis extensions that are necessary if and only if they
are deemed necessary by the schema

## Table of contents

### Functions

- [prepareExtensions](dbbuilder_extensions.md#prepareextensions)

## Functions

### prepareExtensions

▸ **prepareExtensions**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `newDatabaseSchema`: [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)): *Promise*<void\>

Builds all the extensions as they are required to be processed

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`newDatabaseSchema` | [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md) | the new database schema as requested    |

**Returns:** *Promise*<void\>

Defined in: [dbbuilder/extensions.ts:16](https://github.com/onzag/itemize/blob/0e9b128c/dbbuilder/extensions.ts#L16)
