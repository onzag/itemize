[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/roles](../modules/server_resolvers_roles.md) / ICustomRoleType

# Interface: ICustomRoleType

[server/resolvers/roles](../modules/server_resolvers_roles.md).ICustomRoleType

## Table of contents

### Properties

- [item](server_resolvers_roles.ICustomRoleType.md#item)
- [module](server_resolvers_roles.ICustomRoleType.md#module)
- [priority](server_resolvers_roles.ICustomRoleType.md#priority)
- [role](server_resolvers_roles.ICustomRoleType.md#role)

### Methods

- [grant](server_resolvers_roles.ICustomRoleType.md#grant)

## Properties

### item

• `Optional` **item**: `string`[]

#### Defined in

[server/resolvers/roles.ts:44](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/roles.ts#L44)

___

### module

• `Optional` **module**: `string`[]

#### Defined in

[server/resolvers/roles.ts:43](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/roles.ts#L43)

___

### priority

• `Optional` **priority**: `number`

#### Defined in

[server/resolvers/roles.ts:46](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/roles.ts#L46)

___

### role

• **role**: `string`

#### Defined in

[server/resolvers/roles.ts:42](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/roles.ts#L42)

## Methods

### grant

▸ **grant**(`arg`): `boolean` \| [`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md) \| `Promise`<[`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md)\> \| `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ICustomRoleGranterArg`](server_resolvers_roles.ICustomRoleGranterArg.md) |

#### Returns

`boolean` \| [`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md) \| `Promise`<[`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md)\> \| `Promise`<`boolean`\>

#### Defined in

[server/resolvers/roles.ts:45](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/roles.ts#L45)
