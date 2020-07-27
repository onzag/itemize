/**
 * Provides an item definition loader component that allows for functionality
 * regarding notFound, blocked, data accessible, loading, loaded, etc... with
 * conditional rendering
 *
 * @packageDocumentation
 */
import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { IBasicActionResponse } from "../../providers/item-definition";
/**
 * The arg that is passed to the children, which allows
 * for the conditional rendering
 */
export interface IItemDefinitionLoaderInfoArgType {
    /**
     * Whether it is ready and loaded
     */
    loaded: boolean;
    /**
     * Whether is currently loading, from memory, cache, etc...
     */
    loading: boolean;
    /**
     * Whether it is not found, as in the item definition did not exist
     */
    notFound: boolean;
    /**
     * Whether the item is blocked
     */
    blocked: boolean;
    /**
     * Whether you have moderation access to the item despite it being blocked
     */
    hasBlockedAccess: boolean;
    /**
     * An error that occured during loading, not found does not count for this
     * as null is a valid value, this is more for forbidden, no network, and whatnot
     */
    error: EndpointErrorType;
    /**
     * A function that allows to try to reload the element
     */
    reload: () => Promise<IBasicActionResponse>;
}
/**
 * The item definition loader itself props
 */
interface IItemDefinitionLoaderProps {
    children: (arg: IItemDefinitionLoaderInfoArgType) => React.ReactNode;
}
/**
 * The item definition loader component allows for conditional rendering depending on the
 * fact on the state of the item definition value itself, allows for many types of
 * rendering conditions depending on the loading state, should use mostly if a forId
 * is specified as that requires loading
 */
export default function ItemDefinitionLoader(props: IItemDefinitionLoaderProps): JSX.Element;
export {};
