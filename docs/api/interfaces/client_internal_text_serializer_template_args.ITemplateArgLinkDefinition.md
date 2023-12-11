[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md) / ITemplateArgLinkDefinition

# Interface: ITemplateArgLinkDefinition

[client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md).ITemplateArgLinkDefinition

## Hierarchy

- `IBaseTemplateArg`

  ↳ **`ITemplateArgLinkDefinition`**

## Table of contents

### Properties

- [editorArgs](client_internal_text_serializer_template_args.ITemplateArgLinkDefinition.md#editorargs)
- [label](client_internal_text_serializer_template_args.ITemplateArgLinkDefinition.md#label)
- [nonRootInheritable](client_internal_text_serializer_template_args.ITemplateArgLinkDefinition.md#nonrootinheritable)
- [type](client_internal_text_serializer_template_args.ITemplateArgLinkDefinition.md#type)

## Properties

### editorArgs

• `Optional` **editorArgs**: `any`

This argument is specific to the editor being used
and defines something arbitrary

#### Inherited from

IBaseTemplateArg.editorArgs

#### Defined in

[client/internal/text/serializer/template-args.ts:196](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L196)

___

### label

• **label**: `string` \| `stringFn`

#### Inherited from

IBaseTemplateArg.label

#### Defined in

[client/internal/text/serializer/template-args.ts:189](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L189)

___

### nonRootInheritable

• `Optional` **nonRootInheritable**: `boolean`

#### Inherited from

IBaseTemplateArg.nonRootInheritable

#### Defined in

[client/internal/text/serializer/template-args.ts:190](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L190)

___

### type

• **type**: ``"link"``

#### Defined in

[client/internal/text/serializer/template-args.ts:212](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L212)
