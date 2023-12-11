[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/text/serializer/types/table

# Module: client/internal/text/serializer/types/table

Contains the serialization, reactification and deserialization functions
for the container element, which is basically a div with a container
class name

## Table of contents

### Interfaces

- [ITable](../interfaces/client_internal_text_serializer_types_table.ITable.md)
- [ITbody](../interfaces/client_internal_text_serializer_types_table.ITbody.md)
- [ITd](../interfaces/client_internal_text_serializer_types_table.ITd.md)
- [ITfoot](../interfaces/client_internal_text_serializer_types_table.ITfoot.md)
- [ITh](../interfaces/client_internal_text_serializer_types_table.ITh.md)
- [IThead](../interfaces/client_internal_text_serializer_types_table.IThead.md)
- [ITr](../interfaces/client_internal_text_serializer_types_table.ITr.md)

### Functions

- [registerTableElements](client_internal_text_serializer_types_table.md#registertableelements)

## Functions

### registerTableElements

▸ **registerTableElements**(`registry`): `void`

The function that registers and adds the container in the given
reigstry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `registry` | [`ISerializationRegistryType`](../interfaces/client_internal_text_serializer.ISerializationRegistryType.md) | the registry to modify |

#### Returns

`void`

#### Defined in

[client/internal/text/serializer/types/table.ts:28](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/types/table.ts#L28)
