[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces

Contains the search interfaces that a property can use
these are basically 4, also contains all the utilities and prefixes
that are related to these interfaces

## Table of contents

### Enumerations

- [PropertyDefinitionSearchInterfacesType](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md)

### Variables

- [PropertyDefinitionSearchInterfacesPrefixes](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.md#propertydefinitionsearchinterfacesprefixes)
- [PropertyDefinitionSearchInterfacesPrefixesList](base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.md#propertydefinitionsearchinterfacesprefixeslist)

## Variables

### PropertyDefinitionSearchInterfacesPrefixes

• `Const` **PropertyDefinitionSearchInterfacesPrefixes**: `Object`

The prefixes for every location search interface

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `EXACT` | `string` | Used to prefix the exact searches when using the exact or exact and range protocol |
| `FROM` | `string` | Used to prefix for the from value when using exact and range protocol |
| `IN` | `string` | Used to prefix FTS queries |
| `LOCATION` | `string` | Used to prefix the location when using location radius |
| `PAYMENT_STATUS` | `string` | Used for payment status request |
| `PAYMENT_TYPE` | `string` | Used for payment status request |
| `RADIUS` | `string` | Used to prefix the radius when using location radius |
| `SEARCH` | `string` | Used to prefix FTS queries |
| `TO` | `string` | Used to prefix the value to for the to search |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:50](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L50)

___

### PropertyDefinitionSearchInterfacesPrefixesList

• `Const` **PropertyDefinitionSearchInterfacesPrefixesList**: `string`[][]

this correlates to our search interface enum, enums are numbers basically
so when we want to get which interfaces each uses, we refer to this
array of arrays

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:101](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L101)
