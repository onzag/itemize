import { IConfigRawJSONDataType } from "../config";

/**
 * This file exists as a necessity in order to create dynamic json from config
 * fields in the data
 *
 * @packageDocumentation
 */

/**
 * Evaluates javascript using new Function, it's okay this is a building
 * process that developers execute, it is not meant for clients and it only executes
 * once in json fields that exist within the schema that use the $CONFIG: syntax
 * what comes after that is javascript and will replace itself with the return of that
 * @param config the configuration
 * @param rawJSON the raw json of whatever it is to be evaled
 * @returns that same json with evaled fields replaced
 */
export function evalRawJSON<T>(
  config: IConfigRawJSONDataType,
  rawJSON: T,
): T {
  // so first off it needs to be of type string and have that $CONFIG: thing
  if (typeof rawJSON === "string" && rawJSON.startsWith("$CONFIG:")) {
    // the code is whatever comes after it
    const code = rawJSON.replace("$CONFIG:", "");
    // and now we create the function
    const fn = new Function("config", code);
    // and run it with the config
    return fn(config);
  // if it's an array, we just map it out
  } else if (Array.isArray(rawJSON)) {
    return rawJSON.map((iRawJSON) => evalRawJSON(config, iRawJSON)) as any;
  // if it's not an object or whatever else, we return the value as it is
  } else if (typeof rawJSON !== "object" || rawJSON === null) {
    return rawJSON;
  }

  // otherwise we build a new object
  const newObj = {};

  // and loop over the keys and eval each one by one
  Object.keys(rawJSON).forEach((key) => {
    newObj[key] = evalRawJSON(config, rawJSON[key]);
  });

  // return it
  return newObj as T;
}
