[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/drawer/tree](../modules/client_fast_prototyping_components_slate_drawer_tree.md) / Tree

# Class: Tree

[client/fast-prototyping/components/slate/drawer/tree](../modules/client_fast_prototyping_components_slate_drawer_tree.md).Tree

## Hierarchy

- `PureComponent`<`ITreeProps`, `ITreeState`\>

  ↳ **`Tree`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_slate_drawer_tree.Tree.md#constructor)

### Properties

- [bodyDiv](client_fast_prototyping_components_slate_drawer_tree.Tree.md#bodydiv)
- [buttonRef](client_fast_prototyping_components_slate_drawer_tree.Tree.md#buttonref)
- [context](client_fast_prototyping_components_slate_drawer_tree.Tree.md#context)
- [internalsRef](client_fast_prototyping_components_slate_drawer_tree.Tree.md#internalsref)
- [lastEffectTime](client_fast_prototyping_components_slate_drawer_tree.Tree.md#lasteffecttime)
- [props](client_fast_prototyping_components_slate_drawer_tree.Tree.md#props)
- [refs](client_fast_prototyping_components_slate_drawer_tree.Tree.md#refs)
- [state](client_fast_prototyping_components_slate_drawer_tree.Tree.md#state)
- [contextType](client_fast_prototyping_components_slate_drawer_tree.Tree.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_slate_drawer_tree.Tree.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_slate_drawer_tree.Tree.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_slate_drawer_tree.Tree.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_components_slate_drawer_tree.Tree.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_slate_drawer_tree.Tree.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_slate_drawer_tree.Tree.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_slate_drawer_tree.Tree.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_slate_drawer_tree.Tree.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_slate_drawer_tree.Tree.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_slate_drawer_tree.Tree.md#componentwillupdate)
- [endDrag](client_fast_prototyping_components_slate_drawer_tree.Tree.md#enddrag)
- [endDragMouse](client_fast_prototyping_components_slate_drawer_tree.Tree.md#enddragmouse)
- [endDragTouch](client_fast_prototyping_components_slate_drawer_tree.Tree.md#enddragtouch)
- [forceUpdate](client_fast_prototyping_components_slate_drawer_tree.Tree.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_slate_drawer_tree.Tree.md#getsnapshotbeforeupdate)
- [moveDrag](client_fast_prototyping_components_slate_drawer_tree.Tree.md#movedrag)
- [moveDragMouse](client_fast_prototyping_components_slate_drawer_tree.Tree.md#movedragmouse)
- [moveDragTouch](client_fast_prototyping_components_slate_drawer_tree.Tree.md#movedragtouch)
- [onTreeElementBeginsDrag](client_fast_prototyping_components_slate_drawer_tree.Tree.md#ontreeelementbeginsdrag)
- [onTreeElementEndsDrag](client_fast_prototyping_components_slate_drawer_tree.Tree.md#ontreeelementendsdrag)
- [render](client_fast_prototyping_components_slate_drawer_tree.Tree.md#render)
- [setState](client_fast_prototyping_components_slate_drawer_tree.Tree.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_slate_drawer_tree.Tree.md#shouldcomponentupdate)
- [startDrag](client_fast_prototyping_components_slate_drawer_tree.Tree.md#startdrag)
- [startDragMouse](client_fast_prototyping_components_slate_drawer_tree.Tree.md#startdragmouse)
- [startDragTouch](client_fast_prototyping_components_slate_drawer_tree.Tree.md#startdragtouch)

## Constructors

### constructor

• **new Tree**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ITreeProps` |

#### Overrides

React.PureComponent&lt;ITreeProps, ITreeState\&gt;.constructor

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:233](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L233)

## Properties

### bodyDiv

• `Private` **bodyDiv**: `HTMLDivElement`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:229](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L229)

___

### buttonRef

• `Private` **buttonRef**: `RefObject`<`HTMLButtonElement`\>

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:232](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L232)

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

### internalsRef

• `Private` **internalsRef**: `RefObject`<`HTMLDivElement`\>

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:231](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L231)

___

### lastEffectTime

• `Private` **lastEffectTime**: `number`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:230](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L230)

___

### props

• `Readonly` **props**: `Readonly`<`ITreeProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`<`ITreeState`\>

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
| `nextProps` | `Readonly`<`ITreeProps`\> |
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
| `nextProps` | `Readonly`<`ITreeProps`\> |
| `nextState` | `Readonly`<`ITreeState`\> |
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

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:625

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `ITreeProps` |
| `prevState` | `ITreeState` |

#### Returns

`void`

#### Overrides

React.PureComponent.componentDidUpdate

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:259](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L259)

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
| `nextProps` | `Readonly`<`ITreeProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:641

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
| `nextProps` | `Readonly`<`ITreeProps`\> |
| `nextState` | `Readonly`<`ITreeState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.PureComponent.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### endDrag

▸ **endDrag**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:362](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L362)

___

### endDragMouse

▸ **endDragMouse**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:352](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L352)

___

### endDragTouch

▸ **endDragTouch**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `TouchEvent` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:357](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L357)

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
| `prevProps` | `Readonly`<`ITreeProps`\> |
| `prevState` | `Readonly`<`ITreeState`\> |

#### Returns

`any`

#### Inherited from

React.PureComponent.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### moveDrag

▸ **moveDrag**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:342](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L342)

___

### moveDragMouse

▸ **moveDragMouse**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:336](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L336)

___

### moveDragTouch

▸ **moveDragTouch**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `TouchEvent` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:339](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L339)

___

### onTreeElementBeginsDrag

▸ **onTreeElementBeginsDrag**(`element`, `at`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `at` | `Path` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:296](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L296)

___

### onTreeElementEndsDrag

▸ **onTreeElementEndsDrag**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:305](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L305)

___

### render

▸ **render**(): `ReactNode`

#### Returns

`ReactNode`

#### Overrides

React.PureComponent.render

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:391](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L391)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ITreeState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `ITreeState` \| (`prevState`: `Readonly`<`ITreeState`\>, `props`: `Readonly`<`ITreeProps`\>) => `ITreeState` \| `Pick`<`ITreeState`, `K`\> \| `Pick`<`ITreeState`, `K`\> |
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
| `nextProps` | `Readonly`<`ITreeProps`\> |
| `nextState` | `Readonly`<`ITreeState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.PureComponent.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636

___

### startDrag

▸ **startDrag**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:321](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L321)

___

### startDragMouse

▸ **startDragMouse**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`Element`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:311](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L311)

___

### startDragTouch

▸ **startDragTouch**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `TouchEvent`<`Element`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/slate/drawer/tree.tsx:316](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/drawer/tree.tsx#L316)
