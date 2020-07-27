/**
 * One of the most useful classes allows for submitting data to the server side
 * as well as do cleanup processes after the fact, most submit buttons will be built
 * upon this class, as it's meant to apply for a button, however it also allows
 * for displaying errors and trigger actions after success or failure
 *
 * @packageDocumentation
 */

import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import {
  ItemDefinitionContext,
  IActionResponseWithId,
  IItemDefinitionContextType,
  IActionSubmitOptions,
  IActionCleanOptions,
} from "../../providers/item-definition";

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
  submit: (options: IActionSubmitOptions) => Promise<IActionResponseWithId>;
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
  children: (arg: ISubmitActionerInfoArgType) => React.ReactNode;
}

/**
 * The actual props for the actual actioner which includes the context
 * data
 */
interface IActualSubmitActionerProps extends ISubmitActionerProps {
  itemDefinitionContext: IItemDefinitionContextType;
}

/**
 * This is where the main logic happens, its in its own class in order to be
 * able to perform conditional rendering and avoid useless updates
 */
class ActualSubmitActioner extends React.Component<IActualSubmitActionerProps> {
  public shouldComponentUpdate(nextProps: IActualSubmitActionerProps) {
    return nextProps.children !== this.props.children ||
      nextProps.itemDefinitionContext.submitError !== this.props.itemDefinitionContext.submitError ||
      nextProps.itemDefinitionContext.submitting !== this.props.itemDefinitionContext.submitting ||
      nextProps.itemDefinitionContext.submitted !== this.props.itemDefinitionContext.submitted;
  }
  public render() {
    return this.props.children({
      submitError: this.props.itemDefinitionContext.submitError,
      submitting: this.props.itemDefinitionContext.submitting,
      submitted: this.props.itemDefinitionContext.submitted,
      submit: this.props.itemDefinitionContext.submit,
      dismissError: this.props.itemDefinitionContext.dismissSubmitError,
      dismissSubmitted: this.props.itemDefinitionContext.dismissSubmitted,
      clean: this.props.itemDefinitionContext.clean,
    });
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
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualSubmitActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}
