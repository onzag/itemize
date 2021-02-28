[@onzag/itemize](../README.md) / [Exports](../modules.md) / default

# Class: default

This is the root entry leaf

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [childModules](default.md#childmodules)
- [rawData](default.md#rawdata)
- [registry](default.md#registry)
- [requestManager](default.md#requestmanager)
- [rootState](default.md#rootstate)
- [serverFlags](default.md#serverflags)

### Methods

- [callRequestManager](default.md#callrequestmanager)
- [cleanState](default.md#cleanstate)
- [getAllModules](default.md#getallmodules)
- [getI18nData](default.md#geti18ndata)
- [getI18nDataFor](default.md#geti18ndatafor)
- [getModuleFor](default.md#getmodulefor)
- [getServerFlags](default.md#getserverflags)
- [getStateKey](default.md#getstatekey)
- [listModuleNames](default.md#listmodulenames)
- [mergeWithI18n](default.md#mergewithi18n)
- [setRequestManager](default.md#setrequestmanager)
- [setServerFlags](default.md#setserverflags)
- [setStateKey](default.md#setstatekey)
- [getModuleRawFor](default.md#getmodulerawfor)

## Constructors

### constructor

\+ **new default**(`rawJSON`: [*IRootRawJSONDataType*](../interfaces/irootrawjsondatatype.md)): [*default*](default.md)

Builds a root from raw data

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawJSON` | [*IRootRawJSONDataType*](../interfaces/irootrawjsondatatype.md) | the raw json data    |

**Returns:** [*default*](default.md)

Defined in: [index.ts:178](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L178)

## Properties

### childModules

• `Private` **childModules**: *default*[]

The child modules

Defined in: [index.ts:158](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L158)

___

### rawData

• **rawData**: [*IRootRawJSONDataType*](../interfaces/irootrawjsondatatype.md)

The raw data this root was generated from

Defined in: [index.ts:147](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L147)

___

### registry

• **registry**: *object*

A registry for fast access of Modules and Item definitions
uses the qualified name of those

#### Type declaration:

Defined in: [index.ts:152](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L152)

___

### requestManager

• `Private` **requestManager**: RequestManagerFn= null

This is used for SSR and lives in the root
allows the root to request for data

Defined in: [index.ts:171](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L171)

___

### rootState

• `Private` **rootState**: IRootState

A root state, normally used in
the server side to store information
in the root about execution

Defined in: [index.ts:165](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L165)

___

### serverFlags

• `Private` **serverFlags**: *string*[]= null

Used by the server side to set server flags to flag
other parts of the schema how to operate, mainly
conditional rule set about what it should evaluate

Defined in: [index.ts:178](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L178)

## Methods

### callRequestManager

▸ **callRequestManager**(`itemDefinition`: *default*, `id`: *string*, `version`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemDefinition` | *default* |
`id` | *string* |
`version` | *string* |

**Returns:** *Promise*<void\>

Defined in: [index.ts:218](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L218)

___

### cleanState

▸ **cleanState**(): *void*

Cleans the state of the root as well as all its children

**Returns:** *void*

Defined in: [index.ts:199](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L199)

___

### getAllModules

▸ **getAllModules**(): *default*[]

Provides all the modules it contains
should follow

**Returns:** *default*[]

an array of Module

Defined in: [index.ts:243](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L243)

___

### getI18nData

▸ **getI18nData**(): [*Ii18NType*](../interfaces/ii18ntype.md)

Provides the whole i18n data object

**Returns:** [*Ii18NType*](../interfaces/ii18ntype.md)

the whole i18n data object

Defined in: [index.ts:294](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L294)

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

Defined in: [index.ts:303](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L303)

___

### getModuleFor

▸ **getModuleFor**(`name`: *string*[]): *default*

Gets a specific module given its name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string*[] | the path of the module   |

**Returns:** *default*

an specific module

Defined in: [index.ts:252](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L252)

___

### getServerFlags

▸ **getServerFlags**(): *string*[]

**Returns:** *string*[]

Defined in: [index.ts:315](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L315)

___

### getStateKey

▸ **getStateKey**(`key`: *string*): *any*

Returns a given set state key

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |

**Returns:** *any*

Defined in: [index.ts:226](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L226)

___

### listModuleNames

▸ **listModuleNames**(): *string*[]

list all module names it contains

**Returns:** *string*[]

an array of string with the module names

Defined in: [index.ts:234](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L234)

___

### mergeWithI18n

▸ **mergeWithI18n**(`root`: [*IRootRawJSONDataType*](../interfaces/irootrawjsondatatype.md)): *void*

Merges the i18n data with another root

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*IRootRawJSONDataType*](../interfaces/irootrawjsondatatype.md) | the other root    |

**Returns:** *void*

Defined in: [index.ts:277](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L277)

___

### setRequestManager

▸ **setRequestManager**(`manager`: RequestManagerFn): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`manager` | RequestManagerFn |

**Returns:** *void*

Defined in: [index.ts:214](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L214)

___

### setServerFlags

▸ **setServerFlags**(`flags`: *string*[]): *void*

Sets the server flags

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`flags` | *string*[] | the flags to set    |

**Returns:** *void*

Defined in: [index.ts:311](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L311)

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

Defined in: [index.ts:210](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L210)

___

### getModuleRawFor

▸ `Static`**getModuleRawFor**(`root`: [*IRootRawJSONDataType*](../interfaces/irootrawjsondatatype.md), `name`: *string*[]): IModuleRawJSONDataType

Provides a raw module for the given raw json root

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*IRootRawJSONDataType*](../interfaces/irootrawjsondatatype.md) | the raw json root   |
`name` | *string*[] | the path of the module   |

**Returns:** IModuleRawJSONDataType

a raw module or null

Defined in: [index.ts:108](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L108)
