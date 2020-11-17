import { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import React from "react";
import { ISlateEditorWrapperBaseProps } from ".";
import {
  InputLabel, IconButton, Typography, RestoreIcon, ClearIcon,
  TextField, Button, AppBar, Toolbar, WithStyles, withStyles, createStyles,
  Alert, AttachFileIcon, VideoLibraryIcon, InsertPhotoIcon, FormatListBulletedIcon,
  FormatListNumberedIcon, FormatQuoteIcon, TitleIcon, FormatUnderlinedIcon, FormatItalicIcon,
  FormatBoldIcon, CodeIcon, Divider
} from "../../mui-core";

const style = createStyles({
  editor: (props: ISlateEditorWrapperBaseProps) => {
    const shouldShowInvalidEditor = !props.info.currentValid;
    return {
      "position": "relative",
      "padding": props.info.isRichText ? "1rem" : "0 1rem 1rem 1rem",
      // this is the colur when the field is out of focus
      "&::before": {
        left: 0,
        right: 0,
        bottom: 0,
        content: "'\\00a0'",
        position: "absolute",
        transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderBottom: "1px solid " +
          (shouldShowInvalidEditor ? "#e57373" : "rgba(0,0,0,0.42)"),
        pointerEvents: "none",
      },
      // the color that pops up when the field is in focus
      "&::after": {
        left: 0,
        bottom: 0,
        right: 0,
        content: "''",
        position: "absolute",
        transform: "scaleX(0)",
        transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        borderBottom: "2px solid " +
          (shouldShowInvalidEditor ? "#f44336" : "#3f51b5"),
        pointerEvents: "none",
      },
      // during the hover event
      "&.focused::after": {
        transform: "none",
      },
    };
  },
  toolbar: {
    overflow: "auto",
  },
  divider: {
    border: "solid 1px #ccc",
    height: "2rem",
    margin: "0 0.5rem",
  },
  appbar: {
    zIndex: 1,
  },
});

function RichTextEditorToolbar(props: MaterialUISlateWrapperStyles) {
  if (!props.info.isRichText) {

    return null;
  }
  return (
    <AppBar position="relative" variant="outlined" color="default" className={props.classes.appbar}>
      <Toolbar className={props.classes.toolbar}>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatBoldLabel}
          disabled={!props.info.currentText}
          color={props.info.currentText && props.info.currentText.bold ? "primary" : "default"}
          onClick={props.helpers.formatToggleBold.bind(null, true)}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatItalicLabel}
          disabled={!props.info.currentText}
          color={props.info.currentText && props.info.currentText.italic ? "primary" : "default"}
          onClick={props.helpers.formatToggleItalic.bind(null, true)}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatUnderlineLabel}
          disabled={!props.info.currentText}
          color={props.info.currentText && props.info.currentText.underline ? "primary" : "default"}
          onClick={props.helpers.formatToggleUnderline.bind(null, true)}
        >
          <FormatUnderlinedIcon />
        </IconButton>
        <Divider orientation="vertical" className={props.classes.divider}/>
        {
          props.featureSupport.supportsTitle ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatTitleLabel}
              color={props.info.currentElement && props.info.currentElement.type === "title" ? "primary" : "default"}
              disabled={!props.featureSupport.canInsertTitle}
              onClick={props.helpers.toggleTitle.bind(null, "h1")}
            >
              <TitleIcon />
            </IconButton> :
            null
        }
        {/* {props.supportsBasicMode ? <>



        <IconButton
          tabIndex={-1}
          title={props.i18n.formatTitleLabel}
          classes={{ root: "ql-header" }}
          value="1"
        >
          <TitleIcon />
        </IconButton>
        <span className="ql-divider" />
        <IconButton
          tabIndex={-1}
          title={props.i18n.formatQuoteLabel}
          classes={{ root: "ql-blockquote" }}
        >
          <FormatQuoteIcon />
        </IconButton>
        <span className="ql-divider" />
        <IconButton
          tabIndex={-1}
          title={props.i18n.formatListNumberedLabel}
          classes={{ root: "ql-list" }}
          value="ordered"
        >
          <FormatListNumberedIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18n.formatListBulletedLabel}
          classes={{ root: "ql-list" }}
          value="bullet"
        >
          <FormatListBulletedIcon />
        </IconButton>
        {
          props.supportsImages || props.supportsFiles ?
            (
              <span className="ql-divider" />
            ) : null
        }
        {
          props.supportsImages ?
            (
              <IconButton
                tabIndex={-1}
                title={props.i18n.formatAddImageLabel}
                classes={{ root: "ql-image" }}
              >
                <InsertPhotoIcon />
              </IconButton>
            ) : null
        }
        {
          props.supportsVideos ?
            (
              <IconButton
                tabIndex={-1}
                title={props.i18n.formatAddVideoLabel}
                classes={{ root: "ql-video" }}
              >
                <VideoLibraryIcon />
              </IconButton>
            ) : null
        }
        {
          props.supportsFiles ?
            (
              <IconButton
                tabIndex={-1}
                title={props.i18n.formatAddFileLabel}
                classes={{ root: "ql-file" }}
              >
                <AttachFileIcon />
              </IconButton>
            ) : null
        }
      </> : null}
      {
        props.supportsRawMode ?
          (
            <IconButton
              tabIndex={-1}
              onClick={props.onToggleRawMode}
            >
              <CodeIcon />
            </IconButton>
          ) : null
      } */}
      </Toolbar>
    </AppBar>
  );
}

interface MaterialUISlateWrapperStyles extends ISlateEditorWrapperBaseProps, WithStyles<typeof style> {
  i18nGenericError: string;
  i18nOk: string;
  i18nRichInfo: IPropertyEntryI18nRichTextInfo;
};

export const MaterialUISlateWrapper = withStyles(style)((props: MaterialUISlateWrapperStyles) => {
  return (
    <>
      <RichTextEditorToolbar {...props} />
      <div className="rich-text">
        <div className={props.classes.editor + (props.info.isFocused ? " focused" : "")}>
          {props.children}
        </div>
      </div>
    </>
  );
});
