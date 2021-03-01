[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/Include](../modules/base_root_module_itemdefinition_include.md) / default

# Class: default

[base/Root/Module/ItemDefinition/Include](../modules/base_root_module_itemdefinition_include.md).default

This class provides the utilities for the description of an item
it's one of the most important classes that defines how an item is added
based on an existant item defintion

An item is described mainly by its name and such name must be a valid
import for the item definition that its parent holds, for example
lets say we have an item definition for Car which has wheels in it

{
 "name": "wheels",
 "enforcedProperties": {
   "mainAmount": 4
 },
 "predefinedProperties": {
   "spares": 1
 },
 "excludedIf": {
   "property": "hover-car",
   "comparator": "equals",
   "value": true
 },
 "sinkIn": [
   "material"
 ]
},

An item might also be a group of items with a gate

## Table of contents

### Constructors

- [constructor](base_root_module_itemdefinition_include.default.md#constructor)

### Properties

- [\_gqlInObj](base_root_module_itemdefinition_include.default.md#_gqlinobj)
- [\_gqlInObjOpt](base_root_module_itemdefinition_include.default.md#_gqlinobjopt)
- [\_gqlOutObj](base_root_module_itemdefinition_include.default.md#_gqloutobj)
- [\_gqlOutObjOpt](base_root_module_itemdefinition_include.default.md#_gqloutobjopt)
- [canUserExcludeIf](base_root_module_itemdefinition_include.default.md#canuserexcludeif)
- [defaultExcludedIf](base_root_module_itemdefinition_include.default.md#defaultexcludedif)
- [enforcedProperties](base_root_module_itemdefinition_include.default.md#enforcedproperties)
- [excludedIf](base_root_module_itemdefinition_include.default.md#excludedif)
- [itemDefinition](base_root_module_itemdefinition_include.default.md#itemdefinition)
- [parentItemDefinition](base_root_module_itemdefinition_include.default.md#parentitemdefinition)
- [parentModule](base_root_module_itemdefinition_include.default.md#parentmodule)
- [predefinedProperties](base_root_module_itemdefinition_include.default.md#predefinedproperties)
- [rawData](base_root_module_itemdefinition_include.default.md#rawdata)
- [stateExclusion](base_root_module_itemdefinition_include.default.md#stateexclusion)
- [stateExclusionApplied](base_root_module_itemdefinition_include.default.md#stateexclusionapplied)
- [stateExclusionHasBeenManuallySet](base_root_module_itemdefinition_include.default.md#stateexclusionhasbeenmanuallyset)
- [stateExclusionModified](base_root_module_itemdefinition_include.default.md#stateexclusionmodified)

### Methods

- [applyValue](base_root_module_itemdefinition_include.default.md#applyvalue)
- [buildFieldsForRoleAccess](base_root_module_itemdefinition_include.default.md#buildfieldsforroleaccess)
- [canExclusionBeSet](base_root_module_itemdefinition_include.default.md#canexclusionbeset)
- [checkRoleAccessFor](base_root_module_itemdefinition_include.default.md#checkroleaccessfor)
- [cleanState](base_root_module_itemdefinition_include.default.md#cleanstate)
- [cleanValueFor](base_root_module_itemdefinition_include.default.md#cleanvaluefor)
- [containsAnExternallyCheckedProperty](base_root_module_itemdefinition_include.default.md#containsanexternallycheckedproperty)
- [getAppliedExclusionState](base_root_module_itemdefinition_include.default.md#getappliedexclusionstate)
- [getExclusionState](base_root_module_itemdefinition_include.default.md#getexclusionstate)
- [getI18nDataFor](base_root_module_itemdefinition_include.default.md#geti18ndatafor)
- [getI18nNameFor](base_root_module_itemdefinition_include.default.md#geti18nnamefor)
- [getId](base_root_module_itemdefinition_include.default.md#getid)
- [getItemDefinition](base_root_module_itemdefinition_include.default.md#getitemdefinition)
- [getItemDefinitionName](base_root_module_itemdefinition_include.default.md#getitemdefinitionname)
- [getPrefixedQualifiedIdentifier](base_root_module_itemdefinition_include.default.md#getprefixedqualifiedidentifier)
- [getQualifiedExclusionStateIdentifier](base_root_module_itemdefinition_include.default.md#getqualifiedexclusionstateidentifier)
- [getQualifiedIdentifier](base_root_module_itemdefinition_include.default.md#getqualifiedidentifier)
- [getSinkingProperties](base_root_module_itemdefinition_include.default.md#getsinkingproperties)
- [getSinkingPropertiesIds](base_root_module_itemdefinition_include.default.md#getsinkingpropertiesids)
- [getSinkingPropertyFor](base_root_module_itemdefinition_include.default.md#getsinkingpropertyfor)
- [getState](base_root_module_itemdefinition_include.default.md#getstate)
- [getStateNoExternalChecking](base_root_module_itemdefinition_include.default.md#getstatenoexternalchecking)
- [isExclusionCallout](base_root_module_itemdefinition_include.default.md#isexclusioncallout)
- [isExclusionTernary](base_root_module_itemdefinition_include.default.md#isexclusionternary)
- [mergeWithI18n](base_root_module_itemdefinition_include.default.md#mergewithi18n)
- [restoreValueFor](base_root_module_itemdefinition_include.default.md#restorevaluefor)
- [setExclusionState](base_root_module_itemdefinition_include.default.md#setexclusionstate)
- [toJSON](base_root_module_itemdefinition_include.default.md#tojson)

## Constructors

### constructor

\+ **new default**(`rawJSON`: [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md), `parentModule`: [*default*](base_root_module.default.md), `parentItemDefinition`: [*default*](base_root_module_itemdefinition.default.md)): [*default*](base_root_module_itemdefinition_include.default.md)

The constructor for an Include

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawJSON` | [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md) | the raw data as JSON   |
`parentModule` | [*default*](base_root_module.default.md) | the parent module   |
`parentItemDefinition` | [*default*](base_root_module_itemdefinition.default.md) | the item definition that this node is located, for example if this include is for a car wheel, and is included in vehicle, this parentItemDefinition would be the vehicle definition    |

**Returns:** [*default*](base_root_module_itemdefinition_include.default.md)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:210](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L210)

## Properties

### \_gqlInObj

• **\_gqlInObj**: *any*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:150](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L150)

___

### \_gqlInObjOpt

• **\_gqlInObjOpt**: *any*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:154](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L154)

___

### \_gqlOutObj

• **\_gqlOutObj**: *any*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:152](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L152)

___

### \_gqlOutObjOpt

• **\_gqlOutObjOpt**: *any*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:156](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L156)

___

### canUserExcludeIf

• `Private` `Optional` **canUserExcludeIf**: [*default*](base_root_module_itemdefinition_conditionalruleset.default.md)

The allowance of exclusion (compiled)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:169](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L169)

___

### defaultExcludedIf

• `Private` `Optional` **defaultExcludedIf**: [*default*](base_root_module_itemdefinition_conditionalruleset.default.md)

The default exclusion state rule (compiled)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:173](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L173)

___

### enforcedProperties

• `Private` `Optional` **enforcedProperties**: [*default*](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md)

Enforced properties (compiled)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:178](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L178)

___

### excludedIf

• `Private` `Optional` **excludedIf**: [*default*](base_root_module_itemdefinition_conditionalruleset.default.md)

The excluded if rules (compiled)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:165](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L165)

___

### itemDefinition

• `Private` **itemDefinition**: [*default*](base_root_module_itemdefinition.default.md)

The item definition the include refers to

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:161](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L161)

___

### parentItemDefinition

• **parentItemDefinition**: [*default*](base_root_module_itemdefinition.default.md)

The parent item definition of this include

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:142](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L142)

___

### parentModule

• **parentModule**: [*default*](base_root_module.default.md)

The parent module where this include sits

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:146](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L146)

___

### predefinedProperties

• `Private` `Optional` **predefinedProperties**: [*default*](base_root_module_itemdefinition_propertiesvaluemappingdefiniton.default.md)

Predefined properties (compiled)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:182](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L182)

___

### rawData

• **rawData**: [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md)

The raw data that comes from the compiled schema

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:138](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L138)

___

### stateExclusion

• `Private` **stateExclusion**: *object*

This is the state exclusion of the class, not the defaulted, not
the enforced, but the stateful

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:188](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L188)

___

### stateExclusionApplied

• `Private` **stateExclusionApplied**: *object*

The applied exclusion

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:201](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L201)

___

### stateExclusionHasBeenManuallySet

• `Private` **stateExclusionHasBeenManuallySet**: *object*

This also shows whether the state has been modified, either
by the user or a value has been applied

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:208](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L208)

___

### stateExclusionModified

• `Private` **stateExclusionModified**: *object*

This also shows whether the state has been modified, either
by the user or a value has been applied

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:195](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L195)

## Methods

### applyValue

▸ **applyValue**(`id`: *string*, `version`: *string*, `value`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `exclusionState`: [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md), `doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers`: *boolean*): *void*

Applies a value to an include

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id to use   |
`version` | *string* | the slot version to use   |
`value` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the value that is applied   |
`exclusionState` | [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md) | the exclusion state   |
`doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers` | *boolean* | to avoid hot updating values when the user is modifying them and an apply value has been called because it has been updated somewhere else, we use this to avoid overriding, note that the value must also not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back to false as it's been used applyValue on it, it's been set now by the computer    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:650](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L650)

___

### buildFieldsForRoleAccess

▸ **buildFieldsForRoleAccess**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md), `role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/root.icustomrolemanager.md)): *Promise*<[*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md)\>

Builds the fileds as grapqhl fields for a given role that wants to execute a given
action, that will be the maximum fields of the include this user can request

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the action that is to be executed   |
`role` | *string* | the role that is executing it   |
`userId` | *string* | the user id of that user   |
`ownerUserId` | *string* | the owner of the item definition where the include is localed   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/root.icustomrolemanager.md) | - |

**Returns:** *Promise*<[*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md)\>

a graphql fields object

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:380](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L380)

___

### canExclusionBeSet

▸ **canExclusionBeSet**(`id`: *string*, `version`: *string*): *boolean*

Tells whether the exclusion state can be toggled externally
This is for when an item might be included
like how a car might have a spare wheel or not usually the
case is true but it might be false as well

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the given exclusion state slot id   |
`version` | *string* | the version for the given exclusion state slot id   |

**Returns:** *boolean*

a boolean that tells whether if it can be toggled

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:475](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L475)

___

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md), `role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `requestedFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md), `rolesManager`: [*ICustomRoleManager*](../interfaces/root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Checks the role access for a given include to be accessed given a IO action

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the action that wants to be executed   |
`role` | *string* | the role of the user wanting to execute that action   |
`userId` | *string* | the user id of the user wanting to execute (can be null)   |
`ownerUserId` | *string* | the owner of the user wanting to execute (or UNSPECIFIED_OWNER)   |
`requestedFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the requested fields that are requested from the include these basically represent the sinking properties where the IO action is being applied   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/root.icustomrolemanager.md) | - |
`throwError` | *boolean* | whether to throw an error in failure   |

**Returns:** *Promise*<boolean\>

a boolean on whether it has role access

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:351](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L351)

___

### cleanState

▸ **cleanState**(`init?`: *boolean*): *void*

Cleans the state of the include so that is empty and clears
the memory

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`init?` | *boolean* | whether it was called in the constructor for initialization    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:277](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L277)

___

### cleanValueFor

▸ **cleanValueFor**(`id`: *string*, `version`: *string*): *void*

Memory cleans the value in an item

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | the slot version    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:699](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L699)

___

### containsAnExternallyCheckedProperty

▸ **containsAnExternallyCheckedProperty**(): *boolean*

Returns true if the item contains a property that needs to be
extenrally checked, either an indexed one

**Returns:** *boolean*

a boolean on whether it contains such a property or not

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:774](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L774)

___

### getAppliedExclusionState

▸ **getAppliedExclusionState**(`id`: *string*, `version`: *string*): [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)

Provides the applied value for a property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id   |
`version` | *string* | the version   |

**Returns:** [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)

the applied value

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:571](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L571)

___

### getExclusionState

▸ **getExclusionState**(`id`: *string*, `version`: *string*): [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)

Tells whether the current item is excluded

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the given exclusion state slot id   |
`version` | *string* | the version for the given exclusion state slot id   |

**Returns:** [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)

a boolean whether it's excluded or not

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:424](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L424)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`: *string*): *object*

Provides the item definition item locale data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the locale in iso form   |

**Returns:** *object*

Name | Type |
:------ | :------ |
`any_label`? | *string* |
`callout_excluded_label`? | *string* |
`excluded_label`? | *string* |
`exclusion_selector_label`? | *string* |
`exclusion_ternary_selector_label`? | *string* |
`included_label`? | *string* |
`name`? | *string* |

an object or null (if locale not valid)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:757](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L757)

___

### getI18nNameFor

▸ **getI18nNameFor**(`locale`: *string*): *string*

Gives the i18 name that was specified
or otherwise gives the item definition i18 name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the locale iso form   |

**Returns:** *string*

a string or null (if locale not valid)

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:741](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L741)

___

### getId

▸ **getId**(): *string*

Provides the unique id of this item definition
the unique id is, well, unique for this item

**Returns:** *string*

the unique id of the include

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:535](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L535)

___

### getItemDefinition

▸ **getItemDefinition**(): [*default*](base_root_module_itemdefinition.default.md)

Provides the item definition that this include refers to

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

the item definition

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:782](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L782)

___

### getItemDefinitionName

▸ **getItemDefinitionName**(): *string*

Provides the name for this item, the name represents
the item definition children this item is attached to

**Returns:** *string*

a string with the item definition name

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:526](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L526)

___

### getPrefixedQualifiedIdentifier

▸ **getPrefixedQualifiedIdentifier**(): *string*

Provides the qualified identifier for prefixing
other things

**Returns:** *string*

a prefixed string that is the prefixed qualified identifier

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:553](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L553)

___

### getQualifiedExclusionStateIdentifier

▸ **getQualifiedExclusionStateIdentifier**(): *string*

Provides the qualfiied name for the exclusion state

**Returns:** *string*

the string that represents the exclusion identifier

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:561](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L561)

___

### getQualifiedIdentifier

▸ **getQualifiedIdentifier**(): *string*

Provides the qualified identifier of the include
that is an INCLUDE prefixed with the identifier

**Returns:** *string*

a string that is the qualified identifier

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:544](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L544)

___

### getSinkingProperties

▸ **getSinkingProperties**(): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

Provides all the sinking properties as property definition
instances

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

all sinking properties as instances

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:335](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L335)

___

### getSinkingPropertiesIds

▸ **getSinkingPropertiesIds**(): *string*[]

Provides the ids of the sinking properties

**Returns:** *string*[]

an array of the sinking properties ids

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:313](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L313)

___

### getSinkingPropertyFor

▸ **getSinkingPropertyFor**(`id`: *string*): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

Propvides a single sinking property for a given id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the property id   |

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

a single property, if available, otherwise throws an error

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:322](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L322)

___

### getState

▸ **getState**(`id`: *string*, `version`: *string*, `onlySinkingProperties`: *string*[]): *Promise*<[*IIncludeState*](../interfaces/base_root_module_itemdefinition_include.iincludestate.md)\>

Provides the current value of this item

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the stored item definition or module   |
`version` | *string* | the version   |
`onlySinkingProperties` | *string*[] | - |

**Returns:** *Promise*<[*IIncludeState*](../interfaces/base_root_module_itemdefinition_include.iincludestate.md)\>

a promise for the state of the include

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:617](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L617)

___

### getStateNoExternalChecking

▸ **getStateNoExternalChecking**(`id`: *string*, `version`: *string*, `onlySinkingProperties`: *string*[], `emulateExternalChecking?`: *boolean*): [*IIncludeState*](../interfaces/base_root_module_itemdefinition_include.iincludestate.md)

Provides the current value of this item

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the stored item definition or module   |
`version` | *string* | the slot version   |
`onlySinkingProperties` | *string*[] | - |
`emulateExternalChecking?` | *boolean* | whether to emulate the external checking results using previous cached results   |

**Returns:** [*IIncludeState*](../interfaces/base_root_module_itemdefinition_include.iincludestate.md)

the state of the include

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:588](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L588)

___

### isExclusionCallout

▸ **isExclusionCallout**(): *boolean*

Checks whether excluding this item (while possible) will cause
a callout, that is, a clear display that the item definition
instance is missing it, this is for key items, eg. car, wheels missing.

**Returns:** *boolean*

a boolean on whether the exclusion must be called out

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:504](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L504)

___

### isExclusionTernary

▸ **isExclusionTernary**(): *boolean*

Checks whether the exclusion state is a ternary type,
this basically only exists in search item definition items
because it's used during the search mode

**Returns:** *boolean*

a boolean on whether the exclusion is ternary

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:494](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L494)

___

### mergeWithI18n

▸ **mergeWithI18n**(`includeRaw`: [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md)): *void*

Merges the i18n data of another include in another language

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`includeRaw` | [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md) | the include itself    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:790](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L790)

___

### restoreValueFor

▸ **restoreValueFor**(`id`: *string*, `version`: *string*): *void*

restores the include value to the applied value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | the slot version    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:717](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L717)

___

### setExclusionState

▸ **setExclusionState**(`id`: *string*, `version`: *string*, `value`: [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)): *void*

Sets the exclusion state to a new value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the given exclusion state slot id   |
`version` | *string* | the version for the given exclusion state slot id   |
`value` | [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md) | the value for the exclusion state    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:514](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L514)

___

### toJSON

▸ **toJSON**(): [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md)

Basically returns the raw data of this item

**Returns:** [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md)

the json value raw data

Defined in: [base/Root/Module/ItemDefinition/Include/index.ts:765](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/Include/index.ts#L765)
