import https from "https";
import { ServiceProviderType } from ".";
import { IPropertyDefinitionSupportedLocationType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import LocationSearchProvider from "./base/LocationSearchProvider";

// the interface that roughly represents a result from the
// here we go API, check the API at
// https://places.demo.api.here.com/places/v1/autosuggest
interface IHereResult {
  title: string;
  highlightedTitle: string;
  vicinity?: string;
  highlightedVicinity?: string;
  position: [number, number];
  category: string;
  categoryTitle: string;
  bbox?: [number, number, number, number];
  href?: string;
  type: string;
  resultType: string;
  id: string;
  distance: number;
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
      lat: suggestion.position[0],
      lng: suggestion.position[1],
      txt: overwriteTxt || suggestion.title,
      id: this.makeIdOutOf(suggestion.position[0], suggestion.position[1]),
      // NOTE adding tf=plain makes plain text results, but this works pretty well
      // the word separator should be used by default now
      atxt: suggestion.vicinity ? suggestion.vicinity.replace(/\<br\/\>/g, " ") : null,
    };
  }
  public requestGeocodeFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType> {
    const hostname = "places.ls.hereapi.com";
    const path = "/places/v1/discover/here";
    const qs = `?at=${lat},${lng}&cat=none&apiKey=${this.config.apiKey}`;
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
                methodName: "requestGeocodeFor",
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
              const address = parsedData.search.context.location.address;
              const addressText = address && address.text ? address.text.replace(/\<br\/\>/g, sep + " ") : "???";
              resolve({
                ...standardResponse,
                atxt: addressText,
                txt: query ? query : addressText,
              });
            } catch (err) {
              this.logError(
                {
                  className: "HereMapsService",
                  methodName: "requestGeocodeFor",
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
            methodName: "requestGeocodeFor",
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
    const hostname = "places.ls.hereapi.com";
    const path = "/places/v1/discover/search";
    const qs = `?at=${lat},${lng}&q=${encodeURIComponent(query)}&apiKey=${this.config.apiKey}`;
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
              parsedData.results.items = parsedData.results.items
                .filter((r: IHereResult) => r.position)
                .filter((r: IHereResult, index: number, arr: IHereResult[]) => {
                  return arr.findIndex((r2: IHereResult) =>
                    r.position[0] === r2.position[0] && r.position[1] === r2.position[1]
                  ) === index;
                }
                );
              resolve(parsedData.results.items.map((r: IHereResult) => this.processHereResult(
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
    const hostname = "places.ls.hereapi.com";
    const path = "/places/v1/autosuggest";
    const qs = `?at=${lat},${lng}&q=${encodeURIComponent(query)}&apiKey=${this.config.apiKey}&size=6`;
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
              parsedData.results = parsedData.results.filter((s: IHereResult) => s.position);
              resolve(parsedData.results.map((r: IHereResult) => this.processHereResult(
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
}
