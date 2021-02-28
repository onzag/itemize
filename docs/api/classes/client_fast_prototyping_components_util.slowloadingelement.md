[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/util](../modules/client_fast_prototyping_components_util.md) / SlowLoadingElement

# Class: SlowLoadingElement

[client/fast-prototyping/components/util](../modules/client_fast_prototyping_components_util.md).SlowLoadingElement

Some elements can be fairly heavy and slow loading, this component will detach the execution of some of these components
so that they don't have to slow down the execution of other code, doesn't play nice with SSR

## Hierarchy

* *Component*<SlowLoadingElementProps, SlowLoadingElementState\>

  ↳ **SlowLoadingElement**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_util.slowloadingelement.md#constructor)

### Properties

- [context](client_fast_prototyping_components_util.slowloadingelement.md#context)
- [props](client_fast_prototyping_components_util.slowloadingelement.md#props)
- [refs](client_fast_prototyping_components_util.slowloadingelement.md#refs)
- [state](client_fast_prototyping_components_util.slowloadingelement.md#state)
- [unmounted](client_fast_prototyping_components_util.slowloadingelement.md#unmounted)
- [contextType](client_fast_prototyping_components_util.slowloadingelement.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_util.slowloadingelement.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_util.slowloadingelement.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_util.slowloadingelement.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_components_util.slowloadingelement.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_util.slowloadingelement.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_util.slowloadingelement.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_util.slowloadingelement.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_util.slowloadingelement.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_util.slowloadingelement.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_util.slowloadingelement.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_components_util.slowloadingelement.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_util.slowloadingelement.md#getsnapshotbeforeupdate)
- [makeReady](client_fast_prototyping_components_util.slowloadingelement.md#makeready)
- [render](client_fast_prototyping_components_util.slowloadingelement.md#render)
- [setState](client_fast_prototyping_components_util.slowloadingelement.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_util.slowloadingelement.md#shouldcomponentupdate)
- [getDerivedStateFromProps](client_fast_prototyping_components_util.slowloadingelement.md#getderivedstatefromprops)

## Constructors

### constructor

\+ **new SlowLoadingElement**(`props`: SlowLoadingElementProps): [*SlowLoadingElement*](client_fast_prototyping_components_util.slowloadingelement.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | SlowLoadingElementProps |

**Returns:** [*SlowLoadingElement*](client_fast_prototyping_components_util.slowloadingelement.md)

Defined in: [client/fast-prototyping/components/util.tsx:150](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L150)

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

• `Readonly` **props**: *Readonly*<SlowLoadingElementProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<SlowLoadingElementState\>

Defined in: node_modules/@types/react/index.d.ts:502

___

### unmounted

• `Private` **unmounted**: *boolean*= false

Becomes true once unmounted, avoid setState on
unmounted components if the element really takes a while
to load

Defined in: [client/fast-prototyping/components/util.tsx:136](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L136)

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<SlowLoadingElementProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<SlowLoadingElementProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<SlowLoadingElementProps\>, `nextState`: *Readonly*<SlowLoadingElementState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<SlowLoadingElementProps\> |
`nextState` | *Readonly*<SlowLoadingElementState\> |
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

Defined in: [client/fast-prototyping/components/util.tsx:176](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L176)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: SlowLoadingElementProps, `prevState`: SlowLoadingElementState): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | SlowLoadingElementProps |
`prevState` | SlowLoadingElementState |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/util.tsx:179](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L179)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<SlowLoadingElementProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<SlowLoadingElementProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/util.tsx:185](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L185)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<SlowLoadingElementProps\>, `nextState`: *Readonly*<SlowLoadingElementState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<SlowLoadingElementProps\> |
`nextState` | *Readonly*<SlowLoadingElementState\> |
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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<SlowLoadingElementProps\>, `prevState`: *Readonly*<SlowLoadingElementState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<SlowLoadingElementProps\> |
`prevState` | *Readonly*<SlowLoadingElementState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### makeReady

▸ **makeReady**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/util.tsx:159](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L159)

___

### render

▸ **render**(): *object*

**Returns:** *object*

Defined in: [client/fast-prototyping/components/util.tsx:188](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L188)

___

### setState

▸ **setState**<K\>(`state`: SlowLoadingElementState \| (`prevState`: *Readonly*<SlowLoadingElementState\>, `props`: *Readonly*<SlowLoadingElementProps\>) => SlowLoadingElementState \| *Pick*<SlowLoadingElementState, K\> \| *Pick*<SlowLoadingElementState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *isReady* \| *readyForId* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | SlowLoadingElementState \| (`prevState`: *Readonly*<SlowLoadingElementState\>, `props`: *Readonly*<SlowLoadingElementProps\>) => SlowLoadingElementState \| *Pick*<SlowLoadingElementState, K\> \| *Pick*<SlowLoadingElementState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: SlowLoadingElementProps, `nextState`: SlowLoadingElementState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | SlowLoadingElementProps |
`nextState` | SlowLoadingElementState |

**Returns:** *boolean*

Defined in: [client/fast-prototyping/components/util.tsx:171](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L171)

___

### getDerivedStateFromProps

▸ `Static`**getDerivedStateFromProps**(`props`: SlowLoadingElementProps, `state`: SlowLoadingElementState): *Partial*<SlowLoadingElementState\>

#### Parameters:

Name | Type |
:------ | :------ |
`props` | SlowLoadingElementProps |
`state` | SlowLoadingElementState |

**Returns:** *Partial*<SlowLoadingElementState\>

Defined in: [client/fast-prototyping/components/util.tsx:138](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/util.tsx#L138)
