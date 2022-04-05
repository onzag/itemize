[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.md) / default

# Class: default

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField](../modules/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.md).default

The entry field renderer, as a class, because it's fairly complicated, this renderer handles basic
types that are displayed as a single line text, this includes some numeric types, and even some complex types
such as unit and currency, this is because unlike other types their primary use is just writting something

Supported args
- descriptionAsAlert: the description as alert rather than the standard
- onEnter: A function that triggers when the enter key is pressed

## Hierarchy

- `Component`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md), `IPropertyEntryFieldRendererState`\>

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

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md) |

#### Overrides

React.Component&lt;IPropertyEntryFieldRendererProps, IPropertyEntryFieldRendererState\&gt;.constructor

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:354](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L354)

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

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:479

___

### inputRef

• `Private` **inputRef**: `HTMLInputElement`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:351](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L351)

___

### inputRefSelectionStart

• `Private` **inputRefSelectionStart**: `number`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:352](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L352)

___

### props

• `Readonly` **props**: `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

React.Component.props

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

React.Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### state

• **state**: `Readonly`<`IPropertyEntryFieldRendererState`\>

#### Inherited from

React.Component.state

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

React.Component.contextType

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

React.Component.UNSAFE\_componentWillMount

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
| `nextProps` | `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

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
| `nextProps` | `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextState` | `Readonly`<`IPropertyEntryFieldRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### catchToggleMouseDownEvent

▸ **catchToggleMouseDownEvent**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`Element`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:410](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L410)

___

### closeDialog

▸ **closeDialog**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:449](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L449)

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

React.Component.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:372](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L372)

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `prevState` | `Readonly`<`IPropertyEntryFieldRendererState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

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

React.Component.componentWillMount

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
| `nextProps` | `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillReceiveProps

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

React.Component.componentWillUnmount

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
| `nextProps` | `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextState` | `Readonly`<`IPropertyEntryFieldRendererState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

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
| `prevProps` | `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `prevState` | `Readonly`<`IPropertyEntryFieldRendererState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### onChange

▸ **onChange**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `ChangeEvent`<`HTMLInputElement` \| `HTMLSelectElement`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:420](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L420)

___

### onKeyDown

▸ **onKeyDown**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent`<`HTMLInputElement`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:455](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L455)

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

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:461](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L461)

___

### openDialog

▸ **openDialog**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:443](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L443)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:478](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L478)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyEntryFieldRendererState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryFieldRendererState` \| (`prevState`: `Readonly`<`IPropertyEntryFieldRendererState`\>, `props`: `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>) => `IPropertyEntryFieldRendererState` \| `Pick`<`IPropertyEntryFieldRendererState`, `K`\> \| `Pick`<`IPropertyEntryFieldRendererState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

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
| `nextProps` | `Readonly`<[`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextState` | `Readonly`<`IPropertyEntryFieldRendererState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636

___

### toggleVisible

▸ **toggleVisible**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`Element`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:378](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L378)
