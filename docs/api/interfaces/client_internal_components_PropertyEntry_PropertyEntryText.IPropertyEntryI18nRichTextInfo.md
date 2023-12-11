[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md) / IPropertyEntryI18nRichTextInfo

# Interface: IPropertyEntryI18nRichTextInfo

[client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md).IPropertyEntryI18nRichTextInfo

## Table of contents

### Properties

- [actions](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#actions)
- [addTemplateHTML](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#addtemplatehtml)
- [addTemplateText](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#addtemplatetext)
- [alt](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#alt)
- [classes](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#classes)
- [container](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#container)
- [context](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#context)
- [custom](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#custom)
- [each](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#each)
- [file](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#file)
- [formatAddContainerLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddcontainerlabel)
- [formatAddCustomLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddcustomlabel)
- [formatAddFileLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddfilelabel)
- [formatAddImageLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddimagelabel)
- [formatAddTableLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddtablelabel)
- [formatAddTbodyLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddtbodylabel)
- [formatAddTdLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddtdlabel)
- [formatAddTemplateHTML](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddtemplatehtml)
- [formatAddTemplateText](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddtemplatetext)
- [formatAddTfootLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddtfootlabel)
- [formatAddThLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddthlabel)
- [formatAddTheadLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddtheadlabel)
- [formatAddTrLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddtrlabel)
- [formatAddVideoLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formataddvideolabel)
- [formatBoldLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatboldlabel)
- [formatDelTdLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatdeltdlabel)
- [formatDelThLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatdelthlabel)
- [formatDelTrLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatdeltrlabel)
- [formatDeleteElement](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatdeleteelement)
- [formatItalicLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatitaliclabel)
- [formatLinkLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatlinklabel)
- [formatListBulletedLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatlistbulletedlabel)
- [formatListNumberedLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatlistnumberedlabel)
- [formatMakeLoop](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatmakeloop)
- [formatMore](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatmore)
- [formatQuoteLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatquotelabel)
- [formatSetActiveStyleLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetactivestylelabel)
- [formatSetClassLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetclasslabel)
- [formatSetContext](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetcontext)
- [formatSetEventHandlers](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatseteventhandlers)
- [formatSetHoverStyleLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsethoverstylelabel)
- [formatSetRenderCondition](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetrendercondition)
- [formatSetStyleLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetstylelabel)
- [formatSetUIHandlerArgLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetuihandlerarglabel)
- [formatSetUIHandlerArgName](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetuihandlerargname)
- [formatSetUIHandlerArgValue](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetuihandlerargvalue)
- [formatSetUIHandlerLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatsetuihandlerlabel)
- [formatTitleLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formattitlelabel)
- [formatUnderlineLabel](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#formatunderlinelabel)
- [image](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#image)
- [inline](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#inline)
- [interactive](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#interactive)
- [link](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#link)
- [list](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#list)
- [listItem](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#listitem)
- [loadVideo](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#loadvideo)
- [name](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#name)
- [paragraph](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#paragraph)
- [quote](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#quote)
- [renderCondition](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#rendercondition)
- [richClasses](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#richclasses)
- [richContainers](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#richcontainers)
- [richCustoms](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#richcustoms)
- [richTables](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#richtables)
- [richUIHandlerElement](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#richuihandlerelement)
- [setLink](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#setlink)
- [settings](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#settings)
- [sizes](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#sizes)
- [standalone](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#standalone)
- [style](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#style)
- [styleActive](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#styleactive)
- [styleHover](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#stylehover)
- [styled](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#styled)
- [styles](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#styles)
- [table](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#table)
- [tbody](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#tbody)
- [td](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#td)
- [template](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#template)
- [templating](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#templating)
- [text](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#text)
- [tfoot](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#tfoot)
- [th](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#th)
- [thead](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#thead)
- [title](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#title)
- [tr](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#tr)
- [type](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#type)
- [uiHandler](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#uihandler)
- [video](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md#video)

## Properties

### actions

• **actions**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:136](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L136)

___

### addTemplateHTML

• **addTemplateHTML**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `placeholder` | `string` |
| `submit` | `string` |
| `title` | `string` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:172](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L172)

___

### addTemplateText

• **addTemplateText**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `placeholder` | `string` |
| `submit` | `string` |
| `title` | `string` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:165](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L165)

___

### alt

• **alt**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:104](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L104)

___

### classes

• **classes**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:132](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L132)

___

### container

• **container**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:106](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L106)

___

### context

• **context**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:138](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L138)

___

### custom

• **custom**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:109](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L109)

___

### each

• **each**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:137](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L137)

___

### file

• **file**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:110](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L110)

___

### formatAddContainerLabel

• **formatAddContainerLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:74](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L74)

___

### formatAddCustomLabel

• **formatAddCustomLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:85](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L85)

___

### formatAddFileLabel

• **formatAddFileLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:73](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L73)

___

### formatAddImageLabel

• **formatAddImageLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:71](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L71)

___

### formatAddTableLabel

• **formatAddTableLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:75](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L75)

___

### formatAddTbodyLabel

• **formatAddTbodyLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:77](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L77)

___

### formatAddTdLabel

• **formatAddTdLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:80](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L80)

___

### formatAddTemplateHTML

• **formatAddTemplateHTML**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:99](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L99)

___

### formatAddTemplateText

• **formatAddTemplateText**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:98](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L98)

___

### formatAddTfootLabel

• **formatAddTfootLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:78](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L78)

___

### formatAddThLabel

• **formatAddThLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:81](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L81)

___

### formatAddTheadLabel

• **formatAddTheadLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:76](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L76)

___

### formatAddTrLabel

• **formatAddTrLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:79](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L79)

___

### formatAddVideoLabel

• **formatAddVideoLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:72](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L72)

___

### formatBoldLabel

• **formatBoldLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:63](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L63)

___

### formatDelTdLabel

• **formatDelTdLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:83](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L83)

___

### formatDelThLabel

• **formatDelThLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:84](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L84)

___

### formatDelTrLabel

• **formatDelTrLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:82](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L82)

___

### formatDeleteElement

• **formatDeleteElement**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:100](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L100)

___

### formatItalicLabel

• **formatItalicLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:64](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L64)

___

### formatLinkLabel

• **formatLinkLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:66](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L66)

___

### formatListBulletedLabel

• **formatListBulletedLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:70](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L70)

___

### formatListNumberedLabel

• **formatListNumberedLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:69](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L69)

___

### formatMakeLoop

• **formatMakeLoop**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:93](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L93)

___

### formatMore

• **formatMore**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:101](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L101)

___

### formatQuoteLabel

• **formatQuoteLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:68](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L68)

___

### formatSetActiveStyleLabel

• **formatSetActiveStyleLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:88](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L88)

___

### formatSetClassLabel

• **formatSetClassLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:89](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L89)

___

### formatSetContext

• **formatSetContext**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:91](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L91)

___

### formatSetEventHandlers

• **formatSetEventHandlers**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:90](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L90)

___

### formatSetHoverStyleLabel

• **formatSetHoverStyleLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:87](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L87)

___

### formatSetRenderCondition

• **formatSetRenderCondition**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:92](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L92)

___

### formatSetStyleLabel

• **formatSetStyleLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:86](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L86)

___

### formatSetUIHandlerArgLabel

• **formatSetUIHandlerArgLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:95](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L95)

___

### formatSetUIHandlerArgName

• **formatSetUIHandlerArgName**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:96](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L96)

___

### formatSetUIHandlerArgValue

• **formatSetUIHandlerArgValue**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:97](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L97)

___

### formatSetUIHandlerLabel

• **formatSetUIHandlerLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:94](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L94)

___

### formatTitleLabel

• **formatTitleLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:67](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L67)

___

### formatUnderlineLabel

• **formatUnderlineLabel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:65](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L65)

___

### image

• **image**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:111](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L111)

___

### inline

• **inline**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:107](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L107)

___

### interactive

• **interactive**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:128](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L128)

___

### link

• **link**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:112](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L112)

___

### list

• **list**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:113](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L113)

___

### listItem

• **listItem**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:114](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L114)

___

### loadVideo

• **loadVideo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `invalid` | `string` |
| `label` | `string` |
| `placeholder` | `string` |
| `submit` | `string` |
| `title` | `string` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:144](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L144)

___

### name

• **name**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:103](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L103)

___

### paragraph

• **paragraph**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:115](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L115)

___

### quote

• **quote**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:116](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L116)

___

### renderCondition

• **renderCondition**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:139](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L139)

___

### richClasses

• **richClasses**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:188](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L188)

___

### richContainers

• **richContainers**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:185](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L185)

___

### richCustoms

• **richCustoms**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:191](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L191)

___

### richTables

• **richTables**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:182](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L182)

___

### richUIHandlerElement

• **richUIHandlerElement**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:179](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L179)

___

### setLink

• **setLink**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `invalid` | `string` |
| `label` | `string` |
| `placeholder` | `string` |
| `placeholderLocalOnly` | `string` |
| `submit` | `string` |
| `templated` | `string` |
| `templatedLabel` | `string` |
| `templatedPlaceholder` | `string` |
| `templatedUnspecified` | `string` |
| `title` | `string` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:152](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L152)

___

### settings

• **settings**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:133](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L133)

___

### sizes

• **sizes**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:105](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L105)

___

### standalone

• **standalone**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:142](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L142)

___

### style

• **style**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:129](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L129)

___

### styleActive

• **styleActive**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:130](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L130)

___

### styleHover

• **styleHover**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:131](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L131)

___

### styled

• **styled**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:126](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L126)

___

### styles

• **styles**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:134](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L134)

___

### table

• **table**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:118](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L118)

___

### tbody

• **tbody**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:120](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L120)

___

### td

• **td**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:123](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L123)

___

### template

• **template**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:127](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L127)

___

### templating

• **templating**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:135](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L135)

___

### text

• **text**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:108](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L108)

___

### tfoot

• **tfoot**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:121](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L121)

___

### th

• **th**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:124](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L124)

___

### thead

• **thead**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:119](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L119)

___

### title

• **title**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:117](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L117)

___

### tr

• **tr**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:122](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L122)

___

### type

• **type**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:141](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L141)

___

### uiHandler

• **uiHandler**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:140](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L140)

___

### video

• **video**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:125](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L125)
