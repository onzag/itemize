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
- [connectionListeners](client_internal_app_remote_listener.RemoteListener.md#connectionlisteners)
- [currencyFactorsHandler](client_internal_app_remote_listener.RemoteListener.md#currencyfactorshandler)
- [delayedFeedbacks](client_internal_app_remote_listener.RemoteListener.md#delayedfeedbacks)
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
- [socket](client_internal_app_remote_listener.RemoteListener.md#socket)
- [token](client_internal_app_remote_listener.RemoteListener.md#token)
- [uuid](client_internal_app_remote_listener.RemoteListener.md#uuid)

### Methods

- [addAppUpdatedListener](client_internal_app_remote_listener.RemoteListener.md#addappupdatedlistener)
- [addConnectStatusListener](client_internal_app_remote_listener.RemoteListener.md#addconnectstatuslistener)
- [addItemDefinitionListenerFor](client_internal_app_remote_listener.RemoteListener.md#additemdefinitionlistenerfor)
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

• **new RemoteListener**(`root`)

Instantiates a new remote listener

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`default`](base_Root.default.md) | the root we are using for it |

#### Defined in

[client/internal/app/remote-listener.ts:305](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L305)

## Properties

### appUpdatedListeners

• `Private` **appUpdatedListeners**: () => `void`[] = `[]`

Listeners for the app updated changes, when a buildnumber
event is received

#### Defined in

[client/internal/app/remote-listener.ts:256](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L256)

___

### connectionListeners

• `Private` **connectionListeners**: () => `void`[] = `[]`

Listeners for connection change status, offline/online

#### Defined in

[client/internal/app/remote-listener.ts:251](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L251)

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

[client/internal/app/remote-listener.ts:295](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L295)

___

### delayedFeedbacks

• `Private` **delayedFeedbacks**: [`IFeedbackRequest`](../interfaces/base_remote_protocol.IFeedbackRequest.md)[] = `[]`

Many instances might request feedback for the
same thing at once, so we delay these feedbacks
a little bit

#### Defined in

[client/internal/app/remote-listener.ts:247](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L247)

___

### hasSetToken

• `Private` **hasSetToken**: `boolean` = `false`

whether the identifying token has been set

#### Defined in

[client/internal/app/remote-listener.ts:273](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L273)

___

### isReady

• `Private` **isReady**: `boolean` = `false`

Whether it's ready to attach events

#### Defined in

[client/internal/app/remote-listener.ts:281](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L281)

___

### lastRecievedBuildNumber

• `Private` **lastRecievedBuildNumber**: `string`

The last recieved build number, starts by being the current
buildnumber

#### Defined in

[client/internal/app/remote-listener.ts:261](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L261)

___

### listenerCount

• `Private` **listenerCount**: `number` = `0`

Counts how many listeners have been registered

#### Defined in

[client/internal/app/remote-listener.ts:299](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L299)

___

### listeners

• `Private` **listeners**: `Object`

A registry of listeners of which are
listening for changes

#### Index signature

▪ [qualifiedPathNameWithId: `string`]: { `parentInstances`: `any`[] ; `request`: [`IRegisterRequest`](../interfaces/base_remote_protocol.IRegisterRequest.md)  }

The qualified path name with id is the item definition qualified pathname plus the id and
the version, we only need one listener at a time

#### Defined in

[client/internal/app/remote-listener.ts:100](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L100)

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

[client/internal/app/remote-listener.ts:286](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L286)

___

### offline

• `Private` **offline**: `boolean` = `true`

Whether it's currently offline

#### Defined in

[client/internal/app/remote-listener.ts:269](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L269)

___

### ownedParentedSearchListeners

• `Private` **ownedParentedSearchListeners**: `Object`

Registry of listeners that are listening for
changes to a owned+parent based search that updates

#### Index signature

▪ [qualifiedPathNameWithParenting: `string`]: { `callbacks`: `RemoteListenerRecordsCallback`[] ; `lastModified`: `string` ; `request`: [`IOwnedParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchRegisterRequest.md) ; `useCacheWorker`: `boolean`[]  }

Similar to the owned one but contains all the
parenting information of what we are listening to

#### Defined in

[client/internal/app/remote-listener.ts:217](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L217)

___

### ownedSearchListeners

• `Private` **ownedSearchListeners**: `Object`

Registry of listeners that are listening
for changes to an owned search cache

#### Index signature

▪ [qualifiedPathNameWithOwnerId: `string`]: { `callbacks`: `RemoteListenerRecordsCallback`[] ; `lastModified`: `string` ; `request`: [`IOwnedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedSearchRegisterRequest.md) ; `useCacheWorker`: `boolean`[]  }

Similar with the qualified path name of either a item definition
or a module with the owner id attached to it as an identifier

#### Defined in

[client/internal/app/remote-listener.ts:124](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L124)

___

### parentedSearchListeners

• `Private` **parentedSearchListeners**: `Object`

Registry of listeners that are listening for
changes to a parent based search that updates

#### Index signature

▪ [qualifiedPathNameWithParenting: `string`]: { `callbacks`: `RemoteListenerRecordsCallback`[] ; `lastModified`: `string` ; `request`: [`IParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md) ; `useCacheWorker`: `boolean`[]  }

Similar to the owned one but contains all the
parenting information of what we are listening to

#### Defined in

[client/internal/app/remote-listener.ts:188](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L188)

___

### propertySearchListeners

• `Private` **propertySearchListeners**: `Object`

Registry of listeners that are listening
for changes to an property based search cache

#### Index signature

▪ [qualifiedPathNameWithPropertyInfo: `string`]: { `callbacks`: `RemoteListenerRecordsCallback`[] ; `lastModified`: `string` ; `request`: [`IPropertySearchRegisterRequest`](../interfaces/base_remote_protocol.IPropertySearchRegisterRequest.md) ; `useCacheWorker`: `boolean`[]  }

Similar with the qualified path name of either a item definition
or a module with the owner id attached to it as an identifier

#### Defined in

[client/internal/app/remote-listener.ts:156](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L156)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

The root we are using

#### Defined in

[client/internal/app/remote-listener.ts:94](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L94)

___

### setupTime

• `Private` **setupTime**: `number`

The time when this instance was instantiated

#### Defined in

[client/internal/app/remote-listener.ts:290](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L290)

___

### socket

• `Private` **socket**: `Socket`

The socket io client

#### Defined in

[client/internal/app/remote-listener.ts:90](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L90)

___

### token

• `Private` **token**: `string` = `null`

The token that has been set

#### Defined in

[client/internal/app/remote-listener.ts:277](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L277)

___

### uuid

• `Private` **uuid**: `string`

An uuid to randomly identify this listener

#### Defined in

[client/internal/app/remote-listener.ts:265](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L265)

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

[client/internal/app/remote-listener.ts:447](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L447)

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

[client/internal/app/remote-listener.ts:473](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L473)

___

### addItemDefinitionListenerFor

▸ **addItemDefinitionListenerFor**(`parentInstance`, `itemDefinitionQualifiedPathName`, `forId`, `forVersion`): `void`

Adds an item definition listener for when the item definition value changes
so that a reload can be called

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentInstance` | `any` | the parent instance (this will be the item-definition provider that uses it) |
| `itemDefinitionQualifiedPathName` | `string` | the qualifie path name of the item definition |
| `forId` | `string` | for which id |
| `forVersion` | `string` | for which version (null allowed) |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:556](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L556)

___

### addOwnedParentedSearchListenerFor

▸ **addOwnedParentedSearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`, `createdBy`, `parentType`, `parentId`, `parentVersion`, `lastModified`, `callback`, `useCacheWorker`): `void`

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

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1102](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1102)

___

### addOwnedSearchListenerFor

▸ **addOwnedSearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`, `createdBy`, `lastModified`, `callback`, `useCacheWorker`): `void`

Adds a listener for an owned search

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionOrModuleQualifiedPathName` | `string` | the item definition or module we are listening for search changes |
| `createdBy` | `string` | the creator that triggers this |
| `lastModified` | `string` | the last known record added date |
| `callback` | `RemoteListenerRecordsCallback` | a callback to trigger when the listener matches |
| `useCacheWorker` | `boolean` | - |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:801](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L801)

___

### addParentedSearchListenerFor

▸ **addParentedSearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`, `parentType`, `parentId`, `parentVersion`, `lastModified`, `callback`, `useCacheWorker`): `void`

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

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1043](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1043)

___

### addPropertySearchListenerFor

▸ **addPropertySearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`, `propertyId`, `propertyValue`, `lastModified`, `callback`, `useCacheWorker`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModuleQualifiedPathName` | `string` |
| `propertyId` | `string` |
| `propertyValue` | `string` |
| `lastModified` | `string` |
| `callback` | `RemoteListenerRecordsCallback` |
| `useCacheWorker` | `boolean` |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:748](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L748)

___

### attachDetacchedRequests

▸ `Private` **attachDetacchedRequests**(): `void`

Reattachs the detached requests

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1795](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1795)

___

### attachItemDefinitionListenerFor

▸ **attachItemDefinitionListenerFor**(`request`): `Promise`<`void`\>

If online will attach an item definition listener for a given
item definition using a register request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IRegisterRequest`](../interfaces/base_remote_protocol.IRegisterRequest.md) | the request to register for |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:599](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L599)

___

### attachOwnedParentedSearchListenerFor

▸ **attachOwnedParentedSearchListenerFor**(`request`): `Promise`<`void`\>

Attaches the parented seach listener if possible
as in the app is online

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md) | the request to attach |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1181](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1181)

___

### attachOwnedSearchListenerFor

▸ **attachOwnedSearchListenerFor**(`request`): `Promise`<`void`\>

Attaches if possible the owned search listener for a cached by owner search type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IOwnedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedSearchRegisterRequest.md) | the request to use |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:849](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L849)

___

### attachParentedSearchListenerFor

▸ **attachParentedSearchListenerFor**(`request`): `Promise`<`void`\>

Attaches the parented seach listener if possible
as in the app is online

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md) | the request to attach |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1158](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1158)

___

### attachPropertySearchListener

▸ **attachPropertySearchListener**(`request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`IPropertySearchRegisterRequest`](../interfaces/base_remote_protocol.IPropertySearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:866](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L866)

___

### consumeDelayedFeedbacks

▸ `Private` **consumeDelayedFeedbacks**(): `Promise`<`void`\>

Consumes the delayed feedbacks that might exist

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:717](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L717)

___

### getUUID

▸ **getUUID**(): `string`

Provides the remote listener uuid

#### Returns

`string`

#### Defined in

[client/internal/app/remote-listener.ts:431](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L431)

___

### isAppUpdated

▸ **isAppUpdated**(): `boolean`

Checks whether the app is uppdated compared to what we are running right now

#### Returns

`boolean`

#### Defined in

[client/internal/app/remote-listener.ts:465](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L465)

___

### isOffline

▸ **isOffline**(): `boolean`

Specifies whether the remote listener is offline
which also defines whether the app itself is offline

#### Returns

`boolean`

#### Defined in

[client/internal/app/remote-listener.ts:439](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L439)

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

[client/internal/app/remote-listener.ts:528](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L528)

___

### onChangeListened

▸ `Private` **onChangeListened**(`event`): `void`

Triggers on a changed or a feedback event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IChangedFeedbackEvent`](../interfaces/base_remote_protocol.IChangedFeedbackEvent.md) | the event itself |

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1370](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1370)

___

### onConnect

▸ `Private` **onConnect**(): `Promise`<`void`\>

Triggers once the websocket connects

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1744](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1744)

___

### onDisconnect

▸ `Private` **onDisconnect**(): `void`

Triggers when losing connection

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1885](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1885)

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

[client/internal/app/remote-listener.ts:503](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L503)

___

### onIdentificationDone

▸ `Private` **onIdentificationDone**(): `Promise`<`void`\>

returns a promise (or immediately) for when the identification
process to identify with the websocket is done

#### Returns

`Promise`<`void`\>

void or a void promise for when it's done

#### Defined in

[client/internal/app/remote-listener.ts:1712](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1712)

___

### onKicked

▸ **onKicked**(): `void`

Triggers when the current user has been kicked
by a logout all event

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:492](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L492)

___

### onOwnedParentedSearchRecordsEvent

▸ `Private` **onOwnedParentedSearchRecordsEvent**(`event`): `Promise`<`void`\>

Triggers once the server indicates that values have been added to a search
result that is cached by parent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IOwnedParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedParentedSearchRecordsEvent.md) | the parent search records added event |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1651](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1651)

___

### onOwnedSearchRecordsEvent

▸ `Private` **onOwnedSearchRecordsEvent**(`event`): `Promise`<`void`\>

Triggers once the server indicates that values have been added to a search
result that is cached by owner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IOwnedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedSearchRecordsEvent.md) | the owned search event |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1473](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1473)

___

### onParentedSearchRecordsEvent

▸ `Private` **onParentedSearchRecordsEvent**(`event`): `Promise`<`void`\>

Triggers once the server indicates that values have been added to a search
result that is cached by parent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`IParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IParentedSearchRecordsEvent.md) | the parent search records added event |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1533](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1533)

___

### onPropertySearchRecordsEvent

▸ `Private` **onPropertySearchRecordsEvent**(`event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IPropertySearchRecordsEvent`](../interfaces/base_remote_protocol.IPropertySearchRecordsEvent.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1591](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1591)

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

[client/internal/app/remote-listener.ts:383](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L383)

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

[client/internal/app/remote-listener.ts:455](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L455)

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

[client/internal/app/remote-listener.ts:481](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L481)

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

[client/internal/app/remote-listener.ts:623](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L623)

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

[client/internal/app/remote-listener.ts:1269](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1269)

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

[client/internal/app/remote-listener.ts:889](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L889)

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

[client/internal/app/remote-listener.ts:1208](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1208)

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

[client/internal/app/remote-listener.ts:942](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L942)

___

### requestFeedbackFor

▸ **requestFeedbackFor**(`request`, `immediate?`): `Promise`<`void`\>

request feedback for an item definitition to check if the value
hasn't somehow changed since it was last checked

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IFeedbackRequest`](../interfaces/base_remote_protocol.IFeedbackRequest.md) | the feedback request |
| `immediate?` | `boolean` | whether to fullfill it immediately |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:679](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L679)

___

### requestOwnedParentedSearchFeedbackFor

▸ **requestOwnedParentedSearchFeedbackFor**(`request`): `Promise`<`void`\>

Requests feedback for a parented seach, if possible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IOwnedParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md) | the request to trigger |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1348](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1348)

___

### requestOwnedSearchFeedbackFor

▸ **requestOwnedSearchFeedbackFor**(`request`): `Promise`<`void`\>

Requests feedback for an owned search, if possible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IOwnedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedSearchFeedbackRequest.md) | the feedback request |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:994](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L994)

___

### requestParentedSearchFeedbackFor

▸ **requestParentedSearchFeedbackFor**(`request`): `Promise`<`void`\>

Requests feedback for a parented seach, if possible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IParentedSearchFeedbackRequest.md) | the request to trigger |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1326](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1326)

___

### requestPropertySearchFeedbackFor

▸ **requestPropertySearchFeedbackFor**(`request`): `Promise`<`void`\>

Requests feedback for an property based search, if possible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IPropertySearchFeedbackRequest`](../interfaces/base_remote_protocol.IPropertySearchFeedbackRequest.md) | the feedback request |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1016](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L1016)

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

[client/internal/app/remote-listener.ts:364](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L364)

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

[client/internal/app/remote-listener.ts:373](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L373)

___

### setToken

▸ **setToken**(`token`): `Promise`<`void`\>

Called when the token changes an allows for
identification as well as re-identification

Makes the app ready

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | the new token to use |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:406](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L406)

___

### triggerCurrencyFactorsHandler

▸ **triggerCurrencyFactorsHandler**(): `void`

Triggers the currency factor hanlder
this function is expected to recheck the currency factors
as they might have changed

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:355](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L355)
