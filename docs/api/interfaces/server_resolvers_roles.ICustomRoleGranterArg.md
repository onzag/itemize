[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/roles](../modules/server_resolvers_roles.md) / ICustomRoleGranterArg

# Interface: ICustomRoleGranterArg

[server/resolvers/roles](../modules/server_resolvers_roles.md).ICustomRoleGranterArg

## Table of contents

### Properties

- [cache](server_resolvers_roles.ICustomRoleGranterArg.md#cache)
- [customId](server_resolvers_roles.ICustomRoleGranterArg.md#customid)
- [databaseConnection](server_resolvers_roles.ICustomRoleGranterArg.md#databaseconnection)
- [environment](server_resolvers_roles.ICustomRoleGranterArg.md#environment)
- [environmentParent](server_resolvers_roles.ICustomRoleGranterArg.md#environmentparent)
- [id](server_resolvers_roles.ICustomRoleGranterArg.md#id)
- [item](server_resolvers_roles.ICustomRoleGranterArg.md#item)
- [module](server_resolvers_roles.ICustomRoleGranterArg.md#module)
- [owner](server_resolvers_roles.ICustomRoleGranterArg.md#owner)
- [parent](server_resolvers_roles.ICustomRoleGranterArg.md#parent)
- [rawDB](server_resolvers_roles.ICustomRoleGranterArg.md#rawdb)
- [requestArgs](server_resolvers_roles.ICustomRoleGranterArg.md#requestargs)
- [root](server_resolvers_roles.ICustomRoleGranterArg.md#root)
- [tokenData](server_resolvers_roles.ICustomRoleGranterArg.md#tokendata)
- [user](server_resolvers_roles.ICustomRoleGranterArg.md#user)
- [value](server_resolvers_roles.ICustomRoleGranterArg.md#value)
- [version](server_resolvers_roles.ICustomRoleGranterArg.md#version)

## Properties

### cache

• **cache**: [`Cache`](../classes/server_cache.Cache.md)

#### Defined in

[server/resolvers/roles.ts:37](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L37)

___

### customId

• **customId**: `string`

When creating, if a custom id is given this field will contain it

#### Defined in

[server/resolvers/roles.ts:64](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L64)

___

### databaseConnection

• **databaseConnection**: [`DatabaseConnection`](../classes/database.DatabaseConnection.md)

#### Defined in

[server/resolvers/roles.ts:38](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L38)

___

### environment

• **environment**: [`CustomRoleGranterEnvironment`](../enums/server_resolvers_roles.CustomRoleGranterEnvironment.md)

#### Defined in

[server/resolvers/roles.ts:45](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L45)

___

### environmentParent

• **environmentParent**: [`ICustomRoleGranterArg`](server_resolvers_roles.ICustomRoleGranterArg.md)

The environment that sits above this one, that caused this one to be generated
useful when adding children and needing to know who is adding such children

#### Defined in

[server/resolvers/roles.ts:69](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L69)

___

### id

• **id**: `string`

#### Defined in

[server/resolvers/roles.ts:43](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L43)

___

### item

• **item**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Defined in

[server/resolvers/roles.ts:40](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L40)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

#### Defined in

[server/resolvers/roles.ts:41](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L41)

___

### owner

• **owner**: `string`

Represents the expected owner of the given item
and it's affected by executing actions in behalf of someone else

#### Defined in

[server/resolvers/roles.ts:51](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L51)

___

### parent

• **parent**: `Object`

The known or expected parent of the item

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `string` |
| `version` | `string` |

#### Defined in

[server/resolvers/roles.ts:56](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L56)

___

### rawDB

• **rawDB**: [`ItemizeRawDB`](../classes/server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/resolvers/roles.ts:39](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L39)

___

### requestArgs

• **requestArgs**: [`IRQArgs`](rq_querier.IRQArgs.md)

#### Defined in

[server/resolvers/roles.ts:46](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L46)

___

### root

• **root**: [`default`](../classes/base_Root.default.md)

#### Defined in

[server/resolvers/roles.ts:52](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L52)

___

### tokenData

• **tokenData**: [`IServerSideTokenDataType`](server_resolvers_basic.IServerSideTokenDataType.md)

This is the token data for the user that performed
the action and not the expected creator/owner

**`Deprecated`**

use user instead

#### Defined in

[server/resolvers/roles.ts:28](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L28)

___

### user

• **user**: [`IServerSideTokenDataType`](server_resolvers_basic.IServerSideTokenDataType.md)

This is the user information for the user that performed
the action and not the expected creator/owner

Do not use this attribute to know who owns an item, use owner
instead and it can vary when performing actions in behalf of someone else

#### Defined in

[server/resolvers/roles.ts:36](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L36)

___

### value

• **value**: [`IRQValue`](rq_querier.IRQValue.md)

#### Defined in

[server/resolvers/roles.ts:42](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L42)

___

### version

• **version**: `string`

#### Defined in

[server/resolvers/roles.ts:44](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L44)
