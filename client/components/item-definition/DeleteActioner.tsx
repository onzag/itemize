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
  ItemDefinitionContext,
  IItemDefinitionContextType,
  IActionCleanOptions,
  IActionDeleteOptions,
  IBasicActionResponse,
} from "../../providers/item-definition";

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
  itemDefinitionContext: IItemDefinitionContextType;
}

/**
 * This is where the main logic happens, its in its own class in order to be
 * able to perform conditional rendering and avoid useless updates
 */
class ActualDeleteActioner extends React.Component<IActualDeleteActionerProps> {
  public shouldComponentUpdate(nextProps: IActualDeleteActionerProps) {
    return nextProps.children !== this.props.children ||
      nextProps.itemDefinitionContext.deleteError !== this.props.itemDefinitionContext.deleteError ||
      nextProps.itemDefinitionContext.deleting !== this.props.itemDefinitionContext.deleting ||
      nextProps.itemDefinitionContext.deleted !== this.props.itemDefinitionContext.deleted;
  }
  public render() {
    return this.props.children({
      deleteError: this.props.itemDefinitionContext.deleteError,
      deleting: this.props.itemDefinitionContext.deleting,
      deleted: this.props.itemDefinitionContext.deleted,
      delete: this.props.itemDefinitionContext.delete,
      dismissError: this.props.itemDefinitionContext.dismissDeleteError,
      dismissDeleted: this.props.itemDefinitionContext.dismissDeleted,
      clean: this.props.itemDefinitionContext.clean,
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
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualDeleteActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}
