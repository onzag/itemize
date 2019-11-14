import { PREFIX_BUILD, ITEM_PREFIX, EXCLUSION_STATE_SUFFIX } from "../../../../../constants";
import {
  getSQLTableDefinitionForProperty,
  convertSQLValueToGQLValueForProperty,
  convertGQLValueToSQLValueForProperty,
  buildSQLQueryForProperty,
} from "../PropertyDefinition/sql";
import Item, { ItemExclusionState } from "../Item";
import { ISQLTableDefinitionType, ISQLTableRowValue } from "../../../sql";
import { IGQLValue } from "../../../gql";

/**
 * Provides the table bit that is necessary to store item data
 * for this item when included from the parent definition
 * @param item the item in question
 */
export function getSQLTableDefinitionForItem(item: Item): ISQLTableDefinitionType {
  // the exclusion state needs to be stored in the table bit
  // so we basically need to get a prefix for this item definition
  // this is usually ITEM_ the item prefix, and the id of the item
  // eg ITEM_wheel, we build a prefix as ITEM_wheel_
  const prefix = PREFIX_BUILD(ITEM_PREFIX + item.getId());

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
  item.getSinkingProperties().forEach((sinkingProperty) => {
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
 * @param item the item in question
 * @param row the row sql data
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}}
 */
export function convertSQLValueToGQLValueForItem(item: Item, row: ISQLTableRowValue, graphqlFields: any): IGQLValue {
  // first we create a prefix, the prefix is basically ITEM_wheel_
  // this prefix is added as you remember for every item extra property as
  // wheel as the item itself
  const prefix = PREFIX_BUILD(ITEM_PREFIX + item.getId());

  // now this is the result, of the graphql parent field because this is
  // an object that contains an object, the item sinking properties
  // are contained within that prefix, for example if the sql is
  // ITEM_wheel__EXCLUSION_STATE, ITEM_wheel_bolt, ITEM_wheel_rubber
  // the output should be
  // ITEM_wheel__EXCLUSION_STATE: ..., ITEM_wheel: {bolt: ... rubber: ...}
  // this gqlParentResult represents what is in ITEM_wheel
  let gqlParentResult: IGQLValue = {};

  // for that we need all the sinking properties
  item.getSinkingProperties().filter(
    (property) => graphqlFields[property.getId()],
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
    [prefix + EXCLUSION_STATE_SUFFIX]: row[prefix + EXCLUSION_STATE_SUFFIX],
    [ITEM_PREFIX + item.getId()]: gqlParentResult,
  };
}

/**
 * Converts a GraphQL value into a SQL row data, it takes apart a complex
 * graphql value and converts it into a serializable sql form
 * @param item the item in question
 * @param data the graphql data value
 * @param knex the knex instance
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 */
export function convertGQLValueToSQLValueForItem(
  item: Item,
  data: IGQLValue,
  knex: any,
  partialFields?: any,
): ISQLTableRowValue {
  // so again we get the prefix as in ITEM_wheel_
  const prefix = PREFIX_BUILD(ITEM_PREFIX + item.getId());
  // the exclusion state in the graphql information should be included in
  // the root data as ITEM_wheel__EXCLUSION_STATE so we extract it
  const exclusionStateAccordingToGQL = data[prefix + EXCLUSION_STATE_SUFFIX];

  // we add that data to the sql result
  let sqlResult: ISQLTableRowValue = {
    [prefix + EXCLUSION_STATE_SUFFIX]: exclusionStateAccordingToGQL,
  };

  // now the information that is specific about the sql value is only
  // necessary if the state is not excluded, excluded means it should be
  // null, even if the info is there, it will be ignored
  if (exclusionStateAccordingToGQL !== ItemExclusionState.EXCLUDED) {
    // so we get the sinking properties
    item.getSinkingProperties().forEach((sinkingProperty) => {
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
        sqlResult = {
          ...sqlResult,
          ...convertGQLValueToSQLValueForProperty(sinkingProperty, data[ITEM_PREFIX + item.getId()], knex, prefix),
        };
      }
    });
  }

  // we return that
  return sqlResult;
}

export function buildSQLQueryForItem(item: Item, data: IGQLValue, knexBuilder: any) {
  const prefix = PREFIX_BUILD(ITEM_PREFIX + item.getId());
  const exclusionState = data[prefix + EXCLUSION_STATE_SUFFIX];

  if (exclusionState === ItemExclusionState.EXCLUDED) {
    knexBuilder.andWhere(prefix + EXCLUSION_STATE_SUFFIX, ItemExclusionState.EXCLUDED);
  } else {
    knexBuilder.andWhere((builder: any) => {
      if (exclusionState !== ItemExclusionState.EXCLUDED) {
        builder.andWhere((secondBuilder: any) => {
          secondBuilder.where(prefix + EXCLUSION_STATE_SUFFIX, ItemExclusionState.INCLUDED);

          const itemData = data[ITEM_PREFIX + item.getId()];
          item.getSinkingProperties().forEach((pd) => {
            if (!pd.isSearchable()) {
              return;
            }

            buildSQLQueryForProperty(pd, itemData, prefix, secondBuilder);
          });
        });
      }

      if (exclusionState === ItemExclusionState.ANY) {
        builder.orWhere(prefix + EXCLUSION_STATE_SUFFIX, ItemExclusionState.EXCLUDED);
      }
    });
  }
}
