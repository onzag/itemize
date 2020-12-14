import React from "react";
import { ITemplateArgsContext } from "..";
import {
  Button, FilledInput, FormControl, InputLabel, MenuItem, Select,
} from "../../../mui-core";
import { Dialog } from "../../dialog";

interface ITemplateElementDialogProps {
  insertTemplateElement: (label: string, value: string) => void;
  closeTemplateElementDialog: () => void;
  currentContext: ITemplateArgsContext;
  templateElementDialogOpen: boolean;
  i18nInsertTemplateElementTitle: string;
  i18nInsertTemplateElementSubmit: string;
  i18nInsertTemplateElementLabel: string;
  i18nInsertTemplateElementPlaceholder: string;
  elementType: "text" | "html";
}

interface ITemplateElementOption {
  value: string;
  label: string;
};

interface ITemplateElementState {
  value: string;
  label: string;
  options: ITemplateElementOption[],
}

export class TemplateElementDialog extends React.PureComponent<ITemplateElementDialogProps, ITemplateElementState> {
  constructor(props: ITemplateElementDialogProps) {
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
    const templateHTMLPropertiesToUse: ITemplateElementOption[] = [];

    this.props.currentContext && Object.keys(this.props.currentContext.properties).forEach((key) => {
      const property = this.props.currentContext.properties[key];
      if (property.type !== this.props.elementType) {
        return;
      }
      templateHTMLPropertiesToUse.push({
        value: key,
        label: property.label || key,
      });
    });

    this.setState({
      value: null,
      label: null,
      options: templateHTMLPropertiesToUse,
    });
  }
  public acceptText() {
    if (this.state.value) {
      this.props.insertTemplateElement(this.state.label || this.state.value, this.state.value);
    }
  }
  public updateTextValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: e.target.value,
      label: e.target.textContent,
    });
  }
  public closeDialog() {
    this.props.closeTemplateElementDialog();

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
        open={this.props.templateElementDialogOpen}
        onClose={this.closeDialog}
        onOpening={this.onOpeningDialog}
        title={this.props.i18nInsertTemplateElementTitle}
        buttons={
          <Button onClick={this.acceptText}>
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
              value={this.state.value || ""}
              onChange={this.updateTextValue}
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