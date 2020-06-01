import read from "read";
import colors from "colors";
// @ts-ignore
import Confirm from "prompt-confirm";

export function request(options: read.Options): Promise<{
  result: string;
  isDefault: boolean;
}> {
  return new Promise((resolve, reject) => {
    read(options, (error, result, isDefault) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          result,
          isDefault,
        })
      }
    });
  });
}

type FieldRequestType = "strarray" | "string" | "integer" | "strobject";

export async function fieldRequest<T>(
  type: FieldRequestType,
  message: string,
  variableName: string,
  basedOnValue: T,
  defaultValue: T,
  hidden?: boolean,
  validate?: (value: T) => boolean,
  nullifyFalseValues?: boolean,
): Promise<T> {
  let wasLastValid = true;
  let currentValue: T = basedOnValue;

  if (message) {
    console.log("\n" + message);
  }

  if (type === "strobject") {
    const keys = await fieldRequest<string[]>(
      "strarray",
      null,
      variableName + "[$key]",
      basedOnValue ? Object.keys(basedOnValue) : null,
      Object.keys(defaultValue),
    );

    const finalValue = {};
    for (const key of keys) {
      finalValue[key] = await fieldRequest<string>(
        "string",
        null,
        variableName + "[" + JSON.stringify(key) + "]",
        basedOnValue ? basedOnValue[key] : null,
        defaultValue ? defaultValue[key] : "",
        hidden,
      );
    }

    return finalValue as any || null;
  }

  do {
    if (!wasLastValid) {
      if (!hidden) {
        console.log(JSON.stringify(currentValue) + colors.red(" is deemed invalid"));
      } else {
        console.log(colors.red("value is deemed invalid"));
      }
    }
    wasLastValid = false;

    const actualDefaultValue = Array.isArray(defaultValue) ? defaultValue.join(", ") : (defaultValue || "").toString();
    const retrievedValue = await request({
      prompt: variableName + ": ",
      default: (basedOnValue || actualDefaultValue).toString(),
      edit: !!basedOnValue,
      silent: hidden,
      replace: "*",
    })

    if (type === "integer") {
      currentValue = parseInt(retrievedValue.result) as any;
    } else if (type === "strarray") {
      currentValue = retrievedValue.result.split(",").map(v => v.trim()).filter(v => !!v) as any;
    } else {
      currentValue = retrievedValue.result as any;
    }
  } while (validate ? !validate(currentValue) : false);

  if (nullifyFalseValues && !currentValue) {
    return currentValue || null;
  }
  return currentValue;
}

export interface IConfigRequestExtractPoint {
  type?: FieldRequestType | "config" | "multiconfig",
  extractData?: Array<IConfigRequestExtractPoint>,
  variableName: string,
  message: string,
  defaultValue: any,
  hidden?: boolean,
  validate?: (value: any, config: any) => boolean,
  nullifyFalseValues?: boolean,
};

export async function configRequest<T>(
  srcConfig: T,
  message: string,
  extractData: Array<IConfigRequestExtractPoint>,
  variableNamePrefix: string = "",
): Promise<T> {
  console.log(colors.bgGreen("\nENTER:") + " " + message);
  const newConfig: T = {
    ...srcConfig,
  }
  for (const extractPoint of extractData) {
    if (extractPoint.type === "config") {
      newConfig[extractPoint.variableName] = await configRequest(
        newConfig[extractPoint.variableName],
        extractPoint.message,
        extractPoint.extractData,
        variableNamePrefix + extractPoint.variableName + ".",
      );
    } else if (extractPoint.type === "multiconfig") {
      if (!newConfig[extractPoint.variableName]) {
        newConfig[extractPoint.variableName] = {};
      }

      const keys = await fieldRequest<string[]>(
        "strarray",
        null,
        variableNamePrefix + extractPoint.variableName + "." + "[$key]",
        null,
        Object.keys(newConfig[extractPoint.variableName]),
      );

      for (const key of keys) {
        newConfig[extractPoint.variableName][key] = await configRequest(
          newConfig[extractPoint.variableName][key],
          extractPoint.message,
          extractPoint.extractData,
          variableNamePrefix + extractPoint.variableName + "." + key + ".",
        );
      }
    } else {
      newConfig[extractPoint.variableName] = await fieldRequest(
        extractPoint.type || "string",
        extractPoint.message,
        variableNamePrefix + extractPoint.variableName,
        newConfig[extractPoint.variableName],
        extractPoint.defaultValue,
        extractPoint.hidden,
        (value) => extractPoint.validate ? extractPoint.validate(value, newConfig) : true,
        extractPoint.nullifyFalseValues,
      );
    }
  }

  console.log(colors.bgGreen("\nEXIT:") + " " + message);

  return newConfig;
}

export function confirm(question: string): Promise<boolean> {
  return (new Confirm(question)).run();
}