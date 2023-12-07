[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/Fragment](../modules/client_components_util_Fragment.md) / IFragmentProps

# Interface: IFragmentProps

[client/components/util/Fragment](../modules/client_components_util_Fragment.md).IFragmentProps

the props for the item definition loader

## Table of contents

### Properties

- [disabled](client_components_util_Fragment.IFragmentProps.md#disabled)
- [downloadExtraProperties](client_components_util_Fragment.IFragmentProps.md#downloadextraproperties)
- [downloadName](client_components_util_Fragment.IFragmentProps.md#downloadname)
- [editing](client_components_util_Fragment.IFragmentProps.md#editing)
- [entryProps](client_components_util_Fragment.IFragmentProps.md#entryprops)
- [properties](client_components_util_Fragment.IFragmentProps.md#properties)
- [roles](client_components_util_Fragment.IFragmentProps.md#roles)
- [uploadExtraProperties](client_components_util_Fragment.IFragmentProps.md#uploadextraproperties)
- [version](client_components_util_Fragment.IFragmentProps.md#version)
- [viewProps](client_components_util_Fragment.IFragmentProps.md#viewprops)

### Methods

- [children](client_components_util_Fragment.IFragmentProps.md#children)
- [onBeforeSubmit](client_components_util_Fragment.IFragmentProps.md#onbeforesubmit)
- [onBeforeSubmitUnversioned](client_components_util_Fragment.IFragmentProps.md#onbeforesubmitunversioned)
- [onCloseEdit](client_components_util_Fragment.IFragmentProps.md#oncloseedit)
- [onEdit](client_components_util_Fragment.IFragmentProps.md#onedit)
- [onSubmit](client_components_util_Fragment.IFragmentProps.md#onsubmit)
- [onSubmitUnversioned](client_components_util_Fragment.IFragmentProps.md#onsubmitunversioned)

## Properties

### disabled

• `Optional` **disabled**: `boolean`

Whether it is disabled and editing is disabled

#### Defined in

[client/components/util/Fragment.tsx:154](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L154)

___

### downloadExtraProperties

• `Optional` **downloadExtraProperties**: `string`[]

the properties that are extra downloaded when the download
button is pressed

#### Defined in

[client/components/util/Fragment.tsx:131](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L131)

___

### downloadName

• `Optional` **downloadName**: `string`

the name of the file to be downloaded, without the .itmz extension

#### Defined in

[client/components/util/Fragment.tsx:142](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L142)

___

### editing

• **editing**: `boolean`

Whether it is editing or not

#### Defined in

[client/components/util/Fragment.tsx:64](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L64)

___

### entryProps

• `Optional` **entryProps**: `Object`

hide label

#### Index signature

▪ [id: `string`]: `Partial`<[`IPropertyEntryProps`](client_components_property_base.IPropertyEntryProps.md)<[`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>\>\>

#### Defined in

[client/components/util/Fragment.tsx:123](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L123)

___

### properties

• **properties**: `string`[]

The fragment properties we are currently
dealing with

#### Defined in

[client/components/util/Fragment.tsx:80](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L80)

___

### roles

• **roles**: `string`[]

The roles that are allowed to edit

#### Defined in

[client/components/util/Fragment.tsx:69](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L69)

___

### uploadExtraProperties

• `Optional` **uploadExtraProperties**: `string`[]

the properties that are extra uploaded when the upload button
is used against a file

#### Defined in

[client/components/util/Fragment.tsx:137](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L137)

___

### version

• **version**: `string`

The version that we are attempting to set with our edit action

#### Defined in

[client/components/util/Fragment.tsx:74](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L74)

___

### viewProps

• `Optional` **viewProps**: `Object`

hide description

#### Index signature

▪ [id: `string`]: `Partial`<[`IPropertyViewProps`](client_components_property_base.IPropertyViewProps.md)<[`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>\>\>

#### Defined in

[client/components/util/Fragment.tsx:116](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L116)

## Methods

### children

▸ `Optional` **children**(`arg`): `ReactNode`

the children for the framgent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`IFragmentArg`](client_components_util_Fragment.IFragmentArg.md) | The fragment argument |

#### Returns

`ReactNode`

what to render

#### Defined in

[client/components/util/Fragment.tsx:149](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L149)

___

### onBeforeSubmit

▸ `Optional` **onBeforeSubmit**(`action`, `options`): [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md)

For the submit of the specific fragment to be added or edited

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | ``"add"`` \| ``"edit"`` |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

#### Returns

[`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md)

#### Defined in

[client/components/util/Fragment.tsx:91](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L91)

___

### onBeforeSubmitUnversioned

▸ `Optional` **onBeforeSubmitUnversioned**(`options`): [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md)

The function that triggers when no unversioned value is found for the fragment
and it's attempting to submit for that

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

#### Returns

[`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md)

#### Defined in

[client/components/util/Fragment.tsx:86](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L86)

___

### onCloseEdit

▸ **onCloseEdit**(): `void`

Whenever stopping editing

#### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:101](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L101)

___

### onEdit

▸ **onEdit**(): `void`

Whenever edit is triggered

#### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:96](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L96)

___

### onSubmit

▸ `Optional` **onSubmit**(`d`): `void`

Whenever submit is done

#### Parameters

| Name | Type |
| :------ | :------ |
| `d` | [`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md) |

#### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:111](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L111)

___

### onSubmitUnversioned

▸ `Optional` **onSubmitUnversioned**(`d`): `void`

Whenever submit is done

#### Parameters

| Name | Type |
| :------ | :------ |
| `d` | [`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md) |

#### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:106](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/Fragment.tsx#L106)
