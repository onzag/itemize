[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / RichTextEditorToolbarProps

# Interface: RichTextEditorToolbarProps

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).RichTextEditorToolbarProps

These are the rich text editor toolbar properties they basically take the same
that the entire wrapper does, but adding these functions and flags taken from
the state of the wrapper or other functions

## Hierarchy

- [`MaterialUISlateWrapperWithStyles`](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md)

  ↳ **`RichTextEditorToolbarProps`**

## Table of contents

### Properties

- [altKey](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#altkey)
- [children](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#children)
- [currentLoadError](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#currentloaderror)
- [customToolbar](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#customtoolbar)
- [disjointedMode](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#disjointedmode)
- [drawerExtras](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#drawerextras)
- [drawerMode](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#drawermode)
- [drawerOpen](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#draweropen)
- [featureSupport](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#helpers)
- [hideDrawer](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#hidedrawer)
- [hideTree](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#hidetree)
- [i18nGenericError](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#i18ngenericerror)
- [i18nOk](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#i18nok)
- [i18nRichInfo](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#i18nrichinfo)
- [shiftKey](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#shiftkey)
- [state](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#state)
- [toolbarExtras](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#toolbarextras)
- [wrapperClassName](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#wrapperclassname)
- [wrapperSx](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#wrappersx)
- [wrapperTextEditorClassName](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#wrappertexteditorclassname)
- [wrapperTextEditorSx](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#wrappertexteditorsx)

### Methods

- [customExtraChildren](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#customextrachildren)
- [dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#dismisscurrentloaderror)
- [insertContainer](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#insertcontainer)
- [onHeightChange](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#onheightchange)
- [requestFile](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#requestfile)
- [requestImage](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#requestimage)
- [requestLink](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#requestlink)
- [requestTemplateHTML](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#requesttemplatehtml)
- [requestTemplateText](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#requesttemplatetext)
- [requestVideo](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#requestvideo)
- [shouldHaveDrawer](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#shouldhavedrawer)
- [toggleDrawer](client_fast_prototyping_components_slate_wrapper.RichTextEditorToolbarProps.md#toggledrawer)

## Properties

### altKey

• **altKey**: `boolean`

Whether the alt key is pressed right now
and it should show the effects

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:512](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L512)

___

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

Whether the drawer is open, the drawer is the side drawer that contains
a lot of functionality to edit the currently selected element

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:506](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L506)

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

### shiftKey

• **shiftKey**: `boolean`

Whether the shift key is pressed right now

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:517](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L517)

___

### state

• **state**: [`ISlateEditorStateType`](client_fast_prototyping_components_slate.ISlateEditorStateType.md)

The current state

#### Overrides

[MaterialUISlateWrapperWithStyles](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md).[state](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md#state)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:522](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L522)

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

___

### insertContainer

▸ **insertContainer**(): `void`

Call to insert a container, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:559](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L559)

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

[client/fast-prototyping/components/slate/wrapper.tsx:573](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L573)

___

### requestFile

▸ **requestFile**(): `void`

Call to request a file, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:532](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L532)

___

### requestImage

▸ **requestImage**(): `void`

call to request an image, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:527](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L527)

___

### requestLink

▸ **requestLink**(): `void`

Call to request a link, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:542](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L542)

___

### requestTemplateHTML

▸ **requestTemplateHTML**(): `void`

Call to insert a template html bit from the context, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:569](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L569)

___

### requestTemplateText

▸ **requestTemplateText**(): `void`

Call to insert a template text bit from the context, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:564](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L564)

___

### requestVideo

▸ **requestVideo**(): `void`

Call to request a video, opens a dialog so requires a state

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:537](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L537)

___

### shouldHaveDrawer

▸ **shouldHaveDrawer**(): `boolean`

A function that specifies whether the drawer should
exist

#### Returns

`boolean`

a boolean as the answer

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:549](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L549)

___

### toggleDrawer

▸ **toggleDrawer**(): `void`

Toggle the drawer open or close

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:554](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L554)
