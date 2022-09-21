/**
 * Contains the fast prototyping element for renering a file entry
 * @module
 */

import { IPropertyEntryFilesRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryFiles";
import { MAX_FILE_SIZE } from "../../../../constants";
import Dropzone, { DropzoneRef } from "react-dropzone";
import React from "react";
import { capitalize } from "../../../components/localization";
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import RestoreIcon from "@mui/icons-material/Restore";
import ClearIcon from "@mui/icons-material/Clear";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import { Close } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { RestoreIconButton } from "./general";

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryFilesRendererProps) {
  return !props.currentValid;
}

/**
 * the styles for the file entry
 */
export const style = {
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: "#f44336",
    height: "1.3rem",
    fontSize: "0.85rem",
  },
  icon: {
    color: "#424242",
  },
  label: (isInvalid: boolean) => ({
    "color": isInvalid ? "#f44336" : "rgb(66, 66, 66)",
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "&.focused": {
      color: isInvalid ? "#f44336" : "#3f51b5",
    },
  }),
  fileDeleteButton: {
    top: "-25px",
    right: 0,
    position: "absolute",
  },
  fileRejectedDescription: {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.75rem",
  },
  paper: {
    marginTop: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    width: "100%",
    minHeight: "200px",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    cursor: "pointer",
    position: "relative",
    padding: "20px 20px calc(2.5rem + 20px) 20px",
    flexWrap: "wrap",
  },
  paperPlaceholder: (accepting: boolean, rejecting: boolean) => ({
    flexGrow: 2,
    display: "block",
    textAlign: "center",
    fontSize: "1rem",
    userSelect: "none",
    color: "rgb(117, 117, 117)",
    borderRadius: "25px",
    border: "dotted 2px #ccc",
    padding: "25px 0",
    margin: "0 25px",
    borderColor: !accepting && !rejecting ? (null) : (
      accepting ? "#42a5f5" : "#f44336"
    ),
  }),
  paperIconAdd: {
    opacity: 0.1,
    fontSize: "100px",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
  },
  button: {
    flexGrow: 1,
    height: "2.5rem",
  },
  buttonIcon: {
    marginLeft: "0.75rem",
  },
};

/**
 * Simple function that binds the onSetFile function from the handler
 * and triggers when the dropzone receives files
 * @param onSetFile the on set file function from the handler
 * @param files the files the dropper got
 */
function onDrop(enableUserSetErrors: () => void, onPushFiles: (files: File[]) => void, files: any[]) {
  enableUserSetErrors();
  onPushFiles(files.map((f) => typeof f.file !== "undefined" ? f.file : f));
}

/**
 * The property entry file renderer, allows to set and upload a single file in its
 * form, support both images and standard files
 * @param props the entry props
 * @returns a react element
 */
function PropertyEntryFilesRenderer(props: IPropertyEntryFilesRendererProps) {
  const dropzoneRef = React.useRef<DropzoneRef>();

  let icon: React.ReactNode;
  if (props.canRestore) {
    if (props.currentAppliedValue) {
      icon = <RestoreIcon />
    } else {
      icon = <ClearIcon />
    }
  } else if (props.icon) {
    icon = props.icon;
  }

  const isInvalid = shouldShowInvalid(props);

  // return the component itself
  const descriptionAsAlert = props.args["descriptionAsAlert"];
  return (
    <Box sx={style.container}>
      {props.description && descriptionAsAlert ? <Alert severity="info" sx={style.description} role="note">
        {props.description}
      </Alert> : null}
      {props.description && !descriptionAsAlert ? <Typography variant="caption" sx={style.description}>
        {props.description}
      </Typography> : null}
      {props.label ? <FormLabel
        aria-label={props.label}
        sx={style.label(isInvalid)}
        classes={{
          focused: "focused",
        }}
      >
        {capitalize(props.label)}
        {icon ? <RestoreIconButton
          sx={style.icon}
          onClick={props.canRestore ? props.onRestore : null}
        >{icon}</RestoreIconButton> : null}
      </FormLabel> : null}
      <Dropzone
        onDropAccepted={onDrop.bind(null, props.enableUserSetErrors, props.onPushFiles)}
        onDropRejected={onDrop.bind(null, props.enableUserSetErrors, props.onPushFiles)}
        maxSize={MAX_FILE_SIZE}
        accept={props.accept === "*" ? null : props.accept}
        multiple={true}
        ref={dropzoneRef}
        disabled={props.disabled}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => {
          const { ref, ...rootProps } = getRootProps();

          const files = props.currentValueWithInfo.map((value) => {
            const mainFileClassName = "file" +
              (value.rejected ? " rejected" : "");
            return (
              <div
                className={mainFileClassName}
                onClick={value.openFile}
                key={value.id}
              >
                <div className="file-container">
                  {
                    value.isSupportedImage ? (
                      <img
                        srcSet={value.imageSrcSet}
                        sizes="100px"
                        src={value.url}
                        className="thumbnail"
                      />
                    ) : (
                      <div className="file-icon">
                        <span className="file-extension">{
                          value.extension
                        }</span>
                      </div>
                    )
                  }
                  <p className="file-name">{value.name}</p>
                  <p className="file-size">{
                    value.prettySize
                  }</p>
                  {value.rejected ? <Box component="p" sx={style.fileRejectedDescription}>
                    {value.rejectedReason}
                  </Box> : null}
                </div>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    value.removeFile();
                  }}
                  sx={style.fileDeleteButton}
                  size="large">
                  <Close />
                </IconButton>
              </div>
            );
          });

          const dragInfo = !files.length ? (
            <Box
              sx={style.paperPlaceholder(isDragAccept, isDragReject)}
            >
              <p>{isDragActive ? capitalize(props.genericActivePlaceholder) : capitalize(props.placeholder)}</p>
              <NoteAddIcon sx={style.paperIconAdd} />
            </Box>
          ) : null;

          return (
            <>
              <Paper
                {...rootProps}
                sx={style.paper}
              >
                <input {...getInputProps()} />
                {files}
                {dragInfo}
              </Paper>
            </>
          );
        }}
      </Dropzone>
      {props.args.hideError ? null : <Box sx={style.errorMessage}>
        {props.currentInvalidReason}
      </Box>}
    </Box>
  );
};

export default PropertyEntryFilesRenderer;