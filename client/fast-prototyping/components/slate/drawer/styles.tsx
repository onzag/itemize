
import { RichElement } from "../../../../internal/text/serializer";
import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { FormControl, InputLabel, Select, Input, Chip, MenuItem, TextField, FilledInput } from "@material-ui/core";
import { Path } from "slate";
import equals from "deep-equal";

interface ISingleStyleProps {
  name: string;
  styleValue: string;
  anchor: Path;
  onChange: (value: string, anchor: Path) => void;
  rowClassName?: string;
  boxClassName?: string;
  boxTitleName?: string;
  inputClassName?: string;
}

interface ISingleStyleState {
  value: string;
  valueForAnchor: Path;
}

class SingleStyle extends React.PureComponent<ISingleStyleProps, ISingleStyleState> {
  static getDerivedStateFromProps(props: ISingleStyleProps, state: ISingleStyleState) {
    if ((props.styleValue || "") !== state.value && !Path.equals(props.anchor, state.valueForAnchor)) {
      return {
        value: props.styleValue || "",
        valueForAnchor: props.anchor,
      }
    }

    return null;
  }
  constructor(props: ISingleStyleProps) {
    super(props);

    this.onStyleChange = this.onStyleChange.bind(this);

    this.state = {
      value: props.styleValue || "",
      valueForAnchor: props.anchor,
    }
  }
  public onStyleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.trim() || null;
    this.setState({
      value: newValue || "",
      valueForAnchor: this.props.anchor,
    });
    this.props.onChange(newValue, this.props.anchor);
  }
  public render() {
    return (
      <div className={this.props.boxClassName}>
        <TextField
          fullWidth={true}
          type="text"
          value={this.state.value}
          className={this.props.inputClassName}
          onChange={this.onStyleChange}
          placeholder={this.props.name}
          label={this.props.name}
          variant="filled"
        />
      </div>
    );
  }
}

interface IClassesOptionSelectorState {
  value: string[],
  valueForAnchor: Path;
}

class ClassesOptionSelector extends React.PureComponent<MaterialUISlateWrapperWithStyles, IClassesOptionSelectorState> {
  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IClassesOptionSelectorState) {
    const selectedNode: RichElement = props.info.currentSelectedNode as any;
    if (
      !equals(selectedNode.richClassList || [], state.value) &&
      !Path.equals(props.info.currentSelectedNodeAnchor, state.valueForAnchor)
    ) {
      return {
        value: selectedNode.richClassList || [],
        valueForAnchor: props.info.currentSelectedNodeAnchor,
      }
    }

    return null;
  }
  constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    const selectedNode: RichElement = props.info.currentSelectedNode as any;
    this.state = {
      value: selectedNode.richClassList || [],
      valueForAnchor: props.info.currentSelectedNodeAnchor,
    };

    this.onRichClassListChange = this.onRichClassListChange.bind(this);
  }
  public onRichClassListChange(e: React.ChangeEvent<{ name: string, value: string[] }>) {
    let newValue: string[] = e.target.value;
    this.setState({
      value: newValue,
      valueForAnchor: this.props.info.currentSelectedNodeAnchor,
    });
    if (newValue.length === 0) {
      newValue = null;
    }
    this.props.helpers.setRichClasses(newValue, this.props.info.currentSelectedNodeAnchor);
  }
  public render() {
    return (
      <FormControl className={this.props.classes.selectionInput} variant="filled">
        <InputLabel id="slate-styles-option-selector-rich-classes-label">{this.props.i18nRichInfo.classes}</InputLabel>
        <Select
          labelId="slate-styles-option-selector-rich-classes-label"
          id="slate-styles-option-selector-rich-classes"
          className={this.props.classes.selectionInput}
          multiple={true}
          value={this.state.value}
          onChange={this.onRichClassListChange}
          input={<FilledInput id="slate-styles-option-selector-rich-classes-chip" />}
          renderValue={(selected: any[]) => (
            <div className={this.props.classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={this.props.classes.chip} color="primary" />
              ))}
            </div>
          )}
          variant="filled"
        >
          {
            this.props.featureSupport.availableRichClasses.map((element) => (
              <MenuItem key={element.value} value={element.value}>
                {element.label}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    );
  }
}

export function StylesOptions(props: MaterialUISlateWrapperWithStyles) {
  const currentNode = props.info.currentSelectedNode as RichElement;
  return (
    <div className={props.classes.box}>
      {
        props.featureSupport.supportsRichClasses ?
          <ClassesOptionSelector {...props} /> : null
      }
      {
        props.featureSupport.supportsCustomStyles ?
          <SingleStyle
            anchor={props.info.currentSelectedNodeAnchor}
            onChange={props.helpers.setStyle}
            name={props.i18nRichInfo.style}
            styleValue={currentNode.style}
            inputClassName={props.classes.input}
          /> : null
      }
      {
        props.featureSupport.supportsCustomStyles && props.featureSupport.supportsTemplating ?
          <SingleStyle
            anchor={props.info.currentSelectedNodeAnchor}
            onChange={props.helpers.setHoverStyle}
            name={props.i18nRichInfo.styleHover}
            styleValue={currentNode.styleHover}
            inputClassName={props.classes.input}
          /> : null
      }
      {
        props.featureSupport.supportsCustomStyles && props.featureSupport.supportsTemplating ?
          <SingleStyle
            anchor={props.info.currentSelectedNodeAnchor}
            onChange={props.helpers.setActiveStyle}
            name={props.i18nRichInfo.styleActive}
            styleValue={currentNode.styleActive}
            inputClassName={props.classes.input}
          /> : null
      }
    </div>
  );
}