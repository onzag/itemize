import {
  PREFIX_BUILD,
  MODERATION_FIELDS,
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
  MAX_SQL_LIMIT,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  CONNECTOR_SQL_COLUMN_FK_NAME,
} from "../../constants";
import { GraphQLDataInputError } from "../../base/errors";
import Debug from "../debug";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import { convertSQLValueToGQLValueForItemDefinition } from "../../base/Root/Module/ItemDefinition/sql";
import { convertSQLValueToGQLValueForModule } from "../../base/Root/Module/sql";
import { IAppDataType } from "..";
import equals from "deep-equal";
import { IGQLValue } from "../../base/Root/gql";
import { ItemExclusionState } from "../../base/Root/Module/ItemDefinition/Item";
import Knex from "knex";
const debug = Debug("resolvers/basic");

export function flattenFieldsFromRequestedFields(requestedFields: any) {
  const output = {
    ...(requestedFields.DATA || {}),
  };
  Object.keys(requestedFields).forEach((key) => {
    if (key !== "DATA") {
      output[key] = requestedFields[key];
    }
  });
  return output;
}

export function buildColumnNames(base: any, prefix: string = ""): string[] {
  let result: string[] = [];
  Object.keys(base).forEach((key) => {
    if (Object.keys(base[key]).length === 0) {
      result.push(prefix + key);
    } else {
      result = result.concat(buildColumnNames(base[key], PREFIX_BUILD(prefix + key)));
    }
  });
  return result;
}

export function validateTokenAndGetData(token: string) {
  return {
    userId: 1,
    role: token,
  };
}

export function checkBasicFieldsAreAvailableForRole(tokenData: any, fieldData: any) {
  debug("Checking if fields are available for role...");
  const moderationFieldsHaveBeenRequested = MODERATION_FIELDS.some((field) => fieldData[field]);
  console.log(MODERATION_FIELDS, moderationFieldsHaveBeenRequested, tokenData, fieldData);
  if (
    moderationFieldsHaveBeenRequested &&
    !ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(tokenData.role)
  ) {
    debug(
      "Attempted to access to moderation fields with role",
      tokenData.role,
      "only",
      ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
      "allowed",
    );
    throw new GraphQLDataInputError(
      "You have requested to add/edit/view moderation fields with role: " + tokenData.role,
    );
  }
}

export function checkListLimit(args: any) {
  debug("Checking the limit...");
  if (args.ids > MAX_SQL_LIMIT) {
    debug(
      "Exceeded limit with",
      args.ids,
      "the maximum is",
      MAX_SQL_LIMIT,
    );
    throw new GraphQLDataInputError("Too many ids at once, max is " + MAX_SQL_LIMIT);
  }
}

export function checkLanguageAndRegion(appData: IAppDataType, args: any) {
  debug("Checking language and region...");
  if (typeof args.language !== "string" || args.language.length !== 2) {
    debug(
      "Invalid language code",
      args.language,
    );
    throw new GraphQLDataInputError("Please use valid non-regionalized language values");
  }
  if (!appData.config.dictionaries[args.language]) {
    debug(
      "Unavailable/Unsupported language",
      args.language,
    );
    throw new GraphQLDataInputError("This language is not supported, as no dictionary has been set");
  }
  if (typeof args.country !== "string" || args.country.length !== 2) {
    debug(
      "Invalid country code",
      args.country,
    );
    throw new GraphQLDataInputError("Please use valid region 2-digit ISO codes in uppercase");
  }
  if (!appData.countries[args.country]) {
    debug(
      "Unknown country",
      args.country,
    );
    throw new GraphQLDataInputError("Unknown country " + args.country);
  }
}

export function getDictionary(appData: IAppDataType, args: any) {
  debug("Providing dictionary from", args.language);
  return appData.config.dictionaries[args.language];
}

export function mustBeLoggedIn(tokenData: any) {
  debug("Checking if user is logged in...");
  if (!tokenData.userId) {
    throw new GraphQLDataInputError("Must be logged in");
  }
}

export function filterAndPrepareGQLValue(
  value: any,
  requestedFields: any,
  role: string,
  parentModuleOrIdef: ItemDefinition | Module,
) {
  let valueToProvide: any;
  if (
    value.blocked_at === null ||
    (
      value.blocked_at !== null &&
      ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(role)
    )
  ) {
    let valueOfTheItem: any;
    if (parentModuleOrIdef instanceof ItemDefinition) {
      // we convert the value we were provided, of course, we only need
      // to process what was requested
      valueOfTheItem = convertSQLValueToGQLValueForItemDefinition(
        parentModuleOrIdef,
        value,
        requestedFields,
      );
    } else {
      valueOfTheItem = convertSQLValueToGQLValueForModule(
        parentModuleOrIdef,
        value,
        requestedFields,
      );
    }
    // we add the object like this, all the non requested data, eg.
    // values inside that should be outside, and outside that will be inside
    // will be stripped
    valueToProvide = {
      DATA: valueOfTheItem,
      ...valueOfTheItem,
    };
  } else {
    // we convert the value we were provided, of course, we only need
    // to process what was requested
    valueToProvide = {
      DATA: null,
    };
    // we add every externally accessed field, these fields are not
    // a security concern and anyway they are checked beforehand
    // anything non requested will be stripped, or set to null by this same
    // code
    EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
      valueToProvide[property] = value[property];
    });
  }

  return valueToProvide;
}

/**
 * Checks that an item definition current state is
 * valid and that the gqlArgValue provided is a match
 * for this item definition current value, remember
 * that in order to set the state to the gqlArgValue
 * you should run itemDefinition.applyValueFromGQL(gqlArgValue);
 * @param itemDefinition the item definition in question
 * @param gqlArgValue the arg value that was set
 */
export function serverSideCheckItemDefinitionAgainst(
  itemDefinition: ItemDefinition,
  gqlArgValue: IGQLValue,
) {
  debug("Checking value against item definition...");
  const currentValue = itemDefinition.getCurrentValue();
  debug("Current value is", currentValue);
  currentValue.properties.forEach((propertyValue) => {
    let gqlPropertyValue = gqlArgValue[propertyValue.propertyId];
    if (typeof gqlPropertyValue === "undefined") {
      gqlPropertyValue = null;
    }
    if (propertyValue.invalidReason) {
      throw new GraphQLDataInputError(
        `validation failed at property ${propertyValue.propertyId} with error ${propertyValue.invalidReason}`,
      );
    } else if (!equals(gqlPropertyValue, propertyValue.value)) {
      throw new GraphQLDataInputError(
        `validation failed at property ${propertyValue.propertyId} with a mismatch of calculated value`,
      );
    }
  });

  currentValue.items.forEach((itemValue) => {
    const item = itemDefinition.getItemFor(itemValue.itemId);
    let gqlItemValue = gqlArgValue[item.getQualifiedIdentifier()];
    if (typeof gqlItemValue === "undefined") {
      gqlItemValue = null;
    }
    const gqlExclusionState = gqlArgValue[item.getQualifiedExclusionStateIdentifier()] || null;
    if (itemValue.exclusionState !== gqlExclusionState) {
      throw new GraphQLDataInputError(
        `validation failed at item ${itemValue.itemId} with a mismatch of exclusion state`,
      );
    } else if (gqlExclusionState === ItemExclusionState.EXCLUDED && gqlItemValue !== null) {
      throw new GraphQLDataInputError(
        `validation failed at item ${itemValue.itemId} with an excluded item but data set for it`,
      );
    }
    serverSideCheckItemDefinitionAgainst(
      item.getItemDefinition(),
      gqlItemValue,
    );
  });
}

/**
 * Runs a policy check on the requested information
 * @param policyType the policy type on which the request is made on, edit, delete
 * @param itemDefinition the item definition in question
 * @param id the id of that item definition on the database
 * @param role the role of the current user
 * @param gqlArgValue the arg value given in the arguments from graphql, where the info should be
 * in qualified path names for the policies
 * @param knex the knex instance
 * @param extraRequests extra SQL columns to request, this only exists to avoid needing many SQL calls
 * @param preValidation a validation to do, validate if the row doesn't exist here, and anything else necessary
 * the function will crash by Internal server error if no validation is done if the row is null
 */
export async function runPolicyCheck(
  policyType: string,
  itemDefinition: ItemDefinition,
  id: number,
  role: string,
  gqlArgValue: IGQLValue,
  knex: Knex,
  extraRequests: string[],
  preValidation: (content: any) => void,
) {
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  let policyQueryRequiresJoin = false;
  const policyQuery = knex.select(extraRequests);

  const policiesForThisType = itemDefinition.getPolicyNamesFor(policyType);
  policiesForThisType.forEach((policyName) => {
    const rolesForThisSpecificPolicy = itemDefinition.getRolesForPolicy(policyType, policyName);
    if (!rolesForThisSpecificPolicy.includes(role)) {
      return;
    }

    const propertiesInContext = itemDefinition.getPropertiesForPolicy(policyType, policyName);
    propertiesInContext.forEach((property) => {
      if (!property.checkIfIsExtension()) {
        policyQueryRequiresJoin = true;
      }

      const qualidiedIdentifier = property.getQualifiedPolicyIdentifier(policyType, policyName);
      let valueForTheProperty = gqlArgValue[qualidiedIdentifier];
      if (typeof valueForTheProperty === "undefined") {
        valueForTheProperty = null;
      }

      const invalidReason = property.isValidValue(valueForTheProperty);
      if (invalidReason) {
        throw new GraphQLDataInputError(
          `validation failed for ${qualidiedIdentifier} with reason ${invalidReason}`,
        );
      }

      property.getPropertyDefinitionDescription().sqlEqual(
        valueForTheProperty,
        "",
        property.getId(),
        policyQuery,
        policyName,
        knex,
      );
    });
  });

  policyQuery.from(moduleTable);
  if (policyQueryRequiresJoin) {
    policyQuery.join(selfTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
    });
  }
  policyQuery.where({
    id,
    type: selfTable,
  });
  const value = (await policyQuery)[0] || null;
  preValidation(value);

  Object.keys(value).forEach((policyName) => {
    const passedPolicy = value[policyName];
    if (!passedPolicy) {
      throw new GraphQLDataInputError(
        `validation failed for policy ${policyName}`,
      );
    }
  });
}
