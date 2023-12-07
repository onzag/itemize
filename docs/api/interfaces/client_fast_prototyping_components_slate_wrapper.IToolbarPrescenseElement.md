[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / IToolbarPrescenseElement

# Interface: IToolbarPrescenseElement

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).IToolbarPrescenseElement

Refers to toolbar prescence elements that are added

## Table of contents

### Properties

- [customChildren](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#customchildren)
- [disabled](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#disabled)
- [element](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#element)
- [fastKey](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#fastkey)
- [icon](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#icon)
- [selected](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#selected)
- [title](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#title)
- [usePriority](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#usepriority)
- [useStyleTransform](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#usestyletransform)
- [useTriggerAltAfterAction](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#usetriggeraltafteraction)

### Methods

- [onAnyKeyDown](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#onanykeydown)
- [onClick](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#onclick)
- [refocusHandler](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#refocushandler)

## Properties

### customChildren

• `Optional` **customChildren**: `ReactNode`

Adds a custom children at the end of the toolbar

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:312](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L312)

___

### disabled

• `Optional` **disabled**: `boolean`

Manually specify whether it's disabled
if not specified it will check whether an element
can be inserted as it assumes it's about the insertion
of the element

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:282](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L282)

___

### element

• `Optional` **element**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| `RichElementFn`

The element to be added

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:258](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L258)

___

### fastKey

• `Optional` **fastKey**: `string`

The fast key value, if any

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:286](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L286)

___

### icon

• **icon**: `ReactNode`

Given icon to use in the toolbar

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:247](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L247)

___

### selected

• `Optional` **selected**: `boolean`

whether it should be marked as selected

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:307](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L307)

___

### title

• `Optional` **title**: `ReactNode`

A title to use
if a react node is provided this node will be modified
and added a children as (i18nValue: string) => React.Node
eg. the i18nRead element

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:254](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L254)

___

### usePriority

• `Optional` **usePriority**: `number`

use this priority instead of the standard
alt actioner priority

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:302](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L302)

___

### useStyleTransform

• `Optional` **useStyleTransform**: `boolean`

For usage with the badge will use a style transform
for the alt badge reactioner

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:291](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L291)

___

### useTriggerAltAfterAction

• `Optional` **useTriggerAltAfterAction**: `boolean`

will retrigger alt after usage with
alt

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:296](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L296)

## Methods

### onAnyKeyDown

▸ `Optional` **onAnyKeyDown**(`e`): `void`

Trigger on any keydown event

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:275](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L275)

___

### onClick

▸ `Optional` **onClick**(`defaultAction`, `e`): `void`

Alternatively an action

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultAction` | () => [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `e` | `MouseEvent`<`HTMLElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:262](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L262)

___

### refocusHandler

▸ `Optional` **refocusHandler**(`defaultAction`, `e`): `void`

Handle refocus attempts during the click event

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultAction` | () => `void` |
| `e` | `MouseEvent`<`HTMLElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:269](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L269)
