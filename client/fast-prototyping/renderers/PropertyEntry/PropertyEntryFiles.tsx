/**
 * Contains the fast prototyping element for renering a file entry
 * @module
 */

import { IPropertyEntryFilesRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryFiles";
import { MAX_FILE_SIZE } from "../../../../constants";
import Dropzone, { DropzoneRef } from "react-dropzone";
import React from "react";
import { capitalize } from "../../../components/localization";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import RestoreIcon from "@material-ui/icons/Restore";
import ClearIcon from "@material-ui/icons/Clear";
import FormLabel from "@material-ui/core/FormLabel";
import RootRef from "@material-ui/core/RootRef";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import { Close } from "@material-ui/icons";

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
export const style = createStyles({
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
  label: (props: IPropertyEntryFilesRendererProps) => ({
    "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "&.focused": {
      color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
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
  paperPlaceholder: {
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
  },
  paperPlaceholderAccepting: {
    borderColor: "#42a5f5",
  },
  paperPlaceholderRejecting: {
    borderColor: "#f44336",
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
});

/**
 * The props for the file renderer, with styles
 */
interface IPropertyEntryFileRendererWithStylesProps extends IPropertyEntryFilesRendererProps, WithStyles<typeof style> {
}

/**
 * Simple function that binds the onSetFile function from the handler
 * and triggers when the dropzone receives files
 * @param onSetFile the on set file function from the handler
 * @param files the files the dropper got
 */
function onDrop(enableUserSetErrors: () => void, onPushFiles: (files: File[]) => void, files: File[]) {
  enableUserSetErrors();
  onPushFiles(files);
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
const PropertyEntryFilesRenderer = withStyles(style)((props: IPropertyEntryFileRendererWithStylesProps) => {
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

  // return the component itself
  const descriptionAsAlert = props.args["descriptionAsAlert"];
  return (
    <div className={props.classes.container}>
      {props.description && descriptionAsAlert ? <Alert severity="info" className={props.classes.description}>
        {props.description}
      </Alert> : null}
      {props.description && !descriptionAsAlert ? <Typography variant="caption" className={props.classes.description}>
        {props.description}
      </Typography> : null}
      {props.label ? <FormLabel
        aria-label={props.label}
        classes={{
          root: props.classes.label,
          focused: "focused",
        }}
      >
        {capitalize(props.label)}
        {icon ? <IconButton
          tabIndex={-1}
          className={props.classes.icon}
          onClick={props.canRestore ? props.onRestore : null}
        >{icon}</IconButton> : null}
      </FormLabel> : null}
      <Dropzone
        onDropAccepted={onDrop.bind(null, props.enableUserSetErrors, props.onPushFiles)}
        onDropRejected={onDrop.bind(null, props.enableUserSetErrors, props.onPushFiles)}
        maxSize={MAX_FILE_SIZE}
        accept={props.accept}
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
                  {value.rejected ? <p className={props.classes.fileRejectedDescription}>
                    {value.rejectedReason}
                  </p> : null}
                </div>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    value.removeFile();
                  }}
                  className={props.classes.fileDeleteButton}
                >
                  <Close />
                </IconButton>
              </div>
            );
          });

          const dragInfo = !files.length ? (
            <div
              className={`${props.classes.paperPlaceholder} ${isDragAccept ?
                props.classes.paperPlaceholderAccepting : ""} ${isDragReject ?
                  props.classes.paperPlaceholderRejecting : ""}`}
            >
              <p>{isDragActive ? capitalize(props.genericActivePlaceholder) : capitalize(props.placeholder)}</p>
              <NoteAddIcon className={props.classes.paperIconAdd} />
            </div>
          ) : null;

          return (
            <RootRef rootRef={ref}>
              <Paper
                {...rootProps}
                classes={{
                  root: props.classes.paper,
                }}
              >
                <input {...getInputProps()} />
                {files}
                {dragInfo}
              </Paper>
            </RootRef>
          );
        }}
      </Dropzone>
      <div className={props.classes.errorMessage}>
        {props.currentInvalidReason}
      </div>
    </div>
  );
});

export default PropertyEntryFilesRenderer;