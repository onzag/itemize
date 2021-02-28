[](../README.md) / [Exports](../modules.md) / [client/components/util/SetVar](../modules/client_components_util_setvar.md) / default

# Class: default

[client/components/util/SetVar](../modules/client_components_util_setvar.md).default

## Hierarchy

* *Component*<ISetVarProps\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_components_util_setvar.default.md#constructor)

### Properties

- [context](client_components_util_setvar.default.md#context)
- [props](client_components_util_setvar.default.md#props)
- [refs](client_components_util_setvar.default.md#refs)
- [state](client_components_util_setvar.default.md#state)
- [VAR\_LISTENER\_REGISTRY](client_components_util_setvar.default.md#var_listener_registry)
- [VAR\_REGISTRY](client_components_util_setvar.default.md#var_registry)
- [contextType](client_components_util_setvar.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_util_setvar.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_util_setvar.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_util_setvar.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_util_setvar.default.md#componentdidcatch)
- [componentDidMount](client_components_util_setvar.default.md#componentdidmount)
- [componentDidUpdate](client_components_util_setvar.default.md#componentdidupdate)
- [componentWillMount](client_components_util_setvar.default.md#componentwillmount)
- [componentWillReceiveProps](client_components_util_setvar.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_util_setvar.default.md#componentwillunmount)
- [componentWillUpdate](client_components_util_setvar.default.md#componentwillupdate)
- [forceUpdate](client_components_util_setvar.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_util_setvar.default.md#getsnapshotbeforeupdate)
- [render](client_components_util_setvar.default.md#render)
- [setState](client_components_util_setvar.default.md#setstate)
- [shouldComponentUpdate](client_components_util_setvar.default.md#shouldcomponentupdate)
- [tickle](client_components_util_setvar.default.md#tickle)
- [addListener](client_components_util_setvar.default.md#addlistener)
- [removeListener](client_components_util_setvar.default.md#removelistener)

## Constructors

### constructor

\+ **new default**(`props`: ISetVarProps \| *Readonly*<ISetVarProps\>): [*default*](client_components_util_setvar.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | ISetVarProps \| *Readonly*<ISetVarProps\> |

**Returns:** [*default*](client_components_util_setvar.default.md)

Defined in: node_modules/@types/react/index.d.ts:476

\+ **new default**(`props`: ISetVarProps, `context`: *any*): [*default*](client_components_util_setvar.default.md)

**`deprecated`** 

**`see`** https://reactjs.org/docs/legacy-context.html

#### Parameters:

Name | Type |
:------ | :------ |
`props` | ISetVarProps |
`context` | *any* |

**Returns:** [*default*](client_components_util_setvar.default.md)

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

• `Readonly` **props**: *Readonly*<ISetVarProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

### VAR\_LISTENER\_REGISTRY

▪ `Static` **VAR\_LISTENER\_REGISTRY**: *object*

#### Type declaration:

Defined in: [client/components/util/SetVar.tsx:11](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L11)

___

### VAR\_REGISTRY

▪ `Static` **VAR\_REGISTRY**: *object*

#### Type declaration:

Defined in: [client/components/util/SetVar.tsx:10](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L10)

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<ISetVarProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ISetVarProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<ISetVarProps\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ISetVarProps\> |
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

▸ **componentDidMount**(): *void*

**Returns:** *void*

Defined in: [client/components/util/SetVar.tsx:35](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L35)

___

### componentDidUpdate

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<ISetVarProps\>, `prevState`: *Readonly*<{}\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ISetVarProps\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<ISetVarProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ISetVarProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/components/util/SetVar.tsx:51](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L51)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<ISetVarProps\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ISetVarProps\> |
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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<ISetVarProps\>, `prevState`: *Readonly*<{}\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ISetVarProps\> |
`prevState` | *Readonly*<{}\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### render

▸ **render**(): *any*

**Returns:** *any*

Defined in: [client/components/util/SetVar.tsx:55](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L55)

___

### setState

▸ **setState**<K\>(`state`: {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<ISetVarProps\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *never* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<ISetVarProps\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: ISetVarProps): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | ISetVarProps |

**Returns:** *boolean*

Defined in: [client/components/util/SetVar.tsx:39](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L39)

___

### tickle

▸ **tickle**(`id`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |

**Returns:** *void*

Defined in: [client/components/util/SetVar.tsx:29](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L29)

___

### addListener

▸ `Static`**addListener**(`id`: *string*, `listener`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`listener` | () => *void* |

**Returns:** *void*

Defined in: [client/components/util/SetVar.tsx:12](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L12)

___

### removeListener

▸ `Static`**removeListener**(`id`: *string*, `listener`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`listener` | () => *void* |

**Returns:** *void*

Defined in: [client/components/util/SetVar.tsx:20](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/SetVar.tsx#L20)
