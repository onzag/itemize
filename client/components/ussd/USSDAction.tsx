import Root from "../../../base/Root";
import React from "react";
import type { IAppDataType } from "../../../server";
import RootRetriever from "../root/RootRetriever";

interface IUSSDActionProps {
  label: string;
  /**
   * An unique id that should identify this action specifically
   * in the entire tree, it should be unique accross all actions
   */
  id: string;
  requestInput?: string;
  onInput: (appData: IAppDataType, value: string) => string | void | Promise<string | void>;
}

interface IActualUSSDActionProps extends IUSSDActionProps {
  root: Root;
}

class ActualUSSDAction extends React.Component<IActualUSSDActionProps, {}> {
  public static getDerivedServerSideStateFromProps(props: IActualUSSDActionProps) {
    const ussdActionId = "USSD_" + props.id;
    props.root.setStateKey(ussdActionId, props.onInput);
    return {
      ussdActionId,
    }
  }
  render() {
    return (
      <div
        data-ussd-action={"USSD_" + this.props.id}
        data-ussd-label={this.props.label}
        data-ussd-action-input={typeof this.props.requestInput === "string" ? (this.props.requestInput || "NO_INPUT_LABEL") : ""}
      />
    )
  }
}

export default function USSDAction(props: IUSSDActionProps) {
  return (
    <RootRetriever>
      {(root) => (
        <ActualUSSDAction {...props} root={root.root} />
      )}
    </RootRetriever>
  );
}