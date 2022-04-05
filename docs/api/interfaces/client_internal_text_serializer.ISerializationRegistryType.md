[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer](../modules/client_internal_text_serializer.md) / ISerializationRegistryType

# Interface: ISerializationRegistryType

[client/internal/text/serializer](../modules/client_internal_text_serializer.md).ISerializationRegistryType

Represents the registry where all the infromation to serialize
and deserialize text elements, it provides 3 way methods

## Table of contents

### Properties

- [DESERIALIZE](client_internal_text_serializer.ISerializationRegistryType.md#deserialize)
- [REACTIFY](client_internal_text_serializer.ISerializationRegistryType.md#reactify)
- [SERIALIZE](client_internal_text_serializer.ISerializationRegistryType.md#serialize)

## Properties

### DESERIALIZE

• **DESERIALIZE**: `Object`

DESERIALIZE provides the functionality to convert a HTML
node into the rich element counterpart as required

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `byClassName` | `IDeserializeRegistryType` | by class name matches a given class exactly and if it matches then it will pass it to the given deserialization function |
| `byClassNamePrefix` | `IDeserializeRegistryType` | by class name prefix searchs of a class name prefix and matches that to a given function, it receives the highest priority |
| `byTag` | `IDeserializeRegistryType` | by tag simply uses the tag name of the given component |
| `text` | (`n`: `Node`) => [`IText`](client_internal_text_serializer_types_text.IText.md) | This is for the text element |

#### Defined in

[client/internal/text/serializer/index.ts:121](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/index.ts#L121)

___

### REACTIFY

• **REACTIFY**: `Object`

REACTIFY allows to convert a given element that has been deserialized
into a react component

#### Index signature

▪ [type: `string`]: (`arg`: [`IReactifyArg`](client_internal_text_serializer.IReactifyArg.md)<[`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](client_internal_text_serializer_types_text.IText.md)\>) => `React.ReactNode`

#### Defined in

[client/internal/text/serializer/index.ts:146](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/index.ts#L146)

___

### SERIALIZE

• **SERIALIZE**: `Object`

SERIALIZE provides the functionality to contain a rich element
or text node to a HTML node

#### Index signature

▪ [type: `string`]: (`node`: [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](client_internal_text_serializer_types_text.IText.md)) => `Node`

The type represents the type of the element
eg. paragraph, file, image etc...

#### Defined in

[client/internal/text/serializer/index.ts:109](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/index.ts#L109)
