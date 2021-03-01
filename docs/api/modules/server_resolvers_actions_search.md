[](../README.md) / [Exports](../modules.md) / server/resolvers/actions/search

# Module: server/resolvers/actions/search

## Table of contents

### Functions

- [findLastRecordLastModifiedDate](server_resolvers_actions_search.md#findlastrecordlastmodifieddate)
- [searchItemDefinition](server_resolvers_actions_search.md#searchitemdefinition)
- [searchItemDefinitionFn](server_resolvers_actions_search.md#searchitemdefinitionfn)
- [searchItemDefinitionTraditional](server_resolvers_actions_search.md#searchitemdefinitiontraditional)
- [searchItemDefinitionTraditionalFn](server_resolvers_actions_search.md#searchitemdefinitiontraditionalfn)
- [searchModule](server_resolvers_actions_search.md#searchmodule)
- [searchModuleFn](server_resolvers_actions_search.md#searchmodulefn)
- [searchModuleTraditional](server_resolvers_actions_search.md#searchmoduletraditional)
- [searchModuleTraditionalFn](server_resolvers_actions_search.md#searchmoduletraditionalfn)

## Functions

### findLastRecordLastModifiedDate

▸ **findLastRecordLastModifiedDate**(...`records`: [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[][]): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`...records` | [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[][] |

**Returns:** *string*

Defined in: [server/resolvers/actions/search.ts:46](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L46)

___

### searchItemDefinition

▸ **searchItemDefinition**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `resolverItemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `traditional?`: *boolean*): *Promise*<[*IGQLSearchRecordsContainer*](../interfaces/gql_querier.igqlsearchrecordscontainer.md) \| [*IGQLSearchResultsContainer*](../interfaces/gql_querier.igqlsearchresultscontainer.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`resolverItemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |
`traditional?` | *boolean* |

**Returns:** *Promise*<[*IGQLSearchRecordsContainer*](../interfaces/gql_querier.igqlsearchrecordscontainer.md) \| [*IGQLSearchResultsContainer*](../interfaces/gql_querier.igqlsearchresultscontainer.md)\>

Defined in: [server/resolvers/actions/search.ts:405](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L405)

___

### searchItemDefinitionFn

▸ **searchItemDefinitionFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

Defined in: [server/resolvers/actions/search.ts:837](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L837)

___

### searchItemDefinitionTraditional

▸ **searchItemDefinitionTraditional**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): *Promise*<[*IGQLSearchRecordsContainer*](../interfaces/gql_querier.igqlsearchrecordscontainer.md) \| [*IGQLSearchResultsContainer*](../interfaces/gql_querier.igqlsearchresultscontainer.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) |

**Returns:** *Promise*<[*IGQLSearchRecordsContainer*](../interfaces/gql_querier.igqlsearchrecordscontainer.md) \| [*IGQLSearchResultsContainer*](../interfaces/gql_querier.igqlsearchresultscontainer.md)\>

Defined in: [server/resolvers/actions/search.ts:397](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L397)

___

### searchItemDefinitionTraditionalFn

▸ **searchItemDefinitionTraditionalFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLIdefResolverType*](base_root_gql.md#fgraphqlidefresolvertype)

Defined in: [server/resolvers/actions/search.ts:845](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L845)

___

### searchModule

▸ **searchModule**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `mod`: [*default*](../classes/base_root_module.default.md), `traditional?`: *boolean*): *Promise*<[*IGQLSearchRecordsContainer*](../interfaces/gql_querier.igqlsearchrecordscontainer.md) \| [*IGQLSearchResultsContainer*](../interfaces/gql_querier.igqlsearchresultscontainer.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`mod` | [*default*](../classes/base_root_module.default.md) |
`traditional?` | *boolean* |

**Returns:** *Promise*<[*IGQLSearchRecordsContainer*](../interfaces/gql_querier.igqlsearchrecordscontainer.md) \| [*IGQLSearchResultsContainer*](../interfaces/gql_querier.igqlsearchresultscontainer.md)\>

Defined in: [server/resolvers/actions/search.ts:65](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L65)

___

### searchModuleFn

▸ **searchModuleFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLModResolverType*](base_root_gql.md#fgraphqlmodresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLModResolverType*](base_root_gql.md#fgraphqlmodresolvertype)

Defined in: [server/resolvers/actions/search.ts:841](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L841)

___

### searchModuleTraditional

▸ **searchModuleTraditional**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `resolverArgs`: [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md), `mod`: [*default*](../classes/base_root_module.default.md)): *Promise*<[*IGQLSearchRecordsContainer*](../interfaces/gql_querier.igqlsearchrecordscontainer.md) \| [*IGQLSearchResultsContainer*](../interfaces/gql_querier.igqlsearchresultscontainer.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`resolverArgs` | [*IGraphQLIdefResolverArgs*](../interfaces/base_root_gql.igraphqlidefresolverargs.md) |
`mod` | [*default*](../classes/base_root_module.default.md) |

**Returns:** *Promise*<[*IGQLSearchRecordsContainer*](../interfaces/gql_querier.igqlsearchrecordscontainer.md) \| [*IGQLSearchResultsContainer*](../interfaces/gql_querier.igqlsearchresultscontainer.md)\>

Defined in: [server/resolvers/actions/search.ts:57](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L57)

___

### searchModuleTraditionalFn

▸ **searchModuleTraditionalFn**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): [*FGraphQLModResolverType*](base_root_gql.md#fgraphqlmodresolvertype)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** [*FGraphQLModResolverType*](base_root_gql.md#fgraphqlmodresolvertype)

Defined in: [server/resolvers/actions/search.ts:849](https://github.com/onzag/itemize/blob/28218320/server/resolvers/actions/search.ts#L849)
