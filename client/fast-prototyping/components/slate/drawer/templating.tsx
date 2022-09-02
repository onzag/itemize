/**
 * This file contains the templating options that exist within the drawer in order
 * to set the for-each and context key
 * @module
 */

import { getContextFor, RichElement } from "../../../../internal/text/serializer";
import React from "react";
import { IWrapperContainerProps } from "../wrapper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import { Path } from "slate";

const style = {
  box: {
    padding: "0.5rem",
  },
};

/**
 * An utility to define a single templating option
 * for usage in a select field
 */
interface ISingleTemplatingElementOption {
  value: string;
  label: string | React.ReactNode;
}

/**
 * The single templating element option props are the props
 * that the component takes in order to build the select field
 * for these options
 */
interface ISingleTemplatingElementProps {
  /**
   * The name of the option, used for namespacing
   */
  name: string;
  /**
   * The i18n name is what is actually visible for the user
   * used for placeholder and label
   */
  i18nName: string;
  /**
   * The current value
   */
  value: string;
  /**
   * All the options
   */
  options: ISingleTemplatingElementOption[];
  /**
   * in which anchor the value was generated from
   * we keep track of the anchor in order to know
   * if the value should be updated
   * there is a delay between the updating and receiving the
   * value in the field so it'd cause flickering otherwise
   */
  anchor: Path;
  /**
   * The change event that triggers once the select value changes
   */
  onChange: (value: string, anchor: Path) => void;
  /**
   * A class name for the box that contains it all
   */
  boxClassName?: string;
}

/**
 * The state of the templating element
 */
interface ISingleTemplatingElementState {
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
 * The single templating element class that provides the selector
 */
class SingleTemplatingElement extends React.PureComponent<ISingleTemplatingElementProps, ISingleTemplatingElementState> {

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: ISingleTemplatingElementProps, state: ISingleTemplatingElementState) {
    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const time = (new Date()).getTime();
    if (
      (props.value || "") !== state.value &&
      (
        !Path.equals(props.anchor, state.valueForAnchor) ||
        time - state.valueLastTimeRequestedUpdate > 300
      )
    ) {
      // so we update
      return {
        value: props.value || "",
        valueForAnchor: props.anchor,
      }
    }

    return null;
  }

  /**
   * Construct a brand new templating element that provides a selector
   * @param props the props
   */
  constructor(props: ISingleTemplatingElementProps) {
    // call to the super
    super(props);

    // function binding
    this.onChange = this.onChange.bind(this);

    // setup the initial state
    this.state = {
      value: props.value || "",
      valueForAnchor: props.anchor,
      valueLastTimeRequestedUpdate: 0,
    }
  }

  /**
   * This function triggers once the selection has changed
   * in the field
   * @param e the change event
   */
  public onChange(e: React.ChangeEvent<HTMLInputElement>) {
    // grab the new value from the event
    const newValue = e.target.value || null;

    // now we can update the state
    this.setState({
      value: newValue || "",
      valueForAnchor: this.props.anchor,
      valueLastTimeRequestedUpdate: (new Date()).getTime(),
    });

    // and set the state
    this.props.onChange(newValue, this.props.anchor);
  }

  public unblur() {
    document.body.dataset.unblur = "true";
  }

  public resetBlur() {
    delete document.body.dataset.unblur;
  }

  /**
   * The render function
   */
  public render() {
    // here we do the return with the box
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
 * Provides the component that contains the both selectors for both
 * each and context key for usage in templating
 * @param props the props for the templating which is literally the whole
 * options of the wrapper itself
 */
export function TemplatingOptions(props: IWrapperContainerProps) {
  // we need to pick these to make the option list
  const currentNode = props.state.currentSelectedElement as RichElement;
  const allEachContexts: ISingleTemplatingElementOption[] = [];
  const allContexts: ISingleTemplatingElementOption[] = [];
  const allIfConditions: ISingleTemplatingElementOption[] = [];

  // if we have a context, otherwise without context there are no options
  const currentSelectElementForSelectContext = getContextFor(
    props.state.currentSelectedElementAnchor,
    "select-context",
    props.state.currentValue,
    props.state.currentRootContext,
  );
  if (currentSelectElementForSelectContext) {
    // we build the key list
    Object.keys(currentSelectElementForSelectContext.properties).forEach((p) => {
      const value = currentSelectElementForSelectContext.properties[p];
      // it needs to be a context type
      if (value.type !== "context" || value.loopable) {
        return null;
      }

      // now we can build the option
      const option = {
        value: p,
        label: value.label,
      };

      allContexts.push(option);
    });
  }

  const currentSelectElementForEachContext = getContextFor(
    props.state.currentSelectedElementAnchor,
    "select-loop",
    props.state.currentValue,
    props.state.currentRootContext,
  );
  // if we have a context, otherwise without context there are no options
  if (currentSelectElementForEachContext) {
    // we build the key list
    Object.keys(currentSelectElementForEachContext.properties).forEach((p) => {
      const value = currentSelectElementForEachContext.properties[p];
      // it needs to be a context type
      const isValidForBoolean = value.type === "boolean";
      const isValidForLoop = value.type === "context" && value.loopable;
      if (!isValidForBoolean && !isValidForLoop) {
        return null;
      }

      // now we can build the option
      const option = {
        value: p,
        label: value.label,
      };

      if (isValidForBoolean) {
        allIfConditions.push(option);
      } else {
        allEachContexts.push(option);
      }
    });
  }

  if (currentNode.forEach) {
    const eachFound = allEachContexts.find((v) => v.value === currentNode.forEach);
    if (!eachFound) {
      allEachContexts.push({
        value: currentNode.forEach,
        label: currentNode.forEach,
      });
    }
  }

  if (currentNode.context) {
    const contextFound = allContexts.find((v) => v.value === currentNode.context);
    if (!contextFound) {
      allContexts.push({
        value: currentNode.context,
        label: currentNode.context,
      });
    }
  }

  if (currentNode.ifCondition) {
    const ifConditionFound = allIfConditions.find((v) => v.value === currentNode.ifCondition);
    if (!ifConditionFound) {
      allEachContexts.push({
        value: currentNode.ifCondition,
        label: currentNode.ifCondition,
      });
    }
  }

  // and return the thing
  return (
    <Box sx={style.box}>
      <SingleTemplatingElement
        name="context"
        i18nName={props.i18nRichInfo.context}
        value={currentNode.context || null}
        options={allContexts}
        anchor={props.state.currentSelectedElementAnchor}
        onChange={props.helpers.setContext}
      />
      <SingleTemplatingElement
        name="if"
        i18nName={props.i18nRichInfo.renderCondition}
        value={currentNode.ifCondition || null}
        options={allIfConditions}
        anchor={props.state.currentSelectedElementAnchor}
        onChange={props.helpers.setIfCondition}
      />
      <SingleTemplatingElement
        name="each"
        i18nName={props.i18nRichInfo.each}
        value={currentNode.forEach || null}
        options={allEachContexts}
        anchor={props.state.currentSelectedElementAnchor}
        onChange={props.helpers.setForEach}
      />
    </Box>
  );
}
