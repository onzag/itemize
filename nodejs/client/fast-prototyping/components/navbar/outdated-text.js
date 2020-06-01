"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const Update_1 = __importDefault(require("@material-ui/icons/Update"));
const AppIsOutdatedChecker_1 = __importDefault(require("../../../components/outdated/AppIsOutdatedChecker"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
function OutdatedText(props) {
    return (react_1.default.createElement(AppIsOutdatedChecker_1.default, null, (isOutdated) => {
        if (isOutdated) {
            return (react_1.default.createElement(I18nRead_1.default, { id: "needs_update_navigation" }, (i18nNeedsUpdate) => (react_1.default.createElement(core_1.Button, { variant: "outlined", color: "inherit", "aria-label": i18nNeedsUpdate, startIcon: react_1.default.createElement(Update_1.default, null), onClick: props.onClick }, i18nNeedsUpdate))));
        }
        return null;
    }));
}
exports.OutdatedText = OutdatedText;
