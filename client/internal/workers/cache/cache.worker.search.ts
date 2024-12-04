/**
 * Contains the filtering and ordering function to perform actual searches
 * @module
 */

import { IRQArgs, IRQSearchRecord, IRQValue } from "../../../../rq-querier";
import { IDBPDatabase } from "idb";
import { fixFilesURLAt, ICacheDB, ICacheMatchType, QUERIES_TABLE_NAME, POLYFILLED_INDEXED_DB } from "./cache.worker.class";
import { PREFIX_GET, IOrderByRuleType } from "../../../../constants";
import type Root from "../../../../base/Root";
import type ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import { NanoSecondComposedDate } from "../../../../nanodate";

/**
 * An instance version of the error that contains
 * the raw object data of the error
 */
export class DataCorruptionError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DataCorruptionError.prototype);
  }
}

/**
 * Given a bunch of search records it will perform
 * the ordering and filtering of such records to return
 * them in place, as such it needs to read from the indexeddb
 * cache, this is a heavy process
 * @param rootProxy the root proxy we need to extract the functionality
 * for ordering and checking equality
 * @param db the database object
 * @param searchRecords the search records we got
 * @param searchArgs the search arguments (that would be sent to the server) an we need
 * to emulate for
 */
export async function search(
  rootProxy: Root,
  db: IDBPDatabase<ICacheDB>,
  searchRecords: IRQSearchRecord[],
  searchArgs: IRQArgs,
  returnSourceResults: boolean,
  cacheNoLimitOffset: boolean,
): Promise<
  {
    filteredRecords: IRQSearchRecord[];
    filteredResults: IRQValue[];
    sourceResults: ICacheMatchType[];
    count: number;
  }
> {
  let sourceResults: ICacheMatchType[] = returnSourceResults ? [] : null;

  // so now we get the new records with a promise where we read a bunch of stuff
  let newSearchRecords: IRQSearchRecordChecked[] = (await Promise.all(
    // for that we map our current records
    searchRecords.map(async (result, index) => {
      try {
        // and we need to read these values
        const queryIdentifier = `${PREFIX_GET}${result.type}.${result.id}.${result.version || ""}`;
        // db being true means is using polyfill
        const value = (db as any) === true ?
          POLYFILLED_INDEXED_DB[QUERIES_TABLE_NAME][queryIdentifier] :
          POLYFILLED_INDEXED_DB[QUERIES_TABLE_NAME][queryIdentifier] || await db.get(QUERIES_TABLE_NAME, queryIdentifier);

        if (returnSourceResults) {
          sourceResults[index] = value
        };

        // so no value, this is odd as this is considered data corruption because before coming
        // here all search records must have been ensured
        if (!value) {
          // This means data corruption, we cancel everything, data is corrupted
          throw new DataCorruptionError("Search function was executed with missing value for " + queryIdentifier);
        } else if (value.value === null) {
          // value is in deleted state, it will return null and it will be filtered
          // by the filter later on
          return null;
        } else {
          const checkedValue = await checkOne(rootProxy, result, value.value, searchArgs);
          if (!checkedValue.shouldBeIncluded) {
            return null;
          }
          return checkedValue;
        }
      } catch (err) {
        console.error(err);
        // pipe the data corruption error, we need to refetch we can fix this
        if (err instanceof DataCorruptionError) {
          throw err;
        }
        return null;
      }
    }),
  )).filter((r) => !!r);

  // so now we got to order by
  const orderBy: IOrderByRuleType = searchArgs.order_by as IOrderByRuleType || {};
  const orderBySorted = Object.keys(orderBy).map((orderByProperty: string) => {
    return {
      property: orderByProperty,
      priority: orderBy[orderByProperty].priority,
      nulls: orderBy[orderByProperty].nulls,
      direction: orderBy[orderByProperty].direction,
    }
  }).sort((a, b) => a.priority - b.priority);

  // and then after that, we need to apply the sorted on these records
  orderBySorted.forEach((sortRule) => {
    // for the nanodate based checks
    if (sortRule.property === "created_at" || sortRule.property === "edited_at") {
      newSearchRecords = newSearchRecords.sort((a, b) => {
        // remember if there's no value.DATA or the item is null or whatever
        // it would have never gotten here
        const aValue = a.searchResult.DATA[sortRule.property];
        const bValue = b.searchResult.DATA[sortRule.property];

        // however the value itself can be null
        if (aValue === bValue) {
          return 0;
        } else if (aValue === null) {
          return sortRule.nulls === "last" ? 1 : -1;
        } else if (bValue === null) {
          return sortRule.nulls === "last" ? -1 : 1;
        }

        const aComposed = new NanoSecondComposedDate(aValue);
        const bComposed = new NanoSecondComposedDate(bValue);

        if (aComposed.greaterThan(bComposed)) {
          return -1;
        } else {
          return 1;
        }
      });

      // we are done
      return;
    }

    // for the remaining orer by rules
    newSearchRecords = newSearchRecords.sort((a, b) => {
      // remember if there's no value.DATA or the item is null or whatever
      // it would have never gotten here
      const aValue = (a.searchResult as any).DATA[sortRule.property] as any;
      const bValue = (b.searchResult as any).DATA[sortRule.property] as any;

      // we need our registry
      const itemDefinition = rootProxy.registry[a.searchRecord.type] as ItemDefinition;
      const property = itemDefinition.getPropertyDefinitionFor(sortRule.property, true);
      const description = property.getPropertyDefinitionDescription();

      // no rule, can't do anything
      if (!description.localOrderBy) {
        return 0;
      }

      // otherwise we return this, we are
      // using or local order by function for it
      return description.localOrderBy(
        {
          direction: sortRule.direction,
          nulls: sortRule.nulls,
          a: aValue,
          b: bValue,
          id: property.getId(),
          prefix: "",
          property,
          itemDefinition,
        }
      )
    });
  });

  let filteredRecords = newSearchRecords.map((r) => r.searchRecord);
  let filteredResults = newSearchRecords.map((r) => r.searchResult);
  const count = filteredRecords.length;

  if (!cacheNoLimitOffset && (searchArgs.offset !== 0 || filteredRecords.length > (searchArgs.limit as number))) {
    // apply limit and offset
    filteredRecords = filteredRecords.slice(
      searchArgs.offset as number || 0,
      (searchArgs.offset as number || 0) + (searchArgs.limit as number || 0)
    );
  }

  // and now we can send only the 
  return {
    filteredRecords,
    sourceResults,
    filteredResults,
    count,
  };
}

/**
 * A helper interface for records that have been checked
 */
interface IRQSearchRecordChecked {
  /**
   * whether should record should be included
   */
  shouldBeIncluded: boolean;
  /**
   * The search record itself
   */
  searchRecord: IRQSearchRecord;
  /**
   * The search result
   */
  searchResult: IRQValue;
}

/**
 * Performs the check of a single search record to see if it passes
 * the filtering rules that the client is assigning to it
 * @param rootProxy the root proxy
 * @param searchRecord the search record itself
 * @param value the value we received for such record
 * @param searchArgs the search arguments
 */
async function checkOne(
  rootProxy: Root,
  searchRecord: IRQSearchRecord,
  value: IRQValue,
  searchArgs: any,
): Promise<IRQSearchRecordChecked> {
  // so by default we included
  let shouldBeIncluded = true;

  // we will always process the files, regardless on whether is included or not because
  // we may be returning the source results
  const idef = rootProxy.registry[(value as any).type] as ItemDefinition;
  if (idef && (value as any).id) {
    idef.getAllPropertyDefinitionsAndExtensions().forEach((p) => {
      fixFilesURLAt(value, idef, null, p);
    });
  
    idef.getAllIncludes().forEach((i) => {
      i.getSinkingProperties().forEach((sp) => {
        fixFilesURLAt(value, idef, i, sp);
      });
    });
  }

  // if there is no value, aka the item has been deleted
  if (!value) {
    shouldBeIncluded = false;
    // if there is no DATA aka the item is blocked
  } else if (!value.DATA) {
    shouldBeIncluded = false;
  } else if (searchArgs.types && !searchArgs.types.includes(searchRecord.type)) {
    shouldBeIncluded = false;
  } else if (typeof searchArgs.version_fiter !== "undefined" && searchRecord.version !== searchArgs.version_filter) {
    shouldBeIncluded = false;
  } else if (typeof searchArgs.version_fiter_out !== "undefined" && searchRecord.version === searchArgs.version_fiter_out) {
    shouldBeIncluded = false;
  } else if (searchArgs.ids_filter && !searchArgs.ids_filter.includes(searchRecord.id)) {
    shouldBeIncluded = false;
  } else if (searchArgs.ids_filter_out && searchArgs.ids_filter_out.includes(searchRecord.id)) {
    shouldBeIncluded = false;
  } else if (searchArgs.created_by_filter && !searchArgs.created_by_filter.includes((value.DATA as any).created_by)) {
    shouldBeIncluded = false;
  } else if (searchArgs.created_by_filter_out && searchArgs.created_by_filter_out.includes((value.DATA as any).created_by)) {
    shouldBeIncluded = false;
  } else if (searchArgs.created_by && searchArgs.created_by !== (value.DATA as any).created_by) {
    shouldBeIncluded = false;
  } else if (searchArgs.parent_type_filter && !searchArgs.parent_type_filter.includes((value.DATA as any).parent_type)) {
    shouldBeIncluded = false;
  } else if (searchArgs.parent_type_filter_out && searchArgs.parent_type_filter_out.includes((value.DATA as any).parent_type)) {
    shouldBeIncluded = false;
  } else if (searchArgs.parent_ids_filter && !searchArgs.parent_ids_filter.includes((value.DATA as any).parent_id)) {
    shouldBeIncluded = false;
  } else if (searchArgs.parent_ids_filter_out && searchArgs.parent_ids_filter_out.includes((value.DATA as any).parent_id)) {
    shouldBeIncluded = false;
  } else if (searchArgs.parent_null && (value.DATA as any).parent_id) {
    shouldBeIncluded = false;
  }

  if (shouldBeIncluded && searchArgs.parent_type) {
    const parentId = (value.DATA as any).parent_id;
    const parentType = (value.DATA as any).parent_type;
    const parentVersion = (value.DATA as any).parent_version;

    if (
      searchArgs.parent_type !== parentType ||
      searchArgs.parent_id !== parentId ||
      searchArgs.parent_version !== parentVersion
    ) {
      shouldBeIncluded = false;
    }
  }

  // otherwise if it passed that, let's check more specifically
  if (shouldBeIncluded) {
    // let's get the item definition this search is about
    const itemDefinition = rootProxy.registry[searchRecord.type] as ItemDefinition;
    // now we check every single property using the local search
    shouldBeIncluded = itemDefinition.getAllPropertyDefinitionsAndExtensions().every((pd) => {
      if (!pd.isSearchable()) {
        return true;
      }
      const description = pd.getPropertyDefinitionDescription();
      return description.localSearch({
        args: searchArgs,
        rqValue: value,
        property: pd,
        id: pd.getId(),
        prefix: "",
        itemDefinition,
        include: null,
      });
    });
    // and now we consider whether it should be included by includes if it passed all that
    if (shouldBeIncluded) {
      // so now we get all includes
      shouldBeIncluded = itemDefinition.getAllIncludes().every((i) => {
        // the expected exclusion state
        const expectedIncludeExclusionState = searchArgs[i.getQualifiedExclusionStateIdentifier()];
        // and the one that it currently has
        const appliedIncludeExclusionState = value[i.getQualifiedExclusionStateIdentifier()];
        // if we don't expect anything then this is basically true
        if (typeof expectedIncludeExclusionState === "undefined") {
          return true;
          // if we don't spect any state, but rather an specific one, and it doesn't match we return null
        } else if (
          expectedIncludeExclusionState !== "ANY" &&
          appliedIncludeExclusionState !== expectedIncludeExclusionState
        ) {
          return false;
        }

        // otherwise if we expect ANY or INCLUDED and it's not excluded, we check every single property
        if (expectedIncludeExclusionState !== "EXCLUDED" && appliedIncludeExclusionState !== "EXCLUDED") {
          return i.getSinkingProperties().every((sp) => {
            if (!sp.isSearchable()) {
              return true;
            }
            const sinkingDescription = sp.getPropertyDefinitionDescription();
            return sinkingDescription.localSearch({
              args: searchArgs,
              rqValue: value,
              property: sp,
              id: sp.getId(),
              prefix: i.getPrefixedQualifiedIdentifier(),
              itemDefinition,
              include: i,
            });
          });
        }
        // this will occur if it's ANY and it's EXCLUDED
        return true;
      });
    }
  }
  return {
    shouldBeIncluded,
    searchRecord,
    searchResult: value,
  };
}
