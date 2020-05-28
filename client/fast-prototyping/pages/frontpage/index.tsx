import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { SlowLoadingElement } from "../../components/util";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import SearchLoader from "../../../components/search/SearchLoader";
import View from "../../../components/property/View";
import { withStyles, createStyles, WithStyles, Typography, Button, Container, Paper, Theme, Box, Hidden } from "@material-ui/core";
import I18nRead from "../../../components/localization/I18nRead";
import Reader from "../../../components/property/Reader";
import { Avatar } from "../../components/avatar";
import TitleSetter from "../../../components/util/TitleSetter";

const frontpageStyles = (theme: Theme) => createStyles({
  paper: {
    borderRadius: 0,
  },
  container: {
    padding: 0,
  },
  articleContainer: {
    cursor: "pointer",
    borderTop: "solid 2rem #ccc",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    flexWrap: "wrap",
    "&:nth-child(even)": {
      flexDirection: "row-reverse",
    },
    [theme.breakpoints.up("sm")]: {
      "&:nth-child(odd) $publisherInfoBox": {
        left: "calc(300px + 1rem)"
      },
    },
    [theme.breakpoints.up("md")]: {
      "&:nth-child(odd) $publisherInfoBox": {
        left: "calc(300px + 2rem)"
      },
    },
    "&:hover $articleImage": {
      transform: "scale(1.2)",
    },
  },
  articleImageContainer: {
    position: "relative",
    width: "300px",
    lineHeight: 0,
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
  },
  articleImage: {
    transition: "transform ease-in-out 0.3s",
    width: "100%",
  },
  articleText: {
    width: "50%",
    position: "relative",
    flex: "1 1 50%",
    padding: "1rem",
    [theme.breakpoints.up("md")]: {
      padding: "2rem",
    },
  },
  articleSummary: {
    padding: "1rem 0",
  },
  articleSummaryContainer: {
    paddingBottom: "calc(40px + 2rem)",
    [theme.breakpoints.up("md")]: {
      paddingBottom: "calc(40px + 3rem)",
    },
  },
  publisherInfoBox: {
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: "1rem",
    left: "1rem",
    [theme.breakpoints.up("md")]: {
      bottom: "2rem",
      left: "2rem",
    },
  },
  publisherInfoDetailsBox: {
    flex: "1 1 50%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "0 1rem",
    flexDirection: "column",
  }
});

export const Frontpage = withStyles(frontpageStyles)((props: WithStyles<typeof frontpageStyles>) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <I18nRead id="app_name" capitalize={true}>
        {(i18nAppName: string) => {
          return (
            <TitleSetter>
              {i18nAppName}
            </TitleSetter>
          );
        }}
      </I18nRead>
      <Paper className={props.classes.paper}>
        <SlowLoadingElement id="frontpage">
          <ModuleProvider module="cms">
            <ItemDefinitionProvider
              itemDefinition="article"
              searchCounterpart={true}
              automaticSearch={{
                requestedProperties: [
                  "title",
                  "attachments",
                  "locale",
                  "summary",
                  "summary_image",
                ],
                searchByProperties: [],
                traditional: true,
                limit: 5,
                offset: 0,
              }}
            >
              <SearchLoader
                pageSize={5}
                currentPage={0}
                staticResults={true}
              >
                {(loader) => {
                  return loader.searchRecords.map((searchRecord) => {
                    return (
                      <ItemDefinitionProvider {...searchRecord.providerProps}>
                        <div className={props.classes.articleContainer}>
                          <div className={props.classes.articleImageContainer}>
                            <View id="summary_image" rendererArgs={{ imageClassName: props.classes.articleImage, imageSizes: "300px" }} />
                          </div>
                          <div className={props.classes.articleText}>
                            <Typography variant="h4"><View id="title" /></Typography>
                            <div className={props.classes.articleSummaryContainer}>
                              <div className={props.classes.articleSummary}>
                                <View id="summary" />
                              </div>
                              <Button variant="outlined">
                                <I18nRead id="read_more" />
                              </Button>
                            </div>
                          </div>
                          <Reader id="created_by">
                            {(createdBy: number) => (
                              <ModuleProvider module="users">
                                <ItemDefinitionProvider
                                  itemDefinition="user"
                                  forId={createdBy}
                                  static={true}
                                  properties={[
                                    "username",
                                    "profile_picture",
                                    "role",
                                  ]}
                                >
                                  <Box className={props.classes.publisherInfoBox}>
                                    <Avatar hideFlag={true} size="small" />
                                    <Box className={props.classes.publisherInfoDetailsBox}>
                                      <Typography variant="body1"><View id="username" /></Typography>
                                      <Typography variant="body2"><View id="created_at" rendererArgs={{ dateFormat: "LLL" }} /></Typography>
                                    </Box>
                                  </Box>
                                </ItemDefinitionProvider>
                              </ModuleProvider>
                            )}
                          </Reader>
                        </div>
                      </ItemDefinitionProvider>
                    );
                  });
                }}
              </SearchLoader>
            </ItemDefinitionProvider>
          </ModuleProvider>
        </SlowLoadingElement>
      </Paper>
    </Container>
  );
});