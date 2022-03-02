import IconButton from "@mui/material/IconButton";
import { styled, SxProps } from "@mui/material/styles";
import React from "react";

const style = {
  button: {
    padding: 12,
    borderRadius: "50%",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
    position: "relative" as "relative",
  }
}

interface IRestoreIconButtonProps {
  onClick?: () => void;
  onMouseDown?: () => void;
  children: React.ReactNode;
  className?: string;
  sx?: SxProps;
}

const StyledButtonBox = styled("div")(style.button);

export function RestoreIconButton(props: IRestoreIconButtonProps) {
  if (props.onClick || props.onMouseDown) {
    return (
      <IconButton
        tabIndex={-1}
        className={props.className}
        sx={props.sx}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        color="primary"
        size="large"
      >
        {props.children}
      </IconButton>
    )
  } else {
    return (
      <StyledButtonBox
        className={props.className}
        sx={props.sx}
      >
        {props.children}
      </StyledButtonBox>
    )
  }
}
