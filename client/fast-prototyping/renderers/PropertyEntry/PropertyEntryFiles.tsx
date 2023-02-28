/**
 * Contains the fast prototyping element for renering a file entry
 * @module
 */

import { IPropertyEntryFilesRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryFiles";
import { MAX_FILE_SIZE } from "../../../../constants";
import Dropzone, { DropzoneRef } from "react-dropzone";
import React, { useCallback } from "react";
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
import { Button } from "@mui/material";

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
    backgroundColor: "#fff",
    width: "100%",
    minHeight: "200px",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    cursor: "pointer",
    position: "relative",
    padding: "20px 20px 20px 20px",
    flexWrap: "wrap",
    boxShadow: "none",
    border: "solid 1px #ccc",
    rowGap: "20px",
    columnGap: "20px",

    "&:hover": {
      borderColor: "rgba(0,0,0,0.87)",
      outline: "none",
    },

    "&:focus, &.focused": {
      borderColor: "#1976d2",
      boxShadow: "0px 0px 0px 1px #1976d2",
      outline: "none",
    },
  } as any,
  paperAccepting: {
    borderColor: "#42a5f5 !important",
  },
  paperRejecting: {
    borderColor: "#f44336 !important",
  },
  paperPlaceholder: {
    flexGrow: 2,
    display: "block",
    textAlign: "center",
    fontSize: "1rem",
    userSelect: "none",
    color: "rgb(117, 117, 117)",
    borderRadius: "25px",
    padding: "25px 0",
    margin: "0 25px",
  },
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

function openFileManually(openFile: any, e: React.KeyboardEvent) {
  if (e.code === "Enter" || e.code === "Space") {
    e.stopPropagation();
    e.preventDefault();
    openFile();
  }
};

/**
 * The property entry file renderer, allows to set and upload a single file in its
 * form, support both images and standard files
 * @param props the entry props
 * @returns a react element
 */
function PropertyEntryFilesRenderer(props: IPropertyEntryFilesRendererProps) {
  const dropzoneRef = React.useRef<DropzoneRef>();

  const keyboardTriggerUpload = useCallback((e: React.KeyboardEvent) => {
    if (e.code === "Enter" || e.code === "Space") {
      dropzoneRef.current && dropzoneRef.current.open();
    }
  }, []);

  let icon: React.ReactNode;
  if (props.canRestore && !props.args.disableRestore) {
    if (props.currentAppliedValue) {
      icon = <RestoreIcon />
    } else {
      icon = <ClearIcon />
    }
  } else if (props.args.icon) {
    icon = props.args.icon;
  }

  const isInvalid = shouldShowInvalid(props);

  const fieldLabel = (
    props.label ? <FormLabel
      aria-label={props.label}
      sx={style.label(isInvalid)}
      classes={{
        focused: "focused",
      }}
    >
      {capitalize(props.label)}
      {icon ? <RestoreIconButton
        sx={style.icon}
        onClick={props.canRestore && !props.args.disableRestore ? props.onRestore : null}
      >{icon}</RestoreIconButton> : null}
    </FormLabel> : null
  );

  const fieldComponent = (
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

        const files = props.currentValueWithInfo.map((value, index) => {
          const mainFileClassName = "file" +
            (value.rejected ? " rejected" : "");

          let fileDeleteButton = (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                value.removeFile();
              }}
              sx={style.fileDeleteButton}
              size="large"
              title={props.genericDeleteLabel}
              color="error"
            >
              <Close />
            </IconButton>
          );

          if (props.args.fileDeleteButtonWrapper) {
            fileDeleteButton = props.args.fileDeleteButtonWrapper(fileDeleteButton, value, index);
          }

          let file = (
            <div
              className={mainFileClassName}
              onClick={value.openFile}
              key={value.id}
              tabIndex={0}
              role="button"
              aria-invalid={!!value.rejected}
              aria-labelledby={`${value.id}_name ${value.id}_ext ${value.id}_size`}
              aria-describedby={value.rejected ? value.id + "_err" : null}
              onKeyDown={openFileManually.bind(null, value.openFile)}
            >
              <div className="file-container">
                {
                  value.isSupportedImage ? (
                    <img
                      srcSet={value.imageSrcSet}
                      sizes="100px"
                      src={value.url}
                      className="thumbnail"
                      alt={value.name}
                    />
                  ) : (
                    <div className="file-icon">
                      <span className="file-extension" id={value.id + "_ext"}>{
                        value.extension
                      }</span>
                    </div>
                  )
                }
                <p className="file-name" id={value.id + "_name"}>{value.name}</p>
                <p className="file-size" id={value.id + "_size"}>{
                  value.prettySize
                }</p>
                {value.rejected ? <Box component="p" sx={style.fileRejectedDescription} id={value.id + "_err"}>
                  {value.rejectedReason}
                </Box> : null}
              </div>
              {fileDeleteButton}
            </div>
          );

          if (props.args.fileWrapper) {
            file = (
              <React.Fragment key={value.id}>
                {props.args.fileWrapper(file, value, index)}
              </React.Fragment>
            );
          }

          return file;
        });

        const dragInfo = !files.length ? (
          <Box
            sx={style.paperPlaceholder}
          >
            <p>{isDragActive ? capitalize(props.genericActivePlaceholder) : capitalize(props.placeholder)}</p>
            <NoteAddIcon sx={style.paperIconAdd} />
          </Box>
        ) : null;

        const paper = (
          <Paper
            {...rootProps}
            sx={isDragAccept || isDragReject ? [style.paper, isDragAccept ? style.paperAccepting : style.paperRejecting] : style.paper}
            className="files-entry"
            aria-invalid={isInvalid}
            aria-errormessage={isInvalid ? props.uniqueId + "_error" : null}
            aria-label={props.label}
            aria-describedby={props.uniqueId + "_desc"}
            onKeyDown={keyboardTriggerUpload}
          >
            <input {...getInputProps()} />
            {files}
            {dragInfo}
          </Paper>
        );

        return paper;
      }}
    </Dropzone>
  );

  // return the component itself
  const descriptionAsAlert = props.args["descriptionAsAlert"];

  let descriptionObject: React.ReactNode = null;
  if (props.description) {
    descriptionObject = descriptionAsAlert ? (
      <Alert severity="info" sx={style.description} role="note" id={props.uniqueId + "_desc"}>
        {props.description}
      </Alert>
    ) : (
      <Typography variant="caption" sx={style.description} id={props.uniqueId + "_desc"}>
        {props.description}
      </Typography>
    );
  }

  const error = (
    props.args.hideError ? null : <Box sx={style.errorMessage} id={props.uniqueId + "_error"}>
      {props.currentInvalidReason}
    </Box>
  );

  let inner: React.ReactNode;
  if (props.args.useCustomFieldRender) {
    inner = props.args.useCustomFieldRender(descriptionObject, fieldLabel, fieldComponent, error, props.disabled);
  } else {
    inner = (
      <>
        {descriptionObject}
        {fieldLabel}
        {fieldComponent}
        {error}
      </>
    )
  }

  return (
    <Box sx={style.container}>
      {inner}
    </Box>
  );
};

export default PropertyEntryFilesRenderer;