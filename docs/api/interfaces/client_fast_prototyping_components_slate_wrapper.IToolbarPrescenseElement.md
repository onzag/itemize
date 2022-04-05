[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / IToolbarPrescenseElement

# Interface: IToolbarPrescenseElement

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).IToolbarPrescenseElement

Refers to toolbar prescence elements that are added

## Table of contents

### Properties

- [disabled](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#disabled)
- [element](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#element)
- [fastKey](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#fastkey)
- [icon](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#icon)
- [title](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#title)

### Methods

- [onClick](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md#onclick)

## Properties

### disabled

• `Optional` **disabled**: `boolean`

Manually specify whether it's disabled
if not specified it will check whether an element
can be inserted as it assumes it's about the insertion
of the element

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:266](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L266)

___

### element

• `Optional` **element**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| `RichElementFn`

The element to be added

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:255](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L255)

___

### fastKey

• `Optional` **fastKey**: `string`

The fast key value, if any

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:270](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L270)

___

### icon

• **icon**: `ReactNode`

Given icon to use in the toolbar

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:244](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L244)

___

### title

• `Optional` **title**: `ReactNode`

A title to use
if a react node is provided this node will be modified
and added a children as (i18nValue: string) => React.Node
eg. the i18nRead element

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:251](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L251)

## Methods

### onClick

▸ `Optional` **onClick**(`defaultAction`): `void`

Alternatively an action

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultAction` | () => [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:259](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L259)
