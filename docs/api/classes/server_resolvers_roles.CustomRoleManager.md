[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/roles](../modules/server_resolvers_roles.md) / CustomRoleManager

# Class: CustomRoleManager

[server/resolvers/roles](../modules/server_resolvers_roles.md).CustomRoleManager

## Table of contents

### Constructors

- [constructor](server_resolvers_roles.CustomRoleManager.md#constructor)

### Properties

- [allRoles](server_resolvers_roles.CustomRoleManager.md#allroles)
- [argEnv](server_resolvers_roles.CustomRoleManager.md#argenv)
- [filteredRoles](server_resolvers_roles.CustomRoleManager.md#filteredroles)
- [granteds](server_resolvers_roles.CustomRoleManager.md#granteds)

### Methods

- [checkRoleAccessFor](server_resolvers_roles.CustomRoleManager.md#checkroleaccessfor)
- [isRoleGranted](server_resolvers_roles.CustomRoleManager.md#isrolegranted)
- [subEnvironment](server_resolvers_roles.CustomRoleManager.md#subenvironment)

## Constructors

### constructor

• **new CustomRoleManager**(`allRoles`, `env`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `allRoles` | [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[] |
| `env` | [`ICustomRoleGranterArg`](../interfaces/server_resolvers_roles.ICustomRoleGranterArg.md) |

#### Defined in

[server/resolvers/roles.ts:55](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L55)

## Properties

### allRoles

• **allRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/resolvers/roles.ts:52](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L52)

___

### argEnv

• `Private` **argEnv**: [`ICustomRoleGranterArg`](../interfaces/server_resolvers_roles.ICustomRoleGranterArg.md)

#### Defined in

[server/resolvers/roles.ts:54](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L54)

___

### filteredRoles

• **filteredRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/resolvers/roles.ts:51](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L51)

___

### granteds

• **granteds**: `Object`

#### Index signature

▪ [role: `string`]: [`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)

#### Defined in

[server/resolvers/roles.ts:53](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L53)

## Methods

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`allowedRoles`): `Promise`<[`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `allowedRoles` | `string`[] |

#### Returns

`Promise`<[`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Defined in

[server/resolvers/roles.ts:112](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L112)

___

### isRoleGranted

▸ `Private` **isRoleGranted**(`role`): `Promise`<[`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md) |

#### Returns

`Promise`<[`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Defined in

[server/resolvers/roles.ts:74](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L74)

___

### subEnvironment

▸ **subEnvironment**(`newEnv`): [`CustomRoleManager`](server_resolvers_roles.CustomRoleManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newEnv` | `Partial`<[`ICustomRoleGranterArg`](../interfaces/server_resolvers_roles.ICustomRoleGranterArg.md)\> |

#### Returns

[`CustomRoleManager`](server_resolvers_roles.CustomRoleManager.md)

#### Defined in

[server/resolvers/roles.ts:137](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/roles.ts#L137)
