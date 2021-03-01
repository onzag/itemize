[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView/PropertyViewFile](../modules/client_internal_components_propertyview_propertyviewfile.md) / default

# Class: default

[client/internal/components/PropertyView/PropertyViewFile](../modules/client_internal_components_propertyview_propertyviewfile.md).default

## Hierarchy

* *Component*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertyview_propertyviewfile.default.md#constructor)

### Properties

- [context](client_internal_components_propertyview_propertyviewfile.default.md#context)
- [props](client_internal_components_propertyview_propertyviewfile.default.md#props)
- [refs](client_internal_components_propertyview_propertyviewfile.default.md#refs)
- [state](client_internal_components_propertyview_propertyviewfile.default.md#state)
- [contextType](client_internal_components_propertyview_propertyviewfile.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertyview_propertyviewfile.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertyview_propertyviewfile.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertyview_propertyviewfile.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_components_propertyview_propertyviewfile.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertyview_propertyviewfile.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertyview_propertyviewfile.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertyview_propertyviewfile.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertyview_propertyviewfile.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertyview_propertyviewfile.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertyview_propertyviewfile.default.md#componentwillupdate)
- [forceUpdate](client_internal_components_propertyview_propertyviewfile.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_components_propertyview_propertyviewfile.default.md#getsnapshotbeforeupdate)
- [openFile](client_internal_components_propertyview_propertyviewfile.default.md#openfile)
- [render](client_internal_components_propertyview_propertyviewfile.default.md#render)
- [setState](client_internal_components_propertyview_propertyviewfile.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertyview_propertyviewfile.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>): [*default*](client_internal_components_propertyview_propertyviewfile.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> |

**Returns:** [*default*](client_internal_components_propertyview_propertyviewfile.default.md)

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:46](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/PropertyViewFile.tsx#L46)

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

• `Readonly` **props**: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\> & *Readonly*<{ `children?`: ReactNode  }\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\> |
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

▸ `Optional`**componentDidMount**(): *void*

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:620

___

### componentDidUpdate

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>, `prevState`: *Readonly*<{}\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\> |
`prevState` | *Readonly*<{}\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>, `nextState`: *Readonly*<{}\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\> |
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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>, `prevState`: *Readonly*<{}\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\> |
`prevState` | *Readonly*<{}\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### openFile

▸ **openFile**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:66](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/PropertyViewFile.tsx#L66)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:74](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/PropertyViewFile.tsx#L74)

___

### setState

▸ **setState**<K\>(`state`: {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *never* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | {} \| (`prevState`: *Readonly*<{}\>, `props`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>\>) => {} \| *Pick*<{}, K\> \| *Pick*<{}, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewFileRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\> |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:52](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/PropertyViewFile.tsx#L52)
