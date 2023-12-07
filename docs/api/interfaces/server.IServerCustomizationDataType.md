[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / IServerCustomizationDataType

# Interface: IServerCustomizationDataType

[server](../modules/server.md).IServerCustomizationDataType

## Table of contents

### Properties

- [customRoles](server.IServerCustomizationDataType.md#customroles)
- [customRouterEndpoint](server.IServerCustomizationDataType.md#customrouterendpoint)
- [customSearchEngineIndexing](server.IServerCustomizationDataType.md#customsearchengineindexing)
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

[server/index.ts:278](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L278)

___

### customRouterEndpoint

• `Optional` **customRouterEndpoint**: `string`

#### Defined in

[server/index.ts:275](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L275)

___

### customSearchEngineIndexing

• `Optional` **customSearchEngineIndexing**: `ICustomSearchEngineIndexingType`

#### Defined in

[server/index.ts:279](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L279)

___

### customTokenGQLQueries

• `Optional` **customTokenGQLQueries**: [`ICustomTokensType`](server_custom_graphql.ICustomTokensType.md)

#### Defined in

[server/index.ts:273](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L273)

___

### customTriggers

• `Optional` **customTriggers**: [`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)

#### Defined in

[server/index.ts:277](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L277)

___

### globalManagerInitialServerDataFunction

• `Optional` **globalManagerInitialServerDataFunction**: [`InitialExecutionServerDataFn`](../modules/server_global_manager.md#initialexecutionserverdatafn)

#### Defined in

[server/index.ts:283](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L283)

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

[server/index.ts:281](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L281)

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

[server/index.ts:274](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L274)

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

[server/index.ts:272](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L272)

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

[server/index.ts:276](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L276)
