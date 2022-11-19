import { SxProps, Theme } from "@mui/material";
import Badge from "@mui/material/Badge";
import React, { useCallback, useState } from "react";
import AltReactioner from "../../components/accessibility/AltReactioner";

const style = {
  badgeFastKey: {
    "& .MuiBadge-badge": {
      backgroundColor: "#fffde7 !important",
      color: "#212121 !important",
      borderColor: "#f9a825 !important",
    },
  },
  badgeFastKey2: {
    "& .MuiBadge-badge": {
      backgroundColor: "#212121 !important",
      color: "#fffde7 !important",
      borderColor: "#f9a825 !important",
    },
  },
  badgeFastKeyFlow: {
    "& .MuiBadge-badge": {
      backgroundColor: "#e1f5fe !important",
      color: "#212121 !important",
      borderColor: "#f9a825 !important",
    },
  },
  badgeFastKey2Flow: {
    "& .MuiBadge-badge": {
      backgroundColor: "#212121 !important",
      color: "#e1f5fe !important",
      borderColor: "#f9a825 !important",
    },
  },
  transformed: {
    "& .MuiBadge-badge": {
      transform: "translateY(0px)",
    }
  },
  fullWidth: {
    width: "100%",
  },
  hidden: {
    "& .MuiBadge-badge": {
      display: "none",
    }
  },
  blocked: {
    "& .MuiBadge-badge": {
      opacity: 0.5,
    }
  },
}

interface IAltBadgeReactionerProps {
  /**
   * The children that is to be rendered inside
   */
  children: React.ReactNode;
  /**
   * An alternative children to use when it's showing the selection
   */
  altBadgedChildren?: React.ReactNode;
  /**
   * The wrapping component to use, by default it will use a div
   */
  component?: string;
  /**
   * a css selector to choose the component that is relevant that the
   * user is supposed to interact with, by default it will simply pick the first child node
   */
  selector?: string;
  /**
   * how many times to go up in the parent node before selecting, rather than selecting
   * the current element
   */
  selectorGoUp?: number;
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
   */
  priority?: number;
  /**
   * A positioning within the group used to specify what part of a scrolling box this belongs to
   * for example -1 is often to be used with fixed navbar, 0 with the body content and 100 with footers
   */
  groupPosition?: number;
  /**
   * For stylistic purposes, uses a transform to keep the badge closer to the element
   */
  useTransform?: boolean;
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
}

export function AltBadgeReactioner(
  props: IAltBadgeReactionerProps,
): any {
  const [ambigousIdPlusCount, setAmbiguousIdPlusCount] = useState(null as [boolean, number, number]);

  const onAmbiguousReaction = useCallback((expected: boolean, id: number, plusCount: number) => {
    setAmbiguousIdPlusCount([expected, id, plusCount]);
  }, []);

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
          <span aria-hidden={true} style={{display: "contents"}}>
            {content.toUpperCase()}
          </span>
        }
        color={(props.colorSchema || "default") === "default" ? "primary" : "default"}
        data-priority={props.priority || 0}
        data-group-position={props.groupPosition}
        sx={
          [
            (props.colorSchema || "default") === "default" ?
              (props.useInFlow ? style.badgeFastKeyFlow : style.badgeFastKey) :
              (props.useInFlow ? style.badgeFastKey2Flow : style.badgeFastKey2),
            props.useTransform ? style.transformed : null,
            props.fullWidth ? style.fullWidth : null,
            displayed ? null : style.hidden,
            blocked ? style.blocked : null,
          ].concat(Array.isArray(props.sx) ? props.sx as any : [props.sx] as any)
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {displayed ? (props.altBadgedChildren || props.children) : props.children}
      </Badge>
    );
  }

  return (
    <AltReactioner
      {...reactionerProps}
      onAmbiguousReaction={onAmbiguousReaction}
      onAmbiguousClear={setAmbiguousIdPlusCount.bind(null, null)}
    />
  );
}