[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types/files](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md) / IPropertyDefinitionSupportedSingleFilesType

# Interface: IPropertyDefinitionSupportedSingleFilesType

[base/Root/Module/ItemDefinition/PropertyDefinition/types/files](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md).IPropertyDefinitionSupportedSingleFilesType

## Hierarchy

- [`IGQLFile`](gql_querier.IGQLFile.md)

  ↳ **`IPropertyDefinitionSupportedSingleFilesType`**

## Table of contents

### Properties

- [id](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md#id)
- [metadata](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md#metadata)
- [name](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md#name)
- [size](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md#size)
- [src](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md#src)
- [type](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md#type)
- [url](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md#url)

## Properties

### id

• **id**: `string`

an unique id

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[id](gql_querier.IGQLFile.md#id)

#### Defined in

[gql-querier.ts:87](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L87)

___

### metadata

• **metadata**: `string`

optional metadata, might be null, usually constains width and
height, set by the client, is limited to 128 characters

encoding is WxH;name,name,name as many names as there are special
dimensions, large, small and medium do not count

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[metadata](gql_querier.IGQLFile.md#metadata)

#### Defined in

[gql-querier.ts:103](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L103)

___

### name

• **name**: `string`

the name of the file

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[name](gql_querier.IGQLFile.md#name)

#### Defined in

[gql-querier.ts:79](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L79)

___

### size

• **size**: `number`

The size of the file in bytes

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[size](gql_querier.IGQLFile.md#size)

#### Defined in

[gql-querier.ts:95](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L95)

___

### src

• `Optional` **src**: `Blob` \| `ReadStream` \| `File` \| `Promise`<{ `createReadStream`: () => `ReadStream`  }\>

A source, either a File, Blob or a read stream

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[src](gql_querier.IGQLFile.md#src)

#### Defined in

[gql-querier.ts:107](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L107)

___

### type

• **type**: `string`

The mime type

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[type](gql_querier.IGQLFile.md#type)

#### Defined in

[gql-querier.ts:83](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L83)

___

### url

• **url**: `string`

the url where it is stored

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[url](gql_querier.IGQLFile.md#url)

#### Defined in

[gql-querier.ts:91](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L91)
