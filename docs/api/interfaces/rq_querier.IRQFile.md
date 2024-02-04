[@onzag/itemize](../README.md) / [Modules](../modules.md) / [rq-querier](../modules/rq_querier.md) / IRQFile

# Interface: IRQFile

[rq-querier](../modules/rq_querier.md).IRQFile

This is how a rq file is meant
to be and send

## Hierarchy

- **`IRQFile`**

  ↳ [`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

## Table of contents

### Properties

- [id](rq_querier.IRQFile.md#id)
- [metadata](rq_querier.IRQFile.md#metadata)
- [name](rq_querier.IRQFile.md#name)
- [size](rq_querier.IRQFile.md#size)
- [src](rq_querier.IRQFile.md#src)
- [type](rq_querier.IRQFile.md#type)
- [url](rq_querier.IRQFile.md#url)

## Properties

### id

• **id**: `string`

an unique id

#### Defined in

[rq-querier.ts:87](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L87)

___

### metadata

• **metadata**: `string`

optional metadata, might be null, usually constains width and
height, set by the client, is limited to 128 characters

encoding is WxH;name,name,name as many names as there are special
dimensions, large, small and medium do not count

#### Defined in

[rq-querier.ts:103](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L103)

___

### name

• **name**: `string`

the name of the file

#### Defined in

[rq-querier.ts:79](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L79)

___

### size

• **size**: `number`

The size of the file in bytes

#### Defined in

[rq-querier.ts:95](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L95)

___

### src

• `Optional` **src**: `File` \| `Blob` \| `ReadStream` \| `Promise`\<\{ `createReadStream`: () => `ReadStream`  }\>

A source, either a File, Blob or a read stream

#### Defined in

[rq-querier.ts:107](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L107)

___

### type

• **type**: `string`

The mime type

#### Defined in

[rq-querier.ts:83](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L83)

___

### url

• **url**: `string`

the url where it is stored

#### Defined in

[rq-querier.ts:91](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L91)
