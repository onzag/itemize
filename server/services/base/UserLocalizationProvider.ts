import { IServiceProviderClassType, ServiceProvider } from "..";

export interface IUserLocalizationType {
  country: string;
  currency: string;
  language: string;
}

export interface IUserLocalizationProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T): UserLocalizationProvider<T>
}

export default class UserLocalizationProvider<T> extends ServiceProvider<T> {
  constructor(config: T) {
    super(config);
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
