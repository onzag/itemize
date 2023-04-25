[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module](../modules/base_Root_Module.md) / IModuleRawJSONDataType

# Interface: IModuleRawJSONDataType

[base/Root/Module](../modules/base_Root_Module.md).IModuleRawJSONDataType

This is the raw shape of a module after it has been
built and processed

## Table of contents

### Properties

- [children](base_Root_Module.IModuleRawJSONDataType.md#children)
- [i18nData](base_Root_Module.IModuleRawJSONDataType.md#i18ndata)
- [i18nDataLocation](base_Root_Module.IModuleRawJSONDataType.md#i18ndatalocation)
- [location](base_Root_Module.IModuleRawJSONDataType.md#location)
- [maxSearchRecords](base_Root_Module.IModuleRawJSONDataType.md#maxsearchrecords)
- [maxSearchResults](base_Root_Module.IModuleRawJSONDataType.md#maxsearchresults)
- [modRoleAccess](base_Root_Module.IModuleRawJSONDataType.md#modroleaccess)
- [name](base_Root_Module.IModuleRawJSONDataType.md#name)
- [pointers](base_Root_Module.IModuleRawJSONDataType.md#pointers)
- [propExtLocation](base_Root_Module.IModuleRawJSONDataType.md#propextlocation)
- [propExtPointers](base_Root_Module.IModuleRawJSONDataType.md#propextpointers)
- [propExtRaw](base_Root_Module.IModuleRawJSONDataType.md#propextraw)
- [propExtensions](base_Root_Module.IModuleRawJSONDataType.md#propextensions)
- [raw](base_Root_Module.IModuleRawJSONDataType.md#raw)
- [readRoleAccess](base_Root_Module.IModuleRawJSONDataType.md#readroleaccess)
- [requestLimiters](base_Root_Module.IModuleRawJSONDataType.md#requestlimiters)
- [searchEngineEnabled](base_Root_Module.IModuleRawJSONDataType.md#searchengineenabled)
- [searchRoleAccess](base_Root_Module.IModuleRawJSONDataType.md#searchroleaccess)
- [searchable](base_Root_Module.IModuleRawJSONDataType.md#searchable)
- [type](base_Root_Module.IModuleRawJSONDataType.md#type)

## Properties

### children

• **children**: ([`IItemDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md) \| [`IModuleRawJSONDataType`](base_Root_Module.IModuleRawJSONDataType.md))[]

the children either module or item definition as found during the folder
search

#### Defined in

[base/Root/Module/index.ts:192](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L192)

___

### i18nData

• **i18nData**: [`IRawJSONI18NDataType`](base_Root_Module.IRawJSONI18NDataType.md)

The internationalization data

#### Defined in

[base/Root/Module/index.ts:161](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L161)

___

### i18nDataLocation

• `Optional` **i18nDataLocation**: `string`

Also stripped after processed, represents the file location for the
i18n properties file

#### Defined in

[base/Root/Module/index.ts:129](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L129)

___

### location

• `Optional` **location**: `string`

Location only exists during the building process and it's stripped
and represents the file location the file is

#### Defined in

[base/Root/Module/index.ts:124](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L124)

___

### maxSearchRecords

• `Optional` **maxSearchRecords**: `number`

Affects both the module and item definition, this determines the amount of match
results that can be retrieved at once, if not specified fallbacks to
MAX_SEARCH_RECORDS_DEFAULT

#### Defined in

[base/Root/Module/index.ts:211](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L211)

___

### maxSearchResults

• `Optional` **maxSearchResults**: `number`

Affects both the module and the item definition, this determines
how big the page of requested values can be, for the limit and offset,
it also determines the size of GET_LIST query requests as well
that should give a value that is less or equal to this amount, the default for
this value is MAX_SEARCH_RESULTS_DEFAULT

#### Defined in

[base/Root/Module/index.ts:205](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L205)

___

### modRoleAccess

• `Optional` **modRoleAccess**: `string`[]

The roles that have moderation capabilities
over the item definitions under this module
modding only exist at module level as well

#### Defined in

[base/Root/Module/index.ts:178](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L178)

___

### name

• **name**: `string`

The name of the file that now becomes a property

#### Defined in

[base/Root/Module/index.ts:157](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L157)

___

### pointers

• `Optional` **pointers**: `any`

The pointers come during the parsing method and are stripped as well
after built and it's used to create tracebacks from the raw data

#### Defined in

[base/Root/Module/index.ts:134](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L134)

___

### propExtLocation

• `Optional` **propExtLocation**: `string`

The prop extensions file location for the module, also stripped

#### Defined in

[base/Root/Module/index.ts:143](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L143)

___

### propExtPointers

• `Optional` **propExtPointers**: `any`

The prop extensions pointers for use within the tracebacks during
the build process, stripped down after done

#### Defined in

[base/Root/Module/index.ts:152](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L152)

___

### propExtRaw

• `Optional` **propExtRaw**: `string`

The prop extensions raw file source, stripped down as well

#### Defined in

[base/Root/Module/index.ts:147](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L147)

___

### propExtensions

• `Optional` **propExtensions**: [`IPropertyDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)[]

The prop extensions properties that this modules gives to all the item definitions

#### Defined in

[base/Root/Module/index.ts:196](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L196)

___

### raw

• `Optional` **raw**: `string`

This is the raw content of the file the pointers came from and it's also
stripped after built is done

#### Defined in

[base/Root/Module/index.ts:139](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L139)

___

### readRoleAccess

• `Optional` **readRoleAccess**: `string`[]

The read role access

#### Defined in

[base/Root/Module/index.ts:166](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L166)

___

### requestLimiters

• `Optional` **requestLimiters**: [`IRequestLimitersType`](base_Root.IRequestLimitersType.md)

And AND request limiter is a very powerful one as this would ensure
the creation of database indexes that will match and speed up these searches
createdAt creates a limiter that requests any search to contain created_at
createdBy creates a limiter that requests any search to contain created_by
parenting requests for a parent and custom adds to custom properties that will be
required at module level, these are basically args
And AND index will ensure to add an ordered btree index to these

#### Defined in

[base/Root/Module/index.ts:221](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L221)

___

### searchEngineEnabled

• `Optional` **searchEngineEnabled**: `boolean`

Wether it is to be indexed by elastic

#### Defined in

[base/Root/Module/index.ts:187](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L187)

___

### searchRoleAccess

• `Optional` **searchRoleAccess**: `string`[]

The search role access

#### Defined in

[base/Root/Module/index.ts:171](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L171)

___

### searchable

• `Optional` **searchable**: `boolean`

Whether the module, and only the module itself
is searchable

#### Defined in

[base/Root/Module/index.ts:183](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L183)

___

### type

• **type**: ``"module"``

The type is module

#### Defined in

[base/Root/Module/index.ts:118](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/index.ts#L118)
