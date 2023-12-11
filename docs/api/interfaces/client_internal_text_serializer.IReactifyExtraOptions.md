[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer](../modules/client_internal_text_serializer.md) / IReactifyExtraOptions

# Interface: IReactifyExtraOptions

[client/internal/text/serializer](../modules/client_internal_text_serializer.md).IReactifyExtraOptions

## Table of contents

### Properties

- [onCustom](client_internal_text_serializer.IReactifyExtraOptions.md#oncustom)
- [onCustomAttributesFor](client_internal_text_serializer.IReactifyExtraOptions.md#oncustomattributesfor)
- [onCustomWrap](client_internal_text_serializer.IReactifyExtraOptions.md#oncustomwrap)

## Properties

### onCustom

• `Optional` **onCustom**: (`element`: [`IText`](client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement), `props`: `any`, `info`: \{ `Tag`: `string` ; `defaultReturn`: () => `ReactNode` ; `parent`: [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md) ; `styleActive?`: `any` ; `styleHover?`: `any` ; `tree`: [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md)  }) => `ReactNode`

#### Type declaration

▸ (`element`, `props`, `info`): `ReactNode`

use this to modify how the element renders

Does not have an effect to UI Handled elements that are
handled

return null for not handling anything an using the default

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IText`](client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `props` | `any` |
| `info` | `Object` |
| `info.Tag` | `string` |
| `info.defaultReturn` | () => `ReactNode` |
| `info.parent` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md) |
| `info.styleActive?` | `any` |
| `info.styleHover?` | `any` |
| `info.tree` | [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md) |

##### Returns

`ReactNode`

#### Defined in

[client/internal/text/serializer/index.ts:66](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L66)

___

### onCustomAttributesFor

• `Optional` **onCustomAttributesFor**: (`element`: [`IText`](client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement)) => `any`

#### Type declaration

▸ (`element`): `any`

use this to return any extra attributes that should
be applied towards an element

Does not have an effect to UI Handled elements that are
handled

return an object or null

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IText`](client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |

##### Returns

`any`

#### Defined in

[client/internal/text/serializer/index.ts:56](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L56)

___

### onCustomWrap

• `Optional` **onCustomWrap**: (`element`: [`IText`](client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement), `elementAsNode`: `ReactNode`) => `ReactNode`

#### Type declaration

▸ (`element`, `elementAsNode`): `ReactNode`

Allows to wrap an element with features of the choosing
return the elementAsNode itself or a new node to replace it

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IText`](client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `elementAsNode` | `ReactNode` |

##### Returns

`ReactNode`

#### Defined in

[client/internal/text/serializer/index.ts:83](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/index.ts#L83)
