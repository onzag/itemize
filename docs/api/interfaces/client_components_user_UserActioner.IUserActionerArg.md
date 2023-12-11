[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/user/UserActioner](../modules/client_components_user_UserActioner.md) / IUserActionerArg

# Interface: IUserActionerArg

[client/components/user/UserActioner](../modules/client_components_user_UserActioner.md).IUserActionerArg

The user actioner arg information that allows
the actions that it includes

## Table of contents

### Properties

- [cleanUnsafeFields](client_components_user_UserActioner.IUserActionerArg.md#cleanunsafefields)
- [dismissStatefulError](client_components_user_UserActioner.IUserActionerArg.md#dismissstatefulerror)
- [dismissStatefulSuccess](client_components_user_UserActioner.IUserActionerArg.md#dismissstatefulsuccess)
- [resetPasswordWithEmailReceivedRandomId](client_components_user_UserActioner.IUserActionerArg.md#resetpasswordwithemailreceivedrandomid)
- [resetPasswordWithSMSReceivedRandomId](client_components_user_UserActioner.IUserActionerArg.md#resetpasswordwithsmsreceivedrandomid)
- [resetPasswordWithToken](client_components_user_UserActioner.IUserActionerArg.md#resetpasswordwithtoken)
- [sendResetPasswordEmail](client_components_user_UserActioner.IUserActionerArg.md#sendresetpasswordemail)
- [sendResetPasswordSMS](client_components_user_UserActioner.IUserActionerArg.md#sendresetpasswordsms)
- [sendValidateEmail](client_components_user_UserActioner.IUserActionerArg.md#sendvalidateemail)
- [sendValidateSMS](client_components_user_UserActioner.IUserActionerArg.md#sendvalidatesms)
- [statefulError](client_components_user_UserActioner.IUserActionerArg.md#statefulerror)
- [statefulOnProgress](client_components_user_UserActioner.IUserActionerArg.md#statefulonprogress)
- [statefulSuccess](client_components_user_UserActioner.IUserActionerArg.md#statefulsuccess)
- [validateEmailFromRandomId](client_components_user_UserActioner.IUserActionerArg.md#validateemailfromrandomid)
- [validatePhoneFromRandomId](client_components_user_UserActioner.IUserActionerArg.md#validatephonefromrandomid)

## Properties

### cleanUnsafeFields

• **cleanUnsafeFields**: (`addDelay?`: `boolean`) => `void`

#### Type declaration

▸ (`addDelay?`): `void`

clean unsafe fields, basically only the password
add delay allows to add a small delay to this clean, which might be useful when you have
an animation and you don't want the clean to be intrusive

##### Parameters

| Name | Type |
| :------ | :------ |
| `addDelay?` | `boolean` |

##### Returns

`void`

#### Defined in

[client/components/user/UserActioner.tsx:103](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L103)

___

### dismissStatefulError

• **dismissStatefulError**: () => `void`

#### Type declaration

▸ (): `void`

dismiss this stateful error

##### Returns

`void`

#### Defined in

[client/components/user/UserActioner.tsx:97](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L97)

___

### dismissStatefulSuccess

• **dismissStatefulSuccess**: () => `void`

#### Type declaration

▸ (): `void`

Allows to dismiss this stateful success

##### Returns

`void`

#### Defined in

[client/components/user/UserActioner.tsx:88](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L88)

___

### resetPasswordWithEmailReceivedRandomId

• **resetPasswordWithEmailReceivedRandomId**: (`randomId`: `string`, `email`: `string`, `cleanWhenSuccessful?`: `boolean`) => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (`randomId`, `email`, `cleanWhenSuccessful?`): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Resets the password of a given user, requires a a random id that is often sent
with a text message

clean when successful will clean the unsafe fields, virtually the password

##### Parameters

| Name | Type |
| :------ | :------ |
| `randomId` | `string` |
| `email` | `string` |
| `cleanWhenSuccessful?` | `boolean` |

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:66](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L66)

___

### resetPasswordWithSMSReceivedRandomId

• **resetPasswordWithSMSReceivedRandomId**: (`randomId`: `string`, `phone`: `string`, `cleanWhenSuccessful?`: `boolean`) => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (`randomId`, `phone`, `cleanWhenSuccessful?`): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Resets the password of a given user, requires a a random id that is often sent
with a text message

clean when successful will clean the unsafe fields, virtually the password

##### Parameters

| Name | Type |
| :------ | :------ |
| `randomId` | `string` |
| `phone` | `string` |
| `cleanWhenSuccessful?` | `boolean` |

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:73](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L73)

___

### resetPasswordWithToken

• **resetPasswordWithToken**: (`token`: `string`, `cleanWhenSuccessful?`: `boolean`) => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (`token`, `cleanWhenSuccessful?`): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Resets the password of a given user, requires a token that is sent via
the email reset link, usually in the query string and you will be available to access it via the
location state reader

clean when successful will clean the unsafe fields, virtually the password

##### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `cleanWhenSuccessful?` | `boolean` |

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:59](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L59)

___

### sendResetPasswordEmail

• **sendResetPasswordEmail**: () => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Sends a password reset, requires to be in an item definition context
of type user where the email property is available and filled, as it will
read from such context

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:45](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L45)

___

### sendResetPasswordSMS

• **sendResetPasswordSMS**: () => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Sends a password reset, requires to be in an item definition context
of type user where the email property is available and filled, as it will
read from such context

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:51](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L51)

___

### sendValidateEmail

• **sendValidateEmail**: () => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Sends the email validation, for the current logged in user

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:27](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L27)

___

### sendValidateSMS

• **sendValidateSMS**: () => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Sends the email validation, for the current logged in user

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:31](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L31)

___

### statefulError

• **statefulError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

stateful error, similar to stateful success, but when an error occured, this will be the same error
as the one returned by the function

#### Defined in

[client/components/user/UserActioner.tsx:93](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L93)

___

### statefulOnProgress

• **statefulOnProgress**: `boolean`

stateful on progress, a boolean that specifies the last action being on progress, the actions that
can be executed in this actioner are stateful, which means they do not belong to any context
so many user actioners will not coincide on its state

#### Defined in

[client/components/user/UserActioner.tsx:79](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L79)

___

### statefulSuccess

• **statefulSuccess**: `boolean`

stateful success, the logic is similar to the stateful on progress but to specify success of the last
action

#### Defined in

[client/components/user/UserActioner.tsx:84](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L84)

___

### validateEmailFromRandomId

• **validateEmailFromRandomId**: (`randomId`: `string`) => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (`randomId`): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Validates the email from the given random id

##### Parameters

| Name | Type |
| :------ | :------ |
| `randomId` | `string` |

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:39](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L39)

___

### validatePhoneFromRandomId

• **validatePhoneFromRandomId**: (`randomId`: `string`) => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Type declaration

▸ (`randomId`): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

Validates the phone from the given random id

##### Parameters

| Name | Type |
| :------ | :------ |
| `randomId` | `string` |

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }\>

#### Defined in

[client/components/user/UserActioner.tsx:35](https://github.com/onzag/itemize/blob/59702dd5/client/components/user/UserActioner.tsx#L35)
