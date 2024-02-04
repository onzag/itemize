[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md).default

The property entry text handler class

## Hierarchy

- `Component`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>, `IPropertyEntryTextState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyEntry_PropertyEntryText.default.md#constructor)

### Properties

- [cachedMediaProperty](client_internal_components_PropertyEntry_PropertyEntryText.default.md#cachedmediaproperty)
- [cachedMediaPropertyAcceptsFiles](client_internal_components_PropertyEntry_PropertyEntryText.default.md#cachedmediapropertyacceptsfiles)
- [cachedMediaPropertyAcceptsImages](client_internal_components_PropertyEntry_PropertyEntryText.default.md#cachedmediapropertyacceptsimages)
- [context](client_internal_components_PropertyEntry_PropertyEntryText.default.md#context)
- [internalFileCache](client_internal_components_PropertyEntry_PropertyEntryText.default.md#internalfilecache)
- [props](client_internal_components_PropertyEntry_PropertyEntryText.default.md#props)
- [refs](client_internal_components_PropertyEntry_PropertyEntryText.default.md#refs)
- [state](client_internal_components_PropertyEntry_PropertyEntryText.default.md#state)
- [contextType](client_internal_components_PropertyEntry_PropertyEntryText.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_PropertyEntry_PropertyEntryText.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryText.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryText.default.md#unsafe_componentwillupdate)
- [cacheCurrentFiles](client_internal_components_PropertyEntry_PropertyEntryText.default.md#cachecurrentfiles)
- [cacheMediaPropertyInProps](client_internal_components_PropertyEntry_PropertyEntryText.default.md#cachemediapropertyinprops)
- [componentDidCatch](client_internal_components_PropertyEntry_PropertyEntryText.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_PropertyEntry_PropertyEntryText.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_PropertyEntry_PropertyEntryText.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_PropertyEntry_PropertyEntryText.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_PropertyEntry_PropertyEntryText.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_PropertyEntry_PropertyEntryText.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_PropertyEntry_PropertyEntryText.default.md#componentwillupdate)
- [dismissLastLoadedFileError](client_internal_components_PropertyEntry_PropertyEntryText.default.md#dismisslastloadedfileerror)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryText.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_PropertyEntry_PropertyEntryText.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_components_PropertyEntry_PropertyEntryText.default.md#getsnapshotbeforeupdate)
- [onChangeHijacked](client_internal_components_PropertyEntry_PropertyEntryText.default.md#onchangehijacked)
- [onCheckFileExists](client_internal_components_PropertyEntry_PropertyEntryText.default.md#oncheckfileexists)
- [onInsertFile](client_internal_components_PropertyEntry_PropertyEntryText.default.md#oninsertfile)
- [onInsertFileFromURL](client_internal_components_PropertyEntry_PropertyEntryText.default.md#oninsertfilefromurl)
- [onRemoveFile](client_internal_components_PropertyEntry_PropertyEntryText.default.md#onremovefile)
- [onRestoreHijacked](client_internal_components_PropertyEntry_PropertyEntryText.default.md#onrestorehijacked)
- [onRestoreLostFile](client_internal_components_PropertyEntry_PropertyEntryText.default.md#onrestorelostfile)
- [onRetrieveFile](client_internal_components_PropertyEntry_PropertyEntryText.default.md#onretrievefile)
- [onRetrieveImage](client_internal_components_PropertyEntry_PropertyEntryText.default.md#onretrieveimage)
- [readBlobAsDataUrl](client_internal_components_PropertyEntry_PropertyEntryText.default.md#readblobasdataurl)
- [readUrlAsDataUrl](client_internal_components_PropertyEntry_PropertyEntryText.default.md#readurlasdataurl)
- [render](client_internal_components_PropertyEntry_PropertyEntryText.default.md#render)
- [setState](client_internal_components_PropertyEntry_PropertyEntryText.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyEntry_PropertyEntryText.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`): [`default`](client_internal_components_PropertyEntry_PropertyEntryText.default.md)

Contains a list of active data uris for the blob elements

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |

#### Returns

[`default`](client_internal_components_PropertyEntry_PropertyEntryText.default.md)

#### Overrides

React.Component\&lt;IPropertyEntryHandlerProps\&lt;IPropertyDefinitionSupportedTextType, IPropertyEntryTextRendererProps\&gt;, IPropertyEntryTextState\&gt;.constructor

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:260](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L260)

## Properties

### cachedMediaProperty

• `Private` **cachedMediaProperty**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

We hold and cache our media property

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:230](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L230)

___

### cachedMediaPropertyAcceptsFiles

• `Private` **cachedMediaPropertyAcceptsFiles**: `string`

We hold and cache our accepts for the media property

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:234](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L234)

___

### cachedMediaPropertyAcceptsImages

• `Private` **cachedMediaPropertyAcceptsImages**: `string`

We hold and cache our accpets for the images in the media property

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:238](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L238)

___

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

### internalFileCache

• `Private` **internalFileCache**: `Object`

As long as the property entry text is mounted it will keep track of all the files
that have ever been in it, in order to be able to restore
them during undo processes, note however, that this means that having
two equal property entry for text at the same time will revoke
all the blob urls during dismount and they will not share the same
history, this might cause issues due to this cache
so avoid having two entry at the same time

#### Index signature

▪ [id: `string`]: [`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:249](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L249)

___

### props

• `Readonly` **props**: `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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

• **state**: `Readonly`\<`IPropertyEntryTextState`\>

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
| `nextState` | `Readonly`\<`IPropertyEntryTextState`\> |
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

### cacheCurrentFiles

▸ **cacheCurrentFiles**(): `void`

Ran during mount of updates, caches the files that are in the media property

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:338](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L338)

___

### cacheMediaPropertyInProps

▸ **cacheMediaPropertyInProps**(`props`): `void`

Called during initial setup

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> | the props we are using |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:312](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L312)

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

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:379](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L379)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:388](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L388)

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
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

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:297](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L297)

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
| `nextProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
| `nextState` | `Readonly`\<`IPropertyEntryTextState`\> |
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

### dismissLastLoadedFileError

▸ **dismissLastLoadedFileError**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:291](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L291)

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:285](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L285)

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
| `prevProps` | `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
| `prevState` | `Readonly`\<`IPropertyEntryTextState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onChangeHijacked

▸ **onChangeHijacked**(`value`, `internalValue`): `void`

the change event but hijacked so we can see
if we need to remove things from the media property

This hijack only applies itself if there's a media property
so it makes sense

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md) | the value |
| `internalValue` | `any` | the internal value |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:409](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L409)

___

### onCheckFileExists

▸ **onCheckFileExists**(`fileId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |

#### Returns

`boolean`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:528](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L528)

___

### onInsertFile

▸ **onInsertFile**(`file`, `isExpectingImage?`): `Promise`\<[`IInsertedFileInformationType`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

Inserts a file in the media property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file to insert |
| `isExpectingImage?` | `boolean` | whether the errors and check given will be for image types |

#### Returns

`Promise`\<[`IInsertedFileInformationType`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:640](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L640)

___

### onInsertFileFromURL

▸ **onInsertFileFromURL**(`url`, `name`, `isExpectingImage?`): `Promise`\<[`IInsertedFileInformationType`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

Inserts an image but instead of using a file as a source it uses
an url, note that this will read and append the file from there

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `name` | `string` |
| `isExpectingImage?` | `boolean` |

#### Returns

`Promise`\<[`IInsertedFileInformationType`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:583](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L583)

___

### onRemoveFile

▸ **onRemoveFile**(`fileId`): `void`

Function that triggers once a file has been requested to be removed
it remains however in the cache itself

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | the file id |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:511](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L511)

___

### onRestoreHijacked

▸ **onRestoreHijacked**(): `void`

The restore but hijacked, also only if there's
a media property; basically will do the standard
restoration, but also restore its related media property

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:452](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L452)

___

### onRestoreLostFile

▸ **onRestoreLostFile**(`fileId`): `void`

Function that triggers when a file that had been removed, needs to be restored
such as done by an undo ctrl+z event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | the file to be restored |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:466](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L466)

___

### onRetrieveFile

▸ **onRetrieveFile**(`fileId`): [`IRQFile`](../interfaces/rq_querier.IRQFile.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |

#### Returns

[`IRQFile`](../interfaces/rq_querier.IRQFile.md)

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:532](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L532)

___

### onRetrieveImage

▸ **onRetrieveImage**(`fileId`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `file` | [`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md) |
| `srcset` | `string` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:557](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L557)

___

### readBlobAsDataUrl

▸ **readBlobAsDataUrl**(`blob`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:609](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L609)

___

### readUrlAsDataUrl

▸ **readUrlAsDataUrl**(`url`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:626](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L626)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:782](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L782)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyEntryTextState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryTextState` \| (`prevState`: `Readonly`\<`IPropertyEntryTextState`\>, `props`: `Readonly`\<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\>) => `IPropertyEntryTextState` \| `Pick`\<`IPropertyEntryTextState`, `K`\> \| `Pick`\<`IPropertyEntryTextState`, `K`\> |
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
| `nextProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)\<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `nextState` | `IPropertyEntryTextState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:752](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L752)
