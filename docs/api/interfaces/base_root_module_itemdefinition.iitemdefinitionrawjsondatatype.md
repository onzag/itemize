[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_root_module_itemdefinition.md) / IItemDefinitionRawJSONDataType

# Interface: IItemDefinitionRawJSONDataType

[base/Root/Module/ItemDefinition](../modules/base_root_module_itemdefinition.md).IItemDefinitionRawJSONDataType

The raw form of the item definition from the processed schema

## Table of contents

### Properties

- [canBeParentedBy](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#canbeparentedby)
- [canCreateInBehalf](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#cancreateinbehalf)
- [childDefinitions](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#childdefinitions)
- [createInBehalfRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#createinbehalfroleaccess)
- [createInBehalfTargetRoles](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#createinbehalftargetroles)
- [createRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#createroleaccess)
- [customIdRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#customidroleaccess)
- [deleteRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#deleteroleaccess)
- [editRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#editroleaccess)
- [enableVersioning](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#enableversioning)
- [i18nData](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#i18ndata)
- [i18nDataLocation](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#i18ndatalocation)
- [importedChildDefinitions](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#importedchilddefinitions)
- [includes](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#includes)
- [location](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#location)
- [mustBeParented](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#mustbeparented)
- [name](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#name)
- [ownerIsObjectId](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#ownerisobjectid)
- [ownerReadRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#ownerreadroleaccess)
- [parentingRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#parentingroleaccess)
- [pointers](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#pointers)
- [policies](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#policies)
- [properties](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#properties)
- [raw](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#raw)
- [readRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#readroleaccess)
- [requestLimiters](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#requestlimiters)
- [searchRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#searchroleaccess)
- [searchable](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#searchable)
- [type](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#type)
- [versionIsCountry](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#versioniscountry)
- [versionIsLanguage](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#versionislanguage)
- [versionIsLanguageAndCountry](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#versionislanguageandcountry)
- [versioningRoleAccess](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md#versioningroleaccess)

## Properties

### canBeParentedBy

• `Optional` **canBeParentedBy**: [*IItemDefinitionParentingRawJSONDataType*](base_root_module_itemdefinition.iitemdefinitionparentingrawjsondatatype.md)[]

Whether it can be parented by other item definitions, these
represent a list of rules

Defined in: [base/Root/Module/ItemDefinition/index.ts:252](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L252)

___

### canCreateInBehalf

• `Optional` **canCreateInBehalf**: *boolean*

Whether an user role can create in behalf

Defined in: [base/Root/Module/ItemDefinition/index.ts:228](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L228)

___

### childDefinitions

• `Optional` **childDefinitions**: [*IItemDefinitionRawJSONDataType*](base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)[]

The actual child definitions that this item definition contains
this is appended during process as an array of this same object
aka it recurses as a tree

Defined in: [base/Root/Module/ItemDefinition/index.ts:197](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L197)

___

### createInBehalfRoleAccess

• `Optional` **createInBehalfRoleAccess**: *string*[]

A list of roles of which this item definition is allowed to be
used to create in behalf

Defined in: [base/Root/Module/ItemDefinition/index.ts:234](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L234)

___

### createInBehalfTargetRoles

• `Optional` **createInBehalfTargetRoles**: *string*[]

A list of roles which the item definition is allowed to create
in behalf to

Defined in: [base/Root/Module/ItemDefinition/index.ts:246](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L246)

___

### createRoleAccess

• `Optional` **createRoleAccess**: *string*[]

Create role permissions

Defined in: [base/Root/Module/ItemDefinition/index.ts:175](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L175)

___

### customIdRoleAccess

• `Optional` **customIdRoleAccess**: *string*[]

A list of roles which this item definition is allowed to
be used to make custom ids

Defined in: [base/Root/Module/ItemDefinition/index.ts:240](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L240)

___

### deleteRoleAccess

• `Optional` **deleteRoleAccess**: *string*[]

Delete role permissions

Defined in: [base/Root/Module/ItemDefinition/index.ts:183](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L183)

___

### editRoleAccess

• `Optional` **editRoleAccess**: *string*[]

Edit role permissions

Defined in: [base/Root/Module/ItemDefinition/index.ts:179](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L179)

___

### enableVersioning

• `Optional` **enableVersioning**: *boolean*

Whether versioning is enabled

Defined in: [base/Root/Module/ItemDefinition/index.ts:142](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L142)

___

### i18nData

• **i18nData**: [*IRawJSONI18NDataType*](base_root_module.irawjsoni18ndatatype.md)

The i18n data that is attached to that item definition it also doesn't exist
in the unprocessed data but comes from the properties file

Defined in: [base/Root/Module/ItemDefinition/index.ts:128](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L128)

___

### i18nDataLocation

• `Optional` **i18nDataLocation**: *string*

Also stripped after processed, represents the file location for the
i18n properties file

Defined in: [base/Root/Module/ItemDefinition/index.ts:107](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L107)

___

### importedChildDefinitions

• `Optional` **importedChildDefinitions**: *string*[][]

This gets added during the building process
and represents the list of imported definitions
that exist within the module and are used for includes
these are paths

Defined in: [base/Root/Module/ItemDefinition/index.ts:191](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L191)

___

### includes

• `Optional` **includes**: [*IIncludeRawJSONDataType*](base_root_module_itemdefinition_include.iincluderawjsondatatype.md)[]

The includes exist within the item definition

Defined in: [base/Root/Module/ItemDefinition/index.ts:133](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L133)

___

### location

• `Optional` **location**: *string*

Location only exists during the building process and it's stripped
and represents the file location the file is

Defined in: [base/Root/Module/ItemDefinition/index.ts:102](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L102)

___

### mustBeParented

• `Optional` **mustBeParented**: *boolean*

Whether it actually must always be parented

Defined in: [base/Root/Module/ItemDefinition/index.ts:256](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L256)

___

### name

• **name**: *string*

The name doesn't exist within the raw unprocessed data but it's added and
it's equal to the file name or the folder name in case of index.json

Defined in: [base/Root/Module/ItemDefinition/index.ts:123](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L123)

___

### ownerIsObjectId

• `Optional` **ownerIsObjectId**: *boolean*

This only really makes sense in the user case and it basically
shifts the ownership of the object to be its id rather than its created_by
attribute

Defined in: [base/Root/Module/ItemDefinition/index.ts:210](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L210)

___

### ownerReadRoleAccess

• `Optional` **ownerReadRoleAccess**: *string*[]

If a role doesn't fit the criteria specified in the list the owner of
a given item cannot truly be read and the created_by field becomes
the unspecified owner

Defined in: [base/Root/Module/ItemDefinition/index.ts:217](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L217)

___

### parentingRoleAccess

• `Optional` **parentingRoleAccess**: *string*[]

A list of roles who have access to parenting

Defined in: [base/Root/Module/ItemDefinition/index.ts:260](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L260)

___

### pointers

• `Optional` **pointers**: *any*

The pointers come during the parsing method and are stripped as well
after built and it's used to create tracebacks from the raw data

Defined in: [base/Root/Module/ItemDefinition/index.ts:112](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L112)

___

### policies

• `Optional` **policies**: [*IPoliciesRawJSONDataType*](base_root_module_itemdefinition.ipoliciesrawjsondatatype.md)

the policies in the raw json form as they are specified
in the unprocessed file

Defined in: [base/Root/Module/ItemDefinition/index.ts:203](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L203)

___

### properties

• `Optional` **properties**: [*IPropertyDefinitionRawJSONDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)[]

The properties represent the list of properties it has

Defined in: [base/Root/Module/ItemDefinition/index.ts:137](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L137)

___

### raw

• `Optional` **raw**: *string*

This is the raw content of the file the pointers came from and it's also
stripped after built is done

Defined in: [base/Root/Module/ItemDefinition/index.ts:117](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L117)

___

### readRoleAccess

• `Optional` **readRoleAccess**: *string*[]

Read role permissions

Defined in: [base/Root/Module/ItemDefinition/index.ts:171](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L171)

___

### requestLimiters

• `Optional` **requestLimiters**: [*IRequestLimitersType*](base_root.irequestlimiterstype.md)

the request limiters

Defined in: [base/Root/Module/ItemDefinition/index.ts:264](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L264)

___

### searchRoleAccess

• `Optional` **searchRoleAccess**: *string*[]

Permissions for search purposes

Defined in: [base/Root/Module/ItemDefinition/index.ts:167](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L167)

___

### searchable

• `Optional` **searchable**: *boolean*

Whether the item definition is searchable, when a module is searchable
and the item definition is not, the module precedes

Defined in: [base/Root/Module/ItemDefinition/index.ts:223](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L223)

___

### type

• **type**: *item*

Basic type

Defined in: [base/Root/Module/ItemDefinition/index.ts:96](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L96)

___

### versionIsCountry

• `Optional` **versionIsCountry**: *boolean*

Whether the version can be a country

Defined in: [base/Root/Module/ItemDefinition/index.ts:152](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L152)

___

### versionIsLanguage

• `Optional` **versionIsLanguage**: *boolean*

Whether the version can be a language

Defined in: [base/Root/Module/ItemDefinition/index.ts:157](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L157)

___

### versionIsLanguageAndCountry

• `Optional` **versionIsLanguageAndCountry**: *boolean*

Whether the version can be a country language concat pair such as en-US or fi-FI

Defined in: [base/Root/Module/ItemDefinition/index.ts:147](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L147)

___

### versioningRoleAccess

• `Optional` **versioningRoleAccess**: *string*[]

The roles that are allowed to do versioning

Defined in: [base/Root/Module/ItemDefinition/index.ts:162](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/index.ts#L162)
