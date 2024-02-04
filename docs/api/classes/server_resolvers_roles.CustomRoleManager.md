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

• **new CustomRoleManager**(`allRoles`, `env`): [`CustomRoleManager`](server_resolvers_roles.CustomRoleManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `allRoles` | [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[] |
| `env` | [`ICustomRoleGranterArg`](../interfaces/server_resolvers_roles.ICustomRoleGranterArg.md) |

#### Returns

[`CustomRoleManager`](server_resolvers_roles.CustomRoleManager.md)

#### Defined in

[server/resolvers/roles.ts:85](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/roles.ts#L85)

## Properties

### allRoles

• **allRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/resolvers/roles.ts:82](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/roles.ts#L82)

___

### argEnv

• `Private` **argEnv**: [`ICustomRoleGranterArg`](../interfaces/server_resolvers_roles.ICustomRoleGranterArg.md)

#### Defined in

[server/resolvers/roles.ts:84](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/roles.ts#L84)

___

### filteredRoles

• **filteredRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/resolvers/roles.ts:81](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/roles.ts#L81)

___

### granteds

• **granteds**: `Object`

#### Index signature

▪ [role: `string`]: [`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)

#### Defined in

[server/resolvers/roles.ts:83](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/roles.ts#L83)

## Methods

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`allowedRoles`): `Promise`\<[`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `allowedRoles` | `string`[] |

#### Returns

`Promise`\<[`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Defined in

[server/resolvers/roles.ts:142](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/roles.ts#L142)

___

### isRoleGranted

▸ **isRoleGranted**(`role`): `Promise`\<[`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md) |

#### Returns

`Promise`\<[`ICustomRoleManagerRoleStatus`](../interfaces/base_Root.ICustomRoleManagerRoleStatus.md)\>

#### Defined in

[server/resolvers/roles.ts:104](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/roles.ts#L104)

___

### subEnvironment

▸ **subEnvironment**(`newEnv`): [`CustomRoleManager`](server_resolvers_roles.CustomRoleManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newEnv` | `Partial`\<[`ICustomRoleGranterArg`](../interfaces/server_resolvers_roles.ICustomRoleGranterArg.md)\> |

#### Returns

[`CustomRoleManager`](server_resolvers_roles.CustomRoleManager.md)

#### Defined in

[server/resolvers/roles.ts:167](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/roles.ts#L167)
