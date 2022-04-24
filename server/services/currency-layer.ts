import http from "http";
import https from "https";
import { ServiceProviderType } from ".";
import { logger } from "../logger";
import { CACHED_CURRENCY_RESPONSE } from "../../constants";
import CurrencyFactorsProvider, { ICurrencyFactors } from "./base/CurrencyFactorsProvider";

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

export interface ICurrencyLayerConfig {
  apiKey: string;
  httpsEnabled: boolean;
}

export class CurrencyLayerService extends CurrencyFactorsProvider<ICurrencyLayerConfig> {
  public static getType() {
    return ServiceProviderType.GLOBAL;
  }

  private requestInfo() {
    return new Promise<CurrencyLayerResponse>((resolve, reject) => {
      this.globalRedis.redisClient.get(
        CACHED_CURRENCY_RESPONSE,
        (err, cachedData) => {
          const parsedCachedData: CurrencyLayerResponse = cachedData && !err && JSON.parse(cachedData);
          if (!parsedCachedData || (new Date()).getTime() - (parsedCachedData.timestamp * 1000) >= 86400000) {
            logger.info("CurrencyLayer.requestInfo: requesting fresh info");
            (this.config.httpsEnabled ? https : http).get(`http://api.currencylayer.com/live?access_key=${this.config.apiKey}`, (resp) => {
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
                    this.globalRedis.redisClient.set(
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
                "CurrencyLayer.requestInfo: request to CurrencyLayer API failed",
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
  async getFactors(): Promise<ICurrencyFactors> {
    const infoFromServer = await this.requestInfo();
    const converted = {};
    Object.keys(infoFromServer.quotes).forEach((quoteName) => {
      converted[quoteName.substr(3)] = 1 / infoFromServer.quotes[quoteName];
    });
    return converted;
  }
}
