[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.md) / default

# Class: default

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.md).default

The actual entry field renderer, as a class, because it's fairly complicated, this renderer handles basic
types that are displayed as a single line text, this includes some numeric types, and even some complex types
such as unit and currency, this is because unlike other types their primary use is just writting something

## Hierarchy

- `Component`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md), `IPropertyEntryFieldRendererState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#constructor)

### Properties

- [context](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#context)
- [inputRef](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#inputref)
- [inputRefSelectionStart](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#inputrefselectionstart)
- [props](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#props)
- [refs](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#refs)
- [state](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#state)
- [contextType](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#unsafe_componentwillupdate)
- [catchToggleMouseDownEvent](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#catchtogglemousedownevent)
- [closeDialog](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#closedialog)
- [componentDidCatch](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#getsnapshotbeforeupdate)
- [onChange](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#onchange)
- [onKeyDown](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#onkeydown)
- [onPhoneCountryChange](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#onphonecountrychange)
- [openDialog](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#opendialog)
- [render](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#render)
- [setState](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#shouldcomponentupdate)
- [toggleVisible](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md#togglevisible)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md) |

#### Returns

[`default`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md)

#### Overrides

React.Component\&lt;IPropertyEntryFieldRendererProps, IPropertyEntryFieldRendererState\&gt;.constructor

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:358](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L358)

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

**`See`**

https://react.dev/reference/react/Component#context

#### Inherited from

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:473

___

### inputRef

• `Private` **inputRef**: `HTMLInputElement`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:355](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L355)

___

### inputRefSelectionStart

• `Private` **inputRefSelectionStart**: `number`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:356](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L356)

___

### props

• `Readonly` **props**: `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

#### Inherited from

React.Component.props

#### Defined in

node_modules/@types/react/index.d.ts:498

___

### refs

• **refs**: `Object`

**`Deprecated`**

https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### state

• **state**: `Readonly`\<`IPropertyEntryFieldRendererState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:499

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`\<`any`\>

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

**`See`**

https://react.dev/reference/react/Component#static-contexttype

#### Inherited from

React.Component.contextType

#### Defined in

node_modules/@types/react/index.d.ts:455

## Methods

### UNSAFE\_componentWillMount

▸ **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Returns

`void`

**`Deprecated`**

16.3, use componentDidMount or the constructor instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:711

___

### UNSAFE\_componentWillReceiveProps

▸ **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:743

___

### UNSAFE\_componentWillUpdate

▸ **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryFieldRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:771

___

### catchToggleMouseDownEvent

▸ **catchToggleMouseDownEvent**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`\<`Element`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:414](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L414)

___

### closeDialog

▸ **closeDialog**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:471](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L471)

___

### componentDidCatch

▸ **componentDidCatch**(`error`, `errorInfo`): `void`

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

React.Component.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:640

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:376](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L376)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `prevState` | `Readonly`\<`IPropertyEntryFieldRendererState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### componentWillMount

▸ **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Returns

`void`

**`Deprecated`**

16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:697

___

### componentWillReceiveProps

▸ **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:726

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.Component.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:635

___

### componentWillUpdate

▸ **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryFieldRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`See`**

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:756

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

React.Component.forceUpdate

#### Defined in

node_modules/@types/react/index.d.ts:490

___

### getSnapshotBeforeUpdate

▸ **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `prevState` | `Readonly`\<`IPropertyEntryFieldRendererState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onChange

▸ **onChange**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `ChangeEvent`\<`HTMLInputElement` \| `HTMLSelectElement`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:424](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L424)

___

### onKeyDown

▸ **onKeyDown**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent`\<`HTMLInputElement`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:477](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L477)

___

### onPhoneCountryChange

▸ **onPhoneCountryChange**(`newCountryCode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newCountryCode` | `string` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:483](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L483)

___

### openDialog

▸ **openDialog**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:465](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L465)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:500](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L500)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyEntryFieldRendererState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryFieldRendererState` \| (`prevState`: `Readonly`\<`IPropertyEntryFieldRendererState`\>, `props`: `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>) => `IPropertyEntryFieldRendererState` \| `Pick`\<`IPropertyEntryFieldRendererState`, `K`\> \| `Pick`\<`IPropertyEntryFieldRendererState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextState` | `Readonly`\<`IPropertyEntryFieldRendererState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630

___

### toggleVisible

▸ **toggleVisible**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`\<`Element`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:382](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L382)
