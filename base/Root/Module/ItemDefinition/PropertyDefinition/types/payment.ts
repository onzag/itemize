/**
 * Contains the payment type description that should be fullfilled
 * by a payment provider resource
 *
 * @module
 */

import {
  IPropertyDefinitionSupportedType,
} from ".";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
import { PropertyInvalidReason } from "..";
import {
  MAX_SUPPORTED_REAL,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
  INCLUDE_PREFIX,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { paymentSQLSideEffect, paymentSQL, paymentSQLBtreeIndexable, paymentSQLEqual, paymentSQLIn, paymentSQLOut, paymentSQLSearch, paymentSQLSelect, paymentSQLSSCacheEqual, paymentSQLPreSideEffect } from "../sql/payment";
import { currencies } from "../../../../../../imported-resources";

export enum PaymentStatusType {
  WAIT = "wait",
  PAID = "paid",
  DISPUTED = "disputed",
  REFUNDED = "refunded",
  INACTIVE = "inactive",
  ACTIVE = "active",
}

export const paymentStatusesArr = ["wait", "paid", "disputed", "refunded", "inactive", "active"];
export const paymentTypesArr = ["invoice", "refund", "subscription-monthly", "subscription-daily", "subscription-yearly"];

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
  // the graphql is a new type
  gql: "PROPERTY_TYPE__Payment",
  // it contains the following fields, note how they
  // are conditional due to the fact this goes to the client side as well
  gqlFields: {
    type: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
    amount: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLFloat),
    },
    currency: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
    status: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
    metadata: {
      type: GraphQLString,
    },
    rometadata: {
      type: GraphQLString,
    },
    target: {
      type: GraphQLString,
    },
  },

  // from the sql file to save space as they are not
  // used in the client side
  sql: paymentSQL,
  sqlSelect: paymentSQLSelect,
  sqlIn: paymentSQLIn,
  sqlOut: paymentSQLOut,
  sqlSearch: paymentSQLSearch,
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: null,
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
    if (!arg.gqlValue) {
      return false;
    }
    // item is blocked
    if (!arg.gqlValue.DATA === null) {
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
      includeId ? arg.gqlValue.DATA[includeId][arg.id] : arg.gqlValue.DATA[arg.id];

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
      (typeof l.rometadata !== "string" && l.metadata !== null)
    ) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (p.subtype && p.subtype.indexOf(l.type) !== 0) {
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
    if (!splittedDecimals[1] ||
      splittedDecimals[1].length <= currencyDefinitionDecimals) {
      if (currencyData.rounding && !Number.isInteger((l.amount * 10 ** 2) / (currencyData.rounding * 10 ** 2))) {
        return PropertyInvalidReason.INVALID_VALUE;
      }
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
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    searchRange: CLASSIC_SEARCH_RANGED_I18N,
    searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
    tooSmallErrorInclude: true,
    tooManyDecimalsErrorInclude: true,
  },
};
export default typeValue;
