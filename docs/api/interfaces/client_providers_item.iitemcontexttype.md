[](../README.md) / [Exports](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IItemContextType

# Interface: IItemContextType

[client/providers/item](../modules/client_providers_item.md).IItemContextType

The whole item definition context

## Table of contents

### Properties

- [blocked](client_providers_item.iitemcontexttype.md#blocked)
- [blockedButDataAccessible](client_providers_item.iitemcontexttype.md#blockedbutdataaccessible)
- [clean](client_providers_item.iitemcontexttype.md#clean)
- [delete](client_providers_item.iitemcontexttype.md#delete)
- [deleteError](client_providers_item.iitemcontexttype.md#deleteerror)
- [deleted](client_providers_item.iitemcontexttype.md#deleted)
- [deleting](client_providers_item.iitemcontexttype.md#deleting)
- [dismissDeleteError](client_providers_item.iitemcontexttype.md#dismissdeleteerror)
- [dismissDeleted](client_providers_item.iitemcontexttype.md#dismissdeleted)
- [dismissLoadError](client_providers_item.iitemcontexttype.md#dismissloaderror)
- [dismissSearchError](client_providers_item.iitemcontexttype.md#dismisssearcherror)
- [dismissSearchResults](client_providers_item.iitemcontexttype.md#dismisssearchresults)
- [dismissSubmitError](client_providers_item.iitemcontexttype.md#dismisssubmiterror)
- [dismissSubmitted](client_providers_item.iitemcontexttype.md#dismisssubmitted)
- [forId](client_providers_item.iitemcontexttype.md#forid)
- [forVersion](client_providers_item.iitemcontexttype.md#forversion)
- [idef](client_providers_item.iitemcontexttype.md#idef)
- [injectSubmitBlockPromise](client_providers_item.iitemcontexttype.md#injectsubmitblockpromise)
- [injectedParentContext](client_providers_item.iitemcontexttype.md#injectedparentcontext)
- [loadError](client_providers_item.iitemcontexttype.md#loaderror)
- [loaded](client_providers_item.iitemcontexttype.md#loaded)
- [loading](client_providers_item.iitemcontexttype.md#loading)
- [notFound](client_providers_item.iitemcontexttype.md#notfound)
- [onIncludeSetExclusionState](client_providers_item.iitemcontexttype.md#onincludesetexclusionstate)
- [onPropertyChange](client_providers_item.iitemcontexttype.md#onpropertychange)
- [onPropertyClearEnforce](client_providers_item.iitemcontexttype.md#onpropertyclearenforce)
- [onPropertyEnforce](client_providers_item.iitemcontexttype.md#onpropertyenforce)
- [onPropertyRestore](client_providers_item.iitemcontexttype.md#onpropertyrestore)
- [poke](client_providers_item.iitemcontexttype.md#poke)
- [pokedElements](client_providers_item.iitemcontexttype.md#pokedelements)
- [reload](client_providers_item.iitemcontexttype.md#reload)
- [remoteListener](client_providers_item.iitemcontexttype.md#remotelistener)
- [search](client_providers_item.iitemcontexttype.md#search)
- [searchCount](client_providers_item.iitemcontexttype.md#searchcount)
- [searchError](client_providers_item.iitemcontexttype.md#searcherror)
- [searchFields](client_providers_item.iitemcontexttype.md#searchfields)
- [searchId](client_providers_item.iitemcontexttype.md#searchid)
- [searchLimit](client_providers_item.iitemcontexttype.md#searchlimit)
- [searchOffset](client_providers_item.iitemcontexttype.md#searchoffset)
- [searchOwner](client_providers_item.iitemcontexttype.md#searchowner)
- [searchRecords](client_providers_item.iitemcontexttype.md#searchrecords)
- [searchRequestedIncludes](client_providers_item.iitemcontexttype.md#searchrequestedincludes)
- [searchRequestedProperties](client_providers_item.iitemcontexttype.md#searchrequestedproperties)
- [searchResults](client_providers_item.iitemcontexttype.md#searchresults)
- [searchShouldCache](client_providers_item.iitemcontexttype.md#searchshouldcache)
- [searchWasRestored](client_providers_item.iitemcontexttype.md#searchwasrestored)
- [searching](client_providers_item.iitemcontexttype.md#searching)
- [state](client_providers_item.iitemcontexttype.md#state)
- [submit](client_providers_item.iitemcontexttype.md#submit)
- [submitError](client_providers_item.iitemcontexttype.md#submiterror)
- [submitted](client_providers_item.iitemcontexttype.md#submitted)
- [submitting](client_providers_item.iitemcontexttype.md#submitting)
- [unpoke](client_providers_item.iitemcontexttype.md#unpoke)

## Properties

### blocked

• **blocked**: *boolean*

Defined in: [client/providers/item.tsx:357](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L357)

___

### blockedButDataAccessible

• **blockedButDataAccessible**: *boolean*

Defined in: [client/providers/item.tsx:361](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L361)

___

### clean

• **clean**: (`options`: [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*) => *void*

#### Type declaration:

▸ (`options`: [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md) |
`state` | *success* \| *fail* |
`avoidTriggeringUpdate?` | *boolean* |

**Returns:** *void*

Defined in: [client/providers/item.tsx:427](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L427)

Defined in: [client/providers/item.tsx:427](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L427)

___

### delete

• **delete**: () => *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

#### Type declaration:

▸ (): *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

**Returns:** *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

Defined in: [client/providers/item.tsx:425](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L425)

Defined in: [client/providers/item.tsx:425](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L425)

___

### deleteError

• **deleteError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

Defined in: [client/providers/item.tsx:377](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L377)

___

### deleted

• **deleted**: *boolean*

Defined in: [client/providers/item.tsx:382](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L382)

___

### deleting

• **deleting**: *boolean*

Defined in: [client/providers/item.tsx:379](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L379)

___

### dismissDeleteError

• **dismissDeleteError**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:471](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L471)

Defined in: [client/providers/item.tsx:471](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L471)

___

### dismissDeleted

• **dismissDeleted**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:472](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L472)

Defined in: [client/providers/item.tsx:472](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L472)

___

### dismissLoadError

• **dismissLoadError**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:468](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L468)

Defined in: [client/providers/item.tsx:468](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L468)

___

### dismissSearchError

• **dismissSearchError**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:473](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L473)

Defined in: [client/providers/item.tsx:473](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L473)

___

### dismissSearchResults

• **dismissSearchResults**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:474](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L474)

Defined in: [client/providers/item.tsx:474](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L474)

___

### dismissSubmitError

• **dismissSubmitError**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:469](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L469)

Defined in: [client/providers/item.tsx:469](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L469)

___

### dismissSubmitted

• **dismissSubmitted**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:470](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L470)

Defined in: [client/providers/item.tsx:470](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L470)

___

### forId

• **forId**: *string*

Defined in: [client/providers/item.tsx:349](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L349)

___

### forVersion

• **forVersion**: *string*

Defined in: [client/providers/item.tsx:351](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L351)

___

### idef

• **idef**: [*default*](../classes/base_root_module_itemdefinition.default.md)

Defined in: [client/providers/item.tsx:343](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L343)

___

### injectSubmitBlockPromise

• **injectSubmitBlockPromise**: (`arg`: *Promise*<any\>) => *void*

#### Type declaration:

▸ (`arg`: *Promise*<any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *Promise*<any\> |

**Returns:** *void*

Defined in: [client/providers/item.tsx:489](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L489)

Defined in: [client/providers/item.tsx:489](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L489)

___

### injectedParentContext

• **injectedParentContext**: [*IItemContextType*](client_providers_item.iitemcontexttype.md)

Defined in: [client/providers/item.tsx:484](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L484)

___

### loadError

• **loadError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

Defined in: [client/providers/item.tsx:363](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L363)

___

### loaded

• **loaded**: *boolean*

Defined in: [client/providers/item.tsx:367](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L367)

___

### loading

• **loading**: *boolean*

Defined in: [client/providers/item.tsx:365](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L365)

___

### notFound

• **notFound**: *boolean*

Defined in: [client/providers/item.tsx:354](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L354)

___

### onIncludeSetExclusionState

• **onIncludeSetExclusionState**: (`include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `state`: [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)) => *void*

#### Type declaration:

▸ (`include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `state`: [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) |
`state` | [*IncludeExclusionState*](../enums/base_root_module_itemdefinition_include.includeexclusionstate.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:448](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L448)

Defined in: [client/providers/item.tsx:448](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L448)

___

### onPropertyChange

• **onPropertyChange**: (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `internalValue`: *any*) => *void*

#### Type declaration:

▸ (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/providers/item.tsx:437](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L437)

Defined in: [client/providers/item.tsx:437](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L437)

___

### onPropertyClearEnforce

• **onPropertyClearEnforce**: (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `givenForId`: *string*, `givenForVersion`: *string*) => *void*

#### Type declaration:

▸ (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `givenForId`: *string*, `givenForVersion`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) |
`givenForId` | *string* |
`givenForVersion` | *string* |

**Returns:** *void*

Defined in: [client/providers/item.tsx:461](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L461)

Defined in: [client/providers/item.tsx:461](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L461)

___

### onPropertyEnforce

• **onPropertyEnforce**: (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `givenForId`: *string*, `givenForVersion`: *string*) => *void*

#### Type declaration:

▸ (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `givenForId`: *string*, `givenForVersion`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |
`givenForId` | *string* |
`givenForVersion` | *string* |

**Returns:** *void*

Defined in: [client/providers/item.tsx:455](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L455)

Defined in: [client/providers/item.tsx:455](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L455)

___

### onPropertyRestore

• **onPropertyRestore**: (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)) => *void*

#### Type declaration:

▸ (`property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:443](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L443)

Defined in: [client/providers/item.tsx:443](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L443)

___

### poke

• **poke**: (`elements`: [*IPokeElementsType*](client_providers_item.ipokeelementstype.md)) => *void*

#### Type declaration:

▸ (`elements`: [*IPokeElementsType*](client_providers_item.ipokeelementstype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`elements` | [*IPokeElementsType*](client_providers_item.ipokeelementstype.md) |

**Returns:** *void*

Defined in: [client/providers/item.tsx:477](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L477)

Defined in: [client/providers/item.tsx:477](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L477)

___

### pokedElements

• **pokedElements**: [*IPokeElementsType*](client_providers_item.ipokeelementstype.md)

Defined in: [client/providers/item.tsx:416](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L416)

___

### reload

• **reload**: (`denyCache?`: *boolean*) => *Promise*<[*IActionResponseWithValue*](client_providers_item.iactionresponsewithvalue.md)\>

#### Type declaration:

▸ (`denyCache?`: *boolean*): *Promise*<[*IActionResponseWithValue*](client_providers_item.iactionresponsewithvalue.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`denyCache?` | *boolean* |

**Returns:** *Promise*<[*IActionResponseWithValue*](client_providers_item.iactionresponsewithvalue.md)\>

Defined in: [client/providers/item.tsx:420](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L420)

Defined in: [client/providers/item.tsx:420](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L420)

___

### remoteListener

• **remoteListener**: [*RemoteListener*](../classes/client_internal_app_remote_listener.remotelistener.md)

Defined in: [client/providers/item.tsx:481](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L481)

___

### search

• **search**: (`options`: [*IActionSearchOptions*](client_providers_item.iactionsearchoptions.md)) => *Promise*<[*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md)\>

#### Type declaration:

▸ (`options`: [*IActionSearchOptions*](client_providers_item.iactionsearchoptions.md)): *Promise*<[*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionSearchOptions*](client_providers_item.iactionsearchoptions.md) |

**Returns:** *Promise*<[*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md)\>

Defined in: [client/providers/item.tsx:432](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L432)

Defined in: [client/providers/item.tsx:432](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L432)

___

### searchCount

• **searchCount**: *number*

Defined in: [client/providers/item.tsx:393](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L393)

___

### searchError

• **searchError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

Defined in: [client/providers/item.tsx:384](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L384)

___

### searchFields

• **searchFields**: *any*

Defined in: [client/providers/item.tsx:406](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L406)

___

### searchId

• **searchId**: *string*

Defined in: [client/providers/item.tsx:396](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L396)

___

### searchLimit

• **searchLimit**: *number*

Defined in: [client/providers/item.tsx:391](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L391)

___

### searchOffset

• **searchOffset**: *number*

Defined in: [client/providers/item.tsx:392](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L392)

___

### searchOwner

• **searchOwner**: *string*

Defined in: [client/providers/item.tsx:399](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L399)

___

### searchRecords

• **searchRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

Defined in: [client/providers/item.tsx:389](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L389)

___

### searchRequestedIncludes

• **searchRequestedIncludes**: *object*

#### Type declaration:

Defined in: [client/providers/item.tsx:408](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L408)

___

### searchRequestedProperties

• **searchRequestedProperties**: *string*[]

Defined in: [client/providers/item.tsx:407](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L407)

___

### searchResults

• **searchResults**: [*IGQLValue*](gql_querier.igqlvalue.md)[]

Defined in: [client/providers/item.tsx:390](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L390)

___

### searchShouldCache

• **searchShouldCache**: *boolean*

Defined in: [client/providers/item.tsx:403](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L403)

___

### searchWasRestored

• **searchWasRestored**: *boolean*

Defined in: [client/providers/item.tsx:397](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L397)

___

### searching

• **searching**: *boolean*

Defined in: [client/providers/item.tsx:386](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L386)

___

### state

• **state**: [*IItemStateType*](base_root_module_itemdefinition.iitemstatetype.md)

Defined in: [client/providers/item.tsx:346](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L346)

___

### submit

• **submit**: (`options`: [*IActionSubmitOptions*](client_providers_item.iactionsubmitoptions.md)) => *Promise*<[*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md)\>

#### Type declaration:

▸ (`options`: [*IActionSubmitOptions*](client_providers_item.iactionsubmitoptions.md)): *Promise*<[*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionSubmitOptions*](client_providers_item.iactionsubmitoptions.md) |

**Returns:** *Promise*<[*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md)\>

Defined in: [client/providers/item.tsx:423](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L423)

Defined in: [client/providers/item.tsx:423](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L423)

___

### submitError

• **submitError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

Defined in: [client/providers/item.tsx:369](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L369)

___

### submitted

• **submitted**: *boolean*

Defined in: [client/providers/item.tsx:375](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L375)

___

### submitting

• **submitting**: *boolean*

Defined in: [client/providers/item.tsx:371](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L371)

___

### unpoke

• **unpoke**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/providers/item.tsx:478](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L478)

Defined in: [client/providers/item.tsx:478](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L478)
