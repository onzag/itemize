[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/dialogs/file](../modules/client_fast_prototyping_components_slate_dialogs_file.md) / FileLoadErrorDialog

# Class: FileLoadErrorDialog

[client/fast-prototyping/components/slate/dialogs/file](../modules/client_fast_prototyping_components_slate_dialogs_file.md).FileLoadErrorDialog

This dialog provides a convenient error message to display and close
for when the file failed to load

## Hierarchy

- `PureComponent`<`IFileLoadErrorDialogProps`\>

  ↳ **`FileLoadErrorDialog`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#constructor)

### Properties

- [context](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#context)
- [props](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#props)
- [refs](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#refs)
- [state](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#state)
- [contextType](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#getsnapshotbeforeupdate)
- [onClose](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#onclose)
- [onOpening](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#onopening)
- [render](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#render)
- [setState](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_slate_dialogs_file.FileLoadErrorDialog.md#shouldcomponentupdate)

## Constructors

### constructor

• **new FileLoadErrorDialog**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IFileLoadErrorDialogProps` |

#### Overrides

React.PureComponent&lt;IFileLoadErrorDialogProps\&gt;.constructor

#### Defined in

[client/fast-prototyping/components/slate/dialogs/file.tsx:41](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/dialogs/file.tsx#L41)

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

React.PureComponent.context

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### props

• `Readonly` **props**: `Readonly`<`IFileLoadErrorDialogProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

React.PureComponent.props

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

React.PureComponent.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### state

• **state**: `Readonly`<{}\>

#### Inherited from

React.PureComponent.state

#### Defined in

node_modules/@types/react/index.d.ts:505

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
| `nextProps` | `Readonly`<`IFileLoadErrorDialogProps`\> |
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
| `nextProps` | `Readonly`<`IFileLoadErrorDialogProps`\> |
| `nextState` | `Readonly`<{}\> |
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

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:625

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`IFileLoadErrorDialogProps`\> |
| `prevState` | `Readonly`<{}\> |
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
| `nextProps` | `Readonly`<`IFileLoadErrorDialogProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:641

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
| `nextProps` | `Readonly`<`IFileLoadErrorDialogProps`\> |
| `nextState` | `Readonly`<{}\> |
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
| `prevProps` | `Readonly`<`IFileLoadErrorDialogProps`\> |
| `prevState` | `Readonly`<{}\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### onClose

▸ **onClose**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/dialogs/file.tsx:47](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/dialogs/file.tsx#L47)

___

### onOpening

▸ **onOpening**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/dialogs/file.tsx:53](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/dialogs/file.tsx#L53)

___

### render

▸ **render**(): `Element`

The render function

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[client/fast-prototyping/components/slate/dialogs/file.tsx:59](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/dialogs/file.tsx#L59)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | {} \| (`prevState`: `Readonly`<{}\>, `props`: `Readonly`<`IFileLoadErrorDialogProps`\>) => {} \| `Pick`<{}, `K`\> \| `Pick`<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.PureComponent.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

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
| `nextProps` | `Readonly`<`IFileLoadErrorDialogProps`\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636
