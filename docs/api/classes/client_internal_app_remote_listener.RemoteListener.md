[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/app/remote-listener](../modules/client_internal_app_remote_listener.md) / RemoteListener

# Class: RemoteListener

[client/internal/app/remote-listener](../modules/client_internal_app_remote_listener.md).RemoteListener

The remote listener class creates a websocket connection (as well as it falling back to polling)
for usage with the application to listen for changes to item definitions, request feedback as well
as to keep things up to date and reactive

## Table of contents

### Constructors

- [constructor](client_internal_app_remote_listener.RemoteListener.md#constructor)

### Properties

- [appUpdatedListeners](client_internal_app_remote_listener.RemoteListener.md#appupdatedlisteners)
- [awaitingOwnedParentedSearchRequests](client_internal_app_remote_listener.RemoteListener.md#awaitingownedparentedsearchrequests)
- [awaitingOwnedSearchRequests](client_internal_app_remote_listener.RemoteListener.md#awaitingownedsearchrequests)
- [awaitingParentedSearchRequests](client_internal_app_remote_listener.RemoteListener.md#awaitingparentedsearchrequests)
- [awaitingPropertySearchRequests](client_internal_app_remote_listener.RemoteListener.md#awaitingpropertysearchrequests)
- [connectionListeners](client_internal_app_remote_listener.RemoteListener.md#connectionlisteners)
- [connectionOnConnectOnceListeners](client_internal_app_remote_listener.RemoteListener.md#connectiononconnectoncelisteners)
- [currencyFactorsHandler](client_internal_app_remote_listener.RemoteListener.md#currencyfactorshandler)
- [delayedFeedbacks](client_internal_app_remote_listener.RemoteListener.md#delayedfeedbacks)
- [hasBeenReadyOnce](client_internal_app_remote_listener.RemoteListener.md#hasbeenreadyonce)
- [hasSetToken](client_internal_app_remote_listener.RemoteListener.md#hassettoken)
- [isReady](client_internal_app_remote_listener.RemoteListener.md#isready)
- [lastRecievedBuildNumber](client_internal_app_remote_listener.RemoteListener.md#lastrecievedbuildnumber)
- [listenerCount](client_internal_app_remote_listener.RemoteListener.md#listenercount)
- [listeners](client_internal_app_remote_listener.RemoteListener.md#listeners)
- [logout](client_internal_app_remote_listener.RemoteListener.md#logout)
- [offline](client_internal_app_remote_listener.RemoteListener.md#offline)
- [ownedParentedSearchListeners](client_internal_app_remote_listener.RemoteListener.md#ownedparentedsearchlisteners)
- [ownedSearchListeners](client_internal_app_remote_listener.RemoteListener.md#ownedsearchlisteners)
- [parentedSearchListeners](client_internal_app_remote_listener.RemoteListener.md#parentedsearchlisteners)
- [propertySearchListeners](client_internal_app_remote_listener.RemoteListener.md#propertysearchlisteners)
- [root](client_internal_app_remote_listener.RemoteListener.md#root)
- [setupTime](client_internal_app_remote_listener.RemoteListener.md#setuptime)
- [slowPoolingTimer](client_internal_app_remote_listener.RemoteListener.md#slowpoolingtimer)
- [socket](client_internal_app_remote_listener.RemoteListener.md#socket)
- [token](client_internal_app_remote_listener.RemoteListener.md#token)
- [uuid](client_internal_app_remote_listener.RemoteListener.md#uuid)

### Methods

- [addAppUpdatedListener](client_internal_app_remote_listener.RemoteListener.md#addappupdatedlistener)
- [addConnectStatusListener](client_internal_app_remote_listener.RemoteListener.md#addconnectstatuslistener)
- [addItemDefinitionListenerFor](client_internal_app_remote_listener.RemoteListener.md#additemdefinitionlistenerfor)
- [addOnConnectOnceListener](client_internal_app_remote_listener.RemoteListener.md#addonconnectoncelistener)
- [addOwnedParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#addownedparentedsearchlistenerfor)
- [addOwnedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#addownedsearchlistenerfor)
- [addParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#addparentedsearchlistenerfor)
- [addPropertySearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#addpropertysearchlistenerfor)
- [attachDetacchedRequests](client_internal_app_remote_listener.RemoteListener.md#attachdetacchedrequests)
- [attachItemDefinitionListenerFor](client_internal_app_remote_listener.RemoteListener.md#attachitemdefinitionlistenerfor)
- [attachOwnedParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#attachownedparentedsearchlistenerfor)
- [attachOwnedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#attachownedsearchlistenerfor)
- [attachParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#attachparentedsearchlistenerfor)
- [attachPropertySearchListener](client_internal_app_remote_listener.RemoteListener.md#attachpropertysearchlistener)
- [consumeDelayedFeedbacks](client_internal_app_remote_listener.RemoteListener.md#consumedelayedfeedbacks)
- [executeSlowPollingFeedbacks](client_internal_app_remote_listener.RemoteListener.md#executeslowpollingfeedbacks)
- [getUUID](client_internal_app_remote_listener.RemoteListener.md#getuuid)
- [isAppUpdated](client_internal_app_remote_listener.RemoteListener.md#isappupdated)
- [isOffline](client_internal_app_remote_listener.RemoteListener.md#isoffline)
- [onBuildnumberListened](client_internal_app_remote_listener.RemoteListener.md#onbuildnumberlistened)
- [onChangeListened](client_internal_app_remote_listener.RemoteListener.md#onchangelistened)
- [onConnect](client_internal_app_remote_listener.RemoteListener.md#onconnect)
- [onDisconnect](client_internal_app_remote_listener.RemoteListener.md#ondisconnect)
- [onError](client_internal_app_remote_listener.RemoteListener.md#onerror)
- [onIdentificationDone](client_internal_app_remote_listener.RemoteListener.md#onidentificationdone)
- [onKicked](client_internal_app_remote_listener.RemoteListener.md#onkicked)
- [onOwnedParentedSearchRecordsEvent](client_internal_app_remote_listener.RemoteListener.md#onownedparentedsearchrecordsevent)
- [onOwnedSearchRecordsEvent](client_internal_app_remote_listener.RemoteListener.md#onownedsearchrecordsevent)
- [onParentedSearchRecordsEvent](client_internal_app_remote_listener.RemoteListener.md#onparentedsearchrecordsevent)
- [onPropertySearchRecordsEvent](client_internal_app_remote_listener.RemoteListener.md#onpropertysearchrecordsevent)
- [pushTestingInfo](client_internal_app_remote_listener.RemoteListener.md#pushtestinginfo)
- [removeAppUpdatedListener](client_internal_app_remote_listener.RemoteListener.md#removeappupdatedlistener)
- [removeConnectStatusListener](client_internal_app_remote_listener.RemoteListener.md#removeconnectstatuslistener)
- [removeItemDefinitionListenerFor](client_internal_app_remote_listener.RemoteListener.md#removeitemdefinitionlistenerfor)
- [removeOnConnectOnceListener](client_internal_app_remote_listener.RemoteListener.md#removeonconnectoncelistener)
- [removeOwnedParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#removeownedparentedsearchlistenerfor)
- [removeOwnedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#removeownedsearchlistenerfor)
- [removeParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#removeparentedsearchlistenerfor)
- [removePropertySearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#removepropertysearchlistenerfor)
- [requestFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestfeedbackfor)
- [requestOwnedParentedSearchFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestownedparentedsearchfeedbackfor)
- [requestOwnedSearchFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestownedsearchfeedbackfor)
- [requestParentedSearchFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestparentedsearchfeedbackfor)
- [requestPropertySearchFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestpropertysearchfeedbackfor)
- [setCurrencyFactorsHandler](client_internal_app_remote_listener.RemoteListener.md#setcurrencyfactorshandler)
- [setLogoutHandler](client_internal_app_remote_listener.RemoteListener.md#setlogouthandler)
- [setToken](client_internal_app_remote_listener.RemoteListener.md#settoken)
- [triggerCurrencyFactorsHandler](client_internal_app_remote_listener.RemoteListener.md#triggercurrencyfactorshandler)

## Constructors

### constructor

• **new RemoteListener**(`root`): [`RemoteListener`](client_internal_app_remote_listener.RemoteListener.md)

Instantiates a new remote listener

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`default`](base_Root.default.md) | the root we are using for it |

#### Returns

[`RemoteListener`](client_internal_app_remote_listener.RemoteListener.md)

#### Defined in

[client/internal/app/remote-listener.ts:353](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L353)

## Properties

### appUpdatedListeners

• `Private` **appUpdatedListeners**: () => `void`[] = `[]`

Listeners for the app updated changes, when a buildnumber
event is received

#### Defined in

[client/internal/app/remote-listener.ts:300](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L300)

___

### awaitingOwnedParentedSearchRequests

• `Private` **awaitingOwnedParentedSearchRequests**: [`IOwnedParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md)[] = `[]`

#### Defined in

[client/internal/app/remote-listener.ts:113](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L113)

___

### awaitingOwnedSearchRequests

• `Private` **awaitingOwnedSearchRequests**: [`IOwnedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedSearchFeedbackRequest.md)[] = `[]`

Awaiting search requests to prevent spamming

#### Defined in

[client/internal/app/remote-listener.ts:111](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L111)

___

### awaitingParentedSearchRequests

• `Private` **awaitingParentedSearchRequests**: [`IParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IParentedSearchFeedbackRequest.md)[] = `[]`

#### Defined in

[client/internal/app/remote-listener.ts:112](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L112)

___

### awaitingPropertySearchRequests

• `Private` **awaitingPropertySearchRequests**: [`IPropertySearchFeedbackRequest`](../interfaces/base_remote_protocol.IPropertySearchFeedbackRequest.md)[] = `[]`

#### Defined in

[client/internal/app/remote-listener.ts:114](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L114)

___

### connectionListeners

• `Private` **connectionListeners**: () => `void`[] = `[]`

Listeners for connection change status, offline/online

#### Defined in

[client/internal/app/remote-listener.ts:291](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L291)

___

### connectionOnConnectOnceListeners

• `Private` **connectionOnConnectOnceListeners**: () => `void`[] = `[]`

Listeners for connection change status, offline/online

#### Defined in

[client/internal/app/remote-listener.ts:295](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L295)

___

### currencyFactorsHandler

• `Private` **currencyFactorsHandler**: () => `void`

#### Type declaration

▸ (): `void`

Triggered when the currency factors should be rechecked, the application
sets this function

##### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:343](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L343)

___

### delayedFeedbacks

• `Private` **delayedFeedbacks**: [`IFeedbackRequest`](../interfaces/base_remote_protocol.IFeedbackRequest.md)[] = `[]`

Many instances might request feedback for the
same thing at once, so we delay these feedbacks
a little bit

#### Defined in

[client/internal/app/remote-listener.ts:287](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L287)

___

### hasBeenReadyOnce

• **hasBeenReadyOnce**: `boolean` = `false`

Whether it's been ready at least once

#### Defined in

[client/internal/app/remote-listener.ts:329](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L329)

___

### hasSetToken

• `Private` **hasSetToken**: `boolean` = `false`

whether the identifying token has been set

#### Defined in

[client/internal/app/remote-listener.ts:317](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L317)

___

### isReady

• **isReady**: `boolean` = `false`

Whether it's ready to attach events

#### Defined in

[client/internal/app/remote-listener.ts:325](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L325)

___

### lastRecievedBuildNumber

• `Private` **lastRecievedBuildNumber**: `string`

The last recieved build number, starts by being the current
buildnumber

#### Defined in

[client/internal/app/remote-listener.ts:305](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L305)

___

### listenerCount

• `Private` **listenerCount**: `number` = `0`

Counts how many listeners have been registered

#### Defined in

[client/internal/app/remote-listener.ts:347](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L347)

___

### listeners

• `Private` **listeners**: `Object`

A registry of listeners of which are
listening for changes

#### Index signature

▪ [qualifiedPathNameWithId: `string`]: \{ `parentInstances`: `any`[] ; `pooling`: `boolean` ; `request`: [`IRegisterRequest`](../interfaces/base_remote_protocol.IRegisterRequest.md)  }

The qualified path name with id is the item definition qualified pathname plus the id and
the version, we only need one listener at a time

#### Defined in

[client/internal/app/remote-listener.ts:120](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L120)

___

### logout

• `Private` **logout**: () => `void`

#### Type declaration

▸ (): `void`

The function to trigger on logout
this comes from the current active token provider

##### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:334](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L334)

___

### offline

• `Private` **offline**: `boolean` = `true`

Whether it's currently offline

#### Defined in

[client/internal/app/remote-listener.ts:313](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L313)

___

### ownedParentedSearchListeners

• `Private` **ownedParentedSearchListeners**: `Object`

Registry of listeners that are listening for
changes to a owned+parent based search that updates

#### Index signature

▪ [qualifiedPathNameWithParenting: `string`]: \{ `callbacks`: `RemoteListenerRecordsCallback`[] ; `lastModified`: `string` ; `pooling`: `boolean` ; `request`: [`IOwnedParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchRegisterRequest.md) ; `useCacheWorker`: `boolean`[]  }

Similar to the owned one but contains all the
parenting information of what we are listening to

#### Defined in

[client/internal/app/remote-listener.ts:253](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L253)

___

### ownedSearchListeners

• `Private` **ownedSearchListeners**: `Object`

Registry of listeners that are listening
for changes to an owned search cache

#### Index signature

▪ [qualifiedPathNameWithOwnerId: `string`]: \{ `callbacks`: `RemoteListenerRecordsCallback`[] ; `lastModified`: `string` ; `pooling`: `boolean` ; `request`: [`IOwnedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedSearchRegisterRequest.md) ; `useCacheWorker`: `boolean`[]  }

Similar with the qualified path name of either a item definition
or a module with the owner id attached to it as an identifier

#### Defined in

[client/internal/app/remote-listener.ts:148](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L148)

___

### parentedSearchListeners

• `Private` **parentedSearchListeners**: `Object`

Registry of listeners that are listening for
changes to a parent based search that updates

#### Index signature

▪ [qualifiedPathNameWithParenting: `string`]: \{ `callbacks`: `RemoteListenerRecordsCallback`[] ; `lastModified`: `string` ; `pooling`: `boolean` ; `request`: [`IParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md) ; `useCacheWorker`: `boolean`[]  }

Similar to the owned one but contains all the
parenting information of what we are listening to

#### Defined in

[client/internal/app/remote-listener.ts:220](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L220)

___

### propertySearchListeners

• `Private` **propertySearchListeners**: `Object`

Registry of listeners that are listening
for changes to an property based search cache

#### Index signature

▪ [qualifiedPathNameWithPropertyInfo: `string`]: \{ `callbacks`: `RemoteListenerRecordsCallback`[] ; `lastModified`: `string` ; `pooling`: `boolean` ; `request`: [`IPropertySearchRegisterRequest`](../interfaces/base_remote_protocol.IPropertySearchRegisterRequest.md) ; `useCacheWorker`: `boolean`[]  }

Similar with the qualified path name of either a item definition
or a module with the owner id attached to it as an identifier

#### Defined in

[client/internal/app/remote-listener.ts:184](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L184)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

The root we are using

#### Defined in

[client/internal/app/remote-listener.ts:101](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L101)

___

### setupTime

• `Private` **setupTime**: `number`

The time when this instance was instantiated

#### Defined in

[client/internal/app/remote-listener.ts:338](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L338)

___

### slowPoolingTimer

• `Private` **slowPoolingTimer**: `any`

Time when a last feedback was requested

#### Defined in

[client/internal/app/remote-listener.ts:106](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L106)

___

### socket

• `Private` **socket**: `Socket`

The socket io client

#### Defined in

[client/internal/app/remote-listener.ts:97](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L97)

___

### token

• `Private` **token**: `string` = `null`

The token that has been set

#### Defined in

[client/internal/app/remote-listener.ts:321](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L321)

___

### uuid

• `Private` **uuid**: `string`

An uuid to randomly identify this listener

#### Defined in

[client/internal/app/remote-listener.ts:309](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L309)

## Methods

### addAppUpdatedListener

▸ **addAppUpdatedListener**(`listener`): `void`

Adds a listener for when the app updates (aka buildnumber mismatch)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | () => `void` | the listener to add |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:498](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L498)

___

### addConnectStatusListener

▸ **addConnectStatusListener**(`listener`): `void`

Adds a listener for when the app online status changes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | () => `void` | the listener to add |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:524](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L524)

___

### addItemDefinitionListenerFor

▸ **addItemDefinitionListenerFor**(`parentInstance`, `itemDefinitionQualifiedPathName`, `forId`, `forVersion`, `pooling`): `void`

Adds an item definition listener for when the item definition value changes
so that a reload can be called

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentInstance` | `any` | the parent instance (this will be the item-definition provider that uses it) |
| `itemDefinitionQualifiedPathName` | `string` | the qualifie path name of the item definition |
| `forId` | `string` | for which id |
| `forVersion` | `string` | for which version (null allowed) |
| `pooling` | `boolean` | uses slow pooling to keep for updates |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:637](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L637)

___

### addOnConnectOnceListener

▸ **addOnConnectOnceListener**(`listener`): `void`

Adds a listener for when the app online status changes
to connected, only once

if the listener is currently connected the function will be
called right away

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | () => `void` | the listener to add |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:548](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L548)

___

### addOwnedParentedSearchListenerFor

▸ **addOwnedParentedSearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`, `createdBy`, `parentType`, `parentId`, `parentVersion`, `lastModified`, `callback`, `useCacheWorker`, `pooling`): `void`

Adds a parented and owned search listener for a cached search via parenting

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionOrModuleQualifiedPathName` | `string` | the item definition or module that it refers to |
| `createdBy` | `string` | the creator |
| `parentType` | `string` | the parent type (aka it's item definition qualified name) |
| `parentId` | `string` | the parent id |
| `parentVersion` | `string` | the parent version (or null) |
| `lastModified` | `string` | the last known record date this listener knows of its stored values |
| `callback` | `RemoteListenerRecordsCallback` | the callback to trigger for |
| `useCacheWorker` | `boolean` | - |
| `pooling` | `boolean` | - |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1263](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1263)

___

### addOwnedSearchListenerFor

▸ **addOwnedSearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`, `createdBy`, `lastModified`, `callback`, `useCacheWorker`, `pooling`): `void`

Adds a listener for an owned search

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionOrModuleQualifiedPathName` | `string` | the item definition or module we are listening for search changes |
| `createdBy` | `string` | the creator that triggers this |
| `lastModified` | `string` | the last known record added date |
| `callback` | `RemoteListenerRecordsCallback` | a callback to trigger when the listener matches |
| `useCacheWorker` | `boolean` | - |
| `pooling` | `boolean` | - |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:899](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L899)

___

### addParentedSearchListenerFor

▸ **addParentedSearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`, `parentType`, `parentId`, `parentVersion`, `lastModified`, `callback`, `useCacheWorker`, `pooling`): `void`

Adds a parented search listener for a cached search via parenting

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionOrModuleQualifiedPathName` | `string` | the item definition or module that it refers to |
| `parentType` | `string` | the parent type (aka it's item definition qualified name) |
| `parentId` | `string` | the parent id |
| `parentVersion` | `string` | the parent version (or null) |
| `lastModified` | `string` | the last known record date this listener knows of its stored values |
| `callback` | `RemoteListenerRecordsCallback` | the callback to trigger for |
| `useCacheWorker` | `boolean` | - |
| `pooling` | `boolean` | - |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1195](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1195)

___

### addPropertySearchListenerFor

▸ **addPropertySearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`, `propertyId`, `propertyValue`, `lastModified`, `callback`, `useCacheWorker`, `pooling`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModuleQualifiedPathName` | `string` |
| `propertyId` | `string` |
| `propertyValue` | `string` |
| `lastModified` | `string` |
| `callback` | `RemoteListenerRecordsCallback` |
| `useCacheWorker` | `boolean` |
| `pooling` | `boolean` |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:837](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L837)

___

### attachDetacchedRequests

▸ **attachDetacchedRequests**(): `void`

Reattachs the detached requests

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:2154](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L2154)

___

### attachItemDefinitionListenerFor

▸ **attachItemDefinitionListenerFor**(`request`): `Promise`\<`void`\>

If online will attach an item definition listener for a given
item definition using a register request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IRegisterRequest`](../interfaces/base_remote_protocol.IRegisterRequest.md) | the request to register for |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:688](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L688)

___

### attachOwnedParentedSearchListenerFor

▸ **attachOwnedParentedSearchListenerFor**(`request`): `Promise`\<`void`\>

Attaches the parented seach listener if possible
as in the app is online

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md) | the request to attach |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1351](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1351)

___

### attachOwnedSearchListenerFor

▸ **attachOwnedSearchListenerFor**(`request`): `Promise`\<`void`\>

Attaches if possible the owned search listener for a cached by owner search type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IOwnedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedSearchRegisterRequest.md) | the request to use |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:956](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L956)

___

### attachParentedSearchListenerFor

▸ **attachParentedSearchListenerFor**(`request`): `Promise`\<`void`\>

Attaches the parented seach listener if possible
as in the app is online

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md) | the request to attach |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1328](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1328)

___

### attachPropertySearchListener

▸ **attachPropertySearchListener**(`request`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`IPropertySearchRegisterRequest`](../interfaces/base_remote_protocol.IPropertySearchRegisterRequest.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:973](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L973)

___

### consumeDelayedFeedbacks

▸ **consumeDelayedFeedbacks**(): `Promise`\<`void`\>

Consumes the delayed feedbacks that might exist

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:806](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L806)

___

### executeSlowPollingFeedbacks

▸ **executeSlowPollingFeedbacks**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:2063](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L2063)

___

### getUUID

▸ **getUUID**(): `string`

Provides the remote listener uuid

#### Returns

`string`

#### Defined in

[client/internal/app/remote-listener.ts:482](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L482)

___

### isAppUpdated

▸ **isAppUpdated**(): `boolean`

Checks whether the app is uppdated compared to what we are running right now

#### Returns

`boolean`

#### Defined in

[client/internal/app/remote-listener.ts:516](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L516)

___

### isOffline

▸ **isOffline**(): `boolean`

Specifies whether the remote listener is offline
which also defines whether the app itself is offline

#### Returns

`boolean`

#### Defined in

[client/internal/app/remote-listener.ts:490](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L490)

___

### onBuildnumberListened

▸ **onBuildnumberListened**(`event`): `void`

Triggers when receiving the buildnumber event that specifies
the buildnumber that the server is running in; this event
triggers just on connection, as well as on update

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IBuildNumberEvent`](../interfaces/base_remote_protocol.IBuildNumberEvent.md) | the buildnumber event |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:608](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L608)

___

### onChangeListened

▸ **onChangeListened**(`event`): `void`

Triggers on a changed or a feedback event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IChangedFeedbackEvent`](../interfaces/base_remote_protocol.IChangedFeedbackEvent.md) | the event itself |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1589](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1589)

___

### onConnect

▸ **onConnect**(): `Promise`\<`void`\>

Triggers once the websocket connects

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:2010](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L2010)

___

### onDisconnect

▸ **onDisconnect**(): `void`

Triggers when losing connection

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:2254](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L2254)

___

### onError

▸ **onError**(`event`): `void`

Triggers when the listener recieves
a remote error event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IErrorEvent`](../interfaces/base_remote_protocol.IErrorEvent.md) | the error event |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:583](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L583)

___

### onIdentificationDone

▸ **onIdentificationDone**(): `Promise`\<`void`\>

returns a promise (or immediately) for when the identification
process to identify with the websocket is done

#### Returns

`Promise`\<`void`\>

void or a void promise for when it's done

#### Defined in

[client/internal/app/remote-listener.ts:1978](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1978)

___

### onKicked

▸ **onKicked**(): `void`

Triggers when the current user has been kicked
by a logout all event

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:572](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L572)

___

### onOwnedParentedSearchRecordsEvent

▸ **onOwnedParentedSearchRecordsEvent**(`event`): `Promise`\<`void`\>

Triggers once the server indicates that values have been added to a search
result that is cached by parent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IOwnedParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedParentedSearchRecordsEvent.md) | the parent search records added event |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1903](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1903)

___

### onOwnedSearchRecordsEvent

▸ **onOwnedSearchRecordsEvent**(`event`): `Promise`\<`void`\>

Triggers once the server indicates that values have been added to a search
result that is cached by owner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IOwnedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedSearchRecordsEvent.md) | the owned search event |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1692](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1692)

___

### onParentedSearchRecordsEvent

▸ **onParentedSearchRecordsEvent**(`event`): `Promise`\<`void`\>

Triggers once the server indicates that values have been added to a search
result that is cached by parent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IParentedSearchRecordsEvent.md) | the parent search records added event |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1760](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1760)

___

### onPropertySearchRecordsEvent

▸ **onPropertySearchRecordsEvent**(`event`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IPropertySearchRecordsEvent`](../interfaces/base_remote_protocol.IPropertySearchRecordsEvent.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1831](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1831)

___

### pushTestingInfo

▸ **pushTestingInfo**(`slot`, `data`): `void`

When testing is enable it pushes test information
to the given slot in the socket data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slot` | `string` | the slot to use |
| `data` | `any` | the data we are inserting |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:433](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L433)

___

### removeAppUpdatedListener

▸ **removeAppUpdatedListener**(`listener`): `void`

Removes a listener for when the app updates (aka buildnumber mismatch)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | () => `void` | the listener to remove |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:506](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L506)

___

### removeConnectStatusListener

▸ **removeConnectStatusListener**(`listener`): `void`

Removes a listener for when the app online status changes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | () => `void` | the listener to remove |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:532](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L532)

___

### removeItemDefinitionListenerFor

▸ **removeItemDefinitionListenerFor**(`parentInstance`, `itemDefinitionQualifiedPathName`, `forId`, `forVersion`): `void`

Remove an item definition listener for a given parent instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentInstance` | `any` | the parent instance |
| `itemDefinitionQualifiedPathName` | `string` | the item definition pathname to stop listening for |
| `forId` | `string` | the id |
| `forVersion` | `string` | the version (or null) |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:712](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L712)

___

### removeOnConnectOnceListener

▸ **removeOnConnectOnceListener**(`listener`): `void`

Removes a listener for when the app online status changes
to connected, only once

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | () => `void` | the listener to remove |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:561](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L561)

___

### removeOwnedParentedSearchListenerFor

▸ **removeOwnedParentedSearchListenerFor**(`callback`, `itemDefinitionOrModuleQualifiedPathName`, `createdBy`, `parentType`, `parentId`, `parentVersion`): `void`

Removes an owned parented search feedback listener and its given callback
that is related to

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `RemoteListenerRecordsCallback` | the callback function |
| `itemDefinitionOrModuleQualifiedPathName` | `string` | the item definition or module it's related to |
| `createdBy` | `string` | the creator |
| `parentType` | `string` | parent type (item definition qualified name) information |
| `parentId` | `string` | parent id |
| `parentVersion` | `string` | parent version (or null) |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1439](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1439)

___

### removeOwnedSearchListenerFor

▸ **removeOwnedSearchListenerFor**(`callback`, `itemDefinitionOrModuleQualifiedPathName`, `createdBy`): `void`

Removes an owned search listener

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `RemoteListenerRecordsCallback` | the callback that we are removing for |
| `itemDefinitionOrModuleQualifiedPathName` | `string` | the item definition or module path name |
| `createdBy` | `string` | the created by user namespace |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:996](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L996)

___

### removeParentedSearchListenerFor

▸ **removeParentedSearchListenerFor**(`callback`, `itemDefinitionOrModuleQualifiedPathName`, `parentType`, `parentId`, `parentVersion`): `void`

Removes a parented search feedback listener and its given callback
that is related to

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `RemoteListenerRecordsCallback` | the callback function |
| `itemDefinitionOrModuleQualifiedPathName` | `string` | the item definition or module it's related to |
| `parentType` | `string` | parent type (item definition qualified name) information |
| `parentId` | `string` | parent id |
| `parentVersion` | `string` | parent version (or null) |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1378](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1378)

___

### removePropertySearchListenerFor

▸ **removePropertySearchListenerFor**(`callback`, `itemDefinitionOrModuleQualifiedPathName`, `propertyId`, `propertyValue`): `void`

Removes an property search listener

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `RemoteListenerRecordsCallback` | the callback that we are removing for |
| `itemDefinitionOrModuleQualifiedPathName` | `string` | the item definition or module path name |
| `propertyId` | `string` | the property namespace |
| `propertyValue` | `string` | the property value namespace |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1049](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1049)

___

### requestFeedbackFor

▸ **requestFeedbackFor**(`request`, `immediate?`): `Promise`\<`void`\>

request feedback for an item definitition to check if the value
hasn't somehow changed since it was last checked

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IFeedbackRequest`](../interfaces/base_remote_protocol.IFeedbackRequest.md) | the feedback request |
| `immediate?` | `boolean` | whether to fullfill it immediately |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:768](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L768)

___

### requestOwnedParentedSearchFeedbackFor

▸ **requestOwnedParentedSearchFeedbackFor**(`request`): `Promise`\<`void`\>

Requests feedback for a parented seach, if possible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IOwnedParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md) | the request to trigger |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1542](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1542)

___

### requestOwnedSearchFeedbackFor

▸ **requestOwnedSearchFeedbackFor**(`request`): `Promise`\<`void`\>

Requests feedback for an owned search, if possible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IOwnedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedSearchFeedbackRequest.md) | the feedback request |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1101](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1101)

___

### requestParentedSearchFeedbackFor

▸ **requestParentedSearchFeedbackFor**(`request`): `Promise`\<`void`\>

Requests feedback for a parented seach, if possible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IParentedSearchFeedbackRequest.md) | the request to trigger |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1496](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1496)

___

### requestPropertySearchFeedbackFor

▸ **requestPropertySearchFeedbackFor**(`request`): `Promise`\<`void`\>

Requests feedback for an property based search, if possible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IPropertySearchFeedbackRequest`](../interfaces/base_remote_protocol.IPropertySearchFeedbackRequest.md) | the feedback request |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1145](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L1145)

___

### setCurrencyFactorsHandler

▸ **setCurrencyFactorsHandler**(`handler`): `void`

Sets the currency factor handling function, this should be
done immediately after initialization

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | () => `void` | the handler itself |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:414](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L414)

___

### setLogoutHandler

▸ **setLogoutHandler**(`logout`): `void`

Sets the logout handler, the logout is triggered
if the user has been kicked by a logout all event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logout` | () => `void` | the logout handler |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:423](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L423)

___

### setToken

▸ **setToken**(`token`): `Promise`\<`void`\>

Called when the token changes an allows for
identification as well as re-identification

Makes the app ready

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | the new token to use |

#### Returns

`Promise`\<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:456](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L456)

___

### triggerCurrencyFactorsHandler

▸ **triggerCurrencyFactorsHandler**(): `void`

Triggers the currency factor hanlder
this function is expected to recheck the currency factors
as they might have changed

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:405](https://github.com/onzag/itemize/blob/59702dd5/client/internal/app/remote-listener.ts#L405)
