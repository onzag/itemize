"use strict";
/**
 * Provides a fast prototyping frontpage
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const articles_1 = require("./articles");
const hero_1 = require("./hero");
const social_1 = require("./social");
/**
 * Provides the frontpage which has a hero, articles and
 * a social context
 * @param props the frontpage props
 * @returns a react element
 */
function Frontpage(props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(I18nRead_1.default, { id: "app_name", capitalize: true }, (i18nAppName) => {
            return (react_1.default.createElement(TitleSetter_1.default, null, i18nAppName));
        }),
        props.noHero ? null : react_1.default.createElement(hero_1.Hero, { heroID: props.heroId || 1 }),
        props.children,
        props.noArticles ? null : react_1.default.createElement(articles_1.Articles, null),
        props.noSocial ? null : react_1.default.createElement(social_1.Social, null),
        props.childrenEnd));
}
exports.Frontpage = Frontpage;
;
