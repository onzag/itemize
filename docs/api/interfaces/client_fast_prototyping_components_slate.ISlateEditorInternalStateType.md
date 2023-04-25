[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateEditorInternalStateType

# Interface: ISlateEditorInternalStateType

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateEditorInternalStateType

Contains the information about the
state of the editor as it is right
now

## Table of contents

### Properties

- [allowsText](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#allowstext)
- [blockIsVoid](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#blockisvoid)
- [blockUIHandler](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#blockuihandler)
- [currentBlockElement](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentblockelement)
- [currentBlockElementAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentblockelementanchor)
- [currentInlineElement](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentinlineelement)
- [currentInlineElementAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentinlineelementanchor)
- [currentRootContext](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentrootcontext)
- [currentSelectedBlockContext](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedblockcontext)
- [currentSelectedBlockElement](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedblockelement)
- [currentSelectedBlockElementAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedblockelementanchor)
- [currentSelectedElement](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedelement)
- [currentSelectedElementAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedelementanchor)
- [currentSelectedElementContext](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedelementcontext)
- [currentSelectedInlineContext](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedinlinecontext)
- [currentSelectedInlineElement](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedinlineelement)
- [currentSelectedInlineElementAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedinlineelementanchor)
- [currentSelectedSuperBlockElementAnchors](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedsuperblockelementanchors)
- [currentSelectedSuperBlockElements](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedsuperblockelements)
- [currentSelectedText](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedtext)
- [currentSelectedTextAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedtextanchor)
- [currentSelectedTopmostSuperBlockContext](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentselectedtopmostsuperblockcontext)
- [currentSuperBlockElementAnchors](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentsuperblockelementanchors)
- [currentSuperBlockElements](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentsuperblockelements)
- [currentText](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currenttext)
- [currentTextAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currenttextanchor)
- [currentValid](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentvalid)
- [currentValue](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#currentvalue)
- [focused](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#focused)
- [inlineIsVoid](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#inlineisvoid)
- [inlineUIHandler](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#inlineuihandler)
- [isRichText](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#isrichtext)
- [previousSelectedElementAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#previousselectedelementanchor)
- [previousTextAnchor](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#previoustextanchor)
- [superBlockUIHandler](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#superblockuihandler)
- [topmostSuperblockIsVoid](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#topmostsuperblockisvoid)

### Methods

- [allowsInsertElement](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md#allowsinsertelement)

## Properties

### allowsText

• **allowsText**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:716](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L716)

___

### blockIsVoid

• **blockIsVoid**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:718](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L718)

___

### blockUIHandler

• **blockUIHandler**: [`ITemplateArgUIHandlerDefinition`](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:721](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L721)

___

### currentBlockElement

• **currentBlockElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:668](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L668)

___

### currentBlockElementAnchor

• **currentBlockElementAnchor**: `Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:676](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L676)

___

### currentInlineElement

• **currentInlineElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:667](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L667)

___

### currentInlineElementAnchor

• **currentInlineElementAnchor**: `Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:675](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L675)

___

### currentRootContext

• **currentRootContext**: [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:699](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L699)

___

### currentSelectedBlockContext

• **currentSelectedBlockContext**: [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:701](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L701)

___

### currentSelectedBlockElement

• **currentSelectedBlockElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:686](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L686)

___

### currentSelectedBlockElementAnchor

• **currentSelectedBlockElementAnchor**: `Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:692](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L692)

___

### currentSelectedElement

• **currentSelectedElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:688](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L688)

___

### currentSelectedElementAnchor

• **currentSelectedElementAnchor**: `Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:695](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L695)

___

### currentSelectedElementContext

• **currentSelectedElementContext**: [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:703](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L703)

___

### currentSelectedInlineContext

• **currentSelectedInlineContext**: [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:702](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L702)

___

### currentSelectedInlineElement

• **currentSelectedInlineElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:685](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L685)

___

### currentSelectedInlineElementAnchor

• **currentSelectedInlineElementAnchor**: `Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:691](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L691)

___

### currentSelectedSuperBlockElementAnchors

• **currentSelectedSuperBlockElementAnchors**: `Path`[]

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:693](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L693)

___

### currentSelectedSuperBlockElements

• **currentSelectedSuperBlockElements**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)[]

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:687](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L687)

___

### currentSelectedText

• **currentSelectedText**: [`IText`](client_internal_text_serializer_types_text.IText.md)

The current selected node that is being worked with
this is normally automatically selected to be the
current element

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:684](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L684)

___

### currentSelectedTextAnchor

• **currentSelectedTextAnchor**: `Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:690](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L690)

___

### currentSelectedTopmostSuperBlockContext

• **currentSelectedTopmostSuperBlockContext**: [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:700](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L700)

___

### currentSuperBlockElementAnchors

• **currentSuperBlockElementAnchors**: `Path`[]

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:677](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L677)

___

### currentSuperBlockElements

• **currentSuperBlockElements**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)[]

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:669](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L669)

___

### currentText

• **currentText**: [`IText`](client_internal_text_serializer_types_text.IText.md)

The current text being worked with, represents
a text node where the caret is currently placed

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:666](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L666)

___

### currentTextAnchor

• **currentTextAnchor**: `Path`

The current path followed, text path for the current text

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:674](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L674)

___

### currentValid

• **currentValid**: `boolean`

Whether the current value is valid
this is passed directly from the props
and it's used for stylistic purposes

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:660](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L660)

___

### currentValue

• **currentValue**: [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md)

The current value from the document that is used
in the slate rich text editor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:709](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L709)

___

### focused

• **focused**: `boolean`

Whether it is curently focused
this is a state inherent of the
state of the editor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:638](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L638)

___

### inlineIsVoid

• **inlineIsVoid**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:717](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L717)

___

### inlineUIHandler

• **inlineUIHandler**: [`ITemplateArgUIHandlerDefinition`](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:722](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L722)

___

### isRichText

• **isRichText**: `boolean`

Whether it is rich text
the slate editor is able to contain
non-rich text, when it's as a plain
text form

you should use this to change/remove
the toolbars and wrappers and use
only paragraphs

this is passed directly from
the props of the editor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:653](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L653)

___

### previousSelectedElementAnchor

• **previousSelectedElementAnchor**: `Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:696](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L696)

___

### previousTextAnchor

• **previousTextAnchor**: `Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:697](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L697)

___

### superBlockUIHandler

• **superBlockUIHandler**: [`ITemplateArgUIHandlerDefinition`](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:720](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L720)

___

### topmostSuperblockIsVoid

• **topmostSuperblockIsVoid**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:719](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L719)

## Methods

### allowsInsertElement

▸ **allowsInsertElement**(`element`, `opts?`): `boolean`

Contextual, very specific to the current context
where the cursor is located

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `opts?` | `Object` |
| `opts.collapsed?` | `boolean` |
| `opts.extended?` | `boolean` |
| `opts.selected?` | `boolean` |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:715](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L715)
