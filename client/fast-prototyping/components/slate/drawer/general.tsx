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
} from "../../../mui-core";
import { IContainer } from "../../../../internal/text/serializer/container";
import { ITitle } from "../../../../internal/text/serializer/title";

function GeneralContainerOptions(props: MaterialUISlateWrapperWithStyles) {
  const selectedNode: IContainer = props.info.currentSelectedNode as any;
  return (
    <div className={props.classes.box}>
      <FormControl
        variant="filled"
        fullWidth={true}
      >
        <InputLabel
          htmlFor="slate-drawer-container-type-selector"
          shrink={true}
        >
          {props.i18nRichInfo.container}
        </InputLabel>
        <Select
          value={selectedNode.containerType || ""}
          displayEmpty={true}
          variant="filled"
          input={
            <FilledInput
              id="slate-drawer-container-type-selector"
              placeholder={props.i18nRichInfo.container}
            />
          }
        >
          <MenuItem value="">
            <em>{" "}</em>
          </MenuItem>
          {
            // render the valid values that we display and choose
            props.featureSupport.availableContainers.map((vv) => {
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

function GeneralTitleOptions(props: MaterialUISlateWrapperWithStyles) {
  const selectedNode: ITitle = props.info.currentSelectedNode as any;
  return (
    <div className={props.classes.box}>
      <FormControl
        variant="filled"
        fullWidth={true}
      >
        <InputLabel
          htmlFor="slate-drawer-title-type-selector"
          shrink={true}
        >
          {props.i18nRichInfo.title}
        </InputLabel>
        <Select
          value={selectedNode.subtype || ""}
          displayEmpty={true}
          variant="filled"
          input={
            <FilledInput
              id="slate-drawer-title-type-selector"
              placeholder={props.i18nRichInfo.title}
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

export function GeneralOptions(props: MaterialUISlateWrapperWithStyles) {
  let specificNodeOptions: React.ReactNode = null;
  switch ((props.info.currentSelectedNode as any).type) {
    case "container":
      specificNodeOptions = GeneralContainerOptions(props);
      break;
    case "title":
      specificNodeOptions = GeneralTitleOptions(props);
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