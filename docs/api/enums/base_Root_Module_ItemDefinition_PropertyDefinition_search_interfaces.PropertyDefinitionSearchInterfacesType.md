[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.md) / PropertyDefinitionSearchInterfacesType

# Enumeration: PropertyDefinitionSearchInterfacesType

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.md).PropertyDefinitionSearchInterfacesType

These are all the 4 interfaces

## Table of contents

### Enumeration members

- [EXACT](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md#exact)
- [EXACT\_AND\_RANGE](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md#exact_and_range)
- [LOCATION\_RADIUS](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md#location_radius)
- [PAYMENT](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md#payment)
- [STRING](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md#string)
- [TAGS](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md#tags)
- [TEXT](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md#text)

## Enumeration members

### EXACT

• **EXACT** = `0`

uses an instance of the same property type input

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:18](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L18)

___

### EXACT\_AND\_RANGE

• **EXACT\_AND\_RANGE** = `1`

uses an instance of the same property type input, or two for a range
provides either an exact value or a range

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:23](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L23)

___

### LOCATION\_RADIUS

• **LOCATION\_RADIUS** = `4`

uses location and radius for searching

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:36](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L36)

___

### PAYMENT

• **PAYMENT** = `5`

payment search interface

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:40](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L40)

___

### STRING

• **STRING** = `3`

string basic text search, uses a simple raw string as search but also enables
for multiple matches as a taglist using IN

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:32](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L32)

___

### TAGS

• **TAGS** = `6`

tags search interface

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:44](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L44)

___

### TEXT

• **TEXT** = `2`

full text search, uses a simple raw string as search

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:27](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L27)
