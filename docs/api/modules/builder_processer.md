[](../README.md) / [Exports](../modules.md) / builder/processer

# Module: builder/processer

Processes the json schema of itemize in order to remove useless data
like pointers, file information, trackers and location; and also strippes
unecessary language information if deemed required

## Table of contents

### Functions

- [processInclude](builder_processer.md#processinclude)
- [processItemDefinition](builder_processer.md#processitemdefinition)
- [processModule](builder_processer.md#processmodule)
- [processPropertyDefinition](builder_processer.md#processpropertydefinition)
- [processRoot](builder_processer.md#processroot)

## Functions

### processInclude

▸ **processInclude**(`rawData`: [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md), `locale?`: *string*): [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md)

Cleans up build data from
and builds a new json

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md) | the raw data   |
`locale?` | *string* | the locale   |

**Returns:** [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md)

the new json

Defined in: [builder/processer.ts:71](https://github.com/onzag/itemize/blob/0569bdf2/builder/processer.ts#L71)

___

### processItemDefinition

▸ **processItemDefinition**(`rawData`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `locale?`: *string*): *object*

Cleans up build data from
and builds a new json

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the raw data   |
`locale?` | *string* | the locale   |

**Returns:** *object*

Name | Type | Description |
:------ | :------ | :------ |
`canBeParentedBy`? | [*IItemDefinitionParentingRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionparentingrawjsondatatype.md)[] | Whether it can be parented by other item definitions, these represent a list of rules   |
`canCreateInBehalf`? | *boolean* | Whether an user role can create in behalf   |
`childDefinitions`? | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)[] | The actual child definitions that this item definition contains this is appended during process as an array of this same object aka it recurses as a tree   |
`createInBehalfRoleAccess`? | *string*[] | A list of roles of which this item definition is allowed to be used to create in behalf   |
`createInBehalfTargetRoles`? | *string*[] | A list of roles which the item definition is allowed to create in behalf to   |
`createRoleAccess`? | *string*[] | Create role permissions   |
`customIdRoleAccess`? | *string*[] | A list of roles which this item definition is allowed to be used to make custom ids   |
`deleteRoleAccess`? | *string*[] | Delete role permissions   |
`editRoleAccess`? | *string*[] | Edit role permissions   |
`enableVersioning`? | *boolean* | Whether versioning is enabled   |
`i18nData` | [*IRawJSONI18NDataType*](../interfaces/base_root_module.irawjsoni18ndatatype.md) | The i18n data that is attached to that item definition it also doesn't exist in the unprocessed data but comes from the properties file   |
`i18nDataLocation`? | *string* | Also stripped after processed, represents the file location for the i18n properties file   |
`importedChildDefinitions`? | *string*[][] | This gets added during the building process and represents the list of imported definitions that exist within the module and are used for includes these are paths   |
`includes`? | [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md)[] | The includes exist within the item definition   |
`location`? | *string* | Location only exists during the building process and it's stripped and represents the file location the file is   |
`mustBeParented`? | *boolean* | Whether it actually must always be parented   |
`name` | *string* | The name doesn't exist within the raw unprocessed data but it's added and it's equal to the file name or the folder name in case of index.json   |
`ownerIsObjectId`? | *boolean* | This only really makes sense in the user case and it basically shifts the ownership of the object to be its id rather than its created_by attribute   |
`ownerReadRoleAccess`? | *string*[] | If a role doesn't fit the criteria specified in the list the owner of a given item cannot truly be read and the created_by field becomes the unspecified owner   |
`parentingRoleAccess`? | *string*[] | A list of roles who have access to parenting   |
`pointers`? | *any* | The pointers come during the parsing method and are stripped as well after built and it's used to create tracebacks from the raw data   |
`policies`? | [*IPoliciesRawJSONDataType*](../interfaces/base_root_module_itemdefinition.ipoliciesrawjsondatatype.md) | the policies in the raw json form as they are specified in the unprocessed file   |
`properties`? | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)[] | The properties represent the list of properties it has   |
`raw`? | *string* | This is the raw content of the file the pointers came from and it's also stripped after built is done   |
`readRoleAccess`? | *string*[] | Read role permissions   |
`requestLimiters`? | [*IRequestLimitersType*](../interfaces/root.irequestlimiterstype.md) | the request limiters   |
`searchRoleAccess`? | *string*[] | Permissions for search purposes   |
`searchable`? | *boolean* | Whether the item definition is searchable, when a module is searchable and the item definition is not, the module precedes   |
`type` | *item* | Basic type   |
`versionIsCountry`? | *boolean* | Whether the version can be a country   |
`versionIsLanguage`? | *boolean* | Whether the version can be a language   |
`versionIsLanguageAndCountry`? | *boolean* | Whether the version can be a country language concat pair such as en-US or fi-FI   |
`versioningRoleAccess`? | *string*[] | The roles that are allowed to do versioning   |

the new json

Defined in: [builder/processer.ts:29](https://github.com/onzag/itemize/blob/0569bdf2/builder/processer.ts#L29)

___

### processModule

▸ **processModule**(`rawData`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `locale?`: *string*): *object*

Cleans up build data from
and builds a new json

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw data   |
`locale?` | *string* | the locale   |

**Returns:** *object*

Name | Type | Description |
:------ | :------ | :------ |
`children` | ([*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) \| [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md))[] | the children either module or item definition as found during the folder search   |
`flagRoleAccess`? | *string*[] | The roles that have flagging capabilities over the item definitions of this module, if not specified defaults to anyone logged, flagging only exists at module level and affects all the children   |
`i18nData` | [*IRawJSONI18NDataType*](../interfaces/base_root_module.irawjsoni18ndatatype.md) | The internationalization data   |
`i18nDataLocation`? | *string* | Also stripped after processed, represents the file location for the i18n properties file   |
`location`? | *string* | Location only exists during the building process and it's stripped and represents the file location the file is   |
`maxSearchRecords`? | *number* | Affects both the module and item definition, this determines the amount of match results that can be retrieved at once, if not specified fallbacks to MAX_SEARCH_RECORDS_DEFAULT   |
`maxSearchResults`? | *number* | Affects both the module and the item definition, this determines how big the page of requested values can be, for the limit and offset, it also determines the size of GET_LIST query requests as well that should give a value that is less or equal to this amount, the default for this value is MAX_SEARCH_RESULTS_DEFAULT   |
`modRoleAccess`? | *string*[] | The roles that have moderation capabilities over the item definitions under this module modding only exist at module level as well   |
`name` | *string* | The name of the file that now becomes a property   |
`pointers`? | *any* | The pointers come during the parsing method and are stripped as well after built and it's used to create tracebacks from the raw data   |
`propExtLocation`? | *string* | The prop extensions file location for the module, also stripped   |
`propExtPointers`? | *any* | The prop extensions pointers for use within the tracebacks during the build process, stripped down after done   |
`propExtRaw`? | *string* | The prop extensions raw file source, stripped down as well   |
`propExtensions`? | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)[] | The prop extensions properties that this modules gives to all the item definitions   |
`raw`? | *string* | This is the raw content of the file the pointers came from and it's also stripped after built is done   |
`readRoleAccess`? | *string*[] | The read role access   |
`requestLimiters`? | [*IRequestLimitersType*](../interfaces/root.irequestlimiterstype.md) | And AND request limiter is a very powerful one as this would ensure the creation of database indexes that will match and speed up these searches createdAt creates a limiter that requests any search to contain created_at createdBy creates a limiter that requests any search to contain created_by parenting requests for a parent and custom adds to custom properties that will be required at module level, these are basically args And AND index will ensure to add an ordered btree index to these   |
`searchRoleAccess`? | *string*[] | The search role access   |
`searchable`? | *boolean* | Whether the module, and only the module itself is searchable   |
`type` | *module* | The type is module   |

the new json

Defined in: [builder/processer.ts:115](https://github.com/onzag/itemize/blob/0569bdf2/builder/processer.ts#L115)

___

### processPropertyDefinition

▸ **processPropertyDefinition**(`rawData`: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md), `locale?`: *string*): [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

#### Parameters:

Name | Type |
:------ | :------ |
`rawData` | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) |
`locale?` | *string* |

**Returns:** [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)

Defined in: [builder/processer.ts:90](https://github.com/onzag/itemize/blob/0569bdf2/builder/processer.ts#L90)

___

### processRoot

▸ **processRoot**(`rawData`: [*IRootRawJSONDataType*](../interfaces/root.irootrawjsondatatype.md), `locale?`: *string*): *object*

Cleans up build data from
and builds a new json

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IRootRawJSONDataType*](../interfaces/root.irootrawjsondatatype.md) | the raw data   |
`locale?` | *string* | the locale   |

**Returns:** *object*

Name | Type | Description |
:------ | :------ | :------ |
`children` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)[] | All the modules contained within the root it is added after the build   |
`i18nData` | [*Ii18NType*](../interfaces/root.ii18ntype.md) | The i18n information that comes from the properties file   |
`location`? | *string* | Exists during the building process and represents the file location it is stripped after processing   |
`pointers`? | *any* | Also exists during the building process only and it's the pointers that are used for tracebacks   |
`raw`? | *string* | The raw content of the file itself, as a plain string, it's stripped after processing   |
`type` | *root* | The type is always root   |

the new json

Defined in: [builder/processer.ts:164](https://github.com/onzag/itemize/blob/0569bdf2/builder/processer.ts#L164)
