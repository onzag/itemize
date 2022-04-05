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

- [blurBlocked](client_fast_prototyping_components_slate.SlateEditor.md#blurblocked)
- [blurTimeout](client_fast_prototyping_components_slate.SlateEditor.md#blurtimeout)
- [context](client_fast_prototyping_components_slate.SlateEditor.md#context)
- [editor](client_fast_prototyping_components_slate.SlateEditor.md#editor)
- [ignoreCurrentLocationToRemoveEmpty](client_fast_prototyping_components_slate.SlateEditor.md#ignorecurrentlocationtoremoveempty)
- [isUnmounted](client_fast_prototyping_components_slate.SlateEditor.md#isunmounted)
- [lastChangeWasSelectedDelete](client_fast_prototyping_components_slate.SlateEditor.md#lastchangewasselecteddelete)
- [originalInsertData](client_fast_prototyping_components_slate.SlateEditor.md#originalinsertdata)
- [originalSetFragmentData](client_fast_prototyping_components_slate.SlateEditor.md#originalsetfragmentdata)
- [props](client_fast_prototyping_components_slate.SlateEditor.md#props)
- [refs](client_fast_prototyping_components_slate.SlateEditor.md#refs)
- [state](client_fast_prototyping_components_slate.SlateEditor.md#state)
- [updateTimeout](client_fast_prototyping_components_slate.SlateEditor.md#updatetimeout)
- [contextType](client_fast_prototyping_components_slate.SlateEditor.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_slate.SlateEditor.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_slate.SlateEditor.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_slate.SlateEditor.md#unsafe_componentwillupdate)
- [actuallyRenderElement](client_fast_prototyping_components_slate.SlateEditor.md#actuallyrenderelement)
- [availableFilteringFunction](client_fast_prototyping_components_slate.SlateEditor.md#availablefilteringfunction)
- [blockBlur](client_fast_prototyping_components_slate.SlateEditor.md#blockblur)
- [breakList](client_fast_prototyping_components_slate.SlateEditor.md#breaklist)
- [calculateAnchorsAndContext](client_fast_prototyping_components_slate.SlateEditor.md#calculateanchorsandcontext)
- [checkShouldMerge](client_fast_prototyping_components_slate.SlateEditor.md#checkshouldmerge)
- [componentDidCatch](client_fast_prototyping_components_slate.SlateEditor.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_slate.SlateEditor.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_slate.SlateEditor.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_slate.SlateEditor.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_slate.SlateEditor.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_slate.SlateEditor.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_slate.SlateEditor.md#componentwillupdate)
- [deleteBackward](client_fast_prototyping_components_slate.SlateEditor.md#deletebackward)
- [deleteForward](client_fast_prototyping_components_slate.SlateEditor.md#deleteforward)
- [deletePath](client_fast_prototyping_components_slate.SlateEditor.md#deletepath)
- [deleteSelectedNode](client_fast_prototyping_components_slate.SlateEditor.md#deleteselectednode)
- [findAndAppendFilesToDataTransfer](client_fast_prototyping_components_slate.SlateEditor.md#findandappendfilestodatatransfer)
- [findAndInsertFilesFromDataTransfer](client_fast_prototyping_components_slate.SlateEditor.md#findandinsertfilesfromdatatransfer)
- [findContextBasedOnNode](client_fast_prototyping_components_slate.SlateEditor.md#findcontextbasedonnode)
- [focus](client_fast_prototyping_components_slate.SlateEditor.md#focus)
- [focusAt](client_fast_prototyping_components_slate.SlateEditor.md#focusat)
- [forceUpdate](client_fast_prototyping_components_slate.SlateEditor.md#forceupdate)
- [formatToggleBold](client_fast_prototyping_components_slate.SlateEditor.md#formattogglebold)
- [formatToggleItalic](client_fast_prototyping_components_slate.SlateEditor.md#formattoggleitalic)
- [formatToggleUnderline](client_fast_prototyping_components_slate.SlateEditor.md#formattoggleunderline)
- [getFeatureSupport](client_fast_prototyping_components_slate.SlateEditor.md#getfeaturesupport)
- [getHelpers](client_fast_prototyping_components_slate.SlateEditor.md#gethelpers)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_slate.SlateEditor.md#getsnapshotbeforeupdate)
- [hardBlur](client_fast_prototyping_components_slate.SlateEditor.md#hardblur)
- [insertBreak](client_fast_prototyping_components_slate.SlateEditor.md#insertbreak)
- [insertContainer](client_fast_prototyping_components_slate.SlateEditor.md#insertcontainer)
- [insertCustom](client_fast_prototyping_components_slate.SlateEditor.md#insertcustom)
- [insertData](client_fast_prototyping_components_slate.SlateEditor.md#insertdata)
- [insertElement](client_fast_prototyping_components_slate.SlateEditor.md#insertelement)
- [insertFile](client_fast_prototyping_components_slate.SlateEditor.md#insertfile)
- [insertImage](client_fast_prototyping_components_slate.SlateEditor.md#insertimage)
- [insertSuperblockBreak](client_fast_prototyping_components_slate.SlateEditor.md#insertsuperblockbreak)
- [insertTemplateHTML](client_fast_prototyping_components_slate.SlateEditor.md#inserttemplatehtml)
- [insertTemplateText](client_fast_prototyping_components_slate.SlateEditor.md#inserttemplatetext)
- [insertUIHandledContainer](client_fast_prototyping_components_slate.SlateEditor.md#insertuihandledcontainer)
- [insertVideo](client_fast_prototyping_components_slate.SlateEditor.md#insertvideo)
- [isInline](client_fast_prototyping_components_slate.SlateEditor.md#isinline)
- [isVoid](client_fast_prototyping_components_slate.SlateEditor.md#isvoid)
- [movePaths](client_fast_prototyping_components_slate.SlateEditor.md#movepaths)
- [normalizeNode](client_fast_prototyping_components_slate.SlateEditor.md#normalizenode)
- [onBlurredChange](client_fast_prototyping_components_slate.SlateEditor.md#onblurredchange)
- [onChange](client_fast_prototyping_components_slate.SlateEditor.md#onchange)
- [onFocusedChange](client_fast_prototyping_components_slate.SlateEditor.md#onfocusedchange)
- [onKeyDown](client_fast_prototyping_components_slate.SlateEditor.md#onkeydown)
- [onNativeBlur](client_fast_prototyping_components_slate.SlateEditor.md#onnativeblur)
- [releaseBlur](client_fast_prototyping_components_slate.SlateEditor.md#releaseblur)
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
- [toggleLink](client_fast_prototyping_components_slate.SlateEditor.md#togglelink)
- [toggleList](client_fast_prototyping_components_slate.SlateEditor.md#togglelist)
- [toggleQuote](client_fast_prototyping_components_slate.SlateEditor.md#togglequote)
- [toggleTitle](client_fast_prototyping_components_slate.SlateEditor.md#toggletitle)
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

[client/fast-prototyping/components/slate/index.tsx:1479](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1479)

## Properties

### blurBlocked

• `Private` **blurBlocked**: `boolean` = `false`

This allows to block the blurring from happening, normally this is blocked via the blockBlur
and releaseBlur functions and prevent the focused state to turn into false, it will not
affect the actual focus, as the caret is anyway lost when you click on something like on a toolbar
but most of these buttons once done cause a regain on focus, however, an animation might play
that can be distracting and rather annoying otherwise

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1363](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1363)

___

### blurTimeout

• `Private` **blurTimeout**: `Timeout`

Blurring is rather complex on this, and pressing the toolbar buttons and all around stuff
causes flickering on the blur animations, so this blur timeout will ensure to call onblur
only if it's not just to call onfocus later

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1355](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1355)

___

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

### editor

• `Private` **editor**: `ItemizeEditor`

Represents the react editor element that is created
using slate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1344](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1344)

___

### ignoreCurrentLocationToRemoveEmpty

• `Private` **ignoreCurrentLocationToRemoveEmpty**: `boolean` = `false`

This flag allows to disable removing empty text nodes that exist in the current location
when set to true, eg. if we set a bold text node, while in most case we want these empty text nodes
gone, not all the time

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1369](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1369)

___

### isUnmounted

• `Private` **isUnmounted**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1385](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1385)

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

[client/fast-prototyping/components/slate/index.tsx:1381](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1381)

___

### originalInsertData

• `Private` **originalInsertData**: `any`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1384](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1384)

___

### originalSetFragmentData

• `Private` **originalSetFragmentData**: `any`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1383](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1383)

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

[client/fast-prototyping/components/slate/index.tsx:1349](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1349)

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

### actuallyRenderElement

▸ **actuallyRenderElement**(`props`, `currentElement`): `any`

the render element function to be used in slate editor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `RenderElementProps` | the properties that slate provides to render the component |
| `currentElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | - |

#### Returns

`any`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2959](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2959)

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

[client/fast-prototyping/components/slate/index.tsx:4914](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4914)

___

### blockBlur

▸ **blockBlur**(): `void`

The blocking blur function it is a helper function that is called usually on the toolbars
to prevent the field from blurring on mousedown, ups events, as this will cause a blur only
to cause a refocus, this prevents that

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3222](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3222)

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

[client/fast-prototyping/components/slate/index.tsx:2369](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2369)

___

### calculateAnchorsAndContext

▸ **calculateAnchorsAndContext**(`anchor`, `value?`, `currentGivenSelectedNodeAnchor?`): `Object`

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
| `currentAnchor` | `Path` |
| `currentBlockElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentBlockElementAnchor` | `Path` |
| `currentContext` | [`ITemplateArgsContext`](../interfaces/client_fast_prototyping_components_slate.ITemplateArgsContext.md) |
| `currentElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentElementAnchor` | `Path` |
| `currentSelectedBlockElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentSelectedBlockElementAnchor` | `Path` |
| `currentSelectedElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentSelectedElementAnchor` | `Path` |
| `currentSelectedElementContext` | [`ITemplateArgsContext`](../interfaces/client_fast_prototyping_components_slate.ITemplateArgsContext.md) |
| `currentSelectedElementContextSelectContext` | [`ITemplateArgsContext`](../interfaces/client_fast_prototyping_components_slate.ITemplateArgsContext.md) |
| `currentSelectedElementEachSelectContext` | [`ITemplateArgsContext`](../interfaces/client_fast_prototyping_components_slate.ITemplateArgsContext.md) |
| `currentSelectedSuperBlockElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentSelectedSuperBlockElementAnchor` | `Path` |
| `currentSelectedText` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) |
| `currentSuperBlockElement` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `currentSuperBlockElementAnchor` | `Path` |
| `currentText` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) |

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2490](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2490)

___

### checkShouldMerge

▸ **checkShouldMerge**(`n1`, `n2`): `boolean`

Checks whether two nodes are mergable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n1` | `Node` | the first node |
| `n2` | `Node` | the second node |

#### Returns

`boolean`

a boolean on whether they should merge

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1794](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1794)

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

[client/fast-prototyping/components/slate/index.tsx:4974](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4974)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `ISlateEditorProps` |
| `prevState` | `ISlateEditorState` |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1784](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1784)

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

[client/fast-prototyping/components/slate/index.tsx:4996](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4996)

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

[client/fast-prototyping/components/slate/index.tsx:2318](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2318)

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

[client/fast-prototyping/components/slate/index.tsx:2304](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2304)

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

[client/fast-prototyping/components/slate/index.tsx:3259](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3259)

___

### deleteSelectedNode

▸ **deleteSelectedNode**(): `void`

Deletes the selected node that has been selected, either the current default
or one that has been manually selected using selectPath

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3415](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3415)

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

[client/fast-prototyping/components/slate/index.tsx:1729](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1729)

___

### findAndInsertFilesFromDataTransfer

▸ **findAndInsertFilesFromDataTransfer**(`data`, `blobs`, `element`): `Promise`<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\>

This function runs and prepares the tree that is to be inserted into the
pasted content

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer of the clipboard |
| `blobs` | `any` | an object that contains the blob transfer object |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element we are currently processing |

#### Returns

`Promise`<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1613](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1613)

___

### findContextBasedOnNode

▸ **findContextBasedOnNode**(`n`, `onlySwichingContext?`): [`ITemplateArgsContext`](../interfaces/client_fast_prototyping_components_slate.ITemplateArgsContext.md)

Provides the context a given node is sitting in

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `Node` | the node in question |
| `onlySwichingContext?` | `boolean` | provides the context only if it was set by the given node otherwise it will return null |

#### Returns

[`ITemplateArgsContext`](../interfaces/client_fast_prototyping_components_slate.ITemplateArgsContext.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2904](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2904)

___

### focus

▸ **focus**(): `void`

A helper function to call react focus back into the editor

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3439](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3439)

___

### focusAt

▸ **focusAt**(`at`): `Promise`<`unknown`\>

An async function that is a bit of a hack to focus at a given
range, because of the way slate works it needs to be async

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `Path` \| `Range` | the range to focus at |

#### Returns

`Promise`<`unknown`\>

a void promise once it's done

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3450](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3450)

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

### formatToggleBold

▸ **formatToggleBold**(): `void`

Formats the current text as bold

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4761](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4761)

___

### formatToggleItalic

▸ **formatToggleItalic**(): `void`

formats the current text as italic

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4808](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4808)

___

### formatToggleUnderline

▸ **formatToggleUnderline**(): `void`

formats the current text as italic

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4855](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4855)

___

### getFeatureSupport

▸ **getFeatureSupport**(): [`IAccessibleFeatureSupportOptions`](../interfaces/client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

Provides the feature support information that is used by the editor
to know what it can and can't do

#### Returns

[`IAccessibleFeatureSupportOptions`](../interfaces/client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:5066](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L5066)

___

### getHelpers

▸ **getHelpers**(): [`IHelperFunctions`](../interfaces/client_fast_prototyping_components_slate.IHelperFunctions.md)

Provides the helpers that are used by the editor
to construct rich text data

#### Returns

[`IHelperFunctions`](../interfaces/client_fast_prototyping_components_slate.IHelperFunctions.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:5007](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L5007)

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

### hardBlur

▸ **hardBlur**(): `void`

Performs a hard blur event and the paths are cleared out

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3238](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3238)

___

### insertBreak

▸ **insertBreak**(): `void`

Override for the default editor insert break function

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2160](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2160)

___

### insertContainer

▸ **insertContainer**(`type?`, `at?`): `Promise`<`void`\>

Will insert a container at the given location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type?` | `string` | optional, the container type, otherwise will insert a standard container |
| `at?` | `Path` \| `Range` | an optional range |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3891](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3891)

___

### insertCustom

▸ **insertCustom**(`type`, `at?`): `Promise`<`void`\>

Inserts a custom element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the type for the custom element |
| `at?` | `Path` \| `Range` | an optional at range to insert the custom at |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3968](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3968)

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

[client/fast-prototyping/components/slate/index.tsx:1694](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1694)

___

### insertElement

▸ **insertElement**(`element`, `at?`): `Promise`<`void`\>

Inserts an element at a given position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) | the element |
| `at?` | `Path` \| `Range` | an optional position to do it at |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4595](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4595)

___

### insertFile

▸ **insertFile**(`file`, `at?`): `Promise`<`void`\>

Will insert a file based on the information given it uses
the standard on insert file function in order to perfom it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file to insert |
| `at?` | `Path` \| `Range` | a partial range to insert at |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3821](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3821)

___

### insertImage

▸ **insertImage**(`file`, `standalone`, `at?`): `Promise`<`void`\>

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
| `at?` | `Path` \| `Range` | a range to insert it at (optional) |

#### Returns

`Promise`<`void`\>

a void promise once it's done

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3480](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3480)

___

### insertSuperblockBreak

▸ **insertSuperblockBreak**(): `void`

Inserts a superblock break, since you might not be able to escape
superblocks, eg. such as a single container, you will use a superblock break
alt+enter in order to escape the superblock

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2415](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2415)

___

### insertTemplateHTML

▸ **insertTemplateHTML**(`label`, `value`, `at?`): `Promise`<`void`\>

Will insert a bit of template html that is used for templating purposes, work similar
to template text, except it uses html content instead to replace the inner html

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to be given to the element to be added |
| `value` | `string` | the value that will be used from the context |
| `at?` | `Path` \| `Range` | an optional range where to be inserted |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3620](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3620)

___

### insertTemplateText

▸ **insertTemplateText**(`label`, `value`, `at?`): `Promise`<`void`\>

Will insert a bit of template text that is used for templating purposes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | the label to give it |
| `value` | `string` | the value that it gets |
| `at?` | `Path` \| `Range` | at which range to insert it (optional) |

#### Returns

`Promise`<`void`\>

a void promise

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3562](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3562)

___

### insertUIHandledContainer

▸ **insertUIHandledContainer**(`type`, `value`, `args`, `at?`): `Promise`<`void`\>

Will insert a container at the given location and assign it an UI handler

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the container type |
| `value` | `string` | the value for the ui handler that should be taken out of the context |
| `args` | `Object` | the args for the ui handler |
| `at?` | `Path` \| `Range` | an optional range |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4665](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4665)

___

### insertVideo

▸ **insertVideo**(`url`, `at?`): `boolean`

Will insert a video given the information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url of the video |
| `at?` | `Path` \| `Range` | a partial range to insert at |

#### Returns

`boolean`

a boolean on whether it succeeded

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3687](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3687)

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

[client/fast-prototyping/components/slate/index.tsx:2118](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2118)

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

[client/fast-prototyping/components/slate/index.tsx:2127](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2127)

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

[client/fast-prototyping/components/slate/index.tsx:3325](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3325)

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

[client/fast-prototyping/components/slate/index.tsx:1815](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1815)

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

[client/fast-prototyping/components/slate/index.tsx:2761](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2761)

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

[client/fast-prototyping/components/slate/index.tsx:3184](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3184)

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

[client/fast-prototyping/components/slate/index.tsx:2739](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2739)

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

[client/fast-prototyping/components/slate/index.tsx:4960](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4960)

___

### onNativeBlur

▸ **onNativeBlur**(): `boolean`

Runs during the native blur off the content editable
we need to avoid flickery animation and so we perform
this trickery

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:2794](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2794)

___

### releaseBlur

▸ **releaseBlur**(): `void`

This is part of the blur blocking event chain and releases
the blocking of the blur event

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3231](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3231)

___

### render

▸ **render**(): `Element`

Render function

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:5116](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L5116)

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

[client/fast-prototyping/components/slate/index.tsx:2946](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2946)

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

[client/fast-prototyping/components/slate/index.tsx:3164](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3164)

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

[client/fast-prototyping/components/slate/index.tsx:3285](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3285)

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

[client/fast-prototyping/components/slate/index.tsx:4485](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4485)

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

[client/fast-prototyping/components/slate/index.tsx:4544](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4544)

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

[client/fast-prototyping/components/slate/index.tsx:4516](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4516)

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

[client/fast-prototyping/components/slate/index.tsx:4729](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4729)

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

[client/fast-prototyping/components/slate/index.tsx:4752](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4752)

___

### setFragmentData

▸ **setFragmentData**(`data`): `void`

This function runs when we are preparing the slate clipboard

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `DataTransfer` | the data transfer |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:1765](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1765)

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

[client/fast-prototyping/components/slate/index.tsx:4505](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4505)

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

[client/fast-prototyping/components/slate/index.tsx:4740](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4740)

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

[client/fast-prototyping/components/slate/index.tsx:4527](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4527)

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

[client/fast-prototyping/components/slate/index.tsx:4494](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4494)

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

[client/fast-prototyping/components/slate/index.tsx:4562](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4562)

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

[client/fast-prototyping/components/slate/index.tsx:4575](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4575)

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

[client/fast-prototyping/components/slate/index.tsx:2850](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2850)

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

[client/fast-prototyping/components/slate/index.tsx:2806](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L2806)

___

### softBlur

▸ **softBlur**(): `void`

Performs a soft blur event

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:3254](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L3254)

___

### toggleLink

▸ **toggleLink**(`url`, `tvalue`, `at?`): `boolean`

Makes a link out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url that we are using (null if using tvalue) |
| `tvalue` | `string` | the template value to use (null if providing url) |
| `at?` | `Path` \| `Range` | an optional range to pass |

#### Returns

`boolean`

a boolean if the link was valid and toggleLink

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4318](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4318)

___

### toggleList

▸ **toggleList**(`type`, `at?`): `Promise`<`void`\>

Makes a list out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"bulleted"`` \| ``"numbered"`` | the type of the list that is to be toggled, either bulleted or number |
| `at?` | `Path` \| `Range` | an optional range |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4215](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4215)

___

### toggleQuote

▸ **toggleQuote**(`at?`): `Promise`<`void`\>

Makes a quote out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at?` | `Path` \| `Range` | toggle at the given range, this will cause a focus |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4044](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4044)

___

### toggleTitle

▸ **toggleTitle**(`type`, `at?`): `Promise`<`void`\>

Makes a title out of the current element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"h1"`` \| ``"h2"`` \| ``"h3"`` \| ``"h4"`` \| ``"h5"`` \| ``"h6"`` | the title type |
| `at?` | `Path` \| `Range` | an optional range |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:4130](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L4130)

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

[client/fast-prototyping/components/slate/index.tsx:1394](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L1394)
