[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / IToolbarPrescenseElement

# Interface: IToolbarPrescenseElement

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).IToolbarPrescenseElement

Refers to toolbar prescence elements that are added

## Table of contents

### Properties

- [element](client_fast_prototyping_components_slate.itoolbarprescenseelement.md#element)
- [icon](client_fast_prototyping_components_slate.itoolbarprescenseelement.md#icon)
- [title](client_fast_prototyping_components_slate.itoolbarprescenseelement.md#title)

## Properties

### element

• **element**: [*RichElement*](../modules/client_internal_text_serializer.md#richelement)

The element to be added

Defined in: [client/fast-prototyping/components/slate/index.tsx:184](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L184)

___

### icon

• **icon**: ReactNode

Given icon to use in the toolbar

Defined in: [client/fast-prototyping/components/slate/index.tsx:173](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L173)

___

### title

• `Optional` **title**: ReactNode

A title to use
if a react node is provided this node will be modified
and added a children as (i18nValue: string) => React.Node
eg. the i18nRead element

Defined in: [client/fast-prototyping/components/slate/index.tsx:180](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L180)
