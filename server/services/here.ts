import https from "https";
import { ServiceProviderType } from ".";
import { IPropertyDefinitionSupportedLocationType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import LocationSearchProvider, { ITimezoneInformation } from "./base/LocationSearchProvider";

// the interface that roughly represents a result from the
// here we go API, check the API at
// https://places.demo.api.here.com/places/v1/autosuggest
interface IHereResult {
  title: string;
  id: string;
  resultType: string;
  address: {
    label: string;

    // search props
    countryCode?: string;
    countryName?: string;
    state?: string;
    county?: string;
    city?: string;
    district?: string;
    street: string;
    postalCode: string;
    houseNumber?: string;
  },
  position: {
    lat: number;
    lng: number;
  };
  access: Array<{ lat: number, lng: number }>;
  distance: number;

  // aucom props
  highlights: any;

  // search props
  ontologyId?: string;
  houseNumberType?: string;
}

function utcOffsetToMilliseconds(utcOffset) {
  // Validate the format of the input (e.g., "+1:00" or "-01:30")
  const match = /^([+-]?)(\d{1,2}):(\d{2})$/.exec(utcOffset);
  if (!match) {
      throw new Error("Invalid UTC offset format. Use [+/-]HH:MM.");
  }

  const sign = match[1] === "-" ? -1 : 1; // Determine if the offset is negative
  const hours = parseInt(match[2], 10);  // Extract hours
  const minutes = parseInt(match[3], 10); // Extract minutes

  // Convert the offset to milliseconds
  const offsetInMilliseconds = sign * (((hours * 60) + minutes) * 60 * 1000);
  return offsetInMilliseconds;
}

export interface IHereMapsConfig {
  apiKey: string;
}

export class HereMapsService extends LocationSearchProvider<IHereMapsConfig> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }
  private processHereResult(wordSeparator: string, suggestion: IHereResult, overwriteTxt?: string) {
    return {
      lat: suggestion.position.lat,
      lng: suggestion.position.lng,
      txt: overwriteTxt || suggestion.title,
      id: this.makeIdOutOf(suggestion.position.lat, suggestion.position.lng),
      atxt: (suggestion.address && suggestion.address.label) || null,
    };
  }
  public requestRevGeocodeFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType> {
    const hostname = "discover.search.hereapi.com";
    const path = "/v1/revgeocode";
    const qs = `?at=${lat},${lng}&apiKey=${this.config.apiKey}&lang=${encodeURIComponent(lang)}`;
    const pathwithqs = path + qs;

    const latp = typeof lat === "number" ? lat : parseFloat(lat);
    const lngp = typeof lng === "number" ? lng : parseFloat(lng);
    const standardResponse = {
      txt: query ? query : "???",
      atxt: "???",
      lat: latp,
      lng: lngp,
      id: this.makeIdOutOf(latp, lngp),
    };

    return new Promise<IPropertyDefinitionSupportedLocationType>((resolve, reject) => {
      https.get(
        {
          hostname,
          path: pathwithqs,
          headers: {
            "Accept-Language": `${lang}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
          },
        },
        (resp) => {
          // let's get the response from the stream
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("error", (err) => {
            this.logError(
              {
                className: "HereMapsService",
                methodName: "requestRevGeocodeFor",
                message: "Here response cancelled",
                serious: true,
                err,
                data: {
                  data,
                  lat,
                  lng,
                  query,
                  lang,
                  sep,
                },
              }
            );
            resolve(standardResponse);
          });
          resp.on("end", () => {
            // now that we got the answer, let's use our guess
            try {
              const parsedData = JSON.parse(data);

              if (!parsedData.items[0]) {
                resolve(standardResponse);
              }

              const title = parsedData.items[0].title;
              const address = parsedData.items[0]?.address?.label;
              resolve({
                ...standardResponse,
                atxt: address || "???",
                txt: query ? query : title,
              });
            } catch (err) {
              this.logError(
                {
                  className: "HereMapsService",
                  methodName: "requestRevGeocodeFor",
                  message: "Here replied with invalid data or with error message",
                  serious: true,
                  err,
                  data: {
                    data,
                    lat,
                    lng,
                    query,
                    lang,
                    sep,
                  },
                }
              );
              resolve(standardResponse);
            }
          });
        }
      ).on("error", (err) => {
        this.logError(
          {
            className: "HereMapsService",
            methodName: "requestRevGeocodeFor",
            message: "Https request to here API failed",
            serious: true,
            err,
            data: {
              lat,
              lng,
              query,
              lang,
              sep,
            },
          }
        );
        resolve(standardResponse);
      });
    });
  }
  public requestSearchFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType[]> {
    const hostname = "discover.search.hereapi.com";
    const path = "/v1/geocode";
    const qs = `?at=${lat},${lng}&q=${encodeURIComponent(query)}&apiKey=${this.config.apiKey}&lang=${encodeURIComponent(lang)}`;
    const pathwithqs = path + qs;

    return new Promise<IPropertyDefinitionSupportedLocationType[]>((resolve, reject) => {
      https.get(
        {
          hostname,
          path: pathwithqs,
          headers: {
            "Accept-Language": `${lang}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
          },
        },
        (resp) => {
          // let's get the response from the stream
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("error", (err) => {
            this.logError(
              {
                className: "HereMapsService",
                methodName: "requestSearchFor",
                message: "Here response cancelled",
                serious: true,
                err,
                data: {
                  data,
                  lat,
                  lng,
                  query,
                  lang,
                  sep,
                },
              }
            );
            resolve([]);
          });
          resp.on("end", () => {
            // now that we got the answer, let's use our guess
            try {
              const parsedData = JSON.parse(data);
              parsedData.items = parsedData.items
                .filter((r: IHereResult) => r.position)
                .filter((r: IHereResult, index: number, arr: IHereResult[]) => {
                  return arr.findIndex((r2: IHereResult) =>
                    r.position[0] === r2.position[0] && r.position[1] === r2.position[1]
                  ) === index;
                }
                );
              resolve(parsedData.items.map((r: IHereResult) => this.processHereResult(
                sep,
                r,
                query,
              )));
            } catch (err) {
              this.logError(
                {
                  className: "HereMapsService",
                  methodName: "requestSearchFor",
                  message: "Here replied with invalid data or with error message",
                  serious: true,
                  err,
                  data: {
                    data,
                    lat,
                    lng,
                    query,
                    lang,
                    sep,
                  },
                }
              );
              resolve([]);
            }
          });
        }
      ).on("error", (err) => {
        this.logError(
          {
            className: "HereMapsService",
            methodName: "requestSearchFor",
            message: "Https request to here API failed",
            serious: true,
            err,
            data: {
              lat,
              lng,
              query,
              lang,
              sep,
            },
          }
        );
        resolve([]);
      });
    });
  }
  public requestAutocompleteFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType[]> {
    const hostname = "autosuggest.search.hereapi.com";
    const path = "/v1/autosuggest";
    const qs = `?at=${lat},${lng}&q=${encodeURIComponent(query)}&apiKey=${this.config.apiKey}&limit=6`;
    const pathwithqs = path + qs;

    return new Promise<IPropertyDefinitionSupportedLocationType[]>((resolve, reject) => {
      https.get(
        {
          hostname,
          path: pathwithqs,
          headers: {
            "Accept-Language": `${lang}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
          },
        },
        (resp) => {
          // let's get the response from the stream
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("error", (err) => {
            this.logError(
              {
                className: "HereMapsService",
                methodName: "requestAutocompleteFor",
                message: "Here response cancelled",
                serious: true,
                err,
                data: {
                  data,
                  lat,
                  lng,
                  query,
                  lang,
                  sep,
                },
              }
            );
            resolve([]);
          });
          resp.on("end", () => {
            // now that we got the answer, let's use our guess
            try {
              const parsedData = JSON.parse(data);
              parsedData.items = parsedData.items.filter((s: IHereResult) => s.position);
              resolve(parsedData.items.map((r: IHereResult) => this.processHereResult(
                sep,
                r,
              )));
            } catch (err) {
              this.logError(
                {
                  className: "HereMapsService",
                  methodName: "requestAutocompleteFor",
                  message: "Here replied with invalid data or with error message",
                  serious: true,
                  err,
                  data: {
                    data,
                    lat,
                    lng,
                    query,
                    lang,
                    sep,
                  },
                }
              );
              resolve([]);
            }
          });
        }
      ).on("error", (err) => {
        this.logError(
          {
            className: "HereMapsService",
            methodName: "requestSearchFor",
            message: "Https request to here API failed",
            serious: true,
            err,
            data: {
              lat,
              lng,
              query,
              lang,
              sep,
            },
          }
        );
        resolve([]);
      });
    });
  }
  
  public performTimezoneRequest(lat: string | number, lng: string | number): Promise<ITimezoneInformation> {
    const hostname = "discover.search.hereapi.com";
    const path = "/v1/revgeocode";
    const qs = `?at=${lat},${lng}&apiKey=${this.config.apiKey}&show=tz`;
    const pathwithqs = path + qs;

    return new Promise<ITimezoneInformation>((resolve, reject) => {
      https.get(
        {
          hostname,
          path: pathwithqs,
          headers: {
            "Accept-Language": `en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
          },
        },
        (resp) => {
          // let's get the response from the stream
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("error", (err) => {
            this.logError(
              {
                className: "HereMapsService",
                methodName: "performTimezoneRequest",
                message: "Here response cancelled",
                serious: true,
                err,
                data: {
                  data,
                  lat,
                  lng,
                },
              }
            );
            resolve(null);
          });
          resp.on("end", () => {
            // now that we got the answer, let's use our guess
            try {
              const parsedData = JSON.parse(data);

              console.log(parsedData);

              if (!parsedData.items[0] || !parsedData.items[0].timeZone) {
                resolve(null);
              }

              const tzObject: ITimezoneInformation = parsedData.items[0].timeZone;
              tzObject.utcOffsetMs = utcOffsetToMilliseconds(tzObject.utcOffset);
              resolve(tzObject);
            } catch (err) {
              this.logError(
                {
                  className: "HereMapsService",
                  methodName: "performTimezoneRequest",
                  message: "Here replied with invalid data or with error message",
                  serious: true,
                  err,
                  data: {
                    data,
                    lat,
                    lng,
                  },
                }
              );
              resolve(null);
            }
          });
        }
      ).on("error", (err) => {
        this.logError(
          {
            className: "HereMapsService",
            methodName: "performTimezoneRequest",
            message: "Https request to here API failed",
            serious: true,
            err,
            data: {
              lat,
              lng,
            },
          }
        );
        resolve(null);
      });
    });
  }
}
