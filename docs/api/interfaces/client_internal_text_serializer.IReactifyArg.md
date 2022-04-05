[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer](../modules/client_internal_text_serializer.md) / IReactifyArg

# Interface: IReactifyArg<T\>

[client/internal/text/serializer](../modules/client_internal_text_serializer.md).IReactifyArg

The argument that is passed to the reactify function that allows to convert
a given deserialized rich element and document into a react element

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [active](client_internal_text_serializer.IReactifyArg.md#active)
- [asTemplate](client_internal_text_serializer.IReactifyArg.md#astemplate)
- [customProps](client_internal_text_serializer.IReactifyArg.md#customprops)
- [element](client_internal_text_serializer.IReactifyArg.md#element)
- [extraOptions](client_internal_text_serializer.IReactifyArg.md#extraoptions)
- [key](client_internal_text_serializer.IReactifyArg.md#key)
- [selected](client_internal_text_serializer.IReactifyArg.md#selected)
- [templateArgs](client_internal_text_serializer.IReactifyArg.md#templateargs)
- [templateIgnoreContextualChanges](client_internal_text_serializer.IReactifyArg.md#templateignorecontextualchanges)
- [templateRootArgs](client_internal_text_serializer.IReactifyArg.md#templaterootargs)

## Properties

### active

• **active**: `boolean`

Whether the element is considered active, it's usually false when the element
is being edited, so it is inactive, being edited, and active when it's visible for
usage

#### Defined in

[client/internal/text/serializer/index.ts:59](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L59)

___

### asTemplate

• `Optional` **asTemplate**: `boolean`

Render the element as a template, rather than as a simple single level component

#### Defined in

[client/internal/text/serializer/index.ts:74](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L74)

___

### customProps

• `Optional` **customProps**: `DetailedHTMLProps`<`HTMLAttributes`<`HTMLElement`\>, `HTMLElement`\>

Give the element custom properties, these properties will override the way the element
is bound, you can pass children via these props

#### Defined in

[client/internal/text/serializer/index.ts:70](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L70)

___

### element

• **element**: `T`

This is the element that must be converted

#### Defined in

[client/internal/text/serializer/index.ts:53](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L53)

___

### extraOptions

• `Optional` **extraOptions**: [`IReactifyExtraOptions`](client_internal_text_serializer.IReactifyExtraOptions.md)

Some extra options for utilities

#### Defined in

[client/internal/text/serializer/index.ts:97](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L97)

___

### key

• `Optional` **key**: `string` \| `number`

A key to use in the react component

#### Defined in

[client/internal/text/serializer/index.ts:93](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L93)

___

### selected

• **selected**: `boolean`

Whether the element is considered selected, it should only really be true if active
is false, as it's in edit mode and can be selected, it adds the selected class
to the reactification

#### Defined in

[client/internal/text/serializer/index.ts:65](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L65)

___

### templateArgs

• `Optional` **templateArgs**: [`TemplateArgs`](../classes/client_internal_text_serializer_template_args.TemplateArgs.md)

The template arguments to be used that represent the current context

#### Defined in

[client/internal/text/serializer/index.ts:78](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L78)

___

### templateIgnoreContextualChanges

• `Optional` **templateIgnoreContextualChanges**: `boolean`

Ignore contextual changes that change the template arg, these are forEach and context
attributes of a base context

#### Defined in

[client/internal/text/serializer/index.ts:89](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L89)

___

### templateRootArgs

• `Optional` **templateRootArgs**: [`TemplateArgs`](../classes/client_internal_text_serializer_template_args.TemplateArgs.md)

These represent the root args, you can leave it unpassed if you passed template args
as they are equivalent, however the root level can be used to extract ui handler logic
as such they are overwritten when matching  the tree

#### Defined in

[client/internal/text/serializer/index.ts:84](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/serializer/index.ts#L84)
