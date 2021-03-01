[](../README.md) / [Exports](../modules.md) / [client/internal/text/serializer/base](../modules/client_internal_text_serializer_base.md) / IUIHandlerProps

# Interface: IUIHandlerProps

[client/internal/text/serializer/base](../modules/client_internal_text_serializer_base.md).IUIHandlerProps

Basic properties included in the basic view ui handler

## Hierarchy

* **IUIHandlerProps**

  ↳ [*ISlateTemplateUIHandlerProps*](client_fast_prototyping_components_slate.islatetemplateuihandlerprops.md)

## Table of contents

### Properties

- [args](client_internal_text_serializer_base.iuihandlerprops.md#args)
- [children](client_internal_text_serializer_base.iuihandlerprops.md#children)
- [className](client_internal_text_serializer_base.iuihandlerprops.md#classname)
- [element](client_internal_text_serializer_base.iuihandlerprops.md#element)
- [events](client_internal_text_serializer_base.iuihandlerprops.md#events)
- [style](client_internal_text_serializer_base.iuihandlerprops.md#style)
- [styleActive](client_internal_text_serializer_base.iuihandlerprops.md#styleactive)
- [styleHover](client_internal_text_serializer_base.iuihandlerprops.md#stylehover)

## Properties

### args

• **args**: *object*

Represents the arguments that are retrieved
by the handler itself, the args are provided in slate
mode or not

#### Type declaration:

Defined in: [client/internal/text/serializer/base.tsx:46](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/base.tsx#L46)

___

### children

• **children**: ReactNode

The children inside the ui handler
please ensure to use them specially if in slate mode

Defined in: [client/internal/text/serializer/base.tsx:57](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/base.tsx#L57)

___

### className

• `Optional` **className**: *string*

An optional class name

Defined in: [client/internal/text/serializer/base.tsx:61](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/base.tsx#L61)

___

### element

• **element**: [*RichElement*](../modules/client_internal_text_serializer.md#richelement)

The element that the ui handler belongs to

Defined in: [client/internal/text/serializer/base.tsx:52](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/base.tsx#L52)

___

### events

• **events**: [*IUIHandlerEvents*](client_internal_text_serializer_base.iuihandlerevents.md)

contains events that should be added to the element

Defined in: [client/internal/text/serializer/base.tsx:77](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/base.tsx#L77)

___

### style

• `Optional` **style**: *CSSProperties*

The style object

Defined in: [client/internal/text/serializer/base.tsx:65](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/base.tsx#L65)

___

### styleActive

• `Optional` **styleActive**: *CSSProperties*

The style active object

Defined in: [client/internal/text/serializer/base.tsx:69](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/base.tsx#L69)

___

### styleHover

• `Optional` **styleHover**: *CSSProperties*

The style hover object

Defined in: [client/internal/text/serializer/base.tsx:73](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/base.tsx#L73)
