"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SubmitActioner_1 = __importDefault(require("../item-definition/SubmitActioner"));
const DifferingPropertiesRetriever_1 = __importDefault(require("../item-definition/DifferingPropertiesRetriever"));
const DifferingIncludesRetriever_1 = __importDefault(require("../item-definition/DifferingIncludesRetriever"));
const Prompt_1 = __importDefault(require("./Prompt"));
class NeedsSubmitPrompt extends react_1.default.PureComponent {
    async confirmationCallback(actioner) {
        const response = await actioner.submit(this.props.confirmationSubmitOptions);
        if (response.error) {
            return response.error;
        }
        return null;
    }
    buildPrompt(when) {
        return (react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => (react_1.default.createElement(Prompt_1.default, { when: when, beforeUnloadMessage: this.props.beforeUnloadMessage, Dialog: this.props.Dialog, dialogArgs: this.props.dialogArgs, confirmationCallback: this.confirmationCallback.bind(this, actioner), confirmationCallbackCleanup: actioner.dismissError }))));
    }
    render() {
        const noProperties = (!this.props.properties || !this.props.properties.length);
        const noIncludes = (!this.props.includes || !this.props.includes.length);
        if (noProperties &&
            noIncludes) {
            return null;
        }
        if (noIncludes) {
            return (react_1.default.createElement(DifferingPropertiesRetriever_1.default, { mainProperties: this.props.properties }, (differingProperties) => (this.buildPrompt(!!(differingProperties && differingProperties.length)))));
        }
        else if (noProperties) {
            return (react_1.default.createElement(DifferingIncludesRetriever_1.default, { mainIncludes: this.props.includes }, (differingIncludes) => (this.buildPrompt(!!(differingIncludes && differingIncludes.length)))));
        }
        else {
            react_1.default.createElement(DifferingPropertiesRetriever_1.default, { mainProperties: this.props.properties }, (differingProperties) => (react_1.default.createElement(DifferingIncludesRetriever_1.default, { mainIncludes: this.props.includes }, (differingIncludes) => (this.buildPrompt(!!(differingIncludes && differingIncludes.length) ||
                !!(differingProperties && differingProperties.length))))));
        }
    }
}
exports.default = NeedsSubmitPrompt;
