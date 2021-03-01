[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management

Contains the functionality that makes it so that when files come from graphql
streams and are to be stored in the database the files are sent somewhere else
and the url is actually what it's stored

## Table of contents

### Functions

- [deleteEverythingInFilesContainerId](base_root_module_itemdefinition_propertydefinition_sql_file_management.md#deleteeverythinginfilescontainerid)
- [processFileListFor](base_root_module_itemdefinition_propertydefinition_sql_file_management.md#processfilelistfor)
- [processSingleFileFor](base_root_module_itemdefinition_propertydefinition_sql_file_management.md#processsinglefilefor)
- [sqlUploadPipeFile](base_root_module_itemdefinition_propertydefinition_sql_file_management.md#sqluploadpipefile)

## Functions

### deleteEverythingInFilesContainerId

▸ **deleteEverythingInFilesContainerId**(`domain`: *string*, `uploadsClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `itemDefinitionOrModule`: [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md), `idVersionId`: *string*): *Promise*<void\>

Deletes the folder that contains all
the file data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`domain` | *string* | the domain we are working with   |
`uploadsClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | the uploads client   |
`itemDefinitionOrModule` | [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md) | the item definition or module in question   |
`idVersionId` | *string* | the transitory id to drop   |

**Returns:** *Promise*<void\>

a void promise from when this is done

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts:350](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts#L350)

___

### processFileListFor

▸ **processFileListFor**(`newValues`: [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[], `oldValues`: [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[], `uploadsClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `domain`: *string*, `itemDefinitionOrModule`: [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `propertyDefinition`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)): *object*

Processes an extended list based
file value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`newValues` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[] | the new values as a list   |
`oldValues` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[] | the old values that this came from   |
`uploadsClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | the uploads client   |
`domain` | *string* | - |
`itemDefinitionOrModule` | [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md) | the item definition or module (for prop extension) these values are related to   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include this values are related to   |
`propertyDefinition` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property (must be of type file)   |

**Returns:** *object*

Name | Type |
:------ | :------ |
`consumeStreams` | [*ConsumeStreamsFnType*](base_root_sql.md#consumestreamsfntype) |
`value` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[] |

the new values and the consume streams function that will actually consume the
streams to store in the remote storage solution

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts:40](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts#L40)

___

### processSingleFileFor

▸ **processSingleFileFor**(`newValue`: [*IGQLFile*](../interfaces/gql_querier.igqlfile.md), `oldValue`: [*IGQLFile*](../interfaces/gql_querier.igqlfile.md), `uploadsClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `domain`: *string*, `itemDefinitionOrModule`: [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `propertyDefinition`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)): *object*

Processes a single file, and either gives
null or the output, the file, and its possible replacement
should be of different id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`newValue` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) | the new value   |
`oldValue` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) | the old value   |
`uploadsClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | - |
`domain` | *string* | the domain we are storing for   |
`itemDefinitionOrModule` | [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md) | the item definition or module these values are related to   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include this values are related to   |
`propertyDefinition` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property (must be of type file)   |

**Returns:** *object*

Name | Type |
:------ | :------ |
`consumeStreams` | [*ConsumeStreamsFnType*](base_root_sql.md#consumestreamsfntype) |
`value` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) |

the new value (or null) consume streams function that will actually consume the
streams to store in the remote storage solution

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts:122](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts#L122)

___

### sqlUploadPipeFile

▸ **sqlUploadPipeFile**(`uploadsClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `readStream`: ReadStream \| sharp.Sharp, `domain`: *string*, `remote`: *string*): *Promise*<void\>

Uploads a file in a given upload container

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`uploadsClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | the uploads client   |
`readStream` | ReadStream \| sharp.Sharp | the read stream of the file   |
`domain` | *string* | - |
`remote` | *string* | the remote name this file is uploaded as, it's whole path   |

**Returns:** *Promise*<void\>

a void promise

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts:423](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts#L423)
