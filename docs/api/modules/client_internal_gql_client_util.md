[](../README.md) / [Exports](../modules.md) / client/internal/gql-client-util

# Module: client/internal/gql-client-util

Contains utilities for building a grapqhl client to interact
with the server, this is meant only for the javascript context
itself as it performs a lot of storing, checking and so on

## Table of contents

### Interfaces

- [IIncludeOverride](../interfaces/client_internal_gql_client_util.iincludeoverride.md)
- [IPropertyOverride](../interfaces/client_internal_gql_client_util.ipropertyoverride.md)

### Functions

- [getFieldsAndArgs](client_internal_gql_client_util.md#getfieldsandargs)
- [reprocessFileArgumentForAdd](client_internal_gql_client_util.md#reprocessfileargumentforadd)
- [runAddQueryFor](client_internal_gql_client_util.md#runaddqueryfor)
- [runDeleteQueryFor](client_internal_gql_client_util.md#rundeletequeryfor)
- [runEditQueryFor](client_internal_gql_client_util.md#runeditqueryfor)
- [runGetQueryFor](client_internal_gql_client_util.md#rungetqueryfor)
- [runSearchQueryFor](client_internal_gql_client_util.md#runsearchqueryfor)

## Functions

### getFieldsAndArgs

▸ **getFieldsAndArgs**(`options`: { `differingIncludesOnlyForArgs?`: *boolean* ; `differingPropertiesOnlyForArgs?`: *boolean* ; `forId`: *string* ; `forVersion`: *string* ; `includeArgs`: *boolean* ; `includeFields`: *boolean* ; `includeModeration`: *boolean* ; `includeOverrides?`: [*IIncludeOverride*](../interfaces/client_internal_gql_client_util.iincludeoverride.md)[] ; `includes?`: { [include: string]: *string*[];  } ; `includesForArgs?`: { [include: string]: *string*[];  } ; `itemDefinitionInstance`: [*default*](../classes/base_root_module_itemdefinition.default.md) ; `policiesForArgs?`: [*string*, *string*, *string*][] ; `properties?`: *string*[] ; `propertiesForArgs?`: *string*[] ; `propertyOverrides?`: [*IPropertyOverride*](../interfaces/client_internal_gql_client_util.ipropertyoverride.md)[] ; `uniteFieldsWithAppliedValue?`: *boolean*  }): *object*

Provides the fields and args for an item definition in order
to create a query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | *object* | - |
`options.differingIncludesOnlyForArgs?` | *boolean* | - |
`options.differingPropertiesOnlyForArgs?` | *boolean* | - |
`options.forId` | *string* | - |
`options.forVersion` | *string* | - |
`options.includeArgs` | *boolean* | whether to include the args at all   |
`options.includeFields` | *boolean* | whether to include fields at all   |
`options.includeModeration` | *boolean* | - |
`options.includeOverrides?` | [*IIncludeOverride*](../interfaces/client_internal_gql_client_util.iincludeoverride.md)[] | - |
`options.includes?` | *object* | what includes to include in the fields   |
`options.includesForArgs?` | *object* | - |
`options.itemDefinitionInstance` | [*default*](../classes/base_root_module_itemdefinition.default.md) | - |
`options.policiesForArgs?` | [*string*, *string*, *string*][] | - |
`options.properties?` | *string*[] | what properties to include in fields   |
`options.propertiesForArgs?` | *string*[] | - |
`options.propertyOverrides?` | [*IPropertyOverride*](../interfaces/client_internal_gql_client_util.ipropertyoverride.md)[] | - |
`options.uniteFieldsWithAppliedValue?` | *boolean* | - |

**Returns:** *object*

Name | Type |
:------ | :------ |
`argumentsForQuery` | *any* |
`argumentsFoundFilePaths` | *any* |
`requestFields` | *any* |

Defined in: [client/internal/gql-client-util.ts:65](https://github.com/onzag/itemize/blob/28218320/client/internal/gql-client-util.ts#L65)

___

### reprocessFileArgumentForAdd

▸ **reprocessFileArgumentForAdd**(`files`: [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[], `options`: { `config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) ; `containerId`: *string* ; `forId`: *string* ; `forVersion`: *string* ; `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md) ; `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md) ; `property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)  }): *Promise*<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[]\>

When creating a brand new item using the add action but somehow
we are using files and values from another item and submitting that
into the new ones, the new files will not have a source because they belong
to the old file, this will allow us to ensure that everything has a source
regarding these files

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`files` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[] | the file in question either an array or a file itself   |
`options` | *object* | options for restoring the source    |
`options.config` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) | - |
`options.containerId` | *string* | - |
`options.forId` | *string* | - |
`options.forVersion` | *string* | - |
`options.include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | - |
`options.itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | - |
`options.property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | - |

**Returns:** *Promise*<[*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[]\>

Defined in: [client/internal/gql-client-util.ts:298](https://github.com/onzag/itemize/blob/28218320/client/internal/gql-client-util.ts#L298)

___

### runAddQueryFor

▸ **runAddQueryFor**(`arg`: { `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) ; `cacheStore`: *boolean* ; `containerId`: *string* ; `fields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `forId`: *string* ; `forVersion`: *string* ; `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md) ; `language`: *string* ; `listenerUUID`: *string* ; `token`: *string* ; `waitAndMerge?`: *boolean*  }): *Promise*<{ `error`: [*EndpointErrorType*](base_errors.md#endpointerrortype) ; `getQueryFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `value`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

Runs an add query for a given item definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | *object* | the arg information   |
`arg.args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the graphql args for the add query that contains the information for the stuff we want to add, contains the values, as well as the policies   |
`arg.cacheStore` | *boolean* | whether to store the results of the addition process as a get query   |
`arg.containerId` | *string* | the container id to use for storage, should be calculated by the client as long as it's valid the server comply; the container id should depend on the location of the user   |
`arg.fields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the fields we want to retrieve as a result of our addition   |
`arg.forId` | *string* | a for id is used along forVersion to create a new version for the given id   |
`arg.forVersion` | *string* | a for version is used to start versioning the query element   |
`arg.itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition we are adding for   |
`arg.language` | *string* | the langauge to use for dictionary purposes   |
`arg.listenerUUID` | *string* | the listener uuid to inform for changes   |
`arg.token` | *string* | the token we are using for the addition process   |
`arg.waitAndMerge?` | *boolean* | - |

**Returns:** *Promise*<{ `error`: [*EndpointErrorType*](base_errors.md#endpointerrortype) ; `getQueryFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `value`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

a promise with an error, the fields that can be used to retrieve the same value in a get
query, and the value that was retrieved

Defined in: [client/internal/gql-client-util.ts:730](https://github.com/onzag/itemize/blob/28218320/client/internal/gql-client-util.ts#L730)

___

### runDeleteQueryFor

▸ **runDeleteQueryFor**(`arg`: { `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) ; `cacheStore`: *boolean* ; `id`: *string* ; `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md) ; `language`: *string* ; `listenerUUID`: *string* ; `token`: *string* ; `version`: *string* ; `waitAndMerge?`: *boolean*  }): *Promise*<{ `error`: [*EndpointErrorType*](base_errors.md#endpointerrortype)  }\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | *object* | the information for the delete query   |
`arg.args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the args for the delete query, might contain policy information   |
`arg.cacheStore` | *boolean* | whether to cache store the deleted information   |
`arg.id` | *string* | the id we want to delete for   |
`arg.itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition we want to run a delete query for   |
`arg.language` | *string* | the language to use, for dictionary purposes   |
`arg.listenerUUID` | *string* | the listener uuid to send with   |
`arg.token` | *string* | the token to use   |
`arg.version` | *string* | the version that we are deleting for (or null)   |
`arg.waitAndMerge?` | *boolean* | - |

**Returns:** *Promise*<{ `error`: [*EndpointErrorType*](base_errors.md#endpointerrortype)  }\>

a promise with an error on whether it succeed or not

Defined in: [client/internal/gql-client-util.ts:646](https://github.com/onzag/itemize/blob/28218320/client/internal/gql-client-util.ts#L646)

___

### runEditQueryFor

▸ **runEditQueryFor**(`arg`: { `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) ; `cacheStore`: *boolean* ; `fields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `id`: *string* ; `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md) ; `language`: *string* ; `listenerUUID`: *string* ; `token`: *string* ; `version`: *string* ; `waitAndMerge?`: *boolean*  }): *Promise*<{ `error`: [*EndpointErrorType*](base_errors.md#endpointerrortype) ; `getQueryFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `value`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

Runs an edit query for a given item definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | *object* | the arg with the get query information   |
`arg.args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the arg to use the edition for, these contain the new property values as well as any policies that are deemed necessary   |
`arg.cacheStore` | *boolean* | whether to store the result of this edition in our cache    |
`arg.fields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the fields to request from the edit query   |
`arg.id` | *string* | the id we are editing   |
`arg.itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition we are editing   |
`arg.language` | *string* | - |
`arg.listenerUUID` | *string* | the listener uuid we are using   |
`arg.token` | *string* | the token for validation   |
`arg.version` | *string* | the version we are editing, or null   |
`arg.waitAndMerge?` | *boolean* | - |

**Returns:** *Promise*<{ `error`: [*EndpointErrorType*](base_errors.md#endpointerrortype) ; `getQueryFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `value`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

Defined in: [client/internal/gql-client-util.ts:830](https://github.com/onzag/itemize/blob/28218320/client/internal/gql-client-util.ts#L830)

___

### runGetQueryFor

▸ **runGetQueryFor**(`arg`: { `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) ; `cacheStore`: *boolean* ; `fields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `id`: *string* ; `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md) ; `language`: *string* ; `returnMemoryCachedValues`: *boolean* ; `returnWorkerCachedValues`: *boolean* ; `returnWorkerCachedValuesIfNoInternet?`: *boolean* ; `token`: *string* ; `version`: *string* ; `waitAndMerge?`: *boolean*  }): *Promise*<{ `cached`: *boolean* ; `error`: [*EndpointErrorType*](base_errors.md#endpointerrortype) ; `getQueryFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `memoryCached`: *boolean* ; `value`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

Runs a get query for a given item definition and its args

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | *object* | the arg to use   |
`arg.args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the args to request the server with, normaly just {}   |
`arg.cacheStore` | *boolean* | whether to store the results in the cache   |
`arg.fields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the fields we are requesting   |
`arg.id` | *string* | the id we are requesting for   |
`arg.itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition we are requesting for   |
`arg.language` | *string* | the language we are using for it, used for dictionary purposes   |
`arg.returnMemoryCachedValues` | *boolean* | whether to return values that are cached in memory   |
`arg.returnWorkerCachedValues` | *boolean* | whether to return values that are in the cache worker   |
`arg.returnWorkerCachedValuesIfNoInternet?` | *boolean* | optimally it will request the internet but if it can't connect it will request the worker instead   |
`arg.token` | *string* | the token we are using   |
`arg.version` | *string* | the version we are requesting for   |
`arg.waitAndMerge?` | *boolean* | - |

**Returns:** *Promise*<{ `cached`: *boolean* ; `error`: [*EndpointErrorType*](base_errors.md#endpointerrortype) ; `getQueryFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) ; `memoryCached`: *boolean* ; `value`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)  }\>

a promise with a bunch of information

Defined in: [client/internal/gql-client-util.ts:485](https://github.com/onzag/itemize/blob/28218320/client/internal/gql-client-util.ts#L485)

___

### runSearchQueryFor

▸ **runSearchQueryFor**(`arg`: IRunSearchQueryArg, `searchOptions`: IRunSearchQuerySearchOptions): *Promise*<IRunSearchQueryResult\>

Runs the surprisingly complex search query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | IRunSearchQueryArg | the arg for the search operation   |
`searchOptions` | IRunSearchQuerySearchOptions | the search options used and required for cache based searches or listen based searches   |

**Returns:** *Promise*<IRunSearchQueryResult\>

a promise with the error, results (for traditional), the records, the count
which might me larger than the number of records, however the record length should
be equal to the limit, and the offset given

Defined in: [client/internal/gql-client-util.ts:1022](https://github.com/onzag/itemize/blob/28218320/client/internal/gql-client-util.ts#L1022)
