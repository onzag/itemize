/**
 * This file contains the sql server side functions for the string type
 * 
 * @module
 */

import { ISQLArgInfo, IElasticSearchInfo, ISQLEqualInfo, ISQLSearchInfo, ISQLStrSearchInfo, ISQLOutInfo, IArgInfo, IElasticStrSearchInfo } from "../types";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { exactStringSearchSubtypes } from "../types/string";
import { SQL_CONSTRAINT_PREFIX } from "../../../../../../constants";

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
        },
      },
    }
  }

  return {
    properties: {
      // the sql prefix defined plus the id, eg for includes
      [arg.prefix + arg.id]: {
        type: exactStringSearchSubtypes.includes(subtype) ? "keyword" : "text",
      },
      [arg.prefix + arg.id + "_NULL"]: {
        type: "boolean",
      },
    }
  }
}

export function stringSQLElasticIn(arg: ISQLOutInfo) {
  const subtype = arg.property.getSubtype();
  const basis = {
    [arg.prefix + arg.id]: subtype === "json" ? (
      arg.row[arg.prefix + arg.id] === null ? null : JSON.parse(arg.row[arg.prefix + arg.id])
    ) : arg.row[arg.prefix + arg.id],
  };

  if (subtype !== "json") {
    basis[arg.prefix + arg.id + "_NULL"] = !arg.row[arg.prefix + arg.id];
  }

  return basis;
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
  const isNonCaseSensitive = arg.property.isNonCaseSensitiveUnique();

  // now we see if we have an argument for it
  if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
    // and we check it...
    if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
      if (isNonCaseSensitive) {
        arg.whereBuilder.andWhere(
          "LOWER(" + JSON.stringify(arg.prefix + arg.id) + ") = ?",
          [
            (arg.args[searchName] as string).toLowerCase(),
          ],
        );
      } else {
        arg.whereBuilder.andWhereColumn(
          arg.prefix + arg.id,
          (arg.args[searchName] as string),
        );
      }
    } else {
      // already case insensitive
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

    if (tagCompareCheck.length === 1) {
      if (isNonCaseSensitive) {
        arg.whereBuilder.andWhere(
          "LOWER(" + JSON.stringify(arg.prefix + arg.id) + ") = ?",
          [
            tagCompareCheck[0].toLowerCase(),
          ],
        );
      } else {
        arg.whereBuilder.andWhereColumn(
          arg.prefix + arg.id,
          tagCompareCheck[0],
        );
      }
    } else {
      let colToMatch = JSON.stringify(arg.prefix + arg.id);
      if (isNonCaseSensitive) {
        colToMatch = "LOWER(" + colToMatch + ")";
      }
      arg.whereBuilder.andWhere(
        colToMatch + " = ANY(ARRAY[" + tagCompareCheck.map(() => "?").join(",") + "]::TEXT[])",
        tagCompareCheck.map((v) => isNonCaseSensitive ? v.toLowerCase() : v),
      );
    }

    return true;
  }

  return false;
}

export function stringElasticSearch(arg: IElasticSearchInfo) {
  if (arg.property.getSubtype() === "json") {
    // can't elasticsearch this
    return null;
  }

  const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;
  const inName = PropertyDefinitionSearchInterfacesPrefixes.IN + arg.prefix + arg.id;

  if (typeof arg.args[searchName] !== "undefined") {
    const value = arg.args[searchName] as any;
    // and we check it...
    if (value === null) {
      arg.elasticQueryBuilder.mustTerm({
        [arg.prefix + arg.id + "_NULL"]: true,
      }, {
        boost: arg.boost,
        groupId: searchName,
        propertyId: arg.prefix + arg.id,
      });
      return {};
    } else if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
      arg.elasticQueryBuilder.mustTerm({
        [arg.prefix + arg.id]: value,
      }, {
        boost: arg.boost,
        groupId: searchName,
        propertyId: arg.prefix + arg.id,
      });
      return {};
    } else {
      arg.elasticQueryBuilder.mustMatchPhrasePrefix({
        [arg.prefix + arg.id]: value,
      }, {
        boost: arg.boost,
        groupId: searchName,
        propertyId: arg.prefix + arg.id,
      });
      return {
        [arg.prefix + arg.id]: {
          name: arg.prefix + arg.id,
          match: value,
          property: arg.property,
          include: arg.include,
        },
      };
    }
  }

  // now we see if we have an argument for it
  if (typeof arg.args[inName] !== "undefined" && arg.args[inName] !== null) {
    const tagCompareCheck = arg.args[inName] as string[];
    if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
      arg.elasticQueryBuilder.mustTerms({
        [arg.prefix + arg.id]: tagCompareCheck
      }, {
        boost: arg.boost,
        groupId: inName,
        propertyId: arg.prefix + arg.id,
      });
    } else {
      arg.elasticQueryBuilder.must({
        bool: {
          should: tagCompareCheck.map((c) => {
            return (
              {
                [arg.prefix + arg.id]: {
                  match: c,
                }
              }
            );
          }),
          boost: arg.boost,
        }
      }, {
        groupId: inName,
        propertyId: arg.prefix + arg.id,
      });
    }
    return {};
  }

  return null;
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
    return null;
  }

  if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id]: arg.search,
    }, {
      boost: arg.boost,
      groupId: "STRSEARCH",
      propertyId: arg.prefix + arg.id,
    });
    return {};
  } else {
    arg.elasticQueryBuilder.mustMatchPhrasePrefix({
      [arg.prefix + arg.id]: arg.search,
    }, {
      boost: arg.boost,
      groupId: "STRSEARCH",
      propertyId: arg.prefix + arg.id,
    });
    return {
      [arg.prefix + arg.id]: {
        name: arg.prefix + arg.id,
        match: arg.search,
        property: arg.property,
        include: arg.include,
      },
    };
  }
}