/**
 * This file contains the styles options that exist within the drawer in order
 * to set all the inline styles for the component
 * @packageDocumentation
 */

import { RichElement } from "../../../../internal/text/serializer";
import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import { FormControl, InputLabel, Select, Input, Chip, MenuItem, TextField, FilledInput } from "@material-ui/core";
import { Path } from "slate";
import equals from "deep-equal";

/**
 * The single style option props that define a single
 * option for the inline style, either, active, hover,
 * or the standard style
 */
interface ISingleStyleProps {
  /**
   * the name, it's used in the label and placeholder, not just namespacing
   */
  name: string;
  /**
   * The current value as it is right now
   */
  styleValue: string;
  /**
   * in which anchor the value was generated from
   * we keep track of the anchor in order to know
   * if the value should be updated
   * there is a delay between the updating and receiving the
   * value in the field so it'd cause flickering otherwise
   */
  anchor: Path;
  /**
   * Triggers on the change of the text field, and it triggers
   * every time a keypress is done
   */
  onChange: (value: string, anchor: Path) => void;
  /**
   * Class name for the box that contains it all
   */
  boxClassName?: string;
  /**
   * Class name for the input itself
   */
  inputClassName?: string;
}

/**
 * The state of the style input element
 */
interface ISingleStyleState {
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
 * The single style element that provides an input for setting the style
 * both active, hover and the standard
 */
class SingleStyle extends React.PureComponent<ISingleStyleProps, ISingleStyleState> {

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: ISingleStyleProps, state: ISingleStyleState) {
    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    if ((props.styleValue || "") !== state.value && !Path.equals(props.anchor, state.valueForAnchor)) {
      // so we update
      return {
        value: props.styleValue || "",
        valueForAnchor: props.anchor,
      }
    }

    return null;
  }

  /**
   * Constructs the element that provides an input for active, hover and the standard
   * @param props 
   */
  constructor(props: ISingleStyleProps) {
    super(props);

    // bind the functions
    this.onStyleChange = this.onStyleChange.bind(this);

    // set the initial state
    this.state = {
      value: props.styleValue || "",
      valueForAnchor: props.anchor,
    }
  }

  /**
   * Triggers each time the input for the style changes
   * @param e the change event in question
   */
  public onStyleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // set the new value
    const newValue = e.target.value.trim() || null;
    // set the state
    this.setState({
      value: newValue || "",
      valueForAnchor: this.props.anchor,
    });
    // call the event
    this.props.onChange(newValue, this.props.anchor);
  }

  /**
   * The standard render function
   */
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

/**
 * The state for the classes option selector that allows
 * for selecting rich classes
 */
interface IClassesOptionSelectorState {
  /**
   * The current value as in the state, we store the value here
   * and we keep it here because there's a delay when updating these
   * values from the rich element content
   * 
   * This is an array because the classes for the element are an array
   */
  value: string[];
  /**
   * The anchor where it comes from we also store the anchor to know if it has
   * changed which means it's another element, otherwise we assume that the state
   * value is the right value
   */
  valueForAnchor: Path;
}

/**
 * Provides a picker for rich classes in the drawer for the given element
 * basically a select field
 */
class ClassesOptionSelector extends React.PureComponent<MaterialUISlateWrapperWithStyles, IClassesOptionSelectorState> {

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IClassesOptionSelectorState) {
    // we do it this way because this component eats the entire wrapper props so we need to pick it right
    // from the current selected node
    const selectedNode: RichElement = props.state.currentSelectedNode as any;

    // and we use both equals and path equals to determine a change
    // and avoid the sync issue
    if (
      !equals(selectedNode.richClassList || [], state.value) &&
      !Path.equals(props.state.currentSelectedNodeAnchor, state.valueForAnchor)
    ) {
      return {
        value: selectedNode.richClassList || [],
        valueForAnchor: props.state.currentSelectedNodeAnchor,
      }
    }

    return null;
  }

  /**
   * constructs a new class selector for rich classes
   * @param props the entire material ui slate wrapper props that the wrapper takes
   */
  constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    // setup the initial state
    const selectedNode: RichElement = props.state.currentSelectedNode as any;
    this.state = {
      value: selectedNode.richClassList || [],
      valueForAnchor: props.state.currentSelectedNodeAnchor,
    };

    this.onRichClassListChange = this.onRichClassListChange.bind(this);
  }

  /**
   * Triggers when the select field changes and receives a new value
   * @param e the change event
   */
  public onRichClassListChange(e: React.ChangeEvent<{ name: string, value: string[] }>) {
    // we pick it off, as it's an array of string because
    // this is a multiselect
    let newValue: string[] = e.target.value;
    // now we can update the state
    this.setState({
      value: newValue,
      valueForAnchor: this.props.state.currentSelectedNodeAnchor,
    });

    // if we have nothing, the new value is null
    // for the primary component
    if (newValue.length === 0) {
      newValue = null;
    }

    // so we set such
    this.props.helpers.setRichClasses(newValue, this.props.state.currentSelectedNodeAnchor);
  }

  /**
   * The render function that creates the multiselect
   */
  public render() {
    // we use a chip form in order to make it for multiple selection
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

/**
 * Provides the component that contains the multiselector for the rich classes
 * as well as allows to set active, hover and standard styles for the component
 * @param props the props for the templating which is literally the whole
 * options of the wrapper itself
 */
export function StylesOptions(props: MaterialUISlateWrapperWithStyles) {
  const currentNode = props.state.currentSelectedNode as RichElement;
  return (
    <div className={props.classes.box}>
      {
        props.featureSupport.supportsRichClasses ?
          <ClassesOptionSelector {...props} /> : null
      }
      {
        props.featureSupport.supportsCustomStyles ?
          <SingleStyle
            anchor={props.state.currentSelectedNodeAnchor}
            onChange={props.helpers.setStyle}
            name={props.i18nRichInfo.style}
            styleValue={currentNode.style}
            inputClassName={props.classes.input}
          /> : null
      }
      {
        props.featureSupport.supportsCustomStyles && props.featureSupport.supportsTemplating ?
          <SingleStyle
            anchor={props.state.currentSelectedNodeAnchor}
            onChange={props.helpers.setHoverStyle}
            name={props.i18nRichInfo.styleHover}
            styleValue={currentNode.styleHover}
            inputClassName={props.classes.input}
          /> : null
      }
      {
        props.featureSupport.supportsCustomStyles && props.featureSupport.supportsTemplating ?
          <SingleStyle
            anchor={props.state.currentSelectedNodeAnchor}
            onChange={props.helpers.setActiveStyle}
            name={props.i18nRichInfo.styleActive}
            styleValue={currentNode.styleActive}
            inputClassName={props.classes.input}
          /> : null
      }
    </div>
  );
}
