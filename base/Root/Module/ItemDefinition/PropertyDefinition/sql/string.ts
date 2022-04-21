/**
 * This file contains the sql server side functions for the string type
 * 
 * @module
 */

import { ISQLArgInfo, IElasticSearchInfo, ISQLEqualInfo, ISQLSearchInfo, ISQLStrSearchInfo, ISQLOutInfo, IArgInfo, IElasticStrSearchInfo } from "../types";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { exactStringSearchSubtypes } from "../types/string";
import { ELASTIC_INDEXABLE_NULL_VALUE, SQL_CONSTRAINT_PREFIX } from "../../../../../../constants";

export function stringSQL(arg: ISQLArgInfo) {
  const subtype = arg.property.getSubtype();

  return {
    // the sql prefix defined plus the id, eg for includes
    [arg.prefix + arg.id]: {
      // the type is defined
      type: subtype === "json" ? "JSONB" : "TEXT",
      // and we add an unique index if this property is deemed unique
      index: arg.property.isUnique() ? {
        type: "unique",
        id: SQL_CONSTRAINT_PREFIX + arg.prefix + arg.id,
        level: 0,
      } : (
        subtype ? ({
          type: subtype === "json" ? "gin" : "btree",
          id: SQL_CONSTRAINT_PREFIX + arg.prefix + arg.id,
          level: 0,
        }) : null
      ),
    },
  }
};

export function stringElastic(arg: ISQLArgInfo) {
  const subtype = arg.property.getSubtype();

  if (subtype === "json") {
    return {
      properties: {
        // totally dynamic object
        [arg.prefix + arg.id]: {
          type: "object",
          enabled: true,
          null_value: ELASTIC_INDEXABLE_NULL_VALUE,
        }
      },
    }
  }
  return {
    properties: {
      // the sql prefix defined plus the id, eg for includes
      [arg.prefix + arg.id]: {
        type: exactStringSearchSubtypes.includes(subtype) ? "keyword" : "text",
        null_value: ELASTIC_INDEXABLE_NULL_VALUE,
      },
    }
  }
}

export function stringSQLElasticIn(arg: ISQLOutInfo) {
  const subtype = arg.property.getSubtype();
  return {
    [arg.prefix + arg.id]: subtype === "json" ? (
      arg.row[arg.prefix + arg.id] === null ? null : JSON.parse(arg.row[arg.prefix + arg.id])
    ) : arg.row[arg.prefix + arg.id],
  };
}

/**
 * The string sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
export function stringSQLSearch(arg: ISQLSearchInfo): boolean {
  if (arg.property.getSubtype() === "json") {
    // can't search these
    return false;
  }

  // first we analyze and get the search name
  const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;
  const inName = PropertyDefinitionSearchInterfacesPrefixes.IN + arg.prefix + arg.id;

  // now we see if we have an argument for it
  if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
    // and we check it...
    if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
      arg.whereBuilder.andWhereColumn(
        arg.prefix + arg.id,
        (arg.args[searchName] as string),
      );
    } else {
      arg.whereBuilder.andWhere(
        JSON.stringify(arg.prefix + arg.id) + " ILIKE ? ESCAPE ?",
        [
          "%" + (arg.args[searchName] as string).replace(/\%/g, "\\%").replace(/\_/g, "\\_") + "%",
          "\\",
        ],
      );
    }

    return true;
  } else if (arg.args[searchName] === null) {
    arg.whereBuilder.andWhereColumnNull(
      arg.prefix + arg.id,
    );
    return true;
  }

  // now we see if we have an argument for it
  if (typeof arg.args[inName] !== "undefined" && arg.args[inName] !== null) {
    const tagCompareCheck = arg.args[inName] as string[];
    arg.whereBuilder.andWhere(
      JSON.stringify(arg.prefix + arg.id) + " = ANY(ARRAY[" + tagCompareCheck.map(() => "?").join(",") + "]::TEXT[])",
      tagCompareCheck,
    );

    return true;
  }

  return false;
}

export function stringElasticSearch(arg: IElasticSearchInfo): boolean {
  if (arg.property.getSubtype() === "json") {
    // can't elasticsearch this
    return false;
  }

  const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;
  const inName = PropertyDefinitionSearchInterfacesPrefixes.IN + arg.prefix + arg.id;

  if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
    // and we check it...
    if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
      arg.elasticQueryBuilder.mustTerm({
        [arg.prefix + arg.id]: arg.args[searchName] as any,
      });
    } else {
      arg.elasticQueryBuilder.mustMatch({
        [arg.prefix + arg.id]: arg.args[searchName] as any,
      });
    }

    return true;
  } else if (arg.args[searchName] === null) {
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id]: ELASTIC_INDEXABLE_NULL_VALUE,
    });
    return true;
  }

  // now we see if we have an argument for it
  if (typeof arg.args[inName] !== "undefined" && arg.args[inName] !== null) {
    const tagCompareCheck = arg.args[inName] as string[];
    arg.elasticQueryBuilder.mustTerms({
      [arg.prefix + arg.id]: tagCompareCheck
    });
    return true;
  }

  return false;
}

/**
 * The string FTS search functionality from the search field
 * @param arg the sql str search argument
 * @returns a boolean on whether it was searched by it
 */
export function stringSQLStrSearch(arg: ISQLStrSearchInfo) {
  if (arg.property.getSubtype() === "json") {
    return false;
  }

  // so we check it
  if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
    arg.whereBuilder.andWhereColumn(
      arg.prefix + arg.id,
      arg.search,
    );
  } else {
    arg.whereBuilder.andWhere(
      JSON.stringify(arg.prefix + arg.id) + " ILIKE ? ESCAPE ?",
      [
        "%" + arg.search.replace(/\%/g, "\\%").replace(/\_/g, "\\_") + "%",
        "\\",
      ],
    );
  }

  return true;
}

export function stringElasticStrSearch(arg: IElasticStrSearchInfo) {
  if (arg.property.getSubtype() === "json" || arg.boost === 0) {
    return false;
  }

  if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id]: arg.search,
    }, arg.boost);
  } else {
    arg.elasticQueryBuilder.mustMatch({
      [arg.prefix + arg.id]: arg.search,
    }, arg.boost);
  }

  return true;
}