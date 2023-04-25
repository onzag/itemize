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

• **PropertyDefinitionSearchInterfacesPrefixes**: `Object`

The prefixes for every location search interface

#### Type declaration

| Name | Type |
| :------ | :------ |
| `EXACT` | `string` |
| `FROM` | `string` |
| `IN` | `string` |
| `LOCATION` | `string` |
| `PAYMENT_STATUS` | `string` |
| `PAYMENT_TYPE` | `string` |
| `RADIUS` | `string` |
| `SEARCH` | `string` |
| `TO` | `string` |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:50](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L50)

___

### PropertyDefinitionSearchInterfacesPrefixesList

• **PropertyDefinitionSearchInterfacesPrefixesList**: `string`[][]

this correlates to our search interface enum, enums are numbers basically
so when we want to get which interfaces each uses, we refer to this
array of arrays

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:101](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L101)
