[](../README.md) / [Exports](../modules.md) / [client/internal/text/serializer/dynamic-component](../modules/client_internal_text_serializer_dynamic_component.md) / ReactifiedElementWithHoverAndActive

# Class: ReactifiedElementWithHoverAndActive

[client/internal/text/serializer/dynamic-component](../modules/client_internal_text_serializer_dynamic_component.md).ReactifiedElementWithHoverAndActive

Represents a standard html component where styleActive and styleHover as well as a Tag are defined
in order to render with the given props

## Hierarchy

* *PureComponent*<IReactifiedElementWithHoverAndActiveProps, IReactifiedElementWithHoverAndActiveState\>

  ↳ **ReactifiedElementWithHoverAndActive**

## Table of contents

### Constructors

- [constructor](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#constructor)

### Properties

- [context](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#context)
- [props](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#props)
- [refs](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#refs)
- [state](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#state)
- [contextType](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#componentdidcatch)
- [componentDidMount](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#componentdidmount)
- [componentDidUpdate](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#componentdidupdate)
- [componentWillMount](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#componentwillmount)
- [componentWillReceiveProps](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#componentwillunmount)
- [componentWillUpdate](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#componentwillupdate)
- [forceUpdate](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#getsnapshotbeforeupdate)
- [onActiveEnd](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#onactiveend)
- [onActiveStart](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#onactivestart)
- [onHoverEnd](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#onhoverend)
- [onHoverStart](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#onhoverstart)
- [render](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#render)
- [setState](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#setstate)
- [shouldComponentUpdate](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new ReactifiedElementWithHoverAndActive**(`props`: *IReactifiedElementWithHoverAndActiveProps*): [*ReactifiedElementWithHoverAndActive*](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *IReactifiedElementWithHoverAndActiveProps* |

**Returns:** [*ReactifiedElementWithHoverAndActive*](client_internal_text_serializer_dynamic_component.reactifiedelementwithhoverandactive.md)

Defined in: [client/internal/text/serializer/dynamic-component.tsx:31](https://github.com/onzag/itemize/blob/11a98dec/client/internal/text/serializer/dynamic-component.tsx#L31)

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

• `Readonly` **props**: *Readonly*<IReactifiedElementWithHoverAndActiveProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<IReactifiedElementWithHoverAndActiveState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IReactifiedElementWithHoverAndActiveProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>, `nextState`: *Readonly*<IReactifiedElementWithHoverAndActiveState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IReactifiedElementWithHoverAndActiveProps\> |
`nextState` | *Readonly*<IReactifiedElementWithHoverAndActiveState\> |
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

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>, `prevState`: *Readonly*<IReactifiedElementWithHoverAndActiveState\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IReactifiedElementWithHoverAndActiveProps\> |
`prevState` | *Readonly*<IReactifiedElementWithHoverAndActiveState\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IReactifiedElementWithHoverAndActiveProps\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>, `nextState`: *Readonly*<IReactifiedElementWithHoverAndActiveState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IReactifiedElementWithHoverAndActiveProps\> |
`nextState` | *Readonly*<IReactifiedElementWithHoverAndActiveState\> |
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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>, `prevState`: *Readonly*<IReactifiedElementWithHoverAndActiveState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IReactifiedElementWithHoverAndActiveProps\> |
`prevState` | *Readonly*<IReactifiedElementWithHoverAndActiveState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### onActiveEnd

▸ **onActiveEnd**(`originalFn`: (`arg`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void*, `e`: *MouseEvent*<HTMLElement, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`originalFn` | (`arg`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void* |
`e` | *MouseEvent*<HTMLElement, MouseEvent\> |

**Returns:** *void*

Defined in: [client/internal/text/serializer/dynamic-component.tsx:70](https://github.com/onzag/itemize/blob/11a98dec/client/internal/text/serializer/dynamic-component.tsx#L70)

___

### onActiveStart

▸ **onActiveStart**(`originalFn`: (`arg`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void*, `e`: *MouseEvent*<HTMLElement, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`originalFn` | (`arg`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void* |
`e` | *MouseEvent*<HTMLElement, MouseEvent\> |

**Returns:** *void*

Defined in: [client/internal/text/serializer/dynamic-component.tsx:62](https://github.com/onzag/itemize/blob/11a98dec/client/internal/text/serializer/dynamic-component.tsx#L62)

___

### onHoverEnd

▸ **onHoverEnd**(`originalFn`: (`arg`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void*, `e`: *MouseEvent*<HTMLElement, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`originalFn` | (`arg`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void* |
`e` | *MouseEvent*<HTMLElement, MouseEvent\> |

**Returns:** *void*

Defined in: [client/internal/text/serializer/dynamic-component.tsx:54](https://github.com/onzag/itemize/blob/11a98dec/client/internal/text/serializer/dynamic-component.tsx#L54)

___

### onHoverStart

▸ **onHoverStart**(`originalFn`: (`arg`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void*, `e`: *MouseEvent*<HTMLElement, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`originalFn` | (`arg`: *MouseEvent*<HTMLElement, MouseEvent\>) => *void* |
`e` | *MouseEvent*<HTMLElement, MouseEvent\> |

**Returns:** *void*

Defined in: [client/internal/text/serializer/dynamic-component.tsx:46](https://github.com/onzag/itemize/blob/11a98dec/client/internal/text/serializer/dynamic-component.tsx#L46)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/text/serializer/dynamic-component.tsx:78](https://github.com/onzag/itemize/blob/11a98dec/client/internal/text/serializer/dynamic-component.tsx#L78)

___

### setState

▸ **setState**<K\>(`state`: IReactifiedElementWithHoverAndActiveState \| (`prevState`: *Readonly*<IReactifiedElementWithHoverAndActiveState\>, `props`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>) => IReactifiedElementWithHoverAndActiveState \| *Pick*<IReactifiedElementWithHoverAndActiveState, K\> \| *Pick*<IReactifiedElementWithHoverAndActiveState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *active* \| *hover* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IReactifiedElementWithHoverAndActiveState \| (`prevState`: *Readonly*<IReactifiedElementWithHoverAndActiveState\>, `props`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>) => IReactifiedElementWithHoverAndActiveState \| *Pick*<IReactifiedElementWithHoverAndActiveState, K\> \| *Pick*<IReactifiedElementWithHoverAndActiveState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<IReactifiedElementWithHoverAndActiveProps\>, `nextState`: *Readonly*<IReactifiedElementWithHoverAndActiveState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<IReactifiedElementWithHoverAndActiveProps\> |
`nextState` | *Readonly*<IReactifiedElementWithHoverAndActiveState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631
