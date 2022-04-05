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

[gql-querier.ts:80](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L80)

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

[gql-querier.ts:96](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L96)

___

### name

• **name**: `string`

the name of the file

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[name](gql_querier.IGQLFile.md#name)

#### Defined in

[gql-querier.ts:72](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L72)

___

### size

• **size**: `number`

The size of the file in bytes

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[size](gql_querier.IGQLFile.md#size)

#### Defined in

[gql-querier.ts:88](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L88)

___

### src

• `Optional` **src**: `Promise`<`any`\> \| `File` \| `Blob`

A source, either a File, Blob or a read stream

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[src](gql_querier.IGQLFile.md#src)

#### Defined in

[gql-querier.ts:100](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L100)

___

### type

• **type**: `string`

The mime type

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[type](gql_querier.IGQLFile.md#type)

#### Defined in

[gql-querier.ts:76](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L76)

___

### url

• **url**: `string`

the url where it is stored

#### Inherited from

[IGQLFile](gql_querier.IGQLFile.md).[url](gql_querier.IGQLFile.md#url)

#### Defined in

[gql-querier.ts:84](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L84)
