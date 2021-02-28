[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / IHelperFunctions

# Interface: IHelperFunctions

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).IHelperFunctions

Represents a bunch of helpers that will help out building
things like toolbars or anything else (aka. the wrapper)
around the editor

## Table of contents

### Properties

- [HistoryEditor](client_fast_prototyping_components_slate.ihelperfunctions.md#historyeditor)
- [Range](client_fast_prototyping_components_slate.ihelperfunctions.md#range)
- [ReactEditor](client_fast_prototyping_components_slate.ihelperfunctions.md#reacteditor)
- [Transforms](client_fast_prototyping_components_slate.ihelperfunctions.md#transforms)
- [blockBlur](client_fast_prototyping_components_slate.ihelperfunctions.md#blockblur)
- [deleteSelectedNode](client_fast_prototyping_components_slate.ihelperfunctions.md#deleteselectednode)
- [editor](client_fast_prototyping_components_slate.ihelperfunctions.md#editor)
- [focus](client_fast_prototyping_components_slate.ihelperfunctions.md#focus)
- [focusAt](client_fast_prototyping_components_slate.ihelperfunctions.md#focusat)
- [formatToggleBold](client_fast_prototyping_components_slate.ihelperfunctions.md#formattogglebold)
- [formatToggleItalic](client_fast_prototyping_components_slate.ihelperfunctions.md#formattoggleitalic)
- [formatToggleUnderline](client_fast_prototyping_components_slate.ihelperfunctions.md#formattoggleunderline)
- [hardBlur](client_fast_prototyping_components_slate.ihelperfunctions.md#hardblur)
- [insertContainer](client_fast_prototyping_components_slate.ihelperfunctions.md#insertcontainer)
- [insertCustom](client_fast_prototyping_components_slate.ihelperfunctions.md#insertcustom)
- [insertElement](client_fast_prototyping_components_slate.ihelperfunctions.md#insertelement)
- [insertFile](client_fast_prototyping_components_slate.ihelperfunctions.md#insertfile)
- [insertImage](client_fast_prototyping_components_slate.ihelperfunctions.md#insertimage)
- [insertTemplateHTML](client_fast_prototyping_components_slate.ihelperfunctions.md#inserttemplatehtml)
- [insertTemplateText](client_fast_prototyping_components_slate.ihelperfunctions.md#inserttemplatetext)
- [insertUIHandledContainer](client_fast_prototyping_components_slate.ihelperfunctions.md#insertuihandledcontainer)
- [insertVideo](client_fast_prototyping_components_slate.ihelperfunctions.md#insertvideo)
- [movePaths](client_fast_prototyping_components_slate.ihelperfunctions.md#movepaths)
- [releaseBlur](client_fast_prototyping_components_slate.ihelperfunctions.md#releaseblur)
- [selectPath](client_fast_prototyping_components_slate.ihelperfunctions.md#selectpath)
- [set](client_fast_prototyping_components_slate.ihelperfunctions.md#set)
- [setAction](client_fast_prototyping_components_slate.ihelperfunctions.md#setaction)
- [setActiveStyle](client_fast_prototyping_components_slate.ihelperfunctions.md#setactivestyle)
- [setContext](client_fast_prototyping_components_slate.ihelperfunctions.md#setcontext)
- [setForEach](client_fast_prototyping_components_slate.ihelperfunctions.md#setforeach)
- [setHoverStyle](client_fast_prototyping_components_slate.ihelperfunctions.md#sethoverstyle)
- [setIfCondition](client_fast_prototyping_components_slate.ihelperfunctions.md#setifcondition)
- [setRichClasses](client_fast_prototyping_components_slate.ihelperfunctions.md#setrichclasses)
- [setStyle](client_fast_prototyping_components_slate.ihelperfunctions.md#setstyle)
- [setUIHandler](client_fast_prototyping_components_slate.ihelperfunctions.md#setuihandler)
- [setUIHandlerArg](client_fast_prototyping_components_slate.ihelperfunctions.md#setuihandlerarg)
- [softBlur](client_fast_prototyping_components_slate.ihelperfunctions.md#softblur)
- [toggleLink](client_fast_prototyping_components_slate.ihelperfunctions.md#togglelink)
- [toggleList](client_fast_prototyping_components_slate.ihelperfunctions.md#togglelist)
- [toggleQuote](client_fast_prototyping_components_slate.ihelperfunctions.md#togglequote)
- [toggleTitle](client_fast_prototyping_components_slate.ihelperfunctions.md#toggletitle)

## Properties

### HistoryEditor

• **HistoryEditor**: *object*

This is the history editor class itself
provided by slate

#### Type declaration:

Name | Type |
:------ | :------ |
`isHistoryEditor` | (`value`: *any*) => value is HistoryEditor |
`isMerging` | (`editor`: HistoryEditor) => *boolean* |
`isSaving` | (`editor`: HistoryEditor) => *boolean* |
`redo` | (`editor`: HistoryEditor) => *void* |
`undo` | (`editor`: HistoryEditor) => *void* |
`withoutMerging` | (`editor`: HistoryEditor, `fn`: () => *void*) => *void* |
`withoutSaving` | (`editor`: HistoryEditor, `fn`: () => *void*) => *void* |

Defined in: [client/fast-prototyping/components/slate/index.tsx:620](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L620)

___

### Range

• **Range**: *object*

This is the range class itself
provided by slate

#### Type declaration:

Name | Type |
:------ | :------ |
`edges` | (`range`: Range, `options?`: { `reverse?`: *boolean*  }) => [Point, Point] |
`end` | (`range`: Range) => Point |
`equals` | (`range`: Range, `another`: Range) => *boolean* |
`includes` | (`range`: Range, `target`: Path \| Range \| Point) => *boolean* |
`intersection` | (`range`: Range, `another`: Range) => Range |
`isBackward` | (`range`: Range) => *boolean* |
`isCollapsed` | (`range`: Range) => *boolean* |
`isExpanded` | (`range`: Range) => *boolean* |
`isForward` | (`range`: Range) => *boolean* |
`isRange` | (`value`: *any*) => value is Range |
`points` | (`range`: Range) => *Generator*<PointEntry, void, undefined\> |
`start` | (`range`: Range) => Point |
`transform` | (`range`: Range, `op`: Operation, `options?`: { `affinity?`: *forward* \| *backward* \| *outward* \| *inward*  }) => Range |

Defined in: [client/fast-prototyping/components/slate/index.tsx:630](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L630)

___

### ReactEditor

• **ReactEditor**: *object*

This is the react editor class itself
provided by slate

#### Type declaration:

Name | Type |
:------ | :------ |
`blur` | (`editor`: ReactEditor) => *void* |
`deselect` | (`editor`: ReactEditor) => *void* |
`findEventRange` | (`editor`: ReactEditor, `event`: *any*) => Range |
`findKey` | (`editor`: ReactEditor, `node`: Node) => *Key* |
`findPath` | (`editor`: ReactEditor, `node`: Node) => Path |
`focus` | (`editor`: ReactEditor) => *void* |
`hasDOMNode` | (`editor`: ReactEditor, `target`: Node, `options?`: { `editable?`: *boolean*  }) => *boolean* |
`insertData` | (`editor`: ReactEditor, `data`: DataTransfer) => *void* |
`isFocused` | (`editor`: ReactEditor) => *boolean* |
`isReadOnly` | (`editor`: ReactEditor) => *boolean* |
`setFragmentData` | (`editor`: ReactEditor, `data`: DataTransfer) => *void* |
`toDOMNode` | (`editor`: ReactEditor, `node`: Node) => HTMLElement |
`toDOMPoint` | (`editor`: ReactEditor, `point`: Point) => DOMPoint |
`toDOMRange` | (`editor`: ReactEditor, `range`: Range) => Range |
`toSlateNode` | (`editor`: ReactEditor, `domNode`: Node) => Node |
`toSlatePoint` | (`editor`: ReactEditor, `domPoint`: DOMPoint) => Point |
`toSlateRange` | (`editor`: ReactEditor, `domRange`: Range \| StaticRange \| Selection) => Range |

Defined in: [client/fast-prototyping/components/slate/index.tsx:615](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L615)

___

### Transforms

• **Transforms**: *object*

This is the transforms class itself
provided by slate

#### Type declaration:

Name | Type |
:------ | :------ |
`collapse` | (`editor`: Editor, `options?`: { `edge?`: *end* \| *start* \| *anchor* \| *focus*  }) => *void* |
`delete` | (`editor`: Editor, `options?`: { `at?`: Path \| Range \| Point ; `distance?`: *number* ; `hanging?`: *boolean* ; `reverse?`: *boolean* ; `unit?`: *block* \| *line* \| *character* \| *word* ; `voids?`: *boolean*  }) => *void* |
`deselect` | (`editor`: Editor) => *void* |
`insertFragment` | (`editor`: Editor, `fragment`: Node[], `options?`: { `at?`: Path \| Range \| Point ; `hanging?`: *boolean* ; `voids?`: *boolean*  }) => *void* |
`insertNodes` | (`editor`: Editor, `nodes`: Editor \| Element \| Text \| Node[], `options?`: { `at?`: Path \| Range \| Point ; `hanging?`: *boolean* ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *highest* \| *lowest* ; `select?`: *boolean* ; `voids?`: *boolean*  }) => *void* |
`insertText` | (`editor`: Editor, `text`: *string*, `options?`: { `at?`: Path \| Range \| Point ; `voids?`: *boolean*  }) => *void* |
`liftNodes` | (`editor`: Editor, `options?`: { `at?`: Path \| Range \| Point ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *all* \| *highest* \| *lowest* ; `voids?`: *boolean*  }) => *void* |
`mergeNodes` | (`editor`: Editor, `options?`: { `at?`: Path \| Range \| Point ; `hanging?`: *boolean* ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *highest* \| *lowest* ; `voids?`: *boolean*  }) => *void* |
`move` | (`editor`: Editor, `options?`: { `distance?`: *number* ; `edge?`: *end* \| *start* \| *anchor* \| *focus* ; `reverse?`: *boolean* ; `unit?`: *offset* \| *line* \| *character* \| *word*  }) => *void* |
`moveNodes` | (`editor`: Editor, `options`: { `at?`: Path \| Range \| Point ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *all* \| *highest* \| *lowest* ; `to`: Path ; `voids?`: *boolean*  }) => *void* |
`removeNodes` | (`editor`: Editor, `options?`: { `at?`: Path \| Range \| Point ; `hanging?`: *boolean* ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *highest* \| *lowest* ; `voids?`: *boolean*  }) => *void* |
`select` | (`editor`: Editor, `target`: Path \| Range \| Point) => *void* |
`setNodes` | (`editor`: Editor, `props`: *Partial*<Editor\> \| *Partial*<Element\> \| *Partial*<Text\>, `options?`: { `at?`: Path \| Range \| Point ; `hanging?`: *boolean* ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *all* \| *highest* \| *lowest* ; `split?`: *boolean* ; `voids?`: *boolean*  }) => *void* |
`setPoint` | (`editor`: Editor, `props`: *Partial*<Point\>, `options`: { `edge?`: *end* \| *start* \| *anchor* \| *focus*  }) => *void* |
`setSelection` | (`editor`: Editor, `props`: *Partial*<Range\>) => *void* |
`splitNodes` | (`editor`: Editor, `options?`: { `always?`: *boolean* ; `at?`: Path \| Range \| Point ; `height?`: *number* ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *highest* \| *lowest* ; `voids?`: *boolean*  }) => *void* |
`transform` | (`editor`: Editor, `op`: Operation) => *void* |
`unsetNodes` | (`editor`: Editor, `props`: *string* \| *string*[], `options?`: { `at?`: Path \| Range \| Point ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *all* \| *highest* \| *lowest* ; `split?`: *boolean* ; `voids?`: *boolean*  }) => *void* |
`unwrapNodes` | (`editor`: Editor, `options`: { `at?`: Path \| Range \| Point ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *all* \| *highest* \| *lowest* ; `split?`: *boolean* ; `voids?`: *boolean*  }) => *void* |
`wrapNodes` | (`editor`: Editor, `element`: Element, `options?`: { `at?`: Path \| Range \| Point ; `match?`: (`node`: Node) => *boolean* ; `mode?`: *all* \| *highest* \| *lowest* ; `split?`: *boolean* ; `voids?`: *boolean*  }) => *void* |

Defined in: [client/fast-prototyping/components/slate/index.tsx:625](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L625)

___

### blockBlur

• **blockBlur**: () => *void*

cancels the field from blurring
you should use this on the mousedown on buttons that
are outside the selected area
not using this function should not have any effect

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:857](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L857)

Defined in: [client/fast-prototyping/components/slate/index.tsx:857](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L857)

___

### deleteSelectedNode

• **deleteSelectedNode**: () => *void*

Deletes the node at the selected path

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:649](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L649)

Defined in: [client/fast-prototyping/components/slate/index.tsx:649](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L649)

___

### editor

• **editor**: ItemizeEditor

This is the editor instance of the given
editor

Defined in: [client/fast-prototyping/components/slate/index.tsx:610](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L610)

___

### focus

• **focus**: () => *void*

focuses the text editor

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:654](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L654)

Defined in: [client/fast-prototyping/components/slate/index.tsx:654](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L654)

___

### focusAt

• **focusAt**: (`at`: Range) => *void*

Focuses at the desired location

**`param`** the range to insert at

#### Type declaration:

▸ (`at`: Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`at` | Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:659](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L659)

Defined in: [client/fast-prototyping/components/slate/index.tsx:659](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L659)

___

### formatToggleBold

• **formatToggleBold**: () => *void*

Formats the current text as bold
this is always caret based and does not allow for custom
ranges
It will refocus once done

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:767](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L767)

Defined in: [client/fast-prototyping/components/slate/index.tsx:767](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L767)

___

### formatToggleItalic

• **formatToggleItalic**: () => *void*

formats the current text as italic
this is always caret based and does not allow for custom
ranges
It will refocus once done

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:774](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L774)

Defined in: [client/fast-prototyping/components/slate/index.tsx:774](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L774)

___

### formatToggleUnderline

• **formatToggleUnderline**: () => *void*

formats to underline
this is always caret based and does not allow for custom
ranges
It will refocus once done

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:781](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L781)

Defined in: [client/fast-prototyping/components/slate/index.tsx:781](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L781)

___

### hardBlur

• **hardBlur**: () => *void*

Performs a hard blur, and even the selected paths are lost

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:868](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L868)

Defined in: [client/fast-prototyping/components/slate/index.tsx:868](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L868)

___

### insertContainer

• **insertContainer**: (`type?`: *string*, `at?`: Path \| Range) => *void*

Will insert a container at the given location

**`param`** optional, the container type, otherwise will
insert a standard container
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

**`param`** the container type

**`param`** an optional range to insert at

#### Type declaration:

▸ (`type?`: *string*, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type?` | *string* |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:691](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L691)

Defined in: [client/fast-prototyping/components/slate/index.tsx:691](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L691)

___

### insertCustom

• **insertCustom**: (`type`: *string*, `at?`: Path \| Range) => *void*

Inserts a custom element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

**`param`** the custom type

**`param`** an optional range to insert at

#### Type declaration:

▸ (`type`: *string*, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | *string* |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:699](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L699)

Defined in: [client/fast-prototyping/components/slate/index.tsx:699](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L699)

___

### insertElement

• **insertElement**: (`element`: [*RichElement*](../modules/client_internal_text_serializer.md#richelement), `at?`: Path \| Range) => *void*

Inserts an element at the given position

**`param`** the element to insert

**`param`** optional range to insert at

#### Type declaration:

▸ (`element`: [*RichElement*](../modules/client_internal_text_serializer.md#richelement), `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`element` | [*RichElement*](../modules/client_internal_text_serializer.md#richelement) |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:732](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L732)

Defined in: [client/fast-prototyping/components/slate/index.tsx:732](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L732)

___

### insertFile

• **insertFile**: (`file`: File, `at?`: Path \| Range) => *void*

Will insert a file based on the information given

**`param`** the file to insert

**`param`** an optional range to insert at

#### Type declaration:

▸ (`file`: File, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`file` | File |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:681](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L681)

Defined in: [client/fast-prototyping/components/slate/index.tsx:681](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L681)

___

### insertImage

• **insertImage**: (`file`: File, `standalone`: *boolean*, `at?`: Path \| Range) => *void*

Will insert an image based on a given file that has
been taken as an input

**`param`** the file

**`param`** an optional range to insert at

**`param`** whether to make it a standalone image

#### Type declaration:

▸ (`file`: File, `standalone`: *boolean*, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`file` | File |
`standalone` | *boolean* |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:668](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L668)

Defined in: [client/fast-prototyping/components/slate/index.tsx:668](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L668)

___

### insertTemplateHTML

• **insertTemplateHTML**: (`label`: *string*, `value`: *string*, `at?`: Path \| Range) => *void*

Inserts a template html fragment
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

**`param`** the label to use for the template html

**`param`** the actual value for the template html to be used off the context

**`param`** an optional range to insert at

#### Type declaration:

▸ (`label`: *string*, `value`: *string*, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`label` | *string* |
`value` | *string* |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:717](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L717)

Defined in: [client/fast-prototyping/components/slate/index.tsx:717](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L717)

___

### insertTemplateText

• **insertTemplateText**: (`label`: *string*, `value`: *string*, `at?`: Path \| Range) => *void*

Inserts a template text
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

**`param`** the label to use for the template text

**`param`** the actual value for the template text to be used off the context

**`param`** an optional range to insert at

#### Type declaration:

▸ (`label`: *string*, `value`: *string*, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`label` | *string* |
`value` | *string* |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:708](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L708)

Defined in: [client/fast-prototyping/components/slate/index.tsx:708](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L708)

___

### insertUIHandledContainer

• **insertUIHandledContainer**: (`type`: *string*, `value`: *string*, `args`: { [key: string]: *string*;  }, `at?`: Path \| Range) => *void*

Inserts an UI handled container

**`param`** the type of the container

**`param`** the ui handler identifier in the context

**`param`** the args for the ui handler

**`param`** an optional range to insert at

#### Type declaration:

▸ (`type`: *string*, `value`: *string*, `args`: { [key: string]: *string*;  }, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | *string* |
`value` | *string* |
`args` | *object* |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:725](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L725)

Defined in: [client/fast-prototyping/components/slate/index.tsx:725](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L725)

___

### insertVideo

• **insertVideo**: (`url`: *string*, `at?`: Path \| Range) => *boolean*

Will insert a video given the information

**`param`** the url of the video, only youtube and vimeo supported as origin

**`param`** an optional range to insert at

**`returns`** a boolean true if the video was properly inserted, false if the video url was invalid

#### Type declaration:

▸ (`url`: *string*, `at?`: Path \| Range): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |
`at?` | Path \| Range |

**Returns:** *boolean*

Defined in: [client/fast-prototyping/components/slate/index.tsx:675](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L675)

Defined in: [client/fast-prototyping/components/slate/index.tsx:675](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L675)

___

### movePaths

• **movePaths**: (`from`: Path, `to`: Path) => *void*

Switches a path from one place to another

#### Type declaration:

▸ (`from`: Path, `to`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`from` | Path |
`to` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:644](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L644)

Defined in: [client/fast-prototyping/components/slate/index.tsx:644](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L644)

___

### releaseBlur

• **releaseBlur**: () => *void*

releases the blur
you should use this on the onmouseup on buttons that
are outside the selected area
not using this function should not have any effect

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:864](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L864)

Defined in: [client/fast-prototyping/components/slate/index.tsx:864](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L864)

___

### selectPath

• **selectPath**: (`path`: Path) => *void*

performs a pseudo selection at a given path
this selection is silent and does not affect other than the current
selected path based on the information, it does not cause a caret
change or anything of the sorts

**`param`** the path to select

#### Type declaration:

▸ (`path`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`path` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:639](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L639)

Defined in: [client/fast-prototyping/components/slate/index.tsx:639](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L639)

___

### set

• **set**: (`args`: *any*, `anchor`: Path) => *void*

does an arbitrary update of arbitrary arguments off the current
element value, this function does not refocus and it's silent and meant
for indirect usage

**`param`** the arbitrary arguments (partial value)

**`param`** the anchor where the update should take place (should point at an element)

#### Type declaration:

▸ (`args`: *any*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`args` | *any* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:790](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L790)

Defined in: [client/fast-prototyping/components/slate/index.tsx:790](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L790)

___

### setAction

• **setAction**: (`key`: *string*, `value`: *string*, `anchor`: Path) => *void*

Sets an action key
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`key`: *string*, `value`: *string*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`value` | *string* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:849](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L849)

Defined in: [client/fast-prototyping/components/slate/index.tsx:849](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L849)

___

### setActiveStyle

• **setActiveStyle**: (`style`: *string*, `anchor`: Path) => *void*

Sets the active style for the element
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`style`: *string*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`style` | *string* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:809](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L809)

Defined in: [client/fast-prototyping/components/slate/index.tsx:809](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L809)

___

### setContext

• **setContext**: (`key`: *string*, `anchor`: Path) => *void*

Sets the context key
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`key`: *string*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:815](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L815)

Defined in: [client/fast-prototyping/components/slate/index.tsx:815](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L815)

___

### setForEach

• **setForEach**: (`key`: *string*, `anchor`: Path) => *void*

Sets the for-each loop key
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`key`: *string*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:837](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L837)

Defined in: [client/fast-prototyping/components/slate/index.tsx:837](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L837)

___

### setHoverStyle

• **setHoverStyle**: (`style`: *string*, `anchor`: Path) => *void*

Sets the template hover style for the element
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`style`: *string*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`style` | *string* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:803](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L803)

Defined in: [client/fast-prototyping/components/slate/index.tsx:803](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L803)

___

### setIfCondition

• **setIfCondition**: (`key`: *string*, `anchor`: Path) => *void*

Sets the if render condition
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`key`: *string*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:821](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L821)

Defined in: [client/fast-prototyping/components/slate/index.tsx:821](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L821)

___

### setRichClasses

• **setRichClasses**: (`list`: *string*[], `anchor`: Path) => *void*

Sets all the rich classes
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`list`: *string*[], `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`list` | *string*[] |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:843](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L843)

Defined in: [client/fast-prototyping/components/slate/index.tsx:843](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L843)

___

### setStyle

• **setStyle**: (`style`: *string*, `anchor`: Path) => *void*

Sets the current style for the element
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`style`: *string*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`style` | *string* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:797](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L797)

Defined in: [client/fast-prototyping/components/slate/index.tsx:797](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L797)

___

### setUIHandler

• **setUIHandler**: (`key`: *string*, `args`: { [key: string]: *string*;  }, `anchor`: Path) => *void*

Sets an UI handler in the given anchor with the given args
this function does not refocus and it's silent and meant
for indirect usage

#### Type declaration:

▸ (`key`: *string*, `args`: { [key: string]: *string*;  }, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`args` | *object* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:827](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L827)

Defined in: [client/fast-prototyping/components/slate/index.tsx:827](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L827)

___

### setUIHandlerArg

• **setUIHandlerArg**: (`key`: *string*, `value`: *string*, `anchor`: Path) => *void*

Allows to set UI handler args in the ui handler

#### Type declaration:

▸ (`key`: *string*, `value`: *string*, `anchor`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`value` | *string* |
`anchor` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:831](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L831)

Defined in: [client/fast-prototyping/components/slate/index.tsx:831](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L831)

___

### softBlur

• **softBlur**: () => *void*

Performs a soft blur event

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:872](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L872)

Defined in: [client/fast-prototyping/components/slate/index.tsx:872](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L872)

___

### toggleLink

• **toggleLink**: (`url`: *string*, `templateValue`: *string*, `at?`: Path \| Range) => *boolean*

Makes a link out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

**`returns`** a boolean specifying whether the toggling was succesful or it failed
for some reason, eg. invalid link, links are not supported

#### Type declaration:

▸ (`url`: *string*, `templateValue`: *string*, `at?`: Path \| Range): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |
`templateValue` | *string* |
`at?` | Path \| Range |

**Returns:** *boolean*

Defined in: [client/fast-prototyping/components/slate/index.tsx:759](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L759)

Defined in: [client/fast-prototyping/components/slate/index.tsx:759](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L759)

___

### toggleList

• **toggleList**: (`type`: *bulleted* \| *numbered*, `at?`: Path \| Range) => *void*

Makes a list out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Type declaration:

▸ (`type`: *bulleted* \| *numbered*, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | *bulleted* \| *numbered* |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:751](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L751)

Defined in: [client/fast-prototyping/components/slate/index.tsx:751](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L751)

___

### toggleQuote

• **toggleQuote**: (`at?`: Path \| Range) => *void*

Makes a quote out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Type declaration:

▸ (`at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:739](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L739)

Defined in: [client/fast-prototyping/components/slate/index.tsx:739](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L739)

___

### toggleTitle

• **toggleTitle**: (`type`: *h1* \| *h2* \| *h3* \| *h4* \| *h5* \| *h6*, `at?`: Path \| Range) => *void*

Makes a title out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Type declaration:

▸ (`type`: *h1* \| *h2* \| *h3* \| *h4* \| *h5* \| *h6*, `at?`: Path \| Range): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | *h1* \| *h2* \| *h3* \| *h4* \| *h5* \| *h6* |
`at?` | Path \| Range |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/index.tsx:745](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L745)

Defined in: [client/fast-prototyping/components/slate/index.tsx:745](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/index.tsx#L745)
