import React from "react";
import { Button, createStyles, withStyles, WithStyles, Icon } from "@material-ui/core";
import { DialogResponsive } from "../../general/dialog";
import { I18nRead, I18nReadError } from "../../../../itemize/client/components/localization";
import { PolicyPathType } from "../../../../itemize/client/providers/item-definition";
import { Entry } from "../../../../itemize/client/components/property";
import { GraphQLEndpointErrorType } from "../../../../itemize/base/errors";

const PolicyConfirmDialogStyles = createStyles({});

interface IPolicyConfirmDialogProps extends WithStyles<typeof PolicyConfirmDialogStyles> {
  open: boolean;
  error?: GraphQLEndpointErrorType;
  dismissError: () => void;
  onClose: () => void;
  onSubmit: () => void;
  policyType: string;
  policyName: string;
  policyEntries: PolicyPathType[];
}

export const PolicyConfirmDialog = withStyles(PolicyConfirmDialogStyles)((props: IPolicyConfirmDialogProps) => {
  return (
    <I18nRead id="title" policyType={props.policyType} policyName={props.policyName}>
      {(i18nTitle: string) => (
        <DialogResponsive
          open={props.open}
          onClose={props.onClose}
          title={i18nTitle}
          buttons={
            <I18nRead id="ok">
              {(i18nOk: string) => (
                <Button
                  color="primary"
                  aria-label={i18nOk}
                  startIcon={<Icon>done</Icon>}
                  onClick={props.onSubmit}
                >
                  {i18nOk}
                </Button>
              )}
            </I18nRead>
          }
        >
          <form>
            {props.policyEntries.map((policyEntry, index) => {
              const [policyType, policyName, id] = policyEntry;
              return (
                <Entry
                  id={id}
                  policyType={policyType}
                  policyName={policyName}
                  key={index}
                  showAsInvalid={!!props.error}
                  onChange={props.dismissError}
                />
              );
            })}

            <I18nReadError error={props.error} />
          </form>
        </DialogResponsive>
      )}
    </I18nRead>
  );
});
