[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root](../modules/base_Root.md) / IRootRawJSONDataType

# Interface: IRootRawJSONDataType

[base/Root](../modules/base_Root.md).IRootRawJSONDataType

This is the raw processed form of the root

## Table of contents

### Properties

- [children](base_Root.IRootRawJSONDataType.md#children)
- [i18nData](base_Root.IRootRawJSONDataType.md#i18ndata)
- [location](base_Root.IRootRawJSONDataType.md#location)
- [pointers](base_Root.IRootRawJSONDataType.md#pointers)
- [raw](base_Root.IRootRawJSONDataType.md#raw)
- [type](base_Root.IRootRawJSONDataType.md#type)

## Properties

### children

• **children**: [`IModuleRawJSONDataType`](base_Root_Module.IModuleRawJSONDataType.md)[]

All the modules contained within the root it is added after
the build

#### Defined in

[base/Root/index.ts:116](https://github.com/onzag/itemize/blob/a24376ed/base/Root/index.ts#L116)

___

### i18nData

• **i18nData**: [`Ii18NType`](base_Root.Ii18NType.md)

The i18n information that comes from the properties file

#### Defined in

[base/Root/index.ts:110](https://github.com/onzag/itemize/blob/a24376ed/base/Root/index.ts#L110)

___

### location

• `Optional` **location**: `string`

Exists during the building process and represents the file location
it is stripped after processing

#### Defined in

[base/Root/index.ts:95](https://github.com/onzag/itemize/blob/a24376ed/base/Root/index.ts#L95)

___

### pointers

• `Optional` **pointers**: `any`

Also exists during the building process only and it's the pointers
that are used for tracebacks

#### Defined in

[base/Root/index.ts:100](https://github.com/onzag/itemize/blob/a24376ed/base/Root/index.ts#L100)

___

### raw

• `Optional` **raw**: `string`

The raw content of the file itself, as a plain string, it's stripped
after processing

#### Defined in

[base/Root/index.ts:105](https://github.com/onzag/itemize/blob/a24376ed/base/Root/index.ts#L105)

___

### type

• **type**: ``"root"``

The type is always root

#### Defined in

[base/Root/index.ts:89](https://github.com/onzag/itemize/blob/a24376ed/base/Root/index.ts#L89)
