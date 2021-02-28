[](../README.md) / [Exports](../modules.md) / [client/components/util](../modules/client_components_util.md) / DelayDisplay

# Class: DelayDisplay

[client/components/util](../modules/client_components_util.md).DelayDisplay

Allows to create a component that will only display after a given delay

## Hierarchy

* *PureComponent*<DelayDisplayProps, DelayDisplayState\>

  ↳ **DelayDisplay**

## Table of contents

### Constructors

- [constructor](client_components_util.delaydisplay.md#constructor)

### Properties

- [context](client_components_util.delaydisplay.md#context)
- [props](client_components_util.delaydisplay.md#props)
- [refs](client_components_util.delaydisplay.md#refs)
- [state](client_components_util.delaydisplay.md#state)
- [timer](client_components_util.delaydisplay.md#timer)
- [contextType](client_components_util.delaydisplay.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_util.delaydisplay.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_util.delaydisplay.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_util.delaydisplay.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_util.delaydisplay.md#componentdidcatch)
- [componentDidMount](client_components_util.delaydisplay.md#componentdidmount)
- [componentDidUpdate](client_components_util.delaydisplay.md#componentdidupdate)
- [componentWillMount](client_components_util.delaydisplay.md#componentwillmount)
- [componentWillReceiveProps](client_components_util.delaydisplay.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_util.delaydisplay.md#componentwillunmount)
- [componentWillUpdate](client_components_util.delaydisplay.md#componentwillupdate)
- [forceUpdate](client_components_util.delaydisplay.md#forceupdate)
- [getSnapshotBeforeUpdate](client_components_util.delaydisplay.md#getsnapshotbeforeupdate)
- [render](client_components_util.delaydisplay.md#render)
- [setState](client_components_util.delaydisplay.md#setstate)
- [shouldComponentUpdate](client_components_util.delaydisplay.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new DelayDisplay**(`props`: DelayDisplayProps): [*DelayDisplay*](client_components_util.delaydisplay.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | DelayDisplayProps |

**Returns:** [*DelayDisplay*](client_components_util.delaydisplay.md)

Defined in: [client/components/util/index.tsx:297](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/index.tsx#L297)

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

• `Readonly` **props**: *Readonly*<DelayDisplayProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<DelayDisplayState\>

Defined in: node_modules/@types/react/index.d.ts:502

___

### timer

• `Private` **timer**: *Timer*

Defined in: [client/components/util/index.tsx:297](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/index.tsx#L297)

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<DelayDisplayProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<DelayDisplayProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<DelayDisplayProps\>, `nextState`: *Readonly*<DelayDisplayState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<DelayDisplayProps\> |
`nextState` | *Readonly*<DelayDisplayState\> |
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

Defined in: [client/components/util/index.tsx:305](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/index.tsx#L305)

___

### componentDidUpdate

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<DelayDisplayProps\>, `prevState`: *Readonly*<DelayDisplayState\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<DelayDisplayProps\> |
`prevState` | *Readonly*<DelayDisplayState\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<DelayDisplayProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<DelayDisplayProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/components/util/index.tsx:312](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/index.tsx#L312)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<DelayDisplayProps\>, `nextState`: *Readonly*<DelayDisplayState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<DelayDisplayProps\> |
`nextState` | *Readonly*<DelayDisplayState\> |
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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<DelayDisplayProps\>, `prevState`: *Readonly*<DelayDisplayState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<DelayDisplayProps\> |
`prevState` | *Readonly*<DelayDisplayState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### render

▸ **render**(): *object*

**Returns:** *object*

Defined in: [client/components/util/index.tsx:315](https://github.com/onzag/itemize/blob/11a98dec/client/components/util/index.tsx#L315)

___

### setState

▸ **setState**<K\>(`state`: DelayDisplayState \| (`prevState`: *Readonly*<DelayDisplayState\>, `props`: *Readonly*<DelayDisplayProps\>) => DelayDisplayState \| *Pick*<DelayDisplayState, K\> \| *Pick*<DelayDisplayState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *shown* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | DelayDisplayState \| (`prevState`: *Readonly*<DelayDisplayState\>, `props`: *Readonly*<DelayDisplayProps\>) => DelayDisplayState \| *Pick*<DelayDisplayState, K\> \| *Pick*<DelayDisplayState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<DelayDisplayProps\>, `nextState`: *Readonly*<DelayDisplayState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<DelayDisplayProps\> |
`nextState` | *Readonly*<DelayDisplayState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631
