[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / IServerCustomizationDataType

# Interface: IServerCustomizationDataType

[server](../modules/server.md).IServerCustomizationDataType

## Table of contents

### Properties

- [customRoles](server.IServerCustomizationDataType.md#customroles)
- [customRouterEndpoint](server.IServerCustomizationDataType.md#customrouterendpoint)
- [customTokenGQLQueries](server.IServerCustomizationDataType.md#customtokengqlqueries)
- [customTriggers](server.IServerCustomizationDataType.md#customtriggers)
- [globalManagerInitialServerDataFunction](server.IServerCustomizationDataType.md#globalmanagerinitialserverdatafunction)

### Methods

- [callback](server.IServerCustomizationDataType.md#callback)
- [customGQLMutations](server.IServerCustomizationDataType.md#customgqlmutations)
- [customGQLQueries](server.IServerCustomizationDataType.md#customgqlqueries)
- [customRouter](server.IServerCustomizationDataType.md#customrouter)

## Properties

### customRoles

• `Optional` **customRoles**: [`ICustomRoleType`](server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/index.ts:248](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L248)

___

### customRouterEndpoint

• `Optional` **customRouterEndpoint**: `string`

#### Defined in

[server/index.ts:245](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L245)

___

### customTokenGQLQueries

• `Optional` **customTokenGQLQueries**: [`ICustomTokensType`](server_custom_graphql.ICustomTokensType.md)

#### Defined in

[server/index.ts:243](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L243)

___

### customTriggers

• `Optional` **customTriggers**: [`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)

#### Defined in

[server/index.ts:247](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L247)

___

### globalManagerInitialServerDataFunction

• `Optional` **globalManagerInitialServerDataFunction**: [`InitialExecutionServerDataFn`](../modules/server_global_manager.md#initialexecutionserverdatafn)

#### Defined in

[server/index.ts:251](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L251)

## Methods

### callback

▸ `Optional` **callback**(`appData`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[server/index.ts:249](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L249)

___

### customGQLMutations

▸ `Optional` **customGQLMutations**(`appData`): [`IGQLQueryFieldsDefinitionType`](base_Root_gql.IGQLQueryFieldsDefinitionType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

#### Returns

[`IGQLQueryFieldsDefinitionType`](base_Root_gql.IGQLQueryFieldsDefinitionType.md)

#### Defined in

[server/index.ts:244](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L244)

___

### customGQLQueries

▸ `Optional` **customGQLQueries**(`appData`): [`IGQLQueryFieldsDefinitionType`](base_Root_gql.IGQLQueryFieldsDefinitionType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

#### Returns

[`IGQLQueryFieldsDefinitionType`](base_Root_gql.IGQLQueryFieldsDefinitionType.md)

#### Defined in

[server/index.ts:242](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L242)

___

### customRouter

▸ `Optional` **customRouter**(`appData`): `Router`

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |

#### Returns

`Router`

#### Defined in

[server/index.ts:246](https://github.com/onzag/itemize/blob/f2db74a5/server/index.ts#L246)
