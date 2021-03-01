[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_propertyentry_propertyentrylocation.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_propertyentry_propertyentrylocation.md).default

The property entry location class

## Hierarchy

* *Component*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>, IPropertyEntryLocationState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertyentry_propertyentrylocation.default.md#constructor)

### Properties

- [autocompleteTakingPlace](client_internal_components_propertyentry_propertyentrylocation.default.md#autocompletetakingplace)
- [context](client_internal_components_propertyentry_propertyentrylocation.default.md#context)
- [delaySuggestionFetch](client_internal_components_propertyentry_propertyentrylocation.default.md#delaysuggestionfetch)
- [geocodeTakingPlace](client_internal_components_propertyentry_propertyentrylocation.default.md#geocodetakingplace)
- [lastSearchValue](client_internal_components_propertyentry_propertyentrylocation.default.md#lastsearchvalue)
- [lastSearchValueQ](client_internal_components_propertyentry_propertyentrylocation.default.md#lastsearchvalueq)
- [lastSuggestionsValue](client_internal_components_propertyentry_propertyentrylocation.default.md#lastsuggestionsvalue)
- [lastSuggestionsValueQ](client_internal_components_propertyentry_propertyentrylocation.default.md#lastsuggestionsvalueq)
- [props](client_internal_components_propertyentry_propertyentrylocation.default.md#props)
- [refs](client_internal_components_propertyentry_propertyentrylocation.default.md#refs)
- [searchTakingPlace](client_internal_components_propertyentry_propertyentrylocation.default.md#searchtakingplace)
- [state](client_internal_components_propertyentry_propertyentrylocation.default.md#state)
- [contextType](client_internal_components_propertyentry_propertyentrylocation.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertyentry_propertyentrylocation.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertyentry_propertyentrylocation.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertyentry_propertyentrylocation.default.md#unsafe_componentwillupdate)
- [clearSearchResults](client_internal_components_propertyentry_propertyentrylocation.default.md#clearsearchresults)
- [clearSuggestions](client_internal_components_propertyentry_propertyentrylocation.default.md#clearsuggestions)
- [componentDidCatch](client_internal_components_propertyentry_propertyentrylocation.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertyentry_propertyentrylocation.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertyentry_propertyentrylocation.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertyentry_propertyentrylocation.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertyentry_propertyentrylocation.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertyentry_propertyentrylocation.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertyentry_propertyentrylocation.default.md#componentwillupdate)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentrylocation.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_propertyentry_propertyentrylocation.default.md#forceupdate)
- [geocode](client_internal_components_propertyentry_propertyentrylocation.default.md#geocode)
- [getSnapshotBeforeUpdate](client_internal_components_propertyentry_propertyentrylocation.default.md#getsnapshotbeforeupdate)
- [onChangeBySearchResult](client_internal_components_propertyentry_propertyentrylocation.default.md#onchangebysearchresult)
- [onChangeBySuggestion](client_internal_components_propertyentry_propertyentrylocation.default.md#onchangebysuggestion)
- [onManualPick](client_internal_components_propertyentry_propertyentrylocation.default.md#onmanualpick)
- [onRestoreHijacked](client_internal_components_propertyentry_propertyentrylocation.default.md#onrestorehijacked)
- [onSearch](client_internal_components_propertyentry_propertyentrylocation.default.md#onsearch)
- [onSearchQueryChange](client_internal_components_propertyentry_propertyentrylocation.default.md#onsearchquerychange)
- [onSearchQueryChangeActual](client_internal_components_propertyentry_propertyentrylocation.default.md#onsearchquerychangeactual)
- [onViewportChange](client_internal_components_propertyentry_propertyentrylocation.default.md#onviewportchange)
- [render](client_internal_components_propertyentry_propertyentrylocation.default.md#render)
- [setState](client_internal_components_propertyentry_propertyentrylocation.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertyentry_propertyentrylocation.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>): [*default*](client_internal_components_propertyentry_propertyentrylocation.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\> |

**Returns:** [*default*](client_internal_components_propertyentry_propertyentrylocation.default.md)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:240](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L240)

## Properties

### autocompleteTakingPlace

• `Private` **autocompleteTakingPlace**: *number*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:229](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L229)

___

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

### delaySuggestionFetch

• `Private` **delaySuggestionFetch**: *Timeout*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:233](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L233)

___

### geocodeTakingPlace

• `Private` **geocodeTakingPlace**: *number*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:230](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L230)

___

### lastSearchValue

• `Private` **lastSearchValue**: [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:239](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L239)

___

### lastSearchValueQ

• `Private` **lastSearchValueQ**: *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:240](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L240)

___

### lastSuggestionsValue

• `Private` **lastSuggestionsValue**: [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:235](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L235)

___

### lastSuggestionsValueQ

• `Private` **lastSuggestionsValueQ**: *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:237](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L237)

___

### props

• `Readonly` **props**: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### searchTakingPlace

• `Private` **searchTakingPlace**: *number*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:228](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L228)

___

### state

• **state**: *Readonly*<IPropertyEntryLocationState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryLocationState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryLocationState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### clearSearchResults

▸ **clearSearchResults**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:625](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L625)

___

### clearSuggestions

▸ **clearSuggestions**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:632](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L632)

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

▸ **componentDidUpdate**(`prevProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:303](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L303)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\> |
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

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryLocationState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryLocationState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:297](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L297)

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

### geocode

▸ **geocode**(`value`: [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)): *Promise*<void\>

run the geocode for incomplete values

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) |

**Returns:** *Promise*<void\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:642](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L642)

___

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\>, `prevState`: *Readonly*<IPropertyEntryLocationState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\> |
`prevState` | *Readonly*<IPropertyEntryLocationState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### onChangeBySearchResult

▸ **onChangeBySearchResult**(`searchResult`: [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*): *void*

Fed to the renderer to change by search result

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`searchResult` | [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) | the search result in question   |
`mantainViewport?` | *boolean* | whether to mantain the viewport    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:588](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L588)

___

### onChangeBySuggestion

▸ **onChangeBySuggestion**(`suggestion`: [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*): *void*

Fed to the renderer to change by suggestion

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`suggestion` | [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) | the suggestion we are using   |
`mantainViewport?` | *boolean* | whether to mantain the viewport    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:465](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L465)

___

### onManualPick

▸ **onManualPick**(`value`: [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), `mantainViewport?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) |
`mantainViewport?` | *boolean* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:668](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L668)

___

### onRestoreHijacked

▸ **onRestoreHijacked**(): *void*

Hijacking the on restore function

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:340](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L340)

___

### onSearch

▸ **onSearch**(`mantainViewport?`: *boolean*): *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

Fed to the renderer in order to run a search

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mantainViewport?` | *boolean* | whether to mantain the viewport    |

**Returns:** *Promise*<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)[]\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:479](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L479)

___

### onSearchQueryChange

▸ **onSearchQueryChange**(`searchQuery`: *string*, `dontAutoloadSuggestions?`: *boolean*): *void*

Triggers when the search query changes, this is the literal
function that is fed to the renderer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`searchQuery` | *string* | the search query the renderer gives   |
`dontAutoloadSuggestions?` | *boolean* | and whether we should not autoload suggestions    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:407](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L407)

___

### onSearchQueryChangeActual

▸ **onSearchQueryChangeActual**(`searchQuery`: *string*, `updateIdentifier`: *number*): *Promise*<void\>

Actuall what triggers

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`searchQuery` | *string* | the search query we are using   |
`updateIdentifier` | *number* | the identifier of this, to ensure that if two changes happened at once, only the last one wil trigger    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:361](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L361)

___

### onViewportChange

▸ **onViewportChange**(`viewport`: [*IViewport*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.iviewport.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`viewport` | [*IViewport*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.iviewport.md) |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:347](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L347)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:716](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L716)

___

### setState

▸ **setState**<K\>(`state`: IPropertyEntryLocationState \| (`prevState`: *Readonly*<IPropertyEntryLocationState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\>) => IPropertyEntryLocationState \| *Pick*<IPropertyEntryLocationState, K\> \| *Pick*<IPropertyEntryLocationState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *viewport* \| *showUserSetErrors* \| *suggestions* \| *searchResults* \| *searchCurrentlyMarkedValue* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyEntryLocationState \| (`prevState`: *Readonly*<IPropertyEntryLocationState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\>) => IPropertyEntryLocationState \| *Pick*<IPropertyEntryLocationState, K\> \| *Pick*<IPropertyEntryLocationState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>, `nextState`: IPropertyEntryLocationState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md), [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\> |
`nextState` | IPropertyEntryLocationState |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:276](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L276)
