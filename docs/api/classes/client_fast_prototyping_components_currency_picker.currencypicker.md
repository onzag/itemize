[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/currency-picker](../modules/client_fast_prototyping_components_currency_picker.md) / CurrencyPicker

# Class: CurrencyPicker

[client/fast-prototyping/components/currency-picker](../modules/client_fast_prototyping_components_currency_picker.md).CurrencyPicker

Contains the currency picker fast prototyping element which allows the user
to select a currency

Similarly to the country picker the currency picker can be rather heavy

## Hierarchy

* *Component*<ICurrencyPickerProps, ICurrencyPickerState\>

  ↳ **CurrencyPicker**

## Table of contents

### Constructors

- [constructor](client_fast_prototyping_components_currency_picker.currencypicker.md#constructor)

### Properties

- [context](client_fast_prototyping_components_currency_picker.currencypicker.md#context)
- [props](client_fast_prototyping_components_currency_picker.currencypicker.md#props)
- [refs](client_fast_prototyping_components_currency_picker.currencypicker.md#refs)
- [state](client_fast_prototyping_components_currency_picker.currencypicker.md#state)
- [contextType](client_fast_prototyping_components_currency_picker.currencypicker.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_fast_prototyping_components_currency_picker.currencypicker.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_fast_prototyping_components_currency_picker.currencypicker.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_fast_prototyping_components_currency_picker.currencypicker.md#unsafe_componentwillupdate)
- [componentDidCatch](client_fast_prototyping_components_currency_picker.currencypicker.md#componentdidcatch)
- [componentDidMount](client_fast_prototyping_components_currency_picker.currencypicker.md#componentdidmount)
- [componentDidUpdate](client_fast_prototyping_components_currency_picker.currencypicker.md#componentdidupdate)
- [componentWillMount](client_fast_prototyping_components_currency_picker.currencypicker.md#componentwillmount)
- [componentWillReceiveProps](client_fast_prototyping_components_currency_picker.currencypicker.md#componentwillreceiveprops)
- [componentWillUnmount](client_fast_prototyping_components_currency_picker.currencypicker.md#componentwillunmount)
- [componentWillUpdate](client_fast_prototyping_components_currency_picker.currencypicker.md#componentwillupdate)
- [forceUpdate](client_fast_prototyping_components_currency_picker.currencypicker.md#forceupdate)
- [getSnapshotBeforeUpdate](client_fast_prototyping_components_currency_picker.currencypicker.md#getsnapshotbeforeupdate)
- [handleButtonSelectClick](client_fast_prototyping_components_currency_picker.currencypicker.md#handlebuttonselectclick)
- [handleCurrencyChange](client_fast_prototyping_components_currency_picker.currencypicker.md#handlecurrencychange)
- [handleMenuClose](client_fast_prototyping_components_currency_picker.currencypicker.md#handlemenuclose)
- [render](client_fast_prototyping_components_currency_picker.currencypicker.md#render)
- [setState](client_fast_prototyping_components_currency_picker.currencypicker.md#setstate)
- [shouldComponentUpdate](client_fast_prototyping_components_currency_picker.currencypicker.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new CurrencyPicker**(`props`: ICurrencyPickerProps): [*CurrencyPicker*](client_fast_prototyping_components_currency_picker.currencypicker.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | ICurrencyPickerProps |

**Returns:** [*CurrencyPicker*](client_fast_prototyping_components_currency_picker.currencypicker.md)

Defined in: [client/fast-prototyping/components/currency-picker.tsx:52](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/currency-picker.tsx#L52)

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

• `Readonly` **props**: *Readonly*<ICurrencyPickerProps\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<ICurrencyPickerState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<ICurrencyPickerProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ICurrencyPickerProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<ICurrencyPickerProps\>, `nextState`: *Readonly*<ICurrencyPickerState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ICurrencyPickerProps\> |
`nextState` | *Readonly*<ICurrencyPickerState\> |
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

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<ICurrencyPickerProps\>, `prevState`: *Readonly*<ICurrencyPickerState\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ICurrencyPickerProps\> |
`prevState` | *Readonly*<ICurrencyPickerState\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<ICurrencyPickerProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ICurrencyPickerProps\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<ICurrencyPickerProps\>, `nextState`: *Readonly*<ICurrencyPickerState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<ICurrencyPickerProps\> |
`nextState` | *Readonly*<ICurrencyPickerState\> |
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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<ICurrencyPickerProps\>, `prevState`: *Readonly*<ICurrencyPickerState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<ICurrencyPickerProps\> |
`prevState` | *Readonly*<ICurrencyPickerState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### handleButtonSelectClick

▸ **handleButtonSelectClick**(`e`: *MouseEvent*<HTMLButtonElement, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`e` | *MouseEvent*<HTMLButtonElement, MouseEvent\> |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/currency-picker.tsx:64](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/currency-picker.tsx#L64)

___

### handleCurrencyChange

▸ **handleCurrencyChange**(`changeCurrencyToFn`: (`code`: *string*) => *void*, `code`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`changeCurrencyToFn` | (`code`: *string*) => *void* |
`code` | *string* |

**Returns:** *void*

Defined in: [client/fast-prototyping/components/currency-picker.tsx:74](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/currency-picker.tsx#L74)

___

### handleMenuClose

▸ **handleMenuClose**(): *void*

**Returns:** *void*

Defined in: [client/fast-prototyping/components/currency-picker.tsx:69](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/currency-picker.tsx#L69)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/fast-prototyping/components/currency-picker.tsx:84](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/components/currency-picker.tsx#L84)

___

### setState

▸ **setState**<K\>(`state`: ICurrencyPickerState \| (`prevState`: *Readonly*<ICurrencyPickerState\>, `props`: *Readonly*<ICurrencyPickerProps\>) => ICurrencyPickerState \| *Pick*<ICurrencyPickerState, K\> \| *Pick*<ICurrencyPickerState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *anchorEl* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | ICurrencyPickerState \| (`prevState`: *Readonly*<ICurrencyPickerState\>, `props`: *Readonly*<ICurrencyPickerProps\>) => ICurrencyPickerState \| *Pick*<ICurrencyPickerState, K\> \| *Pick*<ICurrencyPickerState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<ICurrencyPickerProps\>, `nextState`: *Readonly*<ICurrencyPickerState\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<ICurrencyPickerProps\> |
`nextState` | *Readonly*<ICurrencyPickerState\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631
