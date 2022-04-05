[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IItemContextType

# Interface: IItemContextType

[client/providers/item](../modules/client_providers_item.md).IItemContextType

The whole item definition context

## Hierarchy

- [`IBasicFns`](client_providers_item.IBasicFns.md)

  ↳ **`IItemContextType`**

## Table of contents

### Properties

- [blocked](client_providers_item.IItemContextType.md#blocked)
- [blockedButDataAccessible](client_providers_item.IItemContextType.md#blockedbutdataaccessible)
- [deleteError](client_providers_item.IItemContextType.md#deleteerror)
- [deleted](client_providers_item.IItemContextType.md#deleted)
- [deleting](client_providers_item.IItemContextType.md#deleting)
- [forId](client_providers_item.IItemContextType.md#forid)
- [forVersion](client_providers_item.IItemContextType.md#forversion)
- [idef](client_providers_item.IItemContextType.md#idef)
- [injectedParentContext](client_providers_item.IItemContextType.md#injectedparentcontext)
- [loadError](client_providers_item.IItemContextType.md#loaderror)
- [loaded](client_providers_item.IItemContextType.md#loaded)
- [loading](client_providers_item.IItemContextType.md#loading)
- [notFound](client_providers_item.IItemContextType.md#notfound)
- [pokedElements](client_providers_item.IItemContextType.md#pokedelements)
- [remoteListener](client_providers_item.IItemContextType.md#remotelistener)
- [searchCount](client_providers_item.IItemContextType.md#searchcount)
- [searchError](client_providers_item.IItemContextType.md#searcherror)
- [searchFields](client_providers_item.IItemContextType.md#searchfields)
- [searchId](client_providers_item.IItemContextType.md#searchid)
- [searchLastModified](client_providers_item.IItemContextType.md#searchlastmodified)
- [searchLimit](client_providers_item.IItemContextType.md#searchlimit)
- [searchOffset](client_providers_item.IItemContextType.md#searchoffset)
- [searchOwner](client_providers_item.IItemContextType.md#searchowner)
- [searchRecords](client_providers_item.IItemContextType.md#searchrecords)
- [searchRequestedIncludes](client_providers_item.IItemContextType.md#searchrequestedincludes)
- [searchRequestedProperties](client_providers_item.IItemContextType.md#searchrequestedproperties)
- [searchResults](client_providers_item.IItemContextType.md#searchresults)
- [searchShouldCache](client_providers_item.IItemContextType.md#searchshouldcache)
- [searchWasRestored](client_providers_item.IItemContextType.md#searchwasrestored)
- [searching](client_providers_item.IItemContextType.md#searching)
- [state](client_providers_item.IItemContextType.md#state)
- [submitError](client_providers_item.IItemContextType.md#submiterror)
- [submitted](client_providers_item.IItemContextType.md#submitted)
- [submitting](client_providers_item.IItemContextType.md#submitting)

### Methods

- [clean](client_providers_item.IItemContextType.md#clean)
- [delete](client_providers_item.IItemContextType.md#delete)
- [dismissDeleteError](client_providers_item.IItemContextType.md#dismissdeleteerror)
- [dismissDeleted](client_providers_item.IItemContextType.md#dismissdeleted)
- [dismissLoadError](client_providers_item.IItemContextType.md#dismissloaderror)
- [dismissSearchError](client_providers_item.IItemContextType.md#dismisssearcherror)
- [dismissSearchResults](client_providers_item.IItemContextType.md#dismisssearchresults)
- [dismissSubmitError](client_providers_item.IItemContextType.md#dismisssubmiterror)
- [dismissSubmitted](client_providers_item.IItemContextType.md#dismisssubmitted)
- [downloadState](client_providers_item.IItemContextType.md#downloadstate)
- [injectSubmitBlockPromise](client_providers_item.IItemContextType.md#injectsubmitblockpromise)
- [loadStateFromFile](client_providers_item.IItemContextType.md#loadstatefromfile)
- [onIncludeSetExclusionState](client_providers_item.IItemContextType.md#onincludesetexclusionstate)
- [onPropertyChange](client_providers_item.IItemContextType.md#onpropertychange)
- [onPropertyClearEnforce](client_providers_item.IItemContextType.md#onpropertyclearenforce)
- [onPropertyEnforce](client_providers_item.IItemContextType.md#onpropertyenforce)
- [onPropertyRestore](client_providers_item.IItemContextType.md#onpropertyrestore)
- [poke](client_providers_item.IItemContextType.md#poke)
- [reload](client_providers_item.IItemContextType.md#reload)
- [search](client_providers_item.IItemContextType.md#search)
- [submit](client_providers_item.IItemContextType.md#submit)
- [unpoke](client_providers_item.IItemContextType.md#unpoke)

## Properties

### blocked

• **blocked**: `boolean`

#### Defined in

[client/providers/item.tsx:477](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L477)

___

### blockedButDataAccessible

• **blockedButDataAccessible**: `boolean`

#### Defined in

[client/providers/item.tsx:481](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L481)

___

### deleteError

• **deleteError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[client/providers/item.tsx:497](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L497)

___

### deleted

• **deleted**: `boolean`

#### Defined in

[client/providers/item.tsx:502](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L502)

___

### deleting

• **deleting**: `boolean`

#### Defined in

[client/providers/item.tsx:499](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L499)

___

### forId

• **forId**: `string`

#### Defined in

[client/providers/item.tsx:469](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L469)

___

### forVersion

• **forVersion**: `string`

#### Defined in

[client/providers/item.tsx:471](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L471)

___

### idef

• **idef**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Defined in

[client/providers/item.tsx:463](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L463)

___

### injectedParentContext

• **injectedParentContext**: [`IItemContextType`](client_providers_item.IItemContextType.md)

#### Defined in

[client/providers/item.tsx:587](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L587)

___

### loadError

• **loadError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[client/providers/item.tsx:483](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L483)

___

### loaded

• **loaded**: `boolean`

#### Defined in

[client/providers/item.tsx:487](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L487)

___

### loading

• **loading**: `boolean`

#### Defined in

[client/providers/item.tsx:485](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L485)

___

### notFound

• **notFound**: `boolean`

#### Defined in

[client/providers/item.tsx:474](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L474)

___

### pokedElements

• **pokedElements**: [`IPokeElementsType`](client_providers_item.IPokeElementsType.md)

#### Defined in

[client/providers/item.tsx:537](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L537)

___

### remoteListener

• **remoteListener**: [`RemoteListener`](../classes/client_internal_app_remote_listener.RemoteListener.md)

#### Defined in

[client/providers/item.tsx:584](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L584)

___

### searchCount

• **searchCount**: `number`

#### Defined in

[client/providers/item.tsx:513](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L513)

___

### searchError

• **searchError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[client/providers/item.tsx:504](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L504)

___

### searchFields

• **searchFields**: `any`

#### Defined in

[client/providers/item.tsx:527](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L527)

___

### searchId

• **searchId**: `string`

#### Defined in

[client/providers/item.tsx:516](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L516)

___

### searchLastModified

• **searchLastModified**: `string`

#### Defined in

[client/providers/item.tsx:520](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L520)

___

### searchLimit

• **searchLimit**: `number`

#### Defined in

[client/providers/item.tsx:511](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L511)

___

### searchOffset

• **searchOffset**: `number`

#### Defined in

[client/providers/item.tsx:512](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L512)

___

### searchOwner

• **searchOwner**: `string`

#### Defined in

[client/providers/item.tsx:519](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L519)

___

### searchRecords

• **searchRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[client/providers/item.tsx:509](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L509)

___

### searchRequestedIncludes

• **searchRequestedIncludes**: `Object`

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:529](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L529)

___

### searchRequestedProperties

• **searchRequestedProperties**: `string`[]

#### Defined in

[client/providers/item.tsx:528](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L528)

___

### searchResults

• **searchResults**: [`IGQLValue`](gql_querier.IGQLValue.md)[]

#### Defined in

[client/providers/item.tsx:510](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L510)

___

### searchShouldCache

• **searchShouldCache**: `boolean`

#### Defined in

[client/providers/item.tsx:524](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L524)

___

### searchWasRestored

• **searchWasRestored**: `boolean`

#### Defined in

[client/providers/item.tsx:517](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L517)

___

### searching

• **searching**: `boolean`

#### Defined in

[client/providers/item.tsx:506](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L506)

___

### state

• **state**: [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md)

#### Defined in

[client/providers/item.tsx:466](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L466)

___

### submitError

• **submitError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[client/providers/item.tsx:489](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L489)

___

### submitted

• **submitted**: `boolean`

#### Defined in

[client/providers/item.tsx:495](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L495)

___

### submitting

• **submitting**: `boolean`

#### Defined in

[client/providers/item.tsx:491](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L491)

## Methods

### clean

▸ **clean**(`options`, `state`, `avoidTriggeringUpdate?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

#### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[clean](client_providers_item.IBasicFns.md#clean)

#### Defined in

[client/providers/item.tsx:450](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L450)

___

### delete

▸ **delete**(): `Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Returns

`Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[delete](client_providers_item.IBasicFns.md#delete)

#### Defined in

[client/providers/item.tsx:448](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L448)

___

### dismissDeleteError

▸ **dismissDeleteError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:576](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L576)

___

### dismissDeleted

▸ **dismissDeleted**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:577](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L577)

___

### dismissLoadError

▸ **dismissLoadError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:573](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L573)

___

### dismissSearchError

▸ **dismissSearchError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:578](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L578)

___

### dismissSearchResults

▸ **dismissSearchResults**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:579](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L579)

___

### dismissSubmitError

▸ **dismissSubmitError**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:574](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L574)

___

### dismissSubmitted

▸ **dismissSubmitted**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:575](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L575)

___

### downloadState

▸ **downloadState**(`specificProperties?`, `specificIncludes?`): `Promise`<`Blob`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[client/providers/item.tsx:580](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L580)

___

### injectSubmitBlockPromise

▸ **injectSubmitBlockPromise**(`arg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Promise`<`any`\> |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:592](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L592)

___

### loadStateFromFile

▸ **loadStateFromFile**(`f`, `specificProperties?`, `specificIncludes?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `File` \| `Blob` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:581](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L581)

___

### onIncludeSetExclusionState

▸ **onIncludeSetExclusionState**(`include`, `state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `state` | [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:553](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L553)

___

### onPropertyChange

▸ **onPropertyChange**(`property`, `value`, `internalValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `internalValue` | `any` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:542](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L542)

___

### onPropertyClearEnforce

▸ **onPropertyClearEnforce**(`property`, `givenForId`, `givenForVersion`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:566](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L566)

___

### onPropertyEnforce

▸ **onPropertyEnforce**(`property`, `value`, `givenForId`, `givenForVersion`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:560](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L560)

___

### onPropertyRestore

▸ **onPropertyRestore**(`property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:548](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L548)

___

### poke

▸ **poke**(`elements`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | [`IPokeElementsType`](client_providers_item.IPokeElementsType.md) |

#### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[poke](client_providers_item.IBasicFns.md#poke)

#### Defined in

[client/providers/item.tsx:438](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L438)

___

### reload

▸ **reload**(`denyCache?`): `Promise`<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `denyCache?` | `boolean` |

#### Returns

`Promise`<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[reload](client_providers_item.IBasicFns.md#reload)

#### Defined in

[client/providers/item.tsx:443](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L443)

___

### search

▸ **search**(`options`): `Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[search](client_providers_item.IBasicFns.md#search)

#### Defined in

[client/providers/item.tsx:455](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L455)

___

### submit

▸ **submit**(`options`): `Promise`<[`IActionResponseWithId`](client_providers_item.IActionResponseWithId.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithId`](client_providers_item.IActionResponseWithId.md)\>

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[submit](client_providers_item.IBasicFns.md#submit)

#### Defined in

[client/providers/item.tsx:446](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L446)

___

### unpoke

▸ **unpoke**(): `void`

#### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[unpoke](client_providers_item.IBasicFns.md#unpoke)

#### Defined in

[client/providers/item.tsx:439](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L439)
