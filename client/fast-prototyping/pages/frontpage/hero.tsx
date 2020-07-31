/**
 * Provides a hero for the fast prototying frontpage
 * 
 * @packageDocumentation
 */

import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import View from "../../../components/property/View";
import { withStyles, WithStyles } from "../../mui-core";
import AppLanguageRetriever from "../../../components/localization/AppLanguageRetriever";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";

/**
 * The hero style
 */
const heroStyle = {
  heroContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as "column",
    width: "100%",
    height: "70vh",
    borderBottom: "solid 1rem #ccc",
  },
};

/**
 * The hero props
 */
interface HeroProps extends WithStyles<typeof heroStyle> {
  /**
   * The hero id, the hero is loaded from a fragment in the given user
   * language, as that's how fragment works, normally the hero id will be 1
   * but the hero is not created by default
   */
  heroID: number;
}

/**
 * The hero component uses the cms provider to load a fragment with a given
 * id, this represents trusted fragment content to it can be pure HTML
 *
 * @param props the hero props
 * @returns a react element
 */
export const Hero = withStyles(heroStyle)((props: HeroProps) => {
  return (
    <div className={props.classes.heroContainer + " trusted"}>
      <ModuleProvider module="cms">
        <AppLanguageRetriever>
          {(languageData) => (
            <ItemDefinitionProvider
              itemDefinition="fragment"
              forId={props.heroID}
              forVersion={languageData.currentLanguage.code}
              longTermCaching={true}
              properties={
                [
                  "content",
                  "attachments",
                ]
              }
              static="NO_LISTENING"
            >
              <ItemDefinitionLoader>
                <View id="content"/>
              </ItemDefinitionLoader>
            </ItemDefinitionProvider>
          )}
        </AppLanguageRetriever>
      </ModuleProvider>
    </div>
  );
});
