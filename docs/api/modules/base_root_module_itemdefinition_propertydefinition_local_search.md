[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/local-search

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/local-search

This file contains helper local functions that are used against
graphql values in order to perform local searches as if it was
running in the server side, these tend to run in the IndexedDB
database

## Table of contents

### Functions

- [dateLocalSearchExactAndRange](base_root_module_itemdefinition_propertydefinition_local_search.md#datelocalsearchexactandrange)
- [standardLocalSearchExactAndRange](base_root_module_itemdefinition_propertydefinition_local_search.md#standardlocalsearchexactandrange)

## Functions

### dateLocalSearchExactAndRange

▸ **dateLocalSearchExactAndRange**(`format`: *string*, `arg`: [*ILocalSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ilocalsearchinfo.md)): *boolean*

Runs the same as the standard sql search exact and range but using the date
functionality

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`format` | *string* | the format either DATE_FORMAT TIME_FORMAT or DATETIME_FORMAT   |
`arg` | [*ILocalSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ilocalsearchinfo.md) | the local search arg info   |

**Returns:** *boolean*

a boolean on whether it matches

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/local-search.ts:73](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/ItemDefinition/PropertyDefinition/local-search.ts#L73)

___

### standardLocalSearchExactAndRange

▸ **standardLocalSearchExactAndRange**(`arg`: [*ILocalSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ilocalsearchinfo.md)): *boolean*

Performs a local search of an exact and ranged search for
a property value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ILocalSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.ilocalsearchinfo.md) | the local search arg info   |

**Returns:** *boolean*

a boolean on whether it matches

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/local-search.ts:21](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/ItemDefinition/PropertyDefinition/local-search.ts#L21)
