/// <reference types="react" />
import { IItemDefinitionProviderProps } from "../../providers/item-definition";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IGQLSearchRecord } from "../../../gql-querier";
import { EndpointErrorType } from "../../../base/errors";
interface IItemDefinitionProviderPropsWithKey extends Pick<IItemDefinitionProviderProps, Exclude<keyof IItemDefinitionProviderProps, 'children'>> {
    key: string;
}
interface IGQLSearchRecordWithPopulateData extends IGQLSearchRecord {
    providerProps: IItemDefinitionProviderPropsWithKey;
    itemDefinition: ItemDefinition;
}
export interface ISearchLoaderArg {
    searchId: string;
    searchRecords: IGQLSearchRecordWithPopulateData[];
    pageCount: number;
    totalCount: number;
    accessibleCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    error: EndpointErrorType;
    dismissError: () => void;
    refreshPage: () => void;
}
export interface ISearchLoaderProps {
    pageSize: number;
    currentPage: number;
    children: (arg: ISearchLoaderArg) => any;
    includePolicies?: boolean;
    cleanOnDismount?: boolean;
    static?: "TOTAL" | "NO_LISTENING";
    useSearchHistory?: boolean;
    onSearchDataChange?: () => number | void;
}
export default function SearchLoader(props: ISearchLoaderProps): JSX.Element;
export {};
