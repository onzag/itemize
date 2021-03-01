[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/components/dialog

# Module: client/fast-prototyping/components/dialog

Contains a generic dialog component based on MUI that is meant to be extended

## Table of contents

### Variables

- [Dialog](client_fast_prototyping_components_dialog.md#dialog)
- [DialogResponsive](client_fast_prototyping_components_dialog.md#dialogresponsive)

## Variables

### Dialog

• `Const` **Dialog**: *ComponentType*<*Pick*<IDialogProps, *children* \| *open* \| *title* \| *className* \| *onClose* \| *onOpen* \| *onOpening* \| *fullScreen* \| *buttons*\> & *StyledComponentProps*<*content* \| *title* \| *paper* \| *appbar* \| *actions*\>\>

The dialog itself, non-responsive and rather generic

Defined in: [client/fast-prototyping/components/dialog.tsx:95](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/components/dialog.tsx#L95)

___

### DialogResponsive

• `Const` **DialogResponsive**: *ComponentType*<*Pick*<*Pick*<IDialogProps, *children* \| *open* \| *title* \| *className* \| *onClose* \| *onOpen* \| *onOpening* \| *fullScreen* \| *buttons*\> & *StyledComponentProps*<*content* \| *title* \| *paper* \| *appbar* \| *actions*\>, *children* \| *open* \| *title* \| *classes* \| *className* \| *onClose* \| *onOpen* \| *onOpening* \| *buttons* \| *innerRef*\> & *Partial*<WithMobileDialog\> \| *Pick*<PropsWithChildren<*Pick*<IDialogProps, *children* \| *open* \| *title* \| *className* \| *onClose* \| *onOpen* \| *onOpening* \| *fullScreen* \| *buttons*\> & *StyledComponentProps*<*content* \| *title* \| *paper* \| *appbar* \| *actions*\>\>, *children* \| *open* \| *title* \| *classes* \| *className* \| *onClose* \| *onOpen* \| *onOpening* \| *buttons* \| *innerRef*\> & *Partial*<WithMobileDialog\>\>

This is a responsive version of the dialog
it's able to go in fullscreen mode automatically
takes all the other props

Defined in: [client/fast-prototyping/components/dialog.tsx:137](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/components/dialog.tsx#L137)
