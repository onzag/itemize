[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / IServerCustomizationDataType

# Interface: IServerCustomizationDataType

[server](../modules/server.md).IServerCustomizationDataType

## Table of contents

### Properties

- [customRoles](server.IServerCustomizationDataType.md#customroles)
- [customRouterEndpoint](server.IServerCustomizationDataType.md#customrouterendpoint)
- [customTokenGQLQueries](server.IServerCustomizationDataType.md#customtokengqlqueries)
- [customTriggers](server.IServerCustomizationDataType.md#customtriggers)

### Methods

- [callback](server.IServerCustomizationDataType.md#callback)
- [customGQLMutations](server.IServerCustomizationDataType.md#customgqlmutations)
- [customGQLQueries](server.IServerCustomizationDataType.md#customgqlqueries)
- [customRouter](server.IServerCustomizationDataType.md#customrouter)

## Properties

### customRoles

• `Optional` **customRoles**: [`ICustomRoleType`](server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/index.ts:192](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L192)

___

### customRouterEndpoint

• `Optional` **customRouterEndpoint**: `string`

#### Defined in

[server/index.ts:189](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L189)

___

### customTokenGQLQueries

• `Optional` **customTokenGQLQueries**: [`ICustomTokensType`](server_custom_graphql.ICustomTokensType.md)

#### Defined in

[server/index.ts:187](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L187)

___

### customTriggers

• `Optional` **customTriggers**: [`ITriggerRegistry`](server_resolvers_triggers.ITriggerRegistry.md)

#### Defined in

[server/index.ts:191](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L191)

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

[server/index.ts:193](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L193)

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

[server/index.ts:188](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L188)

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

[server/index.ts:186](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L186)

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

[server/index.ts:190](https://github.com/onzag/itemize/blob/5c2808d3/server/index.ts#L190)
