/**
 * Utilities for loading fragments
 * TODO
 * 
 * @module
 */

import View from "../../components/property/View";
import Entry from "../../components/property/Entry";
import React, { useEffect, useRef, useState } from "react";
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles";
import UserDataRetriever from "../../components/user/UserDataRetriever";
import SubmitActioner from "../../components/item/SubmitActioner";
import Snackbar from "../components/snackbar";
import ReactDOM from "react-dom";
import IdVersionRetriever from "../../components/item/IdVersionRetriever";
import { IActionSubmitOptions } from "../../providers/item";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";

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
  version: string;
  fullWidth?: boolean;
  fragmentPropertyId?: string;
  fragmentAttachmentPropertyId?: string;
  onBeforeSubmit?: (action: "add" | "edit", options: IActionSubmitOptions) => IActionSubmitOptions;
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

  const mountState = useRef(true)
  useEffect(() => {
    return () => {
      mountState.current = false
    }
  }, []);

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
        <IdVersionRetriever>
          {(idVersion) => (
            <SubmitActioner>
              {(actioner) => {
                const submitAction = async () => {
                  // this means that it loaded an unversioned fallback so we need to add
                  // otherwise edit
                  const action = !idVersion.version ? "add" : "edit";

                  let options: IActionSubmitOptions = {
                    action,
                    properties: [
                      props.fragmentPropertyId || "content",
                      props.fragmentAttachmentPropertyId || "attachments",
                    ],
                    submitForId: idVersion.id,
                    submitForVersion: props.version,
                  };

                  if (props.onBeforeSubmit) {
                    const newOptions = props.onBeforeSubmit(action, options);
                    if (newOptions) {
                      options = newOptions;
                    }
                  }

                  const effect = await actioner.submit(options);

                  if (!effect.error && mountState.current) {
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
          )}
        </IdVersionRetriever>
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
