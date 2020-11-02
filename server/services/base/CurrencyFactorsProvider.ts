/**
 * This file contains the base currency factors provider that
 * is used in the global service for fetching the factors
 * any service that is intended to be a currency factors provider
 * should follow this interface type
 * 
 * @packageDocumentation
 */

import type { RedisClient } from "redis";
import { IServiceProviderClassType, ServiceProvider } from "..";

/**
 * This is the expected currency factors shape
 * the factor represents a value to multiply to a given currency base, the currency base
 * can be arbitrary, it could be euros, dollars or even bitcoin; it doesn't matter, the client will
 * never see their currency base, this is known as the normalized value
 * 
 * The currency factors should include every currency in the currencies array, all the codes
 * should be included in there
 * 
 * For example let's say your currency is euros, so the factors could be like
 * {
 *   "USD": 1.2,
 *   "EUR": 1,
 *   ...
 * }
 * 
 * Because 1 euro is equivalent to 1.2 USD and 1 eur is equivalent to one of itself
 */
export interface ICurrencyFactors {
  [key: string]: number,
}

/**
 * This  interfaces represents a currency factors class
 */
export interface ICurrencyFactorsProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, globalCache: RedisClient): CurrencyFactorsProvider<T>
}

/**
 * The currency factors provider base class is an interface class that should
 * be extended in order ot provide the proper currency factors
 */
export default class CurrencyFactorsProvider<T> extends ServiceProvider<T> {
  public globalCache: RedisClient;

  /**
   * When built the currency factors provider will receive
   * automaticallyt the config that exists in the sensitive config
   * information
   * 
   * Do not override this function as the factors is instantiated
   * automatically and it expects this form
   * 
   * @param config 
   * @param globalCache 
   */
  constructor(config: T, globalCache: RedisClient) {
    super(config);
    this.globalCache = globalCache;
  }

  /**
   * Should provide the currency factors
   * 
   * Override this function with your own functionality to provide
   * the factors
   * 
   * @override
   */
  public async getFactors(): Promise<ICurrencyFactors> {
    return null;
  }
}