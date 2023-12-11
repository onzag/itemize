[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md) / ITemplateArgContextDefinition

# Interface: ITemplateArgContextDefinition

[client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md).ITemplateArgContextDefinition

## Hierarchy

- `IBaseTemplateArg`

  ↳ **`ITemplateArgContextDefinition`**

## Table of contents

### Properties

- [editorArgs](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md#editorargs)
- [label](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md#label)
- [loopable](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md#loopable)
- [nonRootInheritable](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md#nonrootinheritable)
- [properties](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md#properties)
- [type](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md#type)

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

### loopable

• `Optional` **loopable**: `boolean`

#### Defined in

[client/internal/text/serializer/template-args.ts:303](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L303)

___

### nonRootInheritable

• `Optional` **nonRootInheritable**: `boolean`

#### Inherited from

IBaseTemplateArg.nonRootInheritable

#### Defined in

[client/internal/text/serializer/template-args.ts:190](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L190)

___

### properties

• **properties**: [`ITemplateProperties`](client_internal_text_serializer_template_args.ITemplateProperties.md)

#### Defined in

[client/internal/text/serializer/template-args.ts:304](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L304)

___

### type

• **type**: ``"context"``

#### Defined in

[client/internal/text/serializer/template-args.ts:302](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L302)
