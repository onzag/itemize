"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Reader_1 = __importDefault(require("../../../components/property/Reader"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const core_1 = require("@material-ui/core");
const item_definition_loader_1 = require("../../components/item-definition-loader");
const View_1 = __importDefault(require("../../../components/property/View"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const articleContentStyles = (theme) => core_1.createStyles({
    container: {},
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
        padding: "2rem",
    },
    title: {
        textTransform: "uppercase",
        fontWeight: 900,
        position: "absolute",
        bottom: "2rem",
        zIndex: 3,
        color: "white",
        textShadow: "0 0 5px black",
        borderLeft: "solid 1rem white",
        paddingLeft: "2rem",
    },
    dateInfo: {
        width: "100%",
        color: theme.palette.grey[900],
    }
});
const ArticleContent = core_1.withStyles(articleContentStyles)((props) => {
    return (react_1.default.createElement(core_1.Container, { maxWidth: "md", className: props.classes.container },
        react_1.default.createElement(core_1.Paper, { className: props.classes.paper },
            react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                react_1.default.createElement("div", { className: props.classes.headerImageContainer },
                    react_1.default.createElement(View_1.default, { id: "summary_image", rendererArgs: {
                            imageClassName: props.classes.headerImage,
                            imageSizes: "70vw",
                        } }),
                    react_1.default.createElement("div", { className: props.classes.headerOverlay }),
                    react_1.default.createElement(core_1.Typography, { variant: "h3", className: props.classes.title },
                        react_1.default.createElement(Reader_1.default, { id: "title" }, (title) => title))),
                react_1.default.createElement("div", { className: props.classes.innerContainer + " trusted" },
                    react_1.default.createElement("div", { className: props.classes.dateInfo },
                        react_1.default.createElement(core_1.Typography, { variant: "body1" },
                            react_1.default.createElement(View_1.default, { id: "created_at", rendererArgs: { dateFormat: "LLLL" } }),
                            react_1.default.createElement(Reader_1.default, { id: "edited_at" }, (editedAt) => {
                                if (editedAt) {
                                    return (react_1.default.createElement(react_1.default.Fragment, null,
                                        react_1.default.createElement(core_1.Divider, { orientation: "vertical" }),
                                        react_1.default.createElement(I18nRead_1.default, { id: "updated_at", args: [react_1.default.createElement(View_1.default, { id: "edited_at", rendererArgs: { dateFormat: "ll" } })] })));
                                }
                                return null;
                            }))),
                    react_1.default.createElement(View_1.default, { id: "content" }))))));
});
function Article(props) {
    const articleId = parseInt(props.match.params.id) || null;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(module_1.ModuleProvider, { module: "cms" },
            react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "article", forId: articleId, static: "TOTAL", properties: [
                    "title",
                    "locale",
                    "content",
                    "summary_image",
                    "attachments",
                ] },
                react_1.default.createElement(Reader_1.default, { id: "title" }, (title) => (react_1.default.createElement(TitleSetter_1.default, null, title))),
                react_1.default.createElement(ArticleContent, null)))));
}
exports.Article = Article;
;
