[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_root_module_itemdefinition_propertydefinition.md) / IPropertyDefinitionRawJSONDataType

# Interface: IPropertyDefinitionRawJSONDataType

[base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_root_module_itemdefinition_propertydefinition.md).IPropertyDefinitionRawJSONDataType

this is what a raw property definition looks like

## Table of contents

### Properties

- [coerceNullsIntoDefault](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#coercenullsintodefault)
- [createRoleAccess](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#createroleaccess)
- [default](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#default)
- [defaultIf](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#defaultif)
- [disableRangedSearch](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#disablerangedsearch)
- [disableRetrieval](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#disableretrieval)
- [editRoleAccess](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#editroleaccess)
- [enforcedValue](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#enforcedvalue)
- [enforcedValues](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#enforcedvalues)
- [hidden](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#hidden)
- [hiddenIf](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#hiddenif)
- [hiddenIfEnforced](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#hiddenifenforced)
- [htmlAutocomplete](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#htmlautocomplete)
- [i18nData](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#i18ndata)
- [id](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#id)
- [invalidIf](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#invalidif)
- [max](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#max)
- [maxDecimalCount](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#maxdecimalcount)
- [maxLength](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#maxlength)
- [min](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#min)
- [minDecimalCount](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#mindecimalcount)
- [minLength](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#minlength)
- [nonCaseSensitiveUnique](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#noncasesensitiveunique)
- [nullIfHidden](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#nullifhidden)
- [nullable](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#nullable)
- [pattern](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#pattern)
- [readRoleAccess](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#readroleaccess)
- [searchDefault](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#searchdefault)
- [searchDefaultIf](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#searchdefaultif)
- [searchHidden](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#searchhidden)
- [searchHiddenIf](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#searchhiddenif)
- [searchInvalidIf](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#searchinvalidif)
- [searchOnlyProperty](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#searchonlyproperty)
- [searchable](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#searchable)
- [specialProperties](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#specialproperties)
- [subtype](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#subtype)
- [type](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#type)
- [unique](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#unique)
- [values](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md#values)

## Properties

### coerceNullsIntoDefault

• `Optional` **coerceNullsIntoDefault**: *boolean*

whether nulls are coerced into their default value this is useful
when creating values where the user is expected to do a partial creation as
he is not allowed access to certain property, eg user role, so it is ensured
that the null value will be coerced into the default

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:232](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L232)

___

### createRoleAccess

• `Optional` **createRoleAccess**: *string*[]

create role permissions

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:241](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L241)

___

### default

• `Optional` **default**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

default value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:168](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L168)

___

### defaultIf

• `Optional` **defaultIf**: [*IPropertyDefinitionRawJSONRuleDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsonruledatatype.md)[]

default value if with conditions

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:176](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L176)

___

### disableRangedSearch

• `Optional` **disableRangedSearch**: *boolean*

disable ranged search and only allow exact

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:212](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L212)

___

### disableRetrieval

• `Optional` **disableRetrieval**: *boolean*

disable retrieval, property value is never retrieved
it can only be set or updated, good for sensitive data
like passwords

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:218](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L218)

___

### editRoleAccess

• `Optional` **editRoleAccess**: *string*[]

Edit role permissions

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:245](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L245)

___

### enforcedValue

• `Optional` **enforcedValue**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

Single enforced value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:196](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L196)

___

### enforcedValues

• `Optional` **enforcedValues**: [*IPropertyDefinitionRawJSONRuleDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsonruledatatype.md)[]

enforced values

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:192](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L192)

___

### hidden

• `Optional` **hidden**: *boolean*

hidden does not show at all

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:155](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L155)

___

### hiddenIf

• `Optional` **hiddenIf**: [*IConditionalRuleSetRawJSONDataType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype)

hidden if conditional

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:200](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L200)

___

### hiddenIfEnforced

• `Optional` **hiddenIfEnforced**: *boolean*

Makes the field hidden if value is enforced

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:151](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L151)

___

### htmlAutocomplete

• `Optional` **htmlAutocomplete**: *string*

html style autocomplete, mainly used for browser level
autocompletition

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:164](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L164)

___

### i18nData

• `Optional` **i18nData**: *object*

the locale data, we don't know what it is
the structure is defined in the constants

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:84](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L84)

___

### id

• **id**: *string*

the property identifier

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:79](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L79)

___

### invalidIf

• `Optional` **invalidIf**: [*IPropertyDefinitionRawJSONInvalidRuleDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsoninvalidruledatatype.md)[]

conditional custom invalid value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:184](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L184)

___

### max

• `Optional` **max**: *number*

The maximum accepted value (numeric types)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:102](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L102)

___

### maxDecimalCount

• `Optional` **maxDecimalCount**: *number*

The max accepted decimal count (numeric types)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:114](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L114)

___

### maxLength

• `Optional` **maxLength**: *number*

The maximum accepted lenght (composed types)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:110](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L110)

___

### min

• `Optional` **min**: *number*

The minimum accepted value (numeric types)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:98](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L98)

___

### minDecimalCount

• `Optional` **minDecimalCount**: *number*

The min accepted decimal count (numeric types)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:118](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L118)

___

### minLength

• `Optional` **minLength**: *number*

The minimum accepted lenght (composed types)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:106](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L106)

___

### nonCaseSensitiveUnique

• `Optional` **nonCaseSensitiveUnique**: *boolean*

Whether the unique is non sensitive, as in non case sensitive
only valid for string types

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:138](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L138)

___

### nullIfHidden

• `Optional` **nullIfHidden**: *boolean*

Makes the value be null if hidden
does not perform checks so it makes it valid

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:147](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L147)

___

### nullable

• `Optional` **nullable**: *boolean*

whether it can be null or not

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:142](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L142)

___

### pattern

• `Optional` **pattern**: *string*

A pattern to match, only really makes sense
on the string, password and text type, must
be a valid regex

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:124](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L124)

___

### readRoleAccess

• `Optional` **readRoleAccess**: *string*[]

Read role permissions

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:237](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L237)

___

### searchDefault

• `Optional` **searchDefault**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

default value for search mode

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:172](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L172)

___

### searchDefaultIf

• `Optional` **searchDefaultIf**: [*IPropertyDefinitionRawJSONRuleDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsonruledatatype.md)[]

default value for search mode

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:180](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L180)

___

### searchHidden

• `Optional` **searchHidden**: *boolean*

hidden in search mode

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:159](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L159)

___

### searchHiddenIf

• `Optional` **searchHiddenIf**: [*IConditionalRuleSetRawJSONDataType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype)

hidden in search mode

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:204](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L204)

___

### searchInvalidIf

• `Optional` **searchInvalidIf**: [*IPropertyDefinitionRawJSONInvalidRuleDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsoninvalidruledatatype.md)[]

conditional custom invalid value in search only

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:188](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L188)

___

### searchOnlyProperty

• `Optional` **searchOnlyProperty**: *boolean*

Property is only used for custom
searches

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:250](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L250)

___

### searchable

• `Optional` **searchable**: *boolean*

whether it is searchable or not

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:208](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L208)

___

### specialProperties

• `Optional` **specialProperties**: *object*

Special properties that are assigned in the type behaviour
description, you set the value here

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:223](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L223)

___

### subtype

• `Optional` **subtype**: *string*

An optional subtype

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:94](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L94)

___

### type

• **type**: [*PropertyDefinitionSupportedTypeName*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtypename)

the type of the property

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:90](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L90)

___

### unique

• `Optional` **unique**: *boolean*

whether it is unique, this is an external check

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:133](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L133)

___

### values

• `Optional` **values**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)[]

values for the property set

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:129](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L129)
