[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/accessibility/AltScroller](../modules/client_components_accessibility_AltScroller.md) / ActualAltScroller

# Class: ActualAltScroller

[client/components/accessibility/AltScroller](../modules/client_components_accessibility_AltScroller.md).ActualAltScroller

## Hierarchy

- `PureComponent`<`IAltScrollerProps`, `IActualAltScrollerState`\>

  ↳ **`ActualAltScroller`**

## Table of contents

### Constructors

- [constructor](client_components_accessibility_AltScroller.ActualAltScroller.md#constructor)

### Properties

- [context](client_components_accessibility_AltScroller.ActualAltScroller.md#context)
- [props](client_components_accessibility_AltScroller.ActualAltScroller.md#props)
- [refs](client_components_accessibility_AltScroller.ActualAltScroller.md#refs)
- [spanRef](client_components_accessibility_AltScroller.ActualAltScroller.md#spanref)
- [state](client_components_accessibility_AltScroller.ActualAltScroller.md#state)
- [contextType](client_components_accessibility_AltScroller.ActualAltScroller.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_accessibility_AltScroller.ActualAltScroller.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_accessibility_AltScroller.ActualAltScroller.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_accessibility_AltScroller.ActualAltScroller.md#unsafe_componentwillupdate)
- [componentDidCatch](client_components_accessibility_AltScroller.ActualAltScroller.md#componentdidcatch)
- [componentDidMount](client_components_accessibility_AltScroller.ActualAltScroller.md#componentdidmount)
- [componentDidUpdate](client_components_accessibility_AltScroller.ActualAltScroller.md#componentdidupdate)
- [componentWillMount](client_components_accessibility_AltScroller.ActualAltScroller.md#componentwillmount)
- [componentWillReceiveProps](client_components_accessibility_AltScroller.ActualAltScroller.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_accessibility_AltScroller.ActualAltScroller.md#componentwillunmount)
- [componentWillUpdate](client_components_accessibility_AltScroller.ActualAltScroller.md#componentwillupdate)
- [disableScrolling](client_components_accessibility_AltScroller.ActualAltScroller.md#disablescrolling)
- [enableScrolling](client_components_accessibility_AltScroller.ActualAltScroller.md#enablescrolling)
- [forceUpdate](client_components_accessibility_AltScroller.ActualAltScroller.md#forceupdate)
- [getPriority](client_components_accessibility_AltScroller.ActualAltScroller.md#getpriority)
- [getScrollableComponent](client_components_accessibility_AltScroller.ActualAltScroller.md#getscrollablecomponent)
- [getSnapshotBeforeUpdate](client_components_accessibility_AltScroller.ActualAltScroller.md#getsnapshotbeforeupdate)
- [isDisabled](client_components_accessibility_AltScroller.ActualAltScroller.md#isdisabled)
- [isScrolling](client_components_accessibility_AltScroller.ActualAltScroller.md#isscrolling)
- [recalculateScrolls](client_components_accessibility_AltScroller.ActualAltScroller.md#recalculatescrolls)
- [register](client_components_accessibility_AltScroller.ActualAltScroller.md#register)
- [render](client_components_accessibility_AltScroller.ActualAltScroller.md#render)
- [scroll](client_components_accessibility_AltScroller.ActualAltScroller.md#scroll)
- [setBlocked](client_components_accessibility_AltScroller.ActualAltScroller.md#setblocked)
- [setState](client_components_accessibility_AltScroller.ActualAltScroller.md#setstate)
- [shouldComponentUpdate](client_components_accessibility_AltScroller.ActualAltScroller.md#shouldcomponentupdate)
- [triggerResize](client_components_accessibility_AltScroller.ActualAltScroller.md#triggerresize)
- [unregister](client_components_accessibility_AltScroller.ActualAltScroller.md#unregister)

## Constructors

### constructor

• **new ActualAltScroller**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IAltScrollerProps` |

#### Overrides

React.PureComponent&lt;IAltScrollerProps, IActualAltScrollerState\&gt;.constructor

#### Defined in

[client/components/accessibility/AltScroller.tsx:166](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L166)

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

**`see`** https://reactjs.org/docs/context.html

#### Inherited from

React.PureComponent.context

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### props

• `Readonly` **props**: `Readonly`<`IAltScrollerProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

React.PureComponent.props

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.PureComponent.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### spanRef

• `Private` **spanRef**: `RefObject`<`HTMLSpanElement`\>

#### Defined in

[client/components/accessibility/AltScroller.tsx:165](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L165)

___

### state

• **state**: `Readonly`<`IActualAltScrollerState`\>

#### Inherited from

React.PureComponent.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

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

#### Inherited from

React.PureComponent.contextType

#### Defined in

node_modules/@types/react/index.d.ts:461

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:717

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IAltScrollerProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:749

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IAltScrollerProps`\> |
| `nextState` | `Readonly`<`IActualAltScrollerState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

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

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

React.PureComponent.componentDidMount

#### Defined in

[client/components/accessibility/AltScroller.tsx:234](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L234)

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`IAltScrollerProps`\> |
| `prevState` | `Readonly`<`IActualAltScrollerState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:688

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:703

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IAltScrollerProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

#### Returns

`void`

#### Overrides

React.PureComponent.componentWillUnmount

#### Defined in

[client/components/accessibility/AltScroller.tsx:238](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L238)

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IAltScrollerProps`\> |
| `nextState` | `Readonly`<`IActualAltScrollerState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### disableScrolling

▸ **disableScrolling**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:247](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L247)

___

### enableScrolling

▸ **enableScrolling**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:242](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L242)

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

node_modules/@types/react/index.d.ts:496

___

### getPriority

▸ **getPriority**(): `number`

#### Returns

`number`

#### Defined in

[client/components/accessibility/AltScroller.tsx:180](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L180)

___

### getScrollableComponent

▸ **getScrollableComponent**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[client/components/accessibility/AltScroller.tsx:255](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L255)

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`IAltScrollerProps`\> |
| `prevState` | `Readonly`<`IActualAltScrollerState`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltScroller.tsx:184](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L184)

___

### isScrolling

▸ **isScrolling**(): `boolean`

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltScroller.tsx:271](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L271)

___

### recalculateScrolls

▸ **recalculateScrolls**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:188](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L188)

___

### register

▸ **register**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:222](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L222)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[client/components/accessibility/AltScroller.tsx:300](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L300)

___

### scroll

▸ **scroll**(`dir`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dir` | ``"up"`` \| ``"left"`` \| ``"right"`` \| ``"down"`` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:283](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L283)

___

### setBlocked

▸ **setBlocked**(`blocked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `blocked` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:275](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L275)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IActualAltScrollerState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IActualAltScrollerState` \| (`prevState`: `Readonly`<`IActualAltScrollerState`\>, `props`: `Readonly`<`IAltScrollerProps`\>) => `IActualAltScrollerState` \| `Pick`<`IActualAltScrollerState`, `K`\> \| `Pick`<`IActualAltScrollerState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.PureComponent.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### shouldComponentUpdate

▸ `Optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`IAltScrollerProps`\> |
| `nextState` | `Readonly`<`IActualAltScrollerState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636

___

### triggerResize

▸ **triggerResize**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:228](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L228)

___

### unregister

▸ **unregister**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:215](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltScroller.tsx#L215)
