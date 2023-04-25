[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/text/serializer/types/text

# Module: client/internal/text/serializer/types/text

Contains the serialization, reactification and deserialization functions
for the text node

the text node is special as it's not a rich element itself and supports
quite different things from the rich element itself

## Table of contents

### Interfaces

- [IText](../interfaces/client_internal_text_serializer_types_text.IText.md)

### Functions

- [STANDARD\_TEXT\_NODE](client_internal_text_serializer_types_text.md#standard_text_node)
- [registerText](client_internal_text_serializer_types_text.md#registertext)

## Functions

### STANDARD\_TEXT\_NODE

▸ `Const` **STANDARD_TEXT_NODE**(`text?`): [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md)

Represents a standard text node as it should be given
for a void text node

#### Parameters

| Name | Type |
| :------ | :------ |
| `text?` | `string` |

#### Returns

[`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md)

#### Defined in

[client/internal/text/serializer/types/text.tsx:19](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/types/text.tsx#L19)

___

### registerText

▸ **registerText**(`registry`): `void`

The function that registers and adds the text node in the given
registry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `registry` | [`ISerializationRegistryType`](../interfaces/client_internal_text_serializer.ISerializationRegistryType.md) | the registry to modify |

#### Returns

`void`

#### Defined in

[client/internal/text/serializer/types/text.tsx:35](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/types/text.tsx#L35)
