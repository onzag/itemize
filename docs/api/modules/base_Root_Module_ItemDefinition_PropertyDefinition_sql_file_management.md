[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management

Contains the functionality that makes it so that when files come from rq
streams and are to be stored in the database the files are sent somewhere else
and the url is actually what it's stored

## Table of contents

### Functions

- [deleteEverythingInFilesContainerId](base_Root_Module_ItemDefinition_PropertyDefinition_sql_file_management.md#deleteeverythinginfilescontainerid)
- [processFileListFor](base_Root_Module_ItemDefinition_PropertyDefinition_sql_file_management.md#processfilelistfor)
- [processSingleFileFor](base_Root_Module_ItemDefinition_PropertyDefinition_sql_file_management.md#processsinglefilefor)
- [sqlUploadPipeFile](base_Root_Module_ItemDefinition_PropertyDefinition_sql_file_management.md#sqluploadpipefile)

## Functions

### deleteEverythingInFilesContainerId

▸ **deleteEverythingInFilesContainerId**(`domain`, `uploadsClient`, `itemDefinitionOrModule`, `idVersionId`): `Promise`\<`void`\>

Deletes the folder that contains all
the file data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | the domain we are working with |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)\<`any`\> | the uploads client |
| `itemDefinitionOrModule` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) \| [`default`](../classes/base_Root_Module.default.md) | the item definition or module in question |
| `idVersionId` | `string` | the transitory id to drop |

#### Returns

`Promise`\<`void`\>

a void promise from when this is done

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts:391](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts#L391)

___

### processFileListFor

▸ **processFileListFor**(`newValues`, `oldValues`, `uploadsClient`, `domain`, `itemDefinitionOrModule`, `include`, `propertyDefinition`): `Object`

Processes an extended list based
file value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newValues` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[] | the new values as a list |
| `oldValues` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[] | the old values that this came from |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)\<`any`\> | the uploads client |
| `domain` | `string` | - |
| `itemDefinitionOrModule` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) \| [`default`](../classes/base_Root_Module.default.md) | the item definition or module (for prop extension) these values are related to |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include this values are related to |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property (must be of type file) |

#### Returns

`Object`

the new values and the consume streams function that will actually consume the
streams to store in the remote storage solution

| Name | Type |
| :------ | :------ |
| `consumeStreams` | [`ConsumeStreamsFnType`](base_Root_sql.md#consumestreamsfntype) |
| `value` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[] |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts:38](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts#L38)

___

### processSingleFileFor

▸ **processSingleFileFor**(`newValue`, `oldValue`, `uploadsClient`, `domain`, `itemDefinitionOrModule`, `include`, `propertyDefinition`): `Object`

Processes a single file, and either gives
null or the output, the file, and its possible replacement
should be of different id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newValue` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) | the new value |
| `oldValue` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) | the old value |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)\<`any`\> | - |
| `domain` | `string` | the domain we are storing for |
| `itemDefinitionOrModule` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) \| [`default`](../classes/base_Root_Module.default.md) | the item definition or module these values are related to |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include this values are related to |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property (must be of type file) |

#### Returns

`Object`

the new value (or null) consume streams function that will actually consume the
streams to store in the remote storage solution

| Name | Type |
| :------ | :------ |
| `consumeStreams` | [`ConsumeStreamsFnType`](base_Root_sql.md#consumestreamsfntype) |
| `value` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts:120](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts#L120)

___

### sqlUploadPipeFile

▸ **sqlUploadPipeFile**(`uploadsClient`, `readStream`, `domain`, `remote`): `Promise`\<`void`\>

Uploads a file in a given upload container

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)\<`any`\> | the uploads client |
| `readStream` | `ReadStream` \| `Sharp` | the read stream of the file |
| `domain` | `string` | - |
| `remote` | `string` | the remote name this file is uploaded as, it's whole path |

#### Returns

`Promise`\<`void`\>

a void promise

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts:473](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management.ts#L473)
