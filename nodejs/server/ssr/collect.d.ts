import Root from "../../base/Root";
import { IAppDataType } from "../../server";
import { ISSRCollectedQueryType } from "../../client/internal/providers/ssr-provider";
import { ISSRRule } from ".";
export interface ICollectionResult {
    status: boolean;
    lastModified: Date;
    signature: string;
    query: ISSRCollectedQueryType;
    subcollection: ICollectionResult[];
}
export declare function collect(root: Root, appData: IAppDataType, appliedRule: ISSRRule, collectionPoint: [string, string, number, string], index: number, allCollectionPoints: Array<[string, string, number, string]>): Promise<ICollectionResult>;
