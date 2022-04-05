[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/listener](../modules/server_listener.md) / Listener

# Class: Listener

[server/listener](../modules/server_listener.md).Listener

## Table of contents

### Constructors

- [constructor](server_listener.Listener.md#constructor)

### Properties

- [buildnumber](server_listener.Listener.md#buildnumber)
- [cache](server_listener.Listener.md#cache)
- [customRoles](server_listener.Listener.md#customroles)
- [io](server_listener.Listener.md#io)
- [listeners](server_listener.Listener.md#listeners)
- [listensSS](server_listener.Listener.md#listensss)
- [rawDB](server_listener.Listener.md#rawdb)
- [redisGlobalPub](server_listener.Listener.md#redisglobalpub)
- [redisGlobalSub](server_listener.Listener.md#redisglobalsub)
- [redisLocalPub](server_listener.Listener.md#redislocalpub)
- [redisLocalSub](server_listener.Listener.md#redislocalsub)
- [root](server_listener.Listener.md#root)
- [sensitiveConfig](server_listener.Listener.md#sensitiveconfig)
- [server](server_listener.Listener.md#server)

### Methods

- [addSocket](server_listener.Listener.md#addsocket)
- [die](server_listener.Listener.md#die)
- [emitError](server_listener.Listener.md#emiterror)
- [feedback](server_listener.Listener.md#feedback)
- [globalRedisListener](server_listener.Listener.md#globalredislistener)
- [identify](server_listener.Listener.md#identify)
- [informClusterManagerReset](server_listener.Listener.md#informclustermanagerreset)
- [kick](server_listener.Listener.md#kick)
- [localRedisListener](server_listener.Listener.md#localredislistener)
- [onClusterManagerResetInformed](server_listener.Listener.md#onclustermanagerresetinformed)
- [onReceiveKickEvent](server_listener.Listener.md#onreceivekickevent)
- [ownedParentedSearchFeedback](server_listener.Listener.md#ownedparentedsearchfeedback)
- [ownedParentedSearchRegister](server_listener.Listener.md#ownedparentedsearchregister)
- [ownedParentedSearchUnregister](server_listener.Listener.md#ownedparentedsearchunregister)
- [ownedSearchFeedback](server_listener.Listener.md#ownedsearchfeedback)
- [ownedSearchRegister](server_listener.Listener.md#ownedsearchregister)
- [ownedSearchUnregister](server_listener.Listener.md#ownedsearchunregister)
- [parentedSearchFeedback](server_listener.Listener.md#parentedsearchfeedback)
- [parentedSearchRegister](server_listener.Listener.md#parentedsearchregister)
- [parentedSearchUnregister](server_listener.Listener.md#parentedsearchunregister)
- [register](server_listener.Listener.md#register)
- [registerSS](server_listener.Listener.md#registerss)
- [removeListener](server_listener.Listener.md#removelistener)
- [removeListenerFinal](server_listener.Listener.md#removelistenerfinal)
- [removeSocket](server_listener.Listener.md#removesocket)
- [revive](server_listener.Listener.md#revive)
- [sendKickEvent](server_listener.Listener.md#sendkickevent)
- [setupSocketIO](server_listener.Listener.md#setupsocketio)
- [triggerChangedListeners](server_listener.Listener.md#triggerchangedlisteners)
- [triggerOwnedParentedSearchListeners](server_listener.Listener.md#triggerownedparentedsearchlisteners)
- [triggerOwnedSearchListeners](server_listener.Listener.md#triggerownedsearchlisteners)
- [triggerParentedSearchListeners](server_listener.Listener.md#triggerparentedsearchlisteners)
- [unregister](server_listener.Listener.md#unregister)
- [unregisterSS](server_listener.Listener.md#unregisterss)

## Constructors

### constructor

• **new Listener**(`buildnumber`, `redisGlobalSub`, `redisGlobalPub`, `redisLocalSub`, `redisLocalPub`, `root`, `cache`, `rawDB`, `server`, `customRoles`, `sensitiveConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buildnumber` | `string` |
| `redisGlobalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisGlobalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisLocalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisLocalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `root` | [`default`](base_Root.default.md) |
| `cache` | [`Cache`](server_cache.Cache.md) |
| `rawDB` | [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md) |
| `server` | `Server` |
| `customRoles` | [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[] |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Defined in

[server/listener.ts:173](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L173)

## Properties

### buildnumber

• `Private` **buildnumber**: `string`

#### Defined in

[server/listener.ts:165](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L165)

___

### cache

• `Private` **cache**: [`Cache`](server_cache.Cache.md)

#### Defined in

[server/listener.ts:168](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L168)

___

### customRoles

• `Private` **customRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/listener.ts:171](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L171)

___

### io

• `Private` **io**: `Server`

#### Defined in

[server/listener.ts:156](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L156)

___

### listeners

• `Private` **listeners**: `IListenerList` = `{}`

#### Defined in

[server/listener.ts:158](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L158)

___

### listensSS

• `Private` **listensSS**: `IServerListensList` = `{}`

#### Defined in

[server/listener.ts:159](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L159)

___

### rawDB

• `Private` **rawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/listener.ts:167](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L167)

___

### redisGlobalPub

• `Private` **redisGlobalPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:162](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L162)

___

### redisGlobalSub

• `Private` **redisGlobalSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:161](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L161)

___

### redisLocalPub

• `Private` **redisLocalPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:164](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L164)

___

### redisLocalSub

• `Private` **redisLocalSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:163](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L163)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/listener.ts:166](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L166)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/listener.ts:169](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L169)

___

### server

• `Private` **server**: `Server`

#### Defined in

[server/listener.ts:170](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L170)

## Methods

### addSocket

▸ **addSocket**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |

#### Returns

`void`

#### Defined in

[server/listener.ts:294](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L294)

___

### die

▸ **die**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:223](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L223)

___

### emitError

▸ **emitError**(`socket`, `message`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `message` | `string` |
| `request` | `any` |

#### Returns

`void`

#### Defined in

[server/listener.ts:304](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L304)

___

### feedback

▸ **feedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IFeedbackRequest`](../interfaces/base_remote_protocol.IFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1562](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1562)

___

### globalRedisListener

▸ **globalRedisListener**(`channel`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `message` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1970](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1970)

___

### identify

▸ **identify**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IIdentifyRequest`](../interfaces/base_remote_protocol.IIdentifyRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:359](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L359)

___

### informClusterManagerReset

▸ **informClusterManagerReset**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:2146](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L2146)

___

### kick

▸ **kick**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |

#### Returns

`void`

#### Defined in

[server/listener.ts:344](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L344)

___

### localRedisListener

▸ **localRedisListener**(`channel`, `message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:2068](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L2068)

___

### onClusterManagerResetInformed

▸ **onClusterManagerResetInformed**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:2122](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L2122)

___

### onReceiveKickEvent

▸ **onReceiveKickEvent**(`userId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:333](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L333)

___

### ownedParentedSearchFeedback

▸ **ownedParentedSearchFeedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1356](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1356)

___

### ownedParentedSearchRegister

▸ **ownedParentedSearchRegister**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:851](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L851)

___

### ownedParentedSearchUnregister

▸ **ownedParentedSearchUnregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedParentedSearchUnregisterRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:1838](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1838)

___

### ownedSearchFeedback

▸ **ownedSearchFeedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedSearchFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:961](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L961)

___

### ownedSearchRegister

▸ **ownedSearchRegister**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedSearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:636](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L636)

___

### ownedSearchUnregister

▸ **ownedSearchUnregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedSearchUnregisterRequest`](../interfaces/base_remote_protocol.IOwnedSearchUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:1776](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1776)

___

### parentedSearchFeedback

▸ **parentedSearchFeedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IParentedSearchFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1153](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1153)

___

### parentedSearchRegister

▸ **parentedSearchRegister**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:741](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L741)

___

### parentedSearchUnregister

▸ **parentedSearchUnregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IParentedSearchUnregisterRequest`](../interfaces/base_remote_protocol.IParentedSearchUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:1806](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1806)

___

### register

▸ **register**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IRegisterRequest`](../interfaces/base_remote_protocol.IRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:509](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L509)

___

### registerSS

▸ **registerSS**(`request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`IRegisterRequest`](../interfaces/base_remote_protocol.IRegisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:466](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L466)

___

### removeListener

▸ **removeListener**(`socket`, `mergedIndexIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `mergedIndexIdentifier` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:1713](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1713)

___

### removeListenerFinal

▸ **removeListenerFinal**(`mergedIndexIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mergedIndexIdentifier` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:1700](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1700)

___

### removeSocket

▸ **removeSocket**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |

#### Returns

`void`

#### Defined in

[server/listener.ts:2095](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L2095)

___

### revive

▸ **revive**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:226](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L226)

___

### sendKickEvent

▸ **sendKickEvent**(`userId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:318](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L318)

___

### setupSocketIO

▸ **setupSocketIO**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:242](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L242)

___

### triggerChangedListeners

▸ **triggerChangedListeners**(`event`, `data`, `listenerUUID`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IChangedFeedbackEvent`](../interfaces/base_remote_protocol.IChangedFeedbackEvent.md) |
| `data` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `listenerUUID` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:1871](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1871)

___

### triggerOwnedParentedSearchListeners

▸ **triggerOwnedParentedSearchListeners**(`event`, `listenerUUID`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IOwnedParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedParentedSearchRecordsEvent.md) |
| `listenerUUID` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:1945](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1945)

___

### triggerOwnedSearchListeners

▸ **triggerOwnedSearchListeners**(`event`, `listenerUUID`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IOwnedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedSearchRecordsEvent.md) |
| `listenerUUID` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:1899](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1899)

___

### triggerParentedSearchListeners

▸ **triggerParentedSearchListeners**(`event`, `listenerUUID`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IParentedSearchRecordsEvent.md) |
| `listenerUUID` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:1921](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1921)

___

### unregister

▸ **unregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IUnregisterRequest`](../interfaces/base_remote_protocol.IUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:1745](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1745)

___

### unregisterSS

▸ **unregisterSS**(`request`): `void`

This method only reasonable gets called by the CLUSTER_MANAGER or in absolute mode

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`IUnregisterRequest`](../interfaces/base_remote_protocol.IUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:1732](https://github.com/onzag/itemize/blob/5c2808d3/server/listener.ts#L1732)
