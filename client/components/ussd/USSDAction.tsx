import Root from "../../../base/Root";
import React from "react";
import type { IAppDataType } from "../../../server";
import RootRetriever from "../root/RootRetriever";
import I18nRead from "../localization/I18nRead";

interface IUSSDActionProps {
  label: string;
  i18nCapitalize?: boolean;
  useI18n?: boolean;
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

interface IUSSDActionElement {
  label: string;
  actionId: string;
  input: string;
}

function USSDActionElement(props: IUSSDActionElement) {
  return (
    <div
      data-ussd-action={props.actionId}
      data-ussd-label={props.label}
      data-ussd-action-input={props.input}
    />
  )
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
    const actionId = "USSD_" + this.props.id;
    if (this.props.useI18n) {
      return (
        <I18nRead i18nId={this.props.label} capitalize={this.props.i18nCapitalize}>
          {(i18nLabel: string) => (
            typeof this.props.requestInput === "string" ? <I18nRead i18nId={this.props.requestInput} capitalize={this.props.i18nCapitalize}>
              {(i18nRequestInput: string) => (
                <USSDActionElement
                  label={i18nLabel}
                  actionId={actionId}
                  input={i18nRequestInput}
                />
              )}
            </I18nRead> : (
              <USSDActionElement
                label={i18nLabel}
                actionId={actionId}
                input=""
              />
            )
          )}
        </I18nRead>
      );
    }
    return (
      <USSDActionElement
        label={this.props.label}
        actionId={actionId}
        input={typeof this.props.requestInput === "string" ? (this.props.requestInput || "NO_INPUT_LABEL") : ""}
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