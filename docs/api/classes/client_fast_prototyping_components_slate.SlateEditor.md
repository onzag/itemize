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

- `Component`\<`ISlateEditorProps`, `ISlateEditorState`\>

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
- [wrapperRef](client_fast_prototyping_components_slate.SlateEditor.md#wrapperref)
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
- [selectiveHardBlurIfHasSelectedElement](client_fast_prototyping_components_slate.SlateEditor.md#selectivehardblurifhasselectedelement)
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

• **new SlateEditor**(`props`): [`SlateEditor`](client_fast_prototyping_components_slate.SlateEditor.md)

Constructs a new instance of the slate editor component

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ISlateEditorProps` | the props |

#### Returns

[`SlateEditor`](client_fast_prototyping_components_slate.SlateEditor.md)

#### Overrides

React.Component\&lt;ISlateEditorProps, ISlateEditorState\&gt;.constructor

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1276](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1276)

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

**`See`**

https://react.dev/reference/react/Component#context

#### Inherited from

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:473

___

### editableRef

• `Private` **editableRef**: `RefObject`\<`HTMLDivElement`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1140](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1140)

___

### editor

• `Private` **editor**: `ItemizeEditor`

Represents the react editor element that is created
using slate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1115](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1115)

___

### isInNormalization

• `Private` **isInNormalization**: `boolean` = `false`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1121](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1121)

___

### isUnmounted

• `Private` **isUnmounted**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1138](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1138)

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

[client/fast-prototyping/components/slate/index.tsx:1134](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1134)

___

### originalInsertData

• `Private` **originalInsertData**: `any`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1137](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1137)

___

### originalSetFragmentData

• `Private` **originalSetFragmentData**: `any`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1136](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1136)

___

### preventNormalize

• `Private` **preventNormalize**: `boolean` = `false`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1122](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1122)

___

### props

• `Readonly` **props**: `Readonly`\<`ISlateEditorProps`\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

#### Inherited from

React.Component.props

#### Defined in

node_modules/@types/react/index.d.ts:498

___

### refs

• **refs**: `Object`

**`Deprecated`**

https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### state

• **state**: `Readonly`\<`ISlateEditorState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:499

___

### updateTimeout

• `Private` **updateTimeout**: `Timeout`

This is the update timeout that is used in order to run onChange events when
the user stops typing and not on every keystroke, because rich text is expensive

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1120](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1120)

___

### wrapperRef

• `Private` **wrapperRef**: `RefObject`\<`any`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1141](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1141)

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`\<`any`\>

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

**`See`**

https://react.dev/reference/react/Component#static-contexttype

#### Inherited from

React.Component.contextType

#### Defined in

node_modules/@types/react/index.d.ts:455

## Methods

### UNSAFE\_componentWillMount

▸ **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Returns

`void`

**`Deprecated`**

16.3, use componentDidMount or the constructor instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:711

___

### UNSAFE\_componentWillReceiveProps

▸ **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<`ISlateEditorProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:743

___

### UNSAFE\_componentWillUpdate

▸ **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<`ISlateEditorProps`\> |
| `nextState` | `Readonly`\<`ISlateEditorState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:771

___

### \_getVideoSrcOriginAndStatus

▸ **_getVideoSrcOriginAndStatus**(`url`): `Object`

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

[client/fast-prototyping/components/slate/index.tsx:4039](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4039)

___

### actuallyRenderElement

▸ **actuallyRenderElement**(`props`, `isSelected`, `selectionCriteria`, `isPrimary`): `ReactNode`

the render element function to be used in slate editor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `RenderElementProps` | the properties that slate provides to render the component |
| `isSelected` | `boolean` | - |
| `selectionCriteria` | ``"inline"`` \| ``"block"`` \| ``"superblock"`` | - |
| `isPrimary` | `boolean` | - |

#### Returns

`ReactNode`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2735](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2735)

___

### availableFilteringFunction

▸ **availableFilteringFunction**(`feature`, `featureAll`, `featureList`, `i18nLocation`): `IAvailableElementCSSClassName`[]

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

[client/fast-prototyping/components/slate/index.tsx:4742](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4742)

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

[client/fast-prototyping/components/slate/index.tsx:2097](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2097)

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
| `allowsInsertElement` | (`element`: [`RichElement`](../modules/client_internal_text_serializer.md#richelement), `opts`: \{ `collapsed?`: `boolean` ; `extended?`: `boolean` ; `selected?`: `boolean`  }) => `boolean` |
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

[client/fast-prototyping/components/slate/index.tsx:2228](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2228)

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

[client/fast-prototyping/components/slate/index.tsx:3860](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3860)

___

### cloneElementAt

▸ **cloneElementAt**(`fromPath`, `toPath`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromPath` | `Path` |
| `toPath` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1801](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1801)

___

### componentDidCatch

▸ **componentDidCatch**(`error`, `errorInfo`): `void`

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

node_modules/@types/react/index.d.ts:640

___

### componentDidMount

▸ **componentDidMount**(): `Promise`\<`void`\>

Basic old school component did mount

#### Returns

`Promise`\<`void`\>

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4801](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4801)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<`ISlateEditorProps`\> |
| `prevState` | `Readonly`\<`ISlateEditorState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4826](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4826)

___

### componentWillMount

▸ **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Returns

`void`

**`Deprecated`**

16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:697

___

### componentWillReceiveProps

▸ **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<`ISlateEditorProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:726

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

[client/fast-prototyping/components/slate/index.tsx:4857](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4857)

___

### componentWillUpdate

▸ **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<`ISlateEditorProps`\> |
| `nextState` | `Readonly`\<`ISlateEditorState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:756

___

### deleteBackward

▸ **deleteBackward**(`unit`): `void`

Override function to perform a standard delete
backwards event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | ``"word"`` \| ``"line"`` \| ``"block"`` \| ``"character"`` | the unit we are dealing with |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2047](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2047)

___

### deleteForward

▸ **deleteForward**(`unit`): `void`

Override function to perform a forward delete
backwards event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | ``"word"`` \| ``"line"`` \| ``"block"`` \| ``"character"`` | the unit we are dealing with |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2024](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2024)

___

### deleteNodeAt

▸ **deleteNodeAt**(`path`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1764](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1764)

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

[client/fast-prototyping/components/slate/index.tsx:3135](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3135)

___

### deleteSelectedNode

▸ **deleteSelectedNode**(): `void`

Deletes the selected node that has been selected, either the current default
or one that has been manually selected using selectPath

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3241](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3241)

___

### deleteTableColumn

▸ **deleteTableColumn**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3578](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3578)

___

### deleteTableRow

▸ **deleteTableRow**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3837](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3837)

___

### findAndAppendFilesToDataTransfer

▸ **findAndAppendFilesToDataTransfer**(`data`, `element`): `Promise`\<`any`\>

Runs per each rich element that has just been copied to the clipboard

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the rich element we have just copied |

#### Returns

`Promise`\<`any`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1689](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1689)

___

### findAndInsertFilesFromDataTransfer

▸ **findAndInsertFilesFromDataTransfer**(`data`, `element`): `Promise`\<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\>

This function runs and prepares the tree that is to be inserted into the
pasted content

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer of the clipboard |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element we are currently processing |

#### Returns

`Promise`\<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1459](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1459)

___

### focus

▸ **focus**(): `void`

A helper function to call react focus back into the editor

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3267](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3267)

___

### focusAt

▸ **focusAt**(`at`): `Promise`\<`void`\>

An async function that is a bit of a hack to focus at a given
range, because of the way slate works it needs to be async

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `Path` \| `BaseRange` | the range to focus at |

#### Returns

`Promise`\<`void`\>

a void promise once it's done

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3279](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3279)

___

### forceBlur

▸ **forceBlur**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:5013](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L5013)

___

### forceFocus

▸ **forceFocus**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4972](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4972)

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

node_modules/@types/react/index.d.ts:490

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

[client/fast-prototyping/components/slate/index.tsx:4690](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4690)

___

### getContextFor

▸ **getContextFor**(`n`, `level?`, `onlySwichingContext?`): [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

Provides the context a given node is sitting in

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `Path` \| `Node` | the node in question |
| `level?` | ``"final"`` \| ``"select-context"`` \| ``"select-loop"`` | - |
| `onlySwichingContext?` | `boolean` | provides the context only if it was set by the given node otherwise it will return null |

#### Returns

[`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2701](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2701)

___

### getDataURI

▸ **getDataURI**(`blob`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1665](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1665)

___

### getFallbackInsertPath

▸ **getFallbackInsertPath**(): `number`[]

Provides a fallback for insert when no insert region is found

#### Returns

`number`[]

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3302](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3302)

___

### getFeatureSupport

▸ **getFeatureSupport**(): [`IAccessibleFeatureSupportOptions`](../interfaces/client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

Provides the feature support information that is used by the editor
to know what it can and can't do

#### Returns

[`IAccessibleFeatureSupportOptions`](../interfaces/client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4946](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4946)

___

### getHelpers

▸ **getHelpers**(): [`IHelperFunctions`](../interfaces/client_fast_prototyping_components_slate.IHelperFunctions.md)

Provides the helpers that are used by the editor
to construct rich text data

#### Returns

[`IHelperFunctions`](../interfaces/client_fast_prototyping_components_slate.IHelperFunctions.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4871](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4871)

___

### getNodeAt

▸ **getNodeAt**(`path`): [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |

#### Returns

[`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1798](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1798)

___

### getPreviousSelectedElementAnchor

▸ **getPreviousSelectedElementAnchor**(): `Path`

#### Returns

`Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3229](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3229)

___

### getPreviousTextAnchor

▸ **getPreviousTextAnchor**(): `Path`

#### Returns

`Path`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3233](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3233)

___

### getRootContext

▸ **getRootContext**(): [`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Returns

[`ITemplateArgContextDefinition`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2718](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2718)

___

### getSnapshotBeforeUpdate

▸ **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<`ISlateEditorProps`\> |
| `prevState` | `Readonly`\<`ISlateEditorState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### getState

▸ **getState**(): `Readonly`\<`ISlateEditorState`\>

#### Returns

`Readonly`\<`ISlateEditorState`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4849](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4849)

___

### hardBlur

▸ **hardBlur**(): `void`

Performs a hard blur event and the paths are cleared out

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3091](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3091)

___

### insertBreak

▸ **insertBreak**(): `void`

Override for the default editor insert break function

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1914](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1914)

___

### insertContainer

▸ **insertContainer**(`type?`): `Promise`\<`void`\>

Will insert a container at the given location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type?` | `string` | optional, the container type, otherwise will insert a standard container |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4234](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4234)

___

### insertCustom

▸ **insertCustom**(`type`): `Promise`\<`void`\>

Inserts a custom element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the type for the custom element |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4270](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4270)

___

### insertData

▸ **insertData**(`data`): `Promise`\<`void`\>

This function runs when we are inserting using the slate clipboard

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1581](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1581)

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

[client/fast-prototyping/components/slate/index.tsx:4644](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4644)

___

### insertFile

▸ **insertFile**(`file`): `Promise`\<`void`\>

Will insert a file based on the information given it uses
the standard on insert file function in order to perfom it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file to insert |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4186](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4186)

___

### insertImage

▸ **insertImage**(`file`, `standalone`): `Promise`\<`void`\>

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

`Promise`\<`void`\>

a void promise once it's done

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3331](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3331)

___

### insertList

▸ **insertList**(`type`): `Promise`\<`void`\>

Makes a list out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"numbered"`` \| ``"bulleted"`` | the type of the list that is to be toggled, either bulleted or number |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4368](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4368)

___

### insertNodeAt

▸ **insertNodeAt**(`path`, `node`, `targetIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `node` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `targetIndex` | `number` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1769](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1769)

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

[client/fast-prototyping/components/slate/index.tsx:2133](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2133)

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

[client/fast-prototyping/components/slate/index.tsx:3464](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3464)

___

### insertTableColumn

▸ **insertTableColumn**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3497](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3497)

___

### insertTableRow

▸ **insertTableRow**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3625](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3625)

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

[client/fast-prototyping/components/slate/index.tsx:3434](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3434)

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

[client/fast-prototyping/components/slate/index.tsx:3391](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3391)

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

[client/fast-prototyping/components/slate/index.tsx:4146](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4146)

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

[client/fast-prototyping/components/slate/index.tsx:1898](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1898)

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

[client/fast-prototyping/components/slate/index.tsx:1907](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1907)

___

### mergeNodesAt

▸ **mergeNodesAt**(`basePath`, `referencePath`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `basePath` | `Path` |
| `referencePath` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1774](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1774)

___

### moveNodeAt

▸ **moveNodeAt**(`fromPath`, `toPath`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromPath` | `Path` |
| `toPath` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1812](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1812)

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

[client/fast-prototyping/components/slate/index.tsx:3182](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3182)

___

### normalizeNode

▸ **normalizeNode**(`entry`): `void`

Normalization funciton that overrides the normalization
of the standard editor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entry` | `NodeEntry`\<`Node`\> | the entry we are normalizing |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1824](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1824)

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

[client/fast-prototyping/components/slate/index.tsx:2542](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2542)

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

[client/fast-prototyping/components/slate/index.tsx:3060](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3060)

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

[client/fast-prototyping/components/slate/index.tsx:2520](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2520)

___

### onKeyDown

▸ **onKeyDown**(`e`): `void`

Triggers on the keydown of the slate editor itself

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `KeyboardEvent`\<`Element`\> | the event |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4787](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4787)

___

### render

▸ **render**(): `Element`

Render function

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:5026](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L5026)

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

[client/fast-prototyping/components/slate/index.tsx:2722](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2722)

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

[client/fast-prototyping/components/slate/index.tsx:3035](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3035)

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

[client/fast-prototyping/components/slate/index.tsx:3163](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3163)

___

### selectiveHardBlurIfHasSelectedElement

▸ **selectiveHardBlurIfHasSelectedElement**(`e`, `ele`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |
| `ele` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3117](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3117)

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

[client/fast-prototyping/components/slate/index.tsx:4510](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4510)

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

[client/fast-prototyping/components/slate/index.tsx:4584](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4584)

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

[client/fast-prototyping/components/slate/index.tsx:4550](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4550)

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

[client/fast-prototyping/components/slate/index.tsx:4658](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4658)

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

[client/fast-prototyping/components/slate/index.tsx:4681](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4681)

___

### setFragmentData

▸ **setFragmentData**(`data`): `Promise`\<`void`\>

This function runs when we are preparing the slate clipboard

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1726](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1726)

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

[client/fast-prototyping/components/slate/index.tsx:4536](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4536)

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

[client/fast-prototyping/components/slate/index.tsx:4669](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4669)

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

[client/fast-prototyping/components/slate/index.tsx:4564](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4564)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ISlateEditorState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `ISlateEditorState` \| (`prevState`: `Readonly`\<`ISlateEditorState`\>, `props`: `Readonly`\<`ISlateEditorProps`\>) => `ISlateEditorState` \| `Pick`\<`ISlateEditorState`, `K`\> \| `Pick`\<`ISlateEditorState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

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

[client/fast-prototyping/components/slate/index.tsx:4522](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4522)

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

[client/fast-prototyping/components/slate/index.tsx:4605](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4605)

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

[client/fast-prototyping/components/slate/index.tsx:4621](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4621)

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

[client/fast-prototyping/components/slate/index.tsx:2630](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2630)

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

[client/fast-prototyping/components/slate/index.tsx:2586](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L2586)

___

### softBlur

▸ **softBlur**(): `void`

Performs a soft blur event

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3130](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3130)

___

### splitElementAndEscapeChildIntoParentAt

▸ **splitElementAndEscapeChildIntoParentAt**(`path`, `escapingChildIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `escapingChildIndex` | `number` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1786](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1786)

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

[client/fast-prototyping/components/slate/index.tsx:4440](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4440)

___

### toggleQuote

▸ **toggleQuote**(): `Promise`\<`void`\>

Makes a quote out of the current element

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4305](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4305)

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

[client/fast-prototyping/components/slate/index.tsx:3927](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3927)

___

### toggleTitle

▸ **toggleTitle**(`type`): `Promise`\<`void`\>

Makes a title out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"h1"`` \| ``"h2"`` \| ``"h3"`` \| ``"h4"`` \| ``"h5"`` \| ``"h6"`` | the title type |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4336](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4336)

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

[client/fast-prototyping/components/slate/index.tsx:4391](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4391)

___

### updateNodeAt

▸ **updateNodeAt**(`path`, `v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `v` | `Partial`\<[`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](../modules/client_internal_text_serializer.md#richelement)\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1759](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1759)

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

[client/fast-prototyping/components/slate/index.tsx:3415](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3415)

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

[client/fast-prototyping/components/slate/index.tsx:3372](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L3372)

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

[client/fast-prototyping/components/slate/index.tsx:4121](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L4121)

___

### wrapNodeAt

▸ **wrapNodeAt**(`path`, `wrappers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `wrappers` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement)[] |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1791](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1791)

___

### getDerivedStateFromProps

▸ **getDerivedStateFromProps**(`props`, `state`): `Partial`\<`ISlateEditorState`\>

The standard derived state function is used in order to set the state in an effective way
it is used because the behaviour of this editor is rather complex

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ISlateEditorProps` | the current props |
| `state` | `ISlateEditorState` | the current state |

#### Returns

`Partial`\<`ISlateEditorState`\>

a partial of the new state or null

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1150](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/components/slate/index.tsx#L1150)
