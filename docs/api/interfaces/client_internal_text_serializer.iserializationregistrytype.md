[](../README.md) / [Exports](../modules.md) / [client/internal/text/serializer](../modules/client_internal_text_serializer.md) / ISerializationRegistryType

# Interface: ISerializationRegistryType

[client/internal/text/serializer](../modules/client_internal_text_serializer.md).ISerializationRegistryType

Represents the registry where all the infromation to serialize
and deserialize text elements, it provides 3 way methods

## Table of contents

### Properties

- [DESERIALIZE](client_internal_text_serializer.iserializationregistrytype.md#deserialize)
- [REACTIFY](client_internal_text_serializer.iserializationregistrytype.md#reactify)
- [SERIALIZE](client_internal_text_serializer.iserializationregistrytype.md#serialize)

## Properties

### DESERIALIZE

• **DESERIALIZE**: *object*

DESERIALIZE provides the functionality to convert a HTML
node into the rich element counterpart as required

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`byClassName` | IDeserializeRegistryType | by class name matches a given class exactly and if it matches then it will pass it to the given deserialization function   |
`byClassNamePrefix` | IDeserializeRegistryType | by class name prefix searchs of a class name prefix and matches that to a given function, it receives the highest priority   |
`byTag` | IDeserializeRegistryType | by tag simply uses the tag name of the given component   |
`text` | (`n`: Node) => [*IText*](client_internal_text_serializer_types_text.itext.md) | This is for the text element   |

Defined in: [client/internal/text/serializer/index.ts:114](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/index.ts#L114)

___

### REACTIFY

• **REACTIFY**: *object*

REACTIFY allows to convert a given element that has been deserialized
into a react component

#### Type declaration:

Defined in: [client/internal/text/serializer/index.ts:139](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/index.ts#L139)

___

### SERIALIZE

• **SERIALIZE**: *object*

SERIALIZE provides the functionality to contain a rich element
or text node to a HTML node

#### Type declaration:

Defined in: [client/internal/text/serializer/index.ts:102](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/index.ts#L102)
