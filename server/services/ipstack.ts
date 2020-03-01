import http from "http";
import { countries } from "../../imported-resources";

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

interface IPStackItemizeSpecificResponse {
  country: string;
  currency: string;
  language: string;
}

export class IPStack {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  requestInfoFor(ip: string) {
    return new Promise<IPStackResponse>((resolve, reject) => {
      http.get(`http://api.ipstack.com/${ip}?access_key=${this.apiKey}`, (resp) => {
        // let's get the response from the stream
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("error", (err) => {
          reject(err);
        });
        resp.on("end", () => {
          // now that we got the answer, let's use our guess
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (err) {
            reject(err);
          }
        });
      }).on("error", (err) => {
        reject(err);
      });
    });
  }
  async requestUserInfoForIp(
    ip: string,
    fallback: IPStackItemizeSpecificResponse,
  ): Promise<IPStackItemizeSpecificResponse> {
    try {
      const standardResponse = await this.requestInfoFor(ip);
      const languageCode = standardResponse.location && standardResponse.location.languages &&
        standardResponse.location.languages[0] && standardResponse.location.languages[0].code
      return {
        country: standardResponse.country_code,
        currency: countries[standardResponse.country_code] ? countries[standardResponse.country_code].currency || "EUR" : "EUR",
        language: languageCode ? languageCode : (countries[standardResponse.country_code].languages[0] || "en"),
      }
    } catch {
      return fallback;
    }
  }
}

export function setupIPStack(apiKey: string) {
  return new IPStack(apiKey);
}