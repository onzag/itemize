[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types/files](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md) / IPropertyDefinitionSupportedSingleFilesType

# Interface: IPropertyDefinitionSupportedSingleFilesType

[base/Root/Module/ItemDefinition/PropertyDefinition/types/files](../modules/base_root_module_itemdefinition_propertydefinition_types_files.md).IPropertyDefinitionSupportedSingleFilesType

## Hierarchy

* [*IGQLFile*](gql_querier.igqlfile.md)

  ↳ **IPropertyDefinitionSupportedSingleFilesType**

## Table of contents

### Properties

- [id](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md#id)
- [metadata](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md#metadata)
- [name](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md#name)
- [size](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md#size)
- [src](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md#src)
- [type](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md#type)
- [url](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md#url)

## Properties

### id

• **id**: *string*

an unique id

Inherited from: [IGQLFile](gql_querier.igqlfile.md).[id](gql_querier.igqlfile.md#id)

Defined in: [gql-querier.ts:80](https://github.com/onzag/itemize/blob/5fcde7cf/gql-querier.ts#L80)

___

### metadata

• **metadata**: *string*

optional metadata, might be null, usually constains width and
height, set by the client, is limited to 128 characters

encoding is WxH;name,name,name as many names as there are special
dimensions, large, small and medium do not count

Inherited from: [IGQLFile](gql_querier.igqlfile.md).[metadata](gql_querier.igqlfile.md#metadata)

Defined in: [gql-querier.ts:96](https://github.com/onzag/itemize/blob/5fcde7cf/gql-querier.ts#L96)

___

### name

• **name**: *string*

the name of the file

Inherited from: [IGQLFile](gql_querier.igqlfile.md).[name](gql_querier.igqlfile.md#name)

Defined in: [gql-querier.ts:72](https://github.com/onzag/itemize/blob/5fcde7cf/gql-querier.ts#L72)

___

### size

• **size**: *number*

The size of the file in bytes

Inherited from: [IGQLFile](gql_querier.igqlfile.md).[size](gql_querier.igqlfile.md#size)

Defined in: [gql-querier.ts:88](https://github.com/onzag/itemize/blob/5fcde7cf/gql-querier.ts#L88)

___

### src

• `Optional` **src**: *Promise*<any\> \| File \| Blob

A source, either a File, Blob or a read stream

Inherited from: [IGQLFile](gql_querier.igqlfile.md).[src](gql_querier.igqlfile.md#src)

Defined in: [gql-querier.ts:100](https://github.com/onzag/itemize/blob/5fcde7cf/gql-querier.ts#L100)

___

### type

• **type**: *string*

The mime type

Inherited from: [IGQLFile](gql_querier.igqlfile.md).[type](gql_querier.igqlfile.md#type)

Defined in: [gql-querier.ts:76](https://github.com/onzag/itemize/blob/5fcde7cf/gql-querier.ts#L76)

___

### url

• **url**: *string*

the url where it is stored

Inherited from: [IGQLFile](gql_querier.igqlfile.md).[url](gql_querier.igqlfile.md#url)

Defined in: [gql-querier.ts:84](https://github.com/onzag/itemize/blob/5fcde7cf/gql-querier.ts#L84)
