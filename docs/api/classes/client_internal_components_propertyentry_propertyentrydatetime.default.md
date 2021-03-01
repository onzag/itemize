[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryDateTime](../modules/client_internal_components_propertyentry_propertyentrydatetime.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryDateTime](../modules/client_internal_components_propertyentry_propertyentrydatetime.md).default

## Hierarchy

* *Component*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*PropertyDefinitionSupportedDateType*](../modules/base_root_module_itemdefinition_propertydefinition_types_date.md#propertydefinitionsupporteddatetype), [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>, IPropertyEntryDateTimeState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertyentry_propertyentrydatetime.default.md#constructor)

### Properties

- [context](client_internal_components_propertyentry_propertyentrydatetime.default.md#context)
- [props](client_internal_components_propertyentry_propertyentrydatetime.default.md#props)
- [refs](client_internal_components_propertyentry_propertyentrydatetime.default.md#refs)
- [state](client_internal_components_propertyentry_propertyentrydatetime.default.md#state)
- [contextType](client_internal_components_propertyentry_propertyentrydatetime.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertyentry_propertyentrydatetime.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertyentry_propertyentrydatetime.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertyentry_propertyentrydatetime.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_components_propertyentry_propertyentrydatetime.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertyentry_propertyentrydatetime.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertyentry_propertyentrydatetime.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertyentry_propertyentrydatetime.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertyentry_propertyentrydatetime.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertyentry_propertyentrydatetime.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertyentry_propertyentrydatetime.default.md#componentwillupdate)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentrydatetime.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_propertyentry_propertyentrydatetime.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_components_propertyentry_propertyentrydatetime.default.md#getsnapshotbeforeupdate)
- [handleOnChange](client_internal_components_propertyentry_propertyentrydatetime.default.md#handleonchange)
- [render](client_internal_components_propertyentry_propertyentrydatetime.default.md#render)
- [setState](client_internal_components_propertyentry_propertyentrydatetime.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertyentry_propertyentrydatetime.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>): [*default*](client_internal_components_propertyentry_propertyentrydatetime.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\> |

**Returns:** [*default*](client_internal_components_propertyentry_propertyentrydatetime.default.md)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:57](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L57)

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

• `Readonly` **props**: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<IPropertyEntryDateTimeState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryDateTimeState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryDateTimeState\> |
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

▸ **componentDidUpdate**(`prevProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:103](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L103)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryDateTimeState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryDateTimeState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:98](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L98)

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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\>, `prevState`: *Readonly*<IPropertyEntryDateTimeState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\> |
`prevState` | *Readonly*<IPropertyEntryDateTimeState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### handleOnChange

▸ **handleOnChange**(`date`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`date` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:133](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L133)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:157](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L157)

___

### setState

▸ **setState**<K\>(`state`: IPropertyEntryDateTimeState \| (`prevState`: *Readonly*<IPropertyEntryDateTimeState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\>) => IPropertyEntryDateTimeState \| *Pick*<IPropertyEntryDateTimeState, K\> \| *Pick*<IPropertyEntryDateTimeState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *value* \| *showUserSetErrors* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyEntryDateTimeState \| (`prevState`: *Readonly*<IPropertyEntryDateTimeState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\>) => IPropertyEntryDateTimeState \| *Pick*<IPropertyEntryDateTimeState, K\> \| *Pick*<IPropertyEntryDateTimeState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>, `nextState`: IPropertyEntryDateTimeState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\> |
`nextState` | IPropertyEntryDateTimeState |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:77](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L77)
