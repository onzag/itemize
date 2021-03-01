[](../README.md) / [Exports](../modules.md) / [client/internal/providers/locale-provider](../modules/client_internal_providers_locale_provider.md) / LocaleProvider

# Class: LocaleProvider

[client/internal/providers/locale-provider](../modules/client_internal_providers_locale_provider.md).LocaleProvider

The locale provider creates a context that serves the locale information
down the components, should be placed inside the app as the locale is
dynamic and controlled by the app, on top of the main

## Hierarchy

* *Component*<ILocaleProviderProps\>

  ↳ **LocaleProvider**

## Table of contents

### Constructors

- [constructor](client_internal_providers_locale_provider.localeprovider.md#constructor)

### Properties

- [context](client_internal_providers_locale_provider.localeprovider.md#context)
- [props](client_internal_providers_locale_provider.localeprovider.md#props)
- [refs](client_internal_providers_locale_provider.localeprovider.md#refs)
- [state](client_internal_providers_locale_provider.localeprovider.md#state)
- [contextType](client_internal_providers_locale_provider.localeprovider.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_providers_locale_provider.localeprovider.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_providers_locale_provider.localeprovider.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_providers_locale_provider.localeprovider.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_providers_locale_provider.localeprovider.md#componentdidcatch)
- [componentDidMount](client_internal_providers_locale_provider.localeprovider.md#componentdidmount)
- [componentDidUpdate](client_internal_providers_locale_provider.localeprovider.md#componentdidupdate)
- [componentWillMount](client_internal_providers_locale_provider.localeprovider.md#componentwillmount)
- [componentWillReceiveProps](client_internal_providers_locale_provider.localeprovider.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_providers_locale_provider.localeprovider.md#componentwillunmount)
- [componentWillUpdate](client_internal_providers_locale_provider.localeprovider.md#componentwillupdate)
- [forceUpdate](client_internal_providers_locale_provider.localeprovider.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_providers_locale_provider.localeprovider.md#getsnapshotbeforeupdate)
- [render](client_internal_providers_locale_provider.localeprovider.md#render)
- [setState](client_internal_providers_locale_provider.localeprovider.md#setstate)
- [shouldComponentUpdate](client_internal_providers_locale_provider.localeprovider.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new LocaleProvider**(`props`: ILocaleProviderProps \| *Readonly*<ILocaleProviderProps\>): [*LocaleProvider*](client_internal_providers_locale_provider.localeprovider.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | ILocaleProviderProps \| *Readonly*<ILocaleProviderProps\> |

**Returns:** [*LocaleProvider*](client_internal_providers_locale_provider.localeprovider.md)

Defined in: node_modules/@types/react/index.d.ts:476

\+ **new LocaleProvider**(`props`: ILocaleProviderProps, `context`: *any*): [*LocaleProvider*](client_internal_providers_locale_provider.localeprovider.md)

**`deprecated`** 

**`see`** https://reactjs.org/docs/legacy-context.html

#### Parameters:

Name | Type |
:------ | :------ |
`props` | ILocaleProviderProps |
`context` | *any* |

**Returns:** [*LocaleProvider*](client_internal_providers_locale_provider.localeprovider.md)

Defined in: node_modules/@types/react/index.d.ts:478

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

• `Readonly` **props**: *Readonly*<ILocaleProviderProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<ILocaleProviderProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ILocaleProviderProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<ILocaleProviderProps\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ILocaleProviderProps\> |
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

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<ILocaleProviderProps\>, `prevState`: *Readonly*<{}\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ILocaleProviderProps\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<ILocaleProviderProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ILocaleProviderProps\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<ILocaleProviderProps\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ILocaleProviderProps\> |
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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<ILocaleProviderProps\>, `prevState`: *Readonly*<{}\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ILocaleProviderProps\> |
`prevState` | *Readonly*<{}\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/providers/locale-provider.tsx:102](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/providers/locale-provider.tsx#L102)

___

### setState

▸ **setState**<K\>(`state`: {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<ILocaleProviderProps\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *never* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<ILocaleProviderProps\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: ILocaleProviderProps): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | ILocaleProviderProps |

**Returns:** *boolean*

Defined in: [client/internal/providers/locale-provider.tsx:93](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/providers/locale-provider.tsx#L93)
