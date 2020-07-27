/**
 * Contains the DifferingIncludesRetriever class
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The differing include info is the argument that is
 * passed to specify each include that has differed, where
 */
interface IDifferingIncludeInfo {
    /**
     * this is the id of the include
     */
    id: string;
    /**
     * Whether the exclusion state differs
     */
    exclusionStateDiffers: boolean;
    /**
     * Which properties differ
     */
    differingProperties: string[];
}
/**
 * the props for the differing includes retriever
 */
interface IDifferingIncludesRetrieverProps {
    /**
     * The includes to use to compare
     */
    mainIncludes: string[];
    /**
     * The solution
     */
    children: (differingIncludes: IDifferingIncludeInfo[]) => React.ReactNode;
}
/**
 * The class for differing includes which provides includes that differ from their applied value
 * @param props the differing includes props
 * @returns a react component
 */
export default function DifferingIncludesRetriever(props: IDifferingIncludesRetrieverProps): JSX.Element;
export {};
