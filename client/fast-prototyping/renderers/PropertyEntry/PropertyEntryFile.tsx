/**
 * Contains the fast prototyping element for renering a file entry
 * @module
 */

import { IPropertyEntryFileRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryFile";
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
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import Box from "@mui/material/Box";

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryFileRendererProps) {
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
function onDrop(enableUserSetErrors: () => void, onSetFile: (file: File) => void, files: any[]) {
  enableUserSetErrors();
  onSetFile(typeof files[0].file !== "undefined" ? files[0].file : files[0]);
}

/**
 * trigger the upload manually
 * @param dropzoneRef the dropzone reference
 */
function manuallyTriggerUpload(enableUserSetErrors: () => void, dropzoneRef: React.MutableRefObject<DropzoneRef>) {
  enableUserSetErrors();
  // utility for the button to manually trigger upload
  // using the ref when it is disabled
  if (dropzoneRef.current) {
    dropzoneRef.current.open();
  }
}

function manuallyRemove(enableUserSetErrors: () => void, removeFile: () => void) {
  enableUserSetErrors();
  removeFile();
}

/**
 * The property entry file renderer, allows to set and upload a single file in its
 * form, support both images and standard files
 * @param props the entry props
 * @returns a react element
 */
function PropertyEntryFileRenderer(props: IPropertyEntryFileRendererProps) {
  const dropzoneRef = React.useRef<DropzoneRef>();

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

  const fieldLabel = props.label ? <FormLabel
    aria-label={props.label}
    sx={style.label(isInvalid)}
    classes={{
      focused: "focused",
    }}
  >
    {capitalize(props.label)}
    {icon ? <IconButton
      tabIndex={-1}
      sx={style.icon}
      onClick={props.canRestore && !props.args.disableRestore ? props.onRestore : null}
      size="large">{icon}</IconButton> : null}
  </FormLabel> : null;

  const fieldComponent = (
    <Dropzone
      onDropAccepted={onDrop.bind(null, props.enableUserSetErrors, props.onSetFile)}
      onDropRejected={onDrop.bind(null, props.enableUserSetErrors, props.onSetFile)}
      maxSize={MAX_FILE_SIZE}
      accept={props.accept === "*" ? null : props.accept}
      multiple={false}
      noClick={!!props.currentValue}
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

        let displayContent = null;
        if (props.currentValue) {
          const mainFileClassName = "file" +
            (props.rejected ? " rejected" : "");
          displayContent = (
            <Box
              className={mainFileClassName}
              onClick={props.openFile}
            >
              <div className="file-container">
                {
                  props.isSupportedImage ? (
                    <img
                      srcSet={props.imageSrcSet}
                      sizes="100px"
                      src={props.currentValue.url}
                      className="thumbnail"
                    />
                  ) : (
                    <div className="file-icon">
                      <span className="file-extension">{
                        props.extension
                      }</span>
                    </div>
                  )
                }
                <p className="file-name">{props.currentValue.name}</p>
                <p className="file-size">{
                  props.prettySize
                }</p>
                {props.rejected ? <Box sx={style.fileRejectedDescription} component="p">
                  {props.rejectedReason}
                </Box> : null}
              </div>
            </Box>
          )
        } else {
          displayContent = (
            <Box
              sx={style.paperPlaceholder(isDragAccept, isDragReject)}
            >
              <p>{isDragActive ? capitalize(props.genericActivePlaceholder) : capitalize(props.placeholder)}</p>
              <NoteAddIcon sx={style.paperIconAdd} />
            </Box>
          )
        }

        return (
          <>
            <Paper
              {...rootProps}
              sx={style.paper}
            >
              <input {...(getInputProps() as any)} />
              {displayContent}
              <Box
                sx={style.buttonContainer}
              >
                <Button
                  sx={style.button}
                  variant="contained"
                  color="error"
                  aria-label={props.genericDeleteLabel}
                  onClick={manuallyRemove.bind(null, props.enableUserSetErrors, props.onRemoveFile)}
                >
                  {props.genericDeleteLabel}
                  <RemoveCircleOutlineIcon sx={style.buttonIcon} />
                </Button>
                <Button
                  sx={style.button}
                  variant="contained"
                  color="primary"
                  aria-label={props.genericSelectLabel}
                  onClick={manuallyTriggerUpload.bind(null, props.enableUserSetErrors, dropzoneRef)}
                >
                  {
                    props.genericSelectLabel
                  }
                  <CloudUploadIcon sx={style.buttonIcon} />
                </Button>
              </Box>
            </Paper>
          </>
        );
      }}
    </Dropzone>
  );

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

export default PropertyEntryFileRenderer;
