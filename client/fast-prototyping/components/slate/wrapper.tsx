import React, { useCallback } from "react";
import { DefaultSlateWrapper, IDefaultSlateWrapperProps, IDrawerBodyProps, IDrawerContainerBoxProps, IDrawerSpacerProps, IEditorContainerProps, IEditorProps, IEditorWrapperProps } from "@onzag/itemize-text-engine/editor/slate/wrapper";
import { Theme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AltBadgeReactioner } from "../alt-badge-reactioner";
import AltPriorityShifter from "../../../components/accessibility/AltPriorityShifter";
import { Dialog } from "../dialog";
import { IDialogComponentProps } from "@onzag/itemize-text-engine/editor/slate/dialogs/file";
import { capitalize } from "../../../components/localization";
import Button from "@mui/material/Button";
import { IWrapperDrawerSelectFieldProps } from "@onzag/itemize-text-engine/editor/slate/drawer/general";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
};

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

function WrapperDrawerSelectField(props: IWrapperDrawerSelectFieldProps) {
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
  )
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
}

export function MaterialUISlateWrapper(props: IMaterialUISlateWrapperProps) {
  return (
    <DefaultSlateWrapper
      {...props}

      DrawerContainerBox={DrawerContainerBox}
      DrawerSpacer={DrawerSpacer}
      DrawerBody={DrawerBody}
      FinalWrapper={FinalWrapperOutlined}
      EditorContainer={EditorContainer}
      BaseWrapper={BaseWrapper}
      ToolbarWrapper={ToolbarWrapper}
      DrawerWrapper={DrawerWrapper}
      Editor={Editor}
      DisjointedEditor={DisjointedEditor}
      DisjointedEditorContainer={DisjointedEditorContainer}
      Dialog={MUIDialog}
      WrapperDrawerSelectField={WrapperDrawerSelectField}

      customArgs={{
        wrapperSx: props.wrapperSx,
        wrapperTextEditorSx: props.wrapperTextEditorSx,
        variant: props.variant,

        reactionerPriority: props.reactionerPriority,
        reactionerKey: props.reactionerKey,
        reactionerUseInFlow: props.reactionerUseInFlow,
      }}
    />
  )
}
