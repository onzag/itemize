import Badge from "@mui/material/Badge";
import React, { useEffect, useState } from "react";
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
  transformed: {
    "& .MuiBadge-badge": {
      transform: "translateY(0px)",
    }
  },
  fullWidth: {
    width: "100%",
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
   * The key to be used that will trigger the specific action, same rules use lowecase
   * values only for keycodes and do not use the arrow keycodes
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
   * if no label is provided the reaction key will be used as a label
   */
  label?: string;
  /**
   * A positioning within the group in order to solve ambiguous reactions, the lowest
   * it will be used for sorting, use it if you expect ambigous values
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
}

export function AltBadgeReactioner(
  props: IAltBadgeReactionerProps,
): any {
  const [ambigousId, setAmbiguousId] = useState(null as number);

  const reactionerProps = { ...props } as any;
  reactionerProps.children = (displayed: boolean) => {
    if (displayed) {
      return (
        <Badge
          badgeContent={((ambigousId && ambigousId.toString()) || props.label || props.reactionKey).toUpperCase()}
          color={(props.colorSchema || "default") === "default" ? "primary" : "default"}
          sx={
            [
              (props.colorSchema || "default") === "default" ? style.badgeFastKey : style.badgeFastKey2,
              props.useTransform ? style.transformed : null,
              props.fullWidth ? style.fullWidth : null,
            ]
          }
        >
          {props.altBadgedChildren || props.children}
        </Badge>
      );
    } else {
      return props.children;
    }
  }

  return <AltReactioner {...reactionerProps} onAmbiguousReaction={setAmbiguousId} onAmbiguousClear={setAmbiguousId.bind(null, null)}/>
}