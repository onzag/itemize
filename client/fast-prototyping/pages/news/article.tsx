/**
 * Provides a single article page
 * 
 * @packageDocumentation
 */

import React from "react";
import Reader from "../../../components/property/Reader";
import TitleSetter from "../../../components/util/TitleSetter";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider, NoStateItemDefinitionProvider } from "../../../providers/item-definition";
import { Container, WithStyles, withStyles, Theme, createStyles, Paper, Typography, Divider } from "../../mui-core";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import View from "../../../components/property/View";
import I18nRead from "../../../components/localization/I18nRead";
import { Avatar } from "../../components/avatar";

/**
 * The article page props
 */
interface ArticleProps {
  match: {
    params: {
      id: string;
    };
  };
}

/**
 * the article content styles
 * @param theme the mui theme
 * @returns a bunch of styles
 */
const articleContentStyles = (theme: Theme) => createStyles({
  container: {
    padding: 0,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImageContainer: {
    width: "100%",
    height: "40vh",
    lineHeight: 0,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 0 5px rgb(50,50,50)",
    fallbacks: {
      height: "30rem",
    },
  },
  headerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  headerOverlay: {
    backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0.7), rgba(0, 0, 0, 0.95))",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  innerContainer: {
    padding: "2rem 4rem 4rem 4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 3rem 3rem 3rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2rem",
    }
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 900,
    position: "absolute",
    bottom: "3rem",
    zIndex: 3,
    color: "white",
    textShadow: "0 0 5px black",
    borderLeft: "solid 1rem white",
    paddingLeft: "2rem",
  },
  publisher: {
    textTransform: "uppercase",
    fontWeight: 900,
    position: "absolute",
    bottom: "2rem",
    zIndex: 3,
    fontSize: "0.75rem",
    color: "white",
    textShadow: "0 0 5px black",
    paddingLeft: "3rem",
  },
  publisherAvatar: {
    position: "absolute",
    top: "2rem",
    left: "3rem",
  },
  dateInfo: {
    display: "flex",
    width: "100%",
    color: theme.palette.grey[400],
    paddingBottom: "1.2rem",
  },
  divider: {
    margin: "0 0.7rem",
  }
});

/**
 * The article content displays the content for a given article inside
 * its own containement
 * @param props the article content props
 * @returns a react element
 */
const ArticleContent = withStyles(articleContentStyles)((props: WithStyles<typeof articleContentStyles>) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <Paper className={props.classes.paper}>
        <ItemDefinitionLoader fullWidth={true}>
          <div className={props.classes.headerImageContainer}>
            <View
              id="summary_image"
              rendererArgs={{
                imageClassName: props.classes.headerImage,
                imageSizes: "70vw",
              }}
            />
            <div className={props.classes.headerOverlay}/>
            <Typography variant="h3" className={props.classes.title}>
              <Reader id="title">{(title: string) => title}</Reader>
            </Typography>
            <Reader id="created_by">
              {(createdBy: number) => (
                <ModuleProvider module="users">
                  <ItemDefinitionProvider
                    itemDefinition="user"
                    forId={createdBy}
                    static="TOTAL"
                    disableExternalChecks={true}
                    properties={[
                      "username",
                      "profile_picture",
                      "role",
                    ]}
                  >
                    <Reader id="username">
                      {(username: string) => (
                        <ModuleProvider module="cms">
                          <NoStateItemDefinitionProvider
                            itemDefinition="article"
                          >
                            <Typography variant="h3" className={props.classes.publisher}>
                              <I18nRead id="by" args={[username]}/>
                            </Typography>
                          </NoStateItemDefinitionProvider>
                        </ModuleProvider>
                      )}
                    </Reader>
                    <Avatar linkClassName={props.classes.publisherAvatar} hideFlag={true} size="medium" profileURL={(id: number) => `/profile/${id}`} />
                  </ItemDefinitionProvider>
                </ModuleProvider>
              )}</Reader>
            
          </div>
          <div className={props.classes.innerContainer + " trusted"}>
            <div className={props.classes.dateInfo}>
              <Typography variant="body2">
                <View id="created_at" rendererArgs={{ dateFormat: "LLLL" }}/>
              </Typography>
              <Reader id="edited_at">
                {(editedAt: string) => {
                  if (editedAt) {
                    return (
                      <>
                        <Divider orientation="vertical" flexItem={true} className={props.classes.divider} />
                        <I18nRead id="updated_at" capitalize={true} args={
                          [<Typography variant="body2"><View id="edited_at" rendererArgs={{ dateFormat: "ll" }} /></Typography>]
                        } />
                      </>
                    )
                  }
                  return null;
                }}
              </Reader>
            </div>
            <View id="content"/>
          </div>
        </ItemDefinitionLoader>
      </Paper>
    </Container>
  )
});

/**
 * the article component itself that will provide for a given
 * article
 * @param props the props for the article
 * @returns a react element
 */
export function Article(props: ArticleProps) {
  const articleId = parseInt(props.match.params.id) || null;
  return (
    <>
      <ModuleProvider module="cms">
        <ItemDefinitionProvider
          itemDefinition="article"
          forId={articleId}
          static="TOTAL"
          properties={
            [
              "title",
              "locale",
              "content",
              "summary_image",
              "attachments",
            ]
          }
        >
          <Reader id="title">
            {(title: string) => (
              <TitleSetter>
                {title}
              </TitleSetter>
            )}
          </Reader>
          <ArticleContent/>
        </ItemDefinitionProvider>
      </ModuleProvider>
    </>
  );
};
