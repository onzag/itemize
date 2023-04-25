[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md) / IItemSearchStateType

# Interface: IItemSearchStateType

[base/Root/Module/ItemDefinition](../modules/base_Root_Module_ItemDefinition.md).IItemSearchStateType

## Table of contents

### Properties

- [searchCachePolicy](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchcachepolicy)
- [searchCacheUsesProperty](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchcacheusesproperty)
- [searchCount](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchcount)
- [searchEngineEnabled](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchengineenabled)
- [searchEngineEnabledLang](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchengineenabledlang)
- [searchEngineHighlightArgs](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchenginehighlightargs)
- [searchError](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searcherror)
- [searchFields](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchfields)
- [searchHighlights](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchhighlights)
- [searchId](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchid)
- [searchLastModified](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchlastmodified)
- [searchLimit](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchlimit)
- [searchListenPolicy](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchlistenpolicy)
- [searchOffset](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchoffset)
- [searchOriginalOptions](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchoriginaloptions)
- [searchOwner](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchowner)
- [searchParent](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchparent)
- [searchRecords](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchrecords)
- [searchRequestedIncludes](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchrequestedincludes)
- [searchRequestedProperties](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchrequestedproperties)
- [searchResults](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchresults)
- [searchShouldCache](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searchshouldcache)
- [searching](base_Root_Module_ItemDefinition.IItemSearchStateType.md#searching)

## Properties

### searchCachePolicy

• **searchCachePolicy**: ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` \| ``"none"``

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:62](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L62)

___

### searchCacheUsesProperty

• **searchCacheUsesProperty**: [`string`, `string`]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:64](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L64)

___

### searchCount

• **searchCount**: `number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:56](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L56)

___

### searchEngineEnabled

• **searchEngineEnabled**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:68](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L68)

___

### searchEngineEnabledLang

• **searchEngineEnabledLang**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:69](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L69)

___

### searchEngineHighlightArgs

• **searchEngineHighlightArgs**: [`IItemSearchStateHighlightArgsType`](base_Root_Module_ItemDefinition.IItemSearchStateHighlightArgsType.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:71](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L71)

___

### searchError

• **searchError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:50](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L50)

___

### searchFields

• **searchFields**: `any`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:67](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L67)

___

### searchHighlights

• **searchHighlights**: [`IElasticHighlightRecordInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightRecordInfo.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:73](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L73)

___

### searchId

• **searchId**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:57](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L57)

___

### searchLastModified

• **searchLastModified**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:59](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L59)

___

### searchLimit

• **searchLimit**: `number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:54](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L54)

___

### searchListenPolicy

• **searchListenPolicy**: ``"by-owner"`` \| ``"by-parent"`` \| ``"by-owner-and-parent"`` \| ``"by-property"`` \| ``"none"``

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:61](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L61)

___

### searchOffset

• **searchOffset**: `number`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:55](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L55)

___

### searchOriginalOptions

• **searchOriginalOptions**: [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md)

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:74](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L74)

___

### searchOwner

• **searchOwner**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:58](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L58)

___

### searchParent

• **searchParent**: [`string`, `string`, `string`]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:60](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L60)

___

### searchRecords

• **searchRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:52](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L52)

___

### searchRequestedIncludes

• **searchRequestedIncludes**: `Object`

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:66](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L66)

___

### searchRequestedProperties

• **searchRequestedProperties**: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:65](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L65)

___

### searchResults

• **searchResults**: [`IGQLValue`](gql_querier.IGQLValue.md)[]

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:53](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L53)

___

### searchShouldCache

• **searchShouldCache**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:63](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L63)

___

### searching

• **searching**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/index.ts:51](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/index.ts#L51)
