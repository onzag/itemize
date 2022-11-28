/**
 * Utilities for loading fragments
 * TODO
 * 
 * @module
 */

import View from "../../components/property/View";
import Entry from "../../components/property/Entry";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserDataRetriever from "../../components/user/UserDataRetriever";
import SubmitActioner from "../../components/item/SubmitActioner";
import Snackbar from "../components/snackbar";
import ReactDOM from "react-dom";
import IdVersionRetriever from "../../components/item/IdVersionRetriever";
import { IActionSubmitOptions, IActionSubmitResponse } from "../../providers/item";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import { styled, SxProps, Theme } from '@mui/material/styles';
import ItemLoader from "../../components/item/ItemLoader";
import { ItemLoader as FItemLoader } from "../components/item-loader";
import Box from "@mui/material/Box";

/**
 * The item definition loader styles
 */
const fragmentLoaderStyles = {
  buttonEditGroup: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "solid 1px #ccc",
    padding: "1rem",
  },
  buttonApproveRejectGroup: {
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    border: "solid 1px #ccc",
    padding: "1rem",
  },
};

/**
 * the props for the item definition loader
 */
interface FragmentLoaderProps {
  /**
   * sx props for the container
   */
  sx?: SxProps<Theme>;
  /**
   * The roles that are allowed to edit this
   */
  roles: string[];

  /**
   * The version that we are attempting to set with our edit action
   */
  version: string;

  /**
   * whether to use full width in our fragment
   */
  fullWidth?: boolean;

  /**
   * The fragment property that will be used to load the content, defaults to "content"
   * if not specified
   */
  fragmentPropertyId?: string;

  /**
   * The fragment property that will be used to load attachments, defaults to "attachments"
   */
  fragmentAttachmentPropertyId?: string;

  /**
   * Extra properties to submit with the fragment
   */
  fragmentExtraProperties?: string[];

  /**
   * The function that triggers when no unversioned value is found for the fragment
   * and it's attempting to submit for that
   */
  onBeforeSubmitUnversioned?: (options: IActionSubmitOptions) => IActionSubmitOptions;

  /**
   * For the submit of the specific fragment to be added or edited
   */
  onBeforeSubmit?: (action: "add" | "edit", options: IActionSubmitOptions) => IActionSubmitOptions;

  /**
   * Whenever edit is triggered
   */
  onEdit?: () => void;

  /**
   * Whenever stopping editing
   */
  onCloseEdit?: () => void;

  /**
   * Whenever submit is done
   */
  onSubmitUnversioned?: (d: IActionSubmitResponse) => void;

  /**
   * Whenever submit is done
   */
  onSubmit?: (d: IActionSubmitResponse) => void;

  /**
   * renderer args to be used in the view element
   */
  viewRendererArgs?: any;

  /**
   * renderer args to be used in the entry element
   */
  entryRendererArgs?: any;

  /**
   * An alternative for the edit button
   * that is used to place the loader in edit mode
   */
  EditButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * An alternative for the download button
   */
  DownloadButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * An alternative for the edit button container when on edit mode
   */
  EditButtonContainer?: React.ComponentType<{ isEditing: boolean, children: React.ReactNode }>;
  /**
   * An alternative for the save icon button
   */
  SaveButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * An alternative for the close icon button
   */
  CloseButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * An alternative for the upload icon button
   */
  UploadButton?: React.ComponentType<{ onClick: () => void }>;

  /**
   * the properties that are extra downloaded when the download
   * button is pressed
   */
  downloadExtraProperties?: string[];

  /**
   * the properties that are extra uploaded when the upload button
   * is used against a file
   */
  uploadExtraProperties?: string[];

  /**
   * the name of the file to be downloaded, without the .itmz extension
   */
  downloadName?: string;
}

function EditButtonContainerDefault(props: { isEditing: boolean, children: React.ReactNode }) {
  const element = (
    <Box sx={props.isEditing ? fragmentLoaderStyles.buttonApproveRejectGroup : fragmentLoaderStyles.buttonEditGroup}>
      {props.children}
    </Box>
  );

  if (props.isEditing) {
    return ReactDOM.createPortal(element, document.body);
  }

  return element;
}

interface IContainer {
  fullWidth?: boolean,
}

const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "fullWidth" && prop !== "sx"
})<IContainer>(({ fullWidth }) => ({
  position: "relative",
  width: fullWidth ? "100%" : "auto",
}));

/**
 * The item definition loader allows to handle cases of not found, blocked or errors in a nice way
 * @param props the loader props
 * @returns a react component
 */
export function FragmentLoader(props: FragmentLoaderProps) {
  const [editMode, setEditMode] = useState(false);
  const fileRef = React.useRef<HTMLInputElement>();

  const onSelectFile = useCallback(() => {
    fileRef.current.click();
  }, [fileRef]);

  const mountState = useRef(true)
  useEffect(() => {
    return () => {
      mountState.current = false
    }
  }, []);

  const enableEditMode = useCallback(() => {
    setEditMode(true);
    props.onEdit && props.onEdit();
  }, [props.onEdit]);

  const closeEditMode = useCallback(() => {
    setEditMode(false);
    props.onCloseEdit && props.onCloseEdit();
  }, [props.onCloseEdit]);

  let buttonsToUse: React.ReactNode = null;

  const basicProperties = [
    props.fragmentPropertyId || "content",
    props.fragmentAttachmentPropertyId || "attachments"
  ];

  const ButtonContainerToUse = props.EditButtonContainer || EditButtonContainerDefault;

  if (!editMode) {
    buttonsToUse = (
      <UserDataRetriever>
        {(userData) => (
          props.roles.includes(userData.role) ? <>
            {props.EditButton ? <props.EditButton onClick={enableEditMode} /> : <IconButton
              onClick={enableEditMode}
              size="large">
              <EditIcon />
            </IconButton>}
            <ItemLoader>
              {(arg) => {
                const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files[0];
                  e.target.value = "";

                  await arg.loadStateFromFile(
                    file,
                    props.uploadExtraProperties ? basicProperties.concat(props.uploadExtraProperties) : basicProperties,
                  );

                  enableEditMode();
                  props.onEdit && props.onEdit();
                }

                const onDownload = async () => {
                  const blob = await arg.downloadState(
                    props.downloadExtraProperties ? basicProperties.concat(props.downloadExtraProperties) : basicProperties
                  );
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.setAttribute("download", props.downloadName ? (props.downloadName + ".itmz") : "fragment.itmz");

                  const url = URL.createObjectURL(blob);

                  a.href = url;
                  document.body.appendChild(a);

                  a.click();

                  document.body.removeChild(a);

                  // enough time for it to download
                  // the blob should be cleaned out from memory afterwards this
                  setTimeout(() => {
                    URL.revokeObjectURL(url);
                  }, 1000);
                }

                return (
                  <>
                    {props.DownloadButton ? <props.DownloadButton onClick={onDownload} /> : <IconButton size="large" onClick={onDownload}>
                      <DownloadIcon />
                    </IconButton>}
                    <input type="file" ref={fileRef} onChange={onFileChange} style={{ display: "none" }} accept=".itmz" />
                    {props.UploadButton ? <props.UploadButton onClick={onSelectFile} /> : <IconButton onClick={onSelectFile} size="large">
                      <UploadIcon />
                    </IconButton>}
                  </>
                )
              }}
            </ItemLoader>
          </> : null
        )}
      </UserDataRetriever>
    );
  } else {
    buttonsToUse = (
      <>
        <ItemLoader>
          {(arg) => (
            <IdVersionRetriever>
              {(idVersion) => (
                <SubmitActioner>
                  {(actioner) => {
                    const submitAction = async () => {
                      // this means that it loaded an unversioned fallback so we need to add
                      // also we would add if the original itself is not found
                      const action = idVersion.version !== props.version || arg.notFound ? "add" : "edit";

                      if (arg.notFound) {
                        let unversionedOptions: IActionSubmitOptions = {
                          action: "add",
                          properties: basicProperties,
                          submitForId: idVersion.id,
                          submitForVersion: null,
                        };

                        if (props.onBeforeSubmitUnversioned) {
                          const newUnversionedOptions = props.onBeforeSubmitUnversioned(unversionedOptions);
                          if (newUnversionedOptions) {
                            unversionedOptions = newUnversionedOptions;
                          }
                        }

                        const effect = await actioner.submit(unversionedOptions);
                        props.onSubmitUnversioned && props.onSubmitUnversioned(effect);

                        if (effect.error) {
                          return;
                        }
                      }

                      let options: IActionSubmitOptions = {
                        action,
                        properties: basicProperties,
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
                      props.onSubmit && props.onSubmit(effect);

                      if (!effect.error && mountState.current) {
                        closeEditMode();
                      }
                    }
                    return <>
                      {props.SaveButton ? <props.SaveButton onClick={submitAction} /> : <IconButton onClick={submitAction} color="primary" size="large">
                        <SaveIcon />
                      </IconButton>}
                      <Snackbar
                        id="fragment-edit-error"
                        severity="error"
                        i18nDisplay={actioner.submitError}
                        open={!!actioner.submitError}
                        onClose={actioner.dismissError}
                      />
                    </>;
                  }}
                </SubmitActioner>
              )}
            </IdVersionRetriever>
          )}
        </ItemLoader>
        {props.CloseButton ? <props.CloseButton onClick={setEditMode.bind(null, false)} /> :
          <IconButton onClick={setEditMode.bind(null, false)} color="secondary" size="large">
            <CloseIcon />
          </IconButton>}
      </>
    );
  }

  return (
    <Container fullWidth={props.fullWidth} sx={props.sx}>
      {!editMode ?
        <FItemLoader>
          <View id={props.fragmentPropertyId || "content"} rendererArgs={props.viewRendererArgs} useAppliedValue={true} />
        </FItemLoader> :
        <Entry id={props.fragmentPropertyId || "content"} rendererArgs={props.entryRendererArgs} autoFocus={true} />
      }
      <ButtonContainerToUse isEditing={editMode}>{buttonsToUse}</ButtonContainerToUse>
    </Container>
  );
};
