[](../README.md) / [Exports](../modules.md) / client/internal/text/serializer/types/text

# Module: client/internal/text/serializer/types/text

Contains the serialization, reactification and deserialization functions
for the text node

the text node is special as it's not a rich element itself and supports
quite different things from the rich element itself

## Table of contents

### Interfaces

- [IText](../interfaces/client_internal_text_serializer_types_text.itext.md)

### Functions

- [STANDARD\_TEXT\_NODE](client_internal_text_serializer_types_text.md#standard_text_node)
- [registerText](client_internal_text_serializer_types_text.md#registertext)

## Functions

### STANDARD\_TEXT\_NODE

▸ `Const`**STANDARD_TEXT_NODE**(): *object*

Represents a standard text node as it should be given
for a void text node

**Returns:** *object*

Name | Type |
:------ | :------ |
`bold` | *boolean* |
`italic` | *boolean* |
`text` | *string* |
`underline` | *boolean* |

Defined in: [client/internal/text/serializer/types/text.tsx:18](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/text.tsx#L18)

___

### registerText

▸ **registerText**(`registry`: [*ISerializationRegistryType*](../interfaces/client_internal_text_serializer.iserializationregistrytype.md)): *void*

The function that registers and adds the text node in the given
registry

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`registry` | [*ISerializationRegistryType*](../interfaces/client_internal_text_serializer.iserializationregistrytype.md) | the registry to modify    |

**Returns:** *void*

Defined in: [client/internal/text/serializer/types/text.tsx:32](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/text.tsx#L32)
