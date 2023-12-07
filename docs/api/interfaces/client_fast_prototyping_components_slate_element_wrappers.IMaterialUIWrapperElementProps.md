[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/element-wrappers](../modules/client_fast_prototyping_components_slate_element_wrappers.md) / IMaterialUIWrapperElementProps

# Interface: IMaterialUIWrapperElementProps

[client/fast-prototyping/components/slate/element-wrappers](../modules/client_fast_prototyping_components_slate_element_wrappers.md).IMaterialUIWrapperElementProps

## Hierarchy

- [`ISlateEditorWrapperElementProps`](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md)

  ↳ **`IMaterialUIWrapperElementProps`**

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#children)
- [element](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#element)
- [featureSupport](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#helpers)
- [i18nGenericError](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#i18ngenericerror)
- [i18nOk](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#i18nok)
- [i18nRichInfo](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#i18nrichinfo)
- [inputVariant](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#inputvariant)
- [isSelected](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#isselected)
- [primarySelection](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#primaryselection)
- [usePriority](client_fast_prototyping_components_slate_element_wrappers.IMaterialUIWrapperElementProps.md#usepriority)

## Properties

### children

• **children**: `ReactNode`

The element component itself that should
be returned

#### Inherited from

[ISlateEditorWrapperElementProps](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md).[children](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#children)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:764](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L764)

___

### element

• **element**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The element being selected

#### Inherited from

[ISlateEditorWrapperElementProps](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md).[element](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#element)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:747](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L747)

___

### featureSupport

• **featureSupport**: [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

The feature support

#### Inherited from

[ISlateEditorWrapperElementProps](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md).[featureSupport](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#featuresupport)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:768](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L768)

___

### helpers

• **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

The helpers functions

#### Inherited from

[ISlateEditorWrapperElementProps](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md).[helpers](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#helpers)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:759](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L759)

___

### i18nGenericError

• **i18nGenericError**: `string`

A generic error message

#### Defined in

[client/fast-prototyping/components/slate/element-wrappers.tsx:72](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/element-wrappers.tsx#L72)

___

### i18nOk

• **i18nOk**: `string`

A generic ok

#### Defined in

[client/fast-prototyping/components/slate/element-wrappers.tsx:76](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/element-wrappers.tsx#L76)

___

### i18nRichInfo

• **i18nRichInfo**: [`IPropertyEntryI18nRichTextInfo`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md)

The whole of the i18n rich information that is given by default

#### Defined in

[client/fast-prototyping/components/slate/element-wrappers.tsx:80](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/element-wrappers.tsx#L80)

___

### inputVariant

• `Optional` **inputVariant**: ``"filled"`` \| ``"outlined"`` \| ``"standard"``

The input variant for elements

#### Defined in

[client/fast-prototyping/components/slate/element-wrappers.tsx:92](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/element-wrappers.tsx#L92)

___

### isSelected

• **isSelected**: `boolean`

wether is selected

#### Inherited from

[ISlateEditorWrapperElementProps](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md).[isSelected](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#isselected)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:755](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L755)

___

### primarySelection

• **primarySelection**: `boolean`

Whether the selection is primary

#### Inherited from

[ISlateEditorWrapperElementProps](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md).[primarySelection](client_fast_prototyping_components_slate.ISlateEditorWrapperElementProps.md#primaryselection)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:751](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L751)

___

### usePriority

• `Optional` **usePriority**: `number`

The priority to use in accessibility
try to keep it in line with the wrappers
usually a value of 1

#### Defined in

[client/fast-prototyping/components/slate/element-wrappers.tsx:87](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/element-wrappers.tsx#L87)
