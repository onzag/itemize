/**
 * This file contains utility functionality that is necessary in order to
 * setup includes into and out of the postgresql database as well
 * as how to build the definition for the tables
 *
 * @packageDocumentation
 */

import { EXCLUSION_STATE_SUFFIX } from "../../../../../constants";
import {
  getSQLTableDefinitionForProperty,
  convertSQLValueToGQLValueForProperty,
  convertGQLValueToSQLValueForProperty,
  buildSQLQueryForProperty,
} from "../PropertyDefinition/sql";
import Include, { IncludeExclusionState } from "../Include";
import { ISQLTableDefinitionType, ISQLTableRowValue } from "../../../sql";
import Knex from "knex";
import ItemDefinition from "..";
import { IGQLValue, IGQLArgs } from "../../../../../gql-querier";

/**
 * Provides the table bit that is necessary to store include data
 * for this include when included from the parent definition
 * @param include the include in question
 */
export function getSQLTableDefinitionForInclude(include: Include): ISQLTableDefinitionType {
  // the exclusion state needs to be stored in the table bit
  // so we basically need to get a prefix for this item definition
  // this is usually INCLUDE_ the include prefix, and the id of the include
  // eg INCLUDE_wheel, we build a prefix as INCLUDE_wheel_
  const prefix = include.getPrefixedQualifiedIdentifier();

  // the result table schema contains the table definition of all
  // the columns, the first column we add is the exclusion state
  // because the exclusion state uses a suffix it is defined as
  // ITEM_wheel_ + _EXCLUSION_STATE
  let resultTableSchema: ISQLTableDefinitionType = {
    [prefix + EXCLUSION_STATE_SUFFIX]: {
      type: "string",
      notNull: true,
    },
  };
  // we need all the sinking properties and those are the
  // ones added to the table
  include.getSinkingProperties().forEach((sinkingProperty) => {
    resultTableSchema = {
      ...resultTableSchema,
      ...getSQLTableDefinitionForProperty(sinkingProperty, prefix),
    };
  });

  // we return the resulting schema
  return resultTableSchema;
}

/**
 * Given a SQL row it converts the value of the data contained
 * within that row into the valid graphql value for that data
 * @param include the include in question
 * @param row the row sql data
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}}
 */
export function convertSQLValueToGQLValueForInclude(
  include: Include,
  row: ISQLTableRowValue,
  graphqlFields?: any,
): IGQLValue {
  // first we create a prefix, the prefix is basically ITEM_wheel_
  // this prefix is added as you remember for every item extra property as
  // wheel as the item itself
  const prefix = include.getPrefixedQualifiedIdentifier();

  // now this is the result, of the graphql parent field because this is
  // an object that contains an object, the item sinking properties
  // are contained within that prefix, for example if the sql is
  // ITEM_wheel__EXCLUSION_STATE, ITEM_wheel_bolt, ITEM_wheel_rubber
  // the output should be
  // ITEM_wheel__EXCLUSION_STATE: ..., ITEM_wheel: {bolt: ... rubber: ...}
  // this gqlParentResult represents what is in ITEM_wheel
  let gqlParentResult: IGQLValue = {};

  // for that we need all the sinking properties
  include.getSinkingProperties().filter(
    (property) => !graphqlFields ? true : graphqlFields[property.getId()],
  ).forEach((sinkingProperty) => {
    // and we add them for the row data, notice how we add the prefix
    // telling the property definition that its properties are prefixed in
    // the sql data with ITEM_wheel_
    gqlParentResult = {
      ...gqlParentResult,
      ...convertSQLValueToGQLValueForProperty(sinkingProperty, row, prefix),
    };
  });

  // now we return both info, the exclusion state, and the item data
  // prefixed as necessary
  return {
    [include.getQualifiedExclusionStateIdentifier()]: row[include.getQualifiedExclusionStateIdentifier()],
    [include.getQualifiedIdentifier()]: gqlParentResult,
  };
}

/**
 * Converts a GraphQL value into a SQL row data, it takes apart a complex
 * graphql value and converts it into a serializable sql form
 * @param transitoryId the transitory id where things are stored
 * @param itemDefinition the item definition in question
 * @param include the include in question
 * @param data the graphql data value
 * @param knex the knex instance
 * @param dictionary the dictionary to use in full text search mode
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 */
export async function convertGQLValueToSQLValueForInclude(
  transitoryId: string,
  itemDefinition: ItemDefinition,
  include: Include,
  data: IGQLValue,
  oldData: IGQLValue,
  knex: Knex,
  dictionary: string,
  partialFields?: any,
): Promise<ISQLTableRowValue> {
  // so again we get the prefix as in ITEM_wheel_
  const prefix = include.getPrefixedQualifiedIdentifier();
  // the exclusion state in the graphql information should be included in
  // the root data as ITEM_wheel__EXCLUSION_STATE so we extract it
  const exclusionStateAccordingToGQL = data[include.getQualifiedExclusionStateIdentifier()];

  // we add that data to the sql result
  let sqlResult: ISQLTableRowValue = {
    [include.getQualifiedExclusionStateIdentifier()]: exclusionStateAccordingToGQL,
  };

  // now the information that is specific about the sql value is only
  // necessary if the state is not excluded, excluded means it should be
  // null, even if the info is there, it will be ignored
  if (exclusionStateAccordingToGQL !== IncludeExclusionState.EXCLUDED) {
    await Promise.all(
      // so we get the sinking properties
      include.getSinkingProperties().map(async (sinkingProperty) => {
        // partial fields checkup
        if (
          (partialFields && partialFields[sinkingProperty.getId()]) ||
          !partialFields
        ) {
          // and start adding them, in this case, instead of giving
          // the root data, we are passing the specific item data, remember
          // it will be stored in a place like ITEM_wheel where all the properties
          // are an object within there, we pass that, as all the info should be
          // there, the prefix then represents the fact, we want all the added properties
          // to be prefixed with what we are giving, in this case ITEM_wheel_
          const addedFieldsByProperty = await convertGQLValueToSQLValueForProperty(
            transitoryId,
            itemDefinition,
            include,
            sinkingProperty,
            data[include.getQualifiedIdentifier()] as IGQLValue,
            (oldData && oldData[include.getQualifiedIdentifier()] as IGQLValue) || null,
            knex,
            dictionary,
            prefix,
          );
          sqlResult = {
            ...sqlResult,
            ...addedFieldsByProperty,
          };
        }
      }),
    );
  }

  // we return that
  return sqlResult;
}

/**
 * Builds a sql query for an include
 * @param include the include in question
 * @param args the args as they come from the search module, specific for this item (not nested)
 * @param knexBuilder the knex query builder
 * @param dictionary the dictionary to use to build the search
 */
export function buildSQLQueryForInclude(
  include: Include,
  args: IGQLArgs,
  knexBuilder: Knex.QueryBuilder,
  dictionary: string,
) {
  // we need all these prefixes
  const prefix = include.getPrefixedQualifiedIdentifier();
  const exclusionStateQualifiedId = include.getQualifiedExclusionStateIdentifier();
  const expectedExclusionState = args[exclusionStateQualifiedId];

  // if the expected exclusion state is to be excluded
  if (expectedExclusionState === IncludeExclusionState.EXCLUDED) {
    // we tell knex that is to be the case
    knexBuilder.andWhere(exclusionStateQualifiedId, IncludeExclusionState.EXCLUDED);
  } else {
    // otherwise if we are expecting something else like ANY and INCLUDED
    knexBuilder.andWhere((builder) => {
      // we extract a subquery builder
      builder.andWhere((secondBuilder) => {
        // and make a where query for all the properties
        secondBuilder.where(exclusionStateQualifiedId, IncludeExclusionState.INCLUDED);

        // get the args for that specific include
        const itemArgs = args[include.getQualifiedIdentifier()] as IGQLArgs;

        // and apply the search for all the sinking properties
        include.getSinkingProperties().forEach((pd) => {
          if (!pd.isSearchable()) {
            return;
          }
          buildSQLQueryForProperty(pd, itemArgs, prefix, secondBuilder, dictionary);
        });
      });

      // if we have an specific exclusion state that can be ANY
      if (expectedExclusionState === IncludeExclusionState.ANY) {
        // then we add the excluded state to the subquery
        builder.orWhere(prefix + EXCLUSION_STATE_SUFFIX, IncludeExclusionState.EXCLUDED);
      }
    });
  }
}
