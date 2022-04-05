[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateEditorWrapperBaseProps

# Interface: ISlateEditorWrapperBaseProps

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateEditorWrapperBaseProps

The base props that every wrapper is going to get
based on the standard that is passed by the component
that contains the base rich text editor

You might extend this class and require extra props, these
props might be passed by using the wrapperArgs from
the main component which will pass them to the wrapper

## Hierarchy

- **`ISlateEditorWrapperBaseProps`**

  ↳ [`MaterialUISlateWrapperWithStyles`](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperWithStyles.md)

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#children)
- [currentLoadError](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#currentloaderror)
- [featureSupport](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#featuresupport)
- [helpers](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#helpers)
- [state](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#state)

### Methods

- [dismissCurrentLoadError](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#dismisscurrentloaderror)

## Properties

### children

• **children**: `ReactNode`

This is the thing to wrap, it is the react
rich text editor itself as it comes from slate
and it should be rendered
where it is expected to be used

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

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1036](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1036)

___

### featureSupport

• **featureSupport**: [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

This is a list of extended features that are available
to the editor, and the wrapper can render buttons
and whatnot from it

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1016](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1016)

___

### helpers

• **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

These are helper functions that are used to insert elements
and modify nodes

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1021](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1021)

___

### state

• **state**: [`ISlateEditorStateType`](client_fast_prototyping_components_slate.ISlateEditorStateType.md)

This is the slate editor current state
that is passed to the wrapper in order
so it can get state information

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1010](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1010)

## Methods

### dismissCurrentLoadError

▸ **dismissCurrentLoadError**(): `void`

Dismiss the current load error follows the same logic
as the currentLoadError

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1041](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L1041)
