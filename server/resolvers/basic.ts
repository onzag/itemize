import {
  MODERATION_FIELDS,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  GUEST_METAROLE,
  ANYONE_METAROLE,
  ANYONE_LOGGED_METAROLE,
  ENDPOINT_ERRORS,
  OWNER_METAROLE,
  RESERVED_BASE_PROPERTIES,
  INCLUDE_PREFIX,
  EXCLUSION_STATE_SUFFIX,
} from "../../constants";
import { EndpointError } from "../../base/errors";
import ItemDefinition, { IItemStateType } from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import { convertSQLValueToGQLValueForItemDefinition } from "../../base/Root/Module/ItemDefinition/sql";
import { convertSQLValueToGQLValueForModule } from "../../base/Root/Module/sql";
import { IAppDataType } from "..";
import { logger } from "../logger";
import equals from "deep-equal";
import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { jwtVerify } from "../token";
import { Cache } from "../cache";
import { ISQLTableRowValue } from "../../base/Root/sql";
import { IGQLValue, IGQLSearchRecord, IGQLArgs, IGQLRequestFields } from "../../gql-querier";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ISensitiveConfigRawJSONDataType } from "../../config";
import { getConversionIds } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode";
import { ICustomRoleManager } from "../../base/Root";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "./roles";

// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_SILLY = LOG_LEVEL === "silly";

export interface IServerSideTokenDataType {
  // role always present
  role: string;

  // id and session id, present or not
  id: string;
  sessionId?: number;

  // custom token data that might exist
  custom?: boolean;
  isRealUser?: boolean;
  customData?: any;
}

export function defaultTriggerForbiddenFunction(message: string, customCode?: string) {
  throw new EndpointError({
    message,
    code: customCode || ENDPOINT_ERRORS.FORBIDDEN,
  });
}

export function defaultTriggerWaitForPromiseFunction() {
  return;
}

export function defaultTriggerInvalidForbiddenFunction(message: string, customCode?: string) {
  logger.error(
    "Attempted to forbid on an already allowed action, this means that you attempted to call forbid on CREATED, EDITED or DELETED",
    {
      message,
      customCode,
    }
  );
  return;
}

/**
 * Given a token, it validates and provides the role information
 * for use in the system
 * @param token the token passed via the args
 */
export async function validateTokenAndGetData(appData: IAppDataType, token: string): Promise<IServerSideTokenDataType> {
  let result: IServerSideTokenDataType;
  if (token === null) {
    result = {
      id: null,
      role: GUEST_METAROLE,
      sessionId: null,
    };
  } else {
    let throwErr = false;
    try {
      result = await jwtVerify<IServerSideTokenDataType>(token, appData.sensitiveConfig.jwtKey);
      if (!result.custom || result.isRealUser) {
        throwErr = (
          typeof result.id !== "string" ||
          typeof result.role !== "string" ||
          typeof result.sessionId !== "number"
        );
      } else {
        throwErr = typeof result.role !== "string";
      }
    } catch (err) {
      throwErr = true;
    }
    if (throwErr) {
      throw new EndpointError({
        message: "Invalid token that didn't pass verification",
        code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
      });
    }
  }
  CAN_LOG_SILLY && logger.silly(
    "validateTokenAndGetData: validating token for user succeed",
    {
      token,
      result,
    },
  );
  return result;
}

/**
 * Validates that the parenting rules are respected for the item definition
 * in question that wants to be created
 * @param appData the app data
 * @param parentId the id of the parent item definition
 * @param parentVersion the version of the parent item definition
 * @param parentType the type of the parent item definition
 * @param itemDefinition the item definition that is attempting to child
 * @param userId the user id
 * @param role the role
 */
export async function validateParentingRules(
  appData: IAppDataType,
  parentId: string,
  parentVersion: string,
  parentType: string,
  itemDefinition: ItemDefinition,
  userId: string,
  role: string,
  rolesManager: CustomRoleManager,
) {
  const isParenting = !!(parentId || parentVersion || parentType);
  if (!isParenting && itemDefinition.mustBeParented()) {
    throw new EndpointError({
      message: "A parent is required",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  } else if (isParenting) {
    const parentingItemDefinition = appData.root.registry[parentType] as ItemDefinition;
    if (!(parentingItemDefinition instanceof ItemDefinition)) {
      throw new EndpointError({
        message: "Invalid parent type " + parentType,
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    }

    itemDefinition.checkCanBeParentedBy(parentingItemDefinition, true);
    let result: ISQLTableRowValue;
    try {
      result = await appData.cache.requestValue(
        parentingItemDefinition, parentId, parentVersion,
      );
    } catch (err) {
      logger.error(
        "validateParentingRules [SERIOUS]: could not retrieve item definition value to validate parenting rules",
        {
          errStack: err.stack,
          errMessage: err.message,
          parentId,
          parentVersion,
          parentingItemDefinition,
        }
      );
      throw err;
    }
    if (!result) {
      throw new EndpointError({
        message: `There's no parent ${parentType} with id ${parentId}`,
        code: ENDPOINT_ERRORS.NOT_FOUND,
      });
    } else if (result.blocked_at !== null) {
      throw new EndpointError({
        message: "The parent is blocked",
        code: ENDPOINT_ERRORS.BLOCKED,
      });
    }
    const parentOwnerId = parentingItemDefinition.isOwnerObjectId() ? result.id : result.created_by;
    const parentingRolesManager = rolesManager.subEnvironment({
      owner: parentOwnerId,
      item: parentingItemDefinition,
      environment: CustomRoleGranterEnvironment.ADDING_CHILD,
      module: parentingItemDefinition.getParentModule(),
      parent: {
        id: result.parent_id,
        version: result.parent_version || null,
        type: result.parent_type,
      },
      value: convertSQLValueToGQLValueForItemDefinition(
        appData.cache.getServerData(),
        parentingItemDefinition,
        result,
      ),
    })
    await itemDefinition.checkRoleAccessForParenting(role, userId, parentOwnerId, parentingRolesManager, true);
  }

  CAN_LOG_SILLY && logger.silly(
    "validateParentingRules: parenting rules have passed",
  );
}

/**
 * Checks if the basic fields are available for the given role, basic
 * fields are of those reserved properties that are in every module
 * @param tokenData the token data that is obtained via the validateTokenAndGetData
 * function
 * @param requestedFields the requested fields
 */
export async function checkBasicFieldsAreAvailableForRole(
  itemDefinitionOrModule: ItemDefinition | Module,
  tokenData: IServerSideTokenDataType,
  ownerId: string,
  rolesManager: CustomRoleManager,
  requestedFields: any,
) {
  if (typeof requestedFields === "undefined" || requestedFields === null) {
    return true;
  }
  // now we check if moderation fields have been requested
  const moderationFieldsHaveBeenRequested = MODERATION_FIELDS.some((field) => requestedFields[field]);

  // if they have been requested, and our role has no native access to that
  if (
    moderationFieldsHaveBeenRequested
  ) {
    const hasAccessToModerationFields = await itemDefinitionOrModule.checkRoleAccessForModeration(
      tokenData.role,
      tokenData.id,
      ownerId,
      rolesManager,
    );
    if (!hasAccessToModerationFields) {
      CAN_LOG_SILLY && logger.silly(
        "checkBasicFieldsAreAvailableForRole: Attempted to access to moderation fields with invalid role",
        {
          role: tokenData.role,
          rolesThatHaveAccessToModerationFields: itemDefinitionOrModule.getRolesWithModerationAccess(),
        }
      );
      // we throw an error
      throw new EndpointError({
        message: "You have requested to add/edit/view moderation fields with role: " + tokenData.role,
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    }
  }

  CAN_LOG_SILLY && logger.silly(
    "checkBasicFieldsAreAvailableForRole: basic fields access role succeed",
  );
}

export function retrieveSince(args: IGQLArgs): string {
  if (args.since) {
    const date = new Date(args.since as string);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString();
    } else {
      throw new EndpointError({
        message: "Could not parse since value " + args.since,
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    }
  }
  return null;
}

export function checkLimiters(args: IGQLArgs, idefOrMod: Module | ItemDefinition) {
  const mod = idefOrMod instanceof Module ? idefOrMod : idefOrMod.getParentModule();
  const modLimiters = mod.getRequestLimiters();
  const idefLimiters = idefOrMod instanceof ItemDefinition ? idefOrMod.getRequestLimiters() : null;
  if (!modLimiters && !idefLimiters) {
    return;
  }

  [modLimiters, idefLimiters].forEach((limiter, index) => {
    if (!limiter) {
      return;
    }

    const isModLimiter = index === 0;

    if (limiter) {
      let allCustomSet: boolean;
      let someCustomSet: boolean;
      let customError: string;

      if (limiter.custom && limiter.custom.length) {
        allCustomSet = true;
        limiter.custom.forEach((v) => {
          const property = idefOrMod instanceof Module ?
            mod.getPropExtensionFor(v) :
            idefOrMod.getPropertyDefinitionFor(v, true);

          const expectedConversionIds = getConversionIds(property.rawData);
          const succeed = expectedConversionIds.every((conversionId: string) => {
            return typeof args[conversionId] === "undefined";
          });

          // if it succeeded
          if (succeed) {
            // we can assume some custom was set
            someCustomSet = true;
            // if it did not succeed
          } else {
            // then not all the custom sets succeeded
            allCustomSet = false;

            if (isModLimiter) {
              customError = "Missing custom request search limiter required by limiter set by " + v + " in module " +
                mod.getQualifiedPathName() + " requiring of " + expectedConversionIds.join(", ");
            } else {
              customError = "Missing custom request search limiter required by limiter set by " + v + " in idef " +
                idefOrMod.getQualifiedPathName() + " requiring of " + expectedConversionIds.join(", ");
            }
          }
        });
      } else {
        allCustomSet = true;
        someCustomSet = true;
      }

      if (limiter.condition === "AND" && !allCustomSet) {
        throw new EndpointError({
          message: customError,
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }

      let sinceError: string = null;
      let sinceSucceed = false;
      if (limiter && limiter.since) {
        const sinceArg = args.since ? new Date(args.since as string) : null;
        const hasSince = !!sinceArg;
        if (!hasSince) {
          sinceError = "Missing since limiter which is a required limiter"
        } else {
          const now = (new Date()).getTime();
          const sinceMs = sinceArg.getTime();
          if (now - sinceMs > limiter.since) {
            sinceError = "Since is not respected as it requires a difference of less than " +
              limiter.since + "ms but " + sinceMs + " provided"
          } else {
            sinceSucceed = true;
          }
        }
      }

      if (
        limiter.since &&
        limiter.condition === "AND" &&
        sinceError
      ) {
        throw new EndpointError({
          message: sinceError,
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }

      let createdBySucceed = false;
      if (limiter.createdBy) {
        createdBySucceed = !!(args.created_by);
      }

      if (
        limiter.createdBy &&
        limiter.condition === "AND" &&
        !createdBySucceed
      ) {
        throw new EndpointError({
          message: "Created by is required as a limiter, yet none was specified",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }

      let parentingSucceed = false;
      if (limiter.parenting) {
        parentingSucceed = !!(args.parent_id && args.parent_type);
      }

      if (
        limiter.parenting &&
        limiter.condition === "AND" &&
        !parentingSucceed
      ) {
        throw new EndpointError({
          message: "Parenting is required as a limiter, yet none was specified",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }

      if (limiter.condition === "OR") {
        const passedCustom = limiter.custom && someCustomSet;
        const passedSince = limiter.since && sinceSucceed;
        const passedCreatedBy = limiter.createdBy && createdBySucceed;
        const passedParenting = limiter.parenting && parentingSucceed;

        if (
          passedCustom ||
          passedSince ||
          passedCreatedBy ||
          passedParenting
        ) {
          return;
        }

        throw new EndpointError({
          message: `None of the OR request limiting conditions from the ${isModLimiter ? "module" : "item"} passed`,
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        });
      }
    }
  });
}

/**
 * Checks that the limit of search results is within the range that the item
 * defintion allows
 */
export function checkLimit(limit: number, idefOrMod: Module | ItemDefinition, traditional: boolean) {
  const mod = idefOrMod instanceof Module ? idefOrMod : idefOrMod.getParentModule();
  const maxSearchResults = traditional ? mod.getMaxSearchResults() : mod.getMaxSearchRecords();
  if (limit > maxSearchResults) {
    throw new EndpointError({
      message: "Too many " + (traditional ? "results" : "records") + " at once, max is " + maxSearchResults,
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }
  CAN_LOG_SILLY && logger.silly(
    "checkLimit: checking limits succeed",
  );
}

export function checkListTypes(records: IGQLSearchRecord[], mod: Module) {
  records.forEach((idContainer) => {
    const itemDefinition = mod.getParentRoot().registry[idContainer.type];
    if (!itemDefinition) {
      throw new EndpointError({
        message: "Unknown qualified path name for " + idContainer.type,
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    } else if (itemDefinition instanceof Module) {
      throw new EndpointError({
        message: "Expected qualified identifier for item definition but got one for module " + idContainer.type,
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    }

    if (itemDefinition.getParentModule() !== mod) {
      throw new EndpointError({
        message: "Invalid parent for " + idContainer.type + " expected parent as " + mod.getQualifiedPathName(),
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    }
  });

  CAN_LOG_SILLY && logger.silly(
    "checkListLimit: checking list types succeed",
  );
}

/**
 * Checks the language and region given the arguments passed
 * by the graphql resolver
 * @param appData the app data that is currently in context
 * @param args the args themselves being passed to the resolver
 */
export function checkLanguage(appData: IAppDataType, args: any) {
  // basically we check the type and if the lenght is right
  if (typeof args.language !== "string" || args.language.length !== 2) {
    throw new EndpointError({
      message: "Please use valid non-regionalized language values",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }

  // now we check if this is one of the languages we have
  // a dictionary assigned, only languages with a dictionary
  // assigned can be used by the database
  if (!appData.config.dictionaries[args.language] && !appData.config.dictionaries["*"]) {
    throw new EndpointError({
      message: "This language is not supported, as no dictionary has been set",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }

  CAN_LOG_SILLY && logger.silly(
    "checkLanguage: checking limits succeed",
  );
}

/**
 * Checks that a given user can perform the given search
 * as it was requested
 * @param args the args
 * @param moduleOrIdef a module or an item definition the search is held against
 * @param tokenData the token data
 */
export function checkUserCanSearch(args: any, moduleOrIdef: Module | ItemDefinition, tokenData: IServerSideTokenDataType) {
  const roles = moduleOrIdef.getRolesWithSearchAccess();
  if (
    roles.includes(ANYONE_METAROLE) ||
    roles.includes(tokenData.role)
  ) {
    return;
  }

  const canOwnerSearch = roles.includes(OWNER_METAROLE);
  if (canOwnerSearch && args.created_by === tokenData.id) {
    return;
  } else if (canOwnerSearch && args.created_by && tokenData.id && args.created_by !== tokenData.id) {
    throw new EndpointError({
      message: "You have requested a search for items owned by user " + args.created_by +
        " , but you identify yourself as " + tokenData.id,
      code: ENDPOINT_ERRORS.FORBIDDEN,
    });
  }

  throw new EndpointError({
    message: "Your role is forbidden from performing search",
    code: ENDPOINT_ERRORS.FORBIDDEN,
  });
}

/**
 * This just extracts the dictionary given the app data
 * and the language of choice
 * @param appData the app data
 * @param args the whole args of the graphql request
 */
export function getDictionary(appData: IAppDataType, args: any): string {
  const dictionary = appData.config.dictionaries[args.language] || appData.config.dictionaries["*"];
  CAN_LOG_SILLY && logger.silly(
    "getDictionary: got dictionary " + dictionary,
  );
  return dictionary;
}

/**
 * Validates and checks that a given container id is valid
 * to store data in
 * @param containerId the container id
 * @param sensitiveConfig the sensitive config
 */
export function validateContainerIdIsReal(
  containerId: string,
  sensitiveConfig: ISensitiveConfigRawJSONDataType,
) {
  if (
    (
      !sensitiveConfig.containers || !sensitiveConfig.containers[containerId]
    ) &&
    sensitiveConfig.localContainer !== containerId
  ) {
    throw new EndpointError({
      message: "Container id " + containerId + " does not exist",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }
}

/**
 * Validates the current token isn't blocked whether it is said so
 * by the rules of the session id, user is removed, or invalid credentials
 * @param cache the appdata cache instance
 * @param tokenData the token data obtained and parsed
 */
export async function validateTokenIsntBlocked(
  cache: Cache,
  tokenData: IServerSideTokenDataType,
) {
  if (tokenData.id && (!tokenData.custom || tokenData.isRealUser)) {
    let sqlResult: ISQLTableRowValue;

    try {
      sqlResult = await cache.requestValue(
        "MOD_users__IDEF_user", tokenData.id, null,
      );
    } catch (err) {
      logger.error(
        "validateTokenIsntBlocked [SERIOUS]: Couldn't validate whether the token is blocked or not",
        {
          errStack: err.stack,
          errMessage: err.message,
          tokenData,
        }
      );
      throw err;
    }
    if (!sqlResult) {
      throw new EndpointError({
        message: "User has been removed",
        code: ENDPOINT_ERRORS.USER_REMOVED,
      });
    } else if (sqlResult.blocked_at !== null) {
      throw new EndpointError({
        message: "User is Blocked",
        code: ENDPOINT_ERRORS.USER_BLOCKED,
      });
    } else if ((sqlResult.session_id || 0) !== tokenData.sessionId) {
      throw new EndpointError({
        message: "Token has been rendered invalid",
        code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
      });
    } else if (sqlResult.role !== tokenData.role) {
      throw new EndpointError({
        message: "Token has role mismatch",
        code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
      });
    }
  }
  CAN_LOG_SILLY && logger.silly(
    "validateTokenIsntBlocked: token block checking succeed",
  );
}

export async function checkUserExists(cache: Cache, id: string) {
  let sqlResult: ISQLTableRowValue;
  try {
    sqlResult = await cache.requestValue(
      "MOD_users__IDEF_user", id, null,
    );
  } catch (err) {
    logger.error(
      "checkUserExists [SERIOUS]: Couldn't check whether the user exists",
      {
        errStack: err.stack,
        errMessage: err.message,
        userId: id,
      }
    );
    throw err;
  }
  if (!sqlResult) {
    throw new EndpointError({
      message: "User has been removed",
      code: ENDPOINT_ERRORS.USER_REMOVED,
    });
  }
  CAN_LOG_SILLY && logger.silly(
    "checkUserExists: check user exist succeed",
  );
}

export interface IFilteredAndPreparedValueType {
  toReturnToUser: any;
  actualValue: any;
  requestFields: any;
}

/**
 * Filters and prepares a graphql value for output to the rest endpoint
 * given the value that has given by the server, the requested fields
 * that are supposed to be outputted, the role of the current user
 * and the parent module or item definition this value belongs to,
 * the form comes with the DATA and the externalized fields
 * @param value the value gotten from the sql database
 * @param requestedFields the requested fields, flattened
 * @param role the role of the user requesting the data
 * @param parentModuleOrIdef the parent module or item definition the value belongs to
 */
export async function filterAndPrepareGQLValue(
  serverData: any,
  value: ISQLTableRowValue,
  requestedFields: IGQLRequestFields,
  role: string,
  userId: string,
  ownerUserId: string,
  rolesManager: CustomRoleManager,
  parentModuleOrIdef: ItemDefinition | Module,
): Promise<IFilteredAndPreparedValueType> {
  // we are going to get the value for the item
  let valueOfTheItem: any;
  if (parentModuleOrIdef instanceof ItemDefinition) {
    // we convert the value we were provided, of course, we only need
    // to process what was requested
    valueOfTheItem = convertSQLValueToGQLValueForItemDefinition(
      serverData,
      parentModuleOrIdef,
      value,
      requestedFields,
    );
  } else {
    // same for modules
    valueOfTheItem = convertSQLValueToGQLValueForModule(
      serverData,
      parentModuleOrIdef,
      value,
      requestedFields,
    );
  }

  const valueOfTheItemForSoftReads = { ...valueOfTheItem };
  Object.keys(valueOfTheItemForSoftReads).forEach((k) => {
    if (k.startsWith(INCLUDE_PREFIX) && !k.endsWith(EXCLUSION_STATE_SUFFIX)) {
      valueOfTheItemForSoftReads[k] = { ...valueOfTheItem[k] };
    }
  });

  parentModuleOrIdef.applySoftReadRoleAccessTo(role, userId, ownerUserId, rolesManager, valueOfTheItemForSoftReads);

  // we add the object like this, all the non requested data, eg.
  // values inside that should be outside, and outside that will be inside
  // will be stripped
  const actualValue = {
    DATA: valueOfTheItem,
  };
  const actualFilteredValue = {
    DATA: valueOfTheItemForSoftReads,
  };
  const finalRequestFields = {
    DATA: { ...requestedFields },
  };

  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
    if (typeof value[property] !== "undefined" && requestedFields[property]) {
      actualValue[property] = valueOfTheItem[property];
      delete actualValue.DATA[property];
      actualFilteredValue[property] = valueOfTheItemForSoftReads[property];
      delete actualFilteredValue.DATA[property];
      finalRequestFields[property] = {};
      delete finalRequestFields.DATA[property];
    }
  });

  const valueToProvide = {
    toReturnToUser: actualFilteredValue,
    actualValue,
    requestFields: finalRequestFields,
  };

  if (value.blocked_at !== null) {
    const rolesThatHaveAccessToModerationFields = parentModuleOrIdef.getRolesWithModerationAccess();
    const hasBaseAccessToModerationFields = rolesThatHaveAccessToModerationFields.includes(ANYONE_METAROLE) ||
      (rolesThatHaveAccessToModerationFields.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE) ||
      (rolesThatHaveAccessToModerationFields.includes(OWNER_METAROLE) && userId === ownerUserId)
      rolesThatHaveAccessToModerationFields.includes(role);

    let hasAccessToModerationFields = hasBaseAccessToModerationFields;
    if (!hasAccessToModerationFields) {
      hasAccessToModerationFields = await rolesManager.checkRoleAccessFor(
        rolesThatHaveAccessToModerationFields,
      );
    }
    
    if (!hasAccessToModerationFields) {
      valueToProvide.toReturnToUser.DATA = null;
    }
  }

  CAN_LOG_SILLY && logger.silly(
    "validateTokenIsntBlocked: prepared the value to provide",
    valueToProvide,
  );
  return valueToProvide;
}

/**
 * Checks that an item definition current state is
 * valid and that the gqlArgValue provided is a match
 * for this item definition current value, remember
 * that in order to set the state to the gqlArgValue
 * you should run itemDefinition.applyValue(gqlArgValue);
 * @param itemDefinition the item definition in question
 * @param gqlArgValue the arg value that was set
 * @param id the stored item id, if available, or null
 * @param version the stored item version if avaliable
 * @param referredInclude this is an optional include used to basically
 * provide better error logging
 */
export async function serverSideCheckItemDefinitionAgainst(
  itemDefinition: ItemDefinition,
  gqlArgValue: IGQLValue,
  id: string,
  version: string,
  referredInclude?: Include,
  referredParentOfInclude?: ItemDefinition,
) {
  // we get the current value of the item definition instance
  let currentValue: IItemStateType;
  try {
    currentValue = await itemDefinition.getState(id, version);
  } catch (err) {
    logger.error(
      "serverSideCheckItemDefinitionAgainst [SERIOUS]: Couldn't retrieve item definition state",
      {
        errStack: err.stack,
        errMessage: err.message,
        id,
        version,
        itemDefinition: itemDefinition.getQualifiedPathName(),
        referredInclude: referredInclude ? referredInclude.getQualifiedIdentifier() : null,
        referredParentOfInclude: referredParentOfInclude ? referredParentOfInclude.getQualifiedPathName() : null,
      }
    );
    throw err;
  }

  CAN_LOG_SILLY && logger.silly(
    "serverSideCheckItemDefinitionAgainst: current state value for " + id + " and " + version,
    currentValue,
  )
  // now we are going to loop over the properties of that value
  currentValue.properties.forEach((propertyValue) => {
    // and we get what is set in the graphql value
    const gqlPropertyValue = gqlArgValue[propertyValue.propertyId];
    // now we check if it has an invalid reason
    if (propertyValue.invalidReason) {
      CAN_LOG_SILLY && logger.silly(
        "serverSideCheckItemDefinitionAgainst: failed due to property " + propertyValue.propertyId + " failing",
        propertyValue,
      );
      // throw an error then
      throw new EndpointError({
        message: `validation failed at property ${propertyValue.propertyId} with error ${propertyValue.invalidReason}`,
        code: ENDPOINT_ERRORS.INVALID_PROPERTY,
        pcode: propertyValue.invalidReason,
        modulePath: (referredParentOfInclude || itemDefinition).getParentModule().getPath(),
        itemDefPath: (referredParentOfInclude || itemDefinition).getPath(),
        includeId: referredInclude && referredInclude.getId(),
        includeIdItemDefPath: referredParentOfInclude && referredParentOfInclude.getPath(),
        propertyId: propertyValue.propertyId,
      });

      // we also check that the values are matching, but only if they have been
      // defined in the graphql value
    } else if (typeof gqlPropertyValue !== "undefined" && !equals(gqlPropertyValue, propertyValue.value)) {
      CAN_LOG_SILLY && logger.silly(
        "serverSideCheckItemDefinitionAgainst: failed due to property " + propertyValue.propertyId + " being unequal",
        {
          propertyValue,
          gqlPropertyValue,
        }
      );
      throw new EndpointError({
        message: `validation failed at property ${propertyValue.propertyId} with a mismatch of calculated value`,
        code: ENDPOINT_ERRORS.INVALID_PROPERTY,
        // someone might have been trying to hack for this to happen
        // a null pcode is a red flag, well almost all these checks show tampering
        // this will make the client side give an error nevertheless
        pcode: null,
        modulePath: (referredParentOfInclude || itemDefinition).getParentModule().getPath(),
        itemDefPath: (referredParentOfInclude || itemDefinition).getPath(),
        includeId: referredInclude && referredInclude.getId(),
        includeIdItemDefPath: referredParentOfInclude && referredParentOfInclude.getPath(),
        propertyId: propertyValue.propertyId,
      });
    }
  });

  // we now check the items
  for (const includeValue of currentValue.includes) {
    // now we take the item itself
    const include = itemDefinition.getIncludeFor(includeValue.includeId);
    // the graphql item value
    let gqlIncludeValue = gqlArgValue[include.getQualifiedIdentifier()];
    // if it's undefined we make it null
    if (typeof gqlIncludeValue === "undefined") {
      gqlIncludeValue = null;
    }
    // the graphql exclusion state value
    const gqlExclusionState = gqlArgValue[include.getQualifiedExclusionStateIdentifier()] || null;
    // now we check if the exclusion states match
    if (includeValue.exclusionState !== gqlExclusionState) {
      CAN_LOG_SILLY && logger.silly(
        "serverSideCheckItemDefinitionAgainst: failed due to exclusion mismatch",
        {
          includeValue,
          gqlExclusionState,
        }
      );
      throw new EndpointError({
        message: `validation failed at include ${includeValue.includeId} with a mismatch of exclusion state`,
        code: ENDPOINT_ERRORS.INVALID_INCLUDE,
        modulePath: (referredParentOfInclude || itemDefinition).getParentModule().getPath(),
        itemDefPath: (referredParentOfInclude || itemDefinition).getPath(),
        includeId: includeValue.includeId,
        includeIdItemDefPath: referredParentOfInclude && referredParentOfInclude.getPath(),
      });
      // and we check if the there's a value set despite it being excluded
    } else if (gqlExclusionState === IncludeExclusionState.EXCLUDED && gqlIncludeValue !== null) {
      CAN_LOG_SILLY && logger.silly(
        "serverSideCheckItemDefinitionAgainst: failed due to value set on include where it was excluded",
        {
          includeValue,
          gqlExclusionState,
        }
      );
      throw new EndpointError({
        message: `validation failed at include ${includeValue.includeId} with an excluded item but data set for it`,
        code: ENDPOINT_ERRORS.INVALID_INCLUDE,
        modulePath: (referredParentOfInclude || itemDefinition).getParentModule().getPath(),
        itemDefPath: (referredParentOfInclude || itemDefinition).getPath(),
        includeId: includeValue.includeId,
        includeIdItemDefPath: referredParentOfInclude && referredParentOfInclude.getPath(),
      });
    }
    // now we run a server side check of item definition in the
    // specific item data, that's where we use our referred item
    await serverSideCheckItemDefinitionAgainst(
      include.getItemDefinition(),
      gqlIncludeValue as IGQLValue,
      id,
      version,
      include,
      referredParentOfInclude || itemDefinition,
    );
  }

  CAN_LOG_SILLY && logger.silly(
    "serverSideCheckItemDefinitionAgainst: succeed checking item definition consistency",
  );
}

/**
 * Users cannot search if they have an active read policy in their roles
 * this function checks and throws an error if there's such a thing
 * @param itemDefinition the item definition to check read policies for
 * @param role the role
 */
export function checkReadPoliciesAllowThisUserToSearch(
  itemDefinition: ItemDefinition,
  role: string,
) {
  const policiesForThisType = itemDefinition.getPolicyNamesFor("read");
  policiesForThisType.forEach((policyName) => {
    const roles = itemDefinition.getRolesForPolicy("read", policyName);
    if (
      roles.includes(role) ||
      roles.includes(ANYONE_METAROLE) ||
      (roles.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE)
    ) {
      throw new EndpointError({
        message: "Searching with an active read policy is not allowed, the policy in question is " + policyName,
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    }
  });
  CAN_LOG_SILLY && logger.silly(
    "checkReadPoliciesAllowThisUserToSearch: succeed checking policies allow user to search",
  );
}

const reservedKeys = Object.keys(RESERVED_BASE_PROPERTIES);
/**
 * Splits the arguments in a graphql query from what it comes to be part
 * of the item definition or module in question and what is extra arguments
 * that are used within the query
 * @param moduleOrItemDefinition the module or item definition
 * @param args the arguments to split
 */
export function splitArgsInGraphqlQuery(
  moduleOrItemDefinition: Module | ItemDefinition,
  args: IGQLArgs,
): [IGQLArgs, IGQLArgs] {
  const resultingSelfValues: IGQLArgs = {};
  const resultingExtraArgs: IGQLArgs = {};
  const propertyIds = (moduleOrItemDefinition instanceof Module ?
    moduleOrItemDefinition.getAllPropExtensions() :
    moduleOrItemDefinition.getAllPropertyDefinitionsAndExtensions()).map((p) => p.getId());
  const includeIds = (moduleOrItemDefinition instanceof Module ? [] :
    moduleOrItemDefinition.getAllIncludes()).map((i) => i.getQualifiedIdentifier());

  Object.keys(args).forEach((key) => {
    if (propertyIds.includes(key) || includeIds.includes(key) || reservedKeys.includes(key)) {
      resultingSelfValues[key] = args[key];
    } else {
      resultingExtraArgs[key] = args[key];
    }
  });

  CAN_LOG_SILLY && logger.silly(
    "splitArgsInGraphqlQuery: succeed splitting args for graphql",
  );

  return [resultingSelfValues, resultingExtraArgs];
}

/**
 * Runs a policy check on the requested information
 * @param arg.policyType the policy type on which the request is made on, edit, delete
 * @param arg.itemDefinition the item definition in question
 * @param arg.id the id of that item definition on the database
 * @param arg.version the version of the item definition on the database
 * @param arg.role the role of the current user
 * @param arg.gqlArgValue the arg value given in the arguments from graphql, where the info should be
 * in qualified path names for the policies
 * @param arg.gqlFlattenedRequestedFiels the flattened request fields that have been requested to read
 * @param arg.cache the cache instance
 * @param arg.preValidation a validation to do, validate if the row doesn't exist here, and anything else necessary
 * the function will crash by Internal server error if no validation is done if the row is null; return
 * a value if you want to force it to return instead without an error
 * @param arg.parentModule the parent module to use in a policy type parent
 * @param arg.parentType the parent type (qualified name and table) to use in a policy type parent
 * @param arg.parentId the parent id to use in a policy type parent
 * @param arg.parentPrevalidation a pre validation to run
 */
export async function runPolicyCheck(
  arg: {
    policyTypes: string[],
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
    role: string,
    gqlArgValue: IGQLValue,
    gqlFlattenedRequestedFiels: any,
    cache: Cache,
    preValidation?: (content: ISQLTableRowValue) => void | ISQLTableRowValue,
    parentModule?: string,
    parentType?: string,
    parentId?: string,
    parentVersion?: string,
    preParentValidation?: (content: ISQLTableRowValue) => void | ISQLTableRowValue,
  },
) {
  CAN_LOG_SILLY && logger.silly(
    "runPolicyCheck: Executed policy check for item definition",
  );

  // so now we get the information we need first
  const mod = arg.itemDefinition.getParentModule();

  let selectQueryValue: ISQLTableRowValue = null;
  let parentSelectQueryValue: ISQLTableRowValue = null;
  if (arg.policyTypes.includes("read") || arg.policyTypes.includes("delete") || arg.policyTypes.includes("edit")) {
    try {
      selectQueryValue = await arg.cache.requestValue(arg.itemDefinition, arg.id, arg.version);
    } catch (err) {
      logger.error(
        "runPolicyCheck [SERIOUS]: could not run policy checks due to cache/database fail",
        {
          id: arg.id,
          version: arg.version,
          itemDefinition: arg.itemDefinition,
        }
      );
      throw err;
    }
  }
  if (arg.policyTypes.includes("parent")) {
    try {
      parentSelectQueryValue = await arg.cache.requestValue(
        arg.parentType, arg.parentId, arg.parentVersion,
      );
    } catch (err) {
      logger.error(
        "runPolicyCheck [SERIOUS]: could not run policy checks due to cache/database fail on parent rule",
        {
          parentVersion: arg.parentVersion,
          parentId: arg.parentId,
          parentType: arg.parentType,
          parentModule: arg.parentModule
        }
      );
      throw err;
    }
  }

  if (arg.preValidation) {
    const forcedResult = arg.preValidation(selectQueryValue);
    if (typeof forcedResult !== "undefined") {
      return forcedResult;
    }
  }

  if (arg.preParentValidation) {
    const forcedResult2 = arg.preParentValidation(parentSelectQueryValue);
    if (typeof forcedResult2 !== "undefined") {
      return forcedResult2;
    }
  }

  for (const policyType of arg.policyTypes) {
    // let's get all the policies that we have for this policy type group
    const policiesForThisType = arg.itemDefinition.getPolicyNamesFor(policyType);

    // so we loop in these policies
    for (const policyName of policiesForThisType) {
      CAN_LOG_SILLY && logger.silly(
        "runPolicyCheck: Found policy",
        {
          policyName,
        }
      );
      // and we get the roles that need to apply to this policy
      const rolesForThisSpecificPolicy = arg.itemDefinition.getRolesForPolicy(policyType, policyName);
      // if this is not our user, we can just continue with the next
      if (!rolesForThisSpecificPolicy.includes(arg.role)) {
        CAN_LOG_SILLY && logger.silly(
          "ignoring policy the role does not require it",
          {
            policyName,
            role: arg.role,
            rolesForThisSpecificPolicy,
          }
        );
        continue;
      }

      const gqlCheckingElement = policyType === "read" ? arg.gqlFlattenedRequestedFiels : arg.gqlArgValue;

      if (policyType !== "delete" && policyType !== "parent") {
        const applyingPropertyIds =
          arg.itemDefinition.getApplyingPropertyIdsForPolicy(policyType, policyName);
        const applyingPropertyOnlyAppliesWhenCurrentIsNonNull =
          arg.itemDefinition.doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull(policyType, policyName);

        let someIncludeOrPropertyIsApplied = false;
        if (applyingPropertyIds) {
          someIncludeOrPropertyIsApplied =
            applyingPropertyIds.some(
              (applyingPropertyId) => {
                const isDefinedInReadOrEdit = typeof gqlCheckingElement[applyingPropertyId] !== "undefined";
                const isCurrentlyNull = selectQueryValue[applyingPropertyId] === null;
                if (applyingPropertyOnlyAppliesWhenCurrentIsNonNull && isCurrentlyNull) {
                  return false;
                }
                return isDefinedInReadOrEdit;
              }
            );
        }

        if (!someIncludeOrPropertyIsApplied) {
          const applyingIncludeIds =
            arg.itemDefinition.getApplyingIncludeIdsForPolicy(policyType, policyName);

          if (applyingIncludeIds) {
            someIncludeOrPropertyIsApplied =
              applyingIncludeIds.some(
                (applyingIncludeId) => {
                  const include = arg.itemDefinition.getIncludeFor(applyingIncludeId);
                  return (
                    typeof gqlCheckingElement[include.getQualifiedIdentifier()] !== "undefined" ||
                    typeof gqlCheckingElement[include.getQualifiedExclusionStateIdentifier()] !== "undefined"
                  );
                },
              );
          }
        }

        if (!someIncludeOrPropertyIsApplied) {
          CAN_LOG_SILLY && logger.silly(
            "runPolicyCheck: ignoring policy as there was no match for applying property or include",
            {
              policyName,
              applyingPropertyIds,
            }
          );
          continue;
        }
      }

      // otherwise we need to see which properties are in consideration for this
      // policy
      const propertiesInContext = arg.itemDefinition.getPropertiesForPolicy(policyType, policyName);
      // we loop through those properties
      for (const property of propertiesInContext) {
        CAN_LOG_SILLY && logger.silly(
          "runPolicyCheck: found property in policy",
          {
            propertyId: property.getId(),
          }
        );

        // now we need the qualified policy identifier, that's where in the args
        // the value for this policy is stored
        const qualifiedPolicyIdentifier = property.getQualifiedPolicyIdentifier(policyType, policyName);
        // and like that we get the value that has been set for that policy
        let policyValueForTheProperty = arg.gqlArgValue[qualifiedPolicyIdentifier] as PropertyDefinitionSupportedType;
        // if it's undefined, we set it to null
        if (typeof policyValueForTheProperty === "undefined") {
          policyValueForTheProperty = null;
        }

        CAN_LOG_SILLY && logger.silly(
          "runPolicyCheck: Property qualified policy identifier found and value is set",
          {
            qualifiedPolicyIdentifier,
            policyValueForTheProperty,
          }
        );

        // now we check if it's a valid value, the value we have given, for the given property
        // this is a shallow check but works
        let invalidReason: string;
        try {
          invalidReason = await property.isValidValue(arg.id, arg.version, policyValueForTheProperty);
        } catch (err) {
          logger.error(
            "runPolicyCheck [SERIOUS]: couldn't check if the value is valid",
            {
              id: arg.id,
              version: arg.version,
              policyValueForTheProperty,
            }
          );
          throw err;
        }

        // if we get an invalid reason, the policy cannot even pass there
        if (invalidReason) {
          CAN_LOG_SILLY && logger.silly(
            "runPolicyCheck: Failed for not passing property validation",
            {
              invalidReason,
            }
          );
          throw new EndpointError({
            message: `validation failed for ${qualifiedPolicyIdentifier} with reason ${invalidReason}`,
            code: ENDPOINT_ERRORS.INVALID_POLICY,
            modulePath: mod.getPath(),
            itemDefPath: arg.itemDefinition.getPath(),
            policyType,
            policyName,
          });
        }

        // otherwise we create a selection meta column, for our policy using the sql equal
        // which will create a column field with the policy name that is going to be
        // equal to that value, eg. "name" = 'policyValueForProperty' AS "MY_POLICY"
        // because policies are uppercase this avoids collisions with properties
        const policyMatches = property.getPropertyDefinitionDescription().sqlSSCacheEqual({
          id: property.getId(),
          value: policyValueForTheProperty,
          prefix: "",
          row: policyType === "parent" ? parentSelectQueryValue : selectQueryValue,
          property,
          serverData: arg.cache.getServerData(),
          itemDefinition: arg.itemDefinition,
        });

        if (!policyMatches) {
          CAN_LOG_SILLY && logger.silly(
            "runPolicyCheck: Failed due to policy not pasing",
            {
              policyName,
            }
          );
          throw new EndpointError({
            message: `validation failed for policy ${policyName}`,
            code: ENDPOINT_ERRORS.INVALID_POLICY,
            modulePath: mod.getPath(),
            itemDefPath: arg.itemDefinition.getPath(),
            policyType,
            policyName,
          });
        }
      }
    }
  }

  CAN_LOG_SILLY && logger.silly(
    "runPolicyCheck: Completed checking policies",
  );

  return selectQueryValue;
}
