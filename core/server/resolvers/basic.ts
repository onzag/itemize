import {
  PREFIX_BUILD,
  MODERATION_FIELDS,
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
  MAX_SQL_LIMIT,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
} from "../../constants";
import { GraphQLDataInputError } from "../../base/errors";
import Debug from "../debug";
import fs from "fs";
import path from "path";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import { convertSQLValueToGQLValueForItemDefinition } from "../../base/Root/Module/ItemDefinition/sql";
import { convertSQLValueToGQLValueForModule } from "../../base/Root/Module/sql";
const debug = Debug("resolvers/basic");

const fsAsync = fs.promises;

let config: any;
let countryList: any;
(async () => {
  // Retrieve the config for the database
  config = JSON.parse(await fsAsync.readFile(
    "config.json",
    "utf8",
  ));
  countryList = JSON.parse(
    await fsAsync.readFile(
      path.join("resources", "countries.json"),
      "utf8",
    ),
  );
})();

export function flattenFieldsFromRequestedFields(requestedFields: any) {
  const output = {
    ...(requestedFields.data || {}),
  };
  Object.keys(requestedFields).forEach((key) => {
    if (key !== "data") {
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

export function checkFieldsAreAvailableForRole(tokenData: any, fieldData: any) {
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

export function checkLimit(args: any) {
  debug("Checking the limit...");
  if (args.limit > MAX_SQL_LIMIT) {
    debug(
      "Exceeded limit with",
      args.limit,
      "the maximum is",
      MAX_SQL_LIMIT,
    );
    throw new GraphQLDataInputError("Limit set too high at " + args.limit);
  }
}

export function checkLanguageAndRegion(args: any) {
  debug("Checking language and region...");
  if (typeof args.language !== "string" || args.language.length !== 2) {
    debug(
      "Invalid language code",
      args.language,
    );
    throw new GraphQLDataInputError("Please use valid non-regionalized language values");
  }
  if (!config.dictionaries[args.language]) {
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
  if (!countryList[args.country]) {
    debug(
      "Unknown country",
      args.country,
    );
    throw new GraphQLDataInputError("Unknown country " + args.country);
  }
}

export function mustBeLoggedIn(tokenData: any) {
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
    (
      value.blocked_at === null ||
      (
        value.blocked_at !== null &&
        ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(role)
      )
    ) &&
    value.deleted_at === null
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
      data: valueOfTheItem,
      ...valueOfTheItem,
    };
  } else {
    // we convert the value we were provided, of course, we only need
    // to process what was requested
    valueToProvide = {
      data: null,
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
