"use strict";
/**
 * The social section contains this for the frontpage
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../../mui-core");
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
/**
 * provides the styles for the social section
 * @param theme the mui theme
 * @returns a bunch of styles
 */
exports.socialStyles = (theme) => mui_core_1.createStyles({
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
/**
 * The social section provides the buttons and urls for the different social networks that can be
 * used as defined by the developer, these networks are language sensitive and are read
 * from the i18n properties data
 *
 * @param props the social props
 * @returns a react element
 */
exports.Social = mui_core_1.withStyles(exports.socialStyles)((props) => {
    return (react_1.default.createElement(I18nReadMany_1.default, { data: [
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
        ] }, (i18nSocialTitle, fbURL, instagramURL, linkedInURL, pinterestURL, redditURL, twitterURL, vkURL, wechatURL, youtubeURL) => {
        if (!fbURL && !instagramURL && !linkedInURL && !redditURL && !twitterURL && !youtubeURL) {
            return null;
        }
        return (react_1.default.createElement(mui_core_1.Container, { maxWidth: "md", className: props.classes.container },
            react_1.default.createElement(mui_core_1.Paper, { className: props.classes.paper },
                react_1.default.createElement(mui_core_1.Typography, { variant: "h3", className: props.classes.socialTitle }, i18nSocialTitle),
                react_1.default.createElement(mui_core_1.Paper, { className: props.classes.paper2 },
                    fbURL ? react_1.default.createElement("a", { href: fbURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.FacebookIcon, { className: props.classes.icon + " " + props.classes.facebook }))) : null,
                    instagramURL ? react_1.default.createElement("a", { href: instagramURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.InstagramIcon, { className: props.classes.icon + " " + props.classes.instagram }))) : null,
                    linkedInURL ? react_1.default.createElement("a", { href: linkedInURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.LinkedInIcon, { className: props.classes.icon + " " + props.classes.linkedin }))) : null,
                    pinterestURL ? react_1.default.createElement("a", { href: pinterestURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.PinterestIcon, { className: props.classes.icon + " " + props.classes.pinterest }))) : null,
                    redditURL ? react_1.default.createElement("a", { href: redditURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.RedditIcon, { className: props.classes.icon + " " + props.classes.reddit }))) : null,
                    twitterURL ? react_1.default.createElement("a", { href: twitterURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.TwitterIcon, { className: props.classes.icon + " " + props.classes.twitter }))) : null,
                    vkURL ? react_1.default.createElement("a", { href: vkURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.VKIcon, { className: props.classes.icon }))) : null,
                    wechatURL ? react_1.default.createElement("a", { href: wechatURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.WeChatIcon, { className: props.classes.icon }))) : null,
                    youtubeURL ? react_1.default.createElement("a", { href: youtubeURL, target: "_blank" },
                        react_1.default.createElement(mui_core_1.IconButton, { className: props.classes.button },
                            react_1.default.createElement(mui_core_1.YouTubeIcon, { className: props.classes.icon + " " + props.classes.youtube }))) : null))));
    }));
});
