[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / default

# Class: default

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).default

This is the max expression, the item definition class
which basically compounds all how this is defined

## Table of contents

### Constructors

- [constructor](base_Root_Module_ItemDefinition.default.md#constructor)

### Properties

- [\_gqlObj](base_Root_Module_ItemDefinition.default.md#_gqlobj)
- [\_gqlQueryObj](base_Root_Module_ItemDefinition.default.md#_gqlqueryobj)
- [childDefinitions](base_Root_Module_ItemDefinition.default.md#childdefinitions)
- [cleansBlocked](base_Root_Module_ItemDefinition.default.md#cleansblocked)
- [extensionsInstance](base_Root_Module_ItemDefinition.default.md#extensionsinstance)
- [importedChildDefinitions](base_Root_Module_ItemDefinition.default.md#importedchilddefinitions)
- [includeInstances](base_Root_Module_ItemDefinition.default.md#includeinstances)
- [lastListenerCallId](base_Root_Module_ItemDefinition.default.md#lastlistenercallid)
- [listeners](base_Root_Module_ItemDefinition.default.md#listeners)
- [originatingInstance](base_Root_Module_ItemDefinition.default.md#originatinginstance)
- [parentItemDefinition](base_Root_Module_ItemDefinition.default.md#parentitemdefinition)
- [parentModule](base_Root_Module_ItemDefinition.default.md#parentmodule)
- [policyPropertyDefinitions](base_Root_Module_ItemDefinition.default.md#policypropertydefinitions)
- [propertyDefinitions](base_Root_Module_ItemDefinition.default.md#propertydefinitions)
- [rawData](base_Root_Module_ItemDefinition.default.md#rawdata)
- [stateGQLAppliedValue](base_Root_Module_ItemDefinition.default.md#stategqlappliedvalue)
- [stateHasAppliedValueTo](base_Root_Module_ItemDefinition.default.md#statehasappliedvalueto)
- [stateSearch](base_Root_Module_ItemDefinition.default.md#statesearch)

### Methods

- [addBlockCleanFor](base_Root_Module_ItemDefinition.default.md#addblockcleanfor)
- [addListener](base_Root_Module_ItemDefinition.default.md#addlistener)
- [applySoftReadRoleAccessTo](base_Root_Module_ItemDefinition.default.md#applysoftreadroleaccessto)
- [applyState](base_Root_Module_ItemDefinition.default.md#applystate)
- [applyStateFromPackage](base_Root_Module_ItemDefinition.default.md#applystatefrompackage)
- [applyValue](base_Root_Module_ItemDefinition.default.md#applyvalue)
- [buildFieldsForRoleAccess](base_Root_Module_ItemDefinition.default.md#buildfieldsforroleaccess)
- [checkCanBeParentedBy](base_Root_Module_ItemDefinition.default.md#checkcanbeparentedby)
- [checkRoleAccessFor](base_Root_Module_ItemDefinition.default.md#checkroleaccessfor)
- [checkRoleAccessForModeration](base_Root_Module_ItemDefinition.default.md#checkroleaccessformoderation)
- [checkRoleAccessForParenting](base_Root_Module_ItemDefinition.default.md#checkroleaccessforparenting)
- [checkRoleCanCreateInBehalf](base_Root_Module_ItemDefinition.default.md#checkrolecancreateinbehalf)
- [checkRoleCanCustomId](base_Root_Module_ItemDefinition.default.md#checkrolecancustomid)
- [checkRoleCanReadOwner](base_Root_Module_ItemDefinition.default.md#checkrolecanreadowner)
- [checkRoleCanVersion](base_Root_Module_ItemDefinition.default.md#checkrolecanversion)
- [cleanSearchState](base_Root_Module_ItemDefinition.default.md#cleansearchstate)
- [cleanState](base_Root_Module_ItemDefinition.default.md#cleanstate)
- [cleanValueFor](base_Root_Module_ItemDefinition.default.md#cleanvaluefor)
- [containsAnExternallyCheckedProperty](base_Root_Module_ItemDefinition.default.md#containsanexternallycheckedproperty)
- [doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull](base_Root_Module_ItemDefinition.default.md#doesapplyingpropertyonlyapplieswhencurrentisnonnull)
- [getAbsolutePath](base_Root_Module_ItemDefinition.default.md#getabsolutepath)
- [getAllIncludes](base_Root_Module_ItemDefinition.default.md#getallincludes)
- [getAllPropertyDefinitions](base_Root_Module_ItemDefinition.default.md#getallpropertydefinitions)
- [getAllPropertyDefinitionsAndExtensions](base_Root_Module_ItemDefinition.default.md#getallpropertydefinitionsandextensions)
- [getAllSideEffectedProperties](base_Root_Module_ItemDefinition.default.md#getallsideeffectedproperties)
- [getAppliedValueOwnerIfAny](base_Root_Module_ItemDefinition.default.md#getappliedvalueownerifany)
- [getApplyingIncludeIdsForPolicy](base_Root_Module_ItemDefinition.default.md#getapplyingincludeidsforpolicy)
- [getApplyingPropertyIdsForPolicy](base_Root_Module_ItemDefinition.default.md#getapplyingpropertyidsforpolicy)
- [getChildDefinitions](base_Root_Module_ItemDefinition.default.md#getchilddefinitions)
- [getChildDefinitionsRecursive](base_Root_Module_ItemDefinition.default.md#getchilddefinitionsrecursive)
- [getDirectlyAvailableItemDefinitionInContextFor](base_Root_Module_ItemDefinition.default.md#getdirectlyavailableitemdefinitionincontextfor)
- [getGQLAppliedValue](base_Root_Module_ItemDefinition.default.md#getgqlappliedvalue)
- [getI18nDataFor](base_Root_Module_ItemDefinition.default.md#geti18ndatafor)
- [getImportedChildDefinitions](base_Root_Module_ItemDefinition.default.md#getimportedchilddefinitions)
- [getIncludeFor](base_Root_Module_ItemDefinition.default.md#getincludefor)
- [getItemDefinitionRawFor](base_Root_Module_ItemDefinition.default.md#getitemdefinitionrawfor)
- [getModuleName](base_Root_Module_ItemDefinition.default.md#getmodulename)
- [getModuleTableName](base_Root_Module_ItemDefinition.default.md#getmoduletablename)
- [getName](base_Root_Module_ItemDefinition.default.md#getname)
- [getNewInstance](base_Root_Module_ItemDefinition.default.md#getnewinstance)
- [getParentItemDefinition](base_Root_Module_ItemDefinition.default.md#getparentitemdefinition)
- [getParentModule](base_Root_Module_ItemDefinition.default.md#getparentmodule)
- [getParentingMaxChildCountAnyType](base_Root_Module_ItemDefinition.default.md#getparentingmaxchildcountanytype)
- [getParentingMaxChildCountSameType](base_Root_Module_ItemDefinition.default.md#getparentingmaxchildcountsametype)
- [getParentingRule](base_Root_Module_ItemDefinition.default.md#getparentingrule)
- [getPath](base_Root_Module_ItemDefinition.default.md#getpath)
- [getPolicyNamesFor](base_Root_Module_ItemDefinition.default.md#getpolicynamesfor)
- [getPropertiesForPolicy](base_Root_Module_ItemDefinition.default.md#getpropertiesforpolicy)
- [getPropertyDefinitionFor](base_Root_Module_ItemDefinition.default.md#getpropertydefinitionfor)
- [getPropertyDefinitionForPolicy](base_Root_Module_ItemDefinition.default.md#getpropertydefinitionforpolicy)
- [getQualifiedPathName](base_Root_Module_ItemDefinition.default.md#getqualifiedpathname)
- [getQualifiedPolicyIdentifier](base_Root_Module_ItemDefinition.default.md#getqualifiedpolicyidentifier)
- [getRequestLimiters](base_Root_Module_ItemDefinition.default.md#getrequestlimiters)
- [getRolesForCustomId](base_Root_Module_ItemDefinition.default.md#getrolesforcustomid)
- [getRolesForPolicy](base_Root_Module_ItemDefinition.default.md#getrolesforpolicy)
- [getRolesForVersioning](base_Root_Module_ItemDefinition.default.md#getrolesforversioning)
- [getRolesWithAccessTo](base_Root_Module_ItemDefinition.default.md#getroleswithaccessto)
- [getRolesWithModerationAccess](base_Root_Module_ItemDefinition.default.md#getroleswithmoderationaccess)
- [getRolesWithReadOwnerAccess](base_Root_Module_ItemDefinition.default.md#getroleswithreadowneraccess)
- [getRolesWithSearchAccess](base_Root_Module_ItemDefinition.default.md#getroleswithsearchaccess)
- [getSearchEngineDynamicMainLanguageColumn](base_Root_Module_ItemDefinition.default.md#getsearchenginedynamicmainlanguagecolumn)
- [getSearchEngineFallbackLanguage](base_Root_Module_ItemDefinition.default.md#getsearchenginefallbacklanguage)
- [getSearchEngineMainLanguageFromRow](base_Root_Module_ItemDefinition.default.md#getsearchenginemainlanguagefromrow)
- [getSearchModeCounterpart](base_Root_Module_ItemDefinition.default.md#getsearchmodecounterpart)
- [getSearchState](base_Root_Module_ItemDefinition.default.md#getsearchstate)
- [getStandardCounterpart](base_Root_Module_ItemDefinition.default.md#getstandardcounterpart)
- [getState](base_Root_Module_ItemDefinition.default.md#getstate)
- [getStateNoExternalChecking](base_Root_Module_ItemDefinition.default.md#getstatenoexternalchecking)
- [getStatePackage](base_Root_Module_ItemDefinition.default.md#getstatepackage)
- [getTableName](base_Root_Module_ItemDefinition.default.md#gettablename)
- [hasAnActiveIncludeInstanceOfId](base_Root_Module_ItemDefinition.default.md#hasanactiveincludeinstanceofid)
- [hasAppliedValueTo](base_Root_Module_ItemDefinition.default.md#hasappliedvalueto)
- [hasAtLeastOneActiveInstanceOf](base_Root_Module_ItemDefinition.default.md#hasatleastoneactiveinstanceof)
- [hasBlockCleanFor](base_Root_Module_ItemDefinition.default.md#hasblockcleanfor)
- [hasIncludeFor](base_Root_Module_ItemDefinition.default.md#hasincludefor)
- [hasItemDefinitionFor](base_Root_Module_ItemDefinition.default.md#hasitemdefinitionfor)
- [hasParentItemDefinition](base_Root_Module_ItemDefinition.default.md#hasparentitemdefinition)
- [hasPropertyDefinitionFor](base_Root_Module_ItemDefinition.default.md#haspropertydefinitionfor)
- [init](base_Root_Module_ItemDefinition.default.md#init)
- [isExtensionsInstance](base_Root_Module_ItemDefinition.default.md#isextensionsinstance)
- [isInSearchMode](base_Root_Module_ItemDefinition.default.md#isinsearchmode)
- [isOwnerObjectId](base_Root_Module_ItemDefinition.default.md#isownerobjectid)
- [isPropertyInSearchModeOnly](base_Root_Module_ItemDefinition.default.md#ispropertyinsearchmodeonly)
- [isReparentingEnabled](base_Root_Module_ItemDefinition.default.md#isreparentingenabled)
- [isSearchEngineDynamicMainLanguageColumnInModule](base_Root_Module_ItemDefinition.default.md#issearchenginedynamicmainlanguagecolumninmodule)
- [isSearchEngineEnabled](base_Root_Module_ItemDefinition.default.md#issearchengineenabled)
- [isSearchable](base_Root_Module_ItemDefinition.default.md#issearchable)
- [isValidVersion](base_Root_Module_ItemDefinition.default.md#isvalidversion)
- [isVersioned](base_Root_Module_ItemDefinition.default.md#isversioned)
- [mergeWithI18n](base_Root_Module_ItemDefinition.default.md#mergewithi18n)
- [mustBeParented](base_Root_Module_ItemDefinition.default.md#mustbeparented)
- [removeBlockCleanFor](base_Root_Module_ItemDefinition.default.md#removeblockcleanfor)
- [removeListener](base_Root_Module_ItemDefinition.default.md#removelistener)
- [restoreValueFor](base_Root_Module_ItemDefinition.default.md#restorevaluefor)
- [setAsExtensionsInstance](base_Root_Module_ItemDefinition.default.md#setasextensionsinstance)
- [setSearchState](base_Root_Module_ItemDefinition.default.md#setsearchstate)
- [toJSON](base_Root_Module_ItemDefinition.default.md#tojson)
- [triggerListeners](base_Root_Module_ItemDefinition.default.md#triggerlisteners)
- [getItemDefinitionRawFor](base_Root_Module_ItemDefinition.default.md#getitemdefinitionrawfor)
- [getPropertyDefinitionRawFor](base_Root_Module_ItemDefinition.default.md#getpropertydefinitionrawfor)
- [getSerializableState](base_Root_Module_ItemDefinition.default.md#getserializablestate)
- [getSerializableStateWithFiles](base_Root_Module_ItemDefinition.default.md#getserializablestatewithfiles)

## Constructors

### constructor

• **new default**(`rawJSON`, `parentModule`, `parentItemDefinition`, `originatingInstance?`)

Build a new ItemDefinition instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawJSON` | [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md) | the raw json form |
| `parentModule` | [`default`](base_Root_Module.default.md) | the parent module instance |
| `parentItemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the parent item definition (or null) |
| `originatingInstance?` | [`default`](base_Root_Module_ItemDefinition.default.md) | an originating instance (for instantiated detached instances) |

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:826](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L826)

## Properties

### \_gqlObj

• **\_gqlObj**: `GraphQLOutputType`

A cached graphql object

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:726](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L726)

___

### \_gqlQueryObj

• **\_gqlQueryObj**: `GraphQLObjectType`<`any`, `any`, { [key: string]: `any`;  }\>

A cached graphql query object

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:731](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L731)

___

### childDefinitions

• `Private` **childDefinitions**: [`default`](base_Root_Module_ItemDefinition.default.md)[]

The child definitions the item definition contains

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:740](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L740)

___

### cleansBlocked

• `Private` **cleansBlocked**: `Object`

The cleans being blocked and by whom

#### Index signature

▪ [mergedId: `string`]: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:815](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L815)

___

### extensionsInstance

• `Private` **extensionsInstance**: `boolean` = `false`

whether this instance is for prop extensions in the module
that is an emulated item definition that only contains
the prop extensions and is generated in the module

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:777](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L777)

___

### importedChildDefinitions

• `Private` **importedChildDefinitions**: { `definition`: [`default`](base_Root_Module_ItemDefinition.default.md) ; `fullName`: `string`  }[]

Imported definitions that are included in the
raw data using the import mechanism, this is the
compiled form

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:746](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L746)

___

### includeInstances

• `Private` **includeInstances**: [`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

The include instances compiled from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:736](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L736)

___

### lastListenerCallId

• `Private` **lastListenerCallId**: `string` = `""`

Events are triggered accross the tree, so this ensures that the event
doesn't trigger twice and creates a forever loop

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:792](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L792)

___

### listeners

• `Private` **listeners**: `Object`

Listeners are simple callbacks that are added and operate within
the item definition, usually added for UI level functionality

#### Index signature

▪ [event: `string`]: { [mergedID: string]: [`ListenerType`](../modules/base_Root_Module.md#listenertype)[];  }

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:783](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L783)

___

### originatingInstance

• `Private` **originatingInstance**: [`default`](base_Root_Module_ItemDefinition.default.md)

The originating instance exists only if the current
item definition was instantiated from another and detached from
the tree, this is the tree instance it came from

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:771](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L771)

___

### parentItemDefinition

• `Private` **parentItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

A parent item definition or null

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:765](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L765)

___

### parentModule

• `Private` **parentModule**: [`default`](base_Root_Module.default.md)

The parent module

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:761](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L761)

___

### policyPropertyDefinitions

• `Private` **policyPropertyDefinitions**: [`IPoliciesType`](../interfaces/base_Root_Module_ItemDefinition.IPoliciesType.md)

All the policies within the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:757](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L757)

___

### propertyDefinitions

• `Private` **propertyDefinitions**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

All the properties within the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:753](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L753)

___

### rawData

• **rawData**: [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

The raw data of the item definition as it was
compiled

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:721](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L721)

___

### stateGQLAppliedValue

• `Private` **stateGQLAppliedValue**: `Object`

Contains the information about the specific applied value to an slot

#### Index signature

▪ [mergedID: `string`]: [`IItemDefinitionGQLValueType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionGQLValueType.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:803](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L803)

___

### stateHasAppliedValueTo

• `Private` **stateHasAppliedValueTo**: `Object`

Containst state information about applied values to slots

#### Index signature

▪ [mergedID: `string`]: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:797](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L797)

___

### stateSearch

• `Private` **stateSearch**: `Object`

The internal state

#### Index signature

▪ [mergedID: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:809](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L809)

## Methods

### addBlockCleanFor

▸ **addBlockCleanFor**(`id`, `version`, `blockId`): `void`

Forces an item definition to be unable to clean its value
from memory, and rather perform a restoration to the original
value when requested to do so, use removeBlockCleanFor in order
to release this blockage, this blockage is used by the UI threads
in order to tell another UI component that it expects to use that
value so please avoid cleaning it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `blockId` | `string` | the block identifier |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1849](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1849)

___

### addListener

▸ **addListener**(`event`, `id`, `version`, `listener`): `void`

Adds a listener for an string event and id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | the event string |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `listener` | [`ListenerType`](../modules/base_Root_Module.md#listenertype) | the listener |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2878](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2878)

___

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

[base/Root/Module/ItemDefinition/index.ts:2161](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2161)

___

### applyState

▸ **applyState**(`id`, `version`, `state`, `specificProperties?`, `specificIncludes?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `state` | [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md) |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1616](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1616)

___

### applyStateFromPackage

▸ **applyStateFromPackage**(`id`, `version`, `state`, `specificProperties?`, `specificIncludes?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `state` | `Blob` \| `File` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1660](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1660)

___

### applyValue

▸ **applyValue**(`id`, `version`, `value`, `excludeExtensions`, `requestFields`, `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet`, `forceApply?`): `boolean`

Applies a value from graphql to the item definition state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id that this state is for (can be null) |
| `version` | `string` | the version of this state is for (can be null) |
| `value` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the value itself from graphql, DATA values and flattened values are valid. |
| `excludeExtensions` | `boolean` | whether to exclude the extensions for applying the value |
| `requestFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the fields that were used to request this data (can be null) but be careful this might be used for catching |
| `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet` | `boolean` | to avoid hot updating values when the user is modifying them and an apply value has been called because it has been updated somewhere else, we use this to avoid overriding, note that the value must also not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back to false as it's been used applyValue on it, it's been set now by the computer |
| `forceApply?` | `boolean` | will always apply and not perform the signature check |

#### Returns

`boolean`

a boolean on whether the action was performed, sometimes the value will not be applied
because there already exists a better one already stored for the same last modified value which contains
more fields

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1689](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1689)

___

### buildFieldsForRoleAccess

▸ **buildFieldsForRoleAccess**(`action`, `role`, `userId`, `ownerUserId`, `rolesManager`): `Promise`<[`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md)\>

Returns the FLATTENED fields for the graphql request

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |

#### Returns

`Promise`<[`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md)\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2095](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2095)

___

### checkCanBeParentedBy

▸ **checkCanBeParentedBy**(`parentItemDefinition`, `throwError`): `boolean`

Given an item definition checks if this item definition allows itself to be parented
by it, that means the current item definition will be the children

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentItemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the expected parent |
| `throwError` | `boolean` | whether to throw an error if failed |

#### Returns

`boolean`

a boolean on whether the item definition is an allowed parent

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2608](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2608)

___

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`, `role`, `userId`, `ownerUserId`, `requestedFields`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

Checks the role access for an action in an item
defintition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the IO action |
| `role` | `string` | the role of the user attempting the action |
| `userId` | `string` | the user id of the user attempting the action |
| `ownerUserId` | `string` | the owner of that item definition |
| `requestedFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the requested fields (single properties will be checked as well) |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error if failed (otherwise returns a boolean) |

#### Returns

`Promise`<`boolean`\>

a boolean on whether the user is allowed

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2249](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2249)

___

### checkRoleAccessForModeration

▸ **checkRoleAccessForModeration**(`role`, `userId`, `ownerUserId`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |
| `throwError` | `boolean` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2203](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2203)

___

### checkRoleAccessForParenting

▸ **checkRoleAccessForParenting**(`role`, `userId`, `parentOwnerUserId`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

Checks whether the current user, has access to create an item and parent it
according to his role

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `role` | `string` | the role of the user |
| `userId` | `string` | the user id |
| `parentOwnerUserId` | `string` | the parent owner user id of the item this user is trying to parent |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error |

#### Returns

`Promise`<`boolean`\>

a boolean on whether parenting is allowed

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2656](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2656)

___

### checkRoleCanCreateInBehalf

▸ **checkRoleCanCreateInBehalf**(`role`, `targetRole`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

Tells whether the object can be created in behalf of another user
rather than the user itself, this is incompatible with
ownerIsObjectId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `role` | `string` |  |
| `targetRole` | `string` | - |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error if failed (otherwise returns a boolean) |

#### Returns

`Promise`<`boolean`\>

a boolean on whether the user is allowed

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2358](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2358)

___

### checkRoleCanCustomId

▸ **checkRoleCanCustomId**(`role`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

Checks whether a given role can provide a custom id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `role` | `string` | the role of the user |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error in case of failure |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2499](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2499)

___

### checkRoleCanReadOwner

▸ **checkRoleCanReadOwner**(`role`, `userId`, `ownerUserId`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

Checks whether a given role can read the owner of a given item

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `role` | `string` | the role of the user |
| `userId` | `string` | the user id of that user |
| `ownerUserId` | `string` | the owner of the current unversioned value |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error in case of failure |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2537](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2537)

___

### checkRoleCanVersion

▸ **checkRoleCanVersion**(`role`, `userId`, `ownerUserId`, `rolesManager`, `throwError`): `Promise`<`boolean`\>

Checks whether a given role can version an item resources

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `role` | `string` | the role of the user |
| `userId` | `string` | the user id of that user |
| `ownerUserId` | `string` | the owner of the current unversioned value |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error in case of failure |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2436](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2436)

___

### cleanSearchState

▸ **cleanSearchState**(`id`, `version`): `void`

Clears the internal state

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1974](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1974)

___

### cleanState

▸ **cleanState**(`init?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `init?` | `boolean` |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:876](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L876)

___

### cleanValueFor

▸ **cleanValueFor**(`id`, `version`, `excludeExtensions?`, `force?`): `boolean`

Wipes down a value and its state and everything out of memory
this might not be important in the client side but very important
in the server side, not cleaning the memory can become a memory leak

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the state |
| `version` | `string` | the version of the state |
| `excludeExtensions?` | `boolean` | whether to include the extensions of the parent |
| `force?` | `boolean` | ignores the blockage, will clean anyway |

#### Returns

`boolean`

a boolean where true refers to whether it was cleaned and false it was restored
because the cleaning was blocked from performing

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1905](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1905)

___

### containsAnExternallyCheckedProperty

▸ **containsAnExternallyCheckedProperty**(`onlyCheckProperties?`, `ignoreIncludes?`): `boolean`

Returns true is one of the property has to be externally checked
either by database or rest endpoints, this is basically unique
values

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onlyCheckProperties?` | `string`[] | only to check the properties in this list |
| `ignoreIncludes?` | `boolean` | whether to ignore the sinked in properties in the includes |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2757](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2757)

___

### doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull

▸ **doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull**(`type`, `name`): `boolean`

Tells whether the list of applying properties only applies when going from a non null
value to a new value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the policy type |
| `name` | `string` | the policy name |

#### Returns

`boolean`

a boolean value

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2846](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2846)

___

### getAbsolutePath

▸ **getAbsolutePath**(): `string`[]

Provides the absolute path all the way
from the root

#### Returns

`string`[]

an array of string that represents
the whole absolute path from the root

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2734](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2734)

___

### getAllIncludes

▸ **getAllIncludes**(): [`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

Provides all the item instances

#### Returns

[`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

an include array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1219](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1219)

___

### getAllPropertyDefinitions

▸ **getAllPropertyDefinitions**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all the property definitions without
including the extensions

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

a property definiton array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1195](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1195)

___

### getAllPropertyDefinitionsAndExtensions

▸ **getAllPropertyDefinitionsAndExtensions**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all that property defintiions
including the extensions

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

a property definition array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1204](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1204)

___

### getAllSideEffectedProperties

▸ **getAllSideEffectedProperties**(`pre?`): { `include`: [`default`](base_Root_Module_ItemDefinition_Include.default.md) ; `property`: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)  }[]

Provides all the properties that hold a side effect into them

#### Parameters

| Name | Type |
| :------ | :------ |
| `pre?` | `boolean` |

#### Returns

{ `include`: [`default`](base_Root_Module_ItemDefinition_Include.default.md) ; `property`: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)  }[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3079](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L3079)

___

### getAppliedValueOwnerIfAny

▸ **getAppliedValueOwnerIfAny**(`id`, `version`): `string`

Provides the owner that applied the value for the
applied value, basically the created_by value
(or id if owner is object id, which is only relevant for users honestly)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the state |
| `version` | `string` | the version of the slot |

#### Returns

`string`

a string, will return UNSPECIFIED_OWNER if it cannot find anything

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1821](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1821)

___

### getApplyingIncludeIdsForPolicy

▸ **getApplyingIncludeIdsForPolicy**(`type`, `name`): `string`[]

Provides all the include ids that are affected by the given policy

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the policy type "edit", "delete", "read" or "parent" |
| `name` | `string` | the policy name |

#### Returns

`string`[]

an array of string or null (if no applying includes)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2857](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2857)

___

### getApplyingPropertyIdsForPolicy

▸ **getApplyingPropertyIdsForPolicy**(`type`, `name`): `string`[]

Provides all the property ids that are affected by a given policy

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the policy type "edit", "delete", "read" or "parent" |
| `name` | `string` | the policy name |

#### Returns

`string`[]

an array of string or null (if no applying properties)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2834](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2834)

___

### getChildDefinitions

▸ **getChildDefinitions**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live child definitions
without imports

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1393](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1393)

___

### getChildDefinitionsRecursive

▸ **getChildDefinitionsRecursive**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live child definitions
without imports, recursively

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1402](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1402)

___

### getDirectlyAvailableItemDefinitionInContextFor

▸ **getDirectlyAvailableItemDefinitionInContextFor**(`name`, `avoidImports?`): [`default`](base_Root_Module_ItemDefinition.default.md)

Gets a live item definition for the current item definition
either as a children or a detached instance that came from
another item definition as an import

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the item definition |
| `avoidImports?` | `boolean` | whether to avoid imported items |

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

an item definition, will throw an error if not found

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1100](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1100)

___

### getGQLAppliedValue

▸ **getGQLAppliedValue**(`id`, `version`): [`IItemDefinitionGQLValueType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionGQLValueType.md)

Provides the applied value for the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |

#### Returns

[`IItemDefinitionGQLValueType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionGQLValueType.md)

the applied value structure

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1985](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1985)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`): [`IRawJsonI18NSpecificLocaleDataType`](../interfaces/base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md)

Provides the item definition item locale data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the locale in iso form |

#### Returns

[`IRawJsonI18NSpecificLocaleDataType`](../interfaces/base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md)

an object or null (if locale not valid)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1434](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1434)

___

### getImportedChildDefinitions

▸ **getImportedChildDefinitions**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live imported child definitions

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1414](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1414)

___

### getIncludeFor

▸ **getIncludeFor**(`id`): [`default`](base_Root_Module_ItemDefinition_Include.default.md)

provides an include within this item defintion that has that
specific id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the include |

#### Returns

[`default`](base_Root_Module_ItemDefinition_Include.default.md)

the include if any, would throw an error if not found

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1156](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1156)

___

### getItemDefinitionRawFor

▸ **getItemDefinitionRawFor**(`name`, `avoidImports?`): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

Provides a raw json item definition that it has a children

**`throws`** an error if the item definition does not exist

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the item definition |
| `avoidImports?` | `boolean` | optional whether to avoid imported item definitions |

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

a raw item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1171](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1171)

___

### getModuleName

▸ **getModuleName**(): `string`

Provides the module name that contains this item definition

#### Returns

`string`

a string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1055](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1055)

___

### getModuleTableName

▸ **getModuleTableName**(): `string`

An utility function that returns the name of the
table that is used for the module

#### Returns

`string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2798](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2798)

___

### getName

▸ **getName**(): `string`

provides the raw name of the item definition

#### Returns

`string`

the name as a string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1047](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1047)

___

### getNewInstance

▸ **getNewInstance**(): [`default`](base_Root_Module_ItemDefinition.default.md)

Uses the raw data to instantiate a new instance of
the item definition, uses the same on state change
function for state changes so it remains linked to the
module

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

a new ItemDefiniton instance

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1425](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1425)

___

### getParentItemDefinition

▸ **getParentItemDefinition**(): [`default`](base_Root_Module_ItemDefinition.default.md)

Provides the parent item definition

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

an item definition or throws an error if no such a thing

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1380](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1380)

___

### getParentModule

▸ **getParentModule**(): [`default`](base_Root_Module.default.md)

Just gives the parent module

#### Returns

[`default`](base_Root_Module.default.md)

a module instance

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1364](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1364)

___

### getParentingMaxChildCountAnyType

▸ **getParentingMaxChildCountAnyType**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2597](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2597)

___

### getParentingMaxChildCountSameType

▸ **getParentingMaxChildCountSameType**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2593](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2593)

___

### getParentingRule

▸ **getParentingRule**(): ``"ONCE"`` \| ``"ONCE_PER_OWNER"`` \| ``"MANY"``

#### Returns

``"ONCE"`` \| ``"ONCE_PER_OWNER"`` \| ``"MANY"``

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2589](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2589)

___

### getPath

▸ **getPath**(): `string`[]

Provides the path from the module
base, that is not absolute but a relative
path from the parent module

#### Returns

`string`[]

an array of string that represent
the path concatenated all the way to the module path to the root

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2717](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2717)

___

### getPolicyNamesFor

▸ **getPolicyNamesFor**(`policyType`): `string`[]

Provides all policy names included in the policy of type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `policyType` | `string` | the policy type, "edit", "read", "delete" or "parent" |

#### Returns

`string`[]

an array with strings of policy names

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2807](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2807)

___

### getPropertiesForPolicy

▸ **getPropertiesForPolicy**(`type`, `name`): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all live properties for a policy, these properties
are detached properties, new instances of the old property and hold
their own states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the type "edit", "delete", "read" or "parent" |
| `name` | `string` | the policy name that was set |

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

an array of properties

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2822](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2822)

___

### getPropertyDefinitionFor

▸ **getPropertyDefinitionFor**(`id`, `includeExtensions`): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

Provides a live property definition for an item definition
this property definition can trigger state changes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the property definition id |
| `includeExtensions` | `boolean` | whether to include extensions or not |

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

a property definition or throws an error if not found

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1246](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1246)

___

### getPropertyDefinitionForPolicy

▸ **getPropertyDefinitionForPolicy**(`policyType`, `policyName`, `id`): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

Provides a property definition based on a policy
this is a unique instance that holds its own state
and it's reflected in the item definition state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `policyType` | `string` | the policy type |
| `policyName` | `string` | the policy name |
| `id` | `string` | the property id |

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

a property definition or throws an error if not found

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1282](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1282)

___

### getQualifiedPathName

▸ **getQualifiedPathName**(): `string`

Provides the qualified path name
of this item definition, which is unique for
this root instance

#### Returns

`string`

the very useful qualified path name

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2779](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2779)

___

### getQualifiedPolicyIdentifier

▸ **getQualifiedPolicyIdentifier**(`policyType`, `policyName`, `id`): `string`

Provides the qualified identifier for a given policy as it is described

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `policyType` | `string` | the policy type |
| `policyName` | `string` | the policy name |
| `id` | `string` | the property id |

#### Returns

`string`

a property definition or throws an error if not found

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1307](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1307)

___

### getRequestLimiters

▸ **getRequestLimiters**(): [`IRequestLimitersType`](../interfaces/base_Root.IRequestLimitersType.md)

Provides the item definition and only the item definition request limiters

#### Returns

[`IRequestLimitersType`](../interfaces/base_Root.IRequestLimitersType.md)

the request limiters object or null

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:952](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L952)

___

### getRolesForCustomId

▸ **getRolesForCustomId**(): `string`[]

Provides the roles that are allowed custom ids

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2487](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2487)

___

### getRolesForPolicy

▸ **getRolesForPolicy**(`type`, `name`): `string`[]

Provides all the roles that are affected by a policy

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the policy type "edit", "delete", "read" or "parent" |
| `name` | `string` | the policy name |

#### Returns

`string`[]

an array of string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2867](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2867)

___

### getRolesForVersioning

▸ **getRolesForVersioning**(): `string`[]

Provides the roles that are allowed versioning

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2422](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2422)

___

### getRolesWithAccessTo

▸ **getRolesWithAccessTo**(`action`): `string`[]

Provides the roles that have access to a given
action based on the rules that were set

**`retuns`** an array of string that represent the roles

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the action from the ItemDefinitionIOActions |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2060](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2060)

___

### getRolesWithModerationAccess

▸ **getRolesWithModerationAccess**(): `string`[]

Provides the roles that have moderation access to
the moderation fileds for a given item definition
given its module rule

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2084](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2084)

___

### getRolesWithReadOwnerAccess

▸ **getRolesWithReadOwnerAccess**(): `string`[]

Provides the roles that can read the current
creator of the item itself

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2047](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2047)

___

### getRolesWithSearchAccess

▸ **getRolesWithSearchAccess**(): `string`[]

Provides the roles that can search within the item
definition, will give the module search role
access if not overwritten by this

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2035](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2035)

___

### getSearchEngineDynamicMainLanguageColumn

▸ **getSearchEngineDynamicMainLanguageColumn**(): `string`

If it was provided gives the search engine main
language to use as it was stored in the columns

#### Returns

`string`

the sql text column name that contains the language to index the whole

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3056](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L3056)

___

### getSearchEngineFallbackLanguage

▸ **getSearchEngineFallbackLanguage**(): `string`

If was provided gives the search engine main
language to use to define the search

#### Returns

`string`

a 2 iso string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3029](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L3029)

___

### getSearchEngineMainLanguageFromRow

▸ **getSearchEngineMainLanguageFromRow**(`rowValue`): `string`

Solves the main language from the row

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowValue` | `any` |

#### Returns

`string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3007](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L3007)

___

### getSearchModeCounterpart

▸ **getSearchModeCounterpart**(): [`default`](base_Root_Module_ItemDefinition.default.md)

Provides the item definition that represent the search mode of this
same item definition

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

an ItemDefinition, this function will crash if you are already
in the search mode counterpart

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1997](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1997)

___

### getSearchState

▸ **getSearchState**(`id`, `version`): [`ICompoundSearchStateType`](../interfaces/base_Root_Module_ItemDefinition.ICompoundSearchStateType.md)

Provides the internal state of the current state

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |

#### Returns

[`ICompoundSearchStateType`](../interfaces/base_Root_Module_ItemDefinition.ICompoundSearchStateType.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1953](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1953)

___

### getStandardCounterpart

▸ **getStandardCounterpart**(): [`default`](base_Root_Module_ItemDefinition.default.md)

Basically only works in search mode item definitions, and provides the standard
counterpart

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

an ItemDefinition, this function will crash if you are already
in the standard mode counterpart

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2012](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2012)

___

### getState

▸ **getState**(`id`, `version`, `onlyIncludeProperties?`, `onlyIncludeIncludes?`, `excludePolicies?`): `Promise`<[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)\>

provides the structure of the current item
as it is currently, the reason this is more efficient
is because getting the value of each item definition
wastes resources, so using this function is more
efficient than calling the functions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the stored value of the item definition, pass null if new this also represens the slot |
| `version` | `string` | the stored value given a version pass null for default |
| `onlyIncludeProperties?` | `string`[] | only includes these specific properties, note property definitions are not fetched in this case |
| `onlyIncludeIncludes?` | `Object` | includes the includes in the list |
| `excludePolicies?` | `boolean` | excludes all the policies state bit |

#### Returns

`Promise`<[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)\>

a promise for the item definition state

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1562](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1562)

___

### getStateNoExternalChecking

▸ **getStateNoExternalChecking**(`id`, `version`, `emulateExternalChecking?`, `onlyIncludeProperties?`, `onlyIncludeIncludes?`, `excludePolicies?`): [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

same as getCurrentValue but ignores external checking
so it doesn't have to be async and no need to spend
network resources, checks most, but ignores unique checkings
in order to get cached previously checked results

**`retrns`** the item definition state without extenral checks

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the stored value of the item definition, pass null if new |
| `version` | `string` | the store value of the version, only applies if id specified |
| `emulateExternalChecking?` | `boolean` | emulates an externally checked property as the get current value async leaves a cache behind and this will use the cache rather than re-requesting |
| `onlyIncludeProperties?` | `string`[] | only includes these specific properties, note property definitions are not fetched in this case |
| `onlyIncludeIncludes?` | `Object` | includes the includes in the list |
| `excludePolicies?` | `boolean` | excludes all the policies state |

#### Returns

[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1491](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1491)

___

### getStatePackage

▸ **getStatePackage**(`id`, `version`, `onlyIncludeProperties?`, `onlyIncludeIncludes?`, `excludePolicies?`): `Promise`<`Blob`\>

Only works in the client side, provides a blob package of the current
state of the item definition

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `onlyIncludeProperties?` | `string`[] |
| `onlyIncludeIncludes?` | `Object` |
| `excludePolicies?` | `boolean` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1452](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1452)

___

### getTableName

▸ **getTableName**(): `string`

An utility function that returns the name
of the table that is used in the database

#### Returns

`string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2790](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2790)

___

### hasAnActiveIncludeInstanceOfId

▸ **hasAnActiveIncludeInstanceOfId**(`id`, `version`, `includeId`): `boolean`

Checks whether it has an active instance of an item
given its include id (not its name)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id |
| `version` | `string` | the slot version |
| `includeId` | `string` | the id of the item |

#### Returns

`boolean`

a boolean on whether it does

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1349](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1349)

___

### hasAppliedValueTo

▸ **hasAppliedValueTo**(`id`, `version`): `boolean`

Checks whether given the state id, there is an applied
value for it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |

#### Returns

`boolean`

a boolean on whether it does or not

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1943](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1943)

___

### hasAtLeastOneActiveInstanceOf

▸ **hasAtLeastOneActiveInstanceOf**(`id`, `version`, `name`): `boolean`

Tells whether the current item definition has items itself
which are active and match the specific name
that means the item is not excluded and the item is
matches the name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the slot id of the current state |
| `version` | `string` | the slot version of the current state |
| `name` | `string` | the name of the item |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1325](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1325)

___

### hasBlockCleanFor

▸ **hasBlockCleanFor**(`id`, `version`, `blockId`): `boolean`

Specifies whether a block id exists with the given criteria

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `blockId` | `string` |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1866](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1866)

___

### hasIncludeFor

▸ **hasIncludeFor**(`id`): `boolean`

Checks whether an item included in this item definition
has an specific id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the include |

#### Returns

`boolean`

a boolean on whether it has such include

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1146](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1146)

___

### hasItemDefinitionFor

▸ **hasItemDefinitionFor**(`name`, `avoidImports?`): `boolean`

Tells whether an item definition has a child item definition for it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the item definition |
| `avoidImports?` | `boolean` | whether to avoid the imported detached definitions |

#### Returns

`boolean`

a boolean on whether it does or not

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1065](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1065)

___

### hasParentItemDefinition

▸ **hasParentItemDefinition**(): `boolean`

Tells whether it has a parent item definition

**`retuns`** a boolean

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1372](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1372)

___

### hasPropertyDefinitionFor

▸ **hasPropertyDefinitionFor**(`id`, `includeExtensions`): `boolean`

Checks whether an item definition has a property definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the property definition id |
| `includeExtensions` | `boolean` | whether to include extensions or not |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1229](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1229)

___

### init

▸ **init**(): `void`

Runs the initialization of the item definition, for cross access, this executes
once the entire tree is ready so this item definition can access other parts of the tree
Root class executes this function recursively

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:894](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L894)

___

### isExtensionsInstance

▸ **isExtensionsInstance**(): `boolean`

Checks the flag for this item definition as being
an extensions instance

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:968](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L968)

___

### isInSearchMode

▸ **isInSearchMode**(): `boolean`

Tells whether this item is the search mode item of another
item

#### Returns

`boolean`

a boolean on whether it is in search mode

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2026](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2026)

___

### isOwnerObjectId

▸ **isOwnerObjectId**(): `boolean`

Checks whether the owner of this item definition is not supposed to be
the created_by field but rather the id field, this only makes sense
in users, an user owns itself

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3072](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L3072)

___

### isPropertyInSearchModeOnly

▸ **isPropertyInSearchModeOnly**(`id`): `boolean`

Given a string id it specifies whether it is considered
a search only property only available in the search mode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the property |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1266](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1266)

___

### isReparentingEnabled

▸ **isReparentingEnabled**(): `boolean`

Tells whether reparenting is enabled

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2585](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2585)

___

### isSearchEngineDynamicMainLanguageColumnInModule

▸ **isSearchEngineDynamicMainLanguageColumnInModule**(): `boolean`

Tells wether the search engine dynamic main language column
is from a property or a prop extension

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3041](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L3041)

___

### isSearchEngineEnabled

▸ **isSearchEngineEnabled**(): `boolean`

Wether the item is search engine enabled

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2998](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2998)

___

### isSearchable

▸ **isSearchable**(): `boolean`

Tells whether the item definition supports the search
endpoint and all what it entails

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2987](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2987)

___

### isValidVersion

▸ **isValidVersion**(`version`, `supportedLanguages`): `boolean`

Tells whether a version is a valid value for this item definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `string` | the version id |
| `supportedLanguages` | `string`[] | the array list of supported language this function is unaware of supported languages so it needs to ask in order to check for a version |

#### Returns

`boolean`

a boolean on whether it's a valid version

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:986](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L986)

___

### isVersioned

▸ **isVersioned**(): `boolean`

Tells whether this item definition is versioned

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:975](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L975)

___

### mergeWithI18n

▸ **mergeWithI18n**(`mod`, `idef`): `void`

Merges two i18n data components, for example the i18n data for
the english build and the i18n data for the russian build, that way
the state is not lost

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | the raw module that is merging |
| `idef` | [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md) | the raw item definition that is merging |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2950](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2950)

___

### mustBeParented

▸ **mustBeParented**(): `boolean`

Tells whether this item definition has parenting enforced

#### Returns

`boolean`

a boolean on whether parenting is enforced

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2577](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2577)

___

### removeBlockCleanFor

▸ **removeBlockCleanFor**(`id`, `version`, `blockId`): `void`

Removes the blockage of the clean

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `blockId` | `string` | the given blockage id |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1883](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1883)

___

### removeListener

▸ **removeListener**(`event`, `id`, `version`, `listener`): `void`

Removes a listener

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | the event string |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `listener` | [`ListenerType`](../modules/base_Root_Module.md#listenertype) | the listener |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2894](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2894)

___

### restoreValueFor

▸ **restoreValueFor**(`id`, `version`, `excludeExtensions?`): `void`

Restores an applied value to the last applied value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `excludeExtensions?` | `boolean` | whether to exclude extensions of all this |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1789](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1789)

___

### setAsExtensionsInstance

▸ **setAsExtensionsInstance**(): `void`

Flags this item definition into an extensions instance

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:959](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L959)

___

### setSearchState

▸ **setSearchState**(`id`, `version`, `value`): `void`

Sets the internal state with a given value

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `value` | [`ICompoundSearchStateType`](../interfaces/base_Root_Module_ItemDefinition.ICompoundSearchStateType.md) |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1964](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L1964)

___

### toJSON

▸ **toJSON**(): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

Basically returns the raw data itself
doesn't do much

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

the json form

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2706](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2706)

___

### triggerListeners

▸ **triggerListeners**(`event`, `id`, `version`, `but?`, `callId?`): `void`

Triggers a listener for a given id
note this will affect the extensions as well because
their states are correlated

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | the event |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `but?` | [`ListenerType`](../modules/base_Root_Module.md#listenertype) | a function not to trigger (one of the listeners) |
| `callId?` | `string` | a call id, it's an unique identifier for this event, it will be autogenerated if not provided and it's the best to leave it be autogenerated |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2916](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L2916)

___

### getItemDefinitionRawFor

▸ `Static` **getItemDefinitionRawFor**(`itemDefinitionRaw`, `parentModuleRaw`, `name`, `avoidImports?`): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

A raw helper function that gets a child or imported
raw item definition for an item, it's static, so it works
with raw json data, it throws no error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionRaw` | [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md) | the json for the item definition |
| `parentModuleRaw` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | the parent module that contains this same item definition raw |
| `name` | `string` | the name of the expected child item |
| `avoidImports?` | `boolean` | whether to avoid imported items from the module |

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

a raw item definition if found, or null

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:587](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L587)

___

### getPropertyDefinitionRawFor

▸ `Static` **getPropertyDefinitionRawFor**(`itemDefinitionRaw`, `parentModuleRaw`, `id`, `includeExtensions`): [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)

A raw helper function that takes raw json data and returns
a property definition if it finds it based on its id
it also checks prop extensions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionRaw` | [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md) | the raw item definition to be searched |
| `parentModuleRaw` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | the raw module |
| `id` | `string` | the id of the property |
| `includeExtensions` | `boolean` | whether to include the extensions |

#### Returns

[`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)

a raw property definition if found, or null

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:637](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L637)

___

### getSerializableState

▸ `Static` **getSerializableState**(`state`): [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

Rips the internal values from the state so it can be
serialized, the serialized state removes possible useless data

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md) |

#### Returns

[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:662](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L662)

___

### getSerializableStateWithFiles

▸ `Static` **getSerializableStateWithFiles**(`state`, `root`, `config`): `Promise`<[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)\>

Rips the internal values from the state so it can be
serialized, the serialized state removes possible useless data

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md) |
| `root` | [`default`](base_Root.default.md) |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |

#### Returns

`Promise`<[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:701](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L701)
