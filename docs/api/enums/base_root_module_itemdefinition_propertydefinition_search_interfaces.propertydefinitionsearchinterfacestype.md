[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces](../modules/base_root_module_itemdefinition_propertydefinition_search_interfaces.md) / PropertyDefinitionSearchInterfacesType

# Enumeration: PropertyDefinitionSearchInterfacesType

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces](../modules/base_root_module_itemdefinition_propertydefinition_search_interfaces.md).PropertyDefinitionSearchInterfacesType

These are all the 4 interfaces

## Table of contents

### Enumeration members

- [EXACT](base_root_module_itemdefinition_propertydefinition_search_interfaces.propertydefinitionsearchinterfacestype.md#exact)
- [EXACT\_AND\_RANGE](base_root_module_itemdefinition_propertydefinition_search_interfaces.propertydefinitionsearchinterfacestype.md#exact_and_range)
- [LOCATION\_RADIUS](base_root_module_itemdefinition_propertydefinition_search_interfaces.propertydefinitionsearchinterfacestype.md#location_radius)
- [TEXT](base_root_module_itemdefinition_propertydefinition_search_interfaces.propertydefinitionsearchinterfacestype.md#text)

## Enumeration members

### EXACT

• **EXACT**: = 0

uses an instance of the same property type input

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:18](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L18)

___

### EXACT\_AND\_RANGE

• **EXACT\_AND\_RANGE**: = 1

uses an instance of the same property type input, or two for a range
provides either an exact value or a range

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:23](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L23)

___

### LOCATION\_RADIUS

• **LOCATION\_RADIUS**: = 3

uses location and radius for searching

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:31](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L31)

___

### TEXT

• **TEXT**: = 2

full text search, uses a simple raw string as search

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:27](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L27)
