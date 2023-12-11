[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / MaterialUISlateWrapperState

# Interface: MaterialUISlateWrapperState

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).MaterialUISlateWrapperState

This is the state for the wrapper
the state is necessary as the wrapper can hold dialogs open
and the drawer itself

## Table of contents

### Properties

- [drawerOpen](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md#draweropen)
- [inlineElementThatWasCurrentBeforeLosingFocus](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md#inlineelementthatwascurrentbeforelosingfocus)
- [noAnimate](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md#noanimate)
- [toolbarHeight](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md#toolbarheight)
- [toolbarState](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md#toolbarstate)

## Properties

### drawerOpen

• **drawerOpen**: `boolean`

Specifies the state of the drawer

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1431](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L1431)

___

### inlineElementThatWasCurrentBeforeLosingFocus

• **inlineElementThatWasCurrentBeforeLosingFocus**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

When opening a dialog and losing focus to the slate rich text editor content editable
we lose access to the anchors and current elements now that we are in focus of something
else so we need to store the element that was the current element that was in focus
before that happened

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1459](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L1459)

___

### noAnimate

• **noAnimate**: `boolean`

The drawer being open or closed is stored in local storage, which is not available in the server
side, and the drawer animates when it's opened and closed, so this variable is always false at the
start, the drawer is always closed at the start, however, if we need to open the drawer at the start
on mount we don't want any animation so we toggle this flag temporarily, it doesn't need to be part
of the state as it's only used there

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1451](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L1451)

___

### toolbarHeight

• **toolbarHeight**: `number`

Specifies the height of the toolbar for use
when the drawer is open in disjointed mode

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1437](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L1437)

___

### toolbarState

• **toolbarState**: `string`

A custom toolbar state

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1442](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/wrapper.tsx#L1442)
