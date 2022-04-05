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
by the handler itself, the args are provided in slate
mode or not

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[args](client_internal_text_serializer_base.IUIHandlerProps.md#args)

#### Defined in

[client/internal/text/serializer/base.tsx:46](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L46)

___

### attributes

• **attributes**: `any`

The attributes that slate provides

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:52](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L52)

___

### children

• **children**: `ReactNode`

The children inside the ui handler
please ensure to use them specially if in slate mode

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[children](client_internal_text_serializer_base.IUIHandlerProps.md#children)

#### Defined in

[client/internal/text/serializer/base.tsx:57](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L57)

___

### className

• `Optional` **className**: `string`

An optional class name

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[className](client_internal_text_serializer_base.IUIHandlerProps.md#classname)

#### Defined in

[client/internal/text/serializer/base.tsx:61](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L61)

___

### element

• **element**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The element that the ui handler belongs to

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[element](client_internal_text_serializer_base.IUIHandlerProps.md#element)

#### Defined in

[client/internal/text/serializer/base.tsx:52](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L52)

___

### events

• **events**: [`IUIHandlerEvents`](client_internal_text_serializer_base.IUIHandlerEvents.md)

contains events that should be added to the element

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[events](client_internal_text_serializer_base.IUIHandlerProps.md#events)

#### Defined in

[client/internal/text/serializer/base.tsx:77](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L77)

___

### helpers

• `Optional` **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

The helpers that might be provided if the handler
requests extra info

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:57](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L57)

___

### isSlate

• **isSlate**: `boolean`

Whether it is currently into an slate instance

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:48](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L48)

___

### selected

• `Optional` **selected**: `boolean`

The selected state that might be provided if the handler
requests extra info

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:62](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L62)

___

### style

• `Optional` **style**: `CSSProperties`

The style object

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[style](client_internal_text_serializer_base.IUIHandlerProps.md#style)

#### Defined in

[client/internal/text/serializer/base.tsx:65](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L65)

___

### styleActive

• `Optional` **styleActive**: `CSSProperties`

The style active object

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[styleActive](client_internal_text_serializer_base.IUIHandlerProps.md#styleactive)

#### Defined in

[client/internal/text/serializer/base.tsx:69](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L69)

___

### styleHover

• `Optional` **styleHover**: `CSSProperties`

The style hover object

#### Inherited from

[IUIHandlerProps](client_internal_text_serializer_base.IUIHandlerProps.md).[styleHover](client_internal_text_serializer_base.IUIHandlerProps.md#stylehover)

#### Defined in

[client/internal/text/serializer/base.tsx:73](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L73)
