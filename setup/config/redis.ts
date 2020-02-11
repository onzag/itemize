import { IRedisConfigRawJSONDataType } from "../../config";
import { configRequest } from "../read";

export async function redisConfigSetup(
  version: string,
  currentConfig: IRedisConfigRawJSONDataType,
  referenceConfig: IRedisConfigRawJSONDataType,
  packageJSON: any,
): Promise<IRedisConfigRawJSONDataType> {
  const newConfig = await configRequest(
    currentConfig || referenceConfig,
    "Redis configuration (" + version + ")",
    [
      {
        variableName: "host",
        message: "The host where redis is running",
        defaultValue: "127.0.0.1",
      },
      {
        variableName: "port",
        type: "integer",
        message: "The redis port",
        defaultValue: 6379,
        validate: (v) => !isNaN(v),
      },
      {
        variableName: "path",
        message: "The UNIX socket string of the Redis server, you can leave it blank",
        defaultValue: "",
      },
      {
        variableName: "db",
        message: "If set, client will run Redis select command on connect",
        defaultValue: 0,
        validate: (v) => !isNaN(v),
      },
      {
        variableName: "password",
        message: "If set, client will run Redis auth command on connect",
        defaultValue: "",
        hidden: true,
      },
    ],
  );

  return newConfig;
}