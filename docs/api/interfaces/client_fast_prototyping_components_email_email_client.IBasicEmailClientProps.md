[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/email/email-client](../modules/client_fast_prototyping_components_email_email_client.md) / IBasicEmailClientProps

# Interface: IBasicEmailClientProps

[client/fast-prototyping/components/email/email-client](../modules/client_fast_prototyping_components_email_email_client.md).IBasicEmailClientProps

## Hierarchy

- **`IBasicEmailClientProps`**

  ↳ [`IEmailClientProps`](client_fast_prototyping_components_email_email_client.IEmailClientProps.md)

  ↳ [`IEmailReaderProps`](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md)

## Table of contents

### Properties

- [userAvatarElement](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md#useravatarelement)
- [userLoadProperties](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md#userloadproperties)
- [userUsernameElement](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md#userusernameelement)

## Properties

### userAvatarElement

• **userAvatarElement**: `ReactNode`

The avatar element that is used to render avatars within a given
user context

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:195](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L195)

___

### userLoadProperties

• **userLoadProperties**: `string`[]

Properties to load for the user

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:205](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L205)

___

### userUsernameElement

• **userUsernameElement**: (`sender`: `boolean`) => `ReactNode`

#### Type declaration

▸ (`sender`): `ReactNode`

the username function to render the username

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sender` | `boolean` | whether you are currently the sender, if not you are the receiver |

##### Returns

`ReactNode`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:201](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L201)
