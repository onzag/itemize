import React from "react";
import {
  InputLabel, IconButton, Typography, RestoreIcon, ClearIcon,
  TextField, Button, Toolbar, WithStyles, withStyles, createStyles,
  Alert, AttachFileIcon, VideoLibraryIcon, InsertPhotoIcon, FormatListBulletedIcon,
  FormatListNumberedIcon, FormatQuoteIcon, TitleIcon, FormatUnderlinedIcon, FormatItalicIcon,
  FormatBoldIcon, CodeIcon
} from "../../mui-core";

function RichTextEditorToolbar(props: {
  i18n: {
    formatBoldLabel: string,
    formatItalicLabel: string;
    formatUnderlineLabel: string;
    formatTitleLabel: string;
    formatQuoteLabel: string;
    formatListNumberedLabel: string;
    formatListBulletedLabel: string;
    formatAddImageLabel: string;
    formatAddVideoLabel: string;
    formatAddFileLabel: string;
  },
  supportsImages: boolean;
  supportsFiles: boolean;
  supportsVideos: boolean;
  supportsRawMode: boolean;
  supportsBasicMode: boolean;
  className: string;

  onToggleRawMode: () => void;
}) {
  return (
    <Toolbar className={props.className}>
      {props.supportsBasicMode ? <>
        <IconButton
          tabIndex={-1}
          title={props.i18n.formatBoldLabel}
          classes={{ root: "ql-bold" }}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18n.formatItalicLabel}
          classes={{ root: "ql-italic" }}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18n.formatUnderlineLabel}
          classes={{ root: "ql-underline" }}
        >
          <FormatUnderlinedIcon />
        </IconButton>
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
      }
    </Toolbar>
  );
}