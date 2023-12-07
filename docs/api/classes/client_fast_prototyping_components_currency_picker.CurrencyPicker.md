[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/currency-picker](../modules/client_fast_prototyping_components_currency_picker.md) / CurrencyPicker

# Class: CurrencyPicker

[client/fast-prototyping/components/currency-picker](../modules/client_fast_prototyping_components_currency_picker.md).CurrencyPicker

Contains the currency picker fast prototyping element which allows the user
to select a currency

Similarly to the country picker the currency picker can be rather heavy

## Hierarchy

- `Component`<`ICurrencyPickerProps`, `ICurrencyPickerState`\>

  ↳ **`CurrencyPicker`**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#constructor)

### Properties

- [context](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#context)
- [props](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#props)
- [refs](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#refs)
- [state](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#state)
- [contextType](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#getsnapshotbeforeupdate)
- [handleButtonSelectClick](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#handlebuttonselectclick)
- [handleCurrencyChange](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#handlecurrencychange)
- [handleMenuClose](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#handlemenuclose)
- [render](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#render)
- [setState](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_currency_picker.CurrencyPicker.md#shouldcomponentupdate)

## Constructors

### constructor

• **new CurrencyPicker**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ICurrencyPickerProps` |

#### Overrides

React.Component&lt;ICurrencyPickerProps, ICurrencyPickerState\&gt;.constructor

#### Defined in

[client/fast-prototyping/components/currency-picker.tsx:77](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/currency-picker.tsx#L77)

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

### props

• `Readonly` **props**: `Readonly`<`ICurrencyPickerProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`<`ICurrencyPickerState`\>

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
| `nextProps` | `Readonly`<`ICurrencyPickerProps`\> |
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
| `nextProps` | `Readonly`<`ICurrencyPickerProps`\> |
| `nextState` | `Readonly`<`ICurrencyPickerState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

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

React.Component.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:625

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`ICurrencyPickerProps`\> |
| `prevState` | `Readonly`<`ICurrencyPickerState`\> |
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
| `nextProps` | `Readonly`<`ICurrencyPickerProps`\> |
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
| `nextProps` | `Readonly`<`ICurrencyPickerProps`\> |
| `nextState` | `Readonly`<`ICurrencyPickerState`\> |
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
| `prevProps` | `Readonly`<`ICurrencyPickerProps`\> |
| `prevState` | `Readonly`<`ICurrencyPickerState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### handleButtonSelectClick

▸ **handleButtonSelectClick**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent`<`HTMLButtonElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/currency-picker.tsx:88](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/currency-picker.tsx#L88)

___

### handleCurrencyChange

▸ **handleCurrencyChange**(`changeCurrencyToFn`, `code`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changeCurrencyToFn` | [`ChangeCurrencyToFn`](../modules/client_internal_providers_locale_provider.md#changecurrencytofn) |
| `code` | `string` |

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/currency-picker.tsx:98](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/currency-picker.tsx#L98)

___

### handleMenuClose

▸ **handleMenuClose**(): `void`

#### Returns

`void`

#### Defined in

[client/fast-prototyping/components/currency-picker.tsx:93](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/currency-picker.tsx#L93)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/fast-prototyping/components/currency-picker.tsx:108](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/currency-picker.tsx#L108)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"anchorEl"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `ICurrencyPickerState` \| (`prevState`: `Readonly`<`ICurrencyPickerState`\>, `props`: `Readonly`<`ICurrencyPickerProps`\>) => `ICurrencyPickerState` \| `Pick`<`ICurrencyPickerState`, `K`\> \| `Pick`<`ICurrencyPickerState`, `K`\> |
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
| `nextProps` | `Readonly`<`ICurrencyPickerProps`\> |
| `nextState` | `Readonly`<`ICurrencyPickerState`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:636
