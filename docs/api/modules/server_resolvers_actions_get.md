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

[server/resolvers/actions/get.ts:36](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/get.ts#L36)

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

[server/resolvers/actions/get.ts:883](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/get.ts#L883)

___

### getItemDefinitionList

▸ **getItemDefinitionList**(`appData`, `resolverArgs`, `itemDefinition`): `Promise`<{ `highlights`: `string` ; `results`: `any`[] = finalValues }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<{ `highlights`: `string` ; `results`: `any`[] = finalValues }\>

#### Defined in

[server/resolvers/actions/get.ts:301](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/get.ts#L301)

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

[server/resolvers/actions/get.ts:887](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/get.ts#L887)

___

### getModuleList

▸ **getModuleList**(`appData`, `resolverArgs`, `mod`): `Promise`<{ `highlights`: `string` ; `results`: `any`[] = finalValues }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |

#### Returns

`Promise`<{ `highlights`: `string` ; `results`: `any`[] = finalValues }\>

#### Defined in

[server/resolvers/actions/get.ts:603](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/get.ts#L603)

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

[server/resolvers/actions/get.ts:891](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/get.ts#L891)
