[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ITemplateArg

# Interface: ITemplateArg

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ITemplateArg

The template argument is used in a template context in order
to specify the existant arguments that are going to be used during
a template construction of a rich text when such is meant to be rendered
as a template, put the example of a rich text that is expected to be a template where
a score and a name exist, so we have two properties that will be used, name and score
as

{name: "kitten", score: "3"}

Each property to be used will be defined as an argument as

{
  type: "text",
  label: "name",
}

we do not know the values of these only at render time, but then we know
these are available arguments

## Table of contents

### Properties

- [handler](client_fast_prototyping_components_slate.ITemplateArg.md#handler)
- [handlerEscapeOnSuperBreaks](client_fast_prototyping_components_slate.ITemplateArg.md#handlerescapeonsuperbreaks)
- [handlerExtraArgs](client_fast_prototyping_components_slate.ITemplateArg.md#handlerextraargs)
- [handlerIsVoid](client_fast_prototyping_components_slate.ITemplateArg.md#handlerisvoid)
- [handlerKeepOnBreaks](client_fast_prototyping_components_slate.ITemplateArg.md#handlerkeeponbreaks)
- [handlerPassSlateInfo](client_fast_prototyping_components_slate.ITemplateArg.md#handlerpassslateinfo)
- [htmlDisplay](client_fast_prototyping_components_slate.ITemplateArg.md#htmldisplay)
- [label](client_fast_prototyping_components_slate.ITemplateArg.md#label)
- [nonRootInheritable](client_fast_prototyping_components_slate.ITemplateArg.md#nonrootinheritable)
- [textDisplay](client_fast_prototyping_components_slate.ITemplateArg.md#textdisplay)
- [type](client_fast_prototyping_components_slate.ITemplateArg.md#type)

## Properties

### handler

• `Optional` **handler**: `ComponentType`<[`ISlateTemplateUIHandlerProps`](client_fast_prototyping_components_slate.ISlateTemplateUIHandlerProps.md)\>

A handler component to use during the edition of a component
that matches this ui handler signature

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:146](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L146)

___

### handlerEscapeOnSuperBreaks

• `Optional` **handlerEscapeOnSuperBreaks**: `boolean`

when super breaking in the ui handler this ui handler will also
be escaped alongside it and as such no new element
will be created in it

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:178](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L178)

___

### handlerExtraArgs

• `Optional` **handlerExtraArgs**: `any`

Extra arguments to pass to the handler component itself
every instance of this given handler will be passed the same
extra argument, it can be used to specify that the handler
is being used in edit mode and as such render differently
and have different functionality

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:154](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L154)

___

### handlerIsVoid

• `Optional` **handlerIsVoid**: `boolean`

Makes the ui handler in question be void so it doesn't
have children and it's managed all within itself

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:166](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L166)

___

### handlerKeepOnBreaks

• `Optional` **handlerKeepOnBreaks**: `boolean`

When breaking an ui handler on an end of line a new paragraph will
be created ignoring the previous ui handler
use this method to keep and use the split method

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:172](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L172)

___

### handlerPassSlateInfo

• `Optional` **handlerPassSlateInfo**: `boolean`

Pass extra attributes to the props of the handler
for the rich text, these include
"selected" for when the rich text editor is selecting
"helpers" for the rich text helpers

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:161](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L161)

___

### htmlDisplay

• `Optional` **htmlDisplay**: `ReactNode`

an optional html content that can be used to render when it
matches this html signature, when a string is given
it will modify the inner html, otherwise it will be used as
a react component

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:134](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L134)

___

### label

• **label**: `ReactNode`

The label to be used to specify this value, it should be given
in the given language that wants to be shown as, the actual string
value to be used depend on the key that the argument has eg.

{
  type: "context",
  label: "base",
  properties: {
    name: {
      type: "text",
      label: "nombre"
    }
  }
}

where name is the actual value used, and label is a good i18n label

A react node can also be given to pass the i18n component

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:119](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L119)

___

### nonRootInheritable

• `Optional` **nonRootInheritable**: `boolean`

A flag that specifies that when placed in the root the property
should not really be accessible, mainly used for display purposes
TODO implement

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:126](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L126)

___

### textDisplay

• `Optional` **textDisplay**: `string`

An optional text content that can be used to render when it matches
the text content signature

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:140](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L140)

___

### type

• **type**: ``"boolean"`` \| ``"function"`` \| ``"text"`` \| ``"html"`` \| ``"link"`` \| ``"ui-handler"``

The type of the template argument, such are
1. text: basic text type, implies a string value
2. link: a link value, specifies a url
3. html: HTML content to replace the inner html of another component
4. function: a function, to be used within an action
5. ui-handler: a special type that represents an ui handled element, these
can be used to specify custom types with custom functionality, remember to specify
"handler", "handlerExtraArgs" and "handlerPassSlateInfo" to unlock
the ui-handler full potential

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:97](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L97)
