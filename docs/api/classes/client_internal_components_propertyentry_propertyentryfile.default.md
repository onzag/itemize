[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryFile](../modules/client_internal_components_propertyentry_propertyentryfile.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryFile](../modules/client_internal_components_propertyentry_propertyentryfile.md).default

This is the property entry file class

## Hierarchy

* *Component*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*PropertyDefinitionSupportedFileType*](../modules/base_root_module_itemdefinition_propertydefinition_types_file.md#propertydefinitionsupportedfiletype), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>, IPropertyEntryFileState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertyentry_propertyentryfile.default.md#constructor)

### Properties

- [context](client_internal_components_propertyentry_propertyentryfile.default.md#context)
- [ownedObjectURLPool](client_internal_components_propertyentry_propertyentryfile.default.md#ownedobjecturlpool)
- [props](client_internal_components_propertyentry_propertyentryfile.default.md#props)
- [refs](client_internal_components_propertyentry_propertyentryfile.default.md#refs)
- [state](client_internal_components_propertyentry_propertyentryfile.default.md#state)
- [contextType](client_internal_components_propertyentry_propertyentryfile.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertyentry_propertyentryfile.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertyentry_propertyentryfile.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertyentry_propertyentryfile.default.md#unsafe_componentwillupdate)
- [componentDidCatch](client_internal_components_propertyentry_propertyentryfile.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertyentry_propertyentryfile.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertyentry_propertyentryfile.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertyentry_propertyentryfile.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertyentry_propertyentryfile.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertyentry_propertyentryfile.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertyentry_propertyentryfile.default.md#componentwillupdate)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentryfile.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_propertyentry_propertyentryfile.default.md#forceupdate)
- [getCurrentValue](client_internal_components_propertyentry_propertyentryfile.default.md#getcurrentvalue)
- [getSnapshotBeforeUpdate](client_internal_components_propertyentry_propertyentryfile.default.md#getsnapshotbeforeupdate)
- [onRemoveFile](client_internal_components_propertyentry_propertyentryfile.default.md#onremovefile)
- [onSetFile](client_internal_components_propertyentry_propertyentryfile.default.md#onsetfile)
- [openFile](client_internal_components_propertyentry_propertyentryfile.default.md#openfile)
- [render](client_internal_components_propertyentry_propertyentryfile.default.md#render)
- [setState](client_internal_components_propertyentry_propertyentryfile.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertyentry_propertyentryfile.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>): [*default*](client_internal_components_propertyentry_propertyentryfile.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\> |

**Returns:** [*default*](client_internal_components_propertyentry_propertyentryfile.default.md)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:139](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L139)

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

### ownedObjectURLPool

• `Private` **ownedObjectURLPool**: *object*

Owned object urls that creates blob urls
for the given files, it is cleared on dismount; this means
that any urls used that are temporary blobs will only
be available as long as the entry is active, as such
views will update, using the given url, and other entries
will keep themselves in sync, however once the entry is done
the values aren't available anymore, even if the state
still specifies a blob url because it hasn't been changed

Submitting will still work just fine, because the src still
points to a file

#### Type declaration:

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:139](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L139)

___

### props

• `Readonly` **props**: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<IPropertyEntryFileState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryFileState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryFileState\> |
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

▸ `Optional`**componentDidUpdate**(`prevProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>, `prevState`: *Readonly*<IPropertyEntryFileState\>, `snapshot?`: *any*): *void*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\> |
`prevState` | *Readonly*<IPropertyEntryFileState\> |
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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:182](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L182)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryFileState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryFileState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:310](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L310)

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

### getCurrentValue

▸ `Private`**getCurrentValue**(): [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)

Provides the current value, either the actual value
or the rejected value

**Returns:** [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)

a PropertyDefinitionSupportedFileType

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:194](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L194)

___

### getSnapshotBeforeUpdate

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>, `prevState`: *Readonly*<IPropertyEntryFileState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\> |
`prevState` | *Readonly*<IPropertyEntryFileState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### onRemoveFile

▸ **onRemoveFile**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:304](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L304)

___

### onSetFile

▸ **onSetFile**(`file`: File): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`file` | File |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:232](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L232)

___

### openFile

▸ **openFile**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:227](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L227)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:315](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L315)

___

### setState

▸ **setState**<K\>(`state`: IPropertyEntryFileState \| (`prevState`: *Readonly*<IPropertyEntryFileState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>) => IPropertyEntryFileState \| *Pick*<IPropertyEntryFileState, K\> \| *Pick*<IPropertyEntryFileState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *rejectedReason* \| *showUserSetErrors* \| *rejectedValue* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyEntryFileState \| (`prevState`: *Readonly*<IPropertyEntryFileState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>) => IPropertyEntryFileState \| *Pick*<IPropertyEntryFileState, K\> \| *Pick*<IPropertyEntryFileState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>, `nextState`: IPropertyEntryFileState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md), [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\> |
`nextState` | IPropertyEntryFileState |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:159](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L159)
