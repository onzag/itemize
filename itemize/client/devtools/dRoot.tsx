import React from "react";
import Root from "../../base/Root";
import DevToolModule from "./dModule";

export default function DevToolRoot({
  language,
  root,
}: {
  language: string,
  root: Root,
}) {
  return (
    <React.Fragment>
      <br/>
      <p>Available Items</p>
      {root.getAllModules().map((childModule) =>
        <DevToolModule
         key={childModule.getName()}
         module={childModule}
         language={language}
        />,
      )}
   </React.Fragment>
  );
}
