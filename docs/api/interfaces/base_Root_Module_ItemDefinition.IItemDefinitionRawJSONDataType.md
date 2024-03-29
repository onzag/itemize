[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / IItemDefinitionRawJSONDataType

# Interface: IItemDefinitionRawJSONDataType

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).IItemDefinitionRawJSONDataType

The raw form of the item definition from the processed schema

## Table of contents

### Properties

- [canBeParentedBy](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#canbeparentedby)
- [canBeParentedRule](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#canbeparentedrule)
- [canBeReparented](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#canbereparented)
- [canCreateInBehalf](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#cancreateinbehalf)
- [childDefinitions](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#childdefinitions)
- [createInBehalfRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#createinbehalfroleaccess)
- [createInBehalfTargetRoles](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#createinbehalftargetroles)
- [createRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#createroleaccess)
- [customIdRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#customidroleaccess)
- [deleteRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#deleteroleaccess)
- [editRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#editroleaccess)
- [enableVersioning](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#enableversioning)
- [i18nData](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#i18ndata)
- [i18nDataLocation](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#i18ndatalocation)
- [importedChildDefinitions](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#importedchilddefinitions)
- [includes](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#includes)
- [location](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#location)
- [maxOwnedCountAnyType](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#maxownedcountanytype)
- [maxOwnedCountSameType](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#maxownedcountsametype)
- [mustBeParented](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#mustbeparented)
- [name](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#name)
- [ownerIsObjectId](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#ownerisobjectid)
- [ownerReadRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#ownerreadroleaccess)
- [owningRule](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#owningrule)
- [parentMaxChildCountAnyType](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#parentmaxchildcountanytype)
- [parentMaxChildCountSameType](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#parentmaxchildcountsametype)
- [parentingRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#parentingroleaccess)
- [pointers](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#pointers)
- [policies](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#policies)
- [properties](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#properties)
- [raw](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#raw)
- [readRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#readroleaccess)
- [searchEngineEnabled](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#searchengineenabled)
- [searchEngineFallbackLang](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#searchenginefallbacklang)
- [searchEngineLangUseVersion](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#searchenginelanguseversion)
- [searchEngineMainLangBasedOnProperty](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#searchenginemainlangbasedonproperty)
- [searchEngineMainLangProperty](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#searchenginemainlangproperty)
- [searchLimiters](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#searchlimiters)
- [searchRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#searchroleaccess)
- [searchable](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#searchable)
- [type](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#type)
- [versionIsCountry](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#versioniscountry)
- [versionIsLanguage](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#versionislanguage)
- [versionIsLanguageAndCountry](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#versionislanguageandcountry)
- [versioningRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#versioningroleaccess)

## Properties

### canBeParentedBy

• `Optional` **canBeParentedBy**: [`IItemDefinitionParentingRawJSONDataType`](base_Root_Module_ItemDefinition.IItemDefinitionParentingRawJSONDataType.md)[]

Whether it can be parented by other item definitions, these
represent a list of rules

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:339](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L339)

___

### canBeParentedRule

• `Optional` **canBeParentedRule**: ``"ONCE"`` \| ``"ONCE_PER_OWNER"`` \| ``"MANY"``

The parenting rule
ONCE means that this item can only be parented once for the given parent
so one parent can only have one children of this same type
ONCE_PER_OWNER means that the rule applies as of a per owner basis
MANY is the default there can be as many children of the same type as it wants

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:376](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L376)

___

### canBeReparented

• `Optional` **canBeReparented**: `boolean`

Allows to move children from one parent to another
by providing a new parent during edit

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:364](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L364)

___

### canCreateInBehalf

• `Optional` **canCreateInBehalf**: `boolean`

Whether an user role can create in behalf

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:315](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L315)

___

### childDefinitions

• `Optional` **childDefinitions**: [`IItemDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)[]

The actual child definitions that this item definition contains
this is appended during process as an array of this same object
aka it recurses as a tree

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:248](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L248)

___

### createInBehalfRoleAccess

• `Optional` **createInBehalfRoleAccess**: `string`[]

A list of roles of which this item definition is allowed to be
used to create in behalf

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:321](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L321)

___

### createInBehalfTargetRoles

• `Optional` **createInBehalfTargetRoles**: `string`[]

A list of roles which the item definition is allowed to create
in behalf to

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:333](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L333)

___

### createRoleAccess

• `Optional` **createRoleAccess**: `string`[]

Create role permissions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:226](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L226)

___

### customIdRoleAccess

• `Optional` **customIdRoleAccess**: `string`[]

A list of roles which this item definition is allowed to
be used to make custom ids

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:327](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L327)

___

### deleteRoleAccess

• `Optional` **deleteRoleAccess**: `string`[]

Delete role permissions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:234](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L234)

___

### editRoleAccess

• `Optional` **editRoleAccess**: `string`[]

Edit role permissions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:230](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L230)

___

### enableVersioning

• `Optional` **enableVersioning**: `boolean`

Whether versioning is enabled

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:193](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L193)

___

### i18nData

• **i18nData**: [`IRawJSONI18NDataType`](base_Root_Module.IRawJSONI18NDataType.md)

The i18n data that is attached to that item definition it also doesn't exist
in the unprocessed data but comes from the properties file

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:179](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L179)

___

### i18nDataLocation

• `Optional` **i18nDataLocation**: `string`

Also stripped after processed, represents the file location for the
i18n properties file

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:158](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L158)

___

### importedChildDefinitions

• `Optional` **importedChildDefinitions**: `string`[][]

This gets added during the building process
and represents the list of imported definitions
that exist within the module and are used for includes
these are paths

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:242](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L242)

___

### includes

• `Optional` **includes**: [`IIncludeRawJSONDataType`](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md)[]

The includes exist within the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:184](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L184)

___

### location

• `Optional` **location**: `string`

Location only exists during the building process and it's stripped
and represents the file location the file is

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:153](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L153)

___

### maxOwnedCountAnyType

• `Optional` **maxOwnedCountAnyType**: `number`

Limits the number of children that can be parented
by the any type

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:359](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L359)

___

### maxOwnedCountSameType

• `Optional` **maxOwnedCountSameType**: `number`

Limits the number of children that can be parented
by the same type

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:354](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L354)

___

### mustBeParented

• `Optional` **mustBeParented**: `boolean`

Whether it actually must always be parented

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:368](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L368)

___

### name

• **name**: `string`

The name doesn't exist within the raw unprocessed data but it's added and
it's equal to the file name or the folder name in case of index.json

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:174](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L174)

___

### ownerIsObjectId

• `Optional` **ownerIsObjectId**: `boolean`

This only really makes sense in the user case and it basically
shifts the ownership of the object to be its id rather than its created_by
attribute

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:261](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L261)

___

### ownerReadRoleAccess

• `Optional` **ownerReadRoleAccess**: `string`[]

If a role doesn't fit the criteria specified in the list the owner of
a given item cannot truly be read and the created_by field becomes
the unspecified owner

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:268](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L268)

___

### owningRule

• `Optional` **owningRule**: ``"ONCE"`` \| ``"MANY"`` \| ``"ONCE_PER_PARENT"``

The owning rule
ONCE means that this item can only exist for once for the given owner
so once the owner creates one of it, that's it
ONCE_PER_PARENT means that the rule applies for a per parent basis
MANY is the default as the user can create as many as it wants

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:384](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L384)

___

### parentMaxChildCountAnyType

• `Optional` **parentMaxChildCountAnyType**: `number`

Limits the number of children that can be parented
by the any type

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:349](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L349)

___

### parentMaxChildCountSameType

• `Optional` **parentMaxChildCountSameType**: `number`

Limits the number of children that can be parented
by the same type

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:344](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L344)

___

### parentingRoleAccess

• `Optional` **parentingRoleAccess**: `Object`

A list of roles who have access to parenting

#### Index signature

▪ [key: `string`]: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:388](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L388)

___

### pointers

• `Optional` **pointers**: `any`

The pointers come during the parsing method and are stripped as well
after built and it's used to create tracebacks from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:163](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L163)

___

### policies

• `Optional` **policies**: [`IPoliciesRawJSONDataType`](base_Root_Module_ItemDefinition.IPoliciesRawJSONDataType.md)

the policies in the raw json form as they are specified
in the unprocessed file

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:254](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L254)

___

### properties

• `Optional` **properties**: [`IPropertyDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)[]

The properties represent the list of properties it has

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:188](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L188)

___

### raw

• `Optional` **raw**: `string`

This is the raw content of the file the pointers came from and it's also
stripped after built is done

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:168](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L168)

___

### readRoleAccess

• `Optional` **readRoleAccess**: `string`[]

Read role permissions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:222](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L222)

___

### searchEngineEnabled

• `Optional` **searchEngineEnabled**: `boolean`

Used to specify if the elastic search engine is enabled for this element

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:279](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L279)

___

### searchEngineFallbackLang

• `Optional` **searchEngineFallbackLang**: `string`

A specific language used

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:284](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L284)

___

### searchEngineLangUseVersion

• `Optional` **searchEngineLangUseVersion**: `boolean`

Wether to use the version as a fallback for language
setting, it can be used in conjuction with the standard fallback
and the property, this takes a second spot

1. Property is checked, if nothing is found
2. version will be checked if unversioned
3. Fallback will be used

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:295](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L295)

___

### searchEngineMainLangBasedOnProperty

• `Optional` **searchEngineMainLangBasedOnProperty**: `string`

Unlike searchEngineMainLangProperty this will use the value of a string or text property itself
as the language, the property should be type language in order to be valid

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:310](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L310)

___

### searchEngineMainLangProperty

• `Optional` **searchEngineMainLangProperty**: `string`

Represents the property that is used in order to setup the elasticsearch
index language, because itemize can be set in many languages

If nothing is found then there's no property for language and it will be stored as a languageless
document in a common index that uses a standard tokenizer

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:304](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L304)

___

### searchLimiters

• `Optional` **searchLimiters**: [`ISearchLimitersType`](base_Root.ISearchLimitersType.md)

the request limiters

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:392](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L392)

___

### searchRoleAccess

• `Optional` **searchRoleAccess**: `string`[]

Permissions for search purposes

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:218](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L218)

___

### searchable

• `Optional` **searchable**: `boolean`

Whether the item definition is searchable, when a module is searchable
and the item definition is not, the module precedes

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:274](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L274)

___

### type

• **type**: ``"item"``

Basic type

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:147](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L147)

___

### versionIsCountry

• `Optional` **versionIsCountry**: `boolean`

Whether the version can be a country

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:203](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L203)

___

### versionIsLanguage

• `Optional` **versionIsLanguage**: `boolean`

Whether the version can be a language

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:208](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L208)

___

### versionIsLanguageAndCountry

• `Optional` **versionIsLanguageAndCountry**: `boolean`

Whether the version can be a country language concat pair such as en-US or fi-FI

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:198](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L198)

___

### versioningRoleAccess

• `Optional` **versioningRoleAccess**: `string`[]

The roles that are allowed to do versioning

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:213](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/index.ts#L213)
