[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/custom-graphql](../modules/server_custom_graphql.md) / ICustomTokenGQLQueryDefinition

# Interface: ICustomTokenGQLQueryDefinition

[server/custom-graphql](../modules/server_custom_graphql.md).ICustomTokenGQLQueryDefinition

Specifies the definition for a custom token graphql query
These queries can be different from the graphql standard
as they do not provide the json that they claim to give
but rather it's processed again

## Table of contents

### Properties

- [args](server_custom_graphql.ICustomTokenGQLQueryDefinition.md#args)

### Methods

- [resolve](server_custom_graphql.ICustomTokenGQLQueryDefinition.md#resolve)

## Properties

### args

• `Optional` **args**: [`IGQLFieldsDefinitionType`](base_Root_gql.IGQLFieldsDefinitionType.md)

These are the args that the graphql query needs to take

#### Defined in

[server/custom-graphql/index.ts:80](https://github.com/onzag/itemize/blob/f2f29986/server/custom-graphql/index.ts#L80)

## Methods

### resolve

▸ **resolve**(`appData`, `args`): [`IReferredTokenStructure`](server_custom_graphql.IReferredTokenStructure.md) \| `Promise`<[`IReferredTokenStructure`](server_custom_graphql.IReferredTokenStructure.md)\>

This is the resolve function on how to resolve this graphql query

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |
| `args` | `Object` |
| `args.args` | `any` |
| `args.context` | `any` |
| `args.info` | `any` |
| `args.source` | `any` |

#### Returns

[`IReferredTokenStructure`](server_custom_graphql.IReferredTokenStructure.md) \| `Promise`<[`IReferredTokenStructure`](server_custom_graphql.IReferredTokenStructure.md)\>

#### Defined in

[server/custom-graphql/index.ts:60](https://github.com/onzag/itemize/blob/f2f29986/server/custom-graphql/index.ts#L60)
