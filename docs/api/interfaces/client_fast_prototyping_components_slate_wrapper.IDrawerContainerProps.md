[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / IDrawerContainerProps

# Interface: IDrawerContainerProps

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).IDrawerContainerProps

These are the base props that this wrapper uses, note how we extend the base wrapper props as defined
in the slate editor itself, and add the styles for the classes and these i18n info

If you wonder how the i18n information is to be added, in the PropertyEntryText when creating
the slate editor as a component the wrapper can receive wrapperArgs so these args are passed
when the editor is created with the wrapper itself

## Hierarchy

- [`IMaterialUISlateWrapperProps`](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)

  ↳ **`IDrawerContainerProps`**

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#children)
- [currentLoadError](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#currentloaderror)
- [customExtraChildren](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#customextrachildren)
- [customToolbar](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#customtoolbar)
- [disabled](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#disabled)
- [disjointedMode](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#disjointedmode)
- [disjointedModeKeepToolbar](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#disjointedmodekeeptoolbar)
- [dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#dismisscurrentloaderror)
- [drawerExtras](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#drawerextras)
- [drawerOpen](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#draweropen)
- [featureSupport](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#helpers)
- [hideDrawer](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#hidedrawer)
- [i18nGenericError](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#i18ngenericerror)
- [i18nOk](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#i18nok)
- [i18nRichInfo](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#i18nrichinfo)
- [noAnimate](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#noanimate)
- [reactionerDisabled](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#reactionerdisabled)
- [reactionerKey](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#reactionerkey)
- [reactionerPriority](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#reactionerpriority)
- [reactionerUseInFlow](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#reactioneruseinflow)
- [state](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#state)
- [toolbarClassName](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#toolbarclassname)
- [toolbarExtras](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#toolbarextras)
- [toolbarHeight](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#toolbarheight)
- [toolbarSx](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#toolbarsx)
- [variant](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#variant)
- [wrapperClassName](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#wrapperclassname)
- [wrapperSx](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#wrappersx)
- [wrapperTextEditorClassName](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#wrappertexteditorclassname)
- [wrapperTextEditorSx](client_fast_prototyping_components_slate_wrapper.IDrawerContainerProps.md#wrappertexteditorsx)

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

[client/fast-prototyping/components/slate/index.tsx:827](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L827)

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

[client/fast-prototyping/components/slate/index.tsx:835](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L835)

___

### customExtraChildren

• `Optional` **customExtraChildren**: (`characterCount`: `number`, `wordCount`: `number`) => `ReactNode`

#### Type declaration

▸ (`characterCount`, `wordCount`): `ReactNode`

A function to define custom extra children

##### Parameters

| Name | Type |
| :------ | :------ |
| `characterCount` | `number` |
| `wordCount` | `number` |

##### Returns

`ReactNode`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[customExtraChildren](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#customextrachildren)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:485](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L485)

___

### customToolbar

• `Optional` **customToolbar**: [`SlateEditorWrapperCustomToolbarElement`](../modules/client_fast_prototyping_components_slate_wrapper.md#slateeditorwrappercustomtoolbarelement)[]

Function to be used to specify a whole custom toolbar down to the very basics

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[customToolbar](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#customtoolbar)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:452](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L452)

___

### disabled

• **disabled**: `boolean`

Whether it is disabled

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[disabled](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#disabled)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:803](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L803)

___

### disjointedMode

• `Optional` **disjointedMode**: `boolean`

The disjointed mode

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[disjointedMode](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#disjointedmode)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:464](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L464)

___

### disjointedModeKeepToolbar

• `Optional` **disjointedModeKeepToolbar**: `boolean`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[disjointedModeKeepToolbar](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#disjointedmodekeeptoolbar)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:465](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L465)

___

### dismissCurrentLoadError

• **dismissCurrentLoadError**: () => `void`

#### Type declaration

▸ (): `void`

Dismiss the current load error follows the same logic
as the currentLoadError

##### Returns

`void`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#dismisscurrentloaderror)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:840](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L840)

___

### drawerExtras

• `Optional` **drawerExtras**: [`IDrawerConfiguratorElement`](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElement.md)[]

Drawer extras for the ui handled types

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[drawerExtras](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#drawerextras)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:456](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L456)

___

### drawerOpen

• **drawerOpen**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:2056](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L2056)

___

### featureSupport

• **featureSupport**: [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

This is a list of extended features that are available
to the editor, and the wrapper can render buttons
and whatnot from it

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[featureSupport](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#featuresupport)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:815](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L815)

___

### helpers

• **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

These are helper functions that are used to insert elements
and modify nodes

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[helpers](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#helpers)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:820](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L820)

___

### hideDrawer

• `Optional` **hideDrawer**: `boolean`

Whether to hide the drawer

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[hideDrawer](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#hidedrawer)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:460](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L460)

___

### i18nGenericError

• **i18nGenericError**: `string`

A generic error message

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[i18nGenericError](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#i18ngenericerror)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:435](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L435)

___

### i18nOk

• **i18nOk**: `string`

A generic ok

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[i18nOk](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#i18nok)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:439](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L439)

___

### i18nRichInfo

• **i18nRichInfo**: [`IPropertyEntryI18nRichTextInfo`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md)

The whole of the i18n rich information that is given by default

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[i18nRichInfo](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#i18nrichinfo)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:443](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L443)

___

### noAnimate

• **noAnimate**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:2058](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L2058)

___

### reactionerDisabled

• `Optional` **reactionerDisabled**: `boolean`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[reactionerDisabled](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#reactionerdisabled)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:492](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L492)

___

### reactionerKey

• `Optional` **reactionerKey**: `string`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[reactionerKey](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#reactionerkey)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:491](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L491)

___

### reactionerPriority

• `Optional` **reactionerPriority**: `number`

For generating an alt badge reactioner

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[reactionerPriority](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#reactionerpriority)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:490](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L490)

___

### reactionerUseInFlow

• `Optional` **reactionerUseInFlow**: `boolean`

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[reactionerUseInFlow](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#reactioneruseinflow)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:493](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L493)

___

### state

• **state**: [`ISlateEditorInternalStateType`](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md)

This is the slate editor current state
that is passed to the wrapper in order
so it can get state information

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[state](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#state)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:809](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L809)

___

### toolbarClassName

• `Optional` **toolbarClassName**: `string`

Add a class name to the toolbar in the wrapper

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[toolbarClassName](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#toolbarclassname)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:480](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L480)

___

### toolbarExtras

• `Optional` **toolbarExtras**: [`IToolbarPrescenseElement`](client_fast_prototyping_components_slate_wrapper.IToolbarPrescenseElement.md)[]

Function that should be specified to assign extra toolbar elements
to be used either by ui handled components and whatnot

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[toolbarExtras](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#toolbarextras)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:448](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L448)

___

### toolbarHeight

• **toolbarHeight**: `number`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:2057](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L2057)

___

### toolbarSx

• `Optional` **toolbarSx**: `SxProps`\<{}\>

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[toolbarSx](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#toolbarsx)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:481](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L481)

___

### variant

• `Optional` **variant**: ``"filled"`` \| ``"outlined"``

The wrapper variant

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[variant](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#variant)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:431](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L431)

___

### wrapperClassName

• `Optional` **wrapperClassName**: `string`

Add a class name to the entire wrapper

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[wrapperClassName](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#wrapperclassname)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:469](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L469)

___

### wrapperSx

• `Optional` **wrapperSx**: `SxProps`\<{}\>

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[wrapperSx](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#wrappersx)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:470](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L470)

___

### wrapperTextEditorClassName

• `Optional` **wrapperTextEditorClassName**: `string`

Add a class name to the container in the wrapper

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[wrapperTextEditorClassName](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#wrappertexteditorclassname)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:474](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L474)

___

### wrapperTextEditorSx

• `Optional` **wrapperTextEditorSx**: `SxProps`\<{}\>

#### Inherited from

[IMaterialUISlateWrapperProps](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md).[wrapperTextEditorSx](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md#wrappertexteditorsx)

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:475](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L475)
