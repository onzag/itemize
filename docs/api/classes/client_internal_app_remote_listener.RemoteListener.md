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
- [attachDetacchedRequests](client_internal_app_remote_listener.RemoteListener.md#attachdetacchedrequests)
- [attachItemDefinitionListenerFor](client_internal_app_remote_listener.RemoteListener.md#attachitemdefinitionlistenerfor)
- [attachOwnedParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#attachownedparentedsearchlistenerfor)
- [attachOwnedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#attachownedsearchlistenerfor)
- [attachParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#attachparentedsearchlistenerfor)
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
- [pushTestingInfo](client_internal_app_remote_listener.RemoteListener.md#pushtestinginfo)
- [removeAppUpdatedListener](client_internal_app_remote_listener.RemoteListener.md#removeappupdatedlistener)
- [removeConnectStatusListener](client_internal_app_remote_listener.RemoteListener.md#removeconnectstatuslistener)
- [removeItemDefinitionListenerFor](client_internal_app_remote_listener.RemoteListener.md#removeitemdefinitionlistenerfor)
- [removeOwnedParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#removeownedparentedsearchlistenerfor)
- [removeOwnedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#removeownedsearchlistenerfor)
- [removeParentedSearchListenerFor](client_internal_app_remote_listener.RemoteListener.md#removeparentedsearchlistenerfor)
- [requestFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestfeedbackfor)
- [requestOwnedParentedSearchFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestownedparentedsearchfeedbackfor)
- [requestOwnedSearchFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestownedsearchfeedbackfor)
- [requestParentedSearchFeedbackFor](client_internal_app_remote_listener.RemoteListener.md#requestparentedsearchfeedbackfor)
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

[client/internal/app/remote-listener.ts:263](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L263)

## Properties

### appUpdatedListeners

• `Private` **appUpdatedListeners**: () => `void`[] = `[]`

Listeners for the app updated changes, when a buildnumber
event is received

#### Defined in

[client/internal/app/remote-listener.ts:214](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L214)

___

### connectionListeners

• `Private` **connectionListeners**: () => `void`[] = `[]`

Listeners for connection change status, offline/online

#### Defined in

[client/internal/app/remote-listener.ts:209](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L209)

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

[client/internal/app/remote-listener.ts:253](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L253)

___

### delayedFeedbacks

• `Private` **delayedFeedbacks**: [`IFeedbackRequest`](../interfaces/base_remote_protocol.IFeedbackRequest.md)[] = `[]`

Many instances might request feedback for the
same thing at once, so we delay these feedbacks
a little bit

#### Defined in

[client/internal/app/remote-listener.ts:205](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L205)

___

### hasSetToken

• `Private` **hasSetToken**: `boolean` = `false`

whether the identifying token has been set

#### Defined in

[client/internal/app/remote-listener.ts:231](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L231)

___

### isReady

• `Private` **isReady**: `boolean` = `false`

Whether it's ready to attach events

#### Defined in

[client/internal/app/remote-listener.ts:239](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L239)

___

### lastRecievedBuildNumber

• `Private` **lastRecievedBuildNumber**: `string`

The last recieved build number, starts by being the current
buildnumber

#### Defined in

[client/internal/app/remote-listener.ts:219](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L219)

___

### listenerCount

• `Private` **listenerCount**: `number` = `0`

Counts how many listeners have been registered

#### Defined in

[client/internal/app/remote-listener.ts:257](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L257)

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

[client/internal/app/remote-listener.ts:90](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L90)

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

[client/internal/app/remote-listener.ts:244](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L244)

___

### offline

• `Private` **offline**: `boolean` = `true`

Whether it's currently offline

#### Defined in

[client/internal/app/remote-listener.ts:227](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L227)

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

[client/internal/app/remote-listener.ts:175](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L175)

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

[client/internal/app/remote-listener.ts:114](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L114)

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

[client/internal/app/remote-listener.ts:146](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L146)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

The root we are using

#### Defined in

[client/internal/app/remote-listener.ts:84](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L84)

___

### setupTime

• `Private` **setupTime**: `number`

The time when this instance was instantiated

#### Defined in

[client/internal/app/remote-listener.ts:248](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L248)

___

### socket

• `Private` **socket**: `Socket`

The socket io client

#### Defined in

[client/internal/app/remote-listener.ts:80](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L80)

___

### token

• `Private` **token**: `string` = `null`

The token that has been set

#### Defined in

[client/internal/app/remote-listener.ts:235](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L235)

___

### uuid

• `Private` **uuid**: `string`

An uuid to randomly identify this listener

#### Defined in

[client/internal/app/remote-listener.ts:223](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L223)

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

[client/internal/app/remote-listener.ts:399](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L399)

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

[client/internal/app/remote-listener.ts:425](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L425)

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

[client/internal/app/remote-listener.ts:504](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L504)

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

[client/internal/app/remote-listener.ts:910](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L910)

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

[client/internal/app/remote-listener.ts:703](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L703)

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

[client/internal/app/remote-listener.ts:851](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L851)

___

### attachDetacchedRequests

▸ `Private` **attachDetacchedRequests**(): `void`

Reattachs the detached requests

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1536](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1536)

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

[client/internal/app/remote-listener.ts:547](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L547)

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

[client/internal/app/remote-listener.ts:989](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L989)

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

[client/internal/app/remote-listener.ts:751](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L751)

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

[client/internal/app/remote-listener.ts:966](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L966)

___

### consumeDelayedFeedbacks

▸ `Private` **consumeDelayedFeedbacks**(): `Promise`<`void`\>

Consumes the delayed feedbacks that might exist

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:665](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L665)

___

### getUUID

▸ **getUUID**(): `string`

Provides the remote listener uuid

#### Returns

`string`

#### Defined in

[client/internal/app/remote-listener.ts:383](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L383)

___

### isAppUpdated

▸ **isAppUpdated**(): `boolean`

Checks whether the app is uppdated compared to what we are running right now

#### Returns

`boolean`

#### Defined in

[client/internal/app/remote-listener.ts:417](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L417)

___

### isOffline

▸ **isOffline**(): `boolean`

Specifies whether the remote listener is offline
which also defines whether the app itself is offline

#### Returns

`boolean`

#### Defined in

[client/internal/app/remote-listener.ts:391](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L391)

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

[client/internal/app/remote-listener.ts:480](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L480)

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

[client/internal/app/remote-listener.ts:1178](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1178)

___

### onConnect

▸ `Private` **onConnect**(): `Promise`<`void`\>

Triggers once the websocket connects

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/app/remote-listener.ts:1489](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1489)

___

### onDisconnect

▸ `Private` **onDisconnect**(): `void`

Triggers when losing connection

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:1613](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1613)

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

[client/internal/app/remote-listener.ts:455](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L455)

___

### onIdentificationDone

▸ `Private` **onIdentificationDone**(): `Promise`<`void`\>

returns a promise (or immediately) for when the identification
process to identify with the websocket is done

#### Returns

`Promise`<`void`\>

void or a void promise for when it's done

#### Defined in

[client/internal/app/remote-listener.ts:1457](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1457)

___

### onKicked

▸ **onKicked**(): `void`

Triggers when the current user has been kicked
by a logout all event

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:444](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L444)

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

[client/internal/app/remote-listener.ts:1398](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1398)

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

[client/internal/app/remote-listener.ts:1281](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1281)

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

[client/internal/app/remote-listener.ts:1339](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1339)

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

[client/internal/app/remote-listener.ts:335](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L335)

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

[client/internal/app/remote-listener.ts:407](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L407)

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

[client/internal/app/remote-listener.ts:433](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L433)

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

[client/internal/app/remote-listener.ts:571](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L571)

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

[client/internal/app/remote-listener.ts:1077](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1077)

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

[client/internal/app/remote-listener.ts:774](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L774)

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

[client/internal/app/remote-listener.ts:1016](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1016)

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

[client/internal/app/remote-listener.ts:627](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L627)

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

[client/internal/app/remote-listener.ts:1156](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1156)

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

[client/internal/app/remote-listener.ts:824](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L824)

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

[client/internal/app/remote-listener.ts:1134](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L1134)

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

[client/internal/app/remote-listener.ts:316](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L316)

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

[client/internal/app/remote-listener.ts:325](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L325)

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

[client/internal/app/remote-listener.ts:358](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L358)

___

### triggerCurrencyFactorsHandler

▸ **triggerCurrencyFactorsHandler**(): `void`

Triggers the currency factor hanlder
this function is expected to recheck the currency factors
as they might have changed

#### Returns

`void`

#### Defined in

[client/internal/app/remote-listener.ts:307](https://github.com/onzag/itemize/blob/f2f29986/client/internal/app/remote-listener.ts#L307)
