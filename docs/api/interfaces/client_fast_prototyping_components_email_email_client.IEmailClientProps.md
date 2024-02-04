[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/email/email-client](../modules/client_fast_prototyping_components_email_email_client.md) / IEmailClientProps

# Interface: IEmailClientProps

[client/fast-prototyping/components/email/email-client](../modules/client_fast_prototyping_components_email_email_client.md).IEmailClientProps

## Hierarchy

- [`IBasicEmailClientProps`](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md)

  ↳ **`IEmailClientProps`**

## Table of contents

### Properties

- [FallbackAvatarComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#fallbackavatarcomponent)
- [InternalWrapperComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#internalwrappercomponent)
- [ListComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#listcomponent)
- [ListElementComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#listelementcomponent)
- [NoResultsComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#noresultscomponent)
- [PaginatorWrapperComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#paginatorwrappercomponent)
- [SwitcherComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#switchercomponent)
- [WrapperComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#wrappercomponent)
- [emailNewUrl](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#emailnewurl)
- [emailUrlResolver](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#emailurlresolver)
- [fabComponent](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#fabcomponent)
- [location](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#location)
- [mustBeLoggedInNode](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#mustbeloggedinnode)
- [onLocationChange](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#onlocationchange)
- [searchFilter](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#searchfilter)
- [searchLoaderProps](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#searchloaderprops)
- [switcherComponentPosition](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#switchercomponentposition)
- [useSearchEngine](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#usesearchengine)
- [useSearchEngineFullHighlights](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#usesearchenginefullhighlights)
- [userAvatarElement](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#useravatarelement)
- [userLoadProperties](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#userloadproperties)
- [userUsernameElement](client_fast_prototyping_components_email_email_client.IEmailClientProps.md#userusernameelement)

## Properties

### FallbackAvatarComponent

• `Optional` **FallbackAvatarComponent**: `ComponentType`\<\{ `children`: `ReactNode`  }\>

Fallback avatar to render avatars

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:280](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L280)

___

### InternalWrapperComponent

• `Optional` **InternalWrapperComponent**: `ComponentType`\<[`IWrapperComponentProps`](client_fast_prototyping_components_email_email_client.IWrapperComponentProps.md)\>

Internal wrapper to use instead of the default this wraps the list and the paginator

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:248](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L248)

___

### ListComponent

• `Optional` **ListComponent**: `ComponentType`\<[`IListComponentProps`](client_fast_prototyping_components_email_email_client.IListComponentProps.md)\>

List component to use instead of the default this wraps every message

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:235](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L235)

___

### ListElementComponent

• `Optional` **ListElementComponent**: `ComponentType`\<[`IListElementComponentProps`](client_fast_prototyping_components_email_email_client.IListElementComponentProps.md)\>

List component element

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:239](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L239)

___

### NoResultsComponent

• `Optional` **NoResultsComponent**: `ComponentType`\<[`INoResultsComponentProps`](client_fast_prototyping_components_email_email_client.INoResultsComponentProps.md)\>

No search results found for a given search

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:256](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L256)

___

### PaginatorWrapperComponent

• `Optional` **PaginatorWrapperComponent**: `ComponentType`\<[`IPaginatorComponentProps`](client_fast_prototyping_components_email_email_client.IPaginatorComponentProps.md)\>

Wrapper to use instead of the default for the paginator object

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:252](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L252)

___

### SwitcherComponent

• `Optional` **SwitcherComponent**: `ComponentType`\<[`ISwitcherComponentProps`](client_fast_prototyping_components_email_email_client.ISwitcherComponentProps.md)\>

Switcher component to use instead of the default

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:231](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L231)

___

### WrapperComponent

• `Optional` **WrapperComponent**: `ComponentType`\<[`IWrapperComponentProps`](client_fast_prototyping_components_email_email_client.IWrapperComponentProps.md)\>

Wrapper component to use instead of the default this wraps the whole
box area

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:244](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L244)

___

### emailNewUrl

• **emailNewUrl**: `string`

The url to create new emails

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:271](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L271)

___

### emailUrlResolver

• **emailUrlResolver**: (`id`: `string`) => `string`

#### Type declaration

▸ (`id`): `string`

When a new email is sent and given an id this represents where
the url of such a message is located

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the email |

##### Returns

`string`

the url where it can be visualized

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:267](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L267)

___

### fabComponent

• **fabComponent**: `ReactNode`

sx props for the fab element

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:212](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L212)

___

### location

• **location**: `LocationType`

The current location for the email client

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:216](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L216)

___

### mustBeLoggedInNode

• `Optional` **mustBeLoggedInNode**: `ReactNode`

The email client cannot be used if you are not logged in
use this to specify that error

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:276](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L276)

___

### onLocationChange

• **onLocationChange**: (`e`: `SyntheticEvent`\<`Element`, `Event`\>, `location`: `LocationType`) => `void`

#### Type declaration

▸ (`e`, `location`): `void`

An event that triggers when the location changes

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `SyntheticEvent`\<`Element`, `Event`\> |
| `location` | `LocationType` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:223](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L223)

___

### searchFilter

• `Optional` **searchFilter**: `string`

Search filter

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:284](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L284)

___

### searchLoaderProps

• `Optional` **searchLoaderProps**: `Partial`\<[`ISearchLoaderWithPaginationProps`](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md)\>

Extra props to give the search loader

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:260](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L260)

___

### switcherComponentPosition

• `Optional` **switcherComponentPosition**: ``"top"`` \| ``"bottom"``

The position of the switcher component

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:227](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L227)

___

### useSearchEngine

• `Optional` **useSearchEngine**: `boolean`

Whethet to use search engine for the searching

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:288](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L288)

___

### useSearchEngineFullHighlights

• `Optional` **useSearchEngineFullHighlights**: `number`

Whether to use full highlights during the search

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:292](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L292)

___

### userAvatarElement

• **userAvatarElement**: `ReactNode`

The avatar element that is used to render avatars within a given
user context

#### Inherited from

[IBasicEmailClientProps](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md).[userAvatarElement](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md#useravatarelement)

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:195](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L195)

___

### userLoadProperties

• **userLoadProperties**: `string`[]

Properties to load for the user

#### Inherited from

[IBasicEmailClientProps](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md).[userLoadProperties](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md#userloadproperties)

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

#### Inherited from

[IBasicEmailClientProps](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md).[userUsernameElement](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md#userusernameelement)

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:201](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L201)
