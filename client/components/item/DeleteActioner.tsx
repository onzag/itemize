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
import {
  ItemContext,
  IItemContextType,
  IActionCleanOptions,
  IActionDeleteOptions,
  IBasicActionResponse,
} from "../../providers/item";

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
 * The actual props for the actual actioner which includes the context
 * data
 */
interface IActualDeleteActionerProps extends IDeleteActionerProps {
  itemContext: IItemContextType;
}

/**
 * This is where the main logic happens, its in its own class in order to be
 * able to perform conditional rendering and avoid useless updates
 */
class ActualDeleteActioner extends React.Component<IActualDeleteActionerProps> {
  public shouldComponentUpdate(nextProps: IActualDeleteActionerProps) {
    return nextProps.children !== this.props.children ||
      nextProps.itemContext.deleteError !== this.props.itemContext.deleteError ||
      nextProps.itemContext.deleting !== this.props.itemContext.deleting ||
      nextProps.itemContext.deleted !== this.props.itemContext.deleted;
  }
  public render() {
    return this.props.children({
      deleteError: this.props.itemContext.deleteError,
      deleting: this.props.itemContext.deleting,
      deleted: this.props.itemContext.deleted,
      delete: this.props.itemContext.delete,
      dismissError: this.props.itemContext.dismissDeleteError,
      dismissDeleted: this.props.itemContext.dismissDeleted,
      clean: this.props.itemContext.clean,
    });
  }
}

/**
 * The delete actioner class allows for usage for triggering a delete of
 * a given item definition slot
 *
 * @param props the props
 * @returns a react component
 */
export default function DeleteActioner(props: IDeleteActionerProps) {
  return (
    <ItemContext.Consumer>{
      (itemContext) => (
        <ActualDeleteActioner {...props} itemContext={itemContext}/>
      )
    }</ItemContext.Consumer>
  );
}
