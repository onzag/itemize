[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md) / ITemplateArgHTMLDefinition

# Interface: ITemplateArgHTMLDefinition

[client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md).ITemplateArgHTMLDefinition

## Hierarchy

- `IBaseTemplateArg`

  ↳ **`ITemplateArgHTMLDefinition`**

## Table of contents

### Properties

- [editorArgs](client_internal_text_serializer_template_args.ITemplateArgHTMLDefinition.md#editorargs)
- [editorDisplay](client_internal_text_serializer_template_args.ITemplateArgHTMLDefinition.md#editordisplay)
- [label](client_internal_text_serializer_template_args.ITemplateArgHTMLDefinition.md#label)
- [nonRootInheritable](client_internal_text_serializer_template_args.ITemplateArgHTMLDefinition.md#nonrootinheritable)
- [type](client_internal_text_serializer_template_args.ITemplateArgHTMLDefinition.md#type)

## Properties

### editorArgs

• `Optional` **editorArgs**: `any`

This argument is specific to the editor being used
and defines something arbitrary

#### Inherited from

IBaseTemplateArg.editorArgs

#### Defined in

[client/internal/text/serializer/template-args.ts:196](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L196)

___

### editorDisplay

• `Optional` **editorDisplay**: `any`

This argument is specific to the editor being used and defines
what should be displayed in that piece of html content

#### Defined in

[client/internal/text/serializer/template-args.ts:222](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L222)

___

### label

• **label**: `string` \| `stringFn`

#### Inherited from

IBaseTemplateArg.label

#### Defined in

[client/internal/text/serializer/template-args.ts:189](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L189)

___

### nonRootInheritable

• `Optional` **nonRootInheritable**: `boolean`

#### Inherited from

IBaseTemplateArg.nonRootInheritable

#### Defined in

[client/internal/text/serializer/template-args.ts:190](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L190)

___

### type

• **type**: ``"html"``

#### Defined in

[client/internal/text/serializer/template-args.ts:216](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L216)
