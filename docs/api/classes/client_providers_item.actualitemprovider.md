[](../README.md) / [Exports](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / ActualItemProvider

# Class: ActualItemProvider

[client/providers/item](../modules/client_providers_item.md).ActualItemProvider

Here it is, the mighty

## Hierarchy

* *Component*<IActualItemProviderProps, IActualItemProviderState\>

  ↳ **ActualItemProvider**

## Table of contents

### Constructors

- [constructor](client_providers_item.actualitemprovider.md#constructor)

### Properties

- [automaticSearchTimeout](client_providers_item.actualitemprovider.md#automaticsearchtimeout)
- [blockIdClean](client_providers_item.actualitemprovider.md#blockidclean)
- [changedSearchListenerLastCollectedSearchId](client_providers_item.actualitemprovider.md#changedsearchlistenerlastcollectedsearchid)
- [context](client_providers_item.actualitemprovider.md#context)
- [initialAutomaticNextSearch](client_providers_item.actualitemprovider.md#initialautomaticnextsearch)
- [internalUUID](client_providers_item.actualitemprovider.md#internaluuid)
- [isCMounted](client_providers_item.actualitemprovider.md#iscmounted)
- [isUnmounted](client_providers_item.actualitemprovider.md#isunmounted)
- [lastLoadValuePromise](client_providers_item.actualitemprovider.md#lastloadvaluepromise)
- [lastLoadValuePromiseIsResolved](client_providers_item.actualitemprovider.md#lastloadvaluepromiseisresolved)
- [lastLoadValuePromiseResolve](client_providers_item.actualitemprovider.md#lastloadvaluepromiseresolve)
- [lastLoadingForId](client_providers_item.actualitemprovider.md#lastloadingforid)
- [lastLoadingForVersion](client_providers_item.actualitemprovider.md#lastloadingforversion)
- [lastOptionsUsedForSearch](client_providers_item.actualitemprovider.md#lastoptionsusedforsearch)
- [lastUpdateId](client_providers_item.actualitemprovider.md#lastupdateid)
- [mountCbFns](client_providers_item.actualitemprovider.md#mountcbfns)
- [preventSearchFeedbackOnPossibleStaleData](client_providers_item.actualitemprovider.md#preventsearchfeedbackonpossiblestaledata)
- [props](client_providers_item.actualitemprovider.md#props)
- [refs](client_providers_item.actualitemprovider.md#refs)
- [reloadNextSearch](client_providers_item.actualitemprovider.md#reloadnextsearch)
- [state](client_providers_item.actualitemprovider.md#state)
- [submitBlockPromises](client_providers_item.actualitemprovider.md#submitblockpromises)
- [updateTimeout](client_providers_item.actualitemprovider.md#updatetimeout)
- [contextType](client_providers_item.actualitemprovider.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](client_providers_item.actualitemprovider.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](client_providers_item.actualitemprovider.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](client_providers_item.actualitemprovider.md#unsafe_componentwillupdate)
- [beforeSSRRender](client_providers_item.actualitemprovider.md#beforessrrender)
- [blockCleanup](client_providers_item.actualitemprovider.md#blockcleanup)
- [changeListener](client_providers_item.actualitemprovider.md#changelistener)
- [changeSearchListener](client_providers_item.actualitemprovider.md#changesearchlistener)
- [checkItemStateValidity](client_providers_item.actualitemprovider.md#checkitemstatevalidity)
- [clean](client_providers_item.actualitemprovider.md#clean)
- [cleanWithProps](client_providers_item.actualitemprovider.md#cleanwithprops)
- [componentDidCatch](client_providers_item.actualitemprovider.md#componentdidcatch)
- [componentDidMount](client_providers_item.actualitemprovider.md#componentdidmount)
- [componentDidUpdate](client_providers_item.actualitemprovider.md#componentdidupdate)
- [componentWillMount](client_providers_item.actualitemprovider.md#componentwillmount)
- [componentWillReceiveProps](client_providers_item.actualitemprovider.md#componentwillreceiveprops)
- [componentWillUnmount](client_providers_item.actualitemprovider.md#componentwillunmount)
- [componentWillUpdate](client_providers_item.actualitemprovider.md#componentwillupdate)
- [delete](client_providers_item.actualitemprovider.md#delete)
- [dismissDeleteError](client_providers_item.actualitemprovider.md#dismissdeleteerror)
- [dismissDeleted](client_providers_item.actualitemprovider.md#dismissdeleted)
- [dismissLoadError](client_providers_item.actualitemprovider.md#dismissloaderror)
- [dismissSearchError](client_providers_item.actualitemprovider.md#dismisssearcherror)
- [dismissSearchResults](client_providers_item.actualitemprovider.md#dismisssearchresults)
- [dismissSubmitError](client_providers_item.actualitemprovider.md#dismisssubmiterror)
- [dismissSubmitted](client_providers_item.actualitemprovider.md#dismisssubmitted)
- [forceUpdate](client_providers_item.actualitemprovider.md#forceupdate)
- [getSnapshotBeforeUpdate](client_providers_item.actualitemprovider.md#getsnapshotbeforeupdate)
- [giveEmulatedInvalidError](client_providers_item.actualitemprovider.md#giveemulatedinvaliderror)
- [injectSubmitBlockPromise](client_providers_item.actualitemprovider.md#injectsubmitblockpromise)
- [installPrefills](client_providers_item.actualitemprovider.md#installprefills)
- [installSetters](client_providers_item.actualitemprovider.md#installsetters)
- [loadListener](client_providers_item.actualitemprovider.md#loadlistener)
- [loadSearch](client_providers_item.actualitemprovider.md#loadsearch)
- [loadValue](client_providers_item.actualitemprovider.md#loadvalue)
- [loadValueCompleted](client_providers_item.actualitemprovider.md#loadvaluecompleted)
- [markForDestruction](client_providers_item.actualitemprovider.md#markfordestruction)
- [markSearchForDestruction](client_providers_item.actualitemprovider.md#marksearchfordestruction)
- [mountOrUpdateIdefForTesting](client_providers_item.actualitemprovider.md#mountorupdateideffortesting)
- [onIncludeSetExclusionState](client_providers_item.actualitemprovider.md#onincludesetexclusionstate)
- [onPropertyChange](client_providers_item.actualitemprovider.md#onpropertychange)
- [onPropertyChangeOrRestoreFinal](client_providers_item.actualitemprovider.md#onpropertychangeorrestorefinal)
- [onPropertyClearEnforce](client_providers_item.actualitemprovider.md#onpropertyclearenforce)
- [onPropertyEnforce](client_providers_item.actualitemprovider.md#onpropertyenforce)
- [onPropertyEnforceOrClearFinal](client_providers_item.actualitemprovider.md#onpropertyenforceorclearfinal)
- [onPropertyRestore](client_providers_item.actualitemprovider.md#onpropertyrestore)
- [onSearchReload](client_providers_item.actualitemprovider.md#onsearchreload)
- [poke](client_providers_item.actualitemprovider.md#poke)
- [releaseCleanupBlock](client_providers_item.actualitemprovider.md#releasecleanupblock)
- [reloadListener](client_providers_item.actualitemprovider.md#reloadlistener)
- [removePossibleSearchListeners](client_providers_item.actualitemprovider.md#removepossiblesearchlisteners)
- [removeSetters](client_providers_item.actualitemprovider.md#removesetters)
- [render](client_providers_item.actualitemprovider.md#render)
- [runDismountOn](client_providers_item.actualitemprovider.md#rundismounton)
- [search](client_providers_item.actualitemprovider.md#search)
- [setState](client_providers_item.actualitemprovider.md#setstate)
- [setStateToCurrentValueWithExternalChecking](client_providers_item.actualitemprovider.md#setstatetocurrentvaluewithexternalchecking)
- [setupInitialState](client_providers_item.actualitemprovider.md#setupinitialstate)
- [setupListeners](client_providers_item.actualitemprovider.md#setuplisteners)
- [shouldComponentUpdate](client_providers_item.actualitemprovider.md#shouldcomponentupdate)
- [submit](client_providers_item.actualitemprovider.md#submit)
- [unSetupListeners](client_providers_item.actualitemprovider.md#unsetuplisteners)
- [unpoke](client_providers_item.actualitemprovider.md#unpoke)
- [getDerivedStateFromProps](client_providers_item.actualitemprovider.md#getderivedstatefromprops)

## Constructors

### constructor

\+ **new ActualItemProvider**(`props`: IActualItemProviderProps): [*ActualItemProvider*](client_providers_item.actualitemprovider.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |

**Returns:** [*ActualItemProvider*](client_providers_item.actualitemprovider.md)

Defined in: [client/providers/item.tsx:863](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L863)

## Properties

### automaticSearchTimeout

• `Private` **automaticSearchTimeout**: *Timer*= null

Defined in: [client/providers/item.tsx:807](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L807)

___

### blockIdClean

• `Private` **blockIdClean**: *string*

Defined in: [client/providers/item.tsx:860](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L860)

___

### changedSearchListenerLastCollectedSearchId

• `Private` **changedSearchListenerLastCollectedSearchId**: *object*= null

Because the listener might be triggered during a mount cb and this
will not change the state, automatic search might not trigger on mount
as it sees the previous state, so with this, we might now if the
search id was changed and for what, and trigger automatic search

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | *string* |

Defined in: [client/providers/item.tsx:760](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L760)

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

### initialAutomaticNextSearch

• `Private` **initialAutomaticNextSearch**: *boolean*= false

Defined in: [client/providers/item.tsx:764](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L764)

___

### internalUUID

• `Private` **internalUUID**: *string*

Defined in: [client/providers/item.tsx:740](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L740)

___

### isCMounted

• `Private` **isCMounted**: *boolean*= false

Defined in: [client/providers/item.tsx:745](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L745)

___

### isUnmounted

• `Private` **isUnmounted**: *boolean*= false

Defined in: [client/providers/item.tsx:744](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L744)

___

### lastLoadValuePromise

• `Private` **lastLoadValuePromise**: *Promise*<void\>= null

Some functons such as submit, on property change
events where we request new values for the
properties need to wait for loading to be done
with these promises we can await for the last loading
event

Defined in: [client/providers/item.tsx:803](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L803)

___

### lastLoadValuePromiseIsResolved

• `Private` **lastLoadValuePromiseIsResolved**: *boolean*= true

Defined in: [client/providers/item.tsx:804](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L804)

___

### lastLoadValuePromiseResolve

• `Private` **lastLoadValuePromiseResolve**: () => *void*= null

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:805](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L805)

Defined in: [client/providers/item.tsx:805](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L805)

___

### lastLoadingForId

• `Private` **lastLoadingForId**: *string*= null

During loading both the id and version might be suddenly hot
updated before the server had time to reply this ensures
that we will only apply the value for the last loading
value and not overwrite if we have changed such value hot

Defined in: [client/providers/item.tsx:793](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L793)

___

### lastLoadingForVersion

• `Private` **lastLoadingForVersion**: *string*= null

Defined in: [client/providers/item.tsx:794](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L794)

___

### lastOptionsUsedForSearch

• `Private` **lastOptionsUsedForSearch**: [*IActionSearchOptions*](../interfaces/client_providers_item.iactionsearchoptions.md)

Defined in: [client/providers/item.tsx:858](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L858)

___

### lastUpdateId

• `Private` **lastUpdateId**: *number*

Defined in: [client/providers/item.tsx:854](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L854)

___

### mountCbFns

• `Private` **mountCbFns**: () => *void*[]

Because sometimes functions for listeners run while the thing
is mounting, but we haven't mounted yet, we use these callbacks
to store these callbacks for the listeners; this happens
because the willUnmount of another item definition might trigger
a change event while this instance is mounting, during cleanup

Defined in: [client/providers/item.tsx:753](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L753)

___

### preventSearchFeedbackOnPossibleStaleData

• `Private` **preventSearchFeedbackOnPossibleStaleData**: *boolean*= false

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

Defined in: [client/providers/item.tsx:785](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L785)

___

### props

• `Readonly` **props**: *Readonly*<IActualItemProviderProps\> & *Readonly*<{ `children?`: ReactNode  }\>

Defined in: node_modules/@types/react/index.d.ts:501

___

### refs

• **refs**: *object*

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

Defined in: node_modules/@types/react/index.d.ts:507

___

### reloadNextSearch

• `Private` **reloadNextSearch**: *boolean*= false

Defined in: [client/providers/item.tsx:765](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L765)

___

### state

• **state**: *Readonly*<IActualItemProviderState\>

Defined in: node_modules/@types/react/index.d.ts:502

___

### submitBlockPromises

• `Private` **submitBlockPromises**: *Promise*<any\>[]

Defined in: [client/providers/item.tsx:863](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L863)

___

### updateTimeout

• `Private` **updateTimeout**: *Timer*

Defined in: [client/providers/item.tsx:849](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L849)

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

▸ `Optional`**UNSAFE_componentWillReceiveProps**(`nextProps`: *Readonly*<IActualItemProviderProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IActualItemProviderProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:744

___

### UNSAFE\_componentWillUpdate

▸ `Optional`**UNSAFE_componentWillUpdate**(`nextProps`: *Readonly*<IActualItemProviderProps\>, `nextState`: *Readonly*<IActualItemProviderState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IActualItemProviderProps\> |
`nextState` | *Readonly*<IActualItemProviderState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:772

___

### beforeSSRRender

▸ **beforeSSRRender**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [client/providers/item.tsx:3548](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3548)

___

### blockCleanup

▸ **blockCleanup**(`props?`: IActualItemProviderProps): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |

**Returns:** *void*

Defined in: [client/providers/item.tsx:935](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L935)

___

### changeListener

▸ **changeListener**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:1658](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1658)

___

### changeSearchListener

▸ **changeSearchListener**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:1619](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1619)

___

### checkItemStateValidity

▸ **checkItemStateValidity**(`options`: { `includes?`: { [include: string]: *string*[];  } ; `onlyIncludeIfDiffersFromAppliedValue?`: *boolean* ; `policies?`: [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[] ; `properties`: *string*[]  }): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *object* |
`options.includes?` | *object* |
`options.onlyIncludeIfDiffersFromAppliedValue?` | *boolean* |
`options.policies?` | [*PolicyPathType*](../modules/client_providers_item.md#policypathtype)[] |
`options.properties` | *string*[] |

**Returns:** *boolean*

Defined in: [client/providers/item.tsx:2273](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2273)

___

### clean

▸ **clean**(`options`: [*IActionCleanOptions*](../interfaces/client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionCleanOptions*](../interfaces/client_providers_item.iactioncleanoptions.md) |
`state` | *success* \| *fail* |
`avoidTriggeringUpdate?` | *boolean* |

**Returns:** *boolean*

Defined in: [client/providers/item.tsx:2535](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2535)

___

### cleanWithProps

▸ **cleanWithProps**(`props`: IActualItemProviderProps, `options`: [*IActionCleanOptions*](../interfaces/client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |
`options` | [*IActionCleanOptions*](../interfaces/client_providers_item.iactioncleanoptions.md) |
`state` | *success* \| *fail* |
`avoidTriggeringUpdate?` | *boolean* |

**Returns:** *boolean*

Defined in: [client/providers/item.tsx:2547](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2547)

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

Defined in: [client/providers/item.tsx:1151](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1151)

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: IActualItemProviderProps, `prevState`: IActualItemProviderState): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | IActualItemProviderProps |
`prevState` | IActualItemProviderState |

**Returns:** *Promise*<void\>

Defined in: [client/providers/item.tsx:1353](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1353)

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

▸ `Optional`**componentWillReceiveProps**(`nextProps`: *Readonly*<IActualItemProviderProps\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IActualItemProviderProps\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:727

___

### componentWillUnmount

▸ **componentWillUnmount**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:2242](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2242)

___

### componentWillUpdate

▸ `Optional`**componentWillUpdate**(`nextProps`: *Readonly*<IActualItemProviderProps\>, `nextState`: *Readonly*<IActualItemProviderState\>, `nextContext`: *any*): *void*

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
`nextProps` | *Readonly*<IActualItemProviderProps\> |
`nextState` | *Readonly*<IActualItemProviderState\> |
`nextContext` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:757

___

### delete

▸ **delete**(`options?`: [*IActionDeleteOptions*](../interfaces/client_providers_item.iactiondeleteoptions.md)): *Promise*<[*IBasicActionResponse*](../interfaces/client_providers_item.ibasicactionresponse.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionDeleteOptions*](../interfaces/client_providers_item.iactiondeleteoptions.md) |

**Returns:** *Promise*<[*IBasicActionResponse*](../interfaces/client_providers_item.ibasicactionresponse.md)\>

Defined in: [client/providers/item.tsx:2431](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2431)

___

### dismissDeleteError

▸ **dismissDeleteError**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:3430](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3430)

___

### dismissDeleted

▸ **dismissDeleted**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:3454](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3454)

___

### dismissLoadError

▸ **dismissLoadError**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:3422](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3422)

___

### dismissSearchError

▸ **dismissSearchError**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:3462](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3462)

___

### dismissSearchResults

▸ **dismissSearchResults**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:3512](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3512)

___

### dismissSubmitError

▸ **dismissSubmitError**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:3438](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3438)

___

### dismissSubmitted

▸ **dismissSubmitted**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:3446](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3446)

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

▸ `Optional`**getSnapshotBeforeUpdate**(`prevProps`: *Readonly*<IActualItemProviderProps\>, `prevState`: *Readonly*<IActualItemProviderState\>): *any*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters:

Name | Type |
:------ | :------ |
`prevProps` | *Readonly*<IActualItemProviderProps\> |
`prevState` | *Readonly*<IActualItemProviderState\> |

**Returns:** *any*

Defined in: node_modules/@types/react/index.d.ts:677

___

### giveEmulatedInvalidError

▸ **giveEmulatedInvalidError**(`stateApplied`: *string*, `withId`: *boolean*, `withSearchResults`: *boolean*): [*IActionResponseWithId*](../interfaces/client_providers_item.iactionresponsewithid.md) \| [*IActionResponseWithSearchResults*](../interfaces/client_providers_item.iactionresponsewithsearchresults.md) \| [*IActionResponseWithValue*](../interfaces/client_providers_item.iactionresponsewithvalue.md)

#### Parameters:

Name | Type |
:------ | :------ |
`stateApplied` | *string* |
`withId` | *boolean* |
`withSearchResults` | *boolean* |

**Returns:** [*IActionResponseWithId*](../interfaces/client_providers_item.iactionresponsewithid.md) \| [*IActionResponseWithSearchResults*](../interfaces/client_providers_item.iactionresponsewithsearchresults.md) \| [*IActionResponseWithValue*](../interfaces/client_providers_item.iactionresponsewithvalue.md)

Defined in: [client/providers/item.tsx:2385](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2385)

___

### injectSubmitBlockPromise

▸ **injectSubmitBlockPromise**(`p`: *Promise*<any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`p` | *Promise*<any\> |

**Returns:** *void*

Defined in: [client/providers/item.tsx:1062](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1062)

___

### installPrefills

▸ **installPrefills**(`props?`: IActualItemProviderProps): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |

**Returns:** *void*

Defined in: [client/providers/item.tsx:1131](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1131)

___

### installSetters

▸ **installSetters**(`props?`: IActualItemProviderProps): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |

**Returns:** *void*

Defined in: [client/providers/item.tsx:1115](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1115)

___

### loadListener

▸ **loadListener**(): [*IActionResponseWithValue*](../interfaces/client_providers_item.iactionresponsewithvalue.md)

This listener triggers on load and the search
loader triggers it

**Returns:** [*IActionResponseWithValue*](../interfaces/client_providers_item.iactionresponsewithvalue.md)

Defined in: [client/providers/item.tsx:1702](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1702)

___

### loadSearch

▸ **loadSearch**(): *string*

Loads the search from the location

**Returns:** *string*

the search id that it managed to collect

Defined in: [client/providers/item.tsx:2973](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2973)

___

### loadValue

▸ **loadValue**(`denyCache?`: *boolean*): *Promise*<[*IActionResponseWithValue*](../interfaces/client_providers_item.iactionresponsewithvalue.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`denyCache?` | *boolean* |

**Returns:** *Promise*<[*IActionResponseWithValue*](../interfaces/client_providers_item.iactionresponsewithvalue.md)\>

Defined in: [client/providers/item.tsx:1764](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1764)

___

### loadValueCompleted

▸ **loadValueCompleted**(`value`: [*ILoadCompletedPayload*](../interfaces/client_providers_item.iloadcompletedpayload.md)): [*IActionResponseWithValue*](../interfaces/client_providers_item.iactionresponsewithvalue.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*ILoadCompletedPayload*](../interfaces/client_providers_item.iloadcompletedpayload.md) |

**Returns:** [*IActionResponseWithValue*](../interfaces/client_providers_item.iactionresponsewithvalue.md)

Defined in: [client/providers/item.tsx:1998](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1998)

___

### markForDestruction

▸ **markForDestruction**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:1065](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1065)

___

### markSearchForDestruction

▸ **markSearchForDestruction**(`type`: *by-parent* \| *by-owner*, `qualifiedName`: *string*, `arg`: *string* \| [*string*, *string*, *string*]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | *by-parent* \| *by-owner* |
`qualifiedName` | *string* |
`arg` | *string* \| [*string*, *string*, *string*] |

**Returns:** *void*

Defined in: [client/providers/item.tsx:1091](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1091)

___

### mountOrUpdateIdefForTesting

▸ **mountOrUpdateIdefForTesting**(`wasContentLoadedFromMemory?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`wasContentLoadedFromMemory?` | *boolean* |

**Returns:** *void*

Defined in: [client/providers/item.tsx:1201](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1201)

___

### onIncludeSetExclusionState

▸ **onIncludeSetExclusionState**(`include`: [*default*](base_root_module_itemdefinition_include.default.md), `state`: [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`include` | [*default*](base_root_module_itemdefinition_include.default.md) |
`state` | [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:2255](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2255)

___

### onPropertyChange

▸ **onPropertyChange**(`property`: [*default*](base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `internalValue`: *any*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](base_root_module_itemdefinition_propertydefinition.default.md) |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |
`internalValue` | *any* |

**Returns:** *Promise*<void\>

Defined in: [client/providers/item.tsx:2158](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2158)

___

### onPropertyChangeOrRestoreFinal

▸ **onPropertyChangeOrRestoreFinal**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:2097](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2097)

___

### onPropertyClearEnforce

▸ **onPropertyClearEnforce**(`property`: [*default*](base_root_module_itemdefinition_propertydefinition.default.md), `givenForId`: *string*, `givenForVersion`: *string*, `internal?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](base_root_module_itemdefinition_propertydefinition.default.md) |
`givenForId` | *string* |
`givenForVersion` | *string* |
`internal?` | *boolean* |

**Returns:** *void*

Defined in: [client/providers/item.tsx:2209](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2209)

___

### onPropertyEnforce

▸ **onPropertyEnforce**(`property`: [*default*](base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `givenForId`: *string*, `givenForVersion`: *string*, `internal?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](base_root_module_itemdefinition_propertydefinition.default.md) |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |
`givenForId` | *string* |
`givenForVersion` | *string* |
`internal?` | *boolean* |

**Returns:** *void*

Defined in: [client/providers/item.tsx:2193](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2193)

___

### onPropertyEnforceOrClearFinal

▸ **onPropertyEnforceOrClearFinal**(`givenForId`: *string*, `givenForVersion`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`givenForId` | *string* |
`givenForVersion` | *string* |

**Returns:** *void*

Defined in: [client/providers/item.tsx:2179](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2179)

___

### onPropertyRestore

▸ **onPropertyRestore**(`property`: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](base_root_module_itemdefinition_propertydefinition.default.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:2144](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2144)

___

### onSearchReload

▸ **onSearchReload**(`arg`: [*IRemoteListenerRecordsCallbackArg*](../interfaces/client_internal_app_remote_listener.iremotelistenerrecordscallbackarg.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*IRemoteListenerRecordsCallbackArg*](../interfaces/client_internal_app_remote_listener.iremotelistenerrecordscallbackarg.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:3470](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3470)

___

### poke

▸ **poke**(`elements`: [*IPokeElementsType*](../interfaces/client_providers_item.ipokeelementstype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`elements` | [*IPokeElementsType*](../interfaces/client_providers_item.ipokeelementstype.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:3527](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3527)

___

### releaseCleanupBlock

▸ **releaseCleanupBlock**(`props?`: IActualItemProviderProps): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |

**Returns:** *void*

Defined in: [client/providers/item.tsx:943](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L943)

___

### reloadListener

▸ **reloadListener**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:1603](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1603)

___

### removePossibleSearchListeners

▸ **removePossibleSearchListeners**(`props?`: IActualItemProviderProps, `state?`: IActualItemProviderState): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |
`state` | IActualItemProviderState |

**Returns:** *void*

Defined in: [client/providers/item.tsx:3484](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3484)

___

### removeSetters

▸ **removeSetters**(`props?`: IActualItemProviderProps): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |

**Returns:** *void*

Defined in: [client/providers/item.tsx:1123](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1123)

___

### render

▸ **render**(): *Element*

**Returns:** *Element*

Defined in: [client/providers/item.tsx:3566](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3566)

___

### runDismountOn

▸ **runDismountOn**(`props?`: IActualItemProviderProps): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |

**Returns:** *void*

Defined in: [client/providers/item.tsx:2222](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2222)

___

### search

▸ **search**(`options`: [*IActionSearchOptions*](../interfaces/client_providers_item.iactionsearchoptions.md)): *Promise*<[*IActionResponseWithSearchResults*](../interfaces/client_providers_item.iactionresponsewithsearchresults.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionSearchOptions*](../interfaces/client_providers_item.iactionsearchoptions.md) |

**Returns:** *Promise*<[*IActionResponseWithSearchResults*](../interfaces/client_providers_item.iactionresponsewithsearchresults.md)\>

Defined in: [client/providers/item.tsx:3016](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3016)

___

### setState

▸ **setState**<K\>(`state`: IActualItemProviderState \| (`prevState`: *Readonly*<IActualItemProviderState\>, `props`: *Readonly*<IActualItemProviderProps\>) => IActualItemProviderState \| *Pick*<IActualItemProviderState, K\> \| *Pick*<IActualItemProviderState, K\>, `callback?`: () => *void*): *void*

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *loaded* \| *searchResults* \| *searchWasRestored* \| *itemState* \| *isBlocked* \| *isBlockedButDataIsAccessible* \| *notFound* \| *loadError* \| *loading* \| *submitError* \| *submitting* \| *submitted* \| *deleteError* \| *deleting* \| *deleted* \| *pokedElements* \| *searchError* \| *searching* \| *searchRecords* \| *searchLimit* \| *searchOffset* \| *searchCount* \| *searchId* \| *searchOwner* \| *searchParent* \| *searchShouldCache* \| *searchRequestedProperties* \| *searchRequestedIncludes* \| *searchFields* |

#### Parameters:

Name | Type |
:------ | :------ |
`state` | IActualItemProviderState \| (`prevState`: *Readonly*<IActualItemProviderState\>, `props`: *Readonly*<IActualItemProviderProps\>) => IActualItemProviderState \| *Pick*<IActualItemProviderState, K\> \| *Pick*<IActualItemProviderState, K\> |
`callback?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/react/index.d.ts:488

___

### setStateToCurrentValueWithExternalChecking

▸ **setStateToCurrentValueWithExternalChecking**(`currentUpdateId`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`currentUpdateId` | *number* |

**Returns:** *Promise*<void\>

Defined in: [client/providers/item.tsx:2065](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2065)

___

### setupInitialState

▸ **setupInitialState**(): IActualItemProviderState

**Returns:** IActualItemProviderState

Defined in: [client/providers/item.tsx:951](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L951)

___

### setupListeners

▸ **setupListeners**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:1244](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1244)

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: IActualItemProviderProps, `nextState`: IActualItemProviderState): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`nextProps` | IActualItemProviderProps |
`nextState` | IActualItemProviderState |

**Returns:** *boolean*

Defined in: [client/providers/item.tsx:1319](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1319)

___

### submit

▸ **submit**(`options`: [*IActionSubmitOptions*](../interfaces/client_providers_item.iactionsubmitoptions.md)): *Promise*<[*IActionResponseWithId*](../interfaces/client_providers_item.iactionresponsewithid.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionSubmitOptions*](../interfaces/client_providers_item.iactionsubmitoptions.md) |

**Returns:** *Promise*<[*IActionResponseWithId*](../interfaces/client_providers_item.iactionresponsewithid.md)\>

Defined in: [client/providers/item.tsx:2704](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L2704)

___

### unSetupListeners

▸ **unSetupListeners**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:1286](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L1286)

___

### unpoke

▸ **unpoke**(): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:3536](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3536)

___

### getDerivedStateFromProps

▸ `Static`**getDerivedStateFromProps**(`props`: IActualItemProviderProps, `state`: IActualItemProviderState): *Partial*<IActualItemProviderState\>

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IActualItemProviderProps |
`state` | IActualItemProviderState |

**Returns:** *Partial*<IActualItemProviderState\>

Defined in: [client/providers/item.tsx:814](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L814)
