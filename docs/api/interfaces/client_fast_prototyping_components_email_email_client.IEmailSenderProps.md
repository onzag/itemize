[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/email/email-client](../modules/client_fast_prototyping_components_email_email_client.md) / IEmailSenderProps

# Interface: IEmailSenderProps

[client/fast-prototyping/components/email/email-client](../modules/client_fast_prototyping_components_email_email_client.md).IEmailSenderProps

The props for the email sender where we are sending a first time email

## Hierarchy

- `IEmailSenderPropsBase`

  ↳ **`IEmailSenderProps`**

## Table of contents

### Properties

- [SubmitButton](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#submitbutton)
- [WrapperComponent](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#wrappercomponent)
- [attachmentsEntryRenderer](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#attachmentsentryrenderer)
- [attachmentsEntryRendererArgs](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#attachmentsentryrendererargs)
- [contentEntryRenderer](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#contententryrenderer)
- [contentEntryRendererArgs](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#contententryrendererargs)
- [customEntriesRenderer](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#customentriesrenderer)
- [emailDisplayer](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#emaildisplayer)
- [emailUrlResolver](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#emailurlresolver)
- [emailUrlResolverAddQSToNew](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#emailurlresolveraddqstonew)
- [hideDescriptionAttachments](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidedescriptionattachments)
- [hideDescriptionContent](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidedescriptioncontent)
- [hideDescriptionSubject](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidedescriptionsubject)
- [hideDescriptionTarget](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidedescriptiontarget)
- [hideDescriptions](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidedescriptions)
- [hideLabelAttachments](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidelabelattachments)
- [hideLabelContent](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidelabelcontent)
- [hideLabelSubject](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidelabelsubject)
- [hideLabelTarget](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidelabeltarget)
- [hideLabels](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#hidelabels)
- [objectsAllowedReplyAll](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#objectsallowedreplyall)
- [objectsInvalidLabel](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#objectsinvalidlabel)
- [objectsNameDisplayer](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#objectsnamedisplayer)
- [objectsNameResolver](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#objectsnameresolver)
- [onFetchSuggestions](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#onfetchsuggestions)
- [replyAllBlacklist](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#replyallblacklist)
- [replyOf](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#replyof)
- [subjectEntryRenderer](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#subjectentryrenderer)
- [subjectEntryRendererArgs](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#subjectentryrendererargs)
- [subjectPrefill](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#subjectprefill)
- [targetEntryRenderer](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#targetentryrenderer)
- [targetEntryRendererArgs](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#targetentryrendererargs)
- [targetPrefill](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#targetprefill)
- [userInvalidLabel](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#userinvalidlabel)
- [userNameDisplayer](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#usernamedisplayer)
- [userNameProperties](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#usernameproperties)
- [valueResolver](client_fast_prototyping_components_email_email_client.IEmailSenderProps.md#valueresolver)

## Properties

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

### replyOf

• `Optional` **replyOf**: `string`

reply of something? if so give the id of the email that is being replied

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:531](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L531)

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

### subjectPrefill

• `Optional` **subjectPrefill**: [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)

prefill for the subject field

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:522](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L522)

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

### targetPrefill

• `Optional` **targetPrefill**: `string`[]

prefill for the target field
eg. ["admin@gmail.com", "admin", "USER_ID", "ID$MOD_something__IDEF_else"]

#### Defined in

[client/fast-prototyping/components/email/email-client.tsx:527](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/email/email-client.tsx#L527)

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
