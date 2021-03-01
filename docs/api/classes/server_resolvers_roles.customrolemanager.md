[](../README.md) / [Exports](../modules.md) / [server/resolvers/roles](../modules/server_resolvers_roles.md) / CustomRoleManager

# Class: CustomRoleManager

[server/resolvers/roles](../modules/server_resolvers_roles.md).CustomRoleManager

## Table of contents

### Constructors

- [constructor](server_resolvers_roles.customrolemanager.md#constructor)

### Properties

- [argEnv](server_resolvers_roles.customrolemanager.md#argenv)
- [filteredRoles](server_resolvers_roles.customrolemanager.md#filteredroles)
- [granteds](server_resolvers_roles.customrolemanager.md#granteds)

### Methods

- [checkRoleAccessFor](server_resolvers_roles.customrolemanager.md#checkroleaccessfor)
- [isRoleGranted](server_resolvers_roles.customrolemanager.md#isrolegranted)

## Constructors

### constructor

\+ **new CustomRoleManager**(`allRoles`: [*ICustomRoleType*](../interfaces/server_resolvers_roles.icustomroletype.md)[], `env`: ICustomRoleGranterArg): [*CustomRoleManager*](server_resolvers_roles.customrolemanager.md)

#### Parameters:

Name | Type |
:------ | :------ |
`allRoles` | [*ICustomRoleType*](../interfaces/server_resolvers_roles.icustomroletype.md)[] |
`env` | ICustomRoleGranterArg |

**Returns:** [*CustomRoleManager*](server_resolvers_roles.customrolemanager.md)

Defined in: [server/resolvers/roles.ts:48](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/roles.ts#L48)

## Properties

### argEnv

• `Private` **argEnv**: ICustomRoleGranterArg

Defined in: [server/resolvers/roles.ts:48](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/roles.ts#L48)

___

### filteredRoles

• `Private` **filteredRoles**: [*ICustomRoleType*](../interfaces/server_resolvers_roles.icustomroletype.md)[]

Defined in: [server/resolvers/roles.ts:46](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/roles.ts#L46)

___

### granteds

• `Private` **granteds**: *object*

#### Type declaration:

Defined in: [server/resolvers/roles.ts:47](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/roles.ts#L47)

## Methods

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`allowedRoles`: *string*[]): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`allowedRoles` | *string*[] |

**Returns:** *Promise*<boolean\>

Defined in: [server/resolvers/roles.ts:75](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/roles.ts#L75)

___

### isRoleGranted

▸ `Private`**isRoleGranted**(`role`: [*ICustomRoleType*](../interfaces/server_resolvers_roles.icustomroletype.md)): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`role` | [*ICustomRoleType*](../interfaces/server_resolvers_roles.icustomroletype.md) |

**Returns:** *Promise*<boolean\>

Defined in: [server/resolvers/roles.ts:66](https://github.com/onzag/itemize/blob/55e63f2c/server/resolvers/roles.ts#L66)
