/**
 * Provides the dialogs pertinent to links
 * @module
 */

import React from "react";
import { Dialog } from "../../dialog";
import { RichElement } from "../../../../internal/text/serializer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import { ITemplateArgContextDefinition } from "../../../../internal/text/serializer/template-args";

/**
 * The props for the dialog that allows to insert a link
 * and a templated link
 */
interface ILinkDialogProps {
  /**
   * Accept the link
   * @param url the link url (or null)
   * @param tvalue the link templated value (or null)
   * @returns a boolean when truthful the dialog closes, if false
   * will show an error
   */
  acceptLink: (url: string, tvalue: string) => Promise<boolean>;
  /**
   * Triggers when the dialog closes
   */
  closeDialogLink: () => void;
  /**
   * Whether the dialog should be open
   */
  linkDialogOpen: boolean;
  /**
   * The current context the dialog was opened
   */
  currentContext: ITemplateArgContextDefinition;
  /**
   * The root context
   */
  currentRootContext: ITemplateArgContextDefinition;
  /**
   * The selected element that was chosen, before opening
   * the dialog, it might be or not present, it is used
   * for modifying links
   */
  selectedElement: RichElement;
  /**
   * whether external links that are not related to the current
   * hostname are supported
   */
  supportsExternalLinks: boolean;
  /**
   * Dialog title
   */
  i18nSetLinkTitle: string;
  /**
   * Dialog submit button label
   */
  i18nSetLinkSubmit: string;
  /**
   * Text field label
   */
  i18nSetLinkLabel: string;
  /**
   * Text field placeholder
   */
  i18nSetLinkPlaceholder: string;
  /**
   * Text field placeholder when supportsExternalLinks is false
   */
  i18nSetLinkPlaceholderLocalOnly: string;
  /**
   * The error to show when accept link gives false
   * as the link was rejected
   */
  i18nSetLinkInvalid: string;
  /**
   * Text bit for the area to insert templated links if they are supported
   * this will display according to the context
   */
  i18nSetLinkTemplated: string;
  /**
   * The select field label for templated links
   */
  i18nSetLinkTemplatedLabel: string;
  /**
   * The select field placeholder for templated links
   */
  i18nSetLinkTemplatedPlaceholder: string;
  /**
   * A value to show when no templated link has been selected
   */
  i18nSetLinkTemplatedUnspecified: string;
  /**
   * The box sx
   */
  templateBoxSx: SxProps<Theme>;
  /**
   * The text sx
   */
  templateTextSx: SxProps<Theme>;
  /**
   * Sx for primary options
   */
  optionPrimarySx: SxProps<Theme>;
}

/**
 * Represents an option for the templated values
 * that the link can take
 */
interface ILinkDialogTemplateOption {
  value: string;
  label: string | React.ReactNode;
  primary: boolean;
};

/**
 * Represents the state of the whole dialog and what it contains
 * given it needs to keep in sync with the component itself and due
 * to the delays a lot of these values are stateful
 */
interface ILinkDialogState {
  /**
   * The link url
   */
  linkURL: string;
  /**
   * The link templated value
   */
  linkTValue: string;
  /**
   * Whether it is currently invalid and should shown as such
   */
  linkInvalid: boolean;
  /**
   * All our available options
   */
  linkTemplateOptions: ILinkDialogTemplateOption[];
}

/**
 * This dialog allows us to choose a link value, as an url, external url or
 * even templated values
 */
export class LinkDialog extends React.PureComponent<ILinkDialogProps, ILinkDialogState> {
  /**
   * We grab a ref for the text field in order to focus
   */
  private textFieldLinkRef: React.RefObject<HTMLDivElement>;

  /**
   * Constructs a new link dialog
   * @param props the props specific to this dialog
   */
  constructor(props: ILinkDialogProps) {
    super(props);

    this.state = {
      linkURL: "",
      linkTValue: "",
      linkInvalid: false,
      linkTemplateOptions: [],
    }

    this.textFieldLinkRef = React.createRef();

    this.focusLinkTextField = this.focusLinkTextField.bind(this);
    this.onOpeningDialog = this.onOpeningDialog.bind(this);
    this.acceptLink = this.acceptLink.bind(this);
    this.updateLinkURL = this.updateLinkURL.bind(this);
    this.updateLinkTValue = this.updateLinkTValue.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  /**
   * Ran at the start when the dialog opens in order
   * to focus the text field
   */
  public focusLinkTextField() {
    this.textFieldLinkRef.current && this.textFieldLinkRef.current.focus();
  }

  /**
   * Triggers when the dialog is opening
   */
  public onOpeningDialog() {
    // need to find the templated options that are available
    // given the current context
    const linkPropertiesToUse: ILinkDialogTemplateOption[] = [];
    let selectedContextValue: string = "";

    // now we need to grab the current context, if we have any
    this.props.currentContext && Object.keys(this.props.currentContext.properties).forEach((key) => {
      // grab each property and check the type of it
      const property = this.props.currentContext.properties[key];
      // if it's not a link
      if (property.type !== "link") {
        // continue
        return;
      }

      // otherwise we have a property we can use
      linkPropertiesToUse.push({
        value: key,
        label: property.label || key,
        primary: this.props.currentContext !== this.props.currentRootContext,
      });
    });

    if (this.props.currentRootContext !== this.props.currentContext) {
      Object.keys(this.props.currentRootContext.properties).forEach((key) => {
        // grab each property and check the type of it
        const property = this.props.currentRootContext.properties[key];

        if ((property as any).nonRootInheritable) {
          return;
        }

        // if it's not a link
        if (property.type !== "link") {
          // continue
          return;
        }
  
        // otherwise we have a property we can use
        linkPropertiesToUse.push({
          value: key,
          label: property.label || key,
          primary: false,
        });
      });
    }

    // now if we have a selected element
    // that is also a link
    if (
      this.props.selectedElement &&
      this.props.selectedElement.type === "link" &&
      this.props.selectedElement.thref
    ) {
      // and the value of such is not in the list
      if (!linkPropertiesToUse.some((p) => p.value === (this.props.selectedElement as any).thref)) {
        // we add it
        linkPropertiesToUse.push({
          value: this.props.selectedElement.thref,
          label: this.props.selectedElement.thref,
          primary: false,
        });
      }

      // and we make it the selected value
      selectedContextValue = this.props.selectedElement.thref;
    }

    // now we can set the state from the analysis
    this.setState({
      linkURL: (this.props.selectedElement && (this.props.selectedElement as any).href) || "",
      linkTValue: selectedContextValue,
      linkTemplateOptions: linkPropertiesToUse,
    });

    document.body.dataset.unblur = "true";
  }

  /**
   * When we have written the values and clicked the button
   * to accept the link we have given
   */
  public async acceptLink() {
    // calling from the props
    const status = await this.props.acceptLink(this.state.linkURL, this.state.linkTValue);
    // if we are good to go
    if (status) {
      // close the dialog
      this.props.closeDialogLink();
    } else {
      // show it's invalid
      this.setState({
        linkInvalid: true,
      });
      this.focusLinkTextField();
    }
  }

  /**
   * Triggers on each keystroke to update the link url itself
   * @param e the event from the input
   */
  public updateLinkURL(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      linkURL: e.target.value,
    });
  }

  /**
   * Triggers on the select field in order to update the templated
   * value in the state
   * @param e the event from the input
   */
  public updateLinkTValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      linkTValue: e.target.value,
    });
  }
  
  /**
   * Triggers when the dialog is meant
   * to be closed
   */
  public closeDialog() {
    // prop call
    this.props.closeDialogLink();

    // clear the state
    this.setState({
      linkURL: "",
      linkTValue: "",
      linkInvalid: false,
      linkTemplateOptions: [],
    });
  }

  /**
   * Render function
   */
  public render() {
    return (
      <Dialog
        fullScreen={false}
        open={this.props.linkDialogOpen}
        onClose={this.closeDialog}
        onOpening={this.onOpeningDialog}
        onOpen={this.focusLinkTextField}
        title={this.props.i18nSetLinkTitle}
        buttons={
          <Button onClick={this.acceptLink}>
            {this.props.i18nSetLinkSubmit}
          </Button>
        }
      >
        <div>
          <TextField
            fullWidth={true}
            value={this.state.linkURL}
            onChange={this.updateLinkURL}
            label={this.props.i18nSetLinkLabel}
            placeholder={
              this.props.supportsExternalLinks ?
                this.props.i18nSetLinkPlaceholder :
                this.props.i18nSetLinkPlaceholderLocalOnly
            }
            inputRef={this.textFieldLinkRef}
          />
          <div>{this.state.linkInvalid ? this.props.i18nSetLinkInvalid : null}</div>
          {
            this.state.linkTemplateOptions.length ?
              <Box sx={this.props.templateBoxSx}>
                <Box sx={this.props.templateTextSx}>{this.props.i18nSetLinkTemplated}</Box>
                <FormControl
                  variant="filled"
                >
                  <InputLabel
                    htmlFor="slate-wrapper-template-entry-id"
                    shrink={true}
                  >
                    {this.props.i18nSetLinkTemplatedLabel}
                  </InputLabel>
                  <Select
                    value={this.state.linkTValue}
                    onChange={this.updateLinkTValue}
                    displayEmpty={true}
                    variant="filled"
                    input={
                      <FilledInput
                        id="slate-wrapper-template-entry-id"
                        placeholder={this.props.i18nSetLinkTemplatedPlaceholder}
                      />
                    }
                  >
                    <MenuItem value="">
                      <em>{this.props.i18nSetLinkTemplatedUnspecified}</em>
                    </MenuItem>
                    {
                      // render the valid values that we display and choose
                      this.state.linkTemplateOptions.map((vv) => {
                        // the i18n value from the i18n data
                        return <MenuItem
                          key={vv.value}
                          value={vv.value}
                          sx={vv.primary ? this.props.optionPrimarySx : null}
                        >{
                          vv.label
                        }</MenuItem>;
                      })
                    }
                  </Select>
                </FormControl>
              </Box> :
              null
          }
        </div>
      </Dialog>
    );
  }
}
