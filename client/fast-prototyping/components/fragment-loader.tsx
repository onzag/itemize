/**
 * Utilities for loading fragments
 * TODO
 * 
 * @packageDocumentation
 */

import View from "../../components/property/View";
import Entry from "../../components/property/Entry";
import React, { useState } from "react";
import { withStyles, WithStyles, createStyles, IconButton, EditIcon } from "../mui-core";
import UserDataRetriever from "../../components/user/UserDataRetriever";
import SubmitActioner from "../../components/item/SubmitActioner";

/**
 * The item definition loader styles
 */
const fragmentLoaderStyles = createStyles({
  container: {
    position: "relative",
  },
  fullWidthContainer: {
    width: "100%",
  },
});

/**
 * the props for the item definition loader
 */
interface FragmentLoaderProps extends WithStyles<typeof fragmentLoaderStyles> {
  roles: string[];
  fullWidth?: boolean;
  fragmentVersion?: string;
  fragmentPropertyId?: string;
  fragmentAttachmentPropertyId?: string;
  viewRendererArgs?: any;
  entryRendererArgs?: any;
  buttonPosition?: "topRight" | "bottomRight" | "topLeft" | "bottomLeft",
}

/**
 * The item definition loader allows to handle cases of not found, blocked or errors in a nice way
 * @param props the loader props
 * @returns a react component
 */
export const FragmentLoader = withStyles(fragmentLoaderStyles)((props: FragmentLoaderProps) => {
  const [editMode, setEditMode] = useState(false);

  let buttonToUse: React.ReactNode = null;

  if (!editMode) {
    buttonToUse = (
      <UserDataRetriever>
        {(userData) => (
          props.roles.includes(userData.role) ? <IconButton onClick={setEditMode.bind(null, true)}>
            <EditIcon />
          </IconButton> : null
        )}
      </UserDataRetriever>
    );
  } else {
    buttonToUse = (
      <SubmitActioner>
        {(actioner) => {
          const submitAction = async () => {
            await actioner.submit({
              properties: [
                props.fragmentPropertyId || "content",
                props.fragmentAttachmentPropertyId || "attachments",
              ],
            });

            setEditMode(false);
          }
          return (
            <IconButton onClick={submitAction}>
              <EditIcon />
            </IconButton>
          );
        }}
      </SubmitActioner>
    );
  }

  return (
    <div className={`${props.classes.container} ${props.fullWidth ? props.classes.fullWidthContainer : ""}`}>
      {!editMode ?
        <View id={props.fragmentPropertyId || "content"} rendererArgs={props.viewRendererArgs} /> :
        <Entry id={props.fragmentPropertyId || "content"} rendererArgs={props.entryRendererArgs} />
      }
      {buttonToUse}
    </div>
  );
});
