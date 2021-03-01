[](../README.md) / [Exports](../modules.md) / [server/custom-graphql](../modules/server_custom_graphql.md) / IReferredTokenStructure

# Interface: IReferredTokenStructure

[server/custom-graphql](../modules/server_custom_graphql.md).IReferredTokenStructure

The referred token structure specifies information for
building a custom token for usage with third party clients
eg. sensors or robots

A token can be made with a different role even if it's made in
behalf of someone else

## Table of contents

### Properties

- [customData](server_custom_graphql.ireferredtokenstructure.md#customdata)
- [error](server_custom_graphql.ireferredtokenstructure.md#error)
- [expiresIn](server_custom_graphql.ireferredtokenstructure.md#expiresin)
- [onBehalfOf](server_custom_graphql.ireferredtokenstructure.md#onbehalfof)
- [withRole](server_custom_graphql.ireferredtokenstructure.md#withrole)

## Properties

### customData

• `Optional` **customData**: *any*

Specifies custom data to pass alongside that token
custom data is passed to the item definition triggers
so you can perform custom functionality based on it
this data should be serializable

Defined in: [server/custom-graphql/index.ts:43](https://github.com/onzag/itemize/blob/0e9b128c/server/custom-graphql/index.ts#L43)

___

### error

• `Optional` **error**: *string*

Will throw an error when this is provided and not provide any token

Defined in: [server/custom-graphql/index.ts:47](https://github.com/onzag/itemize/blob/0e9b128c/server/custom-graphql/index.ts#L47)

___

### expiresIn

• `Optional` **expiresIn**: *string*

Specifies an expiration date

Defined in: [server/custom-graphql/index.ts:36](https://github.com/onzag/itemize/blob/0e9b128c/server/custom-graphql/index.ts#L36)

___

### onBehalfOf

• `Optional` **onBehalfOf**: *string*

Specifies an user id that the token should be built for

Defined in: [server/custom-graphql/index.ts:26](https://github.com/onzag/itemize/blob/0e9b128c/server/custom-graphql/index.ts#L26)

___

### withRole

• `Optional` **withRole**: *string*

Specifies the role that the token should have, if you don't specify
a role and don't have anyone on whom it's made in behalf of, then it'll
stick to being a guest

Defined in: [server/custom-graphql/index.ts:32](https://github.com/onzag/itemize/blob/0e9b128c/server/custom-graphql/index.ts#L32)
