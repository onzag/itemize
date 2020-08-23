/**
 * One of the most useful classes allows for deleting data to the server side
 * as well as do cleanup processes after the fact, most delete buttons will be built
 * upon this class, as it's meant to apply for a button, however it also allows
 * for displaying errors and trigger actions after success or failure
 *
 * @packageDocumentation
 */
import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { IActionCleanOptions, IActionDeleteOptions, IBasicActionResponse } from "../../providers/item-definition";
/**
 * The actioner arg contains the properties that are useful
 * for doing the conditional logic for deleting
 */
export interface IDeleteActionerInfoArgType {
    /**
     * A delete error that happened after the last delete in this same
     * item definition slot
     */
    deleteError: EndpointErrorType;
    /**
     * Whether it is currently deleting, useful for showing a spinner or something
     * as you cannot really delete while deleting
     */
    deleting: boolean;
    /**
     * Whether it deleted, sucesfully
     */
    deleted: boolean;
    /**
     * Dismiss the error state, and make it clean
     */
    dismissError: () => void;
    /**
     * dismiss the deleted state and make it clean
     */
    dismissDeleted: () => void;
    /**
     * actual performs the delete, this function is a mirror from the
     * item definition provider one
     */
    delete: (options: IActionDeleteOptions) => Promise<IBasicActionResponse>;
    /**
     * clean function, also a mirror from the item definition one
     */
    clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}
/**
 * The delete actioner props, it basically takes nothing
 * but the children itself
 */
interface IDeleteActionerProps {
    children: (arg: IDeleteActionerInfoArgType) => React.ReactNode;
}
/**
 * The delete actioner class allows for usage for triggering a delete of
 * a given item definition slot
 *
 * @param props the props
 * @returns a react component
 */
export default function DeleteActioner(props: IDeleteActionerProps): JSX.Element;
export {};
