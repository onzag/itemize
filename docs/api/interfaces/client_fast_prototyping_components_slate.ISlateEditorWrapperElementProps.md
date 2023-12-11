[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateEditorWrapperElementProps

# Interface: ISlateEditorWrapperElementProps

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateEditorWrapperElementProps

The props that every element wrapper is going to get
based on the standard that is pased by each element
once such element is selected

## Hierarchy

- **`ISlateEditorWrapperElementProps`**

  ↳ [`IMaterialUIWrapperElementProps`](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md)

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#children)
- [element](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#element)
- [featureSupport](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#helpers)
- [isSelected](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#isselected)
- [primarySelection](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#primaryselection)

## Properties

### children

• **children**: `ReactNode`

The element component itself that should
be returned

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:764](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L764)

___

### element

• **element**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The element being selected

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:747](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L747)

___

### featureSupport

• **featureSupport**: [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

The feature support

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:768](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L768)

___

### helpers

• **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

The helpers functions

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:759](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L759)

___

### isSelected

• **isSelected**: `boolean`

wether is selected

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:755](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L755)

___

### primarySelection

• **primarySelection**: `boolean`

Whether the selection is primary

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:751](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L751)
