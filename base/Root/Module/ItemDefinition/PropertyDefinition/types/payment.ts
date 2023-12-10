/**
 * Contains the payment type description that should be fullfilled
 * by a payment provider resource
 *
 * @module
 */

import {
  IPropertyDefinitionSupportedType,
} from ".";
import { PropertyInvalidReason } from "..";
import {
  MAX_SUPPORTED_REAL,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  INCLUDE_PREFIX,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { paymentSQLSideEffect, paymentSQL, paymentSQLBtreeIndexable, paymentSQLEqual, paymentSQLIn, paymentSQLOut, paymentSQLSearch, paymentSQLSelect, paymentSQLSSCacheEqual, paymentSQLPreSideEffect, paymentSQLElasticIn, paymentElasticSearch, paymentElastic } from "../sql/payment";
import { currencies } from "../../../../../../imported-resources";

export enum PaymentStatusType {
  PENDING = "pending",
  PAID = "paid",
  DISPUTED = "disputed",
  REVERSED = "reversed",
  INACTIVE = "inactive",
  ACTIVE = "active",
}

export const paymentStatusesArr = ["pending", "paid", "disputed", "reversed", "inactive", "active"];
export const paymentTypesArr = ["invoice", "refund", "subscription-monthly", "subscription-daily", "subscription-yearly"];
export const paymentAllowedStatuses = {
  invoice: [
    PaymentStatusType.PENDING,
    PaymentStatusType.PAID,
    PaymentStatusType.DISPUTED,
    PaymentStatusType.REVERSED,
  ],
  refund: [
    PaymentStatusType.PENDING,
    PaymentStatusType.PAID,
  ],
  subscription: [
    PaymentStatusType.PENDING,
    PaymentStatusType.ACTIVE,
    PaymentStatusType.INACTIVE,
  ],
};

/**
 * The currency definition is described by an object
 */
export interface IPropertyDefinitionSupportedPaymentType {
  type: "invoice" | "refund" | "subscription-monthly" | "subscription-daily" | "subscription-yearly";
  amount: number;
  currency: string;
  status: PaymentStatusType;
  metadata?: string;
  rometadata?: string;
}

/**
 * The type of a curreny type specifies how it behaves in the app
 */
const typeValue: IPropertyDefinitionSupportedType<IPropertyDefinitionSupportedPaymentType> = {
  rq: {
    type: "object",
    stdFields: {
      type: {
        type: "string",
        required: true,
        values: paymentTypesArr,
      },
      amount: {
        type: "number",
        required: true,
      },
      currency: {
        type: "string",
        required: true,
      },
      status: {
        type: "string",
        required: true,
        values: paymentStatusesArr,
      },
      metadata: {
        type: "string",
      },
      rometadata: {
        type: "string",
      },
      target: {
        type: "string",
      },
    },
  },

  // from the sql file to save space as they are not
  // used in the client side
  sql: paymentSQL,
  elastic: paymentElastic,
  sqlSelect: paymentSQLSelect,
  sqlIn: paymentSQLIn,
  sqlOut: paymentSQLOut,
  sqlElasticIn: paymentSQLElasticIn,
  sqlSearch: paymentSQLSearch,
  elasticSearch: paymentElasticSearch,
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: null,
  elasticSort: null,
  sqlBtreeIndexable: paymentSQLBtreeIndexable,
  sqlMantenience: null,
  sqlEqual: paymentSQLEqual,
  sqlSSCacheEqual: paymentSQLSSCacheEqual,
  sqlSideEffect: paymentSQLSideEffect,
  sqlPreSideEffect: paymentSQLPreSideEffect,

  supportedSubtypes: paymentTypesArr.concat(["subscription"]),

  // local order by used in the cached searches
  localOrderBy: null,
  localSearch: (arg) => {
    // item is deleted
    if (!arg.rqValue) {
      return false;
    }
    // item is blocked
    if (!arg.rqValue.DATA === null) {
      return false;
    }

    const argPrefixPlusId = arg.prefix + arg.id;

    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + argPrefixPlusId;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + argPrefixPlusId;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + argPrefixPlusId;
    const paymentTypeName = PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_TYPE + argPrefixPlusId;
    const paymentStatusName = PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_STATUS + argPrefixPlusId;

    const includeId = arg.include ? arg.include.getId() : null;
    const usefulArgs = includeId ? arg.args[INCLUDE_PREFIX + includeId] || {} : arg.args;

    const propertyValue: IPropertyDefinitionSupportedPaymentType =
      includeId ? arg.rqValue.DATA[includeId][arg.id] : arg.rqValue.DATA[arg.id];

    if (
      typeof usefulArgs[exactName] !== "undefined" ||
      typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null ||
      typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null ||
      typeof usefulArgs[paymentTypeName] !== "undefined" && usefulArgs[paymentTypeName] !== null ||
      typeof usefulArgs[paymentStatusName] !== "undefined" && usefulArgs[paymentStatusName] !== null
    ) {
      if (typeof propertyValue === "undefined") {
        console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
        return false;
      }

      const conditions: boolean[] = [];
      if (typeof usefulArgs[exactName] !== "undefined") {
        if (usefulArgs[exactName] === null) {
          conditions.push(
            propertyValue.amount === null,
          );
        } else {
          conditions.push(
            propertyValue.amount === usefulArgs[exactName].amount &&
            propertyValue.currency === usefulArgs[exactName].currency,
          );
        }
      }

      if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
        conditions.push(
          propertyValue.currency === usefulArgs[fromName].currency &&
          propertyValue.amount >= usefulArgs[fromName].amount
        );
      }

      if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
        conditions.push(
          propertyValue.currency === usefulArgs[toName].currency &&
          propertyValue.amount <= usefulArgs[toName].amount
        );
      }

      if (typeof usefulArgs[paymentTypeName] !== "undefined" && usefulArgs[paymentTypeName] !== null) {
        conditions.push(
          propertyValue.type === usefulArgs[paymentTypeName].type
        );
      }

      if (typeof usefulArgs[paymentStatusName] !== "undefined" && usefulArgs[paymentStatusName] !== null) {
        conditions.push(
          propertyValue.status === usefulArgs[paymentStatusName].status
        );
      }

      if (!conditions.length) {
        return true;
      } else {
        return conditions.every((c) => c);
      }
    } else {
      return true;
    }
  },
  localEqual: (arg) => {
    if (arg.a === null && arg.b === null) {
      return true;
    }

    return false;
  },
  validate: (l: IPropertyDefinitionSupportedPaymentType, p) => {
    if (
      typeof l.amount !== "number" ||
      typeof l.currency !== "string" ||
      !paymentStatusesArr.includes(l.status) ||
      !paymentTypesArr.includes(l.type) ||
      (typeof l.metadata !== "string" && l.metadata !== null) ||
      (typeof l.rometadata !== "string" && l.rometadata !== null)
    ) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (p.subtype && p.subtype.indexOf(l.type) !== 0) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    const typeRef = l.type.split("-")[0];
    const allowedStatuses = paymentAllowedStatuses[typeRef];

    if (!allowedStatuses.includes(l.status)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (isNaN(l.amount)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    let maxValue = MAX_SUPPORTED_REAL;
    let minValue = 0;

    if (l.amount >= maxValue) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (l.amount < minValue) {
      return PropertyInvalidReason.TOO_SMALL;
    }
    const currencyData = currencies[l.currency];

    if (!currencyData) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    const splittedDecimals = l.amount.toString().split(".");
    const currencyDefinitionDecimals = currencyData.decimals;
    if (!splittedDecimals[1] || splittedDecimals[1].length <= currencyDefinitionDecimals) {
      return null;
    }

    return PropertyInvalidReason.TOO_MANY_DECIMALS;
  },

  // it is searchable
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.PAYMENT,

  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: [
      "search.payment.status.label",
      "search.payment.status.placeholder",
      "search.payment.type.label",
      "search.payment.type.placeholder",
    ],
    searchOptional: [
      "search.payment.status.description",
      "search.payment.type.description",
    ],
    searchRange: [
      "search.payment.from.label",
      "search.payment.to.label",
      "search.payment.from.placeholder",
      "search.payment.to.placeholder",
    ],
    searchRangeOptional: [
      "search.payment.from.description",
      "search.payment.to.description",
    ],
    searchRangeDisabled: [
      "search.payment.exact.label",
      "search.payment.exact.placeholder",
    ],
    searchRangeDisabledOptional: [
      "search.payment.exact.description",
    ],
    tooLargeErrorInclude: true,
    tooSmallErrorInclude: true,
    tooManyDecimalsErrorInclude: true,
  },
};
export default typeValue;
