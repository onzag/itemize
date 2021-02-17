/**
 * Gives the general options for the current selected component, general options
 * depend on the rich element that is currently chosen, it also provides a delete
 * option to delete the node
 * @packageDocumentation
 */

import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import {
  DeleteIcon,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  FilledInput,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
} from "../../../mui-core";
import { IContainer } from "../../../../internal/text/serializer/types/container";
import { ITitle } from "../../../../internal/text/serializer/types/title";
import { IImage } from "../../../../internal/text/serializer/types/image";
import { Path, Text } from "slate";
import type { RichElement } from "../../../../internal/text/serializer";

/**
 * The state of the general option selector for the given item
 * they all use the same state even when they are all different
 * components
 */
interface IGeneralOptionsState {
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
 * This is the component that showns when modifying the general options
 * for a container, basically allows to choose the container type from the available list
 */
class GeneralContainerOptions extends React.PureComponent<MaterialUISlateWrapperWithStyles, IGeneralOptionsState> {

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IGeneralOptionsState) {

    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const selectedNode: IContainer = props.state.currentSelectedElement as any;
    if (
      (selectedNode.containerType || "") !== state.value &&
      !Path.equals(props.state.currentSelectedElementAnchor, state.valueForAnchor)
    ) {
      return {
        value: selectedNode.containerType || "",
        valueForAnchor: props.state.currentSelectedElementAnchor,
      }
    }

    return null;
  }

  /**
   * This is the constructor for the container options
   * @param props the entire wrapper props that are passed here
   */
  public constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    const selectedNode: IContainer = props.state.currentSelectedElement as any;

    this.state = {
      value: selectedNode.containerType || "",
      valueForAnchor: props.state.currentSelectedElementAnchor,
    }

    this.onUpdate = this.onUpdate.bind(this);
  }

  /**
   * This triggers on update of the change of the select field
   * in question that allows to change the container type
   * @param e the event coming from the select
   */
  public onUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    this.setState({
      value: newValue,
    });

    // we use the helper set for the container type
    // which does an arbitrary partial value update at the selected
    // anchor
    this.props.helpers.set({
      containerType: newValue,
    }, this.props.state.currentSelectedElementAnchor);
  }

  /**
   * The render function
   */
  public render() {
    return (
      <div className={this.props.classes.box}>
        <FormControl
          variant="filled"
          fullWidth={true}
        >
          <InputLabel
            htmlFor="slate-drawer-container-type-selector"
            shrink={true}
          >
            {this.props.i18nRichInfo.type}
          </InputLabel>
          <Select
            value={this.state.value}
            displayEmpty={true}
            onChange={this.onUpdate}
            variant="filled"
            input={
              <FilledInput
                id="slate-drawer-container-type-selector"
                placeholder={this.props.i18nRichInfo.type}
              />
            }
          >
            <MenuItem value="">
              <em>{" "}</em>
            </MenuItem>
            {
              // render the valid values that we display and choose
              this.props.featureSupport.availableContainers.map((vv) => {
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
 * Allows for the title element to be selected a title type, basically h1, h2, h3...
 */
class GeneralTitleOptions extends React.PureComponent<MaterialUISlateWrapperWithStyles, IGeneralOptionsState> {

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IGeneralOptionsState) {

    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const selectedNode: ITitle = props.state.currentSelectedElement as any;
    if (
      (selectedNode.subtype || "") !== state.value &&
      !Path.equals(props.state.currentSelectedElementAnchor, state.valueForAnchor)
    ) {
      return {
        value: selectedNode.subtype || "",
        valueForAnchor: props.state.currentSelectedElementAnchor,
      }
    }

    return null;
  }

  /**
   * This is the constructor for the title type options
   * @param props the entire wrapper props that are passed here
   */
  public constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    const selectedNode: ITitle = props.state.currentSelectedElement as any;

    this.state = {
      value: selectedNode.subtype || "",
      valueForAnchor: props.state.currentSelectedElementAnchor,
    }

    this.onUpdate = this.onUpdate.bind(this);
  }

  /**
   * This triggers on update of the change of the select field
   * in question that allows to change the container type
   * @param e the event coming from the select
   */
  public onUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    this.setState({
      value: newValue,
    });

    // we use the helper set for the title subtype
    // which does an arbitrary partial value update at the selected
    // anchor
    this.props.helpers.set({
      subtype: newValue,
    }, this.props.state.currentSelectedElementAnchor);
  }

  /**
   * The render function
   */
  public render() {
    return (
      <div className={this.props.classes.box}>
        <FormControl
          variant="filled"
          fullWidth={true}
        >
          <InputLabel
            htmlFor="slate-drawer-title-type-selector"
            shrink={true}
          >
            {this.props.i18nRichInfo.type}
          </InputLabel>
          <Select
            value={this.state.value}
            displayEmpty={true}
            onChange={this.onUpdate}
            variant="filled"
            input={
              <FilledInput
                id="slate-drawer-title-type-selector"
                placeholder={this.props.i18nRichInfo.type}
              />
            }
          >
            <MenuItem value="h1">h1</MenuItem>
            <MenuItem value="h2">h2</MenuItem>
            <MenuItem value="h3">h3</MenuItem>
            <MenuItem value="h4">h4</MenuItem>
            <MenuItem value="h5">h5</MenuItem>
            <MenuItem value="h6">h6</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

/**
 * The general image option uses a different state
 * because it has 2 properties that is has to track of
 */
interface IGeneralImageOptionsState {
  /**
   * Whether it's a standalone image type, that is not wrapped
   * by image pad and whatnot
   */
  standalone: boolean;
  /**
   * The alt value that is used for screen readers
   */
  altValue: string;
  /**
   * The sizes value that is used for image scale loading
   */
  sizes: string;
  /**
   * The anchor that the image is selected for as we follow the same
   * pattern as the other editor
   */
  valueForAnchor: Path;
}

/**
 * Provides the image options in order to specify the alt of the image as well
 * as the form of the image, standalone or full, where the image is not wrapped
 * and not padded, often used by the editor in order to build into custom styles
 */
class GeneralImageOptions extends React.PureComponent<MaterialUISlateWrapperWithStyles, IGeneralImageOptionsState> {
  /**
   * We build a timer for updating the alt, because the alt is text and not a selector
   * updating the alt on each keystroke can be overkill, since we have a state anyway
   * we can just wait some milliseconds
   */
  private altUpdateTimeout: NodeJS.Timer;
  private sizesUpdateTimeout: NodeJS.Timer;

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IGeneralImageOptionsState) {

    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const selectedNode: IImage = props.state.currentSelectedElement as any;
    if (
      (
        (selectedNode.alt || "") !== state.altValue ||
        (selectedNode.sizes || "") !== state.sizes ||
        selectedNode.standalone !== state.standalone
      ) &&
      !Path.equals(props.state.currentSelectedElementAnchor, state.valueForAnchor)
    ) {
      return {
        altValue: selectedNode.alt || "",
        standalone: selectedNode.standalone,
        sizes: selectedNode.sizes || "",
        valueForAnchor: props.state.currentSelectedElementAnchor,
      }
    }

    return null;
  }

  /**
   * This is the constructor for the image form options
   * @param props the entire wrapper props that are passed here
   */
  constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    const selectedNode: IImage = props.state.currentSelectedElement as any;

    this.state = {
      altValue: selectedNode.alt || "",
      standalone: selectedNode.standalone,
      sizes: selectedNode.sizes || "",
      valueForAnchor: props.state.currentSelectedElementAnchor,
    }

    this.updateAlt = this.updateAlt.bind(this);
    this.actuallyUpdateAlt = this.actuallyUpdateAlt.bind(this);
    this.updateStandalone = this.updateStandalone.bind(this);
  }

  /**
   * Performs the actually update of the alt based on the
   * state and when the timer has finally ellapsed
   */
  public actuallyUpdateAlt() {
    // here we use the arbitrary partial value set function
    // to update the node at the given anchor
    this.props.helpers.set({
      alt: this.state.altValue,
    }, this.props.state.currentSelectedElementAnchor);
  }

  /**
   * Performs the actually update of the sizes based on the
   * state and when the timer has finally ellapsed
   */
  public actuallyUpdateSizes() {
    // here we use the arbitrary partial value set function
    // to update the node at the given anchor
    this.props.helpers.set({
      sizes: this.state.sizes,
    }, this.props.state.currentSelectedElementAnchor);
  }

  /**
   * Performs the state update of the alt into the state
   * and delays the execution of the update in the node
   * in order to avoid doing a tree update of the rich text
   * on every key stroke
   * @param e the change event in the input
   */
  public updateAlt(e: React.ChangeEvent<HTMLInputElement>) {
    // update the state
    this.setState({
      altValue: e.target.value,
    });

    // now we clear a possibly existant previous timeout
    clearTimeout(this.altUpdateTimeout);
    // and then we create a new timeout in 300 ms
    this.altUpdateTimeout = setTimeout(this.actuallyUpdateAlt, 300);
  }

  /**
   * Performs the state update of the alt into the state
   * and delays the execution of the update in the node
   * in order to avoid doing a tree update of the rich text
   * on every key stroke
   * @param e the change event in the input
   */
  public updateSizes(e: React.ChangeEvent<HTMLInputElement>) {
    // update the state
    this.setState({
      sizes: e.target.value,
    });

    // now we clear a possibly existant previous timeout
    clearTimeout(this.sizesUpdateTimeout);
    // and then we create a new timeout in 300 ms
    this.sizesUpdateTimeout = setTimeout(this.actuallyUpdateSizes, 300);
  }

  /**
   * Updates the standalone state of the image, both in the state and
   * in the node itself
   * @param e the change event from the checkbox that allows to select this
   */
  public updateStandalone(e: React.ChangeEvent<HTMLInputElement>) {
    // change the state
    this.setState({
      standalone: e.target.checked,
    });

    // use the partial value setter to set the value of standalone at the given node
    this.props.helpers.set({
      standalone: e.target.checked,
    }, this.props.state.currentSelectedElementAnchor);
  }

  /**
   * The render function
   */
  public render() {
    return (
      <div className={this.props.classes.box}>
        <TextField
          value={this.state.altValue}
          label={this.props.i18nRichInfo.alt}
          placeholder={this.props.i18nRichInfo.alt}
          variant="filled"
          onChange={this.updateAlt}
          fullWidth={true}
        />
        <TextField
          value={this.state.sizes}
          label={this.props.i18nRichInfo.sizes}
          placeholder={this.props.i18nRichInfo.sizes}
          variant="filled"
          onChange={this.updateSizes}
          fullWidth={true}
        />
        <FormControlLabel
          control={<Switch checked={this.state.standalone} onChange={this.updateStandalone} />}
          label={this.props.i18nRichInfo.standalone}
        />
      </div>
    );
  }
}

/**
 * The general image option uses a different state
 * because it has 2 properties that is has to track of
 */
interface IGeneralElementOptionsState {
  /**
   * The name that is being used
   */
  name: string;
  /**
   * The anchor that the image is selected for as we follow the same
   * pattern as the other editor
   */
  valueForAnchor: Path;
}

/**
 * Provides options that are shared in common with all the elements
 */
class GeneralElementOptions extends React.PureComponent<MaterialUISlateWrapperWithStyles, IGeneralElementOptionsState> {
  /**
   * We build a timer for updating the name, because the name is text and not a selector
   * updating the name on each keystroke can be overkill, since we have a state anyway
   * we can just wait some milliseconds
   */
  private nameUpdateTimeout: NodeJS.Timer;

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IGeneralElementOptionsState) {

    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const selectedNode: IImage = props.state.currentSelectedElement as any;
    if (
      (
        (selectedNode.givenName || "") !== state.name
      ) &&
      !Path.equals(props.state.currentSelectedElementAnchor, state.valueForAnchor)
    ) {
      return {
        name: selectedNode.givenName || "",
        valueForAnchor: props.state.currentSelectedElementAnchor,
      }
    }

    return null;
  }

  /**
   * This is the constructor for the image form options
   * @param props the entire wrapper props that are passed here
   */
  constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    const selectedNode: RichElement = props.state.currentSelectedElement as any;

    this.state = {
      name: selectedNode.givenName || "",
      valueForAnchor: props.state.currentSelectedElementAnchor,
    }

    this.updateName = this.updateName.bind(this);
    this.actuallyUpdateName = this.actuallyUpdateName.bind(this);
  }

  /**
   * Performs the actually update of the alt based on the
   * state and when the timer has finally ellapsed
   */
  public actuallyUpdateName() {
    // here we use the arbitrary partial value set function
    // to update the node at the given anchor
    this.props.helpers.set({
      givenName: this.state.name,
    }, this.props.state.currentSelectedElementAnchor);
  }

  /**
   * Performs the state update of the name into the state
   * and delays the execution of the update in the node
   * in order to avoid doing a tree update of the rich text
   * on every key stroke
   * @param e the change event in the input
   */
  public updateName(e: React.ChangeEvent<HTMLInputElement>) {
    // update the state
    this.setState({
      name: e.target.value,
    });

    // now we clear a possibly existant previous timeout
    clearTimeout(this.nameUpdateTimeout);
    // and then we create a new timeout in 300 ms
    this.nameUpdateTimeout = setTimeout(this.actuallyUpdateName, 300);
  }

  /**
   * The render function
   */
  public render() {
    return (
      <div className={this.props.classes.box}>
        <TextField
          value={this.state.name}
          label={this.props.i18nRichInfo.name}
          placeholder={this.props.i18nRichInfo.name}
          variant="filled"
          onChange={this.updateName}
          fullWidth={true}
        />
      </div>
    );
  }
}

/**
 * Provides the drawer section with all the general options of a given component
 * these general options are the specific options for the generic components
 * @param props all the entire wrapper props
 */
export function GeneralOptions(props: MaterialUISlateWrapperWithStyles) {
  // we need to build the node and some nodes just don't
  // have any options
  let specificNodeOptions: React.ReactNode = null;

  // so we got to get in the type
  switch ((props.state.currentSelectedElement as any).type) {
    case "container":
      specificNodeOptions = <GeneralContainerOptions {...props} />
      break;
    case "title":
      specificNodeOptions = <GeneralTitleOptions {...props} />
      break;
    case "image":
      specificNodeOptions = <GeneralImageOptions {...props} />
      break;
  }

  // and return
  return (
    <>
      {
        Text.isText((props.state.currentSelectedElement as any)) ?
        null :
        <GeneralElementOptions {...props}/>
      }
      {specificNodeOptions}
      <IconButton onClick={props.helpers.deleteSelectedNode}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}
