[](../README.md) / [Exports](../modules.md) / client/components/user/UserActioner

# Module: client/components/user/UserActioner

The user actioner provides functionality that allows to handle logins,
send email validation, reset passwor, and check the stateful status
of these actions

please refer to the Log actioners for login and signup functions
these are separated

## Table of contents

### Interfaces

- [IUserActionerArg](../interfaces/client_components_user_useractioner.iuseractionerarg.md)

### Functions

- [default](client_components_user_useractioner.md#default)

## Functions

### default

▸ **default**(`props`: IUserActionerProps): *Element*

The user actioner allows to do user related tasks, such as
send a validate email, sends a reset password and reset the password

please refer to the log actioner functions for login and signup functionality
these modify users in place but do not perform login and signup operations

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | IUserActionerProps | the props of the user actioner   |

**Returns:** *Element*

a react element

Defined in: [client/components/user/UserActioner.tsx:371](https://github.com/onzag/itemize/blob/28218320/client/components/user/UserActioner.tsx#L371)
