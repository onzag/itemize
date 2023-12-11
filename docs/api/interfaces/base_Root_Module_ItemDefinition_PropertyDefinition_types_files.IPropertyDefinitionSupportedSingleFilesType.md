[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types/files](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md) / IPropertyDefinitionSupportedSingleFilesType

# Interface: IPropertyDefinitionSupportedSingleFilesType

[base/Root/Module/ItemDefinition/PropertyDefinition/types/files](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md).IPropertyDefinitionSupportedSingleFilesType

This is how a rq file is meant
to be and send

## Hierarchy

- [`IRQFile`](rq_querier.IRQFile.md)

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

[IRQFile](rq_querier.IRQFile.md).[id](rq_querier.IRQFile.md#id)

#### Defined in

[rq-querier.ts:87](https://github.com/onzag/itemize/blob/59702dd5/rq-querier.ts#L87)

___

### metadata

• **metadata**: `string`

optional metadata, might be null, usually constains width and
height, set by the client, is limited to 128 characters

encoding is WxH;name,name,name as many names as there are special
dimensions, large, small and medium do not count

#### Inherited from

[IRQFile](rq_querier.IRQFile.md).[metadata](rq_querier.IRQFile.md#metadata)

#### Defined in

[rq-querier.ts:103](https://github.com/onzag/itemize/blob/59702dd5/rq-querier.ts#L103)

___

### name

• **name**: `string`

the name of the file

#### Inherited from

[IRQFile](rq_querier.IRQFile.md).[name](rq_querier.IRQFile.md#name)

#### Defined in

[rq-querier.ts:79](https://github.com/onzag/itemize/blob/59702dd5/rq-querier.ts#L79)

___

### size

• **size**: `number`

The size of the file in bytes

#### Inherited from

[IRQFile](rq_querier.IRQFile.md).[size](rq_querier.IRQFile.md#size)

#### Defined in

[rq-querier.ts:95](https://github.com/onzag/itemize/blob/59702dd5/rq-querier.ts#L95)

___

### src

• `Optional` **src**: `File` \| `Blob` \| `ReadStream` \| `Promise`\<\{ `createReadStream`: () => `ReadStream`  }\>

A source, either a File, Blob or a read stream

#### Inherited from

[IRQFile](rq_querier.IRQFile.md).[src](rq_querier.IRQFile.md#src)

#### Defined in

[rq-querier.ts:107](https://github.com/onzag/itemize/blob/59702dd5/rq-querier.ts#L107)

___

### type

• **type**: `string`

The mime type

#### Inherited from

[IRQFile](rq_querier.IRQFile.md).[type](rq_querier.IRQFile.md#type)

#### Defined in

[rq-querier.ts:83](https://github.com/onzag/itemize/blob/59702dd5/rq-querier.ts#L83)

___

### url

• **url**: `string`

the url where it is stored

#### Inherited from

[IRQFile](rq_querier.IRQFile.md).[url](rq_querier.IRQFile.md#url)

#### Defined in

[rq-querier.ts:91](https://github.com/onzag/itemize/blob/59702dd5/rq-querier.ts#L91)
