/**
 * Utilities for loading fragments
 * TODO
 * 
 * @packageDocumentation
 */

import View from "../../components/property/View";
import Entry from "../../components/property/Entry";
import React, { useState } from "react";
import { withStyles, WithStyles, createStyles, IconButton, EditIcon, CloseIcon, SaveIcon } from "../mui-core";
import UserDataRetriever from "../../components/user/UserDataRetriever";
import SubmitActioner from "../../components/item/SubmitActioner";
import Snackbar from "../components/snackbar";
import ReactDOM from "react-dom";

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
  buttonEdit: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  buttonApproveRejectGroup: {
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    border: "solid 1px #ccc",
    padding: "1rem",
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

  let buttonsToUse: React.ReactNode = null;

  if (!editMode) {
    buttonsToUse = (
      <UserDataRetriever>
        {(userData) => (
          props.roles.includes(userData.role) ? <IconButton
            className={props.classes.buttonEdit}
            onClick={setEditMode.bind(null, true)}
          >
            <EditIcon />
          </IconButton> : null
        )}
      </UserDataRetriever>
    );
  } else {
    buttonsToUse = ReactDOM.createPortal(
      <div className={props.classes.buttonApproveRejectGroup}>
        <SubmitActioner>
          {(actioner) => {
            const submitAction = async () => {
              const effect = await actioner.submit({
                properties: [
                  props.fragmentPropertyId || "content",
                  props.fragmentAttachmentPropertyId || "attachments",
                ],
              });

              if (!effect.error) {
                setEditMode(false);
              }
            }
            return (
              <>
                <IconButton onClick={submitAction} color="primary">
                  <SaveIcon />
                </IconButton>
                <Snackbar
                  id="fragment-edit-error"
                  severity="error"
                  i18nDisplay={actioner.submitError}
                  open={!!actioner.submitError}
                  onClose={actioner.dismissError}
                />
              </>
            );
          }}
        </SubmitActioner>
        <IconButton onClick={setEditMode.bind(null, false)} color="secondary">
          <CloseIcon />
        </IconButton>
      </div>,
      document.body,
    );
  }

  return (
    <div className={`${props.classes.container} ${props.fullWidth ? props.classes.fullWidthContainer : ""}`}>
      {!editMode ?
        <View id={props.fragmentPropertyId || "content"} rendererArgs={props.viewRendererArgs} useAppliedValue={true} /> :
        <Entry id={props.fragmentPropertyId || "content"} rendererArgs={props.entryRendererArgs} />
      }
      {buttonsToUse}
    </div>
  );
});
