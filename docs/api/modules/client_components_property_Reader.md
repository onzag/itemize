[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/property/Reader

# Module: client/components/property/Reader

Contains the reader component that pipes the data to the all mighty function
in base.tsx

## Table of contents

### Functions

- [BooleanReader](client_components_property_Reader.md#booleanreader)
- [CurrencyReader](client_components_property_Reader.md#currencyreader)
- [DateReader](client_components_property_Reader.md#datereader)
- [DatetimeReader](client_components_property_Reader.md#datetimereader)
- [FileReader](client_components_property_Reader.md#filereader)
- [FilesReader](client_components_property_Reader.md#filesreader)
- [IntegerReader](client_components_property_Reader.md#integerreader)
- [LocationReader](client_components_property_Reader.md#locationreader)
- [NumberReader](client_components_property_Reader.md#numberreader)
- [PaymentReader](client_components_property_Reader.md#paymentreader)
- [StringReader](client_components_property_Reader.md#stringreader)
- [TaglistReader](client_components_property_Reader.md#taglistreader)
- [TextReader](client_components_property_Reader.md#textreader)
- [TimeReader](client_components_property_Reader.md#timereader)
- [UnitReader](client_components_property_Reader.md#unitreader)
- [YearReader](client_components_property_Reader.md#yearreader)
- [default](client_components_property_Reader.md#default)
- [useBooleanReader](client_components_property_Reader.md#usebooleanreader)
- [useCurrencyReader](client_components_property_Reader.md#usecurrencyreader)
- [useDateReader](client_components_property_Reader.md#usedatereader)
- [useDatetimeReader](client_components_property_Reader.md#usedatetimereader)
- [useFileReader](client_components_property_Reader.md#usefilereader)
- [useFilesReader](client_components_property_Reader.md#usefilesreader)
- [useIntegerReader](client_components_property_Reader.md#useintegerreader)
- [useLocationReader](client_components_property_Reader.md#uselocationreader)
- [useNumberReader](client_components_property_Reader.md#usenumberreader)
- [usePaymentReader](client_components_property_Reader.md#usepaymentreader)
- [useReader](client_components_property_Reader.md#usereader)
- [useStringReader](client_components_property_Reader.md#usestringreader)
- [useTaglistReader](client_components_property_Reader.md#usetaglistreader)
- [useTextReader](client_components_property_Reader.md#usetextreader)
- [useTimeReader](client_components_property_Reader.md#usetimereader)
- [useUnitReader](client_components_property_Reader.md#useunitreader)
- [useYearReader](client_components_property_Reader.md#useyearreader)

## Functions

### BooleanReader

▸ **BooleanReader**(`props`): `any`

Reads a boolean value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<`boolean`\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:95](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L95)

___

### CurrencyReader

▸ **CurrencyReader**(`props`): `any`

Reads a currency value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:155](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L155)

___

### DateReader

▸ **DateReader**(`props`): `any`

Reads a date value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<`string`\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:255](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L255)

___

### DatetimeReader

▸ **DatetimeReader**(`props`): `any`

Reads a timestamp value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<`string`\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:295](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L295)

___

### FileReader

▸ **FileReader**(`props`): `any`

Reads a file value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:335](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L335)

___

### FilesReader

▸ **FilesReader**(`props`): `any`

Reads a files array value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`PropertyDefinitionSupportedFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:355](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L355)

___

### IntegerReader

▸ **IntegerReader**(`props`): `any`

Reads an integer value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<`number`\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:115](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L115)

___

### LocationReader

▸ **LocationReader**(`props`): `any`

Reads a location coordinates value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:315](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L315)

___

### NumberReader

▸ **NumberReader**(`props`): `any`

Reads a numeric value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<`number`\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:135](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L135)

___

### PaymentReader

▸ **PaymentReader**(`props`): `any`

Reads a payment value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:375](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L375)

___

### StringReader

▸ **StringReader**(`props`): `any`

Reads a string value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<`string`\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:195](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L195)

___

### TaglistReader

▸ **TaglistReader**(`props`): `any`

Reads a taglist (array of string) value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`PropertyDefinitionSupportedTagListType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_taglist.md#propertydefinitionsupportedtaglisttype)\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:395](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L395)

___

### TextReader

▸ **TextReader**(`props`): `any`

Reads a textual value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:215](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L215)

___

### TimeReader

▸ **TimeReader**(`props`): `any`

Reads a time value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<`string`\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:275](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L275)

___

### UnitReader

▸ **UnitReader**(`props`): `any`

Reads a unit value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:175](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L175)

___

### YearReader

▸ **YearReader**(`props`): `any`

Reads a year value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<`number`\> | the props for the reader |

#### Returns

`any`

#### Defined in

[client/components/property/Reader.tsx:235](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L235)

___

### default

▸ **default**(`props`): `any`

Creates an reader for a given property id

The reader can be used with meta properties, such as created_at edited_at, etc...

use specific readers for specific actions, this is a generic reader

BooleanReader
IntegerReader
NumberReader
CurrencyReader
UnitReader
StringReader
TextReader
YearReader
DateReader
TimeReader
DatetimeReader
LocationReader
FileReader
FilesReader
PaymentReader
TaglistReader

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyReadProps`](../interfaces/client_components_property_base.IPropertyReadProps.md)<[`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\> | the props for the reader |

#### Returns

`any`

a react component

#### Defined in

[client/components/property/Reader.tsx:55](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L55)

___

### useBooleanReader

▸ **useBooleanReader**(`options`): [`boolean`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`boolean`\>]

Reads a boolean value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[`boolean`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`boolean`\>]

#### Defined in

[client/components/property/Reader.tsx:105](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L105)

___

### useCurrencyReader

▸ **useCurrencyReader**(`options`): [[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)\>]

Reads a currency value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)\>]

#### Defined in

[client/components/property/Reader.tsx:165](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L165)

___

### useDateReader

▸ **useDateReader**(`options`): [`string`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`string`\>]

Reads a year value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[`string`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`string`\>]

#### Defined in

[client/components/property/Reader.tsx:265](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L265)

___

### useDatetimeReader

▸ **useDatetimeReader**(`options`): [`string`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`string`\>]

Reads a timestamp value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[`string`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`string`\>]

#### Defined in

[client/components/property/Reader.tsx:305](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L305)

___

### useFileReader

▸ **useFileReader**(`options`): [[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)\>]

Reads a file value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)\>]

#### Defined in

[client/components/property/Reader.tsx:345](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L345)

___

### useFilesReader

▸ **useFilesReader**(`options`): [[`PropertyDefinitionSupportedFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`PropertyDefinitionSupportedFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)\>]

Reads a files array value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[[`PropertyDefinitionSupportedFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`PropertyDefinitionSupportedFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)\>]

#### Defined in

[client/components/property/Reader.tsx:365](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L365)

___

### useIntegerReader

▸ **useIntegerReader**(`options`): [`number`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`number`\>]

Reads an integer value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[`number`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`number`\>]

#### Defined in

[client/components/property/Reader.tsx:125](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L125)

___

### useLocationReader

▸ **useLocationReader**(`options`): [[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\>]

Reads a location coordinates value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\>]

#### Defined in

[client/components/property/Reader.tsx:325](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L325)

___

### useNumberReader

▸ **useNumberReader**(`options`): [`number`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`number`\>]

Reads a numeric value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[`number`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`number`\>]

#### Defined in

[client/components/property/Reader.tsx:145](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L145)

___

### usePaymentReader

▸ **usePaymentReader**(`options`): [[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\>]

Reads a payment value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\>]

#### Defined in

[client/components/property/Reader.tsx:385](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L385)

___

### useReader

▸ **useReader**<`T`\>(`options`): [`T`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`T`\>]

Uses the generic reader to read the value of a property of a given id

use specific readers for specific actions, this is a generic reader

useBooleanReader
useIntegerReader
useNumberReader
useCurrencyReader
useUnitReader
useStringReader
usePasswordReader
useTextReader
useYearReader
useDateReader
useTimeReader
useDatetimeReader
useLocationReader
useFileReader
useFilesReader
usePaymentReader
useTaglistReader

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) |

#### Returns

[`T`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`T`\>]

#### Defined in

[client/components/property/Reader.tsx:85](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L85)

___

### useStringReader

▸ **useStringReader**(`options`): [`string`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`string`\>]

Reads a string value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[`string`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`string`\>]

#### Defined in

[client/components/property/Reader.tsx:205](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L205)

___

### useTaglistReader

▸ **useTaglistReader**(`options`): [[`PropertyDefinitionSupportedTagListType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_taglist.md#propertydefinitionsupportedtaglisttype), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`PropertyDefinitionSupportedTagListType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_taglist.md#propertydefinitionsupportedtaglisttype)\>]

Reads a taglist (array of string)  value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[[`PropertyDefinitionSupportedTagListType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_taglist.md#propertydefinitionsupportedtaglisttype), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`PropertyDefinitionSupportedTagListType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_taglist.md#propertydefinitionsupportedtaglisttype)\>]

#### Defined in

[client/components/property/Reader.tsx:405](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L405)

___

### useTextReader

▸ **useTextReader**(`options`): [[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)\>]

Reads a textual value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)\>]

#### Defined in

[client/components/property/Reader.tsx:225](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L225)

___

### useTimeReader

▸ **useTimeReader**(`options`): [`string`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`string`\>]

Reads a time value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[`string`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`string`\>]

#### Defined in

[client/components/property/Reader.tsx:285](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L285)

___

### useUnitReader

▸ **useUnitReader**(`options`): [[`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)\>]

Reads a unit value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[[`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md), [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)\>]

#### Defined in

[client/components/property/Reader.tsx:185](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L185)

___

### useYearReader

▸ **useYearReader**(`options`): [`number`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`number`\>]

Reads a year value using the reader mechanism

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `string` \| [`IPropertyReadPropsWOChildren`](../interfaces/client_components_property_base.IPropertyReadPropsWOChildren.md) | the options for the reader |

#### Returns

[`number`, [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`number`\>]

#### Defined in

[client/components/property/Reader.tsx:245](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/Reader.tsx#L245)
