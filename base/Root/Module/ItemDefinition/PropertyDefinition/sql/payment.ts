/**
 * Contains the sql and server side specific functions for the payment type
 *
 * @module
 */

import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLBtreeIndexableInfo, ISQLEqualInfo, ISQLSSCacheEqualInfo, ISQLSideEffectType, IElasticSearchInfo, IArgInfo } from "../types";
import { IPropertyDefinitionSupportedPaymentType, paymentStatusesArr, PaymentStatusType, paymentTypesArr } from "../types/payment";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { IPropertyDefinitionSupportedCurrencyType } from "../types/currency";
import { arrCurrencies, currencies } from "../../../../../../imported-resources";

// based on the payment provider status to event
// need to clone it because of circular dependencies
// as usual
const statusToEvents = {
  "active": "ACTIVE",
  "inactive": "INACTIVE",
  "disputed": "DISPUTED",
  "paid": "PAID",
  "reversed": "REVERSED",
  "pending": "PENDING",
}

/**
 * the sql function that setups the fields for the payment element
 * @param arg the sql argumnent
 * @returns a partial row definition
 */
export function paymentSQL(arg: ISQLArgInfo) {
  return {
    [arg.prefix + arg.id + "_TYPE"]: { type: "TEXT" },
    [arg.prefix + arg.id + "_AMOUNT"]: { type: "NUMERIC" },
    [arg.prefix + arg.id + "_CURRENCY"]: { type: "TEXT" },
    [arg.prefix + arg.id + "_STATUS"]: { type: "TEXT" },
    [arg.prefix + arg.id + "_METADATA"]: { type: "TEXT" },
    [arg.prefix + arg.id + "_RO_METADATA"]: { type: "TEXT" },
    [arg.prefix + arg.id + "_HIDDEN_METADATA"]: { type: "TEXT" },
  };
}

export function paymentElastic(arg: ISQLArgInfo) {
  return {
    properties: {
      [arg.prefix + arg.id + "_TYPE"]: {
        type: "keyword",

        // This is an invalid type for payment so it works fine
        null_value: "NULL",
      },
      [arg.prefix + arg.id + "_AMOUNT"]: {
        type: "float",
      },
      [arg.prefix + arg.id + "_CURRENCY"]: {
        type: "keyword",
      },
      [arg.prefix + arg.id + "_STATUS"]: {
        type: "keyword",
      },
      [arg.prefix + arg.id + "_METADATA"]: {
        enabled: false,
      },
      [arg.prefix + arg.id + "_RO_METADATA"]: {
        enabled: false,
      },
    },
  };
}

/**
 * The selection for the payment in searches
 * @param arg 
 */
export function paymentSQLSelect(arg: IArgInfo) {
  return [
    arg.prefix + arg.id + "_TYPE",
    arg.prefix + arg.id + "_AMOUNT",
    arg.prefix + arg.id + "_CURRENCY",
    arg.prefix + arg.id + "_STATUS",
    arg.prefix + arg.id + "_METADATA",
    arg.prefix + arg.id + "_RO_METADATA",
  ];
}

/**
 * The selection for the payment hidden metadata, only truly used
 * by the provider
 * @param prefix
 * @param id property id
 */
export function paymentSQLHiddenMetadataRow(prefix: string, id: string) {
  return prefix + id + "_HIDDEN_METADATA";
}

/**
 * The sql in function for the payment
 * @param arg the sql in info argument
 * @returns a partial row
 */
export function paymentSQLIn(arg: ISQLInInfo) {
  // so we get our value we are trying to input in the row for the arg
  const value: IPropertyDefinitionSupportedPaymentType = arg.value as IPropertyDefinitionSupportedPaymentType;
  // if this value is null
  if (arg.value === null) {
    return {
      [arg.prefix + arg.id + "_TYPE"]: null,
      [arg.prefix + arg.id + "_AMOUNT"]: null,
      [arg.prefix + arg.id + "_CURRENCY"]: null,
      [arg.prefix + arg.id + "_STATUS"]: null,
      [arg.prefix + arg.id + "_METADATA"]: null,
      [arg.prefix + arg.id + "_RO_METADATA"]: null,
    };
  }

  // javascript undefined problem forces me to do this double check because it will not
  // trigger an error if the data is corrupted because javascript is javascript and will
  // do anything in its might to succeed even with corrupted data because javascript
  if (value !== null) {
    if (typeof value === "undefined") {
      throw new Error("Invalid payment for SQL IN in must not be undefined in " + arg.property.getId());
    }

    if (
      typeof value.amount !== "number"
    ) {
      throw new Error("Invalid payment for SQL IN in " + JSON.stringify(arg.value) + " not valid amount property");
    }

    if (
      typeof value.currency !== "string" ||
      !arrCurrencies.find((c) => c.code !== value.currency)
    ) {
      throw new Error("Invalid payment for SQL IN in " + JSON.stringify(arg.value) + " not valid currency property");
    }

    if (
      value.metadata &&
      typeof value.metadata !== "string"
    ) {
      throw new Error("Invalid payment for SQL IN in " + JSON.stringify(arg.value) + " not valid metadata property");
    }

    if (
      value.rometadata &&
      typeof value.rometadata !== "string"
    ) {
      throw new Error("Invalid payment for SQL IN in " + JSON.stringify(arg.value) + " not valid rometadata property");
    }

    if (
      !paymentStatusesArr.includes(value.status)
    ) {
      throw new Error("Invalid payment for SQL IN in " + JSON.stringify(arg.value) + " not valid status property");
    }

    if (
      !paymentTypesArr.includes(value.type)
    ) {
      throw new Error("Invalid payment for SQL IN in " + JSON.stringify(arg.value) + " not valid type property");
    }
  }

  let roundedAmount = value.amount;
  let maxDecimalCount = ((currencies[value.currency] && currencies[value.currency].decimals) || 2);
  if (maxDecimalCount > arg.property.getMaxDecimalCount()) {
    maxDecimalCount = arg.property.getMaxDecimalCount();
  }

  const decimalCount = (roundedAmount.toString().split(".")[1] || "").length;
  if (decimalCount > maxDecimalCount) {
    roundedAmount = Math.round(roundedAmount * (10 ** maxDecimalCount)) / (10 ** maxDecimalCount);
  }

  return {
    [arg.prefix + arg.id + "_TYPE"]: value.type,
    [arg.prefix + arg.id + "_AMOUNT"]: roundedAmount,
    [arg.prefix + arg.id + "_CURRENCY"]: value.currency,
    [arg.prefix + arg.id + "_STATUS"]: value.status,
    [arg.prefix + arg.id + "_METADATA"]: value.metadata || null,
    [arg.prefix + arg.id + "_RO_METADATA"]: value.rometadata || null,
  };
}

/**
 * The sql out function
 * @param arg the argument out info
 * @returns a property definition supported payment type (or null)
 */
export function paymentSQLOut(arg: ISQLOutInfo) {
  const amount = arg.row[arg.prefix + arg.id + "_AMOUNT"];
  if (amount === null) {
    if (!arg.property.isNullable()) {
      return (arg.property.getDefaultValue() as any) || {
        type: "invoice",
        amount: 0,
        currency: "EUR",
        status: PaymentStatusType.PAID,
        metadata: null,
        rometadata: null,
      };
    }
    return null;
  }

  // so our results depends on the row we are getting
  const result: IPropertyDefinitionSupportedPaymentType = {
    type: arg.row[arg.prefix + arg.id + "_TYPE"],
    // we need to use parse float here because numeric gives string
    // in output, which is wrong
    amount: parseFloat(amount),
    currency: arg.row[arg.prefix + arg.id + "_CURRENCY"],
    status: arg.row[arg.prefix + arg.id + "_STATUS"],
    metadata: arg.row[arg.prefix + arg.id + "_METADATA"] || null,
    rometadata: arg.row[arg.prefix + arg.id + "_RO_METADATA"] || null,
  };

  let maxDecimalCount = ((currencies[result.currency] && currencies[result.currency].decimals) || 2);
  if (maxDecimalCount > arg.property.getMaxDecimalCount()) {
    maxDecimalCount = arg.property.getMaxDecimalCount();
  }

  const decimalCount = (result.amount.toString().split(".")[1] || "").length;
  if (decimalCount > maxDecimalCount) {
    result.amount = Math.round(result.amount * (10 ** maxDecimalCount)) / (10 ** maxDecimalCount);
  }

  return result;
}

export function paymentSQLElasticIn(arg: ISQLOutInfo) {
  return {
    [arg.prefix + arg.id + "_TYPE"]: arg.row[arg.prefix + arg.id + "_TYPE"],
    [arg.prefix + arg.id + "_AMOUNT"]: [arg.prefix + arg.id + "_AMOUNT"],
    [arg.prefix + arg.id + "_CURRENCY"]: arg.row[arg.prefix + arg.id + "_CURRENCY"],
    [arg.prefix + arg.id + "_STATUS"]: arg.row[arg.prefix + arg.id + "_STATUS"],
    [arg.prefix + arg.id + "_METADATA"]: arg.row[arg.prefix + arg.id + "_METADATA"],
    [arg.prefix + arg.id + "_RO_METADATA"]: arg.row[arg.prefix + arg.id + "_RO_METADATA"],
  };
}

/**
 * Searching for payment values
 * @param arg the argument search info
 * @returns a boolean on whether it's searched by it or not
 */
export function paymentSQLSearch(arg: ISQLSearchInfo) {
  const argPrefixPlusId = arg.prefix + arg.id;

  // first we need to get the arguments
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + argPrefixPlusId;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + argPrefixPlusId;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + argPrefixPlusId;
  const paymentTypeName = PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_TYPE + argPrefixPlusId;
  const paymentStatusName = PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_STATUS + argPrefixPlusId;

  // now if we are searching by it
  let searchedByIt = false;

  // if we have an exact search
  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    const exactArg = arg.args[exactName] as any as IPropertyDefinitionSupportedCurrencyType;
    // we just match it as it is
    arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_CURRENCY", exactArg.currency);
    arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_AMOUNT", exactArg.value);
    searchedByIt = true;
  } else if (arg.args[exactName] === null) {
    arg.whereBuilder.andWhereColumnNull(argPrefixPlusId + "_AMOUNT");
    searchedByIt = true;
  }

  // if we have a from search
  let alreadyUsedTo = false;
  if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
    const fromArg = arg.args[fromName] as any as IPropertyDefinitionSupportedCurrencyType;
    const toArg = arg.args[toName] as any as IPropertyDefinitionSupportedCurrencyType;
    if (toArg && fromArg.currency === toArg.currency && fromArg.value === toArg.value) {
      alreadyUsedTo = true;
      arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_CURRENCY", fromArg.currency);
      arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_AMOUNT", fromArg.value);
    } else {
      arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_AMOUNT", ">=", fromArg.value);
      arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_CURRENCY", fromArg.currency);
    }
    searchedByIt = true;
  }

  // same here as we did with from, but with the to
  if (!alreadyUsedTo && typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
    const toArg = arg.args[toName] as any as IPropertyDefinitionSupportedCurrencyType;
    arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_AMOUNT", "<=", toArg.value);
    arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_CURRENCY", toArg.currency);
    searchedByIt = true;
  }

  if (typeof arg.args[paymentTypeName] !== "undefined" && arg.args[paymentTypeName] !== null) {
    arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_TYPE", arg.args[paymentTypeName] as string);
    searchedByIt = true;
  }

  if (typeof arg.args[paymentStatusName] !== "undefined" && arg.args[paymentStatusName] !== null) {
    arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_STATUS", arg.args[paymentStatusName] as string);
    searchedByIt = true;
  }

  // now we return if we have been searched by it at the end
  return searchedByIt;
}

/**
 * Searching for payment values
 * @param arg the argument search info
 * @returns a boolean on whether it's searched by it or not
 */
export function paymentElasticSearch(arg: IElasticSearchInfo) {
  const argPrefixPlusId = arg.prefix + arg.id;

  const mustRule: any = {};

  // first we need to get the arguments
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + argPrefixPlusId;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + argPrefixPlusId;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + argPrefixPlusId;
  const paymentTypeName = PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_TYPE + argPrefixPlusId;
  const paymentStatusName = PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_STATUS + argPrefixPlusId;

  // now if we are searching by it
  let searchedByIt = false;

  // if we have an exact search
  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    const exactArg = arg.args[exactName] as any as IPropertyDefinitionSupportedCurrencyType;
    // we just match it as it is
    mustRule.bool = {
      must: [
        {
          term: {
            [argPrefixPlusId + "_AMOUNT"]: exactArg.value,
            [argPrefixPlusId + "_CURRENCY"]: exactArg.currency,
          }
        }
      ]
    };
    searchedByIt = true;
  } else if (arg.args[exactName] === null) {
    mustRule.bool = {
      must: [
        {
          term: {
            [argPrefixPlusId + "_TYPE"]: "",
          }
        }
      ]
    };
    searchedByIt = true;
  }

  const hasToDefined = typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null;
  const hasFromDefined = typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null;

  if (hasToDefined || hasFromDefined) {
    const fromArg = arg.args[fromName] as any as IPropertyDefinitionSupportedCurrencyType;
    const toArg = arg.args[toName] as any as IPropertyDefinitionSupportedCurrencyType;
    if (fromArg.value === toArg.value && fromArg.currency === toArg.currency) {
      mustRule.bool = {
        must: [
          {
            term: {
              [argPrefixPlusId + "_AMOUNT"]: fromArg.value,
              [argPrefixPlusId + "_CURRENCY"]: fromArg.currency,
            }
          }
        ]
      };
    } else {
      const rule: any = {};
      let currencyToUse: string = null;
      let currencyToUse2: string = null;
      if (hasFromDefined) {
        rule.gte = fromArg.value;
        currencyToUse = fromArg.currency;
      }
      if (hasToDefined) {
        rule.lte = toArg.value;
        if (!currencyToUse) {
          currencyToUse = toArg.currency;
        } else {
          currencyToUse2 = toArg.currency;
        }
      }

      if (!mustRule.bool) {
        mustRule.bool = {};
      }

      if (!mustRule.bool.must) {
        mustRule.bool.must = [];
      }

      mustRule.bool.must.push(
        {
          range: {
            [arg.prefix + arg.id + "_AMOUNT"]: rule,
          },
          term: {
            // should fail this is weird
            // payments are not allowed to be requested on different currencies nor stored as such
            [arg.prefix + arg.id + "_CURRENCY"]: currencyToUse2 && currencyToUse !== currencyToUse2 ? "" : currencyToUse,
          }
        }
      );
    }

    searchedByIt = true;
  }

  if (typeof arg.args[paymentTypeName] !== "undefined" && arg.args[paymentTypeName] !== null) {
    if (!mustRule.bool) {
      mustRule.bool = {};
    }

    if (!mustRule.bool.must) {
      mustRule.bool.must = [];
    }

    mustRule.bool.must.push({
      term: {
        [argPrefixPlusId + "_TYPE"]: arg.args[paymentTypeName] as string,
      }
    });
    searchedByIt = true;
  }

  if (typeof arg.args[paymentStatusName] !== "undefined" && arg.args[paymentStatusName] !== null) {
    if (!mustRule.bool) {
      mustRule.bool = {};
    }

    if (!mustRule.bool.must) {
      mustRule.bool.must = [];
    }

    mustRule.bool.must.push({
      term: {
        [argPrefixPlusId + "_STATUS"]: arg.args[paymentStatusName] as string,
      }
    });

    searchedByIt = true;
  }

  if (Object.keys(mustRule).length > 0) {
    arg.elasticQueryBuilder.must(mustRule, {
      boost: arg.boost,
      groupId: "PAYMENT_SEARCH_" + arg.prefix + arg.id,
      propertyId: arg.prefix + arg.id,
    });
  }

  // now we return if we have been searched by it at the end
  return searchedByIt ? {} : null;
}

/**
 * The btree indexable used in searches
 * @param arg the arg for the btree indexable options
 * @returns the columns to index
 */
export function paymentSQLBtreeIndexable(arg: ISQLBtreeIndexableInfo) {
  // we index the currency column and the value column
  return [arg.prefix + arg.id + "_CURRENCY", arg.prefix + arg.id + "_AMOUNT"];
}

/**
 * How to consider equality with a value
 * @param arg the argument to check equality against
 */
export function paymentSQLEqual(arg: ISQLEqualInfo) {
  // can't be done, every payment is unique on its own, only nulls can be checked
  // payment objects can't be compared
  if (!arg.value) {
    arg.whereBuilder.andWhereColumnNull(arg.prefix + arg.id + "_AMOUNT");
  } else {
    arg.whereBuilder.andWhere("FALSE");
  }
}

/**
 * How to check equality with a value using the cache
 * @param arg the argument to check against
 * @returns a boolean
 */
export function paymentSQLSSCacheEqual(arg: ISQLSSCacheEqualInfo) {
  if (arg.value === null) {
    return arg.row[arg.prefix + arg.id + "_AMOUNT"] === null;
  }
  return false;
}

/**
 * Provides a side effect that triggers once a payment status changes, it's created, destroyed
 * or comes into existance, this is the standard type server side effect that occurs when
 * graphql does things to it, and this will trigger what is necessary to  it
 * @param arg 
 */
export function paymentSQLSideEffect(arg: ISQLSideEffectType<IPropertyDefinitionSupportedPaymentType>) {
  // we only care if the value is different on its own
  // this is a cheap check
  if (arg.originalValue !== arg.newValue) {

    // now let's build these fields
    let ev: any;
    let ev2: any;
    let originalStatus: PaymentStatusType;

    // we have a new value but no original (aka it was created)
    // this could be by many things, either the endpoint add was used
    // or it was created on its own
    if (arg.newValue && !arg.originalValue) {
      ev = "CREATED";
      ev2 = statusToEvents[arg.newValue.status];
      originalStatus = null;

      // we have no payment object now but there used to be
      // one originally aka it was destroyed, either by a modification
      // or by a delete action
    } else if (arg.originalValue && !arg.newValue) {
      ev = "DESTROYED";
      originalStatus = arg.originalValue.status;
      // the status differ from each other
    } else if (arg.newValue.status !== arg.originalValue.status) {
      ev = statusToEvents[arg.newValue.status];
      originalStatus = arg.originalValue.status;
    } else {
      // something odd, maybe other changes, the value, etc...
      return;
    }

    // let's grab the hidden metadata based on the new row value
    const hiddenMetadataRow = paymentSQLHiddenMetadataRow(arg.prefix, arg.id);
    const hiddenMetadataValue = arg.newRowValue[hiddenMetadataRow] as string;

    // our module
    const mod = arg.itemDefinition.getParentModule();
    const eventArg = {
      item: arg.itemDefinition,
      module: mod,
      originalMetadata: arg.originalValue && arg.originalValue.metadata,
      originalSQLData: arg.originalRowValue,
      originalStatus,
      property: arg.property,
      uuid: arg.appData.paymentService.getUUIDFor({
        version: arg.rowVersion,
        id: arg.rowId,
        item: arg.itemDefinition,
        module: mod,
        property: arg.property,
        include: arg.include,
      } as any),
      version: arg.rowVersion,
      id: arg.rowId,
    };

    (async () => {
      // now we can trigger the event
      const newHiddenMetadataValue = await arg.appData.paymentService.triggerEvent(
        ev,
        arg.newValue,
        hiddenMetadataValue,

        // we need to build all this complex object for the event
        eventArg,
      );

      if (ev2) {
        arg.appData.paymentService.triggerEvent(
          ev2,
          arg.newValue,
          newHiddenMetadataValue,

          // we need to build all this complex object for the event
          eventArg,
        );
      }
    })();
  }
}

/**
 * Provides a side effect that triggers once a payment status changes, it's created, destroyed
 * or comes into existance, this is the standard type server side effect that occurs when
 * graphql does things to it, and this will trigger what is necessary to  it
 * @param arg 
 */
export function paymentSQLPreSideEffect(arg: ISQLSideEffectType<IPropertyDefinitionSupportedPaymentType>) {
  if (!arg.originalValue) {
    if (arg.newValue.rometadata) {
      return "Setting up read only metadata is not allowed";
    }

    return;
  }

  if (arg.newValue && arg.originalValue.rometadata !== arg.newValue.rometadata) {
    return "Modifying read only metadata is not allowed";
  }
}