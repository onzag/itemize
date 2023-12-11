[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/types

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/types

Contains all the supported types within the standard specification of itemize
some mild checkers just in case as well as the types that are used within
typescript, this file acts as a registry of sorts

## Table of contents

### Interfaces

- [IArgInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md)
- [IElasticHighlighPropertyInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md)
- [IElasticHighlightRecordInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightRecordInfo.md)
- [IElasticHighlightReply](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)
- [IElasticHighlightSingleRecordInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightSingleRecordInfo.md)
- [IElasticSearchInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md)
- [IElasticStrSearchInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticStrSearchInfo.md)
- [ILocalEqualInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalEqualInfo.md)
- [ILocalOrderByInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalOrderByInfo.md)
- [ILocalSearchInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalSearchInfo.md)
- [ILocalStrSearchInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalStrSearchInfo.md)
- [IPropertyDefinitionSupportedType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md)
- [ISQLArgInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md)
- [ISQLBtreeIndexableInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLBtreeIndexableInfo.md)
- [ISQLEqualInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md)
- [ISQLInInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md)
- [ISQLMantenienceType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLMantenienceType.md)
- [ISQLOrderByInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md)
- [ISQLOutInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md)
- [ISQLRedoDictionaryBasedIndex](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLRedoDictionaryBasedIndex.md)
- [ISQLSSCacheEqualInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md)
- [ISQLSearchInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md)
- [ISQLSideEffectType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)
- [ISQLStrSearchInfo](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLStrSearchInfo.md)

### Type Aliases

- [PropertyDefinitionSupportedType](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)
- [PropertyDefinitionSupportedTypeName](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypename)
- [PropertyDefinitionSupportedTypesStandardType](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypesstandardtype)

### Variables

- [default](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#default)

## Type Aliases

### PropertyDefinitionSupportedType

Ƭ **PropertyDefinitionSupportedType**: [`PropertyDefinitionSupportedBooleanType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_boolean.md#propertydefinitionsupportedbooleantype) \| [`PropertyDefinitionSupportedIntegerType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_integer.md#propertydefinitionsupportedintegertype) \| [`PropertyDefinitionSupportedNumberType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_number.md#propertydefinitionsupportednumbertype) \| [`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md) \| [`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md) \| [`PropertyDefinitionSupportedStringType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_string.md#propertydefinitionsupportedstringtype) \| [`PropertyDefinitionSupportedPasswordType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_password.md#propertydefinitionsupportedpasswordtype) \| [`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md) \| [`PropertyDefinitionSupportedDateType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_date.md#propertydefinitionsupporteddatetype) \| [`PropertyDefinitionSupportedDateTimeType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_datetime.md#propertydefinitionsupporteddatetimetype) \| [`PropertyDefinitionSupportedTimeType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_time.md#propertydefinitionsupportedtimetype) \| [`PropertyDefinitionSupportedYearType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_year.md#propertydefinitionsupportedyeartype) \| [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md) \| [`PropertyDefinitionSupportedFileType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_file.md#propertydefinitionsupportedfiletype) \| [`PropertyDefinitionSupportedFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype) \| [`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md) \| [`PropertyDefinitionSupportedTagListType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_taglist.md#propertydefinitionsupportedtaglisttype)

All the supported types combined

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:561](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L561)

___

### PropertyDefinitionSupportedTypeName

Ƭ **PropertyDefinitionSupportedTypeName**: ``"boolean"`` \| ``"integer"`` \| ``"number"`` \| ``"currency"`` \| ``"unit"`` \| ``"string"`` \| ``"password"`` \| ``"text"`` \| ``"year"`` \| ``"date"`` \| ``"datetime"`` \| ``"time"`` \| ``"location"`` \| ``"file"`` \| ``"files"`` \| ``"payment"`` \| ``"taglist"``

All the supported property types

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:40](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L40)

___

### PropertyDefinitionSupportedTypesStandardType

Ƭ **PropertyDefinitionSupportedTypesStandardType**: `Record`\<[`PropertyDefinitionSupportedTypeName`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypename), [`IPropertyDefinitionSupportedType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md)\<[`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>\>

So this is how properties are defined to give an overview on
how they are supposed to be managed

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:507](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L507)

## Variables

### default

• `Const` **default**: [`PropertyDefinitionSupportedTypesStandardType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypesstandardtype)

The standard definition and registry of all types in itemize

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:513](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L513)
