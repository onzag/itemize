[](../README.md) / [Exports](../modules.md) / dbbuilder/dump

# Module: dbbuilder/dump

Contains the dumper that dumps the database fractionally so that
it can be reloaded (refreshed)

## Table of contents

### Functions

- [default](dbbuilder_dump.md#default)

## Functions

### default

▸ **default**(`version`: *string*, `databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `root`: [*default*](../classes/base_root.default.md)): *Promise*<void\>

Actually runs the dump

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`version` | *string* | either development or production   |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database instance to read from   |
`root` | [*default*](../classes/base_root.default.md) | the root instance    |

**Returns:** *Promise*<void\>

Defined in: [dbbuilder/dump.ts:283](https://github.com/onzag/itemize/blob/0e9b128c/dbbuilder/dump.ts#L283)
