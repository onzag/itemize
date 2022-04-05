[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md).default

The property entry text handler class

## Hierarchy

- `Component`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>, `IPropertyEntryTextState`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](client_internal_components_PropertyEntry_PropertyEntryText.default.md#constructor)

### Properties

- [activeDataURIs](client_internal_components_PropertyEntry_PropertyEntryText.default.md#activedatauris)
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
- [onRetrieveDataURI](client_internal_components_PropertyEntry_PropertyEntryText.default.md#onretrievedatauri)
- [onRetrieveFile](client_internal_components_PropertyEntry_PropertyEntryText.default.md#onretrievefile)
- [readBlobAsDataUrl](client_internal_components_PropertyEntry_PropertyEntryText.default.md#readblobasdataurl)
- [readUrlAsDataUrl](client_internal_components_PropertyEntry_PropertyEntryText.default.md#readurlasdataurl)
- [render](client_internal_components_PropertyEntry_PropertyEntryText.default.md#render)
- [setState](client_internal_components_PropertyEntry_PropertyEntryText.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_PropertyEntry_PropertyEntryText.default.md#shouldcomponentupdate)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |

#### Overrides

React.Component&lt;IPropertyEntryHandlerProps&lt;string, IPropertyEntryTextRendererProps\&gt;, IPropertyEntryTextState\&gt;.constructor

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:292](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L292)

## Properties

### activeDataURIs

• `Private` **activeDataURIs**: `Object`

Contains a list of active data uris for the blob elements

#### Index signature

▪ [id: `string`]: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:288](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L288)

___

### cachedMediaProperty

• `Private` **cachedMediaProperty**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

We hold and cache our media property

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:262](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L262)

___

### cachedMediaPropertyAcceptsFiles

• `Private` **cachedMediaPropertyAcceptsFiles**: `string`

We hold and cache our accepts for the media property

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:266](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L266)

___

### cachedMediaPropertyAcceptsImages

• `Private` **cachedMediaPropertyAcceptsImages**: `string`

We hold and cache our accpets for the images in the media property

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:270](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L270)

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

**`see`** https://reactjs.org/docs/context.html

#### Inherited from

React.Component.context

#### Defined in

node_modules/@types/react/index.d.ts:479

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

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:281](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L281)

___

### props

• `Readonly` **props**: `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

React.Component.props

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:510

___

### state

• **state**: `Readonly`<`IPropertyEntryTextState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

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

#### Inherited from

React.Component.contextType

#### Defined in

node_modules/@types/react/index.d.ts:461

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:717

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:749

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyEntryTextState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

___

### cacheCurrentFiles

▸ **cacheCurrentFiles**(): `void`

Ran during mount of updates, caches the files that are in the media property

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:369](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L369)

___

### cacheMediaPropertyInProps

▸ **cacheMediaPropertyInProps**(`props`): `void`

Called during initial setup

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> | the props we are using |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:343](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L343)

___

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

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

node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:410](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L410)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:419](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L419)

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:703

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

#### Returns

`void`

#### Overrides

React.Component.componentWillUnmount

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:328](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L328)

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
| `nextState` | `Readonly`<`IPropertyEntryTextState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### dismissLastLoadedFileError

▸ **dismissLastLoadedFileError**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:322](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L322)

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:316](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L316)

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

node_modules/@types/react/index.d.ts:496

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\> |
| `prevState` | `Readonly`<`IPropertyEntryTextState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

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
| `value` | `string` | the value |
| `internalValue` | `any` | the internal value |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:440](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L440)

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

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:553](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L553)

___

### onInsertFile

▸ **onInsertFile**(`file`, `isExpectingImage?`, `overrideDataURI?`): `Promise`<[`IInsertedFileInformationType`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

Inserts a file in the media property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file to insert |
| `isExpectingImage?` | `boolean` | whether the errors and check given will be for image types |
| `overrideDataURI?` | `string` | - |

#### Returns

`Promise`<[`IInsertedFileInformationType`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:637](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L637)

___

### onInsertFileFromURL

▸ **onInsertFileFromURL**(`url`, `name`, `isExpectingImage?`): `Promise`<[`IInsertedFileInformationType`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

Inserts an image but instead of using a file as a source it uses
an url, note that this will read and append the file from there

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `name` | `string` |
| `isExpectingImage?` | `boolean` |

#### Returns

`Promise`<[`IInsertedFileInformationType`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:575](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L575)

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

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:536](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L536)

___

### onRestoreHijacked

▸ **onRestoreHijacked**(): `void`

The restore but hijacked, also only if there's
a media property; basically will do the standard
restoration, but also restore its related media property

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:483](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L483)

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

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:497](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L497)

___

### onRetrieveDataURI

▸ **onRetrieveDataURI**(`fileId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |

#### Returns

`string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:564](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L564)

___

### onRetrieveFile

▸ **onRetrieveFile**(`fileId`): [`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |

#### Returns

[`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:557](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L557)

___

### readBlobAsDataUrl

▸ **readBlobAsDataUrl**(`blob`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |

#### Returns

`Promise`<`string`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:606](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L606)

___

### readUrlAsDataUrl

▸ **readUrlAsDataUrl**(`url`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:623](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L623)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:784](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L784)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IPropertyEntryTextState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IPropertyEntryTextState` \| (`prevState`: `Readonly`<`IPropertyEntryTextState`\>, `props`: `Readonly`<[`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>\>) => `IPropertyEntryTextState` \| `Pick`<`IPropertyEntryTextState`, `K`\> \| `Pick`<`IPropertyEntryTextState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | [`IPropertyEntryHandlerProps`](../interfaces/client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)<`string`, [`IPropertyEntryTextRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\> |
| `nextState` | `IPropertyEntryTextState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:756](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L756)
