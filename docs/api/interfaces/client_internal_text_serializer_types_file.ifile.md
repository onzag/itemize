[](../README.md) / [Exports](../modules.md) / [client/internal/text/serializer/types/file](../modules/client_internal_text_serializer_types_file.md) / IFile

# Interface: IFile

[client/internal/text/serializer/types/file](../modules/client_internal_text_serializer_types_file.md).IFile

Represents a file type

## Hierarchy

* [*IElementBase*](client_internal_text_serializer_base.ielementbase.md)

  ↳ **IFile**

## Table of contents

### Properties

- [blur](client_internal_text_serializer_types_file.ifile.md#blur)
- [children](client_internal_text_serializer_types_file.ifile.md#children)
- [click](client_internal_text_serializer_types_file.ifile.md#click)
- [containment](client_internal_text_serializer_types_file.ifile.md#containment)
- [context](client_internal_text_serializer_types_file.ifile.md#context)
- [extension](client_internal_text_serializer_types_file.ifile.md#extension)
- [fileName](client_internal_text_serializer_types_file.ifile.md#filename)
- [focus](client_internal_text_serializer_types_file.ifile.md#focus)
- [forEach](client_internal_text_serializer_types_file.ifile.md#foreach)
- [givenName](client_internal_text_serializer_types_file.ifile.md#givenname)
- [html](client_internal_text_serializer_types_file.ifile.md#html)
- [ifCondition](client_internal_text_serializer_types_file.ifile.md#ifcondition)
- [input](client_internal_text_serializer_types_file.ifile.md#input)
- [keydown](client_internal_text_serializer_types_file.ifile.md#keydown)
- [keypress](client_internal_text_serializer_types_file.ifile.md#keypress)
- [keyup](client_internal_text_serializer_types_file.ifile.md#keyup)
- [mousedown](client_internal_text_serializer_types_file.ifile.md#mousedown)
- [mouseenter](client_internal_text_serializer_types_file.ifile.md#mouseenter)
- [mouseleave](client_internal_text_serializer_types_file.ifile.md#mouseleave)
- [mousemove](client_internal_text_serializer_types_file.ifile.md#mousemove)
- [mouseout](client_internal_text_serializer_types_file.ifile.md#mouseout)
- [mouseover](client_internal_text_serializer_types_file.ifile.md#mouseover)
- [mouseup](client_internal_text_serializer_types_file.ifile.md#mouseup)
- [mousewheel](client_internal_text_serializer_types_file.ifile.md#mousewheel)
- [richClassList](client_internal_text_serializer_types_file.ifile.md#richclasslist)
- [size](client_internal_text_serializer_types_file.ifile.md#size)
- [src](client_internal_text_serializer_types_file.ifile.md#src)
- [srcId](client_internal_text_serializer_types_file.ifile.md#srcid)
- [style](client_internal_text_serializer_types_file.ifile.md#style)
- [styleActive](client_internal_text_serializer_types_file.ifile.md#styleactive)
- [styleHover](client_internal_text_serializer_types_file.ifile.md#stylehover)
- [textContent](client_internal_text_serializer_types_file.ifile.md#textcontent)
- [touchcancel](client_internal_text_serializer_types_file.ifile.md#touchcancel)
- [touchend](client_internal_text_serializer_types_file.ifile.md#touchend)
- [touchmove](client_internal_text_serializer_types_file.ifile.md#touchmove)
- [touchstart](client_internal_text_serializer_types_file.ifile.md#touchstart)
- [type](client_internal_text_serializer_types_file.ifile.md#type)
- [uiHandler](client_internal_text_serializer_types_file.ifile.md#uihandler)
- [uiHandlerArgs](client_internal_text_serializer_types_file.ifile.md#uihandlerargs)
- [wheel](client_internal_text_serializer_types_file.ifile.md#wheel)

## Properties

### blur

• `Optional` **blur**: *string*

For templating
Represents a variable for templating for the data-on-blur event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[blur](client_internal_text_serializer_base.ielementbase.md#blur)

Defined in: [client/internal/text/serializer/base.tsx:929](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L929)

___

### children

• **children**: [[*IText*](client_internal_text_serializer_types_text.itext.md)]

The children of the image is a text node
as defined by the specifications of slate
even when nothing is writable there

Defined in: [client/internal/text/serializer/types/file.tsx:185](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/types/file.tsx#L185)

___

### click

• `Optional` **click**: *string*

For templating
Represents a variable for templating for the data-on-click event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[click](client_internal_text_serializer_base.ielementbase.md#click)

Defined in: [client/internal/text/serializer/base.tsx:924](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L924)

___

### containment

• **containment**: *void-inline*

cannot contain anything

Defined in: [client/internal/text/serializer/types/file.tsx:158](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/types/file.tsx#L158)

___

### context

• `Optional` **context**: *string*

for templating
Represents a chosen context and it applies to the property
data-context

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[context](client_internal_text_serializer_base.ielementbase.md#context)

Defined in: [client/internal/text/serializer/base.tsx:913](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L913)

___

### extension

• **extension**: *string*

file extension

Defined in: [client/internal/text/serializer/types/file.tsx:170](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/types/file.tsx#L170)

___

### fileName

• **fileName**: *string*

file name

Defined in: [client/internal/text/serializer/types/file.tsx:162](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/types/file.tsx#L162)

___

### focus

• `Optional` **focus**: *string*

For templating
Represents a variable for templating for the data-on-focus event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[focus](client_internal_text_serializer_base.ielementbase.md#focus)

Defined in: [client/internal/text/serializer/base.tsx:934](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L934)

___

### forEach

• `Optional` **forEach**: *string*

for templating
Represents the chosen each context and it applies to the property
data-for-each

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[forEach](client_internal_text_serializer_base.ielementbase.md#foreach)

Defined in: [client/internal/text/serializer/base.tsx:919](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L919)

___

### givenName

• `Optional` **givenName**: *string*

An optional name, just used to be displayed in the tree

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[givenName](client_internal_text_serializer_base.ielementbase.md#givenname)

Defined in: [client/internal/text/serializer/base.tsx:853](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L853)

___

### html

• `Optional` **html**: *string*

For templating
Represents replacement html content for the inner HTML
of the given element

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[html](client_internal_text_serializer_base.ielementbase.md#html)

Defined in: [client/internal/text/serializer/base.tsx:889](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L889)

___

### ifCondition

• `Optional` **ifCondition**: *string*

For templating
and if condition for conditional rendering

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[ifCondition](client_internal_text_serializer_base.ielementbase.md#ifcondition)

Defined in: [client/internal/text/serializer/base.tsx:883](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L883)

___

### input

• `Optional` **input**: *string*

For templating
Represents a variable for templating for the data-on-input event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[input](client_internal_text_serializer_base.ielementbase.md#input)

Defined in: [client/internal/text/serializer/base.tsx:939](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L939)

___

### keydown

• `Optional` **keydown**: *string*

For templating
Represents a variable for templating for the data-on-keydown event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[keydown](client_internal_text_serializer_base.ielementbase.md#keydown)

Defined in: [client/internal/text/serializer/base.tsx:944](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L944)

___

### keypress

• `Optional` **keypress**: *string*

For templating
Represents a variable for templating for the data-on-keypress event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[keypress](client_internal_text_serializer_base.ielementbase.md#keypress)

Defined in: [client/internal/text/serializer/base.tsx:949](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L949)

___

### keyup

• `Optional` **keyup**: *string*

For templating
Represents a variable for templating for the data-on-keyup event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[keyup](client_internal_text_serializer_base.ielementbase.md#keyup)

Defined in: [client/internal/text/serializer/base.tsx:954](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L954)

___

### mousedown

• `Optional` **mousedown**: *string*

For templating
Represents a variable for templating for the data-on-mousedown event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mousedown](client_internal_text_serializer_base.ielementbase.md#mousedown)

Defined in: [client/internal/text/serializer/base.tsx:959](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L959)

___

### mouseenter

• `Optional` **mouseenter**: *string*

For templating
Represents a variable for templating for the data-on-mouseenter event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseenter](client_internal_text_serializer_base.ielementbase.md#mouseenter)

Defined in: [client/internal/text/serializer/base.tsx:964](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L964)

___

### mouseleave

• `Optional` **mouseleave**: *string*

For templating
Represents a variable for templating for the data-on-mouseleave event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseleave](client_internal_text_serializer_base.ielementbase.md#mouseleave)

Defined in: [client/internal/text/serializer/base.tsx:969](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L969)

___

### mousemove

• `Optional` **mousemove**: *string*

For templating
Represents a variable for templating for the data-on-mousemove event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mousemove](client_internal_text_serializer_base.ielementbase.md#mousemove)

Defined in: [client/internal/text/serializer/base.tsx:974](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L974)

___

### mouseout

• `Optional` **mouseout**: *string*

For templating
Represents a variable for templating for the data-on-mouseup event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseout](client_internal_text_serializer_base.ielementbase.md#mouseout)

Defined in: [client/internal/text/serializer/base.tsx:984](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L984)

___

### mouseover

• `Optional` **mouseover**: *string*

For templating
Represents a variable for templating for the data-on-mouseover event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseover](client_internal_text_serializer_base.ielementbase.md#mouseover)

Defined in: [client/internal/text/serializer/base.tsx:979](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L979)

___

### mouseup

• `Optional` **mouseup**: *string*

For templating
Represents a variable for templating for the data-on-mouseup event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mouseup](client_internal_text_serializer_base.ielementbase.md#mouseup)

Defined in: [client/internal/text/serializer/base.tsx:989](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L989)

___

### mousewheel

• `Optional` **mousewheel**: *string*

For templating
Represents a variable for templating for the data-on-mousewheel event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[mousewheel](client_internal_text_serializer_base.ielementbase.md#mousewheel)

Defined in: [client/internal/text/serializer/base.tsx:994](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L994)

___

### richClassList

• `Optional` **richClassList**: *string*[]

The classes that this element has applied
these classes represent the extra classes and not the base
classes that are applied for the given type, so it's primarily
the rich-text-- classes types

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[richClassList](client_internal_text_serializer_base.ielementbase.md#richclasslist)

Defined in: [client/internal/text/serializer/base.tsx:876](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L876)

___

### size

• **size**: *string*

file size

Defined in: [client/internal/text/serializer/types/file.tsx:166](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/types/file.tsx#L166)

___

### src

• **src**: *string*

url of the file

Defined in: [client/internal/text/serializer/types/file.tsx:174](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/types/file.tsx#L174)

___

### srcId

• **srcId**: *string*

src id of the file
data-src-id

Defined in: [client/internal/text/serializer/types/file.tsx:179](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/types/file.tsx#L179)

___

### style

• `Optional` **style**: *string*

This is the standard style that translates to the style tag
following the text specifications only some properties are allowed
within it

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[style](client_internal_text_serializer_base.ielementbase.md#style)

Defined in: [client/internal/text/serializer/base.tsx:859](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L859)

___

### styleActive

• `Optional` **styleActive**: *string*

Same as the style tag with the same rules but represents data-style-active
and it's the style for when the item is in an active state

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[styleActive](client_internal_text_serializer_base.ielementbase.md#styleactive)

Defined in: [client/internal/text/serializer/base.tsx:869](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L869)

___

### styleHover

• `Optional` **styleHover**: *string*

This is similar to the style tag but represents the style tag as it
is applied during a hover event, represents data-style-hover

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[styleHover](client_internal_text_serializer_base.ielementbase.md#stylehover)

Defined in: [client/internal/text/serializer/base.tsx:864](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L864)

___

### textContent

• `Optional` **textContent**: *string*

For templating
Represents replacement for textual content
of the given element

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[textContent](client_internal_text_serializer_base.ielementbase.md#textcontent)

Defined in: [client/internal/text/serializer/base.tsx:895](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L895)

___

### touchcancel

• `Optional` **touchcancel**: *string*

For templating
Represents a variable for templating for the data-on-touchcancel event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[touchcancel](client_internal_text_serializer_base.ielementbase.md#touchcancel)

Defined in: [client/internal/text/serializer/base.tsx:1014](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L1014)

___

### touchend

• `Optional` **touchend**: *string*

For templating
Represents a variable for templating for the data-on-touchend event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[touchend](client_internal_text_serializer_base.ielementbase.md#touchend)

Defined in: [client/internal/text/serializer/base.tsx:1009](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L1009)

___

### touchmove

• `Optional` **touchmove**: *string*

For templating
Represents a variable for templating for the data-on-touchmove event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[touchmove](client_internal_text_serializer_base.ielementbase.md#touchmove)

Defined in: [client/internal/text/serializer/base.tsx:1004](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L1004)

___

### touchstart

• `Optional` **touchstart**: *string*

For templating
Represents a variable for templating for the data-on-touchstart event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[touchstart](client_internal_text_serializer_base.ielementbase.md#touchstart)

Defined in: [client/internal/text/serializer/base.tsx:999](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L999)

___

### type

• **type**: *file*

The type

Defined in: [client/internal/text/serializer/types/file.tsx:154](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/types/file.tsx#L154)

___

### uiHandler

• `Optional` **uiHandler**: *string*

For templating
Represents a chosen ui handler and it applies to the property
data-ui-handler

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[uiHandler](client_internal_text_serializer_base.ielementbase.md#uihandler)

Defined in: [client/internal/text/serializer/base.tsx:901](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L901)

___

### uiHandlerArgs

• `Optional` **uiHandlerArgs**: *object*

Arguments for the ui handler

#### Type declaration:

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[uiHandlerArgs](client_internal_text_serializer_base.ielementbase.md#uihandlerargs)

Defined in: [client/internal/text/serializer/base.tsx:905](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L905)

___

### wheel

• `Optional` **wheel**: *string*

For templating
Represents a variable for templating for the data-on-wheel event

Inherited from: [IElementBase](client_internal_text_serializer_base.ielementbase.md).[wheel](client_internal_text_serializer_base.ielementbase.md#wheel)

Defined in: [client/internal/text/serializer/base.tsx:1019](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L1019)
