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

[server/resolvers/roles.ts:54](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/roles.ts#L54)

## Properties

### allRoles

• **allRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/resolvers/roles.ts:51](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/roles.ts#L51)

___

### argEnv

• `Private` **argEnv**: [`ICustomRoleGranterArg`](../interfaces/server_resolvers_roles.ICustomRoleGranterArg.md)

#### Defined in

[server/resolvers/roles.ts:53](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/roles.ts#L53)

___

### filteredRoles

• **filteredRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/resolvers/roles.ts:50](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/roles.ts#L50)

___

### granteds

• **granteds**: `Object`

#### Index signature

▪ [role: `string`]: [`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)

#### Defined in

[server/resolvers/roles.ts:52](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/roles.ts#L52)

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

[server/resolvers/roles.ts:91](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/roles.ts#L91)

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

[server/resolvers/roles.ts:73](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/roles.ts#L73)

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

[server/resolvers/roles.ts:116](https://github.com/onzag/itemize/blob/5c2808d3/server/resolvers/roles.ts#L116)
