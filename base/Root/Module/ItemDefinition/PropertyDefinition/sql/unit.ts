/**
 * This file provides the sql functionality for the unit type
 * 
 * @module
 */

import {
  ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLBtreeIndexableInfo,
  ISQLEqualInfo, ISQLSSCacheEqualInfo, IElasticSearchInfo, IArgInfo
} from "../types";
import { IPropertyDefinitionSupportedUnitType } from "../types/unit";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { MAX_DECIMAL_COUNT } from "../../../../../../constants";

/**
 * The unit sql function that specifies the schema
 * @param arg the sql arg info
 * @returns a patial row definition
 */
export function unitSQL(arg: ISQLArgInfo) {
  return {
    [arg.prefix + arg.id + "_VALUE"]: {
      type: "REAL",
    },
    [arg.prefix + arg.id + "_UNIT"]: {
      type: "TEXT",
    },
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
      type: "REAL",
    },
    [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: {
      type: "TEXT",
    },
  };
}

export function unitElastic(arg: ISQLArgInfo) {
  return {
    properties: {
      [arg.prefix + arg.id + "_VALUE"]: {
        enabled: false,
      },
      [arg.prefix + arg.id + "_UNIT"]: {
        enabled: false,
      },
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
        type: "float",
      },
      [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: {
        type: "keyword",
        // we are using the unit because for example normalized
        // values of eg. celcius can be negative
        // THIS IS AN INVALID UNIT TYPE SO IT CAN BE USED
        null_value: "NULL",
      },
    }
  };
}

/**
 * the selection function for unit based elements
 * @param arg the arg
 */
export function unitSQLSelect(arg: IArgInfo) {
  return [
    arg.prefix + arg.id + "_VALUE",
    arg.prefix + arg.id + "_UNIT",
    arg.prefix + arg.id + "_NORMALIZED_VALUE",
    arg.prefix + arg.id + "_NORMALIZED_UNIT",
  ];
}

/**
 * Specifies how units are to be sql in
 * @param arg the sql in arg info
 * @returns a partial row value
 */
export function unitSQLIn(arg: ISQLInInfo) {
  if (arg.value === null) {
    return {
      [arg.prefix + arg.id + "_VALUE"]: null,
      [arg.prefix + arg.id + "_UNIT"]: null,
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
      [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: null,
    };
  }

  // javascript undefined problem forces me to do this double check because it will not
  // trigger an error if the data is corrupted because javascript is javascript and will
  // do anything in its might to succeed even with corrupted data because javascript
  if (arg.value !== null) {
    if (typeof arg.value === "undefined") {
      throw new Error("Invalid unit for SQL IN in must not be undefined in " + arg.property.getId());
    }

    if (
      typeof (arg.value as IPropertyDefinitionSupportedUnitType).normalizedUnit !== "string"
    ) {
      throw new Error("Invalid unit for SQL IN in " + JSON.stringify(arg.value) + " not valid normalizedUnit property");
    }

    if (
      typeof (arg.value as IPropertyDefinitionSupportedUnitType).normalizedValue !== "number"
    ) {
      throw new Error("Invalid unit for SQL IN in " + JSON.stringify(arg.value) + " not valid normalizedValue property");
    }

    if (
      typeof (arg.value as IPropertyDefinitionSupportedUnitType).value !== "number"
    ) {
      throw new Error("Invalid unit for SQL IN in " + JSON.stringify(arg.value) + " not valid value property");
    }

    if (
      typeof (arg.value as IPropertyDefinitionSupportedUnitType).unit !== "string"
    ) {
      throw new Error("Invalid unit for SQL IN in " + JSON.stringify(arg.value) + " not valid unit property");
    }
  }

  const value = arg.value as IPropertyDefinitionSupportedUnitType;
  let roundedValue = value.value;
  let roundedNormValue = value.normalizedValue;

  let maxDecimalCount = arg.property.getMaxDecimalCount();
  if (maxDecimalCount > MAX_DECIMAL_COUNT) {
    maxDecimalCount = MAX_DECIMAL_COUNT;
  }

  const decimalCount = (roundedValue.toString().split(".")[1] || "").length;
  if (decimalCount > maxDecimalCount) {
    roundedValue = Math.round(roundedValue * (10 ** maxDecimalCount)) / (10 ** maxDecimalCount);
  }

  const decimalNormCount = (roundedNormValue.toString().split(".")[1] || "").length;
  if (decimalNormCount > maxDecimalCount) {
    roundedNormValue = Math.round(roundedNormValue * (10 ** maxDecimalCount)) / (10 ** maxDecimalCount);
  }

  return {
    [arg.prefix + arg.id + "_VALUE"]: roundedValue,
    [arg.prefix + arg.id + "_UNIT"]: value.unit,
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: roundedNormValue,
    [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
  };
}

/**
 * Specifies how units are to be outputted from a raw row
 * @param arg the sql out arg info
 * @returns a supported unit type (or null)
 */
export function unitSQLOut(arg: ISQLOutInfo) {
  const result: IPropertyDefinitionSupportedUnitType = {
    value: arg.row[arg.prefix + arg.id + "_VALUE"],
    unit: arg.row[arg.prefix + arg.id + "_UNIT"],
    normalizedValue: arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"],
    normalizedUnit: arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"],
  };
  if (result.value === null) {
    return null;
  }

  let maxDecimalCount = arg.property.getMaxDecimalCount();
  if (maxDecimalCount > MAX_DECIMAL_COUNT) {
    maxDecimalCount = MAX_DECIMAL_COUNT;
  }

  const decimalCount = (result.value.toString().split(".")[1] || "").length;
  if (decimalCount > maxDecimalCount) {
    result.value = Math.round(result.value * (10 ** maxDecimalCount)) / (10 ** maxDecimalCount);
  }

  const decimalNormCount = (result.normalizedValue.toString().split(".")[1] || "").length;
  if (decimalNormCount > maxDecimalCount) {
    result.normalizedValue = Math.round(result.normalizedValue * (10 ** maxDecimalCount)) / (10 ** maxDecimalCount);
  }

  return result;
}

/**
 * Specifies how units are to be outputted from a raw row
 * @param arg the sql out arg info
 * @returns a supported unit type (or null)
 */
export function unitSQLElasticIn(arg: ISQLOutInfo) {
  return {
    [arg.prefix + arg.id + "_VALUE"]: arg.row[arg.prefix + arg.id + "_VALUE"],
    [arg.prefix + arg.id + "_UNIT"]: arg.row[arg.prefix + arg.id + "_UNIT"],
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"],
    [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"],
  };
}

/**
 * Specifies how units are to be searched by
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
export function unitSQLSearch(arg: ISQLSearchInfo) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
  let searchedByIt = false;

  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    const exactAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[exactName] as any;
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_UNIT", exactAsUnit.normalizedUnit);
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", exactAsUnit.normalizedValue);
    searchedByIt = true;
  } else if (arg.args[exactName] === null) {
    arg.whereBuilder.andWhereColumnNull(arg.prefix + arg.id + "_NORMALIZED_VALUE");
    searchedByIt = true;
  }

  if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
    const fromAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[fromName] as any;
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_UNIT", fromAsUnit.normalizedUnit);
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", fromAsUnit.normalizedValue);
    searchedByIt = true;
  }

  if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
    const toAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[toName] as any;
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_UNIT", toAsUnit.normalizedUnit);
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", toAsUnit.normalizedValue);
    searchedByIt = true;
  }

  return searchedByIt;
}

/**
 * The standard function that build queries for the property
 * @param arg the search info arg
 * @returns a boolean on whether it was searched by it
 */
export function unitElasticSearch(arg: IElasticSearchInfo) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
  let searchedByIt: boolean = false;

  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    const exactAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[exactName] as any;
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: exactAsUnit.normalizedUnit,
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: exactAsUnit.normalizedValue,
    }, {
      boost: arg.boost,
      groupId: exactName,
      propertyId: arg.prefix + arg.id,
    });
    searchedByIt = true;
  } else if (arg.args[exactName] === null) {
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: "",
    }, {
      boost: arg.boost,
      groupId: exactName,
      propertyId: arg.prefix + arg.id,
    });
    searchedByIt = true;
  }

  const hasToDefined = typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null;
  const hasFromDefined = typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null;

  if (hasToDefined || hasFromDefined) {
    const rule: any = {};
    let unitToUse: string = null;
    let unitToUse2: string = null;
    if (hasFromDefined) {
      const fromAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[fromName] as any;
      rule.gte = fromAsUnit.normalizedValue;
      unitToUse = fromAsUnit.normalizedUnit;
    }
    if (hasToDefined) {
      const toAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[toName] as any;
      rule.lte = toAsUnit.normalizedValue;
      if (!unitToUse) {
        unitToUse = toAsUnit.normalizedUnit;
      } else {
        unitToUse2 = toAsUnit.normalizedUnit;
      }
    }
    arg.elasticQueryBuilder.must({
      range: {
        [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: rule,
      },
      term: {
        [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: unitToUse,
      }
    }, {
      boost: arg.boost,
      groupId: "RANGE_" + arg.prefix + arg.id,
      propertyId: arg.prefix + arg.id,
    });
    // should fail this is weird
    // two different units somehow, comparing grams to liters? or what
    if (unitToUse2 && unitToUse !== unitToUse2) {
      arg.elasticQueryBuilder.mustTerm({
        [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: unitToUse2,
      }, {
        groupId: "RANGE_" + arg.prefix + arg.id,
        propertyId: arg.prefix + arg.id,
      });
    }
    searchedByIt = true;
  }

  return searchedByIt ? {} : null;
}

/**
 * Specifies how units are to be ordered by
 * @param arg the sql order by info arg
 * @returns the three string order by rule
 */
export function unitSQLOrderBy(arg: ISQLOrderByInfo): [string, string, string] {
  return [arg.prefix + arg.id + "_NORMALIZED_VALUE", arg.direction, arg.nulls];
}

/**
 * Specifies how units are to be ordered by
 * @param arg the sql order by info arg
 * @returns the three string order by rule
 */
export function unitElasticOrderBy(arg: ISQLOrderByInfo) {
  return {
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: arg.direction,
  }
}


/**
 * Specifies how units are to be btree indexed to accelerate searches
 * @param arg the sql btree indexable info arg
 * @returns the rows to be btree indexed
 */
export function unitSQLBtreeIndexable(arg: ISQLBtreeIndexableInfo) {
  return [arg.prefix + arg.id + "_NORMALIZED_UNIT", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
}

/**
 * Specifies how units are to be compared for equality in the database
 * @param arg the sql equal arg info
 * @returns a partial row comparison
 */
export function unitSQLEqual(arg: ISQLEqualInfo) {
  arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_UNIT", (arg.value as IPropertyDefinitionSupportedUnitType).normalizedUnit);
  arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", (arg.value as IPropertyDefinitionSupportedUnitType).normalizedValue);
}

/**
 * Specifies how units are to be compared for equality in the cache
 * @param arg the sql ss equal arg info
 * @returns a boolean on whether the equality succeed or not
 */
export function unitSQLSSCacheEqual(arg: ISQLSSCacheEqualInfo) {
  if (arg.value === null) {
    return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === null;
  }
  const value = arg.value as IPropertyDefinitionSupportedUnitType;
  return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === value.normalizedValue &&
    arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"] === value.normalizedUnit;
}