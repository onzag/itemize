[](../README.md) / [Exports](../modules.md) / [client/components/user/UserActioner](../modules/client_components_user_useractioner.md) / IUserActionerArg

# Interface: IUserActionerArg

[client/components/user/UserActioner](../modules/client_components_user_useractioner.md).IUserActionerArg

The user actioner arg information that allows
the actions that it includes

## Table of contents

### Properties

- [cleanUnsafeFields](client_components_user_useractioner.iuseractionerarg.md#cleanunsafefields)
- [dismissStatefulError](client_components_user_useractioner.iuseractionerarg.md#dismissstatefulerror)
- [dismissStatefulSuccess](client_components_user_useractioner.iuseractionerarg.md#dismissstatefulsuccess)
- [resetPassword](client_components_user_useractioner.iuseractionerarg.md#resetpassword)
- [sendResetPassword](client_components_user_useractioner.iuseractionerarg.md#sendresetpassword)
- [sendValidateEmail](client_components_user_useractioner.iuseractionerarg.md#sendvalidateemail)
- [statefulError](client_components_user_useractioner.iuseractionerarg.md#statefulerror)
- [statefulOnProgress](client_components_user_useractioner.iuseractionerarg.md#statefulonprogress)
- [statefulSuccess](client_components_user_useractioner.iuseractionerarg.md#statefulsuccess)

## Properties

### cleanUnsafeFields

• **cleanUnsafeFields**: (`addDelay?`: *boolean*) => *void*

clean unsafe fields, basically only the password
add delay allows to add a small delay to this clean, which might be useful when you have
an animation and you don't want the clean to be intrusive

#### Type declaration:

▸ (`addDelay?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`addDelay?` | *boolean* |

**Returns:** *void*

Defined in: [client/components/user/UserActioner.tsx:71](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L71)

Defined in: [client/components/user/UserActioner.tsx:71](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L71)

___

### dismissStatefulError

• **dismissStatefulError**: () => *void*

dismiss this stateful error

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/user/UserActioner.tsx:65](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L65)

Defined in: [client/components/user/UserActioner.tsx:65](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L65)

___

### dismissStatefulSuccess

• **dismissStatefulSuccess**: () => *void*

Allows to dismiss this stateful success

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/user/UserActioner.tsx:56](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L56)

Defined in: [client/components/user/UserActioner.tsx:56](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L56)

___

### resetPassword

• **resetPassword**: (`token`: *string*, `cleanWhenSuccessful?`: *boolean*) => *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

Resets the password of a given user, requires a token that is sent via
the email reset link, usually in the query string and you will be available to access it via the
location state reader

clean when successful will clean the unsafe fields, virtually the password

#### Type declaration:

▸ (`token`: *string*, `cleanWhenSuccessful?`: *boolean*): *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`token` | *string* |
`cleanWhenSuccessful?` | *boolean* |

**Returns:** *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

Defined in: [client/components/user/UserActioner.tsx:41](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L41)

Defined in: [client/components/user/UserActioner.tsx:41](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L41)

___

### sendResetPassword

• **sendResetPassword**: () => *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

Sends a password reset, requires to be in an item definition context
of type user where the email property is available and filled, as it will
read from such context

#### Type declaration:

▸ (): *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

**Returns:** *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

Defined in: [client/components/user/UserActioner.tsx:33](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L33)

Defined in: [client/components/user/UserActioner.tsx:33](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L33)

___

### sendValidateEmail

• **sendValidateEmail**: () => *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

Sends the email validation, for the current logged in user

#### Type declaration:

▸ (): *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

**Returns:** *Promise*<{ `error`: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)  }\>

Defined in: [client/components/user/UserActioner.tsx:27](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L27)

Defined in: [client/components/user/UserActioner.tsx:27](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L27)

___

### statefulError

• **statefulError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

stateful error, similar to stateful success, but when an error occured, this will be the same error
as the one returned by the function

Defined in: [client/components/user/UserActioner.tsx:61](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L61)

___

### statefulOnProgress

• **statefulOnProgress**: *boolean*

stateful on progress, a boolean that specifies the last action being on progress, the actions that
can be executed in this actioner are stateful, which means they do not belong to any context
so many user actioners will not coincide on its state

Defined in: [client/components/user/UserActioner.tsx:47](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L47)

___

### statefulSuccess

• **statefulSuccess**: *boolean*

stateful success, the logic is similar to the stateful on progress but to specify success of the last
action

Defined in: [client/components/user/UserActioner.tsx:52](https://github.com/onzag/itemize/blob/0e9b128c/client/components/user/UserActioner.tsx#L52)
