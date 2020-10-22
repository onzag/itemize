import http from "http";
import https from "https";
import { logger } from "../";
import { RedisClient } from "redis";
import { CACHED_CURRENCY_RESPONSE } from "../../constants";

interface CurrencyLayerResponse {
  success: boolean;
  terms: string;
  privacy: string;
  timestamp: number;
  source: string;
  quotes: {
    [key: string]: number,
  }
}

interface CurrencyLayerItemizeSpecificResponse {
  [key: string]: number,
}

export class CurrencyLayer {
  private apiKey: string;
  private httpsEnabled: boolean;
  private globalCache: RedisClient;
  constructor(apiKey: string, globalCache: RedisClient, httpsEnabled: boolean) {
    this.apiKey = apiKey;
    this.httpsEnabled = httpsEnabled;
    this.globalCache = globalCache;
  }
  private requestInfo() {
    return new Promise<CurrencyLayerResponse>((resolve, reject) => {
      this.globalCache.get(
        CACHED_CURRENCY_RESPONSE,
        (err, cachedData) => {
          const parsedCachedData: CurrencyLayerResponse = cachedData && !err && JSON.parse(cachedData);
          if (!parsedCachedData || (new Date()).getTime() - (parsedCachedData.timestamp * 1000) >= 86400000) {
            logger.info("CurrencyLayer.requestInfo: requesting fresh info");
            (this.httpsEnabled ? https : http).get(`http://api.currencylayer.com/live?access_key=${this.apiKey}`, (resp) => {
              // let's get the response from the stream
              let data = "";
              resp.on("data", (chunk) => {
                data += chunk;
              });
              resp.on("error", (err) => {
                logger.error(
                  "CurrencyLayer.requestInfo: request to the ip stack ip returned error",
                  {
                    errMessage: err.message,
                    errStack: err.stack,
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
                      "CurrencyLayer.requestInfo: CurrencyLayer provided a custom error",
                      {
                        errMessage: parsedData.error,
                        data,
                      }
                    );
                    reject(new Error(parsedData.error));
                  } else {
                    this.globalCache.set(
                      CACHED_CURRENCY_RESPONSE,
                      data,
                    );
                    resolve(parsedData);
                  }
                } catch (err) {
                  logger.error(
                    "CurrencyLayer.requestInfo: request currency layer returned invalid data",
                    {
                      errMessage: err.message,
                      errStack: err.stack,
                      data,
                    }
                  );
                  reject(err);
                }
              });
            }).on("error", (err) => {
              logger.error(
                "CurrencyLayer.requestInfo: https request to CurrencyLayer API failed",
                {
                  errMessage: err.message,
                  errStack: err.stack,
                }
              );
              reject(err);
            });
          } else {
            logger.info("CurrencyLayer.requestInfo: reusing an existant value");
            resolve(parsedCachedData);
          }
        }
      );
    });
  }
  async requestCurrencyFactors(): Promise<CurrencyLayerItemizeSpecificResponse> {
    const infoFromServer = await this.requestInfo();
    const converted = {};
    Object.keys(infoFromServer.quotes).forEach((quoteName) => {
      converted[quoteName.substr(3)] = 1 / infoFromServer.quotes[quoteName];
    });
    return converted;
  }
}

export function setupCurrencyLayer(apiKey: string, globalCache: RedisClient, httpsEnabled: boolean) {
  return new CurrencyLayer(apiKey, globalCache, httpsEnabled);
}