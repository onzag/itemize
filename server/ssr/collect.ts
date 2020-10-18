import Root from "../../base/Root";
import { ISQLTableRowValue } from "../../base/Root/sql";
import { IGQLRequestFields } from "../../gql-querier";
import ItemDefinition, { ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import { filterAndPrepareGQLValue } from "../resolvers/basic";
import { logger, IAppDataType } from "../../server";
import { UNSPECIFIED_OWNER } from "../../constants";
import { ISSRCollectedQueryType } from "../../client/internal/providers/ssr-provider";
import { ISSRRule } from ".";

export interface ICollectionResult {
  lastModified: Date,
  signature: string,
  query: ISSRCollectedQueryType,
};

export class Collector {
  private results: ICollectionResult[] = [];
  private collectionStatuses: {
    [mergedID: string]: boolean;
  } = {};
  private collectionRequestsCbs: {
    [mergedID: string]: Array<() => void>;
  } = {};
  private collectionRequestsRejectedCbs: {
    [mergedID: string]: Array<() => void>;
  } = {};
  private appData: IAppDataType;
  private appliedRule: ISSRRule;

  constructor(appData: IAppDataType, rule: ISSRRule) {
    this.appData = appData;
    this.appliedRule = rule;

    this.collect = this.collect.bind(this);
  }
  public getLastModified() {
    let final = new Date(parseInt(this.appData.buildnumber));
    this.results.forEach((r) => {
      // last modified can be null due to it being not found
      if (r.lastModified && r.lastModified.getTime() > final.getTime()) {
        final = r.lastModified;
      }
    });
    return final;
  }
  public getQueries() {
    return this.results.map((r) => r.query);
  }
  public getSignature() {
    return this.results.map((r) => r.signature).sort((a, b) => {
      return a.localeCompare(b);
    }).join(";");
  }
  public async collect(idef: ItemDefinition, id: number, version: string): Promise<void> {
    const mergedID = idef.getQualifiedPathName() + "." + id + "." + (version || "");

    // request has been done and it's ready
    if (this.collectionStatuses[mergedID]) {
      return;
    } else if (this.collectionStatuses[mergedID] === false) {
      // request is in progress, add it to queue
      return new Promise((resolve, reject) => {
        this.collectionRequestsCbs[mergedID].push(resolve);
        this.collectionRequestsRejectedCbs[mergedID].push(reject);
      });
    }

    // mark it as in progress
    this.collectionStatuses[mergedID] = false;
    this.collectionRequestsCbs[mergedID] = [];
    this.collectionRequestsRejectedCbs[mergedID] = [];

    let signature = "NULL";
    let lastModified: Date = null;
    let query: ISSRCollectedQueryType = null;

    // and we ask the cache for the given value
    let rowValue: ISQLTableRowValue;
    try {
      rowValue = await this.appData.cache.requestValue(idef, id, version);
    } catch (err) {
      logger.error(
        "ssrGenerator [SERIOUS]: Collection failed due to request not passing",
        {
          errStack: err.stack,
          errMessage: err.message,
        }
      )

      // reject all these will also cause rendering to crash as the bottom line
      this.collectionRequestsRejectedCbs[mergedID].forEach((r) => r());

      // this is bad our collection failed, this will cause the rendering to crash
      // and it will fallback to no SSR
      throw err;
    }

    // now we check, is it not found, if it's not found, or signature is going to be
    // null for such index
    if (rowValue === null) {
      signature = idef.getQualifiedPathName() + "." + id + "." + (version || "") + ".NOT_FOUND";
    } else {
      // otherwise it's when it was last modified
      lastModified = new Date(rowValue.last_modified);
      signature = rowValue.type + "." + rowValue.id + "." + (rowValue.version || "") + "." + rowValue.last_modified;
    }

    // now we build the fileds for the given role access
    const fields: IGQLRequestFields = idef.buildFieldsForRoleAccess(
      ItemDefinitionIOActions.READ,
      this.appliedRule.forUser.role,
      this.appliedRule.forUser.id,
      rowValue ? (idef.isOwnerObjectId() ? rowValue.id : rowValue.created_by) : UNSPECIFIED_OWNER,
    );

    // and if we have fields at all, such user might not even have access to them at all
    // which is possible
    if (fields) {
      // we build the value for the given role with the given fields
      const value = rowValue === null ? null : filterAndPrepareGQLValue(
        this.appData.knex, this.appData.cache.getServerData(), rowValue, fields, this.appliedRule.forUser.role, idef,
      );

      const valueToReturnToUser = value ? value.toReturnToUser : null;

      // and now we build the query
      query = {
        idef: idef.getQualifiedPathName(),
        id,
        version,
        value: valueToReturnToUser,
        fields: value ? value.requestFields : null,
      };
    } else {
      // means no access to them at all
      query = null;
    }

    const result = {
      lastModified,
      signature,
      query,
    };
    this.results.push(result);
    idef.applyValue(
      query.id,
      query.version,
      query.value,
      false,
      query.fields,
      false,
    );

    this.collectionStatuses[mergedID] = true;
    this.collectionRequestsCbs[mergedID].forEach((r) => r());
  }
}