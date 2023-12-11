[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/get

# Module: server/resolvers/actions/get

## Table of contents

### Functions

- [getItemDefinition](server_resolvers_actions_get.md#getitemdefinition)
- [getItemDefinitionFnRQ](server_resolvers_actions_get.md#getitemdefinitionfnrq)
- [getItemDefinitionList](server_resolvers_actions_get.md#getitemdefinitionlist)
- [getItemDefinitionListFnRQ](server_resolvers_actions_get.md#getitemdefinitionlistfnrq)
- [getModuleList](server_resolvers_actions_get.md#getmodulelist)
- [getModuleListFnRQ](server_resolvers_actions_get.md#getmodulelistfnrq)

## Functions

### getItemDefinition

▸ **getItemDefinition**(`appData`, `itemDefinition`, `resolverArgs`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[server/resolvers/actions/get.ts:35](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/actions/get.ts#L35)

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

[server/resolvers/actions/get.ts:923](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/actions/get.ts#L923)

___

### getItemDefinitionList

▸ **getItemDefinitionList**(`appData`, `itemDefinition`, `resolverArgs`): `Promise`\<\{ `highlights`: `string` ; `results`: `any`[] = finalValues }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<\{ `highlights`: `string` ; `results`: `any`[] = finalValues }\>

#### Defined in

[server/resolvers/actions/get.ts:314](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/actions/get.ts#L314)

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

[server/resolvers/actions/get.ts:927](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/actions/get.ts#L927)

___

### getModuleList

▸ **getModuleList**(`appData`, `mod`, `resolverArgs`): `Promise`\<\{ `highlights`: `string` ; `results`: `any`[] = finalValues }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<\{ `highlights`: `string` ; `results`: `any`[] = finalValues }\>

#### Defined in

[server/resolvers/actions/get.ts:637](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/actions/get.ts#L637)

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

[server/resolvers/actions/get.ts:931](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/actions/get.ts#L931)
