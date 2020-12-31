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
import { Path } from "slate";

interface IGeneralOptionsState {
  value: string;
  valueForAnchor: Path;
}

class GeneralContainerOptions extends React.PureComponent<MaterialUISlateWrapperWithStyles, IGeneralOptionsState> {
  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IGeneralOptionsState) {
    const selectedNode: IContainer = props.state.currentSelectedNode as any;
    if (
      (selectedNode.containerType || "") !== state.value &&
      !Path.equals(props.state.currentSelectedNodeAnchor, state.valueForAnchor)
    ) {
      return {
        value: selectedNode.containerType || "",
        valueForAnchor: props.state.currentSelectedNodeAnchor,
      }
    }

    return null;
  }

  public constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    const selectedNode: IContainer = props.state.currentSelectedNode as any;

    this.state = {
      value: selectedNode.containerType || "",
      valueForAnchor: props.state.currentSelectedNodeAnchor,
    }

    this.onUpdate = this.onUpdate.bind(this);
  }

  public onUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    this.setState({
      value: newValue,
    });

    this.props.helpers.set({
      containerType: newValue,
    }, this.props.state.currentSelectedNodeAnchor);
  }

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

class GeneralTitleOptions extends React.PureComponent<MaterialUISlateWrapperWithStyles, IGeneralOptionsState> {
  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IGeneralOptionsState) {
    const selectedNode: ITitle = props.state.currentSelectedNode as any;
    if (
      (selectedNode.subtype || "") !== state.value &&
      !Path.equals(props.state.currentSelectedNodeAnchor, state.valueForAnchor)
    ) {
      return {
        value: selectedNode.subtype || "",
        valueForAnchor: props.state.currentSelectedNodeAnchor,
      }
    }

    return null;
  }
  public constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    const selectedNode: ITitle = props.state.currentSelectedNode as any;

    this.state = {
      value: selectedNode.subtype || "",
      valueForAnchor: props.state.currentSelectedNodeAnchor,
    }

    this.onUpdate = this.onUpdate.bind(this);
  }

  public onUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    this.setState({
      value: newValue,
    });

    this.props.helpers.set({
      subtype: newValue,
    }, this.props.state.currentSelectedNodeAnchor);
  }

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

interface IGeneralImageOptionsState {
  standalone: boolean;
  altValue: string;
  valueForAnchor: Path;
}

class GeneralImageOptions extends React.PureComponent<MaterialUISlateWrapperWithStyles, IGeneralImageOptionsState> {
  private altUpdateTimeout: NodeJS.Timer;

  static getDerivedStateFromProps(props: MaterialUISlateWrapperWithStyles, state: IGeneralImageOptionsState) {
    const selectedNode: IImage = props.state.currentSelectedNode as any;
    if (
      (
        (selectedNode.alt || "") !== state.altValue ||
        selectedNode.standalone !== state.standalone
      ) &&
      !Path.equals(props.state.currentSelectedNodeAnchor, state.valueForAnchor)
    ) {
      return {
        altValue: selectedNode.alt || "",
        standalone: selectedNode.standalone,
        valueForAnchor: props.state.currentSelectedNodeAnchor,
      }
    }

    return null;
  }

  constructor(props: MaterialUISlateWrapperWithStyles) {
    super(props);

    const selectedNode: IImage = props.state.currentSelectedNode as any;

    this.state = {
      altValue: selectedNode.alt || "",
      standalone: selectedNode.standalone,
      valueForAnchor: props.state.currentSelectedNodeAnchor,
    }

    this.updateAlt = this.updateAlt.bind(this);
    this.actuallyUpdateAlt = this.actuallyUpdateAlt.bind(this);
    this.updateStandalone = this.updateStandalone.bind(this);
  }

  public actuallyUpdateAlt() {
    this.props.helpers.set({
      alt: this.state.altValue,
    }, this.props.state.currentSelectedNodeAnchor);
  }

  public updateAlt(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      altValue: e.target.value,
    });

    clearTimeout(this.altUpdateTimeout);
    this.altUpdateTimeout = setTimeout(this.actuallyUpdateAlt, 300);
  }

  public updateStandalone(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      standalone: e.target.checked,
    });

    this.props.helpers.set({
      standalone: e.target.checked,
    }, this.props.state.currentSelectedNodeAnchor);
  }

  public render() {
    return (
      <div className={this.props.classes.box}>
        <TextField
          value={this.state.altValue}
          label="alt"
          placeholder="alt"
          variant="filled"
          onChange={this.updateAlt}
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

export function GeneralOptions(props: MaterialUISlateWrapperWithStyles) {
  let specificNodeOptions: React.ReactNode = null;
  switch ((props.state.currentSelectedNode as any).type) {
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

  return (
    <>
      {specificNodeOptions}
      <IconButton onClick={props.helpers.deleteSelectedNode}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}