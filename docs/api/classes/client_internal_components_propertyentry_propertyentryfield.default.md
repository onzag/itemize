[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_propertyentry_propertyentryfield.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryField](../modules/client_internal_components_propertyentry_propertyentryfield.md).default

The property entry field handler

## Hierarchy

* *Component*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>, IPropertyEntryFieldState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertyentry_propertyentryfield.default.md#constructor)

### Properties

- [context](client_internal_components_propertyentry_propertyentryfield.default.md#context)
- [props](client_internal_components_propertyentry_propertyentryfield.default.md#props)
- [refs](client_internal_components_propertyentry_propertyentryfield.default.md#refs)
- [state](client_internal_components_propertyentry_propertyentryfield.default.md#state)
- [contextType](client_internal_components_propertyentry_propertyentryfield.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertyentry_propertyentryfield.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertyentry_propertyentryfield.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertyentry_propertyentryfield.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_components_propertyentry_propertyentryfield.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertyentry_propertyentryfield.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertyentry_propertyentryfield.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertyentry_propertyentryfield.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertyentry_propertyentryfield.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertyentry_propertyentryfield.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertyentry_propertyentryfield.default.md#componentwillupdate)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentryfield.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_propertyentry_propertyentryfield.default.md#forceupdate)
- [getCurrentCurrency](client_internal_components_propertyentry_propertyentryfield.default.md#getcurrentcurrency)
- [getCurrentUnit](client_internal_components_propertyentry_propertyentryfield.default.md#getcurrentunit)
- [getSnapshotBeforeUpdate](client_internal_components_propertyentry_propertyentryfield.default.md#getsnapshotbeforeupdate)
- [onChangeByTextualValue](client_internal_components_propertyentry_propertyentryfield.default.md#onchangebytextualvalue)
- [onChangeCurrency](client_internal_components_propertyentry_propertyentryfield.default.md#onchangecurrency)
- [onChangeUnit](client_internal_components_propertyentry_propertyentryfield.default.md#onchangeunit)
- [render](client_internal_components_propertyentry_propertyentryfield.default.md#render)
- [setState](client_internal_components_propertyentry_propertyentryfield.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertyentry_propertyentryfield.default.md#shouldcomponentupdate)
- [unitToNode](client_internal_components_propertyentry_propertyentryfield.default.md#unittonode)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>): [*default*](client_internal_components_propertyentry_propertyentryfield.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\> |

**Returns:** [*default*](client_internal_components_propertyentry_propertyentryfield.default.md)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:229](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L229)

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

• `Readonly` **props**: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<IPropertyEntryFieldState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryFieldState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryFieldState\> |
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

▸ **componentDidMount**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:278](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L278)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:294](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L294)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryFieldState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryFieldState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:362](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L362)

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

### getCurrentCurrency

▸ **getCurrentCurrency**(): [*string*, *string*]

Provides information about the currency currency

**Returns:** [*string*, *string*]

an array where, 0 is the current currency and 1 is the default currency
according to what we have selected in our localization options

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:485](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L485)

___

### getCurrentUnit

▸ **getCurrentUnit**(): [*string*, *string*, *string*, *boolean*]

Provides the information about the current unit, regardless on whether
we have internal data for it or not

**Returns:** [*string*, *string*, *string*, *boolean*]

an array where, 0 is currentUnit by state, 1 is the standard metric unit code to use
2 is the imperial unit to use, and 3 is whether the user prefers imperial

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:456](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L456)

___

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\>, `prevState`: *Readonly*<IPropertyEntryFieldState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\> |
`prevState` | *Readonly*<IPropertyEntryFieldState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### onChangeByTextualValue

▸ **onChangeByTextualValue**(`textualValue`: *string*): *void*

Given a textual value, updates regardless on the type
it is, and controls the internal value based on that

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`textualValue` | *string* | the textual value used in the field    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:501](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L501)

___

### onChangeCurrency

▸ **onChangeCurrency**(`code`: *string*): *void*

Change the currency code

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`code` | *string* | the code    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:415](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L415)

___

### onChangeUnit

▸ **onChangeUnit**(`newUnit`: *string*): *void*

Changes the unit to a new unit

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`newUnit` | *string* | the new unit code    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:372](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L372)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:659](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L659)

___

### setState

▸ **setState**<K\>(`state`: IPropertyEntryFieldState \| (`prevState`: *Readonly*<IPropertyEntryFieldState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\>) => IPropertyEntryFieldState \| *Pick*<IPropertyEntryFieldState, K\> \| *Pick*<IPropertyEntryFieldState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *showUserSetErrors* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyEntryFieldState \| (`prevState`: *Readonly*<IPropertyEntryFieldState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\>) => IPropertyEntryFieldState \| *Pick*<IPropertyEntryFieldState, K\> \| *Pick*<IPropertyEntryFieldState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>, `nextState`: IPropertyEntryFieldState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<ValueType, [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\> |
`nextState` | IPropertyEntryFieldState |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:338](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L338)

___

### unitToNode

▸ **unitToNode**(`unit`: *string*): *Element*

This is the unit to node function that is passed that convets the
unit code into something more legible and meant for interaction

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`unit` | *string* | the unit code   |

**Returns:** *Element*

a react element

Defined in: [client/internal/components/PropertyEntry/PropertyEntryField.tsx:255](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryField.tsx#L255)
