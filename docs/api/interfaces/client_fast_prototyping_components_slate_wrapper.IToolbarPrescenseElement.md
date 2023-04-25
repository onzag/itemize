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

[client/fast-prototyping/components/slate/wrapper.tsx:310](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L310)

___

### disabled

• `Optional` **disabled**: `boolean`

Manually specify whether it's disabled
if not specified it will check whether an element
can be inserted as it assumes it's about the insertion
of the element

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:280](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L280)

___

### element

• `Optional` **element**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| `RichElementFn`

The element to be added

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:256](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L256)

___

### fastKey

• `Optional` **fastKey**: `string`

The fast key value, if any

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:284](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L284)

___

### icon

• **icon**: `ReactNode`

Given icon to use in the toolbar

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:245](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L245)

___

### selected

• `Optional` **selected**: `boolean`

whether it should be marked as selected

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:305](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L305)

___

### title

• `Optional` **title**: `ReactNode`

A title to use
if a react node is provided this node will be modified
and added a children as (i18nValue: string) => React.Node
eg. the i18nRead element

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:252](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L252)

___

### usePriority

• `Optional` **usePriority**: `number`

use this priority instead of the standard
alt actioner priority

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:300](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L300)

___

### useStyleTransform

• `Optional` **useStyleTransform**: `boolean`

For usage with the badge will use a style transform
for the alt badge reactioner

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:289](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L289)

___

### useTriggerAltAfterAction

• `Optional` **useTriggerAltAfterAction**: `boolean`

will retrigger alt after usage with
alt

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:294](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L294)

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

[client/fast-prototyping/components/slate/wrapper.tsx:273](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L273)

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

[client/fast-prototyping/components/slate/wrapper.tsx:260](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L260)

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

[client/fast-prototyping/components/slate/wrapper.tsx:267](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L267)
