[](../README.md) / [Exports](../modules.md) / [client/internal/app/remote-listener](../modules/client_internal_app_remote_listener.md) / RemoteListener

# Class: RemoteListener

[client/internal/app/remote-listener](../modules/client_internal_app_remote_listener.md).RemoteListener

The remote listener class creates a websocket connection (as well as it falling back to polling)
for usage with the application to listen for changes to item definitions, request feedback as well
as to keep things up to date and reactive

## Table of contents

### Constructors

- [constructor](client_internal_app_remote_listener.remotelistener.md#constructor)

### Properties

- [appUpdatedListeners](client_internal_app_remote_listener.remotelistener.md#appupdatedlisteners)
- [connectionListeners](client_internal_app_remote_listener.remotelistener.md#connectionlisteners)
- [currencyFactorsHandler](client_internal_app_remote_listener.remotelistener.md#currencyfactorshandler)
- [delayedFeedbacks](client_internal_app_remote_listener.remotelistener.md#delayedfeedbacks)
- [hasSetToken](client_internal_app_remote_listener.remotelistener.md#hassettoken)
- [isReady](client_internal_app_remote_listener.remotelistener.md#isready)
- [lastRecievedBuildNumber](client_internal_app_remote_listener.remotelistener.md#lastrecievedbuildnumber)
- [listeners](client_internal_app_remote_listener.remotelistener.md#listeners)
- [logout](client_internal_app_remote_listener.remotelistener.md#logout)
- [offline](client_internal_app_remote_listener.remotelistener.md#offline)
- [ownedSearchListeners](client_internal_app_remote_listener.remotelistener.md#ownedsearchlisteners)
- [parentedSearchListeners](client_internal_app_remote_listener.remotelistener.md#parentedsearchlisteners)
- [root](client_internal_app_remote_listener.remotelistener.md#root)
- [setupTime](client_internal_app_remote_listener.remotelistener.md#setuptime)
- [socket](client_internal_app_remote_listener.remotelistener.md#socket)
- [token](client_internal_app_remote_listener.remotelistener.md#token)
- [uuid](client_internal_app_remote_listener.remotelistener.md#uuid)

### Methods

- [addAppUpdatedListener](client_internal_app_remote_listener.remotelistener.md#addappupdatedlistener)
- [addConnectStatusListener](client_internal_app_remote_listener.remotelistener.md#addconnectstatuslistener)
- [addItemDefinitionListenerFor](client_internal_app_remote_listener.remotelistener.md#additemdefinitionlistenerfor)
- [addOwnedSearchListenerFor](client_internal_app_remote_listener.remotelistener.md#addownedsearchlistenerfor)
- [addParentedSearchListenerFor](client_internal_app_remote_listener.remotelistener.md#addparentedsearchlistenerfor)
- [attachDetacchedRequests](client_internal_app_remote_listener.remotelistener.md#attachdetacchedrequests)
- [attachItemDefinitionListenerFor](client_internal_app_remote_listener.remotelistener.md#attachitemdefinitionlistenerfor)
- [attachOwnedSearchListenerFor](client_internal_app_remote_listener.remotelistener.md#attachownedsearchlistenerfor)
- [attachParentedSearchListenerFor](client_internal_app_remote_listener.remotelistener.md#attachparentedsearchlistenerfor)
- [consumeDelayedFeedbacks](client_internal_app_remote_listener.remotelistener.md#consumedelayedfeedbacks)
- [getUUID](client_internal_app_remote_listener.remotelistener.md#getuuid)
- [isAppUpdated](client_internal_app_remote_listener.remotelistener.md#isappupdated)
- [isOffline](client_internal_app_remote_listener.remotelistener.md#isoffline)
- [onBuildnumberListened](client_internal_app_remote_listener.remotelistener.md#onbuildnumberlistened)
- [onChangeListened](client_internal_app_remote_listener.remotelistener.md#onchangelistened)
- [onConnect](client_internal_app_remote_listener.remotelistener.md#onconnect)
- [onDisconnect](client_internal_app_remote_listener.remotelistener.md#ondisconnect)
- [onError](client_internal_app_remote_listener.remotelistener.md#onerror)
- [onIdentificationDone](client_internal_app_remote_listener.remotelistener.md#onidentificationdone)
- [onKicked](client_internal_app_remote_listener.remotelistener.md#onkicked)
- [onOwnedSearchRecordsEvent](client_internal_app_remote_listener.remotelistener.md#onownedsearchrecordsevent)
- [onParentedSearchRecordsEvent](client_internal_app_remote_listener.remotelistener.md#onparentedsearchrecordsevent)
- [pushTestingInfo](client_internal_app_remote_listener.remotelistener.md#pushtestinginfo)
- [removeAppUpdatedListener](client_internal_app_remote_listener.remotelistener.md#removeappupdatedlistener)
- [removeConnectStatusListener](client_internal_app_remote_listener.remotelistener.md#removeconnectstatuslistener)
- [removeItemDefinitionListenerFor](client_internal_app_remote_listener.remotelistener.md#removeitemdefinitionlistenerfor)
- [removeOwnedSearchListenerFor](client_internal_app_remote_listener.remotelistener.md#removeownedsearchlistenerfor)
- [removeParentedSearchListenerFor](client_internal_app_remote_listener.remotelistener.md#removeparentedsearchlistenerfor)
- [requestFeedbackFor](client_internal_app_remote_listener.remotelistener.md#requestfeedbackfor)
- [requestOwnedSearchFeedbackFor](client_internal_app_remote_listener.remotelistener.md#requestownedsearchfeedbackfor)
- [requestParentedSearchFeedbackFor](client_internal_app_remote_listener.remotelistener.md#requestparentedsearchfeedbackfor)
- [setCurrencyFactorsHandler](client_internal_app_remote_listener.remotelistener.md#setcurrencyfactorshandler)
- [setLogoutHandler](client_internal_app_remote_listener.remotelistener.md#setlogouthandler)
- [setToken](client_internal_app_remote_listener.remotelistener.md#settoken)
- [triggerCurrencyFactorsHandler](client_internal_app_remote_listener.remotelistener.md#triggercurrencyfactorshandler)

## Constructors

### constructor

\+ **new RemoteListener**(`root`: [*default*](base_root.default.md)): [*RemoteListener*](client_internal_app_remote_listener.remotelistener.md)

Instantiates a new remote listener

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*default*](base_root.default.md) | the root we are using for it    |

**Returns:** [*RemoteListener*](client_internal_app_remote_listener.remotelistener.md)

Defined in: [client/internal/app/remote-listener.ts:216](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L216)

## Properties

### appUpdatedListeners

• `Private` **appUpdatedListeners**: () => *void*[]

Listeners for the app updated changes, when a buildnumber
event is received

Defined in: [client/internal/app/remote-listener.ts:177](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L177)

___

### connectionListeners

• `Private` **connectionListeners**: () => *void*[]

Listeners for connection change status, offline/online

Defined in: [client/internal/app/remote-listener.ts:172](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L172)

___

### currencyFactorsHandler

• `Private` **currencyFactorsHandler**: () => *void*

Triggered when the currency factors should be rechecked, the application
sets this function

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:216](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L216)

Defined in: [client/internal/app/remote-listener.ts:216](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L216)

___

### delayedFeedbacks

• `Private` **delayedFeedbacks**: [*IFeedbackRequest*](../interfaces/base_remote_protocol.ifeedbackrequest.md)[]

Many instances might request feedback for the
same thing at once, so we delay these feedbacks
a little bit

Defined in: [client/internal/app/remote-listener.ts:168](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L168)

___

### hasSetToken

• `Private` **hasSetToken**: *boolean*= false

whether the identifying token has been set

Defined in: [client/internal/app/remote-listener.ts:194](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L194)

___

### isReady

• `Private` **isReady**: *boolean*= false

Whether it's ready to attach events

Defined in: [client/internal/app/remote-listener.ts:202](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L202)

___

### lastRecievedBuildNumber

• `Private` **lastRecievedBuildNumber**: *string*

The last recieved build number, starts by being the current
buildnumber

Defined in: [client/internal/app/remote-listener.ts:182](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L182)

___

### listeners

• `Private` **listeners**: *object*

A registry of listeners of which are
listening for changes

#### Type declaration:

Defined in: [client/internal/app/remote-listener.ts:82](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L82)

___

### logout

• `Private` **logout**: () => *void*

The function to trigger on logout
this comes from the current active token provider

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:207](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L207)

Defined in: [client/internal/app/remote-listener.ts:207](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L207)

___

### offline

• `Private` **offline**: *boolean*= true

Whether it's currently offline

Defined in: [client/internal/app/remote-listener.ts:190](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L190)

___

### ownedSearchListeners

• `Private` **ownedSearchListeners**: *object*

Registry of listeners that are listening
for changes to an owned search cache

#### Type declaration:

Defined in: [client/internal/app/remote-listener.ts:106](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L106)

___

### parentedSearchListeners

• `Private` **parentedSearchListeners**: *object*

Registry of listeners that are listening for
changes to a parent based search that updates

#### Type declaration:

Defined in: [client/internal/app/remote-listener.ts:138](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L138)

___

### root

• `Private` **root**: [*default*](base_root.default.md)

The root we are using

Defined in: [client/internal/app/remote-listener.ts:76](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L76)

___

### setupTime

• `Private` **setupTime**: *number*

The time when this instance was instantiated

Defined in: [client/internal/app/remote-listener.ts:211](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L211)

___

### socket

• `Private` **socket**: Socket

The socket io client

Defined in: [client/internal/app/remote-listener.ts:72](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L72)

___

### token

• `Private` **token**: *string*= null

The token that has been set

Defined in: [client/internal/app/remote-listener.ts:198](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L198)

___

### uuid

• `Private` **uuid**: *string*

An uuid to randomly identify this listener

Defined in: [client/internal/app/remote-listener.ts:186](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L186)

## Methods

### addAppUpdatedListener

▸ **addAppUpdatedListener**(`listener`: () => *void*): *void*

Adds a listener for when the app updates (aka buildnumber mismatch)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`listener` | () => *void* | the listener to add    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:355](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L355)

___

### addConnectStatusListener

▸ **addConnectStatusListener**(`listener`: () => *void*): *void*

Adds a listener for when the app online status changes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`listener` | () => *void* | the listener to add    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:381](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L381)

___

### addItemDefinitionListenerFor

▸ **addItemDefinitionListenerFor**(`parentInstance`: *any*, `itemDefinitionQualifiedPathName`: *string*, `forId`: *string*, `forVersion`: *string*): *void*

Adds an item definition listener for when the item definition value changes
so that a reload can be called

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parentInstance` | *any* | the parent instance (this will be the item-definition provider that uses it)   |
`itemDefinitionQualifiedPathName` | *string* | the qualifie path name of the item definition   |
`forId` | *string* | for which id   |
`forVersion` | *string* | for which version (null allowed)    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:460](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L460)

___

### addOwnedSearchListenerFor

▸ **addOwnedSearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`: *string*, `createdBy`: *string*, `lastModified`: *string*, `callback`: RemoteListenerRecordsCallback, `useCacheWorker`: *boolean*): *void*

Adds a listener for an owned search

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinitionOrModuleQualifiedPathName` | *string* | the item definition or module we are listening for search changes   |
`createdBy` | *string* | the creator that triggers this   |
`lastModified` | *string* | the last known record added date   |
`callback` | RemoteListenerRecordsCallback | a callback to trigger when the listener matches    |
`useCacheWorker` | *boolean* | - |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:656](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L656)

___

### addParentedSearchListenerFor

▸ **addParentedSearchListenerFor**(`itemDefinitionOrModuleQualifiedPathName`: *string*, `parentType`: *string*, `parentId`: *string*, `parentVersion`: *string*, `lastModified`: *string*, `callback`: RemoteListenerRecordsCallback, `useCacheWorker`: *boolean*): *void*

Adds a parented search listener for a cached search via parenting

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinitionOrModuleQualifiedPathName` | *string* | the item definition or module that it refers to   |
`parentType` | *string* | the parent type (aka it's item definition qualified name)   |
`parentId` | *string* | the parent id   |
`parentVersion` | *string* | the parent version (or null)   |
`lastModified` | *string* | the last known record date this listener knows of its stored values   |
`callback` | RemoteListenerRecordsCallback | the callback to trigger for    |
`useCacheWorker` | *boolean* | - |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:801](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L801)

___

### attachDetacchedRequests

▸ `Private`**attachDetacchedRequests**(): *void*

Reattachs the detached requests

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:1257](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L1257)

___

### attachItemDefinitionListenerFor

▸ **attachItemDefinitionListenerFor**(`request`: [*IRegisterRequest*](../interfaces/base_remote_protocol.iregisterrequest.md)): *Promise*<void\>

If online will attach an item definition listener for a given
item definition using a register request

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IRegisterRequest*](../interfaces/base_remote_protocol.iregisterrequest.md) | the request to register for    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:501](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L501)

___

### attachOwnedSearchListenerFor

▸ **attachOwnedSearchListenerFor**(`request`: [*IOwnedSearchRegisterRequest*](../interfaces/base_remote_protocol.iownedsearchregisterrequest.md)): *Promise*<void\>

Attaches if possible the owned search listener for a cached by owner search type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IOwnedSearchRegisterRequest*](../interfaces/base_remote_protocol.iownedsearchregisterrequest.md) | the request to use    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:702](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L702)

___

### attachParentedSearchListenerFor

▸ **attachParentedSearchListenerFor**(`request`: [*IParentedSearchRegisterRequest*](../interfaces/base_remote_protocol.iparentedsearchregisterrequest.md)): *Promise*<void\>

Attaches the parented seach listener if possible
as in the app is online

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IParentedSearchRegisterRequest*](../interfaces/base_remote_protocol.iparentedsearchregisterrequest.md) | the request to attach    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:853](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L853)

___

### consumeDelayedFeedbacks

▸ `Private`**consumeDelayedFeedbacks**(): *Promise*<void\>

Consumes the delayed feedbacks that might exist

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:618](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L618)

___

### getUUID

▸ **getUUID**(): *string*

Provides the remote listener uuid

**Returns:** *string*

Defined in: [client/internal/app/remote-listener.ts:339](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L339)

___

### isAppUpdated

▸ **isAppUpdated**(): *boolean*

Checks whether the app is uppdated compared to what we are running right now

**Returns:** *boolean*

Defined in: [client/internal/app/remote-listener.ts:373](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L373)

___

### isOffline

▸ **isOffline**(): *boolean*

Specifies whether the remote listener is offline
which also defines whether the app itself is offline

**Returns:** *boolean*

Defined in: [client/internal/app/remote-listener.ts:347](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L347)

___

### onBuildnumberListened

▸ **onBuildnumberListened**(`event`: [*IBuildNumberEvent*](../interfaces/base_remote_protocol.ibuildnumberevent.md)): *void*

Triggers when receiving the buildnumber event that specifies
the buildnumber that the server is running in; this event
triggers just on connection, as well as on update

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | [*IBuildNumberEvent*](../interfaces/base_remote_protocol.ibuildnumberevent.md) | the buildnumber event    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:436](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L436)

___

### onChangeListened

▸ `Private`**onChangeListened**(`event`: [*IChangedFeedbackEvent*](../interfaces/base_remote_protocol.ichangedfeedbackevent.md)): *void*

Triggers on a changed or a feedback event

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | [*IChangedFeedbackEvent*](../interfaces/base_remote_protocol.ichangedfeedbackevent.md) | the event itself    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:958](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L958)

___

### onConnect

▸ `Private`**onConnect**(): *Promise*<void\>

Triggers once the websocket connects

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:1210](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L1210)

___

### onDisconnect

▸ `Private`**onDisconnect**(): *void*

Triggers when losing connection

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:1321](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L1321)

___

### onError

▸ **onError**(`event`: [*IErrorEvent*](../interfaces/base_remote_protocol.ierrorevent.md)): *void*

Triggers when the listener recieves
a remote error event

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | [*IErrorEvent*](../interfaces/base_remote_protocol.ierrorevent.md) | the error event    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:411](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L411)

___

### onIdentificationDone

▸ `Private`**onIdentificationDone**(): *Promise*<void\>

returns a promise (or immediately) for when the identification
process to identify with the websocket is done

**Returns:** *Promise*<void\>

void or a void promise for when it's done

Defined in: [client/internal/app/remote-listener.ts:1178](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L1178)

___

### onKicked

▸ **onKicked**(): *void*

Triggers when the current user has been kicked
by a logout all event

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:400](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L400)

___

### onOwnedSearchRecordsEvent

▸ `Private`**onOwnedSearchRecordsEvent**(`event`: [*IOwnedSearchRecordsEvent*](../interfaces/base_remote_protocol.iownedsearchrecordsevent.md)): *Promise*<void\>

Triggers once the server indicates that values have been added to a search
result that is cached by owner

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | [*IOwnedSearchRecordsEvent*](../interfaces/base_remote_protocol.iownedsearchrecordsevent.md) | the owned search event    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:1061](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L1061)

___

### onParentedSearchRecordsEvent

▸ `Private`**onParentedSearchRecordsEvent**(`event`: [*IParentedSearchRecordsEvent*](../interfaces/base_remote_protocol.iparentedsearchrecordsevent.md)): *Promise*<void\>

Triggers once the server indicates that values have been added to a search
result that is cached by parent

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | [*IParentedSearchRecordsEvent*](../interfaces/base_remote_protocol.iparentedsearchrecordsevent.md) | the parent search records added event    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:1119](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L1119)

___

### pushTestingInfo

▸ **pushTestingInfo**(`slot`: *string*, `data`: *any*): *void*

When testing is enable it pushes test information
to the given slot in the socket data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`slot` | *string* | the slot to use   |
`data` | *any* | the data we are inserting    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:291](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L291)

___

### removeAppUpdatedListener

▸ **removeAppUpdatedListener**(`listener`: () => *void*): *void*

Removes a listener for when the app updates (aka buildnumber mismatch)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`listener` | () => *void* | the listener to remove    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:363](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L363)

___

### removeConnectStatusListener

▸ **removeConnectStatusListener**(`listener`: () => *void*): *void*

Removes a listener for when the app online status changes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`listener` | () => *void* | the listener to remove    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:389](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L389)

___

### removeItemDefinitionListenerFor

▸ **removeItemDefinitionListenerFor**(`parentInstance`: *any*, `itemDefinitionQualifiedPathName`: *string*, `forId`: *string*, `forVersion`: *string*): *void*

Remove an item definition listener for a given parent instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parentInstance` | *any* | the parent instance   |
`itemDefinitionQualifiedPathName` | *string* | the item definition pathname to stop listening for   |
`forId` | *string* | the id   |
`forVersion` | *string* | the version (or null)    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:525](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L525)

___

### removeOwnedSearchListenerFor

▸ **removeOwnedSearchListenerFor**(`callback`: RemoteListenerRecordsCallback, `itemDefinitionOrModuleQualifiedPathName`: *string*, `createdBy`: *string*): *void*

Removes an owned search listener

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`callback` | RemoteListenerRecordsCallback | the callback that we are removing for   |
`itemDefinitionOrModuleQualifiedPathName` | *string* | the item definition or module path name   |
`createdBy` | *string* | the created by user namespace    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:725](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L725)

___

### removeParentedSearchListenerFor

▸ **removeParentedSearchListenerFor**(`callback`: RemoteListenerRecordsCallback, `itemDefinitionOrModuleQualifiedPathName`: *string*, `parentType`: *string*, `parentId`: *string*, `parentVersion`: *string*): *void*

Removes a parented search feedback listener and its given callback
that is related to

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`callback` | RemoteListenerRecordsCallback | the callback function   |
`itemDefinitionOrModuleQualifiedPathName` | *string* | the item definition or module it's related to   |
`parentType` | *string* | parent type (item definition qualified name) information   |
`parentId` | *string* | parent id   |
`parentVersion` | *string* | parent version (or null)    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:880](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L880)

___

### requestFeedbackFor

▸ **requestFeedbackFor**(`request`: [*IFeedbackRequest*](../interfaces/base_remote_protocol.ifeedbackrequest.md), `immediate?`: *boolean*): *Promise*<void\>

request feedback for an item definitition to check if the value
hasn't somehow changed since it was last checked

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IFeedbackRequest*](../interfaces/base_remote_protocol.ifeedbackrequest.md) | the feedback request   |
`immediate?` | *boolean* | whether to fullfill it immediately    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:580](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L580)

___

### requestOwnedSearchFeedbackFor

▸ **requestOwnedSearchFeedbackFor**(`request`: [*IOwnedSearchFeedbackRequest*](../interfaces/base_remote_protocol.iownedsearchfeedbackrequest.md)): *Promise*<void\>

Requests feedback for an owned search, if possible

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IOwnedSearchFeedbackRequest*](../interfaces/base_remote_protocol.iownedsearchfeedbackrequest.md) | the feedback request    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:774](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L774)

___

### requestParentedSearchFeedbackFor

▸ **requestParentedSearchFeedbackFor**(`request`: [*IParentedSearchFeedbackRequest*](../interfaces/base_remote_protocol.iparentedsearchfeedbackrequest.md)): *Promise*<void\>

Requests feedback for a parented seach, if possible

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | [*IParentedSearchFeedbackRequest*](../interfaces/base_remote_protocol.iparentedsearchfeedbackrequest.md) | the request to trigger    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:936](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L936)

___

### setCurrencyFactorsHandler

▸ **setCurrencyFactorsHandler**(`handler`: () => *void*): *void*

Sets the currency factor handling function, this should be
done immediately after initialization

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`handler` | () => *void* | the handler itself    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:272](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L272)

___

### setLogoutHandler

▸ **setLogoutHandler**(`logout`: () => *void*): *void*

Sets the logout handler, the logout is triggered
if the user has been kicked by a logout all event

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`logout` | () => *void* | the logout handler    |

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:281](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L281)

___

### setToken

▸ **setToken**(`token`: *string*): *Promise*<void\>

Called when the token changes an allows for
identification as well as re-identification

Makes the app ready

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | *string* | the new token to use    |

**Returns:** *Promise*<void\>

Defined in: [client/internal/app/remote-listener.ts:314](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L314)

___

### triggerCurrencyFactorsHandler

▸ **triggerCurrencyFactorsHandler**(): *void*

Triggers the currency factor hanlder
this function is expected to recheck the currency factors
as they might have changed

**Returns:** *void*

Defined in: [client/internal/app/remote-listener.ts:263](https://github.com/onzag/itemize/blob/11a98dec/client/internal/app/remote-listener.ts#L263)
