/// <reference types="react" />
import { EndpointErrorType } from "../../../base/errors";
import { IActionResponseWithSearchResults, IActionCleanOptions, IActionSearchOptions } from "../../providers/item-definition";
import { IGQLSearchRecord } from "../../../gql-querier";
export interface ISearchActionerInfoArgType {
    searchError: EndpointErrorType;
    dismissSearchResults: () => void;
    dismissSearchError: () => void;
    searching: boolean;
    searchRecords: IGQLSearchRecord[];
    search: (options?: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
    clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}
interface ISearchActionerProps {
    children: (arg: ISearchActionerInfoArgType) => any;
}
export default function SearchActioner(props: ISearchActionerProps): JSX.Element;
export {};
