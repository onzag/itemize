import type { IElasticHighlighPropertyInfo } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import React, { useCallback } from "react";
import HighlightsRetriever from "./HighlightsRetriever";

export interface IHighlightRetrieverProps {
  propertyId: string;
  /**
   * The node to use to wrap the entire thing
   * should support lang attribute
   */
  Node?: React.ComponentType<any>;
  /**
   * The node props to use to wrap the match
   */
  nodeProps?: any;
  /**
   * The fragment node to use, must support dangerouslySetInnerHTML
   */
  FragmentNode?: React.ComponentType<any>;
  /**
   * What to render if no highlights found
   */
  nullNode?: React.ReactNode;
  /**
   * the node props to use in the fragment
   */
  fragmentNodeProps?: any;
  /**
   * What to start each fragment which, useful to set "..." here
   */
  startStr?: string;
  /**
   * What to end each fragment which, useful to set "..." here
   */
  endStr?: string;
};

/**
 * Retrieves the highlights for a given property
 * special to be used with full type highlights
 * @param props 
 * @returns 
 */
export default function HighlightsView(props: IHighlightRetrieverProps) {
  const back = useCallback((v: IElasticHighlighPropertyInfo) => {
    if (!v || !v.highlights || v.highlights.length === 0) {
      return (props.nullNode || null);
    }

    const Node = props.Node || "div";
    const FragmentNode = props.FragmentNode || "div";
    return (
      <Node {...props.nodeProps} lang={v.lang}>
        {v.highlights.map((h, index) => (
          <FragmentNode
            dangerouslySetInnerHTML={{__html: (props.startStr || "") + h + (props.endStr || "")}}
            key={index}
          />
        ))}
      </Node>
    );
  }, [props.nodeProps, props.Node, props.fragmentNodeProps, props.FragmentNode, props.startStr, props.endStr, props.nullNode]);
  return (
    <HighlightsRetriever propertyId={props.propertyId}>
      {back}
    </HighlightsRetriever>
  );
}