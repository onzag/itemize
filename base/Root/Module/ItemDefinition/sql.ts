/**
 * This file specifies all the sql executions functions that are used in order
 * to query item definitions from the postgresql database, refer to this file
 * once you need to figure out how resources are requested
 *
 * @module
 */

import {
  CONNECTOR_SQL_COLUMN_ID_FK_NAME,
  CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  RESERVED_BASE_PROPERTIES_RQ,
  IOrderByRuleType,
  COMBINED_INDEX,
} from "../../../../constants";
import {
  convertSQLValueToRQValueForProperty,
  getSQLTableDefinitionForProperty,
  convertRQValueToSQLValueForProperty,
  buildSQLQueryForProperty,
  buildSQLStrSearchQueryForProperty,
  buildSQLOrderByForProperty,
  buildSQLOrderByForInternalRequiredProperty,
  getElasticSchemaForProperty,
  convertSQLValueToElasticSQLValueForProperty,
  buildElasticStrSearchQueryForProperty,
  buildElasticOrderByForProperty,
  buildElasticOrderByForInternalRequiredProperty,
  buildElasticQueryForProperty,
} from "./PropertyDefinition/sql";
import ItemDefinition from ".";
import {
  getSQLTableDefinitionForInclude,
  convertSQLValueToRQValueForInclude,
  convertRQValueToSQLValueForInclude,
  buildSQLQueryForInclude,
  getElasticSchemaForInclude,
  convertSQLValueToElasticSQLValueForInclude,
  buildElasticQueryForInclude,
} from "./Include/sql";
import { ISQLTableDefinitionType, ISQLSchemaDefinitionType, ISQLTableRowValue, ISQLStreamComposedTableRowValue, ConsumeStreamsFnType, IElasticIndexDefinitionType, IElasticSchemaDefinitionType } from "../../sql";
import { IRQValue, IRQRequestFields, IRQArgs } from "../../../../rq-querier";
import StorageProvider from "../../../../server/services/base/StorageProvider";
import { WhereBuilder } from "../../../../database/WhereBuilder";
import { OrderByBuilder } from "../../../../database/OrderByBuilder";
import type { ElasticQueryBuilder } from "../../../../server/elastic";
import { IElasticHighlightReply } from "./PropertyDefinition/types";
import type { IAppDataType } from "../../../../server";

export function getElasticSchemaForItemDefinition(
  itemDefinition: ItemDefinition,
  moduleIndexSchema: IElasticIndexDefinitionType,
  serverData: any,
  appData: IAppDataType,
) {
  const qualifiedName = itemDefinition.getQualifiedPathName();
  const resultSchema: IElasticSchemaDefinitionType = {
    [qualifiedName]: {
      properties: { ...moduleIndexSchema.properties },
      runtime: { ...moduleIndexSchema.runtime },
    },
  }

  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    const result = getElasticSchemaForProperty(itemDefinition, null, pd, serverData, appData);
    Object.assign(
      resultSchema[qualifiedName].properties,
      result.properties,
    );

    if (result.runtime) {
      Object.assign(
        resultSchema[qualifiedName].runtime,
        result.runtime,
      );
    }
  });

  // now we loop over the child items
  itemDefinition.getAllIncludes().forEach((i) => {
    const result = getElasticSchemaForInclude(itemDefinition, i, serverData, appData);
    Object.assign(
      resultSchema[qualifiedName].properties,
      result.properties,
    );

    if (result.runtime) {
      Object.assign(
        resultSchema[qualifiedName].runtime,
        result.runtime,
      );
    }
  });

  return resultSchema;
}

/**
 * Provides the table that is necesary to include this item definition as a whole
 * that is, this represents a whole table, that is necessary for this item to
 * be saved when populated, it basically adds up all the table bits
 * from all the properties and all the items, this does not include
 * prop extensions nor module level properties, nor base
 * @param itemDefinition the item definition in question
 * @returns a complete table definition type
 */
export function getSQLTableDefinitionForItemDefinition(itemDefinition: ItemDefinition): ISQLTableDefinitionType {
  // add all the standard fields
  const tableToConnect = itemDefinition.getParentModule().getQualifiedPathName();
  const resultTableSchema: ISQLTableDefinitionType = {
    [CONNECTOR_SQL_COLUMN_ID_FK_NAME]: {
      type: "TEXT",
      notNull: true,
      foreignKey: {
        id: "ITEM_TO_MODULE_CONNECTION",
        table: tableToConnect,
        column: "id",
        deleteAction: "cascade",
        updateAction: "cascade",
        level: 0,
      },
    },
    [CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]: {
      type: "TEXT",
      notNull: true,
      foreignKey: {
        id: "ITEM_TO_MODULE_CONNECTION",
        table: tableToConnect,
        column: "version",
        deleteAction: "cascade",
        updateAction: "cascade",
        level: 1,
      },
    },
  };

  // now we loop thru every property (they will all become columns)
  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    Object.assign(
      resultTableSchema,
      getSQLTableDefinitionForProperty(itemDefinition, null, pd),
    );
  });

  // now we loop over the child items
  itemDefinition.getAllIncludes().forEach((i) => {
    Object.assign(
      resultTableSchema,
      getSQLTableDefinitionForInclude(itemDefinition, i),
    );
  });

  const limiters = itemDefinition.getSearchLimiters();
  // now we need to add indexes to custom rules
  if (limiters && limiters.properties) {
    // if we have a powerful AND limiter
    if (limiters.condition === "AND") {
      // the combined offset is zero
      let indexCombinedOffset = 0;

      // now we loop over the rows we plan to index
      limiters.properties.forEach((limiter) => {
        // we get the property
        const property = itemDefinition.getPropertyDefinitionFor(limiter.id, true);
        // avoid extensions
        if (property.isExtension()) {
          return;
        }
        // and the columns that are expected to be added to the combined index
        const columnsToAddLimiter = property.getPropertyDefinitionDescription().sqlBtreeIndexable({
          serverData: null,
          id: limiter.id,
          prefix: "",
          property,
          itemDefinition: null,
          appData: null,
        });
        if (columnsToAddLimiter) {
          columnsToAddLimiter.forEach((columnName: string, index: number) => {
            resultTableSchema[columnName].index = {
              id: itemDefinition.getQualifiedPathName() + "__" + COMBINED_INDEX,
              type: "btree",
              level: indexCombinedOffset + index,
            }
          });
          indexCombinedOffset += columnsToAddLimiter.length;
        }
      });
    } else {
      // otherwise if it's an OR we add these custom singular indexes
      limiters.properties.forEach((limiter) => {
        // we get the property
        const property = itemDefinition.getPropertyDefinitionFor(limiter.id, true);
        // avoid extensions
        if (property.isExtension()) {
          return;
        }
        const columnsToAddLimiter = property.getPropertyDefinitionDescription().sqlBtreeIndexable({
          serverData: null,
          id: limiter.id,
          prefix: "",
          property,
          itemDefinition: null,
          appData: null,
        });
        if (columnsToAddLimiter) {
          columnsToAddLimiter.forEach((columnName: string, index: number) => {
            resultTableSchema[columnName].index = {
              id: limiter.id + "_CUSTOM_INDEX",
              type: "btree",
              level: index,
            }
          });
        }
      });
    }
  }

  return resultTableSchema;
}

/**
 * Provides all the schema of all the items, self and its children
 * that are included within this item definition and all the table names
 * that should be used using the qualified name
 * @param itemDefinition the item definition in question
 * @returns a partial sql schema definition for the whole database (adds tables)
 */
export function getSQLTablesSchemaForItemDefinition(itemDefinition: ItemDefinition): ISQLSchemaDefinitionType {
  // we add self
  const result = {
    [itemDefinition.getQualifiedPathName()]: getSQLTableDefinitionForItemDefinition(itemDefinition),
  };
  // loop over the children and add each one of them and whatever they have
  itemDefinition.getChildDefinitions().forEach((cIdef) => {
    Object.assign(
      result,
      getSQLTablesSchemaForItemDefinition(cIdef),
    );
  });
  // return that
  return result;
}

/**
 * Converts a SQL value directly coming from the database as it is
 * to a rq value for this specific item definition,
 * this includes the prop extensions and the reserved base properties
 * This value is FLATTENED
 * @param serverData the server data we are working with
 * @param itemDefinition the item definition in question
 * @param row the row value, with all the columns it has; the row
 * can be overblown with other field data, this will extract only the
 * data required for this item definition
 * @param rqFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}, ITEM_kitten: {purrs: {}}}
 * @returns a rq value
 */
export function convertSQLValueToRQValueForItemDefinition(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  row: ISQLTableRowValue,
  rqFields?: IRQRequestFields,
): IRQValue {
  // first we create the rq result
  const result: IRQValue = {};

  // now we take all the base properties that we have
  // in the rq model
  Object.keys(RESERVED_BASE_PROPERTIES_RQ).filter(
    (baseProperty) => !rqFields ? true : rqFields[baseProperty],
  ).forEach((basePropertyKey) => {
    result[basePropertyKey] = row[basePropertyKey] || null;
  });

  // we also take all the property definitions we have
  // in this item definitions, and convert them one by one
  // with the row data, this basically also gives rq value
  // in the key:value format
  itemDefinition.getParentModule().getAllPropExtensions().filter(
    (property) => !rqFields ? true : rqFields[property.getId()],
  ).concat(
    itemDefinition.getAllPropertyDefinitions().filter(
      (property) => !rqFields ? true : rqFields[property.getId()],
    ),
  ).forEach((pd) => {
    Object.assign(
      result,
      convertSQLValueToRQValueForProperty(serverData, appData, itemDefinition, null, pd, row),
    );
  });

  // now we do the same for the items
  itemDefinition.getAllIncludes().filter(
    (include) => !rqFields ? true : rqFields[include.getQualifiedIdentifier()],
  ).forEach((include) => {
    Object.assign(
      result,
      convertSQLValueToRQValueForInclude(
        serverData,
        appData,
        itemDefinition,
        include,
        row,
        !rqFields ? null : rqFields[include.getQualifiedIdentifier()],
      ),
    );
  });

  return result;
}

export function convertSQLValueToElasticSQLValueForItemDefinition(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  row: ISQLTableRowValue,
): IRQValue {
  const result: ISQLTableRowValue = {};

  // now we take all the base properties that we have
  // in the rq model
  Object.keys(RESERVED_BASE_PROPERTIES_RQ).forEach((basePropertyKey) => {
    result[basePropertyKey] = row[basePropertyKey] || null;
  });

  // we also take all the property definitions we have
  // in this item definitions, and convert them one by one
  // with the row data, this basically also gives rq value
  // in the key:value format
  itemDefinition.getParentModule().getAllPropExtensions().concat(
    itemDefinition.getAllPropertyDefinitions()
  ).forEach((pd) => {
    Object.assign(
      result,
      convertSQLValueToElasticSQLValueForProperty(serverData, appData, itemDefinition, null, pd, row),
    );
  });

  // now we do the same for the items
  itemDefinition.getAllIncludes().forEach((include) => {
    Object.assign(
      result,
      convertSQLValueToElasticSQLValueForInclude(
        serverData,
        appData,
        itemDefinition,
        include,
        row,
      ),
    );
  });

  return result;
}

/**
 * Converts a rq value, with all its items and everything it
 * has into a SQL row data value for this specific item definition
 * it doesn't include its prop extensions
 * @param serverData the server data
 * @param itemDefinition the item definition in question
 * @param data the rq data
 * @param uploadsContainer the uploads container from openstack
 * @param uploadsPrefix the uploads prefix of the container
 * @param dictionary the dictionary to use in full text search mode
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 * @returns a sql value
 */
export function convertRQValueToSQLValueForItemDefinition(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  data: IRQArgs,
  oldData: IRQValue,
  uploadsClient: StorageProvider<any>,
  domain: string,
  language: string | ISQLTableRowValue,
  dictionary: string | ISQLTableRowValue,
  partialFields?: IRQRequestFields | IRQArgs | IRQValue,
): ISQLStreamComposedTableRowValue {
  // first we create the row value
  const result: ISQLTableRowValue = {};
  const consumeStreamsFns: ConsumeStreamsFnType[] = []

  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    // we only add if partialFields allows it, or we don't have
    // partialFields set
    if (
      (partialFields && typeof partialFields[pd.getId()] !== "undefined") ||
      !partialFields
    ) {
      const addedFieldsByProperty = convertRQValueToSQLValueForProperty(
        serverData,
        appData,
        itemDefinition.getParentModule(),
        itemDefinition,
        null,
        pd,
        data,
        oldData,
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

  // also with the items
  itemDefinition.getAllIncludes().forEach((include) => {
    // we only add if partialFields allows it, or we don't have
    // partialFields set
    const includeNameInPartialFields = include.getQualifiedIdentifier();
    if (
      (partialFields && typeof partialFields[includeNameInPartialFields] !== "undefined") ||
      !partialFields
    ) {
      const innerPartialFields = !partialFields ? null : partialFields[includeNameInPartialFields];
      const addedFieldsByInclude = convertRQValueToSQLValueForInclude(
        serverData,
        appData,
        itemDefinition,
        include,
        data,
        oldData,
        uploadsClient,
        domain,
        language,
        dictionary,
        innerPartialFields,
      );
      Object.assign(
        result,
        addedFieldsByInclude.value,
      );
      consumeStreamsFns.push(addedFieldsByInclude.consumeStreams);
    }
  });

  return {
    value: result,
    consumeStreams: async (idVersionHandle: string) => {
      await Promise.all(consumeStreamsFns.map(fn => fn(idVersionHandle)));
    }
  };
}

/**
 * Builds a sql query for an item definition so that it can be
 * queried for searches
 * @param serverData the server data
 * @param itemDefinition the item definition that is being requested (normal form)
 * @param args the args from the search mode
 * @param whereBuilder the where builder instance
 * @param orderByBuilder the order by builder instance
 * @param dictionary the dictionary being used
 * @param search the search arg value
 * @param orderBy the order by rules
 * @returns a list of raw added selected fields
 */
export function buildSQLQueryForItemDefinition(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  args: IRQArgs,
  whereBuilder: WhereBuilder,
  orderByBuilder: OrderByBuilder,
  language: string,
  dictionary: string,
  search: string,
  orderBy: IOrderByRuleType,
) {
  const includedInSearchProperties: string[] = [];
  const includedInStrSearchProperties: string[] = [];
  const addedSelectFields: Array<[string, any[]]> = [];

  // first we need to get all the prop and extensions and build their query
  itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
    if (!pd.isSearchable()) {
      return;
    }

    const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
    const wasSearchedBy = buildSQLQueryForProperty(
      serverData,
      appData,
      itemDefinition,
      null,
      pd,
      args,
      whereBuilder,
      language,
      dictionary,
      isOrderedByIt,
    );
    if (wasSearchedBy) {
      if (Array.isArray(wasSearchedBy)) {
        addedSelectFields.push(wasSearchedBy);
      }
      includedInSearchProperties.push(pd.getId());
    };
  });

  // then we ned to add all the includes
  itemDefinition.getAllIncludes().forEach((include) => {
    buildSQLQueryForInclude(
      serverData,
      appData,
      itemDefinition,
      include,
      args,
      whereBuilder,
      language,
      dictionary,
    );
  });

  if (search) {
    // because these don't happen in the main, they don't get immediately executed but rather
    // during the await time
    whereBuilder.andWhere((builder) => {
      itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
        if (!pd.isSearchable() || pd.getConfigValue("generalSearchDisabled")) {
          return;
        }
        const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
        builder.orWhere((orBuilder) => {
          const wasStrSearchedBy = buildSQLStrSearchQueryForProperty(
            serverData,
            appData,
            itemDefinition,
            null,
            pd,
            args,
            search,
            orBuilder,
            language,
            dictionary,
            isOrderedByIt,
          );

          if (wasStrSearchedBy) {
            if (Array.isArray(wasStrSearchedBy)) {
              addedSelectFields.push(wasStrSearchedBy);
            }
            includedInStrSearchProperties.push(pd.getId());
          };
        });
      });

      // TODO add includes in the search
    });
  }

  if (orderBy) {
    const orderBySorted = Object.keys(orderBy).map((orderByProperty: string) => {
      return {
        property: orderByProperty,
        priority: orderBy[orderByProperty].priority,
        nulls: orderBy[orderByProperty].nulls,
        direction: orderBy[orderByProperty].direction,
      }
    }).sort((a, b) => a.priority - b.priority);

    orderBySorted.forEach((pSet) => {
      if (!itemDefinition.hasPropertyDefinitionFor(pSet.property, true)) {
        buildSQLOrderByForInternalRequiredProperty(
          itemDefinition,
          pSet.property,
          args,
          orderByBuilder,
          pSet.direction,
          pSet.nulls,
        );
        return;
      }

      const pd = itemDefinition.getPropertyDefinitionFor(pSet.property, true);
      const wasIncludedInSearch = includedInSearchProperties.includes(pSet.property);
      const wasIncludedInStrSearch = includedInStrSearchProperties.includes(pSet.property);

      buildSQLOrderByForProperty(
        serverData,
        appData,
        itemDefinition,
        null,
        pd,
        args,
        orderByBuilder,
        pSet.direction,
        pSet.nulls,
        wasIncludedInSearch,
        wasIncludedInStrSearch,
      );
    });
  }

  return addedSelectFields;
}

/**
 * Builds a elastic query for an item definition so that it can be
 * queried for searches
 * @param serverData the server data
 * @param itemDefinition the item definition that is being requested (normal form)
 * @param args the args from the search mode
 * @param fields the fields
 * @param elasticQueryBuilder the where builder instance
 * @param dictionary the dictionary being used
 * @param search the search arg value
 * @param orderBy the order by rules
 * @returns a list of raw added selected fields
 */
export function buildElasticQueryForItemDefinition(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  args: IRQArgs,
  elasticQueryBuilder: ElasticQueryBuilder,
  language: string,
  dictionary: string,
  search: string,
  orderBy: IOrderByRuleType,
  fullHighlights: number,
) {
  const includedInSearchProperties: string[] = [];
  const includedInStrSearchProperties: string[] = [];
  const finalHighlights: IElasticHighlightReply = {};

  // first we need to get all the prop and extensions and build their query
  itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
    if (!pd.isSearchable()) {
      return;
    }

    const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
    const wasSearchedBy = buildElasticQueryForProperty(
      serverData,
      appData,
      itemDefinition,
      null,
      pd,
      args,
      elasticQueryBuilder,
      language,
      dictionary,
      isOrderedByIt,
      fullHighlights,
    );
    if (wasSearchedBy) {
      includedInSearchProperties.push(pd.getId());
      Object.assign(finalHighlights, wasSearchedBy);
    };
  });

  // then we ned to add all the includes
  itemDefinition.getAllIncludes().forEach((include) => {
    // TODO add includes in highlights
    buildElasticQueryForInclude(
      serverData,
      appData,
      itemDefinition,
      include,
      args,
      elasticQueryBuilder,
      language,
      dictionary,
      fullHighlights,
    );
  });

  if (search) {
    // because these don't happen in the main, they don't get immediately executed but rather
    // during the await time
    elasticQueryBuilder.must((builder) => {
      itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
        if (!pd.isSearchable() || pd.getConfigValue("generalSearchDisabled")) {
          return;
        }
        const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
        builder.should((orBuilder) => {
          const wasStrSearchedBy = buildElasticStrSearchQueryForProperty(
            serverData,
            appData,
            itemDefinition,
            null,
            pd,
            args,
            search,
            orBuilder,
            language,
            dictionary,
            isOrderedByIt,
            fullHighlights,
          );

          if (wasStrSearchedBy) {
            includedInStrSearchProperties.push(pd.getId());
            Object.assign(finalHighlights, wasStrSearchedBy);
          } else {
            return false;
          }
        });
      });

      // TODO add includes in the search
    });
  }

  const orderByRule: any[] = [];
  if (orderBy) {
    const orderBySorted = Object.keys(orderBy).map((orderByProperty: string) => {
      return {
        property: orderByProperty,
        priority: orderBy[orderByProperty].priority,
        nulls: orderBy[orderByProperty].nulls,
        direction: orderBy[orderByProperty].direction,
      }
    }).sort((a, b) => a.priority - b.priority);

    orderBySorted.forEach((pSet) => {
      if (!itemDefinition.hasPropertyDefinitionFor(pSet.property, true)) {
        const orderRule = buildElasticOrderByForInternalRequiredProperty(
          itemDefinition,
          pSet.property,
          args,
          pSet.direction,
          pSet.nulls,
        );
        if (orderRule) {
          orderByRule.push(orderRule);
        }
        return;
      }

      const pd = itemDefinition.getPropertyDefinitionFor(pSet.property, true);
      const wasIncludedInSearch = includedInSearchProperties.includes(pSet.property);
      const wasIncludedInStrSearch = includedInStrSearchProperties.includes(pSet.property);

      const orderRule = buildElasticOrderByForProperty(
        serverData,
        appData,
        itemDefinition,
        null,
        pd,
        args,
        pSet.direction,
        pSet.nulls,
        wasIncludedInSearch,
        wasIncludedInStrSearch,
      );
      if (orderRule) {
        orderByRule.push(orderRule);
      }
    });
  }
  orderByRule.push({
    _score: "desc",
  });

  elasticQueryBuilder.sortBy(orderByRule);

  return finalHighlights;
}
