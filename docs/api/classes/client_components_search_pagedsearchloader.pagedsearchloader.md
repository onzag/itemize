[](../README.md) / [Exports](../modules.md) / [client/components/search/PagedSearchLoader](../modules/client_components_search_pagedsearchloader.md) / PagedSearchLoader

# Class: PagedSearchLoader

[client/components/search/PagedSearchLoader](../modules/client_components_search_pagedsearchloader.md).PagedSearchLoader

The page search loader component allows for creating pagination UI elements rather
simply, it extends the standard search loader for this, it uses the navigation in order
to store its page number so that searches are kept consistent

## Hierarchy

* *Component*<IPagedSearchLoaderProps\>

  ↳ **PagedSearchLoader**

## Table of contents

### Constructors

- [constructor](client_components_search_pagedsearchloader.pagedsearchloader.md#constructor)

### Properties

- [context](client_components_search_pagedsearchloader.pagedsearchloader.md#context)
- [props](client_components_search_pagedsearchloader.pagedsearchloader.md#props)
- [refs](client_components_search_pagedsearchloader.pagedsearchloader.md#refs)
- [state](client_components_search_pagedsearchloader.pagedsearchloader.md#state)
- [contextType](client_components_search_pagedsearchloader.pagedsearchloader.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_search_pagedsearchloader.pagedsearchloader.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_search_pagedsearchloader.pagedsearchloader.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_search_pagedsearchloader.pagedsearchloader.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_search_pagedsearchloader.pagedsearchloader.md#componentdidcatch)
- [componentDidMount](client_components_search_pagedsearchloader.pagedsearchloader.md#componentdidmount)
- [componentDidUpdate](client_components_search_pagedsearchloader.pagedsearchloader.md#componentdidupdate)
- [componentWillMount](client_components_search_pagedsearchloader.pagedsearchloader.md#componentwillmount)
- [componentWillReceiveProps](client_components_search_pagedsearchloader.pagedsearchloader.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_search_pagedsearchloader.pagedsearchloader.md#componentwillunmount)
- [componentWillUpdate](client_components_search_pagedsearchloader.pagedsearchloader.md#componentwillupdate)
- [forceUpdate](client_components_search_pagedsearchloader.pagedsearchloader.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_search_pagedsearchloader.pagedsearchloader.md#getsnapshotbeforeupdate)
- [goToNextPage](client_components_search_pagedsearchloader.pagedsearchloader.md#gotonextpage)
- [goToPage](client_components_search_pagedsearchloader.pagedsearchloader.md#gotopage)
- [goToPrevPage](client_components_search_pagedsearchloader.pagedsearchloader.md#gotoprevpage)
- [onSearchDataChange](client_components_search_pagedsearchloader.pagedsearchloader.md#onsearchdatachange)
- [render](client_components_search_pagedsearchloader.pagedsearchloader.md#render)
- [setState](client_components_search_pagedsearchloader.pagedsearchloader.md#setstate)
- [shouldComponentUpdate](client_components_search_pagedsearchloader.pagedsearchloader.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new PagedSearchLoader**(`props`: IPagedSearchLoaderProps): [*PagedSearchLoader*](client_components_search_pagedsearchloader.pagedsearchloader.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IPagedSearchLoaderProps |

**Returns:** [*PagedSearchLoader*](client_components_search_pagedsearchloader.pagedsearchloader.md)

Defined in: [client/components/search/PagedSearchLoader.tsx:58](https://github.com/onzag/itemize/blob/28218320/client/components/search/PagedSearchLoader.tsx#L58)

## Properties

### context

• **context**: *any*

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

Defined in: node_modules/@types/react/index.d.ts:476

___

### props

• `Readonly` **props**: *Readonly*<IPagedSearchLoaderProps\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### state

• **state**: *Readonly*<{}\>

Defined in: node_modules/@types/react/index.d.ts:502

___

### contextType

▪ `Optional` `Static` **contextType**: *Context*<any\>

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

Defined in: node_modules/@types/react/index.d.ts:458

## Methods

### UNSAFE\_componentWillMount

▸ `Optional`**UNSAFE_componentWillMount**(): *void*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:712

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<IPagedSearchLoaderProps\>, `nextContext`: *any*): *void*

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

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IPagedSearchLoaderProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<IPagedSearchLoaderProps\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IPagedSearchLoaderProps\> |
`nextState` | *Readonly*<{}\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### componentDidCatch

▸ `Optional`**componentDidCatch**(`error`: Error, `errorInfo`: ErrorInfo): *void*

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error |
`errorInfo` | ErrorInfo |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:641

___

### componentDidMount

▸ `Optional`**componentDidMount**(): *void*

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:620

___

### componentDidUpdate

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<IPagedSearchLoaderProps\>, `prevState`: *Readonly*<{}\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IPagedSearchLoaderProps\> |
`prevState` | *Readonly*<{}\> |
`snapshot?` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:683

___

### componentWillMount

▸ `Optional`**componentWillMount**(): *void*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:698

___

### componentWillReceiveProps

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<IPagedSearchLoaderProps\>, `nextContext`: *any*): *void*

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IPagedSearchLoaderProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ `Optional`**componentWillUnmount**(): *void*

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:636

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<IPagedSearchLoaderProps\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IPagedSearchLoaderProps\> |
`nextState` | *Readonly*<{}\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### forceUpdate

▸ **forceUpdate**(`callback?`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:493

___

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<IPagedSearchLoaderProps\>, `prevState`: *Readonly*<{}\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IPagedSearchLoaderProps\> |
`prevState` | *Readonly*<{}\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### goToNextPage

▸ **goToNextPage**(`currentPage`: *number*, `hasNextPage`: *boolean*, `setState`: (`qs`: { `p`: *string* ; `r`: *string*  }) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`currentPage` | *number* |
`hasNextPage` | *boolean* |
`setState` | (`qs`: { `p`: *string* ; `r`: *string*  }) => *void* |

**Returns:** *void*

Defined in: [client/components/search/PagedSearchLoader.tsx:67](https://github.com/onzag/itemize/blob/28218320/client/components/search/PagedSearchLoader.tsx#L67)

___

### goToPage

▸ **goToPage**(`setState`: (`qs`: { `p`: *string* ; `r`: *string*  }) => *void*, `page`: *number*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`setState` | (`qs`: { `p`: *string* ; `r`: *string*  }) => *void* |
`page` | *number* |

**Returns:** *void*

Defined in: [client/components/search/PagedSearchLoader.tsx:85](https://github.com/onzag/itemize/blob/28218320/client/components/search/PagedSearchLoader.tsx#L85)

___

### goToPrevPage

▸ **goToPrevPage**(`currentPage`: *number*, `hasPrevPage`: *boolean*, `setState`: (`qs`: { `p`: *string* ; `r`: *string*  }) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`currentPage` | *number* |
`hasPrevPage` | *boolean* |
`setState` | (`qs`: { `p`: *string* ; `r`: *string*  }) => *void* |

**Returns:** *void*

Defined in: [client/components/search/PagedSearchLoader.tsx:76](https://github.com/onzag/itemize/blob/28218320/client/components/search/PagedSearchLoader.tsx#L76)

___

### onSearchDataChange

▸ **onSearchDataChange**(`actualP`: *number*, `setState`: (`qs`: { `p`: *string* ; `r`: *string*  }) => *void*, `searchId`: *string*, `wasRestored`: *boolean*): *number*

#### Parameters:

Name | Type |
:------ | :------ |
`actualP` | *number* |
`setState` | (`qs`: { `p`: *string* ; `r`: *string*  }) => *void* |
`searchId` | *string* |
`wasRestored` | *boolean* |

**Returns:** *number*

Defined in: [client/components/search/PagedSearchLoader.tsx:95](https://github.com/onzag/itemize/blob/28218320/client/components/search/PagedSearchLoader.tsx#L95)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/components/search/PagedSearchLoader.tsx:111](https://github.com/onzag/itemize/blob/28218320/client/components/search/PagedSearchLoader.tsx#L111)

___

### setState

▸ **setState**<K\>(`state`: {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<IPagedSearchLoaderProps\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *never* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<IPagedSearchLoaderProps\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: IPagedSearchLoaderProps): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | IPagedSearchLoaderProps |

**Returns:** *boolean*

Defined in: [client/components/search/PagedSearchLoader.tsx:91](https://github.com/onzag/itemize/blob/28218320/client/components/search/PagedSearchLoader.tsx#L91)
