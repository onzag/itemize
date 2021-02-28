[@onzag/itemize](../README.md) / [Exports](../modules.md) / IRootRawJSONDataType

# Interface: IRootRawJSONDataType

This is the raw processed form of the root

## Table of contents

### Properties

- [children](irootrawjsondatatype.md#children)
- [i18nData](irootrawjsondatatype.md#i18ndata)
- [location](irootrawjsondatatype.md#location)
- [pointers](irootrawjsondatatype.md#pointers)
- [raw](irootrawjsondatatype.md#raw)
- [type](irootrawjsondatatype.md#type)

## Properties

### children

• **children**: IModuleRawJSONDataType[]

All the modules contained within the root it is added after
the build

Defined in: [index.ts:91](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L91)

___

### i18nData

• **i18nData**: [*Ii18NType*](ii18ntype.md)

The i18n information that comes from the properties file

Defined in: [index.ts:85](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L85)

___

### location

• `Optional` **location**: *string*

Exists during the building process and represents the file location
it is stripped after processing

Defined in: [index.ts:70](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L70)

___

### pointers

• `Optional` **pointers**: *any*

Also exists during the building process only and it's the pointers
that are used for tracebacks

Defined in: [index.ts:75](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L75)

___

### raw

• `Optional` **raw**: *string*

The raw content of the file itself, as a plain string, it's stripped
after processing

Defined in: [index.ts:80](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L80)

___

### type

• **type**: *root*

The type is always root

Defined in: [index.ts:64](https://github.com/onzag/itemize/blob/1a335e4e/base/Root/index.ts#L64)
