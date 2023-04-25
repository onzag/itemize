[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryFiles](../modules/client_internal_components_PropertyEntry_PropertyEntryFiles.md) / IPropertyEntryFilesRendererProps

# Interface: IPropertyEntryFilesRendererProps

[client/internal/components/PropertyEntry/PropertyEntryFiles](../modules/client_internal_components_PropertyEntry_PropertyEntryFiles.md).IPropertyEntryFilesRendererProps

This is the entry file renderer props that every renderer for a files type will recieve.
please do not use onChange with the file renderer, as it's odd, use onSetFile instead

You might want to check text-specs.md for consistency on displaying files, but it is not
required to display as text-specs.md specifies

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)\>

  ↳ **`IPropertyEntryFilesRendererProps`**

## Table of contents

### Properties

- [accept](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#accept)
- [args](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#canrestore)
- [currentAppliedValue](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#currentinvalidreason)
- [currentValid](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#currentvalue)
- [currentValueWithInfo](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#currentvaluewithinfo)
- [description](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#disabled)
- [genericActivePlaceholder](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#genericactiveplaceholder)
- [genericDeleteLabel](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#genericdeletelabel)
- [genericSelectLabel](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#genericselectlabel)
- [isExpectingImages](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#isexpectingimages)
- [label](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#label)
- [language](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#language)
- [languageOverride](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#languageoverride)
- [maxFileSize](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#maxfilesize)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#rtl)
- [uniqueId](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#uniqueid)

### Methods

- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#enableuserseterrors)
- [onChange](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#onchange)
- [onPushFile](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#onpushfile)
- [onPushFiles](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#onpushfiles)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md#onrestore)

## Properties

### accept

• **accept**: `string`

The accept string, use it in your input type

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:89](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L89)

___

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:107](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L107)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L79)

___

### currentAppliedValue

• **currentAppliedValue**: [`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:74](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L74)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:102](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L102)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: `string`

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInvalidReason](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinvalidreason)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentValid

• **currentValid**: `boolean`

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValid](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:90](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L90)

___

### currentValue

• **currentValue**: [`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:83](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L83)

___

### currentValueWithInfo

• **currentValueWithInfo**: `PropertyDefinitionSupportedFileTypeWithInfo`[]

The values with information

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:117](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L117)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:69](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L69)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:113](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L113)

___

### genericActivePlaceholder

• **genericActivePlaceholder**: `string`

A placeholder to show when the file field is active, normally
it'll contains something on the drop files here

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:103](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L103)

___

### genericDeleteLabel

• **genericDeleteLabel**: `string`

A label to show for a button or the likes for the file to be
deleted

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:108](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L108)

___

### genericSelectLabel

• **genericSelectLabel**: `string`

A label to show for a button or the likes for the file to be
selected

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:113](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L113)

___

### isExpectingImages

• **isExpectingImages**: `boolean`

Whether we are expecting images and only images, this correlates
to accept

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:98](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L98)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:59](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L59)

___

### language

• **language**: `string`

The current language being used by the client overall in the app

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[language](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#language)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:138](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L138)

___

### languageOverride

• `Optional` **languageOverride**: `string`

An optional language used mainly for the text type to override
own language properties that currently only text supports that

It may be possible for the editor to set its own text language
value if it has its own

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[languageOverride](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#languageoverride)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L147)

___

### maxFileSize

• **maxFileSize**: `number`

The max file size individually

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:93](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L93)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:64](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L64)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/renderer.ts#L15)

___

### uniqueId

• **uniqueId**: `string`

an unique id for this property
with the id and the version they are related to

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[uniqueId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#uniqueid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L53)

## Methods

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:120](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L120)

___

### onChange

▸ **onChange**(`value`, `internalValue`): `void`

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ValueType` |
| `internalValue` | `any` |

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:128](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L128)

___

### onPushFile

▸ **onPushFile**(`file`, `info?`): `void`

Once you have got hold of a file use this function and pass it so
properties can be calculated, do not use onChange, use this function
instead

If the property is image uploader type, or if the file is on itself
an image it will ensure to give it metadata

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |
| `info?` | `IOnSetDataInfo` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:126](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L126)

___

### onPushFiles

▸ **onPushFiles**(`file`, `info?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File`[] |
| `info?` | `IOnSetDataInfo` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFiles.tsx:127](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFiles.tsx#L127)

___

### onRestore

▸ **onRestore**(): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:133](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L133)
