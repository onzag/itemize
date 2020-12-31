
import { RichElement } from "../../../../internal/text/serializer";
import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { FormControl, InputLabel, Select, MenuItem, FilledInput } from "@material-ui/core";
import { Path } from "slate";
import equals from "deep-equal";

const EVENTS = [
  "click",
  "blur",
  "focus",
  "input",
  "keydown",
  "keypress",
  "keyup",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseover",
  "mouseout",
  "mouseup",
  "mousewheel",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "wheel",
];

interface ISingleActionOption {
  value: string;
  label: string;
}

interface ISingleActionProps {
  name: string;
  actionValue: string;
  options: ISingleActionOption[],
  anchor: Path;
  onChange: (key: string, value: string, anchor: Path) => void;
  boxClassName?: string;
}

interface ISingleActionState {
  value: string;
  valueForAnchor: Path;
}

class SingleAction extends React.PureComponent<ISingleActionProps, ISingleActionState> {
  static getDerivedStateFromProps(props: ISingleActionProps, state: ISingleActionState) {
    if ((props.actionValue || "") !== state.value && !Path.equals(props.anchor, state.valueForAnchor)) {
      return {
        value: props.actionValue || "",
        valueForAnchor: props.anchor,
      }
    }

    return null;
  }
  constructor(props: ISingleActionProps) {
    super(props);

    this.onActionValueChange = this.onActionValueChange.bind(this);

    this.state = {
      value: props.actionValue || "",
      valueForAnchor: props.anchor,
    }
  }
  public onActionValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value || null;
    this.setState({
      value: newValue || "",
      valueForAnchor: this.props.anchor,
    });
    this.props.onChange(this.props.name, newValue, this.props.anchor);
  }
  public render() {
    return (
      <div className={this.props.boxClassName}>
        <FormControl
          variant="filled"
          fullWidth={true}
        >
          <InputLabel
            htmlFor={"slate-wrapper-action-entry-for-" + this.props.name}
            shrink={true}
          >
            {this.props.name}
          </InputLabel>
          <Select
            value={this.state.value}
            onChange={this.onActionValueChange}
            displayEmpty={true}
            variant="filled"
            input={
              <FilledInput
                id={"slate-wrapper-action-entry-for-" + this.props.name}
                placeholder={this.props.name}
              />
            }
          >
            <MenuItem value="">
              <em>{" "}</em>
            </MenuItem>
            {
              // render the valid values that we display and choose
              this.props.options.map((vv) => {
                // the i18n value from the i18n data
                return <MenuItem key={vv.value} value={vv.value}>{
                  vv.label
                }</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      </div>
    );
  }
}

export function ActionsOptions(props: MaterialUISlateWrapperWithStyles) {
  const currentNode = props.state.currentSelectedNode as RichElement;
  const allOptions = props.state.currentContext ? Object.keys(props.state.currentContext.properties).map((p) => {
    const value = props.state.currentContext.properties[p];
    if (value.type !== "function") {
      return null;
    }

    return {
      value: p,
      label: value.label,
    }
  }).filter((v) => !!v) : [];
  return (
    <div className={props.classes.box}>
      {
        EVENTS.map((v) => (
          <SingleAction
            key={v}
            name={v}
            actionValue={currentNode[v] || null}
            options={allOptions}
            anchor={props.state.currentSelectedNodeAnchor}
            onChange={props.helpers.setAction}
          />
        ))
      }
    </div>
  );
}