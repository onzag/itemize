import { ItemContext, ItemProvider } from "../../providers/item";
import React from "react";
import { DialogResponsive } from "./dialog";
import { ModuleProvider } from "../../providers/module";
import Entry from "../../components/property/Entry";
import SubmitActioner from "../../components/item/SubmitActioner";
import Snackbar from "./snackbar";
import { SubmitButton } from "./buttons";
import I18nRead from "../../components/localization/I18nRead";

interface IModerationCreateReportDialogProps {
  isOpened: boolean;
  onClose: () => void;
  messageNode?: React.ReactNode;
  title?: React.ReactNode;
  i18nFlagSuccess?: string;
  i18nButtonLabel?: string;
}

export function CreateReportDialog(props: IModerationCreateReportDialogProps) {
  return (
    <ItemContext.Consumer>
      {(itemContext) => {
        const expectedParent = {
          id: itemContext.forId,
          version: itemContext.forVersion || null,
          item: itemContext.idef.getQualifiedPathName(),
        };

        return (
          <ModuleProvider module="flag">
            <ItemProvider
              itemDefinition="flag"
              properties={[
                "reason",
                "reason_text",
              ]}
            >
              <DialogResponsive
                onClose={props.onClose}
                open={props.isOpened}
                title={props.title || (
                  <I18nRead id="report" />
                )}
                buttons={
                  <>
                    <SubmitButton
                      i18nId={props.i18nButtonLabel || "send"}
                      options={{
                        properties: ["reason", "reason_text"],
                        action: "add",
                        parentedBy: expectedParent,
                      }}
                      onSubmit={async (status) => {
                        if (!status.error) {
                          props.onClose();
                        }
                      }}
                    />
                  </>
                }
              >
                {props.messageNode || null}
                <Entry id="reason" />
                <Entry id="reason_text" />
              </DialogResponsive>

              <SubmitActioner>
                {(actioner) => (
                  <>
                    <Snackbar
                      id="flag-error"
                      severity="error"
                      i18nDisplay={actioner.submitError}
                      open={!!actioner.submitError}
                      onClose={actioner.dismissError}
                    />
                    <Snackbar
                      id="flag-success"
                      severity="success"
                      i18nDisplay={props.i18nFlagSuccess || "success"}
                      open={!!actioner.submitted}
                      onClose={actioner.dismissSubmitted}
                    />
                  </>
                )}
              </SubmitActioner>
            </ItemProvider>
          </ModuleProvider>
        )
      }}
    </ItemContext.Consumer>
  )
}