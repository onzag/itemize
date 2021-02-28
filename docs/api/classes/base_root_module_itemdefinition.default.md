[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_root_module_itemdefinition.md) / default

# Class: default

[base/Root/Module/ItemDefinition](../modules/base_root_module_itemdefinition.md).default

This is the max expression, the item definition class
which basically compounds all how this is defined

## Table of contents

### Constructors

- [constructor](base_root_module_itemdefinition.default.md#constructor)

### Properties

- [\_gqlObj](base_root_module_itemdefinition.default.md#_gqlobj)
- [\_gqlQueryObj](base_root_module_itemdefinition.default.md#_gqlqueryobj)
- [childDefinitions](base_root_module_itemdefinition.default.md#childdefinitions)
- [cleansBlocked](base_root_module_itemdefinition.default.md#cleansblocked)
- [extensionsInstance](base_root_module_itemdefinition.default.md#extensionsinstance)
- [importedChildDefinitions](base_root_module_itemdefinition.default.md#importedchilddefinitions)
- [includeInstances](base_root_module_itemdefinition.default.md#includeinstances)
- [lastListenerCallId](base_root_module_itemdefinition.default.md#lastlistenercallid)
- [listeners](base_root_module_itemdefinition.default.md#listeners)
- [originatingInstance](base_root_module_itemdefinition.default.md#originatinginstance)
- [parentItemDefinition](base_root_module_itemdefinition.default.md#parentitemdefinition)
- [parentModule](base_root_module_itemdefinition.default.md#parentmodule)
- [policyPropertyDefinitions](base_root_module_itemdefinition.default.md#policypropertydefinitions)
- [propertyDefinitions](base_root_module_itemdefinition.default.md#propertydefinitions)
- [rawData](base_root_module_itemdefinition.default.md#rawdata)
- [stateGQLAppliedValue](base_root_module_itemdefinition.default.md#stategqlappliedvalue)
- [stateHasAppliedValueTo](base_root_module_itemdefinition.default.md#statehasappliedvalueto)
- [stateInternal](base_root_module_itemdefinition.default.md#stateinternal)

### Methods

- [addBlockCleanFor](base_root_module_itemdefinition.default.md#addblockcleanfor)
- [addListener](base_root_module_itemdefinition.default.md#addlistener)
- [applyState](base_root_module_itemdefinition.default.md#applystate)
- [applyValue](base_root_module_itemdefinition.default.md#applyvalue)
- [buildFieldsForRoleAccess](base_root_module_itemdefinition.default.md#buildfieldsforroleaccess)
- [checkCanBeParentedBy](base_root_module_itemdefinition.default.md#checkcanbeparentedby)
- [checkRoleAccessFor](base_root_module_itemdefinition.default.md#checkroleaccessfor)
- [checkRoleAccessForParenting](base_root_module_itemdefinition.default.md#checkroleaccessforparenting)
- [checkRoleCanCreateInBehalf](base_root_module_itemdefinition.default.md#checkrolecancreateinbehalf)
- [checkRoleCanCustomId](base_root_module_itemdefinition.default.md#checkrolecancustomid)
- [checkRoleCanReadOwner](base_root_module_itemdefinition.default.md#checkrolecanreadowner)
- [checkRoleCanVersion](base_root_module_itemdefinition.default.md#checkrolecanversion)
- [cleanInternalState](base_root_module_itemdefinition.default.md#cleaninternalstate)
- [cleanState](base_root_module_itemdefinition.default.md#cleanstate)
- [cleanValueFor](base_root_module_itemdefinition.default.md#cleanvaluefor)
- [containsAnExternallyCheckedProperty](base_root_module_itemdefinition.default.md#containsanexternallycheckedproperty)
- [doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull](base_root_module_itemdefinition.default.md#doesapplyingpropertyonlyapplieswhencurrentisnonnull)
- [getAbsolutePath](base_root_module_itemdefinition.default.md#getabsolutepath)
- [getAllIncludes](base_root_module_itemdefinition.default.md#getallincludes)
- [getAllPropertyDefinitions](base_root_module_itemdefinition.default.md#getallpropertydefinitions)
- [getAllPropertyDefinitionsAndExtensions](base_root_module_itemdefinition.default.md#getallpropertydefinitionsandextensions)
- [getAppliedValueOwnerIfAny](base_root_module_itemdefinition.default.md#getappliedvalueownerifany)
- [getApplyingIncludeIdsForPolicy](base_root_module_itemdefinition.default.md#getapplyingincludeidsforpolicy)
- [getApplyingPropertyIdsForPolicy](base_root_module_itemdefinition.default.md#getapplyingpropertyidsforpolicy)
- [getChildDefinitions](base_root_module_itemdefinition.default.md#getchilddefinitions)
- [getChildDefinitionsRecursive](base_root_module_itemdefinition.default.md#getchilddefinitionsrecursive)
- [getDirectlyAvailableItemDefinitionInContextFor](base_root_module_itemdefinition.default.md#getdirectlyavailableitemdefinitionincontextfor)
- [getGQLAppliedValue](base_root_module_itemdefinition.default.md#getgqlappliedvalue)
- [getI18nDataFor](base_root_module_itemdefinition.default.md#geti18ndatafor)
- [getImportedChildDefinitions](base_root_module_itemdefinition.default.md#getimportedchilddefinitions)
- [getIncludeFor](base_root_module_itemdefinition.default.md#getincludefor)
- [getInternalState](base_root_module_itemdefinition.default.md#getinternalstate)
- [getItemDefinitionRawFor](base_root_module_itemdefinition.default.md#getitemdefinitionrawfor)
- [getModuleName](base_root_module_itemdefinition.default.md#getmodulename)
- [getModuleTableName](base_root_module_itemdefinition.default.md#getmoduletablename)
- [getName](base_root_module_itemdefinition.default.md#getname)
- [getNewInstance](base_root_module_itemdefinition.default.md#getnewinstance)
- [getParentItemDefinition](base_root_module_itemdefinition.default.md#getparentitemdefinition)
- [getParentModule](base_root_module_itemdefinition.default.md#getparentmodule)
- [getPath](base_root_module_itemdefinition.default.md#getpath)
- [getPolicyNamesFor](base_root_module_itemdefinition.default.md#getpolicynamesfor)
- [getPropertiesForPolicy](base_root_module_itemdefinition.default.md#getpropertiesforpolicy)
- [getPropertyDefinitionFor](base_root_module_itemdefinition.default.md#getpropertydefinitionfor)
- [getPropertyDefinitionForPolicy](base_root_module_itemdefinition.default.md#getpropertydefinitionforpolicy)
- [getQualifiedPathName](base_root_module_itemdefinition.default.md#getqualifiedpathname)
- [getQualifiedPolicyIdentifier](base_root_module_itemdefinition.default.md#getqualifiedpolicyidentifier)
- [getRequestLimiters](base_root_module_itemdefinition.default.md#getrequestlimiters)
- [getRolesForCustomId](base_root_module_itemdefinition.default.md#getrolesforcustomid)
- [getRolesForPolicy](base_root_module_itemdefinition.default.md#getrolesforpolicy)
- [getRolesForVersioning](base_root_module_itemdefinition.default.md#getrolesforversioning)
- [getRolesWithAccessTo](base_root_module_itemdefinition.default.md#getroleswithaccessto)
- [getRolesWithFlaggingAccess](base_root_module_itemdefinition.default.md#getroleswithflaggingaccess)
- [getRolesWithModerationAccess](base_root_module_itemdefinition.default.md#getroleswithmoderationaccess)
- [getRolesWithReadOwnerAccess](base_root_module_itemdefinition.default.md#getroleswithreadowneraccess)
- [getRolesWithSearchAccess](base_root_module_itemdefinition.default.md#getroleswithsearchaccess)
- [getSearchModeCounterpart](base_root_module_itemdefinition.default.md#getsearchmodecounterpart)
- [getStandardCounterpart](base_root_module_itemdefinition.default.md#getstandardcounterpart)
- [getState](base_root_module_itemdefinition.default.md#getstate)
- [getStateNoExternalChecking](base_root_module_itemdefinition.default.md#getstatenoexternalchecking)
- [getTableName](base_root_module_itemdefinition.default.md#gettablename)
- [hasAnActiveIncludeInstanceOfId](base_root_module_itemdefinition.default.md#hasanactiveincludeinstanceofid)
- [hasAppliedValueTo](base_root_module_itemdefinition.default.md#hasappliedvalueto)
- [hasAtLeastOneActiveInstanceOf](base_root_module_itemdefinition.default.md#hasatleastoneactiveinstanceof)
- [hasIncludeFor](base_root_module_itemdefinition.default.md#hasincludefor)
- [hasItemDefinitionFor](base_root_module_itemdefinition.default.md#hasitemdefinitionfor)
- [hasParentItemDefinition](base_root_module_itemdefinition.default.md#hasparentitemdefinition)
- [hasPropertyDefinitionFor](base_root_module_itemdefinition.default.md#haspropertydefinitionfor)
- [init](base_root_module_itemdefinition.default.md#init)
- [isExtensionsInstance](base_root_module_itemdefinition.default.md#isextensionsinstance)
- [isInSearchMode](base_root_module_itemdefinition.default.md#isinsearchmode)
- [isOwnerObjectId](base_root_module_itemdefinition.default.md#isownerobjectid)
- [isPropertyInSearchModeOnly](base_root_module_itemdefinition.default.md#ispropertyinsearchmodeonly)
- [isSearchable](base_root_module_itemdefinition.default.md#issearchable)
- [isValidVersion](base_root_module_itemdefinition.default.md#isvalidversion)
- [isVersioned](base_root_module_itemdefinition.default.md#isversioned)
- [mergeWithI18n](base_root_module_itemdefinition.default.md#mergewithi18n)
- [mustBeParented](base_root_module_itemdefinition.default.md#mustbeparented)
- [removeBlockCleanFor](base_root_module_itemdefinition.default.md#removeblockcleanfor)
- [removeListener](base_root_module_itemdefinition.default.md#removelistener)
- [restoreValueFor](base_root_module_itemdefinition.default.md#restorevaluefor)
- [setAsExtensionsInstance](base_root_module_itemdefinition.default.md#setasextensionsinstance)
- [setInternalState](base_root_module_itemdefinition.default.md#setinternalstate)
- [toJSON](base_root_module_itemdefinition.default.md#tojson)
- [triggerListeners](base_root_module_itemdefinition.default.md#triggerlisteners)
- [getItemDefinitionRawFor](base_root_module_itemdefinition.default.md#getitemdefinitionrawfor)
- [getPropertyDefinitionRawFor](base_root_module_itemdefinition.default.md#getpropertydefinitionrawfor)

## Constructors

### constructor

\+ **new default**(`rawJSON`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `parentModule`: [*default*](base_root_module.default.md), `parentItemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `originatingInstance?`: [*default*](base_root_module_itemdefinition.default.md)): [*default*](base_root_module_itemdefinition.default.md)

Build a new ItemDefinition instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawJSON` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the raw json form   |
`parentModule` | [*default*](base_root_module.default.md) | the parent module instance   |
`parentItemDefinition` | [*default*](base_root_module_itemdefinition.default.md) | the parent item definition (or null)   |
`originatingInstance?` | [*default*](base_root_module_itemdefinition.default.md) | an originating instance (for instantiated detached instances)    |

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

Defined in: [base/Root/Module/ItemDefinition/index.ts:571](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L571)

## Properties

### \_gqlObj

• **\_gqlObj**: GraphQLOutputType

A cached graphql object

Defined in: [base/Root/Module/ItemDefinition/index.ts:480](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L480)

___

### \_gqlQueryObj

• **\_gqlQueryObj**: *GraphQLObjectType*<any, any, { [key: string]: *any*;  }\>

A cached graphql query object

Defined in: [base/Root/Module/ItemDefinition/index.ts:485](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L485)

___

### childDefinitions

• `Private` **childDefinitions**: [*default*](base_root_module_itemdefinition.default.md)[]

The child definitions the item definition contains

Defined in: [base/Root/Module/ItemDefinition/index.ts:494](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L494)

___

### cleansBlocked

• `Private` **cleansBlocked**: *object*

The cleans being blocked and by whom

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/index.ts:569](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L569)

___

### extensionsInstance

• `Private` **extensionsInstance**: *boolean*= false

whether this instance is for prop extensions in the module
that is an emulated item definition that only contains
the prop extensions and is generated in the module

Defined in: [base/Root/Module/ItemDefinition/index.ts:531](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L531)

___

### importedChildDefinitions

• `Private` **importedChildDefinitions**: { `definition`: [*default*](base_root_module_itemdefinition.default.md) ; `fullName`: *string*  }[]

Imported definitions that are included in the
raw data using the import mechanism, this is the
compiled form

Defined in: [base/Root/Module/ItemDefinition/index.ts:500](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L500)

___

### includeInstances

• `Private` **includeInstances**: [*default*](base_root_module_itemdefinition_include.default.md)[]

The include instances compiled from the raw data

Defined in: [base/Root/Module/ItemDefinition/index.ts:490](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L490)

___

### lastListenerCallId

• `Private` **lastListenerCallId**: *string*= ""

Events are triggered accross the tree, so this ensures that the event
doesn't trigger twice and creates a forever loop

Defined in: [base/Root/Module/ItemDefinition/index.ts:546](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L546)

___

### listeners

• `Private` **listeners**: *object*

Listeners are simple callbacks that are added and operate within
the item definition, usually added for UI level functionality

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/index.ts:537](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L537)

___

### originatingInstance

• `Private` **originatingInstance**: [*default*](base_root_module_itemdefinition.default.md)

The originating instance exists only if the current
item definition was instantiated from another and detached from
the tree, this is the tree instance it came from

Defined in: [base/Root/Module/ItemDefinition/index.ts:525](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L525)

___

### parentItemDefinition

• `Private` **parentItemDefinition**: [*default*](base_root_module_itemdefinition.default.md)

A parent item definition or null

Defined in: [base/Root/Module/ItemDefinition/index.ts:519](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L519)

___

### parentModule

• `Private` **parentModule**: [*default*](base_root_module.default.md)

The parent module

Defined in: [base/Root/Module/ItemDefinition/index.ts:515](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L515)

___

### policyPropertyDefinitions

• `Private` **policyPropertyDefinitions**: [*IPoliciesType*](../interfaces/base_root_module_itemdefinition.ipoliciestype.md)

All the policies within the item definition

Defined in: [base/Root/Module/ItemDefinition/index.ts:511](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L511)

___

### propertyDefinitions

• `Private` **propertyDefinitions**: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

All the properties within the item definition

Defined in: [base/Root/Module/ItemDefinition/index.ts:507](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L507)

___

### rawData

• **rawData**: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

The raw data of the item definition as it was
compiled

Defined in: [base/Root/Module/ItemDefinition/index.ts:475](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L475)

___

### stateGQLAppliedValue

• `Private` **stateGQLAppliedValue**: *object*

Contains the information about the specific applied value to an slot

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/index.ts:557](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L557)

___

### stateHasAppliedValueTo

• `Private` **stateHasAppliedValueTo**: *object*

Containst state information about applied values to slots

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/index.ts:551](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L551)

___

### stateInternal

• `Private` **stateInternal**: *object*

The internal state

#### Type declaration:

Defined in: [base/Root/Module/ItemDefinition/index.ts:563](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L563)

## Methods

### addBlockCleanFor

▸ **addBlockCleanFor**(`id`: *string*, `version`: *string*, `blockId`: *string*): *void*

Forces an item definition to be unable to clean its value
from memory, and rather perform a restoration to the original
value when requested to do so, use removeBlockCleanFor in order
to release this blockage, this blockage is used by the UI threads
in order to tell another UI component that it expects to use that
value so please avoid cleaning it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id   |
`version` | *string* | the version   |
`blockId` | *string* | the block identifier    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1497](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1497)

___

### addListener

▸ **addListener**(`event`: *string*, `id`: *string*, `version`: *string*, `listener`: [*ListenerType*](../modules/base_root_module.md#listenertype)): *void*

Adds a listener for an string event and id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | *string* | the event string   |
`id` | *string* | the id   |
`version` | *string* | the version   |
`listener` | [*ListenerType*](../modules/base_root_module.md#listenertype) | the listener    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:2362](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2362)

___

### applyState

▸ **applyState**(`id`: *string*, `version`: *string*, `state`: [*IItemStateType*](../interfaces/base_root_module_itemdefinition.iitemstatetype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`version` | *string* |
`state` | [*IItemStateType*](../interfaces/base_root_module_itemdefinition.iitemstatetype.md) |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1337](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1337)

___

### applyValue

▸ **applyValue**(`id`: *string*, `version`: *string*, `value`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `excludeExtensions`: *boolean*, `requestFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md), `doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers`: *boolean*): *void*

Applies a value from graphql to the item definition state

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id that this state is for (can be null)   |
`version` | *string* | the version of this state is for (can be null)   |
`value` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the value itself from graphql, DATA values and flattened values are valid.   |
`excludeExtensions` | *boolean* | whether to exclude the extensions for applying the value   |
`requestFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the fields that were used to request this data (can be null) but be careful this might be used for catching   |
`doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers` | *boolean* | to avoid hot updating values when the user is modifying them and an apply value has been called because it has been updated somewhere else, we use this to avoid overriding, note that the value must also not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back to false as it's been used applyValue on it, it's been set now by the computer    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1371](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1371)

___

### buildFieldsForRoleAccess

▸ **buildFieldsForRoleAccess**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md), `role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md)): *Promise*<[*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md)\>

Returns the FLATTENED fields for the graphql request

#### Parameters:

Name | Type |
:------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) |
`role` | *string* |
`userId` | *string* |
`ownerUserId` | *string* |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) |

**Returns:** *Promise*<[*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md)\>

Defined in: [base/Root/Module/ItemDefinition/index.ts:1734](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1734)

___

### checkCanBeParentedBy

▸ **checkCanBeParentedBy**(`parentItemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `throwError`: *boolean*): *boolean*

Given an item definition checks if this item definition allows itself to be parented
by it, that means the current item definition will be the children

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parentItemDefinition` | [*default*](base_root_module_itemdefinition.default.md) | the expected parent   |
`throwError` | *boolean* | whether to throw an error if failed   |

**Returns:** *boolean*

a boolean on whether the item definition is an allowed parent

Defined in: [base/Root/Module/ItemDefinition/index.ts:2100](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2100)

___

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md), `role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `requestedFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md), `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Checks the role access for an action in an item
defintition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the IO action   |
`role` | *string* | the role of the user attempting the action   |
`userId` | *string* | the user id of the user attempting the action   |
`ownerUserId` | *string* | the owner of that item definition   |
`requestedFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the requested fields (single properties will be checked as well)   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |
`throwError` | *boolean* | whether to throw an error if failed (otherwise returns a boolean)   |

**Returns:** *Promise*<boolean\>

a boolean on whether the user is allowed

Defined in: [base/Root/Module/ItemDefinition/index.ts:1812](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1812)

___

### checkRoleAccessForParenting

▸ **checkRoleAccessForParenting**(`role`: *string*, `userId`: *string*, `parentOwnerUserId`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Checks whether the current user, has access to create an item and parent it
according to his role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | *string* | the role of the user   |
`userId` | *string* | the user id   |
`parentOwnerUserId` | *string* | the parent owner user id of the item this user is trying to parent   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |
`throwError` | *boolean* | whether to throw an error   |

**Returns:** *Promise*<boolean\>

a boolean on whether parenting is allowed

Defined in: [base/Root/Module/ItemDefinition/index.ts:2148](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2148)

___

### checkRoleCanCreateInBehalf

▸ **checkRoleCanCreateInBehalf**(`role`: *string*, `targetRole`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Tells whether the object can be created in behalf of another user
rather than the user itself, this is incompatible with
ownerIsObjectId

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | *string* |  |
`targetRole` | *string* | - |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |
`throwError` | *boolean* | whether to throw an error if failed (otherwise returns a boolean)   |

**Returns:** *Promise*<boolean\>

a boolean on whether the user is allowed

Defined in: [base/Root/Module/ItemDefinition/index.ts:1907](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1907)

___

### checkRoleCanCustomId

▸ **checkRoleCanCustomId**(`role`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Checks whether a given role can provide a custom id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | *string* | the role of the user   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |
`throwError` | *boolean* | whether to throw an error in case of failure    |

**Returns:** *Promise*<boolean\>

Defined in: [base/Root/Module/ItemDefinition/index.ts:2029](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2029)

___

### checkRoleCanReadOwner

▸ **checkRoleCanReadOwner**(`role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Checks whether a given role can read the owner of a given item

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | *string* | the role of the user   |
`userId` | *string* | the user id of that user   |
`ownerUserId` | *string* | the owner of the current unversioned value   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |
`throwError` | *boolean* | whether to throw an error in case of failure    |

**Returns:** *Promise*<boolean\>

Defined in: [base/Root/Module/ItemDefinition/index.ts:2058](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2058)

___

### checkRoleCanVersion

▸ **checkRoleCanVersion**(`role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Checks whether a given role can version an item resources

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | *string* | the role of the user   |
`userId` | *string* | the user id of that user   |
`ownerUserId` | *string* | the owner of the current unversioned value   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | - |
`throwError` | *boolean* | whether to throw an error in case of failure    |

**Returns:** *Promise*<boolean\>

Defined in: [base/Root/Module/ItemDefinition/index.ts:1976](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1976)

___

### cleanInternalState

▸ **cleanInternalState**(`id`: *string*, `version`: *string*): *void*

Clears the internal state

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`version` | *string* |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1605](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1605)

___

### cleanState

▸ **cleanState**(`init?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`init?` | *boolean* |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:630](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L630)

___

### cleanValueFor

▸ **cleanValueFor**(`id`: *string*, `version`: *string*, `excludeExtensions?`: *boolean*, `force?`: *boolean*): *boolean*

Wipes down a value and its state and everything out of memory
this might not be important in the client side but very important
in the server side, not cleaning the memory can become a memory leak

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the state   |
`version` | *string* | the version of the state   |
`excludeExtensions?` | *boolean* | whether to include the extensions of the parent   |
`force?` | *boolean* | ignores the blockage, will clean anyway   |

**Returns:** *boolean*

a boolean where true refers to whether it was cleaned and false it was restored
because the cleaning was blocked from performing

Defined in: [base/Root/Module/ItemDefinition/index.ts:1536](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1536)

___

### containsAnExternallyCheckedProperty

▸ **containsAnExternallyCheckedProperty**(`onlyCheckProperties?`: *string*[], `ignoreIncludes?`: *boolean*): *boolean*

Returns true is one of the property has to be externally checked
either by database or rest endpoints, this is basically unique
values

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`onlyCheckProperties?` | *string*[] | only to check the properties in this list   |
`ignoreIncludes?` | *boolean* | whether to ignore the sinked in properties in the includes   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/index.ts:2241](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2241)

___

### doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull

▸ **doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull**(`type`: *string*, `name`: *string*): *boolean*

Tells whether the list of applying properties only applies when going from a non null
value to a new value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`type` | *string* | the policy type   |
`name` | *string* | the policy name   |

**Returns:** *boolean*

a boolean value

Defined in: [base/Root/Module/ItemDefinition/index.ts:2330](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2330)

___

### getAbsolutePath

▸ **getAbsolutePath**(): *string*[]

Provides the absolute path all the way
from the root

**Returns:** *string*[]

an array of string that represents
the whole absolute path from the root

Defined in: [base/Root/Module/ItemDefinition/index.ts:2218](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2218)

___

### getAllIncludes

▸ **getAllIncludes**(): [*default*](base_root_module_itemdefinition_include.default.md)[]

Provides all the item instances

**Returns:** [*default*](base_root_module_itemdefinition_include.default.md)[]

an include array

Defined in: [base/Root/Module/ItemDefinition/index.ts:973](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L973)

___

### getAllPropertyDefinitions

▸ **getAllPropertyDefinitions**(): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

Provides all the property definitions without
including the extensions

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

a property definiton array

Defined in: [base/Root/Module/ItemDefinition/index.ts:949](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L949)

___

### getAllPropertyDefinitionsAndExtensions

▸ **getAllPropertyDefinitionsAndExtensions**(): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

Provides all that property defintiions
including the extensions

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

a property definition array

Defined in: [base/Root/Module/ItemDefinition/index.ts:958](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L958)

___

### getAppliedValueOwnerIfAny

▸ **getAppliedValueOwnerIfAny**(`id`: *string*, `version`: *string*): *string*

Provides the owner that applied the value for the
applied value, basically the created_by value
(or id if owner is object id, which is only relevant for users honestly)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the state   |
`version` | *string* | the version of the slot   |

**Returns:** *string*

a string, will return UNSPECIFIED_OWNER if it cannot find anything

Defined in: [base/Root/Module/ItemDefinition/index.ts:1469](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1469)

___

### getApplyingIncludeIdsForPolicy

▸ **getApplyingIncludeIdsForPolicy**(`type`: *string*, `name`: *string*): *string*[]

Provides all the include ids that are affected by the given policy

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`type` | *string* | the policy type "edit", "delete", "read" or "parent"   |
`name` | *string* | the policy name   |

**Returns:** *string*[]

an array of string or null (if no applying includes)

Defined in: [base/Root/Module/ItemDefinition/index.ts:2341](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2341)

___

### getApplyingPropertyIdsForPolicy

▸ **getApplyingPropertyIdsForPolicy**(`type`: *string*, `name`: *string*): *string*[]

Provides all the property ids that are affected by a given policy

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`type` | *string* | the policy type "edit", "delete", "read" or "parent"   |
`name` | *string* | the policy name   |

**Returns:** *string*[]

an array of string or null (if no applying properties)

Defined in: [base/Root/Module/ItemDefinition/index.ts:2318](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2318)

___

### getChildDefinitions

▸ **getChildDefinitions**(): [*default*](base_root_module_itemdefinition.default.md)[]

Provides the live child definitions
without imports

**Returns:** [*default*](base_root_module_itemdefinition.default.md)[]

an array of item definitions

Defined in: [base/Root/Module/ItemDefinition/index.ts:1147](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1147)

___

### getChildDefinitionsRecursive

▸ **getChildDefinitionsRecursive**(): [*default*](base_root_module_itemdefinition.default.md)[]

Provides the live child definitions
without imports, recursively

**Returns:** [*default*](base_root_module_itemdefinition.default.md)[]

an array of item definitions

Defined in: [base/Root/Module/ItemDefinition/index.ts:1156](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1156)

___

### getDirectlyAvailableItemDefinitionInContextFor

▸ **getDirectlyAvailableItemDefinitionInContextFor**(`name`: *string*, `avoidImports?`: *boolean*): [*default*](base_root_module_itemdefinition.default.md)

Gets a live item definition for the current item definition
either as a children or a detached instance that came from
another item definition as an import

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | the name of the item definition   |
`avoidImports?` | *boolean* | whether to avoid imported items   |

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

an item definition, will throw an error if not found

Defined in: [base/Root/Module/ItemDefinition/index.ts:854](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L854)

___

### getGQLAppliedValue

▸ **getGQLAppliedValue**(`id`: *string*, `version`: *string*): [*IItemDefinitionGQLValueType*](../interfaces/base_root_module_itemdefinition.iitemdefinitiongqlvaluetype.md)

Provides the applied value for the id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id   |
`version` | *string* | the version   |

**Returns:** [*IItemDefinitionGQLValueType*](../interfaces/base_root_module_itemdefinition.iitemdefinitiongqlvaluetype.md)

the applied value structure

Defined in: [base/Root/Module/ItemDefinition/index.ts:1616](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1616)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`: *string*): [*IRawJsonI18NSpecificLocaleDataType*](../interfaces/base_root_module.irawjsoni18nspecificlocaledatatype.md)

Provides the item definition item locale data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the locale in iso form   |

**Returns:** [*IRawJsonI18NSpecificLocaleDataType*](../interfaces/base_root_module.irawjsoni18nspecificlocaledatatype.md)

an object or null (if locale not valid)

Defined in: [base/Root/Module/ItemDefinition/index.ts:1188](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1188)

___

### getImportedChildDefinitions

▸ **getImportedChildDefinitions**(): [*default*](base_root_module_itemdefinition.default.md)[]

Provides the live imported child definitions

**Returns:** [*default*](base_root_module_itemdefinition.default.md)[]

an array of item definitions

Defined in: [base/Root/Module/ItemDefinition/index.ts:1168](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1168)

___

### getIncludeFor

▸ **getIncludeFor**(`id`: *string*): [*default*](base_root_module_itemdefinition_include.default.md)

provides an include within this item defintion that has that
specific id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the include   |

**Returns:** [*default*](base_root_module_itemdefinition_include.default.md)

the include if any, would throw an error if not found

Defined in: [base/Root/Module/ItemDefinition/index.ts:910](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L910)

___

### getInternalState

▸ **getInternalState**(`id`: *string*, `version`: *string*): *any*

Provides the internal state of the current state

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`version` | *string* |

**Returns:** *any*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1584](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1584)

___

### getItemDefinitionRawFor

▸ **getItemDefinitionRawFor**(`name`: *string*, `avoidImports?`: *boolean*): [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

Provides a raw json item definition that it has a children

**`throws`** an error if the item definition does not exist

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | the name of the item definition   |
`avoidImports?` | *boolean* | optional whether to avoid imported item definitions   |

**Returns:** [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

a raw item definition

Defined in: [base/Root/Module/ItemDefinition/index.ts:925](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L925)

___

### getModuleName

▸ **getModuleName**(): *string*

Provides the module name that contains this item definition

**Returns:** *string*

a string

Defined in: [base/Root/Module/ItemDefinition/index.ts:809](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L809)

___

### getModuleTableName

▸ **getModuleTableName**(): *string*

An utility function that returns the name of the
table that is used for the module

**Returns:** *string*

Defined in: [base/Root/Module/ItemDefinition/index.ts:2282](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2282)

___

### getName

▸ **getName**(): *string*

provides the raw name of the item definition

**Returns:** *string*

the name as a string

Defined in: [base/Root/Module/ItemDefinition/index.ts:801](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L801)

___

### getNewInstance

▸ **getNewInstance**(): [*default*](base_root_module_itemdefinition.default.md)

Uses the raw data to instantiate a new instance of
the item definition, uses the same on state change
function for state changes so it remains linked to the
module

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

a new ItemDefiniton instance

Defined in: [base/Root/Module/ItemDefinition/index.ts:1179](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1179)

___

### getParentItemDefinition

▸ **getParentItemDefinition**(): [*default*](base_root_module_itemdefinition.default.md)

Provides the parent item definition

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

an item definition or throws an error if no such a thing

Defined in: [base/Root/Module/ItemDefinition/index.ts:1134](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1134)

___

### getParentModule

▸ **getParentModule**(): [*default*](base_root_module.default.md)

Just gives the parent module

**Returns:** [*default*](base_root_module.default.md)

a module instance

Defined in: [base/Root/Module/ItemDefinition/index.ts:1118](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1118)

___

### getPath

▸ **getPath**(): *string*[]

Provides the path from the module
base, that is not absolute but a relative
path from the parent module

**Returns:** *string*[]

an array of string that represent
the path concatenated all the way to the module path to the root

Defined in: [base/Root/Module/ItemDefinition/index.ts:2201](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2201)

___

### getPolicyNamesFor

▸ **getPolicyNamesFor**(`policyType`: *string*): *string*[]

Provides all policy names included in the policy of type

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`policyType` | *string* | the policy type, "edit", "read", "delete" or "parent"   |

**Returns:** *string*[]

an array with strings of policy names

Defined in: [base/Root/Module/ItemDefinition/index.ts:2291](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2291)

___

### getPropertiesForPolicy

▸ **getPropertiesForPolicy**(`type`: *string*, `name`: *string*): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

Provides all live properties for a policy, these properties
are detached properties, new instances of the old property and hold
their own states

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`type` | *string* | the type "edit", "delete", "read" or "parent"   |
`name` | *string* | the policy name that was set   |

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

an array of properties

Defined in: [base/Root/Module/ItemDefinition/index.ts:2306](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2306)

___

### getPropertyDefinitionFor

▸ **getPropertyDefinitionFor**(`id`: *string*, `includeExtensions`: *boolean*): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

Provides a live property definition for an item definition
this property definition can trigger state changes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the property definition id   |
`includeExtensions` | *boolean* | whether to include extensions or not   |

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

a property definition or throws an error if not found

Defined in: [base/Root/Module/ItemDefinition/index.ts:1000](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1000)

___

### getPropertyDefinitionForPolicy

▸ **getPropertyDefinitionForPolicy**(`policyType`: *string*, `policyName`: *string*, `id`: *string*): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

Provides a property definition based on a policy
this is a unique instance that holds its own state
and it's reflected in the item definition state

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`policyType` | *string* | the policy type   |
`policyName` | *string* | the policy name   |
`id` | *string* | the property id   |

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

a property definition or throws an error if not found

Defined in: [base/Root/Module/ItemDefinition/index.ts:1036](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1036)

___

### getQualifiedPathName

▸ **getQualifiedPathName**(): *string*

Provides the qualified path name
of this item definition, which is unique for
this root instance

**Returns:** *string*

the very useful qualified path name

Defined in: [base/Root/Module/ItemDefinition/index.ts:2263](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2263)

___

### getQualifiedPolicyIdentifier

▸ **getQualifiedPolicyIdentifier**(`policyType`: *string*, `policyName`: *string*, `id`: *string*): *string*

Provides the qualified identifier for a given policy as it is described

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`policyType` | *string* | the policy type   |
`policyName` | *string* | the policy name   |
`id` | *string* | the property id   |

**Returns:** *string*

a property definition or throws an error if not found

Defined in: [base/Root/Module/ItemDefinition/index.ts:1061](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1061)

___

### getRequestLimiters

▸ **getRequestLimiters**(): [*IRequestLimitersType*](../interfaces/base_root.irequestlimiterstype.md)

Provides the item definition and only the item definition request limiters

**Returns:** [*IRequestLimitersType*](../interfaces/base_root.irequestlimiterstype.md)

the request limiters object or null

Defined in: [base/Root/Module/ItemDefinition/index.ts:706](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L706)

___

### getRolesForCustomId

▸ **getRolesForCustomId**(): *string*[]

Provides the roles that are allowed custom ids

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/index.ts:2017](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2017)

___

### getRolesForPolicy

▸ **getRolesForPolicy**(`type`: *string*, `name`: *string*): *string*[]

Provides all the roles that are affected by a policy

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`type` | *string* | the policy type "edit", "delete", "read" or "parent"   |
`name` | *string* | the policy name   |

**Returns:** *string*[]

an array of string

Defined in: [base/Root/Module/ItemDefinition/index.ts:2351](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2351)

___

### getRolesForVersioning

▸ **getRolesForVersioning**(): *string*[]

Provides the roles that are allowed versioning

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/index.ts:1962](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1962)

___

### getRolesWithAccessTo

▸ **getRolesWithAccessTo**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md)): *string*[]

Provides the roles that have access to a given
action based on the rules that were set

**`retuns`** an array of string that represent the roles

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the action from the ItemDefinitionIOActions   |

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/index.ts:1691](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1691)

___

### getRolesWithFlaggingAccess

▸ **getRolesWithFlaggingAccess**(): *string*[]

Provides the roles that are alowed to flag the
contents of an item definition given its module

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/index.ts:1723](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1723)

___

### getRolesWithModerationAccess

▸ **getRolesWithModerationAccess**(): *string*[]

Provides the roles that have moderation access to
the moderation fileds for a given item definition
given its module rule

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/index.ts:1715](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1715)

___

### getRolesWithReadOwnerAccess

▸ **getRolesWithReadOwnerAccess**(): *string*[]

Provides the roles that can read the current
creator of the item itself

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/index.ts:1678](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1678)

___

### getRolesWithSearchAccess

▸ **getRolesWithSearchAccess**(): *string*[]

Provides the roles that can search within the item
definition, will give the module search role
access if not overwritten by this

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/index.ts:1666](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1666)

___

### getSearchModeCounterpart

▸ **getSearchModeCounterpart**(): [*default*](base_root_module_itemdefinition.default.md)

Provides the item definition that represent the search mode of this
same item definition

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

an ItemDefinition, this function will crash if you are already
in the search mode counterpart

Defined in: [base/Root/Module/ItemDefinition/index.ts:1628](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1628)

___

### getStandardCounterpart

▸ **getStandardCounterpart**(): [*default*](base_root_module_itemdefinition.default.md)

Basically only works in search mode item definitions, and provides the standard
counterpart

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

an ItemDefinition, this function will crash if you are already
in the standard mode counterpart

Defined in: [base/Root/Module/ItemDefinition/index.ts:1643](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1643)

___

### getState

▸ **getState**(`id`: *string*, `version`: *string*, `onlyIncludeProperties?`: *string*[], `onlyIncludeIncludes?`: { [include: string]: *string*[];  }, `excludePolicies?`: *boolean*): *Promise*<[*IItemStateType*](../interfaces/base_root_module_itemdefinition.iitemstatetype.md)\>

provides the structure of the current item
as it is currently, the reason this is more efficient
is because getting the value of each item definition
wastes resources, so using this function is more
efficient than calling the functions

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the stored value of the item definition, pass null if new this also represens the slot   |
`version` | *string* | the stored value given a version pass null for default   |
`onlyIncludeProperties?` | *string*[] | only includes these specific properties, note property definitions are not fetched in this case   |
`onlyIncludeIncludes?` | *object* | includes the includes in the list   |
`excludePolicies?` | *boolean* | excludes all the policies state bit   |

**Returns:** *Promise*<[*IItemStateType*](../interfaces/base_root_module_itemdefinition.iitemstatetype.md)\>

a promise for the item definition state

Defined in: [base/Root/Module/ItemDefinition/index.ts:1283](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1283)

___

### getStateNoExternalChecking

▸ **getStateNoExternalChecking**(`id`: *string*, `version`: *string*, `emulateExternalChecking?`: *boolean*, `onlyIncludeProperties?`: *string*[], `onlyIncludeIncludes?`: { [include: string]: *string*[];  }, `excludePolicies?`: *boolean*): [*IItemStateType*](../interfaces/base_root_module_itemdefinition.iitemstatetype.md)

same as getCurrentValue but ignores external checking
so it doesn't have to be async and no need to spend
network resources, checks most, but ignores unique checkings
in order to get cached previously checked results

**`retrns`** the item definition state without extenral checks

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the stored value of the item definition, pass null if new   |
`version` | *string* | the store value of the version, only applies if id specified   |
`emulateExternalChecking?` | *boolean* | emulates an externally checked property as the get current value async leaves a cache behind and this will use the cache rather than re-requesting   |
`onlyIncludeProperties?` | *string*[] | only includes these specific properties, note property definitions are not fetched in this case   |
`onlyIncludeIncludes?` | *object* | includes the includes in the list   |
`excludePolicies?` | *boolean* | excludes all the policies state   |

**Returns:** [*IItemStateType*](../interfaces/base_root_module_itemdefinition.iitemstatetype.md)

Defined in: [base/Root/Module/ItemDefinition/index.ts:1212](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1212)

___

### getTableName

▸ **getTableName**(): *string*

An utility function that returns the name
of the table that is used in the database

**Returns:** *string*

Defined in: [base/Root/Module/ItemDefinition/index.ts:2274](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2274)

___

### hasAnActiveIncludeInstanceOfId

▸ **hasAnActiveIncludeInstanceOfId**(`id`: *string*, `version`: *string*, `includeId`: *string*): *boolean*

Checks whether it has an active instance of an item
given its include id (not its name)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id   |
`version` | *string* | the slot version   |
`includeId` | *string* | the id of the item   |

**Returns:** *boolean*

a boolean on whether it does

Defined in: [base/Root/Module/ItemDefinition/index.ts:1103](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1103)

___

### hasAppliedValueTo

▸ **hasAppliedValueTo**(`id`: *string*, `version`: *string*): *boolean*

Checks whether given the state id, there is an applied
value for it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id   |
`version` | *string* | the version   |

**Returns:** *boolean*

a boolean on whether it does or not

Defined in: [base/Root/Module/ItemDefinition/index.ts:1574](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1574)

___

### hasAtLeastOneActiveInstanceOf

▸ **hasAtLeastOneActiveInstanceOf**(`id`: *string*, `version`: *string*, `name`: *string*): *boolean*

Tells whether the current item definition has items itself
which are active and match the specific name
that means the item is not excluded and the item is
matches the name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the slot id of the current state   |
`version` | *string* | the slot version of the current state   |
`name` | *string* | the name of the item   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/index.ts:1079](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1079)

___

### hasIncludeFor

▸ **hasIncludeFor**(`id`: *string*): *boolean*

Checks whether an item included in this item definition
has an specific id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the include   |

**Returns:** *boolean*

a boolean on whether it has such include

Defined in: [base/Root/Module/ItemDefinition/index.ts:900](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L900)

___

### hasItemDefinitionFor

▸ **hasItemDefinitionFor**(`name`: *string*, `avoidImports?`: *boolean*): *boolean*

Tells whether an item definition has a child item definition for it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | the name of the item definition   |
`avoidImports?` | *boolean* | whether to avoid the imported detached definitions   |

**Returns:** *boolean*

a boolean on whether it does or not

Defined in: [base/Root/Module/ItemDefinition/index.ts:819](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L819)

___

### hasParentItemDefinition

▸ **hasParentItemDefinition**(): *boolean*

Tells whether it has a parent item definition

**`retuns`** a boolean

**Returns:** *boolean*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1126](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1126)

___

### hasPropertyDefinitionFor

▸ **hasPropertyDefinitionFor**(`id`: *string*, `includeExtensions`: *boolean*): *boolean*

Checks whether an item definition has a property definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the property definition id   |
`includeExtensions` | *boolean* | whether to include extensions or not   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/index.ts:983](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L983)

___

### init

▸ **init**(): *void*

Runs the initialization of the item definition, for cross access, this executes
once the entire tree is ready so this item definition can access other parts of the tree
Root class executes this function recursively

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:648](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L648)

___

### isExtensionsInstance

▸ **isExtensionsInstance**(): *boolean*

Checks the flag for this item definition as being
an extensions instance

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/index.ts:722](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L722)

___

### isInSearchMode

▸ **isInSearchMode**(): *boolean*

Tells whether this item is the search mode item of another
item

**Returns:** *boolean*

a boolean on whether it is in search mode

Defined in: [base/Root/Module/ItemDefinition/index.ts:1657](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1657)

___

### isOwnerObjectId

▸ **isOwnerObjectId**(): *boolean*

Checks whether the owner of this item definition is not supposed to be
the created_by field but rather the id field, this only makes sense
in users, an user owns itself

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/index.ts:2478](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2478)

___

### isPropertyInSearchModeOnly

▸ **isPropertyInSearchModeOnly**(`id`: *string*): *boolean*

Given a string id it specifies whether it is considered
a search only property only available in the search mode

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the property   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/index.ts:1020](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1020)

___

### isSearchable

▸ **isSearchable**(): *boolean*

Tells whether the item definition supports the search
endpoint and all what it entails

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/ItemDefinition/index.ts:2465](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2465)

___

### isValidVersion

▸ **isValidVersion**(`version`: *string*, `supportedLanguages`: *string*[]): *boolean*

Tells whether a version is a valid value for this item definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`version` | *string* | the version id   |
`supportedLanguages` | *string*[] | the array list of supported language this function is unaware of supported languages so it needs to ask in order to check for a version   |

**Returns:** *boolean*

a boolean on whether it's a valid version

Defined in: [base/Root/Module/ItemDefinition/index.ts:740](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L740)

___

### isVersioned

▸ **isVersioned**(): *boolean*

Tells whether this item definition is versioned

**Returns:** *boolean*

Defined in: [base/Root/Module/ItemDefinition/index.ts:729](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L729)

___

### mergeWithI18n

▸ **mergeWithI18n**(`mod`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `idef`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)): *void*

Merges two i18n data components, for example the i18n data for
the english build and the i18n data for the russian build, that way
the state is not lost

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mod` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw module that is merging   |
`idef` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the raw item definition that is merging    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:2428](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2428)

___

### mustBeParented

▸ **mustBeParented**(): *boolean*

Tells whether this item definition has parenting enforced

**Returns:** *boolean*

a boolean on whether parenting is enforced

Defined in: [base/Root/Module/ItemDefinition/index.ts:2089](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2089)

___

### removeBlockCleanFor

▸ **removeBlockCleanFor**(`id`: *string*, `version`: *string*, `blockId`: *string*): *void*

Removes the blockage of the clean

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id   |
`version` | *string* | the version   |
`blockId` | *string* | the given blockage id    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1514](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1514)

___

### removeListener

▸ **removeListener**(`event`: *string*, `id`: *string*, `version`: *string*, `listener`: [*ListenerType*](../modules/base_root_module.md#listenertype)): *void*

Removes a listener

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | *string* | the event string   |
`id` | *string* | the id   |
`version` | *string* | the version   |
`listener` | [*ListenerType*](../modules/base_root_module.md#listenertype) | the listener    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:2378](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2378)

___

### restoreValueFor

▸ **restoreValueFor**(`id`: *string*, `version`: *string*, `excludeExtensions?`: *boolean*): *void*

Restores an applied value to the last applied value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id   |
`version` | *string* | the version   |
`excludeExtensions?` | *boolean* | whether to exclude extensions of all this    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1440](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1440)

___

### setAsExtensionsInstance

▸ **setAsExtensionsInstance**(): *void*

Flags this item definition into an extensions instance

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:713](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L713)

___

### setInternalState

▸ **setInternalState**(`id`: *string*, `version`: *string*, `value`: *any*): *void*

Sets the internal state with a given value

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`version` | *string* |
`value` | *any* |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:1595](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L1595)

___

### toJSON

▸ **toJSON**(): [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

Basically returns the raw data itself
doesn't do much

**Returns:** [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

the json form

Defined in: [base/Root/Module/ItemDefinition/index.ts:2190](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2190)

___

### triggerListeners

▸ **triggerListeners**(`event`: *string*, `id`: *string*, `version`: *string*, `but?`: [*ListenerType*](../modules/base_root_module.md#listenertype), `callId?`: *string*): *void*

Triggers a listener for a given id
note this will affect the extensions as well because
their states are correlated

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | *string* | the event   |
`id` | *string* | the id   |
`version` | *string* | the version   |
`but?` | [*ListenerType*](../modules/base_root_module.md#listenertype) | a function not to trigger (one of the listeners)   |
`callId?` | *string* | a call id, it's an unique identifier for this event, it will be autogenerated if not provided and it's the best to leave it be autogenerated    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/index.ts:2400](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L2400)

___

### getItemDefinitionRawFor

▸ `Static`**getItemDefinitionRawFor**(`itemDefinitionRaw`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `parentModuleRaw`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `name`: *string*, `avoidImports?`: *boolean*): [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

A raw helper function that gets a child or imported
raw item definition for an item, it's static, so it works
with raw json data, it throws no error

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinitionRaw` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the json for the item definition   |
`parentModuleRaw` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the parent module that contains this same item definition raw   |
`name` | *string* | the name of the expected child item   |
`avoidImports?` | *boolean* | whether to avoid imported items from the module   |

**Returns:** [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

a raw item definition if found, or null

Defined in: [base/Root/Module/ItemDefinition/index.ts:401](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L401)

___

### getPropertyDefinitionRawFor

▸ `Static`**getPropertyDefinitionRawFor**(`itemDefinitionRaw`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `parentModuleRaw`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `id`: *string*, `includeExtensions`: *boolean*): [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

A raw helper function that takes raw json data and returns
a property definition if it finds it based on its id
it also checks prop extensions

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinitionRaw` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the raw item definition to be searched   |
`parentModuleRaw` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw module   |
`id` | *string* | the id of the property   |
`includeExtensions` | *boolean* | whether to include the extensions   |

**Returns:** [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

a raw property definition if found, or null

Defined in: [base/Root/Module/ItemDefinition/index.ts:451](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/index.ts#L451)
