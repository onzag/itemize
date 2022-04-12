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
- [stateInternal](base_Root_Module_ItemDefinition.default.md#stateinternal)

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
- [cleanInternalState](base_Root_Module_ItemDefinition.default.md#cleaninternalstate)
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
- [getInternalState](base_Root_Module_ItemDefinition.default.md#getinternalstate)
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
- [getSearchModeCounterpart](base_Root_Module_ItemDefinition.default.md#getsearchmodecounterpart)
- [getStandardCounterpart](base_Root_Module_ItemDefinition.default.md#getstandardcounterpart)
- [getState](base_Root_Module_ItemDefinition.default.md#getstate)
- [getStateNoExternalChecking](base_Root_Module_ItemDefinition.default.md#getstatenoexternalchecking)
- [getStatePackage](base_Root_Module_ItemDefinition.default.md#getstatepackage)
- [getTableName](base_Root_Module_ItemDefinition.default.md#gettablename)
- [hasAnActiveIncludeInstanceOfId](base_Root_Module_ItemDefinition.default.md#hasanactiveincludeinstanceofid)
- [hasAppliedValueTo](base_Root_Module_ItemDefinition.default.md#hasappliedvalueto)
- [hasAtLeastOneActiveInstanceOf](base_Root_Module_ItemDefinition.default.md#hasatleastoneactiveinstanceof)
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
- [isSearchable](base_Root_Module_ItemDefinition.default.md#issearchable)
- [isValidVersion](base_Root_Module_ItemDefinition.default.md#isvalidversion)
- [isVersioned](base_Root_Module_ItemDefinition.default.md#isversioned)
- [mergeWithI18n](base_Root_Module_ItemDefinition.default.md#mergewithi18n)
- [mustBeParented](base_Root_Module_ItemDefinition.default.md#mustbeparented)
- [removeBlockCleanFor](base_Root_Module_ItemDefinition.default.md#removeblockcleanfor)
- [removeListener](base_Root_Module_ItemDefinition.default.md#removelistener)
- [restoreValueFor](base_Root_Module_ItemDefinition.default.md#restorevaluefor)
- [setAsExtensionsInstance](base_Root_Module_ItemDefinition.default.md#setasextensionsinstance)
- [setInternalState](base_Root_Module_ItemDefinition.default.md#setinternalstate)
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

[base/Root/Module/ItemDefinition/index.ts:745](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L745)

## Properties

### \_gqlObj

• **\_gqlObj**: `GraphQLOutputType`

A cached graphql object

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:645](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L645)

___

### \_gqlQueryObj

• **\_gqlQueryObj**: `GraphQLObjectType`<`any`, `any`, { [key: string]: `any`;  }\>

A cached graphql query object

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:650](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L650)

___

### childDefinitions

• `Private` **childDefinitions**: [`default`](base_Root_Module_ItemDefinition.default.md)[]

The child definitions the item definition contains

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:659](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L659)

___

### cleansBlocked

• `Private` **cleansBlocked**: `Object`

The cleans being blocked and by whom

#### Index signature

▪ [mergedId: `string`]: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:734](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L734)

___

### extensionsInstance

• `Private` **extensionsInstance**: `boolean` = `false`

whether this instance is for prop extensions in the module
that is an emulated item definition that only contains
the prop extensions and is generated in the module

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:696](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L696)

___

### importedChildDefinitions

• `Private` **importedChildDefinitions**: { `definition`: [`default`](base_Root_Module_ItemDefinition.default.md) ; `fullName`: `string`  }[]

Imported definitions that are included in the
raw data using the import mechanism, this is the
compiled form

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:665](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L665)

___

### includeInstances

• `Private` **includeInstances**: [`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

The include instances compiled from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:655](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L655)

___

### lastListenerCallId

• `Private` **lastListenerCallId**: `string` = `""`

Events are triggered accross the tree, so this ensures that the event
doesn't trigger twice and creates a forever loop

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:711](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L711)

___

### listeners

• `Private` **listeners**: `Object`

Listeners are simple callbacks that are added and operate within
the item definition, usually added for UI level functionality

#### Index signature

▪ [event: `string`]: { [mergedID: string]: [`ListenerType`](../modules/base_Root_Module.md#listenertype)[];  }

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:702](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L702)

___

### originatingInstance

• `Private` **originatingInstance**: [`default`](base_Root_Module_ItemDefinition.default.md)

The originating instance exists only if the current
item definition was instantiated from another and detached from
the tree, this is the tree instance it came from

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:690](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L690)

___

### parentItemDefinition

• `Private` **parentItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

A parent item definition or null

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:684](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L684)

___

### parentModule

• `Private` **parentModule**: [`default`](base_Root_Module.default.md)

The parent module

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:680](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L680)

___

### policyPropertyDefinitions

• `Private` **policyPropertyDefinitions**: [`IPoliciesType`](../interfaces/base_Root_Module_ItemDefinition.IPoliciesType.md)

All the policies within the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:676](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L676)

___

### propertyDefinitions

• `Private` **propertyDefinitions**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

All the properties within the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:672](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L672)

___

### rawData

• **rawData**: [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

The raw data of the item definition as it was
compiled

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:640](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L640)

___

### stateGQLAppliedValue

• `Private` **stateGQLAppliedValue**: `Object`

Contains the information about the specific applied value to an slot

#### Index signature

▪ [mergedID: `string`]: [`IItemDefinitionGQLValueType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionGQLValueType.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:722](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L722)

___

### stateHasAppliedValueTo

• `Private` **stateHasAppliedValueTo**: `Object`

Containst state information about applied values to slots

#### Index signature

▪ [mergedID: `string`]: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:716](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L716)

___

### stateInternal

• `Private` **stateInternal**: `Object`

The internal state

#### Index signature

▪ [mergedID: `string`]: `any`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:728](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L728)

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

[base/Root/Module/ItemDefinition/index.ts:1763](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1763)

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

[base/Root/Module/ItemDefinition/index.ts:2775](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2775)

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

[base/Root/Module/ItemDefinition/index.ts:2058](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2058)

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

[base/Root/Module/ItemDefinition/index.ts:1535](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1535)

___

### applyStateFromPackage

▸ **applyStateFromPackage**(`id`, `version`, `state`, `specificProperties?`, `specificIncludes?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `state` | `File` \| `Blob` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1579](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1579)

___

### applyValue

▸ **applyValue**(`id`, `version`, `value`, `excludeExtensions`, `requestFields`, `doNotApplyValueInPropertyIfPropertyHasBeenManuallySet`): `boolean`

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

#### Returns

`boolean`

a boolean on whether the action was performed, sometimes the value will not be applied
because there already exists a better one already stored for the same last modified value which contains
more fields

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1607](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1607)

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

[base/Root/Module/ItemDefinition/index.ts:1992](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1992)

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

[base/Root/Module/ItemDefinition/index.ts:2505](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2505)

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

[base/Root/Module/ItemDefinition/index.ts:2146](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2146)

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

[base/Root/Module/ItemDefinition/index.ts:2100](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2100)

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

[base/Root/Module/ItemDefinition/index.ts:2553](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2553)

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

[base/Root/Module/ItemDefinition/index.ts:2255](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2255)

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

[base/Root/Module/ItemDefinition/index.ts:2396](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2396)

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

[base/Root/Module/ItemDefinition/index.ts:2434](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2434)

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

[base/Root/Module/ItemDefinition/index.ts:2333](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2333)

___

### cleanInternalState

▸ **cleanInternalState**(`id`, `version`): `void`

Clears the internal state

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1871](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1871)

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

[base/Root/Module/ItemDefinition/index.ts:795](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L795)

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

[base/Root/Module/ItemDefinition/index.ts:1802](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1802)

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

[base/Root/Module/ItemDefinition/index.ts:2654](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2654)

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

[base/Root/Module/ItemDefinition/index.ts:2743](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2743)

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

[base/Root/Module/ItemDefinition/index.ts:2631](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2631)

___

### getAllIncludes

▸ **getAllIncludes**(): [`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

Provides all the item instances

#### Returns

[`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

an include array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1138](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1138)

___

### getAllPropertyDefinitions

▸ **getAllPropertyDefinitions**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all the property definitions without
including the extensions

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

a property definiton array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1114](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1114)

___

### getAllPropertyDefinitionsAndExtensions

▸ **getAllPropertyDefinitionsAndExtensions**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all that property defintiions
including the extensions

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

a property definition array

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1123](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1123)

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

[base/Root/Module/ItemDefinition/index.ts:2904](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2904)

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

[base/Root/Module/ItemDefinition/index.ts:1735](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1735)

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

[base/Root/Module/ItemDefinition/index.ts:2754](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2754)

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

[base/Root/Module/ItemDefinition/index.ts:2731](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2731)

___

### getChildDefinitions

▸ **getChildDefinitions**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live child definitions
without imports

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1312](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1312)

___

### getChildDefinitionsRecursive

▸ **getChildDefinitionsRecursive**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live child definitions
without imports, recursively

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1321](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1321)

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

[base/Root/Module/ItemDefinition/index.ts:1019](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1019)

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

[base/Root/Module/ItemDefinition/index.ts:1882](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1882)

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

[base/Root/Module/ItemDefinition/index.ts:1353](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1353)

___

### getImportedChildDefinitions

▸ **getImportedChildDefinitions**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live imported child definitions

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1333](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1333)

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

[base/Root/Module/ItemDefinition/index.ts:1075](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1075)

___

### getInternalState

▸ **getInternalState**(`id`, `version`): `any`

Provides the internal state of the current state

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |

#### Returns

`any`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1850](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1850)

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

[base/Root/Module/ItemDefinition/index.ts:1090](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1090)

___

### getModuleName

▸ **getModuleName**(): `string`

Provides the module name that contains this item definition

#### Returns

`string`

a string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:974](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L974)

___

### getModuleTableName

▸ **getModuleTableName**(): `string`

An utility function that returns the name of the
table that is used for the module

#### Returns

`string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2695](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2695)

___

### getName

▸ **getName**(): `string`

provides the raw name of the item definition

#### Returns

`string`

the name as a string

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:966](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L966)

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

[base/Root/Module/ItemDefinition/index.ts:1344](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1344)

___

### getParentItemDefinition

▸ **getParentItemDefinition**(): [`default`](base_Root_Module_ItemDefinition.default.md)

Provides the parent item definition

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

an item definition or throws an error if no such a thing

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1299](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1299)

___

### getParentModule

▸ **getParentModule**(): [`default`](base_Root_Module.default.md)

Just gives the parent module

#### Returns

[`default`](base_Root_Module.default.md)

a module instance

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1283](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1283)

___

### getParentingMaxChildCountAnyType

▸ **getParentingMaxChildCountAnyType**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2494](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2494)

___

### getParentingMaxChildCountSameType

▸ **getParentingMaxChildCountSameType**(): `number`

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2490](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2490)

___

### getParentingRule

▸ **getParentingRule**(): ``"ONCE"`` \| ``"ONCE_PER_OWNER"`` \| ``"MANY"``

#### Returns

``"ONCE"`` \| ``"ONCE_PER_OWNER"`` \| ``"MANY"``

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2486](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2486)

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

[base/Root/Module/ItemDefinition/index.ts:2614](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2614)

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

[base/Root/Module/ItemDefinition/index.ts:2704](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2704)

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

[base/Root/Module/ItemDefinition/index.ts:2719](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2719)

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

[base/Root/Module/ItemDefinition/index.ts:1165](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1165)

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

[base/Root/Module/ItemDefinition/index.ts:1201](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1201)

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

[base/Root/Module/ItemDefinition/index.ts:2676](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2676)

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

[base/Root/Module/ItemDefinition/index.ts:1226](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1226)

___

### getRequestLimiters

▸ **getRequestLimiters**(): [`IRequestLimitersType`](../interfaces/base_Root.IRequestLimitersType.md)

Provides the item definition and only the item definition request limiters

#### Returns

[`IRequestLimitersType`](../interfaces/base_Root.IRequestLimitersType.md)

the request limiters object or null

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:871](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L871)

___

### getRolesForCustomId

▸ **getRolesForCustomId**(): `string`[]

Provides the roles that are allowed custom ids

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2384](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2384)

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

[base/Root/Module/ItemDefinition/index.ts:2764](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2764)

___

### getRolesForVersioning

▸ **getRolesForVersioning**(): `string`[]

Provides the roles that are allowed versioning

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2319](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2319)

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

[base/Root/Module/ItemDefinition/index.ts:1957](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1957)

___

### getRolesWithModerationAccess

▸ **getRolesWithModerationAccess**(): `string`[]

Provides the roles that have moderation access to
the moderation fileds for a given item definition
given its module rule

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1981](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1981)

___

### getRolesWithReadOwnerAccess

▸ **getRolesWithReadOwnerAccess**(): `string`[]

Provides the roles that can read the current
creator of the item itself

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1944](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1944)

___

### getRolesWithSearchAccess

▸ **getRolesWithSearchAccess**(): `string`[]

Provides the roles that can search within the item
definition, will give the module search role
access if not overwritten by this

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1932](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1932)

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

[base/Root/Module/ItemDefinition/index.ts:1894](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1894)

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

[base/Root/Module/ItemDefinition/index.ts:1909](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1909)

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

[base/Root/Module/ItemDefinition/index.ts:1481](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1481)

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

[base/Root/Module/ItemDefinition/index.ts:1410](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1410)

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

[base/Root/Module/ItemDefinition/index.ts:1371](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1371)

___

### getTableName

▸ **getTableName**(): `string`

An utility function that returns the name
of the table that is used in the database

#### Returns

`string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2687](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2687)

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

[base/Root/Module/ItemDefinition/index.ts:1268](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1268)

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

[base/Root/Module/ItemDefinition/index.ts:1840](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1840)

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

[base/Root/Module/ItemDefinition/index.ts:1244](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1244)

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

[base/Root/Module/ItemDefinition/index.ts:1065](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1065)

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

[base/Root/Module/ItemDefinition/index.ts:984](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L984)

___

### hasParentItemDefinition

▸ **hasParentItemDefinition**(): `boolean`

Tells whether it has a parent item definition

**`retuns`** a boolean

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1291](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1291)

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

[base/Root/Module/ItemDefinition/index.ts:1148](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1148)

___

### init

▸ **init**(): `void`

Runs the initialization of the item definition, for cross access, this executes
once the entire tree is ready so this item definition can access other parts of the tree
Root class executes this function recursively

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:813](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L813)

___

### isExtensionsInstance

▸ **isExtensionsInstance**(): `boolean`

Checks the flag for this item definition as being
an extensions instance

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:887](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L887)

___

### isInSearchMode

▸ **isInSearchMode**(): `boolean`

Tells whether this item is the search mode item of another
item

#### Returns

`boolean`

a boolean on whether it is in search mode

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1923](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1923)

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

[base/Root/Module/ItemDefinition/index.ts:2897](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2897)

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

[base/Root/Module/ItemDefinition/index.ts:1185](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1185)

___

### isReparentingEnabled

▸ **isReparentingEnabled**(): `boolean`

Tells whether reparenting is enabled

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2482](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2482)

___

### isSearchable

▸ **isSearchable**(): `boolean`

Tells whether the item definition supports the search
endpoint and all what it entails

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2884](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2884)

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

[base/Root/Module/ItemDefinition/index.ts:905](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L905)

___

### isVersioned

▸ **isVersioned**(): `boolean`

Tells whether this item definition is versioned

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:894](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L894)

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

[base/Root/Module/ItemDefinition/index.ts:2847](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2847)

___

### mustBeParented

▸ **mustBeParented**(): `boolean`

Tells whether this item definition has parenting enforced

#### Returns

`boolean`

a boolean on whether parenting is enforced

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2474](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2474)

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

[base/Root/Module/ItemDefinition/index.ts:1780](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1780)

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

[base/Root/Module/ItemDefinition/index.ts:2791](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2791)

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

[base/Root/Module/ItemDefinition/index.ts:1706](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1706)

___

### setAsExtensionsInstance

▸ **setAsExtensionsInstance**(): `void`

Flags this item definition into an extensions instance

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:878](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L878)

___

### setInternalState

▸ **setInternalState**(`id`, `version`, `value`): `void`

Sets the internal state with a given value

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:1861](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L1861)

___

### toJSON

▸ **toJSON**(): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

Basically returns the raw data itself
doesn't do much

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

the json form

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:2603](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2603)

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

[base/Root/Module/ItemDefinition/index.ts:2813](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L2813)

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

[base/Root/Module/ItemDefinition/index.ts:506](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L506)

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

[base/Root/Module/ItemDefinition/index.ts:556](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L556)

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

[base/Root/Module/ItemDefinition/index.ts:581](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L581)

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

[base/Root/Module/ItemDefinition/index.ts:620](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/index.ts#L620)