import React from "react";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import { Articles } from "./articles";
import { Hero } from "./hero";
import { Social } from "./social";

export function Frontpage(props: {heroID?: number}) {
  return (
    <>
      <I18nRead id="app_name" capitalize={true}>
        {(i18nAppName: string) => {
          return (
            <TitleSetter>
              {i18nAppName}
            </TitleSetter>
          );
        }}
      </I18nRead>
      <Hero heroID={props.heroID || 1}/>
      <Articles/>
      <Social/>
    </>
  );
};