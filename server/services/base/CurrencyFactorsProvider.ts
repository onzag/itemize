import type { RedisClient } from "redis";
import { IServiceProviderClassType, ServiceProvider } from "..";

export interface ICurrencyFactors {
  [key: string]: number,
}

export interface ICurrencyFactorsProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, globalCache: RedisClient): CurrencyFactorsProvider<T>
}

export default class CurrencyFactorsProvider<T> extends ServiceProvider<T> {
  public globalCache: RedisClient;

  constructor(config: T, globalCache: RedisClient) {
    super(config);
    this.globalCache = globalCache;
  }

  /**
   * Should provide the currency factors
   * @override
   */
  public async getFactors(): Promise<ICurrencyFactors> {
    return null;
  }
}