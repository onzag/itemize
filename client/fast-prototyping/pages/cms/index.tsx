import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { SlowLoadingElement } from "../../components/util";
import { Paper, createStyles, withStyles, WithStyles, Container } from "@material-ui/core";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import Entry from "../../../components/property/Entry";

const cmsStyles = createStyles({
  paper: {
    padding: "1rem",
  },
  container: {
    paddingTop: "1rem",
  },
});

export const CMS = withStyles(cmsStyles)((props: WithStyles<typeof cmsStyles>) => {
  return (
    <SlowLoadingElement id="cms">
      <ModuleProvider module="cms">
        <I18nRead id="name" capitalize={true}>
          {(i18nCMS: string) => {
            return (
              <TitleSetter>
                {i18nCMS}
              </TitleSetter>
            );
          }}
        </I18nRead>
        <ItemDefinitionProvider
          itemDefinition="fragment"
          properties={[
            "title",
            "content",
            "attachments",
          ]}
          includePolicies={false}
          longTermCaching={false}
        >
          <ItemDefinitionLoader>
            <Container maxWidth="md" className={props.classes.container}>
              <Paper className={props.classes.paper}>
                <Entry id="title" />
                <Entry id="content" />

              </Paper>
            </Container>
          </ItemDefinitionLoader>
        </ItemDefinitionProvider>
      </ModuleProvider>
    </SlowLoadingElement>
  );
});