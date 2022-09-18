/**
 * This file contains the part of the drawer that contains the action
 * modifiers that allows to set things like on-click on-focus etc...
 * @module
 */

import React from "react";
import { IDrawerContainerProps } from "../wrapper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import { Path } from "slate";
import { AltBadgeReactioner } from "../../alt-badge-reactioner";

const style = {
  box: {
    padding: "0.5rem",
  },
  optionPrimary: {
    fontWeight: 700,
    color: "#1b5e20",
  },
};

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
  primary: boolean;
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
   * The group index for accessibility
   */
  groupIndex: number;
  /**
   * Trigger on change
   * @param key the action key, click, mouseover, etc...
   * @param value the value that is referred to
   * @param anchor in which anchor it generated
   */
  onChange: (key: string, value: string, anchor: Path) => void;
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
  valueLastTimeRequestedUpdate: number;
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
    const time = (new Date()).getTime();
    if (
      (props.actionValue || "") !== state.value &&
      (
        !Path.equals(props.anchor, state.valueForAnchor) ||
        time - state.valueLastTimeRequestedUpdate > 300
      )
    ) {
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
      valueLastTimeRequestedUpdate: 0,
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
      valueLastTimeRequestedUpdate: (new Date()).getTime(),
    });

    // trigger on change
    this.props.onChange(this.props.name, newValue, this.props.anchor);
  }

  public unblur() {
    document.body.dataset.unblur = "true";
  }

  public resetBlur() {
    delete document.body.dataset.unblur;
  }

  /**
   * The render function for the component
   */
  public render() {
    return (
      <Box>
        <AltBadgeReactioner
          action="focus"
          reactionKey="n"
          priority={3}
          selector="div[tabindex]"
          fullWidth={true}
          groupPosition={this.props.groupIndex + 10}
        >
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
              onOpen={this.unblur}
              onClose={this.resetBlur}
            >
              <MenuItem value="">
                <em>{" - "}</em>
              </MenuItem>
              {
                // render the valid values that we display and choose
                this.props.options.map((vv) => {
                  // the i18n value from the i18n data
                  return <MenuItem
                    key={vv.value}
                    value={vv.value}
                    sx={vv.primary ? style.optionPrimary : null}
                  >{
                      vv.label
                    }</MenuItem>;
                })
              }
            </Select>
          </FormControl>
        </AltBadgeReactioner>
      </Box>
    );
  }
}

/**
 * Constructs all the selector for all the given options that exist that can be set
 * based on the context
 * @param props the whole material ui slate wrapper with styles props from the drawer itself
 */
export function ActionsOptions(props: IDrawerContainerProps) {
  // get the current node that we have currently selected
  const currentNode = props.state.currentSelectedInlineElement ||
    props.state.currentSelectedBlockElement ||
    props.state.currentSelectedSuperBlockElement;

  const currentNodeContext = props.state.currentSelectedInlineContext ||
    props.state.currentSelectedBlockContext ||
    props.state.currentSelectedSuperBlockContext;

  const currentNodeAnchor = props.state.currentSelectedInlineElementAnchor ||
    props.state.currentSelectedBlockElementAnchor ||
    props.state.currentSelectedSuperBlockElementAnchor;

  // and now let's build all the options that we have for that we need to check our current context, if we have one
  let allOptions = currentNodeContext ? Object.keys(currentNodeContext.properties).map((p) => {
    // get the value of each property in the context properties
    const value = currentNodeContext.properties[p];

    // and it needs to be a function to pass
    if (value.type !== "function") {
      return null;
    }

    // now we can return it and give it the label it holds
    return {
      value: p,
      label: value.label,
      primary: props.state.currentRootContext !== currentNodeContext,
    }
  }).filter((v) => !!v) : [];

  if (props.state.currentRootContext !== currentNodeContext) {
    allOptions = allOptions.concat(Object.keys(props.state.currentRootContext.properties).map((p) => {
      // get the value of each property in the context properties
      const value = props.state.currentRootContext.properties[p];

      if ((value as any).nonRootInheritable) {
        return null;
      }

      // and it needs to be a function to pass
      if (value.type !== "function") {
        return null;
      }

      // now we can return it and give it the label it holds
      return {
        value: p,
        label: value.label,
        primary: false,
      }
    }).filter((v) => !!v));
  }

  // now we can return the whole box
  return (
    <Box sx={style.box}>
      {
        EVENTS.map((v, index) => (
          <SingleAction
            key={v}
            name={v}
            actionValue={currentNode[v] || null}
            options={allOptions}
            anchor={currentNodeAnchor}
            onChange={props.helpers.setAction}
            groupIndex={index}
          />
        ))
      }
    </Box>
  );
}
