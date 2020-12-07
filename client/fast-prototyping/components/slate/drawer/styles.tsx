
import { RichElement } from "../../../../internal/text/serializer";
import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { FormControl, InputLabel, Select, Input, Chip, MenuItem } from "@material-ui/core";
import { Path } from "slate";

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

class SingleStyle extends React.PureComponent<ISingleStyleProps> {
  constructor(props: ISingleStyleProps) {
    super(props);

    this.onStyleChange = this.onStyleChange.bind(this);
  }
  onStyleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(e.target.value.trim() || null, this.props.anchor);
  }
  render() {
    return (
      <div className={this.props.boxClassName}>
        <p className={this.props.boxClassName}>{this.props.name}</p>
        <input
          type="text"
          value={this.props.styleValue || ""}
          className={this.props.inputClassName}
          onChange={this.onStyleChange}
        />
      </div>
    );
  }
}

function ClassesOptionSelector(props: MaterialUISlateWrapperWithStyles) {
  const selectedNode: RichElement = props.info.currentSelectedNode as any;
  return (
    <div className={props.classes.box}>
      <FormControl className={props.classes.selectionInput}>
  <InputLabel id="slate-styles-option-selector-rich-classes-label">{props.i18nRichInfo.classes}</InputLabel>
        <Select
          labelId="slate-styles-option-selector-rich-classes-label"
          id="slate-styles-option-selector-rich-classes"
          className={props.classes.selectionInput}
          multiple={true}
          value={selectedNode.richClassList || []}
          onChange={null}
          input={<Input id="slate-styles-option-selector-rich-classes-chip" />}
          renderValue={(selected: any[]) => (
            <div className={props.classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={props.classes.chip} />
              ))}
            </div>
          )}
        >
          {
            props.featureSupport.availableRichClasses.map((element) => (
              <MenuItem key={element.value} value={element.value}>
                {element.label}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
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
            anchor={props.info.selectedAnchor}
            onChange={props.helpers.setStyle}
            name={props.i18nRichInfo.style}
            styleValue={currentNode.style}
            inputClassName={props.classes.input}
          /> : null
      }
      {
        props.featureSupport.supportsCustomStyles && props.featureSupport.supportsTemplating ?
          <SingleStyle
            anchor={props.info.selectedAnchor}
            onChange={props.helpers.setHoverStyle}
            name={props.i18nRichInfo.styleHover}
            styleValue={currentNode.styleHover}
            inputClassName={props.classes.input}
          /> : null
      }
      {
        props.featureSupport.supportsCustomStyles && props.featureSupport.supportsTemplating ?
          <SingleStyle
            anchor={props.info.selectedAnchor}
            onChange={props.helpers.setActiveStyle}
            name={props.i18nRichInfo.styleActive}
            styleValue={currentNode.styleActive}
            inputClassName={props.classes.input}
          /> : null
      }
    </div>
  );
}