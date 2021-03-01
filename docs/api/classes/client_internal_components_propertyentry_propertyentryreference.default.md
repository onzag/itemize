[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryReference](../modules/client_internal_components_propertyentry_propertyentryreference.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryReference](../modules/client_internal_components_propertyentry_propertyentryreference.md).default

## Hierarchy

* *Component*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>, IPropertyEntryReferenceState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertyentry_propertyentryreference.default.md#constructor)

### Properties

- [context](client_internal_components_propertyentry_propertyentryreference.default.md#context)
- [currentlyFindingValueFor](client_internal_components_propertyentry_propertyentryreference.default.md#currentlyfindingvaluefor)
- [isUnmounted](client_internal_components_propertyentry_propertyentryreference.default.md#isunmounted)
- [lastCachedSearch](client_internal_components_propertyentry_propertyentryreference.default.md#lastcachedsearch)
- [lastCachedSearchPreventedIds](client_internal_components_propertyentry_propertyentryreference.default.md#lastcachedsearchpreventedids)
- [lastCachedSearchPreventedProperties](client_internal_components_propertyentry_propertyentryreference.default.md#lastcachedsearchpreventedproperties)
- [lastCachedSearchPreventedPropertiesIds](client_internal_components_propertyentry_propertyentryreference.default.md#lastcachedsearchpreventedpropertiesids)
- [lastSearchArgumentLimit](client_internal_components_propertyentry_propertyentryreference.default.md#lastsearchargumentlimit)
- [lastSearchArgumentLoadAll](client_internal_components_propertyentry_propertyentryreference.default.md#lastsearchargumentloadall)
- [lastSearchArgumentPreventEqualityWithProperties](client_internal_components_propertyentry_propertyentryreference.default.md#lastsearchargumentpreventequalitywithproperties)
- [lastSearchArgumentPreventIds](client_internal_components_propertyentry_propertyentryreference.default.md#lastsearchargumentpreventids)
- [lastSearchId](client_internal_components_propertyentry_propertyentryreference.default.md#lastsearchid)
- [props](client_internal_components_propertyentry_propertyentryreference.default.md#props)
- [refs](client_internal_components_propertyentry_propertyentryreference.default.md#refs)
- [searchTimeout](client_internal_components_propertyentry_propertyentryreference.default.md#searchtimeout)
- [ssrServerOnlyValue](client_internal_components_propertyentry_propertyentryreference.default.md#ssrserveronlyvalue)
- [state](client_internal_components_propertyentry_propertyentryreference.default.md#state)
- [contextType](client_internal_components_propertyentry_propertyentryreference.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertyentry_propertyentryreference.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertyentry_propertyentryreference.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertyentry_propertyentryreference.default.md#unsafe_componentwillupdate)
- [addListeners](client_internal_components_propertyentry_propertyentryreference.default.md#addlisteners)
- [addPreventEqualityWithPropertiesListener](client_internal_components_propertyentry_propertyentryreference.default.md#addpreventequalitywithpropertieslistener)
- [beforeSSRRender](client_internal_components_propertyentry_propertyentryreference.default.md#beforessrrender)
- [changeListener](client_internal_components_propertyentry_propertyentryreference.default.md#changelistener)
- [componentDidCatch](client_internal_components_propertyentry_propertyentryreference.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertyentry_propertyentryreference.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertyentry_propertyentryreference.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertyentry_propertyentryreference.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertyentry_propertyentryreference.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertyentry_propertyentryreference.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertyentry_propertyentryreference.default.md#componentwillupdate)
- [dismissFindError](client_internal_components_propertyentry_propertyentryreference.default.md#dismissfinderror)
- [dismissSearchError](client_internal_components_propertyentry_propertyentryreference.default.md#dismisssearcherror)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentryreference.default.md#enableuserseterrors)
- [findCurrentStrValue](client_internal_components_propertyentry_propertyentryreference.default.md#findcurrentstrvalue)
- [forceUpdate](client_internal_components_propertyentry_propertyentryreference.default.md#forceupdate)
- [getSSRFoundValue](client_internal_components_propertyentry_propertyentryreference.default.md#getssrfoundvalue)
- [getSnapshotBeforeUpdate](client_internal_components_propertyentry_propertyentryreference.default.md#getsnapshotbeforeupdate)
- [getSpecialData](client_internal_components_propertyentry_propertyentryreference.default.md#getspecialdata)
- [loadAllPossibleValues](client_internal_components_propertyentry_propertyentryreference.default.md#loadallpossiblevalues)
- [onCancel](client_internal_components_propertyentry_propertyentryreference.default.md#oncancel)
- [onChangeSearch](client_internal_components_propertyentry_propertyentryreference.default.md#onchangesearch)
- [onSelect](client_internal_components_propertyentry_propertyentryreference.default.md#onselect)
- [refilter](client_internal_components_propertyentry_propertyentryreference.default.md#refilter)
- [refilterPossibleValues](client_internal_components_propertyentry_propertyentryreference.default.md#refilterpossiblevalues)
- [removeListeners](client_internal_components_propertyentry_propertyentryreference.default.md#removelisteners)
- [removePreventEqualityWithPropertiesListener](client_internal_components_propertyentry_propertyentryreference.default.md#removepreventequalitywithpropertieslistener)
- [render](client_internal_components_propertyentry_propertyentryreference.default.md#render)
- [search](client_internal_components_propertyentry_propertyentryreference.default.md#search)
- [setState](client_internal_components_propertyentry_propertyentryreference.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertyentry_propertyentryreference.default.md#shouldcomponentupdate)
- [toggleListener](client_internal_components_propertyentry_propertyentryreference.default.md#togglelistener)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>): [*default*](client_internal_components_propertyentry_propertyentryreference.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\> |

**Returns:** [*default*](client_internal_components_propertyentry_propertyentryreference.default.md)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:69](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L69)

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

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:54](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L54)

___

### isUnmounted

• `Private` **isUnmounted**: *boolean*= false

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:69](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L69)

___

### lastCachedSearch

• `Private` **lastCachedSearch**: [*IPropertyEntryReferenceOption*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferenceoption.md)[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:62](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L62)

___

### lastCachedSearchPreventedIds

• `Private` **lastCachedSearchPreventedIds**: *string*[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:65](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L65)

___

### lastCachedSearchPreventedProperties

• `Private` **lastCachedSearchPreventedProperties**: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:63](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L63)

___

### lastCachedSearchPreventedPropertiesIds

• `Private` **lastCachedSearchPreventedPropertiesIds**: *string*[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:64](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L64)

___

### lastSearchArgumentLimit

• `Private` **lastSearchArgumentLimit**: *number*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:58](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L58)

___

### lastSearchArgumentLoadAll

• `Private` **lastSearchArgumentLoadAll**: *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:57](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L57)

___

### lastSearchArgumentPreventEqualityWithProperties

• `Private` **lastSearchArgumentPreventEqualityWithProperties**: *string*[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:60](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L60)

___

### lastSearchArgumentPreventIds

• `Private` **lastSearchArgumentPreventIds**: *string*[]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:59](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L59)

___

### lastSearchId

• `Private` **lastSearchId**: *number*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:55](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L55)

___

### props

• `Readonly` **props**: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### searchTimeout

• `Private` **searchTimeout**: *Timeout*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:53](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L53)

___

### ssrServerOnlyValue

• `Private` **ssrServerOnlyValue**: *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:67](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L67)

___

### state

• **state**: *Readonly*<IPropertyEntryReferenceState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryReferenceState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryReferenceState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### addListeners

▸ **addListeners**(`props?`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:187](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L187)

___

### addPreventEqualityWithPropertiesListener

▸ **addPreventEqualityWithPropertiesListener**(`properties`: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`properties` | [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[] |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:175](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L175)

___

### beforeSSRRender

▸ **beforeSSRRender**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:414](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L414)

___

### changeListener

▸ **changeListener**(`id`: *string*, `version`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`version` | *string* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:104](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L104)

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

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:120](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L120)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:659](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L659)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:136](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L136)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryReferenceState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryReferenceState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### dismissFindError

▸ **dismissFindError**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:653](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L653)

___

### dismissSearchError

▸ **dismissSearchError**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:647](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L647)

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:98](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L98)

___

### findCurrentStrValue

▸ **findCurrentStrValue**(`forId`: *string*, `forVersion`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`forId` | *string* |
`forVersion` | *string* |

**Returns:** *Promise*<void\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:463](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L463)

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

#### Parameters:

Name | Type |
:------ | :------ |
`forId` | *string* |
`forVersion` | *string* |

**Returns:** *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:437](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L437)

___

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\>, `prevState`: *Readonly*<IPropertyEntryReferenceState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\> |
`prevState` | *Readonly*<IPropertyEntryReferenceState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### getSpecialData

▸ **getSpecialData**(): [[*default*](base_root_module_itemdefinition.default.md), [*default*](base_root_module_itemdefinition_propertydefinition.default.md), [*default*](base_root_module_itemdefinition_propertydefinition.default.md)]

**Returns:** [[*default*](base_root_module_itemdefinition.default.md), [*default*](base_root_module_itemdefinition_propertydefinition.default.md), [*default*](base_root_module_itemdefinition_propertydefinition.default.md)]

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:378](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L378)

___

### loadAllPossibleValues

▸ **loadAllPossibleValues**(`limit`: *number*, `preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`limit` | *number* |
`preventIds?` | *string*[] |
`preventEqualityWithProperties?` | *string*[] |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:540](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L540)

___

### onCancel

▸ **onCancel**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:632](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L632)

___

### onChangeSearch

▸ **onChangeSearch**(`str`: *string*, `preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`preventIds?` | *string*[] |
`preventEqualityWithProperties?` | *string*[] |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:608](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L608)

___

### onSelect

▸ **onSelect**(`option`: [*IPropertyEntryReferenceOption*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferenceoption.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`option` | [*IPropertyEntryReferenceOption*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferenceoption.md) |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:628](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L628)

___

### refilter

▸ **refilter**(`id`: *string*, `version`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`version` | *string* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:544](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L544)

___

### refilterPossibleValues

▸ **refilterPossibleValues**(`preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`preventIds?` | *string*[] |
`preventEqualityWithProperties?` | *string*[] |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:551](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L551)

___

### removeListeners

▸ **removeListeners**(`props?`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:191](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L191)

___

### removePreventEqualityWithPropertiesListener

▸ **removePreventEqualityWithPropertiesListener**(`properties`: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`properties` | [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[] |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:181](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L181)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:715](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L715)

___

### search

▸ **search**(`loadAll?`: *boolean*, `limit?`: *number*, `preventIds?`: *string*[], `preventEqualityWithProperties?`: *string*[]): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`loadAll?` | *boolean* |
`limit?` | *number* |
`preventIds?` | *string*[] |
`preventEqualityWithProperties?` | *string*[] |

**Returns:** *Promise*<void\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:195](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L195)

___

### setState

▸ **setState**<K\>(`state`: IPropertyEntryReferenceState \| (`prevState`: *Readonly*<IPropertyEntryReferenceState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\>) => IPropertyEntryReferenceState \| *Pick*<IPropertyEntryReferenceState, K\> \| *Pick*<IPropertyEntryReferenceState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *currentOptions* \| *currentFindError* \| *currentSearchError* \| *showUserSetErrors* \| *currentOptionsVersion* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyEntryReferenceState \| (`prevState`: *Readonly*<IPropertyEntryReferenceState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\>) => IPropertyEntryReferenceState \| *Pick*<IPropertyEntryReferenceState, K\> \| *Pick*<IPropertyEntryReferenceState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>, `nextState`: IPropertyEntryReferenceState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\> |
`nextState` | IPropertyEntryReferenceState |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:693](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L693)

___

### toggleListener

▸ **toggleListener**(`props?`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>, `fn`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\> |
`fn` | *string* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryReference.tsx:144](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyEntry/PropertyEntryReference.tsx#L144)
