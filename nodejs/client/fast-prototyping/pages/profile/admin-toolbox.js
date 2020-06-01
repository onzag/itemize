"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const DoneOutline_1 = __importDefault(require("@material-ui/icons/DoneOutline"));
const buttons_1 = require("../../components/buttons");
const snackbar_1 = __importDefault(require("../../components/snackbar"));
const Entry_1 = __importDefault(require("../../../components/property/Entry"));
const SubmitActioner_1 = __importDefault(require("../../../components/item-definition/SubmitActioner"));
const adminToolboxStyles = () => core_1.createStyles({
    divider: {
        marginTop: "1rem",
        marginBottom: "1rem",
    }
});
exports.AdminToolbox = core_1.withStyles(adminToolboxStyles)((props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Divider, { className: props.classes.divider }),
        react_1.default.createElement(Entry_1.default, { id: "role" }),
        react_1.default.createElement(buttons_1.SubmitButton, { i18nId: "update_profile", options: {
                properties: ["role"],
                differingOnly: true,
            }, buttonColor: "primary", buttonStartIcon: react_1.default.createElement(DoneOutline_1.default, null), buttonVariant: "contained" }),
        react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(snackbar_1.default, { severity: "error", i18nDisplay: actioner.submitError, open: !!actioner.submitError, onClose: actioner.dismissError }),
            react_1.default.createElement(snackbar_1.default, { severity: "success", i18nDisplay: "profile_updated_successfully", open: actioner.submitted, onClose: actioner.dismissSubmitted }))))));
});
