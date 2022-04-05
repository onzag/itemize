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
- [Range](client_fast_prototyping_components_slate.IHelperFunctions.md#range)
- [ReactEditor](client_fast_prototyping_components_slate.IHelperFunctions.md#reacteditor)
- [Transforms](client_fast_prototyping_components_slate.IHelperFunctions.md#transforms)
- [editor](client_fast_prototyping_components_slate.IHelperFunctions.md#editor)

### Methods

- [blockBlur](client_fast_prototyping_components_slate.IHelperFunctions.md#blockblur)
- [deletePath](client_fast_prototyping_components_slate.IHelperFunctions.md#deletepath)
- [deleteSelectedNode](client_fast_prototyping_components_slate.IHelperFunctions.md#deleteselectednode)
- [focus](client_fast_prototyping_components_slate.IHelperFunctions.md#focus)
- [focusAt](client_fast_prototyping_components_slate.IHelperFunctions.md#focusat)
- [formatToggleBold](client_fast_prototyping_components_slate.IHelperFunctions.md#formattogglebold)
- [formatToggleItalic](client_fast_prototyping_components_slate.IHelperFunctions.md#formattoggleitalic)
- [formatToggleUnderline](client_fast_prototyping_components_slate.IHelperFunctions.md#formattoggleunderline)
- [hardBlur](client_fast_prototyping_components_slate.IHelperFunctions.md#hardblur)
- [insertContainer](client_fast_prototyping_components_slate.IHelperFunctions.md#insertcontainer)
- [insertCustom](client_fast_prototyping_components_slate.IHelperFunctions.md#insertcustom)
- [insertElement](client_fast_prototyping_components_slate.IHelperFunctions.md#insertelement)
- [insertFile](client_fast_prototyping_components_slate.IHelperFunctions.md#insertfile)
- [insertImage](client_fast_prototyping_components_slate.IHelperFunctions.md#insertimage)
- [insertTemplateHTML](client_fast_prototyping_components_slate.IHelperFunctions.md#inserttemplatehtml)
- [insertTemplateText](client_fast_prototyping_components_slate.IHelperFunctions.md#inserttemplatetext)
- [insertUIHandledContainer](client_fast_prototyping_components_slate.IHelperFunctions.md#insertuihandledcontainer)
- [insertVideo](client_fast_prototyping_components_slate.IHelperFunctions.md#insertvideo)
- [movePaths](client_fast_prototyping_components_slate.IHelperFunctions.md#movepaths)
- [releaseBlur](client_fast_prototyping_components_slate.IHelperFunctions.md#releaseblur)
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
- [toggleList](client_fast_prototyping_components_slate.IHelperFunctions.md#togglelist)
- [toggleQuote](client_fast_prototyping_components_slate.IHelperFunctions.md#togglequote)
- [toggleTitle](client_fast_prototyping_components_slate.IHelperFunctions.md#toggletitle)

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

[client/fast-prototyping/components/slate/index.tsx:564](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L564)

___

### Node

• **Node**: `Object`

This is the node class itself

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ancestor` | (`root`: `Node`, `path`: `Path`) => `Ancestor` |
| `ancestors` | (`root`: `Node`, `path`: `Path`, `options?`: { `reverse?`: `boolean`  }) => `Generator`<`NodeEntry`<`Ancestor`\>, `void`, `undefined`\> |
| `child` | (`root`: `Node`, `index`: `number`) => `Descendant` |
| `children` | (`root`: `Node`, `path`: `Path`, `options?`: { `reverse?`: `boolean`  }) => `Generator`<`NodeEntry`<`Descendant`\>, `void`, `undefined`\> |
| `common` | (`root`: `Node`, `path`: `Path`, `another`: `Path`) => `NodeEntry`<`Node`\> |
| `descendant` | (`root`: `Node`, `path`: `Path`) => `Descendant` |
| `descendants` | (`root`: `Node`, `options?`: { `from?`: `Path` ; `pass?`: (`node`: `NodeEntry`<`Node`\>) => `boolean` ; `reverse?`: `boolean` ; `to?`: `Path`  }) => `Generator`<`NodeEntry`<`Descendant`\>, `void`, `undefined`\> |
| `elements` | (`root`: `Node`, `options?`: { `from?`: `Path` ; `pass?`: (`node`: `NodeEntry`<`Node`\>) => `boolean` ; `reverse?`: `boolean` ; `to?`: `Path`  }) => `Generator`<`ElementEntry`, `void`, `undefined`\> |
| `first` | (`root`: `Node`, `path`: `Path`) => `NodeEntry`<`Node`\> |
| `fragment` | (`root`: `Node`, `range`: `Range`) => `Descendant`[] |
| `get` | (`root`: `Node`, `path`: `Path`) => `Node` |
| `has` | (`root`: `Node`, `path`: `Path`) => `boolean` |
| `isNode` | (`value`: `any`) => value is Node |
| `isNodeList` | (`value`: `any`) => value is Node[] |
| `last` | (`root`: `Node`, `path`: `Path`) => `NodeEntry`<`Node`\> |
| `leaf` | (`root`: `Node`, `path`: `Path`) => `Text` |
| `levels` | (`root`: `Node`, `path`: `Path`, `options?`: { `reverse?`: `boolean`  }) => `Generator`<`NodeEntry`<`Node`\>, `void`, `undefined`\> |
| `matches` | (`node`: `Node`, `props`: `Partial`<`Editor`\> \| `Partial`<`Element`\> \| `Partial`<`Text`\>) => `boolean` |
| `nodes` | (`root`: `Node`, `options?`: { `from?`: `Path` ; `pass?`: (`entry`: `NodeEntry`<`Node`\>) => `boolean` ; `reverse?`: `boolean` ; `to?`: `Path`  }) => `Generator`<`NodeEntry`<`Node`\>, `void`, `undefined`\> |
| `parent` | (`root`: `Node`, `path`: `Path`) => `Ancestor` |
| `string` | (`node`: `Node`) => `string` |
| `texts` | (`root`: `Node`, `options?`: { `from?`: `Path` ; `pass?`: (`node`: `NodeEntry`<`Node`\>) => `boolean` ; `reverse?`: `boolean` ; `to?`: `Path`  }) => `Generator`<`NodeEntry`<`Text`\>, `void`, `undefined`\> |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:578](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L578)

___

### Range

• **Range**: `Object`

This is the range class itself
provided by slate

#### Type declaration

| Name | Type |
| :------ | :------ |
| `edges` | (`range`: `Range`, `options?`: { `reverse?`: `boolean`  }) => [`Point`, `Point`] |
| `end` | (`range`: `Range`) => `Point` |
| `equals` | (`range`: `Range`, `another`: `Range`) => `boolean` |
| `includes` | (`range`: `Range`, `target`: `Path` \| `Range` \| `Point`) => `boolean` |
| `intersection` | (`range`: `Range`, `another`: `Range`) => `Range` |
| `isBackward` | (`range`: `Range`) => `boolean` |
| `isCollapsed` | (`range`: `Range`) => `boolean` |
| `isExpanded` | (`range`: `Range`) => `boolean` |
| `isForward` | (`range`: `Range`) => `boolean` |
| `isRange` | (`value`: `any`) => value is Range |
| `points` | (`range`: `Range`) => `Generator`<`PointEntry`, `void`, `undefined`\> |
| `start` | (`range`: `Range`) => `Point` |
| `transform` | (`range`: `Range`, `op`: `Operation`, `options?`: { `affinity?`: ``"forward"`` \| ``"backward"`` \| ``"outward"`` \| ``"inward"``  }) => `Range` |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:574](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L574)

___

### ReactEditor

• **ReactEditor**: `Object`

This is the react editor class itself
provided by slate

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blur` | (`editor`: `ReactEditor`) => `void` |
| `deselect` | (`editor`: `ReactEditor`) => `void` |
| `findEventRange` | (`editor`: `ReactEditor`, `event`: `any`) => `Range` |
| `findKey` | (`editor`: `ReactEditor`, `node`: `Node`) => `Key` |
| `findPath` | (`editor`: `ReactEditor`, `node`: `Node`) => `Path` |
| `focus` | (`editor`: `ReactEditor`) => `void` |
| `hasDOMNode` | (`editor`: `ReactEditor`, `target`: `Node`, `options?`: { `editable?`: `boolean`  }) => `boolean` |
| `insertData` | (`editor`: `ReactEditor`, `data`: `DataTransfer`) => `void` |
| `isFocused` | (`editor`: `ReactEditor`) => `boolean` |
| `isReadOnly` | (`editor`: `ReactEditor`) => `boolean` |
| `setFragmentData` | (`editor`: `ReactEditor`, `data`: `DataTransfer`) => `void` |
| `toDOMNode` | (`editor`: `ReactEditor`, `node`: `Node`) => `HTMLElement` |
| `toDOMPoint` | (`editor`: `ReactEditor`, `point`: `Point`) => `DOMPoint` |
| `toDOMRange` | (`editor`: `ReactEditor`, `range`: `Range`) => `Range` |
| `toSlateNode` | (`editor`: `ReactEditor`, `domNode`: `Node`) => `Node` |
| `toSlatePoint` | (`editor`: `ReactEditor`, `domPoint`: `DOMPoint`) => `Point` |
| `toSlateRange` | (`editor`: `ReactEditor`, `domRange`: `Range` \| `StaticRange` \| `Selection`) => `Range` |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:559](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L559)

___

### Transforms

• **Transforms**: `Object`

This is the transforms class itself
provided by slate

#### Type declaration

| Name | Type |
| :------ | :------ |
| `collapse` | (`editor`: `Editor`, `options?`: { `edge?`: ``"anchor"`` \| ``"focus"`` \| ``"start"`` \| ``"end"``  }) => `void` |
| `delete` | (`editor`: `Editor`, `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `distance?`: `number` ; `hanging?`: `boolean` ; `reverse?`: `boolean` ; `unit?`: ``"block"`` \| ``"character"`` \| ``"word"`` \| ``"line"`` ; `voids?`: `boolean`  }) => `void` |
| `deselect` | (`editor`: `Editor`) => `void` |
| `insertFragment` | (`editor`: `Editor`, `fragment`: `Node`[], `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `hanging?`: `boolean` ; `voids?`: `boolean`  }) => `void` |
| `insertNodes` | (`editor`: `Editor`, `nodes`: `Editor` \| `Element` \| `Text` \| `Node`[], `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `hanging?`: `boolean` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` ; `select?`: `boolean` ; `voids?`: `boolean`  }) => `void` |
| `insertText` | (`editor`: `Editor`, `text`: `string`, `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `voids?`: `boolean`  }) => `void` |
| `liftNodes` | (`editor`: `Editor`, `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` \| ``"all"`` ; `voids?`: `boolean`  }) => `void` |
| `mergeNodes` | (`editor`: `Editor`, `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `hanging?`: `boolean` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` ; `voids?`: `boolean`  }) => `void` |
| `move` | (`editor`: `Editor`, `options?`: { `distance?`: `number` ; `edge?`: ``"anchor"`` \| ``"focus"`` \| ``"start"`` \| ``"end"`` ; `reverse?`: `boolean` ; `unit?`: ``"character"`` \| ``"word"`` \| ``"line"`` \| ``"offset"``  }) => `void` |
| `moveNodes` | (`editor`: `Editor`, `options`: { `at?`: `Path` \| `Range` \| `Point` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` \| ``"all"`` ; `to`: `Path` ; `voids?`: `boolean`  }) => `void` |
| `removeNodes` | (`editor`: `Editor`, `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `hanging?`: `boolean` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` ; `voids?`: `boolean`  }) => `void` |
| `select` | (`editor`: `Editor`, `target`: `Location`) => `void` |
| `setNodes` | (`editor`: `Editor`, `props`: `Partial`<`Editor`\> \| `Partial`<`Element`\> \| `Partial`<`Text`\>, `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `hanging?`: `boolean` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` \| ``"all"`` ; `split?`: `boolean` ; `voids?`: `boolean`  }) => `void` |
| `setPoint` | (`editor`: `Editor`, `props`: `Partial`<`Point`\>, `options`: { `edge?`: ``"anchor"`` \| ``"focus"`` \| ``"start"`` \| ``"end"``  }) => `void` |
| `setSelection` | (`editor`: `Editor`, `props`: `Partial`<`Range`\>) => `void` |
| `splitNodes` | (`editor`: `Editor`, `options?`: { `always?`: `boolean` ; `at?`: `Path` \| `Range` \| `Point` ; `height?`: `number` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` ; `voids?`: `boolean`  }) => `void` |
| `transform` | (`editor`: `Editor`, `op`: `Operation`) => `void` |
| `unsetNodes` | (`editor`: `Editor`, `props`: `string` \| `string`[], `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` \| ``"all"`` ; `split?`: `boolean` ; `voids?`: `boolean`  }) => `void` |
| `unwrapNodes` | (`editor`: `Editor`, `options`: { `at?`: `Path` \| `Range` \| `Point` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` \| ``"all"`` ; `split?`: `boolean` ; `voids?`: `boolean`  }) => `void` |
| `wrapNodes` | (`editor`: `Editor`, `element`: `Element`, `options?`: { `at?`: `Path` \| `Range` \| `Point` ; `match?`: (`node`: `Node`) => `boolean` ; `mode?`: ``"highest"`` \| ``"lowest"`` \| ``"all"`` ; `split?`: `boolean` ; `voids?`: `boolean`  }) => `void` |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:569](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L569)

___

### editor

• **editor**: `ItemizeEditor`

This is the editor instance of the given
editor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:554](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L554)

## Methods

### blockBlur

▸ **blockBlur**(): `void`

cancels the field from blurring
you should use this on the mousedown on buttons that
are outside the selected area
not using this function should not have any effect

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:810](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L810)

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

[client/fast-prototyping/components/slate/index.tsx:597](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L597)

___

### deleteSelectedNode

▸ **deleteSelectedNode**(): `void`

Deletes the node at the selected path

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:602](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L602)

___

### focus

▸ **focus**(): `void`

focuses the text editor

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:607](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L607)

___

### focusAt

▸ **focusAt**(`at`): `void`

Focuses at the desired location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `Range` | the range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:612](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L612)

___

### formatToggleBold

▸ **formatToggleBold**(): `void`

Formats the current text as bold
this is always caret based and does not allow for custom
ranges
It will refocus once done

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:720](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L720)

___

### formatToggleItalic

▸ **formatToggleItalic**(): `void`

formats the current text as italic
this is always caret based and does not allow for custom
ranges
It will refocus once done

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:727](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L727)

___

### formatToggleUnderline

▸ **formatToggleUnderline**(): `void`

formats to underline
this is always caret based and does not allow for custom
ranges
It will refocus once done

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:734](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L734)

___

### hardBlur

▸ **hardBlur**(): `void`

Performs a hard blur, and even the selected paths are lost

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:821](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L821)

___

### insertContainer

▸ **insertContainer**(`type?`, `at?`): `void`

Will insert a container at the given location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type?` | `string` | optional, the container type, otherwise will insert a standard container this is caret based unless you specify your own custom range note that calling this function will cause a refocus |
| `at?` | `Path` \| `Range` | an optional range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:644](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L644)

___

### insertCustom

▸ **insertCustom**(`type`, `at?`): `void`

Inserts a custom element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the custom type |
| `at?` | `Path` \| `Range` | an optional range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:652](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L652)

___

### insertElement

▸ **insertElement**(`element`, `at?`): `void`

Inserts an element at the given position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element to insert |
| `at?` | `Path` \| `Range` | optional range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:685](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L685)

___

### insertFile

▸ **insertFile**(`file`, `at?`): `void`

Will insert a file based on the information given

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file to insert |
| `at?` | `Path` \| `Range` | an optional range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:634](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L634)

___

### insertImage

▸ **insertImage**(`file`, `standalone`, `at?`): `void`

Will insert an image based on a given file that has
been taken as an input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file |
| `standalone` | `boolean` | whether to make it a standalone image |
| `at?` | `Path` \| `Range` | an optional range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:621](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L621)

___

### insertTemplateHTML

▸ **insertTemplateHTML**(`label`, `value`, `at?`): `void`

Inserts a template html fragment
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to use for the template html |
| `value` | `string` | the actual value for the template html to be used off the context |
| `at?` | `Path` \| `Range` | an optional range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:670](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L670)

___

### insertTemplateText

▸ **insertTemplateText**(`label`, `value`, `at?`): `void`

Inserts a template text
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to use for the template text |
| `value` | `string` | the actual value for the template text to be used off the context |
| `at?` | `Path` \| `Range` | an optional range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:661](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L661)

___

### insertUIHandledContainer

▸ **insertUIHandledContainer**(`type`, `value`, `args`, `at?`): `void`

Inserts an UI handled container

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the type of the container |
| `value` | `string` | the ui handler identifier in the context |
| `args` | `Object` | the args for the ui handler |
| `at?` | `Path` \| `Range` | an optional range to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:678](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L678)

___

### insertVideo

▸ **insertVideo**(`url`, `at?`): `boolean`

Will insert a video given the information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url of the video, only youtube and vimeo supported as origin |
| `at?` | `Path` \| `Range` | an optional range to insert at |

#### Returns

`boolean`

a boolean true if the video was properly inserted, false if the video url was invalid

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:628](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L628)

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

[client/fast-prototyping/components/slate/index.tsx:592](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L592)

___

### releaseBlur

▸ **releaseBlur**(): `void`

releases the blur
you should use this on the onmouseup on buttons that
are outside the selected area
not using this function should not have any effect

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:817](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L817)

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

[client/fast-prototyping/components/slate/index.tsx:587](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L587)

___

### set

▸ **set**(`args`, `anchor`): `void`

does an arbitrary update of arbitrary arguments off the current
element value, this function does not refocus and it's silent and meant
for indirect usage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `any` | the arbitrary arguments (partial value) |
| `anchor` | `Path` | the anchor where the update should take place (should point at an element) |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:743](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L743)

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

[client/fast-prototyping/components/slate/index.tsx:802](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L802)

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

[client/fast-prototyping/components/slate/index.tsx:762](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L762)

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

[client/fast-prototyping/components/slate/index.tsx:768](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L768)

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

[client/fast-prototyping/components/slate/index.tsx:790](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L790)

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

[client/fast-prototyping/components/slate/index.tsx:756](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L756)

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

[client/fast-prototyping/components/slate/index.tsx:774](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L774)

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

[client/fast-prototyping/components/slate/index.tsx:796](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L796)

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

[client/fast-prototyping/components/slate/index.tsx:750](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L750)

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

[client/fast-prototyping/components/slate/index.tsx:780](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L780)

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

[client/fast-prototyping/components/slate/index.tsx:784](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L784)

___

### softBlur

▸ **softBlur**(): `void`

Performs a soft blur event

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:825](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L825)

___

### toggleLink

▸ **toggleLink**(`url`, `templateValue`, `at?`): `boolean`

Makes a link out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `templateValue` | `string` |
| `at?` | `Path` \| `Range` |

#### Returns

`boolean`

a boolean specifying whether the toggling was succesful or it failed
for some reason, eg. invalid link, links are not supported

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:712](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L712)

___

### toggleList

▸ **toggleList**(`type`, `at?`): `void`

Makes a list out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"bulleted"`` \| ``"numbered"`` |
| `at?` | `Path` \| `Range` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:704](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L704)

___

### toggleQuote

▸ **toggleQuote**(`at?`): `void`

Makes a quote out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type |
| :------ | :------ |
| `at?` | `Path` \| `Range` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:692](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L692)

___

### toggleTitle

▸ **toggleTitle**(`type`, `at?`): `void`

Makes a title out of the current element
this is caret based unless you specify your own custom range
note that calling this function will cause a refocus

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"h1"`` \| ``"h2"`` \| ``"h3"`` \| ``"h4"`` \| ``"h5"`` \| ``"h6"`` |
| `at?` | `Path` \| `Range` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:698](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L698)
