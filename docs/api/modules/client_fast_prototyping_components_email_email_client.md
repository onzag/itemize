[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/components/email/email-client

# Module: client/fast-prototyping/components/email/email-client

## Table of contents

### Interfaces

- [IBasicEmailClientProps](../interfaces/client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md)
- [IContentViewerProps](../interfaces/client_fast_prototyping_components_email_email_client.IContentViewerProps.md)
- [IEmailClientProps](../interfaces/client_fast_prototyping_components_email_email_client.IEmailClientProps.md)
- [IEmailReaderProps](../interfaces/client_fast_prototyping_components_email_email_client.IEmailReaderProps.md)
- [IEmailSenderProps](../interfaces/client_fast_prototyping_components_email_email_client.IEmailSenderProps.md)
- [IListComponentProps](../interfaces/client_fast_prototyping_components_email_email_client.IListComponentProps.md)
- [IListElementComponentProps](../interfaces/client_fast_prototyping_components_email_email_client.IListElementComponentProps.md)
- [INoResultsComponentProps](../interfaces/client_fast_prototyping_components_email_email_client.INoResultsComponentProps.md)
- [IPaginatorComponentProps](../interfaces/client_fast_prototyping_components_email_email_client.IPaginatorComponentProps.md)
- [ISubmitButtonProps](../interfaces/client_fast_prototyping_components_email_email_client.ISubmitButtonProps.md)
- [ISwitcherComponentProps](../interfaces/client_fast_prototyping_components_email_email_client.ISwitcherComponentProps.md)
- [IWrapperComponentProps](../interfaces/client_fast_prototyping_components_email_email_client.IWrapperComponentProps.md)

### Functions

- [DefaultListElementComponent](client_fast_prototyping_components_email_email_client.md#defaultlistelementcomponent)
- [DefaultSwitcherComponent](client_fast_prototyping_components_email_email_client.md#defaultswitchercomponent)
- [EmailClient](client_fast_prototyping_components_email_email_client.md#emailclient)
- [EmailReader](client_fast_prototyping_components_email_email_client.md#emailreader)
- [EmailSender](client_fast_prototyping_components_email_email_client.md#emailsender)
- [defaultValueResolver](client_fast_prototyping_components_email_email_client.md#defaultvalueresolver)
- [getValueResolverAtEndpoint](client_fast_prototyping_components_email_email_client.md#getvalueresolveratendpoint)

## Functions

### DefaultListElementComponent

▸ **DefaultListElementComponent**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IListElementComponentProps`](../interfaces/client_fast_prototyping_components_email_email_client.IListElementComponentProps.md) |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:1794](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L1794)

___

### DefaultSwitcherComponent

▸ **DefaultSwitcherComponent**(`props`): `Element`

The default switcher component to switch between inbox/outbox/etc...

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ISwitcherComponentProps`](../interfaces/client_fast_prototyping_components_email_email_client.ISwitcherComponentProps.md) |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:385](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L385)

___

### EmailClient

▸ **EmailClient**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IEmailClientProps`](../interfaces/client_fast_prototyping_components_email_email_client.IEmailClientProps.md) |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:1847](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L1847)

___

### EmailReader

▸ **EmailReader**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IEmailReaderProps`](../interfaces/client_fast_prototyping_components_email_email_client.IEmailReaderProps.md) |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:1061](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L1061)

___

### EmailSender

▸ **EmailSender**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IEmailSenderProps`](../interfaces/client_fast_prototyping_components_email_email_client.IEmailSenderProps.md) |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:1013](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L1013)

___

### defaultValueResolver

▸ **defaultValueResolver**(`v`): `Promise`\<`string`\>

This is the default resolver that will look over all the users and find one with the given
username in order to retrieve it and its id, however if you have restricted search policies
you may want to change the default behaviour

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `IInternalValueResolverOptions` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:606](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L606)

___

### getValueResolverAtEndpoint

▸ **getValueResolverAtEndpoint**(`endpoint`): (`v`: `IInternalValueResolverOptions`) => `Promise`\<`string`\>

Generates a function for custom resolving at a given endpoint
the endpoint will be provided the username as a GET query parameter
and expects to receive a status 200 with the given textual id

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `string` |

#### Returns

`fn`

▸ (`v`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `IInternalValueResolverOptions` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:587](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L587)
