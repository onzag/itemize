import React from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Typography,
  Paper,
  Theme,
  Container,
  IconButton,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
  YouTubeIcon,
  WeChatIcon,
  VKIcon } from "../../mui-core";
import I18nReadMany from "../../../components/localization/I18nReadMany";

export const socialStyles = (theme: Theme) => createStyles({
  socialTitle: {
    marginTop: "4rem",
    paddingLeft: "1rem",
    borderLeft: "solid 1rem " + theme.palette.secondary.main,
    fontWeight: 300,
  },
  container: {
    padding: 0,
  },
  paper: {
    borderRadius: 0,
    border: 0,
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  paper2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
    padding: "1rem",
    flexWrap: "wrap",
  },
  button: {
    width: "8rem",
    height: "8rem",
    padding: "2rem",
  },
  icon: {
    fontSize: "4rem",
  },
  facebook: {
    color: "#3b5998",
  },
  youtube: {
    color: "#FF0000",
  },
  instagram: {
    color: "#C13584",
  },
  twitter: {
    color: "#1DA1F2",
  },
  reddit: {
    color: "#FF4500",
  },
  linkedin: {
    color: "#2867B2",
  },
  pinterest: {
    color: "#BD081C",
  },
});

export const Social = withStyles(socialStyles)((props: WithStyles<typeof socialStyles>) => {
  return (
    <I18nReadMany
      data={[
        {
          id: "social", capitalize: true,
        },
        {
          id: "facebook_url",
        },
        {
          id: "instagram_url",
        },
        {
          id: "linkedin_url",
        },
        {
          id: "pinterest_url",
        },
        {
          id: "reddit_url",
        },
        {
          id: "twitter_url",
        },
        {
          id: "vk_url",
        },
        {
          id: "wechat_url",
        },
        {
          id: "youtube_url",
        }
      ]}
    >
      {(i18nSocialTitle: string, fbURL: string, instagramURL: string, linkedInURL: string, pinterestURL: string, redditURL: string, twitterURL: string, vkURL: string, wechatURL: string, youtubeURL: string) => {
        if (!fbURL && !instagramURL && !linkedInURL && !redditURL && !twitterURL && !youtubeURL) {
          return null;
        }

        return (
          <Container maxWidth="md" className={props.classes.container}>
            <Paper className={props.classes.paper}>
              <Typography variant="h3" className={props.classes.socialTitle}>
                {i18nSocialTitle}
              </Typography>
              <Paper className={props.classes.paper2}>
                {fbURL ? <a href={fbURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <FacebookIcon className={props.classes.icon + " " + props.classes.facebook}/>
                  </IconButton>
                </a> : null}
                {instagramURL ? <a href={instagramURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <InstagramIcon className={props.classes.icon + " " + props.classes.instagram}/>
                  </IconButton>
                </a> : null}
                {linkedInURL ? <a href={linkedInURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <LinkedInIcon className={props.classes.icon + " " + props.classes.linkedin}/>
                  </IconButton>
                </a> : null}
                {pinterestURL ? <a href={pinterestURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <PinterestIcon className={props.classes.icon + " " + props.classes.pinterest}/>
                  </IconButton>
                </a> : null}
                {redditURL ? <a href={redditURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <RedditIcon className={props.classes.icon + " " + props.classes.reddit}/>
                  </IconButton>
                </a> : null}
                {twitterURL ? <a href={twitterURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <TwitterIcon className={props.classes.icon + " " + props.classes.twitter}/>
                  </IconButton>
                </a> : null}
                {vkURL ? <a href={vkURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <VKIcon className={props.classes.icon}/>
                  </IconButton>
                </a> : null}
                {wechatURL ? <a href={wechatURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <WeChatIcon className={props.classes.icon}/>
                  </IconButton>
                </a> : null}
                {youtubeURL ? <a href={youtubeURL} target="_blank">
                  <IconButton className={props.classes.button}>
                    <YouTubeIcon className={props.classes.icon + " " + props.classes.youtube}/>
                  </IconButton>
                </a> : null}
              </Paper>
            </Paper>
          </Container>
        )
      }}
    </I18nReadMany>
  )
});