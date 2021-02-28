[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertySetter](../modules/client_internal_components_propertysetter.md) / default

# Class: default

[client/internal/components/PropertySetter](../modules/client_internal_components_propertysetter.md).default

The property setter allows to manually set values for
properties, these then become readonly

## Hierarchy

* *Component*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md), {}\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertysetter.default.md#constructor)

### Properties

- [context](client_internal_components_propertysetter.default.md#context)
- [props](client_internal_components_propertysetter.default.md#props)
- [refs](client_internal_components_propertysetter.default.md#refs)
- [state](client_internal_components_propertysetter.default.md#state)
- [contextType](client_internal_components_propertysetter.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertysetter.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertysetter.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertysetter.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_components_propertysetter.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertysetter.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertysetter.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertysetter.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertysetter.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertysetter.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertysetter.default.md#componentwillupdate)
- [forceUpdate](client_internal_components_propertysetter.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_components_propertysetter.default.md#getsnapshotbeforeupdate)
- [render](client_internal_components_propertysetter.default.md#render)
- [setState](client_internal_components_propertysetter.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertysetter.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)): [*default*](client_internal_components_propertysetter.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md) |

**Returns:** [*default*](client_internal_components_propertysetter.default.md)

Defined in: [client/internal/components/PropertySetter/index.tsx:52](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertySetter/index.tsx#L52)

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

• `Readonly` **props**: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<{}\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\> |
`nextState` | *Readonly*<{}\> |
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

Defined in: [client/internal/components/PropertySetter/index.tsx:56](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertySetter/index.tsx#L56)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: [*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | [*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md) |

**Returns:** *void*

Defined in: [client/internal/components/PropertySetter/index.tsx:65](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertySetter/index.tsx#L65)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertySetter/index.tsx:91](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertySetter/index.tsx#L91)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\> |
`nextState` | *Readonly*<{}\> |
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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\>, `prevState`: *Readonly*<{}\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\> |
`prevState` | *Readonly*<{}\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### render

▸ **render**(): ReactNode

**Returns:** ReactNode

Defined in: [client/internal/components/PropertySetter/index.tsx:95](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertySetter/index.tsx#L95)

___

### setState

▸ **setState**<K\>(`state`: {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *never* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ `Optional`**shouldComponentUpdate**(`nextProps`: *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *boolean*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | *Readonly*<[*IPropertySetterBaseProps*](../interfaces/client_internal_components_propertysetter.ipropertysetterbaseprops.md)\> |
`nextState` | *Readonly*<{}\> |
`nextContext` | *any* |

**Returns:** *boolean*

Defined in: node_modules/@types/react/index.d.ts:631
