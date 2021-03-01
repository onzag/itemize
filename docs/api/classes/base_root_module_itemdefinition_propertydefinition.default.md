[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_root_module_itemdefinition_propertydefinition.md) / default

# Class: default

[base/Root/Module/ItemDefinition/PropertyDefinition](../modules/base_root_module_itemdefinition_propertydefinition.md).default

The property definition class that defines how properties
are to be defined

## Table of contents

### Constructors

- [constructor](base_root_module_itemdefinition_propertydefinition.default.md#constructor)

### Properties

- [canCacheState](base_root_module_itemdefinition_propertydefinition.default.md#cancachestate)
- [defaultIf](base_root_module_itemdefinition_propertydefinition.default.md#defaultif)
- [enforcedValues](base_root_module_itemdefinition_propertydefinition.default.md#enforcedvalues)
- [globalSuperDefaultedValue](base_root_module_itemdefinition_propertydefinition.default.md#globalsuperdefaultedvalue)
- [globalSuperEnforcedValue](base_root_module_itemdefinition_propertydefinition.default.md#globalsuperenforcedvalue)
- [hiddenIf](base_root_module_itemdefinition_propertydefinition.default.md#hiddenif)
- [invalidIf](base_root_module_itemdefinition_propertydefinition.default.md#invalidif)
- [listeners](base_root_module_itemdefinition_propertydefinition.default.md#listeners)
- [originatingInstance](base_root_module_itemdefinition_propertydefinition.default.md#originatinginstance)
- [parentItemDefinition](base_root_module_itemdefinition_propertydefinition.default.md#parentitemdefinition)
- [parentModule](base_root_module_itemdefinition_propertydefinition.default.md#parentmodule)
- [propertyIsExtension](base_root_module_itemdefinition_propertydefinition.default.md#propertyisextension)
- [rawData](base_root_module_itemdefinition_propertydefinition.default.md#rawdata)
- [stateAppliedValue](base_root_module_itemdefinition_propertydefinition.default.md#stateappliedvalue)
- [stateInternalValue](base_root_module_itemdefinition_propertydefinition.default.md#stateinternalvalue)
- [stateLastCached](base_root_module_itemdefinition_propertydefinition.default.md#statelastcached)
- [stateLastCachedWithExternal](base_root_module_itemdefinition_propertydefinition.default.md#statelastcachedwithexternal)
- [stateLastUniqueCheck](base_root_module_itemdefinition_propertydefinition.default.md#statelastuniquecheck)
- [stateSuperEnforcedValue](base_root_module_itemdefinition_propertydefinition.default.md#statesuperenforcedvalue)
- [stateValue](base_root_module_itemdefinition_propertydefinition.default.md#statevalue)
- [stateValueHasBeenManuallySet](base_root_module_itemdefinition_propertydefinition.default.md#statevaluehasbeenmanuallyset)
- [stateValueModified](base_root_module_itemdefinition_propertydefinition.default.md#statevaluemodified)
- [indexChecker](base_root_module_itemdefinition_propertydefinition.default.md#indexchecker)
- [supportedTypesStandard](base_root_module_itemdefinition_propertydefinition.default.md#supportedtypesstandard)

### Methods

- [addChangeListener](base_root_module_itemdefinition_propertydefinition.default.md#addchangelistener)
- [applyValue](base_root_module_itemdefinition_propertydefinition.default.md#applyvalue)
- [buildFieldsForRoleAccess](base_root_module_itemdefinition_propertydefinition.default.md#buildfieldsforroleaccess)
- [checkRoleAccessFor](base_root_module_itemdefinition_propertydefinition.default.md#checkroleaccessfor)
- [cleanState](base_root_module_itemdefinition_propertydefinition.default.md#cleanstate)
- [cleanValueFor](base_root_module_itemdefinition_propertydefinition.default.md#cleanvaluefor)
- [clearSuperEnforced](base_root_module_itemdefinition_propertydefinition.default.md#clearsuperenforced)
- [getAppliedValue](base_root_module_itemdefinition_propertydefinition.default.md#getappliedvalue)
- [getCurrentValue](base_root_module_itemdefinition_propertydefinition.default.md#getcurrentvalue)
- [getDefaultValue](base_root_module_itemdefinition_propertydefinition.default.md#getdefaultvalue)
- [getEnforcedValue](base_root_module_itemdefinition_propertydefinition.default.md#getenforcedvalue)
- [getHTMLAutocomplete](base_root_module_itemdefinition_propertydefinition.default.md#gethtmlautocomplete)
- [getI18nDataFor](base_root_module_itemdefinition_propertydefinition.default.md#geti18ndatafor)
- [getId](base_root_module_itemdefinition_propertydefinition.default.md#getid)
- [getMaxDecimalCount](base_root_module_itemdefinition_propertydefinition.default.md#getmaxdecimalcount)
- [getMaxLength](base_root_module_itemdefinition_propertydefinition.default.md#getmaxlength)
- [getMinDecimalCount](base_root_module_itemdefinition_propertydefinition.default.md#getmindecimalcount)
- [getMinLength](base_root_module_itemdefinition_propertydefinition.default.md#getminlength)
- [getNewInstance](base_root_module_itemdefinition_propertydefinition.default.md#getnewinstance)
- [getParentItemDefinition](base_root_module_itemdefinition_propertydefinition.default.md#getparentitemdefinition)
- [getParentModule](base_root_module_itemdefinition_propertydefinition.default.md#getparentmodule)
- [getPropertyDefinitionDescription](base_root_module_itemdefinition_propertydefinition.default.md#getpropertydefinitiondescription)
- [getQualifiedPolicyIdentifier](base_root_module_itemdefinition_propertydefinition.default.md#getqualifiedpolicyidentifier)
- [getRequestFields](base_root_module_itemdefinition_propertydefinition.default.md#getrequestfields)
- [getRolesWithAccessTo](base_root_module_itemdefinition_propertydefinition.default.md#getroleswithaccessto)
- [getSpecialProperty](base_root_module_itemdefinition_propertydefinition.default.md#getspecialproperty)
- [getSpecificValidValues](base_root_module_itemdefinition_propertydefinition.default.md#getspecificvalidvalues)
- [getState](base_root_module_itemdefinition_propertydefinition.default.md#getstate)
- [getStateNoExternalChecking](base_root_module_itemdefinition_propertydefinition.default.md#getstatenoexternalchecking)
- [getSubtype](base_root_module_itemdefinition_propertydefinition.default.md#getsubtype)
- [getType](base_root_module_itemdefinition_propertydefinition.default.md#gettype)
- [hasSpecificValidValues](base_root_module_itemdefinition_propertydefinition.default.md#hasspecificvalidvalues)
- [isCoercedIntoDefaultWhenNull](base_root_module_itemdefinition_propertydefinition.default.md#iscoercedintodefaultwhennull)
- [isCurrentlyHidden](base_root_module_itemdefinition_propertydefinition.default.md#iscurrentlyhidden)
- [isExtension](base_root_module_itemdefinition_propertydefinition.default.md#isextension)
- [isHidden](base_root_module_itemdefinition_propertydefinition.default.md#ishidden)
- [isNonCaseSensitiveUnique](base_root_module_itemdefinition_propertydefinition.default.md#isnoncasesensitiveunique)
- [isNullable](base_root_module_itemdefinition_propertydefinition.default.md#isnullable)
- [isRangedSearchDisabled](base_root_module_itemdefinition_propertydefinition.default.md#israngedsearchdisabled)
- [isRetrievalDisabled](base_root_module_itemdefinition_propertydefinition.default.md#isretrievaldisabled)
- [isRichText](base_root_module_itemdefinition_propertydefinition.default.md#isrichtext)
- [isSearchOnly](base_root_module_itemdefinition_propertydefinition.default.md#issearchonly)
- [isSearchable](base_root_module_itemdefinition_propertydefinition.default.md#issearchable)
- [isUnique](base_root_module_itemdefinition_propertydefinition.default.md#isunique)
- [isValidValue](base_root_module_itemdefinition_propertydefinition.default.md#isvalidvalue)
- [isValidValueNoExternalChecking](base_root_module_itemdefinition_propertydefinition.default.md#isvalidvaluenoexternalchecking)
- [mergeWithI18n](base_root_module_itemdefinition_propertydefinition.default.md#mergewithi18n)
- [removeChangeListener](base_root_module_itemdefinition_propertydefinition.default.md#removechangelistener)
- [restoreValueFor](base_root_module_itemdefinition_propertydefinition.default.md#restorevaluefor)
- [setCurrentValue](base_root_module_itemdefinition_propertydefinition.default.md#setcurrentvalue)
- [setGlobalSuperDefault](base_root_module_itemdefinition_propertydefinition.default.md#setglobalsuperdefault)
- [setGlobalSuperEnforced](base_root_module_itemdefinition_propertydefinition.default.md#setglobalsuperenforced)
- [setSuperEnforced](base_root_module_itemdefinition_propertydefinition.default.md#setsuperenforced)
- [toJSON](base_root_module_itemdefinition_propertydefinition.default.md#tojson)
- [getQualifiedPolicyPrefix](base_root_module_itemdefinition_propertydefinition.default.md#getqualifiedpolicyprefix)
- [isValidValue](base_root_module_itemdefinition_propertydefinition.default.md#isvalidvalue)

## Constructors

### constructor

\+ **new default**(`rawJSON`: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md), `parentModule`: [*default*](base_root_module.default.md), `parentItemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `isExtension`: *boolean*, `originatingInstance?`: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

Builds a property definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawJSON` | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) | the raw json structure   |
`parentModule` | [*default*](base_root_module.default.md) | the parent module of the property   |
`parentItemDefinition` | [*default*](base_root_module_itemdefinition.default.md) | the parent item definition   |
`isExtension` | *boolean* | whether it represents a prop extension (aka null parentItemDefinition)   |
`originatingInstance?` | [*default*](base_root_module_itemdefinition_propertydefinition.default.md) | usually null, but when properties are cloned, reinstantiated; this is the original instance that is attached to the root, the reason we need this is for merging functionality as it will keep itself attached to the root original property via this weak link    |

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:880](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L880)

## Properties

### canCacheState

• `Private` **canCacheState**: *boolean*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:874](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L874)

___

### defaultIf

• `Private` `Optional` **defaultIf**: [*IPropertyDefinitionRuleDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionruledatatype.md)[]

Processed rules for default from the raw data

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:787](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L787)

___

### enforcedValues

• `Private` `Optional` **enforcedValues**: [*IPropertyDefinitionRuleDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionruledatatype.md)[]

Processed enforced values from the raw data

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:795](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L795)

___

### globalSuperDefaultedValue

• `Private` `Optional` **globalSuperDefaultedValue**: *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)

this applies for predefined properties basically this is the new
default value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:816](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L816)

___

### globalSuperEnforcedValue

• `Private` `Optional` **globalSuperEnforcedValue**: *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)

enforced values and defaulted values, this is usually set manually
and it applies to includes usually with enforced property values
hence the enforced value is global

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:810](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L810)

___

### hiddenIf

• `Private` `Optional` **hiddenIf**: [*default*](base_root_module_itemdefinition_conditionalruleset.default.md)

Processed hidden conditions from the raw data

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:799](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L799)

___

### invalidIf

• `Private` `Optional` **invalidIf**: [*IPropertyDefinitionInvalidRuleDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitioninvalidruledatatype.md)[]

Processed rules for invalid if from the raw data

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:791](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L791)

___

### listeners

• `Private` **listeners**: PropertyDefinitionListenerType[]

list of listeners

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:803](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L803)

___

### originatingInstance

• `Private` **originatingInstance**: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

when a property is instantiated this is the original property which is
directly attached to the tree

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:782](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L782)

___

### parentItemDefinition

• `Private` **parentItemDefinition**: [*default*](base_root_module_itemdefinition.default.md)

The parent item definition, if any, not available to extensions

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:773](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L773)

___

### parentModule

• `Private` **parentModule**: [*default*](base_root_module.default.md)

the parent module of the property

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:769](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L769)

___

### propertyIsExtension

• `Private` **propertyIsExtension**: *boolean*

Whether the property is an extension

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:777](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L777)

___

### rawData

• **rawData**: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

the raw data for the property definition

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:765](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L765)

___

### stateAppliedValue

• `Private` **stateAppliedValue**: *object*

representing the original applied state of the class

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:828](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L828)

___

### stateInternalValue

• `Private` **stateInternalValue**: *object*

an internal value

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:858](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L858)

___

### stateLastCached

• **stateLastCached**: *object*

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:875](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L875)

___

### stateLastCachedWithExternal

• **stateLastCachedWithExternal**: *object*

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:878](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L878)

___

### stateLastUniqueCheck

• **stateLastUniqueCheck**: *object*

these are caches builtin the property
to be used in the client side

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:867](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L867)

___

### stateSuperEnforcedValue

• `Private` **stateSuperEnforcedValue**: *object*

this is less relevant than the single enforced and it
is used when the value is applied manually during
the user interaction, values are enforced

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:836](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L836)

___

### stateValue

• `Private` **stateValue**: *object*

representing the state of the class

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:822](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L822)

___

### stateValueHasBeenManuallySet

• `Private` **stateValueHasBeenManuallySet**: *object*

this only triggers as true when the value has been modified
when it has been set by the set value function which
is what is supposed to be used by the user

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:852](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L852)

___

### stateValueModified

• `Private` **stateValueModified**: *object*

refers to whether the value in the state value
has been modified by any interaction, either by
apply value or set value by user

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:844](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L844)

___

### indexChecker

▪ `Static` **indexChecker**: [*PropertyDefinitionCheckerFunctionType*](../modules/base_root_module_itemdefinition_propertydefinition.md#propertydefinitioncheckerfunctiontype)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:478](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L478)

___

### supportedTypesStandard

▪ `Static` **supportedTypesStandard**: *Record*<[*PropertyDefinitionSupportedTypeName*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtypename), [*IPropertyDefinitionSupportedType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md)\>

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:475](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L475)

## Methods

### addChangeListener

▸ **addChangeListener**(`listener`: PropertyDefinitionListenerType): *void*

Adds a change listener to the listener for changes
note that these listeners only listens for user changes
not to applied changes of the sorts

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`listener` | PropertyDefinitionListenerType | the listener to add    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1057](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1057)

___

### applyValue

▸ **applyValue**(`id`: *string*, `version`: *string*, `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `modifiedState`: *boolean*, `doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers`: *boolean*, `rejectStateAppliedValue?`: *boolean*): *void*

Applies the value to the property
this is intended to be used for when values are loaded
into this, and not meant for user input

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the slot   |
`version` | *string* | the slot version   |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) | the value   |
`modifiedState` | *boolean* | a modified state to use   |
`doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers` | *boolean* | to avoid hot updating values when the user is modifying them and an apply value has been called because it has been updated somewhere else, we use this to avoid overriding, note that the value must also not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back to false as it's been used applyValue on it, it's been set now by the computer   |
`rejectStateAppliedValue?` | *boolean* | does not make the value as a state applied, this is used by the item definition apply state function to apply a new state    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1622](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1622)

___

### buildFieldsForRoleAccess

▸ **buildFieldsForRoleAccess**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md), `role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md)): *Promise*<{}\>

Builds the fields for a given role and a given action and
a given property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the action that the user wants to execute   |
`role` | *string* | the role that is executing this action   |
`userId` | *string* | the user id   |
`ownerUserId` | *string* | the owner of the item definition for this property    |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |

**Returns:** *Promise*<{}\>

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2125](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2125)

___

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md), `role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Checks the role access for a specific IO action to a specific role
basically just returns a boolean

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the action that wants to be performed   |
`role` | *string* | the role that wants to perform that action   |
`userId` | *string* | the user id that wants to perform the action (null is allowed for eg. GUEST_METAROLE)   |
`ownerUserId` | *string* | the owner of the item definition (provide UNSPECFIED_OWNER when no owner is known)   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |
`throwError` | *boolean* | whether to throw an EndpointError during failure rather than returning a boolean   |

**Returns:** *Promise*<boolean\>

a boolean on whether it has been granted access

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2176](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2176)

___

### cleanState

▸ **cleanState**(): *void*

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:944](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L944)

___

### cleanValueFor

▸ **cleanValueFor**(`id`: *string*, `version`: *string*): *void*

Frees the memory of stored values in a given slot id however
it will not clear enforced values

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | the slot version    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1691](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1691)

___

### clearSuperEnforced

▸ **clearSuperEnforced**(`id`: *string*, `version`: *string*): *void*

Clears a super enforced value set in a slot id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | the slot version    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1496](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1496)

___

### getAppliedValue

▸ **getAppliedValue**(`id`: *string*, `version`: *string*): [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

Provides the applied value for a property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id   |
`version` | *string* | the version   |

**Returns:** [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

the applied value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1162](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1162)

___

### getCurrentValue

▸ **getCurrentValue**(`id`: *string*, `version`: *string*): [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

Provides the current value of a property (as it is)
for a given slot id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | - |

**Returns:** [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

the current value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1112](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1112)

___

### getDefaultValue

▸ **getDefaultValue**(): [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

Gives the default set value

**Returns:** [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

a property definition value, or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2065](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2065)

___

### getEnforcedValue

▸ **getEnforcedValue**(`id`: *string*, `version`: *string*): *object*

Provides the current enforced value (if any)
to a given slot id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | the slot version   |

**Returns:** *object*

Name | Type |
:------ | :------ |
`enforced` | *boolean* |
`value`? | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |

an object that specifies whether the value is enforced, and the value itself if true
the value can be null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:966](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L966)

___

### getHTMLAutocomplete

▸ **getHTMLAutocomplete**(): *string*

Provides the html level as defined as autocomplete="" in the html tag
attribute, this is mainly for usability

**Returns:** *string*

a string or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1945](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1945)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`: *string*): *any*

Returns the locale data definition, or null

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the locale   |

**Returns:** *any*

the locale data

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2074](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2074)

___

### getId

▸ **getId**(): *string*

gives the id of this property defintion

**Returns:** *string*

the id

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1039](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1039)

___

### getMaxDecimalCount

▸ **getMaxDecimalCount**(): *number*

Provides the max decimal count as defined, does not provide
the limits as they are defined in the constant, returns null
simply if it's not defined

**Returns:** *number*

a number or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1989](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1989)

___

### getMaxLength

▸ **getMaxLength**(): *number*

Provides the max length as defined, or null if not available

**Returns:** *number*

a number or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1969](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1969)

___

### getMinDecimalCount

▸ **getMinDecimalCount**(): *number*

Provides the min decimal count as defined, does not provide
the limits as they are defined in the constant, returns null
simply if it's not defined

**Returns:** *number*

a number or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1999](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1999)

___

### getMinLength

▸ **getMinLength**(): *number*

Provides the min length as defined or null if not available

**Returns:** *number*

a number or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1978](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1978)

___

### getNewInstance

▸ **getNewInstance**(): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

Uses the raw data to instantiate a new instance of
the item definition, uses the same on state change
function for state changes so it remains linked to the
module

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

a new instance

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1845](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1845)

___

### getParentItemDefinition

▸ **getParentItemDefinition**(): [*default*](base_root_module_itemdefinition.default.md)

Just gives the parent item definition

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

a item definition that holds this property if any

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2032](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2032)

___

### getParentModule

▸ **getParentModule**(): [*default*](base_root_module.default.md)

Just gives the parent module

**Returns:** [*default*](base_root_module.default.md)

a Module

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2024](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2024)

___

### getPropertyDefinitionDescription

▸ **getPropertyDefinitionDescription**(): [*IPropertyDefinitionSupportedType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md)

Provides the property definition description from the
supported standards

**Returns:** [*IPropertyDefinitionSupportedType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md)

the property definition description for its type

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1855](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1855)

___

### getQualifiedPolicyIdentifier

▸ **getQualifiedPolicyIdentifier**(`policyType`: *string*, `policyName`: *string*): *string*

Provides the qualified property identifier for this specific property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`policyType` | *string* | the policy type   |
`policyName` | *string* | the policy name   |

**Returns:** *string*

a string for the qualified policy prefix for this specific property id

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2243](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2243)

___

### getRequestFields

▸ **getRequestFields**(): *object*

Provides the request fields that are necessary
and contained within this property in order to be
graphql requested, these come from the property description

**Returns:** *object*

the requested fields that are necessary

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1078](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1078)

___

### getRolesWithAccessTo

▸ **getRolesWithAccessTo**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md)): *string*[]

Provides the specified roles with the access to perform an IO
action to the property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the action in question, DELETE is not an allowed action because properties cannot be deleted, only the item definition as a whole is deleted so it makes no sense, and while the same can be said about creation, creation can be done with incomplete values partial creation is a thing in itemize, and a property can be protected from an arbitrary value during creation, this comes in handy for example for the role in the user item, where an user cannot assign itself an arbitrary role during the IO action of creation   |

**Returns:** *string*[]

an array of string for the roles

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2100](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2100)

___

### getSpecialProperty

▸ **getSpecialProperty**(`name`: *string*): *any*

Provides the value of a special property if it's available
they can only be of type, boolean, string, or number

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | the name of that specifial property   |

**Returns:** *any*

the special property value, either a boolean, number or string, or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2012](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2012)

___

### getSpecificValidValues

▸ **getSpecificValidValues**(): [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)[]

Provides the specific valid values of the given property

**Returns:** [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)[]

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1936](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1936)

___

### getState

▸ **getState**(`id`: *string*, `version`: *string*): *Promise*<[*IPropertyDefinitionState*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)\>

provides the current useful value for the property defintion

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the current item definition as stored, pass null if not stored this also represents the slot   |
`version` | *string* | the version   |

**Returns:** *Promise*<[*IPropertyDefinitionState*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)\>

a promise for the current value state

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1274](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1274)

___

### getStateNoExternalChecking

▸ **getStateNoExternalChecking**(`id`: *string*, `version`: *string*, `emulateExternalChecking?`: *boolean*): [*IPropertyDefinitionState*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)

provides the current useful value for the property defintion without doing
any external checking, pass the id still as a cache of previously external
checked results might apply

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the current item definition as stored, pass null if not stored   |
`version` | *string* | the slot version   |
`emulateExternalChecking?` | *boolean* | - |

**Returns:** [*IPropertyDefinitionState*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)

the current value state

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1178](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1178)

___

### getSubtype

▸ **getSubtype**(): *string*

Provides the subtype of the property, if available

**Returns:** *string*

the subtype string or null

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1953](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1953)

___

### getType

▸ **getType**(): [*PropertyDefinitionSupportedTypeName*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtypename)

gives the type of this property defintion

**Returns:** [*PropertyDefinitionSupportedTypeName*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtypename)

the type

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1047](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1047)

___

### hasSpecificValidValues

▸ **hasSpecificValidValues**(): *boolean*

Checks whether the property has specific defined valid values

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1928](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1928)

___

### isCoercedIntoDefaultWhenNull

▸ **isCoercedIntoDefaultWhenNull**(): *boolean*

Tells whether the value is coerced into default when null

**Returns:** *boolean*

a booean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2049](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2049)

___

### isCurrentlyHidden

▸ **isCurrentlyHidden**(`id`: *string*, `version`: *string*): *boolean*

checks if it's currently hidden (not phantom)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id   |
`version` | *string* | the version   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1029](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1029)

___

### isExtension

▸ **isExtension**(): *boolean*

Tells if the property is an extension
from the propext list, they usually have priority

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2041](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2041)

___

### isHidden

▸ **isHidden**(): *boolean*

Tells whether the current property is defined as being hidden

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1887](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1887)

___

### isNonCaseSensitiveUnique

▸ **isNonCaseSensitiveUnique**(): *boolean*

Whether the unique is not case sensitive

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1879](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1879)

___

### isNullable

▸ **isNullable**(): *boolean*

Tells whether the current property is nullable

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1863](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1863)

___

### isRangedSearchDisabled

▸ **isRangedSearchDisabled**(): *boolean*

Checks whether the property can be range searched

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1903](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1903)

___

### isRetrievalDisabled

▸ **isRetrievalDisabled**(): *boolean*

Checks whether the property can be retrieved

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1895](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1895)

___

### isRichText

▸ **isRichText**(): *boolean*

Check whether the type is text, and if it's a rich text type

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1961](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1961)

___

### isSearchOnly

▸ **isSearchOnly**(): *boolean*

Specifies if a property is used for custom searches

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2057](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2057)

___

### isSearchable

▸ **isSearchable**(): *boolean*

Tells if it's searchable, either by default or because
of a search level

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1914](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1914)

___

### isUnique

▸ **isUnique**(): *boolean*

Tells whether there's an unique index on it

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1871](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1871)

___

### isValidValue

▸ **isValidValue**(`id`: *string*, `version`: *string*, `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)): *Promise*<string\>

Externally checks a valid value for this input using all
its guns, this function is context aware

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the item as stored (pass null if new)   |
`version` | *string* | the slot version   |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) | the value to check   |

**Returns:** *Promise*<string\>

the invalid reason as a string

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1808](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1808)

___

### isValidValueNoExternalChecking

▸ **isValidValueNoExternalChecking**(`id`: *string*, `version`: *string*, `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `emulateExternalChecking?`: *boolean*): *string*

Checks the valid value but ignores external checking
pass the value still because cache might apply of previous
external checking

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the item as stored (pass null if new)   |
`version` | *string* | the slot version   |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) | the value to check   |
`emulateExternalChecking?` | *boolean* | - |

**Returns:** *string*

the invalid reason as a string

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1747](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1747)

___

### mergeWithI18n

▸ **mergeWithI18n**(`pdef`: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)): *void*

Merges the raw json data locale information of this property with another
of the same kind (only its language data)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pdef` | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) | the property definition raw form    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2252](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2252)

___

### removeChangeListener

▸ **removeChangeListener**(`listener`: PropertyDefinitionListenerType): *void*

Removes an added listener

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`listener` | PropertyDefinitionListenerType | the listener to remove    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1065](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1065)

___

### restoreValueFor

▸ **restoreValueFor**(`id`: *string*, `version`: *string*): *void*

Restores the value of the given slot id to the original
applied value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | the version    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1716](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1716)

___

### setCurrentValue

▸ **setCurrentValue**(`id`: *string*, `version`: *string*, `newValue`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `internalValue`: *any*): *void*

Sets the current value for the item, null is a valid value
Specially if the item is nullable

The resulting value set might not be the same, if the item
has a default null value, that is, if the value is set to that
value it will be converted to null

**`throws`** an error if the value is invalid by definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot d   |
`version` | *string* | the slot version   |
`newValue` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) | the new value   |
`internalValue` | *any* | the internal value    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1562](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1562)

___

### setGlobalSuperDefault

▸ **setGlobalSuperDefault**(`value`: *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)): *void*

Sets a super default value that superseeds any default value or
values, the value might be another property definition to extract
the value from

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype) | the value to default to it can be a property    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1524](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1524)

___

### setGlobalSuperEnforced

▸ **setGlobalSuperEnforced**(`value`: *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype)): *void*

Sets a super enforced value that superseeds any enforced value or
values and makes the field enforced, the value might
be another property definition to extract the value from

**`throws`** an error if the value is invalid

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *string* \| *number* \| *boolean* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) \| [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md) \| [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md) \| [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md) \| [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) \| [*PropertyDefinitionSupportedFilesType*](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md#propertydefinitionsupportedfilestype) | the value to enforce it can be a property    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1422](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1422)

___

### setSuperEnforced

▸ **setSuperEnforced**(`id`: *string*, `version`: *string*, `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)): *void*

Sets a super enforced value to a given property in a given
slot id, note a super enforced value won't override the global

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | the slot version   |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) | the value that has tobe super enforced    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:1454](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L1454)

___

### toJSON

▸ **toJSON**(): [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

Gets the raw data of the property

**Returns:** [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

the json form

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:2233](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L2233)

___

### getQualifiedPolicyPrefix

▸ `Static`**getQualifiedPolicyPrefix**(`policyType`: *string*, `policyName`: *string*): *string*

A static method that provides the policy prefix for a given policy name and type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`policyType` | *string* | the policy type   |
`policyName` | *string* | the policy name   |

**Returns:** *string*

a prefixed string that represents the qualified policy

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:486](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L486)

___

### isValidValue

▸ `Static`**isValidValue**(`propertyDefinitionRaw`: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `checkAgainstValues`: *boolean*): [*PropertyInvalidReason*](../enums/base_root_module_itemdefinition_propertydefinition.propertyinvalidreason.md)

Checks whether a value is valid or not using
the raw data.

NOTE!!!! this function is context unaware
and hence it cannot execute invalidIf conditional rule
set rules

NOTE!!!!! this function is external events unaware
and hence it cannot check for unique indexes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`propertyDefinitionRaw` | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) | The raw json property definition data   |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) | the value to check against   |
`checkAgainstValues` | *boolean* | if to check against its own values some properties are enums, and this checks whether to check against these enums, but for example, when checking the information on the enums during the checkers.ts process, we don't want to check that because then it will always be valid   |

**Returns:** [*PropertyInvalidReason*](../enums/base_root_module_itemdefinition_propertydefinition.propertyinvalidreason.md)

a boolean on whether the value is valid

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:512](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L512)
