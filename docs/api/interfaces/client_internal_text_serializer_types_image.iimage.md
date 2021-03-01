[](../README.md) / [Exports](../modules.md) / [client/internal/text/serializer/types/image](../modules/client_internal_text_serializer_types_image.md) / IImage

# Interface: IImage

[client/internal/text/serializer/types/image](../modules/client_internal_text_serializer_types_image.md).IImage

Represents the basic image element

## Hierarchy

* [*IElementBase*](client_internal_text_serializer_base.ielementbase.md)

  ↳ **IImage**

## Table of contents

### Properties

- [alt](client_internal_text_serializer_types_image.iimage.md#alt)
- [blur](client_internal_text_serializer_types_image.iimage.md#blur)
- [children](client_internal_text_serializer_types_image.iimage.md#children)
- [click](client_internal_text_serializer_types_image.iimage.md#click)
- [containment](client_internal_text_serializer_types_image.iimage.md#containment)
- [context](client_internal_text_serializer_types_image.iimage.md#context)
- [focus](client_internal_text_serializer_types_image.iimage.md#focus)
- [forEach](client_internal_text_serializer_types_image.iimage.md#foreach)
- [givenName](client_internal_text_serializer_types_image.iimage.md#givenname)
- [height](client_internal_text_serializer_types_image.iimage.md#height)
- [html](client_internal_text_serializer_types_image.iimage.md#html)
- [ifCondition](client_internal_text_serializer_types_image.iimage.md#ifcondition)
- [input](client_internal_text_serializer_types_image.iimage.md#input)
- [keydown](client_internal_text_serializer_types_image.iimage.md#keydown)
- [keypress](client_internal_text_serializer_types_image.iimage.md#keypress)
- [keyup](client_internal_text_serializer_types_image.iimage.md#keyup)
- [mousedown](client_internal_text_serializer_types_image.iimage.md#mousedown)
- [mouseenter](client_internal_text_serializer_types_image.iimage.md#mouseenter)
- [mouseleave](client_internal_text_serializer_types_image.iimage.md#mouseleave)
- [mousemove](client_internal_text_serializer_types_image.iimage.md#mousemove)
- [mouseout](client_internal_text_serializer_types_image.iimage.md#mouseout)
- [mouseover](client_internal_text_serializer_types_image.iimage.md#mouseover)
- [mouseup](client_internal_text_serializer_types_image.iimage.md#mouseup)
- [mousewheel](client_internal_text_serializer_types_image.iimage.md#mousewheel)
- [richClassList](client_internal_text_serializer_types_image.iimage.md#richclasslist)
- [sizes](client_internal_text_serializer_types_image.iimage.md#sizes)
- [src](client_internal_text_serializer_types_image.iimage.md#src)
- [srcId](client_internal_text_serializer_types_image.iimage.md#srcid)
- [srcSet](client_internal_text_serializer_types_image.iimage.md#srcset)
- [standalone](client_internal_text_serializer_types_image.iimage.md#standalone)
- [style](client_internal_text_serializer_types_image.iimage.md#style)
- [styleActive](client_internal_text_serializer_types_image.iimage.md#styleactive)
- [styleHover](client_internal_text_serializer_types_image.iimage.md#stylehover)
- [textContent](client_internal_text_serializer_types_image.iimage.md#textcontent)
- [touchcancel](client_internal_text_serializer_types_image.iimage.md#touchcancel)
- [touchend](client_internal_text_serializer_types_image.iimage.md#touchend)
- [touchmove](client_internal_text_serializer_types_image.iimage.md#touchmove)
- [touchstart](client_internal_text_serializer_types_image.iimage.md#touchstart)
- [type](client_internal_text_serializer_types_image.iimage.md#type)
- [uiHandler](client_internal_text_serializer_types_image.iimage.md#uihandler)
- [uiHandlerArgs](client_internal_text_serializer_types_image.iimage.md#uihandlerargs)
- [wheel](client_internal_text_serializer_types_image.iimage.md#wheel)
- [width](client_internal_text_serializer_types_image.iimage.md#width)

## Properties

### alt

• **alt**: *string*

Alternative text of the image

Defined in: [client/internal/text/serializer/types/image.tsx:340](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L340)

___

### blur

• `Optional` **blur**: *string*

For templating
Represents a variable for templating for the data-on-blur event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[blur](client_internal_text_serializer_base.ielementbase.md#blur)

Defined in: [client/internal/text/serializer/base.tsx:929](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L929)

___

### children

• **children**: [[*IText*](client_internal_text_serializer_types_text.itext.md)]

The children of the image is a text node
as defined by the specifications of slate
even when nothing is writable there

Defined in: [client/internal/text/serializer/types/image.tsx:351](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L351)

___

### click

• `Optional` **click**: *string*

For templating
Represents a variable for templating for the data-on-click event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[click](client_internal_text_serializer_base.ielementbase.md#click)

Defined in: [client/internal/text/serializer/base.tsx:924](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L924)

___

### containment

• **containment**: *void-block*

refers that it can't contain anything

Defined in: [client/internal/text/serializer/types/image.tsx:307](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L307)

___

### context

• `Optional` **context**: *string*

for templating
Represents a chosen context and it applies to the property
data-context

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[context](client_internal_text_serializer_base.ielementbase.md#context)

Defined in: [client/internal/text/serializer/base.tsx:913](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L913)

___

### focus

• `Optional` **focus**: *string*

For templating
Represents a variable for templating for the data-on-focus event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[focus](client_internal_text_serializer_base.ielementbase.md#focus)

Defined in: [client/internal/text/serializer/base.tsx:934](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L934)

___

### forEach

• `Optional` **forEach**: *string*

for templating
Represents the chosen each context and it applies to the property
data-for-each

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[forEach](client_internal_text_serializer_base.ielementbase.md#foreach)

Defined in: [client/internal/text/serializer/base.tsx:919](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L919)

___

### givenName

• `Optional` **givenName**: *string*

An optional name, just used to be displayed in the tree

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[givenName](client_internal_text_serializer_base.ielementbase.md#givenname)

Defined in: [client/internal/text/serializer/base.tsx:853](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L853)

___

### height

• **height**: *number*

Height of the image in pixels
data-src-height

Defined in: [client/internal/text/serializer/types/image.tsx:317](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L317)

___

### html

• `Optional` **html**: *string*

For templating
Represents replacement html content for the inner HTML
of the given element

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[html](client_internal_text_serializer_base.ielementbase.md#html)

Defined in: [client/internal/text/serializer/base.tsx:889](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L889)

___

### ifCondition

• `Optional` **ifCondition**: *string*

For templating
and if condition for conditional rendering

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[ifCondition](client_internal_text_serializer_base.ielementbase.md#ifcondition)

Defined in: [client/internal/text/serializer/base.tsx:883](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L883)

___

### input

• `Optional` **input**: *string*

For templating
Represents a variable for templating for the data-on-input event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[input](client_internal_text_serializer_base.ielementbase.md#input)

Defined in: [client/internal/text/serializer/base.tsx:939](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L939)

___

### keydown

• `Optional` **keydown**: *string*

For templating
Represents a variable for templating for the data-on-keydown event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[keydown](client_internal_text_serializer_base.ielementbase.md#keydown)

Defined in: [client/internal/text/serializer/base.tsx:944](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L944)

___

### keypress

• `Optional` **keypress**: *string*

For templating
Represents a variable for templating for the data-on-keypress event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[keypress](client_internal_text_serializer_base.ielementbase.md#keypress)

Defined in: [client/internal/text/serializer/base.tsx:949](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L949)

___

### keyup

• `Optional` **keyup**: *string*

For templating
Represents a variable for templating for the data-on-keyup event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[keyup](client_internal_text_serializer_base.ielementbase.md#keyup)

Defined in: [client/internal/text/serializer/base.tsx:954](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L954)

___

### mousedown

• `Optional` **mousedown**: *string*

For templating
Represents a variable for templating for the data-on-mousedown event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mousedown](client_internal_text_serializer_base.ielementbase.md#mousedown)

Defined in: [client/internal/text/serializer/base.tsx:959](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L959)

___

### mouseenter

• `Optional` **mouseenter**: *string*

For templating
Represents a variable for templating for the data-on-mouseenter event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseenter](client_internal_text_serializer_base.ielementbase.md#mouseenter)

Defined in: [client/internal/text/serializer/base.tsx:964](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L964)

___

### mouseleave

• `Optional` **mouseleave**: *string*

For templating
Represents a variable for templating for the data-on-mouseleave event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseleave](client_internal_text_serializer_base.ielementbase.md#mouseleave)

Defined in: [client/internal/text/serializer/base.tsx:969](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L969)

___

### mousemove

• `Optional` **mousemove**: *string*

For templating
Represents a variable for templating for the data-on-mousemove event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mousemove](client_internal_text_serializer_base.ielementbase.md#mousemove)

Defined in: [client/internal/text/serializer/base.tsx:974](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L974)

___

### mouseout

• `Optional` **mouseout**: *string*

For templating
Represents a variable for templating for the data-on-mouseup event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseout](client_internal_text_serializer_base.ielementbase.md#mouseout)

Defined in: [client/internal/text/serializer/base.tsx:984](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L984)

___

### mouseover

• `Optional` **mouseover**: *string*

For templating
Represents a variable for templating for the data-on-mouseover event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseover](client_internal_text_serializer_base.ielementbase.md#mouseover)

Defined in: [client/internal/text/serializer/base.tsx:979](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L979)

___

### mouseup

• `Optional` **mouseup**: *string*

For templating
Represents a variable for templating for the data-on-mouseup event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseup](client_internal_text_serializer_base.ielementbase.md#mouseup)

Defined in: [client/internal/text/serializer/base.tsx:989](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L989)

___

### mousewheel

• `Optional` **mousewheel**: *string*

For templating
Represents a variable for templating for the data-on-mousewheel event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mousewheel](client_internal_text_serializer_base.ielementbase.md#mousewheel)

Defined in: [client/internal/text/serializer/base.tsx:994](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L994)

___

### richClassList

• `Optional` **richClassList**: *string*[]

The classes that this element has applied
these classes represent the extra classes and not the base
classes that are applied for the given type, so it's primarily
the rich-text-- classes types

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[richClassList](client_internal_text_serializer_base.ielementbase.md#richclasslist)

Defined in: [client/internal/text/serializer/base.tsx:876](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L876)

___

### sizes

• **sizes**: *string*

sizes of the image

Defined in: [client/internal/text/serializer/types/image.tsx:331](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L331)

___

### src

• **src**: *string*

url of the image
src this is a property that is removed

Defined in: [client/internal/text/serializer/types/image.tsx:322](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L322)

___

### srcId

• **srcId**: *string*

src id of the image
data-src-id

Defined in: [client/internal/text/serializer/types/image.tsx:336](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L336)

___

### srcSet

• **srcSet**: *string*

srcset of the image
srcset is a property that is removed

Defined in: [client/internal/text/serializer/types/image.tsx:327](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L327)

___

### standalone

• **standalone**: *boolean*

whether the image should be a standalone image or be a full
text-specs compliant image

Defined in: [client/internal/text/serializer/types/image.tsx:345](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L345)

___

### style

• `Optional` **style**: *string*

This is the standard style that translates to the style tag
following the text specifications only some properties are allowed
within it

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[style](client_internal_text_serializer_base.ielementbase.md#style)

Defined in: [client/internal/text/serializer/base.tsx:859](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L859)

___

### styleActive

• `Optional` **styleActive**: *string*

Same as the style tag with the same rules but represents data-style-active
and it's the style for when the item is in an active state

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[styleActive](client_internal_text_serializer_base.ielementbase.md#styleactive)

Defined in: [client/internal/text/serializer/base.tsx:869](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L869)

___

### styleHover

• `Optional` **styleHover**: *string*

This is similar to the style tag but represents the style tag as it
is applied during a hover event, represents data-style-hover

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[styleHover](client_internal_text_serializer_base.ielementbase.md#stylehover)

Defined in: [client/internal/text/serializer/base.tsx:864](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L864)

___

### textContent

• `Optional` **textContent**: *string*

For templating
Represents replacement for textual content
of the given element

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[textContent](client_internal_text_serializer_base.ielementbase.md#textcontent)

Defined in: [client/internal/text/serializer/base.tsx:895](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L895)

___

### touchcancel

• `Optional` **touchcancel**: *string*

For templating
Represents a variable for templating for the data-on-touchcancel event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[touchcancel](client_internal_text_serializer_base.ielementbase.md#touchcancel)

Defined in: [client/internal/text/serializer/base.tsx:1014](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L1014)

___

### touchend

• `Optional` **touchend**: *string*

For templating
Represents a variable for templating for the data-on-touchend event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[touchend](client_internal_text_serializer_base.ielementbase.md#touchend)

Defined in: [client/internal/text/serializer/base.tsx:1009](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L1009)

___

### touchmove

• `Optional` **touchmove**: *string*

For templating
Represents a variable for templating for the data-on-touchmove event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[touchmove](client_internal_text_serializer_base.ielementbase.md#touchmove)

Defined in: [client/internal/text/serializer/base.tsx:1004](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L1004)

___

### touchstart

• `Optional` **touchstart**: *string*

For templating
Represents a variable for templating for the data-on-touchstart event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[touchstart](client_internal_text_serializer_base.ielementbase.md#touchstart)

Defined in: [client/internal/text/serializer/base.tsx:999](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L999)

___

### type

• **type**: *image*

Image type

Defined in: [client/internal/text/serializer/types/image.tsx:303](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L303)

___

### uiHandler

• `Optional` **uiHandler**: *string*

For templating
Represents a chosen ui handler and it applies to the property
data-ui-handler

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[uiHandler](client_internal_text_serializer_base.ielementbase.md#uihandler)

Defined in: [client/internal/text/serializer/base.tsx:901](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L901)

___

### uiHandlerArgs

• `Optional` **uiHandlerArgs**: *object*

Arguments for the ui handler

#### Type declaration:

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[uiHandlerArgs](client_internal_text_serializer_base.ielementbase.md#uihandlerargs)

Defined in: [client/internal/text/serializer/base.tsx:905](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L905)

___

### wheel

• `Optional` **wheel**: *string*

For templating
Represents a variable for templating for the data-on-wheel event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[wheel](client_internal_text_serializer_base.ielementbase.md#wheel)

Defined in: [client/internal/text/serializer/base.tsx:1019](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/base.tsx#L1019)

___

### width

• **width**: *number*

Width of the image in pixels
data-src-width

Defined in: [client/internal/text/serializer/types/image.tsx:312](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/text/serializer/types/image.tsx#L312)
