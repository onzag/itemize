import { IPropertyEntryFileRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryFile";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import { ThemeProvider, FormLabel, RootRef, Paper, Button, Typography, IconButton } from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { MAX_FILE_SIZE } from "../../../../constants";
import Dropzone, { DropzoneRef } from "react-dropzone";
import React from "react";
import { capitalize } from "../../../components/localization";
import { Alert } from "@material-ui/lab";
import RestoreIcon from '@material-ui/icons/Restore';
import ClearIcon from '@material-ui/icons/Clear';

function shouldShowInvalid(props: IPropertyEntryFileRendererProps) {
  return !props.currentValid;
}
export const style = (theme: IPropertyEntryThemeType) => createStyles({
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: theme.containerWidth,
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: theme.invalidColor,
    height: theme.errorMessageContainerSize,
    fontSize: theme.errorMessageFontSize,
  },
  icon: (props: IPropertyEntryFileRendererProps) => ({
    color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
  }),
  label: (props: IPropertyEntryFileRendererProps) => ({
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
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

interface IPropertyEntryFileRendererWithStylesProps extends IPropertyEntryFileRendererProps, WithStyles<typeof style> {
}

function onDrop(onSetFile: (file: File) => void, files: File[]) {
  onSetFile(files[0]);
}

function manuallyTriggerUpload(dropzoneRef: React.MutableRefObject<DropzoneRef>) {
  // utility for the button to manually trigger upload
  // using the ref when it is disabled
  if (dropzoneRef.current) {
    dropzoneRef.current.open();
  }
}

const ActualPropertyEntryFileRendererWithStyles = withStyles(style)((props: IPropertyEntryFileRendererWithStylesProps) => {
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

  const descriptionAsAlert = props.args["descriptionAsAlert"];
  return (
    <div className={props.classes.container}>
      {props.description && descriptionAsAlert ? <Alert severity="info" className={props.classes.description}>
        {props.description}
      </Alert> : null}
      {props.description && !descriptionAsAlert ? <Typography variant="caption" className={props.classes.description}>
        {props.description}
      </Typography> : null}
      <FormLabel
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
      </FormLabel>
      <Dropzone
        onDropAccepted={onDrop.bind(null, props.onSetFile)}
        onDropRejected={onDrop.bind(null, props.onSetFile)}
        maxSize={MAX_FILE_SIZE}
        accept={props.accept}
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
              <div
                className={mainFileClassName}
                onClick={props.openFile.bind(null, props.currentValue)}
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
                  {props.rejected ? <p className={props.classes.fileRejectedDescription}>
                    {props.rejectedReason}
                  </p> : null}
                </div>
              </div>
            )
          } else {
            displayContent = (
              <div
                className={`${props.classes.paperPlaceholder} ${isDragAccept ?
                props.classes.paperPlaceholderAccepting : ""} ${isDragReject ?
                props.classes.paperPlaceholderRejecting : ""}`}
              >
                <p>{isDragActive ? capitalize(props.genericActivePlaceholder) : capitalize(props.placeholder)}</p>
                <NoteAddIcon className={props.classes.paperIconAdd}/>
              </div>
            )
          }

          return (
            <RootRef rootRef={ref}>
              <Paper
                {...rootProps}
                classes={{
                  root: props.classes.paper,
                }}
              >
                <input {...(getInputProps() as any)} />
                {displayContent}
                <div
                  className={props.classes.buttonContainer}
                >
                  <Button
                    className={props.classes.button}
                    variant="contained"
                    color="secondary"
                    aria-label={props.genericDeleteLabel}
                    onClick={props.onRemoveFile}
                  >
                    {props.genericDeleteLabel}
                    <RemoveCircleOutlineIcon className={props.classes.buttonIcon} />
                  </Button>
                  <Button
                    className={props.classes.button}
                    variant="contained"
                    color="primary"
                    aria-label={props.genericSelectLabel}
                    onClick={manuallyTriggerUpload.bind(null, dropzoneRef)}
                  >
                    {
                      props.genericSelectLabel
                    }
                    <CloudUploadIcon className={props.classes.buttonIcon}/>
                  </Button>
                </div>
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

export default function PropertyEntryFileRenderer(props: IPropertyEntryFileRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntryFileRendererWithStyles {...props} />
    </ThemeProvider>
  )
}