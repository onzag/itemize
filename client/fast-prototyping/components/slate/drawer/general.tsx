/**
 * Gives the general options for the current selected component, general options
 * depend on the rich element that is currently chosen, it also provides a delete
 * option to delete the node
 * @module
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IDrawerContainerProps } from "../wrapper";
import TextField from "@mui/material/TextField";
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
export function GeneralOptions(props: IDrawerContainerProps) {
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
  }, [props.state.currentSelectedElement]);

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
      {
        props.drawerExtras ? (
          props.drawerExtras.map((v, i) => {
            const Element = v.Component as any;
            return <Element key={v.key || i} {...props} />
          })
        ) : null
      }
    </Box>
  );
}
