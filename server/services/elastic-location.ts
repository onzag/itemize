import { countries } from "../../imported-resources";
import UserLocalizationProvider, { IUserLocalizationType } from "./base/UserLocalizationProvider";
import { ServiceProviderType } from ".";

export class ElasticLocationService extends UserLocalizationProvider<null> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }
  public async getLocalizationFor(
    ip: string,
    fallback: IUserLocalizationType,
  ): Promise<IUserLocalizationType> {
    try {
      const doc = await this.localAppData.elastic.guessGeoIpFor(ip);
      if (!doc || !doc.country_iso_code) {
        return fallback;
      }

      const country = countries[doc.country_iso_code];

      if (!country) {
        return fallback;
      }

      return {
        country: doc.country_iso_code,
        currency: country.currency || fallback.currency,
        language: country.languages[0] || fallback.language,
      }
    } catch (err) {
      return fallback;
    }
  }
}
