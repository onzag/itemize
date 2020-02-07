import React from "react";
import { TokenContext } from "../internal/app/internal-providers";

interface IUserIdRetrieverProps {
  children: (id: number) => React.ReactNode;
}
export function UserIdRetriever(props: IUserIdRetrieverProps) {
  return (
    <TokenContext.Consumer>
      {
        (value) => {
          return props.children(value.id);
        }
      }
    </TokenContext.Consumer>
  );
}
