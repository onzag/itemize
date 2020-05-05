import React from "react";
import { TokenContext } from "../../internal/app/internal-providers";

interface IUserDataRetrieverProps {
  children: (arg: {
    id: number;
    role: string;
  }) => React.ReactNode;
}
export default function UserDataRetriever(props: IUserDataRetrieverProps) {
  return (
    <TokenContext.Consumer>
      {
        (value) => {
          return props.children({
            id: value.id,
            role: value.role,
          });
        }
      }
    </TokenContext.Consumer>
  );
}