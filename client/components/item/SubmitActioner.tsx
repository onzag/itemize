/**
 * One of the most useful classes allows for submitting data to the server side
 * as well as do cleanup processes after the fact, most submit buttons will be built
 * upon this class, as it's meant to apply for a button, however it also allows
 * for displaying errors and trigger actions after success or failure
 *
 * @module
 */

import React, { useContext } from "react";
import { EndpointErrorType } from "../../../base/errors";
import {
  ItemContext,
  IActionSubmitResponse,
  IItemContextType,
  IActionSubmitOptions,
  IActionCleanOptions,
} from "../../providers/item";

/**
 * The actioner arg contains the properties that are useful
 * for doing the conditional logic for submitting
 */
export interface ISubmitActionerInfoArgType {
  /**
   * A submit error that happened after the last submit in this same
   * item definition slot
   */
  submitError: EndpointErrorType;
  /**
   * Whether it is currently submitting, useful for showing a spinner or something
   * as you cannot really submit while submitting
   */
  submitting: boolean;
  /**
   * Whether it submitted, sucesfully
   */
  submitted: boolean;
  /**
   * Dismiss the error state, and make it clean
   */
  dismissError: () => void;
  /**
   * dismiss the submitted state and make it clean
   */
  dismissSubmitted: () => void;
  /**
   * actual performs the submit, this function is a mirror from the
   * item definition provider one
   */
  submit: (options: IActionSubmitOptions) => Promise<IActionSubmitResponse>;
  /**
   * clean function, also a mirror from the item definition one
   */
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

/**
 * The submit actioner props, it basically takes nothing
 * but the children itself
 */
interface ISubmitActionerProps {
  /**
   * function to execute once when the execution reason
   * is true, if no execution reason is specified, it executes
   * immediately
   * 
   * check executeIf in order to setup conditional execution
   */
  execute?: (arg: ISubmitActionerInfoArgType) => void;
  /**
   * A boolean to specify whether it would execute, it will execute
   * if it is set to true
   * 
   * if the value is undefined the execution will trigger
   */
  executeIf?: boolean;
  children?: (arg: ISubmitActionerInfoArgType) => React.ReactNode;
}

/**
 * The actual props for the actual actioner which includes the context
 * data
 */
interface IActualSubmitActionerProps extends ISubmitActionerProps {
  itemContext: IItemContextType;
}

/**
 * This is where the main logic happens, its in its own class in order to be
 * able to perform conditional rendering and avoid useless updates
 */
class ActualSubmitActioner extends React.Component<IActualSubmitActionerProps> {
  private hasExecuted: boolean = false;
  public componentDidMount() {
    if (this.props.execute && (typeof this.props.executeIf === "undefined" || this.props.executeIf)) {
      this.props.execute(this.getArg());
      this.hasExecuted = true;
    }
  }
  public componentDidUpdate(): void {
    if (!this.hasExecuted && this.props.execute && (typeof this.props.executeIf === "undefined" || this.props.executeIf)) {
      this.props.execute(this.getArg());
      this.hasExecuted = true;
    }
  }
  public shouldComponentUpdate(nextProps: IActualSubmitActionerProps) {
    return nextProps.children !== this.props.children ||
      nextProps.executeIf !== this.props.executeIf ||
      nextProps.itemContext.submitError !== this.props.itemContext.submitError ||
      nextProps.itemContext.submitting !== this.props.itemContext.submitting ||
      nextProps.itemContext.submitted !== this.props.itemContext.submitted;
  }
  public getArg() {
    return ({
      submitError: this.props.itemContext.submitError,
      submitting: this.props.itemContext.submitting,
      submitted: this.props.itemContext.submitted,
      submit: this.props.itemContext.submit,
      dismissError: this.props.itemContext.dismissSubmitError,
      dismissSubmitted: this.props.itemContext.dismissSubmitted,
      clean: this.props.itemContext.clean,
    });
  }
  public render() {
    return this.props.children ? this.props.children(this.getArg()) : null;
  }
}

/**
 * The submit actioner class allows for usage for triggering submits (add or update)
 * as well as to retrieve the status of such actions, use to create submit buttons as
 * well as to create error messages if such actions failed, the actioner is not stateful
 * and it belongs to the context, meaning all actioners within the same context
 * share the same state
 *
 * @param props the props
 * @returns a react component
 */
export default function SubmitActioner(props: ISubmitActionerProps) {
  return (
    <ItemContext.Consumer>{
      (itemContext) => (
        <ActualSubmitActioner {...props} itemContext={itemContext}/>
      )
    }</ItemContext.Consumer>
  );
}

/**
 * Hook version for the submit actioner
 * @returns the submit actioner information
 */
export function useSubmitActioner(): ISubmitActionerInfoArgType {
  const itemContext = useContext(ItemContext);

  return ({
    submitError: itemContext.submitError,
    submitting: itemContext.submitting,
    submitted: itemContext.submitted,
    submit: itemContext.submit,
    dismissError: itemContext.dismissSubmitError,
    dismissSubmitted: itemContext.dismissSubmitted,
    clean: itemContext.clean,
  });
}