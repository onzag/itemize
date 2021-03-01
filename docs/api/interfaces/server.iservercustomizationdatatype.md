[](../README.md) / [Exports](../modules.md) / [server](../modules/server.md) / IServerCustomizationDataType

# Interface: IServerCustomizationDataType

[server](../modules/server.md).IServerCustomizationDataType

## Table of contents

### Properties

- [customGQLMutations](server.iservercustomizationdatatype.md#customgqlmutations)
- [customGQLQueries](server.iservercustomizationdatatype.md#customgqlqueries)
- [customRoles](server.iservercustomizationdatatype.md#customroles)
- [customRouter](server.iservercustomizationdatatype.md#customrouter)
- [customRouterEndpoint](server.iservercustomizationdatatype.md#customrouterendpoint)
- [customTokenGQLQueries](server.iservercustomizationdatatype.md#customtokengqlqueries)
- [customTriggers](server.iservercustomizationdatatype.md#customtriggers)

## Properties

### customGQLMutations

• `Optional` **customGQLMutations**: (`appData`: [*IAppDataType*](server.iappdatatype.md)) => [*IGQLQueryFieldsDefinitionType*](gql.igqlqueryfieldsdefinitiontype.md)

#### Type declaration:

▸ (`appData`: [*IAppDataType*](server.iappdatatype.md)): [*IGQLQueryFieldsDefinitionType*](gql.igqlqueryfieldsdefinitiontype.md)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](server.iappdatatype.md) |

**Returns:** [*IGQLQueryFieldsDefinitionType*](gql.igqlqueryfieldsdefinitiontype.md)

Defined in: [server/index.ts:197](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L197)

Defined in: [server/index.ts:197](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L197)

___

### customGQLQueries

• `Optional` **customGQLQueries**: (`appData`: [*IAppDataType*](server.iappdatatype.md)) => [*IGQLQueryFieldsDefinitionType*](gql.igqlqueryfieldsdefinitiontype.md)

#### Type declaration:

▸ (`appData`: [*IAppDataType*](server.iappdatatype.md)): [*IGQLQueryFieldsDefinitionType*](gql.igqlqueryfieldsdefinitiontype.md)

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](server.iappdatatype.md) |

**Returns:** [*IGQLQueryFieldsDefinitionType*](gql.igqlqueryfieldsdefinitiontype.md)

Defined in: [server/index.ts:195](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L195)

Defined in: [server/index.ts:195](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L195)

___

### customRoles

• `Optional` **customRoles**: [*ICustomRoleType*](server_resolvers_roles.icustomroletype.md)[]

Defined in: [server/index.ts:201](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L201)

___

### customRouter

• `Optional` **customRouter**: (`appData`: [*IAppDataType*](server.iappdatatype.md)) => *Router*

#### Type declaration:

▸ (`appData`: [*IAppDataType*](server.iappdatatype.md)): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](server.iappdatatype.md) |

**Returns:** *Router*

Defined in: [server/index.ts:199](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L199)

Defined in: [server/index.ts:199](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L199)

___

### customRouterEndpoint

• `Optional` **customRouterEndpoint**: *string*

Defined in: [server/index.ts:198](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L198)

___

### customTokenGQLQueries

• `Optional` **customTokenGQLQueries**: [*ICustomTokensType*](server_custom_graphql.icustomtokenstype.md)

Defined in: [server/index.ts:196](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L196)

___

### customTriggers

• `Optional` **customTriggers**: [*ITriggerRegistry*](server_resolvers_triggers.itriggerregistry.md)

Defined in: [server/index.ts:200](https://github.com/onzag/itemize/blob/0569bdf2/server/index.ts#L200)
