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

[gql-querier.ts:85](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L85)

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

[gql-querier.ts:101](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L101)

___

### name

• **name**: `string`

the name of the file

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[name](gql_querier.IGQLFile.md#name)

#### Defined in

[gql-querier.ts:77](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L77)

___

### size

• **size**: `number`

The size of the file in bytes

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[size](gql_querier.IGQLFile.md#size)

#### Defined in

[gql-querier.ts:93](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L93)

___

### src

• `Optional` **src**: `Blob` \| `ReadStream` \| `File` \| `Promise`<{ `createReadStream`: () => `ReadStream`  }\>

A source, either a File, Blob or a read stream

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[src](gql_querier.IGQLFile.md#src)

#### Defined in

[gql-querier.ts:105](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L105)

___

### type

• **type**: `string`

The mime type

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[type](gql_querier.IGQLFile.md#type)

#### Defined in

[gql-querier.ts:81](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L81)

___

### url

• **url**: `string`

the url where it is stored

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[url](gql_querier.IGQLFile.md#url)

#### Defined in

[gql-querier.ts:89](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L89)
