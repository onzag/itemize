/**
 * Utilizes the needs submit prompt in order to prompt the user
 * about missing changes
 * 
 * @module
 */

import React from "react";
import ONeedsSubmitPrompt from "../../components/navigation/NeedsSubmitPrompt";
import { Dialog } from "./dialog";
import { Button, Typography, WithStyles, createStyles, withStyles, Theme, DoneIcon, CloseIcon } from "../mui-core";
import { EndpointErrorType } from "../../../base/errors";
import { IActionSubmitOptions } from "../../providers/item";
import { ProgressingElement } from "./util";
import I18nReadError from "../../components/localization/I18nReadError";
import I18nReadMany from "../../components/localization/I18nReadMany";

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

const needsSubmitDialogStyle = (theme: Theme) => createStyles({
  content: {
    padding: "1rem 0.5rem",
  },
  error: {
    marginTop: "1rem",
    color: theme.palette.error.dark,
  }
});

interface NeedsSubmitDialogWithStylesProps extends NeedsSubmitDialogProps, WithStyles<typeof needsSubmitDialogStyle> {}

class ActualNeedsSubmitDialog extends React.PureComponent<NeedsSubmitDialogWithStylesProps> {
  public render() {
    return <Dialog
      title={this.props.args.title}
      open={this.props.open}
      onClose={this.props.onCancel}
      buttons={
        <>
          <Button
            color="secondary"
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
      <Typography variant="body1" className={this.props.classes.content}>
        {this.props.args.message}
      </Typography>
      {
        this.props.confirmationCallbackError ?
        <Typography variant="body2" className={this.props.classes.error}>
          <I18nReadError error={this.props.confirmationCallbackError} capitalize={true}/>
        </Typography> :
        null
      }
    </Dialog>
  }
}

const NeedsSubmitDialog = withStyles(needsSubmitDialogStyle)(ActualNeedsSubmitDialog);

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
      <I18nReadMany
        data={[
          {
            id: this.props.i18nMessage || "unsaved_changes",
            capitalize: true,
          },
          {
            id: this.props.i18nTitle || "generic_warning",
            capitalize: true,
          },
          {
            id: this.props.i18nConfirm || "save",
            capitalize: true,
          },
          {
            id: this.props.i18nDiscard || "discard",
            capitalize: true
          }
        ]}
      >
        {(message: string, title: string, confirm: string, discard: string) => (
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
    )
  }
}
