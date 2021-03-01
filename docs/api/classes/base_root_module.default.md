[](../README.md) / [Exports](../modules.md) / [base/Root/Module](../modules/base_root_module.md) / default

# Class: default

[base/Root/Module](../modules/base_root_module.md).default

The class module that defines how the module behaves

## Table of contents

### Constructors

- [constructor](base_root_module.default.md#constructor)

### Properties

- [\_gqlObj](base_root_module.default.md#_gqlobj)
- [\_gqlQueryObj](base_root_module.default.md#_gqlqueryobj)
- [childItemDefinitions](base_root_module.default.md#childitemdefinitions)
- [childModules](base_root_module.default.md#childmodules)
- [childPropExtensionItemDefinition](base_root_module.default.md#childpropextensionitemdefinition)
- [parentModule](base_root_module.default.md#parentmodule)
- [parentRoot](base_root_module.default.md#parentroot)
- [propExtensions](base_root_module.default.md#propextensions)
- [rawData](base_root_module.default.md#rawdata)
- [searchModeModule](base_root_module.default.md#searchmodemodule)

### Methods

- [checkRoleAccessFor](base_root_module.default.md#checkroleaccessfor)
- [cleanState](base_root_module.default.md#cleanstate)
- [getAllChildDefinitionsRecursive](base_root_module.default.md#getallchilddefinitionsrecursive)
- [getAllChildItemDefinitions](base_root_module.default.md#getallchilditemdefinitions)
- [getAllModules](base_root_module.default.md#getallmodules)
- [getAllPropExtensions](base_root_module.default.md#getallpropextensions)
- [getChildModule](base_root_module.default.md#getchildmodule)
- [getI18nDataFor](base_root_module.default.md#geti18ndatafor)
- [getItemDefinitionFor](base_root_module.default.md#getitemdefinitionfor)
- [getItemDefinitionRawFor](base_root_module.default.md#getitemdefinitionrawfor)
- [getMaxSearchRecords](base_root_module.default.md#getmaxsearchrecords)
- [getMaxSearchResults](base_root_module.default.md#getmaxsearchresults)
- [getModuleFor](base_root_module.default.md#getmodulefor)
- [getName](base_root_module.default.md#getname)
- [getParentModule](base_root_module.default.md#getparentmodule)
- [getParentRoot](base_root_module.default.md#getparentroot)
- [getPath](base_root_module.default.md#getpath)
- [getPropExtensionFor](base_root_module.default.md#getpropextensionfor)
- [getPropExtensionItemDefinition](base_root_module.default.md#getpropextensionitemdefinition)
- [getQualifiedPathName](base_root_module.default.md#getqualifiedpathname)
- [getRequestLimiters](base_root_module.default.md#getrequestlimiters)
- [getRolesWithAccessTo](base_root_module.default.md#getroleswithaccessto)
- [getRolesWithFlaggingAccess](base_root_module.default.md#getroleswithflaggingaccess)
- [getRolesWithModerationAccess](base_root_module.default.md#getroleswithmoderationaccess)
- [getRolesWithSearchAccess](base_root_module.default.md#getroleswithsearchaccess)
- [getSearchModule](base_root_module.default.md#getsearchmodule)
- [getStandardModule](base_root_module.default.md#getstandardmodule)
- [getTableName](base_root_module.default.md#gettablename)
- [hasItemDefinitionFor](base_root_module.default.md#hasitemdefinitionfor)
- [hasParentModule](base_root_module.default.md#hasparentmodule)
- [hasPropExtensionFor](base_root_module.default.md#haspropextensionfor)
- [init](base_root_module.default.md#init)
- [isInSearchMode](base_root_module.default.md#isinsearchmode)
- [isPropExtensionInSearchModeOnly](base_root_module.default.md#ispropextensioninsearchmodeonly)
- [isSearchable](base_root_module.default.md#issearchable)
- [listModuleNames](base_root_module.default.md#listmodulenames)
- [mergeWithI18n](base_root_module.default.md#mergewithi18n)
- [buildSearchMode](base_root_module.default.md#buildsearchmode)
- [getItemDefinitionRawFor](base_root_module.default.md#getitemdefinitionrawfor)
- [getPropExtensionRawFor](base_root_module.default.md#getpropextensionrawfor)

## Constructors

### constructor

\+ **new default**(`rawJSON`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `parentRoot`: [*default*](base_root.default.md), `parentModule`: [*default*](base_root_module.default.md), `disableSearchModeRetrieval?`: *boolean*): [*default*](base_root_module.default.md)

Builds a module from raw json data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawJSON` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw json data of the module   |
`parentRoot` | [*default*](base_root.default.md) | the root that contains the module   |
`parentModule` | [*default*](base_root_module.default.md) | the parent module of the module, can be null   |
`disableSearchModeRetrieval?` | *boolean* | makes the search module be null and it's not calculated this is for use because search modules are generated automatically on every instance this would create an infite loop if this option wasn't available    |

**Returns:** [*default*](base_root_module.default.md)

Defined in: [base/Root/Module/index.ts:352](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L352)

## Properties

### \_gqlObj

• **\_gqlObj**: *GraphQLObjectType*<any, any, { [key: string]: *any*;  }\>

The graphql object for this module (cached)
only exists when used the graphql functions

Defined in: [base/Root/Module/index.ts:310](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L310)

___

### \_gqlQueryObj

• **\_gqlQueryObj**: *GraphQLObjectType*<any, any, { [key: string]: *any*;  }\>

The graphql query object for this module (cached)
only exists when used the graphql functions

Defined in: [base/Root/Module/index.ts:316](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L316)

___

### childItemDefinitions

• `Private` **childItemDefinitions**: [*default*](base_root_module_itemdefinition.default.md)[]

The children item definitions, as instances

Defined in: [base/Root/Module/index.ts:337](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L337)

___

### childModules

• `Private` **childModules**: [*default*](base_root_module.default.md)[]

The children modules as instances

Defined in: [base/Root/Module/index.ts:341](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L341)

___

### childPropExtensionItemDefinition

• `Private` **childPropExtensionItemDefinition**: [*default*](base_root_module_itemdefinition.default.md)

The prop extensions emulated item definition that contains
all the prop extensions as an item definition itself

Defined in: [base/Root/Module/index.ts:346](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L346)

___

### parentModule

• `Private` **parentModule**: [*default*](base_root_module.default.md)

The parent module, if any of this module instance
as an instance

Defined in: [base/Root/Module/index.ts:326](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L326)

___

### parentRoot

• `Private` **parentRoot**: [*default*](base_root.default.md)

The root that contains the module

Defined in: [base/Root/Module/index.ts:321](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L321)

___

### propExtensions

• `Private` **propExtensions**: [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

The property definitions that the module itself
has, and every item defintion in itself hence
inherits

Defined in: [base/Root/Module/index.ts:352](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L352)

___

### rawData

• **rawData**: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)

The raw data of the module

Defined in: [base/Root/Module/index.ts:303](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L303)

___

### searchModeModule

• `Private` **searchModeModule**: [*default*](base_root_module.default.md)

The search mode of this module, it is generated
automatically based on the data using the build search mode
functionality

Defined in: [base/Root/Module/index.ts:332](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L332)

## Methods

### checkRoleAccessFor

▸ **checkRoleAccessFor**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md), `role`: *string*, `userId`: *string*, `ownerUserId`: *string*, `requestedFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md), `rolesManager`: [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md), `throwError`: *boolean*): *Promise*<boolean\>

Checks the role access for an action in a module

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the IO action (for modules this can only logically be a READ action for module level searches)   |
`role` | *string* | the role of the user attempting the action   |
`userId` | *string* | the user id of the user attempting the action   |
`ownerUserId` | *string* | the owner of that item definition   |
`requestedFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | the requested fields (single properties will be checked as well)   |
`rolesManager` | [*ICustomRoleManager*](../interfaces/base_root.icustomrolemanager.md) | a roles manager instance   |
`throwError` | *boolean* | whether to throw an error if failed (otherwise returns a boolean)   |

**Returns:** *Promise*<boolean\>

a boolean on whether the user is granted role access

Defined in: [base/Root/Module/index.ts:877](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L877)

___

### cleanState

▸ **cleanState**(): *void*

**Returns:** *void*

Defined in: [base/Root/Module/index.ts:456](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L456)

___

### getAllChildDefinitionsRecursive

▸ **getAllChildDefinitionsRecursive**(): [*default*](base_root_module_itemdefinition.default.md)[]

Provides the live child definitions
recursively, it does not get in Module children

**Returns:** [*default*](base_root_module_itemdefinition.default.md)[]

an array of item definitions

Defined in: [base/Root/Module/index.ts:665](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L665)

___

### getAllChildItemDefinitions

▸ **getAllChildItemDefinitions**(): [*default*](base_root_module_itemdefinition.default.md)[]

Provides all live child item definitions

**Returns:** [*default*](base_root_module_itemdefinition.default.md)[]

a list of item definitions

Defined in: [base/Root/Module/index.ts:656](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L656)

___

### getAllModules

▸ **getAllModules**(): [*default*](base_root_module.default.md)[]

Provides all the modules it contains
should follow

**`retuns`** a list of all the child modules as Module instances

**Returns:** [*default*](base_root_module.default.md)[]

Defined in: [base/Root/Module/index.ts:703](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L703)

___

### getAllPropExtensions

▸ **getAllPropExtensions**(): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

Provides all the prop extensions

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)[]

a list of property definitions

Defined in: [base/Root/Module/index.ts:648](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L648)

___

### getChildModule

▸ **getChildModule**(`name`: *string*): [*default*](base_root_module.default.md)

Gets a specific module given its name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | the name of the module   |

**Returns:** [*default*](base_root_module.default.md)

a Module instance for the child module, or throws an error

Defined in: [base/Root/Module/index.ts:712](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L712)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`: *string*): [*IRawJsonI18NSpecificLocaleDataType*](../interfaces/base_root_module.irawjsoni18nspecificlocaledatatype.md)

Provides the module locale data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the locale in iso form   |

**Returns:** [*IRawJsonI18NSpecificLocaleDataType*](../interfaces/base_root_module.irawjsoni18nspecificlocaledatatype.md)

an object or null (if locale not valid)

Defined in: [base/Root/Module/index.ts:686](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L686)

___

### getItemDefinitionFor

▸ **getItemDefinitionFor**(`name`: *string*[]): [*default*](base_root_module_itemdefinition.default.md)

Gets a live item definition given a specific path
the path has to be full

**`throws`** an error if the path finds a dead end

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string*[] | the path name for the item definition   |

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

an item definition

Defined in: [base/Root/Module/index.ts:550](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L550)

___

### getItemDefinitionRawFor

▸ **getItemDefinitionRawFor**(`name`: *string*[]): [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

Gives you raw data for an item definition given its full
path

**`throws`** an error if this item definition does not exist

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string*[] | the full path of the item definition   |

**Returns:** [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

a raw item definition

Defined in: [base/Root/Module/index.ts:529](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L529)

___

### getMaxSearchRecords

▸ **getMaxSearchRecords**(): *number*

Specifies how many search records might be obtained at once

**Returns:** *number*

an integer

Defined in: [base/Root/Module/index.ts:934](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L934)

___

### getMaxSearchResults

▸ **getMaxSearchResults**(): *number*

Specifies how many search results might be obtained at once

**Returns:** *number*

an integer

Defined in: [base/Root/Module/index.ts:942](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L942)

___

### getModuleFor

▸ **getModuleFor**(`name`: *string*[]): [*default*](base_root_module.default.md)

Gets a specific module given its name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string*[] | the name of the module   |

**Returns:** [*default*](base_root_module.default.md)

a module that exists within this module

Defined in: [base/Root/Module/index.ts:586](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L586)

___

### getName

▸ **getName**(): *string*

Gives the name of this module

**Returns:** *string*

a string

Defined in: [base/Root/Module/index.ts:677](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L677)

___

### getParentModule

▸ **getParentModule**(): [*default*](base_root_module.default.md)

Just gives the parent module

**Returns:** [*default*](base_root_module.default.md)

a module (or null)

Defined in: [base/Root/Module/index.ts:759](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L759)

___

### getParentRoot

▸ **getParentRoot**(): [*default*](base_root.default.md)

Just gives the parent root

**Returns:** [*default*](base_root.default.md)

the parent root

Defined in: [base/Root/Module/index.ts:767](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L767)

___

### getPath

▸ **getPath**(): *string*[]

Provides the path of the module from the root

**Returns:** *string*[]

an array of string that represents the path all the way to the root

Defined in: [base/Root/Module/index.ts:775](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L775)

___

### getPropExtensionFor

▸ **getPropExtensionFor**(`id`: *string*): [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

Provides a prop extension from the module

**`throws`** error if the property does not exist

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the property definition id   |

**Returns:** [*default*](base_root_module_itemdefinition_propertydefinition.default.md)

a property definition, or throws an error if it doesn't exist

Defined in: [base/Root/Module/index.ts:624](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L624)

___

### getPropExtensionItemDefinition

▸ **getPropExtensionItemDefinition**(): [*default*](base_root_module_itemdefinition.default.md)

**Returns:** [*default*](base_root_module_itemdefinition.default.md)

Defined in: [base/Root/Module/index.ts:577](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L577)

___

### getQualifiedPathName

▸ **getQualifiedPathName**(): *string*

Provides the full qualified path name that is used for absolute reference of the whole
module, this is unique

**Returns:** *string*

the string qualified path name

Defined in: [base/Root/Module/index.ts:793](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L793)

___

### getRequestLimiters

▸ **getRequestLimiters**(): [*IRequestLimitersType*](../interfaces/base_root.irequestlimiterstype.md)

Provides the module request limiters

**Returns:** [*IRequestLimitersType*](../interfaces/base_root.irequestlimiterstype.md)

the request limiters object or null

Defined in: [base/Root/Module/index.ts:926](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L926)

___

### getRolesWithAccessTo

▸ **getRolesWithAccessTo**(`action`: [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md)): *string*[]

Provides the roles that have access to a given
action based on the rules that were set

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | [*ItemDefinitionIOActions*](../enums/base_root_module_itemdefinition.itemdefinitionioactions.md) | the action from the ItemDefinitionIOActions   |

**Returns:** *string*[]

an array of string with the roles that have the specific io role access

Defined in: [base/Root/Module/index.ts:822](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L822)

___

### getRolesWithFlaggingAccess

▸ **getRolesWithFlaggingAccess**(): *string*[]

Provides the roles that are alowed to flag the
contents of an module

**Returns:** *string*[]

an array of string for the flagging role access

Defined in: [base/Root/Module/index.ts:848](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L848)

___

### getRolesWithModerationAccess

▸ **getRolesWithModerationAccess**(): *string*[]

Provides the roles that have moderation access to
the moderation fileds for a given module

**Returns:** *string*[]

an array of string with the roles that have moderation access

Defined in: [base/Root/Module/index.ts:836](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L836)

___

### getRolesWithSearchAccess

▸ **getRolesWithSearchAccess**(): *string*[]

Provides the search access for the given module

**`retuns`** an array with the approved roles or the anyone metarole

**Returns:** *string*[]

Defined in: [base/Root/Module/index.ts:812](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L812)

___

### getSearchModule

▸ **getSearchModule**(): [*default*](base_root_module.default.md)

Provides the search form of this module, will throw an error if already
in the search form

**Returns:** [*default*](base_root_module.default.md)

the search form of the module

Defined in: [base/Root/Module/index.ts:740](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L740)

___

### getStandardModule

▸ **getStandardModule**(): [*default*](base_root_module.default.md)

Provides the standard form of this module, will throw an error
if already in the standard form

**Returns:** [*default*](base_root_module.default.md)

the standard form of the module

Defined in: [base/Root/Module/index.ts:726](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L726)

___

### getTableName

▸ **getTableName**(): *string*

An utility function that returns the table name
for the module

**Returns:** *string*

Defined in: [base/Root/Module/index.ts:804](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L804)

___

### hasItemDefinitionFor

▸ **hasItemDefinitionFor**(`name`: *string*[]): *boolean*

checks whether a module has an item definition for
an specific children given its full path

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string*[] | the name path of the definition   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/index.ts:490](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L490)

___

### hasParentModule

▸ **hasParentModule**(): *boolean*

Tells whether it has a parent module

**Returns:** *boolean*

a boolean on whether this module is parented

Defined in: [base/Root/Module/index.ts:784](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L784)

___

### hasPropExtensionFor

▸ **hasPropExtensionFor**(`id`: *string*): *boolean*

Checks whether a property extension exists in this module

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the property definition id   |

**Returns:** *boolean*

a boolean on whether this prop extension exists

Defined in: [base/Root/Module/index.ts:612](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L612)

___

### init

▸ **init**(): *void*

Runs the initialization of the module, for cross access, this executes
once the entire tree is ready so this module other parts of the tree
Root class executes this function recursively

**Returns:** *void*

Defined in: [base/Root/Module/index.ts:469](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L469)

___

### isInSearchMode

▸ **isInSearchMode**(): *boolean*

Checks whether the module is in search module

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/index.ts:751](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L751)

___

### isPropExtensionInSearchModeOnly

▸ **isPropExtensionInSearchModeOnly**(`id`: *string*): *boolean*

Given a string id it specifies whether it is considered
a search only property only available in the search mode

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | the id of the property   |

**Returns:** *boolean*

a boolean

Defined in: [base/Root/Module/index.ts:638](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L638)

___

### isSearchable

▸ **isSearchable**(): *boolean*

Tells whether module based searches are allowed

**Returns:** *boolean*

a boolean on whether the module is setup as searchable

Defined in: [base/Root/Module/index.ts:859](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L859)

___

### listModuleNames

▸ **listModuleNames**(): *string*[]

list all module names it contains

**Returns:** *string*[]

a list of string for the module names

Defined in: [base/Root/Module/index.ts:694](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L694)

___

### mergeWithI18n

▸ **mergeWithI18n**(`mod`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)): *void*

Merges two i18n data components, for example the i18n data for
the english build and the i18n data for the russian build, that way
the state is not lost

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mod` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw module that is merging    |

**Returns:** *void*

Defined in: [base/Root/Module/index.ts:952](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L952)

___

### buildSearchMode

▸ `Static`**buildSearchMode**(`rawData`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)): [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)

Builds the search mode of a raw module
this gives a module that is the search module
of the given module

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw data of the module in json   |

**Returns:** [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)

a raw json for the search module

Defined in: [base/Root/Module/index.ts:239](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L239)

___

### getItemDefinitionRawFor

▸ `Static`**getItemDefinitionRawFor**(`parentModuleRaw`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `name`: *string*[]): [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

Provides a full item definition in raw form
given raw data of a module and a full path for
a name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parentModuleRaw` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw json module data   |
`name` | *string*[] | the name of the item definition as a path    |

**Returns:** [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

Defined in: [base/Root/Module/index.ts:263](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L263)

___

### getPropExtensionRawFor

▸ `Static`**getPropExtensionRawFor**(`parentModuleRaw`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `id`: *string*): [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

provides the prop exension property for a given raw module and its id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parentModuleRaw` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the parent module in raw form   |
`id` | *string* | the id of the property extension   |

**Returns:** [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

a raw property definition

Defined in: [base/Root/Module/index.ts:251](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/index.ts#L251)
