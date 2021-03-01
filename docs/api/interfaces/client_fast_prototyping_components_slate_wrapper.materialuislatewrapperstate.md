[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / MaterialUISlateWrapperState

# Interface: MaterialUISlateWrapperState

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).MaterialUISlateWrapperState

This is the state for the wrapper
the state is necessary as the wrapper can hold dialogs open
and the drawer itself

## Table of contents

### Properties

- [drawerOpen](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperstate.md#draweropen)
- [elementThatWasCurrentBeforeLosingFocus](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperstate.md#elementthatwascurrentbeforelosingfocus)
- [linkDialogOpen](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperstate.md#linkdialogopen)
- [noAnimate](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperstate.md#noanimate)
- [templateHTMLDialogOpen](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperstate.md#templatehtmldialogopen)
- [templateTextDialogOpen](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperstate.md#templatetextdialogopen)
- [videoDialogOpen](client_fast_prototyping_components_slate_wrapper.materialuislatewrapperstate.md#videodialogopen)

## Properties

### drawerOpen

• **drawerOpen**: *boolean*

Specifies the state of the drawer

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:730](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L730)

___

### elementThatWasCurrentBeforeLosingFocus

• **elementThatWasCurrentBeforeLosingFocus**: [*RichElement*](../modules/client_internal_text_serializer.md#richelement)

When opening a dialog and losing focus to the slate rich text editor content editable
we lose access to the anchors and current elements now that we are in focus of something
else so we need to store the element that was the current element that was in focus
before that happened

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:747](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L747)

___

### linkDialogOpen

• **linkDialogOpen**: *boolean*

Specifies whether the link dialog to input links and template links is open

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:715](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L715)

___

### noAnimate

• **noAnimate**: *boolean*

The drawer being open or closed is stored in local storage, which is not available in the server
side, and the drawer animates when it's opened and closed, so this variable is always false at the
start, the drawer is always closed at the start, however, if we need to open the drawer at the start
on mount we don't want any animation so we toggle this flag temporarily, it doesn't need to be part
of the state as it's only used there

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:739](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L739)

___

### templateHTMLDialogOpen

• **templateHTMLDialogOpen**: *boolean*

Specifies whether the link dialog to input templated html is open

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:725](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L725)

___

### templateTextDialogOpen

• **templateTextDialogOpen**: *boolean*

Specifies whether the link dialog to input templated text is open

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:720](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L720)

___

### videoDialogOpen

• **videoDialogOpen**: *boolean*

Specifies whether the video dialog to input the url for the video is open

Defined in: [client/fast-prototyping/components/slate/wrapper.tsx:710](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/slate/wrapper.tsx#L710)
