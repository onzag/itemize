/// <reference types="react" />
import { EndpointErrorType } from "../../../base/errors";
import { IBasicActionResponse } from "../../providers/item-definition";
export interface IItemDefinitionLoaderInfoArgType {
    loaded: boolean;
    loading: boolean;
    notFound: boolean;
    blocked: boolean;
    hasBlockedAccess: boolean;
    error: EndpointErrorType;
    reload: () => Promise<IBasicActionResponse>;
}
interface IItemDefinitionLoader {
    children: (arg: IItemDefinitionLoaderInfoArgType) => any;
}
/**
 * This safe element assumes success and will render success unless proven
 * otherwise, there's no loading, it will use whatever it has stored meanwhile
 */
export default function ItemDefinitionLoader(props: IItemDefinitionLoader): JSX.Element;
export {};
