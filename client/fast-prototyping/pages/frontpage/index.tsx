import React from "react";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import { Articles } from "./articles";
import { Hero } from "./hero";
import { Social } from "./social";

interface FrontpageProps {
  heroId?: number;
  noHero?: boolean;
  noArticles?: boolean;
  noSocial?: boolean;
}

export function Frontpage(props: FrontpageProps) {
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
      {props.noHero ? null : <Hero heroID={props.heroId || 1}/>}
      {props.noArticles ? null : <Articles/>}
      {props.noSocial ? null : <Social/>}
    </>
  );
};

export function frontpageWithProps(props: FrontpageProps) {
  return () => {
    <Frontpage {...props}/>
  }
}