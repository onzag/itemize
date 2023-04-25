[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / RichTextEditorToolbarProps

# Interface: RichTextEditorToolbarProps

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).RichTextEditorToolbarProps

These are the rich text editor toolbar properties they basically take the same
that the entire wrapper does, but adding these functions and flags taken from
the state of the wrapper or other functions

## Hierarchy

- [`IMaterialUISlateWrapperProps`](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)

  ↳ **`RichTextEditorToolbarProps`**

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#children)
- [currentLoadError](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#currentloaderror)
- [customToolbar](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#customtoolbar)
- [disabled](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#disabled)
- [disjointedMode](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#disjointedmode)
- [disjointedModeKeepToolbar](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#disjointedmodekeeptoolbar)
- [drawerExtras](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#drawerextras)
- [drawerOpen](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#draweropen)
- [featureSupport](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#helpers)
- [hideDrawer](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#hidedrawer)
- [i18nGenericError](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#i18ngenericerror)
- [i18nOk](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#i18nok)
- [i18nRichInfo](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#i18nrichinfo)
- [reactionerDisabled](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#reactionerdisabled)
- [reactionerKey](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#reactionerkey)
- [reactionerPriority](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#reactionerpriority)
- [reactionerUseInFlow](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#reactioneruseinflow)
- [state](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#state)
- [toolbarClassName](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#toolbarclassname)
- [toolbarExtras](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#toolbarextras)
- [toolbarHeight](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#toolbarheight)
- [toolbarState](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#toolbarstate)
- [toolbarSx](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#toolbarsx)
- [variant](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#variant)
- [wrapperClassName](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#wrapperclassname)
- [wrapperSx](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#wrappersx)
- [wrapperTextEditorClassName](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#wrappertexteditorclassname)
- [wrapperTextEditorSx](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#wrappertexteditorsx)

### Methods

- [customExtraChildren](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#customextrachildren)
- [dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#dismisscurrentloaderror)
- [onHeightChange](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#onheightchange)
- [requestFile](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#requestfile)
- [requestImage](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#requestimage)
- [setToolbarState](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#settoolbarstate)
- [shouldHaveDrawer](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#shouldhavedrawer)
- [toggleDrawer](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#toggledrawer)

## Properties

### children

• **children**: `ReactNode`

This is the thing to wrap, it is the react
rich text editor itself as it comes from slate
and it should be rendered
where it is expected to be used

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[children](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#children)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:807](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L807)

___

### currentLoadError

• **currentLoadError**: `string`

A current error, translated
it is given directly as a prop to the editor class
as it's just passed right here as well to the wrapper
this is used via the PropertyEntryText as it does
indeed provide this as a prop for the render

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[currentLoadError](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#currentloaderror)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:815](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L815)

___

### customToolbar

• `Optional` **customToolbar**: [`SlateEditorWrapperCustomToolbarElement`](../modules/client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelement)[]

Function to be used to specify a whole custom toolbar down to the very basics

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[customToolbar](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#customtoolbar)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:450](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L450)

___

### disabled

• **disabled**: `boolean`

Whether it is disabled

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[disabled](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#disabled)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:783](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L783)

___

### disjointedMode

• `Optional` **disjointedMode**: `boolean`

The disjointed mode

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[disjointedMode](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#disjointedmode)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:462](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L462)

___

### disjointedModeKeepToolbar

• `Optional` **disjointedModeKeepToolbar**: `boolean`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[disjointedModeKeepToolbar](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#disjointedmodekeeptoolbar)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:463](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L463)

___

### drawerExtras

• `Optional` **drawerExtras**: [`IDrawerConfiguratorElement`](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElement.md)[]

Drawer extras for the ui handled types

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[drawerExtras](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#drawerextras)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:454](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L454)

___

### drawerOpen

• **drawerOpen**: `boolean`

Whether the drawer is open, the drawer is the side drawer that contains
a lot of functionality to edit the currently selected element

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:504](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L504)

___

### featureSupport

• **featureSupport**: [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

This is a list of extended features that are available
to the editor, and the wrapper can render buttons
and whatnot from it

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[featureSupport](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#featuresupport)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:795](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L795)

___

### helpers

• **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

These are helper functions that are used to insert elements
and modify nodes

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[helpers](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#helpers)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:800](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L800)

___

### hideDrawer

• `Optional` **hideDrawer**: `boolean`

Whether to hide the drawer

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[hideDrawer](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#hidedrawer)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:458](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L458)

___

### i18nGenericError

• **i18nGenericError**: `string`

A generic error message

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[i18nGenericError](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#i18ngenericerror)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:433](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L433)

___

### i18nOk

• **i18nOk**: `string`

A generic ok

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[i18nOk](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#i18nok)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:437](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L437)

___

### i18nRichInfo

• **i18nRichInfo**: [`IPropertyEntryI18nRichTextInfo`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md)

The whole of the i18n rich information that is given by default

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[i18nRichInfo](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#i18nrichinfo)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:441](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L441)

___

### reactionerDisabled

• `Optional` **reactionerDisabled**: `boolean`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[reactionerDisabled](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#reactionerdisabled)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:490](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L490)

___

### reactionerKey

• `Optional` **reactionerKey**: `string`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[reactionerKey](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#reactionerkey)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:489](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L489)

___

### reactionerPriority

• `Optional` **reactionerPriority**: `number`

For generating an alt badge reactioner

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[reactionerPriority](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#reactionerpriority)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:488](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L488)

___

### reactionerUseInFlow

• `Optional` **reactionerUseInFlow**: `boolean`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[reactionerUseInFlow](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#reactioneruseinflow)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:491](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L491)

___

### state

• **state**: [`ISlateEditorInternalStateType`](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md)

The current state

#### Overrides

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[state](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#state)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:509](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L509)

___

### toolbarClassName

• `Optional` **toolbarClassName**: `string`

Add a class name to the toolbar in the wrapper

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[toolbarClassName](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#toolbarclassname)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:478](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L478)

___

### toolbarExtras

• `Optional` **toolbarExtras**: [`IToolbarPrescenseElement`](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md)[]

Function that should be specified to assign extra toolbar elements
to be used either by ui handled components and whatnot

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[toolbarExtras](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#toolbarextras)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:446](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L446)

___

### toolbarHeight

• **toolbarHeight**: `number`

The toolbar height

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:519](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L519)

___

### toolbarState

• **toolbarState**: `string`

A custom toolbar state

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:514](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L514)

___

### toolbarSx

• `Optional` **toolbarSx**: `SxProps`<{}\>

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[toolbarSx](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#toolbarsx)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:479](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L479)

___

### variant

• `Optional` **variant**: ``"filled"`` \| ``"outlined"``

The wrapper variant

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[variant](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#variant)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:429](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L429)

___

### wrapperClassName

• `Optional` **wrapperClassName**: `string`

Add a class name to the entire wrapper

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[wrapperClassName](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#wrapperclassname)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:467](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L467)

___

### wrapperSx

• `Optional` **wrapperSx**: `SxProps`<{}\>

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[wrapperSx](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#wrappersx)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:468](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L468)

___

### wrapperTextEditorClassName

• `Optional` **wrapperTextEditorClassName**: `string`

Add a class name to the container in the wrapper

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[wrapperTextEditorClassName](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#wrappertexteditorclassname)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:472](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L472)

___

### wrapperTextEditorSx

• `Optional` **wrapperTextEditorSx**: `SxProps`<{}\>

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[wrapperTextEditorSx](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#wrappertexteditorsx)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:473](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L473)

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

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[customExtraChildren](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#customextrachildren)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:483](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L483)

___

### dismissCurrentLoadError

▸ **dismissCurrentLoadError**(): `void`

Dismiss the current load error follows the same logic
as the currentLoadError

#### Returns

`void`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#dismisscurrentloaderror)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:820](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L820)

___

### onHeightChange

▸ **onHeightChange**(`newHeight`): `void`

Called when the height changes

#### Parameters

| Name | Type |
| :------ | :------ |
| `newHeight` | `number` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:551](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L551)

___

### requestFile

▸ **requestFile**(): `void`

Call to request a file, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:529](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L529)

___

### requestImage

▸ **requestImage**(): `void`

call to request an image, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:524](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L524)

___

### setToolbarState

▸ **setToolbarState**(`state`): `void`

sets the toolbar state

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `string` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:534](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L534)

___

### shouldHaveDrawer

▸ **shouldHaveDrawer**(): `boolean`

A function that specifies whether the drawer should
exist

#### Returns

`boolean`

a boolean as the answer

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:541](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L541)

___

### toggleDrawer

▸ **toggleDrawer**(): `void`

Toggle the drawer open or close

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:546](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L546)
