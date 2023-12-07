[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](../modules/server.md) / IServiceCustomizationType

# Interface: IServiceCustomizationType

[server](../modules/server.md).IServiceCustomizationType

## Table of contents

### Properties

- [currencyFactorsProvider](server.IServiceCustomizationType.md#currencyfactorsprovider)
- [customServices](server.IServiceCustomizationType.md#customservices)
- [locationSearchProvider](server.IServiceCustomizationType.md#locationsearchprovider)
- [loggingServiceProvider](server.IServiceCustomizationType.md#loggingserviceprovider)
- [mailServiceProvider](server.IServiceCustomizationType.md#mailserviceprovider)
- [paymentProvider](server.IServiceCustomizationType.md#paymentprovider)
- [phoneServiceProvider](server.IServiceCustomizationType.md#phoneserviceprovider)
- [storageServiceProviders](server.IServiceCustomizationType.md#storageserviceproviders)
- [userLocalizationProvider](server.IServiceCustomizationType.md#userlocalizationprovider)
- [ussdServiceProvider](server.IServiceCustomizationType.md#ussdserviceprovider)

## Properties

### currencyFactorsProvider

• `Optional` **currencyFactorsProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:234](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L234)

___

### customServices

• `Optional` **customServices**: `Object`

#### Index signature

▪ [name: `string`]: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:238](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L238)

___

### locationSearchProvider

• `Optional` **locationSearchProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:235](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L235)

___

### loggingServiceProvider

• `Optional` **loggingServiceProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:237](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L237)

___

### mailServiceProvider

• `Optional` **mailServiceProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:230](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L230)

___

### paymentProvider

• `Optional` **paymentProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:236](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L236)

___

### phoneServiceProvider

• `Optional` **phoneServiceProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:231](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L231)

___

### storageServiceProviders

• `Optional` **storageServiceProviders**: [`IStorageProviders`](server.IStorageProviders.md)

#### Defined in

[server/index.ts:229](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L229)

___

### userLocalizationProvider

• `Optional` **userLocalizationProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:233](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L233)

___

### ussdServiceProvider

• `Optional` **ussdServiceProvider**: [`IServiceProviderClassType`](server_services.IServiceProviderClassType.md)<`any`\>

#### Defined in

[server/index.ts:232](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L232)
