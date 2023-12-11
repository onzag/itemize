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
- [clean](client_providers_item.IItemContextType.md#clean)
- [delete](client_providers_item.IItemContextType.md#delete)
- [deleteError](client_providers_item.IItemContextType.md#deleteerror)
- [deleted](client_providers_item.IItemContextType.md#deleted)
- [deleting](client_providers_item.IItemContextType.md#deleting)
- [dismissDeleteError](client_providers_item.IItemContextType.md#dismissdeleteerror)
- [dismissDeleted](client_providers_item.IItemContextType.md#dismissdeleted)
- [dismissLoadError](client_providers_item.IItemContextType.md#dismissloaderror)
- [dismissSearchError](client_providers_item.IItemContextType.md#dismisssearcherror)
- [dismissSearchResults](client_providers_item.IItemContextType.md#dismisssearchresults)
- [dismissSubmitError](client_providers_item.IItemContextType.md#dismisssubmiterror)
- [dismissSubmitted](client_providers_item.IItemContextType.md#dismisssubmitted)
- [downloadState](client_providers_item.IItemContextType.md#downloadstate)
- [downloadStateAt](client_providers_item.IItemContextType.md#downloadstateat)
- [forId](client_providers_item.IItemContextType.md#forid)
- [forVersion](client_providers_item.IItemContextType.md#forversion)
- [highlights](client_providers_item.IItemContextType.md#highlights)
- [holdsRemoteState](client_providers_item.IItemContextType.md#holdsremotestate)
- [idef](client_providers_item.IItemContextType.md#idef)
- [injectSubmitBlockPromise](client_providers_item.IItemContextType.md#injectsubmitblockpromise)
- [injectedParentContext](client_providers_item.IItemContextType.md#injectedparentcontext)
- [loadError](client_providers_item.IItemContextType.md#loaderror)
- [loadStateFromFile](client_providers_item.IItemContextType.md#loadstatefromfile)
- [loadStateFromFileAt](client_providers_item.IItemContextType.md#loadstatefromfileat)
- [loaded](client_providers_item.IItemContextType.md#loaded)
- [loading](client_providers_item.IItemContextType.md#loading)
- [notFound](client_providers_item.IItemContextType.md#notfound)
- [onIncludeSetExclusionState](client_providers_item.IItemContextType.md#onincludesetexclusionstate)
- [onPropertyChange](client_providers_item.IItemContextType.md#onpropertychange)
- [onPropertyClearEnforce](client_providers_item.IItemContextType.md#onpropertyclearenforce)
- [onPropertyEnforce](client_providers_item.IItemContextType.md#onpropertyenforce)
- [onPropertyRestore](client_providers_item.IItemContextType.md#onpropertyrestore)
- [poke](client_providers_item.IItemContextType.md#poke)
- [pokedElements](client_providers_item.IItemContextType.md#pokedelements)
- [reload](client_providers_item.IItemContextType.md#reload)
- [remoteListener](client_providers_item.IItemContextType.md#remotelistener)
- [search](client_providers_item.IItemContextType.md#search)
- [searchCount](client_providers_item.IItemContextType.md#searchcount)
- [searchEngineEnabled](client_providers_item.IItemContextType.md#searchengineenabled)
- [searchEngineEnabledLang](client_providers_item.IItemContextType.md#searchengineenabledlang)
- [searchEngineHighlightArgs](client_providers_item.IItemContextType.md#searchenginehighlightargs)
- [searchError](client_providers_item.IItemContextType.md#searcherror)
- [searchFields](client_providers_item.IItemContextType.md#searchfields)
- [searchHighlights](client_providers_item.IItemContextType.md#searchhighlights)
- [searchId](client_providers_item.IItemContextType.md#searchid)
- [searchLastModified](client_providers_item.IItemContextType.md#searchlastmodified)
- [searchLimit](client_providers_item.IItemContextType.md#searchlimit)
- [searchMetadata](client_providers_item.IItemContextType.md#searchmetadata)
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
- [submit](client_providers_item.IItemContextType.md#submit)
- [submitError](client_providers_item.IItemContextType.md#submiterror)
- [submitted](client_providers_item.IItemContextType.md#submitted)
- [submitting](client_providers_item.IItemContextType.md#submitting)
- [unpoke](client_providers_item.IItemContextType.md#unpoke)

## Properties

### blocked

• **blocked**: `boolean`

with ids the item might be blocked as well so this
flag is raised

#### Defined in

[client/providers/item.tsx:1154](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1154)

___

### blockedButDataAccessible

• **blockedButDataAccessible**: `boolean`

if you are a moderator, or have a role that permits it
data might still be available, this comes together with
blocked

#### Defined in

[client/providers/item.tsx:1160](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1160)

___

### clean

• **clean**: (`options`: [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md), `state`: ``"success"`` \| ``"fail"``, `avoidTriggeringUpdate?`: `boolean`) => `void`

#### Type declaration

▸ (`options`, `state`, `avoidTriggeringUpdate?`): `void`

cleans performs the cleanup of properties and policies

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

##### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[clean](client_providers_item.IBasicFns.md#clean)

#### Defined in

[client/providers/item.tsx:1111](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1111)

___

### delete

• **delete**: () => `Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Type declaration

▸ (): `Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

Simply deletes

##### Returns

`Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

a response with the status

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[delete](client_providers_item.IBasicFns.md#delete)

#### Defined in

[client/providers/item.tsx:1103](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1103)

___

### deleteError

• **deleteError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

an error that came during deleting

#### Defined in

[client/providers/item.tsx:1195](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1195)

___

### deleted

• **deleted**: `boolean`

same as submitted, a success flag that says whether the element
was deleted

#### Defined in

[client/providers/item.tsx:1204](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1204)

___

### deleting

• **deleting**: `boolean`

whether it is currently deleting

#### Defined in

[client/providers/item.tsx:1199](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1199)

___

### dismissDeleteError

• **dismissDeleteError**: () => `void`

#### Type declaration

▸ (): `void`

dismisses the delete error

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1389](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1389)

___

### dismissDeleted

• **dismissDeleted**: () => `void`

#### Type declaration

▸ (): `void`

dismisses the deleted state

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1394](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1394)

___

### dismissLoadError

• **dismissLoadError**: () => `void`

#### Type declaration

▸ (): `void`

dismisses the load error

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1374](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1374)

___

### dismissSearchError

• **dismissSearchError**: () => `void`

#### Type declaration

▸ (): `void`

dismisses the search error

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1399](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1399)

___

### dismissSearchResults

• **dismissSearchResults**: () => `void`

#### Type declaration

▸ (): `void`

dismisses the search results

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1404](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1404)

___

### dismissSubmitError

• **dismissSubmitError**: () => `void`

#### Type declaration

▸ (): `void`

dismisses the submit error

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1379](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1379)

___

### dismissSubmitted

• **dismissSubmitted**: () => `void`

#### Type declaration

▸ (): `void`

dismisses the submitted state

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1384](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1384)

___

### downloadState

• **downloadState**: (`specificProperties?`: `string`[], `specificIncludes?`: \{ `[id: string]`: `string`[];  }) => `Promise`\<`Blob`\>

#### Type declaration

▸ (`specificProperties?`, `specificIncludes?`): `Promise`\<`Blob`\>

downloads the state as a blob (file) of the current item

##### Parameters

| Name | Type |
| :------ | :------ |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

##### Returns

`Promise`\<`Blob`\>

#### Defined in

[client/providers/item.tsx:1411](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1411)

___

### downloadStateAt

• **downloadStateAt**: (`id`: `string`, `version?`: `string`, `specificProperties?`: `string`[], `specificIncludes?`: \{ `[id: string]`: `string`[];  }) => `Promise`\<`Blob`\>

#### Type declaration

▸ (`id`, `version?`, `specificProperties?`, `specificIncludes?`): `Promise`\<`Blob`\>

Downloads the state as a blob (file) of the current item but at a given id, version combo

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version?` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

##### Returns

`Promise`\<`Blob`\>

#### Defined in

[client/providers/item.tsx:1420](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1420)

___

### forId

• **forId**: `string`

the id of which it was pulled from, this might be
null

#### Defined in

[client/providers/item.tsx:1140](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1140)

___

### forVersion

• **forVersion**: `string`

the version of which it was pulled from

#### Defined in

[client/providers/item.tsx:1144](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1144)

___

### highlights

• **highlights**: [`IElasticHighlightSingleRecordInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightSingleRecordInfo.md)

These are the specific highlights ot use within this value
and they will be passed to the renderer in order to show
the highlights

#### Defined in

[client/providers/item.tsx:1296](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1296)

___

### holdsRemoteState

• **holdsRemoteState**: `boolean`

whether it is currently holding a state that was loaded
of any kind

#### Defined in

[client/providers/item.tsx:1177](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1177)

___

### idef

• **idef**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

the item definition in question

#### Defined in

[client/providers/item.tsx:1130](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1130)

___

### injectSubmitBlockPromise

• **injectSubmitBlockPromise**: (`arg`: `Promise`\<`any`\>) => `void`

#### Type declaration

▸ (`arg`): `void`

Injects a promise so that the submit cannot resolve until this promise
is resolved

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Promise`\<`any`\> |

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1464](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1464)

___

### injectedParentContext

• **injectedParentContext**: [`IItemContextType`](client_providers_item.IItemContextType.md)

A parent context that has been injected

**`Deprecated`**

#### Defined in

[client/providers/item.tsx:1456](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1456)

___

### loadError

• **loadError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

an error that came during loading

#### Defined in

[client/providers/item.tsx:1164](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1164)

___

### loadStateFromFile

• **loadStateFromFile**: (`f`: `File` \| `Blob`, `specificProperties?`: `string`[], `specificIncludes?`: \{ `[id: string]`: `string`[];  }) => `Promise`\<`void`\>

#### Type declaration

▸ (`f`, `specificProperties?`, `specificIncludes?`): `Promise`\<`void`\>

Loads the state from a given file

##### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `File` \| `Blob` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:1428](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1428)

___

### loadStateFromFileAt

• **loadStateFromFileAt**: (`f`: `File` \| `Blob`, `id`: `string`, `version?`: `string`, `specificProperties?`: `string`[], `specificIncludes?`: \{ `[id: string]`: `string`[];  }) => `Promise`\<`void`\>

#### Type declaration

▸ (`f`, `id`, `version?`, `specificProperties?`, `specificIncludes?`): `Promise`\<`void`\>

Loads the state for a given file in the current item location at a given slot id and version

##### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `File` \| `Blob` |
| `id` | `string` |
| `version?` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[client/providers/item.tsx:1438](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1438)

___

### loaded

• **loaded**: `boolean`

whether it loaded, sucesfully

#### Defined in

[client/providers/item.tsx:1172](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1172)

___

### loading

• **loading**: `boolean`

whether it is currently loading

#### Defined in

[client/providers/item.tsx:1168](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1168)

___

### notFound

• **notFound**: `boolean`

with ids a not found flag might be set if the item
is not found 404

#### Defined in

[client/providers/item.tsx:1149](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1149)

___

### onIncludeSetExclusionState

• **onIncludeSetExclusionState**: (`include`: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md), `state`: [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md)) => `void`

#### Type declaration

▸ (`include`, `state`): `void`

this is yet another passed function that does the same as properties
but with exclusion states

##### Parameters

| Name | Type |
| :------ | :------ |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `state` | [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md) |

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1337](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1337)

___

### onPropertyChange

• **onPropertyChange**: (`property`: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md), `value`: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype), `internalValue`: `any`) => `void`

#### Type declaration

▸ (`property`, `value`, `internalValue`): `void`

this is a listener that basically takes a property, and a new value
and internal value, whatever is down the line is not expected to do
changes directly, but rather call this function, this function will
then update everything under the hood

##### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `internalValue` | `any` |

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1317](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1317)

___

### onPropertyClearEnforce

• **onPropertyClearEnforce**: (`property`: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md), `givenForId`: `string`, `givenForVersion`: `string`) => `void`

#### Type declaration

▸ (`property`, `givenForId`, `givenForVersion`): `void`

Clear the enforce that was previously set

##### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1364](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1364)

___

### onPropertyEnforce

• **onPropertyEnforce**: (`property`: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md), `value`: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype), `givenForId`: `string`, `givenForVersion`: `string`) => `void`

#### Type declaration

▸ (`property`, `value`, `givenForId`, `givenForVersion`): `void`

now this would be used on enforcement, this is used for the setter
the reason it also needs to specify the id is because it might
go out of sync with the item definition

##### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1351](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1351)

___

### onPropertyRestore

• **onPropertyRestore**: (`property`: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md)) => `void`

#### Type declaration

▸ (`property`): `void`

When the property shall be restored this listener shall be called

##### Parameters

| Name | Type |
| :------ | :------ |
| `property` | `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md) |

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1327](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1327)

___

### poke

• **poke**: (`elements`: [`IPokeElementsType`](client_providers_item.IPokeElementsType.md)) => `void`

#### Type declaration

▸ (`elements`): `void`

Poke elements

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | [`IPokeElementsType`](client_providers_item.IPokeElementsType.md) |

##### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[poke](client_providers_item.IBasicFns.md#poke)

#### Defined in

[client/providers/item.tsx:1078](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1078)

___

### pokedElements

• **pokedElements**: [`IPokeElementsType`](client_providers_item.IPokeElementsType.md)

poked is a flag that is raised to mean to ignore
anything regarding user set statuses and just mark
things as they are, for example, by default many fields
are empty (null) and they are invalid, but in UX wise
it makes no sense to show as invalid immediately
poked makes it so that every field shows its true state
they are poked

#### Defined in

[client/providers/item.tsx:1306](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1306)

___

### reload

• **reload**: (`denyCache?`: `boolean`) => `Promise`\<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Type declaration

▸ (`denyCache?`): `Promise`\<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

makes it so that it reloads the value, the loadValue function
usually is executed on componentDidMount, pass deny cache in order to
do a hard refresh and bypass the cache

##### Parameters

| Name | Type |
| :------ | :------ |
| `denyCache?` | `boolean` |

##### Returns

`Promise`\<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[reload](client_providers_item.IBasicFns.md#reload)

#### Defined in

[client/providers/item.tsx:1091](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1091)

___

### remoteListener

• **remoteListener**: [`RemoteListener`](../classes/client_internal_app_remote_listener.RemoteListener.md)

Simply the remote listener that this item is using to listen
it's always the same accross all items

#### Defined in

[client/providers/item.tsx:1450](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1450)

___

### search

• **search**: (`options`: [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md)) => `Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Type declaration

▸ (`options`): `Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

performs a search, note that you should be in the searchMode however
since all items are the same it's totally possible to launch a search
in which case you'll just get a searchError you should be in search
mode because there are no endpoints otherwise

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md) |

##### Returns

`Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[search](client_providers_item.IBasicFns.md#search)

#### Defined in

[client/providers/item.tsx:1120](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1120)

___

### searchCount

• **searchCount**: `number`

The counted results from the search

#### Defined in

[client/providers/item.tsx:1233](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1233)

___

### searchEngineEnabled

• **searchEngineEnabled**: `boolean`

Whether the search engine was used or not

#### Defined in

[client/providers/item.tsx:1273](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1273)

___

### searchEngineEnabledLang

• **searchEngineEnabledLang**: `string`

The language that was used for the search using the search engine

#### Defined in

[client/providers/item.tsx:1277](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1277)

___

### searchEngineHighlightArgs

• **searchEngineHighlightArgs**: [`IItemSearchStateHighlightArgsType`](base_Root_Module_ItemDefinition.IItemSearchStateHighlightArgsType.md)

The highlight args that were received when using a search engine

#### Defined in

[client/providers/item.tsx:1281](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1281)

___

### searchError

• **searchError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

an error that occured during search

#### Defined in

[client/providers/item.tsx:1208](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1208)

___

### searchFields

• **searchFields**: `any`

the search fields that should be requested according
to the search function

#### Defined in

[client/providers/item.tsx:1261](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1261)

___

### searchHighlights

• **searchHighlights**: [`IElasticHighlightRecordInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightRecordInfo.md)

The highlights given by elasticsearch for the search that apply
to the entire search results

#### Defined in

[client/providers/item.tsx:1286](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1286)

___

### searchId

• **searchId**: `string`

every search gets an unique identifier

#### Defined in

[client/providers/item.tsx:1237](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1237)

___

### searchLastModified

• **searchLastModified**: `string`

Search last modified as it was retrieved from the server

#### Defined in

[client/providers/item.tsx:1250](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1250)

___

### searchLimit

• **searchLimit**: `number`

The limit used in the given search

#### Defined in

[client/providers/item.tsx:1225](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1225)

___

### searchMetadata

• **searchMetadata**: `string`

The search metadata received

#### Defined in

[client/providers/item.tsx:1290](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1290)

___

### searchOffset

• **searchOffset**: `number`

The offset used int he given search

#### Defined in

[client/providers/item.tsx:1229](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1229)

___

### searchOwner

• **searchOwner**: `string`

a search owner, or null, for the createdBy argument

#### Defined in

[client/providers/item.tsx:1246](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1246)

___

### searchRecords

• **searchRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the obtained search results from the rq endpoint
just as they come

#### Defined in

[client/providers/item.tsx:1217](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1217)

___

### searchRequestedIncludes

• **searchRequestedIncludes**: `Object`

The includes that were requested during the search

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:1269](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1269)

___

### searchRequestedProperties

• **searchRequestedProperties**: `string`[]

The properties that were requested during the search

#### Defined in

[client/providers/item.tsx:1265](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1265)

___

### searchResults

• **searchResults**: [`IRQValue`](rq_querier.IRQValue.md)[]

The search results (only available if a traditional search was performed)

#### Defined in

[client/providers/item.tsx:1221](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1221)

___

### searchShouldCache

• **searchShouldCache**: `boolean`

passed onto the search to tell it if results that are retrieved
and then updated should be cached into the cache using the
long term strategy, this is usually true when cachePolicy is something

#### Defined in

[client/providers/item.tsx:1256](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1256)

___

### searchWasRestored

• **searchWasRestored**: ``"NO"`` \| ``"FROM_LOCATION"`` \| ``"FROM_STATE"``

Whether the search was not truly performed but was instead restored
for example, from the location, or from the state of the app

#### Defined in

[client/providers/item.tsx:1242](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1242)

___

### searching

• **searching**: `boolean`

whether it is currently searching

#### Defined in

[client/providers/item.tsx:1212](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1212)

___

### state

• **state**: [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md)

the state of this item definition that has
been pulled and calculated from this item definition

#### Defined in

[client/providers/item.tsx:1135](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1135)

___

### submit

• **submit**: (`options`: [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md)) => `Promise`\<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

#### Type declaration

▸ (`options`): `Promise`\<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

submits the current information, when there's no id, this triggers an
add action, with an id however this trigger edition

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

##### Returns

`Promise`\<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

a response with the status

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[submit](client_providers_item.IBasicFns.md#submit)

#### Defined in

[client/providers/item.tsx:1098](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1098)

___

### submitError

• **submitError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

an error that came during submitting

#### Defined in

[client/providers/item.tsx:1181](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1181)

___

### submitted

• **submitted**: `boolean`

whether it has submitted sucesfully, this is a transitory
flag, and should be removed, basically it means the item
is in a success state of submitted

#### Defined in

[client/providers/item.tsx:1191](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1191)

___

### submitting

• **submitting**: `boolean`

whether it is currently submitting

#### Defined in

[client/providers/item.tsx:1185](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1185)

___

### unpoke

• **unpoke**: () => `void`

#### Type declaration

▸ (): `void`

unpokes all elements

##### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[unpoke](client_providers_item.IBasicFns.md#unpoke)

#### Defined in

[client/providers/item.tsx:1083](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1083)
