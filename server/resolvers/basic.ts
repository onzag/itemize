import {
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  GUEST_METAROLE,
  ANYONE_METAROLE,
  ANYONE_LOGGED_METAROLE,
  ENDPOINT_ERRORS,
  OWNER_METAROLE,
  RESERVED_BASE_PROPERTIES,
  INCLUDE_PREFIX,
  EXCLUSION_STATE_SUFFIX,
  JWT_KEY,
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
import { CustomRoleGranterEnvironment, CustomRoleManager } from "./roles";

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
    {
      functionName: "defaultTriggerInvalidForbiddenFunction",
      message: "Attempted to forbid on an already allowed action, this means that you attempted to call forbid on CREATED, EDITED or DELETED",
      data: {
        message,
        customCode,
      },
    }
  );
  return;
}

const customIdRegex = /[A-Za-z0-9-_\+\!\#]+/;
export function validateCustomId(id: string) {
  if (!customIdRegex.test(id)) {
    throw new EndpointError({
      message: "Invalid custom id must only contain alphanumeric characters, numbers, -, +, ! or #",
      code: ENDPOINT_ERRORS.FORBIDDEN,
    });
  }
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
      result = await jwtVerify<IServerSideTokenDataType>(token, await appData.registry.getJWTSecretFor(JWT_KEY));
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
  actualFinalOwnerId: string,
  role: string,
  rolesManager: CustomRoleManager,
  isReparenting: boolean,
) {
  const isParenting = !!(parentId || parentVersion || parentType);
  if (!isParenting && itemDefinition.mustBeParented() && !isReparenting) {
    // this is only relevant during add, as it is required when adding
    // but as modifying a parent is already set
    throw new EndpointError({
      message: "A parent is required",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  } else if (isParenting) {
    if (isReparenting && !itemDefinition.isReparentingEnabled()) {
      throw new EndpointError({
        message: "Reparenting is not been enabled as such you can't move children after they have been created",
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    }

    const parentingItemDefinition = appData.root.registry[parentType] as ItemDefinition;
    if (!(parentingItemDefinition instanceof ItemDefinition)) {
      throw new EndpointError({
        message: "Invalid parent type " + parentType,
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    }

    itemDefinition.checkCanBeParentedBy(parentingItemDefinition, true);

    const parentingRule = itemDefinition.getParentingRule();
    const maxChildCountSameType = itemDefinition.getParentingMaxChildCountSameType();
    const maxChildCountAnyType = itemDefinition.getParentingMaxChildCountAnyType();
    if (parentingRule === "ONCE" || maxChildCountSameType) {
      const valueCount =
        await appData.databaseConnection.queryFirst(
          `SELECT COUNT(*) AS "count" FROM ${JSON.stringify(itemDefinition.getParentModule().getQualifiedPathName())} WHERE "type"=$1 AND "parent_type"=$2 AND "parent_id"=$3 AND "parent_version"=$4`,
          [
            itemDefinition.getQualifiedPathName(),
            parentingItemDefinition.getQualifiedPathName(),
            parentId,
            parentVersion || "",
          ]
        );

      if (valueCount.count) {
        if (parentingRule === "ONCE") {
          throw new EndpointError({
            message: "Parenting rule is set to ONCE and there's already a children of this type for the given parent",
            code: ENDPOINT_ERRORS.FORBIDDEN,
          });
        } else if (valueCount.count >= maxChildCountSameType) {
          throw new EndpointError({
            message: "Max child count for the same type is set to " + maxChildCountSameType + " and there's already that much",
            code: ENDPOINT_ERRORS.FORBIDDEN,
          });
        }
      }
    }

    if (maxChildCountAnyType) {
      const valueCount =
        await appData.databaseConnection.queryFirst(
          `SELECT COUNT(*) AS "count" FROM ${JSON.stringify(itemDefinition.getParentModule().getQualifiedPathName())} WHERE "parent_type"=$1 AND "parent_id"=$2 AND "parent_version"=$3`,
          [
            parentingItemDefinition.getQualifiedPathName(),
            parentId,
            parentVersion || "",
          ]
        );

      if (valueCount.count && valueCount.count >= maxChildCountAnyType) {
        throw new EndpointError({
          message: "Max child count for any type is set to " + maxChildCountAnyType + " and there's already that much",
          code: ENDPOINT_ERRORS.FORBIDDEN,
        });
      }
    }

    if (parentingRule === "ONCE_PER_OWNER") {
      const valueExists =
        await appData.databaseConnection.queryFirst(
          `SELECT id FROM ${JSON.stringify(itemDefinition.getParentModule().getQualifiedPathName())} WHERE "type"=$1 AND "parent_type"=$2 AND ` +
          `"parent_id"=$3 AND "parent_version"=$4 AND "created_by"=$5 `,
          [
            itemDefinition.getQualifiedPathName(),
            parentingItemDefinition.getQualifiedPathName(),
            parentId,
            parentVersion || "",
            actualFinalOwnerId,
          ]
        );

      if (valueExists) {
        throw new EndpointError({
          message: "Parenting rule is set to ONCE_PER_OWNER and there's already a children of this type for the given parent with that owner",
          code: ENDPOINT_ERRORS.FORBIDDEN,
        });
      }
    }

    let result: ISQLTableRowValue;
    try {
      result = await appData.cache.requestValue(
        parentingItemDefinition, parentId, parentVersion,
      );
    } catch (err) {
      logger.error(
        {
          functionName: "validateParentingRules",
          message: "Could not retrieve item definition value to validate parenting rules",
          serious: true,
          err,
          data: {
            parentId,
            parentVersion,
            parentingItemDefinition,
          },
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
        appData,
        parentingItemDefinition,
        result,
      ),
    })
    await itemDefinition.checkRoleAccessForParenting(role, userId, parentOwnerId, parentingRolesManager, true);
  }
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

export function retrieveUntil(args: IGQLArgs): string {
  if (args.until) {
    const date = new Date(args.since as string);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString();
    } else {
      throw new EndpointError({
        message: "Could not parse until value " + args.until,
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
  if (!appData.databaseConfig.dictionaries[args.language] && !appData.databaseConfig.dictionaries["*"]) {
    throw new EndpointError({
      message: "This language is not supported, as no dictionary has been set",
      code: ENDPOINT_ERRORS.UNSPECIFIED,
    });
  }
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
  const dictionary = appData.databaseConfig.dictionaries[args.language] || appData.databaseConfig.dictionaries["*"];
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
        {
          functionName: "validateTokenIsntBlocked",
          message: "Couldn't validate whether the token is blocked or not",
          serious: true,
          err,
          data: {
            tokenData,
          },
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
}

export async function checkUserExists(cache: Cache, id: string) {
  let sqlResult: ISQLTableRowValue;
  try {
    sqlResult = await cache.requestValue(
      "MOD_users__IDEF_user", id, null,
    );
  } catch (err) {
    logger.error(
      {
        functionName: "checkUserExists",
        message: "Couldn't check whether the user exists",
        serious: true,
        err,
        data: {
          userId: id,
        },
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
  appData: IAppDataType,
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
      appData,
      parentModuleOrIdef,
      value,
      requestedFields,
    );
  } else {
    // same for modules
    valueOfTheItem = convertSQLValueToGQLValueForModule(
      serverData,
      appData,
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

  await parentModuleOrIdef.applySoftReadRoleAccessTo(role, userId, ownerUserId, rolesManager, valueOfTheItemForSoftReads);

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
    const hasAccessToModeration = parentModuleOrIdef.checkRoleAccessForModeration(
      role, userId, ownerUserId, rolesManager, false,
    );

    if (!hasAccessToModeration) {
      valueToProvide.toReturnToUser.DATA = null;
    }
  }

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
      {
        functionName: "serverSideCheckItemDefinitionAgainst",
        message: "Couldn't retrieve item definition state",
        serious: true,
        err,
        data: {
          id,
          version,
          itemDefinition: itemDefinition.getQualifiedPathName(),
          referredInclude: referredInclude ? referredInclude.getQualifiedIdentifier() : null,
          referredParentOfInclude: referredParentOfInclude ? referredParentOfInclude.getQualifiedPathName() : null,
        },
      }
    );
    throw err;
  }

  // now we are going to loop over the properties of that value
  currentValue.properties.forEach((propertyValue) => {
    // and we get what is set in the graphql value
    const gqlPropertyValue = gqlArgValue[propertyValue.propertyId];
    // now we check if it has an invalid reason
    if (propertyValue.invalidReason) {
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
      throw new EndpointError({
        message: `validation failed at property ${propertyValue.propertyId} with a mismatch of calculated` +
          ` value expected ${JSON.stringify(propertyValue.value)} received ${JSON.stringify(gqlPropertyValue)}`,
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
    appData: IAppDataType,
    preValidation?: (content: ISQLTableRowValue) => void | ISQLTableRowValue,
    parentModule?: string,
    parentType?: string,
    parentId?: string,
    parentVersion?: string,
    preParentValidation?: (content: ISQLTableRowValue) => void | ISQLTableRowValue,
  },
) {
  // so now we get the information we need first
  const mod = arg.itemDefinition.getParentModule();

  let selectQueryValue: ISQLTableRowValue = null;
  let parentSelectQueryValue: ISQLTableRowValue = null;
  if (arg.policyTypes.includes("read") || arg.policyTypes.includes("delete") || arg.policyTypes.includes("edit")) {
    try {
      selectQueryValue = await arg.appData.cache.requestValue(arg.itemDefinition, arg.id, arg.version);
    } catch (err) {
      logger.error(
        {
          functionName: "runPolicyCheck",
          message: "Could not run policy checks due to cache/database fail",
          serious: true,
          err,
          data: {
            id: arg.id,
            version: arg.version,
            itemDefinition: arg.itemDefinition,
          },
        }
      );
      throw err;
    }
  }
  if (arg.policyTypes.includes("parent")) {
    try {
      parentSelectQueryValue = await arg.appData.cache.requestValue(
        arg.parentType, arg.parentId, arg.parentVersion,
      );
    } catch (err) {
      logger.error(
        {
          functionName: "runPolicyCheck",
          message: "Could not run policy checks due to cache/database fail on parent rule",
          serious: true,
          err,
          data: {
            parentVersion: arg.parentVersion,
            parentId: arg.parentId,
            parentType: arg.parentType,
            parentModule: arg.parentModule
          },
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
      // and we get the roles that need to apply to this policy
      const rolesForThisSpecificPolicy = arg.itemDefinition.getRolesForPolicy(policyType, policyName);
      // if this is not our user, we can just continue with the next
      if (!rolesForThisSpecificPolicy.includes(arg.role)) {
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
          continue;
        }
      }

      // otherwise we need to see which properties are in consideration for this
      // policy
      const propertiesInContext = arg.itemDefinition.getPropertiesForPolicy(policyType, policyName);
      // we loop through those properties
      for (const property of propertiesInContext) {
        // now we need the qualified policy identifier, that's where in the args
        // the value for this policy is stored
        const qualifiedPolicyIdentifier = property.getQualifiedPolicyIdentifier(policyType, policyName);
        // and like that we get the value that has been set for that policy
        let policyValueForTheProperty = arg.gqlArgValue[qualifiedPolicyIdentifier] as PropertyDefinitionSupportedType;
        // if it's undefined, we set it to null
        if (typeof policyValueForTheProperty === "undefined") {
          policyValueForTheProperty = null;
        }

        // now we check if it's a valid value, the value we have given, for the given property
        // this is a shallow check but works
        let invalidReason: string;
        try {
          invalidReason = await property.isValidValue(arg.id, arg.version, policyValueForTheProperty);
        } catch (err) {
          logger.error(
            {
              functionName: "runPolicyCheck",
              message: "Couldn't check if the value is valid",
              serious: true,
              err,
              data: {
                id: arg.id,
                version: arg.version,
                policyValueForTheProperty,
              },
            }
          );
          throw err;
        }

        // if we get an invalid reason, the policy cannot even pass there
        if (invalidReason) {
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
          serverData: arg.appData.cache.getServerData(),
          itemDefinition: arg.itemDefinition,
          appData: arg.appData,
        });

        if (!policyMatches) {
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

  return selectQueryValue;
}
