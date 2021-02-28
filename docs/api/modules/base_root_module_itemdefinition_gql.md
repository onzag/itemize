[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/gql

# Module: base/Root/Module/ItemDefinition/gql

This file contains all the graphql functions that need to be used to request
and process an item definition, from the definition to how it must be queried

## Table of contents

### Functions

- [getGQLFieldsDefinitionForItemDefinition](base_root_module_itemdefinition_gql.md#getgqlfieldsdefinitionforitemdefinition)
- [getGQLFieldsDefinitionForItemDefinitionPolicies](base_root_module_itemdefinition_gql.md#getgqlfieldsdefinitionforitemdefinitionpolicies)
- [getGQLMutationFieldsForItemDefinition](base_root_module_itemdefinition_gql.md#getgqlmutationfieldsforitemdefinition)
- [getGQLQueryFieldsForItemDefinition](base_root_module_itemdefinition_gql.md#getgqlqueryfieldsforitemdefinition)
- [getGQLQueryOutputForItemDefinition](base_root_module_itemdefinition_gql.md#getgqlqueryoutputforitemdefinition)
- [getGQLTypeForItemDefinition](base_root_module_itemdefinition_gql.md#getgqltypeforitemdefinition)

## Functions

### getGQLFieldsDefinitionForItemDefinition

▸ **getGQLFieldsDefinitionForItemDefinition**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `options`: { `excludeBase`: *boolean* ; `includePolicy`: *string* \| *string*[] ; `optionalForm`: *boolean* ; `propertiesAsInput`: *boolean* ; `retrievalMode`: *boolean*  }): [*IGQLFieldsDefinitionType*](../interfaces/base_root_gql.igqlfieldsdefinitiontype.md)

Provides all the graphql fields that this item definition contains as well as its
includes, but only of this specific item definition and does not include its children item
definition, this includes all extended properties

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`options` | *object* | - |
`options.excludeBase` | *boolean* | whether to exclude the base properties, like created_at, etc..   |
`options.includePolicy` | *string* \| *string*[] | whether to include the policies in the result, this is a string that specifies the policy type that is to be included, eg "edit", "delete", "read" and "parent"   |
`options.optionalForm` | *boolean* | makes all the parameters optional, that is nullable   |
`options.propertiesAsInput` | *boolean* | if the properties should be in input form   |
`options.retrievalMode` | *boolean* | whether it is in retrieval mode   |

**Returns:** [*IGQLFieldsDefinitionType*](../interfaces/base_root_gql.igqlfieldsdefinitiontype.md)

a fields definition object that represents the whole item definition as it was specified

Defined in: [base/Root/Module/ItemDefinition/gql.ts:50](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/gql.ts#L50)

___

### getGQLFieldsDefinitionForItemDefinitionPolicies

▸ **getGQLFieldsDefinitionForItemDefinitionPolicies**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `options`: { `policy`: *string* ; `propertiesAsInput`: *boolean*  }): [*IGQLFieldsDefinitionType*](../interfaces/base_root_gql.igqlfieldsdefinitiontype.md)

Provides the fields that are required to include policy data for property
definitions

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`options` | *object* | - |
`options.policy` | *string* | the policy type that should be included, eg "edit", "delete", "read" and "parent"   |
`options.propertiesAsInput` | *boolean* | if the properties should be in input form   |

**Returns:** [*IGQLFieldsDefinitionType*](../interfaces/base_root_gql.igqlfieldsdefinitiontype.md)

a partial graphql fields definition that only contains the policies

Defined in: [base/Root/Module/ItemDefinition/gql.ts:127](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/gql.ts#L127)

___

### getGQLMutationFieldsForItemDefinition

▸ **getGQLMutationFieldsForItemDefinition**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `resolvers?`: [*IGraphQLResolversType*](../interfaces/base_root_gql.igraphqlresolverstype.md)): [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md)

Provides all the fields for the mutations that are required to take
place in order to ADD, EDIT and DELETE item definition values, this
also goes through all the children

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`resolvers?` | [*IGraphQLResolversType*](../interfaces/base_root_gql.igraphqlresolverstype.md) | the resolvers for the graphql mutations to populate   |

**Returns:** [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md)

the mutation fields for the mutation object to do ADD, EDIT and DELETE

Defined in: [base/Root/Module/ItemDefinition/gql.ts:440](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/gql.ts#L440)

___

### getGQLQueryFieldsForItemDefinition

▸ **getGQLQueryFieldsForItemDefinition**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `resolvers?`: [*IGraphQLResolversType*](../interfaces/base_root_gql.igraphqlresolverstype.md)): [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md)

Provides all the GET, GET_LIST and SEARCH query fields for the given item definition, including
all the search queries of the children item definitions as well

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that we should retrieve these from   |
`resolvers?` | [*IGraphQLResolversType*](../interfaces/base_root_gql.igraphqlresolverstype.md) | the resolvers object that will be used to populate the resolvers of the query fields   |

**Returns:** [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md)

the fields for the main query object to do GET, GET_LIST and SEARCH

Defined in: [base/Root/Module/ItemDefinition/gql.ts:294](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/gql.ts#L294)

___

### getGQLQueryOutputForItemDefinition

▸ **getGQLQueryOutputForItemDefinition**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): GraphQLObjectType

Provides the query output, that is what a GET_ query provides in an item
being so that the DATA attributes are there and the external attributes
as well, the non flattened form, this is because of blocked rules

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |

**Returns:** GraphQLObjectType

the graphql query object that shows its not flattened form it is always
the same as it's flattened

Defined in: [base/Root/Module/ItemDefinition/gql.ts:194](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/gql.ts#L194)

___

### getGQLTypeForItemDefinition

▸ **getGQLTypeForItemDefinition**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): GraphQLOutputType

Provides the graphql type for the given item definition which
extends the interface of its parent module already

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |

**Returns:** GraphQLOutputType

the graphql type that should be used to refer to this item definition, it is always
the same as it's cached once it's first retrieved

Defined in: [base/Root/Module/ItemDefinition/gql.ts:161](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/gql.ts#L161)
