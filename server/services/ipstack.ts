import http from "http";
import https from "https";
import { countries } from "../../imported-resources";
import { logger } from "../";
import UserLocalizationProvider, { IUserLocalizationType } from "./base/UserLocalizationProvider";
import { ServiceProviderType } from ".";

interface IPStackResponse {
  ip: string;
  type: "ipv4" | "ipv6";
  continent_code: string;
  continent_name: string;
  country_code: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: {
    geoname_id: number;
    capital: string;
    languages: Array<{
      code: string;
      name: string;
      native: string;
    }>;
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: boolean;
  }
}

export interface IPStackConfig {
  apiKey: string;
  httpsEnabled: boolean;
}

export class IPStackService extends UserLocalizationProvider<IPStackConfig> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }
  private requestInfoFor(ip: string) {
    return new Promise<IPStackResponse>((resolve, reject) => {
      (this.config.httpsEnabled ? https : http).get(`http://api.ipstack.com/${ip}?access_key=${this.config.apiKey}`, (resp) => {
        // let's get the response from the stream
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("error", (err) => {
          logger.error(
            "IPStackService.requestInfoFor: request to the ip stack ip returned error",
            {
              errMessage: err.message,
              errStack: err.stack,
              ip,
            }
          );
          reject(err);
        });
        resp.on("end", () => {
          // now that we got the answer, let's use our guess
          try {
            const parsedData = JSON.parse(data);
            if (parsedData.error) {
              logger.error(
                "IPStackService.requestInfoFor: ipstack provided a custom error",
                {
                  errMessage: parsedData.error,
                  ip,
                  data,
                }
              );
              reject(new Error(parsedData.error));
            } else {
              resolve(parsedData);
            }
          } catch (err) {
            logger.error(
              "IPStackService.requestInfoFor: request to the ip stack ip returned invalid data",
              {
                errMessage: err.message,
                errStack: err.stack,
                ip,
                data,
              }
            );
            reject(err);
          }
        });
      }).on("error", (err) => {
        logger.error(
          "IPStackService.requestInfoFor: https request to ipstack API failed",
          {
            errMessage: err.message,
            errStack: err.stack,
            ip,
          }
        );
        reject(err);
      });
    });
  }
  public async getLocalizationFor(
    ip: string,
    fallback: IUserLocalizationType,
  ): Promise<IUserLocalizationType> {
    try {
      const standardResponse = await this.requestInfoFor(ip);
      if (standardResponse.country_code === null) {
        return fallback;
      }
      const languageCode = standardResponse.location && standardResponse.location.languages &&
        standardResponse.location.languages[0] && standardResponse.location.languages[0].code
      return {
        country: standardResponse.country_code,
        currency: countries[standardResponse.country_code] ? countries[standardResponse.country_code].currency || "EUR" : "EUR",
        language: languageCode ? languageCode : (countries[standardResponse.country_code].languages[0] || "en"),
      }
    } catch (err) {
      return fallback;
    }
  }
}
