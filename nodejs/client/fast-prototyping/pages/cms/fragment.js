"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../../providers/item-definition");
const item_definition_loader_1 = require("../../components/item-definition-loader");
const util_1 = require("../../components/util");
const core_1 = require("@material-ui/core");
const Entry_1 = __importDefault(require("../../../components/property/Entry"));
const View_1 = __importDefault(require("../../../components/property/View"));
const LocationStateReader_1 = __importDefault(require("../../../components/navigation/LocationStateReader"));
const buttons_1 = require("../../components/buttons");
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const snackbar_1 = __importDefault(require("../../components/snackbar"));
const SubmitActioner_1 = __importDefault(require("../../../components/item-definition/SubmitActioner"));
const fragmentStyles = core_1.createStyles({
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
exports.Fragment = core_1.withStyles(fragmentStyles)((props) => {
    return (react_1.default.createElement(util_1.SlowLoadingElement, { id: "fragment" },
        react_1.default.createElement(LocationStateReader_1.default, { defaultState: { id: "", version: "" }, stateIsInQueryString: true }, (locationState, setState) => {
            const updateLocationState = (which, e) => {
                setState({
                    [which]: e.target.value,
                }, true);
            };
            return (react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "fragment", properties: [
                    "title",
                    "content",
                    "attachments",
                ], includePolicies: false, longTermCaching: false, forId: parseInt(locationState.id, 10) || null, forVersion: locationState.version || null },
                react_1.default.createElement(core_1.Container, { maxWidth: "md", className: props.classes.container + " trusted" },
                    react_1.default.createElement(core_1.Paper, { className: props.classes.paper },
                        react_1.default.createElement(I18nReadMany_1.default, { data: [
                                { id: "id", capitalize: true },
                                { id: "version", capitalize: true },
                            ] }, (i18nId, i18nVersion) => (react_1.default.createElement(core_1.Box, { className: props.classes.box },
                            react_1.default.createElement(core_1.TextField, { fullWidth: true, value: locationState.id, type: "number", onChange: updateLocationState.bind(null, "id"), placeholder: i18nId }),
                            react_1.default.createElement(core_1.TextField, { fullWidth: true, value: locationState.version, onChange: updateLocationState.bind(null, "version"), placeholder: i18nVersion })))),
                        react_1.default.createElement(Entry_1.default, { id: "title" }),
                        react_1.default.createElement(Entry_1.default, { id: "content", rendererArgs: {
                                requestAltOnImages: true,
                                supportsRawMode: true,
                            } }),
                        react_1.default.createElement(buttons_1.SubmitButton, { i18nId: "submit", options: {
                                properties: [
                                    "title",
                                    "content",
                                    "attachments",
                                ],
                            }, redirectOnSuccess: (status) => `/cms/fragment?id=${status.id}&version=${locationState.version || ""}`, redirectReplace: true })),
                    react_1.default.createElement(core_1.Paper, { className: props.classes.paper2 },
                        react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                            react_1.default.createElement(core_1.Typography, { variant: "h4" },
                                react_1.default.createElement(View_1.default, { id: "title" })),
                            react_1.default.createElement(View_1.default, { id: "content" })))),
                react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(snackbar_1.default, { severity: "error", i18nDisplay: actioner.submitError, open: !!actioner.submitError, onClose: actioner.dismissError }),
                    react_1.default.createElement(snackbar_1.default, { severity: "success", i18nDisplay: "success", open: actioner.submitted, onClose: actioner.dismissSubmitted }))))));
        })));
});
