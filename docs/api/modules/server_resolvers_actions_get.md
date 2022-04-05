[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/get

# Module: server/resolvers/actions/get

## Table of contents

### Functions

- [getItemDefinition](server_resolvers_actions_get.md#getitemdefinition)
- [getItemDefinitionFn](server_resolvers_actions_get.md#getitemdefinitionfn)
- [getItemDefinitionList](server_resolvers_actions_get.md#getitemdefinitionlist)
- [getItemDefinitionListFn](server_resolvers_actions_get.md#getitemdefinitionlistfn)
- [getModuleList](server_resolvers_actions_get.md#getmodulelist)
- [getModuleListFn](server_resolvers_actions_get.md#getmodulelistfn)

## Functions

### getItemDefinition

▸ **getItemDefinition**(`appData`, `resolverArgs`, `itemDefinition`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[server/resolvers/actions/get.ts:38](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/get.ts#L38)

___

### getItemDefinitionFn

▸ **getItemDefinitionFn**(`appData`): [`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Defined in

[server/resolvers/actions/get.ts:724](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/get.ts#L724)

___

### getItemDefinitionList

▸ **getItemDefinitionList**(`appData`, `resolverArgs`, `itemDefinition`): `Promise`<{ `results`: `any`[] = finalValues }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<{ `results`: `any`[] = finalValues }\>

#### Defined in

[server/resolvers/actions/get.ts:288](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/get.ts#L288)

___

### getItemDefinitionListFn

▸ **getItemDefinitionListFn**(`appData`): [`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Defined in

[server/resolvers/actions/get.ts:728](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/get.ts#L728)

___

### getModuleList

▸ **getModuleList**(`appData`, `resolverArgs`, `mod`): `Promise`<{ `results`: `any`[] = finalValues }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |

#### Returns

`Promise`<{ `results`: `any`[] = finalValues }\>

#### Defined in

[server/resolvers/actions/get.ts:517](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/get.ts#L517)

___

### getModuleListFn

▸ **getModuleListFn**(`appData`): [`FGraphQLModResolverType`](base_Root_gql.md#fgraphqlmodresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLModResolverType`](base_Root_gql.md#fgraphqlmodresolvertype)

#### Defined in

[server/resolvers/actions/get.ts:732](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/get.ts#L732)
