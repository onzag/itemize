[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md) / default

# Class: default

[base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md).default

The property definition class that defines how properties
are to be defined

## Table of contents

### Constructors

- [constructor](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#constructor)

### Properties

- [canCacheState](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#cancachestate)
- [defaultIf](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#defaultif)
- [enforcedValues](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#enforcedvalues)
- [globalSuperDefaultedValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#globalsuperdefaultedvalue)
- [globalSuperEnforcedValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#globalsuperenforcedvalue)
- [hiddenIf](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#hiddenif)
- [invalidIf](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#invalidif)
- [listeners](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#listeners)
- [originatingInstance](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#originatinginstance)
- [parentItemDefinition](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#parentitemdefinition)
- [parentModule](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#parentmodule)
- [policyName](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#policyname)
- [policyType](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#policytype)
- [propertyIsExtension](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#propertyisextension)
- [rawData](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#rawdata)
- [stateAppliedValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#stateappliedvalue)
- [stateInternalValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#stateinternalvalue)
- [stateLastCached](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#statelastcached)
- [stateLastCachedWithExternal](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#statelastcachedwithexternal)
- [stateLastUniqueCheck](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#statelastuniquecheck)
- [stateSuperEnforcedValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#statesuperenforcedvalue)
- [stateValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#statevalue)
- [stateValueHasBeenManuallySet](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#statevaluehasbeenmanuallyset)
- [stateValueModified](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#statevaluemodified)
- [indexChecker](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#indexchecker)
- [supportedTypesStandard](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#supportedtypesstandard)

### Methods

- [addChangeListener](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#addchangelistener)
- [applyValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#applyvalue)
- [buildFieldsForRoleAccess](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#buildfieldsforroleaccess)
- [checkAgainstJSONDefinition](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#checkagainstjsondefinition)
- [checkRoleAccessFor](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#checkroleaccessfor)
- [checkSoftReadRoleAccessFor](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#checksoftreadroleaccessfor)
- [cleanState](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#cleanstate)
- [cleanValueFor](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#cleanvaluefor)
- [clearSuperEnforced](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#clearsuperenforced)
- [getAppliedValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getappliedvalue)
- [getCurrentValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getcurrentvalue)
- [getDefaultValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getdefaultvalue)
- [getEnforcedValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getenforcedvalue)
- [getI18nDataFor](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#geti18ndatafor)
- [getId](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getid)
- [getMaxDecimalCount](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getmaxdecimalcount)
- [getMaxLength](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getmaxlength)
- [getMinDecimalCount](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getmindecimalcount)
- [getMinLength](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getminlength)
- [getNewInstance](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getnewinstance)
- [getParentItemDefinition](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getparentitemdefinition)
- [getParentModule](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getparentmodule)
- [getPolicyName](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getpolicyname)
- [getPolicyType](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getpolicytype)
- [getPropertyDefinitionDescription](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getpropertydefinitiondescription)
- [getQualifiedPolicyIdentifier](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getqualifiedpolicyidentifier)
- [getRequestFields](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getrequestfields)
- [getRolesWithAccessTo](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getroleswithaccessto)
- [getSearchBoost](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getsearchboost)
- [getSpecialProperty](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getspecialproperty)
- [getSpecificValidValues](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getspecificvalidvalues)
- [getState](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getstate)
- [getStateNoExternalChecking](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getstatenoexternalchecking)
- [getSubtype](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getsubtype)
- [getType](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#gettype)
- [getUniqueIdentifier](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getuniqueidentifier)
- [hasSpecificValidValues](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#hasspecificvalidvalues)
- [isCoercedIntoDefaultWhenNull](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#iscoercedintodefaultwhennull)
- [isCurrentlyHidden](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#iscurrentlyhidden)
- [isExtension](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isextension)
- [isHidden](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#ishidden)
- [isList](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#islist)
- [isNonCaseSensitiveUnique](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isnoncasesensitiveunique)
- [isNullable](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isnullable)
- [isPolicyPropertyDefinition](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#ispolicypropertydefinition)
- [isRangedSearchDisabled](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#israngedsearchdisabled)
- [isRetrievalDisabled](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isretrievaldisabled)
- [isRichText](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isrichtext)
- [isSearchOnly](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#issearchonly)
- [isSearchable](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#issearchable)
- [isTracked](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#istracked)
- [isUnique](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isunique)
- [isValidValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isvalidvalue)
- [isValidValueNoExternalChecking](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isvalidvaluenoexternalchecking)
- [markAsPolicy](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#markaspolicy)
- [mergeWithI18n](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#mergewithi18n)
- [removeChangeListener](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#removechangelistener)
- [restoreValueFor](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#restorevaluefor)
- [setCurrentValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#setcurrentvalue)
- [setGlobalSuperDefault](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#setglobalsuperdefault)
- [setGlobalSuperEnforced](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#setglobalsuperenforced)
- [setSuperEnforced](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#setsuperenforced)
- [toJSON](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#tojson)
- [checkAgainstJSONDefinition](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#checkagainstjsondefinition)
- [createFileForProperty](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#createfileforproperty)
- [getQualifiedPolicyPrefix](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#getqualifiedpolicyprefix)
- [isValidValue](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#isvalidvalue)
- [revokeFileForProperty](base_Root_Module_ItemDefinition_PropertyDefinition.default.md#revokefileforproperty)

## Constructors

### constructor

• **new default**(`rawJSON`, `parentModule`, `parentItemDefinition`, `isExtension`, `originatingInstance?`)

Builds a property definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawJSON` | [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) | the raw json structure |
| `parentModule` | [`default`](base_Root_Module.default.md) | the parent module of the property |
| `parentItemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the parent item definition |
| `isExtension` | `boolean` | whether it represents a prop extension (aka null parentItemDefinition) |
| `originatingInstance?` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | usually null, but when properties are cloned, reinstantiated; this is the original instance that is attached to the root, the reason we need this is for merging functionality as it will keep itself attached to the root original property via this weak link |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:961](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L961)

## Properties

### canCacheState

• `Private` **canCacheState**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:943](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L943)

___

### defaultIf

• `Private` `Optional` **defaultIf**: [`IPropertyDefinitionRuleDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRuleDataType.md)[]

Processed rules for default from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:853](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L853)

___

### enforcedValues

• `Private` `Optional` **enforcedValues**: [`IPropertyDefinitionRuleDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRuleDataType.md)[]

Processed enforced values from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:861](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L861)

___

### globalSuperDefaultedValue

• `Private` `Optional` **globalSuperDefaultedValue**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

this applies for predefined properties basically this is the new
default value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:882](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L882)

___

### globalSuperEnforcedValue

• `Private` `Optional` **globalSuperEnforcedValue**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

enforced values and defaulted values, this is usually set manually
and it applies to includes usually with enforced property values
hence the enforced value is global

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:876](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L876)

___

### hiddenIf

• `Private` `Optional` **hiddenIf**: [`default`](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md)

Processed hidden conditions from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:865](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L865)

___

### invalidIf

• `Private` `Optional` **invalidIf**: [`IPropertyDefinitionInvalidRuleDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionInvalidRuleDataType.md)[]

Processed rules for invalid if from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:857](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L857)

___

### listeners

• `Private` **listeners**: `PropertyDefinitionListenerType`[]

list of listeners

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:869](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L869)

___

### originatingInstance

• `Private` **originatingInstance**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

when a property is instantiated this is the original property which is
directly attached to the tree

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:848](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L848)

___

### parentItemDefinition

• `Private` **parentItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

The parent item definition, if any, not available to extensions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:839](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L839)

___

### parentModule

• `Private` **parentModule**: [`default`](base_Root_Module.default.md)

the parent module of the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:835](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L835)

___

### policyName

• `Private` **policyName**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:489](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L489)

___

### policyType

• `Private` **policyType**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:488](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L488)

___

### propertyIsExtension

• `Private` **propertyIsExtension**: `boolean`

Whether the property is an extension

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:843](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L843)

___

### rawData

• **rawData**: [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)

the raw data for the property definition

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:831](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L831)

___

### stateAppliedValue

• `Private` **stateAppliedValue**: `Object`

representing the original applied state of the class

#### Index signature

▪ [slotId: `string`]: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:894](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L894)

___

### stateInternalValue

• `Private` **stateInternalValue**: `Object`

an internal value

#### Index signature

▪ [slotId: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:927](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L927)

___

### stateLastCached

• **stateLastCached**: `Object`

#### Index signature

▪ [slotId: `string`]: [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:944](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L944)

___

### stateLastCachedWithExternal

• **stateLastCachedWithExternal**: `Object`

#### Index signature

▪ [slotId: `string`]: [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:947](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L947)

___

### stateLastUniqueCheck

• **stateLastUniqueCheck**: `Object`

these are caches builtin the property
to be used in the client side

#### Index signature

▪ [slotId: `string`]: { `valid`: `boolean` ; `value`: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)  }

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:936](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L936)

___

### stateSuperEnforcedValue

• `Private` **stateSuperEnforcedValue**: `Object`

this is less relevant than the single enforced and it
is used when the value is applied manually during
the user interaction, values are enforced

#### Index signature

▪ [slotId: `string`]: { `owners`: `any`[] ; `value`: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)  }

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:902](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L902)

___

### stateValue

• `Private` **stateValue**: `Object`

representing the state of the class

#### Index signature

▪ [slotId: `string`]: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:888](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L888)

___

### stateValueHasBeenManuallySet

• `Private` **stateValueHasBeenManuallySet**: `Object`

this only triggers as true when the value has been modified
when it has been set by the set value function which
is what is supposed to be used by the user

#### Index signature

▪ [slotId: `string`]: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:921](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L921)

___

### stateValueModified

• `Private` **stateValueModified**: `Object`

refers to whether the value in the state value
has been modified by any interaction, either by
apply value or set value by user

#### Index signature

▪ [slotId: `string`]: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:913](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L913)

___

### indexChecker

▪ `Static` **indexChecker**: [`PropertyDefinitionCheckerFunctionType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md#propertydefinitioncheckerfunctiontype) = `clientSideIndexChecker`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:487](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L487)

___

### supportedTypesStandard

▪ `Static` **supportedTypesStandard**: [`PropertyDefinitionSupportedTypesStandardType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypesstandardtype) = `supportedTypesStandard`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:484](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L484)

## Methods

### addChangeListener

▸ **addChangeListener**(`listener`): `void`

Adds a change listener to the listener for changes
note that these listeners only listens for user changes
not to applied changes of the sorts

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | `PropertyDefinitionListenerType` | the listener to add |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1127](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1127)

___

### applyValue

▸ **applyValue**(`id`, `version`, `value`, `modifiedState`, `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet`, `rejectStateAppliedValue?`): `void`

Applies the value to the property
this is intended to be used for when values are loaded
into this, and not meant for user input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the slot |
| `version` | `string` | the slot version |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the value |
| `modifiedState` | `boolean` | a modified state to use |
| `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet` | `boolean` | to avoid hot updating values when the user is modifying them and an apply value has been called because it has been updated somewhere else, we use this to avoid overriding, note that the value must also not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back to false as it's been used applyValue on it, it's been set now by the computer |
| `rejectStateAppliedValue?` | `boolean` | does not make the value as a state applied, this is used by the item definition apply state function to apply a new state |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1762](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1762)

___

### buildFieldsForRoleAccess

▸ **buildFieldsForRoleAccess**(`action`, `role`, `userId`, `ownerUserId`, `rolesManager`): `Promise`<{}\>

Builds the fields for a given role and a given action and
a given property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the action that the user wants to execute |
| `role` | `string` | the role that is executing this action |
| `userId` | `string` | the user id |
| `ownerUserId` | `string` | the owner of the item definition for this property |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |

#### Returns

`Promise`<{}\>

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2430](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2430)

___

### checkAgainstJSONDefinition

▸ **checkAgainstJSONDefinition**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1485](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1485)

___

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`, `role`, `userId`, `ownerUserId`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

Checks the role access for a specific IO action to a specific role
basically just returns a boolean

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the action that wants to be performed |
| `role` | `string` | the role that wants to perform that action |
| `userId` | `string` | the user id that wants to perform the action (null is allowed for eg. GUEST_METAROLE) |
| `ownerUserId` | `string` | the owner of the item definition (provide UNSPECFIED_OWNER when no owner is known) |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an EndpointError during failure rather than returning a boolean |

#### Returns

`Promise`<`boolean`\>

a boolean on whether it has been granted access

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2510](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2510)

___

### checkSoftReadRoleAccessFor

▸ **checkSoftReadRoleAccessFor**(`role`, `userId`, `ownerUserId`, `rolesManager`): `Promise`<`boolean`\>

Checks the soft read role access to a given
property

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2480](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2480)

___

### cleanState

▸ **cleanState**(): `void`

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1014](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1014)

___

### cleanValueFor

▸ **cleanValueFor**(`id`, `version`): `void`

Frees the memory of stored values in a given slot id however
it will not clear enforced values

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | the slot version |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1918](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1918)

___

### clearSuperEnforced

▸ **clearSuperEnforced**(`id`, `version`, `owner?`): `void`

Clears a super enforced value set in a slot id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | the slot version |
| `owner?` | `any` | an optional owner parameter it can only be removed if the owner is the same as the original |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1611](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1611)

___

### getAppliedValue

▸ **getAppliedValue**<`T`\>(`id`, `version`): `T`

Provides the applied value for a property

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |

#### Returns

`T`

the applied value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1232](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1232)

___

### getCurrentValue

▸ **getCurrentValue**<`T`\>(`id`, `version`): `T`

Provides the current value of a property (as it is)
for a given slot id

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | - |

#### Returns

`T`

the current value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1182](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1182)

___

### getDefaultValue

▸ **getDefaultValue**(): [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

Gives the default set value

#### Returns

[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

a property definition value, or null

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2370](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2370)

___

### getEnforcedValue

▸ **getEnforcedValue**<`T`\>(`id`, `version`): `Object`

Provides the current enforced value (if any)
to a given slot id

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | the slot version |

#### Returns

`Object`

an object that specifies whether the value is enforced, and the value itself if true
the value can be null

| Name | Type |
| :------ | :------ |
| `enforced` | `boolean` |
| `value?` | `T` |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1036](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1036)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`): `any`

Returns the locale data definition, or null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the locale |

#### Returns

`any`

the locale data

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2379](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2379)

___

### getId

▸ **getId**(): `string`

gives the id of this property defintion

#### Returns

`string`

the id

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1109](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1109)

___

### getMaxDecimalCount

▸ **getMaxDecimalCount**(): `number`

Provides the max decimal count as defined, does not provide
the limits as they are defined in the constant, returns null
simply if it's not defined

#### Returns

`number`

a number or null

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2294](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2294)

___

### getMaxLength

▸ **getMaxLength**(): `number`

Provides the max length as defined, or null if not available

#### Returns

`number`

a number or null

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2274](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2274)

___

### getMinDecimalCount

▸ **getMinDecimalCount**(): `number`

Provides the min decimal count as defined, does not provide
the limits as they are defined in the constant, returns null
simply if it's not defined

#### Returns

`number`

a number or null

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2304](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2304)

___

### getMinLength

▸ **getMinLength**(): `number`

Provides the min length as defined or null if not available

#### Returns

`number`

a number or null

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2283](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2283)

___

### getNewInstance

▸ **getNewInstance**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

Uses the raw data to instantiate a new instance of
the item definition, uses the same on state change
function for state changes so it remains linked to the
module

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

a new instance

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2092](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2092)

___

### getParentItemDefinition

▸ **getParentItemDefinition**(): [`default`](base_Root_Module_ItemDefinition.default.md)

Just gives the parent item definition

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

a item definition that holds this property if any

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2337](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2337)

___

### getParentModule

▸ **getParentModule**(): [`default`](base_Root_Module.default.md)

Just gives the parent module

#### Returns

[`default`](base_Root_Module.default.md)

a Module

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2329](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2329)

___

### getPolicyName

▸ **getPolicyName**(): `string`

if this is a property definition that belongs to a policy
this will return the policy name

#### Returns

`string`

the policy name

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2123](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2123)

___

### getPolicyType

▸ **getPolicyType**(): `string`

if this is a property definition that belongs to a policy
this will return the policy type

#### Returns

`string`

the policy type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2114](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2114)

___

### getPropertyDefinitionDescription

▸ **getPropertyDefinitionDescription**(): [`IPropertyDefinitionSupportedType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>

Provides the property definition description from the
supported standards

#### Returns

[`IPropertyDefinitionSupportedType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>

the property definition description for its type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2155](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2155)

___

### getQualifiedPolicyIdentifier

▸ **getQualifiedPolicyIdentifier**(`policyType`, `policyName`): `string`

Provides the qualified property identifier for this specific property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `policyType` | `string` | the policy type |
| `policyName` | `string` | the policy name |

#### Returns

`string`

a string for the qualified policy prefix for this specific property id

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2589](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2589)

___

### getRequestFields

▸ **getRequestFields**(): `Object`

Provides the request fields that are necessary
and contained within this property in order to be
graphql requested, these come from the property description

#### Returns

`Object`

the requested fields that are necessary

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1148](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1148)

___

### getRolesWithAccessTo

▸ **getRolesWithAccessTo**(`action`): `string`[]

Provides the specified roles with the access to perform an IO
action to the property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the action in question, DELETE is not an allowed action because properties cannot be deleted, only the item definition as a whole is deleted so it makes no sense, and while the same can be said about creation, creation can be done with incomplete values partial creation is a thing in itemize, and a property can be protected from an arbitrary value during creation, this comes in handy for example for the role in the user item, where an user cannot assign itself an arbitrary role during the IO action of creation |

#### Returns

`string`[]

an array of string for the roles

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2405](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2405)

___

### getSearchBoost

▸ **getSearchBoost**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2222](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2222)

___

### getSpecialProperty

▸ **getSpecialProperty**(`name`): `any`

Provides the value of a special property if it's available
they can only be of type, boolean, string, or number

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of that specifial property |

#### Returns

`any`

the special property value, either a boolean, number or string, or null

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2317](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2317)

___

### getSpecificValidValues

▸ **getSpecificValidValues**(): [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)[]

Provides the specific valid values of the given property

#### Returns

[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)[]

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2246](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2246)

___

### getState

▸ **getState**<`T`\>(`id`, `version`): `Promise`<[`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`T`\>\>

provides the current useful value for the property defintion

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the current item definition as stored, pass null if not stored this also represents the slot |
| `version` | `string` | the version |

#### Returns

`Promise`<[`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`T`\>\>

a promise for the current value state

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1344](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1344)

___

### getStateNoExternalChecking

▸ **getStateNoExternalChecking**<`T`\>(`id`, `version`, `emulateExternalChecking?`): [`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`T`\>

provides the current useful value for the property defintion without doing
any external checking, pass the id still as a cache of previously external
checked results might apply

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the current item definition as stored, pass null if not stored |
| `version` | `string` | the slot version |
| `emulateExternalChecking?` | `boolean` | - |

#### Returns

[`IPropertyDefinitionState`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)<`T`\>

the current value state

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1248](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1248)

___

### getSubtype

▸ **getSubtype**(): `string`

Provides the subtype of the property, if available

#### Returns

`string`

the subtype string or null

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2254](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2254)

___

### getType

▸ **getType**(): [`PropertyDefinitionSupportedTypeName`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypename)

gives the type of this property defintion

#### Returns

[`PropertyDefinitionSupportedTypeName`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtypename)

the type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1117](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1117)

___

### getUniqueIdentifier

▸ **getUniqueIdentifier**(`id`, `version`): `string`

Provides an unique identifier for a given id version combo
for this given property

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |

#### Returns

`string`

a string

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2140](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2140)

___

### hasSpecificValidValues

▸ **hasSpecificValidValues**(): `boolean`

Checks whether the property has specific defined valid values

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2230](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2230)

___

### isCoercedIntoDefaultWhenNull

▸ **isCoercedIntoDefaultWhenNull**(): `boolean`

Tells whether the value is coerced into default when null

#### Returns

`boolean`

a booean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2354](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2354)

___

### isCurrentlyHidden

▸ **isCurrentlyHidden**(`id`, `version`): `boolean`

checks if it's currently hidden (not phantom)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1099](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1099)

___

### isExtension

▸ **isExtension**(): `boolean`

Tells if the property is an extension
from the propext list, they usually have priority

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2346](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2346)

___

### isHidden

▸ **isHidden**(): `boolean`

Tells whether the current property is defined as being hidden

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2187](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2187)

___

### isList

▸ **isList**(): `boolean`

Specifies whether it represents a list form

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2238](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2238)

___

### isNonCaseSensitiveUnique

▸ **isNonCaseSensitiveUnique**(): `boolean`

Whether the unique is not case sensitive

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2179](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2179)

___

### isNullable

▸ **isNullable**(): `boolean`

Tells whether the current property is nullable

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2163](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2163)

___

### isPolicyPropertyDefinition

▸ **isPolicyPropertyDefinition**(): `boolean`

Specifies whether the property definition belongs to a policy

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2131](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2131)

___

### isRangedSearchDisabled

▸ **isRangedSearchDisabled**(): `boolean`

Checks whether the property can be range searched

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2203](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2203)

___

### isRetrievalDisabled

▸ **isRetrievalDisabled**(): `boolean`

Checks whether the property can be retrieved

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2195](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2195)

___

### isRichText

▸ **isRichText**(): `boolean`

Check whether the type is text, and if it's a rich text type

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2262](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2262)

___

### isSearchOnly

▸ **isSearchOnly**(): `boolean`

Specifies if a property is used for custom searches

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2362](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2362)

___

### isSearchable

▸ **isSearchable**(): `boolean`

Tells if it's searchable, either by default or because
of a search level

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2212](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2212)

___

### isTracked

▸ **isTracked**(): `boolean`

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2266](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2266)

___

### isUnique

▸ **isUnique**(): `boolean`

Tells whether there's an unique index on it

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2171](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2171)

___

### isValidValue

▸ **isValidValue**(`id`, `version`, `value`): `Promise`<`string`\>

Externally checks a valid value for this input using all
its guns, this function is context aware

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the item as stored (pass null if new) |
| `version` | `string` | the slot version |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the value to check |

#### Returns

`Promise`<`string`\>

the invalid reason as a string

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2055](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2055)

___

### isValidValueNoExternalChecking

▸ **isValidValueNoExternalChecking**(`id`, `version`, `value`, `emulateExternalChecking?`): `string`

Checks the valid value but ignores external checking
pass the value still because cache might apply of previous
external checking

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the item as stored (pass null if new) |
| `version` | `string` | the slot version |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the value to check |
| `emulateExternalChecking?` | `boolean` | - |

#### Returns

`string`

the invalid reason as a string

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1994](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1994)

___

### markAsPolicy

▸ **markAsPolicy**(`policyType`, `policyName`): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

Marks a property definition as a policy type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `policyType` | `string` | edit, delete, create |
| `policyName` | `string` | the policy name |

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2102](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2102)

___

### mergeWithI18n

▸ **mergeWithI18n**(`pdef`): `void`

Merges the raw json data locale information of this property with another
of the same kind (only its language data)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pdef` | [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) | the property definition raw form |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2598](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2598)

___

### removeChangeListener

▸ **removeChangeListener**(`listener`): `void`

Removes an added listener

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | `PropertyDefinitionListenerType` | the listener to remove |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1135](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1135)

___

### restoreValueFor

▸ **restoreValueFor**(`id`, `version`): `void`

Restores the value of the given slot id to the original
applied value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | the version |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1963](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1963)

___

### setCurrentValue

▸ **setCurrentValue**(`id`, `version`, `newValue`, `internalValue`): `void`

Sets the current value for the item, null is a valid value
Specially if the item is nullable

The resulting value set might not be the same, if the item
has a default null value, that is, if the value is set to that
value it will be converted to null

**`throws`** an error if the value is invalid by definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot d |
| `version` | `string` | the slot version |
| `newValue` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the new value |
| `internalValue` | `any` | the internal value |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1702](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1702)

___

### setGlobalSuperDefault

▸ **setGlobalSuperDefault**(`value`): `void`

Sets a super default value that superseeds any default value or
values, the value might be another property definition to extract
the value from

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the value to default to it can be a property |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1664](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1664)

___

### setGlobalSuperEnforced

▸ **setGlobalSuperEnforced**(`value`): `void`

Sets a super enforced value that superseeds any enforced value or
values and makes the field enforced, the value might
be another property definition to extract the value from

**`throws`** an error if the value is invalid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the value to enforce it can be a property |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1496](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1496)

___

### setSuperEnforced

▸ **setSuperEnforced**(`id`, `version`, `value`, `owner?`): `void`

Sets a super enforced value to a given property in a given
slot id, note a super enforced value won't override the global

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | the slot version |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the value that has tobe super enforced |
| `owner?` | `any` | an owner parameter, if specified it can only be removed by the same owner |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1530](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1530)

___

### toJSON

▸ **toJSON**(): [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)

Gets the raw data of the property

#### Returns

[`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)

the json form

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2579](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2579)

___

### checkAgainstJSONDefinition

▸ `Static` **checkAgainstJSONDefinition**(`properyDefinitionRaw`, `v`): `boolean`

Performs a check agains the json definition value for a property definition

#### Parameters

| Name | Type |
| :------ | :------ |
| `properyDefinitionRaw` | [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) |
| `v` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:526](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L526)

___

### createFileForProperty

▸ `Static` **createFileForProperty**(`id`, `name`, `metadata`, `src`): [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `metadata` | `string` |
| `src` | `Blob` |

#### Returns

[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:491](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L491)

___

### getQualifiedPolicyPrefix

▸ `Static` **getQualifiedPolicyPrefix**(`policyType`, `policyName`): `string`

A static method that provides the policy prefix for a given policy name and type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `policyType` | `string` | the policy type |
| `policyName` | `string` | the policy name |

#### Returns

`string`

a prefixed string that represents the qualified policy

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:514](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L514)

___

### isValidValue

▸ `Static` **isValidValue**(`propertyDefinitionRaw`, `value`, `checkAgainstValues`): [`PropertyInvalidReason`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition.PropertyInvalidReason.md)

Checks whether a value is valid or not using
the raw data.

NOTE!!!! this function is context unaware
and hence it cannot execute invalidIf conditional rule
set rules

NOTE!!!!! this function is external events unaware
and hence it cannot check for unique indexes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyDefinitionRaw` | [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) | The raw json property definition data |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the value to check against |
| `checkAgainstValues` | `boolean` | if to check against its own values some properties are enums, and this checks whether to check against these enums, but for example, when checking the information on the enums during the checkers.ts process, we don't want to check that because then it will always be valid |

#### Returns

[`PropertyInvalidReason`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition.PropertyInvalidReason.md)

a boolean on whether the value is valid

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:564](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L564)

___

### revokeFileForProperty

▸ `Static` **revokeFileForProperty**(`file`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md) |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:504](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L504)
