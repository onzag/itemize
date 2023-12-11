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

### Type Aliases

- [RichElement](client_internal_text_serializer.md#richelement)

### Variables

- [SERIALIZATION\_REGISTRY](client_internal_text_serializer.md#serialization_registry)

### Functions

- [allowsText](client_internal_text_serializer.md#allowstext)
- [checkShouldMerge](client_internal_text_serializer.md#checkshouldmerge)
- [deserialize](client_internal_text_serializer.md#deserialize)
- [deserializeChildrenForNode](client_internal_text_serializer.md#deserializechildrenfornode)
- [deserializePlain](client_internal_text_serializer.md#deserializeplain)
- [getAllowedChildrenTypes](client_internal_text_serializer.md#getallowedchildrentypes)
- [getContextFor](client_internal_text_serializer.md#getcontextfor)
- [getInfoFor](client_internal_text_serializer.md#getinfofor)
- [getNodeFor](client_internal_text_serializer.md#getnodefor)
- [getParentNodeFor](client_internal_text_serializer.md#getparentnodefor)
- [getUIHandlerValueFor](client_internal_text_serializer.md#getuihandlervaluefor)
- [getUIHandlerValueWithKnownContextFor](client_internal_text_serializer.md#getuihandlervaluewithknowncontextfor)
- [getUUIDFor](client_internal_text_serializer.md#getuuidfor)
- [isBlock](client_internal_text_serializer.md#isblock)
- [isElement](client_internal_text_serializer.md#iselement)
- [isInline](client_internal_text_serializer.md#isinline)
- [isMergable](client_internal_text_serializer.md#ismergable)
- [isSuperBlock](client_internal_text_serializer.md#issuperblock)
- [isText](client_internal_text_serializer.md#istext)
- [isVoid](client_internal_text_serializer.md#isvoid)
- [normalize](client_internal_text_serializer.md#normalize)
- [normalizeElement](client_internal_text_serializer.md#normalizeelement)
- [serialize](client_internal_text_serializer.md#serialize)

## Type Aliases

### RichElement

Ƭ **RichElement**: [`IParagraph`](../interfaces/client_internal_text_serializer_types_paragraph.IParagraph.md) \| [`IContainer`](../interfaces/client_internal_text_serializer_types_container.IContainer.md) \| [`ICustom`](../interfaces/client_internal_text_serializer_types_custom.ICustom.md) \| [`ILink`](../interfaces/client_internal_text_serializer_types_link.ILink.md) \| [`IQuote`](../interfaces/client_internal_text_serializer_types_quote.IQuote.md) \| [`ITitle`](../interfaces/client_internal_text_serializer_types_title.ITitle.md) \| [`IImage`](../interfaces/client_internal_text_serializer_types_image.IImage.md) \| [`IFile`](../interfaces/client_internal_text_serializer_types_file.IFile.md) \| [`IVideo`](../interfaces/client_internal_text_serializer_types_video.IVideo.md) \| [`IList`](../interfaces/client_internal_text_serializer_types_list.IList.md) \| [`IListItem`](../interfaces/client_internal_text_serializer_types_list_item.IListItem.md) \| [`IInline`](../interfaces/client_internal_text_serializer_types_inline.IInline.md) \| [`ITable`](../interfaces/client_internal_text_serializer_types_table.ITable.md) \| [`ITr`](../interfaces/client_internal_text_serializer_types_table.ITr.md) \| [`ITbody`](../interfaces/client_internal_text_serializer_types_table.ITbody.md) \| [`IThead`](../interfaces/client_internal_text_serializer_types_table.IThead.md) \| [`ITfoot`](../interfaces/client_internal_text_serializer_types_table.ITfoot.md) \| [`ITd`](../interfaces/client_internal_text_serializer_types_table.ITd.md) \| [`ITh`](../interfaces/client_internal_text_serializer_types_table.ITh.md) \| [`IVoidBlock`](../interfaces/client_internal_text_serializer_types_void_block.IVoidBlock.md) \| [`IVoidInline`](../interfaces/client_internal_text_serializer_types_void_inline.IVoidInline.md) \| [`IVoidSuperBlock`](../interfaces/client_internal_text_serializer_types_void_superblock.IVoidSuperBlock.md)

This is what a rich element can be, it can be all these
but it's not a text

#### Defined in

[client/internal/text/serializer/index.ts:724](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L724)

## Variables

### SERIALIZATION\_REGISTRY

• `Const` **SERIALIZATION\_REGISTRY**: [`ISerializationRegistryType`](../interfaces/client_internal_text_serializer.ISerializationRegistryType.md)

This is the actual serialization registry that the serializer is used
by default is started up empty

#### Defined in

[client/internal/text/serializer/index.ts:312](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L312)

## Functions

### allowsText

▸ **allowsText**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/index.ts:416](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L416)

___

### checkShouldMerge

▸ **checkShouldMerge**(`n1`, `n2`): `boolean`

Checks whether two nodes are mergable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n1` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) | the first node |
| `n2` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) | the second node |

#### Returns

`boolean`

a boolean on whether they should merge

#### Defined in

[client/internal/text/serializer/index.ts:1998](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L1998)

___

### deserialize

▸ **deserialize**(`html`, `comparer?`, `specialRules?`): [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

Deserializes a document from the HTML form into a root level document

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `html` | `string` \| `Node`[] | the html in string form or as an array of nodes |
| `comparer?` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) | an optional comparer root level document, if it matches the signature it will be efficient and return such comparer instead |
| `specialRules?` | `ISpecialRules` | - |

#### Returns

[`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

a root level document

#### Defined in

[client/internal/text/serializer/index.ts:935](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L935)

___

### deserializeChildrenForNode

▸ **deserializeChildrenForNode**(`node`): ([`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md))[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

([`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md))[]

#### Defined in

[client/internal/text/serializer/index.ts:1975](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L1975)

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

[client/internal/text/serializer/index.ts:2079](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L2079)

___

### getAllowedChildrenTypes

▸ **getAllowedChildrenTypes**(`node`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`string`[]

#### Defined in

[client/internal/text/serializer/index.ts:398](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L398)

___

### getContextFor

▸ **getContextFor**(`path`, `level`, `rootElement`, `rootContext`): [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

Provides the context for a given path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `number`[] | the path for the element to give context for |
| `level` | ``"final"`` \| ``"select-context"`` \| ``"select-loop"`` | the level the context is wanted, final means the context the element is at currently, select-context is the context where its own context resides, and select-loop is for loopable contexts |
| `rootElement` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) | the root document |
| `rootContext` | [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) | the root context |

#### Returns

[`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

a context object or null if no context found or invalid

#### Defined in

[client/internal/text/serializer/index.ts:524](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L524)

___

### getInfoFor

▸ **getInfoFor**(`node`, `i18nData`): `INodeInfo`

Provides the node info of a given node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) | the node, either text or rich element |
| `i18nData` | [`IPropertyEntryI18nRichTextInfo`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md) | the i18n information to be used to create the name |

#### Returns

`INodeInfo`

the node information

#### Defined in

[client/internal/text/serializer/index.ts:661](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L661)

___

### getNodeFor

▸ **getNodeFor**(`path`, `rootElement`): [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `number`[] |
| `rootElement` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

[`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md)

#### Defined in

[client/internal/text/serializer/index.ts:478](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L478)

___

### getParentNodeFor

▸ **getParentNodeFor**(`path`, `rootElement`): [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) \| [`RichElement`](client_internal_text_serializer.md#richelement)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `number`[] |
| `rootElement` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

[`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) \| [`RichElement`](client_internal_text_serializer.md#richelement)

#### Defined in

[client/internal/text/serializer/index.ts:494](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L494)

___

### getUIHandlerValueFor

▸ **getUIHandlerValueFor**(`element`, `path`, `rootElement`, `rootContext`): [`ITemplateArgUIHandlerDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](client_internal_text_serializer.md#richelement) |
| `path` | `number`[] |
| `rootElement` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |
| `rootContext` | [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) |

#### Returns

[`ITemplateArgUIHandlerDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md)

#### Defined in

[client/internal/text/serializer/index.ts:454](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L454)

___

### getUIHandlerValueWithKnownContextFor

▸ **getUIHandlerValueWithKnownContextFor**(`element`, `elementContext`, `rootContext`): [`ITemplateArgUIHandlerDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](client_internal_text_serializer.md#richelement) |
| `elementContext` | [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) |
| `rootContext` | [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) |

#### Returns

[`ITemplateArgUIHandlerDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md)

#### Defined in

[client/internal/text/serializer/index.ts:434](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L434)

___

### getUUIDFor

▸ **getUUIDFor**(`data`): `string`

Provides the correct uuid for a given text data

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`string`

#### Defined in

[client/internal/text/serializer/index.ts:915](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L915)

___

### isBlock

▸ **isBlock**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/index.ts:384](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L384)

___

### isElement

▸ **isElement**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/index.ts:373](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L373)

___

### isInline

▸ **isInline**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/index.ts:377](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L377)

___

### isMergable

▸ **isMergable**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/index.ts:365](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L365)

___

### isSuperBlock

▸ **isSuperBlock**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/index.ts:391](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L391)

___

### isText

▸ **isText**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/index.ts:361](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L361)

___

### isVoid

▸ **isVoid**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/index.ts:425](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L425)

___

### normalize

▸ **normalize**(`doc`, `specialRules?`): [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |
| `specialRules?` | `ISpecialRules` |

#### Returns

[`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

#### Defined in

[client/internal/text/serializer/index.ts:1048](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L1048)

___

### normalizeElement

▸ **normalizeElement**(`element`, `path`, `root`, `customExecution?`, `specialRules?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |
| `path` | `number`[] |
| `root` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |
| `customExecution?` | `ICustomExecution` |
| `specialRules?` | `ISpecialRules` |

#### Returns

`void`

#### Defined in

[client/internal/text/serializer/index.ts:1432](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L1432)

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

[client/internal/text/serializer/index.ts:744](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L744)
