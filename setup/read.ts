/**
 * Constains function to read information from the console in order to be used
 * during the setup process
 * 
 * @packageDocumentation
 */

import read from "read";
import colors from "colors";
// @ts-nocheck
import Confirm from "prompt-confirm";

/**
 * Simple function to ask for a question
 * @param question the question to ask
 * @returns a boolean on the answer
 */
export function yesno(question: string) {
  return (new Confirm(question)).run();
}

/**
 * requests a single value
 * @param options the read options
 */
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

/**
 * The types we are allowed to request
 * string is just a plain string
 * integer is a number integer
 * strarray is an array of string
 * strobject is an object with strings in it
 */
type FieldRequestType = "strarray" | "string" | "integer" | "boolean" | "strobject";

/**
 * This function allows us to request one of the field types
 * @param type the type we are requesting
 * @param message the message we want to show
 * @param variableName the variable name we are setting
 * @param basedOnValue basically a previously assigned value we want to modify for this
 * @param defaultValue the default value for this
 * @param hidden whether we shouldn't display the characters for it to avoid logs
 * @param validate a function to validate the value
 * @param nullifyFalseValues whether we should make values that don't pass the if (value) check, null, basically empty string and 0
 * @returns the value it was read
 */
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
  // so we show the message if we have one
  if (message) {
    console.log("\n" + message);
  }

  // so first we have this variable to specify
  // if the last value we used was invalid
  let wasLastAttemptValid = true;
  // our current value is the value we are basing ourselves into
  // it's not the default, the default it's the default, the based on
  // is basically a previously assigned value to this field
  let currentValue: T = basedOnValue;

  do {
    if (!wasLastAttemptValid) {
      if (!hidden) {
        console.log(JSON.stringify(currentValue) + colors.red(" is deemed invalid"));
      } else {
        console.log(colors.red("value is deemed invalid"));
      }
    }
    wasLastAttemptValid = false;

    // for integer
    if (type === "integer") {
      // we ask for
      const retrievedValue = await request({
        // the variable name and :
        prompt: variableName + ": ",
        // the default is what is based on, or otherwise the default, or otherwise nothing
        default: (basedOnValue || defaultValue || "").toString(),
        // we are editing, rather than writting a new value if we have a based on value
        edit: typeof basedOnValue !== "undefined" && basedOnValue !== null,
        // silent if it's hidden
        silent: hidden,
        // and we use asterisk
        replace: "*",
      });
      // but we need to parse the int, this might be nan, hence the validate function
      currentValue = parseInt(retrievedValue.result) as any;
    } else if (type === "boolean") {
      // we ask for
      const retrievedValue = await request({
        // the variable name and :
        prompt: variableName + ": ",
        // we cast to boolean and stringify
        default: JSON.stringify(!!defaultValue),
        // we are editing, rather than writting a new value if we have a based on value
        edit: typeof basedOnValue !== "undefined" && basedOnValue !== null,
        // silent if it's hidden
        silent: hidden,
        // and we use asterisk
        replace: "*",
      });
      // but we need to parse the boolean
      try {
        currentValue = JSON.parse(retrievedValue.result) as any;
      } catch (err) {
        currentValue = false as any;
      }
    } else if (type === "strarray") {
      // str array uses a comma separated list
      const actualDefaultValue = Array.isArray(defaultValue) ? defaultValue.join(", ") : (defaultValue || "").toString();
      // and we ask similarly to before
      const retrievedValue = await request({
        prompt: variableName + ": ",
        default: (basedOnValue || actualDefaultValue).toString(),
        edit: !!basedOnValue,
        silent: hidden,
        replace: "*",
      });
      currentValue = retrievedValue.result.split(",").map(v => v.trim()).filter(v => !!v) as any;
      // so for str object one of the most complex
    } else if (type === "strobject") {
      // first we need the keys we ask for an array of string, by comma separating these values
      const keys = await fieldRequest<string[]>(
        "strarray",
        // no message
        null,
        // we want to show the variable name plus the key as what we are setting
        variableName + "[$key]",
        // and the values we based on if we have one is the keys of the previous value
        basedOnValue ? Object.keys(basedOnValue) : null,
        // and the keys of the default value
        defaultValue ? Object.keys(defaultValue) : [],
      );

      // so now we can rebuild this value
      const finalValue = {};
      // for ever key we got of all those keys
      for (const key of keys) {
        // now we can request a simple string
        finalValue[key] = await fieldRequest<string>(
          "string",
          // no message
          null,
          // for that specific key
          variableName + "[" + JSON.stringify(key) + "]",
          // the value we based ourselves upon
          basedOnValue ? basedOnValue[key] : null,
          // and our default value
          defaultValue ? defaultValue[key] : "",
          // and whether these values are hidden
          hidden,
        );
      }
      currentValue = finalValue as any;
    } else {
      // and this is for simple strings
      const retrievedValue = await request({
        prompt: variableName + ": ",
        default: (basedOnValue || defaultValue || "").toString(),
        edit: !!basedOnValue,
        silent: hidden,
        replace: "*",
      });
      currentValue = retrievedValue.result as any;
    }
  } while (validate ? !validate(currentValue) : false);
  // we run the validate function until it passes

  // if we nullify false values
  if (nullifyFalseValues && !currentValue) {
    return null;
  }

  // otherwise we give the current value
  return currentValue;
}

/**
 * The form that allows to define how we are requesting an entire configuration
 */
export interface IConfigRequestExtractPoint {
  /**
   * What we are reading, it can be a simple type, a configuration, on a object
   * of configuration, or a multiconfig, basically has keys for many configuration
   * if no type specified, it will consider it a string
   */
  type?: FieldRequestType | "config" | "multiconfig",
  /**
   * The data we are extracting for, note that it's an array
   * as it defines how we extract this data, it defines all the variables
   * we are defining in this config or multiconfig,
   * this will not be used in standard field request types as it defines nothing
   */
  extractData?: Array<IConfigRequestExtractPoint>,
  /**
   * The variable name we are defining for this, since this represents a single
   * variable in a json structure
   */
  variableName: string,
  /**
   * The message we should display for it
   */
  message: string,
  /**
   * The default value only supported for
   * standard types and not config or multiconfig
   */
  defaultValue?: any,
  /**
   * Whether the value is hidden, only supported
   * for standard types
   */
  hidden?: boolean,
  /**
   * A validate function where value is the value
   * and config is the current config being built under
   * this where the variable is stored
   * This is only used for standard values and not config or multiconfig
   */
  validate?: (value: any, config: any) => boolean,
  /**
   * Whether to nullify false values, only used
   * for standard fields
   */
  nullifyFalseValues?: boolean;
  /**
   * prefers to keep a configuration and multi
   * configuration request into an unfilled state
   */
  preferUnfilled?: boolean;
  /**
   * Prevents modification of already existant values
   */
  cantRerun?: boolean;
};

/**
 * Performs a config request for entry an entire config
 * @param srcConfig the source configuration
 * @param message the message to show
 * @param extractData the ata to extract
 * @param variableNamePrefix a prefix to prefix all variable names
 */
export async function configRequest<T>(
  srcConfig: T,
  message: string,
  extractData: Array<IConfigRequestExtractPoint>,
  variableNamePrefix: string = "",
): Promise<T> {
  if (message) {
    console.log(colors.bgGreen("\nENTER:") + " " + message);
  }

  // so we first use our source to build this new config
  const newConfig: T = {
    ...srcConfig,
  }

  // and now we loop in our extract points of each data
  // that each represent a variable inside this config
  for (const extractPoint of extractData) {
    if (
      extractPoint.cantRerun &&
      (
        typeof newConfig[extractPoint.variableName] !== "undefined" &&
        newConfig[extractPoint.variableName] !== null
      )
    ) {
      console.log(colors.bgRed("\t>") + " " + variableNamePrefix + extractPoint.variableName);
      continue;
    }

    console.log(colors.bgGreen("\t>") + " " + variableNamePrefix + extractPoint.variableName);

    // so if it's a config type
    if (extractPoint.type === "config") {
      console.log("\t" + extractPoint.message);

      if (extractPoint.preferUnfilled && await yesno("Would you rather leave the field untouched?")) {
        newConfig[extractPoint.variableName] =
          typeof newConfig[extractPoint.variableName] !== "undefined" ?
            newConfig[extractPoint.variableName] :
            extractPoint.defaultValue;
      } else {
        // we just set the variable to a new config request
        newConfig[extractPoint.variableName] = await configRequest(
          // the source value is the value inside this newConfig if there's one
          typeof newConfig[extractPoint.variableName] !== "undefined" ? newConfig[extractPoint.variableName] : null,
          // the message is null because we already showed it
          null,
          // the data we are extracting for
          extractPoint.extractData,
          // and we prefix with the current prefix plus the variable name and a dot
          variableNamePrefix + extractPoint.variableName + ".",
        );
      }
      // now for multiconfig or the keys of config or multiconfig
    } else if (extractPoint.type === "multiconfig") {
      console.log("\t" + extractPoint.message);
  
      if (extractPoint.preferUnfilled && await yesno("Would you rather leave the field untouched?")) {
        newConfig[extractPoint.variableName] =
        typeof newConfig[extractPoint.variableName] !== "undefined" ?
          newConfig[extractPoint.variableName] :
          extractPoint.defaultValue;
      } else {
        // if we don't have a current value
        if (!newConfig[extractPoint.variableName]) {
          // then the default will be nothing
          newConfig[extractPoint.variableName] = {};
        }

        // first we need to ask for a strarray for our multiconfig
        // keys
        const keys = await fieldRequest<string[]>(
          "strarray",
          // no message as we should have already shown one on top
          null,
          // the variable name as usual with the $key to say these are keys
          variableNamePrefix + extractPoint.variableName + "." + "[$key]",
          // our based on value is our current value
          Object.keys(newConfig[extractPoint.variableName]),
          // as well as our default
          Object.keys(newConfig[extractPoint.variableName]),
        );

        // now for every key we have added in these key list
        for (const key of keys) {
          console.log(colors.bgGreen("\t>") + " " + variableNamePrefix + extractPoint.variableName + "." + key);

          // we make a config request each
          newConfig[extractPoint.variableName][key] = await configRequest(
            // as you can see the source is what is inside of it right now
            typeof newConfig[extractPoint.variableName][key] !== "undefined" ? newConfig[extractPoint.variableName][key] : null,
            // the message is null because we already showed it
            null,
            // the data we are supposed to extract for each one of these
            extractPoint.extractData,
            // and a nice prefix
            variableNamePrefix + extractPoint.variableName + "." + key + ".",
          );
        }
      }
    } else {
      // otherwise it's a normal standard field
      newConfig[extractPoint.variableName] = await fieldRequest(
        // so if no type, it will be string
        extractPoint.type || "string",
        // the message we are using
        extractPoint.message,
        // the variable name thing
        variableNamePrefix + extractPoint.variableName,
        // and what value we are based on
        newConfig[extractPoint.variableName],
        // our default value
        extractPoint.defaultValue,
        // whether it's hidden
        extractPoint.hidden,
        // the validate function which passes what we have already collected
        (value) => extractPoint.validate ? extractPoint.validate(value, newConfig) : true,
        // and the option to nullify
        extractPoint.nullifyFalseValues,
      );
    }
  }

  // return this config
  return newConfig;
}

/**
 * Ask for confirmation given a message
 * @param question the question to ask
 * @returns a promise for a boolean
 */
export function confirm(question: string): Promise<boolean> {
  return (new Confirm(question)).run();
}
