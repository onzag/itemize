[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / MaterialUISlateWrapper

# Class: MaterialUISlateWrapper

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).MaterialUISlateWrapper

This represents the unwrapped class that is used for the wrapper, it is not
the exported one because it needs to be withStyles for stylization

## Hierarchy

- `PureComponent`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md), [`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)\>

  ↳ **`MaterialUISlateWrapper`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#constructor)

### Properties

- [DrawerContainerRef](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#drawercontainerref)
- [context](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#context)
- [editorRef](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#editorref)
- [inputFileRef](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#inputfileref)
- [inputImageRef](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#inputimageref)
- [isUnmounted](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#isunmounted)
- [originalSelectionArea](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#originalselectionarea)
- [originalSelectionPath](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#originalselectionpath)
- [props](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#props)
- [refocusTimeout](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#refocustimeout)
- [refs](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#refs)
- [state](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#state)
- [toolbarRef](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#toolbarref)
- [contextType](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#getsnapshotbeforeupdate)
- [isInEditor](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#isineditor)
- [isUnblurred](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#isunblurred)
- [keyUpListener](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#keyuplistener)
- [onFileEventedReFocus](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#onfileeventedrefocus)
- [onFileLoad](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#onfileload)
- [onHeightChange](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#onheightchange)
- [onImageLoad](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#onimageload)
- [refocus](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#refocus)
- [render](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#render)
- [requestFile](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#requestfile)
- [requestImage](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#requestimage)
- [selectiveHardBlur](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#selectivehardblur)
- [setState](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#setstate)
- [setToolbarState](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#settoolbarstate)
- [shouldComponentUpdate](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#shouldcomponentupdate)
- [shouldHaveDrawer](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#shouldhavedrawer)
- [toggleDrawer](client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapper.md#toggledrawer)

## Constructors

### constructor

• **new MaterialUISlateWrapper**(`props`)

Constructs a new material ui based wrapper for the slate editor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md) | the base properties that every wrapper gets extended for this specific wrapper |

#### Overrides

React.PureComponent&lt;IMaterialUISlateWrapperProps, MaterialUISlateWrapperState\&gt;.constructor

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1529](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1529)

## Properties

### DrawerContainerRef

• `Private` **DrawerContainerRef**: `RefObject`<`DrawerContainer`\>

A ref to the container

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1491](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1491)

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

React.PureComponent.context

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### editorRef

• `Private` **editorRef**: `RefObject`<`HTMLDivElement`\>

a ref to the editor

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1496](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1496)

___

### inputFileRef

• `Private` **inputFileRef**: `RefObject`<`HTMLInputElement`\>

The ref object for the input object for any file input

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1486](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1486)

___

### inputImageRef

• `Private` **inputImageRef**: `RefObject`<`HTMLInputElement`\>

The ref object for the input object for image input

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1481](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1481)

___

### isUnmounted

• `Private` **isUnmounted**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1523](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1523)

___

### originalSelectionArea

• `Private` **originalSelectionArea**: `BaseRange`

This is the range that was in place before losing focus, it is used because
when opening some dialog, the insertion or change needs to happen at a given
selection range, but that is lost when losing focus, so we need to remember it

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1508](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1508)

___

### originalSelectionPath

• `Private` **originalSelectionPath**: `Path`

If instead of having a selection area we had a selection path as a selected element
because we were workign in the range

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1513](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1513)

___

### props

• `Readonly` **props**: `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

React.PureComponent.props

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### refocusTimeout

• `Private` **refocusTimeout**: `Timeout`

this is used to ensure a refocus after the native dialogs for file and for image that
are used to get a file are closed; while we need to wait for the input event to trigger
we don't know if that happens first as there are no guarantees so we delay it a little bit
and the change event might not even trigger

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1521](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1521)

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.PureComponent.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### state

• **state**: `Readonly`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)\>

#### Inherited from

React.PureComponent.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### toolbarRef

• `Private` **toolbarRef**: `RefObject`<`RichTextEditorToolbar`\>

A ref for the toolbar

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1501](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1501)

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

React.PureComponent.contextType

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

React.PureComponent.UNSAFE\_componentWillMount

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
| `nextProps` | `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE\_componentWillReceiveProps

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
| `nextProps` | `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\> |
| `nextState` | `Readonly`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

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

React.PureComponent.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `void`

During the mount event

#### Returns

`void`

#### Overrides

React.PureComponent.componentDidMount

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1581](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1581)

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\> |
| `prevState` | `Readonly`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:688

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

React.PureComponent.componentWillMount

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
| `nextProps` | `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

#### Returns

`void`

#### Overrides

React.PureComponent.componentWillUnmount

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1612](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1612)

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
| `nextProps` | `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\> |
| `nextState` | `Readonly`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

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

React.PureComponent.forceUpdate

#### Defined in

node_modules/@types/react/index.d.ts:496

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
| `prevProps` | `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\> |
| `prevState` | `Readonly`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### isInEditor

▸ **isInEditor**(`ele`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ele` | `HTMLElement` |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1659](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1659)

___

### isUnblurred

▸ **isUnblurred**(`ele`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ele` | `HTMLElement` |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1643](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1643)

___

### keyUpListener

▸ **keyUpListener**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1619](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1619)

___

### onFileEventedReFocus

▸ **onFileEventedReFocus**(): `void`

Triggers once the document has recovered focus from the file
dialog that is native for the file upload

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1776](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1776)

___

### onFileLoad

▸ **onFileLoad**(`e`): `Promise`<`void`\>

This function gets called once the file input calls the on change event
which means it has been loaded by the input itself and it's available for
reading

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `ChangeEvent`<`HTMLInputElement`\> | the change event that contains the file |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1820](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1820)

___

### onHeightChange

▸ **onHeightChange**(`newHeight`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newHeight` | `number` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1570](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1570)

___

### onImageLoad

▸ **onImageLoad**(`e`): `Promise`<`void`\>

This function gets called once the image input calls the on change event
which means it has been loaded by the input itself and it's available for
reading

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `ChangeEvent`<`HTMLInputElement`\> | the change event that contains the file |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1799](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1799)

___

### refocus

▸ **refocus**(): `void`

Refocuses as the original selection area that was focused
mainly used by dialogs once they haave closed

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1760](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1760)

___

### render

▸ **render**(): `Element`

Standard render function from the wrapper

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1838](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1838)

___

### requestFile

▸ **requestFile**(): `void`

Executes in order to open the dialog in order to request an file
via this file upload dialog

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1719](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1719)

___

### requestImage

▸ **requestImage**(): `void`

Executes in order to open the dialog in order to request an image
via this file upload dialog

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1698](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1698)

___

### selectiveHardBlur

▸ **selectiveHardBlur**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` \| `KeyboardEvent` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1625](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1625)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md) \| (`prevState`: `Readonly`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)\>, `props`: `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\>) => [`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md) \| `Pick`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md), `K`\> \| `Pick`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md), `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.PureComponent.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### setToolbarState

▸ **setToolbarState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `string` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1787](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1787)

___

### shouldComponentUpdate

▸ `Optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`IMaterialUISlateWrapperProps`](../interfaces/client_fast_prototyping_components_slate_wrapper.IMaterialUISlateWrapperProps.md)\> |
| `nextState` | `Readonly`<[`MaterialUISlateWrapperState`](../interfaces/client_fast_prototyping_components_slate_wrapper.MaterialUISlateWrapperState.md)\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636

___

### shouldHaveDrawer

▸ **shouldHaveDrawer**(): `boolean`

Specifies on whether it should have a drawer

#### Returns

`boolean`

a boolean on this fact

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1677](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1677)

___

### toggleDrawer

▸ **toggleDrawer**(): `void`

Opens/closes the drawer

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:1739](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/components/slate/wrapper.tsx#L1739)
