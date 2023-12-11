[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / IServerCustomizationDataType

# Interface: IServerCustomizationDataType

[server](../modules/server.md).IServerCustomizationDataType

## Table of contents

### Properties

- [callback](server.IServerCustomizationDataType.md#callback)
- [customRoles](server.IServerCustomizationDataType.md#customroles)
- [customRouter](server.IServerCustomizationDataType.md#customrouter)
- [customRouterEndpoint](server.IServerCustomizationDataType.md#customrouterendpoint)
- [customSearchEngineIndexing](server.IServerCustomizationDataType.md#customsearchengineindexing)
- [customTriggers](server.IServerCustomizationDataType.md#customtriggers)
- [globalManagerInitialServerDataFunction](server.IServerCustomizationDataType.md#globalmanagerinitialserverdatafunction)

## Properties

### callback

• `Optional` **callback**: (`appData`: [`IAppDataType`](server.IAppDataType.md)) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`appData`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

##### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[server/index.ts:276](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L276)

___

### customRoles

• `Optional` **customRoles**: [`ICustomRoleType`](server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/index.ts:273](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L273)

___

### customRouter

• `Optional` **customRouter**: (`appData`: [`IAppDataType`](server.IAppDataType.md)) => `Router`

#### Type declaration

▸ (`appData`): `Router`

##### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

##### Returns

`Router`

#### Defined in

[server/index.ts:271](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L271)

___

### customRouterEndpoint

• `Optional` **customRouterEndpoint**: `string`

#### Defined in

[server/index.ts:270](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L270)

___

### customSearchEngineIndexing

• `Optional` **customSearchEngineIndexing**: `ICustomSearchEngineIndexingType`

#### Defined in

[server/index.ts:274](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L274)

___

### customTriggers

• `Optional` **customTriggers**: [`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)

#### Defined in

[server/index.ts:272](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L272)

___

### globalManagerInitialServerDataFunction

• `Optional` **globalManagerInitialServerDataFunction**: [`InitialExecutionServerDataFn`](../modules/server_global_manager.md#initialexecutionserverdatafn)

#### Defined in

[server/index.ts:278](https://github.com/onzag/itemize/blob/59702dd5/server/index.ts#L278)
