import { IRedisConfigRawJSONDataType } from "../../config";
import { configRequest, IConfigRequestExtractPoint } from "../read";

export async function redisConfigSetup(
  version: string,
  currentConfig: IRedisConfigRawJSONDataType,
  referenceConfig: IRedisConfigRawJSONDataType,
  packageJSON: any,
): Promise<IRedisConfigRawJSONDataType> {
  const extractDataRedis: IConfigRequestExtractPoint[] = [
    {
      variableName: "host",
      message: "The host where redis is running",
      defaultValue: "127.0.0.1",
      nullifyFalseValues: true,
    },
    {
      variableName: "port",
      type: "integer",
      message: "The redis port",
      defaultValue: 6379,
      validate: (v: number) => !isNaN(v),
    },
    {
      variableName: "path",
      message: "The UNIX socket string of the Redis server, you can leave it blank",
      defaultValue: "",
      nullifyFalseValues: true,
    },
    {
      variableName: "db",
      message: "If set, client will run Redis select command on connect",
      defaultValue: 0,
      validate: (v: number) => !isNaN(v),
      nullifyFalseValues: true,
    },
    {
      variableName: "password",
      message: "If set, client will run Redis auth command on connect",
      defaultValue: "",
      hidden: true,
      nullifyFalseValues: true,
    }
  ];
  const usedConfig = currentConfig || referenceConfig;
  const newConfig = await configRequest(
    usedConfig,
    "Redis configuration (" + version + ")",
    [
      {
        variableName: "global",
        type: "config" as "config",
        defaultValue: null,
        message: "Cache configuration that is used for the global volatile memory that is shared between instances",
        extractData: extractDataRedis,
      },
      {
        variableName: "cache",
        type: "config" as "config",
        defaultValue: null,
        message: "Cache configuration that is used for the internal service cache",
        extractData: extractDataRedis,
      },
      {
        variableName: "pubSub",
        type: "config" as "config",
        defaultValue: null,
        message: "Pubsub redis instance that is used for notifying variable changes and other notifications",
        extractData: extractDataRedis,
      },
    ],
  );

  return newConfig;
}