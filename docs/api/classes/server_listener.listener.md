[](../README.md) / [Exports](../modules.md) / [server/listener](../modules/server_listener.md) / Listener

# Class: Listener

[server/listener](../modules/server_listener.md).Listener

## Table of contents

### Constructors

- [constructor](server_listener.listener.md#constructor)

### Properties

- [buildnumber](server_listener.listener.md#buildnumber)
- [cache](server_listener.listener.md#cache)
- [customRoles](server_listener.listener.md#customroles)
- [io](server_listener.listener.md#io)
- [listeners](server_listener.listener.md#listeners)
- [listensSS](server_listener.listener.md#listensss)
- [rawDB](server_listener.listener.md#rawdb)
- [redisGlobalPub](server_listener.listener.md#redisglobalpub)
- [redisGlobalSub](server_listener.listener.md#redisglobalsub)
- [redisLocalPub](server_listener.listener.md#redislocalpub)
- [redisLocalSub](server_listener.listener.md#redislocalsub)
- [root](server_listener.listener.md#root)
- [sensitiveConfig](server_listener.listener.md#sensitiveconfig)
- [server](server_listener.listener.md#server)

### Methods

- [addSocket](server_listener.listener.md#addsocket)
- [die](server_listener.listener.md#die)
- [emitError](server_listener.listener.md#emiterror)
- [feedback](server_listener.listener.md#feedback)
- [globalRedisListener](server_listener.listener.md#globalredislistener)
- [identify](server_listener.listener.md#identify)
- [informClusterManagerReset](server_listener.listener.md#informclustermanagerreset)
- [kick](server_listener.listener.md#kick)
- [localRedisListener](server_listener.listener.md#localredislistener)
- [onClusterManagerResetInformed](server_listener.listener.md#onclustermanagerresetinformed)
- [onReceiveKickEvent](server_listener.listener.md#onreceivekickevent)
- [ownedSearchFeedback](server_listener.listener.md#ownedsearchfeedback)
- [ownedSearchRegister](server_listener.listener.md#ownedsearchregister)
- [ownedSearchUnregister](server_listener.listener.md#ownedsearchunregister)
- [parentedSearchFeedback](server_listener.listener.md#parentedsearchfeedback)
- [parentedSearchRegister](server_listener.listener.md#parentedsearchregister)
- [parentedSearchUnregister](server_listener.listener.md#parentedsearchunregister)
- [register](server_listener.listener.md#register)
- [registerSS](server_listener.listener.md#registerss)
- [removeListener](server_listener.listener.md#removelistener)
- [removeListenerFinal](server_listener.listener.md#removelistenerfinal)
- [removeSocket](server_listener.listener.md#removesocket)
- [revive](server_listener.listener.md#revive)
- [sendKickEvent](server_listener.listener.md#sendkickevent)
- [setupSocketIO](server_listener.listener.md#setupsocketio)
- [triggerChangedListeners](server_listener.listener.md#triggerchangedlisteners)
- [triggerOwnedSearchListeners](server_listener.listener.md#triggerownedsearchlisteners)
- [triggerParentedSearchListeners](server_listener.listener.md#triggerparentedsearchlisteners)
- [unregister](server_listener.listener.md#unregister)
- [unregisterSS](server_listener.listener.md#unregisterss)

## Constructors

### constructor

\+ **new Listener**(`buildnumber`: *string*, `redisGlobalSub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `redisGlobalPub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `redisLocalSub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `redisLocalPub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `root`: [*default*](base_root.default.md), `cache`: [*Cache*](server_cache.cache.md), `rawDB`: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md), `server`: *Server*, `customRoles`: [*ICustomRoleType*](../interfaces/server_resolvers_roles.icustomroletype.md)[], `sensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): [*Listener*](server_listener.listener.md)

#### Parameters:

Name | Type |
:------ | :------ |
`buildnumber` | *string* |
`redisGlobalSub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`redisGlobalPub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`redisLocalSub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`redisLocalPub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`root` | [*default*](base_root.default.md) |
`cache` | [*Cache*](server_cache.cache.md) |
`rawDB` | [*ItemizeRawDB*](server_raw_db.itemizerawdb.md) |
`server` | *Server* |
`customRoles` | [*ICustomRoleType*](../interfaces/server_resolvers_roles.icustomroletype.md)[] |
`sensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |

**Returns:** [*Listener*](server_listener.listener.md)

Defined in: [server/listener.ts:147](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L147)

## Properties

### buildnumber

• `Private` **buildnumber**: *string*

Defined in: [server/listener.ts:141](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L141)

___

### cache

• `Private` **cache**: [*Cache*](server_cache.cache.md)

Defined in: [server/listener.ts:144](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L144)

___

### customRoles

• `Private` **customRoles**: [*ICustomRoleType*](../interfaces/server_resolvers_roles.icustomroletype.md)[]

Defined in: [server/listener.ts:147](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L147)

___

### io

• `Private` **io**: Server

Defined in: [server/listener.ts:132](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L132)

___

### listeners

• `Private` **listeners**: IListenerList

Defined in: [server/listener.ts:134](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L134)

___

### listensSS

• `Private` **listensSS**: IServerListensList

Defined in: [server/listener.ts:135](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L135)

___

### rawDB

• `Private` **rawDB**: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Defined in: [server/listener.ts:143](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L143)

___

### redisGlobalPub

• `Private` **redisGlobalPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/listener.ts:138](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L138)

___

### redisGlobalSub

• `Private` **redisGlobalSub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/listener.ts:137](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L137)

___

### redisLocalPub

• `Private` **redisLocalPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/listener.ts:140](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L140)

___

### redisLocalSub

• `Private` **redisLocalSub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/listener.ts:139](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L139)

___

### root

• `Private` **root**: [*default*](base_root.default.md)

Defined in: [server/listener.ts:142](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L142)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Defined in: [server/listener.ts:145](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L145)

___

### server

• `Private` **server**: *Server*

Defined in: [server/listener.ts:146](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L146)

## Methods

### addSocket

▸ **addSocket**(`socket`: *Socket*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |

**Returns:** *void*

Defined in: [server/listener.ts:261](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L261)

___

### die

▸ **die**(): *void*

**Returns:** *void*

Defined in: [server/listener.ts:199](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L199)

___

### emitError

▸ **emitError**(`socket`: *Socket*, `message`: *string*, `request`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`message` | *string* |
`request` | *any* |

**Returns:** *void*

Defined in: [server/listener.ts:271](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L271)

___

### feedback

▸ **feedback**(`socket`: *Socket*, `request`: [*IFeedbackRequest*](../interfaces/base_remote_protocol.ifeedbackrequest.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IFeedbackRequest*](../interfaces/base_remote_protocol.ifeedbackrequest.md) |

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:1171](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1171)

___

### globalRedisListener

▸ **globalRedisListener**(`channel`: *string*, `message`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`channel` | *string* |
`message` | *string* |

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:1497](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1497)

___

### identify

▸ **identify**(`socket`: *Socket*, `request`: [*IIdentifyRequest*](../interfaces/base_remote_protocol.iidentifyrequest.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IIdentifyRequest*](../interfaces/base_remote_protocol.iidentifyrequest.md) |

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:325](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L325)

___

### informClusterManagerReset

▸ **informClusterManagerReset**(): *void*

**Returns:** *void*

Defined in: [server/listener.ts:1673](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1673)

___

### kick

▸ **kick**(`socket`: *Socket*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |

**Returns:** *void*

Defined in: [server/listener.ts:310](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L310)

___

### localRedisListener

▸ **localRedisListener**(`channel`: *string*, `message`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`channel` | *string* |
`message` | *string* |

**Returns:** *void*

Defined in: [server/listener.ts:1595](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1595)

___

### onClusterManagerResetInformed

▸ **onClusterManagerResetInformed**(): *void*

**Returns:** *void*

Defined in: [server/listener.ts:1649](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1649)

___

### onReceiveKickEvent

▸ **onReceiveKickEvent**(`userId`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`userId` | *string* |

**Returns:** *void*

Defined in: [server/listener.ts:299](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L299)

___

### ownedSearchFeedback

▸ **ownedSearchFeedback**(`socket`: *Socket*, `request`: [*IOwnedSearchFeedbackRequest*](../interfaces/base_remote_protocol.iownedsearchfeedbackrequest.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IOwnedSearchFeedbackRequest*](../interfaces/base_remote_protocol.iownedsearchfeedbackrequest.md) |

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:794](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L794)

___

### ownedSearchRegister

▸ **ownedSearchRegister**(`socket`: *Socket*, `request`: [*IOwnedSearchRegisterRequest*](../interfaces/base_remote_protocol.iownedsearchregisterrequest.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IOwnedSearchRegisterRequest*](../interfaces/base_remote_protocol.iownedsearchregisterrequest.md) |

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:591](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L591)

___

### ownedSearchUnregister

▸ **ownedSearchUnregister**(`socket`: *Socket*, `request`: [*IOwnedSearchUnregisterRequest*](../interfaces/base_remote_protocol.iownedsearchunregisterrequest.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IOwnedSearchUnregisterRequest*](../interfaces/base_remote_protocol.iownedsearchunregisterrequest.md) |

**Returns:** *void*

Defined in: [server/listener.ts:1375](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1375)

___

### parentedSearchFeedback

▸ **parentedSearchFeedback**(`socket`: *Socket*, `request`: [*IParentedSearchFeedbackRequest*](../interfaces/base_remote_protocol.iparentedsearchfeedbackrequest.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IParentedSearchFeedbackRequest*](../interfaces/base_remote_protocol.iparentedsearchfeedbackrequest.md) |

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:977](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L977)

___

### parentedSearchRegister

▸ **parentedSearchRegister**(`socket`: *Socket*, `request`: [*IParentedSearchRegisterRequest*](../interfaces/base_remote_protocol.iparentedsearchregisterrequest.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IParentedSearchRegisterRequest*](../interfaces/base_remote_protocol.iparentedsearchregisterrequest.md) |

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:690](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L690)

___

### parentedSearchUnregister

▸ **parentedSearchUnregister**(`socket`: *Socket*, `request`: [*IParentedSearchUnregisterRequest*](../interfaces/base_remote_protocol.iparentedsearchunregisterrequest.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IParentedSearchUnregisterRequest*](../interfaces/base_remote_protocol.iparentedsearchunregisterrequest.md) |

**Returns:** *void*

Defined in: [server/listener.ts:1402](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1402)

___

### register

▸ **register**(`socket`: *Socket*, `request`: [*IRegisterRequest*](../interfaces/base_remote_protocol.iregisterrequest.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IRegisterRequest*](../interfaces/base_remote_protocol.iregisterrequest.md) |

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:470](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L470)

___

### registerSS

▸ **registerSS**(`request`: [*IRegisterRequest*](../interfaces/base_remote_protocol.iregisterrequest.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`request` | [*IRegisterRequest*](../interfaces/base_remote_protocol.iregisterrequest.md) |

**Returns:** *void*

Defined in: [server/listener.ts:432](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L432)

___

### removeListener

▸ **removeListener**(`socket`: *Socket*, `mergedIndexIdentifier`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`mergedIndexIdentifier` | *string* |

**Returns:** *void*

Defined in: [server/listener.ts:1320](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1320)

___

### removeListenerFinal

▸ **removeListenerFinal**(`mergedIndexIdentifier`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`mergedIndexIdentifier` | *string* |

**Returns:** *void*

Defined in: [server/listener.ts:1307](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1307)

___

### removeSocket

▸ **removeSocket**(`socket`: *Socket*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |

**Returns:** *void*

Defined in: [server/listener.ts:1622](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1622)

___

### revive

▸ **revive**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [server/listener.ts:202](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L202)

___

### sendKickEvent

▸ **sendKickEvent**(`userId`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`userId` | *string* |

**Returns:** *void*

Defined in: [server/listener.ts:285](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L285)

___

### setupSocketIO

▸ **setupSocketIO**(): *void*

**Returns:** *void*

Defined in: [server/listener.ts:218](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L218)

___

### triggerChangedListeners

▸ **triggerChangedListeners**(`event`: [*IChangedFeedbackEvent*](../interfaces/base_remote_protocol.ichangedfeedbackevent.md), `data`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md), `listenerUUID`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`event` | [*IChangedFeedbackEvent*](../interfaces/base_remote_protocol.ichangedfeedbackevent.md) |
`data` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) |
`listenerUUID` | *string* |

**Returns:** *void*

Defined in: [server/listener.ts:1430](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1430)

___

### triggerOwnedSearchListeners

▸ **triggerOwnedSearchListeners**(`event`: [*IOwnedSearchRecordsEvent*](../interfaces/base_remote_protocol.iownedsearchrecordsevent.md), `listenerUUID`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`event` | [*IOwnedSearchRecordsEvent*](../interfaces/base_remote_protocol.iownedsearchrecordsevent.md) |
`listenerUUID` | *string* |

**Returns:** *void*

Defined in: [server/listener.ts:1458](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1458)

___

### triggerParentedSearchListeners

▸ **triggerParentedSearchListeners**(`event`: [*IParentedSearchRecordsEvent*](../interfaces/base_remote_protocol.iparentedsearchrecordsevent.md), `listenerUUID`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`event` | [*IParentedSearchRecordsEvent*](../interfaces/base_remote_protocol.iparentedsearchrecordsevent.md) |
`listenerUUID` | *string* |

**Returns:** *void*

Defined in: [server/listener.ts:1477](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1477)

___

### unregister

▸ **unregister**(`socket`: *Socket*, `request`: [*IUnregisterRequest*](../interfaces/base_remote_protocol.iunregisterrequest.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *Socket* |
`request` | [*IUnregisterRequest*](../interfaces/base_remote_protocol.iunregisterrequest.md) |

**Returns:** *void*

Defined in: [server/listener.ts:1348](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1348)

___

### unregisterSS

▸ **unregisterSS**(`request`: [*IUnregisterRequest*](../interfaces/base_remote_protocol.iunregisterrequest.md)): *void*

This method only reasonable gets called by the CLUSTER_MANAGER or in absolute mode

#### Parameters:

Name | Type |
:------ | :------ |
`request` | [*IUnregisterRequest*](../interfaces/base_remote_protocol.iunregisterrequest.md) |

**Returns:** *void*

Defined in: [server/listener.ts:1339](https://github.com/onzag/itemize/blob/28218320/server/listener.ts#L1339)
