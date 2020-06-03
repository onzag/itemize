"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const SearchLoader_1 = __importDefault(require("../../../components/search/SearchLoader"));
const View_1 = __importDefault(require("../../../components/property/View"));
const core_1 = require("@material-ui/core");
const Reader_1 = __importDefault(require("../../../components/property/Reader"));
const avatar_1 = require("../../components/avatar");
const AppLanguageRetriever_1 = __importDefault(require("../../../components/localization/AppLanguageRetriever"));
const Link_1 = __importDefault(require("../../../components/navigation/Link"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
exports.articlesStyles = (theme) => core_1.createStyles({
    newsTitle: {
        marginTop: "2rem",
        paddingLeft: "1rem",
        borderLeft: "solid 1rem " + theme.palette.secondary.main,
    },
    paper: {
        borderRadius: 0,
        border: 0,
        boxShadow: "none",
        backgroundColor: "transparent",
    },
    container: {
        padding: 0,
    },
    articleContainer: {
        backgroundColor: "white",
        marginTop: "2rem",
        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        transition: "box-shadow ease-in-out 0.3s",
        borderTop: "solid 1px rgba(0,0,0,0.12)",
        cursor: "pointer",
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
                left: "calc(300px + 1.5rem)"
            },
            "&:nth-child(even) $articleText": {
                paddingRight: "calc(1.5rem + 300px)",
            },
            "&:nth-child(odd) $articleText": {
                paddingLeft: "calc(1.5rem + 300px)",
            },
            "&:nth-child(even) $articleImageContainer": {
                right: 0,
            },
            "&:nth-child(odd) $articleImageContainer": {
                left: 0,
            },
        },
        [theme.breakpoints.up("md")]: {
            "&:nth-child(odd) $publisherInfoBox": {
                left: "calc(300px + 2rem)"
            },
            "&:nth-child(even) $articleText": {
                paddingRight: "calc(2rem + 300px)",
            },
            "&:nth-child(odd) $articleText": {
                paddingLeft: "calc(2rem + 300px)",
            },
        },
        "&:hover, &:active": {
            boxShadow: "0px 6px 6px -1px rgba(0,0,0,0.2), 0px 6px 6px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        },
        "&:hover $articleImage, &:active $articleImage": {
            transform: "scale(1.05)",
        },
    },
    articleImageContainer: {
        width: "300px",
        lineHeight: 0,
        overflow: "hidden",
        position: "absolute",
        top: 0,
        bottom: 0,
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            height: "300px",
            position: "relative",
        },
    },
    articleImage: {
        transition: "transform ease-in-out 0.3s",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    articleText: {
        width: "50%",
        position: "relative",
        flex: "1 1 50%",
        padding: "1.5rem",
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
        bottom: "1.5rem",
        left: "1.5rem",
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
    },
    moreNewsContainer: {
        marginTop: "2rem",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    moreNewsButton: {},
});
exports.Articles = core_1.withStyles(exports.articlesStyles)((props) => {
    return (react_1.default.createElement(core_1.Container, { maxWidth: "md", className: props.classes.container },
        react_1.default.createElement(core_1.Paper, { className: props.classes.paper },
            react_1.default.createElement(module_1.ModuleProvider, { module: "cms" },
                react_1.default.createElement(AppLanguageRetriever_1.default, null, (languageData) => (react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "article", searchCounterpart: true, setters: [
                        {
                            id: "locale",
                            searchVariant: "exact",
                            value: languageData.currentLanguage.code,
                        }
                    ], automaticSearch: {
                        requestedProperties: [
                            "title",
                            "locale",
                            "summary",
                            "summary_image",
                        ],
                        searchByProperties: [
                            "locale",
                        ],
                        traditional: true,
                        limit: 5,
                        offset: 0,
                    } },
                    react_1.default.createElement(core_1.Typography, { variant: "h2", className: props.classes.newsTitle },
                        react_1.default.createElement(I18nRead_1.default, { id: "news", capitalize: true })),
                    react_1.default.createElement(SearchLoader_1.default, { pageSize: 5, currentPage: 0, static: "TOTAL" }, (loader) => {
                        return loader.searchRecords.map((searchRecord) => {
                            return (react_1.default.createElement(item_definition_1.ItemDefinitionProvider, Object.assign({}, searchRecord.providerProps),
                                react_1.default.createElement(Link_1.default, { to: `/news/${searchRecord.id}`, as: "div", className: props.classes.articleContainer },
                                    react_1.default.createElement("div", { className: props.classes.articleImageContainer },
                                        react_1.default.createElement(View_1.default, { id: "summary_image", rendererArgs: {
                                                imageClassName: props.classes.articleImage,
                                                imageSizes: "300px",
                                                lazyLoad: true,
                                            } })),
                                    react_1.default.createElement("div", { className: props.classes.articleText },
                                        react_1.default.createElement(core_1.Typography, { variant: "h4" },
                                            react_1.default.createElement(View_1.default, { id: "title" })),
                                        react_1.default.createElement("div", { className: props.classes.articleSummaryContainer },
                                            react_1.default.createElement("div", { className: props.classes.articleSummary },
                                                react_1.default.createElement(View_1.default, { id: "summary" })))),
                                    react_1.default.createElement(Reader_1.default, { id: "created_by" }, (createdBy) => (react_1.default.createElement(module_1.ModuleProvider, { module: "users" },
                                        react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", forId: createdBy, static: "TOTAL", disableExternalChecks: true, properties: [
                                                "username",
                                                "profile_picture",
                                                "role",
                                            ], injectParentContext: true },
                                            react_1.default.createElement(core_1.Box, { className: props.classes.publisherInfoBox },
                                                react_1.default.createElement(avatar_1.Avatar, { hideFlag: true, size: "small", profileURL: (id) => `/profile/${id}` }),
                                                react_1.default.createElement(core_1.Box, { className: props.classes.publisherInfoDetailsBox },
                                                    react_1.default.createElement(core_1.Typography, { variant: "body1" },
                                                        react_1.default.createElement(View_1.default, { id: "username" })),
                                                    react_1.default.createElement(core_1.Typography, { variant: "body2" },
                                                        react_1.default.createElement(item_definition_1.ParentItemDefinitionContextProvider, null,
                                                            react_1.default.createElement(View_1.default, { id: "created_at", rendererArgs: { dateFormat: "LLL" } }))))))))))));
                        });
                    }),
                    react_1.default.createElement("div", { className: props.classes.moreNewsContainer },
                        react_1.default.createElement(Link_1.default, { to: "/news" },
                            react_1.default.createElement(core_1.Button, { size: "large", className: props.classes.moreNewsButton, variant: "contained", color: "primary" },
                                react_1.default.createElement(I18nRead_1.default, { id: "more_news", capitalize: true })))))))))));
});
