[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md) / IPropertyDefinitionRawJSONDataType

# Interface: IPropertyDefinitionRawJSONDataType

[base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md).IPropertyDefinitionRawJSONDataType

this is what a raw property definition looks like

## Table of contents

### Properties

- [coerceNullsIntoDefault](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#coercenullsintodefault)
- [config](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#config)
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
- [searchEnforcedValue](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchenforcedvalue)
- [searchEnforcedValues](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchenforcedvalues)
- [searchEngineBoost](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchengineboost)
- [searchHidden](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchhidden)
- [searchHiddenIf](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchhiddenif)
- [searchInvalidIf](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchinvalidif)
- [searchOnlyProperty](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchonlyproperty)
- [searchable](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#searchable)
- [softReadRoleAccess](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md#softreadroleaccess)
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

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:243](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L243)

___

### config

• `Optional` **config**: `Object`

Special properties for config that are assigned in the type behaviour
description, you set the value here

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:234](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L234)

___

### createRoleAccess

• `Optional` **createRoleAccess**: `string`[]

create role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:258](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L258)

___

### default

• `Optional` **default**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

default value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:167](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L167)

___

### defaultIf

• `Optional` **defaultIf**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

default value if with conditions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:175](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L175)

___

### disableRangedSearch

• `Optional` **disableRangedSearch**: `boolean`

disable ranged search and only allow exact

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:223](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L223)

___

### disableRetrieval

• `Optional` **disableRetrieval**: `boolean`

disable retrieval, property value is never retrieved
it can only be set or updated, good for sensitive data
like passwords

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:229](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L229)

___

### editRoleAccess

• `Optional` **editRoleAccess**: `string`[]

Edit role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:262](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L262)

___

### enforcedValue

• `Optional` **enforcedValue**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

Single enforced value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:199](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L199)

___

### enforcedValues

• `Optional` **enforcedValues**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

enforced values

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:191](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L191)

___

### hidden

• `Optional` **hidden**: `boolean`

hidden does not show at all

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:159](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L159)

___

### hiddenIf

• `Optional` **hiddenIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

hidden if conditional

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:207](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L207)

___

### hiddenIfEnforced

• `Optional` **hiddenIfEnforced**: `boolean`

Makes the field hidden if value is enforced

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:155](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L155)

___

### i18nData

• `Optional` **i18nData**: `Object`

the locale data, we don't know what it is
the structure is defined in the constants

#### Index signature

▪ [locale: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:88](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L88)

___

### id

• **id**: `string`

the property identifier

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:83](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L83)

___

### invalidIf

• `Optional` **invalidIf**: [`IPropertyDefinitionRawJSONInvalidRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONInvalidRuleDataType.md)[]

conditional custom invalid value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:183](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L183)

___

### max

• `Optional` **max**: `number`

The maximum accepted value (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:106](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L106)

___

### maxDecimalCount

• `Optional` **maxDecimalCount**: `number`

The max accepted decimal count (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:118](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L118)

___

### maxLength

• `Optional` **maxLength**: `number`

The maximum accepted lenght (composed types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:114](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L114)

___

### min

• `Optional` **min**: `number`

The minimum accepted value (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:102](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L102)

___

### minDecimalCount

• `Optional` **minDecimalCount**: `number`

The min accepted decimal count (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:122](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L122)

___

### minLength

• `Optional` **minLength**: `number`

The minimum accepted lenght (composed types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:110](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L110)

___

### nonCaseSensitiveUnique

• `Optional` **nonCaseSensitiveUnique**: `boolean`

Whether the unique is non sensitive, as in non case sensitive
only valid for string types

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:142](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L142)

___

### nullIfHidden

• `Optional` **nullIfHidden**: `boolean`

Makes the value be null if hidden
does not perform checks so it makes it valid

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:151](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L151)

___

### nullable

• `Optional` **nullable**: `boolean`

whether it can be null or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:146](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L146)

___

### pattern

• `Optional` **pattern**: `string`

A pattern to match, only really makes sense
on the string, password and text type, must
be a valid regex

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:128](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L128)

___

### readRoleAccess

• `Optional` **readRoleAccess**: `string`[]

Read role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:248](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L248)

___

### searchDefault

• `Optional` **searchDefault**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

default value for search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:171](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L171)

___

### searchDefaultIf

• `Optional` **searchDefaultIf**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

default value for search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:179](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L179)

___

### searchEnforcedValue

• `Optional` **searchEnforcedValue**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

Single enforced value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:203](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L203)

___

### searchEnforcedValues

• `Optional` **searchEnforcedValues**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

enforced values

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:195](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L195)

___

### searchEngineBoost

• `Optional` **searchEngineBoost**: `number`

A boost to give in elasticsearch if exists

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:219](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L219)

___

### searchHidden

• `Optional` **searchHidden**: `boolean`

hidden in search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:163](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L163)

___

### searchHiddenIf

• `Optional` **searchHiddenIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

hidden in search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:211](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L211)

___

### searchInvalidIf

• `Optional` **searchInvalidIf**: [`IPropertyDefinitionRawJSONInvalidRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONInvalidRuleDataType.md)[]

conditional custom invalid value in search only

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:187](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L187)

___

### searchOnlyProperty

• `Optional` **searchOnlyProperty**: `boolean`

Property is only used for custom
searches

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:267](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L267)

___

### searchable

• `Optional` **searchable**: `boolean`

whether it is searchable or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:215](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L215)

___

### softReadRoleAccess

• `Optional` **softReadRoleAccess**: `string`[]

Soft Read role permissions
make the property null rather than
denying the entire access to the resource

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:254](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L254)

___

### subtype

• `Optional` **subtype**: `string`

An optional subtype

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:98](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L98)

___

### type

• **type**: [`PropertyDefinitionSupportedTypeName`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypename)

the type of the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:94](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L94)

___

### unique

• `Optional` **unique**: `boolean`

whether it is unique, this is an external check

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:137](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L137)

___

### values

• `Optional` **values**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)[]

values for the property set

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:133](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L133)
