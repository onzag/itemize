import type { IElasticHighlighPropertyInfo } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ItemContext } from "../../providers/item";
import React, { useContext } from "react";

/**
 * Provides the highlights for a given property id
 * specially to be used with full properties
 * @param propertyId 
 * @returns 
 */
export function useHighlightsRetriever(propertyId: string) {
  const itemContext = useContext(ItemContext);
  const highlights = itemContext.highlights;

  if (!highlights) {
    return null;
  }

  return highlights[propertyId] || null;
}

export interface IHighlightRetrieverProps {
  propertyId: string;
  children: (value: IElasticHighlighPropertyInfo) => React.ReactNode;
};

interface IActuaHighlightRetrieverProps extends IHighlightRetrieverProps {
  value: IElasticHighlighPropertyInfo;
};

class ActualHighlightsRetriever extends React.PureComponent<IActuaHighlightRetrieverProps> {
  public render() {
    return this.props.children(this.props.value);
  }
}

/**
 * Retrieves the highlights for a given property
 * special to be used with full type highlights
 * @param props 
 * @returns 
 */
export default function HighlightsRetriever(props: IHighlightRetrieverProps) {
  const value = useHighlightsRetriever(props.propertyId);

  return (<ActualHighlightsRetriever value={value} {...props}/>)
}