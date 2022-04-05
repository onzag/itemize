[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md) / IPropertyDefinitionRawJSONDataType

# Interface: IPropertyDefinitionRawJSONDataType

[base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md).IPropertyDefinitionRawJSONDataType

this is what a raw property definition looks like

## Table of contents

### Properties

- [coerceNullsIntoDefault](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#coercenullsintodefault)
- [createRoleAccess](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#createroleaccess)
- [default](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#default)
- [defaultIf](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#defaultif)
- [disableRangedSearch](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#disablerangedsearch)
- [disableRetrieval](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#disableretrieval)
- [editRoleAccess](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#editroleaccess)
- [enforcedValue](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#enforcedvalue)
- [enforcedValues](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#enforcedvalues)
- [hidden](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#hidden)
- [hiddenIf](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#hiddenif)
- [hiddenIfEnforced](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#hiddenifenforced)
- [htmlAutocomplete](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#htmlautocomplete)
- [i18nData](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#i18ndata)
- [id](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#id)
- [invalidIf](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#invalidif)
- [max](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#max)
- [maxDecimalCount](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#maxdecimalcount)
- [maxLength](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#maxlength)
- [min](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#min)
- [minDecimalCount](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#mindecimalcount)
- [minLength](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#minlength)
- [nonCaseSensitiveUnique](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#noncasesensitiveunique)
- [nullIfHidden](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#nullifhidden)
- [nullable](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#nullable)
- [pattern](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#pattern)
- [readRoleAccess](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#readroleaccess)
- [searchDefault](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchdefault)
- [searchDefaultIf](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchdefaultif)
- [searchHidden](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchhidden)
- [searchHiddenIf](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchhiddenif)
- [searchInvalidIf](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchinvalidif)
- [searchOnlyProperty](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchonlyproperty)
- [searchable](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchable)
- [softReadRoleAccess](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#softreadroleaccess)
- [specialProperties](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#specialproperties)
- [subtype](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#subtype)
- [type](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#type)
- [unique](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#unique)
- [values](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#values)

## Properties

### coerceNullsIntoDefault

• `Optional` **coerceNullsIntoDefault**: `boolean`

whether nulls are coerced into their default value this is useful
when creating values where the user is expected to do a partial creation as
he is not allowed access to certain property, eg user role, so it is ensured
that the null value will be coerced into the default

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:234](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L234)

___

### createRoleAccess

• `Optional` **createRoleAccess**: `string`[]

create role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:249](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L249)

___

### default

• `Optional` **default**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

default value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:170](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L170)

___

### defaultIf

• `Optional` **defaultIf**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

default value if with conditions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:178](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L178)

___

### disableRangedSearch

• `Optional` **disableRangedSearch**: `boolean`

disable ranged search and only allow exact

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:214](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L214)

___

### disableRetrieval

• `Optional` **disableRetrieval**: `boolean`

disable retrieval, property value is never retrieved
it can only be set or updated, good for sensitive data
like passwords

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:220](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L220)

___

### editRoleAccess

• `Optional` **editRoleAccess**: `string`[]

Edit role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:253](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L253)

___

### enforcedValue

• `Optional` **enforcedValue**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

Single enforced value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:198](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L198)

___

### enforcedValues

• `Optional` **enforcedValues**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

enforced values

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:194](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L194)

___

### hidden

• `Optional` **hidden**: `boolean`

hidden does not show at all

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:157](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L157)

___

### hiddenIf

• `Optional` **hiddenIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

hidden if conditional

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:202](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L202)

___

### hiddenIfEnforced

• `Optional` **hiddenIfEnforced**: `boolean`

Makes the field hidden if value is enforced

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:153](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L153)

___

### htmlAutocomplete

• `Optional` **htmlAutocomplete**: `string`

html style autocomplete, mainly used for browser level
autocompletition

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:166](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L166)

___

### i18nData

• `Optional` **i18nData**: `Object`

the locale data, we don't know what it is
the structure is defined in the constants

#### Index signature

▪ [locale: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:86](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L86)

___

### id

• **id**: `string`

the property identifier

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:81](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L81)

___

### invalidIf

• `Optional` **invalidIf**: [`IPropertyDefinitionRawJSONInvalidRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONInvalidRuleDataType.md)[]

conditional custom invalid value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:186](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L186)

___

### max

• `Optional` **max**: `number`

The maximum accepted value (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:104](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L104)

___

### maxDecimalCount

• `Optional` **maxDecimalCount**: `number`

The max accepted decimal count (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:116](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L116)

___

### maxLength

• `Optional` **maxLength**: `number`

The maximum accepted lenght (composed types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:112](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L112)

___

### min

• `Optional` **min**: `number`

The minimum accepted value (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:100](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L100)

___

### minDecimalCount

• `Optional` **minDecimalCount**: `number`

The min accepted decimal count (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:120](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L120)

___

### minLength

• `Optional` **minLength**: `number`

The minimum accepted lenght (composed types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:108](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L108)

___

### nonCaseSensitiveUnique

• `Optional` **nonCaseSensitiveUnique**: `boolean`

Whether the unique is non sensitive, as in non case sensitive
only valid for string types

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:140](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L140)

___

### nullIfHidden

• `Optional` **nullIfHidden**: `boolean`

Makes the value be null if hidden
does not perform checks so it makes it valid

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:149](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L149)

___

### nullable

• `Optional` **nullable**: `boolean`

whether it can be null or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:144](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L144)

___

### pattern

• `Optional` **pattern**: `string`

A pattern to match, only really makes sense
on the string, password and text type, must
be a valid regex

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:126](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L126)

___

### readRoleAccess

• `Optional` **readRoleAccess**: `string`[]

Read role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:239](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L239)

___

### searchDefault

• `Optional` **searchDefault**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

default value for search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:174](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L174)

___

### searchDefaultIf

• `Optional` **searchDefaultIf**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

default value for search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:182](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L182)

___

### searchHidden

• `Optional` **searchHidden**: `boolean`

hidden in search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:161](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L161)

___

### searchHiddenIf

• `Optional` **searchHiddenIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

hidden in search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:206](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L206)

___

### searchInvalidIf

• `Optional` **searchInvalidIf**: [`IPropertyDefinitionRawJSONInvalidRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONInvalidRuleDataType.md)[]

conditional custom invalid value in search only

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:190](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L190)

___

### searchOnlyProperty

• `Optional` **searchOnlyProperty**: `boolean`

Property is only used for custom
searches

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:258](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L258)

___

### searchable

• `Optional` **searchable**: `boolean`

whether it is searchable or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:210](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L210)

___

### softReadRoleAccess

• `Optional` **softReadRoleAccess**: `string`[]

Soft Read role permissions
make the property null rather than
denying the entire access to the resource

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:245](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L245)

___

### specialProperties

• `Optional` **specialProperties**: `Object`

Special properties that are assigned in the type behaviour
description, you set the value here

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:225](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L225)

___

### subtype

• `Optional` **subtype**: `string`

An optional subtype

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:96](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L96)

___

### type

• **type**: [`PropertyDefinitionSupportedTypeName`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypename)

the type of the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:92](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L92)

___

### unique

• `Optional` **unique**: `boolean`

whether it is unique, this is an external check

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:135](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L135)

___

### values

• `Optional` **values**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)[]

values for the property set

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:131](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L131)
