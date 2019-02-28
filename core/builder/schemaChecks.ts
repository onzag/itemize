import * as Ajv from 'ajv';
import Root from '../base/Root';
import ItemDefinition from '../base/ItemDefinition';
import Module from '../base/Module';
import { Traceback, CheckUpError } from './Error';
const ajv = new Ajv();

export const checkRootSchemaValidate =
  ajv.compile(Root.schema);
export const checkItemDefinitionSchemaValidate =
  ajv.compile(ItemDefinition.schema);
export const checkPropertyDefinitionArraySchemaValidate =
  ajv.compile({
    type: "array",
    items: {
      $ref: 'ItemDefinition#/definitions/PropertyDefinition'
    }
  });
export const checkModuleSchemaValidate =
  ajv.compile(Module.schema);
export function ajvCheck(
  fn: Ajv.ValidateFunction,
  rawData: any,
  traceback: Traceback
){
  let valid = fn(rawData);

  //if not valid throw the errors
  if (!valid) {
    let firstError = fn.errors[0];
    let actualTraceback = traceback;
    if (firstError.dataPath){
      let splittedPath = firstError.dataPath
        .replace(/\]\.|\]\[|\]$/g, '.').split(/\[|\./g);
      let pathLocation:string;
      for (pathLocation of splittedPath){
        if (!pathLocation){
          continue;
        }
        if ((/^[a-zA-Z0-9_-]+$/).test(pathLocation)){
          actualTraceback = actualTraceback.newTraceToBit(pathLocation);
        } else {
          break;
        }
      }
    }
    let additionalProperty = (firstError.params as any).additionalProperty;
    if (additionalProperty){
      actualTraceback =
        actualTraceback.newTraceToBit(additionalProperty);
    }
    throw new CheckUpError(
      "Schema check fail, " + firstError.message,
      actualTraceback
    );
  };
}
