import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IAppDataType } from "../../server";
import { ISSRCollectedQueryType } from "../../client/internal/providers/ssr-provider";
import { ISSRRule } from ".";
export interface ICollectionResult {
    lastModified: Date;
    signature: string;
    query: ISSRCollectedQueryType;
}
export declare class Collector {
    private results;
    private collectionStatuses;
    private collectionRequestsCbs;
    private collectionRequestsRejectedCbs;
    private appData;
    private appliedRule;
    constructor(appData: IAppDataType, rule: ISSRRule);
    getLastModified(): Date;
    getQueries(): ISSRCollectedQueryType[];
    getSignature(): string;
    collect(idef: ItemDefinition, id: number, version: string): Promise<void>;
}
