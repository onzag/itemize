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

[server/resolvers/actions/get.ts:36](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/get.ts#L36)

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

[server/resolvers/actions/get.ts:950](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/get.ts#L950)

___

### getItemDefinitionList

▸ **getItemDefinitionList**(`appData`, `itemDefinition`, `resolverArgs`): `Promise`\<\{ `highlights`: [`IElasticHighlightRecordInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightRecordInfo.md) ; `results`: `any`[] = finalValues }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<\{ `highlights`: [`IElasticHighlightRecordInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightRecordInfo.md) ; `results`: `any`[] = finalValues }\>

#### Defined in

[server/resolvers/actions/get.ts:315](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/get.ts#L315)

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

[server/resolvers/actions/get.ts:954](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/get.ts#L954)

___

### getModuleList

▸ **getModuleList**(`appData`, `mod`, `resolverArgs`): `Promise`\<\{ `highlights`: [`IElasticHighlightRecordInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightRecordInfo.md) ; `results`: `any`[] = finalValues }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<\{ `highlights`: [`IElasticHighlightRecordInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightRecordInfo.md) ; `results`: `any`[] = finalValues }\>

#### Defined in

[server/resolvers/actions/get.ts:651](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/get.ts#L651)

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

[server/resolvers/actions/get.ts:958](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/get.ts#L958)
