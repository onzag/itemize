/**
 * This file contains the templating options that exist within the drawer in order
 * to set the for-each and context key
 * @packageDocumentation
 */

import { RichElement } from "../../../../internal/text/serializer";
import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { FormControl, InputLabel, Select, MenuItem, FilledInput } from "@material-ui/core";
import { Path } from "slate";

/**
 * An utility to define a single templating option
 * for usage in a select field
 */
interface ISingleTemplatingElementOption {
  value: string;
  label: string;
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
    if ((props.value || "") !== state.value && !Path.equals(props.anchor, state.valueForAnchor)) {
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
    });

    // and set the state
    this.props.onChange(newValue, this.props.anchor);
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
 * Provides the component that contains the both selectors for both
 * each and context key for usage in templating
 * @param props the props for the templating which is literally the whole
 * options of the wrapper itself
 */
export function TemplatingOptions(props: MaterialUISlateWrapperWithStyles) {
  // we need to pick these to make the option list
  const currentNode = props.state.currentSelectedNode as RichElement;
  const allEachContexts: ISingleTemplatingElementOption[] = [];
  const allContexts: ISingleTemplatingElementOption[] = [];

  // if we have a context, otherwise without context there are no options
  if (props.state.currentContext) {
    // we build the key list
    Object.keys(props.state.currentContext.properties).forEach((p) => {
      const value = props.state.currentContext.properties[p];
      // it needs to be a context type
      if (value.type !== "context") {
        return null;
      }

      // now we can build the option
      const option = {
        value: p,
        label: value.label,
      };

      // and decide where it goes
      if (value.loopable) {
        allEachContexts.push(option);
      } else {
        allContexts.push(option);
      }
    });
  }

  // and return the thing
  return (
    <div className={props.classes.box}>
      <SingleTemplatingElement
        name="each"
        i18nName={props.i18nRichInfo.each}
        value={currentNode.forEach || null}
        options={allEachContexts}
        anchor={props.state.currentSelectedNodeAnchor}
        onChange={props.helpers.setForEach}
      />
      <SingleTemplatingElement
        name="context"
        i18nName={props.i18nRichInfo.context}
        value={currentNode.context || null}
        options={allContexts}
        anchor={props.state.currentSelectedNodeAnchor}
        onChange={props.helpers.setContext}
      />
    </div>
  );
}
