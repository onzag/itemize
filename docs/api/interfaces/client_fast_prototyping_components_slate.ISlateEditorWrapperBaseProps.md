[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateEditorWrapperBaseProps

# Interface: ISlateEditorWrapperBaseProps

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateEditorWrapperBaseProps

The base props that every wrapper is going to get
based on the standard that is passed by the component
that contains the base rich text editor

You might extend this class and require extra props, these
props might be passed by using the wrapperArgs from
the main component which will pass them to the wrapper

When implementing the wrapper you may add a selectiveHardBlur function
for which triggers when the element is blurred to prevent real blurring (aka executing hardBlur)
depending on if something is selected in the wrapper

The selectiveHardBlur should take a (ev: KeyboardEvent, target: HTMLElement) if you wish to prevent
the blur from happening

## Hierarchy

- **`ISlateEditorWrapperBaseProps`**

  ↳ [`IMaterialUISlateWrapperProps`](client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)

## Table of contents

### Properties

- [children](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#children)
- [currentLoadError](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#currentloaderror)
- [disabled](client_fast_prototyping_components_slate.ISlateEditorWrapperBaseProps.md#disabled)
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

[client/fast-prototyping/components/slate/index.tsx:827](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L827)

___

### currentLoadError

• **currentLoadError**: `string`

A current error, translated
it is given directly as a prop to the editor class
as it's just passed right here as well to the wrapper
this is used via the PropertyEntryText as it does
indeed provide this as a prop for the render

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:835](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L835)

___

### disabled

• **disabled**: `boolean`

Whether it is disabled

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:803](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L803)

___

### featureSupport

• **featureSupport**: [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

This is a list of extended features that are available
to the editor, and the wrapper can render buttons
and whatnot from it

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:815](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L815)

___

### helpers

• **helpers**: [`IHelperFunctions`](client_fast_prototyping_components_slate.IHelperFunctions.md)

These are helper functions that are used to insert elements
and modify nodes

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:820](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L820)

___

### state

• **state**: [`ISlateEditorInternalStateType`](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md)

This is the slate editor current state
that is passed to the wrapper in order
so it can get state information

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:809](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L809)

## Methods

### dismissCurrentLoadError

▸ **dismissCurrentLoadError**(): `void`

Dismiss the current load error follows the same logic
as the currentLoadError

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:840](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L840)
