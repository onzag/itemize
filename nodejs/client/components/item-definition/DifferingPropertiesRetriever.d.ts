import React from "react";
interface IDifferingPropertiesRetrieverProps {
    mainProperties: string[];
    children: (differingProperties: string[]) => React.ReactNode;
}
export default function DifferingPropertiesRetriever(props: IDifferingPropertiesRetrieverProps): JSX.Element;
export {};
