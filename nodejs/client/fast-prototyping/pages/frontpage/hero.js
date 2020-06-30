"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const View_1 = __importDefault(require("../../../components/property/View"));
const mui_core_1 = require("../../mui-core");
const AppLanguageRetriever_1 = __importDefault(require("../../../components/localization/AppLanguageRetriever"));
const item_definition_loader_1 = require("../../components/item-definition-loader");
const heroStyle = {
    heroContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "70vh",
        borderBottom: "solid 1rem #ccc",
    },
};
exports.Hero = mui_core_1.withStyles(heroStyle)((props) => {
    return (react_1.default.createElement("div", { className: props.classes.heroContainer + " trusted" },
        react_1.default.createElement(module_1.ModuleProvider, { module: "cms" },
            react_1.default.createElement(AppLanguageRetriever_1.default, null, (languageData) => (react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "fragment", forId: props.heroID, forVersion: languageData.currentLanguage.code, longTermCaching: true, properties: [
                    "content",
                    "attachments",
                ], static: "NO_LISTENING" },
                react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                    react_1.default.createElement(View_1.default, { id: "content" }))))))));
});
