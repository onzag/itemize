[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / default

# Class: default

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).default

This is the max expression, the item definition class
which basically compounds all how this is defined

## Table of contents

### Constructors

- [constructor](base_Root_Module_ItemDefinition.default.md#constructor)

### Properties

- [childDefinitions](base_Root_Module_ItemDefinition.default.md#childdefinitions)
- [cleansBlocked](base_Root_Module_ItemDefinition.default.md#cleansblocked)
- [customSearchEngineLimiterFn](base_Root_Module_ItemDefinition.default.md#customsearchenginelimiterfn)
- [customSearchEngineLimiterFnColumns](base_Root_Module_ItemDefinition.default.md#customsearchenginelimiterfncolumns)
- [customSearchEngineLimiterFnId](base_Root_Module_ItemDefinition.default.md#customsearchenginelimiterfnid)
- [extensionsInstance](base_Root_Module_ItemDefinition.default.md#extensionsinstance)
- [importedChildDefinitions](base_Root_Module_ItemDefinition.default.md#importedchilddefinitions)
- [includeInstances](base_Root_Module_ItemDefinition.default.md#includeinstances)
- [lastListenerCallId](base_Root_Module_ItemDefinition.default.md#lastlistenercallid)
- [listeners](base_Root_Module_ItemDefinition.default.md#listeners)
- [originatingInstance](base_Root_Module_ItemDefinition.default.md#originatinginstance)
- [parentItemDefinition](base_Root_Module_ItemDefinition.default.md#parentitemdefinition)
- [parentModule](base_Root_Module_ItemDefinition.default.md#parentmodule)
- [policyItemParentDefinitions](base_Root_Module_ItemDefinition.default.md#policyitemparentdefinitions)
- [policyModuleParentDefinitions](base_Root_Module_ItemDefinition.default.md#policymoduleparentdefinitions)
- [policyPropertyDefinitions](base_Root_Module_ItemDefinition.default.md#policypropertydefinitions)
- [propertyDefinitions](base_Root_Module_ItemDefinition.default.md#propertydefinitions)
- [rawData](base_Root_Module_ItemDefinition.default.md#rawdata)
- [stateHasAppliedValueTo](base_Root_Module_ItemDefinition.default.md#statehasappliedvalueto)
- [stateRQAppliedValue](base_Root_Module_ItemDefinition.default.md#staterqappliedvalue)
- [stateSearch](base_Root_Module_ItemDefinition.default.md#statesearch)

### Methods

- [addBlockCleanFor](base_Root_Module_ItemDefinition.default.md#addblockcleanfor)
- [addListener](base_Root_Module_ItemDefinition.default.md#addlistener)
- [applySoftReadRoleAccessTo](base_Root_Module_ItemDefinition.default.md#applysoftreadroleaccessto)
- [applyState](base_Root_Module_ItemDefinition.default.md#applystate)
- [applyStateFromPackage](base_Root_Module_ItemDefinition.default.md#applystatefrompackage)
- [applyValue](base_Root_Module_ItemDefinition.default.md#applyvalue)
- [buildFieldsForRoleAccess](base_Root_Module_ItemDefinition.default.md#buildfieldsforroleaccess)
- [canBeReparentedEnabled](base_Root_Module_ItemDefinition.default.md#canbereparentedenabled)
- [checkCanBeParentedBy](base_Root_Module_ItemDefinition.default.md#checkcanbeparentedby)
- [checkRoleAccessFor](base_Root_Module_ItemDefinition.default.md#checkroleaccessfor)
- [checkRoleAccessForIgnoreLimiters](base_Root_Module_ItemDefinition.default.md#checkroleaccessforignorelimiters)
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
- [doesApplyingPropertyForPolicyOnlyAppliesWhenCurrentIsNonNull](base_Root_Module_ItemDefinition.default.md#doesapplyingpropertyforpolicyonlyapplieswhencurrentisnonnull)
- [doesPropertyParentPolicyCheckIsDoneOnParent](base_Root_Module_ItemDefinition.default.md#doespropertyparentpolicycheckisdoneonparent)
- [getAbsolutePath](base_Root_Module_ItemDefinition.default.md#getabsolutepath)
- [getAllIncludes](base_Root_Module_ItemDefinition.default.md#getallincludes)
- [getAllPropertyDefinitions](base_Root_Module_ItemDefinition.default.md#getallpropertydefinitions)
- [getAllPropertyDefinitionsAndExtensions](base_Root_Module_ItemDefinition.default.md#getallpropertydefinitionsandextensions)
- [getAllSideEffectedProperties](base_Root_Module_ItemDefinition.default.md#getallsideeffectedproperties)
- [getAppliedValueOwnerIfAny](base_Root_Module_ItemDefinition.default.md#getappliedvalueownerifany)
- [getApplyingIncludeIdsForPolicy](base_Root_Module_ItemDefinition.default.md#getapplyingincludeidsforpolicy)
- [getApplyingPropertyIdsForPolicy](base_Root_Module_ItemDefinition.default.md#getapplyingpropertyidsforpolicy)
- [getCanBeParentedRule](base_Root_Module_ItemDefinition.default.md#getcanbeparentedrule)
- [getChildDefinitions](base_Root_Module_ItemDefinition.default.md#getchilddefinitions)
- [getChildDefinitionsRecursive](base_Root_Module_ItemDefinition.default.md#getchilddefinitionsrecursive)
- [getDirectlyAvailableItemDefinitionInContextFor](base_Root_Module_ItemDefinition.default.md#getdirectlyavailableitemdefinitionincontextfor)
- [getFirstApplyingReadPolicy](base_Root_Module_ItemDefinition.default.md#getfirstapplyingreadpolicy)
- [getI18nDataFor](base_Root_Module_ItemDefinition.default.md#geti18ndatafor)
- [getImportedChildDefinitions](base_Root_Module_ItemDefinition.default.md#getimportedchilddefinitions)
- [getIncludeFor](base_Root_Module_ItemDefinition.default.md#getincludefor)
- [getItemDefinitionRawFor](base_Root_Module_ItemDefinition.default.md#getitemdefinitionrawfor)
- [getMaxOwnedCountAnyType](base_Root_Module_ItemDefinition.default.md#getmaxownedcountanytype)
- [getMaxOwnedCountSameType](base_Root_Module_ItemDefinition.default.md#getmaxownedcountsametype)
- [getModuleName](base_Root_Module_ItemDefinition.default.md#getmodulename)
- [getModuleTableName](base_Root_Module_ItemDefinition.default.md#getmoduletablename)
- [getName](base_Root_Module_ItemDefinition.default.md#getname)
- [getNewInstance](base_Root_Module_ItemDefinition.default.md#getnewinstance)
- [getOwningRule](base_Root_Module_ItemDefinition.default.md#getowningrule)
- [getParentItemDefinition](base_Root_Module_ItemDefinition.default.md#getparentitemdefinition)
- [getParentModule](base_Root_Module_ItemDefinition.default.md#getparentmodule)
- [getParentingMaxChildCountAnyType](base_Root_Module_ItemDefinition.default.md#getparentingmaxchildcountanytype)
- [getParentingMaxChildCountSameType](base_Root_Module_ItemDefinition.default.md#getparentingmaxchildcountsametype)
- [getPath](base_Root_Module_ItemDefinition.default.md#getpath)
- [getPolicyNamesFor](base_Root_Module_ItemDefinition.default.md#getpolicynamesfor)
- [getPropertiesForPolicy](base_Root_Module_ItemDefinition.default.md#getpropertiesforpolicy)
- [getPropertyDefinitionFor](base_Root_Module_ItemDefinition.default.md#getpropertydefinitionfor)
- [getPropertyDefinitionForPolicy](base_Root_Module_ItemDefinition.default.md#getpropertydefinitionforpolicy)
- [getPropertyParentPolicyCheckItemDefinition](base_Root_Module_ItemDefinition.default.md#getpropertyparentpolicycheckitemdefinition)
- [getPropertyParentPolicyCheckModule](base_Root_Module_ItemDefinition.default.md#getpropertyparentpolicycheckmodule)
- [getQualifiedPathName](base_Root_Module_ItemDefinition.default.md#getqualifiedpathname)
- [getQualifiedPolicyIdentifier](base_Root_Module_ItemDefinition.default.md#getqualifiedpolicyidentifier)
- [getRQAppliedValue](base_Root_Module_ItemDefinition.default.md#getrqappliedvalue)
- [getRolesForCustomId](base_Root_Module_ItemDefinition.default.md#getrolesforcustomid)
- [getRolesForPolicy](base_Root_Module_ItemDefinition.default.md#getrolesforpolicy)
- [getRolesForVersioning](base_Root_Module_ItemDefinition.default.md#getrolesforversioning)
- [getRolesWithAccessTo](base_Root_Module_ItemDefinition.default.md#getroleswithaccessto)
- [getRolesWithModerationAccess](base_Root_Module_ItemDefinition.default.md#getroleswithmoderationaccess)
- [getRolesWithReadOwnerAccess](base_Root_Module_ItemDefinition.default.md#getroleswithreadowneraccess)
- [getRolesWithSearchAccess](base_Root_Module_ItemDefinition.default.md#getroleswithsearchaccess)
- [getSearchEngineDynamicMainLanguageColumn](base_Root_Module_ItemDefinition.default.md#getsearchenginedynamicmainlanguagecolumn)
- [getSearchEngineFallbackLanguage](base_Root_Module_ItemDefinition.default.md#getsearchenginefallbacklanguage)
- [getSearchEngineLimitedColumns](base_Root_Module_ItemDefinition.default.md#getsearchenginelimitedcolumns)
- [getSearchEngineMainLanguageFromRow](base_Root_Module_ItemDefinition.default.md#getsearchenginemainlanguagefromrow)
- [getSearchLimiters](base_Root_Module_ItemDefinition.default.md#getsearchlimiters)
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
- [setCustomSearchEngineLimiterFn](base_Root_Module_ItemDefinition.default.md#setcustomsearchenginelimiterfn)
- [setSearchState](base_Root_Module_ItemDefinition.default.md#setsearchstate)
- [shouldRowBeIncludedInSearchEngine](base_Root_Module_ItemDefinition.default.md#shouldrowbeincludedinsearchengine)
- [toJSON](base_Root_Module_ItemDefinition.default.md#tojson)
- [triggerListeners](base_Root_Module_ItemDefinition.default.md#triggerlisteners)
- [getItemDefinitionRawFor](base_Root_Module_ItemDefinition.default.md#getitemdefinitionrawfor-1)
- [getPropertyDefinitionRawFor](base_Root_Module_ItemDefinition.default.md#getpropertydefinitionrawfor)
- [getSerializableState](base_Root_Module_ItemDefinition.default.md#getserializablestate)
- [getSerializableStateWithFiles](base_Root_Module_ItemDefinition.default.md#getserializablestatewithfiles)

## Constructors

### constructor

• **new default**(`rawJSON`, `parentModule`, `parentItemDefinition`, `originatingInstance?`): [`default`](base_Root_Module_ItemDefinition.default.md)

Build a new ItemDefinition instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawJSON` | [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md) | the raw json form |
| `parentModule` | [`default`](base_Root_Module.default.md) | the parent module instance |
| `parentItemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the parent item definition (or null) |
| `originatingInstance?` | [`default`](base_Root_Module_ItemDefinition.default.md) | an originating instance (for instantiated detached instances) |

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:856](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L856)

## Properties

### childDefinitions

• `Private` **childDefinitions**: [`default`](base_Root_Module_ItemDefinition.default.md)[]

The child definitions the item definition contains

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:757](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L757)

___

### cleansBlocked

• `Private` **cleansBlocked**: `Object`

The cleans being blocked and by whom

#### Index signature

▪ [mergedId: `string`]: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:838](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L838)

___

### customSearchEngineLimiterFn

• `Private` **customSearchEngineLimiterFn**: (`row`: `any`) => `boolean`

#### Type declaration

▸ (`row`): `boolean`

The custom search engine limiter function installed via the server

##### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `any` |

##### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:845](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L845)

___

### customSearchEngineLimiterFnColumns

• **customSearchEngineLimiterFnColumns**: `string`[] = `null`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:847](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L847)

___

### customSearchEngineLimiterFnId

• **customSearchEngineLimiterFnId**: `string` = `null`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:846](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L846)

___

### extensionsInstance

• `Private` **extensionsInstance**: `boolean` = `false`

whether this instance is for prop extensions in the module
that is an emulated item definition that only contains
the prop extensions and is generated in the module

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:800](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L800)

___

### importedChildDefinitions

• `Private` **importedChildDefinitions**: \{ `definition`: [`default`](base_Root_Module_ItemDefinition.default.md) ; `fullName`: `string`  }[]

Imported definitions that are included in the
raw data using the import mechanism, this is the
compiled form

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:763](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L763)

___

### includeInstances

• `Private` **includeInstances**: [`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

The include instances compiled from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:753](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L753)

___

### lastListenerCallId

• `Private` **lastListenerCallId**: `string` = `""`

Events are triggered accross the tree, so this ensures that the event
doesn't trigger twice and creates a forever loop

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:815](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L815)

___

### listeners

• `Private` **listeners**: `Object`

Listeners are simple callbacks that are added and operate within
the item definition, usually added for UI level functionality

#### Index signature

▪ [event: `string`]: \{ `[mergedID: string]`: [`ListenerType`](../modules/base_Root_Module.md#listenertype)[];  }

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:806](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L806)

___

### originatingInstance

• `Private` **originatingInstance**: [`default`](base_Root_Module_ItemDefinition.default.md)

The originating instance exists only if the current
item definition was instantiated from another and detached from
the tree, this is the tree instance it came from

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:794](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L794)

___

### parentItemDefinition

• `Private` **parentItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

A parent item definition or null

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:788](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L788)

___

### parentModule

• `Private` **parentModule**: [`default`](base_Root_Module.default.md)

The parent module

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:784](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L784)

___

### policyItemParentDefinitions

• `Private` **policyItemParentDefinitions**: `Object`

#### Index signature

▪ [name: `string`]: [`default`](base_Root_Module_ItemDefinition.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:778](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L778)

___

### policyModuleParentDefinitions

• `Private` **policyModuleParentDefinitions**: `Object`

#### Index signature

▪ [name: `string`]: [`default`](base_Root_Module.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:775](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L775)

___

### policyPropertyDefinitions

• `Private` **policyPropertyDefinitions**: [`IPoliciesType`](../interfaces/base_Root_Module_ItemDefinition.IPoliciesType.md)

All the policies within the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:774](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L774)

___

### propertyDefinitions

• `Private` **propertyDefinitions**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

All the properties within the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:770](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L770)

___

### rawData

• **rawData**: [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

The raw data of the item definition as it was
compiled

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:748](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L748)

___

### stateHasAppliedValueTo

• `Private` **stateHasAppliedValueTo**: `Object`

Containst state information about applied values to slots

#### Index signature

▪ [mergedID: `string`]: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:820](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L820)

___

### stateRQAppliedValue

• `Private` **stateRQAppliedValue**: `Object`

Contains the information about the specific applied value to an slot

#### Index signature

▪ [mergedID: `string`]: [`IItemDefinitionRQValueType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRQValueType.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:826](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L826)

___

### stateSearch

• `Private` **stateSearch**: `Object`

The internal state

#### Index signature

▪ [mergedID: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:832](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L832)

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

[base/Root/Module/ItemDefinition/index.ts:1983](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1983)

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

[base/Root/Module/ItemDefinition/index.ts:3180](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3180)

___

### applySoftReadRoleAccessTo

▸ **applySoftReadRoleAccessTo**(`role`, `userId`, `ownerUserId`, `rolesManager`, `value`): `Promise`\<`void`\>

For a given requested rq value it will
tell which fields need to be filtered for soft
read role access

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |
| `value` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2295](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2295)

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

[base/Root/Module/ItemDefinition/index.ts:1750](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1750)

___

### applyStateFromPackage

▸ **applyStateFromPackage**(`id`, `version`, `state`, `specificProperties?`, `specificIncludes?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `state` | `File` \| `Blob` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1794](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1794)

___

### applyValue

▸ **applyValue**(`id`, `version`, `value`, `excludeExtensions`, `requestFields`, `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet`, `forceApply?`): `boolean`

Applies a value from rq to the item definition state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id that this state is for (can be null) |
| `version` | `string` | the version of this state is for (can be null) |
| `value` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) | the value itself from rq, DATA values and flattened values are valid. |
| `excludeExtensions` | `boolean` | whether to exclude the extensions for applying the value |
| `requestFields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the fields that were used to request this data (can be null) but be careful this might be used for catching |
| `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet` | `boolean` | to avoid hot updating values when the user is modifying them and an apply value has been called because it has been updated somewhere else, we use this to avoid overriding, note that the value must also not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back to false as it's been used applyValue on it, it's been set now by the computer |
| `forceApply?` | `boolean` | will always apply and not perform the signature check |

#### Returns

`boolean`

a boolean on whether the action was performed, sometimes the value will not be applied
because there already exists a better one already stored for the same last modified value which contains
more fields

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1823](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1823)

___

### buildFieldsForRoleAccess

▸ **buildFieldsForRoleAccess**(`action`, `role`, `userId`, `ownerUserId`, `rolesManager`): `Promise`\<[`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md)\>

Returns the FLATTENED fields for the rq request

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |

#### Returns

`Promise`\<[`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md)\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2229](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2229)

___

### canBeReparentedEnabled

▸ **canBeReparentedEnabled**(): `boolean`

Tells whether reparenting is enabled

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2853](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2853)

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

[base/Root/Module/ItemDefinition/index.ts:2888](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2888)

___

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`, `role`, `userId`, `ownerUserId`, `requestedFields`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

Checks the role access for an action in an item
defintition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the IO action |
| `role` | `string` | the role of the user attempting the action |
| `userId` | `string` | the user id of the user attempting the action |
| `ownerUserId` | `string` | the owner of that item definition |
| `requestedFields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the requested fields (single properties will be checked as well) |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error if failed (otherwise returns a boolean) |

#### Returns

`Promise`\<`boolean`\>

a boolean on whether the user is allowed

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2517](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2517)

___

### checkRoleAccessForIgnoreLimiters

▸ **checkRoleAccessForIgnoreLimiters**(`role`, `userId`, `ownerUserId`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |
| `throwError` | `boolean` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2337](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2337)

___

### checkRoleAccessForModeration

▸ **checkRoleAccessForModeration**(`role`, `userId`, `ownerUserId`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |
| `throwError` | `boolean` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2377](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2377)

___

### checkRoleAccessForParenting

▸ **checkRoleAccessForParenting**(`role`, `userId`, `parentOwnerUserId`, `childItem`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

Checks whether the current user, has access to create an item and parent it
according to his role

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `role` | `string` | the role of the user |
| `userId` | `string` | the user id |
| `parentOwnerUserId` | `string` | the parent owner user id of the item this user is trying to parent |
| `childItem` | [`default`](base_Root_Module_ItemDefinition.default.md) | - |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error |

#### Returns

`Promise`\<`boolean`\>

a boolean on whether parenting is allowed

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2936](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2936)

___

### checkRoleCanCreateInBehalf

▸ **checkRoleCanCreateInBehalf**(`role`, `targetRole`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

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

`Promise`\<`boolean`\>

a boolean on whether the user is allowed

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2626](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2626)

___

### checkRoleCanCustomId

▸ **checkRoleCanCustomId**(`role`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

Checks whether a given role can provide a custom id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `role` | `string` | the role of the user |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | - |
| `throwError` | `boolean` | whether to throw an error in case of failure |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2767](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2767)

___

### checkRoleCanReadOwner

▸ **checkRoleCanReadOwner**(`role`, `userId`, `ownerUserId`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

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

`Promise`\<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2805](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2805)

___

### checkRoleCanVersion

▸ **checkRoleCanVersion**(`role`, `userId`, `ownerUserId`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

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

`Promise`\<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2704](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2704)

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

[base/Root/Module/ItemDefinition/index.ts:2108](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2108)

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

[base/Root/Module/ItemDefinition/index.ts:906](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L906)

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

[base/Root/Module/ItemDefinition/index.ts:2039](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2039)

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

[base/Root/Module/ItemDefinition/index.ts:3040](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3040)

___

### doesApplyingPropertyForPolicyOnlyAppliesWhenCurrentIsNonNull

▸ **doesApplyingPropertyForPolicyOnlyAppliesWhenCurrentIsNonNull**(`type`, `name`): `boolean`

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

[base/Root/Module/ItemDefinition/index.ts:3148](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3148)

___

### doesPropertyParentPolicyCheckIsDoneOnParent

▸ **doesPropertyParentPolicyCheckIsDoneOnParent**(`name`): `boolean`

Checks whether the check for a given parent policy check is done against
the parent value

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3128](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3128)

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

[base/Root/Module/ItemDefinition/index.ts:3017](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3017)

___

### getAllIncludes

▸ **getAllIncludes**(): [`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

Provides all the item instances

#### Returns

[`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

an include array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1353](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1353)

___

### getAllPropertyDefinitions

▸ **getAllPropertyDefinitions**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all the property definitions without
including the extensions

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

a property definiton array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1329](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1329)

___

### getAllPropertyDefinitionsAndExtensions

▸ **getAllPropertyDefinitionsAndExtensions**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all that property defintiions
including the extensions

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

a property definition array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1338](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1338)

___

### getAllSideEffectedProperties

▸ **getAllSideEffectedProperties**(`pre?`): \{ `include`: [`default`](base_Root_Module_ItemDefinition_Include.default.md) ; `property`: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)  }[]

Provides all the properties that hold a side effect into them

#### Parameters

| Name | Type |
| :------ | :------ |
| `pre?` | `boolean` |

#### Returns

\{ `include`: [`default`](base_Root_Module_ItemDefinition_Include.default.md) ; `property`: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)  }[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3458](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3458)

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

[base/Root/Module/ItemDefinition/index.ts:1955](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1955)

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

[base/Root/Module/ItemDefinition/index.ts:3159](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3159)

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

[base/Root/Module/ItemDefinition/index.ts:3117](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3117)

___

### getCanBeParentedRule

▸ **getCanBeParentedRule**(): ``"ONCE"`` \| ``"ONCE_PER_OWNER"`` \| ``"MANY"``

#### Returns

``"ONCE"`` \| ``"ONCE_PER_OWNER"`` \| ``"MANY"``

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2857](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2857)

___

### getChildDefinitions

▸ **getChildDefinitions**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live child definitions
without imports

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1527](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1527)

___

### getChildDefinitionsRecursive

▸ **getChildDefinitionsRecursive**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live child definitions
without imports, recursively

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1536](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1536)

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

[base/Root/Module/ItemDefinition/index.ts:1234](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1234)

___

### getFirstApplyingReadPolicy

▸ **getFirstApplyingReadPolicy**(`role`, `userId`, `ownerUserId`, `requestedFields`, `knownSqlValue`, `rolesManager`): `Promise`\<\{ `applyingPropertyOrInclude`: `string` ; `policyName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | `string` |
| `userId` | `string` |
| `ownerUserId` | `string` |
| `requestedFields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) |
| `knownSqlValue` | `any` |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |

#### Returns

`Promise`\<\{ `applyingPropertyOrInclude`: `string` ; `policyName`: `string`  }\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2412](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2412)

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

[base/Root/Module/ItemDefinition/index.ts:1568](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1568)

___

### getImportedChildDefinitions

▸ **getImportedChildDefinitions**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live imported child definitions

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1548](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1548)

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

[base/Root/Module/ItemDefinition/index.ts:1290](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1290)

___

### getItemDefinitionRawFor

▸ **getItemDefinitionRawFor**(`name`, `avoidImports?`): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

Provides a raw json item definition that it has a children

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the item definition |
| `avoidImports?` | `boolean` | optional whether to avoid imported item definitions |

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

a raw item definition

**`Throws`**

an error if the item definition does not exist

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1305](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1305)

___

### getMaxOwnedCountAnyType

▸ **getMaxOwnedCountAnyType**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2873](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2873)

___

### getMaxOwnedCountSameType

▸ **getMaxOwnedCountSameType**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2869](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2869)

___

### getModuleName

▸ **getModuleName**(): `string`

Provides the module name that contains this item definition

#### Returns

`string`

a string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1189](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1189)

___

### getModuleTableName

▸ **getModuleTableName**(): `string`

An utility function that returns the name of the
table that is used for the module

#### Returns

`string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3081](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3081)

___

### getName

▸ **getName**(): `string`

provides the raw name of the item definition

#### Returns

`string`

the name as a string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1181](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1181)

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

[base/Root/Module/ItemDefinition/index.ts:1559](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1559)

___

### getOwningRule

▸ **getOwningRule**(): ``"ONCE"`` \| ``"MANY"`` \| ``"ONCE_PER_PARENT"``

#### Returns

``"ONCE"`` \| ``"MANY"`` \| ``"ONCE_PER_PARENT"``

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2877](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2877)

___

### getParentItemDefinition

▸ **getParentItemDefinition**(): [`default`](base_Root_Module_ItemDefinition.default.md)

Provides the parent item definition

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

an item definition or throws an error if no such a thing

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1514](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1514)

___

### getParentModule

▸ **getParentModule**(): [`default`](base_Root_Module.default.md)

Just gives the parent module

#### Returns

[`default`](base_Root_Module.default.md)

a module instance

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1498](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1498)

___

### getParentingMaxChildCountAnyType

▸ **getParentingMaxChildCountAnyType**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2865](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2865)

___

### getParentingMaxChildCountSameType

▸ **getParentingMaxChildCountSameType**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2861](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2861)

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

[base/Root/Module/ItemDefinition/index.ts:3000](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3000)

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

[base/Root/Module/ItemDefinition/index.ts:3090](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3090)

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

[base/Root/Module/ItemDefinition/index.ts:3105](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3105)

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

[base/Root/Module/ItemDefinition/index.ts:1380](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1380)

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

[base/Root/Module/ItemDefinition/index.ts:1416](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1416)

___

### getPropertyParentPolicyCheckItemDefinition

▸ **getPropertyParentPolicyCheckItemDefinition**(`name`): [`default`](base_Root_Module_ItemDefinition.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3137](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3137)

___

### getPropertyParentPolicyCheckModule

▸ **getPropertyParentPolicyCheckModule**(`name`): [`default`](base_Root_Module.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`default`](base_Root_Module.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3133](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3133)

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

[base/Root/Module/ItemDefinition/index.ts:3062](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3062)

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

[base/Root/Module/ItemDefinition/index.ts:1441](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1441)

___

### getRQAppliedValue

▸ **getRQAppliedValue**(`id`, `version`): [`IItemDefinitionRQValueType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRQValueType.md)

Provides the applied value for the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id |
| `version` | `string` | the version |

#### Returns

[`IItemDefinitionRQValueType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRQValueType.md)

the applied value structure

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2119](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2119)

___

### getRolesForCustomId

▸ **getRolesForCustomId**(): `string`[]

Provides the roles that are allowed custom ids

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2755](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2755)

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

[base/Root/Module/ItemDefinition/index.ts:3169](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3169)

___

### getRolesForVersioning

▸ **getRolesForVersioning**(): `string`[]

Provides the roles that are allowed versioning

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2690](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2690)

___

### getRolesWithAccessTo

▸ **getRolesWithAccessTo**(`action`): `string`[]

Provides the roles that have access to a given
action based on the rules that were set

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the action from the ItemDefinitionIOActions |

#### Returns

`string`[]

**`Retuns`**

an array of string that represent the roles

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2194](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2194)

___

### getRolesWithModerationAccess

▸ **getRolesWithModerationAccess**(): `string`[]

Provides the roles that have moderation access to
the moderation fileds for a given item definition
given its module rule

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2218](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2218)

___

### getRolesWithReadOwnerAccess

▸ **getRolesWithReadOwnerAccess**(): `string`[]

Provides the roles that can read the current
creator of the item itself

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2181](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2181)

___

### getRolesWithSearchAccess

▸ **getRolesWithSearchAccess**(): `string`[]

Provides the roles that can search within the item
definition, will give the module search role
access if not overwritten by this

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2169](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2169)

___

### getSearchEngineDynamicMainLanguageColumn

▸ **getSearchEngineDynamicMainLanguageColumn**(): `string`

If it was provided gives the search engine main
language to use as it was stored in the columns

#### Returns

`string`

the sql text column name that contains the language to index the whole

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3412](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3412)

___

### getSearchEngineFallbackLanguage

▸ **getSearchEngineFallbackLanguage**(): `string`

If was provided gives the search engine main
language to use to define the search

#### Returns

`string`

a 2 iso string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3385](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3385)

___

### getSearchEngineLimitedColumns

▸ **getSearchEngineLimitedColumns**(`combinedLimiters`): `Object`

Specifies which colums are needed to know whether an element should be included or not

#### Parameters

| Name | Type |
| :------ | :------ |
| `combinedLimiters` | [`ISearchLimitersType`](../interfaces/base_Root.ISearchLimitersType.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `idef` | `string`[] |
| `mod` | `string`[] |

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3427](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3427)

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

[base/Root/Module/ItemDefinition/index.ts:3309](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3309)

___

### getSearchLimiters

▸ **getSearchLimiters**(`combinedForWhatsAllowedInSearchEngine?`): [`ISearchLimitersType`](../interfaces/base_Root.ISearchLimitersType.md)

Provides the item definition and only the item definition request limiters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `combinedForWhatsAllowedInSearchEngine?` | `boolean` | it's useful for knowing what is potentially allowed and exists in the requests limiter potential for both the module and the item |

#### Returns

[`ISearchLimitersType`](../interfaces/base_Root.ISearchLimitersType.md)

the request limiters object or null

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:990](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L990)

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

[base/Root/Module/ItemDefinition/index.ts:2131](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2131)

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

[base/Root/Module/ItemDefinition/index.ts:2087](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2087)

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

[base/Root/Module/ItemDefinition/index.ts:2146](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2146)

___

### getState

▸ **getState**(`id`, `version`, `onlyIncludeProperties?`, `onlyIncludeIncludes?`, `excludePolicies?`): `Promise`\<[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)\>

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

`Promise`\<[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)\>

a promise for the item definition state

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1696](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1696)

___

### getStateNoExternalChecking

▸ **getStateNoExternalChecking**(`id`, `version`, `emulateExternalChecking?`, `onlyIncludeProperties?`, `onlyIncludeIncludes?`, `excludePolicies?`): [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

same as getCurrentValue but ignores external checking
so it doesn't have to be async and no need to spend
network resources, checks most, but ignores unique checkings
in order to get cached previously checked results

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

**`Retrns`**

the item definition state without extenral checks

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1625](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1625)

___

### getStatePackage

▸ **getStatePackage**(`id`, `version`, `onlyIncludeProperties?`, `onlyIncludeIncludes?`, `excludePolicies?`): `Promise`\<`Blob`\>

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

`Promise`\<`Blob`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1586](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1586)

___

### getTableName

▸ **getTableName**(): `string`

An utility function that returns the name
of the table that is used in the database

#### Returns

`string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3073](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3073)

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

[base/Root/Module/ItemDefinition/index.ts:1483](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1483)

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

[base/Root/Module/ItemDefinition/index.ts:2077](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2077)

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

[base/Root/Module/ItemDefinition/index.ts:1459](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1459)

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

[base/Root/Module/ItemDefinition/index.ts:2000](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2000)

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

[base/Root/Module/ItemDefinition/index.ts:1280](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1280)

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

[base/Root/Module/ItemDefinition/index.ts:1199](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1199)

___

### hasParentItemDefinition

▸ **hasParentItemDefinition**(): `boolean`

Tells whether it has a parent item definition

#### Returns

`boolean`

**`Retuns`**

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1506](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1506)

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

[base/Root/Module/ItemDefinition/index.ts:1363](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1363)

___

### init

▸ **init**(): `void`

Runs the initialization of the item definition, for cross access, this executes
once the entire tree is ready so this item definition can access other parts of the tree
Root class executes this function recursively

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:924](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L924)

___

### isExtensionsInstance

▸ **isExtensionsInstance**(): `boolean`

Checks the flag for this item definition as being
an extensions instance

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1102](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1102)

___

### isInSearchMode

▸ **isInSearchMode**(): `boolean`

Tells whether this item is the search mode item of another
item

#### Returns

`boolean`

a boolean on whether it is in search mode

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2160](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2160)

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

[base/Root/Module/ItemDefinition/index.ts:3451](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3451)

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

[base/Root/Module/ItemDefinition/index.ts:1400](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1400)

___

### isSearchEngineDynamicMainLanguageColumnInModule

▸ **isSearchEngineDynamicMainLanguageColumnInModule**(): `boolean`

Tells wether the search engine dynamic main language column
is from a property or a prop extension

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3397](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3397)

___

### isSearchEngineEnabled

▸ **isSearchEngineEnabled**(): `boolean`

Wether the item is search engine enabled

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3300](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3300)

___

### isSearchable

▸ **isSearchable**(): `boolean`

Tells whether the item definition supports the search
endpoint and all what it entails

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3289](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3289)

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

[base/Root/Module/ItemDefinition/index.ts:1120](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1120)

___

### isVersioned

▸ **isVersioned**(): `boolean`

Tells whether this item definition is versioned

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1109](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1109)

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

[base/Root/Module/ItemDefinition/index.ts:3252](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3252)

___

### mustBeParented

▸ **mustBeParented**(): `boolean`

Tells whether this item definition has parenting enforced

#### Returns

`boolean`

a boolean on whether parenting is enforced

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2845](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2845)

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

[base/Root/Module/ItemDefinition/index.ts:2017](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2017)

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

[base/Root/Module/ItemDefinition/index.ts:3196](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3196)

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

[base/Root/Module/ItemDefinition/index.ts:1923](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1923)

___

### setAsExtensionsInstance

▸ **setAsExtensionsInstance**(): `void`

Flags this item definition into an extensions instance

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1093](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L1093)

___

### setCustomSearchEngineLimiterFn

▸ **setCustomSearchEngineLimiterFn**(`id`, `fn`, `relevantColumns`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `fn` | (`rowValue`: `any`) => `boolean` |
| `relevantColumns` | `string`[] |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3326](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3326)

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

[base/Root/Module/ItemDefinition/index.ts:2098](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2098)

___

### shouldRowBeIncludedInSearchEngine

▸ **shouldRowBeIncludedInSearchEngine**(`rowValue`, `combinedLimiters`, `checkSinceLimiter?`): `boolean`

Check against the limiters BUT NOT against creation date unless specified

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowValue` | `any` |
| `combinedLimiters` | [`ISearchLimitersType`](../interfaces/base_Root.ISearchLimitersType.md) |
| `checkSinceLimiter?` | `boolean` |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:3339](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3339)

___

### toJSON

▸ **toJSON**(): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

Basically returns the raw data itself
doesn't do much

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

the json form

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2989](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L2989)

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

[base/Root/Module/ItemDefinition/index.ts:3218](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L3218)

___

### getItemDefinitionRawFor

▸ **getItemDefinitionRawFor**(`itemDefinitionRaw`, `parentModuleRaw`, `name`, `avoidImports?`): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

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

[base/Root/Module/ItemDefinition/index.ts:610](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L610)

___

### getPropertyDefinitionRawFor

▸ **getPropertyDefinitionRawFor**(`itemDefinitionRaw`, `parentModuleRaw`, `id`, `includeExtensions`): [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)

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

[base/Root/Module/ItemDefinition/index.ts:660](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L660)

___

### getSerializableState

▸ **getSerializableState**(`state`, `pOverrides?`, `applyEnforcedValues?`): [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

Rips the internal values from the state so it can be
serialized, the serialized state removes possible useless data

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md) |
| `pOverrides?` | [`IPropertyOverride`](../interfaces/client_internal_rq_client_util.IPropertyOverride.md)[] |
| `applyEnforcedValues?` | `boolean` |

#### Returns

[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:685](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L685)

___

### getSerializableStateWithFiles

▸ **getSerializableStateWithFiles**(`state`, `root`, `config`): `Promise`\<[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)\>

Rips the internal values from the state so it can be
serialized, the serialized state removes possible useless data

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md) |
| `root` | [`default`](base_Root.default.md) |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |

#### Returns

`Promise`\<[`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md)\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:728](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L728)
