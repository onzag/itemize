import * as React from "react";
import Root, { IRootRawJSONDataType } from "../../base/Root";
import DevToolModule from "./dmodule";

export default function DevToolRoot({
  locale,
  data,
  raw,
}: {
  locale: string,
  data: Root,
  raw: IRootRawJSONDataType,
}) {
  return (
    <React.Fragment>
      <br/>
      <p>Available Items</p>
      {raw.children.map((rawModule) =>
        <DevToolModule
         key={rawModule.name}
         root={data}
         moduleName={rawModule.name}
         raw={rawModule}
         locale={locale}
        />,
      )}
   </React.Fragment>
  );
}
