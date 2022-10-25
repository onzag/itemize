/**
 * This file contains utility functionality that is necessary in order to
 * setup includes into and out of the postgresql database as well
 * as how to build the definition for the tables
 *
 * @module
 */

import { EXCLUSION_STATE_SUFFIX } from "../../../../../constants";
import {
  getSQLTableDefinitionForProperty,
  convertSQLValueToGQLValueForProperty,
  convertGQLValueToSQLValueForProperty,
  buildSQLQueryForProperty,
  getElasticSchemaForProperty,
  convertSQLValueToElasticSQLValueForProperty,
  buildElasticQueryForProperty,
} from "../PropertyDefinition/sql";
import Include, { IncludeExclusionState } from "../Include";
import { ISQLTableDefinitionType, ISQLTableRowValue, ISQLStreamComposedTableRowValue, ConsumeStreamsFnType, IElasticIndexDefinitionType } from "../../../sql";
import ItemDefinition from "..";
import { IGQLValue, IGQLArgs } from "../../../../../gql-querier";
import StorageProvider from "../../../../../server/services/base/StorageProvider";
import { WhereBuilder } from "../../../../../database/WhereBuilder";
import type { ElasticQueryBuilder } from "../../../../../server/elastic";

export function getElasticSchemaForInclude(itemDefinition: ItemDefinition, include: Include, serverData: any): IElasticIndexDefinitionType {
  // the exclusion state needs to be stored in the table bit
  // so we basically need to get a prefix for this item definition
  // this is usually INCLUDE_ the include prefix, and the id of the include
  // eg INCLUDE_wheel, we build a prefix as INCLUDE_wheel_
  const prefix = include.getPrefixedQualifiedIdentifier();

  // the result table schema contains the table definition of all
  // the columns, the first column we add is the exclusion state
  // because the exclusion state uses a suffix it is defined as
  // ITEM_wheel_ + _EXCLUSION_STATE
  let resultIndexSchema: IElasticIndexDefinitionType = {
    properties: {
      [prefix + EXCLUSION_STATE_SUFFIX]: {
        type: "keyword",
      },
    },
    runtime: {},
  };
  // we need all the sinking properties and those are the
  // ones added to the table
  include.getSinkingProperties().forEach((sinkingProperty) => {
    const result = getElasticSchemaForProperty(
      itemDefinition,
      include,
      sinkingProperty,
      serverData,
    );

    Object.assign(
      resultIndexSchema.properties,
      result.properties,
    );

    if (result.runtime) {
      Object.assign(
        resultIndexSchema.runtime,
        result.runtime,
      );
    }
  });

  // we return the resulting schema
  return resultIndexSchema;
}

/**
 * Provides the table bit that is necessary to store include data
 * for this include when included from the parent definition
 * @param itemDefinition the item definition that contains the include (not the referred)
 * @param include the include in question
 * @returns the partial table definition schema for the include, prefixed and with the exclusion state
 */
export function getSQLTableDefinitionForInclude(itemDefinition: ItemDefinition, include: Include): ISQLTableDefinitionType {
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
      type: "TEXT",
      notNull: true,
    },
  };
  // we need all the sinking properties and those are the
  // ones added to the table
  include.getSinkingProperties().forEach((sinkingProperty) => {
    resultTableSchema = {
      ...resultTableSchema,
      ...getSQLTableDefinitionForProperty(
        itemDefinition,
        include,
        sinkingProperty,
      ),
    };
  });

  // we return the resulting schema
  return resultTableSchema;
}

/**
 * Given a SQL row it converts the value of the data contained
 * within that row into the valid graphql output
 * @param serverData the server data that is currently in use
 * @param include the include in question
 * @param row the row sql data
 * @param graphqlFields (optional) contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}}
 * @returns a partial graphql value
 */
export function convertSQLValueToGQLValueForInclude(
  serverData: any,
  itemDefinition: ItemDefinition, 
  include: Include,
  row: ISQLTableRowValue,
  graphqlFields?: any,
): IGQLValue {
  // now this is the result, of the graphql parent field because this is
  // an object that contains an object, the item sinking properties
  // are contained within that prefix, for example if the sql is
  // ITEM_wheel__EXCLUSION_STATE, ITEM_wheel_bolt, ITEM_wheel_rubber
  // the output should be
  // ITEM_wheel__EXCLUSION_STATE: ..., ITEM_wheel: {bolt: ... rubber: ...}
  // this gqlParentResult represents what is in ITEM_wheel
  const gqlParentResult: IGQLValue = {};

  // for that we need all the sinking properties
  include.getSinkingProperties().filter(
    (property) => !graphqlFields ? true : graphqlFields[property.getId()],
  ).forEach((sinkingProperty) => {
    // and we add them for the row data, notice how we add the prefix
    // telling the property definition that its properties are prefixed in
    // the sql data with ITEM_wheel_
    Object.assign(
      gqlParentResult,
      convertSQLValueToGQLValueForProperty(
        serverData,
        itemDefinition,
        include,
        sinkingProperty,
        row,
      ),
    );
  });

  // now we return both info, the exclusion state, and the item data
  // prefixed as necessary
  return {
    [include.getQualifiedExclusionStateIdentifier()]: row[include.getQualifiedExclusionStateIdentifier()],
    [include.getQualifiedIdentifier()]: gqlParentResult,
  };
}

export function convertSQLValueToElasticSQLValueForInclude(
  serverData: any,
  itemDefinition: ItemDefinition, 
  include: Include,
  row: ISQLTableRowValue,
): IGQLValue {
  let result: ISQLTableRowValue = {
    [include.getQualifiedExclusionStateIdentifier()]: row[include.getQualifiedExclusionStateIdentifier()],
  };

  // for that we need all the sinking properties
  include.getSinkingProperties().forEach((sinkingProperty) => {
    Object.assign(
      result,
      convertSQLValueToElasticSQLValueForProperty(
        serverData,
        itemDefinition,
        include,
        sinkingProperty,
        row,
      ),
    );
  });

  // now we return both info, the exclusion state, and the item data
  // prefixed as necessary
  return result;
}

/**
 * Converts a GraphQL value into a SQL row data, it takes apart a complex
 * graphql value and converts it into a serializable sql form
 * @param serverData the server data
 * @param itemDefinition the item definition in question
 * @param include the include in question
 * @param data the graphql data value
 * @param oldData the old graphql data value that used to be stored for that include
 * @param uploadsClient the uploads client
 * @param dictionary the dictionary to use in full text search mode
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 * @returns the partial sql result to be added into the table
 */
export function convertGQLValueToSQLValueForInclude(
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  data: IGQLArgs,
  oldData: IGQLValue,
  uploadsClient: StorageProvider<any>,
  domain: string,
  language: string | ISQLTableRowValue,
  dictionary: string | ISQLTableRowValue,
  partialFields?: any,
): ISQLStreamComposedTableRowValue {
  // the exclusion state in the graphql information should be included in
  // the root data as ITEM_wheel__EXCLUSION_STATE so we extract it
  const exclusionStateAccordingToGQL = data[include.getQualifiedExclusionStateIdentifier()];

  // we add that data to the sql result
  let result: ISQLTableRowValue = {
    [include.getQualifiedExclusionStateIdentifier()]: exclusionStateAccordingToGQL,
  };
  const consumeStreamsFns: ConsumeStreamsFnType[] = []

  // now the information that is specific about the sql value is only
  // necessary if the state is not excluded, excluded means it should be
  // null, even if the info is there, it will be ignored
  if (exclusionStateAccordingToGQL !== IncludeExclusionState.EXCLUDED) {
    // so we get the sinking properties
    include.getSinkingProperties().forEach((sinkingProperty) => {
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
        const addedFieldsByProperty = convertGQLValueToSQLValueForProperty(
          serverData,
          itemDefinition.getParentModule(),
          itemDefinition,
          include,
          sinkingProperty,
          data[include.getQualifiedIdentifier()] as IGQLValue,
          (oldData && oldData[include.getQualifiedIdentifier()] as IGQLValue) || null,
          uploadsClient,
          domain,
          language,
          dictionary,
        );
        Object.assign(
          result,
          addedFieldsByProperty.value,
        );
        consumeStreamsFns.push(addedFieldsByProperty.consumeStreams);
      }
    });
  }

  // we return that
  return {
    value: result,
    consumeStreams: async (containerId: string) => {
      await Promise.all(consumeStreamsFns.map(fn => fn(containerId)));
    }
  };
}

/**
 * Builds a sql query for an include
 * @param serverData the server data information
 * @param itemDefinition the item definition that contains the include
 * @param include the include in question
 * @param args the args as they come from the search module, specific for this item (not nested)
 * @param dictionary the dictionary to use to build the search
 */
export function buildSQLQueryForInclude(
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  args: IGQLArgs,
  whereBuilder: WhereBuilder,
  language: string,
  dictionary: string,
) {
  // we need all these prefixes
  const prefix = include.getPrefixedQualifiedIdentifier();
  const exclusionStateQualifiedId = include.getQualifiedExclusionStateIdentifier();
  const expectedExclusionState = args[exclusionStateQualifiedId];

  // if the expected exclusion state is to be excluded
  if (expectedExclusionState === IncludeExclusionState.EXCLUDED) {
    // we tell the connection that is to be the case
    whereBuilder.andWhereColumn(exclusionStateQualifiedId, IncludeExclusionState.EXCLUDED);
  } else {
    // otherwise if we are expecting something else like ANY and INCLUDED
    whereBuilder.andWhere((builder) => {
      // we extract a subquery builder
      builder.andWhere((secondBuilder) => {
        // and make a where query for all the properties
        secondBuilder.andWhereColumn(exclusionStateQualifiedId, IncludeExclusionState.INCLUDED);

        // get the args for that specific include
        const includeArgs = args[include.getQualifiedIdentifier()] as IGQLArgs;

        // and apply the search for all the sinking properties
        include.getSinkingProperties().forEach((pd) => {
          if (!pd.isSearchable()) {
            return;
          }
          buildSQLQueryForProperty(
            serverData,
            itemDefinition,
            include,
            pd,
            includeArgs,
            secondBuilder,
            language,
            dictionary,
            false,
          );
        });
      });

      // if we have an specific exclusion state that can be ANY
      if (expectedExclusionState === IncludeExclusionState.ANY) {
        // then we add the excluded state to the subquery
        builder.orWhereColumn(prefix + EXCLUSION_STATE_SUFFIX, IncludeExclusionState.EXCLUDED);
      }
    });
  }
}

/**
 * Builds a sql query for an include
 * @param serverData the server data information
 * @param itemDefinition the item definition that contains the include
 * @param include the include in question
 * @param args the args as they come from the search module, specific for this item (not nested)
 * @param dictionary the dictionary to use to build the search
 */
 export function buildElasticQueryForInclude(
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  args: IGQLArgs,
  elasticQueryBuilder: ElasticQueryBuilder,
  language: string,
  dictionary: string,
) {
  // we need all these prefixes
  const prefix = include.getPrefixedQualifiedIdentifier();
  const exclusionStateQualifiedId = include.getQualifiedExclusionStateIdentifier();
  const expectedExclusionState = args[exclusionStateQualifiedId];

  // if the expected exclusion state is to be excluded
  if (expectedExclusionState === IncludeExclusionState.EXCLUDED) {
    // we tell the connection that is to be the case
    elasticQueryBuilder.mustTerm({
      exclusionStateQualifiedId: IncludeExclusionState.EXCLUDED,
    });
  } else {
    // otherwise if we are expecting something else like ANY and INCLUDED
    elasticQueryBuilder.must((builder) => {
      // we extract a subquery builder
      builder.should((secondBuilder) => {
        // and make a where query for all the properties
        elasticQueryBuilder.mustTerm({
          exclusionStateQualifiedId: IncludeExclusionState.INCLUDED,
        });

        // get the args for that specific include
        const includeArgs = args[include.getQualifiedIdentifier()] as IGQLArgs;

        // and apply the search for all the sinking properties
        include.getSinkingProperties().forEach((pd) => {
          if (!pd.isSearchable()) {
            return;
          }
          buildElasticQueryForProperty(
            serverData,
            itemDefinition,
            include,
            pd,
            includeArgs,
            secondBuilder,
            language,
            dictionary,
            false,
          );
        });
      });

      // if we have an specific exclusion state that can be ANY
      if (expectedExclusionState === IncludeExclusionState.ANY) {
        // then we add the excluded state to the subquery
        elasticQueryBuilder.shouldTerm({
          exclusionStateQualifiedId: IncludeExclusionState.EXCLUDED,
        });
      }
    });
  }
}
