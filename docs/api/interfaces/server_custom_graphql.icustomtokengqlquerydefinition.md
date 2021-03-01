[](../README.md) / [Exports](../modules.md) / [server/custom-graphql](../modules/server_custom_graphql.md) / ICustomTokenGQLQueryDefinition

# Interface: ICustomTokenGQLQueryDefinition

[server/custom-graphql](../modules/server_custom_graphql.md).ICustomTokenGQLQueryDefinition

Specifies the definition for a custom token graphql query
These queries can be different from the graphql standard
as they do not provide the json that they claim to give
but rather it's processed again

## Table of contents

### Properties

- [args](server_custom_graphql.icustomtokengqlquerydefinition.md#args)
- [resolve](server_custom_graphql.icustomtokengqlquerydefinition.md#resolve)

## Properties

### args

• `Optional` **args**: [*IGQLFieldsDefinitionType*](gql.igqlfieldsdefinitiontype.md)

These are the args that the graphql query needs to take

Defined in: [server/custom-graphql/index.ts:80](https://github.com/onzag/itemize/blob/0569bdf2/server/custom-graphql/index.ts#L80)

___

### resolve

• **resolve**: (`appData`: [*IAppDataType*](server.iappdatatype.md), `args`: { `args`: *any* ; `context`: *any* ; `info`: *any* ; `source`: *any*  }) => [*IReferredTokenStructure*](server_custom_graphql.ireferredtokenstructure.md) \| *Promise*<[*IReferredTokenStructure*](server_custom_graphql.ireferredtokenstructure.md)\>

This is the resolve function on how to resolve this graphql query

#### Type declaration:

▸ (`appData`: [*IAppDataType*](server.iappdatatype.md), `args`: { `args`: *any* ; `context`: *any* ; `info`: *any* ; `source`: *any*  }): [*IReferredTokenStructure*](server_custom_graphql.ireferredtokenstructure.md) \| *Promise*<[*IReferredTokenStructure*](server_custom_graphql.ireferredtokenstructure.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](server.iappdatatype.md) |
`args` | *object* |
`args.args` | *any* |
`args.context` | *any* |
`args.info` | *any* |
`args.source` | *any* |

**Returns:** [*IReferredTokenStructure*](server_custom_graphql.ireferredtokenstructure.md) \| *Promise*<[*IReferredTokenStructure*](server_custom_graphql.ireferredtokenstructure.md)\>

Defined in: [server/custom-graphql/index.ts:60](https://github.com/onzag/itemize/blob/0569bdf2/server/custom-graphql/index.ts#L60)

Defined in: [server/custom-graphql/index.ts:60](https://github.com/onzag/itemize/blob/0569bdf2/server/custom-graphql/index.ts#L60)
