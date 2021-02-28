[](../README.md) / [Exports](../modules.md) / dbbuilder/id

# Module: dbbuilder/id

This file contains the utilities for the id type to be handled inside
the tables

## Table of contents

### Functions

- [postprocessIdTriggers](dbbuilder_id.md#postprocessidtriggers)
- [prepareIdTrigger](dbbuilder_id.md#prepareidtrigger)

## Functions

### postprocessIdTriggers

▸ **postprocessIdTriggers**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `currentDatabaseSchema`: [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)): *Promise*<void\>

Processes the triggers that are required in the tables that hold an id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance   |
`currentDatabaseSchema` | [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md) | the database schema as requested    |

**Returns:** *Promise*<void\>

Defined in: [dbbuilder/id.ts:57](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/id.ts#L57)

___

### prepareIdTrigger

▸ **prepareIdTrigger**(`databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md)): *Promise*<void\>

Prepares the id trigger as it is required

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance    |

**Returns:** *Promise*<void\>

Defined in: [dbbuilder/id.ts:46](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/id.ts#L46)
