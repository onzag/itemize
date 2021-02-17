/**
 * This file contains the part of the drawer that contains the action
 * modifiers that allows to set things like on-click on-focus etc...
 * @packageDocumentation
 */

import { RichElement } from "../../../../internal/text/serializer";
import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { FormControl, InputLabel, Select, MenuItem, FilledInput } from "@material-ui/core";
import { Path } from "slate";

/**
 * This is the list of events that we support
 * @ignore
 */
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

/**
 * A utility to specify a single action
 * option for the select interface
 */
interface ISingleActionOption {
  value: string;
  label: string | React.ReactNode;
}

/**
 * This is the props that the selector takes
 * the selector component takes these props and generates
 * a select with the necessary information and handlers
 * in order to modify the action
 */
interface ISingleActionProps {
  /**
   * The name is used both as namespacing and as the name itself
   * since the JS events are js specific there's no point for them
   * to be translated
   */
  name: string;
  /**
   * The current value that it holds
   */
  actionValue: string;
  /**
   * All the options that are allowed for the actions, these represents
   * the functions that exist within the context
   */
  options: ISingleActionOption[];
  /**
   * in which anchor the value was generated from
   * we keep track of the anchor in order to know
   * if the value should be updated
   * there is a delay between the updating and receiving the
   * value in the field so it'd cause flickering otherwise
   */
  anchor: Path;
  /**
   * Trigger on change
   * @param key the action key, click, mouseover, etc...
   * @param value the value that is referred to
   * @param anchor in which anchor it generated
   */
  onChange: (key: string, value: string, anchor: Path) => void;
  /**
   * The class name for the box that wraps it all
   */
  boxClassName?: string;
}

/**
 * The state of each action selector
 */
interface ISingleActionState {
  /**
   * The current value as in the state, we store the value here
   * and we keep it here because there's a delay when updating these
   * values from the rich element content
   */
  value: string;
  /**
   * The anchor where it comes from we also store the anchor to know if it has
   * changed which means it's another element, otherwise we assume that the state
   * value is the right value
   */
  valueForAnchor: Path;
}

/**
 * The single action class represents the component that allows for modification
 * of a single action eg. click, mouseover, by producing a single select element
 * with the necessary handlers and taking the necessary props for modification
 */
class SingleAction extends React.PureComponent<ISingleActionProps, ISingleActionState> {

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: ISingleActionProps, state: ISingleActionState) {
    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    if ((props.actionValue || "") !== state.value && !Path.equals(props.anchor, state.valueForAnchor)) {
      // so we update
      return {
        value: props.actionValue || "",
        valueForAnchor: props.anchor,
      }
    }

    return null;
  }

  /**
   * constructs a new SingleAction instance
   * @param props the props
   */
  constructor(props: ISingleActionProps) {
    super(props);

    this.onActionValueChange = this.onActionValueChange.bind(this);

    this.state = {
      value: props.actionValue || "",
      valueForAnchor: props.anchor,
    }
  }

  /**
   * Triggers when the selector value has changed to something else
   * @param e the change event
   */
  public onActionValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    // it might be null
    const newValue = e.target.value || null;

    // update the state
    this.setState({
      value: newValue || "",
      valueForAnchor: this.props.anchor,
    });

    // trigger on change
    this.props.onChange(this.props.name, newValue, this.props.anchor);
  }

  /**
   * The render function for the component
   */
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

/**
 * Constructs all the selector for all the given options that exist that can be set
 * based on the context
 * @param props the whole material ui slate wrapper with styles props from the drawer itself
 */
export function ActionsOptions(props: MaterialUISlateWrapperWithStyles) {
  // get the current node that we have currently selected
  const currentNode = props.state.currentSelectedElement as RichElement;

  // and now let's build all the options that we have for that we need to check our current context, if we have one
  const allOptions = props.state.currentContext ? Object.keys(props.state.currentContext.properties).map((p) => {
    // get the value of each property in the context properties
    const value = props.state.currentContext.properties[p];

    // and it needs to be a function to pass
    if (value.type !== "function") {
      return null;
    }

    // now we can return it and give it the label it holds
    return {
      value: p,
      label: value.label,
    }
  }).filter((v) => !!v) : [];

  // now we can return the whole box
  return (
    <div className={props.classes.box}>
      {
        EVENTS.map((v) => (
          <SingleAction
            key={v}
            name={v}
            actionValue={currentNode[v] || null}
            options={allOptions}
            anchor={props.state.currentSelectedElementAnchor}
            onChange={props.helpers.setAction}
          />
        ))
      }
    </div>
  );
}
