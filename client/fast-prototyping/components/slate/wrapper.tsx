import React, { useCallback, useEffect, useState } from "react";
import {
  DefaultSlateWrapper, IDefaultSlateWrapperProps, IDrawerBodyProps,
  IDrawerContainerBoxProps, IDrawerSpacerProps, IEditorContainerProps, IEditorProps, IEditorWrapperProps,
  IToolbarProps, IToolbarDrawerButtonProps, IToolbarButtonProps, IWrapperDrawerElementTitleWrapperProps,
  IWrapperDrawerInternalPanelWrapperProps
} from "@onzag/itemize-text-engine/editor/slate/wrapper";
import {
  IWrapperDrawerCheckBoxProps, IWrapperDrawerTextFieldProps,
  IWrapperDrawerSelectFieldProps, IWrapperDrawerMultiSelectFieldProps,
} from "@onzag/itemize-text-engine/editor/slate/drawer/general";
import {
  IWrapperDrawerElementTitleProps, IWrapperDrawerInfoPanelWrapperProps, IWrapperDrawerTabsProps
} from "@onzag/itemize-text-engine/editor/slate/drawer/index";
import { Theme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AltBadgeReactioner } from "../alt-badge-reactioner";
import AltPriorityShifter from "../../../components/accessibility/AltPriorityShifter";
import { Dialog } from "../dialog";
import { IDialogComponentProps } from "@onzag/itemize-text-engine/editor/slate/dialogs/file";
import { capitalize } from "../../../components/localization";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import { default as MUIToolbar } from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Badge from "@mui/material/Badge";
import FormatItalic from "@mui/icons-material/FormatItalic";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatUnderlined from "@mui/icons-material/FormatUnderlined";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import { FormatListNumbered } from "@mui/icons-material";
import Code from "@mui/icons-material/Code";
import TextFields from "@mui/icons-material/TextFields";
import Title from "@mui/icons-material/Title";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import AttachFile from "@mui/icons-material/AttachFile";
import InsertPhoto from "@mui/icons-material/InsertPhoto";
import Link from "@mui/icons-material/Link";
import FormatQuote from "@mui/icons-material/FormatQuote";
import VideoLibrary from "@mui/icons-material/VideoLibrary";
import ViewModule from "@mui/icons-material/ViewModule";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Settings from "@mui/icons-material/Settings";
import BorderStyle from "@mui/icons-material/BorderStyle";
import Web from "@mui/icons-material/Web";
import TouchApp from "@mui/icons-material/TouchApp";
import Chip from "@mui/material/Chip";

/**
 * Defining a bunch of styles for the wrapper
 */
const style = {
  optionPrimary: {
    fontWeight: 700,
    color: "#1b5e20",
  },
  editorContainer: {
    width: "100%",
    display: "flex" as "flex",
    flexDirection: "row" as "row",
  },
  badge: {
    "&. MuiBadge-badge": {
      transform: "scale(1) translate(0%, 0%)",
    }
  },
  badgeDisabled: {
    "&. MuiBadge-badge": {
      transform: "scale(1) translate(0%, 0%)",
      opacity: 0.5,
    },
  },
  elementTitle: {
    textTransform: "capitalize",
    fontWeight: 700,
    color: "#444",
    fontSize: "1rem",
    height: "1rem",
    flex: "0 0 1rem",
  },
  editorDrawer: {
    width: 0,
    height: 0,
    transition: "width 0.5s ease-in-out, height 0.5s ease-in-out",
    "&.open": {
      width: "300px",
      height: "800px",
      zIndex: 1000,
    },
    overflow: "hidden",
    position: "relative",
    flex: "none",
    display: "flex",
    flexDirection: "column",
  },
  editorDrawerAppbarSpacer: (theme: Theme) => {
    // bug in toolbar mixin https://github.com/mui/material-ui/issues/31358
    return (
      {
        minHeight: 54,
        [`${theme.breakpoints.up(0)} and (orientation: landscape)`]: {
          minHeight: 48,
        },
        [`${theme.breakpoints.up(600)} and (orientation: landscape)`]: {
          minHeight: 64,
        },
        [theme.breakpoints.up(600)]: {
          minHeight: 64,
        },
      }
    )
  },
  editorDrawerFixed: {
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    zIndex: 1,
    transition: "width 0.5s ease-in-out",
    "&.open": {
      width: "300px",
      zIndex: 1000,
    },
    overflow: "hidden",
    position: "fixed",
    flex: "none",
    display: "flex",
    flexDirection: "column",
  },
  editorDrawerNoAnimate: {
    transition: "none",
  },
  editorDrawerBody: {
    flex: "1 1 auto",
    width: "300px",
    top: 0,
    left: 0,
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  editor: (variant: "filled" | "outlined") => {
    const filledVariant = variant === "filled" ? (
      {
        // this is the colour when the field is out of focus
        "&::before": {
          left: 0,
          right: 0,
          bottom: 0,
          content: "'\\00a0'",
          position: "absolute",
          transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderBottom: "1px solid rgba(0,0,0,0.42)",
          pointerEvents: "none",
        },
        "&.invalid::before": {
          borderBottom: "1px solid #e57373",
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
          borderBottom: "2px solid #3f51b5",
          pointerEvents: "none",
        },
        "&.invalid::after": {
          borderBottom: "2px solid #f44336",
        },
        // during the hover event
        "&.focused::after": {
          transform: "none",
        },
      }
    ) : {};

    return Object.assign(filledVariant, {
      "flex": "1 1 100%",
      "position": "relative" as "relative",
      "padding": variant === "outlined" ? "1rem" : "0 1rem 1rem 1rem",

      "&.rich-text-mode": {
        "padding": "1rem",
      },
    });
  },
  outlineContainer: (focused: boolean, invalid: boolean) => {
    const mainColor = invalid ? "#d32f2f" : (focused ? "#1976d2" : "rgb(192, 192, 192)");
    return ({
      position: "relative",
      border: "solid 1px",
      width: "100%",
      borderColor: mainColor,
      boxShadow: focused ? `0px 0px 0px 1px ${mainColor}` : null,
      borderRadius: "6px",
      "&:hover": {
        borderColor: invalid ? "#d32f2f" : (focused ? "#1976d2" : "rgba(0,0,0,0.87)"),
      },
    });
  },
  toolbar: {
    flexWrap: "wrap",
  },
  divider: {
    border: "solid 1px #ccc",
    height: "2rem",
    margin: "0 0.5rem",

    "& + hr": {
      display: "none",
    },
  },
  hdivider: {
    border: "solid 1px #ccc",
    margin: "0.25rem 0.5rem",
    width: "100%",
  },
  hdividerspacer: {
    flex: "1 0 auto",
    width: "100%",
  },
  appbar: {
    zIndex: 1,
  },
  appbarFixed: {
  },
  moreOptionsSpacer: {
    flex: "1 1 auto",
    height: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  tab: {
    minWidth: "auto",
  },
  elementTitleContainer: {
    width: "100%",
  },
  elementTitleSelected: {
    color: "#0d47a1",
  },
  elementTitleUnselected: {
    cursor: "pointer",

    "&:hover, &:active": {
      color: "#2196f3",
    },
  },
  ltronly: {
    ["html[dir='rtl'] &"]: {
      display: "none",
    }
  },
  rtlonly: {
    ["html[dir='ltr'] &"]: {
      display: "none",
    }
  },
  elementIcon: {
    fontWeight: 100,
  },
  box: {
    padding: "0.5rem",
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
};

// Typescript being shit as usual, have to force it as any because
// something random that rejects the style
const StyledToolbar = styled(MUIToolbar)(style.toolbar as any);

const StyledEditor = styled("div", {
  shouldForwardProp: (p) => p !== "variant",
})<{ variant: "filled" | "outlined"; }>(({ variant }) => style.editor(variant));

function DrawerContainerBox(props: IDrawerContainerBoxProps) {
  return (
    <Box
      sx={[
        (props.disjointedMode ? style.editorDrawerFixed : style.editorDrawer),
        (props.noAnimate ? style.editorDrawerNoAnimate : null)
      ]}
      className={props.drawerOpen ? "open" : null}
    >
      {props.children}
    </Box>
  );
}

function DrawerSpacer(props: IDrawerSpacerProps) {
  return (
    <Box
      sx={style.editorDrawerAppbarSpacer}
      style={{ height: props.toolbarHeight, flex: "0 0 " + props.toolbarHeight + "px" }}
    />
  );
}

const DrawerBody = React.forwardRef((props: IDrawerBodyProps, ref) => {
  return (
    <Box sx={style.editorDrawerBody} ref={ref}>
      {props.drawerOpen ? props.children : null}
    </Box>
  )
});

// typescript is totally garbage and refuses to work with this totally valid
// definition everything must be anied
const StyledEditorOutlinedContainer = (styled("div", {
  shouldForwardProp: (p) => p !== "focused" && p !== "invalid",
}) as any)((typescriptAnyAlwaysAny: any) => style.outlineContainer(typescriptAnyAlwaysAny.focused, typescriptAnyAlwaysAny.invalid)) as any;

function FinalWrapperOutlined(props: IEditorWrapperProps) {
  if (props.args.variant !== "outlined") {
    return props.children as any;
  }
  return (
    <StyledEditorOutlinedContainer focused={props.state.focused} invalid={!props.state.currentValid}>
      {props.children}
    </StyledEditorOutlinedContainer>
  );
}

const StyledEditorContainer = styled("div")(style.editorContainer);

function EditorContainer(props: IEditorContainerProps) {
  return (
    <StyledEditorContainer sx={props.args.wrapperSx}>
      {props.children}
    </StyledEditorContainer>
  )
}

function BaseWrapper(props: IEditorWrapperProps) {
  const onAltActionTriggered = useCallback((tabNav: boolean, action: "click" | "focus" | "blur") => {
    if (action === "blur") {
      props.helpers.hardBlur();
    }
  }, [props.helpers.hardBlur]);

  if (typeof props.args.reactionerPriority === "undefined" || props.args.reactionerPriority === null) {
    return props.children as any;
  }

  return (
    <AltBadgeReactioner
      priority={props.state.currentSelectedElement && !props.drawerOpen ? "ALWAYS_ON_TOP_KEEP_FLOW" : props.args.reactionerPriority}
      reactionKey={
        props.state.isRichText &&
          props.state.currentSelectedElement ? "escape" : (props.args.reactionerKey || "t")}
      label={props.state.isRichText &&
        props.state.currentSelectedElement ? "esc" : null}
      focusOptions={{
        blurIfAlreadyFocused: "ONLY_IF_NOT_DISPLAYING_ACTIONS"
      }}
      onActionTriggered={onAltActionTriggered}
      tabbable={!props.state.currentSelectedElement}
      useInFlow={props.args.reactionerUseInFlow}
      action="focus"
      selector="div[contenteditable]"
      disabled={props.args.reactionerDisabled}
      fullWidth={true}
      sx={{ display: "block", flex: "1 1 100%" }}
    >
      {props.children}
    </AltBadgeReactioner>
  )
}

function ToolbarWrapper(props: IEditorWrapperProps) {
  if (typeof props.args.reactionerPriority === "undefined" || props.args.reactionerPriority === null) {
    return props.children as any;
  }

  return (
    <AltPriorityShifter amount={props.args.reactionerPriority}>
      {props.children}
    </AltPriorityShifter>
  );
}

function DrawerWrapper(props: IEditorWrapperProps) {
  if (typeof props.args.reactionerPriority === "undefined" || props.args.reactionerPriority === null) {
    return props.children as any;
  }

  return (
    <AltPriorityShifter amount={props.args.reactionerPriority}>
      {props.children}
    </AltPriorityShifter>
  );
}

const Editor = React.forwardRef((props: IEditorProps, ref) => {
  return (
    <StyledEditor
      ref={ref as any}
      className={props.className}
      sx={props.args.wrapperTextEditorSx}
      variant={props.args.variant || "filled"}
    >
      {props.children}
    </StyledEditor>
  )
});

function DisjointedEditor(props: IEditorProps) {
  return (
    <Box className={props.className} sx={props.args.wrapperTextEditorSx}>
      {props.children}
    </Box>
  );
}

const StyledDisjointedEditorContainer = styled("div")(style.fullWidth);

const DisjointedEditorContainer = React.forwardRef((props: IEditorProps, ref) => {
  return (
    <StyledDisjointedEditorContainer sx={props.args.wrapperSx} ref={ref as any}>
      {props.children}
    </StyledDisjointedEditorContainer>
  )
});

function MUIDialog(props: IDialogComponentProps) {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      title={capitalize(props.title)}
      buttons={
        <>
          {
            props.buttons.map((b) => (
              <Button onClick={b.onClick} key={b.action}>
                {capitalize(b.label)}
              </Button>
            ))
          }
        </>
      }
    />
  )
}

export function WrapperDrawerMultiSelectField(props: IWrapperDrawerMultiSelectFieldProps) {
  const onChange = useCallback((e: SelectChangeEvent<string[]>) => {
    props.onChange((e.target.value as any) || []);
  }, [props.onChange]);
  return (
    <FormControl fullWidth={true} variant="filled">
      <InputLabel id={"slate-wrapper-entry-for-label-" + props.id}>{props.label}</InputLabel>
      <Select
        labelId={"slate-wrapper-entry-for-label-" + props.id}
        id={"slate-wrapper-entry-for-" + props.id}
        fullWidth={true}
        multiple={true}
        value={props.values}
        onChange={onChange}
        input={<FilledInput id={"slate-wrapper-entry-for-chip-" + props.id} />}
        renderValue={(selected: string[]) => (
          <Box sx={style.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} sx={style.chip} color="primary" />
            ))}
          </Box>
        )}
        onOpen={props.unblur}
        onClose={props.resetBlur}
        disabled={props.disabled}
      >
        {
          props.options.map((element) => (
            <MenuItem key={element.value} value={element.value}>
              {element.label}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

export function WrapperDrawerSelectField(props: IWrapperDrawerSelectFieldProps) {
  const onChange = useCallback((e: SelectChangeEvent) => {
    props.onChangeByValue(e.target.value);
  }, [props.onChangeByValue]);
  return (
    <Box>
      <AltBadgeReactioner
        action="focus"
        reactionKey="n"
        priority={3}
        selector="div[tabindex]"
        fullWidth={true}
      >
        <FormControl
          variant="filled"
          fullWidth={true}
        >
          <InputLabel
            htmlFor={"slate-wrapper-entry-for-" + props.id}
            shrink={true}
          >
            {props.label}
          </InputLabel>
          <Select
            value={props.value}
            onChange={onChange}
            displayEmpty={props.displayEmpty}
            variant="filled"
            input={
              <FilledInput
                id={"slate-wrapper-entry-for-" + props.id}
                placeholder={props.label}
              />
            }
            onOpen={props.unblur}
            onClose={props.resetBlur}
          >
            {
              // render the valid values that we display and choose
              props.options.map((vv) => {
                // the i18n value from the i18n data
                return <MenuItem
                  key={vv.value}
                  value={vv.value}
                  sx={vv.primary ? style.optionPrimary : null}
                >{
                    vv.label
                  }</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      </AltBadgeReactioner>
    </Box>
  );
}


export function WrapperDrawerCheckboxField(props: IWrapperDrawerCheckBoxProps) {
  const toggleStandalone = useCallback((e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.onChange(checked);
  }, [props.onChange]);
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.value}
            onChange={toggleStandalone}
          />
        }
        disabled={props.disabled}
        label={props.label}
      />
    </FormGroup>
  )
}

export function WrapperDrawerTextField(props: IWrapperDrawerTextFieldProps) {
  return (
    <Box>
      <AltBadgeReactioner
        action="focus"
        reactionKey="n"
        priority={3}
        selector="input"
        fullWidth={true}
      >
        <TextField
          fullWidth={true}
          type="text"
          value={props.value}
          onChange={props.onChangeByEvent}
          placeholder={props.placeholder || props.label}
          label={props.label}
          variant="filled"
        />
      </AltBadgeReactioner>
    </Box>
  );
}

const Toolbar = React.forwardRef((props: IToolbarProps, ref) => {
  return (
    <AppBar
      position={props.disjointedMode ? "fixed" : "relative"}
      variant="outlined"
      elevation={0}
      color="default"
      sx={props.disjointedMode ? style.appbarFixed : style.appbar}
      ref={(v) => {
        (ref as any).current = v;
      }}
      data-alt-group={true}
      data-unblur={true}
    >
      <StyledToolbar sx={props.args.toolbarSx}>
        {props.toolbarContents}
        {props.customChildren}
        <Box sx={style.moreOptionsSpacer} />
        {props.drawerButton}
      </StyledToolbar>
    </AppBar>
  );
});

interface IElementFastKey {
  fastKeyOverride?: string;
  fastKey: string;
  children: React.ReactNode;
  triggerAltAfterAction: boolean;
  useTransform: boolean;
  altBadgedChildren?: React.ReactNode;
  priority: number;
  disabled: boolean;
}

function ElementFastKey(props: IElementFastKey) {
  const fastKey = props.fastKeyOverride || props.fastKey;

  if (!fastKey) {
    return props.children as any;
  }

  return (
    <AltBadgeReactioner
      reactionKey={fastKey}
      priority={props.priority}
      disabled={props.disabled}
      altBadgedChildren={props.altBadgedChildren}
      label={fastKey === "escape" ? "esc" : null}
      tabbable={fastKey !== "escape"}
      useTransform={props.useTransform ? "close" : null}
      triggerAltAfterAction={props.triggerAltAfterAction}
      selector="button"
      onTabOutTrigger="escape"
    >
      {props.children}
    </AltBadgeReactioner>
  );
}

function ToolbarDrawerButton(props: IToolbarDrawerButtonProps) {
  return (
    <ElementFastKey
      priority={props.drawerOpen ? 2 : 1}
      useTransform={props.disjointedMode}
      triggerAltAfterAction={true}
      fastKey={props.drawerOpen ? "escape" : "."}
      disabled={!props.state.currentSelectedElement}
    >
      <IconButton
        onClick={props.toggleDrawer}
        size="large">
        {props.drawerOpen ? <ExpandLess /> : <MoreHoriz />}
      </IconButton>
    </ElementFastKey>
  )
}

const toolbarIconRegistry = {
  italic: <FormatItalic />,
  bold: <FormatBold />,
  underline: <FormatUnderlined />,
  "bulleted-list": <FormatListBulleted />,
  "numbered-list": <FormatListNumbered />,
  "template-html": <Code />,
  "template-text": <TextFields />,
  title: <Title />,
  container: <CheckBoxOutlineBlank />,
  file: <AttachFile />,
  image: <InsertPhoto />,
  link: <Link />,
  quote: <FormatQuote />,
  video: <VideoLibrary />,
  table: <ViewModule />,
}

const toolbarFastKeyRegistry = {
  italic: "i",
  bold: "b",
  underline: "u",
  "bulleted-list": "d",
  "numbered-list": "n",
  "template-html": "h",
  "template-text": "j",
  title: "a",
  container: "c",
  file: "f",
  image: "p",
  link: "l",
  quote: "q",
  video: "v",
  table: "t",
}

export interface IMUIToolbarButtonProps extends IToolbarButtonProps {
  fastKey?: string;
  icon?: React.ReactNode;
  useStyleTransform?: boolean;
}

function ToolbarButtonBadged(props: IMUIToolbarButtonProps) {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const icon = props.icon || toolbarIconRegistry[props.type] || "?";
  const fastKey = props.fastKey || toolbarFastKeyRegistry[props.type] || null;

  const button = (
    <IconButton
      onClick={props.onClick}
      color={props.selected ? "primary" : "default"}
      disabled={props.disabled}
      size="large"
      title={props.title}
    >
      {icon}
    </IconButton>
  );

  let badged = button;
  if (typeof props.count === "number" && isReady) {
    badged = <Badge
      badgeContent={props.count}
      color="error"
      sx={!props.disabled ? style.badge : style.badgeDisabled}
    >{button}</Badge>
  }

  if (fastKey) {
    return (
      <ElementFastKey
        priority={1}
        useTransform={props.disjointedMode}
        altBadgedChildren={badged}
        triggerAltAfterAction={true}
        fastKey={fastKey}
        disabled={props.disabled}
      >
        {button}
      </ElementFastKey>
    )
  } else {
    return badged;
  }
}


function ToolbarButton(props: IMUIToolbarButtonProps) {
  if (typeof props.count === "number") {
    return (
      <ToolbarButtonBadged {...props} />
    );
  }

  const icon = props.icon || toolbarIconRegistry[props.type];
  const fastKey = props.fastKey || toolbarFastKeyRegistry[props.type] || null;

  const button = (
    <IconButton
      onClick={props.onClick}
      color={props.selected ? "primary" : "default"}
      disabled={props.disabled}
      size="large"
      title={props.title}
    >
      {icon}
    </IconButton>
  );

  if (fastKey) {
    return (
      <ElementFastKey
        priority={1}
        useTransform={props.disjointedMode}
        triggerAltAfterAction={true}
        fastKey={fastKey}
        disabled={props.disabled}
      >
        {button}
      </ElementFastKey>
    )
  } else {
    return button;
  }
}

function VDivider() {
  return (
    <Divider orientation="vertical" sx={style.divider} />
  );
}

function HDivider() {
  return (
    <>
      <Box sx={style.hdividerspacer} />
      <Divider orientation="horizontal" sx={style.hdivider} />
    </>
  );
}

function WrapperDrawerElementTitle(props: IWrapperDrawerElementTitleProps) {
  return (
    <React.Fragment>
      {
        props.info.isInteractive ? (
          <Typography sx={[style.rtlonly, style.elementTitle, style.elementIcon]} variant="h6">{String.fromCharCode(9094)}</Typography>
        ) : null
      }
      <Typography
        sx={props.index === props.entirePath.length - 1 ?
          [style.elementTitle, style.elementTitleSelected] :
          [style.elementTitle, style.elementTitleUnselected]}
        role="button"
        aria-current={props.index === props.entirePath.length - 1}
        variant="h6"
        onClick={props.index === props.entirePath.length - 1 ? null : props.onSelect}
      >
        {props.info.name}
      </Typography>
      {
        props.info.isInteractive ? (
          <>
            <Typography sx={[style.ltronly, style.elementTitle, style.elementIcon]} variant="h6">{String.fromCharCode(9094)}</Typography>
          </>
        ) : null
      }
      {
        props.index === props.entirePath.length - 1 ? null : (
          <>
            <Typography sx={[style.ltronly, style.elementTitle, style.elementIcon]} variant="h6">{String.fromCharCode(11106)}</Typography>
            <Typography sx={[style.rtlonly, style.elementTitle, style.elementIcon]} variant="h6">{String.fromCharCode(11106)}</Typography>
          </>
        )
      }
    </React.Fragment>
  );
}

function WrapperDrawerElementTitleWrapper(props: IWrapperDrawerElementTitleWrapperProps) {
  return (
    <Box sx={style.elementTitleContainer}>{props.children}</Box>
  );
}

function WrapperDrawerInternalPanelWrapper(props: IWrapperDrawerInternalPanelWrapperProps) {
  return (
    <Box sx={style.box}>{props.children}</Box>
  );
}

function WrapperDrawerInfoPanelWrapper(props: IWrapperDrawerInfoPanelWrapperProps) {
  return (
    <AltPriorityShifter amount={!props.accessibilitySelectedOption ? -100 : 0}>
      {props.children}
    </AltPriorityShifter>
  );
}

const optionIcons = {
  "MAIN": <Settings />,
  "STYLES": <BorderStyle />,
  "TEMPLATING": <Web />,
  "ACTIONS": <TouchApp />,
}

function WrapperDrawerTabs(props: IWrapperDrawerTabsProps) {
  const setLocationCallback = useCallback((e: React.ChangeEvent, value: string) => {
    props.setAccessibilitySelectedOption(value as any);
    props.setSelectedOption(value as any);
  }, [props.setSelectedOption, props.setAccessibilitySelectedOption]);

  const forceOnClickEvent = useCallback((e: React.MouseEvent<HTMLElement>) => {
    props.setAccessibilitySelectedOption((e.target as HTMLElement).dataset.value as any);
  }, [props.setAccessibilitySelectedOption]);

  return (
    <>
      <AltBadgeReactioner
        reactionKey="escape"
        label="esc"
        priority={3}
        disabled={!props.accessibilitySelectedOption}
        triggerAltAfterAction={true}
        fullWidth={true}
        tabbable={false}
        selector="div"
      >
        <div onClick={props.setAccessibilitySelectedOption.bind(null, null)} />
      </AltBadgeReactioner>
      <Tabs
        value={props.selectedOption}
        onChange={setLocationCallback}
        onClick={forceOnClickEvent}
      >
        {props.options.map((o) => {
          <Tab
            sx={style.tab}
            key={o.id}
            label={
              <AltBadgeReactioner
                reactionKey={o.id[0].toLowerCase()}
                priority={2}
                disabled={props.disabled}
                selectorGoUp={1}
                triggerAltAfterAction={true}
              >
                {optionIcons[o.id]}
              </AltBadgeReactioner>
            }
            value={o.id}
            data-value={o.id}
            title={o.label}
          />
        })}
      </Tabs>
    </>
  );
}

export interface IMaterialUISlateWrapperProps extends IDefaultSlateWrapperProps {
  /**
   * The wrapper variant
   */
  variant?: "filled" | "outlined";

  /**
   * For generating an alt badge reactioner
   */
  reactionerPriority?: number;

  /**
   * key to use with the reactioner
   */
  reactionerKey?: string;
  /**
   * Whether the reactioner is disabled
   */
  reactionerDisabled?: boolean;
  /**
   * Whether the reactioner is to be used in flow
   */
  reactionerUseInFlow?: boolean;

  /**
   * Wrapper sx
   */
  wrapperSx: any;

  wrapperTextEditorSx: any;

  /**
   * toolbar sx used for the toolbar
   */
  toolbarSx?: any;
}

export function MaterialUISlateWrapper(props: IMaterialUISlateWrapperProps) {
  return (
    <DefaultSlateWrapper
      {...props}

      // final wrapper to wrap the editor
      FinalWrapper={FinalWrapperOutlined}

      // wrapper for the editor container
      // with everything
      EditorContainer={EditorContainer}
      DisjointedEditorContainer={DisjointedEditorContainer}

      // wrapper that wraps the editor
      BaseWrapper={BaseWrapper}

      // wraps the toolbar
      ToolbarWrapper={ToolbarWrapper}

      // wraps the drawer
      DrawerWrapper={DrawerWrapper}
      
      // the editor object itself
      Editor={Editor}
      DisjointedEditor={DisjointedEditor}

      // basically used for file error
      Dialog={MUIDialog}

      // used for the toolbar things
      Toolbar={Toolbar}
      ToolbarDrawerButton={ToolbarDrawerButton}
      ToolbarButton={ToolbarButton}
      ToolbarHDivider={HDivider}
      ToolbarVDivider={VDivider}

      // reconfigure the drawer
      DrawerContainerBox={DrawerContainerBox}
      DrawerSpacer={DrawerSpacer}
      DrawerBody={DrawerBody}

      // configurators inside the drawer
      WrapperDrawerSelectField={WrapperDrawerSelectField}
      WrapperDrawerCheckboxField={WrapperDrawerCheckboxField}
      WrapperDrawerTextField={WrapperDrawerTextField}
      WrapperDrawerMultiSelectField={WrapperDrawerMultiSelectField}

      // title for the tree
      WrapperDrawerElementTitle={WrapperDrawerElementTitle}
      WrapperDrawerElementTitleWrapper={WrapperDrawerElementTitleWrapper}

      // other drawer things
      WrapperDrawerInternalPanelWrapper={WrapperDrawerInternalPanelWrapper}
      WrapperDrawerInfoPanelWrapper={WrapperDrawerInfoPanelWrapper}
      WrapperDrawerTabs={WrapperDrawerTabs}

      // pass these as custom args
      customArgs={{
        wrapperSx: props.wrapperSx,
        wrapperTextEditorSx: props.wrapperTextEditorSx,
        toolbarSx: props.toolbarSx,
        variant: props.variant,

        reactionerPriority: props.reactionerPriority,
        reactionerKey: props.reactionerKey,
        reactionerUseInFlow: props.reactionerUseInFlow,
      }}
    />
  )
}
