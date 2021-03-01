[](../README.md) / [Exports](../modules.md) / [client/internal/text/serializer](../modules/client_internal_text_serializer.md) / IReactifyArg

# Interface: IReactifyArg<T\>

[client/internal/text/serializer](../modules/client_internal_text_serializer.md).IReactifyArg

The argument that is passed to the reactify function that allows to convert
a given deserialized rich element and document into a react element

## Type parameters

Name |
:------ |
`T` |

## Table of contents

### Properties

- [active](client_internal_text_serializer.ireactifyarg.md#active)
- [asTemplate](client_internal_text_serializer.ireactifyarg.md#astemplate)
- [customProps](client_internal_text_serializer.ireactifyarg.md#customprops)
- [element](client_internal_text_serializer.ireactifyarg.md#element)
- [key](client_internal_text_serializer.ireactifyarg.md#key)
- [selected](client_internal_text_serializer.ireactifyarg.md#selected)
- [templateArgs](client_internal_text_serializer.ireactifyarg.md#templateargs)
- [templateIgnoreContextualChanges](client_internal_text_serializer.ireactifyarg.md#templateignorecontextualchanges)
- [templateRootArgs](client_internal_text_serializer.ireactifyarg.md#templaterootargs)

## Properties

### active

• **active**: *boolean*

Whether the element is considered active, it's usually false when the element
is being edited, so it is inactive, being edited, and active when it's visible for
usage

Defined in: [client/internal/text/serializer/index.ts:56](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L56)

___

### asTemplate

• `Optional` **asTemplate**: *boolean*

Render the element as a template, rather than as a simple single level component

Defined in: [client/internal/text/serializer/index.ts:71](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L71)

___

### customProps

• `Optional` **customProps**: *DetailedHTMLProps*<HTMLAttributes<HTMLElement\>, HTMLElement\>

Give the element custom properties, these properties will override the way the element
is bound, you can pass children via these props

Defined in: [client/internal/text/serializer/index.ts:67](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L67)

___

### element

• **element**: T

This is the element that must be converted

Defined in: [client/internal/text/serializer/index.ts:50](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L50)

___

### key

• `Optional` **key**: *string* \| *number*

A key to use in the react component

Defined in: [client/internal/text/serializer/index.ts:90](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L90)

___

### selected

• **selected**: *boolean*

Whether the element is considered selected, it should only really be true if active
is false, as it's in edit mode and can be selected, it adds the selected class
to the reactification

Defined in: [client/internal/text/serializer/index.ts:62](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L62)

___

### templateArgs

• `Optional` **templateArgs**: [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md)

The template arguments to be used that represent the current context

Defined in: [client/internal/text/serializer/index.ts:75](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L75)

___

### templateIgnoreContextualChanges

• `Optional` **templateIgnoreContextualChanges**: *boolean*

Ignore contextual changes that change the template arg, these are forEach and context
attributes of a base context

Defined in: [client/internal/text/serializer/index.ts:86](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L86)

___

### templateRootArgs

• `Optional` **templateRootArgs**: [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md)

These represent the root args, you can leave it unpassed if you passed template args
as they are equivalent, however the root level can be used to extract ui handler logic
as such they are overwritten when matching  the tree

Defined in: [client/internal/text/serializer/index.ts:81](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/text/serializer/index.ts#L81)
