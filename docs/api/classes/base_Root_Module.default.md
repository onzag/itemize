[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module](../modules/base_Root_Module.md) / default

# Class: default

[base/Root/Module](../modules/base_Root_Module.md).default

The class module that defines how the module behaves

## Table of contents

### Constructors

- [constructor](base_Root_Module.default.md#constructor)

### Properties

- [childItemDefinitions](base_Root_Module.default.md#childitemdefinitions)
- [childModules](base_Root_Module.default.md#childmodules)
- [childPropExtensionItemDefinition](base_Root_Module.default.md#childpropextensionitemdefinition)
- [parentModule](base_Root_Module.default.md#parentmodule)
- [parentRoot](base_Root_Module.default.md#parentroot)
- [propExtensions](base_Root_Module.default.md#propextensions)
- [rawData](base_Root_Module.default.md#rawdata)
- [searchModeModule](base_Root_Module.default.md#searchmodemodule)

### Methods

- [applySoftReadRoleAccessTo](base_Root_Module.default.md#applysoftreadroleaccessto)
- [checkRoleAccessFor](base_Root_Module.default.md#checkroleaccessfor)
- [checkRoleAccessForIgnoreLimiters](base_Root_Module.default.md#checkroleaccessforignorelimiters)
- [checkRoleAccessForModeration](base_Root_Module.default.md#checkroleaccessformoderation)
- [cleanState](base_Root_Module.default.md#cleanstate)
- [getAllChildDefinitionsRecursive](base_Root_Module.default.md#getallchilddefinitionsrecursive)
- [getAllChildItemDefinitions](base_Root_Module.default.md#getallchilditemdefinitions)
- [getAllModules](base_Root_Module.default.md#getallmodules)
- [getAllPropExtensions](base_Root_Module.default.md#getallpropextensions)
- [getChildModule](base_Root_Module.default.md#getchildmodule)
- [getI18nDataFor](base_Root_Module.default.md#geti18ndatafor)
- [getItemDefinitionFor](base_Root_Module.default.md#getitemdefinitionfor)
- [getItemDefinitionRawFor](base_Root_Module.default.md#getitemdefinitionrawfor)
- [getMaxSearchRecords](base_Root_Module.default.md#getmaxsearchrecords)
- [getMaxSearchResults](base_Root_Module.default.md#getmaxsearchresults)
- [getModuleFor](base_Root_Module.default.md#getmodulefor)
- [getName](base_Root_Module.default.md#getname)
- [getParentModule](base_Root_Module.default.md#getparentmodule)
- [getParentRoot](base_Root_Module.default.md#getparentroot)
- [getPath](base_Root_Module.default.md#getpath)
- [getPropExtensionFor](base_Root_Module.default.md#getpropextensionfor)
- [getPropExtensionItemDefinition](base_Root_Module.default.md#getpropextensionitemdefinition)
- [getQualifiedPathName](base_Root_Module.default.md#getqualifiedpathname)
- [getRolesWithAccessTo](base_Root_Module.default.md#getroleswithaccessto)
- [getRolesWithModerationAccess](base_Root_Module.default.md#getroleswithmoderationaccess)
- [getRolesWithSearchAccess](base_Root_Module.default.md#getroleswithsearchaccess)
- [getSearchLimiters](base_Root_Module.default.md#getsearchlimiters)
- [getSearchModule](base_Root_Module.default.md#getsearchmodule)
- [getStandardModule](base_Root_Module.default.md#getstandardmodule)
- [getTableName](base_Root_Module.default.md#gettablename)
- [hasItemDefinitionFor](base_Root_Module.default.md#hasitemdefinitionfor)
- [hasParentModule](base_Root_Module.default.md#hasparentmodule)
- [hasPropExtensionFor](base_Root_Module.default.md#haspropextensionfor)
- [init](base_Root_Module.default.md#init)
- [isInSearchMode](base_Root_Module.default.md#isinsearchmode)
- [isPropExtensionInSearchModeOnly](base_Root_Module.default.md#ispropextensioninsearchmodeonly)
- [isSearchEngineEnabled](base_Root_Module.default.md#issearchengineenabled)
- [isSearchable](base_Root_Module.default.md#issearchable)
- [listModuleNames](base_Root_Module.default.md#listmodulenames)
- [mergeWithI18n](base_Root_Module.default.md#mergewithi18n)
- [buildSearchMode](base_Root_Module.default.md#buildsearchmode)
- [getItemDefinitionRawFor](base_Root_Module.default.md#getitemdefinitionrawfor-1)
- [getPropExtensionRawFor](base_Root_Module.default.md#getpropextensionrawfor)

## Constructors

### constructor

• **new default**(`rawJSON`, `parentRoot`, `parentModule`, `disableSearchModeRetrieval?`): [`default`](base_Root_Module.default.md)

Builds a module from raw json data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawJSON` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | the raw json data of the module |
| `parentRoot` | [`default`](base_Root.default.md) | the root that contains the module |
| `parentModule` | [`default`](base_Root_Module.default.md) | the parent module of the module, can be null |
| `disableSearchModeRetrieval?` | `boolean` | makes the search module be null and it's not calculated this is for use because search modules are generated automatically on every instance this would create an infite loop if this option wasn't available |

#### Returns

[`default`](base_Root_Module.default.md)

#### Defined in

[base/Root/Module/index.ts:347](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L347)

## Properties

### childItemDefinitions

• `Private` **childItemDefinitions**: [`default`](base_Root_Module_ItemDefinition.default.md)[]

The children item definitions, as instances

#### Defined in

[base/Root/Module/index.ts:321](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L321)

___

### childModules

• `Private` **childModules**: [`default`](base_Root_Module.default.md)[]

The children modules as instances

#### Defined in

[base/Root/Module/index.ts:325](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L325)

___

### childPropExtensionItemDefinition

• `Private` **childPropExtensionItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

The prop extensions emulated item definition that contains
all the prop extensions as an item definition itself

#### Defined in

[base/Root/Module/index.ts:330](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L330)

___

### parentModule

• `Private` **parentModule**: [`default`](base_Root_Module.default.md)

The parent module, if any of this module instance
as an instance

#### Defined in

[base/Root/Module/index.ts:310](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L310)

___

### parentRoot

• `Private` **parentRoot**: [`default`](base_Root.default.md)

The root that contains the module

#### Defined in

[base/Root/Module/index.ts:305](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L305)

___

### propExtensions

• `Private` **propExtensions**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

The property definitions that the module itself
has, and every item defintion in itself hence
inherits

#### Defined in

[base/Root/Module/index.ts:336](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L336)

___

### rawData

• **rawData**: [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md)

The raw data of the module

#### Defined in

[base/Root/Module/index.ts:300](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L300)

___

### searchModeModule

• `Private` **searchModeModule**: [`default`](base_Root_Module.default.md)

The search mode of this module, it is generated
automatically based on the data using the build search mode
functionality

#### Defined in

[base/Root/Module/index.ts:316](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L316)

## Methods

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

[base/Root/Module/index.ts:861](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L861)

___

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`, `role`, `userId`, `ownerUserId`, `requestedFields`, `rolesManager`, `throwError`): `Promise`\<`boolean`\>

Checks the role access for an action in a module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`ItemDefinitionIOActions`](../enums/base_Root_Module_ItemDefinition.ItemDefinitionIOActions.md) | the IO action (for modules this can only logically be a READ action for module level searches) |
| `role` | `string` | the role of the user attempting the action |
| `userId` | `string` | the user id of the user attempting the action |
| `ownerUserId` | `string` | the owner of that item definition |
| `requestedFields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the requested fields (single properties will be checked as well) |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) | a roles manager instance |
| `throwError` | `boolean` | whether to throw an error if failed (otherwise returns a boolean) |

#### Returns

`Promise`\<`boolean`\>

a boolean on whether the user is granted role access

#### Defined in

[base/Root/Module/index.ts:973](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L973)

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

[base/Root/Module/index.ts:887](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L887)

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

[base/Root/Module/index.ts:927](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L927)

___

### cleanState

▸ **cleanState**(): `void`

#### Returns

`void`

#### Defined in

[base/Root/Module/index.ts:445](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L445)

___

### getAllChildDefinitionsRecursive

▸ **getAllChildDefinitionsRecursive**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides the live child definitions
recursively, it does not get in Module children

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

an array of item definitions

#### Defined in

[base/Root/Module/index.ts:654](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L654)

___

### getAllChildItemDefinitions

▸ **getAllChildItemDefinitions**(): [`default`](base_Root_Module_ItemDefinition.default.md)[]

Provides all live child item definitions

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)[]

a list of item definitions

#### Defined in

[base/Root/Module/index.ts:645](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L645)

___

### getAllModules

▸ **getAllModules**(): [`default`](base_Root_Module.default.md)[]

Provides all the modules it contains
should follow

#### Returns

[`default`](base_Root_Module.default.md)[]

**`Retuns`**

a list of all the child modules as Module instances

#### Defined in

[base/Root/Module/index.ts:692](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L692)

___

### getAllPropExtensions

▸ **getAllPropExtensions**(): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

Provides all the prop extensions

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

a list of property definitions

#### Defined in

[base/Root/Module/index.ts:637](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L637)

___

### getChildModule

▸ **getChildModule**(`name`): [`default`](base_Root_Module.default.md)

Gets a specific module given its name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the module |

#### Returns

[`default`](base_Root_Module.default.md)

a Module instance for the child module, or throws an error

#### Defined in

[base/Root/Module/index.ts:701](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L701)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`): [`IRawJsonI18NSpecificLocaleDataType`](../interfaces/base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md)

Provides the module locale data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the locale in iso form |

#### Returns

[`IRawJsonI18NSpecificLocaleDataType`](../interfaces/base_Root_Module.IRawJsonI18NSpecificLocaleDataType.md)

an object or null (if locale not valid)

#### Defined in

[base/Root/Module/index.ts:675](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L675)

___

### getItemDefinitionFor

▸ **getItemDefinitionFor**(`name`): [`default`](base_Root_Module_ItemDefinition.default.md)

Gets a live item definition given a specific path
the path has to be full

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string`[] | the path name for the item definition |

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

an item definition

**`Throws`**

an error if the path finds a dead end

#### Defined in

[base/Root/Module/index.ts:539](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L539)

___

### getItemDefinitionRawFor

▸ **getItemDefinitionRawFor**(`name`): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

Gives you raw data for an item definition given its full
path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string`[] | the full path of the item definition |

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

a raw item definition

**`Throws`**

an error if this item definition does not exist

#### Defined in

[base/Root/Module/index.ts:518](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L518)

___

### getMaxSearchRecords

▸ **getMaxSearchRecords**(): `number`

Specifies how many search records might be obtained at once

#### Returns

`number`

an integer

#### Defined in

[base/Root/Module/index.ts:1044](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L1044)

___

### getMaxSearchResults

▸ **getMaxSearchResults**(): `number`

Specifies how many search results might be obtained at once

#### Returns

`number`

an integer

#### Defined in

[base/Root/Module/index.ts:1052](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L1052)

___

### getModuleFor

▸ **getModuleFor**(`name`): [`default`](base_Root_Module.default.md)

Gets a specific module given its name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string`[] | the name of the module |

#### Returns

[`default`](base_Root_Module.default.md)

a module that exists within this module

#### Defined in

[base/Root/Module/index.ts:575](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L575)

___

### getName

▸ **getName**(): `string`

Gives the name of this module

#### Returns

`string`

a string

#### Defined in

[base/Root/Module/index.ts:666](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L666)

___

### getParentModule

▸ **getParentModule**(): [`default`](base_Root_Module.default.md)

Just gives the parent module

#### Returns

[`default`](base_Root_Module.default.md)

a module (or null)

#### Defined in

[base/Root/Module/index.ts:748](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L748)

___

### getParentRoot

▸ **getParentRoot**(): [`default`](base_Root.default.md)

Just gives the parent root

#### Returns

[`default`](base_Root.default.md)

the parent root

#### Defined in

[base/Root/Module/index.ts:756](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L756)

___

### getPath

▸ **getPath**(): `string`[]

Provides the path of the module from the root

#### Returns

`string`[]

an array of string that represents the path all the way to the root

#### Defined in

[base/Root/Module/index.ts:764](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L764)

___

### getPropExtensionFor

▸ **getPropExtensionFor**(`id`): [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

Provides a prop extension from the module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the property definition id |

#### Returns

[`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

a property definition, or throws an error if it doesn't exist

**`Throws`**

error if the property does not exist

#### Defined in

[base/Root/Module/index.ts:613](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L613)

___

### getPropExtensionItemDefinition

▸ **getPropExtensionItemDefinition**(): [`default`](base_Root_Module_ItemDefinition.default.md)

#### Returns

[`default`](base_Root_Module_ItemDefinition.default.md)

#### Defined in

[base/Root/Module/index.ts:566](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L566)

___

### getQualifiedPathName

▸ **getQualifiedPathName**(): `string`

Provides the full qualified path name that is used for absolute reference of the whole
module, this is unique

#### Returns

`string`

the string qualified path name

#### Defined in

[base/Root/Module/index.ts:782](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L782)

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

an array of string with the roles that have the specific io role access

#### Defined in

[base/Root/Module/index.ts:811](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L811)

___

### getRolesWithModerationAccess

▸ **getRolesWithModerationAccess**(): `string`[]

Provides the roles that have moderation access to
the moderation fileds for a given module

#### Returns

`string`[]

an array of string with the roles that have moderation access

#### Defined in

[base/Root/Module/index.ts:825](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L825)

___

### getRolesWithSearchAccess

▸ **getRolesWithSearchAccess**(): `string`[]

Provides the search access for the given module

#### Returns

`string`[]

**`Retuns`**

an array with the approved roles or the anyone metarole

#### Defined in

[base/Root/Module/index.ts:801](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L801)

___

### getSearchLimiters

▸ **getSearchLimiters**(): [`ISearchLimitersType`](../interfaces/base_Root.ISearchLimitersType.md)

Provides the module request limiters

#### Returns

[`ISearchLimitersType`](../interfaces/base_Root.ISearchLimitersType.md)

the request limiters object or null

#### Defined in

[base/Root/Module/index.ts:1036](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L1036)

___

### getSearchModule

▸ **getSearchModule**(): [`default`](base_Root_Module.default.md)

Provides the search form of this module, will throw an error if already
in the search form

#### Returns

[`default`](base_Root_Module.default.md)

the search form of the module

#### Defined in

[base/Root/Module/index.ts:729](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L729)

___

### getStandardModule

▸ **getStandardModule**(): [`default`](base_Root_Module.default.md)

Provides the standard form of this module, will throw an error
if already in the standard form

#### Returns

[`default`](base_Root_Module.default.md)

the standard form of the module

#### Defined in

[base/Root/Module/index.ts:715](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L715)

___

### getTableName

▸ **getTableName**(): `string`

An utility function that returns the table name
for the module

#### Returns

`string`

#### Defined in

[base/Root/Module/index.ts:793](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L793)

___

### hasItemDefinitionFor

▸ **hasItemDefinitionFor**(`name`): `boolean`

checks whether a module has an item definition for
an specific children given its full path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string`[] | the name path of the definition |

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/index.ts:479](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L479)

___

### hasParentModule

▸ **hasParentModule**(): `boolean`

Tells whether it has a parent module

#### Returns

`boolean`

a boolean on whether this module is parented

#### Defined in

[base/Root/Module/index.ts:773](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L773)

___

### hasPropExtensionFor

▸ **hasPropExtensionFor**(`id`): `boolean`

Checks whether a property extension exists in this module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the property definition id |

#### Returns

`boolean`

a boolean on whether this prop extension exists

#### Defined in

[base/Root/Module/index.ts:601](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L601)

___

### init

▸ **init**(): `void`

Runs the initialization of the module, for cross access, this executes
once the entire tree is ready so this module other parts of the tree
Root class executes this function recursively

#### Returns

`void`

#### Defined in

[base/Root/Module/index.ts:458](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L458)

___

### isInSearchMode

▸ **isInSearchMode**(): `boolean`

Checks whether the module is in search module

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/index.ts:740](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L740)

___

### isPropExtensionInSearchModeOnly

▸ **isPropExtensionInSearchModeOnly**(`id`): `boolean`

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

[base/Root/Module/index.ts:627](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L627)

___

### isSearchEngineEnabled

▸ **isSearchEngineEnabled**(): `boolean`

Wether the item is search engine enabled

#### Returns

`boolean`

a boolean

#### Defined in

[base/Root/Module/index.ts:847](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L847)

___

### isSearchable

▸ **isSearchable**(): `boolean`

Tells whether module based searches are allowed

#### Returns

`boolean`

a boolean on whether the module is setup as searchable

#### Defined in

[base/Root/Module/index.ts:836](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L836)

___

### listModuleNames

▸ **listModuleNames**(): `string`[]

list all module names it contains

#### Returns

`string`[]

a list of string for the module names

#### Defined in

[base/Root/Module/index.ts:683](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L683)

___

### mergeWithI18n

▸ **mergeWithI18n**(`mod`, `rootI18nData`): `void`

Merges two i18n data components, for example the i18n data for
the english build and the i18n data for the russian build, that way
the state is not lost

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | the raw module that is merging |
| `rootI18nData` | [`Ii18NType`](../interfaces/base_Root.Ii18NType.md) | the i18n data of the root |

#### Returns

`void`

#### Defined in

[base/Root/Module/index.ts:1063](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L1063)

___

### buildSearchMode

▸ **buildSearchMode**(`rawData`, `rootI18nData`): [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md)

Builds the search mode of a raw module
this gives a module that is the search module
of the given module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawData` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | the raw data of the module in json |
| `rootI18nData` | [`Ii18NType`](../interfaces/base_Root.Ii18NType.md) | the root i18n data |

#### Returns

[`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md)

a raw json for the search module

#### Defined in

[base/Root/Module/index.ts:235](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L235)

___

### getItemDefinitionRawFor

▸ **getItemDefinitionRawFor**(`parentModuleRaw`, `name`): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

Provides a full item definition in raw form
given raw data of a module and a full path for
a name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentModuleRaw` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | the raw json module data |
| `name` | `string`[] | the name of the item definition as a path |

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

#### Defined in

[base/Root/Module/index.ts:260](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L260)

___

### getPropExtensionRawFor

▸ **getPropExtensionRawFor**(`parentModuleRaw`, `id`): [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)

provides the prop exension property for a given raw module and its id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentModuleRaw` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | the parent module in raw form |
| `id` | `string` | the id of the property extension |

#### Returns

[`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)

a raw property definition

#### Defined in

[base/Root/Module/index.ts:248](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/index.ts#L248)
