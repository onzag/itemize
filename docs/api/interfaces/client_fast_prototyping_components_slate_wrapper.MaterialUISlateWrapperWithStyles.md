[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / MaterialUISlateWrapperWithStyles

# Interface: MaterialUISlateWrapperWithStyles

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).MaterialUISlateWrapperWithStyles

These are the base props that this wrapper uses, note how we extend the base wrapper props as defined
in the slate editor itself, and add the styles for the classes and these i18n info

If you wonder how the i18n information is to be added, in the PropertyEntryText when creating
the slate editor as a component the wrapper can receive wrapperArgs so these args are passed
when the editor is created with the wrapper itself

## Hierarchy

- [`ISlateEditorWrapperBaseProps`](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md)

  ↳ **`MaterialUISlateWrapperWithStyles`**

  ↳↳ [`RichTextEditorToolbarProps`](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md)

  ↳↳ [`IWrapperContainerProps`](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md)

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#children)
- [currentLoadError](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#currentloaderror)
- [customToolbar](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#customtoolbar)
- [disjointedMode](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#disjointedmode)
- [drawerExtras](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#drawerextras)
- [drawerMode](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#drawermode)
- [featureSupport](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#helpers)
- [hideDrawer](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#hidedrawer)
- [hideTree](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#hidetree)
- [i18nGenericError](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#i18ngenericerror)
- [i18nOk](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#i18nok)
- [i18nRichInfo](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#i18nrichinfo)
- [state](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#state)
- [toolbarExtras](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#toolbarextras)
- [wrapperClassName](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#wrapperclassname)
- [wrapperSx](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#wrappersx)
- [wrapperTextEditorClassName](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#wrappertexteditorclassname)
- [wrapperTextEditorSx](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#wrappertexteditorsx)

### Methods

- [customExtraChildren](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#customextrachildren)
- [dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#dismisscurrentloaderror)

## Properties

### children

• **children**: `ReactNode`

This is the thing to wrap, it is the react
rich text editor itself as it comes from slate
and it should be rendered
where it is expected to be used

#### Inherited from

[ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md).[children](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#children)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1028](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1028)

___

### currentLoadError

• **currentLoadError**: `string`

A current error, translated
it is given directly as a prop to the editor class
as it's just passed right here as well to the wrapper
this is used via the PropertyEntryText as it does
indeed provide this as a prop for the render

#### Inherited from

[ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md).[currentLoadError](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#currentloaderror)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1036](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1036)

___

### customToolbar

• `Optional` **customToolbar**: [`SlateEditorWrapperCustomToolbarElement`](../modules/client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelement)[]

Function to be used to specify a whole custom toolbar down to the very basics

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:459](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L459)

___

### disjointedMode

• `Optional` **disjointedMode**: `boolean`

The disjointed mode

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:479](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L479)

___

### drawerExtras

• `Optional` **drawerExtras**: [`DrawerConfiguratorElement`](../modules/client_fast_prototyping_components_slate_wrapper.md#drawerconfiguratorelement)[]

Drawer extras for the ui handled types

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:463](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L463)

___

### drawerMode

• `Optional` **drawerMode**: ``"full"`` \| ``"with-styles"`` \| ``"simple"`` \| ``"barebones"``

Drawer mode

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:475](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L475)

___

### featureSupport

• **featureSupport**: [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

This is a list of extended features that are available
to the editor, and the wrapper can render buttons
and whatnot from it

#### Inherited from

[ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md).[featureSupport](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#featuresupport)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1016](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1016)

___

### helpers

• **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

These are helper functions that are used to insert elements
and modify nodes

#### Inherited from

[ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md).[helpers](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#helpers)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1021](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1021)

___

### hideDrawer

• `Optional` **hideDrawer**: `boolean`

Whether to hide the drawer

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:467](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L467)

___

### hideTree

• `Optional` **hideTree**: `boolean`

Whether to hide the tree

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:471](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L471)

___

### i18nGenericError

• **i18nGenericError**: `string`

A generic error message

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:442](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L442)

___

### i18nOk

• **i18nOk**: `string`

A generic ok

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:446](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L446)

___

### i18nRichInfo

• **i18nRichInfo**: [`IPropertyEntryI18nRichTextInfo`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md)

The whole of the i18n rich information that is given by default

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:450](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L450)

___

### state

• **state**: [`ISlateEditorStateType`](client_fast_prototyping_components_slate.ISlateEditorStateType.md)

This is the slate editor current state
that is passed to the wrapper in order
so it can get state information

#### Inherited from

[ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md).[state](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#state)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1010](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1010)

___

### toolbarExtras

• `Optional` **toolbarExtras**: [`IToolbarPrescenseElement`](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md)[]

Function that should be specified to assign extra toolbar elements
to be used either by ui handled components and whatnot

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:455](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L455)

___

### wrapperClassName

• `Optional` **wrapperClassName**: `string`

Add a class name to the entire wrapper

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:483](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L483)

___

### wrapperSx

• `Optional` **wrapperSx**: `SxProps`<{}\>

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:484](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L484)

___

### wrapperTextEditorClassName

• `Optional` **wrapperTextEditorClassName**: `string`

Add a class name to the container in the wrapper

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:488](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L488)

___

### wrapperTextEditorSx

• `Optional` **wrapperTextEditorSx**: `SxProps`<{}\>

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:489](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L489)

## Methods

### customExtraChildren

▸ `Optional` **customExtraChildren**(`characterCount`, `wordCount`): `ReactNode`

A function to define custom extra children

#### Parameters

| Name | Type |
| :------ | :------ |
| `characterCount` | `number` |
| `wordCount` | `number` |

#### Returns

`ReactNode`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:493](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L493)

___

### dismissCurrentLoadError

▸ **dismissCurrentLoadError**(): `void`

Dismiss the current load error follows the same logic
as the currentLoadError

#### Returns

`void`

#### Inherited from

[ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md).[dismissCurrentLoadError](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#dismisscurrentloaderror)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1041](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1041)
