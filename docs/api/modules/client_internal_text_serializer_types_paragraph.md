[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/text/serializer/types/paragraph

# Module: client/internal/text/serializer/types/paragraph

Contains the serialization, reactification and deserialization functions
for the paragraph element

## Table of contents

### Interfaces

- [IParagraph](../interfaces/client_internal_text_serializer_types_paragraph.IParagraph.md)

### Functions

- [STANDARD\_PARAGRAPH](client_internal_text_serializer_types_paragraph.md#standard_paragraph)
- [registerParagraph](client_internal_text_serializer_types_paragraph.md#registerparagraph)

## Functions

### STANDARD\_PARAGRAPH

▸ **STANDARD_PARAGRAPH**(`text?`): [`IParagraph`](../interfaces/client_internal_text_serializer_types_paragraph.IParagraph.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `text?` | `string` \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) |

#### Returns

[`IParagraph`](../interfaces/client_internal_text_serializer_types_paragraph.IParagraph.md)

#### Defined in

[client/internal/text/serializer/types/paragraph.ts:15](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/types/paragraph.ts#L15)

___

### registerParagraph

▸ **registerParagraph**(`registry`): `void`

The function that registers and adds the paragraph element in the given
registry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `registry` | [`ISerializationRegistryType`](../interfaces/client_internal_text_serializer.ISerializationRegistryType.md) | the registry to modify |

#### Returns

`void`

#### Defined in

[client/internal/text/serializer/types/paragraph.ts:36](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/types/paragraph.ts#L36)
