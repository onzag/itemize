[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/email/email-client](../modules/client_fast_prototyping_components_email_email_client.md) / IEmailReaderProps

# Interface: IEmailReaderProps

[client/fast-prototyping/components/email/email-client](../modules/client_fast_prototyping_components_email_email_client.md).IEmailReaderProps

The props for the email reader where a single email is to be visualized

## Hierarchy

- [`IBasicEmailClientProps`](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md)

- `IEmailSenderPropsBase`

  ↳ **`IEmailReaderProps`**

## Table of contents

### Properties

- [ContentViewer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#contentviewer)
- [FallbackAvatarComponent](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#fallbackavatarcomponent)
- [SubmitButton](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#submitbutton)
- [WrapperComponent](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#wrappercomponent)
- [WrapperContent](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#wrappercontent)
- [WrapperSpamWarning](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#wrapperspamwarning)
- [WrapperUser](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#wrapperuser)
- [attachmentsEntryRenderer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#attachmentsentryrenderer)
- [attachmentsEntryRendererArgs](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#attachmentsentryrendererargs)
- [contentEntryRenderer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#contententryrenderer)
- [contentEntryRendererArgs](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#contententryrendererargs)
- [customEntriesRenderer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#customentriesrenderer)
- [emailDisplayer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#emaildisplayer)
- [emailUrlResolver](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#emailurlresolver)
- [emailUrlResolverAddQSToNew](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#emailurlresolveraddqstonew)
- [forwardUrlResolver](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#forwardurlresolver)
- [hideDescriptionAttachments](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidedescriptionattachments)
- [hideDescriptionContent](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidedescriptioncontent)
- [hideDescriptionSubject](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidedescriptionsubject)
- [hideDescriptionTarget](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidedescriptiontarget)
- [hideDescriptions](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidedescriptions)
- [hideLabelAttachments](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidelabelattachments)
- [hideLabelContent](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidelabelcontent)
- [hideLabelSubject](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidelabelsubject)
- [hideLabelTarget](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidelabeltarget)
- [hideLabels](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#hidelabels)
- [id](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#id)
- [objectsAllowedReplyAll](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#objectsallowedreplyall)
- [objectsInvalidLabel](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#objectsinvalidlabel)
- [objectsNameDisplayer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#objectsnamedisplayer)
- [objectsNameResolver](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#objectsnameresolver)
- [onFetchSuggestions](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#onfetchsuggestions)
- [replyAllBlacklist](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#replyallblacklist)
- [replyAllUrlResolver](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#replyallurlresolver)
- [replyUrlResolver](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#replyurlresolver)
- [replying](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#replying)
- [setAsTitle](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#setastitle)
- [spamWarning](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#spamwarning)
- [subjectEntryRenderer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#subjectentryrenderer)
- [subjectEntryRendererArgs](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#subjectentryrendererargs)
- [targetEntryRenderer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#targetentryrenderer)
- [targetEntryRendererArgs](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#targetentryrendererargs)
- [userAvatarElement](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#useravatarelement)
- [userInvalidLabel](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#userinvalidlabel)
- [userLoadProperties](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#userloadproperties)
- [userNameDisplayer](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#usernamedisplayer)
- [userNameProperties](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#usernameproperties)
- [userUsernameElement](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#userusernameelement)
- [valueResolver](client_fast_prototyping_components_email_email_client.IEmailReaderProps.md#valueresolver)

## Properties

### ContentViewer

• `Optional` **ContentViewer**: `ComponentType`\<[`IContentViewerProps`](client_fast_prototyping_components_email_email_client.IContentViewerProps.md)\>

An alternative for the entire content
you should use <View content and <View attachments for displaying
the content itself and <View subject

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:356](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L356)

___

### FallbackAvatarComponent

• `Optional` **FallbackAvatarComponent**: `ComponentType`\<\{ `children`: `ReactNode`  }\>

Fallback avatar to render avatars

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:345](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L345)

___

### SubmitButton

• `Optional` **SubmitButton**: `ComponentType`\<[`ISubmitButtonProps`](client_fast_prototyping_components_email_email_client.ISubmitButtonProps.md)\>

#### Inherited from

IEmailSenderPropsBase.SubmitButton

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:483](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L483)

___

### WrapperComponent

• `Optional` **WrapperComponent**: `ComponentType`\<[`IWrapperComponentProps`](client_fast_prototyping_components_email_email_client.IWrapperComponentProps.md)\>

Wrapper component to use instead of the default this wraps the whole
box area

#### Inherited from

IEmailSenderPropsBase.WrapperComponent

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:482](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L482)

___

### WrapperContent

• `Optional` **WrapperContent**: `ComponentType`\<[`IWrapperComponentProps`](client_fast_prototyping_components_email_email_client.IWrapperComponentProps.md)\>

Wrapper component to used inside of the content

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:306](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L306)

___

### WrapperSpamWarning

• `Optional` **WrapperSpamWarning**: `ComponentType`\<[`IWrapperComponentProps`](client_fast_prototyping_components_email_email_client.IWrapperComponentProps.md)\>

Wrapper component to used inside of the content

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:310](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L310)

___

### WrapperUser

• `Optional` **WrapperUser**: `ComponentType`\<[`IWrapperComponentProps`](client_fast_prototyping_components_email_email_client.IWrapperComponentProps.md)\>

Wrapper component to used inside of the content

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:319](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L319)

___

### attachmentsEntryRenderer

• `Optional` **attachmentsEntryRenderer**: `ComponentType`\<[`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)\>\>

#### Inherited from

IEmailSenderPropsBase.attachmentsEntryRenderer

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:490](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L490)

___

### attachmentsEntryRendererArgs

• `Optional` **attachmentsEntryRendererArgs**: `any`

#### Inherited from

IEmailSenderPropsBase.attachmentsEntryRendererArgs

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:491](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L491)

___

### contentEntryRenderer

• `Optional` **contentEntryRenderer**: `ComponentType`\<[`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)\<[`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)\>\>

#### Inherited from

IEmailSenderPropsBase.contentEntryRenderer

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:488](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L488)

___

### contentEntryRendererArgs

• `Optional` **contentEntryRendererArgs**: `any`

#### Inherited from

IEmailSenderPropsBase.contentEntryRendererArgs

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:489](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L489)

___

### customEntriesRenderer

• `Optional` **customEntriesRenderer**: (`target`: `ReactNode`, `subject`: `ReactNode`, `content`: `ReactNode`, `attachments`: `ReactNode`, `button`: `ReactNode`) => `ReactNode`

#### Type declaration

▸ (`target`, `subject`, `content`, `attachments`, `button`): `ReactNode`

Determine how the entries are to be rendered

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `ReactNode` |
| `subject` | `ReactNode` |
| `content` | `ReactNode` |
| `attachments` | `ReactNode` |
| `button` | `ReactNode` |

##### Returns

`ReactNode`

#### Inherited from

IEmailSenderPropsBase.customEntriesRenderer

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:506](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L506)

___

### emailDisplayer

• `Optional` **emailDisplayer**: (`rfcEmail`: `string`) => `ReactNode`

#### Type declaration

▸ (`rfcEmail`): `ReactNode`

Used to display email addresses

##### Parameters

| Name | Type |
| :------ | :------ |
| `rfcEmail` | `string` |

##### Returns

`ReactNode`

#### Inherited from

IEmailSenderPropsBase.emailDisplayer

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:423](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L423)

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

#### Inherited from

IEmailSenderPropsBase.emailUrlResolver

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:466](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L466)

___

### emailUrlResolverAddQSToNew

• `Optional` **emailUrlResolverAddQSToNew**: `string`

Specify a query string or just arbitrary string
to append to newly resolved urls

#### Inherited from

IEmailSenderPropsBase.emailUrlResolverAddQSToNew

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:471](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L471)

___

### forwardUrlResolver

• **forwardUrlResolver**: (`replyOf`: `string`) => `string`

#### Type declaration

▸ (`replyOf`): `string`

Resolve the url used to forward a message

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `replyOf` | `string` | the id of the email we are trying to forward |

##### Returns

`string`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:337](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L337)

___

### hideDescriptionAttachments

• `Optional` **hideDescriptionAttachments**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideDescriptionAttachments

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:501](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L501)

___

### hideDescriptionContent

• `Optional` **hideDescriptionContent**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideDescriptionContent

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:500](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L500)

___

### hideDescriptionSubject

• `Optional` **hideDescriptionSubject**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideDescriptionSubject

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:499](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L499)

___

### hideDescriptionTarget

• `Optional` **hideDescriptionTarget**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideDescriptionTarget

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:498](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L498)

___

### hideDescriptions

• `Optional` **hideDescriptions**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideDescriptions

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:497](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L497)

___

### hideLabelAttachments

• `Optional` **hideLabelAttachments**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideLabelAttachments

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:496](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L496)

___

### hideLabelContent

• `Optional` **hideLabelContent**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideLabelContent

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:495](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L495)

___

### hideLabelSubject

• `Optional` **hideLabelSubject**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideLabelSubject

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:494](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L494)

___

### hideLabelTarget

• `Optional` **hideLabelTarget**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideLabelTarget

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:493](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L493)

___

### hideLabels

• `Optional` **hideLabels**: `boolean`

#### Inherited from

IEmailSenderPropsBase.hideLabels

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:492](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L492)

___

### id

• **id**: `string`

the id of the email in question that is to be visualized

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:302](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L302)

___

### objectsAllowedReplyAll

• `Optional` **objectsAllowedReplyAll**: `string`[]

A list of qualified path name that can be replied all

#### Inherited from

IEmailSenderPropsBase.objectsAllowedReplyAll

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:441](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L441)

___

### objectsInvalidLabel

• `Optional` **objectsInvalidLabel**: `Object`

Same as the userInvalidLabel but used with other objects of other types
the key is the qualified name and represents the properties in order

#### Index signature

▪ [qualifiedName: `string`]: `React.ReactNode`

#### Inherited from

IEmailSenderPropsBase.objectsInvalidLabel

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:450](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L450)

___

### objectsNameDisplayer

• `Optional` **objectsNameDisplayer**: `Object`

Determines the label as how it is to be displayed by default it will take the first value
according to the order given

#### Index signature

▪ [qualifiedName: `string`]: (...`args`: (`string` \| [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md))[]) => `React.ReactNode`

#### Inherited from

IEmailSenderPropsBase.objectsNameDisplayer

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:435](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L435)

___

### objectsNameResolver

• `Optional` **objectsNameResolver**: `Object`

Same as the userNameProperties but used with other objects of other types
the key is the qualified name and represents the properties in order

#### Index signature

▪ [qualifiedName: `string`]: `string`[]

#### Inherited from

IEmailSenderPropsBase.objectsNameResolver

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:428](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L428)

___

### onFetchSuggestions

• `Optional` **onFetchSuggestions**: (`v`: `string`) => `Promise`\<[`ITagListSuggestion`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryTagList.ITagListSuggestion.md)[]\>

#### Type declaration

▸ (`v`): `Promise`\<[`ITagListSuggestion`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryTagList.ITagListSuggestion.md)[]\>

Use to resolve suggestions for the user

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | the string being inputted |

##### Returns

`Promise`\<[`ITagListSuggestion`](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryTagList.ITagListSuggestion.md)[]\>

#### Inherited from

IEmailSenderPropsBase.onFetchSuggestions

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:477](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L477)

___

### replyAllBlacklist

• `Optional` **replyAllBlacklist**: `string`[]

A blacklist for replying all

#### Inherited from

IEmailSenderPropsBase.replyAllBlacklist

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:445](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L445)

___

### replyAllUrlResolver

• **replyAllUrlResolver**: (`replyOf`: `string`) => `string`

#### Type declaration

▸ (`replyOf`): `string`

Resolve the url used to reply to a message (all involved targets)

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `replyOf` | `string` | the id of the email we are trying to reply |

##### Returns

`string`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:331](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L331)

___

### replyUrlResolver

• **replyUrlResolver**: (`replyOf`: `string`) => `string`

#### Type declaration

▸ (`replyOf`): `string`

Resolve the url used to reply to a message

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `replyOf` | `string` | the id of the email we are trying to reply |

##### Returns

`string`

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:325](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L325)

___

### replying

• `Optional` **replying**: ``"reply-all"`` \| ``"reply"`` \| ``"forward"``

If we are currently replying

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:341](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L341)

___

### setAsTitle

• `Optional` **setAsTitle**: `string`

Use the given property to be set as the title
for example the subjct

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:350](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L350)

___

### spamWarning

• `Optional` **spamWarning**: `ReactNode`

Spam warning to use inside the warning object
defaults to <I18nRead id="spam_warning" />

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:315](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L315)

___

### subjectEntryRenderer

• `Optional` **subjectEntryRenderer**: `ComponentType`\<[`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)\<[`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)\>\>

#### Inherited from

IEmailSenderPropsBase.subjectEntryRenderer

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:486](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L486)

___

### subjectEntryRendererArgs

• `Optional` **subjectEntryRendererArgs**: `any`

#### Inherited from

IEmailSenderPropsBase.subjectEntryRendererArgs

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:487](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L487)

___

### targetEntryRenderer

• `Optional` **targetEntryRenderer**: `ComponentType`\<[`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)\<`string`\>\>

#### Inherited from

IEmailSenderPropsBase.targetEntryRenderer

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:484](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L484)

___

### targetEntryRendererArgs

• `Optional` **targetEntryRendererArgs**: `any`

#### Inherited from

IEmailSenderPropsBase.targetEntryRendererArgs

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:485](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L485)

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

### userInvalidLabel

• **userInvalidLabel**: `ReactNode`

A label to use when the value is invalid for example, a bad unknown user
or something else entirely

#### Inherited from

IEmailSenderPropsBase.userInvalidLabel

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:412](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L412)

___

### userLoadProperties

• **userLoadProperties**: `string`[]

Properties to load for the user

#### Inherited from

[IBasicEmailClientProps](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md).[userLoadProperties](client_fast_prototyping_components_email_email_client.IBasicEmailClientProps.md#userloadproperties)

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:205](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L205)

___

### userNameDisplayer

• `Optional` **userNameDisplayer**: (...`args`: (`string` \| [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md))[]) => `ReactNode`

#### Type declaration

▸ (`...args`): `ReactNode`

Determines the label as how it is to be displayed by default it will take the first value
according to the order given

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | (`string` \| [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md))[] |

##### Returns

`ReactNode`

#### Inherited from

IEmailSenderPropsBase.userNameDisplayer

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:417](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L417)

___

### userNameProperties

• **userNameProperties**: `string`[]

In order the properties to use for the user, username field
normally it'd be ["username"] but it could be ["real_name", "username"]
use if you have more than one field for the username

#### Inherited from

IEmailSenderPropsBase.userNameProperties

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:407](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L407)

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

___

### valueResolver

• `Optional` **valueResolver**: (`v`: `IInternalValueResolverOptions`) => `Promise`\<`string`\>

#### Type declaration

▸ (`v`): `Promise`\<`string`\>

This should resolve for a given input what the value should resolve
for, normally this only applies to internal usernames

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `IInternalValueResolverOptions` | the information regarding this user |

##### Returns

`Promise`\<`string`\>

a string, should be either a

#### Inherited from

IEmailSenderPropsBase.valueResolver

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:459](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L459)
