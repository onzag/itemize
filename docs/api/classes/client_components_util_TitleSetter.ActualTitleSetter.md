[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/TitleSetter](../modules/client_components_util_TitleSetter.md) / ActualTitleSetter

# Class: ActualTitleSetter

[client/components/util/TitleSetter](../modules/client_components_util_TitleSetter.md).ActualTitleSetter

The title setter allows to set the title of the application dinamically
despite of where we are in the app

Do not have two title setters at once as this would cause an error

## Hierarchy

- `Component`<`ITitleSetterProps`, {}\>

  ↳ **`ActualTitleSetter`**

## Table of contents

### Constructors

- [constructor](client_components_util_TitleSetter.ActualTitleSetter.md#constructor)

### Properties

- [context](client_components_util_TitleSetter.ActualTitleSetter.md#context)
- [props](client_components_util_TitleSetter.ActualTitleSetter.md#props)
- [refs](client_components_util_TitleSetter.ActualTitleSetter.md#refs)
- [state](client_components_util_TitleSetter.ActualTitleSetter.md#state)
- [changedListeners](client_components_util_TitleSetter.ActualTitleSetter.md#changedlisteners)
- [contextType](client_components_util_TitleSetter.ActualTitleSetter.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_util_TitleSetter.ActualTitleSetter.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_util_TitleSetter.ActualTitleSetter.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_util_TitleSetter.ActualTitleSetter.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_util_TitleSetter.ActualTitleSetter.md#componentdidcatch)
- [componentDidMount](client_components_util_TitleSetter.ActualTitleSetter.md#componentdidmount)
- [componentDidUpdate](client_components_util_TitleSetter.ActualTitleSetter.md#componentdidupdate)
- [componentWillMount](client_components_util_TitleSetter.ActualTitleSetter.md#componentwillmount)
- [componentWillReceiveProps](client_components_util_TitleSetter.ActualTitleSetter.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_util_TitleSetter.ActualTitleSetter.md#componentwillunmount)
- [componentWillUpdate](client_components_util_TitleSetter.ActualTitleSetter.md#componentwillupdate)
- [forceUpdate](client_components_util_TitleSetter.ActualTitleSetter.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_util_TitleSetter.ActualTitleSetter.md#getsnapshotbeforeupdate)
- [render](client_components_util_TitleSetter.ActualTitleSetter.md#render)
- [setState](client_components_util_TitleSetter.ActualTitleSetter.md#setstate)
- [shouldComponentUpdate](client_components_util_TitleSetter.ActualTitleSetter.md#shouldcomponentupdate)

## Constructors

### constructor

• **new ActualTitleSetter**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ITitleSetterProps` |

#### Overrides

React.Component&lt;ITitleSetterProps, {}\&gt;.constructor

#### Defined in

[client/components/util/TitleSetter.tsx:37](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/TitleSetter.tsx#L37)

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

### props

• `Readonly` **props**: `Readonly`<`ITitleSetterProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`<{}\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### changedListeners

▪ `Static` **changedListeners**: `Map`<[`ActualTitleReader`](client_components_util_TitleReader.ActualTitleReader.md), () => `void`\>

Stores title readers to inform them of changes

#### Defined in

[client/components/util/TitleSetter.tsx:35](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/TitleSetter.tsx#L35)

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
| `nextProps` | `Readonly`<`ITitleSetterProps`\> |
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
| `nextProps` | `Readonly`<`ITitleSetterProps`\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

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

React.Component.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/components/util/TitleSetter.tsx:40](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/TitleSetter.tsx#L40)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `ITitleSetterProps` |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/components/util/TitleSetter.tsx:54](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/TitleSetter.tsx#L54)

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
| `nextProps` | `Readonly`<`ITitleSetterProps`\> |
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

#### Returns

`void`

#### Overrides

React.Component.componentWillUnmount

#### Defined in

[client/components/util/TitleSetter.tsx:61](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/TitleSetter.tsx#L61)

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
| `nextProps` | `Readonly`<`ITitleSetterProps`\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

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

React.Component.forceUpdate

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
| `prevProps` | `Readonly`<`ITitleSetterProps`\> |
| `prevState` | `Readonly`<{}\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### render

▸ **render**(): `ReactNode`

#### Returns

`ReactNode`

#### Overrides

React.Component.render

#### Defined in

[client/components/util/TitleSetter.tsx:65](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/TitleSetter.tsx#L65)

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
| `state` | {} \| (`prevState`: `Readonly`<{}\>, `props`: `Readonly`<`ITitleSetterProps`\>) => {} \| `Pick`<{}, `K`\> \| `Pick`<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

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
| `nextProps` | `Readonly`<`ITitleSetterProps`\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636
