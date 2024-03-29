[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_PropertyEntry_PropertyEntryField.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_PropertyEntry_PropertyEntryField.md).default

The property entry field handler

## Hierarchy

- `Component`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>, `IPropertyEntryFieldState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyEntry_PropertyEntryField.default.md#constructor)

### Properties

- [context](client_internal_components_PropertyEntry_PropertyEntryField.default.md#context)
- [props](client_internal_components_PropertyEntry_PropertyEntryField.default.md#props)
- [refs](client_internal_components_PropertyEntry_PropertyEntryField.default.md#refs)
- [state](client_internal_components_PropertyEntry_PropertyEntryField.default.md#state)
- [contextType](client_internal_components_PropertyEntry_PropertyEntryField.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertyEntry_PropertyEntryField.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryField.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryField.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_components_PropertyEntry_PropertyEntryField.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertyEntry_PropertyEntryField.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertyEntry_PropertyEntryField.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertyEntry_PropertyEntryField.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryField.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertyEntry_PropertyEntryField.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryField.default.md#componentwillupdate)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryField.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_PropertyEntry_PropertyEntryField.default.md#forceupdate)
- [getCurrentCurrency](client_internal_components_PropertyEntry_PropertyEntryField.default.md#getcurrentcurrency)
- [getCurrentUnit](client_internal_components_PropertyEntry_PropertyEntryField.default.md#getcurrentunit)
- [getSnapshotBeforeUpdate](client_internal_components_PropertyEntry_PropertyEntryField.default.md#getsnapshotbeforeupdate)
- [onChangeByTextualValue](client_internal_components_PropertyEntry_PropertyEntryField.default.md#onchangebytextualvalue)
- [onChangeCurrency](client_internal_components_PropertyEntry_PropertyEntryField.default.md#onchangecurrency)
- [onChangeTextLanguage](client_internal_components_PropertyEntry_PropertyEntryField.default.md#onchangetextlanguage)
- [onChangeUnit](client_internal_components_PropertyEntry_PropertyEntryField.default.md#onchangeunit)
- [render](client_internal_components_PropertyEntry_PropertyEntryField.default.md#render)
- [setState](client_internal_components_PropertyEntry_PropertyEntryField.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyEntry_PropertyEntryField.default.md#shouldcomponentupdate)
- [unitToNode](client_internal_components_PropertyEntry_PropertyEntryField.default.md#unittonode)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_internal_components_PropertyEntry_PropertyEntryField.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |

#### Returns

[`default`](client_internal_components_PropertyEntry_PropertyEntryField.default.md)

#### Overrides

React.Component\&lt;
    IPropertyEntryHandlerProps\&lt;ValueType, IPropertyEntryFieldRendererProps\&gt;,
    IPropertyEntryFieldState
  \&gt;.constructor

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:300](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L300)

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

### props

• `Readonly` **props**: `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`\<`IPropertyEntryFieldState`\>

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>\> |
| `nextState` | `Readonly`\<`IPropertyEntryFieldState`\> |
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

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:348](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L348)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:364](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L364)

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>\> |
| `nextState` | `Readonly`\<`IPropertyEntryFieldState`\> |
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

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:435](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L435)

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

### getCurrentCurrency

▸ **getCurrentCurrency**(): [`string`, `string`]

Provides information about the currency currency

#### Returns

[`string`, `string`]

an array where, 0 is the current currency and 1 is the default currency
according to what we have selected in our localization options

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:575](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L575)

___

### getCurrentUnit

▸ **getCurrentUnit**(): [`string`, `string`, `string`, `boolean`]

Provides the information about the current unit, regardless on whether
we have internal data for it or not

#### Returns

[`string`, `string`, `string`, `boolean`]

an array where, 0 is currentUnit by state, 1 is the standard metric unit code to use
2 is the imperial unit to use, and 3 is whether the user prefers imperial

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:546](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L546)

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
| `prevProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>\> |
| `prevState` | `Readonly`\<`IPropertyEntryFieldState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onChangeByTextualValue

▸ **onChangeByTextualValue**(`textualValue`): `void`

Given a textual value, updates regardless on the type
it is, and controls the internal value based on that

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `textualValue` | `string` | the textual value used in the field |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:591](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L591)

___

### onChangeCurrency

▸ **onChangeCurrency**(`code`): `void`

Change the currency code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | the code |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:505](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L505)

___

### onChangeTextLanguage

▸ **onChangeTextLanguage**(`code`): `void`

Change the language code, only works for text types

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | the language code |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:488](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L488)

___

### onChangeUnit

▸ **onChangeUnit**(`newUnit`): `void`

Changes the unit to a new unit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newUnit` | `string` | the new unit code |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:445](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L445)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:760](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L760)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"showUserSetErrors"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryFieldState` \| (`prevState`: `Readonly`\<`IPropertyEntryFieldState`\>, `props`: `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>\>) => `IPropertyEntryFieldState` \| `Pick`\<`IPropertyEntryFieldState`, `K`\> \| `Pick`\<`IPropertyEntryFieldState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<`ValueType`, [`IPropertyEntryFieldRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\> |
| `nextState` | `IPropertyEntryFieldState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:408](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L408)

___

### unitToNode

▸ **unitToNode**(`unit`): `Element`

This is the unit to node function that is passed that convets the
unit code into something more legible and meant for interaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | `string` | the unit code |

#### Returns

`Element`

a react element

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryField.tsx:325](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L325)
