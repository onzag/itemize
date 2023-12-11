[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/dynamic-component](../modules/client_internal_text_serializer_dynamic_component.md) / ReactifiedElementWithHoverAndActive

# Class: ReactifiedElementWithHoverAndActive

[client/internal/text/serializer/dynamic-component](../modules/client_internal_text_serializer_dynamic_component.md).ReactifiedElementWithHoverAndActive

Represents a standard html component where styleActive and styleHover as well as a Tag are defined
in order to render with the given props

## Hierarchy

- `PureComponent`\<`IReactifiedElementWithHoverAndActiveProps`, `IReactifiedElementWithHoverAndActiveState`\>

  ↳ **`ReactifiedElementWithHoverAndActive`**

## Table of contents

### Constructors

- [constructor](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#constructor)

### Properties

- [context](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#context)
- [props](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#props)
- [refElement](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#refelement)
- [refs](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#refs)
- [state](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#state)
- [contextType](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#componentdidcatch)
- [componentDidMount](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#componentdidmount)
- [componentDidUpdate](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#componentdidupdate)
- [componentWillMount](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#componentwillmount)
- [componentWillReceiveProps](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#componentwillunmount)
- [componentWillUpdate](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#componentwillupdate)
- [forceUpdate](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#forceupdate)
- [getElement](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#getelement)
- [getSnapshotBeforeUpdate](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#getsnapshotbeforeupdate)
- [onActiveEnd](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#onactiveend)
- [onActiveStart](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#onactivestart)
- [onHoverEnd](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#onhoverend)
- [onHoverStart](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#onhoverstart)
- [render](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#render)
- [setState](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#setstate)
- [shouldComponentUpdate](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md#shouldcomponentupdate)

## Constructors

### constructor

• **new ReactifiedElementWithHoverAndActive**(`props`): [`ReactifiedElementWithHoverAndActive`](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IReactifiedElementWithHoverAndActiveProps` |

#### Returns

[`ReactifiedElementWithHoverAndActive`](client_internal_text_serializer_dynamic_component.ReactifiedElementWithHoverAndActive.md)

#### Overrides

React.PureComponent\&lt;IReactifiedElementWithHoverAndActiveProps, IReactifiedElementWithHoverAndActiveState\&gt;.constructor

#### Defined in

[client/internal/text/serializer/dynamic-component.tsx:33](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/dynamic-component.tsx#L33)

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

• `Readonly` **props**: `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

#### Inherited from

React.PureComponent.props

#### Defined in

node_modules/@types/react/index.d.ts:498

___

### refElement

• `Private` **refElement**: `RefObject`\<`any`\>

#### Defined in

[client/internal/text/serializer/dynamic-component.tsx:32](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/dynamic-component.tsx#L32)

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

• **state**: `Readonly`\<`IReactifiedElementWithHoverAndActiveState`\>

#### Inherited from

React.PureComponent.state

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
| `nextProps` | `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\> |
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
| `nextProps` | `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\> |
| `nextState` | `Readonly`\<`IReactifiedElementWithHoverAndActiveState`\> |
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

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:619

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\> |
| `prevState` | `Readonly`\<`IReactifiedElementWithHoverAndActiveState`\> |
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
| `nextProps` | `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\> |
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

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUnmount

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
| `nextProps` | `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\> |
| `nextState` | `Readonly`\<`IReactifiedElementWithHoverAndActiveState`\> |
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

### getElement

▸ **getElement**(): `any`

#### Returns

`any`

#### Defined in

[client/internal/text/serializer/dynamic-component.tsx:79](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/dynamic-component.tsx#L79)

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
| `prevProps` | `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\> |
| `prevState` | `Readonly`\<`IReactifiedElementWithHoverAndActiveState`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onActiveEnd

▸ **onActiveEnd**(`originalFn`, `e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalFn` | (`arg`: `MouseEvent`\<`HTMLElement`, `MouseEvent`\>) => `void` |
| `e` | `MouseEvent`\<`HTMLElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/internal/text/serializer/dynamic-component.tsx:71](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/dynamic-component.tsx#L71)

___

### onActiveStart

▸ **onActiveStart**(`originalFn`, `e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalFn` | (`arg`: `MouseEvent`\<`HTMLElement`, `MouseEvent`\>) => `void` |
| `e` | `MouseEvent`\<`HTMLElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/internal/text/serializer/dynamic-component.tsx:63](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/dynamic-component.tsx#L63)

___

### onHoverEnd

▸ **onHoverEnd**(`originalFn`, `e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalFn` | (`arg`: `MouseEvent`\<`HTMLElement`, `MouseEvent`\>) => `void` |
| `e` | `MouseEvent`\<`HTMLElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/internal/text/serializer/dynamic-component.tsx:55](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/dynamic-component.tsx#L55)

___

### onHoverStart

▸ **onHoverStart**(`originalFn`, `e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalFn` | (`arg`: `MouseEvent`\<`HTMLElement`, `MouseEvent`\>) => `void` |
| `e` | `MouseEvent`\<`HTMLElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/internal/text/serializer/dynamic-component.tsx:47](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/dynamic-component.tsx#L47)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[client/internal/text/serializer/dynamic-component.tsx:83](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/dynamic-component.tsx#L83)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IReactifiedElementWithHoverAndActiveState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IReactifiedElementWithHoverAndActiveState` \| (`prevState`: `Readonly`\<`IReactifiedElementWithHoverAndActiveState`\>, `props`: `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\>) => `IReactifiedElementWithHoverAndActiveState` \| `Pick`\<`IReactifiedElementWithHoverAndActiveState`, `K`\> \| `Pick`\<`IReactifiedElementWithHoverAndActiveState`, `K`\> |
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
| `nextProps` | `Readonly`\<`IReactifiedElementWithHoverAndActiveProps`\> |
| `nextState` | `Readonly`\<`IReactifiedElementWithHoverAndActiveState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
