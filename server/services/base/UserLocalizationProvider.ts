import { IServiceProviderClassType, ServiceProvider } from "..";
import { RegistryService } from "../registry";

export interface IUserLocalizationType {
  country: string;
  currency: string;
  language: string;
}

export interface IUserLocalizationProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, registry: RegistryService): UserLocalizationProvider<T>
}

export default class UserLocalizationProvider<T> extends ServiceProvider<T> {
  constructor(config: T, registry: RegistryService) {
    super(config, registry);
  }

  /**
   * Should provide the localization for the user
   * @param ip the ip address
   * @override
   */
  public async getLocalizationFor(ip: string, fallback: IUserLocalizationType): Promise<IUserLocalizationType> {
    return null;
  }
}
