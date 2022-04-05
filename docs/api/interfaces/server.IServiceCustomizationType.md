[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / IServiceCustomizationType

# Interface: IServiceCustomizationType

[server](../modules/server.md).IServiceCustomizationType

## Table of contents

### Properties

- [currencyFactorsProvider](server.IServiceCustomizationType.md#currencyfactorsprovider)
- [customServices](server.IServiceCustomizationType.md#customservices)
- [locationSearchProvider](server.IServiceCustomizationType.md#locationsearchprovider)
- [mailServiceProvider](server.IServiceCustomizationType.md#mailserviceprovider)
- [paymentProvider](server.IServiceCustomizationType.md#paymentprovider)
- [phoneServiceProvider](server.IServiceCustomizationType.md#phoneserviceprovider)
- [storageServiceProviders](server.IServiceCustomizationType.md#storageserviceproviders)
- [userLocalizationProvider](server.IServiceCustomizationType.md#userlocalizationprovider)

## Properties

### currencyFactorsProvider

• `Optional` **currencyFactorsProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:177](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L177)

___

### customServices

• `Optional` **customServices**: `Object`

#### Index signature

▪ [name: `string`]: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:180](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L180)

___

### locationSearchProvider

• `Optional` **locationSearchProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:178](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L178)

___

### mailServiceProvider

• `Optional` **mailServiceProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:174](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L174)

___

### paymentProvider

• `Optional` **paymentProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:179](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L179)

___

### phoneServiceProvider

• `Optional` **phoneServiceProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:175](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L175)

___

### storageServiceProviders

• `Optional` **storageServiceProviders**: [`IStorageProviders`](server.IStorageProviders.md)

#### Defined in

[server/index.ts:173](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L173)

___

### userLocalizationProvider

• `Optional` **userLocalizationProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:176](https://github.com/onzag/itemize/blob/f2f29986/server/index.ts#L176)
