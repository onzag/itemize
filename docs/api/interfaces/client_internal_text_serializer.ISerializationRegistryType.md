[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer](../modules/client_internal_text_serializer.md) / ISerializationRegistryType

# Interface: ISerializationRegistryType

[client/internal/text/serializer](../modules/client_internal_text_serializer.md).ISerializationRegistryType

Represents the registry where all the infromation to serialize
and deserialize text elements, it provides 3 way methods

## Table of contents

### Properties

- [ALLOWS\_CHILDREN](client_internal_text_serializer.ISerializationRegistryType.md#allows_children)
- [BLOCKS](client_internal_text_serializer.ISerializationRegistryType.md#blocks)
- [CUSTOM\_NORMALIZER\_POST](client_internal_text_serializer.ISerializationRegistryType.md#custom_normalizer_post)
- [CUSTOM\_NORMALIZER\_PRE](client_internal_text_serializer.ISerializationRegistryType.md#custom_normalizer_pre)
- [DESERIALIZE](client_internal_text_serializer.ISerializationRegistryType.md#deserialize)
- [INLINES](client_internal_text_serializer.ISerializationRegistryType.md#inlines)
- [MERGABLES](client_internal_text_serializer.ISerializationRegistryType.md#mergables)
- [ON\_EMPTY\_FILL\_WITH](client_internal_text_serializer.ISerializationRegistryType.md#on_empty_fill_with)
- [ON\_INVALID\_CHILDREN\_WRAP\_WITH](client_internal_text_serializer.ISerializationRegistryType.md#on_invalid_children_wrap_with)
- [ON\_INVALID\_TEXT\_WRAP\_WITH](client_internal_text_serializer.ISerializationRegistryType.md#on_invalid_text_wrap_with)
- [PROHIBIT\_TEXT](client_internal_text_serializer.ISerializationRegistryType.md#prohibit_text)
- [REACTIFY](client_internal_text_serializer.ISerializationRegistryType.md#reactify)
- [SERIALIZE](client_internal_text_serializer.ISerializationRegistryType.md#serialize)
- [SUPERBLOCKS](client_internal_text_serializer.ISerializationRegistryType.md#superblocks)
- [VOIDS](client_internal_text_serializer.ISerializationRegistryType.md#voids)

## Properties

### ALLOWS\_CHILDREN

• **ALLOWS\_CHILDREN**: `Object`

Specify which children are allowed for a given object type

#### Index signature

▪ [type: `string`]: `string`[]

#### Defined in

[client/internal/text/serializer/index.ts:204](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L204)

___

### BLOCKS

• **BLOCKS**: `Object`

Whether it is a void element and has no children and no content
within it

#### Index signature

▪ [type: `string`]: `boolean`

#### Defined in

[client/internal/text/serializer/index.ts:257](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L257)

___

### CUSTOM\_NORMALIZER\_POST

• **CUSTOM\_NORMALIZER\_POST**: `Object`

#### Index signature

▪ [type: `string`]: (`element`: `any`, `path`: `number`[], `executionRoot`: [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md), `primaryExecution`: `ICustomExecution`, `secondaryExecution`: `ICustomExecution`, `specialRules?`: `ISpecialRules`) => `void`

#### Defined in

[client/internal/text/serializer/index.ts:296](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L296)

___

### CUSTOM\_NORMALIZER\_PRE

• **CUSTOM\_NORMALIZER\_PRE**: `Object`

#### Index signature

▪ [type: `string`]: (`element`: `any`, `path`: `number`[], `executionRoot`: [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md), `primaryExecution`: `ICustomExecution`, `secondaryExecution`: `ICustomExecution`, `specialRules?`: `ISpecialRules`) => `void`

#### Defined in

[client/internal/text/serializer/index.ts:286](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L286)

___

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

[client/internal/text/serializer/index.ts:172](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L172)

___

### INLINES

• **INLINES**: `Object`

An inline should be
PROHIBIT_TEXT true
ALLOWS_CHILDREN empty array

For example <a> <span class="inline"/> are known inlines

However the usage of this is for internal identification as in html
a space is necessary between inline nodes for them to be selected

#### Index signature

▪ [type: `string`]: `boolean`

#### Defined in

[client/internal/text/serializer/index.ts:241](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L241)

___

### MERGABLES

• **MERGABLES**: `Object`

Specifies which elements are allowed to be merged with the next element

#### Index signature

▪ [type: `string`]: `boolean`

#### Defined in

[client/internal/text/serializer/index.ts:282](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L282)

___

### ON\_EMPTY\_FILL\_WITH

• **ON\_EMPTY\_FILL\_WITH**: `Object`

Specifies what shall be done regarding empty
elements without children

unnecessary if allows children text is true

#### Index signature

▪ [type: `string`]: () => [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

#### Defined in

[client/internal/text/serializer/index.ts:275](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L275)

___

### ON\_INVALID\_CHILDREN\_WRAP\_WITH

• **ON\_INVALID\_CHILDREN\_WRAP\_WITH**: `Object`

When received an invalid children that are not in ALLOWS_CHILDREN

#### Index signature

▪ [type: `string`]: (`children`: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)) => [`RichElement`](../modules/client_internal_text_serializer.md#richelement)[]

#### Defined in

[client/internal/text/serializer/index.ts:219](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L219)

___

### ON\_INVALID\_TEXT\_WRAP\_WITH

• **ON\_INVALID\_TEXT\_WRAP\_WITH**: `Object`

When received text as children and PROHIBIT_TEXT is not
true

#### Index signature

▪ [type: `string`]: (`text`: [`IText`](client_internal_text_serializer_types_text.IText.md)) => [`RichElement`](../modules/client_internal_text_serializer.md#richelement)[]

#### Defined in

[client/internal/text/serializer/index.ts:227](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L227)

___

### PROHIBIT\_TEXT

• **PROHIBIT\_TEXT**: `Object`

Specifies wether the given type allows plaintext
inside of it

#### Index signature

▪ [type: `string`]: `boolean`

#### Defined in

[client/internal/text/serializer/index.ts:212](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L212)

___

### REACTIFY

• **REACTIFY**: `Object`

REACTIFY allows to convert a given element that has been deserialized
into a react component

#### Index signature

▪ [type: `string`]: (`arg`: [`IReactifyArg`](client_internal_text_serializer.IReactifyArg.md)<[`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](client_internal_text_serializer_types_text.IText.md)\>) => `React.ReactNode`

#### Defined in

[client/internal/text/serializer/index.ts:197](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L197)

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

[client/internal/text/serializer/index.ts:160](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L160)

___

### SUPERBLOCKS

• **SUPERBLOCKS**: `Object`

Whether it is a void element and has no children and no content
within it

#### Index signature

▪ [type: `string`]: `boolean`

#### Defined in

[client/internal/text/serializer/index.ts:265](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L265)

___

### VOIDS

• **VOIDS**: `Object`

Whether it is a void element and has no children and no content
within it

#### Index signature

▪ [type: `string`]: `boolean`

#### Defined in

[client/internal/text/serializer/index.ts:249](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L249)
