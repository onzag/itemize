[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/accessibility/AltReactioner](../modules/client_components_accessibility_AltReactioner.md) / ActualAltBase

# Class: ActualAltBase<P, S\>

[client/components/accessibility/AltReactioner](../modules/client_components_accessibility_AltReactioner.md).ActualAltBase

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`IAltBaseProps`](../interfaces/client_components_accessibility_AltReactioner.IAltBaseProps.md) |
| `S` | `S` |

## Hierarchy

- `PureComponent`<`P`, `S`\>

  ↳ **`ActualAltBase`**

  ↳↳ [`ActualAltReactioner`](client_components_accessibility_AltReactioner.ActualAltReactioner.md)

## Table of contents

### Constructors

- [constructor](client_components_accessibility_AltReactioner.ActualAltBase.md#constructor)

### Properties

- [containerRef](client_components_accessibility_AltReactioner.ActualAltBase.md#containerref)
- [context](client_components_accessibility_AltReactioner.ActualAltBase.md#context)
- [props](client_components_accessibility_AltReactioner.ActualAltBase.md#props)
- [refs](client_components_accessibility_AltReactioner.ActualAltBase.md#refs)
- [state](client_components_accessibility_AltReactioner.ActualAltBase.md#state)
- [contextType](client_components_accessibility_AltReactioner.ActualAltBase.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_accessibility_AltReactioner.ActualAltBase.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_accessibility_AltReactioner.ActualAltBase.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#unsafe_componentwillupdate)
- [blur](client_components_accessibility_AltReactioner.ActualAltBase.md#blur)
- [componentDidCatch](client_components_accessibility_AltReactioner.ActualAltBase.md#componentdidcatch)
- [componentDidMount](client_components_accessibility_AltReactioner.ActualAltBase.md#componentdidmount)
- [componentDidUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#componentdidupdate)
- [componentWillMount](client_components_accessibility_AltReactioner.ActualAltBase.md#componentwillmount)
- [componentWillReceiveProps](client_components_accessibility_AltReactioner.ActualAltBase.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_accessibility_AltReactioner.ActualAltBase.md#componentwillunmount)
- [componentWillUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#componentwillupdate)
- [focus](client_components_accessibility_AltReactioner.ActualAltBase.md#focus)
- [forceUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#forceupdate)
- [getElement](client_components_accessibility_AltReactioner.ActualAltBase.md#getelement)
- [getPriority](client_components_accessibility_AltReactioner.ActualAltBase.md#getpriority)
- [getSignature](client_components_accessibility_AltReactioner.ActualAltBase.md#getsignature)
- [getSnapshotBeforeUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#getsnapshotbeforeupdate)
- [getTreeAncestry](client_components_accessibility_AltReactioner.ActualAltBase.md#gettreeancestry)
- [isBefore](client_components_accessibility_AltReactioner.ActualAltBase.md#isbefore)
- [isBlocking](client_components_accessibility_AltReactioner.ActualAltBase.md#isblocking)
- [isDisabled](client_components_accessibility_AltReactioner.ActualAltBase.md#isdisabled)
- [isTabAnchor](client_components_accessibility_AltReactioner.ActualAltBase.md#istabanchor)
- [isTabbable](client_components_accessibility_AltReactioner.ActualAltBase.md#istabbable)
- [isUncontrolled](client_components_accessibility_AltReactioner.ActualAltBase.md#isuncontrolled)
- [isUsedInFlow](client_components_accessibility_AltReactioner.ActualAltBase.md#isusedinflow)
- [onTaboutFindElementWithReactionKey](client_components_accessibility_AltReactioner.ActualAltBase.md#ontaboutfindelementwithreactionkey)
- [register](client_components_accessibility_AltReactioner.ActualAltBase.md#register)
- [render](client_components_accessibility_AltReactioner.ActualAltBase.md#render)
- [setBlocked](client_components_accessibility_AltReactioner.ActualAltBase.md#setblocked)
- [setState](client_components_accessibility_AltReactioner.ActualAltBase.md#setstate)
- [shouldComponentUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#shouldcomponentupdate)
- [unregister](client_components_accessibility_AltReactioner.ActualAltBase.md#unregister)

## Constructors

### constructor

• **new ActualAltBase**<`P`, `S`\>(`props`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`IAltBaseProps`](../interfaces/client_components_accessibility_AltReactioner.IAltBaseProps.md) |
| `S` | `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `P` |

#### Overrides

React.PureComponent&lt;P, S\&gt;.constructor

#### Defined in

[client/components/accessibility/AltReactioner.tsx:959](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L959)

## Properties

### containerRef

• **containerRef**: `RefObject`<`HTMLElement`\>

#### Defined in

[client/components/accessibility/AltReactioner.tsx:957](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L957)

___

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

• `Readonly` **props**: `Readonly`<`P`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

### state

• **state**: `Readonly`<`S`\>

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
| `nextProps` | `Readonly`<`P`\> |
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
| `nextProps` | `Readonly`<`P`\> |
| `nextState` | `Readonly`<`S`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### blur

▸ **blur**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1275](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1275)

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

[client/components/accessibility/AltReactioner.tsx:1300](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1300)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IAltBaseProps`](../interfaces/client_components_accessibility_AltReactioner.IAltBaseProps.md) |

#### Returns

`void`

#### Overrides

React.PureComponent.componentDidUpdate

#### Defined in

[client/components/accessibility/AltReactioner.tsx:994](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L994)

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
| `nextProps` | `Readonly`<`P`\> |
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

[client/components/accessibility/AltReactioner.tsx:1304](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1304)

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
| `nextProps` | `Readonly`<`P`\> |
| `nextState` | `Readonly`<`S`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### focus

▸ **focus**(`how`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `how` | ``"precise"`` \| ``"above"`` \| ``"below"`` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1252](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1252)

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

### getElement

▸ **getElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1029](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1029)

___

### getPriority

▸ **getPriority**(): `number` \| ``"ALWAYS_ON_TOP"`` \| ``"ALWAYS_ON_TOP_KEEP_FLOW"``

#### Returns

`number` \| ``"ALWAYS_ON_TOP"`` \| ``"ALWAYS_ON_TOP_KEEP_FLOW"``

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1009](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1009)

___

### getSignature

▸ **getSignature**(): `string`

#### Returns

`string`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1164](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1164)

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
| `prevProps` | `Readonly`<`P`\> |
| `prevState` | `Readonly`<`S`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### getTreeAncestry

▸ **getTreeAncestry**(): `HTMLElement`[]

Gets the tree ancestry starting from the container that is parented by
the root and ending with the current
[parent A] [parent B] [element]

#### Returns

`HTMLElement`[]

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1047](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1047)

___

### isBefore

▸ **isBefore**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`ActualAltBase`](client_components_accessibility_AltReactioner.ActualAltBase.md)<`any`, `any`\> |

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1072](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1072)

___

### isBlocking

▸ **isBlocking**(): `boolean`

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:973](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L973)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1013](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1013)

___

### isTabAnchor

▸ **isTabAnchor**(): `P`[``"tabAnchor"``]

#### Returns

`P`[``"tabAnchor"``]

#### Defined in

[client/components/accessibility/AltReactioner.tsx:969](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L969)

___

### isTabbable

▸ **isTabbable**(): ``true`` \| `P`[``"tabbable"``]

#### Returns

``true`` \| `P`[``"tabbable"``]

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1005](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1005)

___

### isUncontrolled

▸ **isUncontrolled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1280](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1280)

___

### isUsedInFlow

▸ **isUsedInFlow**(): `boolean`

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:965](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L965)

___

### onTaboutFindElementWithReactionKey

▸ **onTaboutFindElementWithReactionKey**(): `P`[``"onTabOutTrigger"``]

#### Returns

`P`[``"onTabOutTrigger"``]

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1271](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1271)

___

### register

▸ **register**(`props?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IAltBaseProps`](../interfaces/client_components_accessibility_AltReactioner.IAltBaseProps.md) |

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1170](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1170)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.PureComponent.render

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1284](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1284)

___

### setBlocked

▸ **setBlocked**(`v`): `void`

when another alt is blocking this triggers

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:990](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L990)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `S` \| (`prevState`: `Readonly`<`S`\>, `props`: `Readonly`<`P`\>) => `S` \| `Pick`<`S`, `K`\> \| `Pick`<`S`, `K`\> |
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
| `nextProps` | `Readonly`<`P`\> |
| `nextState` | `Readonly`<`S`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636

___

### unregister

▸ **unregister**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IAltBaseProps`](../interfaces/client_components_accessibility_AltReactioner.IAltBaseProps.md) |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1208](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1208)