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
import { IActionSubmitOptions } from "../../providers/item";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import { styled } from '@mui/material/styles';
import ItemLoader from "../../components/item/ItemLoader";
import { ItemLoader as FItemLoader } from "../components/item-loader";

/**
 * The item definition loader styles
 */
const fragmentLoaderStyles = {
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
};

/**
 * the props for the item definition loader
 */
interface FragmentLoaderProps {
  roles: string[];
  version: string;
  fullWidth?: boolean;
  fragmentPropertyId?: string;
  fragmentAttachmentPropertyId?: string;
  onBeforeSubmit?: (action: "add" | "edit", options: IActionSubmitOptions) => IActionSubmitOptions;
  viewRendererArgs?: any;
  entryRendererArgs?: any;
  buttonPosition?: "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
  downloadExtraProperties?: string[];
  uploadExtraProperties?: string[];
}

// buggy typescript will only accept any
const ApprovedRejectGroup = styled("div")(fragmentLoaderStyles.buttonApproveRejectGroup as any);

interface IContainer {
  fullWidth?: boolean,
}

const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "fullWidth"
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

  let buttonsToUse: React.ReactNode = null;

  const basicProperties = [
    props.fragmentPropertyId || "content",
    props.fragmentAttachmentPropertyId || "attachments"
  ];

  if (!editMode) {
    buttonsToUse = (
      <UserDataRetriever>
        {(userData) => (
          props.roles.includes(userData.role) ? <>
            <IconButton
              sx={fragmentLoaderStyles.buttonEdit}
              onClick={setEditMode.bind(null, true)}
              size="large">
              <EditIcon />
            </IconButton>
            <ItemLoader>
              {(arg) => {
                const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files[0];
                  e.target.value = "";

                  await arg.loadStateFromFile(
                    file,
                    props.uploadExtraProperties ? basicProperties.concat(props.uploadExtraProperties) : basicProperties,
                  );

                  setEditMode(true);
                }

                const onDownload = async () => {
                  const blob = await arg.downloadState(
                    props.downloadExtraProperties ? basicProperties.concat(props.downloadExtraProperties) : basicProperties
                  );
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.setAttribute("download", "fragment.itmz");

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
                    <IconButton size="large" onClick={onDownload}>
                      <DownloadIcon />
                    </IconButton>
                    <input type="file" ref={fileRef} onChange={onFileChange} style={{ display: "none" }} accept=".itmz" />
                    <IconButton onClick={onSelectFile} size="large">
                      <UploadIcon />
                    </IconButton>
                  </>
                )
              }}
            </ItemLoader>
          </> : null
        )}
      </UserDataRetriever>
    );
  } else {
    buttonsToUse = ReactDOM.createPortal(
      <ApprovedRejectGroup>
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

                      if (!effect.error && mountState.current) {
                        setEditMode(false);
                      }
                    }
                    return <>
                      <IconButton onClick={submitAction} color="primary" size="large">
                        <SaveIcon />
                      </IconButton>
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
        <IconButton onClick={setEditMode.bind(null, false)} color="secondary" size="large">
          <CloseIcon />
        </IconButton>
      </ApprovedRejectGroup>,
      document.body,
    );
  }

  return (
    <Container fullWidth={props.fullWidth}>
      {!editMode ?
        <FItemLoader>
          <View id={props.fragmentPropertyId || "content"} rendererArgs={props.viewRendererArgs} useAppliedValue={true} />
        </FItemLoader> :
        <Entry id={props.fragmentPropertyId || "content"} rendererArgs={props.entryRendererArgs} />
      }
      {buttonsToUse}
    </Container>
  );
};
