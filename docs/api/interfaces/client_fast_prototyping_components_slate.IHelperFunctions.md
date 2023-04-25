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
- [editor](client_fast_prototyping_components_slate.IHelperFunctions.md#editor)

### Methods

- [canToggleTable](client_fast_prototyping_components_slate.IHelperFunctions.md#cantoggletable)
- [deletePath](client_fast_prototyping_components_slate.IHelperFunctions.md#deletepath)
- [deleteSelectedNode](client_fast_prototyping_components_slate.IHelperFunctions.md#deleteselectednode)
- [deleteTableColumn](client_fast_prototyping_components_slate.IHelperFunctions.md#deletetablecolumn)
- [deleteTableRow](client_fast_prototyping_components_slate.IHelperFunctions.md#deletetablerow)
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

[client/fast-prototyping/components/slate/index.tsx:356](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L356)

___

### Node

• **Node**: `NodeInterface`

This is the node class itself

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:370](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L370)

___

### Path

• **Path**: `PathInterface`

The path type

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:374](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L374)

___

### Range

• **Range**: `RangeInterface`

This is the range class itself
provided by slate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:366](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L366)

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
| `hasDOMNode` | (`editor`: `ReactEditor`, `target`: `Node`, `options?`: { `editable?`: `boolean`  }) => `boolean` |
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
| `setFragmentData` | (`editor`: `ReactEditor`, `data`: `DataTransfer`, `originEvent?`: ``"drag"`` \| ``"copy"`` \| ``"cut"``) => `void` |
| `toDOMNode` | (`editor`: `ReactEditor`, `node`: `Node`) => `HTMLElement` |
| `toDOMPoint` | (`editor`: `ReactEditor`, `point`: `BasePoint`) => `DOMPoint` |
| `toDOMRange` | (`editor`: `ReactEditor`, `range`: `BaseRange`) => `Range` |
| `toSlateNode` | (`editor`: `ReactEditor`, `domNode`: `Node`) => `Node` |
| `toSlatePoint` | <T\>(`editor`: `ReactEditor`, `domPoint`: `DOMPoint`, `options`: { `exactMatch`: `boolean` ; `suppressThrow`: `T`  }) => `T` extends ``true`` ? `BasePoint` : `BasePoint` |
| `toSlateRange` | <T_1\>(`editor`: `ReactEditor`, `domRange`: `Range` \| `StaticRange` \| `Selection`, `options`: { `exactMatch`: `boolean` ; `suppressThrow`: `T_1`  }) => `T_1` extends ``true`` ? `BaseRange` : `BaseRange` & { `placeholder?`: `string`  } |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:351](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L351)

___

### Transforms

• **Transforms**: `GeneralTransforms` & `NodeTransforms` & `SelectionTransforms` & `TextTransforms`

This is the transforms class itself
provided by slate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:361](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L361)

___

### editor

• **editor**: `ItemizeEditor`

This is the editor instance of the given
editor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:346](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L346)

## Methods

### canToggleTable

▸ **canToggleTable**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | ``"tfoot"`` \| ``"thead"`` |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:511](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L511)

___

### deletePath

▸ **deletePath**(`path`): `void`

Deletes given a path

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:400](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L400)

___

### deleteSelectedNode

▸ **deleteSelectedNode**(): `void`

Deletes the node at the selected path

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:405](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L405)

___

### deleteTableColumn

▸ **deleteTableColumn**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:508](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L508)

___

### deleteTableRow

▸ **deleteTableRow**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:509](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L509)

___

### focus

▸ **focus**(): `void`

focuses the text editor

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:421](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L421)

___

### focusAt

▸ **focusAt**(`at`): `Promise`<`void`\>

Focuses at the desired location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `Path` \| `BaseRange` | the range to insert at |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:426](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L426)

___

### formatToggle

▸ **formatToggle**(`type`): `void`

Formats the current text as bold
this is always caret based and does not allow for custom
ranges
It will refocus once done

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"bold"`` \| ``"italic"`` \| ``"underline"`` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:547](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L547)

___

### getContextFor

▸ **getContextFor**(`element`, `level?`, `onlySwichingContext?`): [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

Provies the context for the given path

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](client_internal_text_serializer_types_text.IText.md) \| `Path` |
| `level?` | ``"final"`` \| ``"select-context"`` \| ``"select-loop"`` |
| `onlySwichingContext?` | `boolean` |

#### Returns

[`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:379](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L379)

___

### getPreviousSelectedElementAnchor

▸ **getPreviousSelectedElementAnchor**(): `Path`

Allows to kno what the previous selected element was
before this one was selected

#### Returns

`Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:411](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L411)

___

### getPreviousTextAnchor

▸ **getPreviousTextAnchor**(): `Path`

Allows to kno what the previous selected element was
before this one was selected

#### Returns

`Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:416](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L416)

___

### getRootContext

▸ **getRootContext**(): [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Returns

[`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:380](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L380)

___

### getState

▸ **getState**(): [`ISlateEditorInternalStateType`](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md)

#### Returns

[`ISlateEditorInternalStateType`](client_fast_prototyping_components_slate.ISlateEditorInternalStateType.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:381](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L381)

___

### hardBlur

▸ **hardBlur**(): `void`

Performs a hard blur, and even the selected paths are lost

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:620](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L620)

___

### insertContainer

▸ **insertContainer**(`type?`): `void`

Will insert a container at the given location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type?` | `string` | optional, the container type, otherwise will insert a standard container this is caret based unless you specify your own custom range note that calling this function will cause a refocus |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:465](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L465)

___

### insertCustom

▸ **insertCustom**(`type`): `void`

Inserts a custom element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the custom type |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:473](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L473)

___

### insertElement

▸ **insertElement**(`element`): `void`

Inserts an element at the given position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element to insert |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:500](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L500)

___

### insertFile

▸ **insertFile**(`file`): `void`

Will insert a file based on the information given

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file to insert |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:455](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L455)

___

### insertImage

▸ **insertImage**(`file`, `standalone`): `void`

Will insert an image based on a given file that has
been taken as an input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file |
| `standalone` | `boolean` | whether to make it a standalone image |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:441](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L441)

___

### insertList

▸ **insertList**(`type`): `void`

Makes a list out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"bulleted"`` \| ``"numbered"`` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:530](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L530)

___

### insertSuperbreak

▸ **insertSuperbreak**(`at?`, `reverse?`): `void`

inserts a super break at the given position in order
to add a paragraph

#### Parameters

| Name | Type |
| :------ | :------ |
| `at?` | `Path` |
| `reverse?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:432](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L432)

___

### insertTable

▸ **insertTable**(`tableType`): `void`

Inserts a table at the given location

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableType` | `string` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:505](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L505)

___

### insertTableColumn

▸ **insertTableColumn**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:506](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L506)

___

### insertTableRow

▸ **insertTableRow**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:507](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L507)

___

### insertTemplateHTML

▸ **insertTemplateHTML**(`label`, `value`): `void`

Inserts a template html fragment
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to use for the template html |
| `value` | `string` | the actual value for the template html to be used off the context |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:492](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L492)

___

### insertTemplateText

▸ **insertTemplateText**(`label`, `value`): `void`

Inserts a template text
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to use for the template text |
| `value` | `string` | the actual value for the template text to be used off the context |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:482](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L482)

___

### insertVideo

▸ **insertVideo**(`url`): `boolean`

Will insert a video given the information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url of the video, only youtube and vimeo supported as origin |

#### Returns

`boolean`

a boolean true if the video was properly inserted, false if the video url was invalid

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:448](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L448)

___

### movePaths

▸ **movePaths**(`from`, `to`): `void`

Switches a path from one place to another

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `Path` |
| `to` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:395](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L395)

___

### selectPath

▸ **selectPath**(`path`): `void`

performs a pseudo selection at a given path
this selection is silent and does not affect other than the current
selected path based on the information, it does not cause a caret
change or anything of the sorts

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `Path` | the path to select |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:390](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L390)

___

### set

▸ **set**(`args`, `anchor`): `void`

does an arbitrary update of arbitrary arguments off the current
element value, this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Partial`<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\> \| `Partial`<[`IText`](client_internal_text_serializer_types_text.IText.md)\> | the arbitrary arguments (partial value) |
| `anchor` | `Path` | the anchor where the update should take place (should point at an element) |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:556](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L556)

___

### setAction

▸ **setAction**(`key`, `value`, `anchor`): `void`

Sets an action key
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:615](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L615)

___

### setActiveStyle

▸ **setActiveStyle**(`style`, `anchor`): `void`

Sets the active style for the element
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `string` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:575](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L575)

___

### setContext

▸ **setContext**(`key`, `anchor`): `void`

Sets the context key
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:581](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L581)

___

### setForEach

▸ **setForEach**(`key`, `anchor`): `void`

Sets the for-each loop key
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:603](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L603)

___

### setHoverStyle

▸ **setHoverStyle**(`style`, `anchor`): `void`

Sets the template hover style for the element
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `string` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:569](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L569)

___

### setIfCondition

▸ **setIfCondition**(`key`, `anchor`): `void`

Sets the if render condition
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:587](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L587)

___

### setRichClasses

▸ **setRichClasses**(`list`, `anchor`): `void`

Sets all the rich classes
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `string`[] |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:609](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L609)

___

### setStyle

▸ **setStyle**(`style`, `anchor`): `void`

Sets the current style for the element
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `string` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:563](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L563)

___

### setUIHandler

▸ **setUIHandler**(`key`, `args`, `anchor`): `void`

Sets an UI handler in the given anchor with the given args
this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `args` | `Object` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:593](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L593)

___

### setUIHandlerArg

▸ **setUIHandlerArg**(`key`, `value`, `anchor`): `void`

Allows to set UI handler args in the ui handler

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |
| `anchor` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:597](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L597)

___

### softBlur

▸ **softBlur**(): `void`

Performs a soft blur event

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:624](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L624)

___

### toggleLink

▸ **toggleLink**(`url`, `templateValue`): `boolean`

Makes a link out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `templateValue` | `string` |

#### Returns

`boolean`

a boolean specifying whether the toggling was succesful or it failed
for some reason, eg. invalid link, links are not supported

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:538](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L538)

___

### toggleQuote

▸ **toggleQuote**(): `void`

Makes a quote out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:518](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L518)

___

### toggleTable

▸ **toggleTable**(`element`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | ``"tfoot"`` \| ``"thead"`` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:510](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L510)

___

### toggleTitle

▸ **toggleTitle**(`type`): `void`

Makes a title out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"h1"`` \| ``"h2"`` \| ``"h3"`` \| ``"h4"`` \| ``"h5"`` \| ``"h6"`` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:524](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L524)

___

### updateLink

▸ **updateLink**(`url`, `templateValue`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `templateValue` | `string` |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:539](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L539)

___

### updateTemplateHTML

▸ **updateTemplateHTML**(`label`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:493](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L493)

___

### updateTemplateText

▸ **updateTemplateText**(`label`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:483](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L483)

___

### updateVideo

▸ **updateVideo**(`url`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:449](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L449)
