/**
 * Contains graphql utlity functions that are used everywhere accross
 * the itemize app
 * 
 * @module
 */

import { IRQRequestFields, IRQValue } from "./rq-querier";

/**
 * Checks whether a subset is contained within other subset of
 * request fields or a value, preferably use against other request fields
 * @param requestFieldsSubset the request fields that is supposed to be a subset
 * @param requestFieldsOrValueMain the request fields or the value
 * @returns a boolean
 */
export function requestFieldsAreContained(
  requestFieldsSubset: IRQRequestFields,
  requestFieldsOrValueMain: IRQRequestFields | IRQValue,
): boolean {
  // if it's null, it's contained
  if (requestFieldsOrValueMain === null || requestFieldsSubset === null) {
    return true;
  }

  // otherwise the subset keys let's gt all the keys
  const subSetKeys = Object.keys(requestFieldsSubset);
  // as well as the main
  const mainKeys = Object.keys(requestFieldsOrValueMain);
  // if the lenght is different we already know it's not the case
  if (subSetKeys.length > mainKeys.length) {
    return false;
    // if the lenght is 0 we know it is the case
  } else if (subSetKeys.length === 0 && mainKeys.length === 0) {
    return true;
  }
  // otherwise we must manually check
  return subSetKeys.every((key) => {
    // if it is not set in the main value, as it is undefined
    // then we can assume it fails
    if (typeof requestFieldsOrValueMain[key] === "undefined") {
      return false;
    }

    // otherwise if the subkeys represent an object, we need to check that
    // it is included
    if (typeof requestFieldsSubset[key] === "object") {
      return requestFieldsAreContained(requestFieldsSubset[key], requestFieldsOrValueMain[key] as any);
    }
    // otherwise it is included
    return true;
  });
}

/**
 * Merges request fields or values together
 * @param gqlValueOrFieldsOverride the value that overrides
 * @param gqlValueOfFieldsOverriden the value that is overriden
 * @returns new merged request fields
 */
export function deepMerge(gqlValueOrFieldsOverride: any, gqlValueOfFieldsOverriden: any): any {
  // if our override is not an object or it's null
  if (typeof gqlValueOrFieldsOverride !== "object" || gqlValueOrFieldsOverride === null) {
    // we get the override
    return gqlValueOrFieldsOverride;
  } else if (Array.isArray(gqlValueOrFieldsOverride)) {
    // also if it's an array
    return gqlValueOrFieldsOverride;
  }

  // we build the new object that is the merge from the overriden
  // note that if the overriden is null, this will be an empty object
  const newObjMerge = {
    ...gqlValueOfFieldsOverriden,
  };

  // and now we loop
  Object.keys(gqlValueOrFieldsOverride).forEach((key) => {
    // and merge in each case
    if (newObjMerge[key]) {
      newObjMerge[key] = deepMerge(
        gqlValueOrFieldsOverride[key],
        newObjMerge[key],
      );
    } else {
      // or add if not there
      newObjMerge[key] = gqlValueOrFieldsOverride[key];
    }
  });

  // return it
  return newObjMerge;
}

/**
 * When requesting fields the DATA can be there, so it needs to be flattened
 * into the flattened form without the DATA but all data free
 * @param recievedFields the recieved fields or value
 */
export function flattenRawGQLValueOrFields(fieldsOrValue: IRQValue | IRQRequestFields) {
  if (!fieldsOrValue) {
    return fieldsOrValue;
  }
  // so first we extract the data content
  const output = {
    ...((fieldsOrValue as any).DATA || {}),
  };
  // and then we loop for everything else, but data
  Object.keys(fieldsOrValue).forEach((key) => {
    if (key !== "DATA") {
      output[key] = fieldsOrValue[key];
    }
  });
  // return that
  return output;
}
