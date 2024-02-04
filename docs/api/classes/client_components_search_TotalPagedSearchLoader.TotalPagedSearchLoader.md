[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/search/TotalPagedSearchLoader](../modules/client_components_search_TotalPagedSearchLoader.md) / TotalPagedSearchLoader

# Class: TotalPagedSearchLoader

[client/components/search/TotalPagedSearchLoader](../modules/client_components_search_TotalPagedSearchLoader.md).TotalPagedSearchLoader

The page search loader component allows for creating pagination UI elements rather
simply, it extends the standard search loader for this, it uses the navigation in order
to store its page number so that searches are kept consistent

When you do an automatic search ensure that:

the offset is divisible by the limit
the offset is divisible by the page size

however the purpose is that this loader tells you which numbers to use for the limit and offset
in the automatic search and all you need to provide is the page size for example

offset = 0
limit = 20
pageSize = 5

and let's say there is a total of 53 results this will result in

1. A chunk of 0-20 records (or even the entire data if traditional) being loaded
2. 1-4 pages being loaded
3. 11 pages being considered total

When selecting the 5th page out of 11, the loader will request you to change the offset to 20 while
keeping the limit still at 20

1. The chunk of 20-40 is now loaded
2. 5-8 pages are loaded

And when selecting page 9 and so on it changes the chunk constantly

note that the total paged loader is not well suited for realtime results due to its chunked nature
as you move among the pages the data may sort itself out of order

## Hierarchy

- `PureComponent`\<`ITotalPagedSearchLoaderProps`, `ITotalPagedSearchLoaderState`\>

  ↳ **`TotalPagedSearchLoader`**

## Table of contents

### Constructors

- [constructor](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#constructor)

### Properties

- [context](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#context)
- [props](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#props)
- [refs](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#refs)
- [state](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#state)
- [contextType](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#componentdidcatch)
- [componentDidMount](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#componentdidmount)
- [componentDidUpdate](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#componentdidupdate)
- [componentWillMount](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#componentwillmount)
- [componentWillReceiveProps](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#componentwillunmount)
- [componentWillUpdate](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#componentwillupdate)
- [forceUpdate](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#getsnapshotbeforeupdate)
- [render](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#render)
- [renderPagedLoader](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#renderpagedloader)
- [setState](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#setstate)
- [shouldComponentUpdate](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md#shouldcomponentupdate)

## Constructors

### constructor

• **new TotalPagedSearchLoader**(`props`): [`TotalPagedSearchLoader`](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ITotalPagedSearchLoaderProps` |

#### Returns

[`TotalPagedSearchLoader`](client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md)

#### Overrides

React.PureComponent\&lt;ITotalPagedSearchLoaderProps, ITotalPagedSearchLoaderState\&gt;.constructor

#### Defined in

[client/components/search/TotalPagedSearchLoader.tsx:323](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/TotalPagedSearchLoader.tsx#L323)

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

• `Readonly` **props**: `Readonly`\<`ITotalPagedSearchLoaderProps`\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`\<`ITotalPagedSearchLoaderState`\>

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
| `nextProps` | `Readonly`\<`ITotalPagedSearchLoaderProps`\> |
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
| `nextProps` | `Readonly`\<`ITotalPagedSearchLoaderProps`\> |
| `nextState` | `Readonly`\<`ITotalPagedSearchLoaderState`\> |
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
| `prevProps` | `Readonly`\<`ITotalPagedSearchLoaderProps`\> |
| `prevState` | `Readonly`\<`ITotalPagedSearchLoaderState`\> |
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
| `nextProps` | `Readonly`\<`ITotalPagedSearchLoaderProps`\> |
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
| `nextProps` | `Readonly`\<`ITotalPagedSearchLoaderProps`\> |
| `nextState` | `Readonly`\<`ITotalPagedSearchLoaderState`\> |
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
| `prevProps` | `Readonly`\<`ITotalPagedSearchLoaderProps`\> |
| `prevState` | `Readonly`\<`ITotalPagedSearchLoaderState`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[client/components/search/TotalPagedSearchLoader.tsx:343](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/TotalPagedSearchLoader.tsx#L343)

___

### renderPagedLoader

▸ **renderPagedLoader**(`limit`, `offset`, `count`, `state`, `setState`, `pLoc`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |
| `offset` | `number` |
| `count` | `number` |
| `state` | `ITotalPagedSearchLoaderState` |
| `setState` | (`qs`: `Partial`\<`ITotalPagedSearchLoaderState`\>) => `void` |
| `pLoc` | `string` |

#### Returns

`Element`

#### Defined in

[client/components/search/TotalPagedSearchLoader.tsx:330](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/TotalPagedSearchLoader.tsx#L330)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ITotalPagedSearchLoaderState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `ITotalPagedSearchLoaderState` \| (`prevState`: `Readonly`\<`ITotalPagedSearchLoaderState`\>, `props`: `Readonly`\<`ITotalPagedSearchLoaderProps`\>) => `ITotalPagedSearchLoaderState` \| `Pick`\<`ITotalPagedSearchLoaderState`, `K`\> \| `Pick`\<`ITotalPagedSearchLoaderState`, `K`\> |
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
| `nextProps` | `Readonly`\<`ITotalPagedSearchLoaderProps`\> |
| `nextState` | `Readonly`\<`ITotalPagedSearchLoaderState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
