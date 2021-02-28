[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate/drawer/tree](../modules/client_fast_prototyping_components_slate_drawer_tree.md) / Tree

# Class: Tree

[client/fast-prototyping/components/slate/drawer/tree](../modules/client_fast_prototyping_components_slate_drawer_tree.md).Tree

## Hierarchy

* *PureComponent*<ITreeProps, ITreeState\>

  ↳ **Tree**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_slate_drawer_tree.tree.md#constructor)

### Properties

- [bodyDiv](client_fast_prototyping_components_slate_drawer_tree.tree.md#bodydiv)
- [buttonRef](client_fast_prototyping_components_slate_drawer_tree.tree.md#buttonref)
- [context](client_fast_prototyping_components_slate_drawer_tree.tree.md#context)
- [internalsRef](client_fast_prototyping_components_slate_drawer_tree.tree.md#internalsref)
- [lastEffectTime](client_fast_prototyping_components_slate_drawer_tree.tree.md#lasteffecttime)
- [props](client_fast_prototyping_components_slate_drawer_tree.tree.md#props)
- [refs](client_fast_prototyping_components_slate_drawer_tree.tree.md#refs)
- [state](client_fast_prototyping_components_slate_drawer_tree.tree.md#state)
- [contextType](client_fast_prototyping_components_slate_drawer_tree.tree.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_slate_drawer_tree.tree.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_slate_drawer_tree.tree.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_slate_drawer_tree.tree.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_components_slate_drawer_tree.tree.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_slate_drawer_tree.tree.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_slate_drawer_tree.tree.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_slate_drawer_tree.tree.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_slate_drawer_tree.tree.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_slate_drawer_tree.tree.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_slate_drawer_tree.tree.md#componentwillupdate)
- [endDrag](client_fast_prototyping_components_slate_drawer_tree.tree.md#enddrag)
- [endDragMouse](client_fast_prototyping_components_slate_drawer_tree.tree.md#enddragmouse)
- [endDragTouch](client_fast_prototyping_components_slate_drawer_tree.tree.md#enddragtouch)
- [forceUpdate](client_fast_prototyping_components_slate_drawer_tree.tree.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_slate_drawer_tree.tree.md#getsnapshotbeforeupdate)
- [moveDrag](client_fast_prototyping_components_slate_drawer_tree.tree.md#movedrag)
- [moveDragMouse](client_fast_prototyping_components_slate_drawer_tree.tree.md#movedragmouse)
- [moveDragTouch](client_fast_prototyping_components_slate_drawer_tree.tree.md#movedragtouch)
- [onTreeElementBeginsDrag](client_fast_prototyping_components_slate_drawer_tree.tree.md#ontreeelementbeginsdrag)
- [onTreeElementEndsDrag](client_fast_prototyping_components_slate_drawer_tree.tree.md#ontreeelementendsdrag)
- [render](client_fast_prototyping_components_slate_drawer_tree.tree.md#render)
- [setState](client_fast_prototyping_components_slate_drawer_tree.tree.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_slate_drawer_tree.tree.md#shouldcomponentupdate)
- [startDrag](client_fast_prototyping_components_slate_drawer_tree.tree.md#startdrag)
- [startDragMouse](client_fast_prototyping_components_slate_drawer_tree.tree.md#startdragmouse)
- [startDragTouch](client_fast_prototyping_components_slate_drawer_tree.tree.md#startdragtouch)

## Constructors

### constructor

\+ **new Tree**(`props`: ITreeProps): [*Tree*](client_fast_prototyping_components_slate_drawer_tree.tree.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | ITreeProps |

**Returns:** [*Tree*](client_fast_prototyping_components_slate_drawer_tree.tree.md)

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:185](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L185)

## Properties

### bodyDiv

• `Private` **bodyDiv**: HTMLDivElement

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:182](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L182)

___

### buttonRef

• `Private` **buttonRef**: *RefObject*<HTMLButtonElement\>

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:185](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L185)

___

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

### internalsRef

• `Private` **internalsRef**: *RefObject*<HTMLDivElement\>

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:184](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L184)

___

### lastEffectTime

• `Private` **lastEffectTime**: *number*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:183](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L183)

___

### props

• `Readonly` **props**: *Readonly*<ITreeProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<ITreeState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<ITreeProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ITreeProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<ITreeProps\>, `nextState`: *Readonly*<ITreeState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ITreeProps\> |
`nextState` | *Readonly*<ITreeState\> |
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

▸ **componentDidUpdate**(`prevProps`: ITreeProps, `prevState`: ITreeState): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | ITreeProps |
`prevState` | ITreeState |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:212](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L212)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<ITreeProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ITreeProps\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<ITreeProps\>, `nextState`: *Readonly*<ITreeState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ITreeProps\> |
`nextState` | *Readonly*<ITreeState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### endDrag

▸ **endDrag**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:315](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L315)

___

### endDragMouse

▸ **endDragMouse**(`e`: MouseEvent): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`e` | MouseEvent |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:305](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L305)

___

### endDragTouch

▸ **endDragTouch**(`e`: TouchEvent): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`e` | TouchEvent |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:310](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L310)

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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<ITreeProps\>, `prevState`: *Readonly*<ITreeState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ITreeProps\> |
`prevState` | *Readonly*<ITreeState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### moveDrag

▸ **moveDrag**(`x`: *number*, `y`: *number*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`x` | *number* |
`y` | *number* |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:295](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L295)

___

### moveDragMouse

▸ **moveDragMouse**(`e`: MouseEvent): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`e` | MouseEvent |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:289](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L289)

___

### moveDragTouch

▸ **moveDragTouch**(`e`: TouchEvent): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`e` | TouchEvent |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:292](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L292)

___

### onTreeElementBeginsDrag

▸ **onTreeElementBeginsDrag**(`element`: [*RichElement*](../modules/client_internal_text_serializer.md#richelement), `at`: Path): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`element` | [*RichElement*](../modules/client_internal_text_serializer.md#richelement) |
`at` | Path |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:249](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L249)

___

### onTreeElementEndsDrag

▸ **onTreeElementEndsDrag**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:258](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L258)

___

### render

▸ **render**(): *object*

**Returns:** *object*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:344](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L344)

___

### setState

▸ **setState**<K\>(`state`: ITreeState \| (`prevState`: *Readonly*<ITreeState\>, `props`: *Readonly*<ITreeProps\>) => ITreeState \| *Pick*<ITreeState, K\> \| *Pick*<ITreeState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *x* \| *y* \| *draggingAt* \| *dragging* \| *showDrag* \| *initialX* \| *initialY* \| *calculatedHoleHeight* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | ITreeState \| (`prevState`: *Readonly*<ITreeState\>, `props`: *Readonly*<ITreeProps\>) => ITreeState \| *Pick*<ITreeState, K\> \| *Pick*<ITreeState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<ITreeProps\>, `nextState`: *Readonly*<ITreeState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<ITreeProps\> |
`nextState` | *Readonly*<ITreeState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631

___

### startDrag

▸ **startDrag**(`x`: *number*, `y`: *number*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`x` | *number* |
`y` | *number* |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:274](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L274)

___

### startDragMouse

▸ **startDragMouse**(`e`: *MouseEvent*<Element, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`e` | *MouseEvent*<Element, MouseEvent\> |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:264](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L264)

___

### startDragTouch

▸ **startDragTouch**(`e`: *TouchEvent*<Element\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`e` | *TouchEvent*<Element\> |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/slate/drawer/tree.tsx:269](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/components/slate/drawer/tree.tsx#L269)
