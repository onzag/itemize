[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/get

# Module: server/resolvers/actions/get

## Table of contents

### Functions

- [getItemDefinition](server_resolvers_actions_get.md#getitemdefinition)
- [getItemDefinitionFn](server_resolvers_actions_get.md#getitemdefinitionfn)
- [getItemDefinitionFnRQ](server_resolvers_actions_get.md#getitemdefinitionfnrq)
- [getItemDefinitionList](server_resolvers_actions_get.md#getitemdefinitionlist)
- [getItemDefinitionListFn](server_resolvers_actions_get.md#getitemdefinitionlistfn)
- [getItemDefinitionListFnRQ](server_resolvers_actions_get.md#getitemdefinitionlistfnrq)
- [getModuleList](server_resolvers_actions_get.md#getmodulelist)
- [getModuleListFn](server_resolvers_actions_get.md#getmodulelistfn)
- [getModuleListFnRQ](server_resolvers_actions_get.md#getmodulelistfnrq)

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

[server/resolvers/actions/get.ts:36](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L36)

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

[server/resolvers/actions/get.ts:924](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L924)

___

### getItemDefinitionFnRQ

▸ **getItemDefinitionFnRQ**(`appData`): [`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Defined in

[server/resolvers/actions/get.ts:936](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L936)

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

[server/resolvers/actions/get.ts:315](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L315)

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

[server/resolvers/actions/get.ts:928](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L928)

___

### getItemDefinitionListFnRQ

▸ **getItemDefinitionListFnRQ**(`appData`): [`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Defined in

[server/resolvers/actions/get.ts:940](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L940)

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

[server/resolvers/actions/get.ts:638](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L638)

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

[server/resolvers/actions/get.ts:932](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L932)

___

### getModuleListFnRQ

▸ **getModuleListFnRQ**(`appData`): [`FRQModResolverType`](base_Root_rq.md#frqmodresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQModResolverType`](base_Root_rq.md#frqmodresolvertype)

#### Defined in

[server/resolvers/actions/get.ts:944](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/get.ts#L944)
