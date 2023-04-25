[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateTemplateUIHandlerProps

# Interface: ISlateTemplateUIHandlerProps

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateTemplateUIHandlerProps

The ui handler props that an ui handler takes

## Hierarchy

- [`IUIHandlerProps`](client_internal_text_serializer_base.IUIHandlerProps.md)

  ↳ **`ISlateTemplateUIHandlerProps`**

## Table of contents

### Properties

- [args](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#args)
- [attributes](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#attributes)
- [children](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#children)
- [className](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#classname)
- [element](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#element)
- [events](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#events)
- [helpers](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#helpers)
- [isSlate](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#isslate)
- [selected](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#selected)
- [style](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#style)
- [styleActive](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#styleactive)
- [styleHover](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md#stylehover)

## Properties

### args

• **args**: `Object`

Represents the arguments that are retrieved
by the handler itself, eg in a component
<div data-ui-handler="test" data-x="1" data-what-not="2"/>
the args will be x and whatNot that are passed here

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[args](client_internal_text_serializer_base.IUIHandlerProps.md#args)

#### Defined in

[client/internal/text/serializer/base.tsx:47](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L47)

___

### attributes

• **attributes**: `any`

The attributes that slate provides

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:115](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L115)

___

### children

• **children**: `ReactNode`

The children inside the ui handler
please ensure to use them specially if in slate mode

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[children](client_internal_text_serializer_base.IUIHandlerProps.md#children)

#### Defined in

[client/internal/text/serializer/base.tsx:58](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L58)

___

### className

• `Optional` **className**: `string`

An optional class name

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[className](client_internal_text_serializer_base.IUIHandlerProps.md#classname)

#### Defined in

[client/internal/text/serializer/base.tsx:62](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L62)

___

### element

• **element**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The element that the ui handler belongs to

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[element](client_internal_text_serializer_base.IUIHandlerProps.md#element)

#### Defined in

[client/internal/text/serializer/base.tsx:53](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L53)

___

### events

• **events**: [`IUIHandlerEvents`](client_internal_text_serializer_base.IUIHandlerEvents.md)

contains events that should be added to the element

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[events](client_internal_text_serializer_base.IUIHandlerProps.md#events)

#### Defined in

[client/internal/text/serializer/base.tsx:78](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L78)

___

### helpers

• `Optional` **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

The helpers that might be provided if the handler
requests extra info

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:120](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L120)

___

### isSlate

• **isSlate**: `boolean`

Whether it is currently into an slate instance

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:111](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L111)

___

### selected

• `Optional` **selected**: `boolean`

The selected state that might be provided if the handler
requests extra info

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:125](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L125)

___

### style

• `Optional` **style**: `CSSProperties`

The style object

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[style](client_internal_text_serializer_base.IUIHandlerProps.md#style)

#### Defined in

[client/internal/text/serializer/base.tsx:66](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L66)

___

### styleActive

• `Optional` **styleActive**: `CSSProperties`

The style active object

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[styleActive](client_internal_text_serializer_base.IUIHandlerProps.md#styleactive)

#### Defined in

[client/internal/text/serializer/base.tsx:70](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L70)

___

### styleHover

• `Optional` **styleHover**: `CSSProperties`

The style hover object

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[styleHover](client_internal_text_serializer_base.IUIHandlerProps.md#stylehover)

#### Defined in

[client/internal/text/serializer/base.tsx:74](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/base.tsx#L74)
