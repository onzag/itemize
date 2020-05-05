import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import {
  ItemDefinitionContext,
  IActionResponseWithId,
  IItemDefinitionContextType,
  IActionSubmitOptions,
  IActionCleanOptions,
} from "../../providers/item-definition";

export interface ISubmitActionerInfoArgType {
  submitError: EndpointErrorType;
  dismissError: () => void;
  dismissSubmitted: () => void;
  submitting: boolean;
  submitted: boolean;
  submit: (options: IActionSubmitOptions) => Promise<IActionResponseWithId>;
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

interface ISubmitActionerProps {
  children: (arg: ISubmitActionerInfoArgType) => React.ReactNode;
}

interface IActualSubmitActionerProps extends ISubmitActionerProps {
  itemDefinitionContext: IItemDefinitionContextType;
}

class ActualSubmitActioner extends React.Component<IActualSubmitActionerProps, {}> {
  public shouldComponentUpdate(nextProps) {
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

export default function SubmitActioner(props: ISubmitActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualSubmitActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}