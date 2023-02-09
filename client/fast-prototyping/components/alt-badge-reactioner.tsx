import { SxProps, Theme } from "@mui/material";
import Badge from "@mui/material/Badge";
import React, { useCallback, useState } from "react";
import AltReactioner from "../../components/accessibility/AltReactioner";

const style = {
  badgeFastKey: {
    "& > .MuiBadge-badge": {
      backgroundColor: "#fffde7 !important",
      color: "#212121 !important",
      borderColor: "#f9a825 !important",
    },
  },
  badgeFastKey2: {
    "& > .MuiBadge-badge": {
      backgroundColor: "#212121 !important",
      color: "#fffde7 !important",
      borderColor: "#f9a825 !important",
    },
  },
  badgeFastKeyFlow: {
    "& > .MuiBadge-badge": {
      backgroundColor: "#e1f5fe !important",
      color: "#212121 !important",
      borderColor: "#f9a825 !important",
    },
  },
  badgeFastKey2Flow: {
    "& > .MuiBadge-badge": {
      backgroundColor: "#212121 !important",
      color: "#e1f5fe !important",
      borderColor: "#f9a825 !important",
    },
  },
  transform_close: {
    "& > .MuiBadge-badge": {
      transform: "translateY(0px)",
    }
  },
  transform_absolute: {
    position: "absolute",
    bottom: "50%",
    width: 0,
    height: 0,
    left: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > .MuiBadge-badge": {
      transform: "none",
      position: "relative",
      height: "40px",
    }
  },
  fullWidth: {
    width: "100%",
  },
  hidden: {
    "& > .MuiBadge-badge": {
      display: "none",
    }
  },
  blocked: {
    "& > .MuiBadge-badge": {
      opacity: 0.5,
    }
  },
}

interface IAltBadgeReactionerProps {
  /**
   * The children that is to be rendered inside
   */
  children?: React.ReactNode;
  /**
   * An alternative children to use when it's showing the selection
   */
  altBadgedChildren?: React.ReactNode;
  /**
   * The wrapping component to use, by default it will use a div
   */
  component?: string;
  /**
   * The badge component to use
   */
  badgeComponent?: string;
  /**
   * a css selector to choose the component that is relevant that the
   * user is supposed to interact with, by default it will simply pick the first child node
   */
  selector?: string;
  /**
   * how many times to go up in the parent node before selecting, rather than selecting
   * the current element
   * 
   * if it's a string it will use closest
   */
  selectorGoUp?: number | string;
  /**
   * The key to be used that will trigger the specific action, same rules use lowecase
   * values only for keycodes and do not use the arrow keycodes
   */
  reactionKey: string;
  /**
   * An alternative label to use instead of the reaction key
   * for example, reaction key may be escape, but keyboard says esc
   */
  label?: string;
  /**
   * The action to be executed, by default it will click the component, other actions are focus
   * otherwise pass a function for a custom action
   * 
   * focus will focus the element
   * click will click the element
   */
  action?: "focus" | "click";
  /**
   * What color to use
   */
  colorSchema?: "default" | "contrast";
  /**
   * whether it is currently disabled
   */
  disabled?: boolean;
  /**
   * The priority by default 0, for example, let's say there's an element like a toolbar that is to be
   * used only when a certain element is focused, when such element is focused the alt reactioners
   * may have priority 1, and none of the priority 0 elements will display, of course, this is only
   * usable if you use it in conjuction with disabled
   * 
   * ALWAYS_ON_TOP makes it so that the element's priority is the same as the maximum one available
   * so it's technically visible on all priorities
   * 
   * ALWAYS_ON_TOP_KEEP_FLOW makes it so that the element priority is the same as the maximum one available
   * but for elements that are as useInFlow pressing tab on it will figure the next available flow element
   */
  priority?: number | "ALWAYS_ON_TOP" | "ALWAYS_ON_TOP_KEEP_FLOW";
  /**
   * For stylistic purposes, uses a transform to keep the badge closer to the element
   */
  useTransform?: "close" | "absolute";
  /**
   * full width for the badge
   */
  fullWidth?: boolean;
  /**
 * will trigger a new input reaction after it has been completed
 */
  triggerAltAfterAction?: boolean;
  /**
   * custom sx for the badge
   */
  sx?: SxProps<Theme>;
  /**
   * whether the element can be tabbed
   */
  tabbable?: boolean;
  /**
   * Will use the reactioner in the text flow as well so that it's selectable while
   * going through textual elements, however it will not be displayed and be treated
   * rather as a simple focusable element, but it will be displayed in alt mode
   */
  useInFlow?: boolean;
  /**
   * When using alt+gr tab it will anchor to the next available anchor
   */
  tabAnchor?: boolean;
  /**
   * Sone elements may unmount and not get called, eg. if some other element
   * caused it to unmount, the alt may remain in a triggered state without
   * realizing nothing anymore is visible
   * 
   * very useful for dialogs for example that may get closed by outside actions
   */
  hideAllIfUnmount?: boolean;
  /**
   * plays with hideAllIfUnmount to trigger an action whenever it's unmounted
   */
  triggerAltIfUnmountAndAltActive?: boolean;
  /**
   * Normally this is unnecessary to set, basically whenever the element is focused
   * all other element quick actions are not allowed to execute
   * 
   * however this does not apply if tab isn't pressed
   * 
   * this is basically the default for input fields and textareas
   */
  blocksQuickActionsWhileFocused?: boolean;

  /**
   * Once this element is focused it will go into an uncontrolled state
   * on the next tab forwards or backwards and control will only be regained once
   * an element that is part of either the active flow, active layer, or awaiting key codes
   * for example, let's say you have an embbed youtube video in its own iframe, you can wrap the video
   * on a div that is AltText that is uncontrolled, with an aria-label of youtube video, once that element
   * is focused, the alt is set in an uncontrolled state, and it will stop deciding what's next tabbed
   */
  uncontrolled?: boolean;

  /**
   * Triggers when it enters keycodes mode for an expected target
   */
  onEnterKeyCodes?: () => void;

  /**
   * Triggers when keycodes mode is cleared
   */
  onExitKeyCodes?: () => void;
}

export function AltBadgeReactioner(
  props: IAltBadgeReactionerProps,
): any {
  const [ambigousIdPlusCount, setAmbiguousIdPlusCount] = useState(null as [boolean, number, number]);

  const onAmbiguousReaction = useCallback((expected: boolean, id: number, plusCount: number) => {
    setAmbiguousIdPlusCount([expected, id, plusCount]);
    if (!expected) {
      props.onEnterKeyCodes && props.onEnterKeyCodes();
    }
  }, [props.onEnterKeyCodes]);

  const onAmbiguousClear = useCallback(() => {
    setAmbiguousIdPlusCount(null);
    props.onExitKeyCodes && props.onExitKeyCodes();
  }, [props.onExitKeyCodes]);

  const reactionerProps = { ...props } as any;
  reactionerProps.children = (displayed: boolean, blocked: boolean) => {
    let content = props.label || props.reactionKey;

    if (ambigousIdPlusCount) {
      if (!ambigousIdPlusCount[0]) {
        content = "";
      }

      content += "+".repeat(ambigousIdPlusCount[2]) + ambigousIdPlusCount[1].toString();
    }

    // the data attributes are for debugging purposes
    return (
      <Badge
        badgeContent={
          <span aria-hidden={true} style={{ display: "contents" }}>
            {content.toUpperCase()}
          </span>
        }
        color={(props.colorSchema || "default") === "default" ? "primary" : "default"}
        sx={
          [
            (props.colorSchema || "default") === "default" ?
              (props.useInFlow ? style.badgeFastKeyFlow : style.badgeFastKey) :
              (props.useInFlow ? style.badgeFastKey2Flow : style.badgeFastKey2),
            props.useTransform ? style["transform_" + props.useTransform] : null,
            props.fullWidth ? style.fullWidth : null,
            displayed ? null : style.hidden,
            blocked ? style.blocked : null,
          ].concat(Array.isArray(props.sx) ? props.sx as any : [props.sx] as any)
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        component={props.badgeComponent as any}
      >
        {displayed ? (props.altBadgedChildren || props.children) : props.children}
      </Badge>
    );
  }

  return (
    <AltReactioner
      {...reactionerProps}
      onAmbiguousReaction={onAmbiguousReaction}
      onAmbiguousClear={onAmbiguousClear}
    />
  );
}