import { ServiceProvider, ServiceProviderType } from "..";

export interface IUserLocalizationType {
  country: string;
  currency: string;
  language: string;
}

export default class UserLocalizationProvider<T> extends ServiceProvider<T> {
  public static getType() {
    return ServiceProviderType.LOCAL;
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
