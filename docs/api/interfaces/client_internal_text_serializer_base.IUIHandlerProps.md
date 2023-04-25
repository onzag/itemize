[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/base](../modules/client_internal_text_serializer_base.md) / IUIHandlerProps

# Interface: IUIHandlerProps

[client/internal/text/serializer/base](../modules/client_internal_text_serializer_base.md).IUIHandlerProps

Basic properties included in the basic view ui handler

## Hierarchy

- **`IUIHandlerProps`**

  ↳ [`ISlateTemplateUIHandlerProps`](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md)

## Table of contents

### Properties

- [args](client_internal_text_serializer_base.IUIHandlerProps.md#args)
- [children](client_internal_text_serializer_base.IUIHandlerProps.md#children)
- [className](client_internal_text_serializer_base.IUIHandlerProps.md#classname)
- [element](client_internal_text_serializer_base.IUIHandlerProps.md#element)
- [events](client_internal_text_serializer_base.IUIHandlerProps.md#events)
- [style](client_internal_text_serializer_base.IUIHandlerProps.md#style)
- [styleActive](client_internal_text_serializer_base.IUIHandlerProps.md#styleactive)
- [styleHover](client_internal_text_serializer_base.IUIHandlerProps.md#stylehover)

## Properties

### args

• **args**: `Object`

Represents the arguments that are retrieved
by the handler itself, eg in a component
<div data-ui-handler="test" data-x="1" data-what-not="2"/>
the args will be x and whatNot that are passed here

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[client/internal/text/serializer/base.tsx:47](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L47)

___

### children

• **children**: `ReactNode`

The children inside the ui handler
please ensure to use them specially if in slate mode

#### Defined in

[client/internal/text/serializer/base.tsx:58](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L58)

___

### className

• `Optional` **className**: `string`

An optional class name

#### Defined in

[client/internal/text/serializer/base.tsx:62](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L62)

___

### element

• **element**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The element that the ui handler belongs to

#### Defined in

[client/internal/text/serializer/base.tsx:53](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L53)

___

### events

• **events**: [`IUIHandlerEvents`](client_internal_text_serializer_base.IUIHandlerEvents.md)

contains events that should be added to the element

#### Defined in

[client/internal/text/serializer/base.tsx:78](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L78)

___

### style

• `Optional` **style**: `CSSProperties`

The style object

#### Defined in

[client/internal/text/serializer/base.tsx:66](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L66)

___

### styleActive

• `Optional` **styleActive**: `CSSProperties`

The style active object

#### Defined in

[client/internal/text/serializer/base.tsx:70](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L70)

___

### styleHover

• `Optional` **styleHover**: `CSSProperties`

The style hover object

#### Defined in

[client/internal/text/serializer/base.tsx:74](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L74)
