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

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:244](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L244)

___

### config

• `Optional` **config**: `Object`

Special properties for config that are assigned in the type behaviour
description, you set the value here

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:235](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L235)

___

### createRoleAccess

• `Optional` **createRoleAccess**: `string`[]

create role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:259](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L259)

___

### default

• `Optional` **default**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

default value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:168](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L168)

___

### defaultIf

• `Optional` **defaultIf**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

default value if with conditions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:176](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L176)

___

### disableRangedSearch

• `Optional` **disableRangedSearch**: `boolean`

disable ranged search and only allow exact

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:224](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L224)

___

### disableRetrieval

• `Optional` **disableRetrieval**: `boolean`

disable retrieval, property value is never retrieved
it can only be set or updated, good for sensitive data
like passwords

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:230](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L230)

___

### editRoleAccess

• `Optional` **editRoleAccess**: `string`[]

Edit role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:263](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L263)

___

### enforcedValue

• `Optional` **enforcedValue**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

Single enforced value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:200](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L200)

___

### enforcedValues

• `Optional` **enforcedValues**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

enforced values

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:192](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L192)

___

### hidden

• `Optional` **hidden**: `boolean`

hidden does not show at all

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:160](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L160)

___

### hiddenIf

• `Optional` **hiddenIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

hidden if conditional

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:208](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L208)

___

### hiddenIfEnforced

• `Optional` **hiddenIfEnforced**: `boolean`

Makes the field hidden if value is enforced

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:156](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L156)

___

### i18nData

• `Optional` **i18nData**: `Object`

the locale data, we don't know what it is
the structure is defined in the constants

#### Index signature

▪ [locale: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:89](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L89)

___

### id

• **id**: `string`

the property identifier

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:84](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L84)

___

### invalidIf

• `Optional` **invalidIf**: [`IPropertyDefinitionRawJSONInvalidRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONInvalidRuleDataType.md)[]

conditional custom invalid value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:184](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L184)

___

### max

• `Optional` **max**: `number`

The maximum accepted value (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:107](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L107)

___

### maxDecimalCount

• `Optional` **maxDecimalCount**: `number`

The max accepted decimal count (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:119](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L119)

___

### maxLength

• `Optional` **maxLength**: `number`

The maximum accepted lenght (composed types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:115](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L115)

___

### min

• `Optional` **min**: `number`

The minimum accepted value (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:103](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L103)

___

### minDecimalCount

• `Optional` **minDecimalCount**: `number`

The min accepted decimal count (numeric types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:123](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L123)

___

### minLength

• `Optional` **minLength**: `number`

The minimum accepted lenght (composed types)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:111](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L111)

___

### nonCaseSensitiveUnique

• `Optional` **nonCaseSensitiveUnique**: `boolean`

Whether the unique is non sensitive, as in non case sensitive
only valid for string types

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:143](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L143)

___

### nullIfHidden

• `Optional` **nullIfHidden**: `boolean`

Makes the value be null if hidden
does not perform checks so it makes it valid

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:152](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L152)

___

### nullable

• `Optional` **nullable**: `boolean`

whether it can be null or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:147](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L147)

___

### pattern

• `Optional` **pattern**: `string`

A pattern to match, only really makes sense
on the string, password and text type, must
be a valid regex

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:129](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L129)

___

### readRoleAccess

• `Optional` **readRoleAccess**: `string`[]

Read role permissions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:249](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L249)

___

### searchDefault

• `Optional` **searchDefault**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

default value for search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:172](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L172)

___

### searchDefaultIf

• `Optional` **searchDefaultIf**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

default value for search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:180](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L180)

___

### searchEnforcedValue

• `Optional` **searchEnforcedValue**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

Single enforced value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:204](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L204)

___

### searchEnforcedValues

• `Optional` **searchEnforcedValues**: [`IPropertyDefinitionRawJSONRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)[]

enforced values

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:196](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L196)

___

### searchEngineBoost

• `Optional` **searchEngineBoost**: `number`

A boost to give in elasticsearch if exists

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:220](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L220)

___

### searchHidden

• `Optional` **searchHidden**: `boolean`

hidden in search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:164](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L164)

___

### searchHiddenIf

• `Optional` **searchHiddenIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

hidden in search mode

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:212](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L212)

___

### searchInvalidIf

• `Optional` **searchInvalidIf**: [`IPropertyDefinitionRawJSONInvalidRuleDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONInvalidRuleDataType.md)[]

conditional custom invalid value in search only

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:188](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L188)

___

### searchOnlyProperty

• `Optional` **searchOnlyProperty**: `boolean`

Property is only used for custom
searches

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:268](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L268)

___

### searchable

• `Optional` **searchable**: `boolean`

whether it is searchable or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:216](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L216)

___

### softReadRoleAccess

• `Optional` **softReadRoleAccess**: `string`[]

Soft Read role permissions
make the property null rather than
denying the entire access to the resource

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:255](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L255)

___

### subtype

• `Optional` **subtype**: `string`

An optional subtype

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:99](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L99)

___

### type

• **type**: [`PropertyDefinitionSupportedTypeName`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypename)

the type of the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:95](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L95)

___

### unique

• `Optional` **unique**: `boolean`

whether it is unique, this is an external check

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:138](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L138)

___

### values

• `Optional` **values**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)[]

values for the property set

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:134](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L134)
