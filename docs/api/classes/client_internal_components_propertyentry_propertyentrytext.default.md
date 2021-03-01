[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_propertyentry_propertyentrytext.md) / default

# Class: default

[client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_propertyentry_propertyentrytext.md).default

The property entry text handler class

## Hierarchy

* *Component*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>, IPropertyEntryTextState\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](client_internal_components_propertyentry_propertyentrytext.default.md#constructor)

### Properties

- [activeDataURIs](client_internal_components_propertyentry_propertyentrytext.default.md#activedatauris)
- [cachedMediaProperty](client_internal_components_propertyentry_propertyentrytext.default.md#cachedmediaproperty)
- [cachedMediaPropertyAcceptsFiles](client_internal_components_propertyentry_propertyentrytext.default.md#cachedmediapropertyacceptsfiles)
- [cachedMediaPropertyAcceptsImages](client_internal_components_propertyentry_propertyentrytext.default.md#cachedmediapropertyacceptsimages)
- [context](client_internal_components_propertyentry_propertyentrytext.default.md#context)
- [internalFileCache](client_internal_components_propertyentry_propertyentrytext.default.md#internalfilecache)
- [props](client_internal_components_propertyentry_propertyentrytext.default.md#props)
- [refs](client_internal_components_propertyentry_propertyentrytext.default.md#refs)
- [state](client_internal_components_propertyentry_propertyentrytext.default.md#state)
- [contextType](client_internal_components_propertyentry_propertyentrytext.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_internal_components_propertyentry_propertyentrytext.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_internal_components_propertyentry_propertyentrytext.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_internal_components_propertyentry_propertyentrytext.default.md#unsafe_componentwillupdate)
- [cacheCurrentFiles](client_internal_components_propertyentry_propertyentrytext.default.md#cachecurrentfiles)
- [cacheMediaPropertyInProps](client_internal_components_propertyentry_propertyentrytext.default.md#cachemediapropertyinprops)
- [componentDidCatch](client_internal_components_propertyentry_propertyentrytext.default.md#componentdidcatch)
- [componentDidMount](client_internal_components_propertyentry_propertyentrytext.default.md#componentdidmount)
- [componentDidUpdate](client_internal_components_propertyentry_propertyentrytext.default.md#componentdidupdate)
- [componentWillMount](client_internal_components_propertyentry_propertyentrytext.default.md#componentwillmount)
- [componentWillReceiveProps](client_internal_components_propertyentry_propertyentrytext.default.md#componentwillreceiveprops)
- [componentWillUnmount](client_internal_components_propertyentry_propertyentrytext.default.md#componentwillunmount)
- [componentWillUpdate](client_internal_components_propertyentry_propertyentrytext.default.md#componentwillupdate)
- [dismissLastLoadedFileError](client_internal_components_propertyentry_propertyentrytext.default.md#dismisslastloadedfileerror)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentrytext.default.md#enableuserseterrors)
- [forceUpdate](client_internal_components_propertyentry_propertyentrytext.default.md#forceupdate)
- [getSnapshotBeforeUpdate](client_internal_components_propertyentry_propertyentrytext.default.md#getsnapshotbeforeupdate)
- [onChangeHijacked](client_internal_components_propertyentry_propertyentrytext.default.md#onchangehijacked)
- [onCheckFileExists](client_internal_components_propertyentry_propertyentrytext.default.md#oncheckfileexists)
- [onInsertFile](client_internal_components_propertyentry_propertyentrytext.default.md#oninsertfile)
- [onInsertFileFromURL](client_internal_components_propertyentry_propertyentrytext.default.md#oninsertfilefromurl)
- [onRemoveFile](client_internal_components_propertyentry_propertyentrytext.default.md#onremovefile)
- [onRestoreHijacked](client_internal_components_propertyentry_propertyentrytext.default.md#onrestorehijacked)
- [onRestoreLostFile](client_internal_components_propertyentry_propertyentrytext.default.md#onrestorelostfile)
- [onRetrieveDataURI](client_internal_components_propertyentry_propertyentrytext.default.md#onretrievedatauri)
- [onRetrieveFile](client_internal_components_propertyentry_propertyentrytext.default.md#onretrievefile)
- [readBlobAsDataUrl](client_internal_components_propertyentry_propertyentrytext.default.md#readblobasdataurl)
- [readUrlAsDataUrl](client_internal_components_propertyentry_propertyentrytext.default.md#readurlasdataurl)
- [render](client_internal_components_propertyentry_propertyentrytext.default.md#render)
- [setState](client_internal_components_propertyentry_propertyentrytext.default.md#setstate)
- [shouldComponentUpdate](client_internal_components_propertyentry_propertyentrytext.default.md#shouldcomponentupdate)

## Constructors

### constructor

\+ **new default**(`props`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>): [*default*](client_internal_components_propertyentry_propertyentrytext.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\> |

**Returns:** [*default*](client_internal_components_propertyentry_propertyentrytext.default.md)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:285](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L285)

## Properties

### activeDataURIs

• `Private` **activeDataURIs**: *object*

Contains a list of active data uris for the blob elements

#### Type declaration:

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:283](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L283)

___

### cachedMediaProperty

• `Private` **cachedMediaProperty**: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

We hold and cache our media property

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:257](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L257)

___

### cachedMediaPropertyAcceptsFiles

• `Private` **cachedMediaPropertyAcceptsFiles**: *string*

We hold and cache our accepts for the media property

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:261](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L261)

___

### cachedMediaPropertyAcceptsImages

• `Private` **cachedMediaPropertyAcceptsImages**: *string*

We hold and cache our accpets for the images in the media property

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:265](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L265)

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

### internalFileCache

• `Private` **internalFileCache**: *object*

As long as the property entry text is mounted it will keep track of all the files
that have ever been in it, in order to be able to restore
them during undo processes, note however, that this means that having
two equal property entry for text at the same time will revoke
all the blob urls during dismount and they will not share the same
history, this might cause issues due to this cache
so avoid having two entry at the same time

#### Type declaration:

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:276](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L276)

___

### props

• `Readonly` **props**: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\> & *Readonly*<{ `children?`: ReactNode  }\>

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

• **state**: *Readonly*<IPropertyEntryTextState\>

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryTextState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryTextState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### cacheCurrentFiles

▸ **cacheCurrentFiles**(): *void*

Ran during mount of updates, caches the files that are in the media property

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:363](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L363)

___

### cacheMediaPropertyInProps

▸ **cacheMediaPropertyInProps**(`props`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>): *void*

Called during initial setup

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\> | the props we are using    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:337](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L337)

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

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:404](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L404)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:413](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L413)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:323](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L323)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\>, `nextState`: *Readonly*<IPropertyEntryTextState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\> |
`nextState` | *Readonly*<IPropertyEntryTextState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### dismissLastLoadedFileError

▸ **dismissLastLoadedFileError**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:317](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L317)

___

### enableUserSetErrors

▸ **enableUserSetErrors**(): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:311](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L311)

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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\>, `prevState`: *Readonly*<IPropertyEntryTextState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\> |
`prevState` | *Readonly*<IPropertyEntryTextState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### onChangeHijacked

▸ **onChangeHijacked**(`value`: *string*, `internalValue`: *any*): *void*

the change event but hijacked so we can see
if we need to remove things from the media property

This hijack only applies itself if there's a media property
so it makes sense

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *string* | the value   |
`internalValue` | *any* | the internal value    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:436](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L436)

___

### onCheckFileExists

▸ **onCheckFileExists**(`fileId`: *string*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`fileId` | *string* |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:544](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L544)

___

### onInsertFile

▸ **onInsertFile**(`file`: File, `isExpectingImage?`: *boolean*, `overrideDataURI?`: *string*): *Promise*<[*IInsertedFileInformationType*](../interfaces/client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

Inserts a file in the media property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`file` | File | the file to insert   |
`isExpectingImage?` | *boolean* | whether the errors and check given will be for image types    |
`overrideDataURI?` | *string* | - |

**Returns:** *Promise*<[*IInsertedFileInformationType*](../interfaces/client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:628](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L628)

___

### onInsertFileFromURL

▸ **onInsertFileFromURL**(`url`: *string*, `name`: *string*, `isExpectingImage?`: *boolean*): *Promise*<[*IInsertedFileInformationType*](../interfaces/client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

Inserts an image but instead of using a file as a source it uses
an url, note that this will read and append the file from there

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |
`name` | *string* |
`isExpectingImage?` | *boolean* |

**Returns:** *Promise*<[*IInsertedFileInformationType*](../interfaces/client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:566](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L566)

___

### onRemoveFile

▸ **onRemoveFile**(`fileId`: *string*): *void*

Function that triggers once a file has been requested to be removed
it remains however in the cache itself

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fileId` | *string* | the file id    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:527](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L527)

___

### onRestoreHijacked

▸ **onRestoreHijacked**(): *void*

The restore but hijacked, also only if there's
a media property; basically will do the standard
restoration, but also restore its related media property

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:479](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L479)

___

### onRestoreLostFile

▸ **onRestoreLostFile**(`fileId`: *string*): *void*

Function that triggers when a file that had been removed, needs to be restored
such as done by an undo ctrl+z event

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fileId` | *string* | the file to be restored    |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:493](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L493)

___

### onRetrieveDataURI

▸ **onRetrieveDataURI**(`fileId`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`fileId` | *string* |

**Returns:** *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:555](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L555)

___

### onRetrieveFile

▸ **onRetrieveFile**(`fileId`: *string*): [*IPropertyDefinitionSupportedSingleFilesType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md)

#### Parameters:

Name | Type |
:------ | :------ |
`fileId` | *string* |

**Returns:** [*IPropertyDefinitionSupportedSingleFilesType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:548](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L548)

___

### readBlobAsDataUrl

▸ **readBlobAsDataUrl**(`blob`: Blob): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`blob` | Blob |

**Returns:** *Promise*<string\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:597](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L597)

___

### readUrlAsDataUrl

▸ **readUrlAsDataUrl**(`url`: *string*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |

**Returns:** *Promise*<string\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:614](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L614)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:774](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L774)

___

### setState

▸ **setState**<K\>(`state`: IPropertyEntryTextState \| (`prevState`: *Readonly*<IPropertyEntryTextState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\>) => IPropertyEntryTextState \| *Pick*<IPropertyEntryTextState, K\> \| *Pick*<IPropertyEntryTextState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *lastLoadedFileError* \| *showUserSetErrors* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IPropertyEntryTextState \| (`prevState`: *Readonly*<IPropertyEntryTextState\>, `props`: *Readonly*<[*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\>) => IPropertyEntryTextState \| *Pick*<IPropertyEntryTextState, K\> \| *Pick*<IPropertyEntryTextState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>, `nextState`: IPropertyEntryTextState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | [*IPropertyEntryHandlerProps*](../interfaces/client_internal_components_propertyentry.ipropertyentryhandlerprops.md)<string, [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\> |
`nextState` | IPropertyEntryTextState |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:747](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L747)
