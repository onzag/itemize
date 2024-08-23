/**
 * Builds the search mode of a property definition that is used within
 * the search module for used within searches, basically this is an alternative
 * item definition and alternative property that is used during searches
 *
 * @module
 */

import PropertyDefinition, { IPropertyDefinitionRawJSONDataType, PropertyInvalidReason } from ".";
import {
  PropertyDefinitionSearchInterfacesType,
  PropertyDefinitionSearchInterfacesPrefixes,
} from "./search-interfaces";
import { buildSearchModeConditionalRuleSet } from "../ConditionalRuleSet/search-mode";
import { IConditionalRuleSetRawJSONDataPropertyType } from "../ConditionalRuleSet";
import { paymentStatusesArr, paymentTypesArr } from "./types/payment";
import { Ii18NType } from "../../../../Root";

export interface IValueForLimiterRule {
  searchProperty: string;
  against: string;
  strategy: "GIVEN_VALUE_SHOULD_BE_CONTAINED_IN_POTENTIAL_VALUES" | "GIVEN_VALUE_SHOULD_BE_A_SUBSET_OF_POTENTIAL_VALUES";
}

export function getValuesStrategyForLimiters(rawData: IPropertyDefinitionRawJSONDataType): IValueForLimiterRule[] {
  // we need the description
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];

  // values not allowed in complex types
  if (propertyDefinitionDescription.rq.type === "object") {
    return null;
  }

  if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT
  ) {
    return [
      {
        searchProperty: PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id,
        strategy: "GIVEN_VALUE_SHOULD_BE_CONTAINED_IN_POTENTIAL_VALUES",
        against: rawData.id,
      }
    ]
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    if (rawData.disableRangedSearch) {
      return [
        {
          searchProperty: PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id,
          strategy: "GIVEN_VALUE_SHOULD_BE_CONTAINED_IN_POTENTIAL_VALUES",
          against: rawData.id,
        }
      ]
    } else {
      return null;
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.TEXT ||
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.TAGS
  ) {
    return null;
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.STRING
  ) {
    return [
      {
        searchProperty: PropertyDefinitionSearchInterfacesPrefixes.SEARCH + rawData.id,
        strategy: "GIVEN_VALUE_SHOULD_BE_CONTAINED_IN_POTENTIAL_VALUES",
        against: rawData.id,
      },
      {
        searchProperty: PropertyDefinitionSearchInterfacesPrefixes.IN + rawData.id,
        strategy: "GIVEN_VALUE_SHOULD_BE_A_SUBSET_OF_POTENTIAL_VALUES",
        against: rawData.id,
      }
    ]
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS
  ) {
    return null;
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.PAYMENT
  ) {
    return null;
  }

  return null;
}

/**
 * Specifies the list of properties that there should be at least
 * during a limited request for a property that is request limited
 * 
 * @param rawData 
 * @returns 
 */
export function getConversionIdsForCheckingAgainstLimiters(
  rawData: IPropertyDefinitionRawJSONDataType
): string[][] {
  // we need the description
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];
  if (
    !propertyDefinitionDescription.searchable ||
    (
      typeof rawData.searchable !== "undefined" &&
      !rawData.searchable
    )
  ) {
    // return empty array if it's not searchable or search level is disabled
    return [];
  }

  // for a search only property it has no conversion ids
  if (rawData.searchOnlyProperty) {
    return [[rawData.id]];
  }

  let ids: string[][] = [];
  if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT
  ) {
    ids = [[PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id]];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    if (rawData.disableRangedSearch) {
      ids = [[PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id]];
    } else {
      ids = [
        [PropertyDefinitionSearchInterfacesPrefixes.FROM + rawData.id],
        [PropertyDefinitionSearchInterfacesPrefixes.TO + rawData.id],
      ];
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.TEXT ||
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.TAGS
  ) {
    ids = [[PropertyDefinitionSearchInterfacesPrefixes.SEARCH + rawData.id]];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.STRING
  ) {
    ids = [
      [PropertyDefinitionSearchInterfacesPrefixes.SEARCH + rawData.id],
      [PropertyDefinitionSearchInterfacesPrefixes.IN + rawData.id],
    ];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS
  ) {
    ids = [
      [PropertyDefinitionSearchInterfacesPrefixes.LOCATION + rawData.id, PropertyDefinitionSearchInterfacesPrefixes.RADIUS + rawData.id],
    ];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.PAYMENT
  ) {
    if (rawData.disableRangedSearch) {
      ids = [
        [
          PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id,
          PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_STATUS + rawData.id,
          PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_TYPE + rawData.id
        ],
      ];
    } else {
      ids = [
        [
          PropertyDefinitionSearchInterfacesPrefixes.FROM + rawData.id,
          PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_STATUS + rawData.id,
          PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_TYPE + rawData.id
        ],
        [
          PropertyDefinitionSearchInterfacesPrefixes.TO + rawData.id,
          PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_STATUS + rawData.id,
          PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_TYPE + rawData.id
        ],
      ];
    }
  }
  return ids;
}

/**
 * Provides all the ids that a property would be referred to in search mode
 * @param rawData the raw property
 * @param noConflict in search mode when used some of these search ways can be conflicting with each other
 * used only in case of string, when you can use SEARCH or IN, but both are conflicting and shouldn't be used together
 * this is used mainly for usability
 * @returns an array of string for the ids in search mode for the property
 */
export function getConversionIds(
  rawData: IPropertyDefinitionRawJSONDataType,
  noConflict?: boolean,
): string[] {
  // we need the description
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];
  if (
    !propertyDefinitionDescription.searchable ||
    (
      typeof rawData.searchable !== "undefined" &&
      !rawData.searchable
    )
  ) {
    // return empty array if it's not searchable or search level is disabled
    return [];
  }

  // for a search only property it has no conversion ids
  if (rawData.searchOnlyProperty) {
    return [rawData.id];
  }

  // we get the ids, check out how `buildSearchModePropertyDefinitions` does
  // this literally reflects that
  let ids = [rawData.id];
  if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT
  ) {
    ids = [PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    if (rawData.disableRangedSearch) {
      ids = [PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id];
    } else {
      ids = [
        PropertyDefinitionSearchInterfacesPrefixes.FROM + rawData.id,
        PropertyDefinitionSearchInterfacesPrefixes.TO + rawData.id,
      ];
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.TEXT ||
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.TAGS
  ) {
    ids = [PropertyDefinitionSearchInterfacesPrefixes.SEARCH + rawData.id];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.STRING
  ) {
    ids = noConflict ? [
      PropertyDefinitionSearchInterfacesPrefixes.SEARCH + rawData.id,
    ] :
      [
        PropertyDefinitionSearchInterfacesPrefixes.SEARCH + rawData.id,
        PropertyDefinitionSearchInterfacesPrefixes.IN + rawData.id,
      ];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS
  ) {
    ids = [
      PropertyDefinitionSearchInterfacesPrefixes.LOCATION + rawData.id,
      PropertyDefinitionSearchInterfacesPrefixes.RADIUS + rawData.id,
    ];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.PAYMENT
  ) {
    if (rawData.disableRangedSearch) {
      ids = [
        PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id
      ];
    } else {
      ids = [
        PropertyDefinitionSearchInterfacesPrefixes.FROM + rawData.id,
        PropertyDefinitionSearchInterfacesPrefixes.TO + rawData.id,
      ];
    }

    ids = ids.concat([
      PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_STATUS + rawData.id,
      PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_TYPE + rawData.id,
    ]);
  }
  return ids;
}

export function buildSearchModePaymentProperty(
  newPropDef: IPropertyDefinitionRawJSONDataType,
  rootI8nData: Ii18NType,
): IPropertyDefinitionRawJSONDataType[] {
  newPropDef.type = "currency";

  // can't use the default because it was made for payment
  delete newPropDef.default;
  delete newPropDef.defaultIf;

  // can't use enforced value nor values because they were made for
  // the payment
  delete newPropDef.enforcedValue;
  delete newPropDef.enforcedValues;
  delete newPropDef.hiddenIfEnforced;

  // just in case
  delete newPropDef.max;
  delete newPropDef.min;

  const newPropDefPaymentStatus: IPropertyDefinitionRawJSONDataType = {
    ...newPropDef,
    id: PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_STATUS + newPropDef.id,
    type: "string",
    values: paymentStatusesArr,
  };
  if (newPropDefPaymentStatus.i18nData) {
    newPropDefPaymentStatus.i18nData = displaceI18NData(newPropDef.i18nData, ["search", "payment", "status"]);

    displaceAndStoreI18NRootFieldsData(rootI8nData, ["any"], newPropDefPaymentStatus.i18nData, ["null_value"]);
    paymentStatusesArr.forEach((t) => {
      displaceAndStoreI18NRootFieldsData(rootI8nData, ["payment", t], newPropDefPaymentStatus.i18nData, ["values", t]);
    });
  }

  const newPropDefPaymentType: IPropertyDefinitionRawJSONDataType = {
    ...newPropDef,
    id: PropertyDefinitionSearchInterfacesPrefixes.PAYMENT_TYPE + newPropDef.id,
    type: "string",
    values: paymentTypesArr,
  };
  if (newPropDefPaymentType.i18nData) {
    newPropDefPaymentType.i18nData = displaceI18NData(newPropDef.i18nData, ["search", "payment", "type"]);

    displaceAndStoreI18NRootFieldsData(rootI8nData, ["any"], newPropDefPaymentType.i18nData, ["null_value"]);
    paymentTypesArr.forEach((t) => {
      displaceAndStoreI18NRootFieldsData(rootI8nData, ["payment", t], newPropDefPaymentType.i18nData, ["values", t]);
    });
  }

  // this is created for the TO value when we are using a range
  // by default
  let newPropDef2: IPropertyDefinitionRawJSONDataType = null;

  if (newPropDef.disableRangedSearch) {
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.EXACT + newPropDef.id;
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search", "payment", "exact"]);
    }

    // Otherwise we need the secondary, for the range
  } else {
    // we make a copy of the original
    newPropDef2 = { ...newPropDef };

    // set the ids, as FROM and TO
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.FROM + newPropDef.id;
    newPropDef2.id = PropertyDefinitionSearchInterfacesPrefixes.TO + newPropDef2.id;

    // the condition goes if the FROM is greater than the TO
    const newPropDefInvalidIfRule: IConditionalRuleSetRawJSONDataPropertyType = {
      property: "&this",
      comparator: "greater-than",
      value: {
        property: newPropDef2.id,
      },
    };

    // because we are using a currency type, the attribute that we use for comparison
    // is the value
    newPropDefInvalidIfRule.attribute = "value";
    newPropDefInvalidIfRule.valueAttribute = "value";

    // we need some invalid conditions we are adding to the invalid if set
    newPropDef.invalidIf = newPropDef.invalidIf || [];
    newPropDef.invalidIf.push({
      error: PropertyInvalidReason.FROM_LARGER_THAN_TO,
      if: newPropDefInvalidIfRule,
    });

    // now we do the same but in reverse, this time for the second
    newPropDef2.invalidIf = newPropDef2.invalidIf || [];
    const newPropDef2InvalidIfRule: IConditionalRuleSetRawJSONDataPropertyType = {
      property: "&this",
      comparator: "less-than",
      value: {
        property: newPropDef.id,
      },
    };

    newPropDef2InvalidIfRule.attribute = "value";
    newPropDef2InvalidIfRule.valueAttribute = "value";

    newPropDef2.invalidIf.push({
      error: PropertyInvalidReason.TO_SMALLER_THAN_FROM,
      if: newPropDef2InvalidIfRule,
    });

    // now we displace the i18ndata from the search.payment.from
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search", "payment", "from"]);
    }

    // and the search.payment.to
    if (newPropDef2.i18nData) {
      newPropDef2.i18nData = displaceI18NData(newPropDef2.i18nData, ["search", "payment", "to"]);
    }
  }

  return newPropDef2 ? [
    newPropDef,
    newPropDef2,
    newPropDefPaymentStatus,
    newPropDefPaymentType,
  ] : [
    newPropDef,
    newPropDefPaymentStatus,
    newPropDefPaymentType,
  ];
}

/**
 * Builds a property definition to its search mode
 * @param rawData the raw property definition source
 * @param otherKnownProperties the object with the other known properties that this one can see
 * @param rootI8nData the root i18n data
 * @returns an array of property definitions
 */
export function buildSearchModePropertyDefinitions(
  rawData: IPropertyDefinitionRawJSONDataType,
  otherKnownProperties: { [id: string]: IPropertyDefinitionRawJSONDataType },
  rootI8nData: Ii18NType,
): IPropertyDefinitionRawJSONDataType[] {
  // so we need the description from the standard
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];
  // if it's not searchable by definition, or the search level is set to disabled, we return an empty array
  if (
    !propertyDefinitionDescription.searchable ||
    (
      typeof rawData.searchable !== "undefined" &&
      !rawData.searchable
    )
  ) {
    return [];
  }

  // the search mode of a search only property
  // is of course itself
  if (rawData.searchOnlyProperty) {
    return [rawData];
  }

  // we create the new property definition via copy
  const newPropDef = { ...rawData };
  newPropDef.nullable = true;

  // Disable search level for any of its children
  // Just because this is the search level it doesn't make
  // sense to go deeper
  newPropDef.searchable = false;

  // unnecessary because the search names may be quite short because we are searching
  // affects string, text and whatnot
  delete newPropDef.minLength;

  // search mode cannot coerce nulls into default
  if (newPropDef.coerceNullsIntoDefaultAfterSubmit) {
    newPropDef.coerceNullsIntoDefaultAfterSubmit = false;
  }

  // full text changes to a simple string tex tfield
  if (newPropDef.type === "text") {
    newPropDef.type = "string";
    newPropDef.subtype = "search";
  }

  // use the search default instead of the standard default
  if (typeof newPropDef.searchDefault !== "undefined") {
    newPropDef.default = newPropDef.searchDefault;
  }

  // the default if condition, we need to process
  if (newPropDef.searchDefaultIf || newPropDef.defaultIf) {
    // so since it has values and conditions (and the value is raw)
    newPropDef.defaultIf = (newPropDef.searchDefaultIf || newPropDef.defaultIf).map((di) => {
      return {
        value: di.value,
        if: buildSearchModeConditionalRuleSet(di.if, otherKnownProperties),
      };
    }).filter((di) => di.if);

    // if we end up with nothing, we delete it, some conditions might be dead ends
    // for example if a property is not searchable and the condition uses that property
    // it completely kills the condition
    if (!newPropDef.defaultIf.length) {
      delete newPropDef.defaultIf;
    }
  }

  // we do that too with enforced values, same process
  if (newPropDef.enforcedValues) {
    newPropDef.enforcedValues = (newPropDef.searchEnforcedValues || newPropDef.enforcedValues).map((ev) => {
      return {
        value: ev.value,
        if: buildSearchModeConditionalRuleSet(ev.if, otherKnownProperties),
      };
    }).filter((ev) => ev.if);
    if (!newPropDef.enforcedValues.length) {
      delete newPropDef.enforcedValues;
    }
  }

  if (newPropDef.searchEnforcedValue) {
    newPropDef.enforcedValue = newPropDef.searchEnforcedValue;
  }

  if (typeof newPropDef.searchHidden !== "undefined") {
    newPropDef.hidden = newPropDef.searchHidden;
  }

  // also with hidden if, kinda, since it's a single condition
  if (newPropDef.searchHiddenIf || newPropDef.hiddenIf) {
    newPropDef.hiddenIf = buildSearchModeConditionalRuleSet(newPropDef.searchHiddenIf || newPropDef.hiddenIf, otherKnownProperties);
    if (!newPropDef.hiddenIf) {
      delete newPropDef.hiddenIf;
    }
  }

  // invalid if gets the same treatment
  if (newPropDef.searchInvalidIf || newPropDef.invalidIf) {
    newPropDef.invalidIf = (newPropDef.searchInvalidIf || newPropDef.invalidIf).map((ii) => {
      return {
        error: ii.error,
        if: buildSearchModeConditionalRuleSet(ii.if, otherKnownProperties),
      };
    }).filter((ii) => ii.if);
    if (!newPropDef.invalidIf.length) {
      delete newPropDef.invalidIf;
    }
  }

  // Ok so now we have our main property processed, but that's not enough
  // we need to work out a secondary property if it's necessary, we create it
  // and set it to null to start with
  let newPropDef2: IPropertyDefinitionRawJSONDataType = null;

  // so if our search interface is exact, then we actually don't need 2
  if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT
  ) {
    // we set the original id to EXACT
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.EXACT + newPropDef.id;
    // and extract and displace the i18ndata from the search (everything in search becomes main)
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }

    // Now here if we have exact and range
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    // with disable ranged search we basically do the same as exact on top
    if (rawData.disableRangedSearch) {
      newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.EXACT + newPropDef.id;
      if (newPropDef.i18nData) {
        newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
      }

      // Otherwise we need the secondary, for the range
    } else {
      // we make a copy of the original
      newPropDef2 = { ...newPropDef };
      // delete its default, as only the original gets a default
      delete newPropDef2.default;
      delete newPropDef2.defaultIf;

      // set the ids, as FROM and TO
      newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.FROM + newPropDef.id;
      newPropDef2.id = PropertyDefinitionSearchInterfacesPrefixes.TO + newPropDef2.id;

      // set the comparison method as datetime if its one of those kinds
      const method = rawData.type === "date" || rawData.type === "datetime" || rawData.type === "time" ?
        "datetime" : null;
      // and set the attribute to value if we have currency type
      const attribute = rawData.type === "currency" ? "value" : null;

      // the condition goes if the FROM is greater than the TO
      const newPropDefInvalidIfRule: IConditionalRuleSetRawJSONDataPropertyType = {
        property: "&this",
        comparator: "greater-than",
        value: {
          property: newPropDef2.id,
        },
      };
      // we use the method if we got one
      if (method) {
        newPropDefInvalidIfRule.method = method;
      }
      // and we set the attribute if we got one, note it goes for both
      // the property itself and the value result, as they are both of the same type
      if (attribute) {
        newPropDefInvalidIfRule.attribute = attribute;
        newPropDefInvalidIfRule.valueAttribute = attribute;
      }

      // we need some invalid conditions we are adding to the invalid if set
      newPropDef.invalidIf = newPropDef.invalidIf || [];
      newPropDef.invalidIf.push({
        error: PropertyInvalidReason.FROM_LARGER_THAN_TO,
        if: newPropDefInvalidIfRule,
      });

      // now we do the same but in reverse, this time for the second
      newPropDef2.invalidIf = newPropDef2.invalidIf || [];
      const newPropDef2InvalidIfRule: IConditionalRuleSetRawJSONDataPropertyType = {
        property: "&this",
        comparator: "less-than",
        value: {
          property: newPropDef.id,
        },
      };
      if (method) {
        newPropDef2InvalidIfRule.method = method;
      }
      if (attribute) {
        newPropDef2InvalidIfRule.attribute = attribute;
        newPropDef2InvalidIfRule.valueAttribute = attribute;
      }
      newPropDef2.invalidIf.push({
        error: PropertyInvalidReason.TO_SMALLER_THAN_FROM,
        if: newPropDef2InvalidIfRule,
      });

      // now we displace the i18ndata from the search.range.from
      if (newPropDef.i18nData) {
        newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search", "range", "from"]);
      }

      // and the search.range.to
      if (newPropDef2.i18nData) {
        newPropDef2.i18nData = displaceI18NData(newPropDef2.i18nData, ["search", "range", "to"]);
      }
    }

    // Full text search is similar to the exact mode, except it uses SEARCH as the handle
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.TEXT ||
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.TAGS
  ) {
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + newPropDef.id;
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.STRING
  ) {
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + newPropDef.id;
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }

    newPropDef2 = {
      ...newPropDef,
      type: "taglist",
      subtype: rawData.values ? null : "arbitrary",
      id: PropertyDefinitionSearchInterfacesPrefixes.IN + rawData.id,
    }

    if (newPropDef2.default) {
      newPropDef2.default = [newPropDef2.default] as any;
    }

    if (newPropDef2.defaultIf) {
      newPropDef2.defaultIf = newPropDef2.defaultIf.map((c) => {
        return {
          ...c,
          value: [c.value] as any,
        }
      });
    }

    if (newPropDef2.enforcedValue) {
      newPropDef2.enforcedValue = [newPropDef2.enforcedValue] as any;
    }

    if (newPropDef2.enforcedValues) {
      newPropDef2.enforcedValues = newPropDef2.enforcedValues.map((c) => {
        return {
          ...c,
          value: [c.value] as any,
        }
      });
    }

    // location radius is fancy
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS
  ) {
    // our second property definition is totally brand new
    // and it's an unit, of subtype lenght, id RADIUS handle,
    // the minimum is 1, without decimals, and we set the special
    // properties to set how it would behave, notice how it supports
    // imperials, it initially prefills to 100, so 100km or 100mi
    // it ignores conversion as it's the prefill,
    // it locks units only to mi and km, so you cannot choose some
    // other lenght types
    newPropDef2 = {
      type: "unit",
      subtype: "length",
      id: PropertyDefinitionSearchInterfacesPrefixes.RADIUS + newPropDef.id,
      min: 1,
      maxDecimalCount: 2,
      max: (newPropDef.config && newPropDef.config["maxSearchRadius"]) as number || 1000,
      config: {
        unit: (newPropDef.config && newPropDef.config["searchRadiusUnit"]) as string || "km",
        imperialUnit: (newPropDef.config && newPropDef.config["searchRadiusImperialUnit"]) as string || "mi",
        lockUnitsToPrimaries: true,
        initialPrefill: (newPropDef.config && newPropDef.config["searchRadiusInitialPrefill"]) as number || 100,
      },
      nullable: true,
      invalidIf: [
        {
          error: PropertyInvalidReason.MUST_BE_SPECIFIED,
          if: {
            property: "&this",
            comparator: "equals",
            value: {
              exactValue: null,
            },
            gate: "and",
            condition: {
              property: PropertyDefinitionSearchInterfacesPrefixes.LOCATION + newPropDef.id,
              comparator: "not-equal",
              value: {
                exactValue: null,
              },
            },
          },
        }
      ],
      i18nData: displaceI18NData(newPropDef.i18nData, ["search", "radius"], (i18nData: any) => {
        return {
          error: {
            MUST_BE_SPECIFIED: i18nData.error && i18nData.error.RADIUS_MUST_BE_SPECIFIED,
            TOO_LARGE: i18nData.error && i18nData.error.RADIUS_TOO_LARGE,
            TOO_SMALL: i18nData.error && i18nData.error.RADIUS_TOO_SMALL,
            TOO_MANY_DECIMALS: i18nData.error && i18nData.error.RADIUS_TOO_MANY_DECIMALS,
            INVALID_VALUE: i18nData.error && i18nData.error.RADIUS_INVALID_VALUE,
          },
        };
      }),
    }

    if (newPropDef.hidden) {
      newPropDef2.hidden = true;
    }

    if (newPropDef.hiddenIf) {
      newPropDef2.hiddenIf = newPropDef.hiddenIf;
    }

    // decorate the default property
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + newPropDef.id;
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }
  }

  // we return both if we have both
  if (newPropDef2) {
    return [newPropDef, newPropDef2];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.PAYMENT
  ) {
    // The payment property can be rather complex in what it becomes
    // so we will use a separate function 
    return buildSearchModePaymentProperty(newPropDef, rootI8nData);
  }

  // or only one
  return [newPropDef];
}

/**
 * An utility to displace data from the i18n object, any
 * @param i18n the i18n root object
 * @param path the path we want to get the data from
 * @param storageI18n the target we want to store at
 * @param storagePath where we want it to be stored
 */
function displaceAndStoreI18NRootFieldsData(i18n: any, path: string[], storageI18n: any, storagePath: string[]) {
  // for each language we are supporting there
  Object.keys(i18n).forEach((language) => {
    if (!storageI18n[language]) {
      storageI18n[language] = {};
    }

    // now we loop inside the path
    let itemInQuestion = i18n[language];
    path.forEach((pbit) => {
      itemInQuestion = itemInQuestion[pbit];
    });

    if (itemInQuestion) {
      let storageInQuestion = storageI18n[language];
      storagePath.forEach((p, index) => {
        if (index === storagePath.length - 1) {
          storageInQuestion[p] = itemInQuestion;
        } else if (!storageInQuestion[p]) {
          storageInQuestion[p] = {};
          storageInQuestion = storageInQuestion[p];
        } else {
          storageInQuestion = storageInQuestion[p];
        }
      });
    }
  });
}

/**
 * An utility to displace data from the i18n object, any
 * @param i18n the i18n object
 * @param path the path we want to displace data from
 * @returns the new i18n object with data overwritten
 */
function displaceI18NData(i18n: any, path: string[], callback?: (i18nData: any) => any) {
  // make a copy
  const newI18n = { ...i18n };
  // for each language we are supporting there
  Object.keys(newI18n).forEach((language) => {
    // we make a copy
    newI18n[language] = { ...newI18n[language] };

    // now we loop inside the path
    let itemInQuestion = newI18n[language];
    path.forEach((pbit) => {
      itemInQuestion = itemInQuestion[pbit];
    });

    if (callback) {
      Object.assign(newI18n[language], callback(newI18n[language] || {}))
    }

    // we everything from the loop result
    // note how we check whether it exists, the reason for this is that prop extensions
    // which always build its search mode form might not have this data during the building process
    // in which case it is left as undefined
    if (itemInQuestion) {
      Object.keys(itemInQuestion).forEach((key) => {
        newI18n[language][key] = itemInQuestion[key];
      });
    }
  });

  // return that
  return newI18n;
}
