import colors from "colors";
import dockerSetup from "./docker";
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";

export interface ISetupConfigType {
  rawConfig: IConfigRawJSONDataType;
  dbConfigDevelopment: IDBConfigRawJSONDataType;
  redisConfigDevelopment: IRedisConfigRawJSONDataType;
  dbConfigStaging: IDBConfigRawJSONDataType;
  redisConfigStaging: IRedisConfigRawJSONDataType;
  dbConfigProduction: IDBConfigRawJSONDataType;
  redisConfigProduction: IRedisConfigRawJSONDataType;
}

const stepsInOrder: Array<(arg: ISetupConfigType) => Promise<ISetupConfigType>> = [
  dockerSetup,
];

export default async function setup(
  arg: ISetupConfigType,
): Promise<void> {
  console.log(colors.green("Initializing Itemize"));
  let newArg = arg;
  for (const step of stepsInOrder) {
    try {
      newArg = await step(newArg);
    } catch (err) {
      console.log(colors.red(err.toString()));
      break;
    }
  }

  console.log(colors.green("Setup succesful!"));
  // TODO write the files to disc
}

(async () => {
  // TODO read the files from disc
  setup({
    rawConfig: null,
    dbConfigDevelopment: null,
    redisConfigDevelopment: null,
    dbConfigStaging: null,
    redisConfigStaging: null,
    dbConfigProduction: null,
    redisConfigProduction: null,
  });
})();
