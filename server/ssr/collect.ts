import Root from "../../base/Root";
import { ISQLTableRowValue } from "../../base/Root/sql";
import { IGQLRequestFields } from "../../gql-querier";
import { ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import { filterAndPrepareGQLValue } from "../resolvers/basic";
import { logger, IAppDataType } from "../../server";
import { UNSPECIFIED_OWNER } from "../../constants";
import { ISSRCollectedQueryType } from "../../client/internal/providers/ssr-provider";
import { ISSRRule } from ".";

export interface ICollectionResult {
  status: boolean,
  lastModified: Date,
  signature: string,
  query: ISSRCollectedQueryType,
  subcollection: ICollectionResult[],
};

export async function collect(
  root: Root,
  appData: IAppDataType,
  appliedRule: ISSRRule,
  collectionPoint: [string, string, number, string],
  index: number,
  allCollectionPoints: Array<[string, string, number, string]>,
): Promise<ICollectionResult> {
  let status = true;
  let signature = "NULL";
  let lastModified: Date = null;
  let query: ISSRCollectedQueryType = null;
  let subcollection: ICollectionResult[] = null;

  const splittedModule = collectionPoint[0].split("/");
  const splittedIdef = collectionPoint[1].split("/");
  if (splittedModule[0] === "") {
    splittedModule.shift();
  }
  if (splittedIdef[0] === "") {
    splittedIdef.shift();
  }

  // get the module and the item definition
  const mod = root.getModuleFor(splittedModule);
  const idef = mod.getItemDefinitionFor(splittedIdef);

  // and we ask the cache for the given value
  let rowValue: ISQLTableRowValue;
  try {
    rowValue = await appData.cache.requestValue(idef, collectionPoint[2], collectionPoint[3]);
  } catch (err) {
    logger.error(
      "ssrGenerator [SERIOUS]: Collection failed due to request not passing",
      {
        errStack: err.stack,
        errMessage: err.message,
      }
    )
    // this is bad our collection failed, it's actually handled gracefully thanks
    // to the fact I can still serve no data at all and the app should work just fine
    // to a client, but nonetheless not a good idea
    status = false;
  }

  // now we check, is it not found, if it's not found, or signature is going to be
  // null for such index
  if (rowValue === null) {
    signature = "NOT_FOUND";
  } else {
    // otherwise it's when it was last modified
    lastModified = new Date(rowValue.last_modified);
    signature = rowValue.type + "." + rowValue.id + "." + (rowValue.version || "") + "." + rowValue.last_modified;
  }

  // now we build the fileds for the given role access
  const fields: IGQLRequestFields = idef.buildFieldsForRoleAccess(
    ItemDefinitionIOActions.READ,
    appliedRule.forUser.role,
    appliedRule.forUser.id,
    rowValue ? (idef.isOwnerObjectId() ? rowValue.id : rowValue.created_by) : UNSPECIFIED_OWNER,
  );

  // and if we have fields at all, such user might not even have access to them at all
  // which is possible
  if (fields) {
    // we build the value for the given role with the given fields
    const value = rowValue === null ? null : filterAndPrepareGQLValue(
      appData.knex, appData.cache.getServerData(), rowValue, fields, appliedRule.forUser.role, idef,
    );

    const valueToReturnToUser = value ? value.toReturnToUser : null;

    if (valueToReturnToUser && valueToReturnToUser.DATA) {
      const allProps = idef.getAllPropertyDefinitionsAndExtensions();
      const references = allProps.filter((p) => p.getType() === "integer" && p.getSubtype() === "reference");
      if (references.length) {
        const newCollectionList: Array<[string, string, number, string]> = [];
        references.forEach((ref) => {
          const referenceValue = valueToReturnToUser.DATA[ref.getId()];
          if (referenceValue) {
            const modPath = ref.getSpecialProperty("referencedModule") as string;
            const idefPath = ref.getSpecialProperty("referencedItemDefinition") as string;
            const searchByLanguage = ref.getSpecialProperty("referencedFilterByLanguage") as boolean;

            const newPoint: [string, string, number, string] = [
              modPath,
              idefPath,
              referenceValue,
              searchByLanguage ? appliedRule.language : null,
            ];

            const currentIndex = allCollectionPoints.findIndex(
              (point) =>
                point[0] === newPoint[0] &&
                point[1] === newPoint[1] &&
                point[2] === newPoint[2] &&
                point[3] === newPoint[3]
            );

            if (currentIndex < 0) {
              newCollectionList.push(newPoint);
            }
          }
        });

        if (newCollectionList.length) {
          subcollection = await Promise.all(
            newCollectionList.map(collect.bind(null, root, appData, appliedRule)),
          ) as ICollectionResult[];
        }
      }
    }

    // and now we build the query
    query = {
      idef: idef.getQualifiedPathName(),
      id: collectionPoint[2],
      version: collectionPoint[3],
      value: valueToReturnToUser,
      fields: value ? value.requestFields : null,
    };
  } else {
    // means no access to them at all
    query = null;
  }

  return {
    status,
    lastModified,
    signature,
    query,
    subcollection,
  };
}