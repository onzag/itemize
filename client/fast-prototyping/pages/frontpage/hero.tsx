import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import View from "../../../components/property/View";
import { withStyles, WithStyles } from "@material-ui/core";
import AppLanguageRetriever from "../../../components/localization/AppLanguageRetriever";

const heroStyle = {
  heroContainer: {
    width: "100%",
    height: "70vh",
    borderBottom: "solid 1rem #ccc"
  },
};

interface HeroProps extends WithStyles<typeof heroStyle> {
  heroID: number;
}

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
              <View id="content"/>
            </ItemDefinitionProvider>
          )}
        </AppLanguageRetriever>
      </ModuleProvider>
    </div>
  );
});