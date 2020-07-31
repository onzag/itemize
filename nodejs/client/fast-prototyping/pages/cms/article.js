"use strict";
/**
 * Fast prototyping page section for the article in cms mode
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../../providers/item-definition");
const item_definition_loader_1 = require("../../components/item-definition-loader");
const mui_core_1 = require("../../mui-core");
const Entry_1 = __importDefault(require("../../../components/property/Entry"));
const View_1 = __importDefault(require("../../../components/property/View"));
const LocationStateReader_1 = __importDefault(require("../../../components/navigation/LocationStateReader"));
const buttons_1 = require("../../components/buttons");
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const snackbar_1 = __importDefault(require("../../components/snackbar"));
const SubmitActioner_1 = __importDefault(require("../../../components/item-definition/SubmitActioner"));
const articles_1 = require("../frontpage/articles");
/**
 * The styles for the article section
 */
const articleStyles = mui_core_1.createStyles({
    paper: {
        padding: "1rem",
    },
    paper2: {
        padding: "1rem",
        marginTop: "1rem",
    },
    container: {
        paddingTop: "1rem",
    },
    box: {
        paddingBottom: "1rem",
    },
});
/**
 * Displays a single article, summary and summary image
 * @param props the single article props
 * @returns a react element
 */
const SingleArticle = mui_core_1.withStyles(articles_1.articlesStyles)((props) => {
    return react_1.default.createElement("div", { className: props.classes.articleContainer },
        react_1.default.createElement("div", { className: props.classes.articleImageContainer },
            react_1.default.createElement(View_1.default, { id: "summary_image", rendererArgs: {
                    imageClassName: props.classes.articleImage,
                    imageSizes: "300px",
                    lazyLoad: true,
                } })),
        react_1.default.createElement("div", { className: props.classes.articleText },
            react_1.default.createElement(mui_core_1.Typography, { variant: "h4" },
                react_1.default.createElement(View_1.default, { id: "title" })),
            react_1.default.createElement("div", { className: props.classes.articleSummaryContainer },
                react_1.default.createElement("div", { className: props.classes.articleSummary },
                    react_1.default.createElement(View_1.default, { id: "summary" })))));
});
/**
 * Page section that allows for creating and modifying articles
 * @param props the article props
 * @returns a react element
 */
exports.Article = mui_core_1.withStyles(articleStyles)((props) => {
    return (react_1.default.createElement(LocationStateReader_1.default, { defaultState: { id: "" }, stateIsInQueryString: true }, (locationState, setState) => {
        const updateLocationId = (e) => {
            setState({
                id: e.target.value,
            }, true);
        };
        return (react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "article", properties: [
                "title",
                "content",
                "attachments",
                "locale",
                "summary",
                "summary_image",
            ], includePolicies: false, longTermCaching: false, forId: parseInt(locationState.id, 10) || null },
            react_1.default.createElement(mui_core_1.Container, { maxWidth: "md", className: props.classes.container + " trusted" },
                react_1.default.createElement(mui_core_1.Paper, { className: props.classes.paper },
                    react_1.default.createElement(I18nReadMany_1.default, { data: [
                            { id: "id", capitalize: true },
                        ] }, (i18nId) => (react_1.default.createElement(mui_core_1.Box, { className: props.classes.box },
                        react_1.default.createElement(mui_core_1.TextField, { fullWidth: true, value: locationState.id, type: "number", onChange: updateLocationId, placeholder: i18nId })))),
                    react_1.default.createElement(Entry_1.default, { id: "locale" }),
                    react_1.default.createElement(Entry_1.default, { id: "title" }),
                    react_1.default.createElement(Entry_1.default, { id: "content", rendererArgs: {
                            requestAltOnImages: true,
                            supportsRawMode: true,
                        } }),
                    react_1.default.createElement(Entry_1.default, { id: "summary" }),
                    react_1.default.createElement(Entry_1.default, { id: "summary_image" }),
                    react_1.default.createElement(buttons_1.SubmitButton, { i18nId: "submit", options: {
                            properties: [
                                "title",
                                "content",
                                "attachments",
                                "locale",
                                "summary",
                                "summary_image",
                            ],
                        }, redirectOnSuccess: (status) => `/cms/article?id=${status.id}`, redirectReplace: true })),
                react_1.default.createElement(mui_core_1.Paper, { className: props.classes.paper2 },
                    react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                        react_1.default.createElement(SingleArticle, null))),
                react_1.default.createElement(mui_core_1.Paper, { className: props.classes.paper2 },
                    react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                        react_1.default.createElement(mui_core_1.Typography, { variant: "h4" },
                            react_1.default.createElement(View_1.default, { id: "title" })),
                        react_1.default.createElement(View_1.default, { id: "content" })))),
            react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(snackbar_1.default, { id: "submit-article-error", severity: "error", i18nDisplay: actioner.submitError, open: !!actioner.submitError, onClose: actioner.dismissError }),
                react_1.default.createElement(snackbar_1.default, { id: "submit-article-success", severity: "success", i18nDisplay: "success", open: actioner.submitted, onClose: actioner.dismissSubmitted }))))));
    }));
});
