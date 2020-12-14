import React from "react";
import { ITemplateArgsContext } from "..";
import {
  Button, FilledInput, FormControl, InputLabel, MenuItem, Select,
} from "../../../mui-core";
import { Dialog } from "../../dialog";

interface ITemplateTextDialogProps {
  insertTemplateText: (label: string, value: string) => void;
  closeTemplateTextDialog: () => void;
  currentContext: ITemplateArgsContext;
  templateTextDialogOpen: boolean;
  i18nInsertTemplateTextTitle: string;
  i18nInsertTemplateTextSubmit: string;
  i18nInsertTemplateTextLabel: string;
  i18nInsertTemplateTextPlaceholder: string;
}

interface ITemplateTextOption {
  value: string;
  label: string;
};

interface ITemplateTextState {
  value: string;
  label: string;
  options: ITemplateTextOption[],
}

export class TemplateTextDialog extends React.PureComponent<ITemplateTextDialogProps, ITemplateTextState> {
  constructor(props: ITemplateTextDialogProps) {
    super(props);

    this.state = {
      value: null,
      label: null,
      options: [],
    }

    this.onOpeningDialog = this.onOpeningDialog.bind(this);
    this.acceptText = this.acceptText.bind(this);
    this.updateTextValue = this.updateTextValue.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }
  public onOpeningDialog() {
    const templateTextPropertiesToUse: ITemplateTextOption[] = [];

    this.props.currentContext && Object.keys(this.props.currentContext.properties).forEach((key) => {
      const property = this.props.currentContext.properties[key];
      if (property.type !== "text") {
        return;
      }
      templateTextPropertiesToUse.push({
        value: key,
        label: property.label || key,
      });
    });

    this.setState({
      value: null,
      label: null,
      options: templateTextPropertiesToUse,
    });
  }
  public acceptText() {
    if (this.state.value) {
      this.props.insertTemplateText(this.state.label || this.state.value, this.state.value);
    }
  }
  public updateTextValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: e.target.value,
      label: e.target.textContent,
    });
  }
  public closeDialog() {
    this.props.closeTemplateTextDialog();

    this.setState({
      value: null,
      label: null,
      options: [],
    });
  }
  public render() {
    return (
      <Dialog
        fullScreen={false}
        open={this.props.templateTextDialogOpen}
        onClose={this.closeDialog}
        onOpening={this.onOpeningDialog}
        title={this.props.i18nInsertTemplateTextTitle}
        buttons={
          <Button onClick={this.acceptText}>
            {this.props.i18nInsertTemplateTextSubmit}
          </Button>
        }
      >
        <div>
          <FormControl
            variant="filled"
            fullWidth={true}
          >
            <InputLabel
              htmlFor="slate-wrapper-template-text-entry-id"
            >
              {this.props.i18nInsertTemplateTextLabel}
            </InputLabel>
            <Select
              value={this.state.value || ""}
              onChange={this.updateTextValue}
              variant="filled"
              input={
                <FilledInput
                  id="slate-wrapper-template-text-entry-id"
                  placeholder={this.props.i18nInsertTemplateTextPlaceholder}
                />
              }
            >
              {
                // render the valid values that we display and choose
                this.state.options.map((vv) => {
                  // the i18n value from the i18n data
                  return <MenuItem key={vv.value} value={vv.value}>{
                    vv.label
                  }</MenuItem>;
                })
              }
            </Select>
          </FormControl>
        </div>
      </Dialog>
    );
  }
}