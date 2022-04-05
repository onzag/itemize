[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root](../modules/base_Root.md) / default

# Class: default

[base/Root](../modules/base_Root.md).default

This is the root entry that represents an instance for the root
of the itemize schema structure

## Table of contents

### Constructors

- [constructor](base_Root.default.md#constructor)

### Properties

- [childModules](base_Root.default.md#childmodules)
- [rawData](base_Root.default.md#rawdata)
- [registry](base_Root.default.md#registry)
- [requestManager](base_Root.default.md#requestmanager)
- [requestManagerResource](base_Root.default.md#requestmanagerresource)
- [requestManagerSearch](base_Root.default.md#requestmanagersearch)
- [rootState](base_Root.default.md#rootstate)
- [serverFlags](base_Root.default.md#serverflags)

### Methods

- [callRequestManager](base_Root.default.md#callrequestmanager)
- [callRequestManagerResource](base_Root.default.md#callrequestmanagerresource)
- [callRequestManagerSearch](base_Root.default.md#callrequestmanagersearch)
- [cleanState](base_Root.default.md#cleanstate)
- [getAllModules](base_Root.default.md#getallmodules)
- [getI18nData](base_Root.default.md#geti18ndata)
- [getI18nDataFor](base_Root.default.md#geti18ndatafor)
- [getModuleFor](base_Root.default.md#getmodulefor)
- [getServerFlags](base_Root.default.md#getserverflags)
- [getStateKey](base_Root.default.md#getstatekey)
- [listModuleNames](base_Root.default.md#listmodulenames)
- [mergeWithI18n](base_Root.default.md#mergewithi18n)
- [setRequestManager](base_Root.default.md#setrequestmanager)
- [setRequestManagerResource](base_Root.default.md#setrequestmanagerresource)
- [setRequestManagerSearch](base_Root.default.md#setrequestmanagersearch)
- [setServerFlags](base_Root.default.md#setserverflags)
- [setStateKey](base_Root.default.md#setstatekey)
- [getModuleRawFor](base_Root.default.md#getmodulerawfor)

## Constructors

### constructor

• **new default**(`rawJSON`)

Builds a root from raw data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawJSON` | [`IRootRawJSONDataType`](../interfaces/base_Root.IRootRawJSONDataType.md) | the raw json data |

#### Defined in

[base/Root/index.ts:247](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L247)

## Properties

### childModules

• `Private` **childModules**: [`default`](base_Root_Module.default.md)[]

The child modules

**`internal`**

#### Defined in

[base/Root/index.ts:202](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L202)

___

### rawData

• **rawData**: [`IRootRawJSONDataType`](../interfaces/base_Root.IRootRawJSONDataType.md)

The raw data this root was generated from

**`internal`**

#### Defined in

[base/Root/index.ts:171](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L171)

___

### registry

• **registry**: `Object` = `{}`

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

#### Index signature

▪ [qualifiedNameOrPath: `string`]: [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md)

#### Defined in

[base/Root/index.ts:194](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L194)

___

### requestManager

• `Private` **requestManager**: `RequestManagerFn` = `null`

This is used for SSR and lives in the root
allows the root to request for data, this is what is used
by the beforeSSRRender functionality

**`internal`**

#### Defined in

[base/Root/index.ts:217](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L217)

___

### requestManagerResource

• `Private` **requestManagerResource**: `RequestManagerResourceFn` = `null`

This is used for SSR and lives in the root
allows the root to request for resources, this is what is used
by the beforeSSRRender functionality

**`internal`**

#### Defined in

[base/Root/index.ts:233](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L233)

___

### requestManagerSearch

• `Private` **requestManagerSearch**: `RequestManagerSearchFn` = `null`

This is used for SSR and lives in the root
allows the root to request for data, this is what is used
by the beforeSSRRender functionality

**`internal`**

#### Defined in

[base/Root/index.ts:225](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L225)

___

### rootState

• `Private` **rootState**: `IRootState` = `{}`

A root state, normally used in
the server side to store information
in the root about execution

#### Defined in

[base/Root/index.ts:209](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L209)

___

### serverFlags

• `Private` **serverFlags**: `string`[] = `null`

Used by the server side to set server flags to flag
other parts of the schema how to operate, mainly
conditional rule set about what it should evaluate

**`internal`**

#### Defined in

[base/Root/index.ts:241](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L241)

## Methods

### callRequestManager

▸ **callRequestManager**(`itemDefinition`, `id`, `version`): `Promise`<`void`\>

Calls the request manager to request it for a given value
to be stored and be applied the state inside our
root

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition we need a value for |
| `id` | `string` | the id |
| `version` | `string` | the version |

#### Returns

`Promise`<`void`\>

#### Defined in

[base/Root/index.ts:348](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L348)

___

### callRequestManagerResource

▸ **callRequestManagerResource**(`finalPath`, `customResolver?`): `Promise`<`string`\>

Calls the request manager to request for a given resource

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `finalPath` | `string` |
| `customResolver?` | (`appData`: [`IAppDataType`](../interfaces/server.IAppDataType.md)) => `Promise`<`string`\> |

#### Returns

`Promise`<`string`\>

#### Defined in

[base/Root/index.ts:358](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L358)

___

### callRequestManagerSearch

▸ **callRequestManagerSearch**(`itemDefinition`, `id`, `version`, `args`): `Promise`<`void`\>

Calls the request manager to request it for a given value
to be stored and be applied the state inside our
root

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition we need a value for |
| `id` | `string` | - |
| `version` | `string` | - |
| `args` | `any` | the search arguments |

#### Returns

`Promise`<`void`\>

#### Defined in

[base/Root/index.ts:335](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L335)

___

### cleanState

▸ **cleanState**(): `void`

Cleans the state of the root as well as all its children
this is used internally during SSR rendering in order to restore
the root to a clean pristine state

**`internal`**

#### Returns

`void`

#### Defined in

[base/Root/index.ts:265](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L265)

___

### getAllModules

▸ **getAllModules**(): [`default`](base_Root_Module.default.md)[]

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

#### Returns

[`default`](base_Root_Module.default.md)[]

an array of Module

#### Defined in

[base/Root/index.ts:393](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L393)

___

### getI18nData

▸ **getI18nData**(): [`Ii18NType`](../interfaces/base_Root.Ii18NType.md)

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

#### Returns

[`Ii18NType`](../interfaces/base_Root.Ii18NType.md)

the whole i18n data object

#### Defined in

[base/Root/index.ts:492](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L492)

___

### getI18nDataFor

▸ **getI18nDataFor**(`locale`): `any`

Provides the root locale data for a given specific
locale, this is similar to [getI18nData](base_Root.default.md#geti18ndata) in usability and
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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the locale in iso form |

#### Returns

`any`

an object or null (if locale does not exist)

#### Defined in

[base/Root/index.ts:517](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L517)

___

### getModuleFor

▸ **getModuleFor**(`name`): [`default`](base_Root_Module.default.md)

Gets a specific module given its name path, the name path
is basically the same as its module/submodule etc... form
this function will only return modules and will go as deep
in the tree as necessary in order to retrieve modules in it

If you need modules you should use the [registry](base_Root.default.md#registry) instead
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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string`[] | the path of the module |

#### Returns

[`default`](base_Root_Module.default.md)

an specific module

#### Defined in

[base/Root/index.ts:424](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L424)

___

### getServerFlags

▸ **getServerFlags**(): `string`[]

Retrieves the server flags, these flags such as CREATE,
CREATE_ONLY, EDIT, EDIT_ONLY, SEARCH and SEARCH_ONLY
are used during conditions on the server side in order
to evaluate situations specifically on the server side
during a specific action

#### Returns

`string`[]

an array of string that represents the server flags

#### Defined in

[base/Root/index.ts:544](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L544)

___

### getStateKey

▸ **getStateKey**(`key`): `any`

Returns a given set state key that was previously set with the
setStateKey function

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key to provide |

#### Returns

`any`

the previously stored value or null

#### Defined in

[base/Root/index.ts:291](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L291)

___

### listModuleNames

▸ **listModuleNames**(): `string`[]

list all module names it contains

```typescript
const allModules = appData.root.listModuleNames();
const firstModule = appData.root.getModuleFor([allModules[0]]);
```

This is not a very useful method itself but it's there

#### Returns

`string`[]

an array of string with the module names

#### Defined in

[base/Root/index.ts:374](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L374)

___

### mergeWithI18n

▸ **mergeWithI18n**(`root`): `void`

Merges the i18n data with another root, basically when we change
the language of our root in real time during our app execution and
our root does not contain the language data for the given language
but we want to ensure that the state is kept and not replace our root
or destroy the other root, so we just merge the i18n data that we
are trying to fetch as that's the only important bit

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`IRootRawJSONDataType`](../interfaces/base_Root.IRootRawJSONDataType.md) | the other root in raw form |

#### Returns

`void`

#### Defined in

[base/Root/index.ts:456](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L456)

___

### setRequestManager

▸ **setRequestManager**(`manager`): `void`

Sets the request manager that is used to resolve requests
during the SSR renders to resolve values for the item
definitions in id and version

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manager` | `RequestManagerFn` | the manager in question |

#### Returns

`void`

#### Defined in

[base/Root/index.ts:313](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L313)

___

### setRequestManagerResource

▸ **setRequestManagerResource**(`manager`): `void`

Sets the request manager that is used to resolve resources
during the SSR renders

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manager` | `RequestManagerResourceFn` | the manager in question |

#### Returns

`void`

#### Defined in

[base/Root/index.ts:323](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L323)

___

### setRequestManagerSearch

▸ **setRequestManagerSearch**(`manager`): `void`

Sets the request manager that is used to resolve search requests
during the SSR renders to resolve values for the item
definitions in id and version

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manager` | `RequestManagerSearchFn` | the manager in question |

#### Returns

`void`

#### Defined in

[base/Root/index.ts:302](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L302)

___

### setServerFlags

▸ **setServerFlags**(`flags`): `void`

Sets the server flags, these flags such as CREATE,
CREATE_ONLY, EDIT, EDIT_ONLY, SEARCH and SEARCH_ONLY
are used during conditions on the server side in order
to evaluate situations specifically on the server side
during a specific action

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flags` | `string`[] | the flags to set |

#### Returns

`void`

#### Defined in

[base/Root/index.ts:531](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L531)

___

### setStateKey

▸ **setStateKey**(`key`, `value`): `void`

Stores a key in the root state this is used internally by SSR
in order to store the values for the components to be rendered
during the SSR functionality, keys such as title, ogTitle etc...

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key to store |
| `value` | `any` | the value to store |

#### Returns

`void`

#### Defined in

[base/Root/index.ts:280](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L280)

___

### getModuleRawFor

▸ `Static` **getModuleRawFor**(`root`, `name`): [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md)

Provides a raw module for the given raw json root, this function
is used during the build process when the root is not quite parsed
so it uses raw processing and it's a static function

**`internal`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`IRootRawJSONDataType`](../interfaces/base_Root.IRootRawJSONDataType.md) | the raw json root |
| `name` | `string`[] | the path of the module |

#### Returns

[`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md)

a raw module or null

#### Defined in

[base/Root/index.ts:131](https://github.com/onzag/itemize/blob/f2f29986/base/Root/index.ts#L131)
