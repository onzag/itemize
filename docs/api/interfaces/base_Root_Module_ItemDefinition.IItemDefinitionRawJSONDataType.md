[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / IItemDefinitionRawJSONDataType

# Interface: IItemDefinitionRawJSONDataType

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).IItemDefinitionRawJSONDataType

The raw form of the item definition from the processed schema

## Table of contents

### Properties

- [canBeParentedBy](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#canbeparentedby)
- [canCreateInBehalf](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#cancreateinbehalf)
- [childDefinitions](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#childdefinitions)
- [createInBehalfRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#createinbehalfroleaccess)
- [createInBehalfTargetRoles](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#createinbehalftargetroles)
- [createRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#createroleaccess)
- [customIdRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#customidroleaccess)
- [deleteRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#deleteroleaccess)
- [editRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#editroleaccess)
- [enableReparenting](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#enablereparenting)
- [enableVersioning](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#enableversioning)
- [i18nData](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#i18ndata)
- [i18nDataLocation](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#i18ndatalocation)
- [importedChildDefinitions](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#importedchilddefinitions)
- [includes](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#includes)
- [location](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#location)
- [mustBeParented](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#mustbeparented)
- [name](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#name)
- [ownerIsObjectId](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#ownerisobjectid)
- [ownerReadRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#ownerreadroleaccess)
- [parentMaxChildCountAnyType](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#parentmaxchildcountanytype)
- [parentMaxChildCountSameType](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#parentmaxchildcountsametype)
- [parentingRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#parentingroleaccess)
- [parentingRule](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#parentingrule)
- [pointers](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#pointers)
- [policies](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#policies)
- [properties](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#properties)
- [raw](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#raw)
- [readRoleAccess](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#readroleaccess)
- [requestLimiters](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md#requestlimiters)
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

[base/Root/Module/ItemDefinition/index.ts:253](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L253)

___

### canCreateInBehalf

• `Optional` **canCreateInBehalf**: `boolean`

Whether an user role can create in behalf

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:229](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L229)

___

### childDefinitions

• `Optional` **childDefinitions**: [`IItemDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)[]

The actual child definitions that this item definition contains
this is appended during process as an array of this same object
aka it recurses as a tree

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:198](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L198)

___

### createInBehalfRoleAccess

• `Optional` **createInBehalfRoleAccess**: `string`[]

A list of roles of which this item definition is allowed to be
used to create in behalf

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:235](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L235)

___

### createInBehalfTargetRoles

• `Optional` **createInBehalfTargetRoles**: `string`[]

A list of roles which the item definition is allowed to create
in behalf to

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:247](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L247)

___

### createRoleAccess

• `Optional` **createRoleAccess**: `string`[]

Create role permissions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:176](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L176)

___

### customIdRoleAccess

• `Optional` **customIdRoleAccess**: `string`[]

A list of roles which this item definition is allowed to
be used to make custom ids

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:241](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L241)

___

### deleteRoleAccess

• `Optional` **deleteRoleAccess**: `string`[]

Delete role permissions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:184](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L184)

___

### editRoleAccess

• `Optional` **editRoleAccess**: `string`[]

Edit role permissions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:180](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L180)

___

### enableReparenting

• `Optional` **enableReparenting**: `boolean`

Allows to move children from one parent to another
by providing a new parent during edit

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:268](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L268)

___

### enableVersioning

• `Optional` **enableVersioning**: `boolean`

Whether versioning is enabled

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:143](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L143)

___

### i18nData

• **i18nData**: [`IRawJSONI18NDataType`](base_Root_Module.IRawJSONI18NDataType.md)

The i18n data that is attached to that item definition it also doesn't exist
in the unprocessed data but comes from the properties file

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:129](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L129)

___

### i18nDataLocation

• `Optional` **i18nDataLocation**: `string`

Also stripped after processed, represents the file location for the
i18n properties file

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:108](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L108)

___

### importedChildDefinitions

• `Optional` **importedChildDefinitions**: `string`[][]

This gets added during the building process
and represents the list of imported definitions
that exist within the module and are used for includes
these are paths

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:192](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L192)

___

### includes

• `Optional` **includes**: [`IIncludeRawJSONDataType`](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md)[]

The includes exist within the item definition

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:134](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L134)

___

### location

• `Optional` **location**: `string`

Location only exists during the building process and it's stripped
and represents the file location the file is

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:103](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L103)

___

### mustBeParented

• `Optional` **mustBeParented**: `boolean`

Whether it actually must always be parented

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:272](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L272)

___

### name

• **name**: `string`

The name doesn't exist within the raw unprocessed data but it's added and
it's equal to the file name or the folder name in case of index.json

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:124](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L124)

___

### ownerIsObjectId

• `Optional` **ownerIsObjectId**: `boolean`

This only really makes sense in the user case and it basically
shifts the ownership of the object to be its id rather than its created_by
attribute

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:211](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L211)

___

### ownerReadRoleAccess

• `Optional` **ownerReadRoleAccess**: `string`[]

If a role doesn't fit the criteria specified in the list the owner of
a given item cannot truly be read and the created_by field becomes
the unspecified owner

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:218](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L218)

___

### parentMaxChildCountAnyType

• `Optional` **parentMaxChildCountAnyType**: `number`

Limits the number of children that can be parented
by the any type

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:263](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L263)

___

### parentMaxChildCountSameType

• `Optional` **parentMaxChildCountSameType**: `number`

Limits the number of children that can be parented
by the same type

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:258](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L258)

___

### parentingRoleAccess

• `Optional` **parentingRoleAccess**: `string`[]

A list of roles who have access to parenting

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:284](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L284)

___

### parentingRule

• `Optional` **parentingRule**: ``"ONCE"`` \| ``"ONCE_PER_OWNER"`` \| ``"MANY"``

The parenting rule
ONCE means that this item can only be parented once for the given parent
so one parent can only have one children of this same type
ONCE_PER_OWNER means that the rule applies as of a per owner basis
MANY is the default there can be as many children of the same type as it wants

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:280](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L280)

___

### pointers

• `Optional` **pointers**: `any`

The pointers come during the parsing method and are stripped as well
after built and it's used to create tracebacks from the raw data

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:113](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L113)

___

### policies

• `Optional` **policies**: [`IPoliciesRawJSONDataType`](base_Root_Module_ItemDefinition.IPoliciesRawJSONDataType.md)

the policies in the raw json form as they are specified
in the unprocessed file

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:204](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L204)

___

### properties

• `Optional` **properties**: [`IPropertyDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)[]

The properties represent the list of properties it has

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:138](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L138)

___

### raw

• `Optional` **raw**: `string`

This is the raw content of the file the pointers came from and it's also
stripped after built is done

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:118](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L118)

___

### readRoleAccess

• `Optional` **readRoleAccess**: `string`[]

Read role permissions

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:172](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L172)

___

### requestLimiters

• `Optional` **requestLimiters**: [`IRequestLimitersType`](base_Root.IRequestLimitersType.md)

the request limiters

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:288](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L288)

___

### searchRoleAccess

• `Optional` **searchRoleAccess**: `string`[]

Permissions for search purposes

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:168](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L168)

___

### searchable

• `Optional` **searchable**: `boolean`

Whether the item definition is searchable, when a module is searchable
and the item definition is not, the module precedes

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:224](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L224)

___

### type

• **type**: ``"item"``

Basic type

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:97](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L97)

___

### versionIsCountry

• `Optional` **versionIsCountry**: `boolean`

Whether the version can be a country

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:153](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L153)

___

### versionIsLanguage

• `Optional` **versionIsLanguage**: `boolean`

Whether the version can be a language

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:158](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L158)

___

### versionIsLanguageAndCountry

• `Optional` **versionIsLanguageAndCountry**: `boolean`

Whether the version can be a country language concat pair such as en-US or fi-FI

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:148](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L148)

___

### versioningRoleAccess

• `Optional` **versioningRoleAccess**: `string`[]

The roles that are allowed to do versioning

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:163](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/index.ts#L163)
