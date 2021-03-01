[](../README.md) / [Exports](../modules.md) / [base/Root](../modules/base_root.md) / default

# Class: default

[base/Root](../modules/base_root.md).default

This is the root entry that represents an instance for the root
of the itemize schema structure

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

Defined in: [base/Root/index.ts:216](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L216)

## Properties

### childModules

• `Private` **childModules**: [*default*](base_root_module.default.md)[]

The child modules

**`internal`** 

Defined in: [base/Root/index.ts:193](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L193)

___

### rawData

• **rawData**: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md)

The raw data this root was generated from

**`internal`** 

Defined in: [base/Root/index.ts:162](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L162)

___

### registry

• **registry**: *object*

A registry for fast access of Modules and Item definitions
uses the qualified name of those

A common use for the registry is in order to provide quick access for the
item definitions or modules, using the qualified name or a path

```typescript
const myElement = appData.root.registry["elements/element"] as ItemDefinition;
const myElementModule = appData.root.registry["elements"] as Module;
```

Using the qualified name (or type) also allows to access the same values

```typescript
const myElement = appData.root.registry["MOD_elements__IDEF_element"] as ItemDefinition;
const myElementModule = appData.root.registry["MOD_elements"] as Module;
```

The registry is a quick utility that can be used to access these values

#### Type declaration:

Defined in: [base/Root/index.ts:185](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L185)

___

### requestManager

• `Private` **requestManager**: RequestManagerFn= null

This is used for SSR and lives in the root
allows the root to request for data, this is what is used
by the beforeSSRRender functionality

**`internal`** 

Defined in: [base/Root/index.ts:208](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L208)

___

### rootState

• `Private` **rootState**: IRootState

A root state, normally used in
the server side to store information
in the root about execution

Defined in: [base/Root/index.ts:200](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L200)

___

### serverFlags

• `Private` **serverFlags**: *string*[]= null

Used by the server side to set server flags to flag
other parts of the schema how to operate, mainly
conditional rule set about what it should evaluate

**`internal`** 

Defined in: [base/Root/index.ts:216](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L216)

## Methods

### callRequestManager

▸ **callRequestManager**(`itemDefinition`: [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*): *Promise*<void\>

Calls the request manager to request it for a given value
to be stored and be applied the state inside our
root

**`internal`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](base_root_module_itemdefinition.default.md) | the item definition we need a value for   |
`id` | *string* | the id   |
`version` | *string* | the version   |

**Returns:** *Promise*<void\>

Defined in: [base/Root/index.ts:290](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L290)

___

### cleanState

▸ **cleanState**(): *void*

Cleans the state of the root as well as all its children
this is used internally during SSR rendering in order to restore
the root to a clean pristine state

**`internal`** 

**Returns:** *void*

Defined in: [base/Root/index.ts:240](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L240)

___

### getAllModules

▸ **getAllModules**(): [*default*](base_root_module.default.md)[]

Provides all the modules that this root directly contains
similar to listModuleNames but it provides live modules
this is a preferrable method

```typescript
const allModules = appData.root.getAllModules();
allModules.forEach((m) => {
  // here you have modules
  console.log(m.getName());
});
```

**Returns:** [*default*](base_root_module.default.md)[]

an array of Module

Defined in: [base/Root/index.ts:325](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L325)

___

### getI18nData

▸ **getI18nData**(): [*Ii18NType*](../interfaces/base_root.ii18ntype.md)

Provides the whole i18n data object this method is used internally
by many retrievers of language data in the client side but can be used
in the server side to access the locale information to do arbitrary functionality
an example can be for instance to render a template where our template information
is in the root

```typescript
const i18nData = appData.root.getI18nData();
const i18nDataForTheUserLanguage = i18nData[userLanguage];
const templateData = await appData.cache.requestValue("cms/fragment", "FANCY_EMAIL", userLanguage);
const renderedResult = renderTemplate(templateData.content, {
  user_name: userName,
  ok_text: i18nDataForTheUserLanguage.ok,
  cancel_text: i18nDataForTheUserLanguage.cancel,
});
```

These ok and cancel args we are passing come from the `.properties` object, both the
main and the root, these usuall reside at `schema/main-i18n.properties` and `root.properties`

**Returns:** [*Ii18NType*](../interfaces/base_root.ii18ntype.md)

the whole i18n data object

Defined in: [base/Root/index.ts:424](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L424)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`: *string*): *any*

Provides the root locale data for a given specific
locale, this is similar to [getI18nData](base_root.default.md#geti18ndata) in usability and
what it does

```typescript
const i18nDataForTheUserLanguage = appData.root.getI18nDataFor(userLanguage);
const templateData = await appData.cache.requestValue("cms/fragment", "FANCY_EMAIL", userLanguage);
const renderedResult = renderTemplate(templateData.content, {
  user_name: userName,
  ok_text: i18nDataForTheUserLanguage.ok,
  cancel_text: i18nDataForTheUserLanguage.cancel,
});
```

These ok and cancel args we are passing come from the `.properties` object, both the
main and the root, these usuall reside at `schema/main-i18n.properties` and `root.properties`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | the locale in iso form   |

**Returns:** *any*

an object or null (if locale does not exist)

Defined in: [base/Root/index.ts:449](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L449)

___

### getModuleFor

▸ **getModuleFor**(`name`: *string*[]): [*default*](base_root_module.default.md)

Gets a specific module given its name path, the name path
is basically the same as its module/submodule etc... form
this function will only return modules and will go as deep
in the tree as necessary in order to retrieve modules in it

If you need modules you should use the [registry](base_root.default.md#registry) instead
this method is mainly used internally because it is more strict

For example lets say we have a schema that contains a module named
cars with a submodule named trucks, which contains several items of specific
trucks.

```typescript
const carsModule = appData.root.getModuleFor(["cars"]);
const trucksSubmodule = appData.root.getModuleFor(["cars", "trucks"]);

const carModuleFromRegistry = appData.registry("cars") as Module;
const trucksSubmoduleFromRegistry = appData.registry("cars/trucks") as Module;
```

It is not possible to access item definitions from this function, only modules unlike
the registry

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string*[] | the path of the module   |

**Returns:** [*default*](base_root_module.default.md)

an specific module

Defined in: [base/Root/index.ts:356](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L356)

___

### getServerFlags

▸ **getServerFlags**(): *string*[]

Retrieves the server flags, these flags such as CREATE,
CREATE_ONLY, EDIT, EDIT_ONLY, SEARCH and SEARCH_ONLY
are used during conditions on the server side in order
to evaluate situations specifically on the server side
during a specific action

**Returns:** *string*[]

an array of string that represents the server flags

Defined in: [base/Root/index.ts:476](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L476)

___

### getStateKey

▸ **getStateKey**(`key`: *string*): *any*

Returns a given set state key that was previously set with the
setStateKey function

**`internal`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | the key to provide   |

**Returns:** *any*

the previously stored value or null

Defined in: [base/Root/index.ts:266](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L266)

___

### listModuleNames

▸ **listModuleNames**(): *string*[]

list all module names it contains

```typescript
const allModules = appData.root.listModuleNames();
const firstModule = appData.root.getModuleFor([allModules[0]]);
```

This is not a very useful method itself but it's there

**Returns:** *string*[]

an array of string with the module names

Defined in: [base/Root/index.ts:306](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L306)

___

### mergeWithI18n

▸ **mergeWithI18n**(`root`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md)): *void*

Merges the i18n data with another root, basically when we change
the language of our root in real time during our app execution and
our root does not contain the language data for the given language
but we want to ensure that the state is kept and not replace our root
or destroy the other root, so we just merge the i18n data that we
are trying to fetch as that's the only important bit

**`internal`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the other root in raw form   |

**Returns:** *void*

Defined in: [base/Root/index.ts:388](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L388)

___

### setRequestManager

▸ **setRequestManager**(`manager`: RequestManagerFn): *void*

Sets the request manager that is used to resolve requests
during the SSR renders to resolve values for the item
definitions in id and version

**`internal`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`manager` | RequestManagerFn | the manager in question   |

**Returns:** *void*

Defined in: [base/Root/index.ts:277](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L277)

___

### setServerFlags

▸ **setServerFlags**(`flags`: *string*[]): *void*

Sets the server flags, these flags such as CREATE,
CREATE_ONLY, EDIT, EDIT_ONLY, SEARCH and SEARCH_ONLY
are used during conditions on the server side in order
to evaluate situations specifically on the server side
during a specific action

**`internal`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`flags` | *string*[] | the flags to set   |

**Returns:** *void*

Defined in: [base/Root/index.ts:463](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L463)

___

### setStateKey

▸ **setStateKey**(`key`: *string*, `value`: *any*): *void*

Stores a key in the root state this is used internally by SSR
in order to store the values for the components to be rendered
during the SSR functionality, keys such as title, ogTitle etc...

**`internal`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | the key to store   |
`value` | *any* | the value to store   |

**Returns:** *void*

Defined in: [base/Root/index.ts:255](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L255)

___

### getModuleRawFor

▸ `Static`**getModuleRawFor**(`root`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md), `name`: *string*[]): [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)

Provides a raw module for the given raw json root, this function
is used during the build process when the root is not quite parsed
so it uses raw processing and it's a static function

**`internal`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the raw json root   |
`name` | *string*[] | the path of the module   |

**Returns:** [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)

a raw module or null

Defined in: [base/Root/index.ts:122](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/index.ts#L122)
