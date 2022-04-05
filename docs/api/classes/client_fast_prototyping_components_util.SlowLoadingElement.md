[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/util](../modules/client_fast_prototyping_components_util.md) / SlowLoadingElement

# Class: SlowLoadingElement

[client/fast-prototyping/components/util](../modules/client_fast_prototyping_components_util.md).SlowLoadingElement

Some elements can be fairly heavy and slow loading, this component will detach the execution of some of these components
so that they don't have to slow down the execution of other code, doesn't play nice with SSR

## Hierarchy

- `Component`<`SlowLoadingElementProps`, `SlowLoadingElementState`\>

  ↳ **`SlowLoadingElement`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_util.SlowLoadingElement.md#constructor)

### Properties

- [context](client_fast_prototyping_components_util.SlowLoadingElement.md#context)
- [props](client_fast_prototyping_components_util.SlowLoadingElement.md#props)
- [refs](client_fast_prototyping_components_util.SlowLoadingElement.md#refs)
- [state](client_fast_prototyping_components_util.SlowLoadingElement.md#state)
- [unmounted](client_fast_prototyping_components_util.SlowLoadingElement.md#unmounted)
- [contextType](client_fast_prototyping_components_util.SlowLoadingElement.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_util.SlowLoadingElement.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_util.SlowLoadingElement.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_util.SlowLoadingElement.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_components_util.SlowLoadingElement.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_util.SlowLoadingElement.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_util.SlowLoadingElement.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_util.SlowLoadingElement.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_util.SlowLoadingElement.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_util.SlowLoadingElement.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_util.SlowLoadingElement.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_components_util.SlowLoadingElement.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_util.SlowLoadingElement.md#getsnapshotbeforeupdate)
- [makeReady](client_fast_prototyping_components_util.SlowLoadingElement.md#makeready)
- [render](client_fast_prototyping_components_util.SlowLoadingElement.md#render)
- [setState](client_fast_prototyping_components_util.SlowLoadingElement.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_util.SlowLoadingElement.md#shouldcomponentupdate)
- [getDerivedStateFromProps](client_fast_prototyping_components_util.SlowLoadingElement.md#getderivedstatefromprops)

## Constructors

### constructor

• **new SlowLoadingElement**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SlowLoadingElementProps` |

#### Overrides

React.Component&lt;SlowLoadingElementProps, SlowLoadingElementState\&gt;.constructor

#### Defined in

[client/fast-prototyping/components/util.tsx:155](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L155)

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

• `Readonly` **props**: `Readonly`<`SlowLoadingElementProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`<`SlowLoadingElementState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### unmounted

• `Private` **unmounted**: `boolean` = `false`

Becomes true once unmounted, avoid setState on
unmounted components if the element really takes a while
to load

#### Defined in

[client/fast-prototyping/components/util.tsx:140](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L140)

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
| `nextProps` | `Readonly`<`SlowLoadingElementProps`\> |
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
| `nextProps` | `Readonly`<`SlowLoadingElementProps`\> |
| `nextState` | `Readonly`<`SlowLoadingElementState`\> |
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

[client/fast-prototyping/components/util.tsx:180](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L180)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `SlowLoadingElementProps` |
| `prevState` | `SlowLoadingElementState` |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/fast-prototyping/components/util.tsx:183](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L183)

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
| `nextProps` | `Readonly`<`SlowLoadingElementProps`\> |
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

[client/fast-prototyping/components/util.tsx:189](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L189)

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
| `nextProps` | `Readonly`<`SlowLoadingElementProps`\> |
| `nextState` | `Readonly`<`SlowLoadingElementState`\> |
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
| `prevProps` | `Readonly`<`SlowLoadingElementProps`\> |
| `prevState` | `Readonly`<`SlowLoadingElementState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### makeReady

▸ **makeReady**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/util.tsx:163](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L163)

___

### render

▸ **render**(): `ReactNode`

#### Returns

`ReactNode`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/components/util.tsx:192](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L192)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `SlowLoadingElementState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `SlowLoadingElementState` \| (`prevState`: `Readonly`<`SlowLoadingElementState`\>, `props`: `Readonly`<`SlowLoadingElementProps`\>) => `SlowLoadingElementState` \| `Pick`<`SlowLoadingElementState`, `K`\> \| `Pick`<`SlowLoadingElementState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `SlowLoadingElementProps` |
| `nextState` | `SlowLoadingElementState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/fast-prototyping/components/util.tsx:175](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L175)

___

### getDerivedStateFromProps

▸ `Static` **getDerivedStateFromProps**(`props`, `state`): `Partial`<`SlowLoadingElementState`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SlowLoadingElementProps` |
| `state` | `SlowLoadingElementState` |

#### Returns

`Partial`<`SlowLoadingElementState`\>

#### Defined in

[client/fast-prototyping/components/util.tsx:142](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/util.tsx#L142)
