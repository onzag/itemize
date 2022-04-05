[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / IWrapperContainerProps

# Interface: IWrapperContainerProps

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).IWrapperContainerProps

## Hierarchy

- [`MaterialUISlateWrapperWithStyles`](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md)

  ↳ **`IWrapperContainerProps`**

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#children)
- [currentLoadError](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#currentloaderror)
- [customToolbar](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#customtoolbar)
- [disjointedMode](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#disjointedmode)
- [drawerExtras](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#drawerextras)
- [drawerMode](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#drawermode)
- [drawerOpen](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#draweropen)
- [fastKeyActive](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#fastkeyactive)
- [featureSupport](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#helpers)
- [hideDrawer](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#hidedrawer)
- [hideTree](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#hidetree)
- [i18nGenericError](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#i18ngenericerror)
- [i18nOk](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#i18nok)
- [i18nRichInfo](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#i18nrichinfo)
- [noAnimate](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#noanimate)
- [state](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#state)
- [toolbarExtras](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#toolbarextras)
- [toolbarHeight](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#toolbarheight)
- [wrapperClassName](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#wrapperclassname)
- [wrapperSx](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#wrappersx)
- [wrapperTextEditorClassName](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#wrappertexteditorclassname)
- [wrapperTextEditorSx](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#wrappertexteditorsx)

### Methods

- [customExtraChildren](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#customextrachildren)
- [dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.IWrapperContainerProps.md#dismisscurrentloaderror)

## Properties

### children

• **children**: `ReactNode`

This is the thing to wrap, it is the react
rich text editor itself as it comes from slate
and it should be rendered
where it is expected to be used

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[children](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#children)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1028](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1028)

___

### currentLoadError

• **currentLoadError**: `string`

A current error, translated
it is given directly as a prop to the editor class
as it's just passed right here as well to the wrapper
this is used via the PropertyEntryText as it does
indeed provide this as a prop for the render

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[currentLoadError](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#currentloaderror)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1036](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1036)

___

### customToolbar

• `Optional` **customToolbar**: [`SlateEditorWrapperCustomToolbarElement`](../modules/client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelement)[]

Function to be used to specify a whole custom toolbar down to the very basics

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[customToolbar](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#customtoolbar)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:459](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L459)

___

### disjointedMode

• `Optional` **disjointedMode**: `boolean`

The disjointed mode

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[disjointedMode](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#disjointedmode)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:479](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L479)

___

### drawerExtras

• `Optional` **drawerExtras**: [`DrawerConfiguratorElement`](../modules/client_fast_prototyping_components_slate_wrapper.md#drawerconfiguratorelement)[]

Drawer extras for the ui handled types

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[drawerExtras](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#drawerextras)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:463](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L463)

___

### drawerMode

• `Optional` **drawerMode**: ``"full"`` \| ``"with-styles"`` \| ``"simple"`` \| ``"barebones"``

Drawer mode

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[drawerMode](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#drawermode)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:475](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L475)

___

### drawerOpen

• **drawerOpen**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:2303](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L2303)

___

### fastKeyActive

• **fastKeyActive**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:2306](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L2306)

___

### featureSupport

• **featureSupport**: [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

This is a list of extended features that are available
to the editor, and the wrapper can render buttons
and whatnot from it

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[featureSupport](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#featuresupport)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1016](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1016)

___

### helpers

• **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

These are helper functions that are used to insert elements
and modify nodes

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[helpers](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#helpers)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1021](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1021)

___

### hideDrawer

• `Optional` **hideDrawer**: `boolean`

Whether to hide the drawer

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[hideDrawer](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#hidedrawer)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:467](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L467)

___

### hideTree

• `Optional` **hideTree**: `boolean`

Whether to hide the tree

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[hideTree](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#hidetree)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:471](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L471)

___

### i18nGenericError

• **i18nGenericError**: `string`

A generic error message

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[i18nGenericError](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#i18ngenericerror)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:442](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L442)

___

### i18nOk

• **i18nOk**: `string`

A generic ok

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[i18nOk](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#i18nok)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:446](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L446)

___

### i18nRichInfo

• **i18nRichInfo**: [`IPropertyEntryI18nRichTextInfo`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md)

The whole of the i18n rich information that is given by default

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[i18nRichInfo](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#i18nrichinfo)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:450](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L450)

___

### noAnimate

• **noAnimate**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:2305](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L2305)

___

### state

• **state**: [`ISlateEditorStateType`](client_fast_prototyping_components_slate.ISlateEditorStateType.md)

This is the slate editor current state
that is passed to the wrapper in order
so it can get state information

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[state](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#state)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1010](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1010)

___

### toolbarExtras

• `Optional` **toolbarExtras**: [`IToolbarPrescenseElement`](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md)[]

Function that should be specified to assign extra toolbar elements
to be used either by ui handled components and whatnot

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[toolbarExtras](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#toolbarextras)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:455](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L455)

___

### toolbarHeight

• **toolbarHeight**: `number`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:2304](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L2304)

___

### wrapperClassName

• `Optional` **wrapperClassName**: `string`

Add a class name to the entire wrapper

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[wrapperClassName](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#wrapperclassname)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:483](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L483)

___

### wrapperSx

• `Optional` **wrapperSx**: `SxProps`<{}\>

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[wrapperSx](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#wrappersx)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:484](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L484)

___

### wrapperTextEditorClassName

• `Optional` **wrapperTextEditorClassName**: `string`

Add a class name to the container in the wrapper

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[wrapperTextEditorClassName](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#wrappertexteditorclassname)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:488](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L488)

___

### wrapperTextEditorSx

• `Optional` **wrapperTextEditorSx**: `SxProps`<{}\>

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[wrapperTextEditorSx](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#wrappertexteditorsx)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:489](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L489)

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

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[customExtraChildren](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#customextrachildren)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:493](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L493)

___

### dismissCurrentLoadError

▸ **dismissCurrentLoadError**(): `void`

Dismiss the current load error follows the same logic
as the currentLoadError

#### Returns

`void`

#### Inherited from

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#dismisscurrentloaderror)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1041](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1041)
