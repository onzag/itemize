[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces

Contains the search interfaces that a property can use
these are basically 4, also contains all the utilities and prefixes
that are related to these interfaces

## Table of contents

### Enumerations

- [PropertyDefinitionSearchInterfacesType](../enums/base_root_module_itemdefinition_propertydefinition_search_interfaces.propertydefinitionsearchinterfacestype.md)

### Variables

- [PropertyDefinitionSearchInterfacesPrefixes](base_root_module_itemdefinition_propertydefinition_search_interfaces.md#propertydefinitionsearchinterfacesprefixes)
- [PropertyDefinitionSearchInterfacesPrefixesList](base_root_module_itemdefinition_propertydefinition_search_interfaces.md#propertydefinitionsearchinterfacesprefixeslist)

## Variables

### PropertyDefinitionSearchInterfacesPrefixes

• `Const` **PropertyDefinitionSearchInterfacesPrefixes**: *object*

The prefixes for every location search interface

#### Type declaration:

Name | Type |
:------ | :------ |
`EXACT` | *string* |
`FROM` | *string* |
`LOCATION` | *string* |
`RADIUS` | *string* |
`SEARCH` | *string* |
`TO` | *string* |

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:37](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L37)

___

### PropertyDefinitionSearchInterfacesPrefixesList

• `Const` **PropertyDefinitionSearchInterfacesPrefixesList**: *string*[][]

this correlates to our search interface enum, enums are numbers basically
so when we want to get which interfaces each uses, we refer to this
array of arrays

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts:69](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces.ts#L69)
