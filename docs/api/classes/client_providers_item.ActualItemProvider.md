[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / ActualItemProvider

# Class: ActualItemProvider

[client/providers/item](../modules/client_providers_item.md).ActualItemProvider

Here it is, the mighty

## Hierarchy

- `Component`<`IActualItemProviderProps`, `IActualItemProviderState`\>

  ↳ **`ActualItemProvider`**

## Table of contents

### Constructors

- [constructor](client_providers_item.ActualItemProvider.md#constructor)

### Properties

- [activeSubmitPromise](client_providers_item.ActualItemProvider.md#activesubmitpromise)
- [activeSubmitPromiseAwaiter](client_providers_item.ActualItemProvider.md#activesubmitpromiseawaiter)
- [automaticSearchTimeout](client_providers_item.ActualItemProvider.md#automaticsearchtimeout)
- [blockIdClean](client_providers_item.ActualItemProvider.md#blockidclean)
- [changedSearchListenerLastCollectedSearchId](client_providers_item.ActualItemProvider.md#changedsearchlistenerlastcollectedsearchid)
- [context](client_providers_item.ActualItemProvider.md#context)
- [initialAutomaticNextSearch](client_providers_item.ActualItemProvider.md#initialautomaticnextsearch)
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

• **new ActualItemProvider**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Overrides

React.Component&lt;IActualItemProviderProps, IActualItemProviderState\&gt;.constructor

#### Defined in

[client/providers/item.tsx:2034](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2034)

## Properties

### activeSubmitPromise

• `Private` **activeSubmitPromise**: `Promise`<[`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md)\> = `null`

#### Defined in

[client/providers/item.tsx:2027](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2027)

___

### activeSubmitPromiseAwaiter

• `Private` **activeSubmitPromiseAwaiter**: `string` = `null`

#### Defined in

[client/providers/item.tsx:2028](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2028)

___

### automaticSearchTimeout

• `Private` **automaticSearchTimeout**: `Timer` = `null`

#### Defined in

[client/providers/item.tsx:1712](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1712)

___

### blockIdClean

• `Private` **blockIdClean**: `string`

#### Defined in

[client/providers/item.tsx:2021](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2021)

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

[client/providers/item.tsx:1665](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1665)

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

### initialAutomaticNextSearch

• `Private` **initialAutomaticNextSearch**: `boolean` = `false`

#### Defined in

[client/providers/item.tsx:1669](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1669)

___

### internalUUID

• `Private` **internalUUID**: `string`

#### Defined in

[client/providers/item.tsx:1645](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1645)

___

### isCMounted

• `Private` **isCMounted**: `boolean` = `false`

#### Defined in

[client/providers/item.tsx:1650](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1650)

___

### isUnmounted

• `Private` **isUnmounted**: `boolean` = `false`

#### Defined in

[client/providers/item.tsx:1649](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1649)

___

### lastLoadValuePromise

• `Private` **lastLoadValuePromise**: `Promise`<`void`\> = `null`

Some functons such as submit, on property change
events where we request new values for the
properties need to wait for loading to be done
with these promises we can await for the last loading
event

#### Defined in

[client/providers/item.tsx:1708](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1708)

___

### lastLoadValuePromiseIsResolved

• `Private` **lastLoadValuePromiseIsResolved**: `boolean` = `true`

#### Defined in

[client/providers/item.tsx:1709](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1709)

___

### lastLoadValuePromiseResolve

• `Private` **lastLoadValuePromiseResolve**: () => `void` = `null`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1710](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1710)

___

### lastLoadingForId

• `Private` **lastLoadingForId**: `string` = `null`

During loading both the id and version might be suddenly hot
updated before the server had time to reply this ensures
that we will only apply the value for the last loading
value and not overwrite if we have changed such value hot

#### Defined in

[client/providers/item.tsx:1698](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1698)

___

### lastLoadingForVersion

• `Private` **lastLoadingForVersion**: `string` = `null`

#### Defined in

[client/providers/item.tsx:1699](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1699)

___

### lastUpdateId

• `Private` **lastUpdateId**: `number`

#### Defined in

[client/providers/item.tsx:2019](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2019)

___

### mountCbFns

• `Private` **mountCbFns**: () => `void`[] = `[]`

Because sometimes functions for listeners run while the thing
is mounting, but we haven't mounted yet, we use these callbacks
to store these callbacks for the listeners; this happens
because the willUnmount of another item definition might trigger
a change event while this instance is mounting, during cleanup

#### Defined in

[client/providers/item.tsx:1658](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1658)

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

[client/providers/item.tsx:1690](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1690)

___

### props

• `Readonly` **props**: `Readonly`<`IActualItemProviderProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

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

### reloadListenerTimeout

• `Private` **reloadListenerTimeout**: `Timeout` = `null`

#### Defined in

[client/providers/item.tsx:2032](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2032)

___

### reloadNextSearch

• `Private` **reloadNextSearch**: `boolean` = `false`

#### Defined in

[client/providers/item.tsx:1670](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1670)

___

### repairCorruptionTimeout

• `Private` **repairCorruptionTimeout**: `Timeout` = `null`

#### Defined in

[client/providers/item.tsx:1716](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1716)

___

### state

• **state**: `Readonly`<`IActualItemProviderState`\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:505

___

### storeStateTimeout

• `Private` **storeStateTimeout**: `Timeout` = `null`

#### Defined in

[client/providers/item.tsx:1721](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1721)

___

### submitBlockPromises

• `Private` **submitBlockPromises**: `Promise`<`any`\>[] = `[]`

#### Defined in

[client/providers/item.tsx:2024](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2024)

___

### updateTimeout

• `Private` **updateTimeout**: `Timer`

#### Defined in

[client/providers/item.tsx:2014](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2014)

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
| `nextProps` | `Readonly`<`IActualItemProviderProps`\> |
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
| `nextProps` | `Readonly`<`IActualItemProviderProps`\> |
| `nextState` | `Readonly`<`IActualItemProviderState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:777

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

[client/providers/item.tsx:2108](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2108)

___

### changeListener

▸ **changeListener**(`repairCorruption?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `repairCorruption?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:2856](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2856)

___

### changeSearchListener

▸ **changeSearchListener**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2804](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2804)

___

### checkItemStateValidity

▸ **checkItemStateValidity**(`options`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.includeOverrides?` | [`IIncludeOverride`](../interfaces/client_internal_gql_client_util.IIncludeOverride.md)[] |
| `options.includes?` | `Object` |
| `options.onlyIncludeIfDiffersFromAppliedValue?` | `boolean` |
| `options.policies?` | [`PolicyPathType`](../modules/client_providers_item.md#policypathtype)[] |
| `options.properties` | `string`[] |
| `options.propertyOverrides?` | [`IPropertyOverride`](../interfaces/client_internal_gql_client_util.IPropertyOverride.md)[] |

#### Returns

`boolean`

#### Defined in

[client/providers/item.tsx:3667](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3667)

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

[client/providers/item.tsx:3971](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3971)

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

[client/providers/item.tsx:3983](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3983)

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

▸ **componentDidMount**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

React.Component.componentDidMount

#### Defined in

[client/providers/item.tsx:2237](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2237)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`, `prevState`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `IActualItemProviderProps` |
| `prevState` | `IActualItemProviderState` |

#### Returns

`Promise`<`void`\>

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[client/providers/item.tsx:2461](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2461)

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
| `nextProps` | `Readonly`<`IActualItemProviderProps`\> |
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

[client/providers/item.tsx:3634](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3634)

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
| `nextProps` | `Readonly`<`IActualItemProviderProps`\> |
| `nextState` | `Readonly`<`IActualItemProviderState`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:762

___

### delete

▸ **delete**(`options?`): `Promise`<[`IBasicActionResponse`](../interfaces/client_providers_item.IBasicActionResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionDeleteOptions`](../interfaces/client_providers_item.IActionDeleteOptions.md) |

#### Returns

`Promise`<[`IBasicActionResponse`](../interfaces/client_providers_item.IBasicActionResponse.md)\>

#### Defined in

[client/providers/item.tsx:3848](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3848)

___

### dismissDeleteError

▸ **dismissDeleteError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5244](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5244)

___

### dismissDeleted

▸ **dismissDeleted**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5268](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5268)

___

### dismissLoadError

▸ **dismissLoadError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5236](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5236)

___

### dismissSearchError

▸ **dismissSearchError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5276](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5276)

___

### dismissSearchResults

▸ **dismissSearchResults**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5348](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5348)

___

### dismissSubmitError

▸ **dismissSubmitError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5252](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5252)

___

### dismissSubmitted

▸ **dismissSubmitted**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5260](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5260)

___

### downloadState

▸ **downloadState**(`specificProperties?`, `specificIncludes?`): `Promise`<`Blob`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[client/providers/item.tsx:3044](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3044)

___

### downloadStateAt

▸ **downloadStateAt**(`id`, `version`, `specificProperties?`, `specificIncludes?`): `Promise`<`Blob`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[client/providers/item.tsx:3047](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3047)

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

### getItemState

▸ `Private` **getItemState**(`props?`): [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Readonly`<`IActualItemProviderProps`\> & `Readonly`<{ `children?`: `ReactNode`  }\> |

#### Returns

[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Defined in

[client/providers/item.tsx:2853](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2853)

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
| `prevProps` | `Readonly`<`IActualItemProviderProps`\> |
| `prevState` | `Readonly`<`IActualItemProviderState`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

___

### giveEmulatedInvalidError

▸ **giveEmulatedInvalidError**(`stateApplied`, `withIdVersion`, `withSearchResults`, `errMessageOverride?`, `errorOverride?`): [`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md) \| [`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md) \| [`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateApplied` | `string` |
| `withIdVersion` | `boolean` \| [`string`, `string`] |
| `withSearchResults` | `boolean` |
| `errMessageOverride?` | `string` |
| `errorOverride?` | `string` |

#### Returns

[`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md) \| [`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md) \| [`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md)

#### Defined in

[client/providers/item.tsx:3793](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3793)

___

### injectSubmitBlockPromise

▸ **injectSubmitBlockPromise**(`p`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Promise`<`any`\> |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2124](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2124)

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

[client/providers/item.tsx:2201](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2201)

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

[client/providers/item.tsx:2185](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2185)

___

### loadListener

▸ **loadListener**(): `Promise`<`void`\>

This listener triggers on load and the search
loader triggers it

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:2947](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2947)

___

### loadStateFromFile

▸ **loadStateFromFile**(`state`, `specificProperties?`, `specificIncludes?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `Blob` \| `File` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:3021](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3021)

___

### loadStateFromFileAt

▸ **loadStateFromFileAt**(`state`, `id`, `version?`, `specificProperties?`, `specificIncludes?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `Blob` \| `File` |
| `id` | `string` |
| `version?` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:3024](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3024)

___

### loadStoredState

▸ **loadStoredState**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:3064](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3064)

___

### loadValue

▸ **loadValue**(`denyCaches?`): `Promise`<[`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `denyCaches?` | `boolean` |

#### Returns

`Promise`<[`IActionResponseWithValue`](../interfaces/client_providers_item.IActionResponseWithValue.md)\>

#### Defined in

[client/providers/item.tsx:3100](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3100)

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

[client/providers/item.tsx:3376](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3376)

___

### markForDestruction

▸ **markForDestruction**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2127](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2127)

___

### markSearchForDestruction

▸ **markSearchForDestruction**(`type`, `qualifiedName`, `owner`, `parent`, `property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` |
| `qualifiedName` | `string` |
| `owner` | `string` |
| `parent` | [`string`, `string`, `string`] |
| `property` | [`string`, `string`] |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2154](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2154)

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

[client/providers/item.tsx:2307](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2307)

___

### onConnectStatusChange

▸ **onConnectStatusChange**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2221](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2221)

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

[client/providers/item.tsx:3649](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3649)

___

### onPropertyChange

▸ **onPropertyChange**(`property`, `value`, `internalValue`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `internalValue` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:3548](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3548)

___

### onPropertyChangeOrRestoreFinal

▸ **onPropertyChangeOrRestoreFinal**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:3487](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3487)

___

### onPropertyClearEnforce

▸ **onPropertyClearEnforce**(`property`, `givenForId`, `givenForVersion`, `internal?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |
| `internal?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:3603](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3603)

___

### onPropertyEnforce

▸ **onPropertyEnforce**(`property`, `value`, `givenForId`, `givenForVersion`, `internal?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |
| `internal?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:3588](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3588)

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

[client/providers/item.tsx:3569](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3569)

___

### onPropertyRestore

▸ **onPropertyRestore**(`property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:3534](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3534)

___

### onSearchReload

▸ **onSearchReload**(`arg`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IRemoteListenerRecordsCallbackArg`](../interfaces/client_internal_app_remote_listener.IRemoteListenerRecordsCallbackArg.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:5284](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5284)

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

[client/providers/item.tsx:5364](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5364)

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

[client/providers/item.tsx:2116](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2116)

___

### reloadListener

▸ **reloadListener**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2787](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2787)

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

[client/providers/item.tsx:5310](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5310)

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

[client/providers/item.tsx:2193](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2193)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[client/providers/item.tsx:5385](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5385)

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

[client/providers/item.tsx:3614](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3614)

___

### search

▸ **search**(`options`): `Promise`<[`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSearchOptions`](../interfaces/client_providers_item.IActionSearchOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithSearchResults`](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)\>

#### Defined in

[client/providers/item.tsx:4715](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L4715)

___

### searchFeedback

▸ `Private` **searchFeedback**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemSearchStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemSearchStateType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:4669](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L4669)

___

### searchListenersSetup

▸ `Private` **searchListenersSetup**(`state`, `requestFeedbackToo?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemSearchStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemSearchStateType.md) |
| `requestFeedbackToo?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:4604](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L4604)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `IActualItemProviderState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `IActualItemProviderState` \| (`prevState`: `Readonly`<`IActualItemProviderState`\>, `props`: `Readonly`<`IActualItemProviderProps`\>) => `IActualItemProviderState` \| `Pick`<`IActualItemProviderState`, `K`\> \| `Pick`<`IActualItemProviderState`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### setStateToCurrentValueWithExternalChecking

▸ **setStateToCurrentValueWithExternalChecking**(`currentUpdateId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentUpdateId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:3455](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L3455)

___

### setupListeners

▸ **setupListeners**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2350](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2350)

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

[client/providers/item.tsx:2425](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2425)

___

### storeStateDelayed

▸ `Private` **storeStateDelayed**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:2769](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2769)

___

### submit

▸ **submit**(`originalOptions`): `Promise`<[`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalOptions` | [`IActionSubmitOptions`](../interfaces/client_providers_item.IActionSubmitOptions.md) |

#### Returns

`Promise`<[`IActionSubmitResponse`](../interfaces/client_providers_item.IActionSubmitResponse.md)\>

#### Defined in

[client/providers/item.tsx:4154](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L4154)

___

### unSetupListeners

▸ **unSetupListeners**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:2392](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L2392)

___

### unpoke

▸ **unpoke**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:5373](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L5373)

___

### getDerivedServerSideStateFromProps

▸ `Static` **getDerivedServerSideStateFromProps**(`props`, `state`): `Promise`<`Partial`<`IActualItemProviderState`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |
| `state` | `IActualItemProviderState` |

#### Returns

`Promise`<`Partial`<`IActualItemProviderState`\>\>

#### Defined in

[client/providers/item.tsx:1835](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1835)

___

### getDerivedStateFromProps

▸ `Static` **getDerivedStateFromProps**(`props`, `state`): `Partial`<`IActualItemProviderState`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |
| `state` | `IActualItemProviderState` |

#### Returns

`Partial`<`IActualItemProviderState`\>

#### Defined in

[client/providers/item.tsx:1743](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1743)

___

### getItemStateStatic

▸ `Static` `Private` **getItemStateStatic**(`props`): [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Defined in

[client/providers/item.tsx:1723](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1723)

___

### setupInitialState

▸ `Static` **setupInitialState**(`props`): `IActualItemProviderState`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IActualItemProviderProps` |

#### Returns

`IActualItemProviderState`

#### Defined in

[client/providers/item.tsx:1899](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1899)
