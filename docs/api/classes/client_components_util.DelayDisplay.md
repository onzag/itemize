[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util](../modules/client_components_util.md) / DelayDisplay

# Class: DelayDisplay

[client/components/util](../modules/client_components_util.md).DelayDisplay

Allows to create a component that will only display after a given delay

## Hierarchy

- `PureComponent`\<`DelayDisplayProps`, `DelayDisplayState`\>

  ↳ **`DelayDisplay`**

## Table of contents

### Constructors

- [constructor](client_components_util.DelayDisplay.md#constructor)

### Properties

- [context](client_components_util.DelayDisplay.md#context)
- [props](client_components_util.DelayDisplay.md#props)
- [refs](client_components_util.DelayDisplay.md#refs)
- [state](client_components_util.DelayDisplay.md#state)
- [timer](client_components_util.DelayDisplay.md#timer)
- [contextType](client_components_util.DelayDisplay.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_util.DelayDisplay.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_util.DelayDisplay.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_util.DelayDisplay.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_util.DelayDisplay.md#componentdidcatch)
- [componentDidMount](client_components_util.DelayDisplay.md#componentdidmount)
- [componentDidUpdate](client_components_util.DelayDisplay.md#componentdidupdate)
- [componentWillMount](client_components_util.DelayDisplay.md#componentwillmount)
- [componentWillReceiveProps](client_components_util.DelayDisplay.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_util.DelayDisplay.md#componentwillunmount)
- [componentWillUpdate](client_components_util.DelayDisplay.md#componentwillupdate)
- [forceUpdate](client_components_util.DelayDisplay.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_util.DelayDisplay.md#getsnapshotbeforeupdate)
- [render](client_components_util.DelayDisplay.md#render)
- [setState](client_components_util.DelayDisplay.md#setstate)
- [shouldComponentUpdate](client_components_util.DelayDisplay.md#shouldcomponentupdate)

## Constructors

### constructor

• **new DelayDisplay**(`props`): [`DelayDisplay`](client_components_util.DelayDisplay.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `DelayDisplayProps` |

#### Returns

[`DelayDisplay`](client_components_util.DelayDisplay.md)

#### Overrides

React.PureComponent\&lt;DelayDisplayProps, DelayDisplayState\&gt;.constructor

#### Defined in

[client/components/util/index.tsx:323](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/index.tsx#L323)

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

React.PureComponent.context

#### Defined in

node_modules/@types/react/index.d.ts:473

___

### props

• `Readonly` **props**: `Readonly`\<`DelayDisplayProps`\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

#### Inherited from

React.PureComponent.props

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

React.PureComponent.refs

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### state

• **state**: `Readonly`\<`DelayDisplayState`\>

#### Inherited from

React.PureComponent.state

#### Defined in

node_modules/@types/react/index.d.ts:499

___

### timer

• `Private` **timer**: `Timer`

#### Defined in

[client/components/util/index.tsx:322](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/index.tsx#L322)

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

React.PureComponent.contextType

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

React.PureComponent.UNSAFE\_componentWillMount

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
| `nextProps` | `Readonly`\<`DelayDisplayProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.PureComponent.UNSAFE\_componentWillReceiveProps

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
| `nextProps` | `Readonly`\<`DelayDisplayProps`\> |
| `nextState` | `Readonly`\<`DelayDisplayState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.PureComponent.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:771

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

React.PureComponent.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:640

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

React.PureComponent.componentDidMount

#### Defined in

[client/components/util/index.tsx:330](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/index.tsx#L330)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<`DelayDisplayProps`\> |
| `prevState` | `Readonly`\<`DelayDisplayState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

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

React.PureComponent.componentWillMount

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
| `nextProps` | `Readonly`\<`DelayDisplayProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.PureComponent.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:726

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

#### Returns

`void`

#### Overrides

React.PureComponent.componentWillUnmount

#### Defined in

[client/components/util/index.tsx:337](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/index.tsx#L337)

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
| `nextProps` | `Readonly`\<`DelayDisplayProps`\> |
| `nextState` | `Readonly`\<`DelayDisplayState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.PureComponent.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:756

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

node_modules/@types/react/index.d.ts:490

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
| `prevProps` | `Readonly`\<`DelayDisplayProps`\> |
| `prevState` | `Readonly`\<`DelayDisplayState`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### render

▸ **render**(): `ReactNode`

#### Returns

`ReactNode`

#### Overrides

React.PureComponent.render

#### Defined in

[client/components/util/index.tsx:340](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/index.tsx#L340)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"shown"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `DelayDisplayState` \| (`prevState`: `Readonly`\<`DelayDisplayState`\>, `props`: `Readonly`\<`DelayDisplayProps`\>) => `DelayDisplayState` \| `Pick`\<`DelayDisplayState`, `K`\> \| `Pick`\<`DelayDisplayState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.PureComponent.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<`DelayDisplayProps`\> |
| `nextState` | `Readonly`\<`DelayDisplayState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
