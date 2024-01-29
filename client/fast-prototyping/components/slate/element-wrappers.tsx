import React, { forwardRef } from "react";
import { IDefaultSlateElementWrappersProps, IFieldWrapperForMoreOptionsProps, IElementWrapperButtonProps } from "@onzag/itemize-text-engine/editor/slate/element-wrappers";
import { WrapperDrawerSelectField, WrapperDrawerTextField } from "./wrapper";
import {
  IDropdownComponentWrapperProps, IDropdownComponentBoxProps,
  IDropdownComponentProps
} from "@onzag/itemize-text-engine/editor/editor-dropdown";
import Box from "@mui/material/Box";
import { AltBadgeReactioner } from "../alt-badge-reactioner";
import IconButton from "@mui/material/IconButton";
import ViewWeek from "@mui/icons-material/ViewWeek";
import Add from "@mui/icons-material/Add";
import TableRows from "@mui/icons-material/TableRows";
import Remove from "@mui/icons-material/Remove";
import CreditCard from "@mui/icons-material/CreditCard";

const styles = {
  linkTemplateOptionsBox: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0 0 0",
  },
  linkTemplateOptionsText: {
    textAlign: "center",
    color: "#aaa",
    paddingBottom: "1rem",
  },
  optionPrimary: {
    fontWeight: 700,
    color: "#1b5e20",
  },
  whiteBackgroundInput: {
    backgroundColor: "white",
  },
  upsideDown: {
    transform: "scaleY(-1)",
  },
  fixedWidthInput: {
    width: 200,
  },
  iconAddRemove: {
    position: "absolute",
    right: 0,
    fontSize: "15px",
  },
  dropdown: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(240, 240, 240, 0.9)",
    border: "solid 1px #707070",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  dropdownSizable: {
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(240, 240, 240, 0.9)",
    border: "solid 1px #ccc",
  },
}

function FieldWrapperForMoreOptions(props: IFieldWrapperForMoreOptionsProps) {
  return (
    <Box sx={styles.linkTemplateOptionsBox}>
      <Box sx={styles.linkTemplateOptionsText}>{props.label}</Box>
      {props.children}
    </Box>
  )
}

export const DropdownComponentWrapper = forwardRef((props: IDropdownComponentWrapperProps, ref) => {
  return (
    <Box
      component={props.tag as any}
      ref={ref}
      {...props.props}
    >
      {props.children}
    </Box>
  )
});

export const DropdownComponentBox = forwardRef((props: IDropdownComponentBoxProps, ref) => {
  return (
    <Box
      ref={ref}
      {...props.props}
    >
      {props.children}
    </Box>
  )
});

export const DropdownComponent = forwardRef((props: IDropdownComponentProps, ref) => {
  const sx = [props.sizable ? styles.dropdownSizable : styles.dropdown];

  return (
    <Box
      ref={ref}
      sx={sx}
      {...props.props}
    >
      {props.children}
    </Box>
  )
});

export function ElementWrapperButton(props: IElementWrapperButtonProps) {
  if (props.id === "table-add-td") {
    return (
      <AltBadgeReactioner
        reactionKey="c"
        priority={1}
        selector="button"
        onTabOutTrigger="escape"
      >
        <IconButton
          tabIndex={-1}
          title={props.label}
          onClick={props.onClick}
          size="large">
          <>
            <ViewWeek />
            <Add sx={styles.iconAddRemove} />
          </>
        </IconButton>
      </AltBadgeReactioner>
    );
  } else if (props.id === "table-add-tr") {
    return (
      <AltBadgeReactioner
        reactionKey="r"
        priority={1}
        selector="button"
        onTabOutTrigger="escape"
      >
        <IconButton
          tabIndex={-1}
          title={props.label}
          onClick={props.onClick}
          size="large">
          <>
            <TableRows />
            <Add sx={styles.iconAddRemove} />
          </>
        </IconButton>
      </AltBadgeReactioner>
    );
  } else if (props.id === "table-del-td") {
    return (
      <AltBadgeReactioner
        reactionKey="c"
        priority={1}
        selector="button"
        onTabOutTrigger="escape"
      >
        <IconButton
          tabIndex={-1}
          title={props.label}
          onClick={props.onClick}
          size="large">
          <>
            <ViewWeek />
            <Remove sx={styles.iconAddRemove} />
          </>
        </IconButton>
      </AltBadgeReactioner>
    );
  } else if (props.id === "table-del-tr") {
    return (
      <AltBadgeReactioner
        reactionKey="r"
        priority={1}
        selector="button"
        onTabOutTrigger="escape"
      >
        <IconButton
          tabIndex={-1}
          title={props.label}
          onClick={props.onClick}
          size="large">
          <>
            <TableRows />
            <Remove sx={styles.iconAddRemove} />
          </>
        </IconButton>
      </AltBadgeReactioner>
    );
  } else if (props.id === "table-toggle-th") {
    return (
      <AltBadgeReactioner
        reactionKey="h"
        priority={1}
        selector="button"
        onTabOutTrigger="escape"
      >
        <IconButton
          tabIndex={-1}
          title={props.label}
          onClick={props.onClick}
          size="large">
          <CreditCard />
        </IconButton>
      </AltBadgeReactioner>
    );
  } else if (props.id === "table-toggle-tfoot") {
    return (
      <AltBadgeReactioner
        reactionKey="f"
        priority={1}
        selector="button"
        onTabOutTrigger="escape"
      >
        <IconButton
          tabIndex={-1}
          title={props.label}
          onClick={props.onClick}
          size="large">
          <CreditCard sx={styles.upsideDown} />
        </IconButton>
      </AltBadgeReactioner>
    );
  } else {
    return (
      <AltBadgeReactioner
        reactionKey="r"
        priority={1}
        selector="button"
        onTabOutTrigger="escape"
      >
        <IconButton
          tabIndex={-1}
          title={props.label}
          onClick={props.onClick}
          size="large"
        >
          ?
        </IconButton>
      </AltBadgeReactioner>
    );
  }
}

export const materialUIElementWrappersProps: Partial<IDefaultSlateElementWrappersProps> = {
  ElementWrapperSelectField: WrapperDrawerSelectField,
  ElementWrapperTextField: WrapperDrawerTextField,
  FieldWrapperForMoreOptions: FieldWrapperForMoreOptions,
  DropdownComponentWrapper: DropdownComponentWrapper,
  DropdownComponentBox: DropdownComponentBox,
  DropdownComponent: DropdownComponent,
  ElementWrapperButton: ElementWrapperButton,
}