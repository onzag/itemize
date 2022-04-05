[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/CurrencyFactorsProvider](../modules/server_services_base_CurrencyFactorsProvider.md) / ICurrencyFactors

# Interface: ICurrencyFactors

[server/services/base/CurrencyFactorsProvider](../modules/server_services_base_CurrencyFactorsProvider.md).ICurrencyFactors

This is the expected currency factors shape
the factor represents a value to multiply to a given currency base, the currency base
can be arbitrary, it could be euros, dollars or even bitcoin; it doesn't matter, the client will
never see their currency base, this is known as the normalized value

The currency factors should include every currency in the currencies array, all the codes
should be included in there

For example let's say your currency is euros, so the factors could be like
{
  "USD": 1.2,
  "EUR": 1,
  ...
}

Because 1 euro is equivalent to 1.2 USD and 1 eur is equivalent to one of itself

## Indexable

▪ [key: `string`]: `number`
