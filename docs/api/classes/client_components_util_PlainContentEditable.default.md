[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/PlainContentEditable](../modules/client_components_util_PlainContentEditable.md) / default

# Class: default

[client/components/util/PlainContentEditable](../modules/client_components_util_PlainContentEditable.md).default

## Hierarchy

- `Component`\<`IPlainContentEditableProps`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_components_util_PlainContentEditable.default.md#constructor)

### Properties

- [context](client_components_util_PlainContentEditable.default.md#context)
- [elemRef](client_components_util_PlainContentEditable.default.md#elemref)
- [props](client_components_util_PlainContentEditable.default.md#props)
- [refs](client_components_util_PlainContentEditable.default.md#refs)
- [state](client_components_util_PlainContentEditable.default.md#state)
- [contextType](client_components_util_PlainContentEditable.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_util_PlainContentEditable.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_util_PlainContentEditable.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_util_PlainContentEditable.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_util_PlainContentEditable.default.md#componentdidcatch)
- [componentDidMount](client_components_util_PlainContentEditable.default.md#componentdidmount)
- [componentDidUpdate](client_components_util_PlainContentEditable.default.md#componentdidupdate)
- [componentWillMount](client_components_util_PlainContentEditable.default.md#componentwillmount)
- [componentWillReceiveProps](client_components_util_PlainContentEditable.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_util_PlainContentEditable.default.md#componentwillunmount)
- [componentWillUpdate](client_components_util_PlainContentEditable.default.md#componentwillupdate)
- [forceUpdate](client_components_util_PlainContentEditable.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_util_PlainContentEditable.default.md#getsnapshotbeforeupdate)
- [onBlur](client_components_util_PlainContentEditable.default.md#onblur)
- [onChange](client_components_util_PlainContentEditable.default.md#onchange)
- [onFocus](client_components_util_PlainContentEditable.default.md#onfocus)
- [render](client_components_util_PlainContentEditable.default.md#render)
- [setState](client_components_util_PlainContentEditable.default.md#setstate)
- [shouldComponentUpdate](client_components_util_PlainContentEditable.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_components_util_PlainContentEditable.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IPlainContentEditableProps` |

#### Returns

[`default`](client_components_util_PlainContentEditable.default.md)

#### Overrides

React.Component\&lt;IPlainContentEditableProps\&gt;.constructor

#### Defined in

[client/components/util/PlainContentEditable.tsx:18](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/PlainContentEditable.tsx#L18)

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

### elemRef

• `Private` **elemRef**: `RefObject`\<`HTMLElement`\>

#### Defined in

[client/components/util/PlainContentEditable.tsx:16](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/PlainContentEditable.tsx#L16)

___

### props

• `Readonly` **props**: `Readonly`\<`IPlainContentEditableProps`\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`\<{}\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:499

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
| `nextProps` | `Readonly`\<`IPlainContentEditableProps`\> |
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
| `nextProps` | `Readonly`\<`IPlainContentEditableProps`\> |
| `nextState` | `Readonly`\<{}\> |
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

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/components/util/PlainContentEditable.tsx:38](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/PlainContentEditable.tsx#L38)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<`IPlainContentEditableProps`\> |
| `prevState` | `Readonly`\<{}\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

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
| `nextProps` | `Readonly`\<`IPlainContentEditableProps`\> |
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

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.Component.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:635

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
| `nextProps` | `Readonly`\<`IPlainContentEditableProps`\> |
| `nextState` | `Readonly`\<{}\> |
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
| `prevProps` | `Readonly`\<`IPlainContentEditableProps`\> |
| `prevState` | `Readonly`\<{}\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onBlur

▸ **onBlur**(): `void`

#### Returns

`void`

#### Defined in

[client/components/util/PlainContentEditable.tsx:34](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/PlainContentEditable.tsx#L34)

___

### onChange

▸ **onChange**(): `void`

#### Returns

`void`

#### Defined in

[client/components/util/PlainContentEditable.tsx:27](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/PlainContentEditable.tsx#L27)

___

### onFocus

▸ **onFocus**(): `void`

#### Returns

`void`

#### Defined in

[client/components/util/PlainContentEditable.tsx:30](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/PlainContentEditable.tsx#L30)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/components/util/PlainContentEditable.tsx:62](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/PlainContentEditable.tsx#L62)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | {} \| (`prevState`: `Readonly`\<{}\>, `props`: `Readonly`\<`IPlainContentEditableProps`\>) => {} \| `Pick`\<{}, `K`\> \| `Pick`\<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `IPlainContentEditableProps` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/components/util/PlainContentEditable.tsx:43](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/PlainContentEditable.tsx#L43)
