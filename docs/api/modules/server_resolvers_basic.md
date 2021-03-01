[](../README.md) / [Exports](../modules.md) / server/resolvers/basic

# Module: server/resolvers/basic

## Table of contents

### Interfaces

- [IFilteredAndPreparedValueType](../interfaces/server_resolvers_basic.ifilteredandpreparedvaluetype.md)
- [IServerSideTokenDataType](../interfaces/server_resolvers_basic.iserversidetokendatatype.md)

### Functions

- [checkBasicFieldsAreAvailableForRole](server_resolvers_basic.md#checkbasicfieldsareavailableforrole)
- [checkLanguage](server_resolvers_basic.md#checklanguage)
- [checkLimit](server_resolvers_basic.md#checklimit)
- [checkLimiters](server_resolvers_basic.md#checklimiters)
- [checkListTypes](server_resolvers_basic.md#checklisttypes)
- [checkReadPoliciesAllowThisUserToSearch](server_resolvers_basic.md#checkreadpoliciesallowthisusertosearch)
- [checkUserCanSearch](server_resolvers_basic.md#checkusercansearch)
- [checkUserExists](server_resolvers_basic.md#checkuserexists)
- [defaultTriggerForbiddenFunction](server_resolvers_basic.md#defaulttriggerforbiddenfunction)
- [defaultTriggerInvalidForbiddenFunction](server_resolvers_basic.md#defaulttriggerinvalidforbiddenfunction)
- [defaultTriggerWaitForPromiseFunction](server_resolvers_basic.md#defaulttriggerwaitforpromisefunction)
- [filterAndPrepareGQLValue](server_resolvers_basic.md#filterandpreparegqlvalue)
- [getDictionary](server_resolvers_basic.md#getdictionary)
- [retrieveSince](server_resolvers_basic.md#retrievesince)
- [runPolicyCheck](server_resolvers_basic.md#runpolicycheck)
- [serverSideCheckItemDefinitionAgainst](server_resolvers_basic.md#serversidecheckitemdefinitionagainst)
- [splitArgsInGraphqlQuery](server_resolvers_basic.md#splitargsingraphqlquery)
- [validateContainerIdIsReal](server_resolvers_basic.md#validatecontaineridisreal)
- [validateParentingRules](server_resolvers_basic.md#validateparentingrules)
- [validateTokenAndGetData](server_resolvers_basic.md#validatetokenandgetdata)
- [validateTokenIsntBlocked](server_resolvers_basic.md#validatetokenisntblocked)

## Functions

### checkBasicFieldsAreAvailableForRole

▸ **checkBasicFieldsAreAvailableForRole**(`itemDefinitionOrModule`: [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md), `tokenData`: [*IServerSideTokenDataType*](../interfaces/server_resolvers_basic.iserversidetokendatatype.md), `requestedFields`: *any*): *boolean*

Checks if the basic fields are available for the given role, basic
fields are of those reserved properties that are in every module

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinitionOrModule` | [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md) | - |
`tokenData` | [*IServerSideTokenDataType*](../interfaces/server_resolvers_basic.iserversidetokendatatype.md) | the token data that is obtained via the validateTokenAndGetData function   |
`requestedFields` | *any* | the requested fields    |

**Returns:** *boolean*

Defined in: [server/resolvers/basic.ts:197](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L197)

___

### checkLanguage

▸ **checkLanguage**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `args`: *any*): *void*

Checks the language and region given the arguments passed
by the graphql resolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) | the app data that is currently in context   |
`args` | *any* | the args themselves being passed to the resolver    |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:452](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L452)

___

### checkLimit

▸ **checkLimit**(`limit`: *number*, `idefOrMod`: [*default*](../classes/base_root_module.default.md) \| [*default*](../classes/base_root_module_itemdefinition.default.md), `traditional`: *boolean*): *void*

Checks that the limit of search results is within the range that the item
defintion allows

#### Parameters:

Name | Type |
:------ | :------ |
`limit` | *number* |
`idefOrMod` | [*default*](../classes/base_root_module.default.md) \| [*default*](../classes/base_root_module_itemdefinition.default.md) |
`traditional` | *boolean* |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:404](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L404)

___

### checkLimiters

▸ **checkLimiters**(`args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `idefOrMod`: [*default*](../classes/base_root_module.default.md) \| [*default*](../classes/base_root_module_itemdefinition.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) |
`idefOrMod` | [*default*](../classes/base_root_module.default.md) \| [*default*](../classes/base_root_module_itemdefinition.default.md) |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:252](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L252)

___

### checkListTypes

▸ **checkListTypes**(`records`: [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[], `mod`: [*default*](../classes/base_root_module.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`records` | [*IGQLSearchRecord*](../interfaces/gql_querier.igqlsearchrecord.md)[] |
`mod` | [*default*](../classes/base_root_module.default.md) |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:418](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L418)

___

### checkReadPoliciesAllowThisUserToSearch

▸ **checkReadPoliciesAllowThisUserToSearch**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `role`: *string*): *void*

Users cannot search if they have an active read policy in their roles
this function checks and throws an error if there's such a thing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition to check read policies for   |
`role` | *string* | the role    |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:878](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L878)

___

### checkUserCanSearch

▸ **checkUserCanSearch**(`args`: *any*, `moduleOrIdef`: [*default*](../classes/base_root_module.default.md) \| [*default*](../classes/base_root_module_itemdefinition.default.md), `tokenData`: [*IServerSideTokenDataType*](../interfaces/server_resolvers_basic.iserversidetokendatatype.md)): *void*

Checks that a given user can perform the given search
as it was requested

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`args` | *any* | the args   |
`moduleOrIdef` | [*default*](../classes/base_root_module.default.md) \| [*default*](../classes/base_root_module_itemdefinition.default.md) | a module or an item definition the search is held against   |
`tokenData` | [*IServerSideTokenDataType*](../interfaces/server_resolvers_basic.iserversidetokendatatype.md) | the token data    |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:483](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L483)

___

### checkUserExists

▸ **checkUserExists**(`cache`: [*Cache*](../classes/server_cache.cache.md), `id`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`cache` | [*Cache*](../classes/server_cache.cache.md) |
`id` | *string* |

**Returns:** *Promise*<void\>

Defined in: [server/resolvers/basic.ts:601](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L601)

___

### defaultTriggerForbiddenFunction

▸ **defaultTriggerForbiddenFunction**(`message`: *string*, `customCode?`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`customCode?` | *string* |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:47](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L47)

___

### defaultTriggerInvalidForbiddenFunction

▸ **defaultTriggerInvalidForbiddenFunction**(`message`: *string*, `customCode?`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`customCode?` | *string* |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:58](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L58)

___

### defaultTriggerWaitForPromiseFunction

▸ **defaultTriggerWaitForPromiseFunction**(): *void*

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:54](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L54)

___

### filterAndPrepareGQLValue

▸ **filterAndPrepareGQLValue**(`serverData`: *any*, `value`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md), `requestedFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md), `role`: *string*, `parentModuleOrIdef`: [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md)): [*IFilteredAndPreparedValueType*](../interfaces/server_resolvers_basic.ifilteredandpreparedvaluetype.md)

Filters and prepares a graphql value for output to the rest endpoint
given the value that has given by the server, the requested fields
that are supposed to be outputted, the role of the current user
and the parent module or item definition this value belongs to,
the form comes with the DATA and the externalized fields

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | - |
`value` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | the value gotten from the sql database   |
`requestedFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the requested fields, flattened   |
`role` | *string* | the role of the user requesting the data   |
`parentModuleOrIdef` | [*default*](../classes/base_root_module_itemdefinition.default.md) \| [*default*](../classes/base_root_module.default.md) | the parent module or item definition the value belongs to    |

**Returns:** [*IFilteredAndPreparedValueType*](../interfaces/server_resolvers_basic.ifilteredandpreparedvaluetype.md)

Defined in: [server/resolvers/basic.ts:646](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L646)

___

### getDictionary

▸ **getDictionary**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `args`: *any*): *string*

This just extracts the dictionary given the app data
and the language of choice

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) | the app data   |
`args` | *any* | the whole args of the graphql request    |

**Returns:** *string*

Defined in: [server/resolvers/basic.ts:515](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L515)

___

### retrieveSince

▸ **retrieveSince**(`args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md)): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) |

**Returns:** *string*

Defined in: [server/resolvers/basic.ts:237](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L237)

___

### runPolicyCheck

▸ **runPolicyCheck**(`arg`: { `cache`: [*Cache*](../classes/server_cache.cache.md) ; `gqlArgValue`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) ; `gqlFlattenedRequestedFiels`: *any* ; `id`: *string* ; `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md) ; `parentId?`: *string* ; `parentModule?`: *string* ; `parentType?`: *string* ; `parentVersion?`: *string* ; `policyTypes`: *string*[] ; `preParentValidation?`: (`content`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)) => *void* \| [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) ; `preValidation?`: (`content`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)) => *void* \| [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) ; `role`: *string* ; `version`: *string*  }): *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)\>

Runs a policy check on the requested information

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | *object* | - |
`arg.cache` | [*Cache*](../classes/server_cache.cache.md) | the cache instance   |
`arg.gqlArgValue` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the arg value given in the arguments from graphql, where the info should be in qualified path names for the policies   |
`arg.gqlFlattenedRequestedFiels` | *any* | the flattened request fields that have been requested to read   |
`arg.id` | *string* | the id of that item definition on the database   |
`arg.itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`arg.parentId?` | *string* | the parent id to use in a policy type parent   |
`arg.parentModule?` | *string* | the parent module to use in a policy type parent   |
`arg.parentType?` | *string* | the parent type (qualified name and table) to use in a policy type parent   |
`arg.parentVersion?` | *string* | - |
`arg.policyTypes` | *string*[] | - |
`arg.preParentValidation?` | (`content`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)) => *void* \| [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | - |
`arg.preValidation?` | (`content`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)) => *void* \| [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | a validation to do, validate if the row doesn't exist here, and anything else necessary the function will crash by Internal server error if no validation is done if the row is null; return a value if you want to force it to return instead without an error   |
`arg.role` | *string* | the role of the current user   |
`arg.version` | *string* | the version of the item definition on the database   |

**Returns:** *Promise*<[*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)\>

Defined in: [server/resolvers/basic.ts:955](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L955)

___

### serverSideCheckItemDefinitionAgainst

▸ **serverSideCheckItemDefinitionAgainst**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `gqlArgValue`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `id`: *string*, `version`: *string*, `referredInclude?`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `referredParentOfInclude?`: [*default*](../classes/base_root_module_itemdefinition.default.md)): *Promise*<void\>

Checks that an item definition current state is
valid and that the gqlArgValue provided is a match
for this item definition current value, remember
that in order to set the state to the gqlArgValue
you should run itemDefinition.applyValue(gqlArgValue);

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`gqlArgValue` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the arg value that was set   |
`id` | *string* | the stored item id, if available, or null   |
`version` | *string* | the stored item version if avaliable   |
`referredInclude?` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | this is an optional include used to basically provide better error logging    |
`referredParentOfInclude?` | [*default*](../classes/base_root_module_itemdefinition.default.md) | - |

**Returns:** *Promise*<void\>

Defined in: [server/resolvers/basic.ts:728](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L728)

___

### splitArgsInGraphqlQuery

▸ **splitArgsInGraphqlQuery**(`moduleOrItemDefinition`: [*default*](../classes/base_root_module.default.md) \| [*default*](../classes/base_root_module_itemdefinition.default.md), `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md)): [[*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md)]

Splits the arguments in a graphql query from what it comes to be part
of the item definition or module in question and what is extra arguments
that are used within the query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`moduleOrItemDefinition` | [*default*](../classes/base_root_module.default.md) \| [*default*](../classes/base_root_module_itemdefinition.default.md) | the module or item definition   |
`args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the arguments to split    |

**Returns:** [[*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md)]

Defined in: [server/resolvers/basic.ts:909](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L909)

___

### validateContainerIdIsReal

▸ **validateContainerIdIsReal**(`containerId`: *string*, `sensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): *void*

Validates and checks that a given container id is valid
to store data in

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`containerId` | *string* | the container id   |
`sensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) | the sensitive config    |

**Returns:** *void*

Defined in: [server/resolvers/basic.ts:529](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L529)

___

### validateParentingRules

▸ **validateParentingRules**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `parentId`: *string*, `parentVersion`: *string*, `parentType`: *string*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `userId`: *string*, `role`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md)): *Promise*<void\>

Validates that the parenting rules are respected for the item definition
in question that wants to be created

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) | the app data   |
`parentId` | *string* | the id of the parent item definition   |
`parentVersion` | *string* | the version of the parent item definition   |
`parentType` | *string* | the type of the parent item definition   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that is attempting to child   |
`userId` | *string* | the user id   |
`role` | *string* | the role    |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |

**Returns:** *Promise*<void\>

Defined in: [server/resolvers/basic.ts:126](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L126)

___

### validateTokenAndGetData

▸ **validateTokenAndGetData**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `token`: *string*): *Promise*<[*IServerSideTokenDataType*](../interfaces/server_resolvers_basic.iserversidetokendatatype.md)\>

Given a token, it validates and provides the role information
for use in the system

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) | - |
`token` | *string* | the token passed via the args    |

**Returns:** *Promise*<[*IServerSideTokenDataType*](../interfaces/server_resolvers_basic.iserversidetokendatatype.md)\>

Defined in: [server/resolvers/basic.ts:74](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L74)

___

### validateTokenIsntBlocked

▸ **validateTokenIsntBlocked**(`cache`: [*Cache*](../classes/server_cache.cache.md), `tokenData`: [*IServerSideTokenDataType*](../interfaces/server_resolvers_basic.iserversidetokendatatype.md)): *Promise*<void\>

Validates the current token isn't blocked whether it is said so
by the rules of the session id, user is removed, or invalid credentials

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`cache` | [*Cache*](../classes/server_cache.cache.md) | the appdata cache instance   |
`tokenData` | [*IServerSideTokenDataType*](../interfaces/server_resolvers_basic.iserversidetokendatatype.md) | the token data obtained and parsed    |

**Returns:** *Promise*<void\>

Defined in: [server/resolvers/basic.ts:552](https://github.com/onzag/itemize/blob/5fcde7cf/server/resolvers/basic.ts#L552)
