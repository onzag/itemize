[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/accessibility/AltReactioner](../modules/client_components_accessibility_AltReactioner.md) / ActualAltReactioner

# Class: ActualAltReactioner

[client/components/accessibility/AltReactioner](../modules/client_components_accessibility_AltReactioner.md).ActualAltReactioner

## Hierarchy

- [`ActualAltBase`](client_components_accessibility_AltReactioner.ActualAltBase.md)<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md), `IActualAltReactionerState`\>

  ↳ **`ActualAltReactioner`**

## Table of contents

### Constructors

- [constructor](client_components_accessibility_AltReactioner.ActualAltReactioner.md#constructor)

### Properties

- [containerRef](client_components_accessibility_AltReactioner.ActualAltReactioner.md#containerref)
- [context](client_components_accessibility_AltReactioner.ActualAltReactioner.md#context)
- [props](client_components_accessibility_AltReactioner.ActualAltReactioner.md#props)
- [refs](client_components_accessibility_AltReactioner.ActualAltReactioner.md#refs)
- [state](client_components_accessibility_AltReactioner.ActualAltReactioner.md#state)
- [contextType](client_components_accessibility_AltReactioner.ActualAltReactioner.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_components_accessibility_AltReactioner.ActualAltReactioner.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_components_accessibility_AltReactioner.ActualAltReactioner.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_components_accessibility_AltReactioner.ActualAltReactioner.md#unsafe_componentwillupdate)
- [blur](client_components_accessibility_AltReactioner.ActualAltReactioner.md#blur)
- [componentDidCatch](client_components_accessibility_AltReactioner.ActualAltReactioner.md#componentdidcatch)
- [componentDidMount](client_components_accessibility_AltReactioner.ActualAltReactioner.md#componentdidmount)
- [componentDidUpdate](client_components_accessibility_AltReactioner.ActualAltReactioner.md#componentdidupdate)
- [componentWillMount](client_components_accessibility_AltReactioner.ActualAltReactioner.md#componentwillmount)
- [componentWillReceiveProps](client_components_accessibility_AltReactioner.ActualAltReactioner.md#componentwillreceiveprops)
- [componentWillUnmount](client_components_accessibility_AltReactioner.ActualAltReactioner.md#componentwillunmount)
- [componentWillUpdate](client_components_accessibility_AltReactioner.ActualAltReactioner.md#componentwillupdate)
- [display](client_components_accessibility_AltReactioner.ActualAltReactioner.md#display)
- [focus](client_components_accessibility_AltReactioner.ActualAltReactioner.md#focus)
- [forceUpdate](client_components_accessibility_AltReactioner.ActualAltReactioner.md#forceupdate)
- [getElement](client_components_accessibility_AltReactioner.ActualAltReactioner.md#getelement)
- [getPriority](client_components_accessibility_AltReactioner.ActualAltReactioner.md#getpriority)
- [getReactionKey](client_components_accessibility_AltReactioner.ActualAltReactioner.md#getreactionkey)
- [getSignature](client_components_accessibility_AltReactioner.ActualAltReactioner.md#getsignature)
- [getSnapshotBeforeUpdate](client_components_accessibility_AltReactioner.ActualAltReactioner.md#getsnapshotbeforeupdate)
- [getTreeAncestry](client_components_accessibility_AltReactioner.ActualAltReactioner.md#gettreeancestry)
- [hide](client_components_accessibility_AltReactioner.ActualAltReactioner.md#hide)
- [isBefore](client_components_accessibility_AltReactioner.ActualAltReactioner.md#isbefore)
- [isBlocking](client_components_accessibility_AltReactioner.ActualAltReactioner.md#isblocking)
- [isDisabled](client_components_accessibility_AltReactioner.ActualAltReactioner.md#isdisabled)
- [isDisplayed](client_components_accessibility_AltReactioner.ActualAltReactioner.md#isdisplayed)
- [isTabAnchor](client_components_accessibility_AltReactioner.ActualAltReactioner.md#istabanchor)
- [isTabbable](client_components_accessibility_AltReactioner.ActualAltReactioner.md#istabbable)
- [isUncontrolled](client_components_accessibility_AltReactioner.ActualAltReactioner.md#isuncontrolled)
- [isUsedInFlow](client_components_accessibility_AltReactioner.ActualAltReactioner.md#isusedinflow)
- [onTaboutFindElementWithReactionKey](client_components_accessibility_AltReactioner.ActualAltReactioner.md#ontaboutfindelementwithreactionkey)
- [register](client_components_accessibility_AltReactioner.ActualAltReactioner.md#register)
- [render](client_components_accessibility_AltReactioner.ActualAltReactioner.md#render)
- [setBlocked](client_components_accessibility_AltReactioner.ActualAltReactioner.md#setblocked)
- [setState](client_components_accessibility_AltReactioner.ActualAltReactioner.md#setstate)
- [shouldComponentUpdate](client_components_accessibility_AltReactioner.ActualAltReactioner.md#shouldcomponentupdate)
- [trigger](client_components_accessibility_AltReactioner.ActualAltReactioner.md#trigger)
- [triggerAltCycle](client_components_accessibility_AltReactioner.ActualAltReactioner.md#triggeraltcycle)
- [triggerAmbiguous](client_components_accessibility_AltReactioner.ActualAltReactioner.md#triggerambiguous)
- [triggerAmbiguousClear](client_components_accessibility_AltReactioner.ActualAltReactioner.md#triggerambiguousclear)
- [unregister](client_components_accessibility_AltReactioner.ActualAltReactioner.md#unregister)

## Constructors

### constructor

• **new ActualAltReactioner**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md) |

#### Overrides

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[constructor](client_components_accessibility_AltReactioner.ActualAltBase.md#constructor)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1350](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1350)

## Properties

### containerRef

• **containerRef**: `RefObject`<`HTMLElement`\>

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[containerRef](client_components_accessibility_AltReactioner.ActualAltBase.md#containerref)

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

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[context](client_components_accessibility_AltReactioner.ActualAltBase.md#context)

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### props

• `Readonly` **props**: `Readonly`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[props](client_components_accessibility_AltReactioner.ActualAltBase.md#props)

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

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[refs](client_components_accessibility_AltReactioner.ActualAltBase.md#refs)

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### state

• **state**: `Readonly`<`IActualAltReactionerState`\>

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[state](client_components_accessibility_AltReactioner.ActualAltBase.md#state)

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

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[contextType](client_components_accessibility_AltReactioner.ActualAltBase.md#contexttype)

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

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[UNSAFE_componentWillMount](client_components_accessibility_AltReactioner.ActualAltBase.md#unsafe_componentwillmount)

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
| `nextProps` | `Readonly`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[UNSAFE_componentWillReceiveProps](client_components_accessibility_AltReactioner.ActualAltBase.md#unsafe_componentwillreceiveprops)

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
| `nextProps` | `Readonly`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)\> |
| `nextState` | `Readonly`<`IActualAltReactionerState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[UNSAFE_componentWillUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#unsafe_componentwillupdate)

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### blur

▸ **blur**(): `void`

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[blur](client_components_accessibility_AltReactioner.ActualAltBase.md#blur)

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

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[componentDidCatch](client_components_accessibility_AltReactioner.ActualAltBase.md#componentdidcatch)

#### Defined in

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[componentDidMount](client_components_accessibility_AltReactioner.ActualAltBase.md#componentdidmount)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1300](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1300)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md) |

#### Returns

`void`

#### Overrides

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[componentDidUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#componentdidupdate)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1415](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1415)

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

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[componentWillMount](client_components_accessibility_AltReactioner.ActualAltBase.md#componentwillmount)

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
| `nextProps` | `Readonly`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[componentWillReceiveProps](client_components_accessibility_AltReactioner.ActualAltBase.md#componentwillreceiveprops)

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[componentWillUnmount](client_components_accessibility_AltReactioner.ActualAltBase.md#componentwillunmount)

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
| `nextProps` | `Readonly`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)\> |
| `nextState` | `Readonly`<`IActualAltReactionerState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[componentWillUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#componentwillupdate)

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### display

▸ **display**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1433](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1433)

___

### focus

▸ **focus**(`how`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `how` | ``"precise"`` \| ``"above"`` \| ``"below"`` |

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[focus](client_components_accessibility_AltReactioner.ActualAltBase.md#focus)

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

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[forceUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#forceupdate)

#### Defined in

node_modules/@types/react/index.d.ts:496

___

### getElement

▸ **getElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Overrides

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[getElement](client_components_accessibility_AltReactioner.ActualAltBase.md#getelement)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1371](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1371)

___

### getPriority

▸ **getPriority**(): `number` \| ``"ALWAYS_ON_TOP"`` \| ``"ALWAYS_ON_TOP_KEEP_FLOW"``

#### Returns

`number` \| ``"ALWAYS_ON_TOP"`` \| ``"ALWAYS_ON_TOP_KEEP_FLOW"``

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[getPriority](client_components_accessibility_AltReactioner.ActualAltBase.md#getpriority)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1009](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1009)

___

### getReactionKey

▸ **getReactionKey**(): `string`

#### Returns

`string`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1367](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1367)

___

### getSignature

▸ **getSignature**(): `string`

#### Returns

`string`

#### Overrides

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[getSignature](client_components_accessibility_AltReactioner.ActualAltBase.md#getsignature)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1425](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1425)

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
| `prevProps` | `Readonly`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)\> |
| `prevState` | `Readonly`<`IActualAltReactionerState`\> |

#### Returns

`any`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[getSnapshotBeforeUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#getsnapshotbeforeupdate)

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

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[getTreeAncestry](client_components_accessibility_AltReactioner.ActualAltBase.md#gettreeancestry)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1047](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1047)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1442](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1442)

___

### isBefore

▸ **isBefore**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`ActualAltBase`](client_components_accessibility_AltReactioner.ActualAltBase.md)<`any`, `any`\> |

#### Returns

`boolean`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[isBefore](client_components_accessibility_AltReactioner.ActualAltBase.md#isbefore)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1072](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1072)

___

### isBlocking

▸ **isBlocking**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[isBlocking](client_components_accessibility_AltReactioner.ActualAltBase.md#isblocking)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:973](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L973)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[isDisabled](client_components_accessibility_AltReactioner.ActualAltBase.md#isdisabled)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1013](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1013)

___

### isDisplayed

▸ **isDisplayed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1452](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1452)

___

### isTabAnchor

▸ **isTabAnchor**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[isTabAnchor](client_components_accessibility_AltReactioner.ActualAltBase.md#istabanchor)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:969](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L969)

___

### isTabbable

▸ **isTabbable**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[isTabbable](client_components_accessibility_AltReactioner.ActualAltBase.md#istabbable)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1005](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1005)

___

### isUncontrolled

▸ **isUncontrolled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[isUncontrolled](client_components_accessibility_AltReactioner.ActualAltBase.md#isuncontrolled)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1280](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1280)

___

### isUsedInFlow

▸ **isUsedInFlow**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[isUsedInFlow](client_components_accessibility_AltReactioner.ActualAltBase.md#isusedinflow)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:965](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L965)

___

### onTaboutFindElementWithReactionKey

▸ **onTaboutFindElementWithReactionKey**(): `string`

#### Returns

`string`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[onTaboutFindElementWithReactionKey](client_components_accessibility_AltReactioner.ActualAltBase.md#ontaboutfindelementwithreactionkey)

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

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[register](client_components_accessibility_AltReactioner.ActualAltBase.md#register)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1170](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1170)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[render](client_components_accessibility_AltReactioner.ActualAltBase.md#render)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1525](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1525)

___

### setBlocked

▸ **setBlocked**(`blocked`): `void`

when another alt is blocking this triggers

#### Parameters

| Name | Type |
| :------ | :------ |
| `blocked` | `boolean` |

#### Returns

`void`

#### Overrides

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[setBlocked](client_components_accessibility_AltReactioner.ActualAltBase.md#setblocked)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1361](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1361)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IActualAltReactionerState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IActualAltReactionerState` \| (`prevState`: `Readonly`<`IActualAltReactionerState`\>, `props`: `Readonly`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)\>) => `IActualAltReactionerState` \| `Pick`<`IActualAltReactionerState`, `K`\> \| `Pick`<`IActualAltReactionerState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[setState](client_components_accessibility_AltReactioner.ActualAltBase.md#setstate)

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
| `nextProps` | `Readonly`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)\> |
| `nextState` | `Readonly`<`IActualAltReactionerState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[shouldComponentUpdate](client_components_accessibility_AltReactioner.ActualAltBase.md#shouldcomponentupdate)

#### Defined in

node_modules/@types/react/index.d.ts:636

___

### trigger

▸ **trigger**(`isTabNavigatingCurrent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isTabNavigatingCurrent` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1489](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1489)

___

### triggerAltCycle

▸ **triggerAltCycle**(`isTabNavigatingCurrent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isTabNavigatingCurrent` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1464](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1464)

___

### triggerAmbiguous

▸ **triggerAmbiguous**(`expected`, `id`, `plusCount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expected` | `boolean` |
| `id` | `number` |
| `plusCount` | `number` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1456](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1456)

___

### triggerAmbiguousClear

▸ **triggerAmbiguousClear**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1460](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1460)

___

### unregister

▸ **unregister**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IAltBaseProps`](../interfaces/client_components_accessibility_AltReactioner.IAltBaseProps.md) |

#### Returns

`void`

#### Inherited from

[ActualAltBase](client_components_accessibility_AltReactioner.ActualAltBase.md).[unregister](client_components_accessibility_AltReactioner.ActualAltBase.md#unregister)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1208](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1208)
