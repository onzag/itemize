[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / ActualItemProvider

# Class: ActualItemProvider

[client/providers/item](../modules/client_providers_item.md).ActualItemProvider

Here it is, the mighty

## Hierarchy

- `Component`\<`IActualItemProviderProps`, `IActualItemProviderState`\>

  ↳ **`ActualItemProvider`**

## Table of contents

### Constructors

- [constructor](client_providers_item.ActualItemProvider.md#constructor)

### Properties

- [activeSearchPromise](client_providers_item.ActualItemProvider.md#activesearchpromise)
- [activeSearchPromiseAwaiter](client_providers_item.ActualItemProvider.md#activesearchpromiseawaiter)
- [activeSubmitPromise](client_providers_item.ActualItemProvider.md#activesubmitpromise)
- [activeSubmitPromiseAwaiter](client_providers_item.ActualItemProvider.md#activesubmitpromiseawaiter)
- [automaticSearchTimeout](client_providers_item.ActualItemProvider.md#automaticsearchtimeout)
- [blockIdClean](client_providers_item.ActualItemProvider.md#blockidclean)
- [changedSearchListenerLastCollectedSearchId](client_providers_item.ActualItemProvider.md#changedsearchlistenerlastcollectedsearchid)
- [consumableQsState](client_providers_item.ActualItemProvider.md#consumableqsstate)
- [consumeQsStateTimeout](client_providers_item.ActualItemProvider.md#consumeqsstatetimeout)
- [context](client_providers_item.ActualItemProvider.md#context)
- [initialAutomaticNextSearch](client_providers_item.ActualItemProvider.md#initialautomaticnextsearch)
- [internalSearchDestructionMarkers](client_providers_item.ActualItemProvider.md#internalsearchdestructionmarkers)
- [internalUUID](client_providers_item.ActualItemProvider.md#internaluuid)
- [isCMounted](client_providers_item.ActualItemProvider.md#iscmounted)
- [isUnmounted](client_providers_item.ActualItemProvider.md#isunmounted)
- [lastLoadValuePromise](client_providers_item.ActualItemProvider.md#lastloadvaluepromise)
- [lastLoadValuePromiseIsResolved](client_providers_item.ActualItemProvider.md#lastloadvaluepromiseisresolved)
- [lastLoadValuePromiseResolve](client_providers_item.ActualItemProvider.md#lastloadvaluepromiseresolve)
- [lastLoadingForId](client_providers_item.ActualItemProvider.md#lastloadingforid)
- [lastLoadingForVersion](client_providers_item.ActualItemProvider.md#lastloadingforversion)
- [lastUpdateId](client_providers_item.ActualItemProvider.md#lastupdateid)
- [mountCbFns](client_providers_item.ActualItemProvider.md#mountcbfns)
- [preventSearchFeedbackOnPossibleStaleData](client_providers_item.ActualItemProvider.md#preventsearchfeedbackonpossiblestaledata)
- [props](client_providers_item.ActualItemProvider.md#props)
- [refs](client_providers_item.ActualItemProvider.md#refs)
- [reloadListenerTimeout](client_providers_item.ActualItemProvider.md#reloadlistenertimeout)
- [reloadNextSearch](client_providers_item.ActualItemProvider.md#reloadnextsearch)
- [repairCorruptionTimeout](client_providers_item.ActualItemProvider.md#repaircorruptiontimeout)
- [state](client_providers_item.ActualItemProvider.md#state)
- [storeStateTimeout](client_providers_item.ActualItemProvider.md#storestatetimeout)
- [submitBlockPromises](client_providers_item.ActualItemProvider.md#submitblockpromises)
- [updateTimeout](client_providers_item.ActualItemProvider.md#updatetimeout)
- [contextType](client_providers_item.ActualItemProvider.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_providers_item.ActualItemProvider.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_providers_item.ActualItemProvider.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_providers_item.ActualItemProvider.md#unsafe_componentwillupdate)
- [blockCleanup](client_providers_item.ActualItemProvider.md#blockcleanup)
- [changeListener](client_providers_item.ActualItemProvider.md#changelistener)
- [changeSearchListener](client_providers_item.ActualItemProvider.md#changesearchlistener)
- [checkItemStateValidity](client_providers_item.ActualItemProvider.md#checkitemstatevalidity)
- [clean](client_providers_item.ActualItemProvider.md#clean)
- [cleanWithProps](client_providers_item.ActualItemProvider.md#cleanwithprops)
- [componentDidCatch](client_providers_item.ActualItemProvider.md#componentdidcatch)
- [componentDidMount](client_providers_item.ActualItemProvider.md#componentdidmount)
- [componentDidUpdate](client_providers_item.ActualItemProvider.md#componentdidupdate)
- [componentWillMount](client_providers_item.ActualItemProvider.md#componentwillmount)
- [componentWillReceiveProps](client_providers_item.ActualItemProvider.md#componentwillreceiveprops)
- [componentWillUnmount](client_providers_item.ActualItemProvider.md#componentwillunmount)
- [componentWillUpdate](client_providers_item.ActualItemProvider.md#componentwillupdate)
- [delete](client_providers_item.ActualItemProvider.md#delete)
- [dismissDeleteError](client_providers_item.ActualItemProvider.md#dismissdeleteerror)
- [dismissDeleted](client_providers_item.ActualItemProvider.md#dismissdeleted)
- [dismissLoadError](client_providers_item.ActualItemProvider.md#dismissloaderror)
- [dismissSearchError](client_providers_item.ActualItemProvider.md#dismisssearcherror)
- [dismissSearchResults](client_providers_item.ActualItemProvider.md#dismisssearchresults)
- [dismissSubmitError](client_providers_item.ActualItemProvider.md#dismisssubmiterror)
- [dismissSubmitted](client_providers_item.ActualItemProvider.md#dismisssubmitted)
- [downloadState](client_providers_item.ActualItemProvider.md#downloadstate)
- [downloadStateAt](client_providers_item.ActualItemProvider.md#downloadstateat)
- [forceUpdate](client_providers_item.ActualItemProvider.md#forceupdate)
- [getItemState](client_providers_item.ActualItemProvider.md#getitemstate)
- [getSnapshotBeforeUpdate](client_providers_item.ActualItemProvider.md#getsnapshotbeforeupdate)
- [giveEmulatedInvalidError](client_providers_item.ActualItemProvider.md#giveemulatedinvaliderror)
- [injectSubmitBlockPromise](client_providers_item.ActualItemProvider.md#injectsubmitblockpromise)
- [installInternalSearchDestructionMarker](client_providers_item.ActualItemProvider.md#installinternalsearchdestructionmarker)
- [installPrefills](client_providers_item.ActualItemProvider.md#installprefills)
- [installSetters](client_providers_item.ActualItemProvider.md#installsetters)
- [loadListener](client_providers_item.ActualItemProvider.md#loadlistener)
- [loadStateFromFile](client_providers_item.ActualItemProvider.md#loadstatefromfile)
- [loadStateFromFileAt](client_providers_item.ActualItemProvider.md#loadstatefromfileat)
- [loadStoredState](client_providers_item.ActualItemProvider.md#loadstoredstate)
- [loadValue](client_providers_item.ActualItemProvider.md#loadvalue)
- [loadValueCompleted](client_providers_item.ActualItemProvider.md#loadvaluecompleted)
- [markForDestruction](client_providers_item.ActualItemProvider.md#markfordestruction)
- [markSearchForDestruction](client_providers_item.ActualItemProvider.md#marksearchfordestruction)
- [mountOrUpdateIdefForTesting](client_providers_item.ActualItemProvider.md#mountorupdateideffortesting)
- [onConnectStatusChange](client_providers_item.ActualItemProvider.md#onconnectstatuschange)
- [onIncludeSetExclusionState](client_providers_item.ActualItemProvider.md#onincludesetexclusionstate)
- [onPropertyChange](client_providers_item.ActualItemProvider.md#onpropertychange)
- [onPropertyChangeOrRestoreFinal](client_providers_item.ActualItemProvider.md#onpropertychangeorrestorefinal)
- [onPropertyChangeOrRestoreQsSync](client_providers_item.ActualItemProvider.md#onpropertychangeorrestoreqssync)
- [onPropertyClearEnforce](client_providers_item.ActualItemProvider.md#onpropertyclearenforce)
- [onPropertyEnforce](client_providers_item.ActualItemProvider.md#onpropertyenforce)
- [onPropertyEnforceOrClearFinal](client_providers_item.ActualItemProvider.md#onpropertyenforceorclearfinal)
- [onPropertyRestore](client_providers_item.ActualItemProvider.md#onpropertyrestore)
- [onSearchReload](client_providers_item.ActualItemProvider.md#onsearchreload)
- [poke](client_providers_item.ActualItemProvider.md#poke)
- [releaseCleanupBlock](client_providers_item.ActualItemProvider.md#releasecleanupblock)
- [reloadListener](client_providers_item.ActualItemProvider.md#reloadlistener)
- [removePossibleSearchListeners](client_providers_item.ActualItemProvider.md#removepossiblesearchlisteners)
- [removeSetters](client_providers_item.ActualItemProvider.md#removesetters)
- [render](client_providers_item.ActualItemProvider.md#render)
- [runDismountOn](client_providers_item.ActualItemProvider.md#rundismounton)
- [search](client_providers_item.ActualItemProvider.md#search)
- [searchFeedback](client_providers_item.ActualItemProvider.md#searchfeedback)
- [searchListenersSetup](client_providers_item.ActualItemProvider.md#searchlistenerssetup)
- [setState](client_providers_item.ActualItemProvider.md#setstate)
- [setStateToCurrentValueWithExternalChecking](client_providers_item.ActualItemProvider.md#setstatetocurrentvaluewithexternalchecking)
- [setupListeners](client_providers_item.ActualItemProvider.md#setuplisteners)
- [shouldComponentUpdate](client_providers_item.ActualItemProvider.md#shouldcomponentupdate)
- [storeStateDelayed](client_providers_item.ActualItemProvider.md#storestatedelayed)
- [submit](client_providers_item.ActualItemProvider.md#submit)
- [unSetupListeners](client_providers_item.ActualItemProvider.md#unsetuplisteners)
- [unpoke](client_providers_item.ActualItemProvider.md#unpoke)
- [getDerivedServerSideStateFromProps](client_providers_item.ActualItemProvider.md#getderivedserversidestatefromprops)
- [getDerivedStateFromProps](client_providers_item.ActualItemProvider.md#getderivedstatefromprops)
- [getItemStateStatic](client_providers_item.ActualItemProvider.md#getitemstatestatic)
- [setupInitialState](client_providers_item.ActualItemProvider.md#setupinitialstate)

## Constructors

### constructor

• **new ActualItemProvider**(`props`): [`ActualItemProvider`](client_providers_item.ActualItemProvider.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

[`ActualItemProvider`](client_providers_item.ActualItemProvider.md)

#### Overrides

React.Component\&lt;IActualItemProviderProps, IActualItemProviderState\&gt;.constructor

#### Defined in

[client/providers/item.tsx:2292](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2292)

## Properties

### activeSearchPromise

• `Private` **activeSearchPromise**: `Promise`\<\{ `options`: [`IActionSearchOptions`](../interfaces/client_providers_item.IActionSearchOptions.md) ; `response`: [`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)  }\> = `null`

#### Defined in

[client/providers/item.tsx:2285](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2285)

___

### activeSearchPromiseAwaiter

• `Private` **activeSearchPromiseAwaiter**: `string` = `null`

#### Defined in

[client/providers/item.tsx:2286](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2286)

___

### activeSubmitPromise

• `Private` **activeSubmitPromise**: `Promise`\<\{ `options`: [`IActionSubmitOptions`](../interfaces/client_providers_item.IActionSubmitOptions.md) ; `response`: [`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md)  }\> = `null`

#### Defined in

[client/providers/item.tsx:2281](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2281)

___

### activeSubmitPromiseAwaiter

• `Private` **activeSubmitPromiseAwaiter**: `string` = `null`

#### Defined in

[client/providers/item.tsx:2282](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2282)

___

### automaticSearchTimeout

• `Private` **automaticSearchTimeout**: `Timer` = `null`

#### Defined in

[client/providers/item.tsx:1956](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1956)

___

### blockIdClean

• `Private` **blockIdClean**: `string`

#### Defined in

[client/providers/item.tsx:2275](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2275)

___

### changedSearchListenerLastCollectedSearchId

• `Private` **changedSearchListenerLastCollectedSearchId**: `Object` = `null`

Because the listener might be triggered during a mount cb and this
will not change the state, automatic search might not trigger on mount
as it sees the previous state, so with this, we might now if the
search id was changed and for what, and trigger automatic search

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Defined in

[client/providers/item.tsx:1909](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1909)

___

### consumableQsState

• `Private` **consumableQsState**: `any` = `null`

The consumabel qs state that is being set

#### Defined in

[client/providers/item.tsx:1970](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1970)

___

### consumeQsStateTimeout

• `Private` **consumeQsStateTimeout**: `Timeout` = `null`

#### Defined in

[client/providers/item.tsx:1971](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1971)

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

### initialAutomaticNextSearch

• `Private` **initialAutomaticNextSearch**: `boolean` = `false`

#### Defined in

[client/providers/item.tsx:1913](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1913)

___

### internalSearchDestructionMarkers

• `Private` **internalSearchDestructionMarkers**: [`string`, `string`, `string`, [`string`, `string`, `string`], [`string`, `string`]][] = `[]`

#### Defined in

[client/providers/item.tsx:1889](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1889)

___

### internalUUID

• `Private` **internalUUID**: `string`

#### Defined in

[client/providers/item.tsx:1887](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1887)

___

### isCMounted

• `Private` **isCMounted**: `boolean` = `false`

#### Defined in

[client/providers/item.tsx:1894](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1894)

___

### isUnmounted

• `Private` **isUnmounted**: `boolean` = `false`

#### Defined in

[client/providers/item.tsx:1893](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1893)

___

### lastLoadValuePromise

• `Private` **lastLoadValuePromise**: `Promise`\<`void`\> = `null`

Some functons such as submit, on property change
events where we request new values for the
properties need to wait for loading to be done
with these promises we can await for the last loading
event

#### Defined in

[client/providers/item.tsx:1952](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1952)

___

### lastLoadValuePromiseIsResolved

• `Private` **lastLoadValuePromiseIsResolved**: `boolean` = `true`

#### Defined in

[client/providers/item.tsx:1953](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1953)

___

### lastLoadValuePromiseResolve

• `Private` **lastLoadValuePromiseResolve**: () => `void` = `null`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1954](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1954)

___

### lastLoadingForId

• `Private` **lastLoadingForId**: `string` = `null`

During loading both the id and version might be suddenly hot
updated before the server had time to reply this ensures
that we will only apply the value for the last loading
value and not overwrite if we have changed such value hot

#### Defined in

[client/providers/item.tsx:1942](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1942)

___

### lastLoadingForVersion

• `Private` **lastLoadingForVersion**: `string` = `null`

#### Defined in

[client/providers/item.tsx:1943](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1943)

___

### lastUpdateId

• `Private` **lastUpdateId**: `number`

#### Defined in

[client/providers/item.tsx:2273](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2273)

___

### mountCbFns

• `Private` **mountCbFns**: () => `void`[] = `[]`

Because sometimes functions for listeners run while the thing
is mounting, but we haven't mounted yet, we use these callbacks
to store these callbacks for the listeners; this happens
because the willUnmount of another item definition might trigger
a change event while this instance is mounting, during cleanup

#### Defined in

[client/providers/item.tsx:1902](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1902)

___

### preventSearchFeedbackOnPossibleStaleData

• `Private` **preventSearchFeedbackOnPossibleStaleData**: `boolean` = `false`

this is a hack variable, when the server
sends a reload event for a search and that causes
the cache worker to add such a value to the list
that it considered to be added, and then this
causes this instance to call for an update
and the search needs to be reloaded
however the server has already specified how the data
is meant to update, but launching this as it is, will
cause the client to check because it considers that the
data might be stale because it got the data from the
cache worker, but we had updated this data a couple of microseconds
earlier so we make this hack variable to prevent asking for
feedback as we already got feedback

Check the on search reload function where it is set and then
it's sent to the search querier so that feedback
is not requested

#### Defined in

[client/providers/item.tsx:1934](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1934)

___

### props

• `Readonly` **props**: `Readonly`\<`IActualItemProviderProps`\> & `Readonly`\<\{ `children?`: `ReactNode`  }\>

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

### reloadListenerTimeout

• `Private` **reloadListenerTimeout**: `Timeout` = `null`

#### Defined in

[client/providers/item.tsx:2290](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2290)

___

### reloadNextSearch

• `Private` **reloadNextSearch**: `boolean` = `false`

#### Defined in

[client/providers/item.tsx:1914](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1914)

___

### repairCorruptionTimeout

• `Private` **repairCorruptionTimeout**: `Timeout` = `null`

#### Defined in

[client/providers/item.tsx:1960](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1960)

___

### state

• **state**: `Readonly`\<`IActualItemProviderState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:499

___

### storeStateTimeout

• `Private` **storeStateTimeout**: `Timeout` = `null`

#### Defined in

[client/providers/item.tsx:1965](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1965)

___

### submitBlockPromises

• `Private` **submitBlockPromises**: `Promise`\<`any`\>[] = `[]`

#### Defined in

[client/providers/item.tsx:2278](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2278)

___

### updateTimeout

• `Private` **updateTimeout**: `Timer`

#### Defined in

[client/providers/item.tsx:2268](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2268)

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
| `nextProps` | `Readonly`\<`IActualItemProviderProps`\> |
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
| `nextProps` | `Readonly`\<`IActualItemProviderProps`\> |
| `nextState` | `Readonly`\<`IActualItemProviderState`\> |
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

### blockCleanup

▸ **blockCleanup**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2357](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2357)

___

### changeListener

▸ **changeListener**(`repairCorruption?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `repairCorruption?` | `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:3279](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3279)

___

### changeSearchListener

▸ **changeSearchListener**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:3225](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3225)

___

### checkItemStateValidity

▸ **checkItemStateValidity**(`options`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.includeOverrides?` | [`IIncludeOverride`](../interfaces/client_internal_rq_client_util.IIncludeOverride.md)[] |
| `options.includes?` | `Object` |
| `options.onlyIncludeIfDiffersFromAppliedValue?` | `boolean` |
| `options.policies?` | [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[] |
| `options.properties` | `string`[] |
| `options.propertyOverrides?` | [`IPropertyOverride`](../interfaces/client_internal_rq_client_util.IPropertyOverride.md)[] |

#### Returns

`boolean`

#### Defined in

[client/providers/item.tsx:4204](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4204)

___

### clean

▸ **clean**(`options`, `state`, `avoidTriggeringUpdate?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](../interfaces/client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

#### Returns

`boolean`

#### Defined in

[client/providers/item.tsx:4510](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4510)

___

### cleanWithProps

▸ **cleanWithProps**(`props`, `options`, `state`, `avoidTriggeringUpdate?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |
| `options` | [`IActionCleanOptions`](../interfaces/client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

#### Returns

`boolean`

#### Defined in

[client/providers/item.tsx:4522](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4522)

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

▸ **componentDidMount**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/providers/item.tsx:2585](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2585)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `IActualItemProviderProps` |
| `prevState` | `IActualItemProviderState` |

#### Returns

`Promise`\<`void`\>

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/providers/item.tsx:2849](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2849)

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
| `nextProps` | `Readonly`\<`IActualItemProviderProps`\> |
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

[client/providers/item.tsx:4171](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4171)

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
| `nextProps` | `Readonly`\<`IActualItemProviderProps`\> |
| `nextState` | `Readonly`\<`IActualItemProviderState`\> |
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

### delete

▸ **delete**(`options?`): `Promise`\<[`IBasicActionResponse`](../interfaces/client_providers_item.IBasicActionResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionDeleteOptions`](../interfaces/client_providers_item.IActionDeleteOptions.md) |

#### Returns

`Promise`\<[`IBasicActionResponse`](../interfaces/client_providers_item.IBasicActionResponse.md)\>

#### Defined in

[client/providers/item.tsx:4387](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4387)

___

### dismissDeleteError

▸ **dismissDeleteError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6034](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6034)

___

### dismissDeleted

▸ **dismissDeleted**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6058](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6058)

___

### dismissLoadError

▸ **dismissLoadError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6026](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6026)

___

### dismissSearchError

▸ **dismissSearchError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6066](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6066)

___

### dismissSearchResults

▸ **dismissSearchResults**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6146](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6146)

___

### dismissSubmitError

▸ **dismissSubmitError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6042](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6042)

___

### dismissSubmitted

▸ **dismissSubmitted**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6050](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6050)

___

### downloadState

▸ **downloadState**(`specificProperties?`, `specificIncludes?`): `Promise`\<`Blob`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`\<`Blob`\>

#### Defined in

[client/providers/item.tsx:3468](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3468)

___

### downloadStateAt

▸ **downloadStateAt**(`id`, `version`, `specificProperties?`, `specificIncludes?`): `Promise`\<`Blob`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`\<`Blob`\>

#### Defined in

[client/providers/item.tsx:3471](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3471)

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

### getItemState

▸ **getItemState**(`props?`): [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Readonly`\<`IActualItemProviderProps`\> & `Readonly`\<\{ `children?`: `ReactNode`  }\> |

#### Returns

[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Defined in

[client/providers/item.tsx:3276](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3276)

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
| `prevProps` | `Readonly`\<`IActualItemProviderProps`\> |
| `prevState` | `Readonly`\<`IActualItemProviderState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### giveEmulatedInvalidError

▸ **giveEmulatedInvalidError**(`stateApplied`, `withIdVersion`, `withSearchResults`, `errMessageOverride?`, `errorOverride?`): [`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md) \| [`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md) \| [`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateApplied` | `string` |
| `withIdVersion` | `boolean` \| [`string`, `string`] |
| `withSearchResults` | `boolean` |
| `errMessageOverride?` | `string` |
| `errorOverride?` | `string` |

#### Returns

[`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md) \| [`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md) \| [`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)

#### Defined in

[client/providers/item.tsx:4330](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4330)

___

### injectSubmitBlockPromise

▸ **injectSubmitBlockPromise**(`p`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Promise`\<`any`\> |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2373](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2373)

___

### installInternalSearchDestructionMarker

▸ **installInternalSearchDestructionMarker**(`marker`, `unmark`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | [`string`, `string`, `string`, [`string`, `string`, `string`], [`string`, `string`]] |
| `unmark` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6183](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6183)

___

### installPrefills

▸ **installPrefills**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2505](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2505)

___

### installSetters

▸ **installSetters**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2489](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2489)

___

### loadListener

▸ **loadListener**(): `Promise`\<`void`\>

This listener triggers on load and the search
loader triggers it

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:3370](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3370)

___

### loadStateFromFile

▸ **loadStateFromFile**(`state`, `specificProperties?`, `specificIncludes?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `File` \| `Blob` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:3445](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3445)

___

### loadStateFromFileAt

▸ **loadStateFromFileAt**(`state`, `id`, `version?`, `specificProperties?`, `specificIncludes?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `File` \| `Blob` |
| `id` | `string` |
| `version?` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:3448](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3448)

___

### loadStoredState

▸ **loadStoredState**(`location`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `IStoredStateLocation` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:3503](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3503)

___

### loadValue

▸ **loadValue**(`denyCaches?`): `Promise`\<[`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `denyCaches?` | `boolean` |

#### Returns

`Promise`\<[`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md)\>

#### Defined in

[client/providers/item.tsx:3540](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3540)

___

### loadValueCompleted

▸ **loadValueCompleted**(`value`): [`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ILoadCompletedPayload`](../interfaces/client_providers_item.ILoadCompletedPayload.md) |

#### Returns

[`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md)

#### Defined in

[client/providers/item.tsx:3822](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3822)

___

### markForDestruction

▸ **markForDestruction**(`unmount`, `unmark`, `props?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `unmount` | `boolean` |
| `unmark` | `boolean` |
| `props` | `IActualItemProviderProps` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:2376](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2376)

___

### markSearchForDestruction

▸ **markSearchForDestruction**(`type`, `qualifiedName`, `owner`, `parent`, `property`, `unmount`, `unmark`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` |
| `qualifiedName` | `string` |
| `owner` | `string` |
| `parent` | [`string`, `string`, `string`] |
| `property` | [`string`, `string`] |
| `unmount` | `boolean` |
| `unmark` | `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:2428](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2428)

___

### mountOrUpdateIdefForTesting

▸ **mountOrUpdateIdefForTesting**(`wasContentLoadedFromMemory?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `wasContentLoadedFromMemory?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2692](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2692)

___

### onConnectStatusChange

▸ **onConnectStatusChange**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2564](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2564)

___

### onIncludeSetExclusionState

▸ **onIncludeSetExclusionState**(`include`, `state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `include` | [`default`](base_Root_Module_ItemDefinition_Include.default.md) |
| `state` | [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:4186](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4186)

___

### onPropertyChange

▸ **onPropertyChange**(`property`, `value`, `internalValue`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](../interfaces/client_components_property_base.IPropertyCoreProps.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `internalValue` | `any` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:4045](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4045)

___

### onPropertyChangeOrRestoreFinal

▸ **onPropertyChangeOrRestoreFinal**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:3944](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3944)

___

### onPropertyChangeOrRestoreQsSync

▸ **onPropertyChangeOrRestoreQsSync**(`property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:3991](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3991)

___

### onPropertyClearEnforce

▸ **onPropertyClearEnforce**(`property`, `givenForId`, `givenForVersion`, `internal?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](../interfaces/client_components_property_base.IPropertyCoreProps.md) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |
| `internal?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:4108](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4108)

___

### onPropertyEnforce

▸ **onPropertyEnforce**(`property`, `value`, `givenForId`, `givenForVersion`, `internal?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](../interfaces/client_components_property_base.IPropertyCoreProps.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |
| `internal?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:4090](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4090)

___

### onPropertyEnforceOrClearFinal

▸ **onPropertyEnforceOrClearFinal**(`givenForId`, `givenForVersion`, `internal?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `givenForId` | `string` |
| `givenForVersion` | `string` |
| `internal?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:4070](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4070)

___

### onPropertyRestore

▸ **onPropertyRestore**(`property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](../interfaces/client_components_property_base.IPropertyCoreProps.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:4027](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4027)

___

### onSearchReload

▸ **onSearchReload**(`arg`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IRemoteListenerRecordsCallbackArg`](../interfaces/client_internal_app_remote_listener.IRemoteListenerRecordsCallbackArg.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:6074](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6074)

___

### poke

▸ **poke**(`elements`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | [`IPokeElementsType`](../interfaces/client_providers_item.IPokeElementsType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6162](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6162)

___

### releaseCleanupBlock

▸ **releaseCleanupBlock**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2365](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2365)

___

### reloadListener

▸ **reloadListener**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:3208](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3208)

___

### removePossibleSearchListeners

▸ **removePossibleSearchListeners**(`props?`, `state?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |
| `state` | `IActualItemProviderState` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6108](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6108)

___

### removeSetters

▸ **removeSetters**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2497](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2497)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/providers/item.tsx:6198](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6198)

___

### runDismountOn

▸ **runDismountOn**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:4121](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4121)

___

### search

▸ **search**(`originalOptions`): `Promise`\<[`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalOptions` | [`IActionSearchOptions`](../interfaces/client_providers_item.IActionSearchOptions.md) |

#### Returns

`Promise`\<[`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)\>

#### Defined in

[client/providers/item.tsx:5312](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L5312)

___

### searchFeedback

▸ **searchFeedback**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemSearchStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemSearchStateType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5266](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L5266)

___

### searchListenersSetup

▸ **searchListenersSetup**(`state`, `requestFeedbackToo?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemSearchStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemSearchStateType.md) |
| `requestFeedbackToo?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5197](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L5197)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IActualItemProviderState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IActualItemProviderState` \| (`prevState`: `Readonly`\<`IActualItemProviderState`\>, `props`: `Readonly`\<`IActualItemProviderProps`\>) => `IActualItemProviderState` \| `Pick`\<`IActualItemProviderState`, `K`\> \| `Pick`\<`IActualItemProviderState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

___

### setStateToCurrentValueWithExternalChecking

▸ **setStateToCurrentValueWithExternalChecking**(`currentUpdateId`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentUpdateId` | `number` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:3912](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3912)

___

### setupListeners

▸ **setupListeners**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2735](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2735)

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`, `nextState`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `IActualItemProviderProps` |
| `nextState` | `IActualItemProviderState` |

#### Returns

`boolean`

#### Overrides

React.Component.shouldComponentUpdate

#### Defined in

[client/providers/item.tsx:2811](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2811)

___

### storeStateDelayed

▸ **storeStateDelayed**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:3180](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L3180)

___

### submit

▸ **submit**(`originalOptions`): `Promise`\<[`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalOptions` | [`IActionSubmitOptions`](../interfaces/client_providers_item.IActionSubmitOptions.md) |

#### Returns

`Promise`\<[`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md)\>

#### Defined in

[client/providers/item.tsx:4693](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L4693)

___

### unSetupListeners

▸ **unSetupListeners**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2778](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2778)

___

### unpoke

▸ **unpoke**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:6171](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L6171)

___

### getDerivedServerSideStateFromProps

▸ **getDerivedServerSideStateFromProps**(`props`, `state`): `Promise`\<`Partial`\<`IActualItemProviderState`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |
| `state` | `IActualItemProviderState` |

#### Returns

`Promise`\<`Partial`\<`IActualItemProviderState`\>\>

#### Defined in

[client/providers/item.tsx:2087](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2087)

___

### getDerivedStateFromProps

▸ **getDerivedStateFromProps**(`props`, `state`): `Partial`\<`IActualItemProviderState`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |
| `state` | `IActualItemProviderState` |

#### Returns

`Partial`\<`IActualItemProviderState`\>

#### Defined in

[client/providers/item.tsx:1993](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1993)

___

### getItemStateStatic

▸ **getItemStateStatic**(`props`): [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Defined in

[client/providers/item.tsx:1973](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1973)

___

### setupInitialState

▸ **setupInitialState**(`props`): `IActualItemProviderState`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

`IActualItemProviderState`

#### Defined in

[client/providers/item.tsx:2151](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L2151)
