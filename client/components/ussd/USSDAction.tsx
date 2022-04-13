import Root from "../../../base/Root";
import React from "react";
import type { IAppDataType } from "../../../server";
import RootRetriever from "../root/RootRetriever";
import uuid from "uuid";

interface IUSSDActionProps {
  label: string;
  onInput: (appData: IAppDataType, value: string) => string | void | Promise<string | void>;
}

interface IActualUSSDActionProps extends IUSSDActionProps {
  root: Root;
}

interface IUSSDActionState {
  ussdActionId: string;
}

class ActualUSSDAction extends React.Component<IActualUSSDActionProps, IUSSDActionState> {
  public static getDerivedServerSideStateFromProps(props: IActualUSSDActionProps) {
    const ussdActionId = "USSD" + uuid.v4().replace(/\-/g, "");
    props.root.setStateKey(ussdActionId, props.onInput);
    return {
      ussdActionId,
    }
  }
  render() {
    return (
      <div data-ussd-action={this.state.ussdActionId} data-label={this.props.label} />
    )
  }
}

export function USSDAction(props: IUSSDActionProps) {
  return (
    <RootRetriever>
      {(root) => (
        <ActualUSSDAction {...props} root={root.root} />
      )}
    </RootRetriever>
  );
}