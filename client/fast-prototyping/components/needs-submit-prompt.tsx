/**
 * Utilizes the needs submit prompt in order to prompt the user
 * about missing changes
 * 
 * @module
 */

import React from "react";
import ONeedsSubmitPrompt from "../../components/navigation/NeedsSubmitPrompt";
import { Dialog } from "./dialog";
import { EndpointErrorType } from "../../../base/errors";
import { IActionSubmitOptions } from "../../providers/item";
import { ProgressingElement } from "./util";
import I18nReadError from "../../components/localization/I18nReadError";
import I18nReadMany from "../../components/localization/I18nReadMany";
import { Theme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import I18nRead from "../../components/localization/I18nRead";

interface NeedsSubmitDialogProps {
  open: boolean;
  confirming: boolean;
  confirmationCallbackError: EndpointErrorType;
  confirmationCallbackErrorClean: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  onDiscard: () => void;
  args?: {
    message: string,
    title: string,
    confirm: string,
    discard: string,
  };
}

const needsSubmitDialogStyle = {
  content: {
    padding: "1rem 0.5rem",
  },
  error: (theme: Theme) => ({
    marginTop: "1rem",
    color: theme.palette.error.dark,
  }),
};

class NeedsSubmitDialog extends React.PureComponent<NeedsSubmitDialogProps> {
  public render() {
    return <Dialog
      title={this.props.args.title}
      open={this.props.open}
      onClose={this.props.onCancel}
      buttons={
        <>
          <Button
            color="error"
            aria-label={this.props.args.discard}
            startIcon={<CloseIcon />}
            onClick={this.props.onDiscard}
          >
            {this.props.args.discard}
          </Button>
          <ProgressingElement isProgressing={this.props.confirming}>
            <Button
              color="primary"
              aria-label={this.props.args.confirm}
              startIcon={<DoneIcon />}
              onClick={this.props.onConfirm}
            >
              {this.props.args.confirm}
            </Button>
          </ProgressingElement>
        </>
      }
    >
      <Typography variant="body1" sx={needsSubmitDialogStyle.content}>
        {this.props.args.message}
      </Typography>
      {
        this.props.confirmationCallbackError ?
          <Typography variant="body2" sx={needsSubmitDialogStyle.error}>
            <I18nReadError error={this.props.confirmationCallbackError} capitalize={true} />
          </Typography> :
          null
      }
    </Dialog>
  }
}

/**
 * The props of the needs submit prompt
 */
interface NeedsSubmitPromptProps {
  /**
   * the i18n id for the message that is displayed
   */
  i18nMessage?: string;
  /**
   * The title for the dialog
   */
  i18nTitle?: string;
  /**
   * The text for confirm
   */
  i18nConfirm?: string;
  /**
   * The text for discard
   */
  i18nDiscard?: string;
  /**
   * The properties that must be checked for differences
   */
  properties?: string[];
  /**
   * The includes to check for differences
   */
  includes?: string[];
  /**
   * The submit options to use during a confirmation
   * they might be equal to whatever submit button or submit actioner
   * you used in order to submit
   */
  confirmationSubmitOptions: IActionSubmitOptions;
}

/**
 * The nees submit prompt will show a prompt (aka dialog) for when the user
 * attempts to leave the page, but hasn't submitted changes
 */
export class NeedsSubmitPrompt extends React.PureComponent<NeedsSubmitPromptProps> {
  public render() {
    return (
      <I18nRead i18nId={this.props.i18nMessage || "unsaved_changes"} capitalize={true}>
        {(message: string) => (
          <I18nReadMany
            data={[
              {
                i18nId: this.props.i18nTitle || "generic_warning",
                capitalize: true,
              },
              {
                i18nId: this.props.i18nConfirm || "save",
                capitalize: true,
              },
              {
                i18nId: this.props.i18nDiscard || "discard",
                capitalize: true
              }
            ]}
          >
            {(title, confirm, discard) => (
              <ONeedsSubmitPrompt
                properties={this.props.properties}
                includes={this.props.includes}
                confirmationSubmitOptions={this.props.confirmationSubmitOptions}
                beforeUnloadMessage={message}
                dialogArgs={{
                  message,
                  title,
                  confirm,
                  discard,
                }}
                Dialog={NeedsSubmitDialog}
              ></ONeedsSubmitPrompt>
            )}
          </I18nReadMany>
        )}
      </I18nRead>
    )
  }
}
