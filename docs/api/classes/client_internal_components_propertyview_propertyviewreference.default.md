[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView/PropertyViewReference](../modules/client_internal_components_propertyview_propertyviewreference.md) / default

# Class: default

[client/internal/components/PropertyView/PropertyViewReference](../modules/client_internal_components_propertyview_propertyviewreference.md).default

The property view reference handler, note how unlike most
other handlers this handler uses the property view simple renderer
in order to render its value

## Hierarchy

* *Component*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>, IPropertyViewReferenceState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertyview_propertyviewreference.default.md#constructor)

### Properties

- [context](client_internal_components_propertyview_propertyviewreference.default.md#context)
- [currentlyFindingValueFor](client_internal_components_propertyview_propertyviewreference.default.md#currentlyfindingvaluefor)
- [props](client_internal_components_propertyview_propertyviewreference.default.md#props)
- [refs](client_internal_components_propertyview_propertyviewreference.default.md#refs)
- [ssrServerOnlyValue](client_internal_components_propertyview_propertyviewreference.default.md#ssrserveronlyvalue)
- [state](client_internal_components_propertyview_propertyviewreference.default.md#state)
- [contextType](client_internal_components_propertyview_propertyviewreference.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertyview_propertyviewreference.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertyview_propertyviewreference.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertyview_propertyviewreference.default.md#unsafe_componentwillupdate)
- [beforeSSRRender](client_internal_components_propertyview_propertyviewreference.default.md#beforessrrender)
- [componentDidCatch](client_internal_components_propertyview_propertyviewreference.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertyview_propertyviewreference.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertyview_propertyviewreference.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertyview_propertyviewreference.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertyview_propertyviewreference.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertyview_propertyviewreference.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertyview_propertyviewreference.default.md#componentwillupdate)
- [findCurrentStrValue](client_internal_components_propertyview_propertyviewreference.default.md#findcurrentstrvalue)
- [forceUpdate](client_internal_components_propertyview_propertyviewreference.default.md#forceupdate)
- [getSSRFoundValue](client_internal_components_propertyview_propertyviewreference.default.md#getssrfoundvalue)
- [getSnapshotBeforeUpdate](client_internal_components_propertyview_propertyviewreference.default.md#getsnapshotbeforeupdate)
- [getSpecialData](client_internal_components_propertyview_propertyviewreference.default.md#getspecialdata)
- [render](client_internal_components_propertyview_propertyviewreference.default.md#render)
- [setState](client_internal_components_propertyview_propertyviewreference.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertyview_propertyviewreference.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>): [*default*](client_internal_components_propertyview_propertyviewreference.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\> |

**Returns:** [*default*](client_internal_components_propertyview_propertyviewreference.default.md)

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:46](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L46)

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

### currentlyFindingValueFor

• `Private` **currentlyFindingValueFor**: [*string*, *string*]

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:45](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L45)

___

### props

• `Readonly` **props**: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### ssrServerOnlyValue

• `Private` **ssrServerOnlyValue**: *string*

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:46](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L46)

___

### state

• **state**: *Readonly*<IPropertyViewReferenceState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyViewReferenceState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyViewReferenceState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### beforeSSRRender

▸ **beforeSSRRender**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:166](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L166)

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

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:64](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L64)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:277](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L277)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyViewReferenceState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyViewReferenceState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### findCurrentStrValue

▸ **findCurrentStrValue**(`forId`: *string*, `forVersion`: *string*): *Promise*<void\>

Finds the current string value for the given id and version

#### Parameters:

Name | Type |
:------ | :------ |
`forId` | *string* |
`forVersion` | *string* |

**Returns:** *Promise*<void\>

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:194](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L194)

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

### getSSRFoundValue

▸ **getSSRFoundValue**(`forId`: *string*, `forVersion`: *string*): *string*

Provides the SSR found value if any found and if SSR active

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`forId` | *string* | for the given id   |
`forVersion` | *string* | for the given version   |

**Returns:** *string*

a string value or null if nothing found

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:132](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L132)

___

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\>, `prevState`: *Readonly*<IPropertyViewReferenceState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\> |
`prevState` | *Readonly*<IPropertyViewReferenceState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### getSpecialData

▸ **getSpecialData**(): [[*default*](base_root_module_itemdefinition.default.md), [*default*](base_root_module_itemdefinition_propertydefinition.default.md)]

Provides the special data for the reference

**Returns:** [[*default*](base_root_module_itemdefinition.default.md), [*default*](base_root_module_itemdefinition_propertydefinition.default.md)]

an array where 0 is the item definition that is target, 1 is the property definition
we are using for display

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:97](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L97)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:336](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L336)

___

### setState

▸ **setState**<K\>(`state`: IPropertyViewReferenceState \| (`prevState`: *Readonly*<IPropertyViewReferenceState\>, `props`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\>) => IPropertyViewReferenceState \| *Pick*<IPropertyViewReferenceState, K\> \| *Pick*<IPropertyViewReferenceState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *currentFindError* \| *currentStrValue* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyViewReferenceState \| (`prevState`: *Readonly*<IPropertyViewReferenceState\>, `props`: *Readonly*<[*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>\>) => IPropertyViewReferenceState \| *Pick*<IPropertyViewReferenceState, K\> \| *Pick*<IPropertyViewReferenceState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>, `nextState`: IPropertyViewReferenceState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | [*IPropertyViewHandlerProps*](../interfaces/client_internal_components_propertyview.ipropertyviewhandlerprops.md)<[*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\> |
`nextState` | IPropertyViewReferenceState |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyView/PropertyViewReference.tsx:318](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/PropertyViewReference.tsx#L318)
