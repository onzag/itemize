import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import View from "../../../components/property/View";
import { withStyles, WithStyles } from "@material-ui/core";
import AppLanguageRetriever from "../../../components/localization/AppLanguageRetriever";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";

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