[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/SetVar](../modules/client_components_util_SetVar.md) / default

# Class: default

[client/components/util/SetVar](../modules/client_components_util_SetVar.md).default

## Hierarchy

- `Component`<`ISetVarProps`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_components_util_SetVar.default.md#constructor)

### Properties

- [context](client_components_util_SetVar.default.md#context)
- [props](client_components_util_SetVar.default.md#props)
- [refs](client_components_util_SetVar.default.md#refs)
- [state](client_components_util_SetVar.default.md#state)
- [VAR\_LISTENER\_REGISTRY](client_components_util_SetVar.default.md#var_listener_registry)
- [VAR\_REGISTRY](client_components_util_SetVar.default.md#var_registry)
- [contextType](client_components_util_SetVar.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_util_SetVar.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_util_SetVar.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_util_SetVar.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_util_SetVar.default.md#componentdidcatch)
- [componentDidMount](client_components_util_SetVar.default.md#componentdidmount)
- [componentDidUpdate](client_components_util_SetVar.default.md#componentdidupdate)
- [componentWillMount](client_components_util_SetVar.default.md#componentwillmount)
- [componentWillReceiveProps](client_components_util_SetVar.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_util_SetVar.default.md#componentwillunmount)
- [componentWillUpdate](client_components_util_SetVar.default.md#componentwillupdate)
- [forceUpdate](client_components_util_SetVar.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_util_SetVar.default.md#getsnapshotbeforeupdate)
- [render](client_components_util_SetVar.default.md#render)
- [setState](client_components_util_SetVar.default.md#setstate)
- [shouldComponentUpdate](client_components_util_SetVar.default.md#shouldcomponentupdate)
- [tickle](client_components_util_SetVar.default.md#tickle)
- [addListener](client_components_util_SetVar.default.md#addlistener)
- [removeListener](client_components_util_SetVar.default.md#removelistener)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ISetVarProps` \| `Readonly`<`ISetVarProps`\> |

#### Inherited from

React.Component<ISetVarProps\>.constructor

#### Defined in

node_modules/@types/react/index.d.ts:481

• **new default**(`props`, `context`)

**`deprecated`**

**`see`** https://reactjs.org/docs/legacy-context.html

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ISetVarProps` |
| `context` | `any` |

#### Inherited from

React.Component<ISetVarProps\>.constructor

#### Defined in

node_modules/@types/react/index.d.ts:486

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

• `Readonly` **props**: `Readonly`<`ISetVarProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

### VAR\_LISTENER\_REGISTRY

▪ `Static` **VAR\_LISTENER\_REGISTRY**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: () => `void`[]

#### Defined in

[client/components/util/SetVar.tsx:12](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L12)

___

### VAR\_REGISTRY

▪ `Static` **VAR\_REGISTRY**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[client/components/util/SetVar.tsx:11](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L11)

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
| `nextProps` | `Readonly`<`ISetVarProps`\> |
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
| `nextProps` | `Readonly`<`ISetVarProps`\> |
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

[client/components/util/SetVar.tsx:36](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L36)

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`ISetVarProps`\> |
| `prevState` | `Readonly`<{}\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

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
| `nextProps` | `Readonly`<`ISetVarProps`\> |
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

[client/components/util/SetVar.tsx:95](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L95)

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
| `nextProps` | `Readonly`<`ISetVarProps`\> |
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
| `prevProps` | `Readonly`<`ISetVarProps`\> |
| `prevState` | `Readonly`<{}\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### render

▸ **render**(): `any`

#### Returns

`any`

#### Overrides

React.Component.render

#### Defined in

[client/components/util/SetVar.tsx:112](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L112)

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
| `state` | {} \| (`prevState`: `Readonly`<{}\>, `props`: `Readonly`<`ISetVarProps`\>) => {} \| `Pick`<{}, `K`\> \| `Pick`<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `ISetVarProps` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/components/util/SetVar.tsx:48](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L48)

___

### tickle

▸ **tickle**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[client/components/util/SetVar.tsx:30](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L30)

___

### addListener

▸ `Static` **addListener**(`id`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `listener` | () => `void` |

#### Returns

`void`

#### Defined in

[client/components/util/SetVar.tsx:13](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L13)

___

### removeListener

▸ `Static` **removeListener**(`id`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `listener` | () => `void` |

#### Returns

`void`

#### Defined in

[client/components/util/SetVar.tsx:21](https://github.com/onzag/itemize/blob/5c2808d3/client/components/util/SetVar.tsx#L21)
