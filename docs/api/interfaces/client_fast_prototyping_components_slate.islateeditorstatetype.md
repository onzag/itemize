[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateEditorStateType

# Interface: ISlateEditorStateType

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateEditorStateType

Contains the information about the
state of the editor as it is right
now

## Table of contents

### Properties

- [currentBlockElement](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentblockelement)
- [currentBlockElementAnchor](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentblockelementanchor)
- [currentContext](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentcontext)
- [currentElement](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentelement)
- [currentElementAnchor](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentelementanchor)
- [currentRootContext](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentrootcontext)
- [currentSelectedElement](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentselectedelement)
- [currentSelectedElementAnchor](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentselectedelementanchor)
- [currentSelectedElementContext](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentselectedelementcontext)
- [currentSelectedElementContextSelectContext](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentselectedelementcontextselectcontext)
- [currentSelectedElementEachSelectContext](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentselectedelementeachselectcontext)
- [currentSelectedText](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentselectedtext)
- [currentSuperBlockElement](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentsuperblockelement)
- [currentSuperBlockElementAnchor](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentsuperblockelementanchor)
- [currentText](client_fast_prototyping_components_slate.islateeditorstatetype.md#currenttext)
- [currentValid](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentvalid)
- [currentValue](client_fast_prototyping_components_slate.islateeditorstatetype.md#currentvalue)
- [isFocused](client_fast_prototyping_components_slate.islateeditorstatetype.md#isfocused)
- [isRichText](client_fast_prototyping_components_slate.islateeditorstatetype.md#isrichtext)
- [textAnchor](client_fast_prototyping_components_slate.islateeditorstatetype.md#textanchor)

## Properties

### currentBlockElement

• **currentBlockElement**: [*RichElement*](../modules/client_internal_text_serializer.md#richelement)

The current element (block type)
represents the element that is currently
selected that is a block type, or its nearest
ancestor that is a block type

Defined in: [client/fast-prototyping/components/slate/index.tsx:924](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L924)

___

### currentBlockElementAnchor

• **currentBlockElementAnchor**: Path

The current path followed for block

Defined in: [client/fast-prototyping/components/slate/index.tsx:1001](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L1001)

___

### currentContext

• **currentContext**: [*ITemplateArgsContext*](client_fast_prototyping_components_slate.itemplateargscontext.md)

The current templating context, as it is
based on the root context, this is a subcontext
from that base context

Defined in: [client/fast-prototyping/components/slate/index.tsx:958](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L958)

___

### currentElement

• **currentElement**: [*RichElement*](../modules/client_internal_text_serializer.md#richelement)

The current element being worked with as it
is selected right now, the current element can
be virtually anything, block, superblock, inline, etc...
it will mostly always be a block type

Defined in: [client/fast-prototyping/components/slate/index.tsx:916](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L916)

___

### currentElementAnchor

• **currentElementAnchor**: Path

The current path followed, for element

Defined in: [client/fast-prototyping/components/slate/index.tsx:996](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L996)

___

### currentRootContext

• **currentRootContext**: [*ITemplateArgsContext*](client_fast_prototyping_components_slate.itemplateargscontext.md)

root context

Defined in: [client/fast-prototyping/components/slate/index.tsx:963](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L963)

___

### currentSelectedElement

• **currentSelectedElement**: [*RichElement*](../modules/client_internal_text_serializer.md#richelement)

The current selected node that is being worked with
this is normally automatically selected to be the
current element but it can also be a text node
by default if a text node represents a template node
then it will be selected instead

Defined in: [client/fast-prototyping/components/slate/index.tsx:946](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L946)

___

### currentSelectedElementAnchor

• **currentSelectedElementAnchor**: Path

Selected anchor

Defined in: [client/fast-prototyping/components/slate/index.tsx:1011](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L1011)

___

### currentSelectedElementContext

• **currentSelectedElementContext**: [*ITemplateArgsContext*](client_fast_prototyping_components_slate.itemplateargscontext.md)

The current selected element templating context

Defined in: [client/fast-prototyping/components/slate/index.tsx:968](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L968)

___

### currentSelectedElementContextSelectContext

• **currentSelectedElementContextSelectContext**: [*ITemplateArgsContext*](client_fast_prototyping_components_slate.itemplateargscontext.md)

The current selected element context where the context options
are

Defined in: [client/fast-prototyping/components/slate/index.tsx:980](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L980)

___

### currentSelectedElementEachSelectContext

• **currentSelectedElementEachSelectContext**: [*ITemplateArgsContext*](client_fast_prototyping_components_slate.itemplateargscontext.md)

The current selected element context where the each options
are

Defined in: [client/fast-prototyping/components/slate/index.tsx:974](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L974)

___

### currentSelectedText

• **currentSelectedText**: [*IText*](client_internal_text_serializer_types_text.itext.md)

Based on the current selected element or the current text

Defined in: [client/fast-prototyping/components/slate/index.tsx:951](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L951)

___

### currentSuperBlockElement

• **currentSuperBlockElement**: [*RichElement*](../modules/client_internal_text_serializer.md#richelement)

The current super block (superblock type)
represents current superblock that wraps the current
element

Defined in: [client/fast-prototyping/components/slate/index.tsx:931](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L931)

___

### currentSuperBlockElementAnchor

• **currentSuperBlockElementAnchor**: Path

The current path followed for super block

Defined in: [client/fast-prototyping/components/slate/index.tsx:1006](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L1006)

___

### currentText

• **currentText**: [*IText*](client_internal_text_serializer_types_text.itext.md)

The current text being worked with, represents
a text node where the caret is currently placed

Defined in: [client/fast-prototyping/components/slate/index.tsx:937](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L937)

___

### currentValid

• **currentValid**: *boolean*

Whether the current value is valid
this is passed directly from the props
and it's used for stylistic purposes

Defined in: [client/fast-prototyping/components/slate/index.tsx:908](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L908)

___

### currentValue

• **currentValue**: Node[]

The current value from the document that is used
in the slate rich text editor

Defined in: [client/fast-prototyping/components/slate/index.tsx:986](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L986)

___

### isFocused

• **isFocused**: *boolean*

Whether it is curently focused
this is a state inherent of the
state of the editor

Defined in: [client/fast-prototyping/components/slate/index.tsx:886](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L886)

___

### isRichText

• **isRichText**: *boolean*

Whether it is rich text
the slate editor is able to contain
non-rich text, when it's as a plain
text form

you should use this to change/remove
the toolbars and wrappers and use
only paragraphs

this is passed directly from
the props of the editor

Defined in: [client/fast-prototyping/components/slate/index.tsx:901](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L901)

___

### textAnchor

• **textAnchor**: Path

The current path followed, text path for the current text

Defined in: [client/fast-prototyping/components/slate/index.tsx:991](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L991)
