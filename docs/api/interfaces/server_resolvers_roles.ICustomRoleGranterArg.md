[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/roles](../modules/server_resolvers_roles.md) / ICustomRoleGranterArg

# Interface: ICustomRoleGranterArg

[server/resolvers/roles](../modules/server_resolvers_roles.md).ICustomRoleGranterArg

## Table of contents

### Properties

- [cache](server_resolvers_roles.ICustomRoleGranterArg.md#cache)
- [customId](server_resolvers_roles.ICustomRoleGranterArg.md#customid)
- [databaseConnection](server_resolvers_roles.ICustomRoleGranterArg.md#databaseconnection)
- [environment](server_resolvers_roles.ICustomRoleGranterArg.md#environment)
- [item](server_resolvers_roles.ICustomRoleGranterArg.md#item)
- [module](server_resolvers_roles.ICustomRoleGranterArg.md#module)
- [owner](server_resolvers_roles.ICustomRoleGranterArg.md#owner)
- [parent](server_resolvers_roles.ICustomRoleGranterArg.md#parent)
- [rawDB](server_resolvers_roles.ICustomRoleGranterArg.md#rawdb)
- [requestArgs](server_resolvers_roles.ICustomRoleGranterArg.md#requestargs)
- [root](server_resolvers_roles.ICustomRoleGranterArg.md#root)
- [tokenData](server_resolvers_roles.ICustomRoleGranterArg.md#tokendata)
- [value](server_resolvers_roles.ICustomRoleGranterArg.md#value)

## Properties

### cache

• **cache**: [`Cache`](../classes/server_cache.Cache.md)

#### Defined in

[server/resolvers/roles.ts:24](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L24)

___

### customId

• **customId**: `string`

#### Defined in

[server/resolvers/roles.ts:39](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L39)

___

### databaseConnection

• **databaseConnection**: [`DatabaseConnection`](../classes/database.DatabaseConnection.md)

#### Defined in

[server/resolvers/roles.ts:25](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L25)

___

### environment

• **environment**: [`CustomRoleGranterEnvironment`](../enums/server_resolvers_roles.CustomRoleGranterEnvironment.md)

#### Defined in

[server/resolvers/roles.ts:30](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L30)

___

### item

• **item**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Defined in

[server/resolvers/roles.ts:27](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L27)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

#### Defined in

[server/resolvers/roles.ts:28](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L28)

___

### owner

• **owner**: `string`

#### Defined in

[server/resolvers/roles.ts:32](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L32)

___

### parent

• **parent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `string` |
| `version` | `string` |

#### Defined in

[server/resolvers/roles.ts:34](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L34)

___

### rawDB

• **rawDB**: [`ItemizeRawDB`](../classes/server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/resolvers/roles.ts:26](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L26)

___

### requestArgs

• **requestArgs**: [`IGQLArgs`](gql_querier.IGQLArgs.md)

#### Defined in

[server/resolvers/roles.ts:31](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L31)

___

### root

• **root**: [`default`](../classes/base_Root.default.md)

#### Defined in

[server/resolvers/roles.ts:33](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L33)

___

### tokenData

• **tokenData**: [`IServerSideTokenDataType`](server_resolvers_basic.IServerSideTokenDataType.md)

#### Defined in

[server/resolvers/roles.ts:23](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L23)

___

### value

• **value**: [`IGQLValue`](gql_querier.IGQLValue.md)

#### Defined in

[server/resolvers/roles.ts:29](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L29)
