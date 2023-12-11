[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/roles](../modules/server_resolvers_roles.md) / ICustomRoleType

# Interface: ICustomRoleType

[server/resolvers/roles](../modules/server_resolvers_roles.md).ICustomRoleType

## Table of contents

### Properties

- [grant](server_resolvers_roles.ICustomRoleType.md#grant)
- [item](server_resolvers_roles.ICustomRoleType.md#item)
- [module](server_resolvers_roles.ICustomRoleType.md#module)
- [priority](server_resolvers_roles.ICustomRoleType.md#priority)
- [role](server_resolvers_roles.ICustomRoleType.md#role)

## Properties

### grant

• **grant**: (`arg`: [`ICustomRoleGranterArg`](server_resolvers_roles.ICustomRoleGranterArg.md)) => `boolean` \| `Promise`\<`boolean`\> \| [`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md) \| `Promise`\<[`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Type declaration

▸ (`arg`): `boolean` \| `Promise`\<`boolean`\> \| [`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md) \| `Promise`\<[`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ICustomRoleGranterArg`](server_resolvers_roles.ICustomRoleGranterArg.md) |

##### Returns

`boolean` \| `Promise`\<`boolean`\> \| [`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md) \| `Promise`\<[`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Defined in

[server/resolvers/roles.ts:76](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L76)

___

### item

• `Optional` **item**: `string`[]

#### Defined in

[server/resolvers/roles.ts:75](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L75)

___

### module

• `Optional` **module**: `string`[]

#### Defined in

[server/resolvers/roles.ts:74](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L74)

___

### priority

• `Optional` **priority**: `number`

#### Defined in

[server/resolvers/roles.ts:77](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L77)

___

### role

• **role**: `string`

#### Defined in

[server/resolvers/roles.ts:73](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/roles.ts#L73)
