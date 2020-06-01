import React from "react";
interface IDifferingIncludeInfo {
    id: string;
    exclusionStateDiffers: boolean;
    differingProperties: string[];
}
interface IDifferingIncludesRetrieverProps {
    mainIncludes: string[];
    children: (differingIncludes: IDifferingIncludeInfo[]) => React.ReactNode;
}
export default function DifferingIncludesRetriever(props: IDifferingIncludesRetrieverProps): JSX.Element;
export {};
