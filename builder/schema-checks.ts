/**
 * This file specifies how schema checks are ran against json sources
 * in order to validate schemas using ajv
 *
 * @packageDocumentation
 */

import Ajv from "ajv";
import RootSchema from "../base/Root/schema";
import ItemDefinitionSchema from "../base/Root/Module/ItemDefinition/schema";
import ModuleSchema from "../base/Root/Module/schema";
import CheckUpError from "./Error";
import Traceback from "./Traceback";
import "source-map-support/register";
import { rawSensitiveConfigSchema, rawConfigSchema,
  rawDBConfigSchema, rawRedisConfigSchema } from "../config";

const ajv = new Ajv();

/**
 * Checks a root schema
 */
export const checkRootSchemaValidate =
  ajv.compile(RootSchema);

/**
 * Checks an item definition schema
 */
export const checkItemDefinitionSchemaValidate =
  ajv.compile(ItemDefinitionSchema);

/**
 * Checks a property definition array schema
 */
export const checkPropertyDefinitionArraySchemaValidate =
  ajv.compile({
    type: "array",
    items: {
      $ref: "ItemDefinition#/definitions/PropertyDefinition",
    },
  });

/**
 * Checks a module
 */
export const checkModuleSchemaValidate =
  ajv.compile(ModuleSchema);

/**
 * Check the partial sensitive configuration
 */
export const checkSensitiveConfig =
  ajv.compile(rawSensitiveConfigSchema);

/**
 * Check the partial config (non-sensitive)
 */
export const checkConfig =
  ajv.compile(rawConfigSchema);

/**
 * Check raw database config
 */
export const checkDBConfig =
  ajv.compile(rawDBConfigSchema);

/**
 * Check redis config
 */
export const checkRedisConfig =
  ajv.compile(rawRedisConfigSchema);

/**
 * Runs a given ajv check function of the ones avaliable
 * in this list against a schema and ensures to populate traceback
 * values
 * @param fn the function to run
 * @param rawData the raw data to validate against
 * @param traceback the traceback to throw errors to
 */
export function ajvCheck(
  fn: Ajv.ValidateFunction,
  rawData: any,
  traceback: Traceback,
) {
  // let's check if it's valid
  const valid = fn(rawData);

  // if not valid throw the errors
  if (!valid) {
    // let's use only the first error
    const firstError = fn.errors[0];
    // and now try to find where it messed up
    let actualTraceback = traceback;
    // if we have a data path
    if (firstError.dataPath) {
      // then let's split it using this magic schema, basically
      // we want to get rid of all the [0][1].hello[2].stuff[1].kinda and
      // turn it into [0.1.hello.2.stuff.1.kinda since ajv consistently
      // returns numbers into brackets, note how the first bracket isn't removed
      const splittedPath = firstError.dataPath
        .replace(/\]\.|\]\[|\]$/g, ".").split(/\[|\./g);
      // so now we get in
      let pathLocation: string;
      // and start looping
      for (pathLocation of splittedPath) {
        // if there's no path location aka empty string
        if (!pathLocation) {
          // continue, this happens with the lone bracket
          continue;
        }
        // otherwise let's check if it's a valid type
        if ((/^[a-zA-Z0-9_-]+$/).test(pathLocation)) {
          // and trace
          actualTraceback = actualTraceback.newTraceToBit(pathLocation);
        } else {
          // otherwise return, something has messed up
          break;
        }
      }
    }

    // now we get in here for additional properties if there is one ajv returns
    // an additional property sometimes
    const additionalProperty = (firstError.params as any).additionalProperty;
    // and we trace to it
    if (additionalProperty) {
      actualTraceback =
        actualTraceback.newTraceToBit(additionalProperty);
    }
    // throw the error
    throw new CheckUpError(
      "Schema check fail, " + firstError.message,
      actualTraceback,
    );
  }
}
