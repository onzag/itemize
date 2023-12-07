[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/components/slate/wrapper

# Module: client/fast-prototyping/components/slate/wrapper

This file contains the fast prototyping wrapper that uses the material UI elements
in order to create the slate editor for the PropertyViewText

The wrapper component is added as a property to the slate editor itself so other wrappers
can be added as replacement, you can also design your own wrapper based on this one

## Table of contents

### Classes

- [MaterialUISlateWrapper](../classes/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md)

### Interfaces

- [IDrawerConfiguratorElement](../interfaces/client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElement.md)
- [IDrawerContainerProps](../interfaces/client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md)
- [IDrawerUIHandlerElementConfigBoolean](../interfaces/client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigBoolean.md)
- [IDrawerUIHandlerElementConfigCustom](../interfaces/client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigCustom.md)
- [IDrawerUIHandlerElementConfigCustomProps](../interfaces/client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigCustomProps.md)
- [IDrawerUIHandlerElementConfigInput](../interfaces/client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigInput.md)
- [IDrawerUIHandlerElementConfigSelect](../interfaces/client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigSelect.md)
- [IMaterialUISlateWrapperProps](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)
- [IToolbarPrescenseElement](../interfaces/client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md)
- [MaterialUISlateWrapperState](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)
- [RichTextEditorToolbarProps](../interfaces/client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md)

### Type aliases

- [SlateEditorWrapperCustomToolbarElement](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelement)
- [SlateEditorWrapperCustomToolbarElementBaseForm](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelementbaseform)
- [SlateEditorWrapperCustomToolbarElementFnForm](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelementfnform)
- [SlateEditorWrapperCustomToolbarIdentifiedElement](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbaridentifiedelement)

## Type aliases

### SlateEditorWrapperCustomToolbarElement

Ƭ **SlateEditorWrapperCustomToolbarElement**: [`SlateEditorWrapperCustomToolbarElementBaseForm`](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelementbaseform) \| [`SlateEditorWrapperCustomToolbarElementFnForm`](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelementfnform)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:415](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L415)

___

### SlateEditorWrapperCustomToolbarElementBaseForm

Ƭ **SlateEditorWrapperCustomToolbarElementBaseForm**: [`IToolbarPrescenseElement`](../interfaces/client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md) \| [`SlateEditorWrapperCustomToolbarIdentifiedElement`](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbaridentifiedelement)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:408](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L408)

___

### SlateEditorWrapperCustomToolbarElementFnForm

Ƭ **SlateEditorWrapperCustomToolbarElementFnForm**: (`toolbarProps`: `any`) => [`SlateEditorWrapperCustomToolbarElementBaseForm`](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelementbaseform)

#### Type declaration

▸ (`toolbarProps`): [`SlateEditorWrapperCustomToolbarElementBaseForm`](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelementbaseform)

##### Parameters

| Name | Type |
| :------ | :------ |
| `toolbarProps` | `any` |

##### Returns

[`SlateEditorWrapperCustomToolbarElementBaseForm`](client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelementbaseform)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:412](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L412)

___

### SlateEditorWrapperCustomToolbarIdentifiedElement

Ƭ **SlateEditorWrapperCustomToolbarIdentifiedElement**: ``"bold"`` \| ``"italic"`` \| ``"underline"`` \| ``"link"`` \| ``"title"`` \| ``"bulleted-list"`` \| ``"numbered-list"`` \| ``"image"`` \| ``"video"`` \| ``"file"`` \| ``"quote"`` \| ``"container"`` \| ``"table"`` \| ``"template-text"`` \| ``"template-html"`` \| ``"extras"`` \| ``"none"`` \| ``"divider"`` \| ``"hdivider"``

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:387](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/wrapper.tsx#L387)
