import { IGQLSearchMatch } from "../../../../gql-querier";
import { IDBPDatabase } from "idb";
import { ICacheDB, QUERIES_TABLE_NAME } from "./cache.worker";
import { PREFIX_GET } from "../../../../constants";
import Root from "../../../../base/Root";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";

export async function search(
  rootProxy: Root,
  db: IDBPDatabase<ICacheDB>,
  searchResults: IGQLSearchMatch[],
  searchArgs: any,
): Promise<IGQLSearchMatch[]> {
  const sortStrategyFunction = SORT_STRATEGIES[searchArgs.order_by];
  const newSearchResults: IGQLSearchMatch[] = (await Promise.all(
    searchResults.map(async (result) => {
      try {
        const queryIdentifier = `${PREFIX_GET}${result.type}.${result.id}.${result.version || ""}`;
        const value = await db.get(QUERIES_TABLE_NAME, queryIdentifier);
        if (!value) {
          console.warn("Search function was executed with missing value for ", queryIdentifier);
          return null;
        } else if (value.value === null) {
          return null;
        } else {
          const checkedValue = await checkOne(rootProxy, result, value.value, searchArgs);
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

interface IGQLSearchMatchChecked {
  shouldBeIncluded: boolean;
  value: any;
  searchResult: IGQLSearchMatch;
}

async function checkOne(
  rootProxy: Root,
  searchResult: IGQLSearchMatch,
  value: any,
  searchArgs: any,
): Promise<IGQLSearchMatchChecked> {
  // so by default we included
  let shouldBeIncluded = true;

  // if there is no value, aka the item has been deleted
  if (!value) {
    shouldBeIncluded = false;
  // if there is no DATA aka the item is blocked
  } else if (!value.DATA) {
    shouldBeIncluded = false;
  }

  // otherwise if it passed that, let's check more specifically
  if (shouldBeIncluded) {
    // let's get the item definition this search is about
    const itemDefinition = rootProxy.registry[searchResult.type] as ItemDefinition;
    // now we check every single property using the local search
    shouldBeIncluded = itemDefinition.getAllPropertyDefinitionsAndExtensions().every((pd) => {
      if (!pd.isSearchable()) {
        return true;
      }
      const description = pd.getPropertyDefinitionDescription();
      return description.localSearch(searchArgs, value, pd.getId(), null);
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
            return sinkingDescription.localSearch(searchArgs, value, sp.getId(), i.getId());
          });
        }
        // this will occur if it's ANY and it's EXCLUDED
        return true;
      });
    }
  }
  return {
    shouldBeIncluded,
    value,
    searchResult,
  };
}

const SORT_STRATEGIES = {
  DEFAULT: (a: IGQLSearchMatchChecked, b: IGQLSearchMatchChecked) => {
    // TODO this should be done by created_at, this will suffice for now
    return b.value.id - a.value.id;
  },
};
