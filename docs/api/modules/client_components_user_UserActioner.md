[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/user/UserActioner

# Module: client/components/user/UserActioner

The user actioner provides functionality that allows to handle logins,
send email validation, reset passwor, and check the stateful status
of these actions

please refer to the Log actioners for login and signup functions
these are separated

## Table of contents

### Interfaces

- [IUserActionerArg](../interfaces/client_components_user_UserActioner.IUserActionerArg.md)

### Functions

- [default](client_components_user_UserActioner.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

The user actioner allows to do user related tasks, such as
send a validate email, sends a reset password and reset the password

please refer to the log actioner functions for login and signup functionality
these modify users in place but do not perform login and signup operations

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `IUserActionerProps` | the props of the user actioner |

#### Returns

`Element`

a react element

#### Defined in

[client/components/user/UserActioner.tsx:509](https://github.com/onzag/itemize/blob/f2f29986/client/components/user/UserActioner.tsx#L509)
