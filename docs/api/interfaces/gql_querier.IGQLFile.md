[@onzag/itemize](../README.md) / [Modules](../modules.md) / [gql-querier](../modules/gql_querier.md) / IGQLFile

# Interface: IGQLFile

[gql-querier](../modules/gql_querier.md).IGQLFile

This is how a graphql file is meant
to be and send

## Hierarchy

- **`IGQLFile`**

  ↳ [`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

## Table of contents

### Properties

- [id](gql_querier.IGQLFile.md#id)
- [metadata](gql_querier.IGQLFile.md#metadata)
- [name](gql_querier.IGQLFile.md#name)
- [size](gql_querier.IGQLFile.md#size)
- [src](gql_querier.IGQLFile.md#src)
- [type](gql_querier.IGQLFile.md#type)
- [url](gql_querier.IGQLFile.md#url)

## Properties

### id

• **id**: `string`

an unique id

#### Defined in

[gql-querier.ts:85](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L85)

___

### metadata

• **metadata**: `string`

optional metadata, might be null, usually constains width and
height, set by the client, is limited to 128 characters

encoding is WxH;name,name,name as many names as there are special
dimensions, large, small and medium do not count

#### Defined in

[gql-querier.ts:101](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L101)

___

### name

• **name**: `string`

the name of the file

#### Defined in

[gql-querier.ts:77](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L77)

___

### size

• **size**: `number`

The size of the file in bytes

#### Defined in

[gql-querier.ts:93](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L93)

___

### src

• `Optional` **src**: `Blob` \| `ReadStream` \| `File` \| `Promise`<{ `createReadStream`: () => `ReadStream`  }\>

A source, either a File, Blob or a read stream

#### Defined in

[gql-querier.ts:105](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L105)

___

### type

• **type**: `string`

The mime type

#### Defined in

[gql-querier.ts:81](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L81)

___

### url

• **url**: `string`

the url where it is stored

#### Defined in

[gql-querier.ts:89](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L89)
