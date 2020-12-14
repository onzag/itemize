
import { RichElement } from "../../../../internal/text/serializer";
import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { FormControl, InputLabel, Select, MenuItem, FilledInput } from "@material-ui/core";
import { Path } from "slate";
import equals from "deep-equal";

interface ISingleTemplatingElementOption {
  value: string;
  label: string;
}

interface ISingleTemplatingElementProps {
  name: string;
  i18nName: string;
  value: string;
  options: ISingleTemplatingElementOption[],
  anchor: Path;
  onChange: (value: string, anchor: Path) => void;
  boxClassName?: string;
}

interface ISingleTemplatingElementState {
  value: string;
  valueForAnchor: Path;
}

class SingleTemplatingElement extends React.PureComponent<ISingleTemplatingElementProps, ISingleTemplatingElementState> {
  static getDerivedStateFromProps(props: ISingleTemplatingElementProps, state: ISingleTemplatingElementState) {
    if ((props.value || "") !== state.value && !Path.equals(props.anchor, state.valueForAnchor)) {
      return {
        value: props.value || "",
        valueForAnchor: props.anchor,
      }
    }

    return null;
  }
  constructor(props: ISingleTemplatingElementProps) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      value: props.value || "",
      valueForAnchor: props.anchor,
    }
  }
  public onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value || null;
    this.setState({
      value: newValue || "",
      valueForAnchor: this.props.anchor,
    });
    this.props.onChange(newValue, this.props.anchor);
  }
  public render() {
    return (
      <div className={this.props.boxClassName}>
        <FormControl
          variant="filled"
          fullWidth={true}
        >
          <InputLabel
            htmlFor={"slate-wrapper-templating-element-entry-for-" + this.props.name}
            shrink={true}
          >
            {this.props.i18nName}
          </InputLabel>
          <Select
            value={this.state.value}
            onChange={this.onChange}
            displayEmpty={true}
            variant="filled"
            input={
              <FilledInput
                id={"slate-wrapper-templating-element-entry-for-" + this.props.name}
                placeholder={this.props.i18nName}
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

export function TemplatingOptions(props: MaterialUISlateWrapperWithStyles) {
  const currentNode = props.info.currentSelectedNode as RichElement;
  const allUIHandlers: ISingleTemplatingElementOption[] = [];
  const allEachContexts: ISingleTemplatingElementOption[] = [];
  const allContexts: ISingleTemplatingElementOption[] = [];

  if (props.info.currentContext) {
    Object.keys(props.info.currentContext.properties).forEach((p) => {
      const value = props.info.currentContext.properties[p];
      if (value.type !== "context" && value.type !== "ui-handler") {
        return null;
      }

      const option = {
        value: p,
        label: value.label,
      };

      if (value.type === "context") {
        if (value.loopable) {
          allEachContexts.push(option);
        } else {
          allContexts.push(option);
        }
      } else if (value.type === "ui-handler") {
        allUIHandlers.push(option);
      }
    });
  }

  return (
    <div className={props.classes.box}>
      <SingleTemplatingElement
        name="each"
        i18nName={props.i18nRichInfo.each}
        value={currentNode.forEach || null}
        options={allEachContexts}
        anchor={props.info.selectedAnchor}
        onChange={props.helpers.setForEach}
      />
      <SingleTemplatingElement
        name="context"
        i18nName={props.i18nRichInfo.context}
        value={currentNode.context || null}
        options={allContexts}
        anchor={props.info.selectedAnchor}
        onChange={props.helpers.setContext}
      />
    </div>
  );
}