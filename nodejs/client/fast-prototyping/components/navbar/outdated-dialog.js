"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../../mui-core");
const dialog_1 = require("../dialog");
const AppIsOutdatedChecker_1 = __importDefault(require("../../../components/outdated/AppIsOutdatedChecker"));
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const outdatedDialogStyles = (theme) => mui_core_1.createStyles({
    dialogContent: {
        padding: "1rem 0.5rem",
    },
});
function reloadApp() {
    location.reload();
}
exports.OutdatedDialog = mui_core_1.withStyles(outdatedDialogStyles)((props) => {
    return (react_1.default.createElement(AppIsOutdatedChecker_1.default, null, (isOutdated) => {
        if (isOutdated) {
            return (react_1.default.createElement(I18nReadMany_1.default, { data: [
                    {
                        id: "needs_update_title",
                        capitalize: true,
                    },
                    {
                        id: "needs_update_content",
                    },
                    {
                        id: "needs_update_action",
                    },
                ] }, (needsUpdateTitle, needsUpdateContent, needsUpdateAction) => {
                return (react_1.default.createElement(dialog_1.DialogResponsive, { title: needsUpdateTitle, open: props.isOpenIfOutdated, onClose: props.onClose, buttons: react_1.default.createElement(mui_core_1.Button, { color: "primary", "aria-label": needsUpdateAction, startIcon: react_1.default.createElement(mui_core_1.UpdateIcon, null), onClick: reloadApp }, needsUpdateAction) },
                    react_1.default.createElement(mui_core_1.Typography, { variant: "body1", className: props.classes.dialogContent }, needsUpdateContent)));
            }));
        }
        return null;
    }));
});
