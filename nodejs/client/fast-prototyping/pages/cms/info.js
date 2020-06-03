"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const lab_1 = require("@material-ui/lab");
const infoStyles = core_1.createStyles({
    paper: {
        padding: "1rem",
    },
    container: {
        paddingTop: "1rem",
    },
    infoText: {
        padding: "1rem 1rem 0 1rem",
    }
});
exports.Info = core_1.withStyles(infoStyles)((props) => {
    return (react_1.default.createElement(core_1.Container, { maxWidth: "md", className: props.classes.container },
        react_1.default.createElement(core_1.Paper, { className: props.classes.paper },
            react_1.default.createElement(I18nReadMany_1.default, { data: [
                    { id: "generic_warning", capitalize: true },
                    { id: "warning" },
                    { id: "info_content" },
                    { id: "info_content_2" },
                ] }, (i18nGenericWarning, i18nWarning, i18nInfoContent1, i18nInfoContent2) => (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(lab_1.Alert, { severity: "error" },
                    react_1.default.createElement(lab_1.AlertTitle, null, i18nGenericWarning),
                    i18nWarning),
                react_1.default.createElement(core_1.Typography, { variant: "body1", className: props.classes.infoText }, i18nInfoContent1),
                react_1.default.createElement(core_1.Typography, { variant: "body1", className: props.classes.infoText }, i18nInfoContent2)))))));
});
