[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/property/Setter

# Module: client/components/property/Setter

Contains the setter component that pipes the data to the all mighty function
in base.tsx

## Table of contents

### Functions

- [BooleanSetter](client_components_property_Setter.md#booleansetter)
- [CurrencySetter](client_components_property_Setter.md#currencysetter)
- [DateSetter](client_components_property_Setter.md#datesetter)
- [DateTimeSetter](client_components_property_Setter.md#datetimesetter)
- [FileSetter](client_components_property_Setter.md#filesetter)
- [FilesSetter](client_components_property_Setter.md#filessetter)
- [IntegerSetter](client_components_property_Setter.md#integersetter)
- [NumberSetter](client_components_property_Setter.md#numbersetter)
- [PaymentSetter](client_components_property_Setter.md#paymentsetter)
- [StringSetter](client_components_property_Setter.md#stringsetter)
- [TagListSetter](client_components_property_Setter.md#taglistsetter)
- [TextSetter](client_components_property_Setter.md#textsetter)
- [TimeSetter](client_components_property_Setter.md#timesetter)
- [UnitSetter](client_components_property_Setter.md#unitsetter)
- [YearSetter](client_components_property_Setter.md#yearsetter)
- [default](client_components_property_Setter.md#default)

## Functions

### BooleanSetter

▸ **BooleanSetter**(`props`): `any`

Allows to set the value for a boolean property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<`boolean`\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:72](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L72)

___

### CurrencySetter

▸ **CurrencySetter**(`props`): `any`

Allows to set the value for a currency property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:137](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L137)

___

### DateSetter

▸ **DateSetter**(`props`): `any`

Allows to set the value for a date property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<`string`\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:201](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L201)

___

### DateTimeSetter

▸ **DateTimeSetter**(`props`): `any`

Allows to set the value for a date time property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<`string`\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:217](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L217)

___

### FileSetter

▸ **FileSetter**(`props`): `any`

Allows to set the value for a file property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:265](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L265)

___

### FilesSetter

▸ **FilesSetter**(`props`): `any`

Allows to set the value for a files array property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<[`PropertyDefinitionSupportedFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:281](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L281)

___

### IntegerSetter

▸ **IntegerSetter**(`props`): `any`

Allows to set the value for a ???? property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<`number`\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:105](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L105)

___

### NumberSetter

▸ **NumberSetter**(`props`): `any`

Allows to set the value for a ???? property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<`number`\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:121](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L121)

___

### PaymentSetter

▸ **PaymentSetter**(`props`): `any`

Allows to set the value for a payment property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:233](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L233)

___

### StringSetter

▸ **StringSetter**(`props`): `any`

Allows to set the value for a string property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<`string`\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:88](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L88)

___

### TagListSetter

▸ **TagListSetter**(`props`): `any`

Allows to set the value for a taglist property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<[`PropertyDefinitionSupportedTagListType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_taglist.md#propertydefinitionsupportedtaglisttype)\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:249](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L249)

___

### TextSetter

▸ **TextSetter**(`props`): `any`

Allows to set the value for a text property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:169](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L169)

___

### TimeSetter

▸ **TimeSetter**(`props`): `any`

Allows to set the value for a time property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<`string`\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:297](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L297)

___

### UnitSetter

▸ **UnitSetter**(`props`): `any`

Allows to set the value for a unit property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<[`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:153](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L153)

___

### YearSetter

▸ **YearSetter**(`props`): `any`

Allows to set the value for a year property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<`number`\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:185](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L185)

___

### default

▸ **default**(`props`): `any`

Allows to set the value for a property using components, this property
will then be marked as super enforced into this value and cannot really
be modified until the setter is unmounted

Note that for usage with automatic search, you should use the setter functionality
provided within the item definition provider search function as automatic search triggers before
the elements inside it mount, making this setter not execute but after automatic search is executed

BooleanSetter
StringSetter
IntegerSetter
NumberSetter
CurrencySetter
UnitSetter
TextSetter
YearSetter
DateSetter
DatetimeSetter
PaymentSetter
TaglistSetter
FileSetter
FilesSetter
LocationSetter
TimeSetter

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertySetterProps`](../interfaces/client_components_property_base.IPropertySetterProps.md)<[`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\> | the props for the entry |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Setter.tsx:56](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Setter.tsx#L56)
