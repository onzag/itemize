[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/Include](../modules/base_Root_Module_ItemDefinition_Include.md) / default

# Class: default

[base/Root/Module/ItemDefinition/Include](../modules/base_Root_Module_ItemDefinition_Include.md).default

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

- [constructor](base_Root_Module_ItemDefinition_Include.default.md#constructor)

### Properties

- [\_gqlInObj](base_Root_Module_ItemDefinition_Include.default.md#_gqlinobj)
- [\_gqlInObjOpt](base_Root_Module_ItemDefinition_Include.default.md#_gqlinobjopt)
- [\_gqlOutObj](base_Root_Module_ItemDefinition_Include.default.md#_gqloutobj)
- [\_gqlOutObjOpt](base_Root_Module_ItemDefinition_Include.default.md#_gqloutobjopt)
- [canUserExcludeIf](base_Root_Module_ItemDefinition_Include.default.md#canuserexcludeif)
- [defaultExcludedIf](base_Root_Module_ItemDefinition_Include.default.md#defaultexcludedif)
- [enforcedProperties](base_Root_Module_ItemDefinition_Include.default.md#enforcedproperties)
- [excludedIf](base_Root_Module_ItemDefinition_Include.default.md#excludedif)
- [itemDefinition](base_Root_Module_ItemDefinition_Include.default.md#itemdefinition)
- [parentItemDefinition](base_Root_Module_ItemDefinition_Include.default.md#parentitemdefinition)
- [parentModule](base_Root_Module_ItemDefinition_Include.default.md#parentmodule)
- [predefinedProperties](base_Root_Module_ItemDefinition_Include.default.md#predefinedproperties)
- [rawData](base_Root_Module_ItemDefinition_Include.default.md#rawdata)
- [stateExclusion](base_Root_Module_ItemDefinition_Include.default.md#stateexclusion)
- [stateExclusionApplied](base_Root_Module_ItemDefinition_Include.default.md#stateexclusionapplied)
- [stateExclusionHasBeenManuallySet](base_Root_Module_ItemDefinition_Include.default.md#stateexclusionhasbeenmanuallyset)
- [stateExclusionModified](base_Root_Module_ItemDefinition_Include.default.md#stateexclusionmodified)

### Methods

- [applySoftReadRoleAccessTo](base_Root_Module_ItemDefinition_Include.default.md#applysoftreadroleaccessto)
- [applyValue](base_Root_Module_ItemDefinition_Include.default.md#applyvalue)
- [buildFieldsForRoleAccess](base_Root_Module_ItemDefinition_Include.default.md#buildfieldsforroleaccess)
- [canExclusionBeSet](base_Root_Module_ItemDefinition_Include.default.md#canexclusionbeset)
- [checkRoleAccessFor](base_Root_Module_ItemDefinition_Include.default.md#checkroleaccessfor)
- [cleanState](base_Root_Module_ItemDefinition_Include.default.md#cleanstate)
- [cleanValueFor](base_Root_Module_ItemDefinition_Include.default.md#cleanvaluefor)
- [containsAnExternallyCheckedProperty](base_Root_Module_ItemDefinition_Include.default.md#containsanexternallycheckedproperty)
- [getAppliedExclusionState](base_Root_Module_ItemDefinition_Include.default.md#getappliedexclusionstate)
- [getExclusionState](base_Root_Module_ItemDefinition_Include.default.md#getexclusionstate)
- [getI18nDataFor](base_Root_Module_ItemDefinition_Include.default.md#geti18ndatafor)
- [getI18nNameFor](base_Root_Module_ItemDefinition_Include.default.md#geti18nnamefor)
- [getId](base_Root_Module_ItemDefinition_Include.default.md#getid)
- [getItemDefinition](base_Root_Module_ItemDefinition_Include.default.md#getitemdefinition)
- [getItemDefinitionName](base_Root_Module_ItemDefinition_Include.default.md#getitemdefinitionname)
- [getPrefixedQualifiedIdentifier](base_Root_Module_ItemDefinition_Include.default.md#getprefixedqualifiedidentifier)
- [getQualifiedExclusionStateIdentifier](base_Root_Module_ItemDefinition_Include.default.md#getqualifiedexclusionstateidentifier)
- [getQualifiedIdentifier](base_Root_Module_ItemDefinition_Include.default.md#getqualifiedidentifier)
- [getSinkingProperties](base_Root_Module_ItemDefinition_Include.default.md#getsinkingproperties)
- [getSinkingPropertiesIds](base_Root_Module_ItemDefinition_Include.default.md#getsinkingpropertiesids)
- [getSinkingPropertyFor](base_Root_Module_ItemDefinition_Include.default.md#getsinkingpropertyfor)
- [getState](base_Root_Module_ItemDefinition_Include.default.md#getstate)
- [getStateNoExternalChecking](base_Root_Module_ItemDefinition_Include.default.md#getstatenoexternalchecking)
- [isExclusionCallout](base_Root_Module_ItemDefinition_Include.default.md#isexclusioncallout)
- [isExclusionTernary](base_Root_Module_ItemDefinition_Include.default.md#isexclusionternary)
- [mergeWithI18n](base_Root_Module_ItemDefinition_Include.default.md#mergewithi18n)
- [restoreValueFor](base_Root_Module_ItemDefinition_Include.default.md#restorevaluefor)
- [setExclusionState](base_Root_Module_ItemDefinition_Include.default.md#setexclusionstate)
- [toJSON](base_Root_Module_ItemDefinition_Include.default.md#tojson)

## Constructors

### constructor

• **new default**(`rawJSON`, `parentModule`, `parentItemDefinition`)

The constructor for an Include

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawJSON` | [`IIncludeRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md) | the raw data as JSON |
| `parentModule` | [`default`](base_Root_Module.default.md) | the parent module |
| `parentItemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition that this node is located, for example if this include is for a car wheel, and is included in vehicle, this parentItemDefinition would be the vehicle definition |

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:220](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L220)

## Properties

### \_gqlInObj

• **\_gqlInObj**: `any`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:150](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L150)

___

### \_gqlInObjOpt

• **\_gqlInObjOpt**: `any`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:154](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L154)

___

### \_gqlOutObj

• **\_gqlOutObj**: `any`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:152](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L152)

___

### \_gqlOutObjOpt

• **\_gqlOutObjOpt**: `any`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:156](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L156)

___

### canUserExcludeIf

• `Private` `Optional` **canUserExcludeIf**: [`default`](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md)

The allowance of exclusion (compiled)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:169](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L169)

___

### defaultExcludedIf

• `Private` `Optional` **defaultExcludedIf**: [`default`](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md)

The default exclusion state rule (compiled)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:173](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L173)

___

### enforcedProperties

• `Private` `Optional` **enforcedProperties**: [`default`](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md)

Enforced properties (compiled)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:178](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L178)

___

### excludedIf

• `Private` `Optional` **excludedIf**: [`default`](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md)

The excluded if rules (compiled)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:165](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L165)

___

### itemDefinition

• `Private` **itemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

The item definition the include refers to

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:161](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L161)

___

### parentItemDefinition

• **parentItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

The parent item definition of this include

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:142](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L142)

___

### parentModule

• **parentModule**: [`default`](base_Root_Module.default.md)

The parent module where this include sits

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:146](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L146)

___

### predefinedProperties

• `Private` `Optional` **predefinedProperties**: [`default`](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.default.md)

Predefined properties (compiled)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:182](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L182)

___

### rawData

• **rawData**: [`IIncludeRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md)

The raw data that comes from the compiled schema

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:138](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L138)

___

### stateExclusion

• `Private` **stateExclusion**: `Object`

This is the state exclusion of the class, not the defaulted, not
the enforced, but the stateful

#### Index signature

▪ [mergedID: `string`]: [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:188](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L188)

___

### stateExclusionApplied

• `Private` **stateExclusionApplied**: `Object`

The applied exclusion

#### Index signature

▪ [mergedID: `string`]: [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:201](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L201)

___

### stateExclusionHasBeenManuallySet

• `Private` **stateExclusionHasBeenManuallySet**: `Object`

This also shows whether the state has been modified, either
by the user or a value has been applied

#### Index signature

▪ [mergedID: `string`]: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:208](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L208)

___

### stateExclusionModified

• `Private` **stateExclusionModified**: `Object`

This also shows whether the state has been modified, either
by the user or a value has been applied

#### Index signature

▪ [mergedID: `string`]: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:195](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L195)

## Methods

### applySoftReadRoleAccessTo

▸ **applySoftReadRoleAccessTo**(`role`, `userId`, `ownerUserId`, `rolesManager`, `value`): `Promise`<`void`\>

For a given requested graphql value it will
tell which fields need to be filtered for soft
read role access

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |
| `value` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:350](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L350)

___

### applyValue

▸ **applyValue**(`id`, `version`, `value`, `exclusionState`, `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet`): `void`

Applies a value to an include

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id to use |
| `version` | `string` | the slot version to use |
| `value` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the value that is applied |
| `exclusionState` | [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md) | the exclusion state |
| `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet` | `boolean` | to avoid hot updating values when the user is modifying them and an apply value has been called because it has been updated somewhere else, we use this to avoid overriding, note that the value must also not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back to false as it's been used applyValue on it, it's been set now by the computer |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:680](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L680)

___

### buildFieldsForRoleAccess

▸ **buildFieldsForRoleAccess**(`action`, `role`, `userId`, `ownerUserId`, `rolesManager`): `Promise`<[`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md)\>

Builds the fileds as grapqhl fields for a given role that wants to execute a given
action, that will be the maximum fields of the include this user can request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the action that is to be executed |
| `role` | `string` | the role that is executing it |
| `userId` | `string` | the user id of that user |
| `ownerUserId` | `string` | the owner of the item definition where the include is localed |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |

#### Returns

`Promise`<[`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md)\>

a graphql fields object

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:410](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L410)

___

### canExclusionBeSet

▸ **canExclusionBeSet**(`id`, `version`): `boolean`

Tells whether the exclusion state can be toggled externally
This is for when an item might be included
like how a car might have a spare wheel or not usually the
case is true but it might be false as well

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the given exclusion state slot id |
| `version` | `string` | the version for the given exclusion state slot id |

#### Returns

`boolean`

a boolean that tells whether if it can be toggled

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:505](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L505)

___

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`, `role`, `userId`, `ownerUserId`, `requestedFields`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

Checks the role access for a given include to be accessed given a IO action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the action that wants to be executed |
| `role` | `string` | the role of the user wanting to execute that action |
| `userId` | `string` | the user id of the user wanting to execute (can be null) |
| `ownerUserId` | `string` | the owner of the user wanting to execute (or UNSPECIFIED_OWNER) |
| `requestedFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the requested fields that are requested from the include these basically represent the sinking properties where the IO action is being applied |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error in failure |

#### Returns

`Promise`<`boolean`\>

a boolean on whether it has role access

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:381](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L381)

___

### cleanState

▸ **cleanState**(`init?`): `void`

Cleans the state of the include so that is empty and clears
the memory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `init?` | `boolean` | whether it was called in the constructor for initialization |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:277](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L277)

___

### cleanValueFor

▸ **cleanValueFor**(`id`, `version`): `void`

Memory cleans the value in an item

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | the slot version |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:729](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L729)

___

### containsAnExternallyCheckedProperty

▸ **containsAnExternallyCheckedProperty**(): `boolean`

Returns true if the item contains a property that needs to be
extenrally checked, either an indexed one

#### Returns

`boolean`

a boolean on whether it contains such a property or not

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:804](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L804)

___

### getAppliedExclusionState

▸ **getAppliedExclusionState**(`id`, `version`): [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

Provides the applied value for a property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |

#### Returns

[`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

the applied value

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:601](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L601)

___

### getExclusionState

▸ **getExclusionState**(`id`, `version`): [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

Tells whether the current item is excluded

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the given exclusion state slot id |
| `version` | `string` | the version for the given exclusion state slot id |

#### Returns

[`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)

a boolean whether it's excluded or not

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:454](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L454)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`): `Object`

Provides the item definition item locale data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the locale in iso form |

#### Returns

`Object`

an object or null (if locale not valid)

| Name | Type |
| :------ | :------ |
| `any_label?` | `string` |
| `callout_excluded_label?` | `string` |
| `excluded_label?` | `string` |
| `exclusion_selector_label?` | `string` |
| `exclusion_ternary_selector_label?` | `string` |
| `included_label?` | `string` |
| `name?` | `string` |

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:787](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L787)

___

### getI18nNameFor

▸ **getI18nNameFor**(`locale`): `string`

Gives the i18 name that was specified
or otherwise gives the item definition i18 name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the locale iso form |

#### Returns

`string`

a string or null (if locale not valid)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:771](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L771)

___

### getId

▸ **getId**(): `string`

Provides the unique id of this item definition
the unique id is, well, unique for this item

#### Returns

`string`

the unique id of the include

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:565](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L565)

___

### getItemDefinition

▸ **getItemDefinition**(): [`default`](base_Root_Module_ItemDefinition.default.md)

Provides the item definition that this include refers to

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

the item definition

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:812](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L812)

___

### getItemDefinitionName

▸ **getItemDefinitionName**(): `string`

Provides the name for this item, the name represents
the item definition children this item is attached to

#### Returns

`string`

a string with the item definition name

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:556](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L556)

___

### getPrefixedQualifiedIdentifier

▸ **getPrefixedQualifiedIdentifier**(): `string`

Provides the qualified identifier for prefixing
other things

#### Returns

`string`

a prefixed string that is the prefixed qualified identifier

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:583](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L583)

___

### getQualifiedExclusionStateIdentifier

▸ **getQualifiedExclusionStateIdentifier**(): `string`

Provides the qualfiied name for the exclusion state

#### Returns

`string`

the string that represents the exclusion identifier

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:591](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L591)

___

### getQualifiedIdentifier

▸ **getQualifiedIdentifier**(): `string`

Provides the qualified identifier of the include
that is an INCLUDE prefixed with the identifier

#### Returns

`string`

a string that is the qualified identifier

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:574](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L574)

___

### getSinkingProperties

▸ **getSinkingProperties**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all the sinking properties as property definition
instances

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

all sinking properties as instances

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:335](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L335)

___

### getSinkingPropertiesIds

▸ **getSinkingPropertiesIds**(): `string`[]

Provides the ids of the sinking properties

#### Returns

`string`[]

an array of the sinking properties ids

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:313](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L313)

___

### getSinkingPropertyFor

▸ **getSinkingPropertyFor**(`id`): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

Propvides a single sinking property for a given id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the property id |

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

a single property, if available, otherwise throws an error

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:322](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L322)

___

### getState

▸ **getState**(`id`, `version`, `onlySinkingProperties`): `Promise`<[`IIncludeState`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeState.md)\>

Provides the current value of this item

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the stored item definition or module |
| `version` | `string` | the version |
| `onlySinkingProperties` | `string`[] | - |

#### Returns

`Promise`<[`IIncludeState`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeState.md)\>

a promise for the state of the include

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:647](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L647)

___

### getStateNoExternalChecking

▸ **getStateNoExternalChecking**(`id`, `version`, `onlySinkingProperties`, `emulateExternalChecking?`): [`IIncludeState`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeState.md)

Provides the current value of this item

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the stored item definition or module |
| `version` | `string` | the slot version |
| `onlySinkingProperties` | `string`[] | - |
| `emulateExternalChecking?` | `boolean` | whether to emulate the external checking results using previous cached results |

#### Returns

[`IIncludeState`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeState.md)

the state of the include

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:618](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L618)

___

### isExclusionCallout

▸ **isExclusionCallout**(): `boolean`

Checks whether excluding this item (while possible) will cause
a callout, that is, a clear display that the item definition
instance is missing it, this is for key items, eg. car, wheels missing.

#### Returns

`boolean`

a boolean on whether the exclusion must be called out

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:534](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L534)

___

### isExclusionTernary

▸ **isExclusionTernary**(): `boolean`

Checks whether the exclusion state is a ternary type,
this basically only exists in search item definition items
because it's used during the search mode

#### Returns

`boolean`

a boolean on whether the exclusion is ternary

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:524](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L524)

___

### mergeWithI18n

▸ **mergeWithI18n**(`includeRaw`): `void`

Merges the i18n data of another include in another language

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `includeRaw` | [`IIncludeRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md) | the include itself |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:820](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L820)

___

### restoreValueFor

▸ **restoreValueFor**(`id`, `version`): `void`

restores the include value to the applied value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | the slot version |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:747](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L747)

___

### setExclusionState

▸ **setExclusionState**(`id`, `version`, `value`): `void`

Sets the exclusion state to a new value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the given exclusion state slot id |
| `version` | `string` | the version for the given exclusion state slot id |
| `value` | [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md) | the value for the exclusion state |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:544](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L544)

___

### toJSON

▸ **toJSON**(): [`IIncludeRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md)

Basically returns the raw data of this item

#### Returns

[`IIncludeRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md)

the json value raw data

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:795](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/Include/index.ts#L795)
