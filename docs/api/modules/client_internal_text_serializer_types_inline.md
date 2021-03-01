[](../README.md) / [Exports](../modules.md) / client/internal/text/serializer/types/inline

# Module: client/internal/text/serializer/types/inline

Contains the serialization, reactification and deserialization functions
for the inline element, which is basically a span which contains only text
it's primarily used for the templated components

## Table of contents

### Interfaces

- [IInline](../interfaces/client_internal_text_serializer_types_inline.iinline.md)

### Functions

- [registerInline](client_internal_text_serializer_types_inline.md#registerinline)

## Functions

### registerInline

▸ **registerInline**(`registry`: [*ISerializationRegistryType*](../interfaces/client_internal_text_serializer.iserializationregistrytype.md)): *void*

The function that registers and adds the inline in the given
reigstry

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`registry` | [*ISerializationRegistryType*](../interfaces/client_internal_text_serializer.iserializationregistrytype.md) | the registry to modify    |

**Returns:** *void*

Defined in: [client/internal/text/serializer/types/inline.ts:19](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/types/inline.ts#L19)
