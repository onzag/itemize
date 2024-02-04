[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/delete

# Module: server/resolvers/actions/delete

## Table of contents

### Functions

- [deleteItemDefinition](server_resolvers_actions_delete.md#deleteitemdefinition)
- [deleteItemDefinitionFnRQ](server_resolvers_actions_delete.md#deleteitemdefinitionfnrq)

## Functions

### deleteItemDefinition

▸ **deleteItemDefinition**(`appData`, `itemDefinition`, `resolverArgs`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[server/resolvers/actions/delete.ts:29](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/delete.ts#L29)

___

### deleteItemDefinitionFnRQ

▸ **deleteItemDefinitionFnRQ**(`appData`): [`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Defined in

[server/resolvers/actions/delete.ts:412](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/delete.ts#L412)
