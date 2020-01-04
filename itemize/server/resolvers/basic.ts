import {
  PREFIX_BUILD,
  MODERATION_FIELDS,
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
  MAX_SQL_LIMIT,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  INVALID_POLICY_ERROR,
  RESERVED_BASE_PROPERTIES,
  ITEM_PREFIX,
  EXCLUSION_STATE_SUFFIX,
  GUEST_METAROLE,
} from "../../constants";
import { GraphQLEndpointError } from "../../base/errors";
import Debug from "debug";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import { convertSQLValueToGQLValueForItemDefinition } from "../../base/Root/Module/ItemDefinition/sql";
import { convertSQLValueToGQLValueForModule } from "../../base/Root/Module/sql";
import { IAppDataType } from "..";
import equals from "deep-equal";
import { IGQLValue } from "../../base/Root/gql";
import Item, { ItemExclusionState } from "../../base/Root/Module/ItemDefinition/Item";
import Knex from "knex";
import { jwtVerify } from "../token";
import { Cache } from "../cache";
import { ISQLTableRowValue } from "../../base/Root/sql";
import { ISearchResultIdentifierType } from "./actions/search";
import Root from "../../base/Root";

const buildColumnNamesForModuleTableOnlyDebug = Debug("resolvers:buildColumnNamesForModuleTableOnly");
/**
 * Builds the column names expected for a given module only
 * @param requestedFields the requested fields given by graphql fields and flattened
 * @param mod the module in question
 */
export function buildColumnNamesForModuleTableOnly(requestedFields: any, mod: Module): string[] {
  buildColumnNamesForModuleTableOnlyDebug(
    "EXECUTED with %j on module qualified as %s",
    requestedFields,
    mod.getQualifiedPathName(),
  );
  // this will be the ouput
  let result: string[] = [];
  // we start by looping into the requested fields
  Object.keys(requestedFields).forEach((key) => {
    // if it's one of the reserved properties, then we can be
    // sure that it's expected in the module table
    if (
      RESERVED_BASE_PROPERTIES[key]
    ) {
      result.push(key);

    // also if it's a prop extension
    } else if (mod.hasPropExtensionFor(key)) {
      // we get the property
      const property = mod.getPropExtensionFor(key);
      // just to access the property description
      const propDescription = property.getPropertyDefinitionDescription();
      // now we need to see how it is in sql form and get the instructions
      // of table formation, a string means, use the property name
      // we pass it to the function, to see
      // what it splits on, the function returns an object
      // eg. kitten_SIZE: {type: float, ...} kitten_VALUE
      // so we want only the keys with represent column names
      result = result.concat(Object.keys(propDescription.sql("", key, property)));
    }
  });

  buildColumnNamesForModuleTableOnlyDebug("SUCCEED with %j", result);
  // we return all we have gathered
  return result;
}

const buildColumnNamesForItemDefinitionTableOnlyDebug = Debug("resolvers:buildColumnNamesForItemDefinitionTableOnly");
/**
 * Builds the column names expected for a given item definition only
 * ignoring all the extensions and base fields
 * @param requestedFields the requested fields given by graphql fields and flattened
 * @param itemDefinition item definition in question
 * @param prefix a prefix to append to everything
 */
export function buildColumnNamesForItemDefinitionTableOnly(
  requestedFields: any,
  itemDefinition: ItemDefinition,
  prefix: string = "",
): string[] {
  buildColumnNamesForItemDefinitionTableOnlyDebug(
    "EXECUTED with %j and prefixed with %s on item definition qualified as %s",
    requestedFields,
    prefix,
    itemDefinition.getQualifiedPathName(),
  );
  // first we build the result
  let result: string[] = [];
  // now we loop into the requested field keys
  Object.keys(requestedFields).forEach((key) => {

    // we want to see which type it is, it might be
    // of type ITEM_
    if (key.startsWith(ITEM_PREFIX)) {
      // now we have to check with a expected clean name
      // by removing the prefix
      const expectedCleanName = key.replace(ITEM_PREFIX, "");

      // now we check if it still uses a suffix for exclusion state
      if (expectedCleanName.endsWith(EXCLUSION_STATE_SUFFIX)) {
        result.push(prefix + key);
      // otherwise we check if it's an item itself, it should be
      } else if (itemDefinition.hasItemFor(expectedCleanName)) {
        // we get the item in question
        const item = itemDefinition.getItemFor(expectedCleanName);
        // and basically call this function recursively and attach
        // its result, adding the prefix for this item
        result = result.concat(
          buildColumnNamesForItemDefinitionTableOnly(
            // as you can see only the data of the
            // specific requested fields is passed, it should
            // be an object after all
            requestedFields[key],
            item.getItemDefinition(),
            prefix + PREFIX_BUILD(key),
          ),
        );
      }

    // now we check for properties, ignoring extensions
    } else if (itemDefinition.hasPropertyDefinitionFor(key, false)) {
      // so we get it
      const property = itemDefinition.getPropertyDefinitionFor(key, false);
      // and now we check for a description
      const propDescription = property.getPropertyDefinitionDescription();
      // if we have a simple string, it means it's just the id, but don't forget
      // to prefix that thing
      // basically the same that we did in the module, but also passing
      // the prefix
      result = result.concat(Object.keys(propDescription.sql(prefix, key, property)));
    }
  });

  buildColumnNamesForModuleTableOnlyDebug("SUCCEED with %j", result);
  // return that thing
  return result;
}

export interface IServerSideTokenDataType {
  id: number;
  role: string;
}
const validateTokenAndGetDataDebug = Debug("resolvers:validateTokenAndGetDataDebug");
/**
 * Given a token, it validates and provides the role information
 * for use in the system
 * @param token the token passed via the args
 */
export async function validateTokenAndGetData(appData: IAppDataType, token: string): Promise<IServerSideTokenDataType> {
  validateTokenAndGetDataDebug("EXECUTED with %s", token);
  let result: IServerSideTokenDataType;
  if (token === null) {
    result = {
      id: null,
      role: GUEST_METAROLE,
    };
  } else {
    try {
      result = await jwtVerify<IServerSideTokenDataType>(token, appData.config.jwtKey);
    } catch (err) {
      throw new GraphQLEndpointError({
        message: "Invalid token that didn't pass verification",
        code: "UNSPECIFIED",
      });
    }
  }
  validateTokenAndGetDataDebug("SUCCEED with %j", result);
  return result;
}

const validateParentingRulesDebug = Debug("resolvers:validateParentingRules");
export async function validateParentingRules(
  appData: IAppDataType,
  modulePath: string,
  itemDefPath: string,
  id: number,
  itemDefinition: ItemDefinition,
  userId: number,
  role: string,
) {
  validateParentingRulesDebug("EXECUTED with %s", modulePath, itemDefPath);
  itemDefinition.checkCanBeParentedBy(modulePath, itemDefPath, true);
  const parentMod = appData.root.getModuleFor(modulePath.split("/"));
  const parentIdef = parentMod.getItemDefinitionFor(itemDefPath.split("/"));
  const result = await appData.cache.requestCache(
    parentIdef.getQualifiedPathName(), parentMod.getQualifiedPathName(), id,
  );
  if (!result) {
    throw new GraphQLEndpointError({
      message: "Invalid parent id " + id,
      code: "NOT_FOUND",
    });
  }
  const parentOwnerId = parentIdef.isOwnerObjectId() ? result.id : result.created_by;
  itemDefinition.checkRoleAccessForParenting(role, userId, parentOwnerId, true);
  validateParentingRulesDebug("SUCCEED");
}

const checkBasicFieldsAreAvailableForRoleDebug = Debug("resolvers:checkBasicFieldsAreAvailableForRole");
/**
 * Checks if the basic fields are available for the given role, basic
 * fields are of those reserved properties that are in every module
 * @param tokenData the token data that is obtained via the validateTokenAndGetData
 * function
 * @param requestedFields the requested fields
 */
export function checkBasicFieldsAreAvailableForRole(tokenData: IServerSideTokenDataType, requestedFields: any) {
  checkBasicFieldsAreAvailableForRoleDebug(
    "EXECUTED with token info %j and requested fields %j",
    tokenData,
    requestedFields,
  );

  // now we check if moderation fields have been requested
  const moderationFieldsHaveBeenRequested = MODERATION_FIELDS.some((field) => requestedFields[field]);

  // if they have been requested, and our role has no native access to that
  if (
    moderationFieldsHaveBeenRequested &&
    !ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(tokenData.role)
  ) {
    checkBasicFieldsAreAvailableForRoleDebug(
      "FAILED Attempted to access to moderation fields with role %j only %j allowed",
      tokenData.role,
      ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
    );
    // we throw an error
    throw new GraphQLEndpointError({
      message: "You have requested to add/edit/view moderation fields with role: " + tokenData.role,
      code: "FORBIDDEN",
    });
  }

  // That was basically the only thing that function does by so far
  checkBasicFieldsAreAvailableForRoleDebug("SUCCEED");
}

const checkListLimitDebug = Debug("resolvers:checkListLimit");
/**
 * Checks a list provided by the getter functions that use
 * lists to ensure the request isn't too large
 * @param ids the list ids that have been requested
 */
export function checkListLimit(ids: ISearchResultIdentifierType[]) {
  checkListLimitDebug("EXECUTED with %j", ids);
  if (ids.length > MAX_SQL_LIMIT) {
    checkListLimitDebug(
      "FAILED Exceeded limit by requesting %d ids the maximum limit is %d",
      ids.length,
      MAX_SQL_LIMIT,
    );
    throw new GraphQLEndpointError({
      message: "Too many ids at once, max is " + MAX_SQL_LIMIT,
      code: "UNSPECIFIED",
    });
  }
  checkListLimitDebug("SUCCEED");
}

const checkListTypesDebug = Debug("resolvers:checkListTypes");
export function checkListTypes(ids: ISearchResultIdentifierType[], mod: Module) {
  checkListTypesDebug("EXECUTED with %j", ids);
  ids.forEach((idContainer) => {
    const itemDefinition = Root.Registry[idContainer.type];
    if (!itemDefinition) {
      throw new GraphQLEndpointError({
        message: "Unknown qualified path name for " + idContainer.type,
        code: "UNSPECIFIED",
      });
    } else if (itemDefinition instanceof Module) {
      throw new GraphQLEndpointError({
        message: "Expected qualified identifier for item definition but got one for module " + idContainer.type,
        code: "UNSPECIFIED",
      });
    }

    if (itemDefinition.getParentModule() !== mod) {
      throw new GraphQLEndpointError({
        message: "Invalid parent for " + idContainer.type + " expected parent as " + mod.getQualifiedPathName(),
        code: "UNSPECIFIED",
      });
    }
  });
}

const checkLanguageDebug = Debug("resolvers:checkLanguage");
/**
 * Checks the language and region given the arguments passed
 * by the graphql resolver
 * @param appData the app data that is currently in context
 * @param args the args themselves being passed to the resolver
 */
export function checkLanguage(appData: IAppDataType, args: any) {
  checkLanguageDebug("EXECUTED with args %j", args);

  // basically we check the type and if the lenght is right
  if (typeof args.language !== "string" || args.language.length !== 2) {
    checkLanguageDebug(
      "FAILED Invalid language code %s",
      args.language,
    );
    throw new GraphQLEndpointError({
      message: "Please use valid non-regionalized language values",
      code: "UNSPECIFIED",
    });
  }

  // now we check if this is one of the languages we have
  // a dictionary assigned, only languages with a dictionary
  // assigned can be used by the database
  if (!appData.config.dictionaries[args.language]) {
    checkLanguageDebug(
      "FAILED Unavailable/Unsupported language %s",
      args.language,
    );
    throw new GraphQLEndpointError({
      message: "This language is not supported, as no dictionary has been set",
      code: "UNSPECIFIED",
    });
  }

  checkLanguageDebug("SUCCEED");
}

const getDictionaryDebug = Debug("resolvers:getDictionary");
/**
 * This just extracts the dictionary given the app data
 * and the language of choice
 * @param appData the app data
 * @param args the whole args of the graphql request
 */
export function getDictionary(appData: IAppDataType, args: any): string {
  getDictionaryDebug("EXECUTED with %j", args);
  const dictionary = appData.config.dictionaries[args.language];
  getDictionaryDebug("SUCCEED with %s", dictionary);
  return dictionary;
}

const validateTokenIsntBlockedDebug = Debug("resolvers:validateTokenIsntBlocked");
export async function validateTokenIsntBlocked(cache: Cache, tokenData: IServerSideTokenDataType) {
  validateTokenIsntBlockedDebug("EXECUTED");
  if (tokenData.id) {
    const sqlResult: ISQLTableRowValue = await cache.requestCache("MOD_users__IDEF_user", "MOD_users", tokenData.id);
    if (!sqlResult) {
      throw new GraphQLEndpointError({
        message: "User has been removed",
        code: "USER_REMOVED",
      });
    }
    if (sqlResult && sqlResult.blocked_at !== null) {
      throw new GraphQLEndpointError({
        message: "User is Blocked",
        code: "USER_BLOCKED",
      });
    }
  }
  validateTokenIsntBlockedDebug("SUCCEED");
}

const checkUserExistsDebug = Debug("resolvers:checkUserExists");
export async function checkUserExists(cache: Cache, id: number) {
  checkUserExistsDebug("EXECUTED");
  const sqlResult: ISQLTableRowValue = await cache.requestCache("MOD_users__IDEF_user", "MOD_users", id);
  if (!sqlResult) {
    throw new GraphQLEndpointError({
      message: "User has been removed",
      code: "USER_REMOVED",
    });
  }
  checkUserExistsDebug("SUCCEED");
}

export interface IFilteredAndPreparedValueType {
  toReturnToUser: any;
  actualValue: any;
}

const filterAndPrepareGQLValueDebug = Debug("resolvers:filterAndPrepareGQLValue");
/**
 * Filters and prepares a graphql value for output to the rest endpoint
 * given the value that has given by the server, the requested fields
 * that are supposed to be outputted, the role of the current user
 * and the parent module or item definition this value belongs to,
 * the form comes with the DATA and the externalized fields
 * @param value the value gotten from the sql database
 * @param requestedFields the requested fields
 * @param role the role of the user requesting the data
 * @param parentModuleOrIdef the parent module or item definition the value belongs to
 */
export function filterAndPrepareGQLValue(
  value: any,
  requestedFields: any,
  role: string,
  parentModuleOrIdef: ItemDefinition | Module,
): IFilteredAndPreparedValueType {
  filterAndPrepareGQLValueDebug(
    "EXECUTED with value %j, where requested fields are %j for role %s and qualified module/item definition %s",
    value,
    requestedFields,
    role,
    parentModuleOrIdef.getQualifiedPathName(),
  );
  // we are going to get the value for the item
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
    // same for modules
    valueOfTheItem = convertSQLValueToGQLValueForModule(
      parentModuleOrIdef,
      value,
      requestedFields,
    );
  }
  // we add the object like this, all the non requested data, eg.
  // values inside that should be outside, and outside that will be inside
  // will be stripped
  const actualValue = {
    DATA: valueOfTheItem,
  };

  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
    if (typeof value[property] !== "undefined") {
      actualValue[property] = value[property];
    }
  });

  const valueToProvide = {
    toReturnToUser: actualValue,
    actualValue,
  };

  if (
    value.blocked_at !== null &&
    !ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(role)
  ) {
    valueToProvide.toReturnToUser = {
      ...valueToProvide.toReturnToUser,
      DATA: null,
    };
  }

  filterAndPrepareGQLValueDebug(
    "SUCCEED with %j",
    valueToProvide,
  );
  return valueToProvide;
}

const serverSideCheckItemDefinitionAgainstDebug = Debug("resolvers:serverSideCheckItemDefinitionAgainst");
/**
 * Checks that an item definition current state is
 * valid and that the gqlArgValue provided is a match
 * for this item definition current value, remember
 * that in order to set the state to the gqlArgValue
 * you should run itemDefinition.applyValue(gqlArgValue);
 * @param itemDefinition the item definition in question
 * @param gqlArgValue the arg value that was set
 * @param id the stored item id, if available, or null
 * @param referredItem this is an optional item used to basically
 * provide better error logging
 */
export async function serverSideCheckItemDefinitionAgainst(
  itemDefinition: ItemDefinition,
  gqlArgValue: IGQLValue,
  id: number,
  referredItem?: Item,
  referredParentOfItem?: ItemDefinition,
) {
  serverSideCheckItemDefinitionAgainstDebug(
    "EXECUTED with value %j for item defintion with qualified name %s",
    gqlArgValue,
    itemDefinition.getQualifiedPathName(),
  );
  // we get the current value of the item definition instance
  const currentValue = await itemDefinition.getState(id);
  serverSideCheckItemDefinitionAgainstDebug(
    "Current value is %j",
    currentValue,
  );
  // now we are going to loop over the properties of that value
  currentValue.properties.forEach((propertyValue) => {
    // and we get what is set in the graphql value
    const gqlPropertyValue = gqlArgValue[propertyValue.propertyId];
    // now we check if it has an invalid reason
    if (propertyValue.invalidReason) {
      serverSideCheckItemDefinitionAgainstDebug(
        "FAILED due to property failing %s",
        propertyValue.invalidReason,
      );
      // throw an error then
      throw new GraphQLEndpointError({
        message: `validation failed at property ${propertyValue.propertyId} with error ${propertyValue.invalidReason}`,
        code: propertyValue.invalidReason,
        modulePath: (referredParentOfItem || itemDefinition).getParentModule().getPath(),
        itemDefPath: (referredParentOfItem || itemDefinition).getPath(),
        itemId: referredItem && referredItem.getId(),
        itemIdItemDefPath: referredParentOfItem && referredParentOfItem.getPath(),
        propertyId: propertyValue.propertyId,
      });

    // we also check that the values are matching, but only if they have been
    // defined in the graphql value
    } else if (typeof gqlPropertyValue !== "undefined" && !equals(gqlPropertyValue, propertyValue.value)) {
      serverSideCheckItemDefinitionAgainstDebug(
        "FAILED due to property mismatch on %s where provided was %j and expected was %j",
        propertyValue.propertyId,
        gqlPropertyValue,
        propertyValue.value,
      );
      throw new GraphQLEndpointError({
        message: `validation failed at property ${propertyValue.propertyId} with a mismatch of calculated value`,
        code: "UNSPECIFIED",
        modulePath: (referredParentOfItem || itemDefinition).getParentModule().getPath(),
        itemDefPath: (referredParentOfItem || itemDefinition).getPath(),
        itemId: referredItem && referredItem.getId(),
        itemIdItemDefPath: referredParentOfItem && referredParentOfItem.getPath(),
        propertyId: propertyValue.propertyId,
      });
    }
  });

  // we now check the items
  for (const itemValue of currentValue.items) {
    // now we take the item itself
    const item = itemDefinition.getItemFor(itemValue.itemId);
    // the graphql item value
    let gqlItemValue = gqlArgValue[item.getQualifiedIdentifier()];
    // if it's undefined we make it null
    if (typeof gqlItemValue === "undefined") {
      gqlItemValue = null;
    }
    // the graphql exclusion state value
    const gqlExclusionState = gqlArgValue[item.getQualifiedExclusionStateIdentifier()] || null;
    // now we check if the exclusion states match
    if (itemValue.exclusionState !== gqlExclusionState) {
      serverSideCheckItemDefinitionAgainstDebug(
        "FAILED due to exclusion state mismatch on item %s where provided was %s and expected %s",
        itemValue.itemId,
        gqlExclusionState,
        itemValue.exclusionState,
      );
      throw new GraphQLEndpointError({
        message: `validation failed at item ${itemValue.itemId} with a mismatch of exclusion state`,
        code: "UNSPECIFIED",
        modulePath: (referredParentOfItem || itemDefinition).getParentModule().getPath(),
        itemDefPath: (referredParentOfItem || itemDefinition).getPath(),
        itemId: itemValue.itemId,
        itemIdItemDefPath: referredParentOfItem && referredParentOfItem.getPath(),
      });
    // and we check if the there's a value set despite it being excluded
    } else if (gqlExclusionState === ItemExclusionState.EXCLUDED && gqlItemValue !== null) {
      serverSideCheckItemDefinitionAgainstDebug(
        "FAILED due to value set on item %s where it was excluded",
        itemValue.itemId,
      );
      throw new GraphQLEndpointError({
        message: `validation failed at item ${itemValue.itemId} with an excluded item but data set for it`,
        code: "UNSPECIFIED",
        modulePath: (referredParentOfItem || itemDefinition).getParentModule().getPath(),
        itemDefPath: (referredParentOfItem || itemDefinition).getPath(),
        itemId: itemValue.itemId,
        itemIdItemDefPath: referredParentOfItem && referredParentOfItem.getPath(),
      });
    }
    // now we run a server side check of item definition in the
    // specific item data, that's where we use our referred item
    await serverSideCheckItemDefinitionAgainst(
      item.getItemDefinition(),
      gqlItemValue,
      id,
      item,
      referredParentOfItem || itemDefinition,
    );
  }

  serverSideCheckItemDefinitionAgainstDebug("SUCCEED");
}

const runPolicyCheckDebug = Debug("resolvers:runPolicyCheck");
/**
 * Runs a policy check on the requested information
 * @param policyType the policy type on which the request is made on, edit, delete
 * @param itemDefinition the item definition in question
 * @param id the id of that item definition on the database
 * @param role the role of the current user
 * @param gqlArgValue the arg value given in the arguments from graphql, where the info should be
 * in qualified path names for the policies
 * @param knex the knex instance
 * @param extraSQLColumns extra SQL columns to request, this only exists to avoid needing many SQL calls
 * an asterisk is valid here
 * @param preValidation a validation to do, validate if the row doesn't exist here, and anything else necessary
 * the function will crash by Internal server error if no validation is done if the row is null
 */
export async function runPolicyCheck(
  policyType: string,
  itemDefinition: ItemDefinition,
  id: number,
  role: string,
  gqlArgValue: IGQLValue,
  cache: Cache,
  preValidation: (content: ISQLTableRowValue) => void,
) {
  runPolicyCheckDebug(
    "EXECUTED for policy %s on item definition %s for id %d on role %s for value %j with extra columns %j",
    policyType,
    itemDefinition.getQualifiedPathName(),
    role,
    gqlArgValue,
  );
  // so now we get the information we need first
  const mod = itemDefinition.getParentModule();
  const moduleTable = mod.getQualifiedPathName();
  const selfTable = itemDefinition.getQualifiedPathName();

  const selectQueryValue: ISQLTableRowValue =
    await cache.requestCache(selfTable, moduleTable, id);

  preValidation(selectQueryValue);

  // let's get all the policies that we have for this policy type group
  const policiesForThisType = itemDefinition.getPolicyNamesFor(policyType);

  // so we loop in these policies
  for (const policyName of policiesForThisType) {
    runPolicyCheckDebug("found policy %s", policyName);
    // and we get the roles that need to apply to this policy
    const rolesForThisSpecificPolicy = itemDefinition.getRolesForPolicy(policyType, policyName);
    // if this is not our user, we can just continue with the next
    if (!rolesForThisSpecificPolicy.includes(role)) {
      runPolicyCheckDebug(
        "ignoring policy %s as role %s does not require it but only %j demand it",
        policyName,
        role,
        rolesForThisSpecificPolicy,
      );
      continue;
    }

    if (policyType !== "delete") {
      const applyingPropertyIds =
        itemDefinition.getApplyingPropertyIdsForPolicy(policyType, policyName);

      if (applyingPropertyIds) {
        const somePropertyValueIsApplied =
        applyingPropertyIds.some(
          (applyingPropertyId) => typeof gqlArgValue[applyingPropertyId] !== "undefined",
        );

        if (!somePropertyValueIsApplied) {
          runPolicyCheckDebug(
            "ignoring policy %s as there wasno matching applying property for %j",
            policyName,
            applyingPropertyIds,
          );
          continue;
        }
      }
    }

    // otherwise we need to see which properties are in consideration for this
    // policy
    const propertiesInContext = itemDefinition.getPropertiesForPolicy(policyType, policyName);
    // we loop through those properties
    for (const property of propertiesInContext) {
      runPolicyCheckDebug(
        "Found property in policy %s",
        property.getId(),
      );

      // now we need the qualified policy identifier, that's where in the args
      // the value for this policy is stored
      const qualifiedPolicyIdentifier = property.getQualifiedPolicyIdentifier(policyType, policyName);
      // and like that we get the value that has been set for that policy
      let valueForTheProperty = gqlArgValue[qualifiedPolicyIdentifier];
      // if it's undefined, we set it to null
      if (typeof valueForTheProperty === "undefined") {
        valueForTheProperty = null;
      }

      runPolicyCheckDebug(
        "Property qualified policy identifier is %s found value set as %j",
        qualifiedPolicyIdentifier,
        valueForTheProperty,
      );

      // now we check if it's a valid value, the value we have given, for the given property
      // this is a shallow check but works
      const invalidReason = await property.isValidValue(id, valueForTheProperty);

      // if we get an invalid reason, the policy cannot even pass there
      if (invalidReason) {
        runPolicyCheckDebug(
          "FAILED due to failing to pass property validation %s",
          invalidReason,
        );
        throw new GraphQLEndpointError({
          message: `validation failed for ${qualifiedPolicyIdentifier} with reason ${invalidReason}`,
          code: INVALID_POLICY_ERROR,
          modulePath: mod.getPath(),
          itemDefPath: itemDefinition.getPath(),
          policyType,
          policyName,
        });
      }

      // otherwise we create a selection meta column, for our policy using the sql equal
      // which will create a column field with the policy name that is going to be
      // equal to that value, eg. "name" = 'policyValueForProperty' AS "MY_POLICY"
      // because policies are uppercase this avoids collisions with properties
      const policyMatches = property.getPropertyDefinitionDescription().sqlLocalEqual(
        valueForTheProperty,
        "",
        property.getId(),
        selectQueryValue,
      );

      if (!policyMatches) {
        runPolicyCheckDebug(
          "FAILED due to policy %s not passing",
          policyName,
        );
        throw new GraphQLEndpointError({
          message: `validation failed for policy ${policyName}`,
          code: INVALID_POLICY_ERROR,
          modulePath: mod.getPath(),
          itemDefPath: itemDefinition.getPath(),
          policyType,
          policyName,
        });
      }
    }
  }

  runPolicyCheckDebug("SUCCEED");

  return selectQueryValue;
}
