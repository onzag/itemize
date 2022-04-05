[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/text

# Module: client/internal/text

## Table of contents

### Interfaces

- [IFeatureSupportOptions](../interfaces/client_internal_text.IFeatureSupportOptions.md)

### Variables

- [ALLOWED\_CLASSES](client_internal_text.md#allowed_classes)
- [ALLOWED\_CLASSES\_PREFIXES](client_internal_text.md#allowed_classes_prefixes)
- [CONTAINER\_CLASS](client_internal_text.md#container_class)
- [CONTAINER\_CLASS\_PREFIX](client_internal_text.md#container_class_prefix)
- [CUSTOM\_CLASS\_PREFIX](client_internal_text.md#custom_class_prefix)
- [RICH\_TEXT\_CLASS\_PREFIX](client_internal_text.md#rich_text_class_prefix)
- [SANITIZE\_CONFIG](client_internal_text.md#sanitize_config)
- [SUPPORTED\_CONTENT\_MODIFIERS](client_internal_text.md#supported_content_modifiers)
- [SUPPORTED\_HANDLERS](client_internal_text.md#supported_handlers)
- [SUPPORTED\_TEMPLATE\_EVENTS](client_internal_text.md#supported_template_events)
- [SUPPORTED\_TEMPLATE\_STYLES](client_internal_text.md#supported_template_styles)
- [nodesThatRepresentLines](client_internal_text.md#nodesthatrepresentlines)

### Functions

- [checkEquality](client_internal_text.md#checkequality)
- [checkEqualityPlain](client_internal_text.md#checkequalityplain)
- [convertNodeToText](client_internal_text.md#convertnodetotext)
- [countSize](client_internal_text.md#countsize)
- [countSizeAndWords](client_internal_text.md#countsizeandwords)
- [countWords](client_internal_text.md#countwords)
- [deserialize](client_internal_text.md#deserialize)
- [postprocess](client_internal_text.md#postprocess)
- [renderTemplate](client_internal_text.md#rendertemplate)
- [renderTemplateAsNode](client_internal_text.md#rendertemplateasnode)
- [renderTemplateDynamically](client_internal_text.md#rendertemplatedynamically)
- [sanitize](client_internal_text.md#sanitize)
- [serialize](client_internal_text.md#serialize)
- [serializeString](client_internal_text.md#serializestring)

## Variables

### ALLOWED\_CLASSES

• **ALLOWED\_CLASSES**: `string`[]

The list of allowed classes for text as defined by the text-specs
this will prevent users from class injection

#### Defined in

[client/internal/text/index.tsx:31](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L31)

___

### ALLOWED\_CLASSES\_PREFIXES

• **ALLOWED\_CLASSES\_PREFIXES**: `string`[]

The list of allowed prefixes

#### Defined in

[client/internal/text/index.tsx:45](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L45)

___

### CONTAINER\_CLASS

• **CONTAINER\_CLASS**: ``"container"``

#### Defined in

[client/internal/text/index.tsx:38](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L38)

___

### CONTAINER\_CLASS\_PREFIX

• **CONTAINER\_CLASS\_PREFIX**: `string`

#### Defined in

[client/internal/text/index.tsx:39](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L39)

___

### CUSTOM\_CLASS\_PREFIX

• **CUSTOM\_CLASS\_PREFIX**: ``"custom-"``

#### Defined in

[client/internal/text/index.tsx:40](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L40)

___

### RICH\_TEXT\_CLASS\_PREFIX

• **RICH\_TEXT\_CLASS\_PREFIX**: ``"rich-text--"``

#### Defined in

[client/internal/text/index.tsx:37](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L37)

___

### SANITIZE\_CONFIG

• **SANITIZE\_CONFIG**: `Object`

Sanitazation standard configuraton

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ADD_ATTR` | `string`[] |
| `ADD_TAGS` | `string`[] |
| `ALLOW_UNKNOWN_PROTOCOLS` | `boolean` |

#### Defined in

[client/internal/text/index.tsx:18](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L18)

___

### SUPPORTED\_CONTENT\_MODIFIERS

• **SUPPORTED\_CONTENT\_MODIFIERS**: `string`[]

Modify the content of the children based on
the template args

#### Defined in

[client/internal/text/index.tsx:89](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L89)

___

### SUPPORTED\_HANDLERS

• **SUPPORTED\_HANDLERS**: `string`[]

Custom handlers to modify the information within the system
use args

#### Defined in

[client/internal/text/index.tsx:98](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L98)

___

### SUPPORTED\_TEMPLATE\_EVENTS

• **SUPPORTED\_TEMPLATE\_EVENTS**: `string`[]

Template events that are supported these
exist as data-on-[event]="{{event}}"

#### Defined in

[client/internal/text/index.tsx:53](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L53)

___

### SUPPORTED\_TEMPLATE\_STYLES

• **SUPPORTED\_TEMPLATE\_STYLES**: `string`[]

Styles that might pop in when using templates
exist as data-[supportedTemplateStyle]-style="position:absolute;"

#### Defined in

[client/internal/text/index.tsx:80](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L80)

___

### nodesThatRepresentLines

• **nodesThatRepresentLines**: `string`[]

#### Defined in

[client/internal/text/index.tsx:911](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L911)

## Functions

### checkEquality

▸ **checkEquality**(`text1`, `text2`): `boolean`

compares two text for equivalence

#### Parameters

| Name | Type |
| :------ | :------ |
| `text1` | `string` \| `Node`[] |
| `text2` | `string` \| `Node`[] |

#### Returns

`boolean`

#### Defined in

[client/internal/text/index.tsx:886](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L886)

___

### checkEqualityPlain

▸ **checkEqualityPlain**(`text1`, `text2`): `boolean`

compares two plain text for equivalence

#### Parameters

| Name | Type |
| :------ | :------ |
| `text1` | `string` |
| `text2` | `string` |

#### Returns

`boolean`

#### Defined in

[client/internal/text/index.tsx:906](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L906)

___

### convertNodeToText

▸ **convertNodeToText**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`string`

#### Defined in

[client/internal/text/index.tsx:937](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L937)

___

### countSize

▸ **countSize**(`root`): `number`

Counts the size of the document

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`number`

#### Defined in

[client/internal/text/index.tsx:528](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L528)

___

### countSizeAndWords

▸ **countSizeAndWords**(`root`): [`number`, `number`]

Counts the size and words of the document

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

[`number`, `number`]

#### Defined in

[client/internal/text/index.tsx:564](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L564)

___

### countWords

▸ **countWords**(`root`): `number`

Counts the words of the document

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`number`

#### Defined in

[client/internal/text/index.tsx:546](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L546)

___

### deserialize

▸ **deserialize**(`html`): [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

Deserializes an HTML string or DOM element that should have been previously
sanitized into an internally used document itemize structure that can be used
for analysis or constructing rich text editors

Please ensure to have sanitized the content and
postprocessing it before deserializing it if you
don't trust it but also to setup urls for
the given content

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` \| `Node`[] |

#### Returns

[`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

#### Defined in

[client/internal/text/index.tsx:593](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L593)

___

### postprocess

▸ **postprocess**(`context`, `options`, `node`): `HTMLElement`

The postprocessing hook that cleans and sets the attributes
right for the rich text in order to follow the standards
given by the text-specs.md file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `IPostProcessingContext` | - |
| `options` | [`IFeatureSupportOptions`](../interfaces/client_internal_text.IFeatureSupportOptions.md) | - |
| `node` | `HTMLElement` | the given node in question we are currently processing, this is a recursive function after all |

#### Returns

`HTMLElement`

a node

#### Defined in

[client/internal/text/index.tsx:276](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L276)

___

### renderTemplate

▸ **renderTemplate**(`template`, `args`): `string`

Performs a simple template rendering
from a string based HTML template based on the text specs

Note that this method does not support UI Handlers
it is used for producing a string by doing a simple pass
on a template

It also does not support dynamic styles

If you want the template to render nicely you might want
to run it before over the sanitize function

eg. renderTemplate(sanitize(...), {...args})

for proper templates with full blown functionality you should
use the renderTemplateDynamically method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `string` | the template in question |
| `args` | `any` | the arguments |

#### Returns

`string`

#### Defined in

[client/internal/text/index.tsx:804](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L804)

___

### renderTemplateAsNode

▸ **renderTemplateAsNode**(`template`, `args`): `HTMLDivElement`

Same as render template but will provide
the div as a raw HTML result

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `string` | the template in question |
| `args` | `any` | the arguments |

#### Returns

`HTMLDivElement`

#### Defined in

[client/internal/text/index.tsx:766](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L766)

___

### renderTemplateDynamically

▸ **renderTemplateDynamically**(`document`, `args`, `options`): `ReactNode`

Compiles the template but it does as a react element in which
way it supports the whole range of the componentry, including
dynamic styles and UI handling

The property should be a template for this to be usable

eg. renderTemplateDynamically(deserialize(sanitize(...)), {...args})

note how this method differs from the renderTemplate method as it
takes a document instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) | the root level document |
| `args` | [`TemplateArgs`](../classes/client_internal_text_serializer_template_args.TemplateArgs.md) | the arguments to render the template with |
| `options` | [`IReactifyExtraOptions`](../interfaces/client_internal_text_serializer.IReactifyExtraOptions.md) | - |

#### Returns

`ReactNode`

#### Defined in

[client/internal/text/index.tsx:826](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L826)

___

### sanitize

▸ **sanitize**(`context`, `options`, `value`): `string`

sanitizes and postprocesses a given
value for an item definition property
in a way that it makes it directly usable and can
then be passed to the serializer or displayed as it is

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `IPostProcessingContext` |
| `options` | [`IFeatureSupportOptions`](../interfaces/client_internal_text.IFeatureSupportOptions.md) |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[client/internal/text/index.tsx:251](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L251)

___

### serialize

▸ **serialize**(`root`): `string` \| `HTMLElement`[]

Serializes an internal itemize structure back into
HTML

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`string` \| `HTMLElement`[]

#### Defined in

[client/internal/text/index.tsx:507](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L507)

___

### serializeString

▸ **serializeString**(`root`): `string`

Serializes but returns the string representation
rather than a bunch of nodes

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`string`

#### Defined in

[client/internal/text/index.tsx:516](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L516)
