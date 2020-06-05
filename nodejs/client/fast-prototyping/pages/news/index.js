"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const articles_1 = require("./articles");
const article_1 = require("./article");
const Route_1 = __importDefault(require("../../../components/navigation/Route"));
function News() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Route_1.default, { path: "/news", exact: true, component: articles_1.Articles }),
        react_1.default.createElement(Route_1.default, { path: "/news/:id", exact: true, component: article_1.Article })));
}
exports.News = News;
;
