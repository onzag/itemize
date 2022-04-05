[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/text/serializer

# Module: client/internal/text/serializer

This file contains the serializer and deserializer basic functionality that allows
to handle the standard itemize text specification

## Table of contents

### Interfaces

- [IReactifyArg](../interfaces/client_internal_text_serializer.IReactifyArg.md)
- [IReactifyExtraOptions](../interfaces/client_internal_text_serializer.IReactifyExtraOptions.md)
- [IRootLevelDocument](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)
- [ISerializationRegistryType](../interfaces/client_internal_text_serializer.ISerializationRegistryType.md)

### Type aliases

- [RichElement](client_internal_text_serializer.md#richelement)

### Variables

- [SERIALIZATION\_REGISTRY](client_internal_text_serializer.md#serialization_registry)

### Functions

- [deserialize](client_internal_text_serializer.md#deserialize)
- [deserializeChildrenForNode](client_internal_text_serializer.md#deserializechildrenfornode)
- [deserializeElement](client_internal_text_serializer.md#deserializeelement)
- [deserializePlain](client_internal_text_serializer.md#deserializeplain)
- [serialize](client_internal_text_serializer.md#serialize)

## Type aliases

### RichElement

Ƭ **RichElement**: [`IParagraph`](../interfaces/client_internal_text_serializer_types_paragraph.IParagraph.md) \| [`IContainer`](../interfaces/client_internal_text_serializer_types_container.IContainer.md) \| [`ICustom`](../interfaces/client_internal_text_serializer_types_custom.ICustom.md) \| [`ILink`](../interfaces/client_internal_text_serializer_types_link.ILink.md) \| [`IQuote`](../interfaces/client_internal_text_serializer_types_quote.IQuote.md) \| [`ITitle`](../interfaces/client_internal_text_serializer_types_title.ITitle.md) \| [`IImage`](../interfaces/client_internal_text_serializer_types_image.IImage.md) \| [`IFile`](../interfaces/client_internal_text_serializer_types_file.IFile.md) \| [`IVideo`](../interfaces/client_internal_text_serializer_types_video.IVideo.md) \| [`IList`](../interfaces/client_internal_text_serializer_types_list.IList.md) \| [`IListItem`](../interfaces/client_internal_text_serializer_types_list_item.IListItem.md) \| [`IInline`](../interfaces/client_internal_text_serializer_types_inline.IInline.md) \| [`ITableElement`](../interfaces/client_internal_text_serializer_types_table_element.ITableElement.md)

This is what a rich element can be, it can be all these
but it's not a text

#### Defined in

[client/internal/text/serializer/index.ts:187](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L187)

## Variables

### SERIALIZATION\_REGISTRY

• **SERIALIZATION\_REGISTRY**: [`ISerializationRegistryType`](../interfaces/client_internal_text_serializer.ISerializationRegistryType.md)

This is the actual serialization registry that the serializer is used
by default is started up empty

#### Defined in

[client/internal/text/serializer/index.ts:155](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L155)

## Functions

### deserialize

▸ **deserialize**(`html`, `comparer?`): [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

Deserializes a document from the HTML form into a root level document

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `html` | `string` \| `Node`[] | the html in string form or as an array of nodes |
| `comparer?` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) | an optional comparer root level document, if it matches the signature it will be efficient and return such comparer instead |

#### Returns

[`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

a root level document

#### Defined in

[client/internal/text/serializer/index.ts:316](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L316)

___

### deserializeChildrenForNode

▸ **deserializeChildrenForNode**(`node`, `parentContainment`): ([`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md))[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` \| `Node`[] |
| `parentContainment` | ``"block"`` \| ``"superblock"`` \| ``"inline"`` \| ``"list-superblock"`` |

#### Returns

([`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md))[]

#### Defined in

[client/internal/text/serializer/index.ts:419](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L419)

___

### deserializeElement

▸ **deserializeElement**(`parentContainment`, `node`, `previousSibling`): `INodeInfo`

Deserializes a single element from its node into a rich element
or a text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentContainment` | ``"block"`` \| ``"superblock"`` \| ``"inline"`` \| ``"list-superblock"`` | specifies the containment of the parent |
| `node` | `Node` | the html node to deserialize |
| `previousSibling` | `INodeInfo` | - |

#### Returns

`INodeInfo`

a RichElement or a text node

#### Defined in

[client/internal/text/serializer/index.ts:450](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L450)

___

### deserializePlain

▸ **deserializePlain**(`data`, `comparer?`): [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

Deserializes simple plain text into a cheated document
that is like a rich text, but split in paragraphs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | the data to deserialize, always a string |
| `comparer?` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) | a comparer to use against |

#### Returns

[`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

#### Defined in

[client/internal/text/serializer/index.ts:733](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L733)

___

### serialize

▸ **serialize**(`root`): `HTMLElement`[] \| `string`

Serializes a document
will return html elements for rich documents
or a string for plain documents

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`HTMLElement`[] \| `string`

#### Defined in

[client/internal/text/serializer/index.ts:219](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L219)
