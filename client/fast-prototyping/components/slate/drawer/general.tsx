/**
 * Gives the general options for the current selected component, general options
 * depend on the rich element that is currently chosen, it also provides a delete
 * option to delete the node
 * @module
 */

import React from "react";
import { IWrapperContainerProps } from "../wrapper";
import { IContainer } from "../../../../internal/text/serializer/types/container";
import { ITitle } from "../../../../internal/text/serializer/types/title";
import { IImage } from "../../../../internal/text/serializer/types/image";
import { Path, Text } from "slate";
import type { RichElement } from "../../../../internal/text/serializer";
import {
  DrawerConfiguratorElement,
  IDrawerConfiguratorElementBase,
  IDrawerConfiguratorElementSection,
  IDrawerUIHandlerElementConfigCustomProps
} from "../wrapper";
import type { IHelperFunctions, ISlateEditorStateType } from "..";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function getPathFromBasisParent(path: Path, basisParent?: number) {
  if (!basisParent) {
    return path;
  }

  const newPath = [...path];
  for (let i = 0; i < basisParent; i++) {
    newPath.pop();
  }

  return newPath;
}

function getNodeFromBasisParent(helpers: IHelperFunctions, element: RichElement, path: Path, basisParent?: number): RichElement {
  if (!basisParent) {
    return element;
  }

  const newPath = getPathFromBasisParent(path, basisParent);
  if (Path.equals(path, newPath)) {
    return element;
  }

  if (!newPath || newPath.length === 0) {
    return null;
  }

  return helpers.Node.get(helpers.editor, newPath) as any;
}

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
  valueLastTimeRequestedUpdate: number;
  invalid: boolean;
}

/**
 * This is the component that showns when modifying the general options
 * for a container, basically allows to choose the container type from the available list
 */
class GeneralContainerOptions extends React.PureComponent<IWrapperContainerProps, IGeneralOptionsState> {

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: IWrapperContainerProps, state: IGeneralOptionsState) {

    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const selectedNode: IContainer = props.state.currentSelectedSuperBlockElement as any;
    const time = (new Date()).getTime()
    if (
      (selectedNode.containerType || "") !== state.value &&
      (
        !Path.equals(props.state.currentSelectedSuperBlockElementAnchor, state.valueForAnchor) ||
        time - state.valueLastTimeRequestedUpdate > 300
      )
    ) {
      return {
        value: selectedNode.containerType || "",
        valueForAnchor: props.state.currentSelectedSuperBlockElement,
        invalid: false,
      }
    }

    return null;
  }

  /**
   * This is the constructor for the container options
   * @param props the entire wrapper props that are passed here
   */
  public constructor(props: IWrapperContainerProps) {
    super(props);

    const selectedNode: IContainer = props.state.currentSelectedSuperBlockElement as any;

    this.state = {
      value: selectedNode.containerType || "",
      valueForAnchor: props.state.currentSelectedSuperBlockElementAnchor,
      valueLastTimeRequestedUpdate: 0,
      invalid: false,
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
      valueLastTimeRequestedUpdate: (new Date()).getTime(),
    }, () => {
      // we use the helper set for the container type
      // which does an arbitrary partial value update at the selected
      // anchor
      this.props.helpers.set({
        containerType: newValue,
      }, this.props.state.currentSelectedSuperBlockElementAnchor);
    });
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
            onOpen={this.unblur}
            onClose={this.resetBlur}
          >
            <MenuItem value="">
              <em>{" - "}</em>
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
class GeneralTitleOptions extends React.PureComponent<IWrapperContainerProps, IGeneralOptionsState> {

  /**
   * We need the derived function in order to be able to update the value of the
   * selector in case, this is the more efficient way in these cases where things
   * are slightly out of sync
   */
  static getDerivedStateFromProps(props: IWrapperContainerProps, state: IGeneralOptionsState) {

    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const selectedNode: ITitle = props.state.currentSelectedElement as any;
    const time = (new Date()).getTime()
    if (
      (selectedNode.subtype || "") !== state.value &&
      (
        !Path.equals(props.state.currentSelectedElementAnchor, state.valueForAnchor) ||
        time - state.valueLastTimeRequestedUpdate > 300
      )
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
  public constructor(props: IWrapperContainerProps) {
    super(props);

    const selectedNode: ITitle = props.state.currentSelectedElement as any;

    this.state = {
      value: selectedNode.subtype || "",
      valueForAnchor: props.state.currentSelectedElementAnchor,
      valueLastTimeRequestedUpdate: 0,
      invalid: false,
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
      valueLastTimeRequestedUpdate: (new Date()).getTime(),
    }, () => {
      // we use the helper set for the title subtype
      // which does an arbitrary partial value update at the selected
      // anchor
      this.props.helpers.set({
        subtype: newValue,
      }, this.props.state.currentSelectedElementAnchor);
    });
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
            onOpen={this.unblur}
            onClose={this.resetBlur}
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
  valueLastTimeRequestedUpdate: number;
}

/**
 * Provides the image options in order to specify the alt of the image as well
 * as the form of the image, standalone or full, where the image is not wrapped
 * and not padded, often used by the editor in order to build into custom styles
 */
class GeneralImageOptions extends React.PureComponent<IWrapperContainerProps, IGeneralImageOptionsState> {
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
  static getDerivedStateFromProps(props: IWrapperContainerProps, state: IGeneralImageOptionsState) {

    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const selectedNode: IImage = props.state.currentSelectedElement as any;
    const time = (new Date()).getTime()
    if (
      (
        (selectedNode.alt || "") !== state.altValue ||
        (selectedNode.sizes || "") !== state.sizes ||
        selectedNode.standalone !== state.standalone
      ) &&
      (
        !Path.equals(props.state.currentSelectedElementAnchor, state.valueForAnchor) ||
        time - state.valueLastTimeRequestedUpdate > 300
      )
    ) {
      return {
        altValue: selectedNode.alt || "",
        standalone: selectedNode.standalone,
        sizes: selectedNode.sizes || "",
        valueForAnchor: props.state.currentSelectedElementAnchor,
      }
    }

    return null;
  }

  /**
   * This is the constructor for the image form options
   * @param props the entire wrapper props that are passed here
   */
  constructor(props: IWrapperContainerProps) {
    super(props);

    const selectedNode: IImage = props.state.currentSelectedElement as any;

    this.state = {
      altValue: selectedNode.alt || "",
      standalone: selectedNode.standalone,
      sizes: selectedNode.sizes || "",
      valueForAnchor: props.state.currentSelectedElementAnchor,
      valueLastTimeRequestedUpdate: 0,
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

interface IGeneralUIHandlerOptionProps extends IWrapperContainerProps {
  arg: string;
  basisState: string;
  basisParent: number;
  label: string | React.ReactNode;
  placeholder: string | React.ReactNode;
  isSelect: boolean;
  isCustom: boolean;
  isBoolean: boolean;
  pattern?: string;
  subtype?: "text" | "number";
  condition?: (state: ISlateEditorStateType) => boolean;
  CustomComponent: React.ComponentType<IDrawerUIHandlerElementConfigCustomProps>;
  options?: Array<{ label: string | React.ReactNode, value: string }>;
}

class GeneralUIHandlerOption extends React.PureComponent<IGeneralUIHandlerOptionProps, IGeneralOptionsState> {
  static getDerivedStateFromProps(props: IGeneralUIHandlerOptionProps, state: IGeneralOptionsState) {
    if (!props.arg) {
      return {
        value: null as any,
        valueForAnchor: getPathFromBasisParent(props.state[props.basisState + "Anchor"], props.basisParent),
      }
    }

    const selectedNode: RichElement = getNodeFromBasisParent(
      props.helpers,
      props.state[props.basisState] as any,
      props.state[props.basisState + "Anchor"],
      props.basisParent,
    );
    const selectedNodeAnchor = getPathFromBasisParent(props.state[props.basisState + "Anchor"], props.basisParent);
    const currentValueItHolds = ((selectedNode.uiHandlerArgs && selectedNode.uiHandlerArgs[props.arg]) || "");
    const time = (new Date()).getTime()
    if (
      currentValueItHolds !== state.value &&
      (
        !Path.equals(selectedNodeAnchor, state.valueForAnchor) ||
        time - state.valueLastTimeRequestedUpdate > 300
      )
    ) {
      return {
        value: state.invalid ? state.value : currentValueItHolds,
        valueForAnchor: selectedNodeAnchor,
      }
    }

    return null;
  }

  private inputUpdateTimeout: NodeJS.Timer;

  /**
   * This is the constructor for the title type options
   * @param props the entire wrapper props that are passed here
   */
  public constructor(props: IGeneralUIHandlerOptionProps) {
    super(props);

    const selectedNode: RichElement = getNodeFromBasisParent(
      props.helpers,
      props.state[props.basisState] as any,
      props.state[props.basisState + "Anchor"],
      props.basisParent,
    );
    const selectedNodeAnchor = getPathFromBasisParent(props.state[props.basisState + "Anchor"], props.basisParent);

    this.state = {
      value: props.arg ? ((selectedNode.uiHandlerArgs && selectedNode.uiHandlerArgs[props.arg]) || "") : null,
      valueForAnchor: selectedNodeAnchor,
      valueLastTimeRequestedUpdate: 0,
      invalid: false,
    }

    this.onUpdateBySelect = this.onUpdateBySelect.bind(this);
    this.updateByInput = this.updateByInput.bind(this);
    this.actuallyUpdate = this.actuallyUpdate.bind(this);
    this.onDelayedUpdate = this.onDelayedUpdate.bind(this);
    this.onImmediateUpdate = this.onImmediateUpdate.bind(this);
    this.onChangeByBoolean = this.onChangeByBoolean.bind(this);
  }

  public onDelayedUpdate(v: string) {
    // update the state
    this.setState({
      value: v || "",
      valueLastTimeRequestedUpdate: (new Date()).getTime(),
    });

    // now we clear a possibly existant previous timeout
    clearTimeout(this.inputUpdateTimeout);
    // and then we create a new timeout in 300 ms
    this.inputUpdateTimeout = setTimeout(this.actuallyUpdate, 300);
  }

  public onImmediateUpdate(v: string) {
    this.setState({
      value: v || "",
      valueLastTimeRequestedUpdate: (new Date()).getTime(),
    }, () => {
      // we use the helper set for the title subtype
      // which does an arbitrary partial value update at the selected
      // anchor
      const selectedNodeAnchor = getPathFromBasisParent(this.props.state[this.props.basisState + "Anchor"], this.props.basisParent);
      this.props.helpers.setUIHandlerArg(this.props.arg, v || null, selectedNodeAnchor);
    });
  }

  /**
   * This triggers on update of the change of the select field
   * in question that allows to change the container type
   * @param e the event coming from the select
   */
  public onUpdateBySelect(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    this.onImmediateUpdate(newValue);
  }

  /**
   * Performs the state update of the alt into the state
   * and delays the execution of the update in the node
   * in order to avoid doing a tree update of the rich text
   * on every key stroke
   * @param e the change event in the input
   */
  public updateByInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.pattern) {
      const patternRegex = new RegExp(this.props.pattern, "g");
      const isValid = patternRegex.test(e.target.value);
      if (!isValid) {
        this.setState({
          value: e.target.value || "",
          invalid: true,
        });
        return;
      } else if (this.state.invalid) {
        this.setState({
          invalid: false,
        });
      }
    } else if (this.state.invalid) {
      this.setState({
        invalid: false,
      });
    }
    this.onDelayedUpdate(e.target.value);
  }

  /**
   * Performs the actually update of the alt based on the
   * state and when the timer has finally ellapsed
   */
  public actuallyUpdate() {
    if (!this.state.invalid) {
      this.setState({
        valueLastTimeRequestedUpdate: (new Date()).getTime(),
      }, () => {
        const selectedNodeAnchor = getPathFromBasisParent(this.props.state[this.props.basisState + "Anchor"], this.props.basisParent);
        this.props.helpers.setUIHandlerArg(this.props.arg, this.state.value || null, selectedNodeAnchor);
      });
    }
  }

  public unblur() {
    document.body.dataset.unblur = "true";
  }

  public resetBlur() {
    delete document.body.dataset.unblur;
  }

  public onChangeByBoolean(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.checked ? "true" : "false";
    this.onImmediateUpdate(newValue);
  }

  /**
   * The render function
   */
  public render() {
    if (this.props.condition) {
      if (!this.props.condition(this.props.state)) {
        return null;
      }
    }

    if (this.props.isCustom) {
      const CustomComponent = this.props.CustomComponent;
      return (
        <CustomComponent
          value={this.state.value}
          onChange={this.onImmediateUpdate}
          onDelayedChange={this.onDelayedUpdate}
          helpers={this.props.helpers}
          state={this.props.state}
          fastKeyActive={this.props.fastKeyActive}
        />
      );
    }

    if (this.props.isBoolean) {
      return (
        <FormControl
          variant="filled"
          fullWidth={true}
        >
          <FormControlLabel
            control={
              <Switch
                checked={this.state.value === "true"}
                onChange={this.onChangeByBoolean}
              />
            }
            label={this.props.label}
          />
        </FormControl>
      );
    }

    if (!this.props.isSelect) {
      const textFieldProps: any = {
        value: this.state.value,
        label: this.props.label,
        variant: "filled" as "filled",
        onChange: this.updateByInput,
        fullWidth: true,
        type: this.props.subtype ? this.props.subtype : "text",
      }
      if (this.state.invalid) {
        textFieldProps.color = "secondary";
      }
      if (typeof this.props.placeholder === "string") {
        return (
          <TextField
            {...textFieldProps}
            placeholder={this.props.placeholder}
          />
        );
      } else {
        const element: React.ReactElement = this.props.placeholder as any;
        const elementCloned = React.cloneElement(element, {
          children: (i18nPlaceholder: string) => (
            <TextField
              {...textFieldProps}
              placeholder={i18nPlaceholder}
            />
          )
        });
        return elementCloned;
      }
    }

    const elemCreator = (placeholder: string) => (
      <FormControl
        variant="filled"
        fullWidth={true}
      >
        <InputLabel
          htmlFor={"slate-drawer-uihandled-" + this.props.arg + "-selector"}
          shrink={true}
        >
          {this.props.label}
        </InputLabel>
        <Select
          value={this.state.value}
          displayEmpty={true}
          onChange={this.onUpdateBySelect}
          variant="filled"
          input={
            <FilledInput
              id={"slate-drawer-uihandled-" + this.props.arg + "-selector"}
              placeholder={placeholder}
            />
          }
          onOpen={this.unblur}
          onClose={this.resetBlur}
        >
          {this.props.options.map((o) => (
            <MenuItem value={o.value || ""} key={o.value || ""}>{o.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    if (typeof this.props.placeholder === "string") {
      return elemCreator(this.props.placeholder);
    } else {
      const element: React.ReactElement = this.props.placeholder as any;
      const elementCloned = React.cloneElement(element, {
        children: elemCreator,
      });
      return elementCloned;
    }
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
  valueLastTimeRequestedUpdate: number;
}

/**
 * Provides options that are shared in common with all the elements
 */
class GeneralElementOptions extends React.PureComponent<IWrapperContainerProps, IGeneralElementOptionsState> {
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
  static getDerivedStateFromProps(props: IWrapperContainerProps, state: IGeneralElementOptionsState) {

    // for that we check if the value is not the same as the one in the state, which happens
    // whenever changing, but in order to actually change it we only do so if it's a different
    // element anchor we are at
    const selectedNode: IImage = props.state.currentSelectedElement as any;
    const time = (new Date()).getTime()
    if (
      (
        (selectedNode.givenName || "") !== state.name
      ) &&
      (
        !Path.equals(props.state.currentSelectedElementAnchor, state.valueForAnchor) ||
        time - state.valueLastTimeRequestedUpdate > 300
      )
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
  constructor(props: IWrapperContainerProps) {
    super(props);

    const selectedNode: RichElement = props.state.currentSelectedElement as any;

    this.state = {
      name: selectedNode.givenName || "",
      valueForAnchor: props.state.currentSelectedElementAnchor,
      valueLastTimeRequestedUpdate: 0,
    }

    this.updateName = this.updateName.bind(this);
    this.actuallyUpdateName = this.actuallyUpdateName.bind(this);
  }

  /**
   * Performs the actually update of the alt based on the
   * state and when the timer has finally ellapsed
   */
  public actuallyUpdateName() {
    this.setState({
      valueLastTimeRequestedUpdate: (new Date()).getTime(),
    }, () => {
      // here we use the arbitrary partial value set function
      // to update the node at the given anchor
      this.props.helpers.set({
        givenName: this.state.name,
      }, this.props.state.currentSelectedElementAnchor);
    })
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
      valueLastTimeRequestedUpdate: (new Date()).getTime(),
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

function processDrawerElementBase(x: IDrawerConfiguratorElementBase, props: IWrapperContainerProps, index: number) {
  const stateElem = basisToState[x.basis || "selected"];
  return (
    <GeneralUIHandlerOption
      {...props}
      basisState={stateElem}
      basisParent={x.basisParent}
      condition={x.condition}
      arg={x.arg}
      label={(x.input as any).label}
      placeholder={(x.input as any).placeholder}
      pattern={(x.input as any).pattern}
      subtype={(x.input as any).subtype}
      isSelect={x.input.type === "select"}
      isBoolean={x.input.type === "boolean"}
      isCustom={x.input.type === "custom"}
      CustomComponent={x.input.type === "custom" && x.input.component}
      options={x.input.type === "select" && x.input.options}
      key={x.arg || index}
    />
  );
}

function checkUIHandlerMatches(x: IDrawerConfiguratorElementBase, value: string) {
  return typeof x.uiHandler !== "undefined" ?
    (
      // for null
      x.uiHandler === null ?
        // there shouldn't be an ui handler
        !value :
        // shoudl match
        Array.isArray(x.uiHandler) ? x.uiHandler.some((h) => {
          return h === null ? !value : h === value;
        }) : x.uiHandler === value
    ) :
    // everything passes
    true;
}

function processDrawerElementsBase(elems: IDrawerConfiguratorElementBase[], props: IWrapperContainerProps) {
  return (
    <div className={props.classes.box}>
      {elems.filter((x) => {
        const stateElem = basisToState[x.basis || "selected"];
        let element: RichElement = props.state[stateElem];

        if (!element) {
          return false;
        }

        if (x.basisParent) {
          element = getNodeFromBasisParent(
            props.helpers,
            element,
            props.state[stateElem + "Anchor"],
            x.basisParent,
          );
  
          if (!element) {
            return false;
          }
        }

        // if an ui handler is specified
        return checkUIHandlerMatches(x, element.uiHandler);
      }).map((x, index) => {
        return processDrawerElementBase(x, props, index);
      })}
    </div>
  );
}

function processDrawerElements(elems: DrawerConfiguratorElement[], props: IWrapperContainerProps) {
  return (
    elems.map((x, index) => {
      const asBase: IDrawerConfiguratorElementBase = x as any;
      const asSection: IDrawerConfiguratorElementSection = x as any;

      if (asBase.input) {
        return (
          <div className={props.classes.box} key={asBase.arg || index}>
            {processDrawerElementBase(asBase, props, index)}
          </div>
        );
      } else {
        const extraProps: any = {};
        if (asSection.unblur) {
          extraProps["data-unblur"] = "true";
        }
        return (
          <React.Fragment key={index}>
            <Typography>{asSection.title}</Typography>
            <Paper {...extraProps}>
              {processDrawerElementsBase(asSection.elements, props)}
            </Paper>
          </React.Fragment>
        );
      }
    })
  );
}

const basisToState = {
  selected: "currentSelectedElement",
  block: "currentSelectedBlockElement",
  superblock: "currentSelectedSuperBlockElement",
}

/**
 * Provides the drawer section with all the general options of a given component
 * these general options are the specific options for the generic components
 * @param props all the entire wrapper props
 */
export function GeneralOptions(props: IWrapperContainerProps) {
  // we need to build the node and some nodes just don't
  // have any options
  let specificSuperBlockOptions: React.ReactNode = null;
  let specificNodeOptions: React.ReactNode = null;

  // so we got to get in the type
  if (!props.state.currentSelectedElement.uiHandler && props.drawerMode !== "barebones") {
    switch ((props.state.currentSelectedElement as any).type) {
      case "title":
        specificNodeOptions = <GeneralTitleOptions {...props} />
        break;
      case "image":
        specificNodeOptions = <GeneralImageOptions {...props} />
        break;
    }
  }

  if (
    props.state.currentSelectedSuperBlockElement &&
    !props.state.currentSelectedSuperBlockElement.uiHandler &&
    props.drawerMode !== "barebones"
  ) {
    switch ((props.state.currentSelectedSuperBlockElement as any).type) {
      case "container":
        specificSuperBlockOptions = <GeneralContainerOptions {...props} />
        break;
    }
  }

  let extraNodeOptions: React.ReactNode = null;
  const extrasApplied = props.drawerExtras && props.drawerExtras
    .filter((x) => {
      const stateElem = basisToState[x.basis || "selected"];
      let element: RichElement = props.state[stateElem];

      if (!element) {
        return false;
      }

      if (x.basisParent) {
        element = getNodeFromBasisParent(
          props.helpers,
          element,
          props.state[stateElem + "Anchor"],
          x.basisParent,
        );

        if (!element) {
          return false;
        }
      }

      // if an ui handler is specified
      return checkUIHandlerMatches(x as any, element.uiHandler);
    });
  if (extrasApplied && extrasApplied.length) {
    extraNodeOptions = processDrawerElements(extrasApplied, props);
  }

  // and return
  return (
    <>
      {
        Text.isText((props.state.currentSelectedElement as any)) || props.drawerMode === "barebones" ?
          null :
          <GeneralElementOptions {...props} />
      }
      {specificSuperBlockOptions}
      {specificNodeOptions}
      {extraNodeOptions}
    </>
  );
}
