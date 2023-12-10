/**
 * This file contains helper local functions that are used against
 * rq values in order to perform local searches as if it was
 * running in the server side, these tend to run in the IndexedDB
 * database
 *
 * @module
 */

import { PropertyDefinitionSearchInterfacesPrefixes } from "./search-interfaces";
import { INCLUDE_PREFIX } from "../../../../../constants";
import Moment from "moment";
import { ILocalSearchInfo } from "./types";

/**
 * Performs a local search of an exact and ranged search for
 * a property value
 * @param arg the local search arg info
 * @returns a boolean on whether it matches
 */
export function standardLocalSearchExactAndRange(arg: ILocalSearchInfo) {
  // item is deleted
  if (!arg.rqValue) {
    return false;
  }
  // item is blocked
  if (arg.rqValue.DATA === null) {
    return false;
  }

  // now we get the names according to the interface
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;

  // the args come as a whole so we need to extract what we are using in the search mode
  const usefulArgs = arg.include ? arg.args[INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;

  if (
    typeof usefulArgs[exactName] !== "undefined" ||
    typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null ||
    typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null
  ) {
    // the property value also comes from the value as a whole, the value is not
    // flattened
    const propertyValue = arg.include ? arg.rqValue.DATA[arg.include.getId()][arg.id] : arg.rqValue.DATA[arg.id];

    if (typeof propertyValue === "undefined") {
      console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
      return false;
    }

    // now we check each condition
    const conditions: boolean[] = [];
    if (typeof usefulArgs[exactName] !== "undefined") {
      conditions.push(propertyValue === usefulArgs[exactName]);
    }

    // if from and to are equal we will try to do an exact search
    let alreadyUsedTo = false;
    if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
      if (usefulArgs[toName] === usefulArgs[fromName]) {
        alreadyUsedTo = true;
        conditions.push(propertyValue === usefulArgs[fromName]);
      } else {
        conditions.push(propertyValue >= usefulArgs[fromName]);
      }
    }

    if (!alreadyUsedTo && typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
      conditions.push(propertyValue <= usefulArgs[toName]);
    }

    // if no conditions applied this means the property matches by default
    if (!conditions.length) {
      return true;
    } else {
      // if not we check that every single condition works
      return conditions.every((c) => c);
    }
  } else {
    return true;
  }
}

/**
 * Runs the same as the standard sql search exact and range but using the date
 * functionality
 * @param format the format either DATE_FORMAT TIME_FORMAT or DATETIME_FORMAT
 * @param arg the local search arg info
 * @returns a boolean on whether it matches
 */
export function dateLocalSearchExactAndRange(
  format: string,
  arg: ILocalSearchInfo
) {
  // item is deleted
  if (!arg.rqValue) {
    return false;
  }
  // item is blocked
  if (arg.rqValue.DATA === null) {
    return false;
  }

  // we get the names just as we did standard before
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.id;

  // now the useful args again
  const usefulArgs = arg.include ? arg.args[INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;

  if (
    typeof usefulArgs[exactName] !== "undefined" ||
    typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null ||
    typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null
  ) {

    // now we use moment to parse our string value
    const propertyValue = arg.include ? arg.rqValue.DATA[arg.include.getId()][arg.id] : arg.rqValue.DATA[arg.id];

    if (typeof propertyValue === "undefined") {
      console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
      return false;
    }

    const propertyValueMoment = Moment(propertyValue);

    // and get the conditions
    const conditions: boolean[] = [];
    if (typeof usefulArgs[exactName] !== "undefined") {
      if (usefulArgs[exactName] === null) {
        conditions.push(propertyValue === null);
      } else {
        // we use moment in each of these conditions
        const exactComparedValueMoment = Moment(usefulArgs[exactName], format);
        conditions.push(propertyValueMoment.isSame(exactComparedValueMoment));
      }
    }

    if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
      const fromComparedValueMoment = Moment(usefulArgs[fromName], format);
      conditions.push(propertyValueMoment.isSameOrAfter(fromComparedValueMoment));
    }

    if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
      const toComparedValueMoment = Moment(usefulArgs[toName], format);
      conditions.push(propertyValueMoment.isSameOrBefore(toComparedValueMoment));
    }

    // and just as before
    if (!conditions.length) {
      return true;
    } else {
      return conditions.every((c) => c);
    }
  } else {
    return true;
  }
}
