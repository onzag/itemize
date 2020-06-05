"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
function Articles() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(module_1.ModuleProvider, { module: "cms" },
            react_1.default.createElement(item_definition_1.NoStateItemDefinitionProvider, { itemDefinition: "article" },
                react_1.default.createElement(I18nRead_1.default, { id: "news", capitalize: true }, (i18nNews) => {
                    return (react_1.default.createElement(TitleSetter_1.default, null, i18nNews));
                })))));
}
exports.Articles = Articles;
;
