[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md) / ITemplateArgUIHandlerDefinition

# Interface: ITemplateArgUIHandlerDefinition

[client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md).ITemplateArgUIHandlerDefinition

## Hierarchy

- `IBaseTemplateArg`

  ↳ **`ITemplateArgUIHandlerDefinition`**

## Table of contents

### Properties

- [editorArgs](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#editorargs)
- [editorHandler](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#editorhandler)
- [label](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#label)
- [mustBeOfType](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#mustbeoftype)
- [nonRootInheritable](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#nonrootinheritable)
- [type](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#type)

### Methods

- [allowsChildren](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#allowschildren)
- [allowsParent](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#allowsparent)
- [patchChildren](client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md#patchchildren)

## Properties

### editorArgs

• `Optional` **editorArgs**: `any`

This argument is specific to the editor being used
and defines something arbitrary

#### Inherited from

IBaseTemplateArg.editorArgs

#### Defined in

[client/internal/text/serializer/template-args.ts:196](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L196)

___

### editorHandler

• `Optional` **editorHandler**: `any`

define a handler object that shall be used within the editor
this argument is very specific to the editor being used

#### Defined in

[client/internal/text/serializer/template-args.ts:286](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L286)

___

### label

• **label**: `string` \| `stringFn`

#### Inherited from

IBaseTemplateArg.label

#### Defined in

[client/internal/text/serializer/template-args.ts:189](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L189)

___

### mustBeOfType

• `Optional` **mustBeOfType**: `elementTypes` \| `elementTypes`[]

Will only allow an element of a given ui handler type to be of an specific type
for example, containers can be very useful as ui handler elements
but are not limited to that

#### Defined in

[client/internal/text/serializer/template-args.ts:261](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L261)

___

### nonRootInheritable

• `Optional` **nonRootInheritable**: `boolean`

#### Inherited from

IBaseTemplateArg.nonRootInheritable

#### Defined in

[client/internal/text/serializer/template-args.ts:190](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L190)

___

### type

• **type**: ``"ui-handler"``

#### Defined in

[client/internal/text/serializer/template-args.ts:255](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L255)

## Methods

### allowsChildren

▸ `Optional` **allowsChildren**(`child`, `self`): `boolean`

limits the type of children that can be inside such, for example if you want
to have a container of only paragraphs, or a container of only containers

during normalization this means that elements will be removed if they are not of the
right type, note that the normalization of the "mustBeOfType" applies first, for example
if it must be a "paragraph" then all non-linlines will be removed, but you may not have
such thing

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `self` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/template-args.ts:271](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L271)

___

### allowsParent

▸ `Optional` **allowsParent**(`parent`, `self`): `boolean`

Forces the parent to have an ui handler of this specific type that
applies to this element itself, rather than its

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](client_internal_text_serializer.IRootLevelDocument.md) |
| `self` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |

#### Returns

`boolean`

#### Defined in

[client/internal/text/serializer/template-args.ts:281](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L281)

___

### patchChildren

▸ `Optional` **patchChildren**(`child`, `self`): `Partial`<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\>

If a children is not allowed you may be able to patch it to make it work
return null if not possible

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |
| `self` | [`RichElement`](../modules/client_internal_text_serializer.md#richelement) |

#### Returns

`Partial`<[`RichElement`](../modules/client_internal_text_serializer.md#richelement)\>

#### Defined in

[client/internal/text/serializer/template-args.ts:276](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/template-args.ts#L276)
