import React from "react";
import { InputLabel, IconButton, ThemeProvider, Typography } from "@material-ui/core";
import ReactQuill from "react-quill";
import Toolbar from "@material-ui/core/Toolbar";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import { Alert } from "@material-ui/lab";
import {
  WithStyles,
  withStyles,
  createStyles,
} from "@material-ui/styles";
import uuid from "uuid";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import TitleIcon from "@material-ui/icons/Title";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatBoldIcon from "@material-ui/icons/FormatBold";

import "react-quill/dist/quill.core.css";
import "../../../internal/theme/quill.scss";
import { capitalize } from "../../../../util";
import { LAST_RICH_TEXT_CHANGE_LENGTH, FILE_SUPPORTED_IMAGE_TYPES } from "../../../../constants";

const BlockEmbed = ReactQuill.Quill.import("blots/block/embed");
const Delta = ReactQuill.Quill.import("delta");

interface ItemizeImageBlotValue {
  alt: string;
  src: string;
  srcId: string;
  srcSet: string;
  sizes: string;
  srcWidth: number;
  srcHeight: number;
}

class ItemizeImageBlot extends BlockEmbed {
  static create(value: ItemizeImageBlotValue) {
    const width = value.srcWidth;
    const height = value.srcHeight;
    const ratio = height / width;
    const percentage = ratio * 100;

    const parentContainer = super.create();
    parentContainer.className = "image-container";

    const childContainer = document.createElement("div");
    childContainer.className = "image-pad";
    childContainer.setAttribute("style", "position: relative; width: 100%; padding-bottom: " + percentage + "%");
    parentContainer.appendChild(childContainer);

    const img = document.createElement("img");
    img.setAttribute("style", "position: absolute; top: 0; left: 0;");
    childContainer.appendChild(img);

    img.setAttribute("alt", value.alt || "");
    img.setAttribute("sizes", value.sizes || "");
    img.setAttribute("srcset", value.srcSet || "");
    img.setAttribute("src", value.src || "");
    img.dataset.srcId = value.srcId;
    img.dataset.srcWidth = value.srcWidth.toString();
    img.dataset.srcHeight = value.srcHeight.toString();
    return parentContainer;
  }
  
  static value(node: HTMLDivElement) {
    const img = node.childNodes[0].childNodes[0] as HTMLImageElement;
    return {
      alt: img.getAttribute("alt") || null,
      src: img.getAttribute("src"),
      srcId: img.dataset.srcId,
      srcSet: img.getAttribute("srcset") || null,
      sizes: img.getAttribute("sizes") || null,
      srcWidth: parseInt(img.dataset.srcWidth) || null,
      srcHeight: parseInt(img.dataset.srcHeight) || null,
    };
  }
}
ItemizeImageBlot.blotName = 'itemizeimage';
ItemizeImageBlot.tagName = 'div';

ReactQuill.Quill.register(ItemizeImageBlot);

interface ItemizeYoutubeBlotValue {
  alt: string;
  src: string;
  srcId: string;
  srcSet: string;
  sizes: string;
  srcWidth: number;
  srcHeight: number;
}

class ItemizeYoutubeBlot extends BlockEmbed {
  static create() {

  }
}

function shouldShowInvalid(props: IPropertyEntryTextRendererProps) {
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
  icon: (props: IPropertyEntryTextRendererProps) => ({
    color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
  }),
  iconButton: {
    "backgroundColor": "#2196f3",
    "color": "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  textButton: {
    border: "solid 1px rgba(0,0,0,0.1)",
    display: "flex",
    minWidth: "50px",
    height: "50px",
    padding: "0 10px",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  label: (props: IPropertyEntryTextRendererProps) => ({
    "padding": "1rem 0",
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
    },
  }),
  labelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quill: (props: IPropertyEntryTextRendererProps) => {
    const shouldShowInvalidQuill = shouldShowInvalid(props);
    return {
      "position": "relative",
      // this is the colur when the field is out of focus
      "&::before": {
        left: 0,
        right: 0,
        bottom: 0,
        content: "'\\00a0'",
        position: "absolute",
        transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderBottom: "1px solid " +
          (shouldShowInvalidQuill ? theme.fieldBorderInvalidColor : theme.fieldBorderColor),
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
          (shouldShowInvalidQuill ? theme.fieldBorderInvalidColorFocused : theme.fieldBorderColorFocused),
        pointerEvents: "none",
      },
      // during the hover event
      "&.focused::after": {
        transform: "none",
      },
    };
  },
});

// TODO implement missing toolbar functionality
function RichTextEditorToolbar(props: {
  id: string,
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
}) {
  return (
    <Toolbar id={props.id}>
      <IconButton
        title={props.i18n.formatBoldLabel}
        classes={{root: "ql-bold"}}
      >
        <FormatBoldIcon/>
      </IconButton>
      <IconButton
        title={props.i18n.formatItalicLabel}
        classes={{ root: "ql-italic" }}
      >
        <FormatItalicIcon/>
      </IconButton>
      <IconButton
        title={props.i18n.formatUnderlineLabel}
        classes={{ root: "ql-underline" }}
      >
        <FormatUnderlinedIcon/>
      </IconButton>
      <IconButton
        title={props.i18n.formatTitleLabel}
        classes={{ root: "ql-header" }}
        value="1"
      >
        <TitleIcon/>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        title={props.i18n.formatQuoteLabel}
        classes={{ root: "ql-blockquote" }}
      >
        <FormatQuoteIcon/>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        title={props.i18n.formatListNumberedLabel}
        classes={{ root: "ql-list" }}
        value="ordered"
      >
        <FormatListNumberedIcon/>
      </IconButton>
      <IconButton
        title={props.i18n.formatListBulletedLabel}
        classes={{ root: "ql-list" }}
        value="bullet"
      >
        <FormatListBulletedIcon/>
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
            title={props.i18n.formatAddImageLabel}
            classes={{ root: "ql-image" }}
          >
            <InsertPhotoIcon/>
          </IconButton>
        ) : null
      }
      {
        props.supportsFiles ?
        (
          <IconButton
            title={props.i18n.formatAddFileLabel}
            classes={{ root: "" }}
          >
            <AttachFileIcon/>
          </IconButton>
        ) : null
      }
    </Toolbar>
  );
}
// /* <IconButton
//             title={props.i18n.formatAddVideoLabel}
//             classes={{ root: "" }}
//           >
//             <VideoLibraryIcon/>
//           </IconButton> */
        
interface IPropertyEntryTextRendererWithStylesProps extends IPropertyEntryTextRendererProps, WithStyles<typeof style> {
}

interface IPropertyEntryTextRendererState {
  focused: boolean;
}

const CACHED_FORMATS_RICH = ["bold", "italic", "underline", "header", "blockquote", "list", "itemizeimage"];
const CACHED_FORMATS_NONE = [];
const CACHED_CLIPBOARD_MATCHERS: ReactQuill.ClipboardMatcher[] = [
  [Node.ELEMENT_NODE, collapseToPlainTextMatcher],
];

function collapseToPlainTextMatcher(node: Node) {
  return new Delta().insert(node.textContent);
}

class ActualPropertyEntryTextRenderer extends React.PureComponent<IPropertyEntryTextRendererWithStylesProps, IPropertyEntryTextRendererState> {
  // this one also gets an uuid
  private uuid: string;
  private inputImageRef: React.RefObject<HTMLInputElement>;

  private cachedModuleOptionsRich: any;
  private cachedModuleOptionsNone: any;

  private quillRef: React.RefObject<ReactQuill>;

  constructor(props: IPropertyEntryTextRendererWithStylesProps) {
    super(props);

    // whether it is focused or not
    this.state = {
      focused: false,
    };

    this.uuid =  "uuid-" + uuid.v4();
    this.inputImageRef = React.createRef();
    this.quillRef = React.createRef();

    // basic functions
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.customImageHandler = this.customImageHandler.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);

    this.cachedModuleOptionsRich = {
      toolbar: {
        container: "#" + this.uuid,
        handlers: {
          image: this.customImageHandler
        },
      },
      clipboard: {
        matchVisual: false,
        matchers: CACHED_CLIPBOARD_MATCHERS,
      }
    };
    this.cachedModuleOptionsNone = {
      toolbar: false,
      clipboard: {
        matchVisual: false,
        matchers: CACHED_CLIPBOARD_MATCHERS,
      }
    };
  }
  public componentDidMount() {
    const editor = this.quillRef.current.getEditor();
    editor.root.addEventListener('paste', async (e) => {
      const clipboardData: DataTransfer = e.clipboardData || (window as any).clipboardData;
      console.log(clipboardData);
      // support cut by software & copy image file directly
      const isImage = clipboardData.types.length && clipboardData.types.join('').includes('Files');
      if (!isImage) {
        return;
      }
      // prevent default quill behaviour
      e.preventDefault();
      e.stopPropagation();

      // only support single image paste
      const file = clipboardData.files[0];
      const data = await this.props.onInsertImage(file);

      // image failed to load
      if (!data) {
        return;
      }
  
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, "itemizeimage", {
        alt: null,
        src: data.result.url,
        srcId: data.result.id,
        srcSet: null,
        sizes: null,
        srcWidth: data.width,
        srcHeight: data.height,
      }, (ReactQuill.Quill as any).sources.USER);
      editor.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);
    });
  }
  public onChange(value: string, delta: any, sources: any, editor: ReactQuill.UnprivilegedEditor) {
    // on change, these values are basically empty
    // so we set to null, however in some circumstances
    // they are unavoidable, use a value larger than 1 for min
    // if the field is not nullable
    if (
      value === "<p><br></p>" ||
      value === "<p><span class=\"ql-cursor\">\ufeff</span></p>"
    ) {
      // prevent this change where it changes to the same value on focus
      if (this.props.currentValue !== null) {
        if (window) {
          (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = 0;
        }
        this.props.onChange(null, null);
      }
      return;
    } else if (window) {
      const actualLenght = editor.getText().replace(/\n/g, "").length;
      (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = actualLenght;
    }
    this.props.onChange(value, null);
  }
  /**
   * This image handler is not binded due to quill existing in the this namespace
   */
  public customImageHandler() {
    this.inputImageRef.current.click();
  }
  public async onImageLoad(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];

    let alt: string = null;
    if (this.props.args["requestAltOnImages"]) {
      alt = prompt("Please write an alt for your image:", "") || null;
    }
    const data = await this.props.onInsertImage(file);

    if (!data) {
      return;
    }
  
    const quill = this.quillRef.current.getEditor();
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, "itemizeimage", {
      alt,
      src: data.result.url,
      srcId: data.result.id,
      srcSet: null,
      sizes: null,
      srcWidth: data.width,
      srcHeight: data.height,
    }, (ReactQuill.Quill as any).sources.USER);
    quill.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);
  }
  // basically get the state onto its parent of the focus and blur
  public onFocus() {
    this.setState({
      focused: true,
    });
  }
  public onBlur() {
    this.setState({
      focused: false,
    });
  }
  public render() {
    // this is the editor value
    const editorValue = this.props.currentValue as string || "";

    // the icon as usual
    const icon = this.props.icon;
    const iconComponent = icon ? (
      <span className={this.props.classes.icon}>{icon}</span>
    ) : null;

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];

    const imageInput = this.props.supportsImages ? (
      <input
        ref={this.inputImageRef}
        type="file"
        accept={FILE_SUPPORTED_IMAGE_TYPES.join(",")}
        tabIndex={-1}
        style={{display: "none"}}
        autoComplete="off"
        onChange={this.onImageLoad}
      />
    ) : null;

    // we return the component, note how we set the thing to focused
    // TODO disabled
    return (
      <div className={this.props.classes.container}>
        {
          this.props.description && descriptionAsAlert ?
          <Alert severity="info" className={this.props.classes.description}>
            {this.props.description}
          </Alert> :
          null
        }
        {
          this.props.description && !descriptionAsAlert ?
          <Typography variant="caption" className={this.props.classes.description}>
            {this.props.description}
          </Typography> :
          null
        }
        <div>
          <InputLabel
            classes={{
              root: this.props.classes.label + " " + this.props.classes.labelSingleLine,
              focused: "focused",
            }}
            focused={this.state.focused}
          >
            {capitalize(this.props.label)}{iconComponent}
          </InputLabel>
          {
            this.props.isRichText ? (
              <RichTextEditorToolbar
              id={this.uuid}
              i18n={this.props.i18nFormat}
              supportsImages={this.props.supportsImages}
              supportsFiles={this.props.supportsFiles}
            />) : null
          }
          <ReactQuill
            ref={this.quillRef}
            className={this.props.classes.quill + (this.state.focused ? " focused" : "")}
            modules={this.props.isRichText ? this.cachedModuleOptionsRich : this.cachedModuleOptionsNone}
            formats={this.props.isRichText ? CACHED_FORMATS_RICH : CACHED_FORMATS_NONE}
            theme={null}
            placeholder={capitalize(this.props.placeholder)}
            value={editorValue}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disableClipboardMatchersOnUpdate={CACHED_CLIPBOARD_MATCHERS}
          />
        </div>
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>
        {imageInput}
      </div>
    );
  }
}

const ActualPropertyEntryTextRendererWithStyles = withStyles(style)(ActualPropertyEntryTextRenderer);

export default function PropertyEntryTextRenderer(props: IPropertyEntryTextRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntryTextRendererWithStyles {...props}/>
    </ThemeProvider>
  )
}