[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateEditorWrapperBaseProps

# Interface: ISlateEditorWrapperBaseProps

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateEditorWrapperBaseProps

The base props that every wrapper is going to get
based on the standard that is passed by the component
that contains the base rich text editor

You might extend this class and require extra props, these
props might be passed by using the wrapperArgs from
the main component which will pass them to the wrapper

## Hierarchy

* **ISlateEditorWrapperBaseProps**

  ↳ [*MaterialUISlateWrapperWithStyles*](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperwithstyles.md)

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#children)
- [currentLoadError](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#currentloaderror)
- [disjointedMode](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#disjointedmode)
- [dismissCurrentLoadError](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#dismisscurrentloaderror)
- [drawerUIHandlerExtras](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#draweruihandlerextras)
- [featureSupport](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#helpers)
- [hideDrawer](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#hidedrawer)
- [state](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#state)
- [toolbarExtras](client_fast_prototyping_components_slate.islateeditorwrapperbaseprops.md#toolbarextras)

## Properties

### children

• **children**: ReactNode

This is the thing to wrap, it is the react
rich text editor itself as it comes from slate
and it should be rendered
where it is expected to be used

Defined in: [client/fast-prototyping/components/slate/index.tsx:1047](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1047)

___

### currentLoadError

• **currentLoadError**: *string*

A current error, translated
it is given directly as a prop to the editor class
as it's just passed right here as well to the wrapper
this is used via the PropertyEntryText as it does
indeed provide this as a prop for the render

Defined in: [client/fast-prototyping/components/slate/index.tsx:1055](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1055)

___

### disjointedMode

• `Optional` **disjointedMode**: *boolean*

The disjointed mode

Defined in: [client/fast-prototyping/components/slate/index.tsx:1077](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1077)

___

### dismissCurrentLoadError

• **dismissCurrentLoadError**: () => *void*

Dismiss the current load error follows the same logic
as the currentLoadError

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:1060](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1060)

Defined in: [client/fast-prototyping/components/slate/index.tsx:1060](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1060)

___

### drawerUIHandlerExtras

• `Optional` **drawerUIHandlerExtras**: [*IDrawerUIHandlerConfiguratorElement*](client_fast_prototyping_components_slate.idraweruihandlerconfiguratorelement.md)[]

Drawer extras for the ui handled types

Defined in: [client/fast-prototyping/components/slate/index.tsx:1069](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1069)

___

### featureSupport

• **featureSupport**: [*IAccessibleFeatureSupportOptions*](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md)

This is a list of extended features that are available
to the editor, and the wrapper can render buttons
and whatnot from it

Defined in: [client/fast-prototyping/components/slate/index.tsx:1035](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1035)

___

### helpers

• **helpers**: [*IHelperFunctions*](client_fast_prototyping_components_slate.ihelperfunctions.md)

These are helper functions that are used to insert elements
and modify nodes

Defined in: [client/fast-prototyping/components/slate/index.tsx:1040](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1040)

___

### hideDrawer

• `Optional` **hideDrawer**: *boolean*

Whether to hide the drawer

Defined in: [client/fast-prototyping/components/slate/index.tsx:1073](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1073)

___

### state

• **state**: [*ISlateEditorStateType*](client_fast_prototyping_components_slate.islateeditorstatetype.md)

This is the slate editor current state
that is passed to the wrapper in order
so it can get state information

Defined in: [client/fast-prototyping/components/slate/index.tsx:1029](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1029)

___

### toolbarExtras

• `Optional` **toolbarExtras**: [*IToolbarPrescenseElement*](client_fast_prototyping_components_slate.itoolbarprescenseelement.md)[]

Function that should be specified to assign extra toolbar elements
to be used either by ui handled components and whatnot

Defined in: [client/fast-prototyping/components/slate/index.tsx:1065](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/components/slate/index.tsx#L1065)
