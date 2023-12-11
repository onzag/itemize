[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / IHelperFunctions

# Interface: IHelperFunctions

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).IHelperFunctions

Represents a bunch of helpers that will help out building
things like toolbars or anything else (aka. the wrapper)
around the editor

## Table of contents

### Properties

- [HistoryEditor](client_fast_prototyping_components_slate.IHelperFunctions.md#historyeditor)
- [Node](client_fast_prototyping_components_slate.IHelperFunctions.md#node)
- [Path](client_fast_prototyping_components_slate.IHelperFunctions.md#path)
- [Range](client_fast_prototyping_components_slate.IHelperFunctions.md#range)
- [ReactEditor](client_fast_prototyping_components_slate.IHelperFunctions.md#reacteditor)
- [Transforms](client_fast_prototyping_components_slate.IHelperFunctions.md#transforms)
- [canToggleTable](client_fast_prototyping_components_slate.IHelperFunctions.md#cantoggletable)
- [deletePath](client_fast_prototyping_components_slate.IHelperFunctions.md#deletepath)
- [deleteSelectedNode](client_fast_prototyping_components_slate.IHelperFunctions.md#deleteselectednode)
- [deleteTableColumn](client_fast_prototyping_components_slate.IHelperFunctions.md#deletetablecolumn)
- [deleteTableRow](client_fast_prototyping_components_slate.IHelperFunctions.md#deletetablerow)
- [editor](client_fast_prototyping_components_slate.IHelperFunctions.md#editor)
- [focus](client_fast_prototyping_components_slate.IHelperFunctions.md#focus)
- [focusAt](client_fast_prototyping_components_slate.IHelperFunctions.md#focusat)
- [formatToggle](client_fast_prototyping_components_slate.IHelperFunctions.md#formattoggle)
- [getContextFor](client_fast_prototyping_components_slate.IHelperFunctions.md#getcontextfor)
- [getPreviousSelectedElementAnchor](client_fast_prototyping_components_slate.IHelperFunctions.md#getpreviousselectedelementanchor)
- [getPreviousTextAnchor](client_fast_prototyping_components_slate.IHelperFunctions.md#getprevioustextanchor)
- [getRootContext](client_fast_prototyping_components_slate.IHelperFunctions.md#getrootcontext)
- [getState](client_fast_prototyping_components_slate.IHelperFunctions.md#getstate)
- [hardBlur](client_fast_prototyping_components_slate.IHelperFunctions.md#hardblur)
- [insertContainer](client_fast_prototyping_components_slate.IHelperFunctions.md#insertcontainer)
- [insertCustom](client_fast_prototyping_components_slate.IHelperFunctions.md#insertcustom)
- [insertElement](client_fast_prototyping_components_slate.IHelperFunctions.md#insertelement)
- [insertFile](client_fast_prototyping_components_slate.IHelperFunctions.md#insertfile)
- [insertImage](client_fast_prototyping_components_slate.IHelperFunctions.md#insertimage)
- [insertList](client_fast_prototyping_components_slate.IHelperFunctions.md#insertlist)
- [insertSuperbreak](client_fast_prototyping_components_slate.IHelperFunctions.md#insertsuperbreak)
- [insertTable](client_fast_prototyping_components_slate.IHelperFunctions.md#inserttable)
- [insertTableColumn](client_fast_prototyping_components_slate.IHelperFunctions.md#inserttablecolumn)
- [insertTableRow](client_fast_prototyping_components_slate.IHelperFunctions.md#inserttablerow)
- [insertTemplateHTML](client_fast_prototyping_components_slate.IHelperFunctions.md#inserttemplatehtml)
- [insertTemplateText](client_fast_prototyping_components_slate.IHelperFunctions.md#inserttemplatetext)
- [insertVideo](client_fast_prototyping_components_slate.IHelperFunctions.md#insertvideo)
- [movePaths](client_fast_prototyping_components_slate.IHelperFunctions.md#movepaths)
- [selectPath](client_fast_prototyping_components_slate.IHelperFunctions.md#selectpath)
- [set](client_fast_prototyping_components_slate.IHelperFunctions.md#set)
- [setAction](client_fast_prototyping_components_slate.IHelperFunctions.md#setaction)
- [setActiveStyle](client_fast_prototyping_components_slate.IHelperFunctions.md#setactivestyle)
- [setContext](client_fast_prototyping_components_slate.IHelperFunctions.md#setcontext)
- [setForEach](client_fast_prototyping_components_slate.IHelperFunctions.md#setforeach)
- [setHoverStyle](client_fast_prototyping_components_slate.IHelperFunctions.md#sethoverstyle)
- [setIfCondition](client_fast_prototyping_components_slate.IHelperFunctions.md#setifcondition)
- [setRichClasses](client_fast_prototyping_components_slate.IHelperFunctions.md#setrichclasses)
- [setStyle](client_fast_prototyping_components_slate.IHelperFunctions.md#setstyle)
- [setUIHandler](client_fast_prototyping_components_slate.IHelperFunctions.md#setuihandler)
- [setUIHandlerArg](client_fast_prototyping_components_slate.IHelperFunctions.md#setuihandlerarg)
- [softBlur](client_fast_prototyping_components_slate.IHelperFunctions.md#softblur)
- [toggleLink](client_fast_prototyping_components_slate.IHelperFunctions.md#togglelink)
- [toggleQuote](client_fast_prototyping_components_slate.IHelperFunctions.md#togglequote)
- [toggleTable](client_fast_prototyping_components_slate.IHelperFunctions.md#toggletable)
- [toggleTitle](client_fast_prototyping_components_slate.IHelperFunctions.md#toggletitle)
- [updateLink](client_fast_prototyping_components_slate.IHelperFunctions.md#updatelink)
- [updateTemplateHTML](client_fast_prototyping_components_slate.IHelperFunctions.md#updatetemplatehtml)
- [updateTemplateText](client_fast_prototyping_components_slate.IHelperFunctions.md#updatetemplatetext)
- [updateVideo](client_fast_prototyping_components_slate.IHelperFunctions.md#updatevideo)

## Properties

### HistoryEditor

• **HistoryEditor**: `Object`

This is the history editor class itself
provided by slate

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isHistoryEditor` | (`value`: `any`) => value is HistoryEditor |
| `isMerging` | (`editor`: `HistoryEditor`) => `boolean` |
| `isSaving` | (`editor`: `HistoryEditor`) => `boolean` |
| `redo` | (`editor`: `HistoryEditor`) => `void` |
| `undo` | (`editor`: `HistoryEditor`) => `void` |
| `withoutMerging` | (`editor`: `HistoryEditor`, `fn`: () => `void`) => `void` |
| `withoutSaving` | (`editor`: `HistoryEditor`, `fn`: () => `void`) => `void` |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:369](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L369)

___

### Node

• **Node**: `NodeInterface`

This is the node class itself

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:383](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L383)

___

### Path

• **Path**: `PathInterface`

The path type

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:387](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L387)

___

### Range

• **Range**: `RangeInterface`

This is the range class itself
provided by slate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:379](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L379)

___

### ReactEditor

• **ReactEditor**: `Object`

This is the react editor class itself
provided by slate

#### Type declaration

| Name | Type |
| :------ | :------ |
| `androidPendingDiffs` | (`editor`: `BaseEditor` & `ReactEditor`) => `TextDiff`[] |
| `androidScheduleFlush` | (`editor`: `BaseEditor` & `ReactEditor`) => `void` |
| `blur` | (`editor`: `ReactEditor`) => `void` |
| `deselect` | (`editor`: `ReactEditor`) => `void` |
| `findDocumentOrShadowRoot` | (`editor`: `ReactEditor`) => `Document` \| `ShadowRoot` |
| `findEventRange` | (`editor`: `ReactEditor`, `event`: `any`) => `BaseRange` |
| `findKey` | (`editor`: `ReactEditor`, `node`: `Node`) => `Key` |
| `findPath` | (`editor`: `ReactEditor`, `node`: `Node`) => `Path` |
| `focus` | (`editor`: `ReactEditor`) => `void` |
| `getWindow` | (`editor`: `ReactEditor`) => `Window` |
| `hasDOMNode` | (`editor`: `ReactEditor`, `target`: `Node`, `options?`: \{ `editable?`: `boolean`  }) => `boolean` |
| `hasEditableTarget` | (`editor`: `ReactEditor`, `target`: `EventTarget`) => target is Node |
| `hasRange` | (`editor`: `ReactEditor`, `range`: `BaseRange`) => `boolean` |
| `hasSelectableTarget` | (`editor`: `ReactEditor`, `target`: `EventTarget`) => `boolean` |
| `hasTarget` | (`editor`: `ReactEditor`, `target`: `EventTarget`) => target is Node |
| `insertData` | (`editor`: `ReactEditor`, `data`: `DataTransfer`) => `void` |
| `insertFragmentData` | (`editor`: `ReactEditor`, `data`: `DataTransfer`) => `boolean` |
| `insertTextData` | (`editor`: `ReactEditor`, `data`: `DataTransfer`) => `boolean` |
| `isComposing` | (`editor`: `ReactEditor`) => `boolean` |
| `isFocused` | (`editor`: `ReactEditor`) => `boolean` |
| `isReadOnly` | (`editor`: `ReactEditor`) => `boolean` |
| `isTargetInsideNonReadonlyVoid` | (`editor`: `ReactEditor`, `target`: `EventTarget`) => `boolean` |
| `setFragmentData` | (`editor`: `ReactEditor`, `data`: `DataTransfer`, `originEvent?`: ``"copy"`` \| ``"drag"`` \| ``"cut"``) => `void` |
| `toDOMNode` | (`editor`: `ReactEditor`, `node`: `Node`) => `HTMLElement` |
| `toDOMPoint` | (`editor`: `ReactEditor`, `point`: `BasePoint`) => `DOMPoint` |
| `toDOMRange` | (`editor`: `ReactEditor`, `range`: `BaseRange`) => `Range` |
| `toSlateNode` | (`editor`: `ReactEditor`, `domNode`: `Node`) => `Node` |
| `toSlatePoint` | \<T\>(`editor`: `ReactEditor`, `domPoint`: `DOMPoint`, `options`: \{ `exactMatch`: `boolean` ; `suppressThrow`: `T`  }) => `T` extends ``true`` ? `BasePoint` : `BasePoint` |
| `toSlateRange` | \<T_1\>(`editor`: `ReactEditor`, `domRange`: `Selection` \| `Range` \| `StaticRange`, `options`: \{ `exactMatch`: `boolean` ; `suppressThrow`: `T_1`  }) => `T_1` extends ``true`` ? `BaseRange` : `BaseRange` & \{ `placeholder?`: `string`  } |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:364](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L364)

___

### Transforms

• **Transforms**: `GeneralTransforms` & `NodeTransforms` & `SelectionTransforms` & `TextTransforms`

This is the transforms class itself
provided by slate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:374](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L374)

___

### canToggleTable

• **canToggleTable**: (`element`: ``"tfoot"`` \| ``"thead"``) => `boolean`

#### Type declaration

▸ (`element`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | ``"tfoot"`` \| ``"thead"`` |

##### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:524](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L524)

___

### deletePath

• **deletePath**: (`path`: `Path`) => `void`

#### Type declaration

▸ (`path`): `void`

Deletes given a path

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:413](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L413)

___

### deleteSelectedNode

• **deleteSelectedNode**: () => `void`

#### Type declaration

▸ (): `void`

Deletes the node at the selected path

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:418](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L418)

___

### deleteTableColumn

• **deleteTableColumn**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:521](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L521)

___

### deleteTableRow

• **deleteTableRow**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:522](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L522)

___

### editor

• **editor**: `ItemizeEditor`

This is the editor instance of the given
editor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:359](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L359)

___

### focus

• **focus**: () => `void`

#### Type declaration

▸ (): `void`

focuses the text editor

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:434](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L434)

___

### focusAt

• **focusAt**: (`at`: `Path` \| `BaseRange`) => `Promise`\<`void`\>

#### Type declaration

▸ (`at`): `Promise`\<`void`\>

Focuses at the desired location

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `Path` \| `BaseRange` | the range to insert at |

##### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:439](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L439)

___

### formatToggle

• **formatToggle**: (`type`: ``"bold"`` \| ``"italic"`` \| ``"underline"``) => `void`

#### Type declaration

▸ (`type`): `void`

Formats the current text as bold
this is always caret based and does not allow for custom
ranges
It will refocus once done

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"bold"`` \| ``"italic"`` \| ``"underline"`` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:560](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L560)

___

### getContextFor

• **getContextFor**: (`element`: [`IText`](client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| `Path`, `level?`: ``"final"`` \| ``"select-context"`` \| ``"select-loop"``, `onlySwichingContext?`: `boolean`) => [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Type declaration

▸ (`element`, `level?`, `onlySwichingContext?`): [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

Provies the context for the given path

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IText`](client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| `Path` |
| `level?` | ``"final"`` \| ``"select-context"`` \| ``"select-loop"`` |
| `onlySwichingContext?` | `boolean` |

##### Returns

[`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:392](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L392)

___

### getPreviousSelectedElementAnchor

• **getPreviousSelectedElementAnchor**: () => `Path`

#### Type declaration

▸ (): `Path`

Allows to kno what the previous selected element was
before this one was selected

##### Returns

`Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:424](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L424)

___

### getPreviousTextAnchor

• **getPreviousTextAnchor**: () => `Path`

#### Type declaration

▸ (): `Path`

Allows to kno what the previous selected element was
before this one was selected

##### Returns

`Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:429](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L429)

___

### getRootContext

• **getRootContext**: () => [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Type declaration

▸ (): [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

##### Returns

[`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:393](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L393)

___

### getState

• **getState**: () => [`ISlateEditorInternalStateType`](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md)

#### Type declaration

▸ (): [`ISlateEditorInternalStateType`](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md)

##### Returns

[`ISlateEditorInternalStateType`](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:394](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L394)

___

### hardBlur

• **hardBlur**: () => `void`

#### Type declaration

▸ (): `void`

Performs a hard blur, and even the selected paths are lost

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:633](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L633)

___

### insertContainer

• **insertContainer**: (`type?`: `string`) => `void`

#### Type declaration

▸ (`type?`): `void`

Will insert a container at the given location

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type?` | `string` | optional, the container type, otherwise will insert a standard container this is caret based unless you specify your own custom range note that calling this function will cause a refocus |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:478](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L478)

___

### insertCustom

• **insertCustom**: (`type`: `string`) => `void`

#### Type declaration

▸ (`type`): `void`

Inserts a custom element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the custom type |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:486](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L486)

___

### insertElement

• **insertElement**: (`element`: [`RichElement`](../modules/client_internal_text_serializer.md#richelement)) => `void`

#### Type declaration

▸ (`element`): `void`

Inserts an element at the given position

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element to insert |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:513](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L513)

___

### insertFile

• **insertFile**: (`file`: `File`) => `void`

#### Type declaration

▸ (`file`): `void`

Will insert a file based on the information given

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file to insert |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:468](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L468)

___

### insertImage

• **insertImage**: (`file`: `File`, `standalone`: `boolean`) => `void`

#### Type declaration

▸ (`file`, `standalone`): `void`

Will insert an image based on a given file that has
been taken as an input

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file |
| `standalone` | `boolean` | whether to make it a standalone image |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:454](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L454)

___

### insertList

• **insertList**: (`type`: ``"numbered"`` \| ``"bulleted"``) => `void`

#### Type declaration

▸ (`type`): `void`

Makes a list out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"numbered"`` \| ``"bulleted"`` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:543](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L543)

___

### insertSuperbreak

• **insertSuperbreak**: (`at?`: `Path`, `reverse?`: `boolean`) => `void`

#### Type declaration

▸ (`at?`, `reverse?`): `void`

inserts a super break at the given position in order
to add a paragraph

##### Parameters

| Name | Type |
| :------ | :------ |
| `at?` | `Path` |
| `reverse?` | `boolean` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:445](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L445)

___

### insertTable

• **insertTable**: (`tableType`: `string`) => `void`

#### Type declaration

▸ (`tableType`): `void`

Inserts a table at the given location

##### Parameters

| Name | Type |
| :------ | :------ |
| `tableType` | `string` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:518](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L518)

___

### insertTableColumn

• **insertTableColumn**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:519](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L519)

___

### insertTableRow

• **insertTableRow**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:520](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L520)

___

### insertTemplateHTML

• **insertTemplateHTML**: (`label`: `string`, `value`: `string`) => `void`

#### Type declaration

▸ (`label`, `value`): `void`

Inserts a template html fragment
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to use for the template html |
| `value` | `string` | the actual value for the template html to be used off the context |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:505](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L505)

___

### insertTemplateText

• **insertTemplateText**: (`label`: `string`, `value`: `string`) => `void`

#### Type declaration

▸ (`label`, `value`): `void`

Inserts a template text
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to use for the template text |
| `value` | `string` | the actual value for the template text to be used off the context |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:495](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L495)

___

### insertVideo

• **insertVideo**: (`url`: `string`) => `boolean`

#### Type declaration

▸ (`url`): `boolean`

Will insert a video given the information

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url of the video, only youtube and vimeo supported as origin |

##### Returns

`boolean`

a boolean true if the video was properly inserted, false if the video url was invalid

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:461](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L461)

___

### movePaths

• **movePaths**: (`from`: `Path`, `to`: `Path`) => `void`

#### Type declaration

▸ (`from`, `to`): `void`

Switches a path from one place to another

##### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `Path` |
| `to` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:408](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L408)

___

### selectPath

• **selectPath**: (`path`: `Path`) => `void`

#### Type declaration

▸ (`path`): `void`

performs a pseudo selection at a given path
this selection is silent and does not affect other than the current
selected path based on the information, it does not cause a caret
change or anything of the sorts

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `Path` | the path to select |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:403](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L403)

___

### set

• **set**: (`args`: `Partial`\<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\> \| `Partial`\<[`IText`](client_internal_text_serializer_types_text.IText.md)\>, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`args`, `anchor`): `void`

does an arbitrary update of arbitrary arguments off the current
element value, this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Partial`\<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\> \| `Partial`\<[`IText`](client_internal_text_serializer_types_text.IText.md)\> | the arbitrary arguments (partial value) |
| `anchor` | `Path` | the anchor where the update should take place (should point at an element) |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:569](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L569)

___

### setAction

• **setAction**: (`key`: `string`, `value`: `string`, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`key`, `value`, `anchor`): `void`

Sets an action key
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:628](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L628)

___

### setActiveStyle

• **setActiveStyle**: (`style`: `string`, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`style`, `anchor`): `void`

Sets the active style for the element
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `string` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:588](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L588)

___

### setContext

• **setContext**: (`key`: `string`, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`key`, `anchor`): `void`

Sets the context key
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:594](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L594)

___

### setForEach

• **setForEach**: (`key`: `string`, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`key`, `anchor`): `void`

Sets the for-each loop key
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:616](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L616)

___

### setHoverStyle

• **setHoverStyle**: (`style`: `string`, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`style`, `anchor`): `void`

Sets the template hover style for the element
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `string` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:582](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L582)

___

### setIfCondition

• **setIfCondition**: (`key`: `string`, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`key`, `anchor`): `void`

Sets the if render condition
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:600](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L600)

___

### setRichClasses

• **setRichClasses**: (`list`: `string`[], `anchor`: `Path`) => `void`

#### Type declaration

▸ (`list`, `anchor`): `void`

Sets all the rich classes
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `string`[] |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:622](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L622)

___

### setStyle

• **setStyle**: (`style`: `string`, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`style`, `anchor`): `void`

Sets the current style for the element
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `string` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:576](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L576)

___

### setUIHandler

• **setUIHandler**: (`key`: `string`, `args`: \{ `[key: string]`: `string`;  }, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`key`, `args`, `anchor`): `void`

Sets an UI handler in the given anchor with the given args
this function does not refocus and it's silent and meant
for indirect usage

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `args` | `Object` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:606](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L606)

___

### setUIHandlerArg

• **setUIHandlerArg**: (`key`: `string`, `value`: `string`, `anchor`: `Path`) => `void`

#### Type declaration

▸ (`key`, `value`, `anchor`): `void`

Allows to set UI handler args in the ui handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |
| `anchor` | `Path` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:610](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L610)

___

### softBlur

• **softBlur**: () => `void`

#### Type declaration

▸ (): `void`

Performs a soft blur event

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:637](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L637)

___

### toggleLink

• **toggleLink**: (`url`: `string`, `templateValue`: `string`) => `boolean`

#### Type declaration

▸ (`url`, `templateValue`): `boolean`

Makes a link out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `templateValue` | `string` |

##### Returns

`boolean`

a boolean specifying whether the toggling was succesful or it failed
for some reason, eg. invalid link, links are not supported

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:551](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L551)

___

### toggleQuote

• **toggleQuote**: () => `void`

#### Type declaration

▸ (): `void`

Makes a quote out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:531](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L531)

___

### toggleTable

• **toggleTable**: (`element`: ``"tfoot"`` \| ``"thead"``) => `void`

#### Type declaration

▸ (`element`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | ``"tfoot"`` \| ``"thead"`` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:523](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L523)

___

### toggleTitle

• **toggleTitle**: (`type`: ``"h1"`` \| ``"h2"`` \| ``"h3"`` \| ``"h4"`` \| ``"h5"`` \| ``"h6"``) => `void`

#### Type declaration

▸ (`type`): `void`

Makes a title out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"h1"`` \| ``"h2"`` \| ``"h3"`` \| ``"h4"`` \| ``"h5"`` \| ``"h6"`` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:537](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L537)

___

### updateLink

• **updateLink**: (`url`: `string`, `templateValue`: `string`) => `boolean`

#### Type declaration

▸ (`url`, `templateValue`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `templateValue` | `string` |

##### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:552](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L552)

___

### updateTemplateHTML

• **updateTemplateHTML**: (`label`: `string`, `value`: `string`) => `void`

#### Type declaration

▸ (`label`, `value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `value` | `string` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:506](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L506)

___

### updateTemplateText

• **updateTemplateText**: (`label`: `string`, `value`: `string`) => `void`

#### Type declaration

▸ (`label`, `value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `value` | `string` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:496](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L496)

___

### updateVideo

• **updateVideo**: (`url`: `string`) => `boolean`

#### Type declaration

▸ (`url`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

##### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:462](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L462)
