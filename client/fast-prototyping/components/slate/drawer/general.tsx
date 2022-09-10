/**
 * Gives the general options for the current selected component, general options
 * depend on the rich element that is currently chosen, it also provides a delete
 * option to delete the node
 * @module
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
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
import type { IHelperFunctions, ISlateEditorInternalStateType } from "..";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilledInput from "@mui/material/FilledInput";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";

const style = {
  box: {
    padding: "0.5rem",
  },
};

/**
 * Provides the drawer section with all the general options of a given component
 * these general options are the specific options for the generic components
 * @param props all the entire wrapper props
 */
export function GeneralOptions(props: IWrapperContainerProps) {
  const [name, setName] = useState((props.state.currentSelectedElement && props.state.currentSelectedElement.givenName) || "");

  useEffect(() => {
    setName((props.state.currentSelectedElement && props.state.currentSelectedElement.givenName) || "");
  }, [props.state.currentSelectedElement]);

  const lastUpdateRef = useRef<any>();

  const updateName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    clearTimeout(lastUpdateRef.current);
    lastUpdateRef.current = setTimeout(() => {
      props.helpers.set({
        givenName: e.target.value,
      }, props.state.currentSelectedElementAnchor);
    }, 600);
  }, []);

  if (!props.state.currentSelectedElement) {
    return null;
  }

  // and return
  return (
    <Box sx={style.box}>
      <TextField
        value={name}
        label={props.i18nRichInfo.name}
        placeholder={props.i18nRichInfo.name}
        variant="filled"
        onChange={updateName}
        fullWidth={true}
      />
    </Box>
  );
}
