[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root](../modules/base_Root.md) / ICustomRoleManager

# Interface: ICustomRoleManager

[base/Root](../modules/base_Root.md).ICustomRoleManager

This is what a custom role manager should look like
for custom role management

## Table of contents

### Properties

- [checkRoleAccessFor](base_Root.ICustomRoleManager.md#checkroleaccessfor)

## Properties

### checkRoleAccessFor

• **checkRoleAccessFor**: (`roles`: `string`[]) => `Promise`\<[`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Type declaration

▸ (`roles`): `Promise`\<[`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `roles` | `string`[] |

##### Returns

`Promise`\<[`ICustomRoleManagerRoleStatus`](base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Defined in

[base/Root/index.ts:76](https://github.com/onzag/itemize/blob/59702dd5/base/Root/index.ts#L76)
