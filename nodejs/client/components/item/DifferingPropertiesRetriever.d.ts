/**
 * Contains the differing properties retriever class
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The props for the differing properties retriever element
 */
interface IDifferingPropertiesRetrieverProps {
    /**
     * The main properties to check for differences
     */
    mainProperties: string[];
    /**
     * A list of differing properties
     */
    children: (differingProperties: string[]) => React.ReactNode;
}
/**
 * The differing properties retriever element which provides the properties
 * ids that differ from their applied value
 * @param props the react props
 * @returns a react node
 */
export default function DifferingPropertiesRetriever(props: IDifferingPropertiesRetrieverProps): JSX.Element;
export {};
