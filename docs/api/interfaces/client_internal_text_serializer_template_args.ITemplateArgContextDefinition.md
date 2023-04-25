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

[client/internal/text/serializer/template-args.ts:196](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L196)

___

### label

• **label**: `string` \| `stringFn`

#### Inherited from

IBaseTemplateArg.label

#### Defined in

[client/internal/text/serializer/template-args.ts:189](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L189)

___

### loopable

• `Optional` **loopable**: `boolean`

#### Defined in

[client/internal/text/serializer/template-args.ts:291](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L291)

___

### nonRootInheritable

• `Optional` **nonRootInheritable**: `boolean`

#### Inherited from

IBaseTemplateArg.nonRootInheritable

#### Defined in

[client/internal/text/serializer/template-args.ts:190](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L190)

___

### properties

• **properties**: `Object`

#### Index signature

▪ [key: `string`]: [`ITemplateArgContextDefinition`](client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md) \| [`ITemplateArgUIHandlerDefinition`](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md) \| [`ITemplateArgTextDefinition`](client_internal_text_serializer_template_args.ITemplateArgTextDefinition.md) \| [`ITemplateArgLinkDefinition`](client_internal_text_serializer_template_args.ITemplateArgLinkDefinition.md) \| [`ITemplateArgHTMLDefinition`](client_internal_text_serializer_template_args.ITemplateArgHTMLDefinition.md) \| [`ITemplateArgFunctionDefinition`](client_internal_text_serializer_template_args.ITemplateArgFunctionDefinition.md) \| [`ITemplateArgBooleanDefinition`](client_internal_text_serializer_template_args.ITemplateArgBooleanDefinition.md)

#### Defined in

[client/internal/text/serializer/template-args.ts:292](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L292)

___

### type

• **type**: ``"context"``

#### Defined in

[client/internal/text/serializer/template-args.ts:290](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L290)
