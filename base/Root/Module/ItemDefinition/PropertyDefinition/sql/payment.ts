/**
 * Contains the sql and server side specific functions for the payment type
 *
 * @module
 */

import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLBtreeIndexableInfo, ISQLEqualInfo, ISQLSSCacheEqualInfo, ISQLSideEffectType } from "../types";
import { IPropertyDefinitionSupportedPaymentType, PaymentStatusType } from "../types/payment";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { IPropertyDefinitionSupportedCurrencyType } from "../types/currency";

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

/**
 * The selection for the payment in searches
 * @param arg 
 */
export function paymentSQLSelect(arg: ISQLArgInfo) {
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

  return {
    [arg.prefix + arg.id + "_TYPE"]: value.type,
    [arg.prefix + arg.id + "_AMOUNT"]: value.amount,
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

  return result;
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
  }

  // if we have a from search
  if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
    const fromArg = arg.args[fromName] as any as IPropertyDefinitionSupportedCurrencyType;
    arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_AMOUNT", ">=", fromArg.value);
    arg.whereBuilder.andWhereColumn(argPrefixPlusId + "_CURRENCY", fromArg.currency);
    searchedByIt = true;
  }

  // same here as we did with from, but with the to
  if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
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