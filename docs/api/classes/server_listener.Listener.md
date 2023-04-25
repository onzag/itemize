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
- [registry](server_listener.Listener.md#registry)
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
- [propertySearchFeedback](server_listener.Listener.md#propertysearchfeedback)
- [propertySearchRegister](server_listener.Listener.md#propertysearchregister)
- [propertySearchUnregister](server_listener.Listener.md#propertysearchunregister)
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
- [triggerPropertySearchListeners](server_listener.Listener.md#triggerpropertysearchlisteners)
- [unregister](server_listener.Listener.md#unregister)
- [unregisterSS](server_listener.Listener.md#unregisterss)

## Constructors

### constructor

• **new Listener**(`buildnumber`, `redisGlobalSub`, `redisGlobalPub`, `redisLocalSub`, `redisLocalPub`, `registry`, `root`, `cache`, `rawDB`, `server`, `customRoles`, `sensitiveConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buildnumber` | `string` |
| `redisGlobalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisGlobalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisLocalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisLocalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `root` | [`default`](base_Root.default.md) |
| `cache` | [`Cache`](server_cache.Cache.md) |
| `rawDB` | [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md) |
| `server` | `Server` |
| `customRoles` | [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[] |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Defined in

[server/listener.ts:189](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L189)

## Properties

### buildnumber

• `Private` **buildnumber**: `string`

#### Defined in

[server/listener.ts:180](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L180)

___

### cache

• `Private` **cache**: [`Cache`](server_cache.Cache.md)

#### Defined in

[server/listener.ts:183](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L183)

___

### customRoles

• `Private` **customRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/listener.ts:187](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L187)

___

### io

• `Private` **io**: `Server`

#### Defined in

[server/listener.ts:171](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L171)

___

### listeners

• `Private` **listeners**: `IListenerList` = `{}`

#### Defined in

[server/listener.ts:173](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L173)

___

### listensSS

• `Private` **listensSS**: `IServerListensList` = `{}`

#### Defined in

[server/listener.ts:174](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L174)

___

### rawDB

• `Private` **rawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/listener.ts:182](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L182)

___

### redisGlobalPub

• `Private` **redisGlobalPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:177](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L177)

___

### redisGlobalSub

• `Private` **redisGlobalSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:176](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L176)

___

### redisLocalPub

• `Private` **redisLocalPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:179](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L179)

___

### redisLocalSub

• `Private` **redisLocalSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:178](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L178)

___

### registry

• `Private` **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Defined in

[server/listener.ts:185](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L185)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/listener.ts:181](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L181)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/listener.ts:184](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L184)

___

### server

• `Private` **server**: `Server`

#### Defined in

[server/listener.ts:186](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L186)

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

[server/listener.ts:321](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L321)

___

### die

▸ **die**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:241](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L241)

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

[server/listener.ts:331](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L331)

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

[server/listener.ts:2341](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2341)

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

[server/listener.ts:2911](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2911)

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

[server/listener.ts:386](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L386)

___

### informClusterManagerReset

▸ **informClusterManagerReset**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:3139](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L3139)

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

[server/listener.ts:371](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L371)

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

[server/listener.ts:3039](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L3039)

___

### onClusterManagerResetInformed

▸ **onClusterManagerResetInformed**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:3111](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L3111)

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

[server/listener.ts:360](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L360)

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

[server/listener.ts:2109](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2109)

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

[server/listener.ts:1179](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L1179)

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

[server/listener.ts:2720](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2720)

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

[server/listener.ts:1317](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L1317)

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

[server/listener.ts:733](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L733)

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

[server/listener.ts:2603](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2603)

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

[server/listener.ts:1840](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L1840)

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

[server/listener.ts:1041](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L1041)

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

[server/listener.ts:2680](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2680)

___

### propertySearchFeedback

▸ **propertySearchFeedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IPropertySearchFeedbackRequest`](../interfaces/base_remote_protocol.IPropertySearchFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1535](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L1535)

___

### propertySearchRegister

▸ **propertySearchRegister**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IPropertySearchRegisterRequest`](../interfaces/base_remote_protocol.IPropertySearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:866](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L866)

___

### propertySearchUnregister

▸ **propertySearchUnregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IPropertySearchUnregisterRequest`](../interfaces/base_remote_protocol.IPropertySearchUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:2641](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2641)

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

[server/listener.ts:574](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L574)

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

[server/listener.ts:511](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L511)

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

[server/listener.ts:2528](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2528)

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

[server/listener.ts:2511](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2511)

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

[server/listener.ts:3076](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L3076)

___

### revive

▸ **revive**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:244](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L244)

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

[server/listener.ts:345](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L345)

___

### setupSocketIO

▸ **setupSocketIO**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:260](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L260)

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

[server/listener.ts:2761](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2761)

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

[server/listener.ts:2880](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2880)

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

[server/listener.ts:2793](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2793)

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

[server/listener.ts:2850](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2850)

___

### triggerPropertySearchListeners

▸ **triggerPropertySearchListeners**(`event`, `listenerUUID`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IPropertySearchRecordsEvent`](../interfaces/base_remote_protocol.IPropertySearchRecordsEvent.md) |
| `listenerUUID` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:2821](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2821)

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

[server/listener.ts:2564](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2564)

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

[server/listener.ts:2551](https://github.com/onzag/itemize/blob/f2db74a5/server/listener.ts#L2551)
