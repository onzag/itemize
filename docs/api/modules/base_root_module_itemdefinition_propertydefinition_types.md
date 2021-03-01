[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/types

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/types

Contains all the supported types within the standard specification of itemize
some mild checkers just in case as well as the types that are used within
typescript, this file acts as a registry of sorts

## Table of contents

### Interfaces

- [IArgInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.iarginfo.md)
- [ILocalEqualInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ilocalequalinfo.md)
- [ILocalOrderByInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ilocalorderbyinfo.md)
- [ILocalSearchInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ilocalsearchinfo.md)
- [ILocalStrSearchInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ilocalstrsearchinfo.md)
- [IPropertyDefinitionSupportedType](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md)
- [ISQLArgInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)
- [ISQLBtreeIndexableInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md)
- [ISQLEqualInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md)
- [ISQLInInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)
- [ISQLMantenienceType](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlmanteniencetype.md)
- [ISQLOrderByInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md)
- [ISQLOutInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md)
- [ISQLSSCacheEqualInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md)
- [ISQLSearchInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)
- [ISQLStrSearchInfo](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlstrsearchinfo.md)

### Type aliases

- [PropertyDefinitionSupportedType](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)
- [PropertyDefinitionSupportedTypeName](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtypename)
- [PropertyDefinitionSupportedTypesStandardType](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtypesstandardtype)

### Variables

- [default](base_root_module_itemdefinition_propertydefinition_types.md#default)

## Type aliases

### PropertyDefinitionSupportedType

Ƭ **PropertyDefinitionSupportedType**: [*PropertyDefinitionSupportedBooleanType*](base_root_module_itemdefinition_propertydefinition_types_boolean.md#propertydefinitionsupportedbooleantype) \| [*PropertyDefinitionSupportedIntegerType*](base_root_module_itemdefinition_propertydefinition_types_integer.md#propertydefinitionsupportedintegertype) \| [*PropertyDefinitionSupportedNumberType*](base_root_module_itemdefinition_propertydefinition_types_number.md#propertydefinitionsupportednumbertype) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*PropertyDefinitionSupportedStringType*](base_root_module_itemdefinition_propertydefinition_types_string.md#propertydefinitionsupportedstringtype) \| [*PropertyDefinitionSupportedPasswordType*](base_root_module_itemdefinition_propertydefinition_types_password.md#propertydefinitionsupportedpasswordtype) \| [*PropertyDefinitionSupportedTextType*](base_root_module_itemdefinition_propertydefinition_types_text.md#propertydefinitionsupportedtexttype) \| [*PropertyDefinitionSupportedDateType*](base_root_module_itemdefinition_propertydefinition_types_date.md#propertydefinitionsupporteddatetype) \| [*PropertyDefinitionSupportedDateTimeType*](base_root_module_itemdefinition_propertydefinition_types_datetime.md#propertydefinitionsupporteddatetimetype) \| [*PropertyDefinitionSupportedTimeType*](base_root_module_itemdefinition_propertydefinition_types_time.md#propertydefinitionsupportedtimetype) \| [*PropertyDefinitionSupportedYearType*](base_root_module_itemdefinition_propertydefinition_types_year.md#propertydefinitionsupportedyeartype) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*PropertyDefinitionSupportedFileType*](base_root_module_itemdefinition_propertydefinition_types_file.md#propertydefinitionsupportedfiletype) \| [*PropertyDefinitionSupportedFilesType*](base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)

All the supported types combined

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:410](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L410)

___

### PropertyDefinitionSupportedTypeName

Ƭ **PropertyDefinitionSupportedTypeName**: *boolean* \| *integer* \| *number* \| *currency* \| *unit* \| *string* \| *password* \| *text* \| *year* \| *date* \| *datetime* \| *time* \| *location* \| *file* \| *files*

All the supported property types

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:37](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L37)

___

### PropertyDefinitionSupportedTypesStandardType

Ƭ **PropertyDefinitionSupportedTypesStandardType**: *Record*<[*PropertyDefinitionSupportedTypeName*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtypename), [*IPropertyDefinitionSupportedType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md)\>

So this is how properties are defined to give an overview on
how they are supposed to be managed

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:358](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L358)

## Variables

### default

• `Const` **default**: [*PropertyDefinitionSupportedTypesStandardType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtypesstandardtype)

The standard definition and registry of all types in itemize

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:364](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L364)
