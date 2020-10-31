import type { RedisClient } from "redis";
import { IServiceProviderClassType, ServiceProvider } from "..";
import { RegistryService } from "../registry";

export interface ICurrencyFactors {
  [key: string]: number,
}

export interface ICurrencyFactorsProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, registry: RegistryService, globalCache: RedisClient): CurrencyFactorsProvider<T>
}

export default class CurrencyFactorsProvider<T> extends ServiceProvider<T> {
  public globalCache: RedisClient;

  constructor(config: T, registry: RegistryService, globalCache: RedisClient) {
    super(config, registry);
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