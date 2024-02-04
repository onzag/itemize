[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/search/PagedSearchLoader](../modules/client_components_search_PagedSearchLoader.md) / PagedSearchLoader

# Class: PagedSearchLoader

[client/components/search/PagedSearchLoader](../modules/client_components_search_PagedSearchLoader.md).PagedSearchLoader

The page search loader component allows for creating pagination UI elements rather
simply, it extends the standard search loader for this, it uses the navigation in order
to store its page number so that searches are kept consistent

## Hierarchy

- `Component`\<`IPagedSearchLoaderProps`, `IPagedSearchLoaderState`\>

  ↳ **`PagedSearchLoader`**

## Table of contents

### Constructors

- [constructor](client_components_search_PagedSearchLoader.PagedSearchLoader.md#constructor)

### Properties

- [context](client_components_search_PagedSearchLoader.PagedSearchLoader.md#context)
- [props](client_components_search_PagedSearchLoader.PagedSearchLoader.md#props)
- [refs](client_components_search_PagedSearchLoader.PagedSearchLoader.md#refs)
- [state](client_components_search_PagedSearchLoader.PagedSearchLoader.md#state)
- [contextType](client_components_search_PagedSearchLoader.PagedSearchLoader.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_search_PagedSearchLoader.PagedSearchLoader.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_search_PagedSearchLoader.PagedSearchLoader.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_search_PagedSearchLoader.PagedSearchLoader.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_search_PagedSearchLoader.PagedSearchLoader.md#componentdidcatch)
- [componentDidMount](client_components_search_PagedSearchLoader.PagedSearchLoader.md#componentdidmount)
- [componentDidUpdate](client_components_search_PagedSearchLoader.PagedSearchLoader.md#componentdidupdate)
- [componentWillMount](client_components_search_PagedSearchLoader.PagedSearchLoader.md#componentwillmount)
- [componentWillReceiveProps](client_components_search_PagedSearchLoader.PagedSearchLoader.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_search_PagedSearchLoader.PagedSearchLoader.md#componentwillunmount)
- [componentWillUpdate](client_components_search_PagedSearchLoader.PagedSearchLoader.md#componentwillupdate)
- [forceUpdate](client_components_search_PagedSearchLoader.PagedSearchLoader.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_search_PagedSearchLoader.PagedSearchLoader.md#getsnapshotbeforeupdate)
- [goToNextPage](client_components_search_PagedSearchLoader.PagedSearchLoader.md#gotonextpage)
- [goToPage](client_components_search_PagedSearchLoader.PagedSearchLoader.md#gotopage)
- [goToPrevPage](client_components_search_PagedSearchLoader.PagedSearchLoader.md#gotoprevpage)
- [onSearchDataChange](client_components_search_PagedSearchLoader.PagedSearchLoader.md#onsearchdatachange)
- [render](client_components_search_PagedSearchLoader.PagedSearchLoader.md#render)
- [renderPagedLoader](client_components_search_PagedSearchLoader.PagedSearchLoader.md#renderpagedloader)
- [setState](client_components_search_PagedSearchLoader.PagedSearchLoader.md#setstate)
- [shouldComponentUpdate](client_components_search_PagedSearchLoader.PagedSearchLoader.md#shouldcomponentupdate)

## Constructors

### constructor

• **new PagedSearchLoader**(`props`): [`PagedSearchLoader`](client_components_search_PagedSearchLoader.PagedSearchLoader.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IPagedSearchLoaderProps` |

#### Returns

[`PagedSearchLoader`](client_components_search_PagedSearchLoader.PagedSearchLoader.md)

#### Overrides

React.Component\&lt;IPagedSearchLoaderProps, IPagedSearchLoaderState\&gt;.constructor

#### Defined in

[client/components/search/PagedSearchLoader.tsx:99](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/PagedSearchLoader.tsx#L99)

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

• `Readonly` **props**: `Readonly`\<`IPagedSearchLoaderProps`\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`\<`IPagedSearchLoaderState`\>

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
| `nextProps` | `Readonly`\<`IPagedSearchLoaderProps`\> |
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
| `nextProps` | `Readonly`\<`IPagedSearchLoaderProps`\> |
| `nextState` | `Readonly`\<`IPagedSearchLoaderState`\> |
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

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

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
| `prevProps` | `Readonly`\<`IPagedSearchLoaderProps`\> |
| `prevState` | `Readonly`\<`IPagedSearchLoaderState`\> |
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
| `nextProps` | `Readonly`\<`IPagedSearchLoaderProps`\> |
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
| `nextProps` | `Readonly`\<`IPagedSearchLoaderProps`\> |
| `nextState` | `Readonly`\<`IPagedSearchLoaderState`\> |
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
| `prevProps` | `Readonly`\<`IPagedSearchLoaderProps`\> |
| `prevState` | `Readonly`\<`IPagedSearchLoaderState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### goToNextPage

▸ **goToNextPage**(`currentPage`, `hasNextPage`, `setState`, `pLoc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentPage` | `number` |
| `hasNextPage` | `boolean` |
| `setState` | (`qs`: \{ `[pLoc: string]`: `string`; `r`: `string`  }) => `void` |
| `pLoc` | `string` |

#### Returns

`void`

#### Defined in

[client/components/search/PagedSearchLoader.tsx:112](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/PagedSearchLoader.tsx#L112)

___

### goToPage

▸ **goToPage**(`setState`, `pLoc`, `page`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `setState` | (`qs`: \{ `[pLoc: string]`: `string`; `r`: `string`  }) => `void` |
| `pLoc` | `string` |
| `page` | `number` |

#### Returns

`void`

#### Defined in

[client/components/search/PagedSearchLoader.tsx:130](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/PagedSearchLoader.tsx#L130)

___

### goToPrevPage

▸ **goToPrevPage**(`currentPage`, `hasPrevPage`, `setState`, `pLoc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentPage` | `number` |
| `hasPrevPage` | `boolean` |
| `setState` | (`qs`: \{ `[pLoc: string]`: `string`; `r`: `string`  }) => `void` |
| `pLoc` | `string` |

#### Returns

`void`

#### Defined in

[client/components/search/PagedSearchLoader.tsx:121](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/PagedSearchLoader.tsx#L121)

___

### onSearchDataChange

▸ **onSearchDataChange**(`actualP`, `setState`, `pLoc`, `searchId`, `wasRestored`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `actualP` | `number` |
| `setState` | (`qs`: \{ `[pLoc: string]`: `string`; `r`: `string`  }) => `void` |
| `pLoc` | `string` |
| `searchId` | `string` |
| `wasRestored` | `boolean` |

#### Returns

`number`

#### Defined in

[client/components/search/PagedSearchLoader.tsx:140](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/PagedSearchLoader.tsx#L140)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/components/search/PagedSearchLoader.tsx:181](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/PagedSearchLoader.tsx#L181)

___

### renderPagedLoader

▸ **renderPagedLoader**(`state`, `setState`, `pLoc`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPagedSearchLoaderState` |
| `setState` | (`qs`: \{ `[pLoc: string]`: `string`; `r`: `string`  }) => `void` |
| `pLoc` | `string` |

#### Returns

`Element`

#### Defined in

[client/components/search/PagedSearchLoader.tsx:156](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/PagedSearchLoader.tsx#L156)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPagedSearchLoaderState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPagedSearchLoaderState` \| (`prevState`: `Readonly`\<`IPagedSearchLoaderState`\>, `props`: `Readonly`\<`IPagedSearchLoaderProps`\>) => `IPagedSearchLoaderState` \| `Pick`\<`IPagedSearchLoaderState`, `K`\> \| `Pick`\<`IPagedSearchLoaderState`, `K`\> |
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
| `nextProps` | `IPagedSearchLoaderProps` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/components/search/PagedSearchLoader.tsx:136](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/PagedSearchLoader.tsx#L136)
