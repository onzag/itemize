[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryFiles](../modules/client_internal_components_PropertyEntry_PropertyEntryFiles.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryFiles](../modules/client_internal_components_PropertyEntry_PropertyEntryFiles.md).default

This is the property entry file class

## Hierarchy

- `Component`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>, `IPropertyEntryFilesState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#constructor)

### Properties

- [context](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#context)
- [ownedObjectURLPool](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#ownedobjecturlpool)
- [props](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#props)
- [refs](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#refs)
- [state](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#state)
- [contextType](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#unsafe_componentwillupdate)
- [checkFileInAcceptsAndCommit](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#checkfileinacceptsandcommit)
- [componentDidCatch](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#componentwillupdate)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#forceupdate)
- [getCurrentValue](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#getcurrentvalue)
- [getCurrentValueWithInfo](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#getcurrentvaluewithinfo)
- [getIdOfLastValue](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#getidoflastvalue)
- [getSnapshotBeforeUpdate](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#getsnapshotbeforeupdate)
- [getValueWithInfoFromSpecific](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#getvaluewithinfofromspecific)
- [onPushFile](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#onpushfile)
- [onPushFileInternal](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#onpushfileinternal)
- [onPushFiles](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#onpushfiles)
- [onRemoveFileAt](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#onremovefileat)
- [onRemoveRejectFileAt](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#onremoverejectfileat)
- [onUpdateExtraMetadataAt](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#onupdateextrametadataat)
- [onUpdateRejectExtraMetadataAt](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#onupdaterejectextrametadataat)
- [openFile](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#openfile)
- [render](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#render)
- [setState](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\> |

#### Returns

[`default`](client_internal_components_PropertyEntry_PropertyEntryFiles.default.md)

#### Overrides

React.Component\&lt;
    IPropertyEntryHandlerProps\&lt;PropertyDefinitionSupportedFilesType, IPropertyEntryFilesRendererProps\&gt;,
    IPropertyEntryFilesState
  \&gt;.constructor

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:173](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L173)

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

### ownedObjectURLPool

• `Private` **ownedObjectURLPool**: `Object`

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

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:171](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L171)

___

### props

• `Readonly` **props**: `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`\<`IPropertyEntryFilesState`\>

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>\> |
| `nextState` | `Readonly`\<`IPropertyEntryFilesState`\> |
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

### checkFileInAcceptsAndCommit

▸ **checkFileInAcceptsAndCommit**(`isExpectingImages`, `acceptOverride`, `value`, `avoidChanges`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isExpectingImages` | `boolean` |
| `acceptOverride` | `string` |
| `value` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) |
| `avoidChanges` | `boolean` |

#### Returns

`boolean`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:418](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L418)

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

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:619

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>\> |
| `prevState` | `Readonly`\<`IPropertyEntryFilesState`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>\> |
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

#### Returns

`void`

#### Overrides

React.Component.componentWillUnmount

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:222](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L222)

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>\> |
| `nextState` | `Readonly`\<`IPropertyEntryFilesState`\> |
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

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:604](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L604)

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

### getCurrentValue

▸ **getCurrentValue**(`doNotAbsolute`): [`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)

Provides the current value, either the actual value
or the rejected value

#### Parameters

| Name | Type |
| :------ | :------ |
| `doNotAbsolute` | `boolean` |

#### Returns

[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)

a PropertyDefinitionSupportedFileType

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:246](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L246)

___

### getCurrentValueWithInfo

▸ **getCurrentValueWithInfo**(): `PropertyDefinitionSupportedFileTypeWithInfo`[]

#### Returns

`PropertyDefinitionSupportedFileTypeWithInfo`[]

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:320](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L320)

___

### getIdOfLastValue

▸ **getIdOfLastValue**(): `string`

#### Returns

`string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:229](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L229)

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
| `prevProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>\> |
| `prevState` | `Readonly`\<`IPropertyEntryFilesState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### getValueWithInfoFromSpecific

▸ **getValueWithInfoFromSpecific**(`v`, `data`): `PropertyDefinitionSupportedFileTypeWithInfo`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) |
| `data` | `Object` |
| `data.givenIndex` | `number` |
| `data.isReject?` | `boolean` |
| `data.rejectedReason?` | `string` |

#### Returns

`PropertyDefinitionSupportedFileTypeWithInfo`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:283](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L283)

___

### onPushFile

▸ **onPushFile**(`file`, `info?`): `Promise`\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |
| `info` | `IOnSetDataInfo` |

#### Returns

`Promise`\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md)\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:415](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L415)

___

### onPushFileInternal

▸ **onPushFileInternal**(`file`, `info?`, `avoidChanges?`): `Promise`\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |
| `info` | `IOnSetDataInfo` |
| `avoidChanges?` | `boolean` |

#### Returns

`Promise`\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md)\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:465](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L465)

___

### onPushFiles

▸ **onPushFiles**(`files`, `info?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `files` | `File`[] |
| `info` | `IOnSetDataInfo` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:399](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L399)

___

### onRemoveFileAt

▸ **onRemoveFileAt**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:582](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L582)

___

### onRemoveRejectFileAt

▸ **onRemoveRejectFileAt**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:597](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L597)

___

### onUpdateExtraMetadataAt

▸ **onUpdateExtraMetadataAt**(`index`, `extraMetadata`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `extraMetadata` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:371](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L371)

___

### onUpdateRejectExtraMetadataAt

▸ **onUpdateRejectExtraMetadataAt**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:396](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L396)

___

### openFile

▸ **openFile**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:367](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L367)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:609](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L609)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyEntryFilesState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryFilesState` \| (`prevState`: `Readonly`\<`IPropertyEntryFilesState`\>, `props`: `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>\>) => `IPropertyEntryFilesState` \| `Pick`\<`IPropertyEntryFilesState`, `K`\> \| `Pick`\<`IPropertyEntryFilesState`, `K`\> |
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
| `nextProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\> |
| `nextState` | `IPropertyEntryFilesState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:195](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L195)
