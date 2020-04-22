import https from "https";
import { IPropertyDefinitionSupportedLocationType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";

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

// converts a suggestion to our lovely location type
function processHereResult(wordSeparator: string, suggestion: IHereResult, overwriteTxt?: string) {
  return {
    lat: suggestion.position[0],
    lng: suggestion.position[1],
    txt: overwriteTxt || suggestion.title,
    atxt: suggestion.vicinity ? suggestion.vicinity.replace(/\<br\/\>/g, wordSeparator + " ") : null,
  };
}

export class Here {
  private appId: string;
  private appCode: string;
  constructor(appId: string, appCode: string) {
    this.appId = appId;
    this.appCode = appCode;
  }
  requestSearchFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType[]> {
    const hostname = "places.cit.api.here.com";
    const path = "places/v1/discover/search";
    const qs = `?at=${lat},${lng}&q=${query}&app_id=${this.appId}&app_code=${this.appCode}`;
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
            reject(err);
          });
          resp.on("end", () => {
            // now that we got the answer, let's use our guess
            try {
              const parsedData = JSON.parse(data);
              parsedData.results = parsedData.results.filter((s: IHereResult) => s.position);
              resolve(parsedData.results.map((r: IHereResult) => processHereResult(
                sep,
                r,
                query,
              )));
            } catch (err) {
              reject(err);
            }
          });
        }
      ).on("error", () => {
        resolve([]);
      });
    });
  }
  requestAutocompleteFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType[]> {
    const hostname = "places.cit.api.here.com";
    const path = "/places/v1/autosuggest";
    const qs = `?at=${lat},${lng}&q=${query}&app_id=${this.appId}&app_code=${this.appCode}&size=6`;
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
            reject(err);
          });
          resp.on("end", () => {
            // now that we got the answer, let's use our guess
            try {
              const parsedData = JSON.parse(data);
              parsedData.results = parsedData.results.filter((s: IHereResult) => s.position);
              resolve(parsedData.results.map((r: IHereResult) => processHereResult(
                sep,
                r,
              )));
            } catch (err) {
              reject(err);
            }
          });
        }
      ).on("error", () => {
        resolve([]);
      });
    });
  }
}

export function setupHere(appId: string, appCode: string) {
  return new Here(appId, appCode);
}