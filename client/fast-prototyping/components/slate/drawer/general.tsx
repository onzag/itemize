import React from "react";
import { MaterialUISlateWrapperWithStyles } from "../wrapper";
import {
  DeleteIcon,
  FormControl,
  IconButton,
  InputLabel,
  NativeSelect,
} from "../../../mui-core";
import { IContainer } from "../../../../internal/text/serializer/container";
import { ITitle } from "../../../../internal/text/serializer/title";

function GeneralContainerOptions(props: MaterialUISlateWrapperWithStyles) {
  const selectedNode: IContainer = props.info.currentSelectedNode as any;
  return (
    <div className={props.classes.box}>
      <FormControl className={props.classes.selectionInput}>
        <InputLabel htmlFor="slate-drawer-container-type-selector">Container Type</InputLabel>
        <NativeSelect
          value={selectedNode.containerType || ""}
          className={props.classes.selectionInput}
          inputProps={{
            id: "slate-drawer-container-type-selector"
          }}
        >
          <option value="">{" "}</option>
          {
            props.featureSupport.availableContainers.map((av) => {
              return (
                <option key={av.value} value={av.value}>{av.label}</option>
              )
            })
          }
        </NativeSelect>
      </FormControl>
    </div>
  );
}

function GeneralTitleOptions(props: MaterialUISlateWrapperWithStyles) {
  const selectedNode: ITitle = props.info.currentSelectedNode as any;
  return (
    <div className={props.classes.box}>
      <FormControl className={props.classes.selectionInput}>
        <InputLabel htmlFor="slate-drawer-title-type-selector">Title Type</InputLabel>
        <NativeSelect
          value={selectedNode.subtype || ""}
          className={props.classes.selectionInput}
          inputProps={{
            id: "slate-drawer-title-type-selector"
          }}
        >
          <option value="h1">h1</option>
          <option value="h2">h2</option>
          <option value="h3">h3</option>
          <option value="h4">h4</option>
          <option value="h5">h5</option>
          <option value="h6">h6</option>
        </NativeSelect>
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
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </>
  );
}