[](../README.md) / [Exports](../modules.md) / server/resolvers/actions/get

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

▸ **getItemDefinition**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |

**Returns:** *Promise*<any\>

Defined in: [server/resolvers/actions/get.ts:37](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/actions/get.ts#L37)

___

### getItemDefinitionFn

▸ **getItemDefinitionFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

Defined in: [server/resolvers/actions/get.ts:642](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/actions/get.ts#L642)

___

### getItemDefinitionList

▸ **getItemDefinitionList**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): *Promise*<{ `results`: *any*[]  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |

**Returns:** *Promise*<{ `results`: *any*[]  }\>

Defined in: [server/resolvers/actions/get.ts:261](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/actions/get.ts#L261)

___

### getItemDefinitionListFn

▸ **getItemDefinitionListFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

Defined in: [server/resolvers/actions/get.ts:646](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/actions/get.ts#L646)

___

### getModuleList

▸ **getModuleList**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `mod`: [*default*](../classes/base_root_module.default.md)): *Promise*<{ `results`: *any*[]  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`mod` | [*default*](../classes/base_root_module.default.md) |

**Returns:** *Promise*<{ `results`: *any*[]  }\>

Defined in: [server/resolvers/actions/get.ts:462](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/actions/get.ts#L462)

___

### getModuleListFn

▸ **getModuleListFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLModResolverType*](base_root_gql.md#fgraphqlmodresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLModResolverType*](base_root_gql.md#fgraphqlmodresolvertype)

Defined in: [server/resolvers/actions/get.ts:650](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/actions/get.ts#L650)
