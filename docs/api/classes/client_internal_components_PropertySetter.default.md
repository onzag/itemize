[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertySetter](../modules/client_internal_components_PropertySetter.md) / default

# Class: default

[client/internal/components/PropertySetter](../modules/client_internal_components_PropertySetter.md).default

The property setter allows to manually set values for
properties, these then become readonly

## Hierarchy

- `Component`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md), {}\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertySetter.default.md#constructor)

### Properties

- [context](client_internal_components_PropertySetter.default.md#context)
- [props](client_internal_components_PropertySetter.default.md#props)
- [refs](client_internal_components_PropertySetter.default.md#refs)
- [state](client_internal_components_PropertySetter.default.md#state)
- [contextType](client_internal_components_PropertySetter.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertySetter.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertySetter.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertySetter.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_components_PropertySetter.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertySetter.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertySetter.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertySetter.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertySetter.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertySetter.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertySetter.default.md#componentwillupdate)
- [forceUpdate](client_internal_components_PropertySetter.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_components_PropertySetter.default.md#getsnapshotbeforeupdate)
- [render](client_internal_components_PropertySetter.default.md#render)
- [setState](client_internal_components_PropertySetter.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertySetter.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_internal_components_PropertySetter.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md) |

#### Returns

[`default`](client_internal_components_PropertySetter.default.md)

#### Overrides

React.Component\&lt;IPropertySetterBaseProps, \{}\&gt;.constructor

#### Defined in

[client/internal/components/PropertySetter/index.tsx:53](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L53)

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

### props

• `Readonly` **props**: `Readonly`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md)\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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
| `nextProps` | `Readonly`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md)\> |
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
| `nextProps` | `Readonly`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md)\> |
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

[client/internal/components/PropertySetter/index.tsx:56](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L56)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md) |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/internal/components/PropertySetter/index.tsx:65](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L65)

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
| `nextProps` | `Readonly`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md)\> |
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

#### Returns

`void`

#### Overrides

React.Component.componentWillUnmount

#### Defined in

[client/internal/components/PropertySetter/index.tsx:91](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L91)

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
| `nextProps` | `Readonly`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md)\> |
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
| `prevProps` | `Readonly`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md)\> |
| `prevState` | `Readonly`\<{}\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### render

▸ **render**(): `ReactNode`

#### Returns

`ReactNode`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertySetter/index.tsx:95](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L95)

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
| `state` | {} \| (`prevState`: `Readonly`\<{}\>, `props`: `Readonly`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md)\>) => {} \| `Pick`\<{}, `K`\> \| `Pick`\<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

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
| `nextProps` | `Readonly`\<[`IPropertySetterBaseProps`](../interfaces/client_internal_components_PropertySetter.IPropertySetterBaseProps.md)\> |
| `nextState` | `Readonly`\<{}\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
