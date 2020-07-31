/**
 * Provides a fast prototyping frontpage
 * 
 * @packageDocumentation
 */

import React from "react";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import { Articles } from "./articles";
import { Hero } from "./hero";
import { Social } from "./social";

/**
 * The frontpage props
 */
interface FrontpageProps {
  /**
   * The hero id, by default 1, represents the fragment id that is supposed
   * to be loaded
   */
  heroId?: number;
  /**
   * Whether to actually remove the hero section
   */
  noHero?: boolean;
  /**
   * whether to remove the articles section
   */
  noArticles?: boolean;
  /**
   * Whether to remove the social section
   */
  noSocial?: boolean;
  /**
   * some children to add extra, after the hero
   */
  children?: React.ReactElement;
  /**
   * some children to add extra, at the end
   */
  childrenEnd?: React.ReactElement;
}

/**
 * Provides the frontpage which has a hero, articles and
 * a social context
 * @param props the frontpage props
 * @returns a react element
 */
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
      {props.children}
      {props.noArticles ? null : <Articles/>}
      {props.noSocial ? null : <Social/>}
      {props.childrenEnd}
    </>
  );
};

/**
 * Allows to inject props to the frontpage
 * @param props the props to inject
 * @returns a non instantiated react component
 */
export function frontpageWithProps(props: FrontpageProps) {
  return () => {
    <Frontpage {...props}/>
  }
}
