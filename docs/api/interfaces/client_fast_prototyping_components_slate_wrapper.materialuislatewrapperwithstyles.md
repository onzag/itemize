[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / MaterialUISlateWrapperWithStyles

# Interface: MaterialUISlateWrapperWithStyles

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).MaterialUISlateWrapperWithStyles

These are the base props that this wrapper uses, note how we extend the base wrapper props as defined
in the slate editor itself, and add the styles for the classes and these i18n info

If you wonder how the i18n information is to be added, in the PropertyEntryText when creating
the slate editor as a component the wrapper can receive wrapperArgs so these args are passed
when the editor is created with the wrapper itself

## Hierarchy

* [*ISlateEditorWrapperBaseProps*](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md)

* [*WithStyles*](../modules/client_fast_prototyping_mui_core.md#withstyles)<*typeof* style\>

  ↳ **MaterialUISlateWrapperWithStyles**

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#children)
- [classes](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#classes)
- [currentLoadError](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#currentloaderror)
- [disjointedMode](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#disjointedmode)
- [dismissCurrentLoadError](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#dismisscurrentloaderror)
- [drawerUIHandlerExtras](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#draweruihandlerextras)
- [featureSupport](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#helpers)
- [hideDrawer](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#hidedrawer)
- [i18nGenericError](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#i18ngenericerror)
- [i18nOk](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#i18nok)
- [i18nRichInfo](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#i18nrichinfo)
- [state](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#state)
- [toolbarExtras](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md#toolbarextras)

## Properties

### children

• **children**: ReactNode

This is the thing to wrap, it is the react
rich text editor itself as it comes from slate
and it should be rendered
where it is expected to be used

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[children](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#children)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1047](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1047)

___

### classes

• **classes**: *Record*<*separator* \| *tab* \| *toolbar* \| *input* \| *appbar* \| *selectionInput* \| *box* \| *chips* \| *chip* \| *editorContainer* \| *wrapperButton* \| *treeChildrenBox* \| *treeDataBox* \| *dropPositionEnabled* \| *dropPositionDisabled* \| *badge* \| *badgeDisabled* \| *elementTitle* \| *editorDrawer* \| *editorDrawerAppbarSpacer* \| *editorDrawerFixed* \| *editorDrawerNoAnimate* \| *editorDrawerBody* \| *drawerSettingsForNodePaper* \| *editor* \| *divider* \| *appbarFixed* \| *moreOptionsSpacer* \| *linkTemplateOptionsBox* \| *linkTemplateOptionsText* \| *optionPrimary*, string\>

Defined in: node_modules/@material-ui/core/styles/withStyles.d.ts:42

___

### currentLoadError

• **currentLoadError**: *string*

A current error, translated
it is given directly as a prop to the editor class
as it's just passed right here as well to the wrapper
this is used via the PropertyEntryText as it does
indeed provide this as a prop for the render

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[currentLoadError](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#currentloaderror)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1055](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1055)

___

### disjointedMode

• `Optional` **disjointedMode**: *boolean*

The disjointed mode

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[disjointedMode](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#disjointedmode)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1077](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1077)

___

### dismissCurrentLoadError

• **dismissCurrentLoadError**: () => *void*

Dismiss the current load error follows the same logic
as the currentLoadError

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:1060](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1060)

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[dismissCurrentLoadError](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#dismisscurrentloaderror)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1060](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1060)

___

### drawerUIHandlerExtras

• `Optional` **drawerUIHandlerExtras**: [*IDrawerUIHandlerConfiguratorElement*](client_fast_prototyping_components_slate.idraweruihandlerconfiguratorelement.md)[]

Drawer extras for the ui handled types

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[drawerUIHandlerExtras](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#draweruihandlerextras)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1069](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1069)

___

### featureSupport

• **featureSupport**: [*IAccessibleFeatureSupportOptions*](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md)

This is a list of extended features that are available
to the editor, and the wrapper can render buttons
and whatnot from it

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[featureSupport](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#featuresupport)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1035](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1035)

___

### helpers

• **helpers**: [*IHelperFunctions*](client_fast_prototyping_components_slate.ihelperfunctions.md)

These are helper functions that are used to insert elements
and modify nodes

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[helpers](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#helpers)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1040](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1040)

___

### hideDrawer

• `Optional` **hideDrawer**: *boolean*

Whether to hide the drawer

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[hideDrawer](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#hidedrawer)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1073](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1073)

___

### i18nGenericError

• **i18nGenericError**: *string*

A generic error message

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:239](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L239)

___

### i18nOk

• **i18nOk**: *string*

A generic ok

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:243](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L243)

___

### i18nRichInfo

• **i18nRichInfo**: [*IPropertyEntryI18nRichTextInfo*](client_internal_components_propertyentry_propertyentrytext.ipropertyentryi18nrichtextinfo.md)

The whole of the i18n rich information that is given by default

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:247](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L247)

___

### state

• **state**: [*ISlateEditorStateType*](client_fast_prototyping_components_slate.islateeditorstatetype.md)

This is the slate editor current state
that is passed to the wrapper in order
so it can get state information

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[state](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#state)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1029](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1029)

___

### toolbarExtras

• `Optional` **toolbarExtras**: [*IToolbarPrescenseElement*](client_fast_prototyping_components_slate.itoolbarprescenseelement.md)[]

Function that should be specified to assign extra toolbar elements
to be used either by ui handled components and whatnot

Inherited from: [ISlateEditorWrapperBaseProps](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md).[toolbarExtras](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#toolbarextras)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1065](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/index.tsx#L1065)
