[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/types/video](../modules/client_internal_text_serializer_types_video.md) / IVideo

# Interface: IVideo

[client/internal/text/serializer/types/video](../modules/client_internal_text_serializer_types_video.md).IVideo

Represents a video type

## Hierarchy

- [`IElementBase`](client_internal_text_serializer_base.IElementBase.md)

  ↳ **`IVideo`**

## Table of contents

### Properties

- [blur](client_internal_text_serializer_types_video.IVideo.md#blur)
- [children](client_internal_text_serializer_types_video.IVideo.md#children)
- [click](client_internal_text_serializer_types_video.IVideo.md#click)
- [containment](client_internal_text_serializer_types_video.IVideo.md#containment)
- [context](client_internal_text_serializer_types_video.IVideo.md#context)
- [focus](client_internal_text_serializer_types_video.IVideo.md#focus)
- [forEach](client_internal_text_serializer_types_video.IVideo.md#foreach)
- [givenName](client_internal_text_serializer_types_video.IVideo.md#givenname)
- [html](client_internal_text_serializer_types_video.IVideo.md#html)
- [ifCondition](client_internal_text_serializer_types_video.IVideo.md#ifcondition)
- [input](client_internal_text_serializer_types_video.IVideo.md#input)
- [keydown](client_internal_text_serializer_types_video.IVideo.md#keydown)
- [keypress](client_internal_text_serializer_types_video.IVideo.md#keypress)
- [keyup](client_internal_text_serializer_types_video.IVideo.md#keyup)
- [mousedown](client_internal_text_serializer_types_video.IVideo.md#mousedown)
- [mouseenter](client_internal_text_serializer_types_video.IVideo.md#mouseenter)
- [mouseleave](client_internal_text_serializer_types_video.IVideo.md#mouseleave)
- [mousemove](client_internal_text_serializer_types_video.IVideo.md#mousemove)
- [mouseout](client_internal_text_serializer_types_video.IVideo.md#mouseout)
- [mouseover](client_internal_text_serializer_types_video.IVideo.md#mouseover)
- [mouseup](client_internal_text_serializer_types_video.IVideo.md#mouseup)
- [mousewheel](client_internal_text_serializer_types_video.IVideo.md#mousewheel)
- [origin](client_internal_text_serializer_types_video.IVideo.md#origin)
- [richClassList](client_internal_text_serializer_types_video.IVideo.md#richclasslist)
- [src](client_internal_text_serializer_types_video.IVideo.md#src)
- [style](client_internal_text_serializer_types_video.IVideo.md#style)
- [styleActive](client_internal_text_serializer_types_video.IVideo.md#styleactive)
- [styleHover](client_internal_text_serializer_types_video.IVideo.md#stylehover)
- [textContent](client_internal_text_serializer_types_video.IVideo.md#textcontent)
- [touchcancel](client_internal_text_serializer_types_video.IVideo.md#touchcancel)
- [touchend](client_internal_text_serializer_types_video.IVideo.md#touchend)
- [touchmove](client_internal_text_serializer_types_video.IVideo.md#touchmove)
- [touchstart](client_internal_text_serializer_types_video.IVideo.md#touchstart)
- [type](client_internal_text_serializer_types_video.IVideo.md#type)
- [uiHandler](client_internal_text_serializer_types_video.IVideo.md#uihandler)
- [uiHandlerArgs](client_internal_text_serializer_types_video.IVideo.md#uihandlerargs)
- [wheel](client_internal_text_serializer_types_video.IVideo.md#wheel)

## Properties

### blur

• `Optional` **blur**: `string`

For templating
Represents a variable for templating for the data-on-blur event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[blur](client_internal_text_serializer_base.IElementBase.md#blur)

#### Defined in

[client/internal/text/serializer/base.tsx:933](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L933)

___

### children

• **children**: [[`IText`](client_internal_text_serializer_types_text.IText.md)]

The children are a text type even
when it's void

#### Defined in

[client/internal/text/serializer/types/video.tsx:155](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/types/video.tsx#L155)

___

### click

• `Optional` **click**: `string`

For templating
Represents a variable for templating for the data-on-click event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[click](client_internal_text_serializer_base.IElementBase.md#click)

#### Defined in

[client/internal/text/serializer/base.tsx:928](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L928)

___

### containment

• **containment**: ``"void-block"``

refers that it can only contain inline elements

#### Defined in

[client/internal/text/serializer/types/video.tsx:141](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/types/video.tsx#L141)

___

### context

• `Optional` **context**: `string`

for templating
Represents a chosen context and it applies to the property
data-context

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[context](client_internal_text_serializer_base.IElementBase.md#context)

#### Defined in

[client/internal/text/serializer/base.tsx:917](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L917)

___

### focus

• `Optional` **focus**: `string`

For templating
Represents a variable for templating for the data-on-focus event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[focus](client_internal_text_serializer_base.IElementBase.md#focus)

#### Defined in

[client/internal/text/serializer/base.tsx:938](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L938)

___

### forEach

• `Optional` **forEach**: `string`

for templating
Represents the chosen each context and it applies to the property
data-for-each

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[forEach](client_internal_text_serializer_base.IElementBase.md#foreach)

#### Defined in

[client/internal/text/serializer/base.tsx:923](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L923)

___

### givenName

• `Optional` **givenName**: `string`

An optional name, just used to be displayed in the tree

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[givenName](client_internal_text_serializer_base.IElementBase.md#givenname)

#### Defined in

[client/internal/text/serializer/base.tsx:857](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L857)

___

### html

• `Optional` **html**: `string`

For templating
Represents replacement html content for the inner HTML
of the given element

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[html](client_internal_text_serializer_base.IElementBase.md#html)

#### Defined in

[client/internal/text/serializer/base.tsx:893](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L893)

___

### ifCondition

• `Optional` **ifCondition**: `string`

For templating
and if condition for conditional rendering

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[ifCondition](client_internal_text_serializer_base.IElementBase.md#ifcondition)

#### Defined in

[client/internal/text/serializer/base.tsx:887](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L887)

___

### input

• `Optional` **input**: `string`

For templating
Represents a variable for templating for the data-on-input event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[input](client_internal_text_serializer_base.IElementBase.md#input)

#### Defined in

[client/internal/text/serializer/base.tsx:943](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L943)

___

### keydown

• `Optional` **keydown**: `string`

For templating
Represents a variable for templating for the data-on-keydown event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keydown](client_internal_text_serializer_base.IElementBase.md#keydown)

#### Defined in

[client/internal/text/serializer/base.tsx:948](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L948)

___

### keypress

• `Optional` **keypress**: `string`

For templating
Represents a variable for templating for the data-on-keypress event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keypress](client_internal_text_serializer_base.IElementBase.md#keypress)

#### Defined in

[client/internal/text/serializer/base.tsx:953](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L953)

___

### keyup

• `Optional` **keyup**: `string`

For templating
Represents a variable for templating for the data-on-keyup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keyup](client_internal_text_serializer_base.IElementBase.md#keyup)

#### Defined in

[client/internal/text/serializer/base.tsx:958](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L958)

___

### mousedown

• `Optional` **mousedown**: `string`

For templating
Represents a variable for templating for the data-on-mousedown event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousedown](client_internal_text_serializer_base.IElementBase.md#mousedown)

#### Defined in

[client/internal/text/serializer/base.tsx:963](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L963)

___

### mouseenter

• `Optional` **mouseenter**: `string`

For templating
Represents a variable for templating for the data-on-mouseenter event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseenter](client_internal_text_serializer_base.IElementBase.md#mouseenter)

#### Defined in

[client/internal/text/serializer/base.tsx:968](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L968)

___

### mouseleave

• `Optional` **mouseleave**: `string`

For templating
Represents a variable for templating for the data-on-mouseleave event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseleave](client_internal_text_serializer_base.IElementBase.md#mouseleave)

#### Defined in

[client/internal/text/serializer/base.tsx:973](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L973)

___

### mousemove

• `Optional` **mousemove**: `string`

For templating
Represents a variable for templating for the data-on-mousemove event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousemove](client_internal_text_serializer_base.IElementBase.md#mousemove)

#### Defined in

[client/internal/text/serializer/base.tsx:978](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L978)

___

### mouseout

• `Optional` **mouseout**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseout](client_internal_text_serializer_base.IElementBase.md#mouseout)

#### Defined in

[client/internal/text/serializer/base.tsx:988](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L988)

___

### mouseover

• `Optional` **mouseover**: `string`

For templating
Represents a variable for templating for the data-on-mouseover event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseover](client_internal_text_serializer_base.IElementBase.md#mouseover)

#### Defined in

[client/internal/text/serializer/base.tsx:983](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L983)

___

### mouseup

• `Optional` **mouseup**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseup](client_internal_text_serializer_base.IElementBase.md#mouseup)

#### Defined in

[client/internal/text/serializer/base.tsx:993](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L993)

___

### mousewheel

• `Optional` **mousewheel**: `string`

For templating
Represents a variable for templating for the data-on-mousewheel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousewheel](client_internal_text_serializer_base.IElementBase.md#mousewheel)

#### Defined in

[client/internal/text/serializer/base.tsx:998](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L998)

___

### origin

• **origin**: ``"youtube"`` \| ``"vimeo"``

as for the text specs only vimeo and youtube are supported

#### Defined in

[client/internal/text/serializer/types/video.tsx:145](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/types/video.tsx#L145)

___

### richClassList

• `Optional` **richClassList**: `string`[]

The classes that this element has applied
these classes represent the extra classes and not the base
classes that are applied for the given type, so it's primarily
the rich-text-- classes types

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[richClassList](client_internal_text_serializer_base.IElementBase.md#richclasslist)

#### Defined in

[client/internal/text/serializer/base.tsx:880](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L880)

___

### src

• **src**: `string`

The source of the video represents
the data-video-src

#### Defined in

[client/internal/text/serializer/types/video.tsx:150](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/types/video.tsx#L150)

___

### style

• `Optional` **style**: `string`

This is the standard style that translates to the style tag
following the text specifications only some properties are allowed
within it

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[style](client_internal_text_serializer_base.IElementBase.md#style)

#### Defined in

[client/internal/text/serializer/base.tsx:863](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L863)

___

### styleActive

• `Optional` **styleActive**: `string`

Same as the style tag with the same rules but represents data-style-active
and it's the style for when the item is in an active state

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[styleActive](client_internal_text_serializer_base.IElementBase.md#styleactive)

#### Defined in

[client/internal/text/serializer/base.tsx:873](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L873)

___

### styleHover

• `Optional` **styleHover**: `string`

This is similar to the style tag but represents the style tag as it
is applied during a hover event, represents data-style-hover

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[styleHover](client_internal_text_serializer_base.IElementBase.md#stylehover)

#### Defined in

[client/internal/text/serializer/base.tsx:868](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L868)

___

### textContent

• `Optional` **textContent**: `string`

For templating
Represents replacement for textual content
of the given element

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[textContent](client_internal_text_serializer_base.IElementBase.md#textcontent)

#### Defined in

[client/internal/text/serializer/base.tsx:899](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L899)

___

### touchcancel

• `Optional` **touchcancel**: `string`

For templating
Represents a variable for templating for the data-on-touchcancel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchcancel](client_internal_text_serializer_base.IElementBase.md#touchcancel)

#### Defined in

[client/internal/text/serializer/base.tsx:1018](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L1018)

___

### touchend

• `Optional` **touchend**: `string`

For templating
Represents a variable for templating for the data-on-touchend event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchend](client_internal_text_serializer_base.IElementBase.md#touchend)

#### Defined in

[client/internal/text/serializer/base.tsx:1013](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L1013)

___

### touchmove

• `Optional` **touchmove**: `string`

For templating
Represents a variable for templating for the data-on-touchmove event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchmove](client_internal_text_serializer_base.IElementBase.md#touchmove)

#### Defined in

[client/internal/text/serializer/base.tsx:1008](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L1008)

___

### touchstart

• `Optional` **touchstart**: `string`

For templating
Represents a variable for templating for the data-on-touchstart event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchstart](client_internal_text_serializer_base.IElementBase.md#touchstart)

#### Defined in

[client/internal/text/serializer/base.tsx:1003](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L1003)

___

### type

• **type**: ``"video"``

#### Defined in

[client/internal/text/serializer/types/video.tsx:137](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/types/video.tsx#L137)

___

### uiHandler

• `Optional` **uiHandler**: `string`

For templating
Represents a chosen ui handler and it applies to the property
data-ui-handler

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[uiHandler](client_internal_text_serializer_base.IElementBase.md#uihandler)

#### Defined in

[client/internal/text/serializer/base.tsx:905](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L905)

___

### uiHandlerArgs

• `Optional` **uiHandlerArgs**: `Object`

Arguments for the ui handler

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[uiHandlerArgs](client_internal_text_serializer_base.IElementBase.md#uihandlerargs)

#### Defined in

[client/internal/text/serializer/base.tsx:909](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L909)

___

### wheel

• `Optional` **wheel**: `string`

For templating
Represents a variable for templating for the data-on-wheel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[wheel](client_internal_text_serializer_base.IElementBase.md#wheel)

#### Defined in

[client/internal/text/serializer/base.tsx:1023](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/base.tsx#L1023)
