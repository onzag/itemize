[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateTemplateUIHandlerProps

# Interface: ISlateTemplateUIHandlerProps

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateTemplateUIHandlerProps

The ui handler props that an ui handler takes

## Hierarchy

* [*IUIHandlerProps*](client_internal_text_serializer_base.iuihandlerprops.md)

  ↳ **ISlateTemplateUIHandlerProps**

## Table of contents

### Properties

- [args](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#args)
- [attributes](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#attributes)
- [children](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#children)
- [className](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#classname)
- [element](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#element)
- [events](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#events)
- [helpers](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#helpers)
- [isSlate](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#isslate)
- [selected](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#selected)
- [style](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#style)
- [styleActive](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#styleactive)
- [styleHover](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md#stylehover)

## Properties

### args

• **args**: *object*

Represents the arguments that are retrieved
by the handler itself, the args are provided in slate
mode or not

#### Type declaration:

Inherited from: [IUIHandlerProps](client_internal_text_serializer_base.iuihandlerprops.md).[args](client_internal_text_serializer_base.iuihandlerprops.md#args)

Defined in: [client/internal/text/serializer/base.tsx:46](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/serializer/base.tsx#L46)

___

### attributes

• **attributes**: *any*

The attributes that slate provides

Defined in: [client/fast-prototyping/components/slate/index.tsx:49](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/components/slate/index.tsx#L49)

___

### children

• **children**: ReactNode

The children inside the ui handler
please ensure to use them specially if in slate mode

Inherited from: [IUIHandlerProps](client_internal_text_serializer_base.iuihandlerprops.md).[children](client_internal_text_serializer_base.iuihandlerprops.md#children)

Defined in: [client/internal/text/serializer/base.tsx:57](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/serializer/base.tsx#L57)

___

### className

• `Optional` **className**: *string*

An optional class name

Inherited from: [IUIHandlerProps](client_internal_text_serializer_base.iuihandlerprops.md).[className](client_internal_text_serializer_base.iuihandlerprops.md#classname)

Defined in: [client/internal/text/serializer/base.tsx:61](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/serializer/base.tsx#L61)

___

### element

• **element**: [*RichElement*](../modules/client_internal_text_serializer.md#richelement)

The element that the ui handler belongs to

Inherited from: [IUIHandlerProps](client_internal_text_serializer_base.iuihandlerprops.md).[element](client_internal_text_serializer_base.iuihandlerprops.md#element)

Defined in: [client/internal/text/serializer/base.tsx:52](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/serializer/base.tsx#L52)

___

### events

• **events**: [*IUIHandlerEvents*](client_internal_text_serializer_base.iuihandlerevents.md)

contains events that should be added to the element

Inherited from: [IUIHandlerProps](client_internal_text_serializer_base.iuihandlerprops.md).[events](client_internal_text_serializer_base.iuihandlerprops.md#events)

Defined in: [client/internal/text/serializer/base.tsx:77](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/serializer/base.tsx#L77)

___

### helpers

• `Optional` **helpers**: [*IHelperFunctions*](client_fast_prototyping_components_slate.ihelperfunctions.md)

The helpers that might be provided if the handler
requests extra info

Defined in: [client/fast-prototyping/components/slate/index.tsx:54](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/components/slate/index.tsx#L54)

___

### isSlate

• **isSlate**: *boolean*

Whether it is currently into an slate instance

Defined in: [client/fast-prototyping/components/slate/index.tsx:45](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/components/slate/index.tsx#L45)

___

### selected

• `Optional` **selected**: *boolean*

The selected state that might be provided if the handler
requests extra info

Defined in: [client/fast-prototyping/components/slate/index.tsx:59](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/components/slate/index.tsx#L59)

___

### style

• `Optional` **style**: *CSSProperties*

The style object

Inherited from: [IUIHandlerProps](client_internal_text_serializer_base.iuihandlerprops.md).[style](client_internal_text_serializer_base.iuihandlerprops.md#style)

Defined in: [client/internal/text/serializer/base.tsx:65](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/serializer/base.tsx#L65)

___

### styleActive

• `Optional` **styleActive**: *CSSProperties*

The style active object

Inherited from: [IUIHandlerProps](client_internal_text_serializer_base.iuihandlerprops.md).[styleActive](client_internal_text_serializer_base.iuihandlerprops.md#styleactive)

Defined in: [client/internal/text/serializer/base.tsx:69](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/serializer/base.tsx#L69)

___

### styleHover

• `Optional` **styleHover**: *CSSProperties*

The style hover object

Inherited from: [IUIHandlerProps](client_internal_text_serializer_base.iuihandlerprops.md).[styleHover](client_internal_text_serializer_base.iuihandlerprops.md#stylehover)

Defined in: [client/internal/text/serializer/base.tsx:73](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/serializer/base.tsx#L73)
