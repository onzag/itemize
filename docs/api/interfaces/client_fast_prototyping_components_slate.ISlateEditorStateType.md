[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ISlateEditorStateType

# Interface: ISlateEditorStateType

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ISlateEditorStateType

Contains the information about the
state of the editor as it is right
now

## Table of contents

### Properties

- [currentBlockElement](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentblockelement)
- [currentBlockElementAnchor](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentblockelementanchor)
- [currentContext](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentcontext)
- [currentElement](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentelement)
- [currentElementAnchor](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentelementanchor)
- [currentRootContext](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentrootcontext)
- [currentSelectedBlockElement](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedblockelement)
- [currentSelectedBlockElementAnchor](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedblockelementanchor)
- [currentSelectedElement](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedelement)
- [currentSelectedElementAnchor](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedelementanchor)
- [currentSelectedElementContext](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedelementcontext)
- [currentSelectedElementContextSelectContext](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedelementcontextselectcontext)
- [currentSelectedElementEachSelectContext](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedelementeachselectcontext)
- [currentSelectedSuperBlockElement](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedsuperblockelement)
- [currentSelectedSuperBlockElementAnchor](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedsuperblockelementanchor)
- [currentSelectedText](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentselectedtext)
- [currentSuperBlockElement](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentsuperblockelement)
- [currentSuperBlockElementAnchor](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentsuperblockelementanchor)
- [currentText](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currenttext)
- [currentValid](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentvalid)
- [currentValue](client_fast_prototyping_components_slate.ISlateEditorStateType.md#currentvalue)
- [isFocused](client_fast_prototyping_components_slate.ISlateEditorStateType.md#isfocused)
- [isRichText](client_fast_prototyping_components_slate.ISlateEditorStateType.md#isrichtext)
- [textAnchor](client_fast_prototyping_components_slate.ISlateEditorStateType.md#textanchor)

## Properties

### currentBlockElement

• **currentBlockElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The current element (block type)
represents the element that is currently
selected that is a block type, or its nearest
ancestor that is a block type

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:877](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L877)

___

### currentBlockElementAnchor

• **currentBlockElementAnchor**: `Path`

The current path followed for block

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:972](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L972)

___

### currentContext

• **currentContext**: [`ITemplateArgsContext`](client_fast_prototyping_components_slate.ITemplateArgsContext.md)

The current templating context, as it is
based on the root context, this is a subcontext
from that base context

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:929](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L929)

___

### currentElement

• **currentElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The current element being worked with as it
is selected right now, the current element can
be virtually anything, block, superblock, inline, etc...
it will mostly always be a block type

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:869](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L869)

___

### currentElementAnchor

• **currentElementAnchor**: `Path`

The current path followed, for element

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:967](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L967)

___

### currentRootContext

• **currentRootContext**: [`ITemplateArgsContext`](client_fast_prototyping_components_slate.ITemplateArgsContext.md)

root context

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:934](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L934)

___

### currentSelectedBlockElement

• **currentSelectedBlockElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The current selected node that is being worked with
this is normally automatically selected to be the
current element but it can also be a text node
by default if a text node represents a template node
then it will be selected instead

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:908](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L908)

___

### currentSelectedBlockElementAnchor

• **currentSelectedBlockElementAnchor**: `Path`

Selected anchor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:987](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L987)

___

### currentSelectedElement

• **currentSelectedElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The current selected node that is being worked with
this is normally automatically selected to be the
current element but it can also be a text node
by default if a text node represents a template node
then it will be selected instead

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:899](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L899)

___

### currentSelectedElementAnchor

• **currentSelectedElementAnchor**: `Path`

Selected anchor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:982](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L982)

___

### currentSelectedElementContext

• **currentSelectedElementContext**: [`ITemplateArgsContext`](client_fast_prototyping_components_slate.ITemplateArgsContext.md)

The current selected element templating context

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:939](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L939)

___

### currentSelectedElementContextSelectContext

• **currentSelectedElementContextSelectContext**: [`ITemplateArgsContext`](client_fast_prototyping_components_slate.ITemplateArgsContext.md)

The current selected element context where the context options
are

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:951](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L951)

___

### currentSelectedElementEachSelectContext

• **currentSelectedElementEachSelectContext**: [`ITemplateArgsContext`](client_fast_prototyping_components_slate.ITemplateArgsContext.md)

The current selected element context where the each options
are

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:945](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L945)

___

### currentSelectedSuperBlockElement

• **currentSelectedSuperBlockElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The current selected node that is being worked with
this is normally automatically selected to be the
current element but it can also be a text node
by default if a text node represents a template node
then it will be selected instead

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:917](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L917)

___

### currentSelectedSuperBlockElementAnchor

• **currentSelectedSuperBlockElementAnchor**: `Path`

Selected anchor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:992](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L992)

___

### currentSelectedText

• **currentSelectedText**: [`IText`](client_internal_text_serializer_types_text.IText.md)

Based on the current selected element or the current text

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:922](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L922)

___

### currentSuperBlockElement

• **currentSuperBlockElement**: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

The current super block (superblock type)
represents current superblock that wraps the current
element

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:884](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L884)

___

### currentSuperBlockElementAnchor

• **currentSuperBlockElementAnchor**: `Path`

The current path followed for super block

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:977](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L977)

___

### currentText

• **currentText**: [`IText`](client_internal_text_serializer_types_text.IText.md)

The current text being worked with, represents
a text node where the caret is currently placed

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:890](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L890)

___

### currentValid

• **currentValid**: `boolean`

Whether the current value is valid
this is passed directly from the props
and it's used for stylistic purposes

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:861](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L861)

___

### currentValue

• **currentValue**: [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md)

The current value from the document that is used
in the slate rich text editor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:957](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L957)

___

### isFocused

• **isFocused**: `boolean`

Whether it is curently focused
this is a state inherent of the
state of the editor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:839](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L839)

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

[client/fast-prototyping/components/slate/index.tsx:854](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L854)

___

### textAnchor

• **textAnchor**: `Path`

The current path followed, text path for the current text

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:962](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L962)
