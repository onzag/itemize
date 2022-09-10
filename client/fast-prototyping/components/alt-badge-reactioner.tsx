import Badge from "@mui/material/Badge";
import React from "react";
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
}

type VoidFn = (element: HTMLElement) => void;

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
   * The key to be used that will trigger the specific action
   */
  reactionKey: string;
  /**
   * The action to be executed, by default it will click the component, other actions are focus
   * otherwise pass a function for a custom action
   */
  action?: "focus" | "click" | VoidFn;
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
   * The label that is related to the reactionKey
   */
  label: string;
}

export function AltBadgeReactioner(
  props: IAltBadgeReactionerProps,
): any {
  const reactionerProps = { ...props } as any;
  reactionerProps.children = (isSelected: boolean) => {
    if (isSelected) {
      return (
        <Badge
          badgeContent={props.label}
          color={(props.colorSchema || "default") === "default" ? "primary" : "default"}
          sx={(props.colorSchema || "default") === "default" ? style.badgeFastKey : style.badgeFastKey2}
        >
          {props.altBadgedChildren || props.children}
        </Badge>
      );
    } else {
      return props.children;
    }
  }

  return <AltReactioner {...reactionerProps} />
}