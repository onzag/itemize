import { ISearchResult } from "../../../gql-querier";
import { IDBPDatabase } from "idb";
import { ICacheDB, QUERIES_TABLE_NAME } from "./cache.worker";
import { PREFIX_GET } from "../../../constants";

export async function search(
  db: IDBPDatabase<ICacheDB>,
  searchResults: ISearchResult[],
  searchArgs: any,
): Promise<ISearchResult[]> {
  const sortStrategyFunction = SORT_STRATEGIES[searchArgs.order_by];
  const newSearchResults: ISearchResult[] = (await Promise.all(
    searchResults.map(async (result) => {
      try {
        const queryIdentifier = `${PREFIX_GET}${result.type}.${result.id}`;
        const value = await db.get(QUERIES_TABLE_NAME, queryIdentifier);
        if (!value) {
          console.warn("Search function was executed with missing value for ", queryIdentifier);
          return null;
        } else if (value.value === null) {
          return null;
        } else {
          const checkedValue = await checkOne(result, value, searchArgs);
          if (!checkedValue.shouldBeIncluded) {
            return null;
          }
          return checkedValue;
        }
      } catch (err) {
        console.warn(err);
        return null;
      }
    }),
  )).filter((r) => !!r).sort(sortStrategyFunction).map((r) => r.searchResult);
  return newSearchResults;
}

interface ISearchResultChecked {
  shouldBeIncluded: boolean;
  value: any;
  searchResult: ISearchResult;
}

async function checkOne(
  searchResult: ISearchResult,
  value: any,
  searchArgs: any,
): Promise<ISearchResultChecked> {
  // TODO
  return {
    shouldBeIncluded: true,
    value,
    searchResult,
  };
}

const SORT_STRATEGIES = {
  DEFAULT: (a: ISearchResultChecked, b: ISearchResultChecked) => {
    return b.value.id - a.value.id;
  },
};
