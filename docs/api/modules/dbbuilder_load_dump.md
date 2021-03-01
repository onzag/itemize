[](../README.md) / [Exports](../modules.md) / dbbuilder/load-dump

# Module: dbbuilder/load-dump

Performs the loading of the dumps that are presents in the dump folder

## Table of contents

### Functions

- [copyFilesFor](dbbuilder_load_dump.md#copyfilesfor)
- [default](dbbuilder_load_dump.md#default)

## Functions

### copyFilesFor

▸ **copyFilesFor**(`uploadClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `localPath`: *string*, `remotePath`: *string*): *Promise*<void\>

Copy the local files from the dump into the container by sending
them via the cloud client

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`uploadClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | the cloud client   |
`localPath` | *string* | the local path we are currently working with, must be a folder   |
`remotePath` | *string* | the remote path we are expected to copy at    |

**Returns:** *Promise*<void\>

Defined in: [dbbuilder/load-dump.ts:40](https://github.com/onzag/itemize/blob/28218320/dbbuilder/load-dump.ts#L40)

___

### default

▸ **default**(`configVersion`: *string*, `databaseConnection`: [*DatabaseConnection*](../classes/database.databaseconnection.md), `root`: [*default*](../classes/base_root.default.md)): *Promise*<void\>

Performs the dump loading

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configVersion` | *string* | either development or production   |
`databaseConnection` | [*DatabaseConnection*](../classes/database.databaseconnection.md) | the database connection   |
`root` | [*default*](../classes/base_root.default.md) | the root    |

**Returns:** *Promise*<void\>

Defined in: [dbbuilder/load-dump.ts:97](https://github.com/onzag/itemize/blob/28218320/dbbuilder/load-dump.ts#L97)
