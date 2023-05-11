import http from "http";
import https from "https";
import { ServiceProviderType } from ".";
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
          let parsedCachedData: CurrencyLayerResponse;
          
          try {
            parsedCachedData = cachedData && !err && JSON.parse(cachedData);
          } catch (err) {
            this.logError({
              className: "CurrencyLayer",
              methodName: "requestInfo",
              message: "Could not parse data from redis",
              err,
            });
          }

          if (!parsedCachedData || (new Date()).getTime() - (parsedCachedData.timestamp * 1000) >= 86400000) {
            this.logInfo({
              className: "CurrencyLayer",
              methodName: "requestInfo",
              message: "Requesting fresh info",
            });
            (this.config.httpsEnabled ? https : http).get(`${this.config.httpsEnabled ? "https" : "http"}://api.currencylayer.com/live?access_key=${this.config.apiKey}`, (resp) => {
              // let's get the response from the stream
              let data = "";
              resp.on("data", (chunk) => {
                data += chunk;
              });
              resp.on("error", (err) => {
                this.logError(
                  {
                    className: "CurrencyLayer",
                    methodName: "requestInfo",
                    message: "Request to the ip stack ip returned error",
                    err,
                  }
                );
                reject(err);
              });
              resp.on("end", () => {
                // now that we got the answer, let's use our guess
                try {
                  const parsedData = JSON.parse(data);
                  if (parsedData.error) {
                    this.logError(
                      {
                        className: "CurrencyLayer",
                        methodName: "requestInfo",
                        message: "CurrencyLayer provided a custom error",
                        err,
                        data: {
                          data,
                        },
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
                  this.logError(
                    {
                      className: "CurrencyLayer",
                      methodName: "requestInfo",
                      message: "Request currency layer returned invalid data",
                      err,
                      data: {
                        data,
                      },
                    }
                  );
                  reject(err);
                }
              });
            }).on("error", (err) => {
              this.logError(
                {
                  className: "CurrencyLayer",
                  methodName: "requestInfo",
                  message: "Request to CurrencyLayer API failed",
                  err,
                }
              );
              reject(err);
            });
          } else {
            this.logInfo({
              className: "CurrencyLayer",
              methodName: "requestInfo",
              message: "Reusing an existant value",
            });
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
