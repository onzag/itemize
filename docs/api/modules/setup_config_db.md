[](../README.md) / [Exports](../modules.md) / setup/config/db

# Module: setup/config/db

Configuration bit for the database

## Table of contents

### Functions

- [dbConfigSetup](setup_config_db.md#dbconfigsetup)

## Functions

### dbConfigSetup

▸ **dbConfigSetup**(`version`: *string*, `currentConfig`: [*IDBConfigRawJSONDataType*](../interfaces/config.idbconfigrawjsondatatype.md), `referenceConfig`: [*IDBConfigRawJSONDataType*](../interfaces/config.idbconfigrawjsondatatype.md), `packageJSON`: *any*): *Promise*<[*IDBConfigRawJSONDataType*](../interfaces/config.idbconfigrawjsondatatype.md)\>

Will ask for information about the database sensitive file
in order to build the db configuration json file

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`version` | *string* | the version, development or production   |
`currentConfig` | [*IDBConfigRawJSONDataType*](../interfaces/config.idbconfigrawjsondatatype.md) | the current file content   |
`referenceConfig` | [*IDBConfigRawJSONDataType*](../interfaces/config.idbconfigrawjsondatatype.md) | the reference content to use instead as base   |
`packageJSON` | *any* | the package json parsed file    |

**Returns:** *Promise*<[*IDBConfigRawJSONDataType*](../interfaces/config.idbconfigrawjsondatatype.md)\>

Defined in: [setup/config/db.ts:19](https://github.com/onzag/itemize/blob/28218320/setup/config/db.ts#L19)
