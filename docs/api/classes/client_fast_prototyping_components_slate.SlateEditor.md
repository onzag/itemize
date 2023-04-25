[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / SlateEditor

# Class: SlateEditor

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).SlateEditor

Behold the component that does a lot of the magic
for rich text handling, this component does not have any definition
on how it is supposed to render things like the toolbar and what functions
such provides in order to be able to construct the rich text
and it's the job of the developer to decide how to do so, by default there
is a wrapper that is used for fast prototyping, but it's a rather generic
one, and developers using itemize should use this slate editor class and are
commended to, because it's easy, but they should prefer to use their own
customized wrapper to provide the functionality they want and how they want it
so they can define even their own custom ui-handler based elements, such as, eg.
math components

it is recommended to use your own custom renderer and import this class, copying off
the PropertyEntryText because it will not include any material UI fast prototyping resources
otherwise if you are also using material UI as included in itemize you might use
Wrapper and wrapperArgs in the rendererArgs but this is rather advanced, the most
advanced stuff off itemize and one that should be simplified

## Hierarchy

- `Component`<`ISlateEditorProps`, `ISlateEditorState`\>

  ↳ **`SlateEditor`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_slate.SlateEditor.md#constructor)

### Properties

- [context](client_fast_prototyping_components_slate.SlateEditor.md#context)
- [editableRef](client_fast_prototyping_components_slate.SlateEditor.md#editableref)
- [editor](client_fast_prototyping_components_slate.SlateEditor.md#editor)
- [isInNormalization](client_fast_prototyping_components_slate.SlateEditor.md#isinnormalization)
- [isUnmounted](client_fast_prototyping_components_slate.SlateEditor.md#isunmounted)
- [lastChangeWasSelectedDelete](client_fast_prototyping_components_slate.SlateEditor.md#lastchangewasselecteddelete)
- [originalInsertData](client_fast_prototyping_components_slate.SlateEditor.md#originalinsertdata)
- [originalSetFragmentData](client_fast_prototyping_components_slate.SlateEditor.md#originalsetfragmentdata)
- [preventNormalize](client_fast_prototyping_components_slate.SlateEditor.md#preventnormalize)
- [props](client_fast_prototyping_components_slate.SlateEditor.md#props)
- [refs](client_fast_prototyping_components_slate.SlateEditor.md#refs)
- [state](client_fast_prototyping_components_slate.SlateEditor.md#state)
- [updateTimeout](client_fast_prototyping_components_slate.SlateEditor.md#updatetimeout)
- [contextType](client_fast_prototyping_components_slate.SlateEditor.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_slate.SlateEditor.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_slate.SlateEditor.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_slate.SlateEditor.md#unsafe_componentwillupdate)
- [\_getVideoSrcOriginAndStatus](client_fast_prototyping_components_slate.SlateEditor.md#_getvideosrcoriginandstatus)
- [actuallyRenderElement](client_fast_prototyping_components_slate.SlateEditor.md#actuallyrenderelement)
- [availableFilteringFunction](client_fast_prototyping_components_slate.SlateEditor.md#availablefilteringfunction)
- [breakList](client_fast_prototyping_components_slate.SlateEditor.md#breaklist)
- [calculateAnchors](client_fast_prototyping_components_slate.SlateEditor.md#calculateanchors)
- [canToggleTable](client_fast_prototyping_components_slate.SlateEditor.md#cantoggletable)
- [cloneElementAt](client_fast_prototyping_components_slate.SlateEditor.md#cloneelementat)
- [componentDidCatch](client_fast_prototyping_components_slate.SlateEditor.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_slate.SlateEditor.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_slate.SlateEditor.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_slate.SlateEditor.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_slate.SlateEditor.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_slate.SlateEditor.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_slate.SlateEditor.md#componentwillupdate)
- [deleteBackward](client_fast_prototyping_components_slate.SlateEditor.md#deletebackward)
- [deleteForward](client_fast_prototyping_components_slate.SlateEditor.md#deleteforward)
- [deleteNodeAt](client_fast_prototyping_components_slate.SlateEditor.md#deletenodeat)
- [deletePath](client_fast_prototyping_components_slate.SlateEditor.md#deletepath)
- [deleteSelectedNode](client_fast_prototyping_components_slate.SlateEditor.md#deleteselectednode)
- [deleteTableColumn](client_fast_prototyping_components_slate.SlateEditor.md#deletetablecolumn)
- [deleteTableRow](client_fast_prototyping_components_slate.SlateEditor.md#deletetablerow)
- [findAndAppendFilesToDataTransfer](client_fast_prototyping_components_slate.SlateEditor.md#findandappendfilestodatatransfer)
- [findAndInsertFilesFromDataTransfer](client_fast_prototyping_components_slate.SlateEditor.md#findandinsertfilesfromdatatransfer)
- [focus](client_fast_prototyping_components_slate.SlateEditor.md#focus)
- [focusAt](client_fast_prototyping_components_slate.SlateEditor.md#focusat)
- [forceBlur](client_fast_prototyping_components_slate.SlateEditor.md#forceblur)
- [forceFocus](client_fast_prototyping_components_slate.SlateEditor.md#forcefocus)
- [forceUpdate](client_fast_prototyping_components_slate.SlateEditor.md#forceupdate)
- [formatToggle](client_fast_prototyping_components_slate.SlateEditor.md#formattoggle)
- [getContextFor](client_fast_prototyping_components_slate.SlateEditor.md#getcontextfor)
- [getDataURI](client_fast_prototyping_components_slate.SlateEditor.md#getdatauri)
- [getFallbackInsertPath](client_fast_prototyping_components_slate.SlateEditor.md#getfallbackinsertpath)
- [getFeatureSupport](client_fast_prototyping_components_slate.SlateEditor.md#getfeaturesupport)
- [getHelpers](client_fast_prototyping_components_slate.SlateEditor.md#gethelpers)
- [getNodeAt](client_fast_prototyping_components_slate.SlateEditor.md#getnodeat)
- [getPreviousSelectedElementAnchor](client_fast_prototyping_components_slate.SlateEditor.md#getpreviousselectedelementanchor)
- [getPreviousTextAnchor](client_fast_prototyping_components_slate.SlateEditor.md#getprevioustextanchor)
- [getRootContext](client_fast_prototyping_components_slate.SlateEditor.md#getrootcontext)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_slate.SlateEditor.md#getsnapshotbeforeupdate)
- [getState](client_fast_prototyping_components_slate.SlateEditor.md#getstate)
- [hardBlur](client_fast_prototyping_components_slate.SlateEditor.md#hardblur)
- [insertBreak](client_fast_prototyping_components_slate.SlateEditor.md#insertbreak)
- [insertContainer](client_fast_prototyping_components_slate.SlateEditor.md#insertcontainer)
- [insertCustom](client_fast_prototyping_components_slate.SlateEditor.md#insertcustom)
- [insertData](client_fast_prototyping_components_slate.SlateEditor.md#insertdata)
- [insertElement](client_fast_prototyping_components_slate.SlateEditor.md#insertelement)
- [insertFile](client_fast_prototyping_components_slate.SlateEditor.md#insertfile)
- [insertImage](client_fast_prototyping_components_slate.SlateEditor.md#insertimage)
- [insertList](client_fast_prototyping_components_slate.SlateEditor.md#insertlist)
- [insertNodeAt](client_fast_prototyping_components_slate.SlateEditor.md#insertnodeat)
- [insertSuperbreak](client_fast_prototyping_components_slate.SlateEditor.md#insertsuperbreak)
- [insertTable](client_fast_prototyping_components_slate.SlateEditor.md#inserttable)
- [insertTableColumn](client_fast_prototyping_components_slate.SlateEditor.md#inserttablecolumn)
- [insertTableRow](client_fast_prototyping_components_slate.SlateEditor.md#inserttablerow)
- [insertTemplateHTML](client_fast_prototyping_components_slate.SlateEditor.md#inserttemplatehtml)
- [insertTemplateText](client_fast_prototyping_components_slate.SlateEditor.md#inserttemplatetext)
- [insertVideo](client_fast_prototyping_components_slate.SlateEditor.md#insertvideo)
- [isInline](client_fast_prototyping_components_slate.SlateEditor.md#isinline)
- [isVoid](client_fast_prototyping_components_slate.SlateEditor.md#isvoid)
- [mergeNodesAt](client_fast_prototyping_components_slate.SlateEditor.md#mergenodesat)
- [moveNodeAt](client_fast_prototyping_components_slate.SlateEditor.md#movenodeat)
- [movePaths](client_fast_prototyping_components_slate.SlateEditor.md#movepaths)
- [normalizeNode](client_fast_prototyping_components_slate.SlateEditor.md#normalizenode)
- [onBlurredChange](client_fast_prototyping_components_slate.SlateEditor.md#onblurredchange)
- [onChange](client_fast_prototyping_components_slate.SlateEditor.md#onchange)
- [onFocusedChange](client_fast_prototyping_components_slate.SlateEditor.md#onfocusedchange)
- [onKeyDown](client_fast_prototyping_components_slate.SlateEditor.md#onkeydown)
- [render](client_fast_prototyping_components_slate.SlateEditor.md#render)
- [renderElement](client_fast_prototyping_components_slate.SlateEditor.md#renderelement)
- [renderText](client_fast_prototyping_components_slate.SlateEditor.md#rendertext)
- [selectPath](client_fast_prototyping_components_slate.SlateEditor.md#selectpath)
- [set](client_fast_prototyping_components_slate.SlateEditor.md#set)
- [setAction](client_fast_prototyping_components_slate.SlateEditor.md#setaction)
- [setActiveStyle](client_fast_prototyping_components_slate.SlateEditor.md#setactivestyle)
- [setContext](client_fast_prototyping_components_slate.SlateEditor.md#setcontext)
- [setForEach](client_fast_prototyping_components_slate.SlateEditor.md#setforeach)
- [setFragmentData](client_fast_prototyping_components_slate.SlateEditor.md#setfragmentdata)
- [setHoverStyle](client_fast_prototyping_components_slate.SlateEditor.md#sethoverstyle)
- [setIfCondition](client_fast_prototyping_components_slate.SlateEditor.md#setifcondition)
- [setRichClasses](client_fast_prototyping_components_slate.SlateEditor.md#setrichclasses)
- [setState](client_fast_prototyping_components_slate.SlateEditor.md#setstate)
- [setStyle](client_fast_prototyping_components_slate.SlateEditor.md#setstyle)
- [setUIHandler](client_fast_prototyping_components_slate.SlateEditor.md#setuihandler)
- [setUIHandlerArg](client_fast_prototyping_components_slate.SlateEditor.md#setuihandlerarg)
- [setValue](client_fast_prototyping_components_slate.SlateEditor.md#setvalue)
- [shouldComponentUpdate](client_fast_prototyping_components_slate.SlateEditor.md#shouldcomponentupdate)
- [softBlur](client_fast_prototyping_components_slate.SlateEditor.md#softblur)
- [splitElementAndEscapeChildIntoParentAt](client_fast_prototyping_components_slate.SlateEditor.md#splitelementandescapechildintoparentat)
- [toggleLink](client_fast_prototyping_components_slate.SlateEditor.md#togglelink)
- [toggleQuote](client_fast_prototyping_components_slate.SlateEditor.md#togglequote)
- [toggleTable](client_fast_prototyping_components_slate.SlateEditor.md#toggletable)
- [toggleTitle](client_fast_prototyping_components_slate.SlateEditor.md#toggletitle)
- [updateLink](client_fast_prototyping_components_slate.SlateEditor.md#updatelink)
- [updateNodeAt](client_fast_prototyping_components_slate.SlateEditor.md#updatenodeat)
- [updateTemplateHTML](client_fast_prototyping_components_slate.SlateEditor.md#updatetemplatehtml)
- [updateTemplateText](client_fast_prototyping_components_slate.SlateEditor.md#updatetemplatetext)
- [updateVideo](client_fast_prototyping_components_slate.SlateEditor.md#updatevideo)
- [wrapNodeAt](client_fast_prototyping_components_slate.SlateEditor.md#wrapnodeat)
- [getDerivedStateFromProps](client_fast_prototyping_components_slate.SlateEditor.md#getderivedstatefromprops)

## Constructors

### constructor

• **new SlateEditor**(`props`)

Constructs a new instance of the slate editor component

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ISlateEditorProps` | the props |

#### Overrides

React.Component&lt;ISlateEditorProps, ISlateEditorState\&gt;.constructor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1254](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1254)

## Properties

### context

• **context**: `any`

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`see`** https://reactjs.org/docs/context.html

#### Inherited from

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### editableRef

• `Private` **editableRef**: `RefObject`<`HTMLDivElement`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1120](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1120)

___

### editor

• `Private` **editor**: `ItemizeEditor`

Represents the react editor element that is created
using slate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1095](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1095)

___

### isInNormalization

• `Private` **isInNormalization**: `boolean` = `false`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1101](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1101)

___

### isUnmounted

• `Private` **isUnmounted**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1118](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1118)

___

### lastChangeWasSelectedDelete

• `Private` **lastChangeWasSelectedDelete**: `boolean` = `false`

When a call to delete the current selected node is done, the selection anchors as they have been set
need to be removed and reset because otherwise they will be pointing to invalid nodes, this internal
flag allows to keep track of that so.

1. the delete function gets called, the flag gets set to true
2. slate is internally asked to delete at the selected and given path
3. this triggers the change function which will try to recalculate anchors, but the old anchors are invalid
4. because of the flag the change function knows the löast change was a selected delete and tells the anchor
recalculation not to reuse old anchors

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1114](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1114)

___

### originalInsertData

• `Private` **originalInsertData**: `any`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1117](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1117)

___

### originalSetFragmentData

• `Private` **originalSetFragmentData**: `any`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1116](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1116)

___

### preventNormalize

• `Private` **preventNormalize**: `boolean` = `false`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1102](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1102)

___

### props

• `Readonly` **props**: `Readonly`<`ISlateEditorProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

React.Component.props

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### state

• **state**: `Readonly`<`ISlateEditorState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### updateTimeout

• `Private` **updateTimeout**: `Timeout`

This is the update timeout that is used in order to run onChange events when
the user stops typing and not on every keystroke, because rich text is expensive

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1100](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1100)

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

**`see`** https://reactjs.org/docs/context.html#classcontexttype

#### Inherited from

React.Component.contextType

#### Defined in

node_modules/@types/react/index.d.ts:461

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:717

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`ISlateEditorProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:749

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`ISlateEditorProps`\> |
| `nextState` | `Readonly`<`ISlateEditorState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### \_getVideoSrcOriginAndStatus

▸ `Private` **_getVideoSrcOriginAndStatus**(`url`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `origin` | `string` |
| `src` | `string` |
| `status` | `boolean` |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3942](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3942)

___

### actuallyRenderElement

▸ **actuallyRenderElement**(`props`, `isSelected`, `selectionCriteria`, `isPrimary`): `ReactNode`

the render element function to be used in slate editor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `RenderElementProps` | the properties that slate provides to render the component |
| `isSelected` | `boolean` | - |
| `selectionCriteria` | ``"block"`` \| ``"inline"`` \| ``"superblock"`` | - |
| `isPrimary` | `boolean` | - |

#### Returns

`ReactNode`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2691](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2691)

___

### availableFilteringFunction

▸ `Private` **availableFilteringFunction**(`feature`, `featureAll`, `featureList`, `i18nLocation`): `IAvailableElementCSSClassName`[]

This is a helper function that is used in order to extract the available
classes that we have for usage within rich classes, container, and customs
considering what we have found in the all promise for all what is available
because there might be filters for them, and we need to find the labels and whatnot
of what we can actually use

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `string` | the feature we are searching for basically, supportsCustom, supportsRichClasses and supportsContainers that we decide on whether we support that feature |
| `featureAll` | `string` | the all name for the feature in the state and where it is located in the state that we are meant to await basically allCustoms, allRichClasses and allContainers |
| `featureList` | `string` | the list of supported that is given in the feature support of the property so basically supportedCustoms, supportedRichClasses and supportedContainers |
| `i18nLocation` | `string` | the location for the i18n data in the i18n root, basically custom, containers and rich |

#### Returns

`IAvailableElementCSSClassName`[]

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4645](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4645)

___

### breakList

▸ **breakList**(): `void`

Breaks the list based on the current selection
we must be in a list currently, this function is called
by the delete backwards functionality as well as the toggle
list one

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2067](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2067)

___

### calculateAnchors

▸ **calculateAnchors**(`anchor`, `value?`, `currentGivenSelectedNodeAnchor?`): `Object`

Calculates the anchors and the context based on a given value
(or the current value of the editor) and the selection nodes
that are currently selected (or it will override with the defaults)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `anchor` | `Path` | the anchor that is currently deemed to be selected at |
| `value?` | `Node`[] | the value that we are working with, if not provided it will take it from the state |
| `currentGivenSelectedNodeAnchor?` | `Path` | the selected node anchor, and text anchor if not provided it will use the default values based on the logic of the calculated anchors |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `allowsInsertElement` | (`element`: [`RichElement`](../modules/client_internal_text_serializer.md#richelement), `opts`: { `collapsed?`: `boolean` ; `extended?`: `boolean` ; `selected?`: `boolean`  }) => `boolean` |
| `allowsText` | `boolean` |
| `blockIsVoid` | `boolean` |
| `blockUIHandler` | [`ITemplateArgUIHandlerDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md) |
| `currentBlockElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentBlockElementAnchor` | `Path` |
| `currentInlineElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentInlineElementAnchor` | `Path` |
| `currentSelectedBlockContext` | [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) |
| `currentSelectedBlockElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentSelectedBlockElementAnchor` | `Path` |
| `currentSelectedElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentSelectedElementAnchor` | `Path` |
| `currentSelectedElementContext` | [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) |
| `currentSelectedInlineContext` | [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) |
| `currentSelectedInlineElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentSelectedInlineElementAnchor` | `Path` |
| `currentSelectedSuperBlockElementAnchors` | `Path`[] |
| `currentSelectedSuperBlockElements` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement)[] |
| `currentSelectedText` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) |
| `currentSelectedTextAnchor` | `Path` |
| `currentSelectedTopmostSuperBlockContext` | [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) |
| `currentSuperBlockElementAnchors` | `Path`[] |
| `currentSuperBlockElements` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement)[] |
| `currentText` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) |
| `currentTextAnchor` | `Path` |
| `inlineIsVoid` | `boolean` |
| `inlineUIHandler` | [`ITemplateArgUIHandlerDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md) |
| `previousSelectedElementAnchor` | `Path` |
| `previousTextAnchor` | `Path` |
| `superBlockUIHandler` | [`ITemplateArgUIHandlerDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md) |
| `topmostSuperblockIsVoid` | `boolean` |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2198](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2198)

___

### canToggleTable

▸ **canToggleTable**(`element`): `boolean`

Tells whether the current table row can
be toggled in the environment it is

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | ``"tfoot"`` \| ``"thead"`` |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3763](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3763)

___

### cloneElementAt

▸ `Private` **cloneElementAt**(`fromPath`, `toPath`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromPath` | `Path` |
| `toPath` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1771](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1771)

___

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `Promise`<`void`\>

Basic old school component did mount

#### Returns

`Promise`<`void`\>

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4704](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4704)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`ISlateEditorProps`\> |
| `prevState` | `Readonly`<`ISlateEditorState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4726](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4726)

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:703

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`ISlateEditorProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

Sometimes slate leaves a selection behind we need to unselect if such
is the case

#### Returns

`void`

#### Overrides

React.Component.componentWillUnmount

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4757](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4757)

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`ISlateEditorProps`\> |
| `nextState` | `Readonly`<`ISlateEditorState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### deleteBackward

▸ **deleteBackward**(`unit`): `void`

Override function to perform a standard delete
backwards event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | ``"block"`` \| ``"character"`` \| ``"word"`` \| ``"line"`` | the unit we are dealing with |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2017](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2017)

___

### deleteForward

▸ **deleteForward**(`unit`): `void`

Override function to perform a forward delete
backwards event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | ``"block"`` \| ``"character"`` \| ``"word"`` \| ``"line"`` | the unit we are dealing with |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1994](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1994)

___

### deleteNodeAt

▸ `Private` **deleteNodeAt**(`path`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1734](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1734)

___

### deletePath

▸ **deletePath**(`p`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3038](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3038)

___

### deleteSelectedNode

▸ **deleteSelectedNode**(): `void`

Deletes the selected node that has been selected, either the current default
or one that has been manually selected using selectPath

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3144](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3144)

___

### deleteTableColumn

▸ **deleteTableColumn**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3481](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3481)

___

### deleteTableRow

▸ **deleteTableRow**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3740](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3740)

___

### findAndAppendFilesToDataTransfer

▸ **findAndAppendFilesToDataTransfer**(`data`, `element`): `Promise`<`any`\>

Runs per each rich element that has just been copied to the clipboard

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the rich element we have just copied |

#### Returns

`Promise`<`any`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1659](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1659)

___

### findAndInsertFilesFromDataTransfer

▸ **findAndInsertFilesFromDataTransfer**(`data`, `element`): `Promise`<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\>

This function runs and prepares the tree that is to be inserted into the
pasted content

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer of the clipboard |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element we are currently processing |

#### Returns

`Promise`<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1436](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1436)

___

### focus

▸ **focus**(): `void`

A helper function to call react focus back into the editor

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3170](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3170)

___

### focusAt

▸ **focusAt**(`at`): `Promise`<`void`\>

An async function that is a bit of a hack to focus at a given
range, because of the way slate works it needs to be async

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `Path` \| `BaseRange` | the range to focus at |

#### Returns

`Promise`<`void`\>

a void promise once it's done

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3182](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3182)

___

### forceBlur

▸ **forceBlur**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4912](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4912)

___

### forceFocus

▸ **forceFocus**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4872](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4872)

___

### forceUpdate

▸ **forceUpdate**(`callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.forceUpdate

#### Defined in

node_modules/@types/react/index.d.ts:496

___

### formatToggle

▸ **formatToggle**(`key`): `void`

Formats the current text as bold

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"bold"`` \| ``"italic"`` \| ``"underline"`` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4593](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4593)

___

### getContextFor

▸ **getContextFor**(`n`, `level?`, `onlySwichingContext?`): [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

Provides the context a given node is sitting in

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `Node` \| `Path` | the node in question |
| `level?` | ``"final"`` \| ``"select-context"`` \| ``"select-loop"`` | - |
| `onlySwichingContext?` | `boolean` | provides the context only if it was set by the given node otherwise it will return null |

#### Returns

[`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2657](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2657)

___

### getDataURI

▸ **getDataURI**(`blob`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |

#### Returns

`Promise`<`string`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1635](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1635)

___

### getFallbackInsertPath

▸ **getFallbackInsertPath**(): `number`[]

Provides a fallback for insert when no insert region is found

#### Returns

`number`[]

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3205](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3205)

___

### getFeatureSupport

▸ **getFeatureSupport**(): [`IAccessibleFeatureSupportOptions`](../interfaces/client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

Provides the feature support information that is used by the editor
to know what it can and can't do

#### Returns

[`IAccessibleFeatureSupportOptions`](../interfaces/client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4846](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4846)

___

### getHelpers

▸ **getHelpers**(): [`IHelperFunctions`](../interfaces/client_fast_prototyping_components_slate.IHelperFunctions.md)

Provides the helpers that are used by the editor
to construct rich text data

#### Returns

[`IHelperFunctions`](../interfaces/client_fast_prototyping_components_slate.IHelperFunctions.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4771](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4771)

___

### getNodeAt

▸ `Private` **getNodeAt**(`path`): [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |

#### Returns

[`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1768](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1768)

___

### getPreviousSelectedElementAnchor

▸ **getPreviousSelectedElementAnchor**(): `Path`

#### Returns

`Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3132](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3132)

___

### getPreviousTextAnchor

▸ **getPreviousTextAnchor**(): `Path`

#### Returns

`Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3136](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3136)

___

### getRootContext

▸ **getRootContext**(): [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Returns

[`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2674](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2674)

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`ISlateEditorProps`\> |
| `prevState` | `Readonly`<`ISlateEditorState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### getState

▸ **getState**(): `Readonly`<`ISlateEditorState`\>

#### Returns

`Readonly`<`ISlateEditorState`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4749](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4749)

___

### hardBlur

▸ **hardBlur**(): `void`

Performs a hard blur event and the paths are cleared out

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3004](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3004)

___

### insertBreak

▸ **insertBreak**(): `void`

Override for the default editor insert break function

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1884](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1884)

___

### insertContainer

▸ **insertContainer**(`type?`): `Promise`<`void`\>

Will insert a container at the given location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type?` | `string` | optional, the container type, otherwise will insert a standard container |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4137](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4137)

___

### insertCustom

▸ **insertCustom**(`type`): `Promise`<`void`\>

Inserts a custom element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the type for the custom element |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4173](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4173)

___

### insertData

▸ **insertData**(`data`): `Promise`<`void`\>

This function runs when we are inserting using the slate clipboard

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1551](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1551)

___

### insertElement

▸ **insertElement**(`element`): `void`

Inserts an element at a given position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4547](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4547)

___

### insertFile

▸ **insertFile**(`file`): `Promise`<`void`\>

Will insert a file based on the information given it uses
the standard on insert file function in order to perfom it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file to insert |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4089](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4089)

___

### insertImage

▸ **insertImage**(`file`, `standalone`): `Promise`<`void`\>

Will insert an image based on a given file that has
been taken as an input

Note that there is an insert file function that should be given
as prop and that's what this function will call, if an error occurred
it should have been fed as a prop as well, so this function always
returns a void promise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file |
| `standalone` | `boolean` | whether to make it a standalone image |

#### Returns

`Promise`<`void`\>

a void promise once it's done

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3234](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3234)

___

### insertList

▸ **insertList**(`type`): `Promise`<`void`\>

Makes a list out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"bulleted"`` \| ``"numbered"`` | the type of the list that is to be toggled, either bulleted or number |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4271](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4271)

___

### insertNodeAt

▸ `Private` **insertNodeAt**(`path`, `node`, `targetIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `node` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) |
| `targetIndex` | `number` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1739](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1739)

___

### insertSuperbreak

▸ **insertSuperbreak**(`at?`, `reverse?`): `void`

Inserts a superblock break, since you might not be able to escape
superblocks, eg. such as a single container, you will use a superblock break
alt+enter in order to escape the superblock

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at?` | `Path` | the path of the superblock to insert a break at |
| `reverse?` | `boolean` | whether to insert it before or after, by default it will be after, use this flag for before |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2103](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2103)

___

### insertTable

▸ **insertTable**(`type?`): `void`

Inserts a table at the given location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type?` | `string` | the type of the table |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3367](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3367)

___

### insertTableColumn

▸ **insertTableColumn**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3400](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3400)

___

### insertTableRow

▸ **insertTableRow**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3528](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3528)

___

### insertTemplateHTML

▸ **insertTemplateHTML**(`label`, `value`): `void`

Will insert a bit of template html that is used for templating purposes, work similar
to template text, except it uses html content instead to replace the inner html

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to be given to the element to be added |
| `value` | `string` | the value that will be used from the context |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3337](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3337)

___

### insertTemplateText

▸ **insertTemplateText**(`label`, `value`): `void`

Will insert a bit of template text that is used for templating purposes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to give it |
| `value` | `string` | the value that it gets |

#### Returns

`void`

a void promise

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3294](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3294)

___

### insertVideo

▸ **insertVideo**(`url`): `boolean`

Will insert a video given the information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url of the video |

#### Returns

`boolean`

a boolean on whether it succeeded

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4049](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4049)

___

### isInline

▸ **isInline**(`element`): `boolean`

Override for the default editor inline function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element that is to be considered |

#### Returns

`boolean`

a boolean on whether it represents an inline element

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1868](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1868)

___

### isVoid

▸ **isVoid**(`element`): `boolean`

Override for the default editor void function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element that is to be considered |

#### Returns

`boolean`

a boolean on whether it represents a void element

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1877](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1877)

___

### mergeNodesAt

▸ `Private` **mergeNodesAt**(`basePath`, `referencePath`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `basePath` | `Path` |
| `referencePath` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1744](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1744)

___

### moveNodeAt

▸ `Private` **moveNodeAt**(`fromPath`, `toPath`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromPath` | `Path` |
| `toPath` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1782](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1782)

___

### movePaths

▸ **movePaths**(`from`, `to`): `void`

Allows to move between two paths as it moves elements to one place to another

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `Path` |
| `to` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3085](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3085)

___

### normalizeNode

▸ **normalizeNode**(`entry`): `void`

Normalization funciton that overrides the normalization
of the standard editor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entry` | `NodeEntry`<`Node`\> | the entry we are normalizing |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1794](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1794)

___

### onBlurredChange

▸ **onBlurredChange**(`value?`): `void`

Triggers on an on change whent he field is blurred

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value?` | `Node`[] | the value that we are working with |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2512](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2512)

___

### onChange

▸ **onChange**(`newValue`): `void`

The change function that is called via slate when a change occurs
this function hits every time on every change of the rich text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newValue` | `Node`[] | the new value of the children of the document |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2973](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2973)

___

### onFocusedChange

▸ **onFocusedChange**(`anchor`, `value`): `void`

Triggers on change when the field is focused
and has changed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `anchor` | `Path` | the anchor that we are at |
| `value` | `Node`[] | the value that we got |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2490](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2490)

___

### onKeyDown

▸ **onKeyDown**(`e`): `void`

Triggers on the keydown of the slate editor itself

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `KeyboardEvent`<`Element`\> | the event |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4690](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4690)

___

### render

▸ **render**(): `Element`

Render function

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4925](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4925)

___

### renderElement

▸ **renderElement**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `RenderElementProps` |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2678](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2678)

___

### renderText

▸ **renderText**(`props`): `any`

the function that is called by slate to render text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `RenderLeafProps` | the properties given by slate to render a text leaf |

#### Returns

`any`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2948](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2948)

___

### selectPath

▸ **selectPath**(`p`): `void`

given a node path, that should represent either an element or a text node
this allows such a path to be selected and be marked into the selection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p` | `Path` | the path to select |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3066](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3066)

___

### set

▸ **set**(`args`, `anchor`): `void`

Abitrary update, does an arbitrary update for an element or node
at the given path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `any` | an object to update that should be partial of the element rich properties |
| `anchor` | `Path` | the node anchor to update |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4413](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4413)

___

### setAction

▸ **setAction**(`key`, `value`, `anchor`): `void`

Sets a given action for usage within templating
as an event listener

Note that using this function is risky if the structure to provide a given
key is not understood properly, keys should be valid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key for the action, should be something like, click, mouseenter, etc... |
| `value` | `string` | the value for the property |
| `anchor` | `Path` | the anchor for the element that is to be assigned the listener to turn interactive |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4487](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4487)

___

### setActiveStyle

▸ **setActiveStyle**(`style`, `anchor`): `void`

Sets the active style for the element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `string` | the style to be set, this should be a style string |
| `anchor` | `Path` | the element anchor to update |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4453](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4453)

___

### setContext

▸ **setContext**(`value`, `anchor`): `void`

Sets the context key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the value for the new context key |
| `anchor` | `Path` | the anchor where to set the context key at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4561](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4561)

___

### setForEach

▸ **setForEach**(`value`, `anchor`): `void`

Sets the for-each loop key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the value for the new context key |
| `anchor` | `Path` | the anchor where to set the context key at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4584](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4584)

___

### setFragmentData

▸ **setFragmentData**(`data`): `Promise`<`void`\>

This function runs when we are preparing the slate clipboard

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1696](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1696)

___

### setHoverStyle

▸ **setHoverStyle**(`style`, `anchor`): `void`

Sets the template hover style for the element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `string` | the style to be set, this should be a style string |
| `anchor` | `Path` | the element anchor to update |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4439](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4439)

___

### setIfCondition

▸ **setIfCondition**(`value`, `anchor`): `void`

Sets the context key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the value for the new if condition key |
| `anchor` | `Path` | the anchor where to set the context key at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4572](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4572)

___

### setRichClasses

▸ **setRichClasses**(`classes`, `anchor`): `void`

Sets the rich classes of the element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `classes` | `string`[] | an array of string that represent the rich classes |
| `anchor` | `Path` | the element anchor |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4467](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4467)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ISlateEditorState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `ISlateEditorState` \| (`prevState`: `Readonly`<`ISlateEditorState`\>, `props`: `Readonly`<`ISlateEditorProps`\>) => `ISlateEditorState` \| `Pick`<`ISlateEditorState`, `K`\> \| `Pick`<`ISlateEditorState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### setStyle

▸ **setStyle**(`style`, `anchor`): `void`

Sets the current style for the element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `string` | the style to be set, this should be a style string |
| `anchor` | `Path` | the element anchor to update |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4425](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4425)

___

### setUIHandler

▸ **setUIHandler**(`value`, `args`, `anchor`): `void`

Sets an UI handler to a given element so that it is ui handled

This is an avanced option for ui handling

normally you would use this function for updating an already inserted
ui handled component

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the value for the ui handler that should be taken out of the context |
| `args` | `Object` | the args for the ui handler |
| `anchor` | `Path` | the anchor where to insert at |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4508](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4508)

___

### setUIHandlerArg

▸ **setUIHandlerArg**(`key`, `value`, `anchor`): `void`

Sets ui handler args to a given element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the ui handler arg key |
| `value` | `string` | the ui handler arg value |
| `anchor` | `Path` | the anchor in question |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4524](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4524)

___

### setValue

▸ **setValue**(`v`): `void`

Sets the value off the rich text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `any` | the value to set |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2600](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2600)

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`): `boolean`

An optimization so that the component updates only when it's necessary

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nextProps` | `ISlateEditorProps` | the next properties |
| `nextState` | `ISlateEditorState` | the next state |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2556](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L2556)

___

### softBlur

▸ **softBlur**(): `void`

Performs a soft blur event

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3033](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3033)

___

### splitElementAndEscapeChildIntoParentAt

▸ `Private` **splitElementAndEscapeChildIntoParentAt**(`path`, `escapingChildIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `escapingChildIndex` | `number` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1756](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1756)

___

### toggleLink

▸ **toggleLink**(`url`, `tvalue`): `boolean`

Makes a link out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url that we are using (null if using tvalue) |
| `tvalue` | `string` | the template value to use (null if providing url) |

#### Returns

`boolean`

a boolean if the link was valid and toggleLink

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4343](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4343)

___

### toggleQuote

▸ **toggleQuote**(): `Promise`<`void`\>

Makes a quote out of the current element

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4208](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4208)

___

### toggleTable

▸ **toggleTable**(`element`): `void`

Only works when the first element of the table
is selected, aka the first row

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | ``"tfoot"`` \| ``"thead"`` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3830](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3830)

___

### toggleTitle

▸ **toggleTitle**(`type`): `Promise`<`void`\>

Makes a title out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"h1"`` \| ``"h2"`` \| ``"h3"`` \| ``"h4"`` \| ``"h5"`` \| ``"h6"`` | the title type |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4239](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4239)

___

### updateLink

▸ **updateLink**(`url`, `tvalue`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `tvalue` | `string` |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4294](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4294)

___

### updateNodeAt

▸ `Private` **updateNodeAt**(`path`, `v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `v` | `Partial`<[`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md)\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1729](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1729)

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

[client/fast-prototyping/components/slate/index.tsx:3318](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3318)

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

[client/fast-prototyping/components/slate/index.tsx:3275](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L3275)

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

[client/fast-prototyping/components/slate/index.tsx:4024](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L4024)

___

### wrapNodeAt

▸ `Private` **wrapNodeAt**(`path`, `wrappers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `wrappers` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement)[] |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1761](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1761)

___

### getDerivedStateFromProps

▸ `Static` **getDerivedStateFromProps**(`props`, `state`): `Partial`<`ISlateEditorState`\>

The standard derived state function is used in order to set the state in an effective way
it is used because the behaviour of this editor is rather complex

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ISlateEditorProps` | the current props |
| `state` | `ISlateEditorState` | the current state |

#### Returns

`Partial`<`ISlateEditorState`\>

a partial of the new state or null

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1129](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/index.tsx#L1129)
