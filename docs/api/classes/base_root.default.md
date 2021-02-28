[](../README.md) / [Exports](../modules.md) / [base/Root](../modules/base_root.md) / default

# Class: default

[base/Root](../modules/base_root.md).default

This is the root entry leaf

## Table of contents

### Constructors

- [constructor](base_root.default.md#constructor)

### Properties

- [childModules](base_root.default.md#childmodules)
- [rawData](base_root.default.md#rawdata)
- [registry](base_root.default.md#registry)
- [requestManager](base_root.default.md#requestmanager)
- [rootState](base_root.default.md#rootstate)
- [serverFlags](base_root.default.md#serverflags)

### Methods

- [callRequestManager](base_root.default.md#callrequestmanager)
- [cleanState](base_root.default.md#cleanstate)
- [getAllModules](base_root.default.md#getallmodules)
- [getI18nData](base_root.default.md#geti18ndata)
- [getI18nDataFor](base_root.default.md#geti18ndatafor)
- [getModuleFor](base_root.default.md#getmodulefor)
- [getServerFlags](base_root.default.md#getserverflags)
- [getStateKey](base_root.default.md#getstatekey)
- [listModuleNames](base_root.default.md#listmodulenames)
- [mergeWithI18n](base_root.default.md#mergewithi18n)
- [setRequestManager](base_root.default.md#setrequestmanager)
- [setServerFlags](base_root.default.md#setserverflags)
- [setStateKey](base_root.default.md#setstatekey)
- [getModuleRawFor](base_root.default.md#getmodulerawfor)

## Constructors

### constructor

\+ **new default**(`rawJSON`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md)): [*default*](base_root.default.md)

Builds a root from raw data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawJSON` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the raw json data    |

**Returns:** [*default*](base_root.default.md)

Defined in: [base/Root/index.ts:178](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L178)

## Properties

### childModules

• `Private` **childModules**: [*default*](base_root_module.default.md)[]

The child modules

Defined in: [base/Root/index.ts:158](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L158)

___

### rawData

• **rawData**: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md)

The raw data this root was generated from

Defined in: [base/Root/index.ts:147](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L147)

___

### registry

• **registry**: *object*

A registry for fast access of Modules and Item definitions
uses the qualified name of those

#### Type declaration:

Defined in: [base/Root/index.ts:152](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L152)

___

### requestManager

• `Private` **requestManager**: RequestManagerFn= null

This is used for SSR and lives in the root
allows the root to request for data

Defined in: [base/Root/index.ts:171](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L171)

___

### rootState

• `Private` **rootState**: IRootState

A root state, normally used in
the server side to store information
in the root about execution

Defined in: [base/Root/index.ts:165](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L165)

___

### serverFlags

• `Private` **serverFlags**: *string*[]= null

Used by the server side to set server flags to flag
other parts of the schema how to operate, mainly
conditional rule set about what it should evaluate

Defined in: [base/Root/index.ts:178](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L178)

## Methods

### callRequestManager

▸ **callRequestManager**(`itemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemDefinition` | [*default*](base_root_module_itemdefinition.default.md) |
`id` | *string* |
`version` | *string* |

**Returns:** *Promise*<void\>

Defined in: [base/Root/index.ts:218](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L218)

___

### cleanState

▸ **cleanState**(): *void*

Cleans the state of the root as well as all its children

**Returns:** *void*

Defined in: [base/Root/index.ts:199](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L199)

___

### getAllModules

▸ **getAllModules**(): [*default*](base_root_module.default.md)[]

Provides all the modules it contains
should follow

**Returns:** [*default*](base_root_module.default.md)[]

an array of Module

Defined in: [base/Root/index.ts:243](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L243)

___

### getI18nData

▸ **getI18nData**(): [*Ii18NType*](../interfaces/base_root.ii18ntype.md)

Provides the whole i18n data object

**Returns:** [*Ii18NType*](../interfaces/base_root.ii18ntype.md)

the whole i18n data object

Defined in: [base/Root/index.ts:294](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L294)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`: *string*): *any*

Provides the module locale data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the locale in iso form   |

**Returns:** *any*

an object or null (if locale not valid)

Defined in: [base/Root/index.ts:303](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L303)

___

### getModuleFor

▸ **getModuleFor**(`name`: *string*[]): [*default*](base_root_module.default.md)

Gets a specific module given its name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string*[] | the path of the module   |

**Returns:** [*default*](base_root_module.default.md)

an specific module

Defined in: [base/Root/index.ts:252](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L252)

___

### getServerFlags

▸ **getServerFlags**(): *string*[]

**Returns:** *string*[]

Defined in: [base/Root/index.ts:315](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L315)

___

### getStateKey

▸ **getStateKey**(`key`: *string*): *any*

Returns a given set state key

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |

**Returns:** *any*

Defined in: [base/Root/index.ts:226](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L226)

___

### listModuleNames

▸ **listModuleNames**(): *string*[]

list all module names it contains

**Returns:** *string*[]

an array of string with the module names

Defined in: [base/Root/index.ts:234](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L234)

___

### mergeWithI18n

▸ **mergeWithI18n**(`root`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md)): *void*

Merges the i18n data with another root

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the other root    |

**Returns:** *void*

Defined in: [base/Root/index.ts:277](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L277)

___

### setRequestManager

▸ **setRequestManager**(`manager`: RequestManagerFn): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`manager` | RequestManagerFn |

**Returns:** *void*

Defined in: [base/Root/index.ts:214](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L214)

___

### setServerFlags

▸ **setServerFlags**(`flags`: *string*[]): *void*

Sets the server flags

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`flags` | *string*[] | the flags to set    |

**Returns:** *void*

Defined in: [base/Root/index.ts:311](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L311)

___

### setStateKey

▸ **setStateKey**(`key`: *string*, `value`: *any*): *void*

Stores a key in the root state

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | the key to store   |
`value` | *any* | the value to store    |

**Returns:** *void*

Defined in: [base/Root/index.ts:210](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L210)

___

### getModuleRawFor

▸ `Static`**getModuleRawFor**(`root`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md), `name`: *string*[]): [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)

Provides a raw module for the given raw json root

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the raw json root   |
`name` | *string*[] | the path of the module   |

**Returns:** [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)

a raw module or null

Defined in: [base/Root/index.ts:108](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L108)
