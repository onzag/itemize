[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate/dialogs/video](../modules/client_fast_prototyping_components_slate_dialogs_video.md) / VideoDialog

# Class: VideoDialog

[client/fast-prototyping/components/slate/dialogs/video](../modules/client_fast_prototyping_components_slate_dialogs_video.md).VideoDialog

The video dialog that provides input to insert a link url into
the rich text element

## Hierarchy

* *PureComponent*<IVideoDialogProps, IVideoDialogState\>

  ↳ **VideoDialog**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#constructor)

### Properties

- [context](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#context)
- [props](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#props)
- [refs](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#refs)
- [state](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#state)
- [textFieldVideoRef](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#textfieldvideoref)
- [contextType](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#unsafe_componentwillupdate)
- [acceptVideo](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#acceptvideo)
- [closeDialog](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#closedialog)
- [componentDidCatch](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#componentwillupdate)
- [focusVideoTextField](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#focusvideotextfield)
- [forceUpdate](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#getsnapshotbeforeupdate)
- [onOpening](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#onopening)
- [render](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#render)
- [setState](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#shouldcomponentupdate)
- [updateVideoURL](client_fast_prototyping_components_slate_dialogs_video.videodialog.md#updatevideourl)

## Constructors

### constructor

\+ **new VideoDialog**(`props`: IVideoDialogProps): [*VideoDialog*](client_fast_prototyping_components_slate_dialogs_video.videodialog.md)

Constructs a new video dialog

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | IVideoDialogProps | the video dialog specific properties    |

**Returns:** [*VideoDialog*](client_fast_prototyping_components_slate_dialogs_video.videodialog.md)

Defined in: [client/fast-prototyping/components/slate/dialogs/video.tsx:77](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/dialogs/video.tsx#L77)

## Properties

### context

• **context**: *any*

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

Defined in: node_modules/@types/react/index.d.ts:476

___

### props

• `Readonly` **props**: *Readonly*<IVideoDialogProps\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### state

• **state**: *Readonly*<IVideoDialogState\>

Defined in: node_modules/@types/react/index.d.ts:502

___

### textFieldVideoRef

• `Private` **textFieldVideoRef**: *RefObject*<HTMLDivElement\>

The reference used in the text field input used for focusing

Defined in: [client/fast-prototyping/components/slate/dialogs/video.tsx:77](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/dialogs/video.tsx#L77)

___

### contextType

▪ `Optional` `Static` **contextType**: *Context*<any\>

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

Defined in: node_modules/@types/react/index.d.ts:458

## Methods

### UNSAFE\_componentWillMount

▸ `Optional`**UNSAFE_componentWillMount**(): *void*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:712

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<IVideoDialogProps\>, `nextContext`: *any*): *void*

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

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IVideoDialogProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<IVideoDialogProps\>, `nextState`: *Readonly*<IVideoDialogState\>, `nextContext`: *any*): *void*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IVideoDialogProps\> |
`nextState` | *Readonly*<IVideoDialogState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### acceptVideo

▸ **acceptVideo**(): *void*

Accepts the video and calls the prop function
that does the actual insertion and with the given
status decides whether to show an error or close

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/video.tsx:112](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/dialogs/video.tsx#L112)

___

### closeDialog

▸ **closeDialog**(): *void*

Closes the dialog in place

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/video.tsx:143](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/dialogs/video.tsx#L143)

___

### componentDidCatch

▸ `Optional`**componentDidCatch**(`error`: Error, `errorInfo`: ErrorInfo): *void*

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error |
`errorInfo` | ErrorInfo |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:641

___

### componentDidMount

▸ `Optional`**componentDidMount**(): *void*

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:620

___

### componentDidUpdate

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<IVideoDialogProps\>, `prevState`: *Readonly*<IVideoDialogState\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IVideoDialogProps\> |
`prevState` | *Readonly*<IVideoDialogState\> |
`snapshot?` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:683

___

### componentWillMount

▸ `Optional`**componentWillMount**(): *void*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:698

___

### componentWillReceiveProps

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<IVideoDialogProps\>, `nextContext`: *any*): *void*

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IVideoDialogProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ `Optional`**componentWillUnmount**(): *void*

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:636

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<IVideoDialogProps\>, `nextState`: *Readonly*<IVideoDialogState\>, `nextContext`: *any*): *void*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IVideoDialogProps\> |
`nextState` | *Readonly*<IVideoDialogState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### focusVideoTextField

▸ **focusVideoTextField**(): *void*

Focuses the video text field on mount

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/video.tsx:103](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/dialogs/video.tsx#L103)

___

### forceUpdate

▸ **forceUpdate**(`callback?`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:493

___

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<IVideoDialogProps\>, `prevState`: *Readonly*<IVideoDialogState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IVideoDialogProps\> |
`prevState` | *Readonly*<IVideoDialogState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### onOpening

▸ **onOpening**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/video.tsx:158](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/dialogs/video.tsx#L158)

___

### render

▸ **render**(): *Element*

Render function

**Returns:** *Element*

Defined in: [client/fast-prototyping/components/slate/dialogs/video.tsx:165](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/dialogs/video.tsx#L165)

___

### setState

▸ **setState**<K\>(`state`: IVideoDialogState \| (`prevState`: *Readonly*<IVideoDialogState\>, `props`: *Readonly*<IVideoDialogProps\>) => IVideoDialogState \| *Pick*<IVideoDialogState, K\> \| *Pick*<IVideoDialogState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *videoURL* \| *videoInvalid* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IVideoDialogState \| (`prevState`: *Readonly*<IVideoDialogState\>, `props`: *Readonly*<IVideoDialogProps\>) => IVideoDialogState \| *Pick*<IVideoDialogState, K\> \| *Pick*<IVideoDialogState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<IVideoDialogProps\>, `nextState`: *Readonly*<IVideoDialogState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IVideoDialogProps\> |
`nextState` | *Readonly*<IVideoDialogState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631

___

### updateVideoURL

▸ **updateVideoURL**(`e`: *ChangeEvent*<HTMLInputElement\>): *void*

Updates the video url in the state on each keystroke

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`e` | *ChangeEvent*<HTMLInputElement\> | the change event    |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/dialogs/video.tsx:132](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/dialogs/video.tsx#L132)
