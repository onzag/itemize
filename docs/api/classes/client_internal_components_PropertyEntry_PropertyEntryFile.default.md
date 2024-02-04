[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryFile](../modules/client_internal_components_PropertyEntry_PropertyEntryFile.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryFile](../modules/client_internal_components_PropertyEntry_PropertyEntryFile.md).default

This is the property entry file class

## Hierarchy

- `Component`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`PropertyDefinitionSupportedFileType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_file.md#propertydefinitionsupportedfiletype), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>, `IPropertyEntryFileState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#constructor)

### Properties

- [context](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#context)
- [ownedObjectURLPool](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#ownedobjecturlpool)
- [props](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#props)
- [refs](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#refs)
- [state](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#state)
- [contextType](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#unsafe_componentwillupdate)
- [checkFileAcceptsAndCommit](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#checkfileacceptsandcommit)
- [cleanRejected](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#cleanrejected)
- [componentDidCatch](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#componentwillupdate)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#forceupdate)
- [getCurrentValue](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#getcurrentvalue)
- [getSnapshotBeforeUpdate](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#getsnapshotbeforeupdate)
- [onRemoveFile](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#onremovefile)
- [onSetFile](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#onsetfile)
- [onUpdateExtraMetadata](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#onupdateextrametadata)
- [openFile](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#openfile)
- [render](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#render)
- [setState](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyEntry_PropertyEntryFile.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_internal_components_PropertyEntry_PropertyEntryFile.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\> |

#### Returns

[`default`](client_internal_components_PropertyEntry_PropertyEntryFile.default.md)

#### Overrides

React.Component\&lt;
    IPropertyEntryHandlerProps\&lt;PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps\&gt;,
    IPropertyEntryFileState
  \&gt;.constructor

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:184](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L184)

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

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:182](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L182)

___

### props

• `Readonly` **props**: `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`\<`IPropertyEntryFileState`\>

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>\> |
| `nextState` | `Readonly`\<`IPropertyEntryFileState`\> |
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

### checkFileAcceptsAndCommit

▸ **checkFileAcceptsAndCommit**(`isExpectingImages`, `acceptOverride`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isExpectingImages` | `boolean` |
| `acceptOverride` | `string` |
| `value` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:304](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L304)

___

### cleanRejected

▸ **cleanRejected**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:421](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L421)

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
| `prevProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>\> |
| `prevState` | `Readonly`\<`IPropertyEntryFileState`\> |
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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>\> |
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

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:230](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L230)

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>\> |
| `nextState` | `Readonly`\<`IPropertyEntryFileState`\> |
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

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:416](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L416)

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

▸ **getCurrentValue**(): [`IRQFile`](../interfaces/rq_querier.IRQFile.md)

Provides the current value

#### Returns

[`IRQFile`](../interfaces/rq_querier.IRQFile.md)

a PropertyDefinitionSupportedFileType

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:241](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L241)

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
| `prevProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>\> |
| `prevState` | `Readonly`\<`IPropertyEntryFileState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onRemoveFile

▸ **onRemoveFile**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:410](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L410)

___

### onSetFile

▸ **onSetFile**(`file`, `info?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |
| `info` | `IOnSetDataInfo` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:340](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L340)

___

### onUpdateExtraMetadata

▸ **onUpdateExtraMetadata**(`extraMetadata`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `extraMetadata` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:282](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L282)

___

### openFile

▸ **openFile**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:277](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L277)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:427](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L427)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyEntryFileState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryFileState` \| (`prevState`: `Readonly`\<`IPropertyEntryFileState`\>, `props`: `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>\>) => `IPropertyEntryFileState` \| `Pick`\<`IPropertyEntryFileState`, `K`\> \| `Pick`\<`IPropertyEntryFileState`, `K`\> |
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
| `nextProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md), [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\> |
| `nextState` | `IPropertyEntryFileState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:204](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L204)
