/**
 * This is the dialogs that shows when the user wants to insert
 * a templated element bit, both html and text type
 * @module
 */

import Button from "@material-ui/core/Button";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { ITemplateArgsContext } from "..";
import { Dialog } from "../../dialog";

/**
 * These are the dialog props for such dialog there is only one dialog
 * component that is used for both dialogs
 */
interface ITemplateElementDialogProps {
  /**
   * Function that triggers once the input is accepted and is requested
   * to input
   * @param label the human readable label that was chosen
   * @param value the value that was chosen
   */
  insertTemplateElement: (label: string, value: string) => void;
  /**
   * Function that triggers when the dialog closes
   */
  closeTemplateElementDialog: () => void;
  /**
   * The current context where the template element options are taken
   */
  currentContext: ITemplateArgsContext;
  /**
   * The current root context
   */
  currentRootContext: ITemplateArgsContext;
  /**
   * Whether the dialog should be open
   */
  templateElementDialogOpen: boolean;
  /**
   * The title for the dialog
   */
  i18nInsertTemplateElementTitle: string;
  /**
   * The label for the submit button
   */
  i18nInsertTemplateElementSubmit: string;
  /**
   * The label for the select input
   */
  i18nInsertTemplateElementLabel: string;
  /**
   * The placeholder for the select input
   */
  i18nInsertTemplateElementPlaceholder: string;
  /**
   * The type of input for templated, text or html
   * are the only supported
   */
  elementType: "text" | "html";
  /**
   * Class name for primary options
   */
  optionPrimaryClassName: string;
}

/**
 * These are the options we have got
 * for the select
 */
interface ITemplateElementOption {
  value: string;
  label: string | React.ReactNode;
  primary: boolean;
};

/**
 * And this is the state the dialog contains for the
 * state that is must hold consisting of
 */
interface ITemplateElementState {
  /**
   * The value that it currently holds
   */
  value: string;
  /**
   * The label that it should display
   */
  label: string;
  /**
   * And all the available options that have been taken
   * from the context
   */
  options: ITemplateElementOption[],
}

/**
 * This is the dialog that allows for the input of both text and html fragments
 * into the rich text in order to build templates with dynamic content
 */
export class TemplateElementDialog extends React.PureComponent<ITemplateElementDialogProps, ITemplateElementState> {

  /**
   * Constructs a new dialog
   * @param props the props specific for this dialog
   */
  constructor(props: ITemplateElementDialogProps) {
    super(props);

    this.state = {
      value: null,
      label: null,
      options: [],
    }

    this.onOpeningDialog = this.onOpeningDialog.bind(this);
    this.accept = this.accept.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  /**
   * Triggers when the dialog is opening and its used to setup
   * the initial state
   */
  public onOpeningDialog() {
    // now we need to get all the options we can use
    const templateHTMLPropertiesToUse: ITemplateElementOption[] = [];

    // and for that we grab the current context
    this.props.currentContext && Object.keys(this.props.currentContext.properties).forEach((key) => {
      const property = this.props.currentContext.properties[key];

      // but they must be the given element type
      if (property.type !== this.props.elementType) {
        // otherwise continue;
        return;
      }

      // now we can add the option to our option list
      templateHTMLPropertiesToUse.push({
        value: key,
        label: property.label || key,
        primary: this.props.currentContext !== this.props.currentRootContext,
      });
    });

    if (this.props.currentContext !== this.props.currentRootContext) {
      Object.keys(this.props.currentRootContext.properties).forEach((key) => {
        const property = this.props.currentRootContext.properties[key];
 
        if ((property as any).nonRootInheritable) {
          return;
        }
        
        // but they must be the given element type
        if (property.type !== this.props.elementType) {
          // otherwise continue;
          return;
        }
  
        // now we can add the option to our option list
        templateHTMLPropertiesToUse.push({
          value: key,
          label: property.label || key,
          primary: false,
        });
      });
    }

    // and set the state
    this.setState({
      value: null,
      label: null,
      options: templateHTMLPropertiesToUse,
    });

    document.body.dataset.unblur = "true";
  }

  /**
   * Triggers once the input has been accepted
   * and it should be done into the rich text
   */
  public accept() {
    // if we got a value
    if (this.state.value) {
      // we then insert
      this.props.insertTemplateElement(this.state.label || this.state.value, this.state.value);
    }

    // otherwise close
    this.closeDialog();
  }

  /**
   * Triggers once the value has changed and needs to be update
   * @param e the event coming from the select
   */
  public updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    // first we need to see the option where it came from
    const option = this.state.options.find((o) => o.value === e.target.value);
    let label: string = null;

    // hack method to extract the string value that is displaying
    // from whatever node type is being used, eg i18n types
    if (option) {
      const foundLabelElementId = "slate-template-element-for-" + encodeURIComponent(option.value);
      const element = document.getElementById(foundLabelElementId);
      if (element) {
        label = element.textContent.trim();
      }
    }

    // and then we can update the state
    this.setState({
      value: e.target.value,
      label,
    });
  }

  /**
   * Triggers once the dialog closes
   */
  public closeDialog() {
    // call the function in the props
    this.props.closeTemplateElementDialog();

    setTimeout(() => {
      delete document.body.dataset.unblur;
    }, 100);

    // clear the state
    this.setState({
      value: null,
      label: null,
      options: [],
    });
  }

  /**
   * Render function
   */
  public render() {
    return (
      <Dialog
        fullScreen={false}
        open={this.props.templateElementDialogOpen}
        onClose={this.closeDialog}
        onOpening={this.onOpeningDialog}
        title={this.props.i18nInsertTemplateElementTitle}
        buttons={
          <Button onClick={this.accept}>
            {this.props.i18nInsertTemplateElementSubmit}
          </Button>
        }
      >
        <div>
          <FormControl
            variant="filled"
            fullWidth={true}
          >
            <InputLabel
              htmlFor="slate-wrapper-template-element-entry-id"
            >
              {this.props.i18nInsertTemplateElementLabel}
            </InputLabel>
            <Select
              value={this.state.value || ""}
              onChange={this.updateValue}
              variant="filled"
              input={
                <FilledInput
                  id="slate-wrapper-template-element-entry-id"
                  placeholder={this.props.i18nInsertTemplateElementPlaceholder}
                />
              }
            >
              {
                // render the valid values that we display and choose
                this.state.options.map((vv) => {
                  // the i18n value from the i18n data
                  return (
                    <MenuItem
                      key={vv.value}
                      value={vv.value}
                      id={"slate-template-element-for-" + encodeURIComponent(vv.value)}
                      className={vv.primary ? this.props.optionPrimaryClassName : null}
                    >
                      {
                        vv.label
                      }
                    </MenuItem>
                  );
                })
              }
            </Select>
          </FormControl>
        </div>
      </Dialog>
    );
  }
}
