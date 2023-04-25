[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer](../modules/client_internal_text_serializer.md) / IReactifyExtraOptions

# Interface: IReactifyExtraOptions

[client/internal/text/serializer](../modules/client_internal_text_serializer.md).IReactifyExtraOptions

## Table of contents

### Methods

- [onCustom](client_internal_text_serializer.IReactifyExtraOptions.md#oncustom)
- [onCustomAttributesFor](client_internal_text_serializer.IReactifyExtraOptions.md#oncustomattributesfor)
- [onCustomWrap](client_internal_text_serializer.IReactifyExtraOptions.md#oncustomwrap)

## Methods

### onCustom

▸ `Optional` **onCustom**(`element`, `props`, `info`): `ReactNode`

use this to modify how the element renders

Does not have an effect to UI Handled elements that are
handled

return null for not handling anything an using the default

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](client_internal_text_serializer_types_text.IText.md) |
| `props` | `any` |
| `info` | `Object` |
| `info.Tag` | `string` |
| `info.parent` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md) |
| `info.styleActive?` | `any` |
| `info.styleHover?` | `any` |
| `info.tree` | [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md) |
| `info.defaultReturn` | () => `ReactNode` |

#### Returns

`ReactNode`

#### Defined in

[client/internal/text/serializer/index.ts:66](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L66)

___

### onCustomAttributesFor

▸ `Optional` **onCustomAttributesFor**(`element`): `any`

use this to return any extra attributes that should
be applied towards an element

Does not have an effect to UI Handled elements that are
handled

return an object or null

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](client_internal_text_serializer_types_text.IText.md) |

#### Returns

`any`

#### Defined in

[client/internal/text/serializer/index.ts:56](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L56)

___

### onCustomWrap

▸ `Optional` **onCustomWrap**(`element`, `elementAsNode`): `ReactNode`

Allows to wrap an element with features of the choosing
return the elementAsNode itself or a new node to replace it

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](client_internal_text_serializer_types_text.IText.md) |
| `elementAsNode` | `ReactNode` |

#### Returns

`ReactNode`

#### Defined in

[client/internal/text/serializer/index.ts:83](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/index.ts#L83)
